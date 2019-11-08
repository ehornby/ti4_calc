import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import config from './config';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: "ti4",
                endpoint: config.apiGateway.URL,
                regions: config.apiGateway.REGION
            },
        ]
    }
})

render (
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

