import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import Axios from 'axios';
import './carousel.css'

class CarouselBook extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, items: [] };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
    componentDidMount = () => {
        const host = "http://localhost:3010" || process.env.REACT_APP_HOST_API
        Axios.get(host+'/books/')
            .then(res => {
                this.setState({ items: res.data.data });
            })
            .catch(err => console.log('error =', err));
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex, items } = this.state;
        const slides = this.state.items.map((book) => {
            return (
                <CarouselItem style={{}}
                    tag="div"
                    className="custom-tag"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={book.id}
                >
                    <img src={book.image} alt={book.title} />
                    <CarouselCaption captionText={book.title} captionHeader={book.title} />
                </CarouselItem>
            )
        })

        return (
            <div>
                <Carousel style={{ height: "310px" }}
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    className="carousel slide carousel-fade"
                >
                    <CarouselIndicators style={{}} items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>

            </div>
        )
    }
}


export default CarouselBook
