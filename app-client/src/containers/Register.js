import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Auth } from 'aws-amplify';
import './Register.css';


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirm: "",
            code: "",
            newUser: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            const newUser = await Auth.signUp({
                username: this.state.email, 
                password: this.state.password
            });
            this.setState({ newUser });
        }
        catch (e) {
            alert (e.message);
        }
        this.setState({ isLoading: false });
    }

    handleConfirmSubmit = async event => {

    }

    renderForm() {
        return (
            <div className = "Register">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Email address"
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <FormGroup controlId="confirm">
                        <FormControl
                            type="password"
                            value={this.state.confirm}
                            onChange={this.handleChange}
                            placeholder="Confirm password"
                        />
                    </FormGroup>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Register
                    </Button>
                </Form>
            </div>
        );
    }

    renderConfirmForm() {

    }

    render() {
        return(
            <div className="Signup">
                {this.state.newUser === null
                ? this.renderForm()
                :
                this.renderConfirmation()
                }
            </div>
        );
    }
}