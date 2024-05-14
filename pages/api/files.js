import fs from 'fs';
import path from 'path';
const pageDataDirectory = path.join(process.cwd(), 'pageData');
const mainPageName = "index.json";
export default async function handler(req, res) {
    const directoryPath = './pageData'; // Update this with your directory path
    try {
        const allPageData = await getAllPageData();
        res.status(200).json(allPageData);
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getAllPageData() {
    const pageDataDir = path.join(pageDataDirectory);
    const langNames = fs.readdirSync(pageDataDir);
    const allPageData = {};
    for (let i = 0; i < langNames.length; i++) {
        const exacDataDir = path.join(pageDataDirectory, langNames[i]);
        const fileNames = fs.readdirSync(exacDataDir);
        allPageData[langNames[i]] = {};
        allPageData[langNames[i]]["index"] = getFileContent(langNames[i], mainPageName);
        allPageData[langNames[i]]["games"] = fileNames.filter(fileName => fileName != mainPageName).map((fileName) => { return getFileContent(langNames[i], fileName); });
    }
    return allPageData;
}

function getFileContent(lang, fileName) {
    const fullPath = path.join(pageDataDirectory, lang, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents).pageProps;
}