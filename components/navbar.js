import Link from 'next/link';
import styles from './navbar.module.css';
export default function Navbar({ navbarData }) {
    return (
        <div className={styles.container}>
            <div className={styles.widthContainer}>
                {
                    navbarData.map(({ slug, name, iconKey }) => (
                        <Link href={`/en/g/${slug}`} className={styles.item} key={slug}>{name}</Link>
                    ))
                }
            </div>
        </div>
    );
}
