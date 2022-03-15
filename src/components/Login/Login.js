import React, {useState} from "react";
import PropTypes from "prop-types";
import "./Login.css"
import useToken from "../App/useToken";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/auth/signin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {

    const [username, setUsername] = useState();
    const [passwd, setPasswd] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            passwd
        });
        setToken(token);
    }

    return (
        <div className={"login-wrapper"}>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type={"text"} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type={"password"} onChange={e => setPasswd(e.target.value)} />
                </label>
                <div>
                    <button type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}