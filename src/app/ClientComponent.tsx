"use client"

import React from "react";
import { useState } from "react";

const ClientComponent = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

export default ClientComponent;