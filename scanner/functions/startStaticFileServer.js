function startStaticFileServer() {
    return new Promise((resolve) => {
        const ext2mime = new Map();
        ext2mime.set('html', 'text/html');
        ext2mime.set('js', 'text/javascript');
        ext2mime.set('css', 'text/css');
        ext2mime.set('json', 'application/json');

        itownsServer = http.createServer((req, res) => {
            const file = `./${req.url}`;
            fs.readFile(file, (err, data) => {
                if (err) {
                    res.writeHead(500);
                } else {
                    const extension = file.substr(file.lastIndexOf('.') + 1);
                    if (ext2mime.has(extension)) {
                        res.writeHead(200, { 'Content-Type': ext2mime.get(extension) });
                    }
                    res.end(data);
                }
            });
        });

        itownsServer.listen(0, () => {
            resolve(itownsServer.address().port);
        });
    });
}