import React from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mt-20"></div>
      {children}
      <Footer />
    </>
  );
}

export default Layout;
