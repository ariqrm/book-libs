import React, { Component, Fragment } from 'react';
import './Register.css';
import bgAuth from '../../../assets/bgAuth.jpeg';
import headerIcon from '../../../assets/headerIcon.png';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../../redux/Actions/Users';
import ResponseModal from '../../../component/Modal/Response';

class Register extends Component {
    state = {
        user: [],
        data: [],
        formData: {
            email: "",
            username: "",
            full_name: "",
            password: ""
        },
        Response: false,
        isUpdateData: false
    }
    handleSignIn = (dataUser) => {
        this.props.SignIn(dataUser)
            .then((res) => {
                const data = res.action.payload.data
                if (data.success) {
                    localStorage.setItem('Token=', JSON.stringify(data.data.token));
                    localStorage.setItem('Data=', JSON.stringify(data.data.data));
                    window.location.replace('/home')
                } else {
                    console.log("gagal")
                }
            })
            .catch(err => console.log("error: ", err))

    }
    getPostAPI = () => {
        const dataUser = this.state.formData
        this.props.SignUp(dataUser)
            .then((res) => {
                const data = res.action.payload.data
                if (data.success) {
                    this.setState({
                        data: data,
                        Response: true,
                    })
                    this.handleSignIn(dataUser)
                } else {
                    console.log("error", dataUser)
                    this.setState({
                        data: data,
                        Response: true,
                    })
                }
            })
            .catch(err => console.log("error: ", err))
    }
    handleRegister = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        })
    }
    handleSubmit = () => {
        this.getPostAPI()
    }
    handleDataAuth = () => {
        const auth = localStorage.getItem('Token=')
        if (auth) {
            this.props.history.push(`/home`)
            // const host = window.location.host
            // document.location.replace(host + "/home")
        }
    }
    render() {
        this.handleDataAuth()
        return (
            <Fragment>
                <div className="Register">
                    <div className="main">
                        <img id="auth" src={bgAuth} alt="" />
                        <div className="hero-text2">
                            <p>Book is a window to the world</p>
                        </div>
                        <div className="hero-text">
                            <p>Photo by Mark Pan4ratte on Unsplash</p>
                        </div>
                    </div>
                    <div className="LoginLogo">
                        <img src={headerIcon} alt="" />
                    </div>
                    <div className="hero-text3">
                        <p>By signing up, you agree to Book’s &nbsp;
                            <Link to="#">Terms and Conditions</Link> &&nbsp;
                            <Link to="#">Privacy Policy</Link></p>
                    </div>
                    <div className="hero-text4">
                        <p>Welcome Back, Please Register to create account</p>
                    </div>
                    <h1>Register</h1>
                    <div className="box">
                        <div>
                            <input type="text" name="username" onChange={this.handleRegister} required />
                            <label>Username</label>
                        </div>
                        <div>
                            <input type="text" name="full_name" onChange={this.handleRegister} required />
                            <label>Full Name</label>
                        </div>
                        <div>
                            <input type="text" name="email" onChange={this.handleRegister} required />
                            <label>Email</label>
                        </div>
                        <div>
                            <input type="password" name="password" onChange={this.handleRegister} required />
                            <label>Password</label>
                        </div>
                        <input type="submit" onClick={this.handleSubmit} value="Register" />
                        <input type="button" onClick={() => this.props.history.push(`/Login`)} value="Sign In" />
                    </div>
                </div>
                <ResponseModal open={this.state.Response} data={this.state.data} />
            </Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SignUp: (data) => dispatch(signUp(data)),
        SignIn: (data) => dispatch(signIn(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
