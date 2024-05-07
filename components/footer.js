import Link from 'next/link';
import styles from './footer.module.css';
export default function Footer({ footerData }) {
    return (
        <div className={styles.container}>
            <div className={styles.widthContainer}>
                <Link href={`/en`} className={styles.item} key="en">english</Link>
                <Link href={`/fr`} className={styles.item} key="fr">Français</Link>
            </div>
        </div>
    );
}
