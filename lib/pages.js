import fs from 'fs';
import path from 'path';

const pageDataDirectory = path.join(process.cwd(), 'pageData');
const enableLang = ['en', 'fr' ];
const mainFilename = "index.json";
export function getAllGamesData(lang) {
    const exacDataDir = path.join(pageDataDirectory, lang);
    const fileNames = fs.readdirSync(exacDataDir);
    const allGamesData = fileNames.filter(f => f != "index.json").map((fileName) => {
        // Remove ".md" from file name to get id
        const gameSlug = fileName.replace(/\.json$/, '');
        // Read markdown file as string
        const pageData = getFileContents(lang, fileName)
        return {
            gameSlug,
            pageData
        };
    });
    // Sort games by date
    return allGamesData;
}


export function getAllGameIds() {
    const exacDataDir = path.join(pageDataDirectory, "en");
    const fileNames = fs.readdirSync(exacDataDir);
    const paths = [];
    fileNames.forEach(fileName => {
        enableLang.forEach(lang => {
            paths.push({
                params: {
                    lang: lang,
                    slug: fileName.replace(/\.json$/, ''),
                },
            });
        });
    });
    return paths;
}

export function getGames(lang, tag) {
    const exacDataDir = path.join(pageDataDirectory, lang);
    const fileNames = fs.readdirSync(exacDataDir);
    const gamesData = [];
    fileNames.filter(f => f != "index.json").forEach(fileName => {
        const gameSlug = fileName.replace(/\.json$/, '');
        // Read markdown file as string
        const pageData = getFileContents(lang, fileName)
        const gameData = pageData.game;
        if (gameData.superficialTags.filter(stag => stag.slug == tag).length > 0) {
            gamesData.push({
                gameSlug,
                pageData
            })
        }
    })
    // Sort games by date
    return gamesData;
}

export function getAllLangs() {
    const paths = [];
    enableLang.forEach(lang => {
        paths.push({
            params: {
                lang: lang,
            },
        });
    });
    return paths;
}

export function getGamePageData(lang, slug) {
    return getFileContents(lang, `${slug}.json`)
}

export function getPageData(lang) {
    // Get file names under /games
    return getFileContents(lang, mainFilename)
}
export function getAllTags() {
    const paths = [];

    enableLang.forEach(lang => {
        const pageObj = getFileContents(lang, mainFilename)
        const navTags = pageObj.navTags;

        navTags.forEach(tag => {
            paths.push({
                params: {
                    lang: lang,
                    tag: tag.slug,
                },
            });
        });
    })
    return paths;
}

export function getFileContents(lang, fileName) {
    const fullPath = path.join(pageDataDirectory, lang, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents).pageProps;
}