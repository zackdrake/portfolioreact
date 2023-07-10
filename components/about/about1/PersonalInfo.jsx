import {
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import React, { useState } from "react";
import {useTranslation} from "next-i18next";

const PersonalInfo = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const revealContact = () => {
    setIsVisible(true);
  };

  const personalContent = [
    {
      id: 1,
      icon: <FaMobileAlt />,
      iconColor: "text-oriange",
      name: t('phoneNumberName'),
      meta: (
        <>
          <a
            className="hover:text-[#FA5252] duration-300 transition"
          >
            +33 6 16 22 44 92
          </a>
        </>
      ),
    },
    {
      id: 2,
      icon: <FaMapMarkerAlt />,
      iconColor: "text-oriange-lite",
      name: t('locationName'),
      meta: <>{t('location')}</>,
    },
    {
      id: 3,
      icon: <FaEnvelopeOpenText />,
      iconColor: "text-green",
      name: t('emailName'),
      meta: (
        <>
          {" "}
          <a
            className="hover:text-[#FA5252] duration-300 transition"
          >
            {t('emailAddress')}
          </a>
        </>
      ),
    },
    {
      id: 4,
      icon: <FaRegCalendarAlt />,
      iconColor: "text-color-50",
      name: t('birthdayName'),
      meta: <>{t('birthday')}</>,
    },
  ];

  return (
    <>
      {personalContent.map((item) => (
        <div className="flex" key={item.id}>
          <span
            className={`${item.iconColor} dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 text-`}
          >
            {item.icon}
          </span>
          <div className="space-y-1">
            <p className="text-xs text-gray-lite dark:text-color-910">
              {item.name}
            </p>
            <h6 className="font-medium dark:text-white">
              {!isVisible && (
                  <button
                      onClick={revealContact}
                      className="dark:bg-color-990 font-bold py-2 px-4 rounded"
                  >
                    {t('revealContactDetails')}
                  </button>
              )}
              {isVisible && item.meta }</h6>
          </div>
        </div>
      ))}
    </>
  );
};

export default PersonalInfo;
