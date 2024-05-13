
import fs from 'fs';
import path from 'path';
import { enableLang } from '../utils/utils';

const pageDataDirectory = path.join(process.cwd(), 'pageData');

const mainFilename = "index.json";
export function getAllGamesData(lang) {
    const exacDataDir = path.join(pageDataDirectory, lang);
    const fileNames = fs.readdirSync(exacDataDir);
    const allGamesData = fileNames.filter(f => f != "index.json").map((fileName) => {
        // Remove ".md" from file name to get id
        const gameSlug = fileName.replace(/\.json$/, '');
        // Read markdown file as string
        const pageData = getFileContents(lang, fileName);
        const gameData = pageData.game;
        return gameData;
    });
    // Sort games by date
    return allGamesData;
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
            gamesData.push(gameData)
        }
    })
    // Sort games by date
    return gamesData;
}

export function getGamesWithEngine(lang, engine) {
    const exacDataDir = path.join(pageDataDirectory, lang);
    const fileNames = fs.readdirSync(exacDataDir);
    const gamesData = [];
    fileNames.filter(f => f != "index.json").forEach(fileName => {
        const gameSlug = fileName.replace(/\.json$/, '');
        // Read markdown file as string
        const pageData = getFileContents(lang, fileName)
        const gameData = pageData.game;
        if (gameData.superficialEngine && gameData.superficialEngine.slug == engine) {
            gamesData.push({
                gameSlug,
                pageData
            })
        }
    })
    // Sort games by date
    return gamesData;
}

export function getPageData(lang) {
    // Get file names under /games
    return getFileContents(lang, mainFilename)
}
export function getGamePageData(lang, slug) {
    // Get file names under /games
    return getFileContents(lang, `${slug}.json`)
}


export function getFileContents(lang, fileName) {
    const fullPath = path.join(pageDataDirectory, lang, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents).pageProps;
}