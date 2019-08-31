import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleSearch: "",
            coloum: "B.Title"
        }
    }
    handleSearch = (event) => {
        var newTitle = { ...this.state.title }
        newTitle = event.target.value
        this.setState({
            titleSearch: newTitle
        })
    }
    handleSubmit = (event) => {
        if (event.key === "Enter") {
            this.props.search(this.state.titleSearch)
        }
    }
    render() {
        return (
            <Fragment>
                <div className="seacrhBox">
                    <FontAwesomeIcon icon={faSearch} />
                    <input name="B.Title" onChange={this.handleSearch} onKeyPress={this.handleSubmit} type="text" placeholder="Search..." />
                </div>
            </Fragment>
        )
    }
}

export default SearchBox
