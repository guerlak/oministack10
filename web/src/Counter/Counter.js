import React, { useState } from "react"

const Counter = () => {

    const [counter, fonix] = useState(0);

    function incrementCounter() {
        fonix(counter + 1);
    }

    return (
        <div>
            <h2>{counter}</h2>
            <button onClick={incrementCounter}>+</button>
        </div>
    )
}

export default Counter;