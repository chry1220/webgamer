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
export default function Navbar({ pageData, allGamesData, home }) {
    const parentFavs = useContext(MyContext);
    const router = useRouter();
    const tagSlug = router.query.tagSlug;
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchedGame, setSearchedGame] = useState([]);

    const onSearchValue = ({ target }) => {
        if (target.value.length < 2) {
            setSearchedGame([]);
            return;
        }
        setSearchedGame(allGamesData.filter(g => g.slug.indexOf(target.value) > -1));
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
    const closeSearch = () => setSearchedGame(false);
    const onClickHome = () => {
        router.push(`/${pageData.lang}`);
    }
    const onClickTag = (tag) => {
        closeDrawer();
        let { tagSlug, ...query } = router.query;
        if (tagSlug == null) {
            router.push(`/${pageData.lang}/${tag}`);
        } else {
            const updatedQuery = { ...query, tagSlug: tag };
            const newUrl = {
                pathname: router.pathname,
                query: updatedQuery,
            };
            router.push(newUrl);
        }
    }
    const onClickSearchGame = (gameslug) => {
        setOpenSearch((cur) => !cur);
        let { slug, ...query } = router.query;
        if (slug == null) {
            router.push(`/${pageData.lang}/g/${gameslug}`);
        } else {
            const updatedQuery = { ...query, slug: gameslug };
            const newUrl = {
                pathname: router.pathname,
                query: updatedQuery,
            };
            router.push(newUrl);
        }
    }
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
                <div className='fixed w-full top-0 z-10 bg-black py-2.5'>
                    <div className='w-full max-w-[1388px] mx-auto'>
                        <div className='flex items-center justify-between relative'>
                            <div className='flex items-center relative z-10'>
                                <div className='inline-block pt-1 pb-1 relative'>
                                    <Link href="/" className='flex items-center cursor-pointer'>
                                        {
                                            home ? null :
                                                <svg fill="currentColor" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false" className="w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z"></path></svg>
                                        }
                                        <svg xmlns="http://www.w3.org/2000/svg" className="logo-svg w-8 h-8 shrink-0 leading-4 inline-block mr-2 align-text-bottom" viewBox="0 0 170 170" focusable="false"><path d="M159 84.86a74.14 74.14 0 1 1-148.29 0 74.14 74.14 0 0 1 148.29 0Z" fill="#666"></path><path d="M120 84.86a35.14 35.14 0 1 1-70.29 0 35.14 35.14 0 0 1 70.29 0Z" fill="#010101"></path><path d="M106 36.5C106 51.14 96.47 63 84.7 63c-11.76 0-21.3-11.86-21.3-26.5S72.95 10 84.7 10C96.47 10 106 21.86 106 36.5Z" fill="#e22"></path><path d="M106 132.5c0 14.64-9.53 26.5-21.3 26.5-11.76 0-21.3-11.86-21.3-26.5S72.95 106 84.7 106c11.77 0 21.3 11.86 21.3 26.5Z" fill="#06f"></path><path d="M63 84.5C63 99.14 51.9 111 38.2 111c-13.7 0-24.8-11.86-24.8-26.5S24.5 58 38.2 58C51.9 58 63 69.86 63 84.5Z" fill="#eb0"></path><path d="M156 84.5c0 14.64-11.1 26.5-24.8 26.5-13.7 0-24.8-11.86-24.8-26.5S117.5 58 131.2 58c13.7 0 24.8 11.86 24.8 26.5Z" fill="#0c0"></path><g fill="#010101"><path d="M84.97 168.61c-46.43 0-84.2-37.76-84.2-84.19C.78 38 38.55.23 84.98.23c46.42 0 84.19 37.77 84.19 84.2 0 46.41-37.77 84.18-84.2 84.18Zm0-154.33a70.22 70.22 0 0 0-70.14 70.14 70.22 70.22 0 0 0 70.14 70.14 70.22 70.22 0 0 0 70.14-70.14 70.22 70.22 0 0 0-70.14-70.14Z"></path><path d="M84.97 168.61c-22.64 0-34.48-42.35-34.48-84.19C50.49 42.6 62.33.23 84.97.23c22.63 0 34.47 42.36 34.47 84.2 0 41.83-11.84 84.18-34.47 84.18Zm0-154.33c-6.94 0-20.43 24.76-20.43 70.14 0 45.39 13.5 70.14 20.43 70.14s20.42-24.76 20.42-70.14c0-45.38-13.49-70.14-20.42-70.14Z"></path><path d="M84.97 118.9c-41.84 0-84.2-11.84-84.2-34.48 0-22.63 42.36-34.48 84.2-34.48 41.83 0 84.19 11.85 84.19 34.48 0 22.64-42.36 34.48-84.2 34.48Zm0-54.9c-45.38 0-70.14 13.49-70.14 20.42 0 6.93 24.76 20.43 70.14 20.43 45.38 0 70.14-13.5 70.14-20.43S130.35 64 84.97 64Z"></path></g></svg>
                                        <h1 className='text-4xl leading-5'>
                                            <img width="1447" height="130" className='max-w-[180px] aspect-[19/2]' alt="WebGamer" src="https://webgamer.io/fonts/logo-text-spaced-optim.svg"></img>
                                        </h1>
                                    </Link>
                                </div>
                            </div>
                            <div className='flex items-center justify-center w-full absolute hidden xl:block'>
                                <nav className='ml-[110px] '>
                                    <ul className='flex flex-wrap justify-center list-none gap-1 p-0'>
                                        {
                                            navbarData.map(({ slug, name, iconKey }) => (
                                                <li key={slug} className='flex items-start'>
                                                    <Link
                                                        href={
                                                            slug == tagSlug ? `/${pageData.lang}` : `/${pageData.lang}/${slug}`
                                                        }
                                                        className={
                                                            slug == tagSlug ? "border hover:bg-[#0c0c0c] rounded-full h-10 min-w-10 text-base px-4 cursor-pointer inline-flex items-center justify-center relative align-middle leading-5 font-semibold" :
                                                                "hover:bg-[#0c0c0c] rounded-full h-10 min-w-10 text-base px-4 cursor-pointer inline-flex items-center justify-center relative align-middle leading-5 font-semibold"
                                                        }
                                                    >
                                                        {/* <i className={`fa-solid mr-2 ` + MyIcons[iconKey]}></i> */}
                                                        <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons[iconKey]}</span>
                                                        {name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li className='flex items-start'>
                                            <div className="h-10 min-w-10 text-base px-4 cursor-pointer inline-flex items-center justify-center relative align-middle leading-5 font-semibold" onClick={openDrawer}>
                                                <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons["more"]}</span>
                                                {pageData.layoutTr["More"]}
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='flex items-center flex-row gap-1'>
                                <button className='hover:bg-[#0c0c0c] rounded-full inline-flex items-center justify-center relative align-middle leading-5 font-semibold h-10 min-w-10 text-base xl:hidden px-4' onClick={openDrawer}>
                                    <span className='inline-flex self-center shrink-0 mr-2'>
                                        <svg fill="currentColor" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false" class="w-6 h-6 inline-block leading-4 shrink-0"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"></path></svg>
                                    </span>
                                    <span className='sm:block hidden'>Categories</span>
                                </button>
                                <button className='hover:bg-[#0c0c0c] rounded-full inline-flex items-center justify-center relative align-middle leading-5 font-semibold h-10 min-w-10 text-base px-4' onClick={handleOpenSearch}>
                                    <svg fill="currentColor" stroke-width="0" viewBox="0 0 24 24" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false" class="w-6 h-6 inline-block leading-4 shrink-0 absolute ml-px mt-0.5"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                </button>
                                {
                                    (parentFavs ? parentFavs.length > 0 : favs.length > 0) ?
                                        <Link href={`/${pageData.lang}/fav`} className='hover:bg-[#0c0c0c] rounded-full inline-flex items-center justify-center relative align-middle leading-5 font-semibold h-10 min-w-10 text-base px-4'>
                                            <svg fill="currentColor" stroke-width="0" viewBox="0 0 576 512" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false"
                                                class="w-5 h-5 inline-block leading-4 shrink-0 text-[#ffa500] absolute"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                                        </Link> :
                                        <button className='cursor-no-drop hover:bg-[#0c0c0c] rounded-full inline-flex items-center justify-center relative align-middle leading-5 font-semibold h-10 min-w-10 text-base px-4'>
                                            <svg fill="currentColor" stroke-width="0" viewBox="0 0 576 512" stroke="currentColor" height="1em" width="1em" aria-hidden="true" focusable="false"
                                                class="w-5 h-5 inline-block leading-4 shrink-0 text-[#ffa6004a] absolute"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                                        </button>
                                }
                                <Link href={"/"} className='relative'>
                                    <button className='hover:bg-[#0c0c0c] rounded-full inline-flex items-center justify-center relative align-middle leading-5 font-semibold h-10 min-w-10 text-base ps-4 pe-4'>
                                        <i className="fa-brands fa-discord absolute mt-2"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <ThemeProvider value={theme}>
                    <Dialog
                        size="xs"
                        open={openSearch}
                        handler={handleOpenSearch}
                        className='bg-[#181818] px-6 py-5 fixed top-[55px]'
                    >
                        <DialogBody className='p-0 pb-2'>
                            <Input
                                color="white"
                                label="Search"
                                size="md"
                                onChange={onSearchValue}
                            />
                            <div className='mt-2'>
                                {searchedGame.map(game => (
                                    // <Link href={`/en/g/${game.slug}`} key={game.slug} className='p-2 hover:bg-gray-900 cursor-pointer grid grid-cols-4 gap-4'>
                                    //     <img className='rounded-lg h-10' alt="" src={`https://webgamer.io/games/${game.slug}/${game.slug}.240x.85pc.webp`} loading="eager" />
                                    //     <div className='col-span-3 leading-10 text-white'>{game.name}</div>
                                    // </Link>
                                    <button onClick={() => onClickSearchGame(game.slug)} key={game.slug} className='rounded-lg p-2 hover:bg-[#2b2b2b] cursor-pointer grid grid-cols-4 gap-4 w-full'>
                                        <img className='rounded-lg h-10' alt="" src={`https://webgamer.io/games/${game.slug}/${game.slug}.240x.85pc.webp`} loading="eager" />
                                        <div className='col-span-3 leading-10 text-white text-left'>{game.name}</div>
                                    </button>
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
                        size={200}
                        className="bg-black text-white text-base font-semibold"
                    >
                        <div className="flex items-center justify-between pt-2 pr-2">
                            <h1></h1>
                            <IconButton variant="text" color="white" onClick={closeDrawer}>
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

                        <button onClick={() => onClickHome()} key={'all'} className="block xl:hidden inline-flex items-center relative align-middle leading-5 h-10 min-w-10 px-4 w-full justify-start hover:bg-[#191919]">
                            {/* <i className={`fa-solid w-7 ` + MyIcons["all"]}></i> */}
                            <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons["all"]}</span>
                            All
                        </button>
                        {
                            navbarData.map(({ slug, name, iconKey }) => (
                                <button
                                    onClick={() => onClickTag(slug)}
                                    key={slug}
                                    className={
                                        slug == tagSlug ?
                                            "block xl:hidden inline-flex items-center relative align-middle leading-5 h-10 min-w-10 px-4 w-full justify-start bg-[#191919]" :
                                            "block xl:hidden inline-flex items-center relative align-middle leading-5 h-10 min-w-10 px-4 w-full justify-start hover:bg-[#191919]"
                                    }
                                >
                                    <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons[iconKey]}</span>
                                    {name}
                                </button>
                            ))
                        }
                        {
                            moreTags.map(({ slug, name, iconKey }) => (
                                <button
                                    onClick={() => onClickTag(slug)}
                                    key={slug}
                                    className={
                                        slug == tagSlug ?
                                            "inline-flex items-center relative align-middle leading-5 h-10 min-w-10 px-4 w-full justify-start bg-[#191919]" :
                                            "inline-flex items-center relative align-middle leading-5 h-10 min-w-10 px-4 w-full justify-start hover:bg-[#191919]"
                                    }>
                                    <span className='inline-flex self-center shrink-0 mr-2'>{InitialIcons[iconKey]}</span>
                                    {name}
                                </button>
                            ))
                        }
                    </Drawer>
                </ThemeProvider>
            </div>
        </div >
    );
}
