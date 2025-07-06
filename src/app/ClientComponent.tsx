"use client"

import React from "react";
import { useState } from "react";

const ClientComponent = () => {
    // 単一のユーザーオブジェクトとして管理
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    
    const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async () => {
        fetch("/api/users", {method: "POST",body: JSON.stringify(user),}).then((response) => {
            response.json().then((res) => console.log(res))
        })
    }
    
    return (
        <div>
            <input className="border" type="text" name="name" value={user.name} onChange={onChangeData} />
            <input className="border" type="text" name="email" value={user.email} onChange={onChangeData} />
            <input className="border" type="text" name="password" value={user.password} onChange={onChangeData} />
            <button onClick={handleSubmit}>送信</button>
        </div>
    )
}

export default ClientComponent;