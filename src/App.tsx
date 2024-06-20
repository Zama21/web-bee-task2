import { useState } from 'react';
import { Example } from './Component/Example';
import { Example2 } from './Component/Example2';
import { LeaveTabCounter } from './Component/LeaveTabCounter';

function App() {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            {/* <LeaveTabCounter /> */}
            {/* <Example /> */}
            <Example2 />
            {/* Проверял таким образом удаляются ли слушатели при демонтаже. Они удаляются!*/}
            {/* <button onClick={() => setCounter(prev => prev + 1)}>
                {counter}
            </button>
            {counter % 2 == 0 ? <LeaveTabCounter /> : counter} */}
        </div>
    );
}

export default App;
