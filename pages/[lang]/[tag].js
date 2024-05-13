import Link from "next/link";
import Layout from "../../components/layout";
import { getPageData, getGames, getAllGamesData } from "../../lib/pages";
import { MyIcons } from "../../components/MyIcons";
import ImageTilt from "../../components/TiltComponent/ImageTilt";
import { SlideFade } from "@chakra-ui/react";
import { InitialIcons } from "../../components/InitialIcons";


export default function HomeWithTag({ pageData, gamesData, allGamesData, tagSlug }) {
    
    let tag = pageData.navTags.find(tag => tag.slug == tagSlug) ? pageData.navTags.find(tag => tag.slug == tagSlug) : pageData.moreTags.find(tag => tag.slug == tagSlug);
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className="bg-[#181818] py-2 text-white">

                <SlideFade in={true} offsetY='20px'>
                    <div className="max-w-[1280px] mx-auto mt-14 mb-3 px-3">
                        <div className="text-xl font-bold pt-3 pb-5 shrink-0">
                            {InitialIcons[tag.iconKey]}
                            <span className="ml-2 relative top-0.5">{tag.name} Games</span>
                        </div>
                        <div className="grid gap-3 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                            {gamesData.map((game) => (
                                <Link href={`/${"en"}/g/${game.slug}`} className="rounded-lg relatedgame" key={game.slug}>
                                    <ImageTilt game={game} />
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
    const gamesData = await getGames(params.lang, params.tag);
    const tagSlug = params.tag;
    return {
        props: {
            pageData,
            gamesData,
            allGamesData,
            tagSlug,
        },
    };
}