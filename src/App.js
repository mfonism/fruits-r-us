import React from 'react';

import './App.css';


class Tile extends React.Component {
    state = {
        isMatched: false,
        isFaceUp: false,
    }

    onClick(event) {
        this.setState({
            isFaceUp: !this.state.isFaceUp
        });
    }

    render() {
        return (
            <div className={
                `tile${
                 this.state.isMatched ? ' is-matched' : ''}${
                 this.state.isFaceUp ? ' is-face-up' : ''}`
            }
            >
                {this.props.sharedID}
            </div>
        )
    }
}

class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <Tile uniqueID="1"  sharedID="1" />
                <Tile uniqueID="2"  sharedID="2" />
                <Tile uniqueID="3"  sharedID="3" />
                <Tile uniqueID="4"  sharedID="4" />
                <Tile uniqueID="5"  sharedID="5" />
                <Tile uniqueID="6"  sharedID="6" />
                <Tile uniqueID="7"  sharedID="7" />
                <Tile uniqueID="8"  sharedID="8" />
                <Tile uniqueID="9"  sharedID="1" />
                <Tile uniqueID="10" sharedID="2" />
                <Tile uniqueID="11" sharedID="3" />
                <Tile uniqueID="12" sharedID="4" />
                <Tile uniqueID="13" sharedID="5" />
                <Tile uniqueID="14" sharedID="6" />
                <Tile uniqueID="15" sharedID="7" />
                <Tile uniqueID="16" sharedID="8" />
            </div>
        )
    }
}

function App() {
    return (
        <div class="App">
            <Board />
        </div>
    );
}

export default App;
