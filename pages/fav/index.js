import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllGamesData, getPageData } from '../../lib/pages';
import { useState, useEffect } from "react";
import Image from 'next/image';

export async function getStaticProps() {
    const allGamesData = getAllGamesData("en");
    const pageData = getPageData("en");

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
        console.log(storedFavs);
    }, [])

    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            {allGamesData.filter(game => favs.includes(game.gameSlug)).map(({ gameSlug }) => (
                <Link href={`/${"en"}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                    <img className="rounded-lg" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager"/>
                </Link>
            ))}
        </Layout>
    );
}
