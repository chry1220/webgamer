import Link from 'next/link';
import { useEffect, useState } from 'react';
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

export default function Navbar({ pageData, allGamesData }) {
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchedGame, setSearchedGame] = useState([]);
    const onSearchValue = ({ target }) => {
        setSearchedGame(allGamesData.filter(g => g.gameSlug.indexOf(target.value) > -1));
    }
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
    const lang = pageData.lang;
    const onClickFavBtn = () => {
    }
    return (
        <div>
            <div>
                <nav className="bg-black fixed w-full z-20 top-0 start-0">
                    <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <i className="fa-brands fa-fantasy-flight-games text-white text-2xl"></i>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">WEB GAMER</span>
                        </Link>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-10 h-10" onClick={handleOpenSearch}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <Link href={'/fav'} className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-10 h-10">
                                <i className="fa-solid fa-star"></i>
                            </Link>
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-10 h-10">
                                <i className="fa-brands fa-discord"></i>
                            </button>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-black border-gray-700">
                                {
                                    navbarData.map(({ slug, name, iconKey }) => (
                                        <li key={slug}>
                                            <Link href={`/${lang}/${slug}`} className="block p-0 text-white bg-transparent rounded ">{name}</Link>
                                        </li>
                                    ))
                                }
                                <li>
                                    <div className="block p-0 text-white bg-transparent rounded cursor-pointer" onClick={openDrawer}>
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
                        className='bg-black p-4 fixed top-16'
                    >
                        <DialogBody className='p-0 pb-2'>
                            <Input
                                color="white"
                                label="Search"
                                size="lg"
                                onChange={onSearchValue}
                            />
                            <div className='py-2'>
                                {searchedGame.map(game => (
                                    <Link href={`/en/g/${game.gameSlug}`} key={game.gameSlug} className='p-2 hover:bg-gray-900 cursor-pointer grid grid-cols-4 gap-4'>
                                        <Image className='rounded-lg h-10' alt="" src={`https://webgamer.io/games/${game.gameSlug}/${game.gameSlug}.240x.85pc.webp`} loading="eager"/>
                                        <div className='col-span-3 leading-10 text-white'>{game.pageData.game.name}</div>
                                    </Link>
                                ))}
                            </div>

                        </DialogBody>
                        <DialogFooter className='p-0'>
                            <Button className='py-2 px-4' variant="text" color="white" onClick={handleOpenSearch} >
                                cancel
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    <Drawer
                        open={open}
                        onClose={closeDrawer}
                        placement='right'
                        size={200}
                        className="bg-black text-white"
                    >
                        <div className="flex items-center justify-between pt-4 pr-4">

                            <h1></h1>
                            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </IconButton>
                        </div>
                        {
                            moreTags.map(({ slug, name, iconKey }) => (
                                <Link href={`/${lang}/${slug}`} key={slug} className="block pl-8 py-1.5 text-white bg-transparent rounded hover:bg-gray-900">{name}</Link>
                            ))
                        }
                    </Drawer>
                </ThemeProvider>
            </div>
        </div >
    );
}
