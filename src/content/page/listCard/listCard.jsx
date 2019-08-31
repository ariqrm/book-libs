import React, { Component, Fragment } from 'react'
import Card from '../../../component/Card/Card'
// import NavBar from '../../../component/Navbar/Navbar'
import { connect } from 'react-redux';
// import { handleDataAuth } from '../../../redux/Actions/Users';
import { getFilterBook } from '../../../redux/Actions/Books';
import './listCard.css'
// import Caraosel from '../../../component/caraosel'
import PageButton from './PageButton';
// import Carousel2 from '../../../component/caraosel2';
import { Spinner } from 'reactstrap';

class listCard extends Component {
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
    getAPI = async (title, coloum, page, available) => {
        const mTitle = title || this.state.title
        const mColoum = coloum || this.state.coloum
        const mPage = page || this.state.page
        const mavailable = available || this.state.status
        const checkPage = mPage + 1
        await this.props.dispatch(getFilterBook(mTitle, mColoum, checkPage, mavailable))
        this.setState({
            checkPage: this.props.book.bookList
        })
        await this.props.dispatch(getFilterBook(mTitle, mColoum, mPage, mavailable))
        this.setState({
            getBook: this.props.book,
            coloum: mColoum,
            page: mPage,
            title: mTitle,
            status: mavailable
        })
    }
    handleSubmit = (title, coloum, page, status) => {
        this.getAPI(title, coloum, page, status)
    }
    handleStatus = (event) => {
        const title = this.state.title
        const coloum = this.state.coloum
        const page = (this.state.page > 1) ? 1 : this.state.page
        const status = event.target.name
        if (event.target.name === "borrowed") {
            this.getAPI(title, coloum, page, status)
        } else
            if (event.target.name === "available") {
                this.getAPI(title, coloum, page, status)
            }
    }
    handlePage = (page) => {
        const title = this.state.title
        const coloum = this.state.coloum
        const mpage = page || this.state.page
        const status = this.state.status
        if (page) {
            this.getAPI(title, coloum, mpage, status)
        }
    }
    handleViewDetail = (id) => {
        // console.log(this.props)
        this.props.history.push(`/home/detail-book/${id}`)
    }
    componentDidMount = async () => {
        await this.props.dispatch(getFilterBook())
        this.setState({
            getBook: this.props.book,
            checkPage: this.props.book.bookList,
        })
    }
    render() {
        // handleDataAuth()
        const { getBook, title, coloum, status, page } = this.state;
        return (
            <Fragment>
                {/* <NavBar filter={this.handleSubmit} /> */}
                {/* <Caraosel/> */}
                <div style={{ paddingTop: '50px' }}>
                    {/* <Carousel2 /> */}
                </div>
                <div className="boxContent">
                    <h1 style={{ color: "grey", textAlign: "center" }}>List Book</h1 >
                    <button className="btnAvailable" name="available" onClick={this.handleStatus}>available</button>
                    <button className="btnBorrow" name="borrowed" onClick={this.handleStatus}>borrowed</button>
                    {
                        title ?
                            <p id="filter">Filtered By {coloum === "G.NameOfGenre" ? "Genre" : "Year Realesed"} : {title} | {status} | Page : {page}</p>
                            :
                            <p></p>
                    }

                    {
                        getBook.bookList ? getBook.bookList.map(book => {
                            return <Card key={book.id} data={book} viewDitail={this.handleViewDetail} remove={this.handleRemove} update={this.handleUpdate} />
                        })
                            :
                            <div className="boxLoad">
                                <p style={{ fontSize: 50, textAlign: 'center' }}>
                                    Loading
                            <Spinner style={{ width: '3rem', height: '3rem', fontSize: 50, textAlign: 'center' }} color="secondary" />
                                </p>
                            </div>
                    }
                    <PageButton data={this.state} pagination={this.handlePage} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book
    }
}

export default connect(mapStateToProps)(listCard)
