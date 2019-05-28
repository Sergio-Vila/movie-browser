
import React = require('react');
import ReactDOM = require('react-dom');

const tmdbConfig = {
    endpoint: "https://api.themoviedb.org/3/",
    apiKey: "AN_API_KEY",
    imagesEndpoint: "https://image.tmdb.org/t/p/w500/"
};

interface IMainProps {}
interface IMainState {}

class App extends React.Component<IMainProps, IMainState> {

    render () {
        return (
            <div>
                <h1>Movie Browser</h1>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('app'));