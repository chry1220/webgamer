import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../../components/layout";
import { getAllGamesData, getPageData } from '../../../lib/pages';
import { useState, useEffect } from "react";
import Image from 'next/image';
import ImageTilt from '../../../components/TiltComponent/ImageTilt';
import { Fade, SlideFade } from '@chakra-ui/react';


export async function getServerSideProps() {
    const allGamesData = await getAllGamesData("en");
    const pageData = await getPageData("en");

    return {
        props: {
            allGamesData,
            pageData
        },
    };
}


export default function Home({ allGamesData, pageData }) {
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        const storedFavs = ((storedData || '').split(","));
        setFavs(storedFavs);
    }, [])

    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className="bg-[#181818] py-2">
                <div className="max-w-[1280px] mx-auto mt-14 mb-3 px-3">
                    <div className="text-3xl font-bold pt-4 pb-6 text-white">
                        <i className={`fa-solid w-7 mr-6 fa-star text-[#ffa500]`}></i>
                        {pageData.layoutTr["Favorites"]}
                    </div>
                    <SlideFade in={true} offsetY='20px'>
                        <div className='grid gap-2 grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'>
                            {allGamesData.filter(game => favs.includes(game.slug)).map((game) => (
                                <Link href={`/${"en"}/g/${game.slug}`} className="rounded-lg relatedgame" key={game.slug}>
                                    <ImageTilt game={game} />
                                </Link>
                            ))}
                        </div>
                    </SlideFade>
                </div>
            </div>
        </Layout>
    );
}
