import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

export default class New extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    // Will need to figure out how to persist new game state through 
    // page refresh
    handleClose(startNew) {
        this.props.changeProgressStatus(startNew);
        if (!startNew) {
            this.props.history.push("/");
        }
    }

    // Need to implement body of modal - dropdown for selecting number
    // of players and fields to enter names (maybe a list for tracking?)
    newGame = () => {
        return (
            <div>
                <Modal show={!this.props.inProgress} onHide={() => this.handleClose()}>
                    <ModalHeader>
                        <ModalTitle>Start new game</ModalTitle>
                    </ModalHeader>
                    <ModalBody>Test</ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={() => this.handleClose(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose(true)}>
                            Start game
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