import { MapPin } from 'lucide-react'

export function ContactIcon({ name }: { name: string }) {
  if (name === 'relocation') {
    return (
      <MapPin
        className="contact-icon relocation-icon"
        size={16}
        strokeWidth={1.5}
        fill="currentColor"
        aria-hidden="true"
      />
    )
  }

  if (name === 'us') {
    return (
      <svg
        className="contact-icon flag-icon"
        width="20"
        height="14"
        viewBox="0 0 30 20"
        aria-hidden="true"
      >
        <path fill="#FFF" d="M0 0h30v20H0z" />
        {Array.from({ length: 7 }, (_, row) => (
          <rect
            key={row}
            x="0"
            y={(row * 40) / 13}
            width="30"
            height={20 / 13}
            fill="#B22234"
          />
        ))}
        <path fill="#3C3B6E" d="M0 0h12v10.77H0z" />
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, column) => (
            <path
              key={`${row}-${column}`}
              fill="#FFF"
              transform={`translate(${1 + column * 2 + (row % 2)} ${0.65 + row * 1.18})`}
              d="m0-.48.11.33h.35l-.28.21.11.33L0 .18l-.29.21.11-.33-.28-.21h.35Z"
            />
          )),
        )}
      </svg>
    )
  }

  if (name === 'myanmar') {
    return (
      <svg
        className="contact-icon flag-icon"
        width="20"
        height="14"
        viewBox="0 0 30 20"
        aria-hidden="true"
      >
        <path fill="#FECB00" d="M0 0h30v7H0z" />
        <path fill="#34B233" d="M0 7h30v6H0z" />
        <path fill="#EA2839" d="M0 13h30v7H0z" />
        <path
          fill="#FFF"
          d="m15 2 2.1 6.5H24l-5.6 4 2.1 6.5-5.5-4-5.5 4 2.1-6.5-5.6-4h6.9Z"
        />
      </svg>
    )
  }

  return (
    <svg
      className={`contact-icon contact-icon-${name}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {name === 'email' && (
        <path d="M2 4.5c-.8 0-1.5.7-1.5 1.5v13.5H5V9l7 5.3L19 9v10.5h4.5V6c0-1.2-1.4-1.9-2.4-1.2L12 11.7 2.9 4.8a1.5 1.5 0 0 0-.9-.3Z" />
      )}
      {name === 'linkedin' && (
        <>
          <rect x="1" y="1" width="22" height="22" rx="2" />
          <path
            fill="var(--background)"
            d="M5 9h3v10H5zm1.5-4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM10 9h3v1.4c.6-1 1.5-1.7 3-1.7 2.8 0 3.5 1.8 3.5 4.5V19h-3v-5.2c0-1.5-.3-2.5-1.7-2.5-1.5 0-1.8 1.2-1.8 2.5V19h-3Z"
          />
        </>
      )}
      {name === 'whatsapp' && (
        <>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
            d="M21.5 11.5a9.5 9.5 0 0 1-14.2 8.3L2 21l1.3-5.1A9.5 9.5 0 1 1 21.5 11.5Z"
          />
          <path d="m8.3 6.4 1.1 2.5c.2.4-.7 1.2-.9 1.5.9 1.8 2 2.8 3.9 3.7l1.3-1.5c.2-.2.4-.2.7 0l2.3 1.1c.3.2.3.4.3.7-.2 1.5-1.3 2.4-2.8 2.4-3.7-.2-8.7-4.7-8.8-8.1 0-1.2.6-2.2 1.5-2.6.6-.2 1.1-.2 1.4.3Z" />
        </>
      )}
      {name === 'github' && (
        <path d="M12 .8a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.6v-2.1c-3.4.7-4.1-1.5-4.1-1.5-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .8Z" />
      )}
    </svg>
  )
}
