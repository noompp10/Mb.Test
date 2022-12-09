import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="py-5 text-center">
                {/*    <img class="d-block mx-auto mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">*/}
                    <h2>Registration App</h2>
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
