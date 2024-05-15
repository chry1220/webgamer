import Layout, { siteTitle } from '../../../components/layout';
import Link from 'next/link';
import ImageTilt from "../../../components/TiltComponent/ImageTilt";
import { Grid, GridItem, SlideFade } from '@chakra-ui/react'
import { useGlobalContext } from '../../../context';
import { useRouter } from 'next/router';
import AnimateLayout from '../../../components/AnimateLayout';
import Head from 'next/head';
export default function Home() {
    const router = useRouter();
    const { lang } = router.query;
    const { globalState } = useGlobalContext();
    const loading = (globalState.allPageData == null);
    let pageData, allGamesData = [], mainContent = null;
    if (!loading) {
        pageData = globalState.allPageData[lang].index;
        allGamesData = globalState.allPageData[lang].games.map(g => g.game);

        mainContent = (
            <Layout home pageData={pageData} allGamesData={allGamesData}>
                <Head>
                    <title>Privacy Policy 🎮 WebGamer</title>
                    <link rel="icon" href="https://webgamer.io/favicon.ico" />
                </Head>
                <AnimateLayout>
                    <div className="bg-[#181818] py-2 text-white">
                        <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                            <h1 class="chakra-heading css-1lh6x0m">Privacy Policy</h1>
                            <p class="chakra-text css-0">Last updated: April 26th, 2023</p>
                            (us, we, or our) operates the https://webgamer.io website (hereinafter referred to as the Service).
                            <p class="chakra-text css-0">This page informs you of our policies regarding the collection and use of personal data.</p>
                            <p class="chakra-text css-0">We use your data to improve the Service. By using the Service, you agree to the collection and use of your data in accordance with this policy.</p>
                            <h2 class="chakra-heading css-1jb3vzl">1. Data Collected</h2>
                            <p class="chakra-text css-0">Our website does not offer user accounts; we only collect anonymous data that cannot be traced back to you personally.</p>
                            <p class="chakra-text css-0">We may collect information on how the Service is accessed and used. This usage data may include information such as your computers IP address, approximate region and city based on that IP address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other anonymous diagnostic data.</p>
                            <p class="chakra-text css-0">This data helps us understand how users interact with our website, allowing us to improve the overall user experience.</p>
                            <h2 class="chakra-heading css-1jb3vzl">2. Third-Party Services</h2>
                            <p class="chakra-text css-0">We may use third-party services to analyze the use of our website. These third-party services have their own privacy policies addressing how they use such information, which we strongly encourage you to review. We use the following third-party services:</p>
                            <p class="chakra-text css-0"><a target="_blank" rel="noopener" class="chakra-link css-18ktbam" href="https://plausible.io/">Plausible</a> (hosted in Europe).</p>
                            <p class="chakra-text css-0"><a target="_blank" rel="noopener" class="chakra-link css-18ktbam" href="https://sentry.io/">Sentry</a> for crash reporting.</p>
                            <h2 class="chakra-heading css-1jb3vzl">3. Third-Party Games and Tracking</h2>
                            <p class="chakra-text css-0">Our website features embedded games from third-party developers, which may have their own tracking systems and data collection practices. Please be aware that we do not control or operate these third-party games and their associated tracking systems. We are not responsible for the data they collect, how they use it, or the privacy practices they employ.</p>
                            <p class="chakra-text css-0">We encourage you to review the privacy policies of these third-party games and understand their data collection and usage practices before playing the games on our website. By engaging with these third-party games, you acknowledge that any data they collect is subject to their respective privacy policies and not ours.</p>
                            <h2 class="chakra-heading css-1jb3vzl">4. Changes to This Privacy Policy</h2>
                            <p class="chakra-text css-0">We may update our Privacy Policy from time to time. You are advised to review it periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                            <h2 class="chakra-heading css-1jb3vzl">5. Contact Us</h2>
                            <p class="chakra-text css-0">If you have any questions, please contact us by email: <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>.</p>
                        </div>
                    </div>
                </AnimateLayout>
            </Layout >
        )
    }
    return mainContent;
}
