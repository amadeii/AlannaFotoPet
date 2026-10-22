import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Exercise the real hook with a small DOM/observer harness. This also covers
// lifecycle events the embedded browser keeps visible during tab changes.
const source = ts.transpileModule(
  readFileSync(new URL("../src/hooks/useEditorialMotion.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

function setup(observerAvailable = true) {
  const element = (top = 0, bottom = 500) => {
    const classes = new Set();
    return {
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name),
      },
      style: { setProperty() {}, removeProperty() {} },
      getBoundingClientRect: () => ({ top, bottom }),
    };
  };
  const hero = element();
  const start = element();
  const block = element(1500, 1800);
  block.parentElement = { children: [block] };
  const gallery = element(1500, 2100);
  const card = element(1500, 1800);
  card.parentElement = { children: [card] };
  const listeners = new Map();
  const events = {
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
  };
  const finite = { effect: { getTiming: () => ({ iterations: 1 }) }, playState: "running", finishCount: 0,
    finish() { this.finishCount++; } };
  const infinite = { ...finite, effect: { getTiming: () => ({ iterations: Infinity }) }, finishCount: 0 };
  const page = {
    querySelector: selector => ({ ".hero": hero, ".hero-brand": start, ".gallery-section": gallery })[selector],
    querySelectorAll: selector => selector === ".gallery-grid .photo-frame" ? [card] : [block, card],
    getAnimations: () => [finite, infinite],
  };
  let observer;
  class Observer {
    observed = new Set();
    constructor(callback) { this.callback = callback; observer = this; }
    observe(e) { this.observed.add(e); }
    unobserve(e) { this.observed.delete(e); }
    disconnect() { this.observed.clear(); }
  }
  const window = { ...events, ...(observerAvailable ? { IntersectionObserver: Observer } : {}) };
  const document = { ...events, hidden: false };
  let cleanup;
  const exports = {};
  vm.runInNewContext(source, {
    exports, window, document, innerHeight: 1000, IntersectionObserver: Observer,
    require: () => ({ useLayoutEffect: fn => { cleanup = fn(); } }),
  });
  exports.useEditorialMotion({ current: page });
  const entry = (target, isIntersecting, bottom = 500, intersectionRatio = 1) => ({ target, isIntersecting, intersectionRatio, boundingClientRect: { bottom } });
  return { hero, start, block, gallery, card, observer, entry, document, listeners, finite, infinite, cleanup };
}

test("hero only replays after a complete exit and return of its logo", () => {
  const h = setup();
  assert.ok(h.hero.classList.contains("motion-hero-active"));
  h.observer.callback([h.entry(h.hero, false, 20)]);
  assert.ok(h.hero.classList.contains("motion-hero-active"));
  h.observer.callback([h.entry(h.hero, false, -1)]);
  assert.ok(!h.hero.classList.contains("motion-hero-active"));
  h.observer.callback([h.entry(h.hero, true)]);
  assert.ok(!h.hero.classList.contains("motion-hero-active"));
  h.observer.callback([h.entry(h.start, true)]);
  assert.ok(h.hero.classList.contains("motion-hero-active"));
  h.observer.callback([h.entry(h.block, true)]);
  assert.ok(h.block.classList.contains("motion-seen"));
  assert.ok(!h.observer.observed.has(h.block));
  h.cleanup();
  assert.equal(h.listeners.size, 0);
  assert.equal(h.observer.observed.size, 0);
  assert.ok(!h.block.classList.contains("motion-target"));
});

test("visibility and restored pages settle entrances without finishing the carousel", () => {
  const h = setup();
  h.document.hidden = true;
  h.observer.callback([h.entry(h.block, true)]);
  assert.ok(!h.block.classList.contains("motion-seen"));
  h.block.getBoundingClientRect = () => ({ top: 50, bottom: 300 });
  h.document.hidden = false;
  h.listeners.get("visibilitychange")();
  assert.ok(h.block.classList.contains("motion-settled"));
  assert.ok(h.block.classList.contains("motion-seen"));
  assert.equal(h.finite.finishCount, 1);
  assert.equal(h.infinite.finishCount, 0);
  h.listeners.get("pageshow")({ persisted: false });
  assert.equal(h.finite.finishCount, 1);
  h.listeners.get("pageshow")({ persisted: true });
  assert.equal(h.finite.finishCount, 2);
  assert.equal(h.infinite.finishCount, 0);
});

test("unavailable observer leaves content and hero in their visible CSS defaults", () => {
  const h = setup(false);
  assert.equal(h.observer, undefined);
  assert.equal(h.listeners.size, 0);
  assert.ok(!h.block.classList.contains("motion-target"));
  assert.ok(!h.hero.classList.contains("motion-hero-active"));
});

test("gallery only re-arms after the complete section exits, not from card-edge crossings", () => {
  const h = setup();
  h.observer.callback([h.entry(h.card, true, 500, 0.02)]);
  assert.ok(h.card.classList.contains("motion-seen"));
  assert.ok(h.observer.observed.has(h.card));
  h.observer.callback([h.entry(h.card, false)]);
  assert.ok(h.card.classList.contains("motion-seen"));
  h.observer.callback([h.entry(h.card, true, 500, 0.02), h.entry(h.gallery, true)]);
  assert.ok(h.card.classList.contains("motion-seen"));
  h.observer.callback([h.entry(h.gallery, false)]);
  assert.ok(!h.card.classList.contains("motion-seen"));
  h.observer.callback([h.entry(h.card, true, 500, 0.02)]);
  assert.ok(h.card.classList.contains("motion-seen"));
});
