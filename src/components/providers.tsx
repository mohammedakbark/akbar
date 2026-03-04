"use client";

import { ReactNode } from "react";

/**
 * Providers Component
 * - Wraps the entire application with necessary context providers
 * - Manages global state and client-side initialization
 */
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
