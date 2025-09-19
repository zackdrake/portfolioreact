import React, { useMemo, useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { LanguageContext } from "../contexts/languageContext";

/**
 * Modern CV layout
 * - Tailwind CSS
 * - Dark/Light support
 * - i18n (FR/EN) via next-i18next
 * - Export to PDF via window.print + print styles targeting A4
 */
const OnlineCV = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useContext(LanguageContext);

  const [enterReady, setEnterReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Reference to CV container for PDF capture
  const cvRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setEnterReady(true);
  }, []);

  useEffect(() => {
    // Keep LanguageContext in sync with Next locale
    if (router.locale === "fr") setLanguage("FR");
    else setLanguage("EN");
  }, [router.locale, setLanguage]);

  // Safely coerce any i18n value to an array so we never crash if the key is missing
  const toArray = (value) => (Array.isArray(value) ? value : []);

  const skills = useMemo(
    () => toArray(t("cvSkillsList", { returnObjects: true })),
    [t]
  );
  const tools = useMemo(
    () => toArray(t("cvToolsList", { returnObjects: true })),
    [t]
  );
  const hobbies = useMemo(
    () => toArray(t("cvHobbiesList", { returnObjects: true })),
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
      {
        title: t("cvExp4Title", { defaultValue: "" }),
        company: t("cvExp4Company", { defaultValue: "" }),
        date: t("cvExp4Date", { defaultValue: "" }),
        description: t("cvExp4Description", { defaultValue: "" }),
        skills: toArray(t("cvExp4Skills", { returnObjects: true })),
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
      {
        title: t("cvEducation3Title", { defaultValue: "" }),
        date: t("cvEducation3Date", { defaultValue: "" }),
        school: t("cvEducation3School", { defaultValue: "" }),
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

  // Export to selectable-text PDF via pdfmake (no html2canvas), tuned for chip/contact styles
  const handleExportPDF = async () => {
    try {
      setExporting(true);

      const pdfMakeMod = await import("pdfmake/build/pdfmake");
      const pdfFontsMod = await import("pdfmake/build/vfs_fonts");
      const pdfMake = (pdfMakeMod.default || pdfMakeMod);
      const pdfFonts = (pdfFontsMod.default || pdfFontsMod);
      pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

      const isFR = router.locale === "fr";
      const isDark = theme === "dark";
      const accent = isDark ? "#D4AF37" : "#06B6D4";   // cyan/gold
      const accent2 = isDark ? "#F6E27A" : "#34D399";  // green/amber
      const text = isDark ? "#E5E7EB" : "#374151";
      const sub = isDark ? "#A3A3A3" : "#6B7280";
      const panelBg = isDark ? "#0F172A" : "#F8FAFC";

      // Chip style for PDF: add lineHeight for vertical centering
      const pill = (label) => ({
        text: label,
        color: "#0F172A",
        background: isDark ? accent2 : "#E0F2FE",
        margin: [0, 1, 4, 1],
        fontSize: 9,
        lineHeight: 1,
        padding: 2,
      });

      // Left column stack
      const leftStack = [
        { text: isFR ? "Contact" : "Contact", style: "leftH" },
        { text: t("cvEmail"), style: "contact" },
        { text: t("cvPhone"), style: "contact" },
        { text: t("cvLocation"), style: "contact", margin: [0, 1, 0, 6] },

        { text: isFR ? "Langues" : "Languages", style: "leftH", margin: [0, 6, 0, 4] },
        ...[
          { label: t("cvLanguage1"), level: t("cvLanguage1Level") },
          { label: t("cvLanguage2"), level: t("cvLanguage2Level") },
        ].map((l) => ({
          stack: [
            {
              columns: [
                { text: l.label, fontSize: 9, color: text },
                { text: l.level, alignment: "right", fontSize: 8, color: sub },
              ],
            },
            {
              canvas: [
                { type: "rect", x: 0, y: 0, w: 150, h: 3, color: isDark ? "#1F2937" : "#E5E7EB" },
                {
                  type: "rect",
                  x: 0,
                  y: 0,
                  w: (l.level?.toLowerCase().includes("native") ? 0.98 : 0.85) * 150,
                  h: 3,
                  color: accent,
                },
              ],
              margin: [0, 2, 0, 4],
            },
          ],
        })),

        { text: t("cvSkillsTitle"), style: "leftH", margin: [0, 8, 0, 4] },
        { columns: skills.map((s) => pill(s)) },

        tools.length
          ? { text: t("cvToolsTitle", { defaultValue: isFR ? "Outils" : "Tools" }), style: "leftH", margin: [0, 8, 0, 4] }
          : null,
        tools.length ? { columns: tools.map((s) => pill(s)) } : null,

        hobbies.length
          ? { text: t("cvHobbiesTitle", { defaultValue: isFR ? "Passions & Activités" : "Hobbies" }), style: "leftH", margin: [0, 8, 0, 4] }
          : null,
        hobbies.length ? { columns: hobbies.map((s) => pill(s)) } : null,

        { text: t("cvCertificationsTitle"), style: "leftH", margin: [0, 8, 0, 4] },
        { text: `${t("cvCert1")} ${t("cvCert1Date", { defaultValue: "" }) ? `(${t("cvCert1Date")})` : ""}`, fontSize: 8, color: text },
      ].filter(Boolean);

      const expBlocks = experiences
        .filter((e) => e?.title || e?.company || e?.description)
        .map((e) => ({
          stack: [
            {
              columns: [
                { text: e.title, bold: true, fontSize: 10, color: text },
                { text: e.date, alignment: "right", color: sub, fontSize: 8 },
              ],
            },
            { text: e.company, color: isDark ? accent2 : "#0E7490", margin: [0, 2, 0, 2], fontSize: 9 },
            { text: e.description, color: text, fontSize: 9, lineHeight: 1.25, margin: [0, 0, 0, 4] },
            e.skills?.length ? { columns: e.skills.map((s) => pill(s)) } : null,
            {
              canvas: [{ type: "line", x1: 0, y1: 0, x2: 330, y2: 0, lineWidth: 0.5, lineColor: isDark ? "#1F2937" : "#E5E7EB" }],
              margin: [0, 6, 0, 6],
            },
          ].filter(Boolean),
        }));

      const eduBlocks = education
        .filter((ed) => ed?.title || ed?.school)
        .map((ed, idx) => ({
          stack: [
            {
              columns: [
                { text: ed.title, bold: true, fontSize: 10, color: text },
                { text: ed.date, alignment: "right", color: sub, fontSize: 8 },
              ],
            },
            { text: ed.school, color: sub, fontSize: 8, margin: [0, 2, 0, idx === education.length - 1 ? 0 : 6] },
          ],
        }));

      const docDefinition = {
        pageSize: "A4",
        pageMargins: [16, 22, 16, 20],
        content: [
          // Header
          {
            columns: [
              { text: t("cvName"), style: "name" },
              { text: t("cvJobTitle"), style: "title", alignment: "right" },
            ],
            margin: [0, 0, 0, 6],
          },
          {
            canvas: [
              { type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: isDark ? "#1F2937" : "#E5E7EB" },
              { type: "line", x1: 0, y1: 2, x2: 110, y2: 2, lineWidth: 3, lineColor: accent },
            ],
            margin: [0, 2, 0, 10],
          },

          // Body
          {
            columns: [
              {
                width: "34%",
                table: { widths: ["*"], body: [[{ stack: leftStack }]] },
                layout: {
                  fillColor: () => panelBg,
                  paddingLeft: () => 10,
                  paddingRight: () => 10,
                  paddingTop: () => 10,
                  paddingBottom: () => 10,
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                },
              },
              {
                width: "66%",
                stack: [
                  t("cvSummary", { defaultValue: "" })
                    ? {
                        stack: [
                          { text: t("cvAboutMeTitle", { defaultValue: isFR ? "Profil" : "Profile" }), style: "sectionH" },
                          { text: t("cvSummary"), fontSize: 9, color: text, lineHeight: 1.25, margin: [0, 0, 0, 8] },
                        ],
                      }
                    : null,
                  { text: t("cvExperienceTitle"), style: "sectionH" },
                  ...expBlocks,
                  { text: t("cvEducationTitle"), style: "sectionH", margin: [0, 4, 0, 0] },
                  ...eduBlocks,
                ].filter(Boolean),
              },
            ],
            columnGap: 12,
          },
        ],
        defaultStyle: { color: text, fontSize: 9 },
        styles: {
          name: { fontSize: 18, bold: true, color: isDark ? "#FFFFFF" : "#0F172A" },
          title: { fontSize: 9, color: sub },
          sectionH: { fontSize: 11, bold: true, margin: [0, 0, 0, 4], decoration: "underline", decorationColor: accent },
          leftH: { fontSize: 11, bold: true, color: accent, margin: [0, 0, 0, 4] },
          contact: { fontSize: 8, color: text, margin: [0, 1, 0, 1], lineHeight: 1.35 },
        },
      };

      pdfMake.createPdf(docDefinition).download(`${t("cvName") || "cv"}.pdf`);
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setExporting(false);
    }
  };

  const handleBack = () => {
    const locale = router.locale === "fr" ? "fr" : "en";
    const target = `https://benjaminpayet.vercel.app/${locale}`;
    setLeaving(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = target;
      } else {
        router.push(`/${locale}`);
      }
    }, 200);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    const next = router.locale === "fr" ? "en" : "fr";
    setLanguage(next === "fr" ? "FR" : "EN");
    router.push(router.pathname, router.asPath, { locale: next });
  };

  const goToProjects = () => {
    const locale = router.locale === "fr" ? "fr" : "en";
    const url = `https://benjaminpayet.vercel.app/${locale}/works`;
    if (typeof window !== "undefined") window.location.href = url;
  };

  // Floating Projects pill positioning: biased closer to screen right edge
  const [projOffsetRight, setProjOffsetRight] = useState(24);
  const updateProjectsOffset = () => {
    if (typeof window === "undefined" || !cvRef.current) return;
    const rect = cvRef.current.getBoundingClientRect();
    const gap = Math.max(0, window.innerWidth - rect.right); // space between CV and screen right
    // Place the button closer to the screen edge (20% of gap), keep a small min margin
    const offset = Math.max(12, gap * 0.2);
    setProjOffsetRight(offset);
  };
  useEffect(() => {
    updateProjectsOffset();
    const onResize = () => updateProjectsOffset();
    const onScroll = () => updateProjectsOffset();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(updateProjectsOffset, 80); // after initial paint/fonts
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterReady]);

  return (
    <div className="print-container min-h-screen w-full bg-gray-100 dark:bg-color-980 py-12 print:bg-white">
      {/* Floating toolbar: Back + Theme + Lang + Export (desktop only) */}
      <div className="no-print hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 flex-wrap items-center justify-center gap-3 p-2 bg-white/70 dark:bg-color-970/70 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-color-990">
        <button
          onClick={handleBack}
          className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-color-990 px-4 py-2 rounded-full text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5252]/60"
          aria-label={t('back') || 'Back'}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          {t('back') || 'Back'}
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-color-990 px-3 py-2 rounded-full text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5252]/60"
          aria-label="Toggle theme"
          title="Theme"
        >
          {/* Sun/Moon glyph */}
          {theme === "dark" ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zm10.48 0l1.8-1.79 1.79 1.79-1.79 1.8-1.8-1.8zM12 5a7 7 0 100 14 7 7 0 000-14zm0-5h-1v3h1V0zm0 24h-1v-3h1v3zM4 13H1v-1h3v1zm19 0h-3v-1h3v1zM6.76 19.16l-1.8 1.8-1.79-1.8 1.79-1.79 1.8 1.79zm12.28 0l1.79 1.8-1.79 1.8-1.8-1.8 1.8-1.8z"/></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          )}
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-color-990 px-4 py-2 rounded-full text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5252]/60"
          aria-label="Toggle language"
          title="Language"
        >
          {language === "EN" ? "FR" : "EN"}
        </button>

        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className={`flex items-center px-4 py-2 rounded-full text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 text-white ${
            exporting
              ? 'bg-cyan-500/60 dark:bg-amber-400/60 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#06B6D4] to-[#34D399] dark:from-[#D4AF37] dark:to-[#F6E27A] hover:opacity-95'
          }`}
          aria-label={t('exportPDF') || 'Export to PDF'}
          title={t('exportPDF') || 'Export to PDF'}
        >
          {exporting ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"></path>
            </svg>
          ) : (
            <DownloadIcon className="w-5 h-5 mr-2" />
          )}
          {exporting ? t('exporting', { defaultValue: 'Exporting…' }) : (t('exportPDF') || 'Export to PDF')}
        </button>
      </div>

      {/* Mobile header (Back + Projects + Theme + Lang + Export) */}
      <div className="no-print md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex items-center justify-between gap-1 px-2 py-1 bg-white/80 dark:bg-color-970/80 backdrop-blur border-b border-gray-200 dark:border-color-990">
          <button
            onClick={handleBack}
            className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white px-2 py-1 rounded-full text-xs shadow-sm"
            aria-label={t('back') || 'Back'}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            {t('back') || 'Back'}
          </button>

          <button
            onClick={goToProjects}
            className="attention-pulse-30s flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white shadow bg-gradient-to-r from-[#F59E0B] to-[#F97316] dark:from-[#FB923C] dark:to-[#F59E0B]"
            aria-label={router.locale === 'fr' ? 'Voir les projets' : 'View Projects'}
            title={router.locale === 'fr' ? 'Voir les projets' : 'View Projects'}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6m0 0v6m0-6l-8 8M7 17h0"/>
            </svg>
            {router.locale === 'fr' ? 'Projets' : 'Projects'}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white px-2 py-1 rounded-full text-xs shadow-sm"
              aria-label="Toggle theme"
              title="Theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zm10.48 0l1.8-1.79 1.79 1.79-1.79 1.8-1.8-1.8zM12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center bg-white dark:bg-color-970 border border-gray-200 dark:border-color-990 text-gray-700 dark:text-white px-2 py-1 rounded-full text-xs shadow-sm"
              aria-label="Toggle language"
              title="Language"
            >
              {language === "EN" ? "FR" : "EN"}
            </button>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className={`flex items-center px-3 py-1 rounded-full text-xs text-white shadow ${exporting ? 'bg-cyan-500/60 dark:bg-amber-400/60' : 'bg-gradient-to-r from-[#06B6D4] to-[#34D399] dark:from-[#D4AF37] dark:to-[#F6E27A]'}`}
              aria-label={t('exportPDF') || 'Export to PDF'}
              title={t('exportPDF') || 'Export to PDF'}
            >
              {exporting ? (
                <svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              {t('exportPDF') || 'Export'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Projects pill (desktop), aligned with header */}
      <div
        className="no-print hidden md:block fixed top-6 z-50"
        style={{ right: projOffsetRight }}
      >
        <button
          type="button"
          onClick={goToProjects}
          className="attention-pulse-30s flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] dark:from-[#FB923C] dark:to-[#F59E0B] hover:opacity-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
          aria-label={router.locale === 'fr' ? 'Voir les projets' : 'View Projects'}
          title={router.locale === 'fr' ? 'Voir les projets' : 'View Projects'}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6m0 0v6m0-6l-8 8M7 17h0"/>
          </svg>
          {router.locale === 'fr' ? 'Projets' : 'Projects'}
        </button>
      </div>

      <div
        id="cv-print-area"
        ref={cvRef}
        className={`mt-32 mx-auto relative aos-instant bg-white dark:bg-color-970 shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none transition-all duration-300 ease-out ${leaving ? 'opacity-0 translate-y-2' : enterReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        style={{ width: 'min(280mm, 94.5vw)' }}
      >
        {/* Decorative background (theme-aware lines: teal in light, gold in dark) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
          <svg className="absolute -top-24 -left-24 w-[220mm] h-[220mm] opacity-20 print:opacity-25 text-cyan-400 dark:text-amber-300" viewBox="0 0 100 100" fill="none">
            <path d="M0 20 C20 10, 40 30, 60 20 S100 30, 100 20" stroke="currentColor" strokeWidth="0.6" fill="none"/>
            <path d="M0 30 C20 20, 40 40, 60 30 S100 40, 100 30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7"/>
            <path d="M0 40 C20 30, 40 50, 60 40 S100 50, 100 40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4"/>
          </svg>
          <svg className="absolute -bottom-28 -right-24 w-[200mm] h-[200mm] opacity-20 print:opacity-25 text-cyan-300 dark:text-amber-200" viewBox="0 0 100 100" fill="none">
            <path d="M0 60 C15 55, 35 65, 50 60 S85 65, 100 60" stroke="currentColor" strokeWidth="0.6" fill="none"/>
            <path d="M0 70 C15 65, 35 75, 50 70 S85 75, 100 70" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7"/>
            <path d="M0 80 C15 75, 35 85, 50 80 S85 85, 100 80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4"/>
          </svg>
        </div>


        {/* Body */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12">
          {/* Sidebar */}
          <aside
            className="md:col-span-4 bg-slate-800 text-slate-100 dark:bg-color-980 dark:text-gray-200"
            data-aos="fade-right"
          >
            <div className="text-center bg-gray-100 dark:bg-color-970/50 pt-10 pb-8 relative overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 w-52 h-52 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="avatar-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#9CA3AF" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#avatar-dots)" />
                  </svg>
                </div>
                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-white dark:ring-color-990 shadow-xl image-container">
                  <Image
                    src="/images/about/avatar.jpg"
                    alt={t('cvName')}
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 tracking-wide">
                {t("cvName")}
              </h1>
              <p className="text-lg text-[#FA5252] mt-1 font-semibold">
                {t("cvJobTitle")}
              </p>
            </div>

            <div className="p-7 space-y-6">
              <SidebarSection title="Contact">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center py-0.5">
                    <MailIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="truncate leading-[1.35]">{t("cvEmail")}</span>
                  </div>
                  <div className="flex items-center py-0.5">
                    <PhoneIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="truncate leading-[1.35]">{t("cvPhone")}</span>
                  </div>
                  <div className="flex items-center py-0.5">
                    <LocationIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="truncate leading-[1.35]">{t("cvLocation")}</span>
                  </div>
                </div>
              </SidebarSection>

              <SidebarSection title={t("cvLanguagesTitle")}>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between">
                      <span className="font-medium">{t("cvLanguage1")}</span>
                      <span className="text-[10px] opacity-80">{t("cvLanguage1Level")}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full overflow-hidden bg-white/20 dark:bg-white/10">
                      <div className="h-full bg-white/80 dark:bg-white" style={{ width: '98%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="font-medium">{t("cvLanguage2")}</span>
                      <span className="text-[10px] opacity-80">{t("cvLanguage2Level")}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full overflow-hidden bg-white/20 dark:bg-white/10">
                      <div className="h-full bg-white/80 dark:bg-white" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </SidebarSection>

              <SidebarSection title={t("cvSkillsTitle")}>
                <ul className="space-y-1.5 text-xs">
                  {skills.map((s, i) => (
                    <li key={i} className="flex items-center">
                      <CheckIcon className="w-4 h-4 mr-2 text-[#FA5252]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              {tools.length > 0 && (
                <SidebarSection title={t("cvToolsTitle", { defaultValue: "Logiciels" })}>
                  <div className="flex flex-wrap gap-1">
                    {tools.map((tool, i) => (
                      <span key={i} className="inline-flex h-5 items-center justify-center px-2 leading-none text-[10px] rounded-full bg-gray-200/80 dark:bg-white/10 text-gray-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </SidebarSection>
              )}

              {hobbies.length > 0 && (
                <SidebarSection title={t("cvHobbiesTitle", { defaultValue: "Passions & Activités" })}>
                  <ul className="space-y-2 text-xs">
                    {hobbies.map((h, i) => (
                       <li key={i} className="flex items-center">
                         <HeartIcon className="w-4 h-4 mr-2 text-[#DD2476]" />
                         <span>{h}</span>
                       </li>
                    ))}
                  </ul>
                </SidebarSection>
              )}

              <SidebarSection title={t("cvCertificationsTitle")}>
                <ul className="text-xs space-y-2">
                  <li className="flex items-center">
                    <Badge className="w-5 h-5 mr-2" />
                    <div>
                      <span className="font-semibold">{t("cvCert1")}</span>
                      {t("cvCert1Date", { defaultValue: "" }) && (
                        <span className="ml-2 opacity-80 text-xs">({t("cvCert1Date")})</span>
                      )}
                    </div>
                  </li>
                </ul>
              </SidebarSection>
            </div>
          </aside>

          {/* Main content */}
          <main className="md:col-span-8 p-5 md:p-7 text-gray-700 dark:text-gray-300">
            {/* Header (Name + Title) */}
            <div className="mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 flex items-end justify-between">
              <h1 className="text-2xl font-extrabold tracking-wide text-slate-800 dark:text-white">{t("cvName")}</h1>
              <span className="text-xs md:text-sm uppercase tracking-wider text-slate-500 dark:text-gray-400">{t("cvJobTitle")}</span>
            </div>
            {t("cvSummary", { defaultValue: "" }) ? (
                <div className="mb-8" data-aos="fade-up">
                  <SectionTitle>{t("cvAboutMeTitle", { defaultValue: "À propos de moi"})}</SectionTitle>
                  <p className="text-base text-gray-600 dark:text-color-910 leading-relaxed">
                    {t("cvSummary")}
                  </p>
                </div>
              ) : null}

            <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
              <SectionTitle>{t("cvExperienceTitle")}</SectionTitle>
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-md font-medium mb-2 text-cyan-700 dark:text-amber-300">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.skills?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {exp.skills.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex h-5 items-center justify-center px-2 leading-none text-[10px] rounded-full bg-[#FFF4F4] dark:bg-color-980 text-[#FA5252] dark:text-[#FF6464] border border-[#ffd1d1] dark:border-color-990"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8" data-aos="fade-up" data-aos-delay="150">
              <SectionTitle>{t("cvEducationTitle")}</SectionTitle>
              <div className="space-y-6">
                {education.map((ed, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {ed.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        {ed.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {ed.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects moved to dedicated page (see floating button on right) */}
          </main>
        </div>
      </div>

      {/* Print & export specific styles */}
      <style jsx global>{`
        /* Subtle attention animation for the Projects button: two quick pulses every 30s */
        @keyframes attentionPulse30s {
          0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.0); }
          1.5% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(249, 115, 22, 0.15); }
          3%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.0); }
          4.5% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(249, 115, 22, 0.12); }
          6%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.0); }
        }
        .attention-pulse-30s {
          animation: attentionPulse30s 30s ease-in-out infinite;
          will-change: transform, box-shadow;
        }

        /* Disable AOS scroll-in effects within this CV: render immediately */
        .aos-instant [data-aos] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }

        /* Keep avatar stable during export */
        #cv-print-area.exporting .image-container img {
          object-fit: cover !important;
        }

        /* Screen adjustments so A4 width never overflows viewport */
        @media screen {
          #cv-print-area {
            /* Slightly wider on desktop to visually match PDF */
            width: min(220mm, 99vw);
            height: auto;
          }
        }

        @media print {
          html, body {
            /* Keep colors and slightly shrink layout to force single page */
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: inherit !important;
            width: 210mm !important;
            height: 297mm !important;
            zoom: 0.96;
          }
          .no-print {
            display: none !important;
          }
          /* Ensure only CV is printed */
          body > *:not(.print-container) {
            display: none !important;
          }
          .print-container {
            display: block !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          #cv-print-area {
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            border: none !important;
            overflow: hidden !important;
          }

          #cv-print-area .break-inside-avoid {
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};

/* Reusable UI bits */

const SidebarSection = ({ title, children }) => (
  <div className="break-inside-avoid">
    <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-500 dark:text-gray-400">{title}</h3>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700/50 relative">
    {children}
    <span className="absolute bottom-[-2px] left-0 w-24 h-[3px] bg-gradient-to-r from-[#06B6D4] to-[#34D399] dark:from-[#D4AF37] dark:to-[#F6E27A]" />
  </h2>
);

const LineItem = ({ label, note }) => (
  <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
    <span className="font-medium">{label}</span>
    {note && <span className="text-xs text-gray-500 dark:text-gray-400">{note}</span>}
  </div>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const HeartIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Badge = ({ className = "" }) => (
  <svg
    className={`text-[#FA5252] ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default OnlineCV;