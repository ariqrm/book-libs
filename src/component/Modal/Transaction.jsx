import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap'

class TransactionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }
    render() {
        console.log(this.props.id_users)
        return (
            <Fragment>
                <Modal isOpen={this.props.open} toggle={this.props.close} size="lg">
                    {/* <Form onSubmit={this.handleUpdate}> */}
                    <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.close} charCode="x">Data Transaction</ModalHeader>
                    <ModalBody>
                        <div className="boxModal">
                            {
                                this.props.status === "available" ? 
                                    <FormGroup>
                                        <Input onChange={this.props.handleFormTransaction} defaultValue={this.props.id_users} value={this.props.id_users} name="id_users" type="text" disabled />
                                        <Label>Member Code</Label>
                                    </FormGroup>
                                    : ''
                            }
                            <FormGroup>
                                <Input onChange={this.props.handleFormTransaction} name="id_book" type="text" value={this.props.id} disabled />
                                <Label>Id Book</Label>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.props.handleTransactionToApi} color="warning" className="ModalBtn">confirm</Button>
                    </ModalFooter>
                    {/* </Form> */}
                </Modal>
            </Fragment>
        )
    }
}

export default TransactionModal
