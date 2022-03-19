// import logo from './logo.svg';
import React, {Component} from "react";
import {Route, Link, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import "bootstrap/dist/css/bootstrap.min.css";
// import EventBus from "./common/EventBus";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("MODERATOR"),
                showAdminBoard: user.roles.includes("DEV"),
            });
        }

        // EventBus.on("logout", () => {
        //     this.logOut();
        // });
    }

    // componentWillMount() {
    //     EventBus.remove("logout");
    // }

    logout() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        GTXC
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href={"/login"} className="nav-link" onClick={this.logout}>
                                    Log Out
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Log In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route exact path={"/"} element={<Home/>}/>
                        <Route exact path={"/home"} element={<Home/>}/>
                        <Route exact path={"/login"} element={<Login/>}/>
                        <Route exact path={"/register"} element={<Register/>}/>
                        <Route exact path={"/profile"} element={<Profile/>}/>
                        <Route exact path={"/user"} element={<BoardUser/>}/>
                        <Route path={"/mod"} element={<BoardModerator/>}/>
                        <Route path={"/admin"} element={<BoardAdmin/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}
