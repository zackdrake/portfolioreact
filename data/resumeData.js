import { MdOutlineBusinessCenter, MdOutlineSchool } from "react-icons/md";
import { FaAward } from "react-icons/fa";

export default function getResumeData(t) {
  return [
    {
      id: 1,
      title: t("education"),
      icon: <MdOutlineBusinessCenter/>,
      items: [
        {
          id: 1,
          date: "2019-2023",
          title: t("intech"),
          place: t("intechDescription"),
          bg: "#FFF4F4",
        },

        {
          id: 2,
          date: "2017 - 2018",
          title: t("commercialLicense"),
          place: t("commercialLicenseDescription"),
          bg: "#FFF1FB",
        },

        {
          id: 3,
          date: "2015-2017",
          title: t("bts"),
          place: t("btsDescription"),
          bg: "#FFF4F4",
        },

        {
          id: 4,
          date: "2014-2015",
          title: t("Lycee"),
          place: t("LyceeDescription"),
          bg: "#FFF1FB",
        },
      ],
    },
    {
      id: 2,
      title: t("experience"),
      icon: <MdOutlineSchool/>,
      items: [
        {
          id: 1,
          date: "2023-present",
          title: t("Invivo"),
          place: t("InvivoDescription"),
          bg: "#EEF5FA",
        },

        {
          id: 2,
          date: "2021-2023",
          title: t("ESIEA"),
          place: t("ESIEADescription"),
          bg: "#F2F4FF",
        },

        {
          id: 3,
          date: "2021",
          title: t("Thales"),
          place: t("ThalesDescription"),
          bg: "#EEF5FA",
        },

        {
          id: 4,
          date: "2017 - 2018",
          title: t("Degetel"),
          place: t("DegetelDescription"),
          bg: "#EEF5FA",
        },
      ],
    },
  ];
}