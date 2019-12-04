import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Table } from 'react-bootstrap';
import Summary from './Summary';
import { getUserId } from '../helpers/auth';

export const History = () => {
    const [userHistory, setUserHistory] = useState([]);
    const userId = getUserId();

    // Queries Firebase for completed game data linked to the current userId and
    // updates userHistory state with result
    useEffect(() => {
            firebase
                .firestore()
                .collection('games')
                .where('userId', '==', userId)
                .where('inProgress', '==', false)
                .get()
                .then(snapshot=> {
                    const data = snapshot.docs.map(item => ({
                        ...item.data()
                    }));
                    setUserHistory(data);
                });
    }, []);

    const generateHistoryTable = () => {
        let history = [];
        let historyData = [...userHistory];

        historyData.forEach(item => {
            let date = item.dateTime;
            let gameData = item.gameData;
            history.push(
                <tr>
                    <td>{date}</td>
                    <td><Summary gameData={gameData} /></td>
                </tr>
            )
        });
        return history;
    }

    return (
        <div className='history' data-testid='history'>
            <Table className='history__table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Winner (Click for full results)</th>
                    </tr>
                </thead>
                <tbody>
                    {generateHistoryTable()}
                </tbody>
            </Table>
        </div>
    )
}