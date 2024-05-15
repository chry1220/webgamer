import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../../components/layout";
import { useState, useEffect } from "react";
import Image from 'next/image';
import ImageTilt from '../../../components/TiltComponent/ImageTilt';
import { Fade, SlideFade } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../../context';

export default function Home() {
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        const storedFavs = ((storedData || '').split(","));
        setFavs(storedFavs);
    }, [])


    const router = useRouter();
    const { lang } = router.query;
    const { globalState } = useGlobalContext();
    const loading = (globalState.allPageData == null);
    let pageData, allGamesData = [], mainContent = null;
    if (!loading) {
        pageData = globalState.allPageData[lang].index;
        allGamesData = globalState.allPageData[lang].games.map(g => g.game);
        mainContent = <Layout home pageData={pageData} allGamesData={allGamesData}>
            <Head>
                <title>WebGamer 🎮 Play Free Online Games</title>
                <link rel="icon" href="https://webgamer.io/favicon.ico" />
            </Head>
            <div className="bg-[#181818] py-2">
                <div className="max-w-[1280px] mx-auto mt-14 mb-3 px-3">
                    <div className="text-3xl font-bold pt-4 pb-6 text-white">
                        <i className={`fa-solid w-7 mr-6 fa-star text-[#ffa500]`}></i>
                        {pageData.layoutTr["Favorites"]}
                    </div>
                    <div className='grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'>
                        {allGamesData.filter(game => favs.includes(game.slug)).map((game) => (
                            <Link href={`/${pageData.lang}/g/${game.slug}`} className="rounded-lg relatedgame" key={game.slug}>
                                <ImageTilt game={game} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    }


    return mainContent;
}
