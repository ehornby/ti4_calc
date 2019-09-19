import React, { Component, Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';


export default class New extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectingPlayers: false,
            numPlayers: 0,
            playerNames: []
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
    handleStart() {
        this.props.changeProgressStatus(true);

        const numPlayers = this.state.numPlayers;
        const playerNames = this.state.playerNames;
        if (numPlayers !== playerNames.length) {
            playerNames.splice(numPlayers, playerNames.length-numPlayers)
        }
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
                        <Form className="player-table">
                        {this.generatePlayerTable()}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.selectingPlayers
                        ?
                        <Button variant="primary" onClick={() => this.handleStart()}>
                            Start
                        </Button>
                        : null}
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
    // 
    generateGameTable = () => {
        let players = [];
        let gameData = this.props.gameData;
        for (let i = 0; i < gameData.length; i++) {
            players.push(
                <h1>{gameData[i][0]} {gameData[i][1]}</h1>
            );
        }
        return (
            players
        );
    }

    gameInProgress = () => {
        return (
            this.generateGameTable()
        );
    }

    render() {
        return (
            <div>
                {this.props.inProgress
                ?
                <Fragment>
                    {this.gameInProgress()}
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