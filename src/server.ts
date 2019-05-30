
const host = "127.0.0.1";
const port = 2000;

import * as express from "express";
import * as httpProxy from "http-proxy";

const tmdbApiEndpoint = "https://api.themoviedb.org/3/";

const server = express();
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

server.use(express.static("build/dist"));

server.all("/api/tmdb/*", function(request, response) {
    request.url = request.url.substr(request.url.indexOf("/api/tmdb") + "/api/tmdb".length);
    proxy.web(request, response, {target: tmdbApiEndpoint});
});

server.listen(port, host);