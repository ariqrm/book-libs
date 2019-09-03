import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import NavBar from '../../../component/Navbar/Navbar';
import { connect } from 'react-redux';
import './history.css';
// import { getReturn, getBorrow } from '../../../redux/Actions/Transaction';
// import { userInfo } from '../../../redux/Actions/Users';

class HistoryTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebar: false,
        }
    }
    // componentDidMount= async ()=>{
    //     const id_users = this.props.user.userInfo.id
    //     await this.props.GetBorrow(id_users)
    //     await this.props.GetReturn(id_users)
    // }
    render() {
        // console.log(this.props.transaction)
        const data = this.props.transaction
        return (
            <Fragment>
                <NavBar />
                <br /><br /><br /><br />
                <Table className="history" border responsive size="sm" >
                    <thead>
                        <tr>
                            <th colSpan="4" className="titleHistory">Book returned</th>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <th>Borrow date</th>
                            <th>Book Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactionListBorrow ?
                            data.transactionListBorrow.map(transaction => {
                                return <tr>
                                    <td><img src={transaction.Image} alt="" /> </td>
                                    <td>{new Date(transaction.Date).toDateString()}</td>
                                    <td>{transaction.Title.substr(0, 30)}</td>
                                    <td><p className={transaction.id_status === 2 ? "returned" : "borrowed"} >
                                        {transaction.id_status === 2 ? "returned" : "borrowed"}
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
                        </tr>
                    </tbody>
                </Table>
                <br />
                <Table className="history" border responsive size="sm" >
                    <thead>
                        <tr>
                            <th colSpan="4" className="titleHistory">Book borrowed</th>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <th>Borrow date</th>
                            <th>Book Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactionListReturn ?
                            data.transactionListReturn.map(transaction => {
                                return <tr>
                                    <td><img src={transaction.Image} alt="" /> </td>
                                    <td>{new Date(transaction.Date).toDateString()}</td>
                                    <td>{transaction.Title.substr(0, 30)}</td>
                                    <td><p className={transaction.id_status === 2 ? "returned" : "borrowed"} >
                                        {transaction.id_status === 2 ? "returned" : "borrowed"}
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
                        </tr>
                    </tbody>
                </Table>
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
// const mapDispatchToProps = dispatch => {
//     return {
//         UserInfo: () => dispatch(userInfo()),
//         GetReturn: (id) => dispatch(getReturn(id)),
//         GetBorrow: (id) => dispatch(getBorrow(id)),
//     }
// }

export default connect(mapStateToProps)(HistoryTransaction)