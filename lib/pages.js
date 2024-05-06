import fs from 'fs';
import path from 'path';

const pageDataDirectory = path.join(process.cwd(), 'pageData/en');

export function getAllGamesData() {
    // return pageDataDirectory;
    // Get file names under /games
    const fileNames = fs.readdirSync(pageDataDirectory);
    // console.log(fileNames);
    // return fileNames;
    const allGamesData = fileNames.filter(f => f != "index.json").map((fileName) => {
        // Remove ".md" from file name to get id
        const gameSlug = fileName.replace(/\.json$/, '');
        // Read markdown file as string
        const fullPath = path.join(pageDataDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const pageData = JSON.parse(fileContents).pageProps;

        // Combine the data with the id
        return {
            gameSlug,
            pageData
        };
    });
    // Sort games by date
    console.log(allGamesData);
    return allGamesData;
}

export function getPageData() {
    // Get file names under /games
    const fullPath = path.join(pageDataDirectory, "index.json");
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const pageData = JSON.parse(fileContents).pageProps;
    return pageData;
}

export function getAllGameIds() {
    const fileNames = fs.readdirSync(pageDataDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.json$/, ''),
            },
        };
    });
}

export function getGamePageData(id) {
    const fullPath = path.join(pageDataDirectory, `${id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const pageData = JSON.parse(fileContents).pageProps;
    return pageData;
}