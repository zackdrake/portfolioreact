import { AiOutlineHome } from "react-icons/ai";
import { FaBlogger, FaRegUser } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FiCodesandbox } from "react-icons/fi";
import { RiContactsBookLine } from "react-icons/ri";

export default function getHeaderMenu(t) {
    return [
        {
            id: "01",
            name: t("homeMenu"),
            routePath: "/",
            icon: <AiOutlineHome/>,
        },
        {
            id: "02",
            name: t("aboutMenu"),
            routePath: "/about",
            icon: <FaRegUser/>,
        },
        {
            id: "06",
            name: t("resumeMenu"),
            routePath: "/resume",
            icon: <CgNotes/>,
        },
        {
            id: "03",
            name: t("portfolioMenu"),
            routePath: "/works",
            icon: <FiCodesandbox/>,
        },
        {
            id: "04",
            name: t("articlesMenu"),
            routePath: "/blogs",
            icon: <FaBlogger/>,
        },
        {
            id: "05",
            name: t("contactMenu"),
            routePath: "/contact",
            icon: <RiContactsBookLine/>,
        },
    ];
}