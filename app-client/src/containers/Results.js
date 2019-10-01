import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { API } from 'aws-amplify';
import Players from '../components/Players';
import Scores from '../components/Scores';

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

    getPlayerData() {

    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Date</td>
                            <td>
                                <Scores playerData={() => this.getPlayerData()}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}