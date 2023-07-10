import { ThemeProvider } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/custom.css";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from '../components/contexts/languageContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...await serverSideTranslations(locale, ['common']),
        },
    }
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    AOS.refresh();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ThemeProvider attribute="class">
          <LanguageProvider>
            <Component {...pageProps} />
          </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
export default appWithTranslation(MyApp);

