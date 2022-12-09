import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Registration Event</h2>
                    <p className="lead">by Teerapong</p>
                </div>
                <div>
                    <RegisterForm />
                    <hr></hr>
                </div>
            </div>
        );
    }

}
