import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
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
import Image from 'next/image';
import { MyIcons } from './MyIcons';
import { useRouter } from 'next/router';
import MyContext from './MyContext';
import { InitialIcons } from './InitialIcons';
export default function Navbar({ pageData, allGamesData }) {
    const parentFavs = useContext(MyContext);
    const router = useRouter();
    const tag = router.query.tag;
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchedGame, setSearchedGame] = useState([]);
    const onSearchValue = ({ target }) => {
        setSearchedGame(allGamesData.filter(g => g.gameSlug.indexOf(target.value) > -1));
    }
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        let temp = []
        if (storedData) temp = storedData.split(',');
        setFavs(temp)
    }, []);
    const handleOpenSearch = () => {
        setOpenSearch((cur) => !cur)
        setSearchedGame([]);
    };
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

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
        drawer: {
            styles: {
                base: {
                    overlay: {
                        position: "fixed",
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: 'bg-white',
                        backgroundOpacity: "bg-opacity-10",
                        backdropFilter: "backdrop-blur-none"
                    }
                }
            }
        }
    }
    const navbarData = pageData.navTags;
    const moreTags = pageData.moreTags;
    return (
        <div>
            <div className='text-white'>
                <nav className="bg-black fixed w-full z-20 top-0 start-0 py-2">
                    <div className="max-w-[1420px] flex flex-wrap items-center justify-between mx-auto p-1">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="logo-svg rotate-icon w-7 h-7 shrink-0 inline-block align-text-bottom" viewBox="0 0 170 170" focusable="false"><path d="M159 84.86a74.14 74.14 0 1 1-148.29 0 74.14 74.14 0 0 1 148.29 0Z" fill="#666"></path><path d="M120 84.86a35.14 35.14 0 1 1-70.29 0 35.14 35.14 0 0 1 70.29 0Z" fill="#010101"></path><path d="M106 36.5C106 51.14 96.47 63 84.7 63c-11.76 0-21.3-11.86-21.3-26.5S72.95 10 84.7 10C96.47 10 106 21.86 106 36.5Z" fill="#e22"></path><path d="M106 132.5c0 14.64-9.53 26.5-21.3 26.5-11.76 0-21.3-11.86-21.3-26.5S72.95 106 84.7 106c11.77 0 21.3 11.86 21.3 26.5Z" fill="#06f"></path><path d="M63 84.5C63 99.14 51.9 111 38.2 111c-13.7 0-24.8-11.86-24.8-26.5S24.5 58 38.2 58C51.9 58 63 69.86 63 84.5Z" fill="#eb0"></path><path d="M156 84.5c0 14.64-11.1 26.5-24.8 26.5-13.7 0-24.8-11.86-24.8-26.5S117.5 58 131.2 58c13.7 0 24.8 11.86 24.8 26.5Z" fill="#0c0"></path><g fill="#010101"><path d="M84.97 168.61c-46.43 0-84.2-37.76-84.2-84.19C.78 38 38.55.23 84.98.23c46.42 0 84.19 37.77 84.19 84.2 0 46.41-37.77 84.18-84.2 84.18Zm0-154.33a70.22 70.22 0 0 0-70.14 70.14 70.22 70.22 0 0 0 70.14 70.14 70.22 70.22 0 0 0 70.14-70.14 70.22 70.22 0 0 0-70.14-70.14Z"></path><path d="M84.97 168.61c-22.64 0-34.48-42.35-34.48-84.19C50.49 42.6 62.33.23 84.97.23c22.63 0 34.47 42.36 34.47 84.2 0 41.83-11.84 84.18-34.47 84.18Zm0-154.33c-6.94 0-20.43 24.76-20.43 70.14 0 45.39 13.5 70.14 20.43 70.14s20.42-24.76 20.42-70.14c0-45.38-13.49-70.14-20.42-70.14Z"></path><path d="M84.97 118.9c-41.84 0-84.2-11.84-84.2-34.48 0-22.63 42.36-34.48 84.2-34.48 41.83 0 84.19 11.85 84.19 34.48 0 22.64-42.36 34.48-84.2 34.48Zm0-54.9c-45.38 0-70.14 13.49-70.14 20.42 0 6.93 24.76 20.43 70.14 20.43 45.38 0 70.14-13.5 70.14-20.43S130.35 64 84.97 64Z"></path></g></svg>
                            <img width="180" height="18" alt="WebGamer" src="https://webgamer.io/fonts/logo-text-spaced-optim.svg"></img>
                        </Link>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse text-xs items-center">
                            <li className='text-sm flex lg:hidden lg:justify-end text-center'>
                                <div className="flex items-center p-2 bg-transparent rounded-3xl hover:bg-gray-900 cursor-pointer" onClick={openDrawer}>
                                    <i className="fa-solid fa-bars leading-4 pr-1"></i>
                                    <span className='hidden sm:block leading-4'>{pageData.layoutTr["Categories"]}</span>
                                </div>
                            </li>
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-8 h-8" onClick={handleOpenSearch}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            {
                                (parentFavs ? parentFavs.length > 0 : favs.length > 0) ?
                                    <Link href={`/${pageData.lang}/fav`} className="text-[#ffa500] px-2 py-2 hover:bg-gray-900 rounded-full w-8 h-8 text-center">
                                        <i className="fa-solid fa-star"></i>
                                    </Link> :
                                    <button type='button' className='text-[#ffa6004a] px-2 py-2 hover:bg-gray-900 rounded-full w-8 h-8 cursor-no-drop' disabled><i className="fa-solid fa-star"></i></button>
                            }
                            <Link href={'https://discord.com/invite/6wFkdVGhvk'} type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-8 h-8">
                                <i className="fa-brands fa-discord"></i>
                            </Link>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
                            <ul className="text-sm font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-black border-gray-700">
                                {
                                    navbarData.map(({ slug, name, iconKey }) => (
                                        <li key={slug}>
                                            <Link
                                                href={
                                                    slug == tag ? `/${pageData.lang}` : `/${pageData.lang}/${slug}`
                                                }
                                                className={
                                                    slug == tag ? "block p-0 bg-transparent rounded rounded-3xl hover:bg-gray-900 px-3 py-1 border border-white" :
                                                        "block p-0 bg-transparent rounded rounded-3xl hover:bg-gray-900 px-2 py-1 "
                                                }
                                            >
                                                {/* <i className={`fa-solid mr-2 ` + MyIcons[iconKey]}></i> */}
                                                <span className='pr-1'>{InitialIcons[iconKey]}</span>
                                                {name}
                                            </Link>
                                        </li>
                                    ))
                                }
                                <li>
                                    <div className="block p-0 bg-transparent rounded cursor-pointer rounded-3xl hover:bg-gray-900 px-3 py-1" onClick={openDrawer}>
                                        <i className="fa-solid fa-bars leading-3 pr-1"></i>
                                        <span className='leading-3'>{pageData.layoutTr["More"]}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <ThemeProvider value={theme}>
                    <Dialog
                        size="xs"
                        open={openSearch}
                        handler={handleOpenSearch}
                        className='bg-[#181818] p-3 fixed top-11'
                    >
                        <DialogBody className='p-0 pb-2'>
                            <Input
                                color="white"
                                label="Search"
                                size="md"
                                onChange={onSearchValue}
                            />
                            <div className=''>
                                {searchedGame.map(game => (
                                    <Link href={`/en/g/${game.gameSlug}`} key={game.gameSlug} className='p-2 hover:bg-gray-900 cursor-pointer grid grid-cols-4 gap-4'>
                                        <img className='rounded-lg h-10' alt="" src={`https://webgamer.io/games/${game.gameSlug}/${game.gameSlug}.240x.85pc.webp`} loading="eager" />
                                        <div className='col-span-3 leading-10 text-white'>{game.pageData.game.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </DialogBody>
                        <DialogFooter className='p-0 flex justify-between text-white'>
                            <div class="flex justify-start text-sm">
                                Shortcut:
                                <span>
                                    <kbd className="border border-b-4 rounded-sm border-[#ffffff41] bg-[#ffffff0c] text-xs px-1 ml-1 leading-3">
                                        <abbr title="Control" class="ctrl-no-line">
                                            Ctrl
                                        </abbr>
                                    </kbd>
                                    <kbd class="border border-b-4 rounded-sm border-[#ffffff41] bg-[#ffffff0c] text-xs px-1 ml-1">
                                        K
                                    </kbd>
                                </span>
                            </div>
                            <Button className='py-2 px-4 text-xs flex justify-end' variant="text" color="white" onClick={handleOpenSearch} >
                                cancel
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    <Drawer
                        open={open}
                        onClose={closeDrawer}
                        placement='right'
                        size={150}
                        className="bg-black text-white"
                    >
                        <div className="flex items-center justify-between pt-2 pr-2">
                            <h1></h1>
                            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
                        </div>

                        <Link href='/' key={'all'} className="block lg:hidden pl-4 text-sm py-1.5 text-white bg-transparent rounded hover:bg-gray-900">
                            {/* <i className={`fa-solid w-7 ` + MyIcons["all"]}></i> */}
                            <span className='pr-2'>{InitialIcons["all"]}</span>
                            All
                        </Link>
                        {
                            navbarData.map(({ slug, name, iconKey }) => (
                                <Link
                                    href={
                                        slug == tag ? `/${pageData.lang}` : `/${pageData.lang}/${slug}`
                                    }
                                    key={slug}
                                    className={
                                        slug == tag ?
                                            "block lg:hidden pl-4 text-sm py-1.5 text-white rounded bg-gray-900" :
                                            "block lg:hidden pl-4 text-sm py-1.5 text-white bg-transparent rounded hover:bg-gray-900 "
                                    }
                                >
                                    <span className='pr-2'>{InitialIcons[iconKey]}</span>
                                    {name}
                                </Link>
                            ))
                        }
                        {
                            moreTags.map(({ slug, name, iconKey }) => (
                                <Link
                                    href={
                                        slug == tag ? `/${pageData.lang}` : `/${pageData.lang}/${slug}`
                                    }
                                    key={slug}
                                    className={
                                        slug == tag ?
                                            "block pl-4 text-sm py-1.5 text-white rounded bg-gray-900" :
                                            "block pl-4 text-sm py-1.5 text-white bg-transparent rounded hover:bg-gray-900"
                                    }>
                                    <span className='pr-2'>{InitialIcons[iconKey]}</span>
                                    {name}
                                </Link>
                            ))
                        }
                    </Drawer>
                </ThemeProvider>
            </div>
        </div >
    );
}
