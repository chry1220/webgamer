import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllGamesData, getAllLangs, getPageData } from '../../lib/pages';
import { useState, createContext } from "react";

export async function getStaticProps({ params }) {
    const lang = params.lang;
    const allGamesData = await getAllGamesData(lang);
    const pageData = getPageData(lang);

    return {
        props: {
            lang,
            allGamesData,
            pageData
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllLangs();
    return {
        paths: paths,
        fallback: false // or 'blocking' for incremental static regeneration
    };
}

export default function Home({ allGamesData, pageData, lang }) {
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            {allGamesData.map(({ gameSlug }) => (
                <Link href={`/${lang}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                    <img className="rounded-lg" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager"></img>
                </Link>
            ))}
        </Layout>
    );
}
