import Image from "next/image";
import Link from "next/link";
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

      {/* CV Buttons start */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {/* Online CV Button */}
        <Link href="/cv">
          <div className="flex items-center justify-center bg-white dark:bg-color-970 border-2 border-[#FA5252] text-[#FA5252] duration-200 transition ease-linear hover:bg-[#FA5252] hover:text-white px-8 py-3 text-lg rounded-[35px] cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('onlineCV')}
          </div>
        </Link>

        {/* Download button */}
        <a
          href="/images/cv.pdf"
          download
          className="flex items-center justify-center bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476] to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px]"
        >
          <Image src="/images/download.png" alt="download icon" width={20} height={20} className="mr-2" />
          {t('downloadResume')}
        </a>
      </div>

      {/* CV Buttons End */}
    </div>
  );
};

export default Hero;
