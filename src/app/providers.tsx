"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider chain={base}>
      {children}
    </OnchainKitProvider>
  );
}

