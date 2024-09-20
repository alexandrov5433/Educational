const url = require('node:url');
const fsp = require('node:fs/promises');
const path = require('node:path');

const { getCatData } = require('../util/util');

const homeHtmlPath = path.normalize(
    path.join(process.cwd(), '/views/home/index.html')
);

module.exports = async (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/' && req.method === 'GET') {
        let homeHtml = await fsp.readFile(homeHtmlPath, {encoding: 'utf8'});
        const catData = await getCatData();
        homeHtml = homeHtml.replace('{{allCats}}', catData.map(data => loadCat(data)).join('\n'));
        res.writeHead(200, {
            'Contect-Type': 'text/html'
        });
        res.write(homeHtml);
        res.end();
    } else if (pathname.startsWith('/search') && req.method === 'GET') {
        const searchParam = new URL('http://localhost:3000' + req.url)?.searchParams?.get('searchParam');
        if (!searchParam) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.write('Error: search parameter missing.');
            res.end();
        }
        const catData = await getCatData();
        const results = catData.filter(c => (c.name).toLowerCase().includes(searchParam.toLowerCase()));
        let homeHtml = await fsp.readFile(homeHtmlPath, {encoding: 'utf8'});
        homeHtml = homeHtml.replace('{{allCats}}', results.map(data => loadCat(data)).join('\n'));
        res.writeHead(200, {
            'Contect-Type': 'text/html'
        });
        res.write(homeHtml);
        res.end();        
    } else {
        return true;
    }
};

function loadCat(catInfo) {
    return `<li>
                <img src="${path.join('./content/images/', catInfo.image)}" alt="${catInfo.name}">
                <h3>${catInfo.name}</h3>
                <p><span>Breed: </span>${catInfo.breed}</p>
                <p><span>Description: </span>${catInfo.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit-cat?id=${catInfo.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/shelter-cat?id=${catInfo.id}">New Home</a></li>
                </ul>
            </li>`;
}