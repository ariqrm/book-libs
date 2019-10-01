import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'

class ResponseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }
    handleHome = () => {
        window.location.replace('/home')
    }
    handleReload = () => {
        if (this.props.data.message === "succes return" || "succes borrow") {
            window.location.reload()
        } else if (this.props.data.message === "wrong input") {
            window.location.reload()
        } else if (this.props.data.message === "book data updated") {
            window.location.reload()
        } else if (this.props.data.message === "book deleted") {
            // window.location.replace ('/home')
            this.props.history.push('/home')
        } else {
            // window.location.replace('/home')
            this.props.history.push('/home')
        }
    }
    render() {
        return (
            <Fragment>
                <Modal isOpen={this.props.open}>
                    <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>{this.props.data.success ? "Success" : !this.props.data.success === false ? "Failed" : "Confirmation"}</ModalHeader>
                    <ModalBody>
                        {
                            this.props.data.success ?
                                <div style={{ textAlignLast: "center", color: "green", textAlign: "center" }} >
                                    <FontAwesomeIcon style={{ fontSize: "60px" }} icon={faCheckCircle} />
                                    <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>{this.props.data.message}</p>
                                </div>
                                :
                                <div style={{ textAlignLast: "center", color: "red", textAlign: "center" }} >
                                    <FontAwesomeIcon style={{ fontSize: "60px" }} icon={faBan} />
                                    <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>{this.props.data.message}</p>
                                </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.props.data.message === "Are you sure ?" ?
                            <Fragment>
                                <Button color="warning" className="ModalBtn" onClick={()=>this.props.confirmed(false)}>cencel</Button>
                                <Button color="warning" className="ModalBtn" onClick={()=>this.props.confirmed(true)}>Yes</Button>
                            </Fragment>
                                :
                            this.props.data.message === "book deleted" ?
                                <Button color="warning" className="ModalBtn" onClick={this.handleHome}>home</Button>
                                :
                                <Button color="warning" className="ModalBtn" onClick={this.handleReload}>Reload</Button>
                        }
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default ResponseModal
