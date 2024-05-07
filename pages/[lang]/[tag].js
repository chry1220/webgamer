import Link from "next/link";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import { getAllTags, getPageData, getGames } from "../../lib/pages";

export default function HomeWithTag({ pageData, gamesData }) {
    console.log(gamesData);
    return (
        <Layout home pageData={pageData}>
            {gamesData.map(({ gameSlug }) => (
                <Link href={`/en/g/${gameSlug}`} className={utilStyles.gameCard} key={gameSlug}>
                    <img className={utilStyles.gameImg} width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager"></img>
                </Link>
            ))}
        </Layout>
    );
}

export async function getStaticPaths(context) {
    const { params } = context;
    console.log("params", context);
    const paths = getAllTags("en");
    return {
        paths: paths,
        fallback: false // or 'blocking' for incremental static regeneration
    };
}

export async function getStaticProps({ params }) {
    const pageData = await getPageData(params.lang, params.slug);
    const gamesData = await getGames(params.lang, params.tag);
    // const pageData = params;
    return {
        props: {
            pageData,
            gamesData
        },
    };
}