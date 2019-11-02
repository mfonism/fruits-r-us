import React from 'react';
import _ from 'lodash';

import './App.css';


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMatched: false,
            isAwaiting: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isAwaiting: !this.state.isAwaiting
        });
    }

    render() {
        return (
            <div
                onClick={this.handleClick}
                className={
                    `tile${
                     this.state.isMatched ? ' is-matched' : ''}${
                     this.state.isAwaiting ? ' is-awaiting' : ''}`
                }
            >
                {this.props.sharedID}<sub><small>{this.props.uniqueID}</small></sub>
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        /*
        Compute id pairs in the form of [uniqueID, sharedID] for
        child components (cells), such that:
        + the uniqueIDs increase monotonically from 1 to 16,
        + every two children have a common sharedID

        ex.
        [ [1,1], [2,1], [3,2], [4,2], [5,3], ...]
        */
        this.state.idPairs = _.shuffle(
            _.zip(
                _.range(1, 16+1),
                _.range(1, 8+1 ).flatMap((i) => [i, i])
            )
        );
    }

    render() {
        return (
            <div className="board">
                {this.state.idPairs.map((pair) =>
                    <Tile
                        uniqueID={pair[0]}
                        sharedID={pair[1]}
                    />
                )}
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <Board />
        </div>
    );
}

export default App;
