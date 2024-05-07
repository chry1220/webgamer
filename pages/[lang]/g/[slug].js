import Link from "next/link";
import Layout from "../../../components/layout";
import { getAllGameIds, getGamePageData } from "../../../lib/pages";

export default function Game({ pageData }) {
    console.log(pageData);
    const gameData = pageData.game;
    return (
        <Layout pageData={pageData}>
            <div className="grid grid-cols-4 gap-10">
                <div className="col-span-3 text-white">
                    <div className="flex justify-between pb-4">
                        <div className="justify-start text-4xl">{pageData.game.name}</div>
                        <div className="justify-end">
                            <button type="button" class="text-white px-2 py-2 hover:bg-gray-900">S</button>
                            <button type="button" class="text-white bg-gray-700 font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Expand"]}</button>
                            <button type="button" class="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Fullscreen"]}</button>
                            <button type="button" class="text-white bg-transparent font-medium text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Close"]}</button>
                        </div>
                    </div>
                    <iframe
                        title={pageData.game.name}
                        src={pageData.game.externalPlayUrl}
                        className="w-full aspect-w-16 aspect-h-9"
                        allow="fullscreen; allow-orientation-lock; autoplay; camera; midi; gyroscope; accelerometer; monetization; clipboard-read; clipboard-write; xr; xr-spatial-tracking; gamepad; geolocation; microphone; cross-origin-isolated; focus-without-user-activation *; keyboard-map *; payment; screen-wake-lock"
                    />
                    <div className="flex justify-between pb-4 mt-4">
                        <div className="justify-start">
                            {
                                gameData.superficialTags.map(tag => (
                                    <Link href={`/en/${tag.slug}`} className="border border-gray-600 text-white bg-transparent hover:bg-gray-900 rounded-full text-sm px-5 py-1 me-2 mb-2" key={tag.slug}>
                                        {tag.name}
                                    </Link>
                                ))
                            }
                        </div>
                        <div className="justify-end">
                            <button type="button" class="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Share"]}</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="text-sm">{gameData.description}</div>
                            <div className="text-lg font-bold py-4">{pageData.pageTr["How to play %s?"].replace('%s', gameData.name)}</div>
                            <pre className="text-sm">{gameData.instructions}</pre>
                        </div>
                        <div className="border-l-2 border-gray-800 pl-4">
                            <div className="text-sm">{pageData.pageTr["Developer:"]} <strong>{gameData.detailedDeveloper.name}</strong></div>
                            <div className="text-sm">{pageData.pageTr["Similar to:"]}
                                <strong className="py-1">
                                    {gameData.superficialSimilars.map(si => (si.name))}
                                </strong>
                            </div>
                            <div className="text-sm">{pageData.pageTr["Engine:"]} <strong>{gameData.superficialEngine.name}</strong></div>
                            <span className="font-bold text-sm px-1">Website</span>
                            <span className="font-bold text-sm px-1">Discord</span>
                        </div>
                    </div>
                </div>
                <div>
                    {gameData.relatedGames.slice(0, 6).map(({ slug }) => (
                        <Link href={`/en/g/${slug}`} className="" key={slug}>
                            <img className="rounded-md my-3 mx-3" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`} loading="eager"></img>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {gameData.relatedGames.slice(6).map(({ slug }) => (
                    <Link href={`/en/g/${slug}`} className="" key={slug}>
                        <img className="rounded-md my-3 mx-3" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`} loading="eager"></img>
                    </Link>
                ))}
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