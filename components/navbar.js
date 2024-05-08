import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";

import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
export default function Navbar({ pageData }) {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const drawerTheme = {
        drawer: {
            styles: {
                base: {
                    overlay: {
                        backgroundColor: 'bg-white',
                        backgroundOpacity: "bg-opacity-10",
                        backgroundBlur: 'none'
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
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <i class="fa-solid fa-trophy"></i>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">WEB GAMER</span>
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-10 h-10">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900  rounded-full w-10 h-10" onClick={onClickFavBtn}>
                                <i class="fa-solid fa-star"></i>
                            </button>
                            <button type="button" className="text-white px-2 py-2 hover:bg-gray-900 rounded-full w-10 h-10">
                                <i class="fa-brands fa-discord"></i>
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
                                        <i class="fa-solid fa-bars leading-3 pr-1"></i>
                                        <span className='leading-3'>{pageData.layoutTr["More"]}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <ThemeProvider value={drawerTheme}>
                    <Drawer
                        open={open}
                        onClose={closeDrawer}
                        placement='right'
                        size={200}
                        className="bg-black text-white"
                    >
                        <div className="flex items-center justify-between pt-4 pr-4">
                            <Typography variant="h1" color="blue-gray">

                            </Typography>
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
        </div>
    );
}
