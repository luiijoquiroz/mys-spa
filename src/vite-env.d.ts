/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Número de WhatsApp en formato internacional sin «+» ni espacios. Público por diseño. */
  readonly VITE_WHATSAPP_NUMBER?: string;
}
