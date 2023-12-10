"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { app_id } from "./shared/constants";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeChain = "goerli";
  const _appId = app_id || "";
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
          activeChain={activeChain}
        >
          <AnonAadhaarProvider _appId={_appId}>{children}</AnonAadhaarProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
