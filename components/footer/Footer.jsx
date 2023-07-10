import {useTranslation} from "next-i18next";

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="overflow-hidden rounded-b-2xl bg-slate-50 dark:bg-black">
      <div className="container">
        <p className="text-center py-6 text-gray-lite  dark:text-color-910 ">
          &copy; {new Date().getFullYear()} {t('footer')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
