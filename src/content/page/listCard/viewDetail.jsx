import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './viewDetail.css'
import { getBookId, deleteBook, updateBook, transaction } from '../../../redux/Actions/Books';
import { checkBorrowed } from '../../../redux/Actions/Transactions';
import { getGenre } from '../../../redux/Actions/Genres';
import { openModal, closeModal } from '../../../redux/Actions/Modals';
import { connect } from 'react-redux';
import ResponseModal from '../../../component/Modal/Response';
import { userInfo } from '../../../redux/Actions/Users';
import TransactionModal from '../../../component/Modal/Transaction';

class ViewDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            getGenre: [],
            dataApi: [],
            date_released: "", //new Date().toISOString().split('T')[0],
            date: "",
            Image: {},
            month: "",
            year: "",
            data: [],
            formDataTransBorrow: {
                id_users: this.props.user.userInfo.id,
                id_book: this.props.match.params.id,
            },
            formDataTransaction: {
                id_book: this.props.match.params.id,
            },
            formData: {
                date_released: "",
                description: "",
                genre: "",
                id: 1,
                image: "",
                status: "",
                title: "",
            },
            deleteData: false,
            editData: false,
            faildata: false,
            transaction: false,
            ResponseModal: false,
        }
    }

    handleEdit = () => {
        this.setState({
            ResponseModal: false
        })
        window.location.reload()
    }
    componentDidMount = async () => {
        let myId = this.props.match.params.id;
        console.log(myId, 'id')
        await this.props.Genre();
        await this.props.getBookId(myId);
        await this.props.UserInfo()
        this.props.CheckBorrowed(myId)
        let data = this.props.book.bookDetail
        this.setState({
            getGenre: this.props.genre.genreList,
            dataApi: data[0],
            date_released: data[0].date_released.split("T")[0],
        })
        const { getGenre, dataApi } = this.state
        const genre_id = getGenre.map(genre => genre.Genre).indexOf(dataApi.genre) + 1
        const rawDate = new Date(this.state.dataApi.date_released)
        let year = rawDate.getFullYear()
        let month = rawDate.getMonth() < 10 ? '0' + (rawDate.getMonth() + 1) : rawDate.getMonth() + 1
        let date = rawDate.getDate() < 10 ? '0' + rawDate.getDate() : rawDate.getDate()
        let date_released = year + '-' + month + '-' + date
        this.setState({
            formData: {
                date_released: date_released,
                description: this.state.dataApi.description,
                genre: genre_id,
                id: this.state.dataApi.id,
                image: this.state.dataApi.image,
                status: this.state.dataApi.status,
                title: this.state.dataApi.title,
            },
            formDataTransBorrow: {
                id_users: this.props.user.userInfo.id,
                id_book: this.props.match.params.id,
            },
        })
        this.props.id_books(this.props.match.params.id)
        this.handleBtn()
    };
    available = () => {
        document.getElementById("btnborrow").style.display = "block";
        document.getElementById("btnaccept").style.display = "none";
        document.getElementById("btnreturn").style.display = "none";

    }
    pending = () => {
        document.getElementById("btnborrow").style.display = "none";
        document.getElementById("btnaccept").style.display = "block";
        document.getElementById("btnreturn").style.display = "none";

    }

    borrowed = () => {
        document.getElementById("btnborrow").style.display = "none";
        document.getElementById("btnaccept").style.display = "none";
        document.getElementById("btnreturn").style.display = "block";
    }
    handleBtn = () => {
        if (this.state.dataApi.status === "available") {
            this.available()
        } else
            if (this.state.dataApi.status === "pending") {
                this.pending()
            } else
                if (this.state.dataApi.status === "borrowed") {
                    this.borrowed()
                }
    }
    back = () => {
        this.setState({
            ResponseModal: false
        })
        window.location.replace("/home")
        // this.props.history.push('/home')
    }
    handleForm = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        })
    }
    handleFormTransaction = (event) => {
        var newformDataTransaction = { ...this.state.formDataTransaction };
        newformDataTransaction[event.target.name] = event.target.value;
        this.setState({
            formDataTransaction: newformDataTransaction
        })
    }
    handleFile = (event) => {
        const files = Array.from(event.target.files)
        this.setState({ Image: files[0] })
    }
    handleUpdate = (event) => {
        event.preventDefault()
        const myId = this.props.match.params.id;
        let formData = new FormData()
        formData.append('title', this.state.formData.title)
        formData.append('description', this.state.formData.description)
        formData.append('date_released', this.state.formData.date_released)
        formData.append('genre', this.state.formData.genre)
        formData.append('status', this.state.formData.status)
        formData.append('prevImg', this.state.formData.image)
        formData.append('Image', this.state.Image)
        this.setState({
            loading: true,
        })
        this.props.UpdateBook(myId, formData)
            .then((res) => {
                const data = res.action.payload.data
                if (data.succes) {
                    this.setState({
                        ResponseModal: true,
                        data: data,
                    })
                    this.props.closeModal()
                } else {
                    this.setState({
                        ResponseModal: true,
                        data: data,
                    })
                    this.props.closeModal()
                }
            })
            .catch(err => {
                const data = {
                    message: "access denied",
                }
                this.setState({
                    ResponseModal: true,
                    data: data
                })
            })
    }
    handleRemove = () => {
        const data = {
            message: "Are you sure ?",
        }
        this.setState({
            ResponseModal: true,
            data: data
        })
    }
    RemovingData = (data) => {
        if (data === true) {
            const myId = this.props.match.params.id;
            this.props.DeleteBook(myId)
                .then((res) => {
                    const data = res.action.payload.data
                    if (data.succes) {
                        this.setState({
                            ResponseModal: true,
                            data: data,
                        })
                    } else {
                        this.setState({
                            ResponseModal: true,
                            data: data,
                        })
                    }
                })
                .catch(err => {
                    const data = {
                        message: "access denied",
                    }
                    this.setState({
                        ResponseModal: true,
                        data: data
                    })
                })
        } else {
            this.setState({
                ResponseModal: false,
            })
        }
    }
    handleTransactionToApi = () => {
        let data = this.state.dataApi.status === "available" ? this.state.formDataTransBorrow : this.state.formDataTransaction
        const host = process.env.REACT_APP_HOST_API || "http://localhost:3010"
        const query = (this.state.dataApi.status === "available") ? host + `/transaction/borrow/`
            : (this.state.dataApi.status === "pending") ? host + `/transaction/accept/`
                : host + `/transaction/return/`
        console.log(data, query)
        this.props.Transaction(query, data)
            .then((res) => {
                const data = res.action.payload.data
                if (data.succes) {
                    this.setState({
                        ResponseModal: true,
                        data: data,
                    })
                    this.props.closeModal()
                } else {
                    this.setState({
                        ResponseModal: true,
                        data: data,
                    })
                    this.props.closeModal()
                }
            })
            .catch(err => {
                const data = {
                    message: "access denied",
                }
                this.setState({
                    ResponseModal: true,
                    data: data
                })
            })
    }
    handleTransaction = () => {
        this.setState({
            transaction: true,
        })
    }
    faildata = () => {
        this.setState({
            transaction: false,
        })
    }
    render() {
        const dataBorrowed = this.props.transaction.checkBorrowed
        const checkBorrowedData = dataBorrowed[0] || { Username: '', Date: '' }
        const { getGenre, dataApi, formData } = this.state
        const rawDate = new Date(this.state.dataApi.date_released)
        let year = rawDate.getFullYear()
        let month = rawDate.getMonth() < 10 ? '0' + (rawDate.getMonth() + 1) : rawDate.getMonth() + 1
        let date = rawDate.getDate() < 10 ? '0' + rawDate.getDate() : rawDate.getDate()
        let date_released = year + '-' + month + '-' + date
        return (
            <Fragment>
                <div>
                    <ResponseModal open={this.state.ResponseModal} data={this.state.data} confirmed={this.RemovingData} />
                    <TransactionModal open={this.state.transaction} close={this.faildata}
                        id={this.props.match.params.id}
                        id_users={this.props.user.userInfo.id}
                        status={dataApi.status}
                        handleFormTransaction={this.handleFormTransaction}
                        handleTransactionToApi={this.handleTransactionToApi} />
                    <Modal isOpen={this.props.modal.myModal} toggle={this.props.closeModal} size="lg">
                        <Form onSubmit={this.handleUpdate} encType="multipart/form-data">
                            <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.closeModal} charCode="x">Edit Data</ModalHeader>
                            <ModalBody>
                                <div className="boxModal">
                                    <FormGroup>
                                        <Input onChange={this.handleFile} name="image" type="file" required />
                                        <Label>Url image</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input onChange={this.handleForm} name="title" type="text" value={formData.title} required />
                                        <Label>Title</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input onChange={this.handleForm} name="date_released" type="date" required
                                            defaultValue={date_released}
                                            value={date_released}
                                        // defaultValue={new Date(formData.date_released)}
                                        // value={new Date(formData.date_released)}
                                        />
                                        <Label>Released</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="select" onChange={this.handleForm}
                                            name="genre"
                                            value={formData.genre}
                                            defaultValue={formData.genre}
                                        >
                                            {getGenre ?
                                                getGenre.map(genre => {
                                                    return <option key={genre.id} value={genre.id}>{genre.Genre}</option>
                                                })
                                                : <option>Loading...</option>
                                            }
                                        </Input>
                                        <Label>Genre</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" onChange={this.handleForm} name="description" value={formData.description} required />
                                        <Label>Description</Label>
                                    </FormGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning" className="ModalBtn">
                                    {this.state.loading ? 'Loading...' : 'Save'}
                                </Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                </div>
                <div className="pageDetail">
                    <div className="viewDetail">
                        <img id="cover" src={dataApi.image} alt="" />
                    </div>
                    <button id="back" onClick={this.back}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div id="action">
                        {
                            this.props.user.userInfo.access === 'admin' ?
                                <Fragment>
                                    <Link onClick={this.props.openModal} to="#" id="edit">Edit</Link>
                                    <Link onClick={this.handleRemove} to="#" id="delete">Delete</Link>
                                </Fragment>
                                :
                                ''
                        }
                    </div>
                    <img id="vit" src={dataApi.image} alt="" />
                    <div id="detailInfo">
                        <button id="genre">{dataApi.genre}</button>
                        {
                            this.props.user.userInfo.access === 'admin' ?
                                <Fragment>
                                    <div id="btnaccept">
                                        <button id="accept" onClick={this.handleTransaction}>accept</button>
                                    </div>
                                </Fragment>
                                : ''
                        }

                        <div id="btnborrow">
                            <button id="borrow" onClick={this.handleTransaction}>borrow</button>
                        </div>
                        <div id="btnaccept"></div>
                        <div id="btnreturn">
                            {
                                this.props.user.userInfo.access === 'admin' ?
                                    <button id="return" onClick={this.handleTransaction}>return</button>
                                    : ''
                            }
                            {
                                dataApi.status === "borrowed" ?
                                    (
                                        <Fragment>
                                            <p>Borrowed By : {checkBorrowedData.Username} </p>
                                            <p>Date Borrowed : {new Date(checkBorrowedData.Date).toDateString()} </p>
                                        </Fragment>
                                    )
                                    :
                                    ''
                            }
                        </div>
                        <p id="title"> {dataApi.title} </p>
                        <p id="Released">{new Date(dataApi.date_released).toDateString()}</p>
                        <p id="status"> {dataApi.status}</p>
                        <p id="desc">  {dataApi.description} </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
        modal: state.modal,
        genre: state.genre,
        user: state.user,
        transaction: state.transaction,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        UserInfo: () => dispatch(userInfo()),
        CheckBorrowed: (id) => dispatch(checkBorrowed(id)),
        DeleteBook: (id) => dispatch(deleteBook(id)),
        UpdateBook: (id, data) => dispatch(updateBook(id, data)),
        Transaction: (query, id) => dispatch(transaction(query, id)),
        Genre: () => dispatch(getGenre()),
        getBookId: (id) => dispatch(getBookId(id)),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail)
