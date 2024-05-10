import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import { getAllGamesData, getPageData } from '../lib/pages';
import ImageTilt from "../components/TiltComponent/ImageTilt";
import { Grid, GridItem, SlideFade } from '@chakra-ui/react'
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
  let gamesData = allGamesData;
  return (
    <Layout home pageData={pageData} allGamesData={allGamesData}>
      <div className='bg-black'>
        <div className="max-w-screen-xl mx-auto mt-16 mb-3 p-3 animate-fadeIn">

          <SlideFade in={true} offsetY='20px'>
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
                gap={2}
              >
                {gamesData.map((datum, i) => (
                  <GridItem
                    area={i % 11 == 0 ? "b" + (i / 11 + 1) : ''}
                    key={datum.gameSlug}
                  >
                    <Link href={`/en/g/${datum.gameSlug}`}>
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
                gap={3}
              >
                {gamesData.map((datum, i) => (
                  <GridItem
                    area={i % 15 == 0 ? "b" + (i / 15 + 1) : ''}
                    key={datum.gameSlug}
                  >
                    <Link href={`/en/g/${datum.gameSlug}`}>
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
                gap={3}
              >
                {gamesData.map((datum, i) => (
                  <GridItem
                    area={i % 12 == 0 ? "b" + (i / 12 + 1) : ''}
                    key={datum.gameSlug}
                  >
                    <Link href={`/en/g/${datum.gameSlug}`}>
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
                gap={3}
              >
                {gamesData.map((datum, i) => (
                  <GridItem
                    area={i % 6 == 0 ? "b" + (i / 6 + 1) : ''}
                    key={datum.gameSlug}
                  >
                    <Link href={`/en/g/${datum.gameSlug}`}>
                      <ImageTilt slug={datum.gameSlug} />
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </div>
            <div className='sm:hidden'>
              <div className="grid gap-2 grid-cols-2">
                {gamesData.map(({ gameSlug }) => (
                  <Link href={`/en/g/${gameSlug}`} key={gameSlug}>
                    <ImageTilt slug={gameSlug} />
                  </Link>
                ))}
              </div>
            </div>
          </SlideFade>
        </div>
      </div>
    </Layout >
  );
}
