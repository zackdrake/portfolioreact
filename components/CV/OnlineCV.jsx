import React, { useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

/**
 * Modern CV layout
 * - Tailwind CSS
 * - Dark/Light support
 * - i18n (FR/EN) via next-i18next
 * - Export to PDF via window.print + print styles targeting A4
 */
const OnlineCV = () => {
  const { t } = useTranslation("common");

  // Safely coerce any i18n value to an array so we never crash if the key is missing
  const toArray = (value) => (Array.isArray(value) ? value : []);

  const skills = useMemo(
    () => toArray(t("cvSkillsList", { returnObjects: true })),
    [t]
  );

  const experiences = useMemo(
    () => [
      {
        title: t("cvExp1Title"),
        company: t("cvExp1Company"),
        date: t("cvExp1Date"),
        description: t("cvExp1Description"),
        skills: toArray(t("cvExp1Skills", { returnObjects: true })),
      },
      {
        title: t("cvExp2Title"),
        company: t("cvExp2Company"),
        date: t("cvExp2Date"),
        description: t("cvExp2Description"),
        skills: toArray(t("cvExp2Skills", { returnObjects: true })),
      },
      {
        title: t("cvExp3Title"),
        company: t("cvExp3Company"),
        date: t("cvExp3Date"),
        description: t("cvExp3Description"),
        skills: toArray(t("cvExp3Skills", { returnObjects: true })),
      },
    ],
    [t]
  );

  const education = useMemo(
    () => [
      {
        title: t("cvEducation1Title"),
        date: t("cvEducation1Date"),
        school: t("cvEducation1School"),
      },
      {
        title: t("cvEducation2Title"),
        date: t("cvEducation2Date"),
        school: t("cvEducation2School"),
      },
    ],
    [t]
  );

  const projects = useMemo(
    () => [
      {
        title: t("cvProject1Title"),
        description: t("cvProject1Description"),
        date: t("cvProject1Date", { defaultValue: "" }),
        skills: toArray(t("cvProject1Skills", { returnObjects: true })),
      },
      {
        title: t("cvProject2Title"),
        description: t("cvProject2Description"),
        date: t("cvProject2Date", { defaultValue: "" }),
        skills: toArray(t("cvProject2Skills", { returnObjects: true })),
      },
    ],
    [t]
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray dark:bg-color-980 py-10 print:bg-white">
      <div
        id="cv-print-area"
        className="mx-auto w-full max-w-[950px] bg-white dark:bg-color-970 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none"
      >
        {/* Header */}
        <div className="relative px-8 py-8 border-b border-gray-200 dark:border-color-990">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#FA5252]/80 flex-shrink-0">
              <Image
                src="/images/about/avatar.jpg"
                alt={t("cvName")}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("cvName")}
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-color-910">
                {t("cvJobTitle")}
              </p>

              {/* Quick contact line */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-color-910">
                <span className="inline-flex items-center">
                  <MailIcon className="w-4 h-4 mr-2" />
                  {t("cvEmail")}
                </span>
                <span className="inline-flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {t("cvPhone")}
                </span>
                <span className="inline-flex items-center">
                  <LocationIcon className="w-4 h-4 mr-2" />
                  {t("cvLocation")}
                </span>
              </div>
            </div>
          </div>

          {/* Export button */}
          <div className="no-print absolute top-8 right-8">
            <button
              onClick={handlePrint}
              className="flex items-center bg-gradient-to-r from-[#FA5252] to-[#DD2476] hover:from-[#DD2476] hover:to-[#FA5252] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
              aria-label={t("exportPDF")}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              {t("exportPDF")}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Sidebar */}
          <aside className="bg-[#F8FAFC] dark:bg-color-980 px-8 py-8 md:py-10">
            <SectionTitle>{t("cvLanguagesTitle")}</SectionTitle>
            <div className="space-y-2 text-sm">
              <LineItem label={t("cvLanguage1")} note={t("cvLanguage1Level")} />
              <LineItem label={t("cvLanguage2")} note={t("cvLanguage2Level")} />
            </div>

            <div className="h-6" />

            <SectionTitle>{t("cvSkillsTitle")}</SectionTitle>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-color-910 space-y-1">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <div className="h-6" />

            <SectionTitle>{t("cvCertificationsTitle")}</SectionTitle>
            <ul className="text-sm text-gray-700 dark:text-color-910 space-y-1">
              <li className="flex items-center">
                <Badge className="mr-2" />
                <span className="font-medium">{t("cvCert1")}</span>
                {t("cvCert1Date", { defaultValue: "" }) && (
                  <span className="ml-2 text-gray-500 dark:text-color-910">
                    ({t("cvCert1Date")})
                  </span>
                )}
              </li>
            </ul>
          </aside>

          {/* Main content */}
          <main className="md:col-span-2 px-8 py-8 md:py-10">
            <SectionTitle accent>{t("cvExperienceTitle")}</SectionTitle>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#FA5252]" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.title} •{" "}
                      <span className="text-[#FA5252]">{exp.company}</span>
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-color-910 mt-1 md:mt-0">
                      {exp.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-color-910">
                    {exp.description}
                  </p>
                  {exp.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.skills.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-full bg-[#FFF4F4] text-[#FA5252] dark:bg-color-980 dark:text-[#FF6464] border border-[#ffd1d1] dark:border-color-990"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="h-8 print:h-6" />

            <SectionTitle accent>{t("cvEducationTitle")}</SectionTitle>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#FA5252]" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {ed.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-color-910 mt-1 md:mt-0">
                      {ed.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-color-910">
                    {ed.school}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-8 print:h-6" />

            <SectionTitle accent>{t("cvProjectsTitle")}</SectionTitle>
            <div className="space-y-6">
              {projects.map((p, i) => (
                <div key={i} className="relative pl-6 break-inside-avoid">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#FA5252]" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {p.title}
                    </h3>
                    {p.date ? (
                      <span className="text-sm text-gray-500 dark:text-color-910 mt-1 md:mt-0">
                        {p.date}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-color-910">
                    {p.description}
                  </p>
                  {p.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.skills.map((tag, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-xs rounded-full bg-[#FFF4F4] text-[#FA5252] dark:bg-color-980 dark:text-[#FF6464] border border-[#ffd1d1] dark:border-color-990"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          /* Only print the CV area */
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          #__next > *:not(#cv-print-area) {
            display: none !important;
          }
          #cv-print-area {
            display: block !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          /* A4 size with margins */
          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
};

/* Reusable UI bits */

const SectionTitle = ({ children, accent = false }) => (
  <h2
    className={`mb-3 font-semibold ${
      accent ? "text-[#FA5252]" : "text-gray-900 dark:text-white"
    }`}
  >
    {children}
  </h2>
);

const LineItem = ({ label, note }) => (
  <div className="flex items-center justify-between text-gray-700 dark:text-color-910">
    <span className="font-medium">{label}</span>
    {note && <span className="text-xs text-gray-500 dark:text-color-910">{note}</span>}
  </div>
);

const Badge = ({ className = "" }) => (
  <svg
    className={`w-4 h-4 text-[#FA5252] ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l2.39 4.84L20 8.27l-3.9 3.8.92 5.36L12 15.77l-4.99 2.66.92-5.36L4 8.27l5.61-1.43L12 2z" />
  </svg>
);

const PhoneIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h.28a2 2 0 011.94 1.515l.72 2.878a2 2 0 01-.45 1.882l-1.2 1.2a16 16 0 006.364 6.364l1.2-1.2a2 2 0 011.882-.45l2.878.72A2 2 0 0121 18.72V19a2 2 0 01-2 2h-1c-9.389 0-17-7.611-17-17V5z"
    />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11a4 4 0 100-8 4 4 0 000 8z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"
    />
  </svg>
);

const DownloadIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14a2 2 0 002-2v-3" />
  </svg>
);

export default OnlineCV;