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
                    <title>Terms of Use 🎮 WebGamer</title>
                    <link rel="icon" href="https://webgamer.io/favicon.ico" />
                </Head>
                <AnimateLayout>
                    <div className="bg-[#181818] py-2 text-white">
                        <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                            <h1>Terms of Use</h1>
                            <p>Last updated: April 18th, 2023</p>
                            <p>Welcome to WebGamer, a web games portal (thePortal) that provides various games (theGames) for your entertainment. The Portal is operated by(us,we, orour) and is available at https://webgamer.io (theWebsite). These Terms of Use (Terms) govern your access and use of the Portal, the Games, and any related services provided by us.</p>
                            <p>Please read these Terms carefully before using the Portal. By accessing or using the Portal, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you are not authorized to access or use the Portal.</p>
                            <h2>1. Eligibility</h2>
                            <p>To access and use the Portal, you must be at least 16 years old. By accessing or using the Portal, you represent and warrant that you are 16 years of age or older. If you are under 16, you may not access or use the Portal.</p>
                            <h2>2. User Conduct</h2>
                            <p>By accessing and using the Portal, you agree not to engage in any conduct that may harm or disrupt the Portal, the Games, or other users experiences. This includes, but is not limited to:</p>
                            <ul>
                                <li>Interfering with the normal operation of the Portal or the Games;</li>
                                <li>Attempting to gain unauthorized access to the Portal, the Games, or any related systems;</li>
                                <li>Using the Portal for any commercial purposes;</li>
                                <li>Violating any applicable laws or regulations.</li>
                            </ul>
                            <h2>3. Games on the Portal</h2>
                            <p>The Games available on the Portal may be developed, provided, or hosted by third parties or by us. Regardless of the source of the Games, we are not responsible or liable for the content, quality, or any other aspect of the Games. Your use of the Games is at your own risk, and you agree to hold us harmless from any claims, losses, or damages arising from or related to your use of the Games, whether they are third-party games or games provided by the Portal itself.</p>
                            <h2>4. Intellectual Property</h2>
                            <p>The Portal, its content, and any related materials, including but not limited to the Website, graphics, logos, and text, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. This protection does not extend to the Games themselves, which are owned and controlled by their respective developers or providers. Except as expressly permitted by these Terms, you may not copy, reproduce, distribute, modify, or otherwise use the Portal, its content (excluding the Games), or any related materials without our prior written consent.</p>
                            <h2>5. Disclaimers</h2>
                            <p>The Portal and the Games are provided on anas is andas available basis. We make no representations or warranties of any kind, express or implied, regarding the Portal, the Games, or any related services. Without limiting the foregoing, we do not warrant that the Portal, the Games, or any related services will be uninterrupted, error-free, or free of viruses or other harmful components. You assume all risks related to your access and use of the Portal and the Games.</p>
                            <h2>6. Limitation of Liability</h2>
                            <p>In no event will we be liable for any direct, indirect, incidental, special, or consequential damages, including but not limited to lost profits, loss of data, or any other damages arising from or related to your access, use, or inability to use the Portal, the Games, or any related services, even if we have been advised of the possibility of such damages.</p>
                            <h2>7. Indemnification</h2>
                            <p>You agree to indemnify, defend, and hold harmless us and our affiliates from and against any and all claims, losses, liabilities, damages, expenses, and costs, including reasonable attorneys fees, arising from or related to your access or use of the Portal, the Games, or any violation of these Terms.</p>
                            <h2>8. Changes to Terms</h2>
                            <p>We reserve the right to modify these Terms at any time. Any changes to these Terms will be posted on the Portal, and it is your responsibility to review the updated Terms. By continuing to access or use the Portal after the updated Terms have been posted, you agree to be bound by the updated Terms.</p>
                            <h2>9. Governing Law and Jurisdiction</h2>
                            <p>These Terms and any disputes arising from or related to these Terms, the Portal, or the Games shall be governed by and construed in accordance with the laws of France. You and we agree to submit to the exclusive jurisdiction of the courts of France to resolve any disputes arising from or related to these Terms, the Portal, or the Games.</p>
                            <h2>10. Contact Information</h2>
                            <p>If you have any questions or concerns regarding these Terms, please contact us at <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>.</p>
                            <h2>11. Severability</h2>
                            <p>If any provision of these Terms is found to be invalid or unenforceable under applicable law, the remaining provisions of these Terms shall remain in full force and effect.</p>
                            <h2>12. Entire Agreement</h2>
                            <p>These Terms constitute the entire agreement between you and us with respect to your access and use of the Portal and the Games and supersede all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter.</p>
                        </div>
                    </div>
                </AnimateLayout>
            </Layout >
        )
    }
    return mainContent;
}
