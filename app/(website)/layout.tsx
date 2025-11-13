import React, { ReactNode } from "react";
import { LandingPageNavbar } from "./_components/navbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col py-10 px-10 xl:px-0 container">
      <LandingPageNavbar />
      {children}
    </div>
  );
};

export default Layout;
