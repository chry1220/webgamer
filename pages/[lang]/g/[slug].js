import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";
import ImageTilt from "../../../components/TiltComponent/ImageTilt";
import AnimateLayout from "../../../components/AnimateLayout";
import { DialogHeader, ThemeProvider } from "@material-tailwind/react";

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
import { InitialIcons } from "../../../components/InitialIcons";
import { useGlobalContext } from "../../../context";
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
export default function Game() {
    const router = useRouter();
    const { lang, slug } = router.query;
    const { globalState } = useGlobalContext();
    const loading = (globalState.allPageData == null);

    const [favs, setFavs] = useState([]);
    const [playing, setPlaying] = useState(true);
    const [openImg, setOpenImg] = useState(false);
    const [openImg1, setOpenImg1] = useState(false);
    const [openDeveloper, setOpenDeveloper] = useState(false);
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
    const handleOpenDeveloper = () => { setOpenDeveloper((cur) => !cur) };
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

    let pageData, gameData, allGamesData = [], mainContent = null, instructions = [];
    if (!loading) {
        pageData = globalState.allPageData[lang].games.find(g => g.game.slug == slug);
        gameData = pageData.game;
        allGamesData = globalState.allPageData[lang].games.map(g => g.game);
        if (gameData.instructions) {
            instructions = gameData.instructions.split("-");
            instructions.shift()
        }
        if (expand) {
            mainContent = (
                <iframe
                    title={gameData.name}
                    src={gameData.externalPlayUrl}
                    className='full-iframe'
                    allow="fullscreen; allow-orientation-lock; autoplay; camera; midi; gyroscope; accelerometer; monetization; clipboard-read; clipboard-write; xr; xr-spatial-tracking; gamepad; geolocation; microphone; cross-origin-isolated; focus-without-user-activation *; keyboard-map *; payment; screen-wake-lock"
                />
            )
        } else {
            mainContent = (
                <MyContext.Provider value={favs}>
                    <Layout pageData={pageData} allGamesData={allGamesData}>
                        <AnimateLayout>
                            <ThemeProvider value={theme}>
                                <Dialog
                                    size="xs"
                                    open={openClose}
                                    handler={handleOpenClose}
                                    className='bg-[#181818] pt-6 px-3 pb-4 fixed top-12'
                                >
                                    <DialogBody className='p-2 pb-6 text-white text-base'>
                                        {pageData.pageTr["You will lose your progress. Close the game?"]}
                                    </DialogBody>
                                    <DialogFooter className='p-0'>
                                        <Button className='py-3 px-4 mx-1 text-xs' variant="text" color="white" onClick={handleOpenClose} >
                                            {pageData.pageTr["Cancel"]}
                                        </Button>
                                        <Button className='py-3 px-4 mx-1 text-xs bg-[#C53030] hover:bg-[#9B2C2C] ' variant="text" color="white" onClick={handleCloseGame} >
                                            {pageData.pageTr["Close"]}
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                                <div className="bg-[#181818] ">
                                    <div className="max-w-[1280px] mx-auto mt-14 mb-3 px-3 py-6">
                                        <div className="grid xl:grid-cols-4 gap-10">
                                            <div className="xl:col-span-3 text-white">
                                                <div className="md:flex md:justify-between pb-6">
                                                    <div className="justify-start text-4xl font-bold text-center p-3 md:p-0">{gameData.name}</div>
                                                    <div className="justify-end flex items-center flex-row gap-3">
                                                        <button
                                                            type="button"
                                                            className="text-[#ffa500] px-3 py-2 hover:bg-[#2b2b2b] rounded-lg"
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
                                                                    <button type="button" className="inline-flex appearance-none items-center justify-center align-middle leading-5 font-semibold h-10 min-w-10 px-4 rounded-lg bg-[#2b2b2b] text-base" onClick={handleExpand}>
                                                                        <span className="self-center inline-flex shrink-0 mr-2">
                                                                            <svg className="inline-block w-5 h-5 leading-4 shrink-0" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                                                        </span>
                                                                        {pageData.pageTr["Expand"]}
                                                                    </button>
                                                                    <button type="button" className="text-black bg-white inline-flex appearance-none items-center justify-center align-middle leading-5 font-semibold h-10 min-w-10 px-4 rounded-lg bg-gray-700 text-base" onClick={handleExpand}>
                                                                        <span className="self-center inline-flex shrink-0 mr-2">
                                                                            <svg className="inline-block w-7 h-7 leading-4 shrink-0" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>
                                                                        </span>
                                                                        {pageData.pageTr["Fullscreen"]}
                                                                    </button>
                                                                    <button type="button" className="text-white bg-transparent font-medium text-base px-4 py-2 mx-1 text-center" onClick={handleOpenClose}>
                                                                        <i className="fa-solid fa-close pr-3"></i>
                                                                        <span className="hover:border-b">{pageData.pageTr["Close"]}</span>
                                                                    </button>
                                                                </> :
                                                                <>
                                                                    <button type="button" className="text-black bg-white font-medium rounded-md text-base px-4 py-2 mx-1 text-center" onClick={handlePlaying}>
                                                                        <i className="fa-solid fa-expand pr-3"></i>
                                                                        {pageData.pageTr["Play"]}
                                                                    </button>
                                                                    <button type="button" className="text-black bg-white font-medium rounded-md text-base px-4 py-2 mx-1 text-center" onClick={handlePlaying}>
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
                                                            className='w-full aspect-video rounded-lg'
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
                                                                    <Link href={`/en/${tag.slug}`} className="border border-gray-600 text-white bg-transparent hover:bg-gray-900 rounded-full text-base inline-flex items-center justify-center relative align-middle leading-5 min-w-8 h-8 px-3 mr-3" key={tag.slug}>
                                                                        <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons[tag.iconKey]}</span>
                                                                        {tag.name}
                                                                    </Link>
                                                                ))
                                                            }
                                                            {
                                                                gameData.players.map(player => (
                                                                    <Link href={`/en/${player.slug}`} className="border border-gray-600 text-white bg-transparent hover:bg-gray-900 rounded-full text-base inline-flex items-center justify-center relative align-middle leading-5 min-w-8 h-8 px-3 mr-3" key={player.slug}>
                                                                        <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons[player.iconKey]}</span>
                                                                        {player.label}
                                                                    </Link>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="text-base">{gameData.description}</div>
                                                        {
                                                            instructions.length > 0 ?
                                                                <>
                                                                    <div className="text-xl font-bold py-4">{pageData.pageTr["How to play %s?"].replace('%s', gameData.name)}</div>
                                                                    <div className="text-base">
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
                                                            <button type="button" className="text-black bg-white inline-flex appearance-none items-center justify-center align-middle leading-5 font-semibold h-10 min-w-10 px-4 rounded-lg bg-gray-700 text-base">
                                                                <span className="self-center inline-flex shrink-0 mr-2">
                                                                    <svg className="inline-block w-6 h-6 leading-4 shrink-0" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></svg>
                                                                </span>
                                                                {pageData.pageTr["Share"]}
                                                            </button>
                                                        </div>
                                                        <div className="md:border-l-2 md:border-gray-800 md:pl-4">
                                                            {
                                                                gameData.pokiUrl ?
                                                                    <div className="text-base flex items-center gap-1.5 pb-2">
                                                                        <div>{pageData.pageTr["Powered by"]} </div>
                                                                        <Link href={`https://poki.com/${pageData.lang}/g/${gameData.slug}`} className="inline-block">
                                                                            <img alt="Poki logo" src="https://webgamer.io/poki-white.webp" className="w-10" />
                                                                        </Link>
                                                                    </div> : null
                                                            }
                                                            {
                                                                gameData.detailedDeveloper ?
                                                                    <div className="text-base pb-2">
                                                                        {pageData.pageTr["Developer:"]}
                                                                        <span className="font-semibold hover:border-b cursor-pointer ml-1" onClick={handleOpenDeveloper}>{gameData.detailedDeveloper.name}</span>
                                                                        <Dialog
                                                                            size="lg"
                                                                            open={openDeveloper}
                                                                            handler={handleOpenDeveloper}
                                                                            className='bg-[#181818] p-3 fixed top-12'
                                                                        >
                                                                            <DialogHeader className='p-2 text-white text-base flex items-center justify-between'>
                                                                                <h1 className="text-xl">{pageData.pageTr["Games by %s"].replace('%s', gameData.detailedDeveloper.longName ? gameData.detailedDeveloper.longName : gameData.detailedDeveloper.name)}</h1>
                                                                                <IconButton variant="text" color="blue-gray" onClick={handleOpenDeveloper}>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth={2}
                                                                                        stroke="currentColor"
                                                                                        className="h-4 w-4"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="M6 18L18 6M6 6l12 12"
                                                                                        />
                                                                                    </svg>
                                                                                </IconButton>
                                                                            </DialogHeader>
                                                                            <DialogBody className='p-2 text-white text-base'>
                                                                                {
                                                                                    gameData.detailedDeveloper.url ?
                                                                                        <div className="mb-5 text-xl font-semibold">
                                                                                            <Link href={gameData.detailedDeveloper.url} className="hover:border-b">
                                                                                                {gameData.detailedDeveloper.url.replace("https://", "")}
                                                                                            </Link>
                                                                                            <svg fill="none" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false" class="w-5 h-5 inline-block shrink-0 ml-1.5 align-middle relative top-[-2px] hover:"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                                                        </div> : null
                                                                                }

                                                                                <div className="grid gap-2 grid-cols-4 relatedgame">
                                                                                    {gameData.detailedDeveloper.superficialGames.map((game) => (
                                                                                        <Link href={`/en/g/${game.slug}`} key={game.slug}>
                                                                                            <ImageTilt game={game} />
                                                                                        </Link>
                                                                                    ))}
                                                                                </div>
                                                                            </DialogBody>
                                                                            <DialogFooter className='p-0'>
                                                                                <Button className='bg-[#4a4a4a] py-2 px-3 mx-1 text-xs' variant="text" color="white" onClick={handleOpenDeveloper} >
                                                                                    Close
                                                                                </Button>
                                                                            </DialogFooter>
                                                                        </Dialog>
                                                                    </div> : null
                                                            }
                                                            {
                                                                gameData.superficialSimilars && gameData.superficialSimilars.length > 0 ?
                                                                    <div className="text-base pb-2">{pageData.pageTr["Similar to:"]}
                                                                        <span className="py-1 ml-1 font-semibold">
                                                                            {gameData.superficialSimilars.map(si => (si.name)).join(", ")}
                                                                        </span>
                                                                    </div> : null
                                                            }

                                                            {
                                                                gameData.superficialEngine ?
                                                                    <div className="text-base pb-2">{pageData.pageTr["Engine:"]}
                                                                        <Link href={`/${pageData.lang}/${gameData.superficialEngine.slug}`} className="ml-1 font-semibold hover:border-b cursor-pointer">
                                                                            {gameData.superficialEngine.name}
                                                                        </Link>
                                                                    </div> : null
                                                            }
                                                            <Link href={`${gameData.externalPlayUrl}`} className="font-semibold text-base px-1">
                                                                <i className="fa-solid fa-earth pr-2"></i>
                                                                <span className="hover:border-b cursor-pointer">Website</span>
                                                            </Link>
                                                            <Link href={`${gameData.discordUrl}`} className="font-semibold text-base px-1">
                                                                <i className="fa-brands fa-discord pr-2"></i>
                                                                <span className="hover:border-b cursor-pointer">Discord</span>
                                                            </Link>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-black rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-1 gap-3">
                                                {gameData.relatedGames.slice(0, 6).map((game) => (
                                                    <div className="rounded-lg relatedgame" key={game.slug}>
                                                        <ImageTilt game={game} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black px-6 py-3">
                                        <div className="max-w-[1280px] mx-auto">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                                                {gameData.relatedGames.slice(6).map((game) => (
                                                    <div className="rounded-lg relatedgame" key={game.slug}>
                                                        <ImageTilt game={game} />
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
                                </div>

                            </ThemeProvider>
                        </AnimateLayout>
                    </Layout >
                </MyContext.Provider>
            )
        }
    }

    return mainContent;
}
