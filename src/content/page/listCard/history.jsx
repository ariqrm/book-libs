import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import './history.css';

class HistoryTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebar: false,
        }
    }
    render() {
        const data = this.props.transaction
        return (
            <Fragment>
                <br /><br /><br /><br />
                <Table className="history" border responsive size="sm" >
                    <thead>
                        <tr>
                            <th colSpan="5" className="titleHistory">Book returned</th>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <th>Borrow date</th>
                            <th>Return date</th>
                            <th>Book Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactionListBorrow ?
                            data.transactionListBorrow.map(transaction => {
                                return <tr>
                                    <td><img src={transaction.Image} alt="" /> </td>
                                    <td>{
                                        transaction.id_status === 3 ? 'unconfirmed' :
                                        new Date(transaction.Date).toDateString()}</td>
                                    <td>{
                                        transaction.id_status === 3 ? 'unconfirmed' :
                                        transaction.Returned === null ? 'not been restored'  :
                                        new Date(transaction.Returned).toDateString()}</td>
                                    <td>{transaction.Title.substr(0, 30)}</td>
                                    <td><p className={transaction.id_status === 2 ? "returned" : "borrowed"} >
                                        {transaction.id_status === 2 ? "returned" : transaction.id_status === 3 ? "pending" : "borrowed"}
                                    </p></td>
                                </tr>
                            })
                            :
                            <tr>
                                <td>Loading</td>
                            </tr>
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <br />
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        transaction: state.transaction,
        user: state.user,
    }
}

export default connect(mapStateToProps)(HistoryTransaction)