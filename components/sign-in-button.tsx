"use client";

import { useState } from "react";
import { ProductIcon } from "./product-icon";

export function SignInButton({ href }: { href: string }) {
  const [pending, setPending] = useState(false);

  return (
    <a
      className={pending ? "button button-primary signin-button is-pending" : "button button-primary signin-button"}
      href={href}
      aria-busy={pending}
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
          return;
        }
        setPending(true);
      }}
    >
      {pending ? <span className="spinner" aria-hidden="true" /> : <ProductIcon name="mark" />}
      <span>{pending ? "Conectando…" : "Entrar com ChatGPT"}</span>
    </a>
  );
}
