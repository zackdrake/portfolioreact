import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import getHeaderMenu from "../../data/HeaderMenu";
import Image from "next/image";
import DarkMode from "../mode/DarkMode";
import DarkModeMobile from "../mode/DarkModeMobile";
import { isActiveLink } from "../../utilis/linkActiveChecker";
import { useRouter } from "next/router";
import LanguageSwitch from "../contexts/LanguageSwitch";
import LanguageSwitchMobile from "../contexts/LanguageSwitchMobile";
import { useTranslation } from "next-i18next";

const Header = () => {
  const { t } = useTranslation('common');
  const HeaderMenu = getHeaderMenu(t);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();



  return (
    <div className="z-50 ">
      <div className="container">
        {/* Header menu start  */}
        <header className="flex justify-between items-center fixed top-0 left-0 w-full lg:static z-[1111111111]">
          <div className=" flex justify-between w-full px-4 lg:px-0 bg-[#F3F6F6] lg:bg-transparent lg:dark:bg-transparent dark:bg-black ">
            <div className="flex justify-between w-full items-center space-x-4 lg:my-8 my-5 ">
              <Link className="text-5xl font-semibold" href="/">
                {/* website logo  */}

                <Image
                  className="h-[28px] lg:h-[32px]"
                  width={250}
                  height={50}
                  priority
                  src="/images/logo/logo-preview.png"
                  alt="logo"
                />
              </Link>

              {/* start mobile menu toggle and mode btn */}
              <div className="flex items-center">
                <DarkModeMobile />
                <LanguageSwitchMobile />
                {!menuOpen ? (
                  <span
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:opacity-0 lg:invisible visible opacity-100  bg-[#ef4060] w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer items-center text-white dark:text-white text-3xl ml-3 "
                  >
                    <AiOutlineMenu />
                  </span>
                ) : (
                  <span
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:opacity-0 cursor-pointer lg:invisible visible opacity-100  bg-[#ef4060] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-3xl ml-3 "
                  >
                    <AiOutlineClose />
                  </span>
                )}
              </div>
              {/* End mobile menu toggle and mode btn */}
            </div>
          </div>
          {/* End flex */}

          {/* mobile nav menu start */}
          <nav
            className={`${
              menuOpen ? "block  dark:bg-black   " : "hidden lg:block"
            }`}
          >
            {/* Menu items start  */}
            <ul
              className={`${
                menuOpen
                  ? "block lg:hidden  absolute left-0 rounded-b-[20px] top-20 z-[22222222222222] w-full bg-white dark:bg-[#212425] drop-shadow-lg py-4 "
                  : "flex my-12 "
              }`}
            >
              {HeaderMenu.map((item) => (
                <li key={item.id} className="mb-1">
                  <Link
                    className={`${
                      isActiveLink(item.routePath, router.asPath)
                        ? "rounded-md  cursor-pointer font-poppins bg-white text-gray-lite font-medium mx-2.5 flex text-xtiny py-2.5 px-2 md:px-4 xl:px-5 items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-[#A6A6A6] linked bg-gradient-to-r whitespace-nowrap"
                        : "px-2 rounded-md  cursor-pointer font-poppins bg-white text-gray-lite font-medium mx-2.5 flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-[#A6A6A6] whitespace-nowrap"
                    } `}
                    href={item.routePath}
                  >
                    <span className="mr-2 text-xl whitespace-nowrap">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* light dark mode button start */}
              <DarkMode />
              {/* light dark mode button end */}
              <LanguageSwitch />
            </ul>
            {/* Menu items end  */}
          </nav>
          {/* End mobile nav menu end */}
        </header>
        {/* Header menu End  */}
      </div>
    </div>
  );
};

export default Header;
