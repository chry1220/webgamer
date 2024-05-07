import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children, home, pageData }) {
  return (
    <div>
      <Navbar pageData={pageData} lang={pageData.lang} />
      {
        home ?
          <div className="max-w-screen-lg mx-auto mt-20 mb-3 grid grid-cols-5 gap-4">
            {children}
          </div> :
          <div className="max-w-screen-lg mx-auto mt-20 mb-3">
            {children}
          </div>
      }

      <Footer pageData={pageData}/>
    </div>
  );
}