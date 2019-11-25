import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Table } from 'react-bootstrap';
import moment from 'moment';

export const History = () => {
    const [userHistory, setUserHistory] = useState([]);
    const [userId, setUserId] = useState('testID1234')

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
        console.log(historyData);

        historyData.forEach(item => {
            let date = item.dateTime;
            let gameData = item.gameData;
            console.log(date);
            history.push(
                <tr>
                    <td>{date}</td>
                    <td>{item.winner}</td>
                </tr>
            )
        });
        return history;
    }

    return (
        <div className='history'>
            <Table className='history__table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {generateHistoryTable()}
                </tbody>
            </Table>
        </div>
    )
}