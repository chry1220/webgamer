import Footer from './footer';
import Navbar from './navbar';
import Head from 'next/head';

export default function Layout({ children, home, pageData, toggleFavPage }) {
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
      <Navbar pageData={pageData} lang={pageData.lang} toggleFavPage={toggleFavPage} />
      {
        home ?
          <div className="max-w-screen-lg mx-auto mt-20 mb-3 grid grid-cols-5 gap-4">
            {children}
          </div> :
          <div className="max-w-screen-lg mx-auto mt-20 mb-3">
            {children}
          </div>
      }

      <Footer pageData={pageData} />
    </div>
  );
}