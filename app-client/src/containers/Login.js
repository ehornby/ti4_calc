import React, { Component } from 'react';
import './Login.css';
import { Auth } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.changeAuthStatus(true);
            this.props.history.push("/");
        }
        catch (e) {
            alert(e.message);
        }
        this.setState({ isLoading: false })
        
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={this.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Login
                    </Button>                                            
                </Form>
            </div>
        );
    }
}