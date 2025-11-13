import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
