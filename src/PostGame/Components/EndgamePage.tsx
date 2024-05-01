import React, { useState } from 'react';

interface EndPageProps {
    initialCount: number;
}

interface EndgameComponentState {
    count: number;
}

const EndgamePage: React.FC<EndPageProps> = ({ initialCount }: EndPageProps) => {
    
    const [count, setCount] = useState<number>(initialCount);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    return (
        <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
    );
}

export default EndgamePage;
