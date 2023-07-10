import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import About1 from "../components/about/about1";
import Service from "../components/service/Service";
import Brand from "../components/brand/Brand";
import Footer from "../components/footer/Footer";
import Seo from "../components/seo/Seo";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

const index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="bg-homeBg min-h-screen dark:bg-homeBg-dark bg-no-repeat bg-center bg-cover bg-fixed  md:pb-16 w-full">
      <Seo pageTitle="About" />
      {/* End Head for Seo */}

      <Header />
      {/* End  Header */}

      <div className="container lg:rounded-2xl bg-white dark:bg-[#111111]  px-4 sm:px-5 md:px-10 lg:px-20">
        <div data-aos="fade">
          {/* Start top about info */}
          <div className="py-12">
            <h2 className="after-effect  mt-12 lg:mt-0 ">
              {t('aboutMe')}
            </h2>
            {/* Page Title */}
            <About1 />
          </div>
          {/* End top about info */}

          {/* Start about service info */}
          <div className="pb-12 ">
            <h3 className="text-[35px] dark:text-white font-medium pb-5">
              {t('whatIDo')}
            </h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
              {/* Experience information  */}

              <Service />
            </div>
          </div>
          {/* End about service info */}

          {/* Start Client Slider */}
          <div className="bg-[#F8FBFB] dark:bg-[#0D0D0D] max-w-full h-auto   py-10 rounded-xl">
            <h3 className="text-center dark:text-white text-6xl mb-3 font-semibold ">
              {t('technologies')}
            </h3>
            <Brand />
          </div>
          {/* End Client Slider */}

          {/* Start Common Footer  */}
          <Footer />
          {/* End Common Footer  */}
        </div>
        {/* End fade effect */}
      </div>
      {/* End container */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
