import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import { getAllGamesData, getPageData } from '../lib/pages';
import ImageTilt from "../components/TiltComponent/ImageTilt";
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
      <div className="px-3 max-w-screen-xl mx-auto mt-16 mb-3 grid gap-2 grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 relative">
        {gamesData.map(({ gameSlug }) => (
          <Link href={`/en/g/${gameSlug}`}  key={gameSlug}>
            {/* <img className='rounded-lg' width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager" /> */}
            <ImageTilt slug={gameSlug}/>
          </Link>
        ))}
      </div>
    </Layout >
  );
}
