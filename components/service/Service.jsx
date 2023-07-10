import { useTheme } from "next-themes";
import Image from "next/image";
import getServicesData from "../../data/serviceData";
import {useTranslation} from "next-i18next";

const Service = () => {
  const { t } = useTranslation('common');
  const servicesData = getServicesData(t);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {servicesData.map((item) => (
        <div
          className="about-box dark:bg-transparent"
          key={item.id}
          style={{
            background: `${theme === "dark" ? "transparent" : item?.bg}`,
          }}
        >
          <Image
            className="w-10 h-10 object-contain  block"
            src={item.icon}
            width={40}
            height={40}
            alt="icon"
          />

          <div className="space-y-2">
            <h3 className="dark:text-white text-xl font-semibold">
              {item?.title}
            </h3>
            <p className=" leading-8 text-gray-lite dark:text-[#A6A6A6]">
              {item?.des}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Service;
