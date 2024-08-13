import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import Head from "next/head";

import "./styles/normalize.css";
import "./styles/global.css";
import "./styles/prism.css";

import { CSPostHogProvider } from "./provider";
import Particles from "../components/ParticlesLayout";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Analytics />

        <body>
          <Particles>{children}</Particles>
          <Footer display="fixed" />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
