const fsp = require('node:fs/promises');
const strp = require('node:stream/promises');
const path = require('node:path');
const url = require('node:url');

module.exports = async (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname.startsWith('/content') && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(process.cwd(), pathname)
        );    
        try {
            const requestedFile = await fsp.open(filePath);
            let requestedFileStream;
            if (pathname.endsWith('js') || pathname.endsWith('css') || pathname.endsWith('html')) {
                requestedFileStream = requestedFile.createReadStream({encoding: 'utf8'}); //text files
            } else { 
                requestedFileStream = requestedFile.createReadStream(); //image files
            }
            res.writeHead(200, {
                'Content-Type': getContentType(req.url)
            });
            await strp.pipeline(requestedFileStream, res);
            res.end();
            await requestedFile.close();
        } catch (err) {
            console.log(`Error occured: ${err}`);
            if (err.message.includes('no such file or directory, open')) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Error: File not found.');
                res.end();
            }
            return;
        }
    } else {
        return true;
    }
};

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('js')) {
        return 'text/javascript';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('jpg')) {
        return 'image/jpeg';
    } else if (url.endsWith('jpeg')) {
        return 'image/jpeg';
    }  else if (url.endsWith('ico')) {
        return 'image/x-icon';
    } else if (url.endsWith('png')) {
        return 'image/png';
    }
}