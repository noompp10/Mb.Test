import moment from 'moment'
import React, { Component } from 'react';

class RegisterForm extends Component {
    state = {
        id:0,
        userType: '',
        name: '',
        surname: '',
        email: '',
        address: '',
        telephone: '',
        personCardID: '',
        personDOB: '',
        companyTaxID: '',
        companyContactPerson: '',
        tmpCssPerson: 'col-sm-6 d-none',
        tmpCssCompany: 'col-sm-6 d-none',

        users: []
    }

    componentDidMount() {
        fetch('users').then(res => res.json()).then(
            result => {
                this.setState({ users: result })
            }
        )
    }

    onFormSubmit = (event) => {
        event.preventDefault();


        //validate data
        if (this.state.userType == 1) {
            if (this.state.personCardID == '') {
                alert('Card ID is required for Person')
                return;
            }

            if (this.state.personDOB == '') {
                alert('Date of Birth is required for Person')
                return;
            }
        } else if (this.state.userType == 2) {
            if (this.state.companyTaxID == '') {
                alert('Tax ID is required for Company')
                return;
            }

            if (this.state.companyContactPerson == '') {
                alert('Contact Person is required for Company')
                return;
            }
        }


        let userInfo = {
            "id": 0,
            "userType": parseInt(this.state.userType),
            "name": this.state.name,
            "surname": this.state.surname,
            "email": this.state.email,
            "address": this.state.address,
            "telephone": this.state.telephone,
        }

        if (this.state.userType == 1) {
            userInfo["personCardID"] = this.state.personCardID;
            userInfo["personDOB"] = this.state.personDOB;
        } else if (this.state.userType == 2) {
            userInfo["companyTaxID"] = this.state.companyTaxID;
            userInfo["companyContactPerson"] = this.state.companyContactPerson;
        }


        fetch('users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(userInfo)
        }).then(r => r.json()).then(res => {
            console.log(res)
            if (res && res.message == '') {

                alert('Succefully registered')

                event.target.reset();

                fetch('users').then(res => res.json()).then(
                    result => {
                        this.setState({ users: result })
                    }
                )
            } else {
                alert(res.message)
            }
        });
    }

    onFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onUserTypeChange = (event) => {
        let selected = event.target.value;

        this.setState({
            [event.target.name]: selected
        })

        if (selected == 1) {//person
            this.setState({ ['tmpCssPerson']: 'col-sm-6' })
            this.setState({ ['tmpCssCompany']: 'col-sm-6 d-none' })
        } else if (selected == 2) {//company
            this.setState({ ['tmpCssPerson']: 'col-sm-6 d-none' })
            this.setState({ ['tmpCssCompany']: 'col-sm-6' })
        } else {
            this.setState({ ['tmpCssPerson']: 'col-sm-6 d-none' })
            this.setState({ ['tmpCssCompany']: 'col-sm-6 d-none' })
        }
    }

    render() {
        return (
            <div>
                <h4 className="mb-3">Registration form</h4>
                <form className="row g-3" onSubmit={this.onFormSubmit}>

                    <div className="col-sm-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={this.onFormChange} required maxLength="100" />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input type="text" className="form-control" id="surname" name="surname" onChange={this.onFormChange} required maxLength="100" />
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={this.onFormChange} required maxLength="100" />
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" onChange={this.onFormChange} required maxLength="1000" />
                    </div>
                    <div className="col-sm-7">
                        <label htmlFor="telephone" className="form-label">Telephone</label>
                        <input type="number" className="form-control" id="telephone" name="telephone" onChange={this.onFormChange} required maxLength="10" />
                    </div>

                    <div className="col-sm-7">
                        <label htmlFor="userType" className="form-label">User Type</label>
                        <select className="form-select" id="userType" name="userType" onChange={this.onUserTypeChange} required>
                            <option value="">Choose...</option>
                            <option value="1">Person</option>
                            <option value="2">Company</option>
                        </select>
                    </div>

                    <div className={this.state.tmpCssPerson}>
                        <label htmlFor="personCardID" className="form-label">Card ID</label>
                        <input type="number" className="form-control" id="personCardID" name="personCardID" onChange={this.onFormChange} maxLength="100" />
                    </div>
                    <div className={this.state.tmpCssPerson}>
                        <label htmlFor="personDOB" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="personDOB" name="personDOB" onChange={this.onFormChange} />
                    </div>

                    <div className={this.state.tmpCssCompany}>
                        <label htmlFor="companyTaxID" className="form-label">Tax ID</label>
                        <input type="number" className="form-control" id="companyTaxID" name="companyTaxID" onChange={this.onFormChange} maxLength="20" />
                    </div>
                    <div className={this.state.tmpCssCompany}>
                        <label htmlFor="companyContactPerson" className="form-label">Contact Person</label>
                        <input type="text" className="form-control" id="companyContactPerson" name="companyContactPerson" onChange={this.onFormChange} maxLength="100" />
                    </div>

                    <hr className="my-4" />
                    <div className="col-12">
                        <button className="btn btn-primary w-100 btn-lg" type="submit">Submit</button>
                    </div>
                </form>
                <hr></hr>

                <h4 className="mb-3">All Registered users</h4>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Telephone</th>
                                <th>Card ID</th>
                                <th>DoB</th>
                                <th>Tax ID</th>
                                <th>Contact Person</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.userType ==1 ? "Person": "Company"}</td>
                                    <td>{u.name}</td>
                                    <td>{u.surname}</td>
                                    <td>{u.email}</td>
                                    <td>{u.address}</td>
                                    <td>{u.telephone}</td>
                                    <td>{u.personCardID}</td>
                                    <td>{u.personDOB == null? "":moment(u.personDOB).format("DD/MM/YYYY")}</td>
                                    <td>{u.companyTaxID}</td>
                                    <td>{u.companyContactPerson}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RegisterForm;