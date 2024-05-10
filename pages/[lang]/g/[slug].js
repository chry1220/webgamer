import { useRouter } from "next/router";
import { getAllGamesData, getGamePageData } from "../../../lib/pages";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";
import clsx from "clsx";
import ImageTilt from "../../../components/TiltComponent/ImageTilt";
import { ThemeProvider } from "@material-tailwind/react";

import {
    Drawer,
    Button,
    IconButton,
    Dialog,
    Input,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import MyContext from "../../../components/MyContext";
import { SlideFade } from "@chakra-ui/react";
export default function Game({ pageData, allGamesData }) {
    const theme = {
        dialog: {
            styles: {
                base: {
                    backdrop: {
                        backgroundColor: 'bg-white',
                        backgroundOpacity: "bg-opacity-10",
                        backdropFilter: "backdrop-blur-none"
                    }
                }
            }
        },
    }
    const gameData = pageData.game;
    const [favs, setFavs] = useState([]);
    const [playing, setPlaying] = useState(true);
    const [openImg, setOpenImg] = useState(false);
    const [openImg1, setOpenImg1] = useState(false);
    const [expand, setExpand] = useState(false);
    const [openClose, setOpenClose] = useState(false);
    const handleCloseGame = () => {
        handleOpenClose();
        handlePlaying();
    }
    const handleOpenClose = () => { setOpenClose((cur) => !cur) };
    const handleExpand = () => setExpand((cur) => !cur);
    const handlePlaying = () => setPlaying((cur) => !cur);
    const handleOpenImg = () => { setOpenImg((cur) => !cur) };
    const handleOpenImg1 = () => { setOpenImg1((cur) => !cur) };
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        let temp = []
        if (storedData) temp = storedData.split(',');
        setFavs(temp)
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
    }
    let instructions = [];
    if (gameData.instructions) {
        instructions = gameData.instructions.split("-");
        instructions.shift()
    }
    return (
        <>
            {
                expand ?
                    <iframe
                        title={gameData.name}
                        src={gameData.externalPlayUrl}
                        className='absolute w-full h-full'
                        allow="fullscreen; allow-orientation-lock; autoplay; camera; midi; gyroscope; accelerometer; monetization; clipboard-read; clipboard-write; xr; xr-spatial-tracking; gamepad; geolocation; microphone; cross-origin-isolated; focus-without-user-activation *; keyboard-map *; payment; screen-wake-lock"
                    /> :
                    <MyContext.Provider value={favs}>
                        <Layout pageData={pageData} allGamesData={allGamesData}>
                            <ThemeProvider value={theme}>
                                <Dialog
                                    size="xs"
                                    open={openClose}
                                    handler={handleOpenClose}
                                    className='bg-[#181818] p-3 fixed top-11'
                                >
                                    <DialogBody className='p-2 text-white text-sm'>
                                        {pageData.pageTr["You will lose your progress. Close the game?"]}
                                    </DialogBody>
                                    <DialogFooter className='p-0'>
                                        <Button className='py-2 px-3 mx-1 text-xs' variant="text" color="white" onClick={handleOpenClose} >
                                            cancel
                                        </Button>
                                        <Button className='py-2 px-3 mx-1 text-xs bg-[#C53030] hover:bg-[#9B2C2C] ' variant="text" color="white" onClick={handleCloseGame} >
                                            Close
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </ThemeProvider>
                            <div className="bg-[#181818] ">
                                <SlideFade in={true} offsetY='20px'>
                                    <div className="max-w-screen-xl mx-auto mt-14 mb-3 p-3">
                                        <div className="grid xl:grid-cols-4 gap-10">
                                            <div className="xl:col-span-3 text-white">
                                                <div className="md:flex md:justify-between pb-4">
                                                    <div className="justify-start text-4xl text-center p-3 md:p-0">{gameData.name}</div>
                                                    <div className="justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#ffa500] px-2 py-2 hover:bg-gray-900"
                                                            onClick={toggleToFavorite}
                                                        >
                                                            {
                                                                favs.includes(gameData.slug) ?
                                                                    <i className="fa-solid fa-star"></i> :
                                                                    <i className="fa-regular fa-star"></i>
                                                            }
                                                        </button>
                                                        {
                                                            playing ?
                                                                <>
                                                                    <button type="button" className="text-white bg-gray-700 font-medium rounded-md text-sm px-4 py-2 mx-1 text-center" onClick={handleExpand}>
                                                                        <i className="fa-solid fa-maximize pr-3"></i>
                                                                        {pageData.pageTr["Expand"]}
                                                                    </button>
                                                                    <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center" onClick={handleExpand}>
                                                                        <i className="fa-solid fa-expand pr-3"></i>
                                                                        {pageData.pageTr["Fullscreen"]}
                                                                    </button>
                                                                    <button type="button" className="text-white bg-transparent font-medium text-sm px-4 py-2 mx-1 text-center" onClick={handleOpenClose}>
                                                                        <i className="fa-solid fa-close pr-3"></i>
                                                                        {pageData.pageTr["Close"]}
                                                                    </button>
                                                                </> :
                                                                <>
                                                                    <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center" onClick={handlePlaying}>
                                                                        <i className="fa-solid fa-expand pr-3"></i>
                                                                        {pageData.pageTr["Play"]}
                                                                    </button>
                                                                    <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center" onClick={handlePlaying}>
                                                                        <i className="fa-solid fa-expand pr-3"></i>
                                                                        {pageData.pageTr["Play fullscreen"]}
                                                                    </button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>

                                                {
                                                    playing ?
                                                        <iframe
                                                            title={gameData.name}
                                                            src={gameData.externalPlayUrl}
                                                            className='w-full aspect-w-16 aspect-h-9 rounded-lg'
                                                            allow="fullscreen; allow-orientation-lock; autoplay; camera; midi; gyroscope; accelerometer; monetization; clipboard-read; clipboard-write; xr; xr-spatial-tracking; gamepad; geolocation; microphone; cross-origin-isolated; focus-without-user-activation *; keyboard-map *; payment; screen-wake-lock"
                                                        /> :
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div
                                                                className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                                                                onClick={handleOpenImg}
                                                            >
                                                                <img
                                                                    alt="nature"
                                                                    className="h-full w-full object-cover object-center rounded-lg"
                                                                    src={`https://webgamer.io/games/${gameData.slug}/${gameData.slug}.480x.85pc.webp`}
                                                                />
                                                            </div>
                                                            <div
                                                                className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                                                                onClick={handleOpenImg1}
                                                            >
                                                                <img
                                                                    alt="nature"
                                                                    className="h-full w-full object-cover object-center rounded-lg"
                                                                    src={`https://webgamer.io/games/${gameData.slug}/${gameData.slug}-1.480x.85pc.webp`}
                                                                />
                                                            </div>
                                                        </div>
                                                }
                                                <div className="grid md:grid-cols-3 gap-4 mt-6">
                                                    <div className="col-span-2">
                                                        <div className="mb-6">
                                                            {
                                                                gameData.superficialTags.map(tag => (
                                                                    <Link href={`/en/${tag.slug}`} className="border border-gray-600 text-white bg-transparent hover:bg-gray-900 rounded-full text-sm px-5 py-1 me-2 mb-2" key={tag.slug}>
                                                                        {tag.name}
                                                                    </Link>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="text-sm">{gameData.description}</div>
                                                        {
                                                            instructions.length > 0 ?
                                                                <>
                                                                    <div className="text-lg font-bold py-4">{pageData.pageTr["How to play %s?"].replace('%s', gameData.name)}</div>
                                                                    <div className="text-sm">
                                                                        <ul role="list" className="list-disc px-3">
                                                                            {
                                                                                instructions.map(ins => (
                                                                                    <li key={ins}>
                                                                                        {ins}
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </> : null
                                                        }

                                                    </div>
                                                    <div>
                                                        <div className="flex justify-end mb-3">
                                                            <button type="button" className="text-black bg-white font-medium rounded-md text-sm px-4 py-2 mx-1 text-center">
                                                                <i className="fa-solid fa-share-alt-square pr-3"></i>
                                                                {pageData.pageTr["Share"]}
                                                            </button>
                                                        </div>
                                                        <div className="md:border-l-2 md:border-gray-800 md:pl-4">
                                                            {
                                                                gameData.detailedDeveloper ?
                                                                    <div className="text-sm">{pageData.pageTr["Developer:"]} <strong>{gameData.detailedDeveloper.name}</strong></div> : null
                                                            }
                                                            {
                                                                gameData.superficialSimilars ?
                                                                    <div className="text-sm">{pageData.pageTr["Similar to:"]}
                                                                        <strong className="py-1 pl-1">
                                                                            {gameData.superficialSimilars.map(si => (si.name))}
                                                                        </strong>
                                                                    </div> : null
                                                            }

                                                            {
                                                                gameData.superficialEngine ?
                                                                    <div className="text-sm">{pageData.pageTr["Engine:"]} <strong>{gameData.superficialEngine.name}</strong></div> : null
                                                            }
                                                            <span className="font-bold text-sm px-1">
                                                                <i className="fa-solid fa-earth pr-2"></i>
                                                                Website
                                                            </span>
                                                            <span className="font-bold text-sm px-1">
                                                                <i className="fa-brands fa-discord pr-2"></i>
                                                                Discord
                                                            </span>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-black rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-1 gap-3">
                                                {gameData.relatedGames.slice(0, 6).map(({ slug }) => (
                                                    <div className="rounded-lg" key={slug}>
                                                        <ImageTilt slug={slug} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black px-6 py-3">
                                        <div className="max-w-screen-xl mx-auto">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                                                {gameData.relatedGames.slice(6).map(({ slug }) => (
                                                    <div className="rounded-lg" key={slug}>
                                                        <ImageTilt slug={slug} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Dialog open={openImg} handler={handleOpenImg} className="w-1024 h-669 bg-[#181818]">
                                        <DialogBody>
                                            <img
                                                alt="nature"
                                                className="w-full rounded-lg object-cover object-center"
                                                width="100%"
                                                height="100%"
                                                src={`https://webgamer.io/games/${gameData.slug}/${gameData.slug}.960x.85pc.webp`}
                                            />
                                        </DialogBody>
                                    </Dialog>
                                    <Dialog open={openImg1} handler={handleOpenImg1} className="w-1024 h-669 bg-[#181818]">
                                        <DialogBody>
                                            <img
                                                alt="nature"
                                                className="w-full rounded-lg object-cover object-center"
                                                width="100%"
                                                height="100%"
                                                src={`https://webgamer.io/games/${gameData.slug}/${gameData.slug}-1.960x.85pc.webp`}
                                            />
                                        </DialogBody>
                                    </Dialog>
                                </SlideFade>
                            </div>
                        </Layout >
                    </MyContext.Provider>
            }
        </>

    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const pageData = await getGamePageData(params.lang, params.slug);
    const allGamesData = await getAllGamesData(params.lang);
    return {
        props: {
            pageData,
            allGamesData,
        },
    };
}
