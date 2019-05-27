
import React = require('react');
import ReactDOM = require('react-dom');

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