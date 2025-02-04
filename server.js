const http = require("http");
const fs = require("fs");
const path = require("path");

// Function to serve static files
const serveStaticFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("500 - Internal Server Error");
        } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(data);
        }
    });
};

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        serveStaticFile("./public/index.html", "text/html", res);
    } else if (req.url === "/style.css") {
        serveStaticFile("./public/style.css", "text/css", res);
    } else if (req.url === "/script.js") {
        serveStaticFile("./public/script.js", "application/javascript", res);
    } else if (req.url === "/questions") {
        fs.readFile("./questions.json", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to load questions" }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Not Found");
    }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
