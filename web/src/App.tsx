import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import logo from './logo.png';

const Code: FunctionComponent = (props) => (
  <code className="px-2 py-1 bg-gray-600">
    {props.children}
  </code>
)

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="text-center App">
      <header className="flex flex-col items-center justify-center min-h-screen text-3xl text-white bg-gray-800">
        <img src={logo} className="mb-12 pointer-events-none h-52 animate-pulse" alt="logo" />
        <p className='p-2'>
          Edit <Code>src/App.jsx</Code> and save to reload.
        </p>
        <p className='p-2'>
          Page has been open for <Code>{count}</Code> seconds.
        </p>
        <p className='p-2'>
          <a
            className="text-blue-500"
            href="https://preactjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Preact
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
