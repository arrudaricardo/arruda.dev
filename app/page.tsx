import Home from "./home";
import { Metadata } from "next";
import Particles from "../components/ParticlesLayout";

export const metadata: Metadata = {
  title: "Ricardo de Arruda personal website",
  creator: "Ricardo Arruda",
  openGraph: {
    images: ["https://iili.io/5ifTF4.md.png"],
    url: "https://arruda.dev",
    title: "Ricardo de Arruda personal website",
  },
};

export default async function Page() {
  return (
    <Particles>
      <Home />
    </Particles>
  );
}
