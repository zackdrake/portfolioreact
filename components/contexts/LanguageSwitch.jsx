import { useContext, useEffect } from 'react';
import { LanguageContext } from '../contexts/languageContext';
import { useRouter } from 'next/router';

export default function LanguageSwitch() {
    const { language, setLanguage } = useContext(LanguageContext);
    const router = useRouter();

    // toggle language between English and French
    const toggleLanguage = () => {
        if (language === 'EN') {
            setLanguage('FR');
            router.push(router.pathname, router.asPath, { locale: 'fr' });
        } else {
            setLanguage('EN');
            router.push(router.pathname, router.asPath, { locale: 'en' });
        }
    };

    useEffect(() => {
        // Ensure that the language button reflects the correct language on page load
        if (router.locale === 'fr') {
            setLanguage('FR');
        } else {
            setLanguage('EN');
        }
    }, [router.locale, setLanguage]);

    return (
        <span
            className="bg-white w-[40px] hover:text-white hidden  h-[40px] rounded-full lg:flex justify-center items-center text-black hover:bg-[#ef4060] transition-all duration-300 ease-in-out cursor-pointer ml-2 "
            onClick={toggleLanguage}
        >
            {language === 'EN' ? 'FR' : 'EN'}
        </span>
    );
}