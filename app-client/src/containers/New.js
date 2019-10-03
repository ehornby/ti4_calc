import React, { Component, Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import ScoreCounter from '../components/ScoreCounter';

export default class New extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectingPlayers: false,
            numPlayers: 0,
            playerNames: [],
            showComplete: false,
            showCancel: false
        }
    }

    // Closes modal and redirects user to lander page
    handleClose() {
        this.props.changeProgressStatus(false);
        this.props.history.push("/");
    }

    // Ensures playerName array contains the correct number of names
    // and starts score tracking 
    // - Implement DB call to users table on new game start, to set 
    //   inProgress flag that gets referenced 
    // - Add functionality to prevent form submit if any fields are empty
    handleStart = event =>{
        this.props.changeProgressStatus(true);

        const numPlayers = this.state.numPlayers;
        const playerNames = this.state.playerNames;
        if (numPlayers !== playerNames.length) {
            playerNames.splice(numPlayers, playerNames.length-numPlayers)
        }
        this.props.createGameData(playerNames);
    }

    handleChange (index, newValue) {
        const updatedArray = [...this.state.playerNames];
        updatedArray[index] = newValue;
        this.setState({
            playerNames: updatedArray
        });
    }

    // Sets number of players, sets the selectingPlayers flag to true
    // to enable correct buttons in modal, and sets the correct number
    // of fields in the playerNames array
    selectPlayers(num) {
        this.setState({ numPlayers: num });
        this.setState({ selectingPlayers: true });
    }

    // Generates player name inputs based on dropdown selection and adds
    // player names to array in state
    generatePlayerTable() {
        let players = [];
        for (let i = 0; i < this.state.numPlayers; i++) {
            players.push(
                <FormGroup controlId={`player${i}`} className="player">
                    <FormControl
                        required 
                        type="text" 
                        placeholder={`Player ${i+1}`}
                        value={this.state.playerNames[i]}
                        onChange={e => this.handleChange(i, e.target.value)}
                         />
                </FormGroup>
            );       
        }
        return players;
    }

    // Makes call to users table to save progress state
    saveProgressStatus() {
        // Not implemented yet
    }

    handleComplete(flag) {
        this.setState({ showComplete: flag })
    }

    handleCancel(flag) {
        this.setState({ showCancel: flag })
    }

    completeGame() {
        this.handleComplete(false);
    }

    // Clears gameData in state, sets inProgress flag to false, and
    // redirects to lander page
    cancelGame() {
        this.props.clearGameData();
        this.props.history.push("/home");
    }

    // Can refactor to eliminate two modals
    endGame() {       
        return (
            <Fragment>
                <ButtonGroup>
                    <Button 
                        variant="success"
                        onClick={() => this.handleComplete(true)}
                    >
                        Complete Game
                    </Button>
                    <Button 
                        variant="danger"
                        onClick={() => this.handleCancel(true)}
                    >
                        Cancel Game
                    </Button>
                </ButtonGroup>

                <Modal
                    show={this.state.showComplete}
                    onHide={() => this.handleComplete(false)}
                >
                    <ModalHeader>
                        <ModalTitle>Complete Game</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to complete the game?
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            variant="outline-success"
                            onClick={this.completeGame}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => this.handleComplete(false)}
                        >
                            No
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    show={this.state.showCancel}
                    onHide={() => this.handleCancel(false)}
                >
                    <ModalHeader>
                        <ModalTitle>Cancel Game</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to cancel the game and delete all saved data?
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            variant="outline-success"
                            onClick={this.cancelGame}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => this.handleCancel(false)}
                        >
                            No
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }

    // Renders the modal allowing player number selection and name entry
    newGame = () => {
        return (
            <div className="New">
                <Modal 
                    show={!this.props.inProgress} 
                    className="player-dropdown"
                >
                    <ModalHeader>
                        <ModalTitle>Start new game</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Dropdown onSelect={(eventKey) => this.selectPlayers(eventKey)}>
                            <DropdownToggle variant="info" id="num-players">
                                Select number of players
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem eventKey="3">3</DropdownItem>
                                <DropdownItem eventKey="4">4</DropdownItem>
                                <DropdownItem eventKey="5">5</DropdownItem>
                                <DropdownItem eventKey="6">6</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Form className="player-table" onSubmit={this.handleStart}>
                        {this.generatePlayerTable()}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.selectingPlayers
                        ?
                        <Button 
                            variant="primary"
                            onClick={() => this.handleStart()}
                        >
                            Start
                        </Button>
                        : null}
                        <Button 
                            variant="secondary" 
                            onClick={() => this.handleClose()}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
    // Iterates over gameData object to create a table of player
    // names and scores
    generateGameTable = () => {
        var gameData = this.props.gameData;
        var players = [];

        for (var key in gameData) {
            let name = gameData[key][0];
            let score = gameData[key][1];

            players.push(
                <tr>
                    <td>{name}</td>
                    <td>
                        <ScoreCounter 
                            score={score} 
                            updateScore={this.props.updateScore}
                            playerId={key}                                 
                        />
                    </td>
                </tr>
            );
        }
        return players;
    }

    // Creates table of player scores including update functionality
    gameInProgress = () => {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateGameTable()}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div>
                {this.props.inProgress
                ?
                <Fragment>
                    {this.gameInProgress()}
                    {this.endGame()}
                  </Fragment>
                :
                <Fragment>
                    {this.newGame()}
                </Fragment>
                }
            </div>
        );
    }
}