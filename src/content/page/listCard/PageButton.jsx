import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';

class PageButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }
    plus = () => {
        const page = this.props.data.page
        const check = this.props.data.checkPage.length
        if (check === 12) {
            this.props.pagination(page + 1)
        }
    }
    minus = () => {
        const page = this.props.data.page
        if (page > 1) {
            this.props.pagination(page - 1)
        }
    }
    render() {
        const data = this.props.data
        return (
            <div className="counter">
                {
                    data.page === 1 ?
                        <Button color="info" className="minus" onClick={this.minus} disabled>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        :
                        <Button color="info" className="minus" onClick={this.minus}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                }
                <input type="text" disabled="disabled" value={data.page} />
                {
                    data.checkPage.length < 12 ?
                        <Button color="info" className="plus" onClick={this.plus} disabled>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                        :
                        <Button color="info" className="plus" onClick={this.plus}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                }
            </div>
        )
    }
}

export default PageButton
