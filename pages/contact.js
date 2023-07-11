import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/footer/Footer";
import Address from "../components/contact/Address";
import Seo from "../components/seo/Seo";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

const index = () => {
  return (
    <div className="bg-homeBg min-h-screen  dark:bg-homeBg-dark bg-no-repeat bg-center bg-cover bg-fixed  md:pb-16 w-full">
      <Seo pageTitle="Contact" />
      {/* End Head for Seo */}

      <Header />
      {/* End  Header */}

      <div className="container lg:rounded-2xl bg-white dark:bg-[#111111] ">
        <div data-aos="fade">
          <div className="py-12 px-4 sm:px-5 md:px-10 lg:px-20">
            <h2 className="after-effect after:left-40 mb-[40px] mt-12  lg:mt-0">
              Contact
            </h2>

            <div className="lg:flex gap-x-20">
              {/* End contact address block */}
              {/*
              <div className="w-full lg:w-[40%] xl:w-[30%] space-y-6">
                <Address />
              </div>
              */}
              {/* End contact address block */}

              {/* Start contact form */}
              <div className="w-full mt-8 lg:mt-0 lg:w-[100%] xl:w-[100%]">
                <ContactForm />
              </div>
              {/* End contact form */}
            </div>
          </div>
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
