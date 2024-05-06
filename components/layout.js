import styles from './layout.module.css';
import Navbar from './navbar';

export default function Layout({ children, home, pageData }) {
  // console.log(pageData.page);
  return (
    <div className={styles.container}>
      <Navbar navbarData={pageData.navTags} />
      <div className={styles.mainContainer}>
        <main>{children}</main>
      </div>
      <footer></footer>
    </div>
  );
}
