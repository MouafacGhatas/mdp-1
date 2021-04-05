import React, { Component } from "react";


import { 
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

import { baseUrl } from '../shared/baseUrl';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: true
        };

        this.toggleModal = this.toggleModal.bind(this);    
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

      }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


      handleLogin(event) {
        console.log("HI");
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    

    
    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleLogin}>
                      <FormGroup>
                          <Label htmlFor="username">Username</Label>
                          <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                      </FormGroup>

                      <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                      </FormGroup>
                      <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>


                </ModalBody>
                </Modal>
            </React.Fragment>
        );
        }
      
}
export default SignIn;

