import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import logo from './logo.png';
import blackCat from './pexels-helena-lopes-1931367.jpg';

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  const searchParams = new URLSearchParams(window.location.search);
  const searchEntries = [...searchParams.entries()];

  // Return the App component.
  return (
    <div className="text-center">
      <header className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-800">
        <h1 className="mb-8 text-4xl text-white">Catpiss</h1>
        <figure className="mb-16">
          <img src={blackCat} className="mb-2 h-72" alt="Black cat in flower pot" />
          <figcaption className="text-xs">
            Photo by <a href="https://www.pexels.com/@wildlittlethingsphoto" target="_blank" className="underline">Helena Lopes</a> from Pexels
          </figcaption>
        </figure>


        {searchEntries.map(([key, value]) => (
          <p>
            {key}: {value}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
