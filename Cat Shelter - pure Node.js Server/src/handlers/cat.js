const url = require('node:url');
const path = require('node:path');
const fsp = require('node:fs/promises');
const qs = require('node:querystring');
const strp = require('node:stream/promises');
const formidable = require('formidable');

const {
    generateId,
    generateUniqueString,
    getCatData,
    saveCatsData,
    getCatBreeds,
    saveCatBreeds
} = require('../util/util');

module.exports = async (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (req.method === 'GET') {
        if (pathname.startsWith('/cats/add-breed')) {
            const addBreedPath = path.normalize(
                path.join(process.cwd(), '/views/addBreed.html')
            );
            const requestedFile = await fsp.readFile(addBreedPath, {encoding: 'utf8'});
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(requestedFile);
            res.end();
        } else if (pathname.startsWith('/cats/add-cat')) {
            const addCatPath = path.normalize(
                path.join(process.cwd(), '/views/addCat.html')
            );
            const catBreeds = await getCatBreeds();
            let requestedFile = await fsp.readFile(addCatPath, {encoding: 'utf8'});
            requestedFile = requestedFile.replace('{{breeds}}', catBreeds.map(b => `<option value="${b}">${b}</option>`).join('\n'));
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(requestedFile);
            res.end();
        } else if (pathname.startsWith('/cats/edit-cat')) {
            try {
                const catId = Number((new URL('http://localhost:3000' + req.url)).searchParams.get('id'));
                const catData = (await getCatData()).filter(o => o.id === catId)[0];
                const catBreeds = await getCatBreeds();
                if (!catData || (typeof catData) != 'object' || catData.length > 1) {
                    throw new Error('Cat id not found.');
                }
                const editCatPath = path.normalize(
                    path.join(process.cwd(), '/views/editCat.html')
                );
                let requestedFile = await fsp.readFile(editCatPath, {encoding: 'utf8'});
                requestedFile = requestedFile
                    .replace('{{name}}', catData.name)
                    .replace('{{description}}', catData.description)
                    .replace('{{breed}}', catBreeds.map(b => `<option value="${b}">${b}</option>`).join('\n'));
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(requestedFile);
                res.end();
            } catch (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(`Error occured: ${err.message}`);
                res.end();
                return;
            }
        } else if (pathname.startsWith('/cats/shelter-cat')) {
            const catId = Number((new URL('http://localhost:3000' + req.url)).searchParams.get('id'));
            const catShelterHlmlPath = path.join(process.cwd(), '/views/catShelter.html');
            const catData = (await getCatData()).find(c => c.id === catId);
            if (!catData) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(`Error: Cat with ID: ${catId} does not exist.`);
                res.end();
                return;
            }
            let catShelter = await fsp.readFile(catShelterHlmlPath, {encoding: 'utf8'});
            catShelter = catShelter
                .replace('{{catId}}', catId)
                .replace('{{image}}', path.join('/content/images/', catData.image))
                .replace(/{{name}}/g, catData.name)
                .replace('{{description}}', catData.description)
                .replace('{{breed}}', catData.breed);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            await strp.pipeline(catShelter, res);
            res.end();
        } else {
            return true;
        }
    } else if (req.method === 'POST') {
        if (pathname.startsWith('/cats/add-breed')) {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk
            });
            req.on('end', async () => {      
                const newBreed = qs.parse(data).breed;
                let breedsData = await getCatBreeds();
                breedsData.push(newBreed);
                await saveCatBreeds(breedsData);
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end()
            });
        } else if (pathname.startsWith('/cats/add-cat')) {
            try {
                const form = new formidable.IncomingForm({uploadDir: path.join(process.cwd(), '/content/temp/')});
                let [fields, files] = await form.parse(req);
                let newCat = Object.entries(fields).reduce((acc, cur) => {
                    return Object.assign(acc, {[cur[0]]: cur[1][0]})
                }, {});
                newCat.id = generateId();
                newCat.image = generateUniqueString() + '_' + files.upload[0].originalFilename;
                let catsData = await getCatData();
                catsData.push(newCat);
                await saveCatsData(catsData);
                await fsp.rename(files.upload[0].filepath, path.join(process.cwd(), '/content/images/', newCat.image));
                res.writeHead(301, { 'Location': '/' });
                res.end('File uploaded and form data processed.');
            } catch (err) {
                console.log(err);
                res.end();
                return;
            }
        } else if (pathname.startsWith('/cats/edit-cat')) {
            try {
                const catId = Number((new URL('http://localhost:3000' + req.url)).searchParams.get('id'));
                const form = new formidable.IncomingForm({uploadDir: path.join(process.cwd(), '/content/temp/')});
                let [fields, files] = await form.parse(req);
                let editedCat = Object.entries(fields).reduce((acc, cur) => {
                    return Object.assign(acc, {[cur[0]]: cur[1][0]})
                }, {});
                editedCat.id = catId;
                editedCat.image = generateUniqueString() + '_' + files.upload[0].originalFilename;
                let catsData = await getCatData();
                catsData = catsData.filter(c => c.id !== catId);
                catsData.push(editedCat);
                await saveCatsData(catsData);
                await fsp.rename(files.upload[0].filepath, path.join(process.cwd(), '/content/images/', editedCat.image));
                res.writeHead(301, { 'Location': '/' });
                res.end('File uploaded and form data processed.');
            } catch (err) {
                console.log(err);
                res.end();
                return;
            }
        } else if (pathname.startsWith('/cats/shelter-cat')) {
            const catId = Number((new URL('http://localhost:3000' + req.url)).searchParams.get('id'));
            let catData = await getCatData();
            if (catData.find(c => c.id === catId)) {
                catData = catData.filter(c => c.id !== catId);
                await saveCatsData(catData);
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end();
            } else {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(`Error: Cat with ID: ${catId} does not exist.`);
                res.end();
                return;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};

