import React, { Component, Fragment } from 'react';
import './Register.css';
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
                if (data === undefined) {
                    this.setState({
                        data: {message: 'undefinded'},
                        Response: true,
                    })
                } else
                if (data.success) {
                    this.setState({
                        data: data,
                        Response: true,
                    })
                    this.handleSignIn(dataUser)
                } else {
                    this.setState({
                        data: data,
                        Response: true,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    data: "msg",
                    Response: true,
                })
            })
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
            const host = window.location.host
            document.location.replace(host + "/home")
        }
    }
    render() {
        this.handleDataAuth()
        return (
            <Fragment>
                <div className="Register">
                    <div className="main">
                        <img src="https://s3-alpha-sig.figma.com/img/42af/e6f5/6406744294af0e36bd58a6bb9d5bade1?Expires=1567382400&Signature=GNF0t9kIgABnuHMnI7Ygre64zezNTfYZI416AXZH5mWHiNNpU4BQ6ElmBqhgmicEp8cNBa7Tg0pmpu9OHUyENjfMdm7E~h4dSl4WfuiGVrPQWZHB0b1MfC1-9E38KnqLacN4EpVZtjNOV6gB4vvvBKW80z1bGRhLjv2z9OrCmunrUFUkStBp~2~ExRLmOaAQegWWJZLJ2RrFZD~0qvYk~kTnnhk5J9HdIiGYpy5yvXaUq3isyopNfbL6HZlspAlw772iad5XQ4CWGIuWTg4mtKzZpKg39GWuO1Ej9h1GCYbDpdE1DYhw1zS4k0dHkg6JdI-zL9N0pXk7RF~fqc-7Uw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
                        <div className="hero-text2">
                            <p>Book is a window to the world</p>
                        </div>
                        <div className="hero-text">
                            <p>Photo by Mark Pan4ratte on Unsplash</p>
                        </div>
                    </div>
                    <div className="LoginLogo">
                        <img src="https://s3-alpha-sig.figma.com/img/5ef4/f6ec/e84f39e17cc61b2c69a33b9ad6d7736e?Expires=1567382400&Signature=BIb3Rr5PdM4FgT80aIXHtY-1waIiqI3usAtfDL79yrRiUkYzQDJbXcnFgtqcRMfZe2tglbEO2yRBc-vbg5e4FetONSgBVInok4ow7OzjSep5aqbuzcVUoGbqY91URULF1rPQbfqlaQS0JKAVsZkNqGrpnFzFLVQNIQek~vMu5A6oRw2fqKchwZbuEdTY37mRx9G6W5gG1uISPGTreyWYTkkz93Op4-j30UHkcZMGDpmn6qbiDzDdK5mk1He5aqAugRNqEGuEbs3WfvgrDviUeXeLeWPVuwVuQXbbxbWYD8AMBkcTGZPOfhDM4znqjO~K-37~~ndicWGy~8s7yDZ6fg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
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
