import Layout from "../../../components/layout";
import { getAllGameIds, getGamePageData } from "../../../lib/pages";

export default function Game({ pageData }) {    
    console.log(pageData);
    return (
        <Layout pageData={pageData}>
            <div>{pageData.game.name}</div>
            <div>{pageData.game.description}</div>
            <div>
                <iframe
                    title={pageData.game.name}
                    src={pageData.game.externalPlayUrl}
                    allow="fullscreen; allow-orientation-lock; autoplay; camera; midi; gyroscope; accelerometer; monetization; clipboard-read; clipboard-write; xr; xr-spatial-tracking; gamepad; geolocation; microphone; cross-origin-isolated; focus-without-user-activation *; keyboard-map *; payment; screen-wake-lock"
                />
            </div>
        </Layout >
    );
}

export async function getStaticPaths() {
    const paths = getAllGameIds();
    return {
        paths: paths,
        fallback: false // or 'blocking' for incremental static regeneration
    };
}

export async function getStaticProps({ params }) {
    const pageData = await getGamePageData(params.lang, params.slug);
    return {
        props: {
            pageData
        },
    };
}