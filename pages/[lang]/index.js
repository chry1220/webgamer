import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllGamesData, getPageData } from '../../lib/pages';
import { useState, createContext } from "react";
import Image from 'next/image';
import { Grid, GridItem } from '@chakra-ui/react'
import ImageTilt from "../../components/TiltComponent/ImageTilt";
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
    let gamesData = allGamesData;
    return (
        <Layout home pageData={pageData} allGamesData={allGamesData}>
            <div className='bg-black'>
                <div className="max-w-screen-xl mx-auto mt-16 mb-3 p-3">
                    <div className='hidden xl:block'>
                        <Grid
                            templateAreas={
                                `".. .. .. .. b1 b1 .."
                ".. .. .. .. b1 b1 .."
                ".. b2 b2 .. .. .. .."
                ".. b2 b2 .. .. .. .."
                ".. .. .. .. b3 b3 .."
                ".. .. .. .. b3 b3 .."
                ".. b4 b4 .. .. .. .."
                ".. b4 b4 .. .. .. .."
                ".. .. .. .. b5 b5 .."
                ".. .. .. .. b5 b5 .."
                ".. b6 b6 .. .. .. .."
                ".. b6 b6 .. .. .. .."`
                            }
                            templateColumns='repeat(7, 1fr)'
                            gap={4}
                        >
                            {gamesData.map((datum, i) => (
                                <GridItem
                                    area={i % 11 == 0 ? "b" + (i / 11 + 1) : ''}
                                    key={datum.gameSlug}
                                >
                                    <Link href={`/${lang}/g/${datum.gameSlug}`}>
                                        <ImageTilt slug={datum.gameSlug} />
                                    </Link>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className='hidden lg:block xl:hidden'>
                        <Grid
                            templateAreas={
                                `".. .. .. b1 b1 .."
                  ".. .. .. b1 b1 .."
                  ".. .. .. .. .. .."
                  ".. b2 b2 .. .. .."
                  ".. b2 b2 .. .. .."
                  ".. .. .. .. .. .."
                  ".. .. .. b3 b3 .."
                  ".. .. .. b3 b3 .."
                  ".. .. .. .. .. .."
                  ".. b4 b4 .. .. .."
                  ".. b4 b4 .. .. .."
                  ".. .. .. b5 b5 .."
                  ".. .. .. b5 b5 .."
                  ".. b6 b6 .. .. .."
                  ".. b6 b6 .. .. .."`
                            }
                            templateColumns='repeat(6, 1fr)'
                            gap={4}
                        >
                            {gamesData.map((datum, i) => (
                                <GridItem
                                    area={i % 15 == 0 ? "b" + (i / 15 + 1) : ''}
                                    key={datum.gameSlug}
                                >
                                    <Link href={`/${lang}/g/${datum.gameSlug}`}>
                                        <ImageTilt slug={datum.gameSlug} />
                                    </Link>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className='hidden md:block lg:hidden'>
                        <Grid
                            templateAreas={
                                `".. .. .. b1 b1"
                  ".. .. .. b1 b1"
                  ".. .. .. .. .."
                  ".. b2 b2 .. .."
                  ".. b2 b2 .. .."
                  ".. .. .. .. .."
                  ".. .. .. b3 b3"
                  ".. .. .. b3 b3"
                  ".. .. .. .. .."
                  ".. b4 b4 .. .."
                  ".. b4 b4 .. .."
                  ".. .. .. .. .."
                  ".. .. .. b5 b5"
                  ".. .. .. b5 b5"
                  ".. .. .. .. .."
                  ".. b6 b6 .. .."
                  ".. b6 b6 .. .."`
                            }
                            templateColumns='repeat(5, 1fr)'
                            gap={4}
                        >
                            {gamesData.map((datum, i) => (
                                <GridItem
                                    area={i % 12 == 0 ? "b" + (i / 12 + 1) : ''}
                                    key={datum.gameSlug}
                                >
                                    <Link href={`/${lang}/g/${datum.gameSlug}`}>
                                        <ImageTilt slug={datum.gameSlug} />
                                    </Link>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className='hidden sm:block md:hidden'>
                        <Grid
                            templateAreas={
                                `".. .. .."
                  ".. b1 b1"
                  ".. b1 b1"
                  ".. .. .."
                  "b2 b2 .."
                  "b2 b2 .."
                  ".. .. .."
                  ".. b3 b3"
                  ".. b3 b3"
                  ".. .. .."
                  "b4 b4 .."
                  "b4 b4 .."
                  ".. .. .."
                  ".. b5 b5"
                  ".. b5 b5"
                  ".. .. .."
                  "b6 b6 .."
                  "b6 b6 .."`
                            }
                            templateColumns='repeat(3, 1fr)'
                            gap={4}
                        >
                            {gamesData.map((datum, i) => (
                                <GridItem
                                    area={i % 6 == 0 ? "b" + (i / 6 + 1) : ''}
                                    key={datum.gameSlug}
                                >
                                    <Link href={`/${lang}/g/${datum.gameSlug}`}>
                                        <ImageTilt slug={datum.gameSlug} />
                                    </Link>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className='sm:hidden'>
                        <div className="grid gap-2 grid-cols-2">
                            {gamesData.map(({ gameSlug }) => (
                                <Link href={`/${lang}/g/${gameSlug}`} key={gameSlug}>
                                    {/* <img className='rounded-lg' width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager" /> */}
                                    <ImageTilt slug={gameSlug} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}
