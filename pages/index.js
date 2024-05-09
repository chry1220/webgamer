import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import { getAllGamesData, getPageData } from '../lib/pages';

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
      {gamesData.map(({ gameSlug }) => (
        <Link href={`/en/g/${gameSlug}`} className="" key={gameSlug}>
          <img className='rounded-lg' width="100%" height="100%" alt="" src={`https://webgamer.io/games/${gameSlug}/${gameSlug}.240x.85pc.webp`} loading="eager"/>
        </Link>
      ))}
    </Layout>
  );
}
