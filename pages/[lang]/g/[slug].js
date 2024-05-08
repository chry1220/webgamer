import Link from "next/link";
import Layout from "../../../components/layout";
import { getAllGameIds, getAllGamesData, getGamePageData } from "../../../lib/pages";
import Cookies from 'js-cookie';
import clsx from 'clsx';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Game({ pageData, allGamesData }) {
    const gameData = pageData.game;
    console.log(gameData);
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('fav');
        let temp = []
        if (storedData) temp = storedData.split(',');
        setFavs(temp)
        console.log("useEffect", temp);
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
        console.log("Clicked", preFavs);
    }
    return (
        <Layout pageData={pageData} allGamesData={allGamesData}>

        </Layout >
    );
}

export async function getStaticPaths() {
    const paths = getAllGameIds();
    return {
        paths: paths,
        fallback: false // or 'blocking' for incremental static regeneration
    };
}

export async function getStaticProps({ params }) {
    const pageData = await getGamePageData(params.lang, params.slug);
    const allGamesData = await getAllGamesData(params.lang);
    return {
        props: {
            pageData,
            allGamesData
        },
    };
}