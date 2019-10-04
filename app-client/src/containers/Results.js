import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { API } from 'aws-amplify';
import Scores from '../components/Scores';

const testData = [
    {
        createdAt: "test1",
        gameData: {
            player1: ["eric", "6", "race"],
            player2: ["cardwell", "9", "race"],
            player3: ["jordan", "10", "race"]
        },
        gameId: "test1",
        userId: "user1"
    },
    {
        createdAt: "test2",
        gameData: {},
        gameId: "test2",
        userId: "user2"
    }
]

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resultsData: testData
        }
    }

    // Creates table of game results from DB call returning JSON
    // Implement a sort later
    async getResultsData() {
        if (!this.props.loggedIn) {
            return;
        }

        try {
        const resultsData = await this.getResults();
        this.setState({ resultsData });
        }
        catch (e) {
            alert(e);
        }

    }

    // Make a DB call to get all previous games played data
    // Returns an array of game objects of form:
    //  - createdAt (date played)
    //  - gameData (players and scores)
    //  - gameId (uuid)
    //  - userId
    getResults() {
        return API.get("ti4", "/ti4");
    }

    getPlayerData() {

    }

    generateResultsTable() {
        var resultsData = this.state.resultsData
        var results = [];

        for (const game of resultsData) {
            let date = game.createdAt;
            results.push(
                <tr>
                    <td>
                        {date}
                    </td>
                    <td>
                        <Scores data={game.gameData}/>
                    </td>
                </tr>
            )
        }
        return results;
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Winner (Click for scores)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateResultsTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}