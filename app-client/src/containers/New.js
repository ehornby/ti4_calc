import React, { Component, Fragment } from 'react';
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
            playerData: ""
        }
    }

    // Implement DB call to users table on new game start, to set 
    // inProgress flag that gets referenced 
    handleClose(startNew) {
        this.props.changeProgressStatus(startNew);
        if (!startNew) {
            this.props.history.push("/");
        }
    }

    selectPlayers(num) {
        this.setState({ numPlayers: num });
        this.setState({ selectingPlayers: true });
    }

    // Generates player name inputs based on dropdown selection
    generatePlayerTable() {
        var players = [];
        for (var i = 0; i < this.state.numPlayers; i++) {
            players.push(
                <FormGroup controlId={`player${i+1}`}>
                    <FormControl type="text" placeholder={`Player ${i+1}`} />
                </FormGroup>
            );
        }
        return players;
    }

    // Makes call to users table to save progress state
    saveProgressStatus() {

    }

    // Renders the modal allowing player number selection and name entry
    // Need to figure out how to link this to a player data object
    newGame = () => {
        return (
            <div className="New">
                <Modal 
                    show={!this.props.inProgress} 
                    onHide={() => this.handleClose()}
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
                        <Button variant="primary" onClick={() => this.handleClose(true)}>
                            Start
                        </Button>
                        : null}
                        <Button variant="secondary" onClick={() => this.handleClose(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
    gameInProgress = () => {
        return (
            <h1> progress test</h1>
        );
    }

    render() {
        return (
            <div>
                {this.state.inProgress
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