import Link from "next/link";
import Layout from "../../../components/layout";
import { getAllGameIds, getGamePageTxt } from "../../../lib/pages";
import { useEffect, useState } from "react";

export default function Game({ pageTxt, allGamesData }) {

    const pageData = JSON.parse(pageTxt).pageProps;
    const gameData = pageData.game;

    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        let temp = []
        if (storedData) temp = storedData.split(',');
        setFavs(temp)
        console.log("useEffect", temp);
    }, []);

    const toggleToFavorite = () => {
        let preFavs = favs;
        if (favs.includes(gameData.slug)) {
            preFavs = favs.filter(fav => fav != gameData.slug);
        } else {
            preFavs = [...favs, gameData.slug]
        }
        localStorage.setItem('fav', preFavs.join(","));
        setFavs(preFavs);
        console.log("Clicked", preFavs);
    }
    return (
        <Layout pageData={pageData} allGamesData={allGamesData}>
            <div className="grid grid-cols-4 gap-10">
                <div className="col-span-3 text-white">
                    <div className="flex justify-between pb-4">
                        {/* <div className="justify-start text-4xl">{gameData["name"]}</div> */}
                        <div className="justify-end">
                            <button
                                type="button"
                                className="text-white px-2 py-2 hover:bg-gray-900"
                                onClick={toggleToFavorite}
                            >

                                {
                                    favs.includes(gameData.slug) ?
                                        <i className="fa-solid fa-star"></i> :
                                        <i className="fa-regular fa-star"></i>
                                }
                            </button>
                            <button type="button" className="text-white bg-gray-700 font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Expand"]}</button>
                            <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Fullscreen"]}</button>
                            <button type="button" className="text-white bg-transparent font-medium text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Close"]}</button>
                        </div>
                    </div>
                    <iframe
                        title={gameData.name}
                        src={gameData.externalPlayUrl}
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
                            <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">{pageData.pageTr["Share"]}</button>
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
                            <img className="rounded-md my-3 mx-3" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`} loading="eager" />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {gameData.relatedGames.slice(6).map(({ slug }) => (
                    <Link href={`/en/g/${slug}`} className="" key={slug}>
                        <img className="rounded-md my-3 mx-3" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`} loading="eager" />
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
    // const pageData = getGamePageData(params.lang, params.slug);
    const pageTxt = await getGamePageTxt(params.lang, params.slug);
    // const allGamesData = await getAllGamesData(params.lang);
    const allGamesData = "asdf";
    return {
        props: {
            pageTxt,
            allGamesData
        },
    };
}