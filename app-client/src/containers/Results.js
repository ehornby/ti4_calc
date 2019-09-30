import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameData: []
        }
    }

    // Creates table of game results from DB call returning JSON
    async createResultsTable() {
        if (!this.props.loggedIn) {
            return;
        }

        try {
        const gameData = await this.getResults();
        gameData.sort();
        this.setState({ gameData });
        }
        catch (e) {
            alert(e);
        }

    }

    getResults() {
        return API.get("ti4", "/ti4");
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Players</th>
                            <th>Winner</th>
                            <th>Scores</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>test date</td>
                            <td> 
                                <Button 
                                    variant="primary"
                                    onClick={this.handleShow}
                                >
                                    Implement modal/popover
                                </Button>
                            </td>
                            <td>
                                Test winner
                            </td>
                            <td>Implement modal/popover</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}