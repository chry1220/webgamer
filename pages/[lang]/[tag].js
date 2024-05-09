import Link from "next/link";
import Layout from "../../components/layout";
import { getPageData, getGames, getAllGamesData } from "../../lib/pages";


export default function HomeWithTag({ pageData, gamesData, allGamesData }) {
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            {gamesData.map(({ gameSlug }) => (
                <Link href={`/en/g/${gameSlug}`} key={gameSlug}>
                    <img className="rounded-lg" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager"/>
                </Link>
            ))}
        </Layout>
    );
}


export async function getServerSideProps({ params }) {
    const pageData = await getPageData(params.lang);
    const allGamesData = await getAllGamesData(params.lang);
    const gamesData = await getGames(params.lang, params.tag);
    // const pageData = params;
    return {
        props: {
            pageData,
            gamesData,
            allGamesData
        },
    };
}