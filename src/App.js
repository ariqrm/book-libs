import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './content/page/Login/Login';
import Register from './content/page/Register/Register';
import NavBar from './component/Navbar/Navbar';
import ExploreBook from './content/page/listCard/ExploreBook';
// import listCard from './content/page/listCard/listCard';
import { userInfo } from './redux/Actions/Users';
import { getGenre } from './redux/Actions/Genres';
import { getYear, getFilterBook } from './redux/Actions/Books';
import { getReturn, getBorrow } from './redux/Actions/Transactions';
import { connect } from 'react-redux';
import ViewDetail from './content/page/listCard/viewDetail';
import HistoryTransaction from './content/page/listCard/history';

const NoMatch = () => {
    return <h2>404, Not Found</h2>
}
class App extends Component {
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
      detail_id_books: "",
    }
  }
  getAPI = async (title, coloum, page, available) => {
    // const params = new URLSearchParams(window.location.search)
    const Title =  title || this.state.title
    const Coloum = coloum || this.state.coloum
    // const Title = params.get("Genre") || params.get("DateReleased") || title || this.state.title
    // const Coloum = params.get("Genre") ? "G.Genre" : params.get("DateReleased") ? "B.DateReleased" : this.state.coloum
    const Page = page || this.state.page
    const Available = available || this.state.status
    // const checkPage = Page + 1
    // await this.props.Book(Title, Coloum, checkPage, Available)
    // this.setState({
    // })
    await this.props.Book(Title, Coloum, Page, Available)
    this.setState({
      checkPage: this.props.book.bookList,
      getBook: this.props.book,
      coloum: Coloum,
      page: Page,
      title: Title,
      status: Available
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
    const Title = this.state.title
    const Coloum = this.state.coloum
    const Page = page || this.state.page
    const Status = this.state.status
    if (page) {
      this.getAPI(Title, Coloum, Page, Status)
    }
  }
  handleViewDetail = (id) => {
    // console.log(this.props)
    this.props.history.push(`/home/detail-book/${id}`)
  }
  id_books=(id)=>{
    this.setState({
      detail_id_books: id,
    })
  }
  componentDidMount = () => {
    this.props.Book()
      .then(res => {
        this.setState({
          getBook: this.props.book.bookList,
          checkPage: this.props.book.bookList,
        })
      })
    this.props.Genre()
      .then(res => {
        this.setState({
          getGenre: this.props.genre.genreList,
        })
      })
    this.props.Year()
      .then(res => {
        this.setState({
          getYear: this.props.book.yearList,
        })
      })
    this.props.UserInfo()
      .then(res => {
        const id_users = this.props.user.userInfo.id
        this.props.GetBorrow(id_users)
        this.props.GetReturn(id_users)
      })
  }
  render(){
    const data = this.state
    console.log(new URLSearchParams(window.location.search).get("DateReleased"))
    return (
      <Fragment>
        <Router>
          <div className="main" id="main">
            <main>
            {
              window.location.pathname === '/login' ||
              window.location.pathname === '/Login' || 
              window.location.pathname === '/register' ||
              window.location.pathname === '/Register' || 
              window.location.pathname === `/home/detail-book/${data.detail_id_books}` ? '':
              <NavBar filter={this.handleSubmit} />
            }
              <Switch>
                <Route path='/' exact render={props => (<ExploreBook filter={this.handleSubmit} data={this.state} {...props} />)} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/home' exact render={props => (<ExploreBook filter={this.handleSubmit} data={this.state} {...props} />)} />
                <Route path='/history' render={props => (<HistoryTransaction data={this.state} {...props} />)} />
                <Route path='/home/detail-book/:id' render={props => (<ViewDetail id_books={this.id_books} {...props} />)} />
                {/* <Route path='/homelist' exact component={listCard} /> */}
                <Route component={NoMatch} />
              </Switch>
            </main>
            <p id="404" hidden></p>
          </div>
        </Router>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    genre: state.genre,
    book: state.book,
    user: state.user,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    UserInfo: () => dispatch(userInfo()),
    Genre: () => dispatch(getGenre()),
    Year: () => dispatch(getYear()),
    GetReturn: (id) => dispatch(getReturn(id)),
    GetBorrow: (id) => dispatch(getBorrow(id)),
    Book: (mTitle, mColoum, mPage, mavailable) => dispatch(getFilterBook(mTitle, mColoum, mPage, mavailable)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (App);
