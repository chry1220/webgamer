import Layout, { siteTitle } from "../../../components/layout";
import Link from "next/link";
import ImageTilt from "../../../components/TiltComponent/ImageTilt";
import { Grid, GridItem, SlideFade } from "@chakra-ui/react"
import { useGlobalContext } from "../../../context";
import { useRouter } from "next/router";
import AnimateLayout from "../../../components/AnimateLayout";
import Head from "next/head";
export default function Home() {
    const router = useRouter();
    const { lang } = router.query;
    const { globalState } = useGlobalContext();
    const loading = (globalState.allPageData == null);
    let pageData, allGamesData = [], mainContent = null;
    if (!loading) {
        pageData = globalState.allPageData[lang].index;
        allGamesData = globalState.allPageData[lang].games.map(g => g.game);
        
        switch (lang) {
            case "en":
                mainContent = (
                    <Layout home pageData={pageData} allGamesData={allGamesData}>
                        <Head>
                            <title>About 🎮 WebGamer</title>
                            <link rel="icon" href="https://webgamer.io/favicon.ico" />
                        </Head>
                        <AnimateLayout>
                            <div className="bg-[#181818] py-2 text-white">
                                <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                                    <div class="chakra-container css-tq74si"><h2 class="chakra-heading css-qw7hye">About WebGamer</h2><p class="chakra-text css-0">This portal showcases the most impressive and polished web games available in the browser in a consumer-friendly experience. The criteria for being listed and determining the order of the games are:</p><ul role="list" class="css-159ak93"><li class="css-0"><b>Graphics:</b> Games that are visually impressive and polished rank higher.</li><li class="css-0"><b>Performance:</b> Games that run smoothly and load fast rank higher.</li><li class="css-0"><b>Gameplay and Depth:</b> Full games with depth rank higher than demos.</li><li class="css-0"><b>Low-Friction:</b> Games with a short path to gameplay, no sign-up wall, and gentle monetization rank higher.</li></ul><p class="chakra-text css-rszk63">I can optionally host your game at: <b>games.webgamer.io/your-game</b>.</p><p class="chakra-text css-0">Games do not have to be mobile-friendly (desktop-only games are filtered out on mobile). Feel free to reach out at <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>!</p></div>
                                </div>
                            </div>
                        </AnimateLayout>
                    </Layout >
                )
                break;
            case "fr":
                mainContent = (
                    <Layout home pageData={pageData} allGamesData={allGamesData}>
                        <AnimateLayout>
                            <div className="bg-[#181818] py-2 text-white">
                                <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                                    <div class="chakra-container css-tq74si"><h2 class="chakra-heading css-qw7hye">À propos de WebGamer</h2><p class="chakra-text css-0">Ce portail présente les jeux web les plus impressionnants et les plus travaillés disponibles dans le navigateur dans une expérience agréable. Les critères pour être répertorié et déterminer l’ordre des jeux sont&nbsp;:</p><ul role="list" class="css-159ak93"><li class="css-0"><b>Graphismes :</b> Les jeux qui sont visuellement impressionnants et travaillés sont classés plus haut.</li><li class="css-0"><b>Performance :</b> Les jeux qui tournent bien et se chargent rapidement sont classés plus haut.</li><li class="css-0"><b>Gameplay et contenu :</b> Les jeux complets avec du contenu sont classés plus haut que les démos.</li><li class="css-0"><b>Faible friction :</b> Les jeux qui mènent au gameplay rapidement, sans inscription et avec une monétisation douce sont classés plus haut.</li></ul><p class="chakra-text css-rszk63">Je peux héberger votre jeu sur&nbsp;: <b>games.webgamer.io/votre-jeu</b>.</p><p class="chakra-text css-0">Les jeux n’ont pas besoin d’être adaptés aux mobiles (les jeux uniquement pour ordinateurs sont filtrés sur mobile). N’hésitez pas à me contacter à ladresse <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>!</p></div>
                                </div>
                            </div>
                        </AnimateLayout>
                    </Layout >
                )
                break;
            case "es":
                mainContent = (
                    <Layout home pageData={pageData} allGamesData={allGamesData}>
                        <AnimateLayout>
                            <div className="bg-[#181818] py-2 text-white">
                                <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                                    <div class="chakra-container css-tq74si"><h2 class="chakra-heading css-qw7hye">Acerca de WebGamer</h2><p class="chakra-text css-0">Este portal muestra los juegos web más impresionantes disponibles en el navegador en una experiencia amigable. Los criterios para ser listado y determinar el orden de los juegos son:</p><ul role="list" class="css-159ak93"><li class="css-0"><b>Gráficos:</b> Los juegos que son visualmente impresionantes y pulidos se clasifican más alto.</li><li class="css-0"><b>Rendimiento:</b> Los juegos que funcionan bien y se cargan rápidamente se clasifican más alto.</li><li class="css-0"><b>Gameplay y contenido:</b> Los juegos completos con contenido se clasifican más alto que las demos.</li><li class="css-0"><b>Baja fricción:</b> Los juegos que tienen un camino corto al gameplay, sin registro y una monetización suave se clasifican más alto.</li></ul><p class="chakra-text css-rszk63">Puedo alojar opcionalmente tu juego en: <b>games.webgamer.io/tu-juego</b>.</p><p class="chakra-text css-0">Los juegos no tienen que ser compatibles con dispositivos móviles (los juegos solo para escritorio se filtran en dispositivos móviles). No dude en contactarme en el email <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>!</p></div>
                                </div>
                            </div>
                        </AnimateLayout>
                    </Layout >
                )
                break;
            case "th":
                mainContent = (
                    <Layout home pageData={pageData} allGamesData={allGamesData}>
                        <AnimateLayout>
                            <div className="bg-[#181818] py-2 text-white">
                                <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                                    <div class="chakra-container css-tq74si"><h2 class="chakra-heading css-qw7hye">เกี่ยวกับ WebGamer</h2><p class="chakra-text css-0">พอร์ทัลนี้จะแสดงเกมเว็บที่มีคุณภาพมากที่สุดที่มีอยู่ในเบราว์เซอร์ในประสบการณ์ที่เหมาะสมกับผู้ใช้งาน คุณสมบัติที่จะถูกแสดงในรายการและการกำหนดลำดับของเกมคือ:</p><ul role="list" class="css-159ak93"><li class="css-0"><b>กราฟิก:</b> เกมที่มีกราฟิกที่น่าตื่นตาและมีคุณภาพสูงจะถูกจัดอันดับไว้ด้านบน</li><li class="css-0"><b>ประสิทธิภาพ:</b> เกมที่ทำงานได้อย่างรวดเร็วและโหลดได้เร็วจะถูกจัดอันดับไว้ด้านบน</li><li class="css-0"><b>Gameplay และเนื้อหา:</b> เกมที่มีเนื้อหาเต็มรูปแบบจะถูกจัดอันดับไว้ด้านบนกว่าเกมทดลอง</li><li class="css-0"><b>ความสะดวก:</b> เกมที่มีเส้นทางสั้นไปยัง gameplay ไม่มีกำแพงการลงทะเบียนและการเปลี่ยนเงินอย่างอ่อนโยนจะถูกจัดอันดับไว้ด้านบน</li></ul><p class="chakra-text css-rszk63">ฉันสามารถเก็บเกมของคุณได้ที่: <b>games.webgamer.io/เกมของคุณ</b>.</p><p class="chakra-text css-0">เกมไม่จำเป็นต้องเข้ากับโทรศัพท์มือถือ (เกมที่ใช้ได้เฉพาะคอมพิวเตอร์จะถูกกรองออกจากโทรศัพท์มือถือ) สามารถติดต่อได้ที่ <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>!</p></div>
                                </div>
                            </div>
                        </AnimateLayout>
                    </Layout >
                )
                break;
            case "vn":
                mainContent = (
                    <Layout home pageData={pageData} allGamesData={allGamesData}>
                        <AnimateLayout>
                            <div className="bg-[#181818] py-2 text-white">
                                <div className="max-w-[768px] mx-auto mt-20 mb-3 px-3 terms">
                                    <div class="chakra-container css-tq74si"><h2 class="chakra-heading css-qw7hye">Về WebGamer</h2><p class="chakra-text css-0">Trang web này giới thiệu những trò chơi web tuyệt vời nhất có sẵn trên trình duyệt với trải nghiệm dành cho người dùng. Các tiêu chí để được liệt kê và xếp hạng các trò chơi là:</p><ul role="list" class="css-159ak93"><li class="css-0"><b>Hình ảnh:</b> Những trò chơi có hình ảnh tuyệt vời và được làm đẹp sẽ được xếp hạng cao hơn.</li><li class="css-0"><b>Hiệu suất:</b> Những trò chơi chạy mượt mà và tải nhanh sẽ được xếp hạng cao hơn.</li><li class="css-0"><b>Gameplay và nội dung:</b> Những trò chơi đầy đủ với nội dung sẽ được xếp hạng cao hơn so với những trò chơi demo.</li><li class="css-0"><b>Ít khó khăn:</b> Những trò chơi có con đường ngắn đến gameplay, không có tường đăng ký và tiền tệ mềm mại sẽ được xếp hạng cao hơn.</li></ul><p class="chakra-text css-rszk63">Tôi có thể lưu trữ trò chơi của bạn tại: <b>games.webgamer.io/trò-chơi-của-bạn</b>.</p><p class="chakra-text css-0">Trò chơi không cần phải tương thích với thiết bị di động (những trò chơi chỉ dành cho máy tính sẽ bị lọc ra trên thiết bị di động). Hãy liên hệ với tôi tại <a class="chakra-link css-18ktbam" href="mailto:contact@webgamer.io">contact@webgamer.io</a>!</p></div>
                                </div>
                            </div>
                        </AnimateLayout>
                    </Layout >
                )
                break;
            default:
                break;
        }
    }
    return mainContent;
}
