// import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../Modal/Add';
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebar: false,
            title: "",
            page: 1,
            coloum: "B.Title",
            status: "available",
        }
    }
    handleSearch = (title) => {
        this.props.filter(title, "B.Title", null, null)
    }
    handleSubmit = (event) => {
        const page = this.state.page
        const status = this.state.status
        if (event.target.name === "G.Genre") {
            this.props.filter(event.target.value, event.target.name, page, status)
        } else if (event.target.name === "B.DateReleased") {
            this.props.filter(event.target.value, event.target.name, page, status)
        }
    }
    handleReload = () => {
        document.location.reload()
    }
    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        // document.getElementById("mySidenav").style.display = "block";
        // document.getElementById("mySidenav").style.transition = "1s";
        document.getElementById("main").style.transition = "0.5s";
        document.getElementById("main").style.marginLeft = "250px";

    }
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0px";
        // document.getElementById("mySidenav").style.display = "none";
        // document.getElementById("mySidenav").style.transition = "1s";
        document.getElementById("main").style.transition = "0.5s";
        document.getElementById("main").style.marginLeft = "0px";
    }
    handleSidebar = () => {
        if (this.state.sidebar === false) {
            this.openNav()
            this.setState({
                sidebar: true
            })
        } else {
            this.closeNav()
            this.setState({
                sidebar: false
            })
        }
    }
    handleSignOut = () => {
        localStorage.clear()
        this.closeNav()
        window.location.replace('/login')
    }
    componentDidMount = () => {
        this.closeNav()
        this.setState({
            sidebar: false
        })
    }
    render() {
        const { genre, book } = this.props
        return (
            <Fragment>
                <div id="mySidenav" className="sidenav">
                    {
                        this.props.user.userInfo.length === 0 ?
                        <Fragment>
                            <div className="sidenavContent">
                                <Link onClick={()=>window.location.replace('/login')}>Login</Link>
                                <Link onClick={()=>window.location.replace('/register')}>Register</Link>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <img src="https://pbs.twimg.com/profile_images/1156727030827716608/gppZ606-_400x400.png" alt="" />
                            <p> Username </p>
                            <p>{this.props.user.userInfo.Username}</p>
                            <p> Member Id </p>
                            <p>{this.props.user.userInfo.id}</p>
                            <div className="sidenavContent">
                                <Link onClick={this.handleSidebar} to="/home/history">History</Link>
                                    {
                                        this.props.user.userInfo.access === 'admin' ?
                                            <AddModal closeNav={this.handleSidebar} />
                                            :
                                            ''
                                    }
                                <Link onClick={this.handleSignOut}>Logout</Link>
                            </div>
                        </Fragment>
                    }
                </div>
                <nav className="navigation">
                    <span id="burger" onClick={this.handleSidebar}>&#9776;</span>
                    <div className="dropdown">
                        <Link to="/home">
                            <button className="dropbtn">All Category <FontAwesomeIcon icon={faSortDown} /></button>
                        </Link>
                        <div className="dropdown-content">
                            {genre.genreList.length > 0 ?
                                genre.genreList.map(genre => {
                                    return (
                                    <Link to={"/home?Genre="+genre.Genre}>
                                        <button
                                        onClick={this.handleSubmit}
                                        name="G.Genre"
                                        key={genre.id} to="#"
                                        value={genre.Genre} >{genre.Genre}
                                        </button>
                                    </Link>)
                                })
                                : <Link to="/home"><button>Loading...</button></Link>
                            }
                        </div>
                    </div>
                    <div className="dropdown">
                        <Link to="/home">
                            <button className="dropbtn">All Time <FontAwesomeIcon icon={faSortDown} /></button>
                        </Link>
                        <div className="dropdown-content">
                            {book.yearList.length > 0 ?
                                book.yearList.map((years, index) => {
                                    return (
                                        <Link to={"/home?DateReleased=" + years.year}>
                                        <button
                                            onClick={this.handleSubmit}
                                            name="B.DateReleased"
                                            key={index} to="#"
                                            value={years.year}>{years.year}
                                        </button>
                                    </Link>
                                    )

                                })
                                : <Link to="/home"><button>Loading...</button></Link>
                            }
                        </div>
                    </div>
                    <SearchBox search={this.handleSearch} />
                    <Link to="/home">
                        <img src="https://s3-alpha-sig.figma.com/img/5ef4/f6ec/e84f39e17cc61b2c69a33b9ad6d7736e?Expires=1567382400&Signature=BIb3Rr5PdM4FgT80aIXHtY-1waIiqI3usAtfDL79yrRiUkYzQDJbXcnFgtqcRMfZe2tglbEO2yRBc-vbg5e4FetONSgBVInok4ow7OzjSep5aqbuzcVUoGbqY91URULF1rPQbfqlaQS0JKAVsZkNqGrpnFzFLVQNIQek~vMu5A6oRw2fqKchwZbuEdTY37mRx9G6W5gG1uISPGTreyWYTkkz93Op4-j30UHkcZMGDpmn6qbiDzDdK5mk1He5aqAugRNqEGuEbs3WfvgrDviUeXeLeWPVuwVuQXbbxbWYD8AMBkcTGZPOfhDM4znqjO~K-37~~ndicWGy~8s7yDZ6fg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
                        <span className="library" >Library</span>
                    </Link>
                </nav>
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
export default connect(mapStateToProps)(NavBar)
