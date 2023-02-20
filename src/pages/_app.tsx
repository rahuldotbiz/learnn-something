import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5560290233860569"
        crossOrigin="anonymous"
      ></Script>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZWXTP4KYQN"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZWXTP4KYQN');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
