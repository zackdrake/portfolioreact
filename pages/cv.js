import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import OnlineCV from '../components/CV/OnlineCV';

const CVPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('cvName')} - {t('onlineCV')}</title>
        <meta name="description" content={t('cvSummary')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OnlineCV />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default CVPage;
