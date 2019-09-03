import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux';
import { addBook } from '../../redux/Actions/Books';
import { getGenre } from '../../redux/Actions/Genres';
import { openModal, closeModal } from '../../redux/Actions/Modals';
import './Modal.css'
import ResponseModal from './Response';

export class AddModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getGenre: [],
            bookAdded: [],
            book: [],
            formData: {
                Image: "https://static9.depositphotos.com/1008244/1074/v/950/depositphotos_10745131-stock-illustration-open-book.jpg",
                Title: "",
                DateReleased: new Date().toISOString().split('T')[0],
                id_genre: 1,
                id_status: 2,
                Description: ""
            },
            isAddData: false,
        }
    }

    handleHome = () => {
        this.setState({
            isAddData: false
        })
        window.location.reload()
    }
    handleAddBook = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        })
    }
    handleSubmit = () => {
        this.props.addBook(this.state.formData)
            .then((res) => {
                const data = res.action.payload.data
                if (data.succes) {
                    this.setState({
                        isAddData: true,
                        bookAdded: data,
                    })
                    this.props.closeModal()
                } else {
                    const data = {
                        message: "access denied",
                    }
                    this.setState({
                        isAddData: true,
                        bookAdded: data
                    })
                }
            })
            .catch(err => {
                console.log("error: ", err)
                const data = {
                    message: "access denied",
                }
                this.setState({
                    isAddData: true,
                    bookAdded: data
                })
            })
    }
    componentDidMount = async () => {
        await this.props.Genre();
        this.setState({
            getGenre: this.props.genre.genreList,
        });
    };
    handleClick = () => {
        this.props.openModal()
        this.props.closeNav(true)
    }
    render() {
        const { getGenre } = this.state
        return (
            <div>
                <Link to="#" onClick={this.handleClick}>Add Book{console.log(this.props.modal)}</Link>
                <Modal isOpen={this.props.modal.myModal} toggle={this.props.closeModal} size="lg">
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.closeModal} charCode="x">Add Data</ModalHeader>
                        <ModalBody>
                            <div className="boxModal">
                                <FormGroup>
                                    <Input onChange={this.handleAddBook} name="Image" type="file" placeholder="Url Image" required />
                                    <Label>Url image</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input onChange={this.handleAddBook} name="Title" type="text" placeholder="Title of books" required />
                                    <Label>Title</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input onChange={this.handleAddBook} name="DateReleased" value={this.state.formData.DateReleased} type="date" required />
                                    <Label>Released</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="select" onChange={this.handleAddBook} name="id_genre">
                                        {getGenre ?
                                            getGenre.map(genre => {
                                                return <option key={genre.id} value={genre.id}>{genre.Genre}</option>
                                            })
                                            : <option>Loading Fetch...</option>
                                        }
                                    </Input>
                                    <Label>Genre</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="textarea" onChange={this.handleAddBook} name="Description" placeholder="Description" required />
                                    <Label>Description</Label>
                                </FormGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" className="ModalBtn">Save</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <ResponseModal open={this.state.isAddData} data={this.state.bookAdded} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
        modal: state.modal,
        genre: state.genre,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Genre: () => dispatch(getGenre()),
        addBook: (data) => dispatch(addBook(data)),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddModal)