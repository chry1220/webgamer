import Link from 'next/link';
import styles from './navbar.module.css';
export default function Navbar({ pageData }) {
    const navbarData = pageData.navTags;
    const lang = pageData.lang;
    console.log(navbarData);
    return (
        <div className={styles.container}>
            <div className={styles.widthContainer}>
                {
                    navbarData.map(({ slug, name, iconKey }) => (
                        <Link href={`/${lang}/${slug}`} className={styles.item} key={slug}>{name}</Link>
                    ))
                }
            </div>
        </div>
    );
}
