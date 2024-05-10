import Link from "next/link";
import Layout from "../../components/layout";
import { getPageData, getGames, getAllGamesData } from "../../lib/pages";
import { MyIcons } from "../../components/MyIcons";
import ImageTilt from "../../components/TiltComponent/ImageTilt";


export default function HomeWithTag({ pageData, gamesData, allGamesData, tagSlug }) {

    let tag = pageData.navTags.find(tag => tag.slug == tagSlug) ? pageData.navTags.find(tag => tag.slug == tagSlug) : pageData.moreTags.find(tag => tag.slug == tagSlug);
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className="bg-[#181818] py-2 text-white">
                <div className="max-w-screen-xl mx-auto mt-14 mb-3 px-3">
                    <div className="text-xl font-bold pt-2 pb-3">
                        <i className={`fa-solid w-7 mr-2 ` + MyIcons[tag.iconKey]}></i>
                        {tag.name}
                    </div>
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                        {gamesData.map(({ gameSlug }) => (
                            <Link href={`/${"en"}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                                <ImageTilt slug={gameSlug}/>
                            </Link>
                        ))}
                    </div>
                </div>
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