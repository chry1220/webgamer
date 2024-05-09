import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllGamesData, getPageData } from '../../lib/pages';
import { useState, createContext } from "react";
import Image from 'next/image';

export async function getServerSideProps({ params }) {
    const lang = params.lang;
    const allGamesData = await getAllGamesData(lang);
    const pageData = await getPageData(lang);

    return {
        props: {
            lang,
            allGamesData,
            pageData
        },
    };
}


export default function Home({ allGamesData, pageData, lang }) {
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className="px-3 max-w-screen-xl mx-auto mt-16 mb-3 grid gap-2 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 relative">
                {allGamesData.map(({ gameSlug }) => (
                    <Link href={`/${lang}/g/${gameSlug}`} className="rounded-lg" key={gameSlug}>
                        <img className="rounded-lg" width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager" />
                    </Link>
                ))}
            </div>
        </Layout >
    );
}
