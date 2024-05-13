import Link from "next/link";
import Layout from "../../../components/layout";
import { getPageData, getGamesWithEngine, getAllGamesData } from "../../../lib/pages";
import { MyIcons } from "../../../components/MyIcons";
import ImageTilt from "../../../components/TiltComponent/ImageTilt";
import { SlideFade } from "@chakra-ui/react";


export default function HomeWithTag({ pageData, gamesData, allGamesData, engine }) {
    
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className="bg-[#181818] py-2 text-white">

                <SlideFade in={true} offsetY='20px'>
                    <div className="max-w-screen-xl mx-auto mt-14 mb-3 px-3">
                        <div className="text-xl font-bold pt-2 pb-3">
                            {gamesData[0].pageData.pageTr["Games by %s"].replace('%s', engine)}
                        </div>
                        <div className="grid gap-2 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                            {gamesData.map(({ gameSlug }) => (
                                <Link href={`/${"en"}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                                    <ImageTilt slug={gameSlug} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </SlideFade>
            </div>
        </Layout>
    );
}


export async function getServerSideProps({ params }) {
    const pageData = await getPageData(params.lang);
    const allGamesData = await getAllGamesData(params.lang);
    const gamesData = await getGamesWithEngine(params.lang, params.engine);
    const engine = params.engine;
    return {
        props: {
            pageData,
            gamesData,
            allGamesData,
            engine,
        },
    };
}