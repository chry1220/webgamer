import Footer from './footer';
import styles from './layout.module.css';
import Navbar from './navbar';

export default function Layout({ children, home, pageData }) {
  return (
    <div className={styles.container}>
      <Navbar pageData={pageData} lang={pageData.lang}/>
      <div className={styles.mainContainer}>
        <main>{children}</main>
      </div>
      <Footer/>
    </div>
  );
}