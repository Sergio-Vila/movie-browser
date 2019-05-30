
import React = require('react');
import ReactDOM = require('react-dom');

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import TMDbConnector from "./models/TMDbConnector";
import MovieSearchPage from "./views/movieSearchPage";

const tmdbConfig = {
    apiEndpoint: window.location.origin + "/api/tmdb/",
    apiKey: "AN_API_KEY",
    imagesEndpoint: "https://image.tmdb.org/t/p/w500/"
};

interface AppProps {}

interface AppState {}

const tmdbConnector = new TMDbConnector(tmdbConfig.apiEndpoint, tmdbConfig.apiKey, tmdbConfig.imagesEndpoint);

class App extends React.Component<AppProps, AppState> {

    render () {
        return (
            <div>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <h1>Movie Browser</h1>
                        <MovieSearchPage tmdbConnector={tmdbConnector} />
                    </Container>
                </React.Fragment>
            </div>
        );
    };
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));