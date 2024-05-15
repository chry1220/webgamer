import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import ImageTilt from "../components/TiltComponent/ImageTilt";
import { Grid, GridItem, SlideFade } from '@chakra-ui/react'
import { useGlobalContext } from '../context';

import AnimateLayout from '../components/AnimateLayout';
import Head from 'next/head';
export default function Home() {
  const lang = "en";
  const { globalState } = useGlobalContext();
  const loading = (globalState.allPageData == null);
  let pageData, allGamesData = [], gamesData = [], mainContent = null;
  if (!loading) {
    pageData = globalState.allPageData[lang].index;
    allGamesData = globalState.allPageData[lang].games.map(g => g.game);
    gamesData = allGamesData;
    mainContent = (
      <Layout home pageData={pageData} allGamesData={allGamesData}>
        <Head>
          <title>{pageData.headTitle}</title>
          <link rel="icon" href="https://webgamer.io/favicon.ico" />
        </Head>
        <AnimateLayout>
          <div className='bg-black'>
            <div className="max-w-[1420px] mx-auto mt-14 mb-3 p-3 animate-fadeIn">
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
                  gap={3}
                >
                  {gamesData.map((datum, i) => (
                    <GridItem
                      area={i % 11 == 0 && i < 66 ? "b" + (i / 11 + 1) : ''}
                      key={datum.slug}
                      className={i % 11 == 0 && i < 66 ? "big-game relative" : 'game relative'}
                    >
                      <Link href={`/${lang}/g/${datum.slug}`} className='w-full h-full inline-block'>
                        <ImageTilt game={datum} />
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
                  gap={3}
                >
                  {gamesData.map((datum, i) => (
                    <GridItem
                      area={i % 15 == 0 ? "b" + (i / 15 + 1) : ''}
                      key={datum.slug}
                      className={i % 15 == 0 ? "big-game relative" : 'game relative'}
                    >
                      <Link href={`/${lang}/g/${datum.slug}`} className='w-full h-full inline-block'>
                        <ImageTilt game={datum} />
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
                  gap={3}
                >
                  {gamesData.map((datum, i) => (
                    <GridItem
                      area={i % 12 == 0 && i < 67 ? "b" + (i / 12 + 1) : ''}
                      key={datum.slug}
                      className={i % 12 == 0 && i < 67 ? "big-game relative" : 'game relative'}
                    >
                      <Link href={`/${lang}/g/${datum.slug}`} className='w-full h-full inline-block'>
                        <ImageTilt game={datum} />
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
                  gap={3}
                >
                  {gamesData.map((datum, i) => (
                    <GridItem
                      area={i % 6 == 0 && i < 36 ? "b" + (i / 6 + 1) : ''}
                      key={datum.slug}
                      className={i % 6 == 0 && i < 36 ? "big-game relative" : 'game relative'}
                    >
                      <Link href={`/${lang}/g/${datum.slug}`} className='w-full h-full inline-block'>
                        <ImageTilt game={datum} />
                      </Link>
                    </GridItem>
                  ))}
                </Grid>
              </div>
              <div className='hidden xsm:block mysm:hidden'>
                <div className="grid gap-2 grid-cols-2">
                  {gamesData.map((game) => (
                    <Link href={`/${lang}/g/${game.slug}`} key={game.slug} className='game'>
                      <ImageTilt game={game} />
                    </Link>
                  ))}
                </div>
              </div>
              <div className='xsm:hidden'>
                <div className="grid grid-cols-1 gap-2">
                  {gamesData.map((game) => (
                    <Link href={`/${lang}/g/${game.slug}`} key={game.slug} className='xsm-game'>
                      <ImageTilt game={game} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateLayout>
      </Layout >
    )
  }
  return mainContent;
}
