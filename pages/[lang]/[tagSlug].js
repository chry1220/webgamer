import Link from "next/link";
import Layout from "../../components/layout";
import { MyIcons } from "../../components/MyIcons";
import ImageTilt from "../../components/TiltComponent/ImageTilt";
import { SlideFade } from "@chakra-ui/react";
import { InitialIcons } from "../../components/InitialIcons";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/router";
import AnimateLayout from "../../components/AnimateLayout";
import Head from "next/head";

const players = [
    {
        "label": "1 Player",
        "slug": "1-player",
        "iconKey": "person"
    },
    {
        "label": "Multiplayer",
        "slug": "multiplayer",
        "iconKey": "people"
    }
]

export default function HomeWithTag() {
    const router = useRouter();
    const { lang, tagSlug } = router.query;
    const { globalState } = useGlobalContext();
    const loading = (globalState.allPageData == null);

    let pageData, allGamesData = [], mainContent = null, tag, gamesData = [], subTitle, pageTitle;
    if (!loading) {
        pageData = globalState.allPageData[lang].index;
        const pageDataEn = globalState.allPageData["en"].index;
        const allGamesPageData = globalState.allPageData[lang].games;
        allGamesData = allGamesPageData.map(g => g.game);
        let pageType = "";
        allGamesData.forEach(gameData => {
            if (gameData.superficialTags.filter(stag => stag.slug == tagSlug).length > 0) {
                gamesData.push(gameData);
                pageType = "Tag";
                const iconKey = gameData.superficialTags.find(stag => stag.slug == tagSlug).iconKey;
                const gameTagName = pageDataEn.navTags.find(t => t.iconKey == iconKey) ? pageDataEn.navTags.find(t => t.iconKey == iconKey).name : pageDataEn.moreTags.find(t => t.iconKey == iconKey).name;
                pageTitle = gameTagName + " Games 🎮 Play for Free on WebGame";
            } else if (gameData.superficialEngine && gameData.superficialEngine.slug == tagSlug) {
                gamesData.push(gameData)
                pageType = "Engine";
            } else if (gameData.players && gameData.players.filter(p => p.slug == tagSlug).length > 0) {
                gamesData.push(gameData)
                pageType = "Player";
            }
        });
        switch (pageType) {
            case "Tag":
                tag = pageData.navTags.find(tag => tag.slug == tagSlug) ? pageData.navTags.find(tag => tag.slug == tagSlug) : pageData.moreTags.find(tag => tag.slug == tagSlug);
                subTitle = (
                    <>
                        {InitialIcons[tag.iconKey]}
                        <span className="ml-2 relative top-0.5">{tag.name} Games</span>
                    </>
                )
                break;
            case "Engine":
                subTitle = (
                    <>
                        {allGamesPageData[0].pageTr["Games by %s"].replace('%s', tagSlug)}
                    </>
                )
                break;
            case "Player":
                const pType = players.find(p => p.slug == tagSlug);
                subTitle = (
                    <>
                        {InitialIcons[pType.iconKey]}
                        <span className="ml-2 relative top-0.5">{pType.label} Games</span>
                    </>
                )
                break;
            default:
                break;
        }


        mainContent = (
            <Layout pageData={pageData} allGamesData={allGamesData}>
                <Head>
                    <title>{pageTitle}</title>
                    <link rel="icon" href="https://webgamer.io/favicon.ico" />
                </Head>
                <AnimateLayout key={tagSlug}>
                    <div className="bg-[#181818] py-2 text-white">

                        <div className="max-w-[1280px] mx-auto mt-14 mb-3 px-3">
                            <div className="text-xl font-bold pt-3 pb-5 shrink-0">
                                {subTitle}
                            </div>
                            <div className="grid gap-3 grid-cols-1 mylg:grid-cols-5 mymd:grid-cols-4 mysm:grid-cols-3 myxsm:grid-cols-2">
                                {gamesData.map((game) => (
                                    <Link href={`/${lang}/g/${game.slug}`} className="rounded-lg relatedgame" key={game.slug}>
                                        <ImageTilt game={game} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimateLayout>
            </Layout>
        )
    }


    return mainContent;
}

