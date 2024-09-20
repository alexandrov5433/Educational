const path = require('node:path');
const fsp = require('node:fs/promises');

const catDataPath = path.normalize(
    path.join(process.cwd(), '/data/catData.json')
);
const catBreedsPath = path.normalize(
    path.join(process.cwd(), '/data/breeds.json')
);

function generateId() {
    return Number(new Date().getTime());
}

function generateUniqueString() {
    return ((Math.random() * 1000000) | 0).toString();
}

async function getCatData() {
    return JSON.parse(await fsp.readFile(catDataPath, {encoding: 'utf8'}));
}

async function saveCatsData(catsData) {
    await fsp.writeFile(catDataPath, JSON.stringify(catsData), {encoding: 'utf8'});
    return true;
}

async function getCatBreeds() {
    return JSON.parse(await fsp.readFile(catBreedsPath, {encoding: 'utf8'}));
}

async function saveCatBreeds(breedsData) {
    await fsp.writeFile(catBreedsPath, JSON.stringify(breedsData), {encoding: 'utf8'});
    return true;
}

module.exports = {
    generateId,
    generateUniqueString,
    getCatData,
    saveCatsData,
    getCatBreeds,
    saveCatBreeds
};