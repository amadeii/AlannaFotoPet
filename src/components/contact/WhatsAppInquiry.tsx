import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { getWhatsAppUrl } from "../../config/contact";
import {
  buildInquiryMessage,
  formatPhone,
  investmentRange,
  petCounts,
  peopleCounts,
  states,
  validateInquiry,
} from "../../lib/inquiry";
import type { InquiryValues } from "../../lib/inquiry";
import { Arrow } from "../ui/Elements";
import { Icon } from "../ui/Icon";

type Request = { intent: string; trigger: HTMLButtonElement };
const InquiryContext = createContext<((request: Request) => void) | null>(null);

export function WhatsAppTrigger({
  children,
  intent,
  variant = "button",
  ariaLabel,
}: {
  children: ReactNode;
  intent: string;
  variant?: "button" | "icon";
  ariaLabel?: string;
}) {
  const request = useContext(InquiryContext);
  if (!request)
    throw new Error("WhatsAppTrigger precisa de WhatsAppInquiryProvider.");
  return (
    <button
      type="button"
      className={variant === "button" ? "button" : "footer-icon"}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-controls="inquiry-dialog"
      onClick={(event) => request({ intent, trigger: event.currentTarget })}
    >
      {children}
      {variant === "button" && <Arrow />}
    </button>
  );
}

export function WhatsAppInquiryProvider({
  themeMessage,
  children,
}: {
  themeMessage: string;
  children: ReactNode;
}) {
  const [request, setRequest] = useState<Request | null>(null);
  function dismiss() {
    const trigger = request?.trigger;
    setRequest(null);
    trigger?.focus({ preventScroll: true });
  }
  return (
    <InquiryContext.Provider value={setRequest}>
      {children}
      {request && (
        <InquiryDialog
          themeMessage={themeMessage}
          intent={request.intent}
          onDismiss={dismiss}
        />
      )}
    </InquiryContext.Provider>
  );
}

function InquiryDialog({
  themeMessage,
  intent,
  onDismiss,
}: {
  themeMessage: string;
  intent: string;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<InquiryValues>({
    name: "",
    breed: "",
    pets: "",
    people: "",
    phone: "",
    city: "",
    state: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof InquiryValues, boolean>>
  >({});
  const errors = validateInquiry(values);
  const valid = Object.keys(errors).length === 0;

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    firstInput.current?.focus();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function close() {
    dialog.current?.close();
    onDismiss();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) {
      setTouched({
        name: true,
        breed: true,
        pets: true,
        people: true,
        phone: true,
        city: true,
        state: true,
      });
      return;
    }
    const destination = getWhatsAppUrl(
      buildInquiryMessage(values, themeMessage, intent),
    );
    // Abertura síncrona no gesto de confirmação; não envia a mensagem.
    const whatsapp = window.open("about:blank", "_blank");
    if (whatsapp) {
      whatsapp.opener = null;
      whatsapp.location.replace(destination);
    } else {
      window.location.assign(destination);
    }
    close();
  }

  function field(key: keyof InquiryValues) {
    return {
      id: `inquiry-${key}`,
      name: key,
      required: true,
      value: values[key],
      "aria-invalid": Boolean(touched[key] && errors[key]),
      "aria-describedby":
        [
          `inquiry-${key}-hint`,
          touched[key] && errors[key] ? `inquiry-${key}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined,
      onBlur: () => {
        if (dialog.current?.open)
          setTouched((previous) => ({ ...previous, [key]: true }));
      },
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const input = event.target;
        const raw = input.value;
        const formatted = key === "phone" ? formatPhone(raw) : raw;
        setValues((previous) => ({ ...previous, [key]: formatted }));
        // Mantém a posição de edição por quantidade de dígitos, inclusive ao colar +55.
        if (key === "phone" && input instanceof HTMLInputElement) {
          let digitsBefore = raw
            .slice(0, input.selectionStart ?? raw.length)
            .replace(/\D/g, "").length;
          if (/^55\d{10,11}$/.test(raw.replace(/\D/g, "")))
            digitsBefore = Math.max(0, digitsBefore - 2);
          requestAnimationFrame(() => {
            if (document.activeElement !== input) return;
            let caret = 0;
            let digits = 0;
            while (caret < formatted.length && digits < digitsBefore) {
              if (/\d/.test(formatted[caret])) digits++;
              caret++;
            }
            input.setSelectionRange(caret, caret);
          });
        }
      },
    };
  }
  function error(key: keyof InquiryValues) {
    return touched[key] && errors[key] ? (
      <p className="inquiry-error" id={`inquiry-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;
  }

  return (
    <dialog
      id="inquiry-dialog"
      className="inquiry-dialog"
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      aria-describedby="inquiry-description"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          "button:not(:disabled), input, select",
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            close();
        }
      }}
    >
      <div className="inquiry-heading">
        <button
          className="inquiry-close"
          type="button"
          aria-label="Fechar formulário"
          onClick={close}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="inquiry-shell">
        <div className="inquiry-intro">
          <p className="eyebrow">Um primeiro encontro</p>
          <h2 id="inquiry-title">
            Vamos planejar
            <br />
            <i>seu ensaio?</i>
          </h2>
          <p id="inquiry-description">
            Conte um pouquinho sobre vocês. Essas informações vão preparar nossa
            conversa no WhatsApp.
          </p>
          <p className="inquiry-range">{investmentRange.replaceAll("R$ ", "R$\u00a0")}</p>
        </div>
        <form className="inquiry-form" onSubmit={submit} noValidate>
          <p className="inquiry-required">Todos os campos são obrigatórios.</p>
          <fieldset className="inquiry-group">
            <legend>Sobre vocês</legend>
            <div className="inquiry-fields">
              <div className="inquiry-field inquiry-wide">
                <label htmlFor="inquiry-name">Nome da pessoa</label>
                <input
                  {...field("name")}
                  ref={firstInput}
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                />
                <span id="inquiry-name-hint" className="inquiry-hint">
                  Como você gostaria de ser chamado(a)?
                </span>
                {error("name")}
              </div>
              <div className="inquiry-field inquiry-wide">
                <label htmlFor="inquiry-breed">Raça do pet</label>
                <input {...field("breed")} type="text" maxLength={180} />
                <span id="inquiry-breed-hint" className="inquiry-hint">
                  Pode escrever SRD, sem raça definida ou listar várias raças.
                </span>
                {error("breed")}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-pets">Quantos pets?</label>
                <select {...field("pets")}>
                  <option value="">Selecione</option>
                  {petCounts.map((count) => (
                    <option value={count} key={count}>
                      {count}
                    </option>
                  ))}
                </select>
                <span id="inquiry-pets-hint" className="inquiry-hint">
                  Pelo menos um pet.
                </span>
                {error("pets")}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-people">Quantas pessoas?</label>
                <select {...field("people")}>
                  <option value="">Selecione</option>
                  {peopleCounts.map((count) => (
                    <option value={count} key={count}>
                      {count === "0" ? "0 — somente pets" : count}
                    </option>
                  ))}
                </select>
                <span id="inquiry-people-hint" className="inquiry-hint">
                  Zero para ensaio somente com pets.
                </span>
                {error("people")}
              </div>
            </div>
          </fieldset>
          <fieldset className="inquiry-group">
            <legend>Como conversar</legend>
            <div className="inquiry-fields">
              <div className="inquiry-field inquiry-wide">
                <label htmlFor="inquiry-phone">Telefone com DDD</label>
                <input
                  {...field("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <span id="inquiry-phone-hint" className="inquiry-hint">
                  Celular ou telefone fixo brasileiro com DDD.
                </span>
                {error("phone")}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-city">Cidade</label>
                <input
                  {...field("city")}
                  type="text"
                  autoComplete="address-level2"
                  maxLength={100}
                />
                <span id="inquiry-city-hint" className="inquiry-hint">
                  Em qual cidade você mora?
                </span>
                {error("city")}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-state">Estado</label>
                <select {...field("state")} autoComplete="address-level1">
                  <option value="">Selecione</option>
                  {states.map((state) => (
                    <option value={state} key={state}>{state}</option>
                  ))}
                </select>
                <span id="inquiry-state-hint" className="inquiry-hint">
                  Selecione a UF.
                </span>
                {error("state")}
              </div>
            </div>
          </fieldset>
          <div className="inquiry-conclusion">
            <p className="inquiry-validation" aria-live="polite">
              {valid
                ? "Tudo pronto para continuar."
                : "Preencha todos os campos corretamente para continuar."}
            </p>
            <button
              className="button inquiry-submit"
              type="submit"
              disabled={!valid}
            >
              Continuar para o WhatsApp
              <Arrow />
            </button>
            <p className="inquiry-privacy">
              Ao continuar, o WhatsApp abrirá com a mensagem pronta. Você revisa e
              envia. Não armazenamos estes dados no site.
            </p>
            <button className="inquiry-cancel" type="button" onClick={close}>
              Voltar ao site
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
