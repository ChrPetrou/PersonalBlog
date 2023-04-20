import PageLayout from "components/PageLayout";
import "../styles/global.css";
import "../styles/nprogress.css";

import NProgress from "nprogress";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ThemeProvider from "providers/ThemeProvider";
import "highlight.js/styles/base16/helios.css";

export default function App({ Component, pageProps }) {
  const { events } = useRouter();
  useEffect(() => {
    events.on("routeChangeStart", () => NProgress.start());
    events.on("routeChangeComplete", () => NProgress.done());
    events.on("routeChangeError", () => NProgress.done());
  }, [events]);

  return (
    <ThemeProvider>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}
