import { Access } from "./components/Access";
import { Agents } from "./components/Agents";
import { BrandBand } from "./components/BrandBand";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Integrations } from "./components/Integrations";
import { Lifecycle } from "./components/Lifecycle";
import { Nav } from "./components/Nav";
import { OperatorDashboard } from "./components/OperatorDashboard";
import { Platform } from "./components/Platform";
import { Security } from "./components/Security";
import { Workspaces } from "./components/Workspaces";

export function App() {
  return (
    <>
      <a
        href="#platform"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#0d0f13] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="page-atmosphere" aria-hidden="true" />
      <div className="page-root">
        <Nav />
        <main>
          <Hero />
          <Platform />
          <Agents />
          <Lifecycle />
          <BrandBand />
          <Security />
          <Workspaces />
          <Integrations />
          <Access />
          <OperatorDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
}
