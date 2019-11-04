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
        this.bubbleClick = this.bubbleClick.bind(this);
        this.handleFeedback = this.handleFeedback.bind(this);
    }

    handleClick() {
        if (this.state.isAwaiting || this.state.isMatched) {
            return;
        }
        else {
            this.setState({isAwaiting: true});
            setTimeout(this.bubbleClick, 300);
        }
    }

    bubbleClick() {
        this.props.onTileClick(this.props.uniqueID, this.props.sharedID, this.handleFeedback);
    }

    handleFeedback(feedback) {
        if (feedback === "CLEAR") {
            this.setState({isAwaiting: false});
        } else if (feedback === "MATCH") {
            this.setState({
                isAwaiting: false,
                isMatched: true,
            })
        }
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
        this.state = {
            awaitingUniqueID: null,
            awaitingSharedID: null,
            matchedSharedIDs: [],
        };
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
        this.handleTileClick = this.handleTileClick.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
    }

    handleTileClick(tileUniqueID, tileSharedID, sendFeedback) {
        if (this.state.awaitingUniqueID === null) {
            /* AWAIT */
            this.setState({
                awaitingUniqueID: tileUniqueID,
                awaitingSharedID: tileSharedID,
                awaitingfeedbackSender: sendFeedback,
            });
        } else if (this.state.awaitingSharedID !== tileSharedID) {
            /* CLEAR */
            let previousTileReset = this.state.awaitingfeedbackSender
            this.setState({
                awaitingUniqueID: null,
                awaitingSharedID: null,
                awaitingfeedbackSender: null,
            });
            previousTileReset("CLEAR");
            sendFeedback("CLEAR");
        } else {
            /* MATCH */
            let previousTileReset = this.state.awaitingfeedbackSender
            this.setState({
                awaitingUniqueID: null,
                awaitingSharedID: null,
                awaitingfeedbackSender: null,
                matchedSharedIDs:
                    this.state.matchedSharedIDs.concat(tileSharedID),
            });
            previousTileReset("MATCH");
            sendFeedback("MATCH");
            if (this.isGameOver()) {
                this.setState({
                    isGameOver: true,
                });
            }
        }
    }

    isGameOver() {
        return this.state.matchedSharedIDs.length === 8;
    }

    render() {
        return (
            <div className={
                `board${
                 this.state.isGameOver ? ' is-game-over' : ''}`
            }>
                {this.state.idPairs.map((pair) =>
                    <Tile
                        uniqueID={pair[0]}
                        sharedID={pair[1]}
                        onTileClick={this.handleTileClick}
                        // isAwaiting={this.state.awaitingUniqueID === pair[0]}
                        // isMatched={pair[1] in this.state.matchedSharedIDs}
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
