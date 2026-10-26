import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { getWhatsAppUrl } from "../../config/contact";
import {
  buildInquiryMessage,
  formatPhone,
  investmentRange,
  peopleCounts,
  investmentOptions,
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
    location: "",
    investment: "",
    confirmed: false,
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
      setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])));
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

  function field(key: Exclude<keyof InquiryValues, "confirmed">) {
    return {
      id: `inquiry-${key}`,
      name: key,
      required: true,
      value: values[key],
      "aria-invalid": Boolean(touched[key] && errors[key]),
      "aria-describedby":
        [
          ["breed", "phone", "location"].includes(key) ? `inquiry-${key}-hint` : "",
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
        </div>
        <form className="inquiry-form" onSubmit={submit} noValidate>
          <div className="inquiry-fields">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">Qual é o seu nome?</label>
              <input {...field("name")} ref={firstInput} type="text" autoComplete="name" maxLength={100} placeholder="Seu nome completo" />
              {error("name")}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-breed">Qual a raça do seu pet?</label>
              <input {...field("breed")} type="text" maxLength={180} placeholder="Ex.: Golden, SRD, Poodle..." />
              <span id="inquiry-breed-hint" className="inquiry-hint">Pode listar várias raças ou escrever sem raça definida.</span>
              {error("breed")}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-pets">Quantos pets vão participar do ensaio?</label>
              <input {...field("pets")} type="number" inputMode="numeric" min="1" step="1" placeholder="Digite o número" />
              {error("pets")}
            </div>
            <fieldset className="inquiry-field inquiry-choice-group" aria-describedby={touched.people && errors.people ? "inquiry-people-error" : undefined}>
              <legend>Quantas pessoas vão participar do ensaio?</legend>
              <div className="inquiry-people-options">
                {peopleCounts.map((count) => <label key={count} className="inquiry-person-option">
                  <input {...field("people")} id={`inquiry-people-${count === "5 ou mais" ? "5-plus" : count}`} type="radio" value={count} checked={values.people === count} />
                  <span>{count === "5 ou mais" ? "5+" : count}</span>
                </label>)}
              </div>
              <span className="inquiry-hint">Zero para ensaio somente com pets.</span>
              {error("people")}
            </fieldset>
            <div className="inquiry-field">
              <label htmlFor="inquiry-phone">Qual o seu WhatsApp?</label>
              <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
              <span id="inquiry-phone-hint" className="inquiry-hint">Informe o número com DDD.</span>
              {error("phone")}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-location">Me conte sua cidade e Estado:</label>
              <input {...field("location")} type="text" maxLength={110} placeholder="Ex.: São Paulo - SP" />
              <span id="inquiry-location-hint" className="inquiry-hint">Escreva a cidade e a sigla do estado.</span>
              {error("location")}
            </div>
            <p className="inquiry-range inquiry-wide">{investmentRange.replaceAll("R$ ", "R$\u00a0")}</p>
            <fieldset className="inquiry-field inquiry-choice-group inquiry-wide" aria-describedby={touched.investment && errors.investment ? "inquiry-investment-error" : undefined}>
              <legend>Quanto você pensa em investir nas suas memórias?</legend>
              <div className="inquiry-investment-options">
                {investmentOptions.map((option, index) => <label key={option} className="inquiry-investment-option">
                  <input {...field("investment")} id={`inquiry-investment-${index}`} type="radio" value={option} checked={values.investment === option} />
                  <span>{option}</span>
                </label>)}
              </div>
              {error("investment")}
            </fieldset>
            <div className="inquiry-wide">
              <label className="inquiry-confirmation" htmlFor="inquiry-confirmed">
                <input id="inquiry-confirmed" name="confirmed" type="checkbox" required checked={values.confirmed}
                  aria-invalid={Boolean(touched.confirmed && errors.confirmed)}
                  aria-describedby={touched.confirmed && errors.confirmed ? "inquiry-confirmed-error" : undefined}
                  onBlur={() => setTouched((previous) => ({ ...previous, confirmed: true }))}
                  onChange={(event) => setValues((previous) => ({ ...previous, confirmed: event.target.checked }))} />
                <span>Estou ciente de que todas as informações são verdadeiras. <span className="inquiry-required-mark" aria-hidden="true">*</span></span>
              </label>
              {error("confirmed")}
            </div>
          </div>
          <p className="inquiry-required">Todos os campos são obrigatórios.</p>
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
