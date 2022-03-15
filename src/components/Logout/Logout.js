import React from "react";

export default function Logout() {
    localStorage.clear();
    return (
        <p>Logged out!</p>
    )
}