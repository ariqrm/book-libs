import React, { Component, Fragment } from 'react'
import Card from '../../../component/Card/Card'
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { handleDataAuth } from '../../../redux/Actions/Users';
// import { getFilterBook } from '../../../redux/Actions/Books';
import './listCard.css'
import PageButton from './PageButton';
import CarouselBook from '../../../component/Carousel/Carousel';

class ExploreBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getGenre: [],
            getYear: [],
            sidebar: false,
            getBook: [],
            title: "",
            page: 1,
            coloum: "B.Title",
            status: "available",
            checkPage: [],
        }
    }
    handleSubmit = (title, coloum, page, status) => {
        this.props.filter(title, coloum, page, status)
    }
    handleStatus = (event) => {
        const title = this.props.data.title
        const coloum = this.props.data.coloum
        const page = (this.props.data.page > 1) ? 1 : this.props.data.page
        const status = event.target.name
        if (event.target.name === "borrowed") {
            this.props.filter(title, coloum, page, status)
        } else
        if (event.target.name === "available") {
            this.props.filter(title, coloum, page, status)
        } else
        if (event.target.name === "pending") {
            this.props.filter(title, coloum, page, status)
        }
    }
    handlePage = (page) => {
        const title = this.props.data.title
        const coloum = this.props.data.coloum
        const mpage = page || this.props.data.page
        const status = this.props.data.status
        if (page) {
            this.props.filter(title, coloum, mpage, status)
        }
    }
    handleViewDetail = (id) => {
        this.props.history.push(`/home/detail-book/${id}`)
    }
    // componentDidMount = async () => {
    //     await this.props.dispatch(getFilterBook())
    //     this.setState({
    //         getBook: this.props.book,
    //         checkPage: this.props.book.bookList,
    //     })
    // }
    timeout=()=>{
        setTimeout(() =>{document.getElementById("404").innerHTML="Book Not Found"},4000)
    }
    render() {
        handleDataAuth()
        const { book } = this.props || '';
        return (
            <Fragment>
                <div style={{ paddingTop: '50px' }}>
                <CarouselBook />
                </div>
                <div className="boxContent">
                    <h1 style={{ color: "grey", textAlign: "center" }}>List Book</h1 >
                    <button className="btnAvailable" name="available" onClick={this.handleStatus}>available</button>
                    <button className="btnBorrow" name="borrowed" onClick={this.handleStatus}>borrowed</button>
                    {
                        this.props.user.userInfo.access === 'admin' ?
                        <button className="btnAccept" name="pending" onClick={this.handleStatus}>request</button>
                        : ''
                    }
                    {
                        this.props.data.coloum === "B.Title" ?
                            <p id="filter">Search {this.props.data.title ? "Book title :" + this.props.data.title : "All"} | {this.props.data.status} | Page : {this.props.data.page}</p>
                            :
                            this.props.data.title ?
                                <p id="filter">Filtered By {this.props.data.coloum === "G.Genre" ? "Genre" : "Year Realesed"} : {this.props.data.title} | {this.props.data.status} | Page : {this.props.data.page}</p>
                                :
                                <p></p>
                    }

                    {
                        book.bookList.length > 0 ? book.bookList.map(book => {
                            return <Card key={book.id} data={book} viewDitail={this.handleViewDetail} remove={this.handleRemove} update={this.handleUpdate} />
                        })
                            :
                                <div className="boxLoad" >
                                    <p id="404" style={{ fontSize: 50, textAlign: 'center' }}>Loading
                                    <Spinner style={{ width: '3rem', height: '3rem', fontSize: 50, textAlign: 'center' }} color="secondary" /></p>
                                    {this.timeout()}
                                </div>
                    }
                    <p id="404" hidden></p>
                    <PageButton data={this.props.data} pagination={this.handlePage} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        genre: state.genre,
        book: state.book,
        user: state.user,
    }
}

export default connect(mapStateToProps)(ExploreBook)
