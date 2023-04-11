import PageLayout from "components/PageLayout";
import "../styles/global.css";
import "../styles/nprogress.css";
import "highlight.js/styles/base16/Helios.css";

import NProgress from "nprogress";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ThemeProvider from "providers/ThemeProvider";

export default function App({ Component, pageProps }) {
  const { events } = useRouter();
  useEffect(() => {
    events.on("routeChangeStart", () => NProgress.start());
    events.on("routeChangeComplete", () => NProgress.done());
    events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <ThemeProvider>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}
