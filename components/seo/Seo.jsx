import Head from "next/head";

const Seo = ({ pageTitle }) => (
  <>
    <Head>
      <title>
        {pageTitle &&
          `${pageTitle} || Portfolio Benjamin Payet}`}
      </title>
    </Head>
  </>
);

export default Seo;
