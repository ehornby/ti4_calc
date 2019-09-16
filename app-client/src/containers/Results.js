import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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