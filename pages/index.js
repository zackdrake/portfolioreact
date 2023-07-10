import Home from "./home";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

const MainRoot = () => {
  return <Home />;
};

export default MainRoot;
