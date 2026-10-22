export function SocialIcon({ name }: { name: "instagram" | "whatsapp" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "instagram" ? <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </> : <>
        <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.6-5a8.5 8.5 0 1 1 15.9-4.2Z" />
        <path d="m8.2 7.5 1.4-.3 1.2 2.7-1.1 1a7.3 7.3 0 0 0 3.4 3.3l1-1.2 2.7 1.3-.3 1.5c-.2 1-1.2 1.4-2.2 1.2-4.2-.8-7.5-4.1-8.2-7.4-.2-1 .8-2.1 2.1-2.1Z" />
      </>}
    </svg>
  );
}
