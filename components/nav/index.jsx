import React from "react";

import "./styles.scss";
import logo from "@src/assets/images/booking/logo.svg";
import { SecondaryButton } from "@src/components/button";

export function AppNavigation({
  highlighted = false,
  restart = false,
  children,
}) {
  return (
    <nav
      id="nav"
      className={`relative filter drop-shadow bg-white z-10 ${
        highlighted && "highlighted"
      }`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 px-5">
        <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between py-10">
          <a className="flex-shrink-0 flex items-center" href="/">
            <img className="sm:h-7 h-5 w-auto" src={logo} alt="Workflow" />
          </a>
          {children}
          {restart && <SecondaryButton size="Large">Restart</SecondaryButton>}
        </div>
      </div>
    </nav>
  );
}
