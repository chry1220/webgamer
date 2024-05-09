import Footer from './footer';
import Navbar from './navbar';
import Head from 'next/head';

export default function Layout({ children, home, pageData, allGamesData }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Navbar pageData={pageData} lang={pageData.lang} allGamesData={allGamesData} />
      {children}
      <Footer pageData={pageData} />
    </div>
  );
}