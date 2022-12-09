import React, { Component } from 'react';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        fetch('users').then(res => res.json()).then(
            result => {
                this.setState({ users: result, loading: false })
            }
        )

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h2>All Registered users</h2>
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
                                    <td>{u.userType}</td>
                                    <td>{u.name}</td>
                                    <td>{u.surname}</td>
                                    <td>{u.email}</td>
                                    <td>{u.address}</td>
                                    <td>{u.telephone}</td>
                                    <td>{u.personCardID}</td>
                                    <td>{u.personDOB}</td>
                                    <td>{u.companyTaxID}</td>
                                    <td>{u.companyContactPerson}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <UserList />
            </div>
        );
    }
}

export default UserList;