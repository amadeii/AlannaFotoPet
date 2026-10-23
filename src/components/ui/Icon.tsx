type IconName = "arrow-up-right" | "arrow-down" | "plus" | "close" | "play";

const paths: Record<IconName, string> = {
  "arrow-up-right": "M6 18 18 6M6 6h12v12",
  "arrow-down": "M12 4v16m-6-6 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M6 18 18 6",
  play: "m8 5 11 7-11 7V5Z",
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="ui-icon" viewBox="0 0 24 24" width="20" height="20"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
