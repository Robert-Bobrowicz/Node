const http = require('http');
const port = 3000;

const listener = (req, res) => {
    console.log('Someone is on a server: ', req.url);

    //Buffer, stream, chunk
    const chunks = [];
    req.on('data', (chunk) => {
        console.log('Someone sent a request to a server');
        chunks.push(chunk);
    }).on('end', () => {
        const body = Buffer.concat(chunks).toString();
        console.log(body);
    })


    //podstrony
    if (req.url === "/") {
        res.write("Main page");
        return res.end();
    }
    if (req.url === "/kontakt") {
        res.write("Kontakt");
        return res.end();
    }
    res.write('Page not found, 404');
    return res.end();
}

const server = http.createServer(listener);
server.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`);
})