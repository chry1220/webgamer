import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../../components/layout";
import { getAllGamesData, getPageData } from '../../../lib/pages';
import { useState, useEffect } from "react";
import Image from 'next/image';
import ImageTilt from '../../../components/TiltComponent/ImageTilt';


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
                <div className="max-w-screen-xl mx-auto mt-14 mb-3 px-3">
                    <div className="text-xl font-bold pt-2 pb-3 text-[#ffa500]">
                        <i className={`fa-solid w-7 mr-2 fa-star`}></i>
                        {pageData.layoutTr["Favorites"]}
                    </div>
                    <div className='grid gap-2 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'>
                        {allGamesData.filter(game => favs.includes(game.gameSlug)).map(({ gameSlug }) => (
                            <Link href={`/${"en"}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                                <ImageTilt slug={gameSlug}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
