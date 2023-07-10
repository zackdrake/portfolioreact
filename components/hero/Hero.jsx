import Image from "next/image";
import Social from "../social/Social";
import {useTranslation} from "next-i18next";

const Hero = () => {
  const { t } = useTranslation('common');
  return (
    <div
      className="flex flex-col items-center h-[100vh] md:h-[90vh] lg:h-[80vh]  xl:h-[71vh]  justify-center"
      data-aos="fade"
    >
      <Image
        className="rounded-full w-[443px] h-[401px] 2xl:w-[443px] 2xl:h-[401px]"
        src="/images/about/avatar.jpg"
        width={443}
        height={401}
        priority
        alt="hero image"
      />
      <h3 className="mt-6 mb-1 text-5xl font-semibold dark:text-white">
        {t('name')}
      </h3>
      <p className="mb-4 text-[#7B7B7B]">{t('jobTitle')}</p>
      {/* Avatar Info End */}

      {/* Social information start */}
      {/*
      <div className="flex space-x-3">
        <Social />
      </div>
      */}
      {/* Social information start */}

      {/* Dowanload button start */}

      <a
        href="/images/cv.pdf"
        download
        className="flex items-center bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476]  to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
      >
        <img src="/images/download.png" alt="icon" className="mr-2" />
        {t('downloadResume')}
      </a>

      {/* Download button End */}
    </div>
  );
};

export default Hero;
