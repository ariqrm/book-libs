import React, { Component, Fragment } from 'react'
// import Axios from 'axios';
import './Login.css'
import bgAuth from '../../../assets/bgAuth.jpeg';
import headerIcon from '../../../assets/headerIcon.png';
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { connect } from 'react-redux';
import { signIn } from '../../../redux/Actions/Users';
import ResponseModal from '../../../component/Modal/Response';

class Login extends Component {
    state = {
        data: [],
        user: [],
        formData: {
            email: "",
            // username: "",
            // full_name: "",
            password: ""
        },
        token: "",
        Response: false,
        isUpdateData: false
    }
    handleLogin = (event) => {
        const newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        })
    }
    handleSubmit = () => {
        const dataUser = this.state.formData
        // console.log(dataUser)
        this.props.SignIn(dataUser)
            .then((res) => {
                const data = res.action.payload.data
                if (data.success) {
                    console.log(data)
                    localStorage.setItem('Token=', JSON.stringify(data.data.token));
                    localStorage.setItem('Data=', JSON.stringify(data.data.data));
                    window.location.replace("/home")
                } else {
                    this.setState({
                        data: data,
                        Response: true,
                    })
                }
            })
            .catch(err => console.log("error: ", err))
    }
    handleDataAuth = () => {
        const auth = localStorage.getItem('Token=')
        if (auth) {
            this.props.history.push(`/home`)
            // const host = window.location.host
            // window.location.replace(host+"/home")
        }
    }
    render() {
        this.handleDataAuth()
        return (
            <Fragment>
                    <div className="Login">
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
                            <p>Welcome Back, Please Login to your account</p>
                        </div>
                        <h1>Login</h1>
                        <div className="box">
                            <div>
                                <input type="text" name="email" onChange={this.handleLogin} required />
                                <label>Email</label>
                            </div>
                            <div>
                                <input type="password" name="password" onChange={this.handleLogin} required />
                                <label>Password</label>
                            </div>
                            <div style={{ textAlign: "right", marginBottom: "10%" }}>
                                {/* <input type="checkbox" name="rememberMe" />
                                <p>Remember me</p> */}
                                <Link to="#" style={{
                                    textDecoration: "none",
                                    color: "grey"
                                }}>Forgot Password</Link>
                            </div>
                            <input onClick={this.handleSubmit} type="submit" name="" value="Login" />
                            <input type="button" onClick={() => this.props.history.push(`/Register`)} value="Sign Up" />
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
        SignIn: (data) => dispatch(signIn(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
