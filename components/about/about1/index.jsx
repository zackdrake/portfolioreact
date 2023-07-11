import Image from "next/image";
import PersonalInfo from "./PersonalInfo";
import { useTranslation } from 'next-i18next';


const Index = () => {
  const { t } = useTranslation('common');
  return (
      <div className="grid grid-cols-12 md:gap-10 pt-4 md:pt-[40px] items-center">
        {/* start .col and routePath image left */}
        <div className="col-span-12 md:col-span-4">
          {/* personal images for routePath page  */}
          <Image
              className="w-full md:w-[443px] md:h-[401px] object-cover overflow-hidden rounded-[35px] mb-3 md:mb-0"
              src="/images/about/about.jpg"
              width={443}
              height={401}
              alt="routePath"
          />
        </div>
        {/* End .col and routePath image left */}

        {/* Start about right content */}
        <div className="col-span-12 md:col-span-8 space-y-2.5">
          <div className=" md:mr-12 xl:mr-16">
            <h3 className="text-4xl font-medium dark:text-white mb-2.5 ">
              {t('myValues')}
            </h3>
            <p className="text-gray-lite  dark:text-color-910 leading-7">
              {t('myValuesText')}
            </p>
          </div>

          <div className=" md:mr-12 xl:mr-16">
            <h3 className="text-4xl font-medium dark:text-white mb-2.5 ">
              {t('myProject')}
            </h3>
            <p className="text-gray-lite  dark:text-color-910 leading-7">
              {t('myProjectText')}
            </p>
          </div>

          <div className=" md:mr-12 xl:mr-16">
            <h3 className="text-4xl font-medium dark:text-white mb-2.5 ">
              {t('myHumanQualities')}
            </h3>
            <p className="text-gray-lite  dark:text-color-910 leading-7">
              {t('myHumanQualitiesText')}
            </p>
          </div>

          <div className=" md:mr-12 xl:mr-16">
            <h3 className="text-4xl font-medium dark:text-white mb-2.5 ">
              {t('myHobbies')}
            </h3>
            <p className="text-gray-lite  dark:text-color-910 leading-7">
              {t('myHobbiesText')}
            </p>
          </div>



          {/* personal information */}
          {/*
          <div>
            <h3 className="text-4xl font-medium my-5 dark:text-white">
              {t('personalInformation')}
            </h3>

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PersonalInfo />
            </div>

          </div>
          */}
          {/* End personal information */}
        </div>
        {/* End about right content */}
      </div>
  );
};

export default Index;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})