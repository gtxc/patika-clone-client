import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Preferences from "../Preferences/Preferences";
import Login from "../Login/Login";
import useToken from "./useToken";
import Logout from "../Logout/Logout";

function App() {

    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={ setToken } />
    }

    return (
        <div className={"wrapper"}>
            <a href={"http://localhost:3000/"}>Application</a><span> </span>
            <a href={"http://localhost:3000/dashboard"}>Dashboard</a><span> </span>
            <a href={"http://localhost:3000/preferences"}>Preferences</a><span> </span>
            <a href={"http://localhost:3000/logout"}>Logout</a><span> </span>
            <h1>Application</h1>
            <BrowserRouter>
                <Routes>
                    <Route path={"/dashboard"} element={<Dashboard />}/>
                    <Route path={"/preferences"} element={<Preferences />}/>
                    <Route path={"/logout"} element={<Logout />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;


//,
//"proxy": "http://localhost:8080"