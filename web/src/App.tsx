import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Battery from './Battery';
import logo from './logo.png';
import blackCat from './pexels-helena-lopes-1931367.jpg';
import {timeAgoInWords} from './Utils';


function App() {
  const searchParams = new URLSearchParams(window.location.search);
  // const searchEntries = [...searchParams.entries()];

  const batteryLevelString = searchParams.get('battery_level');
  const batteryCachedAtString = searchParams.get('battery_level_cached_at');
  const batteryLevel = batteryLevelString && parseInt(batteryLevelString)
  const batteryCachedAt = batteryCachedAtString && new Date(batteryCachedAtString)

  const batteryInfo = batteryLevel && batteryCachedAt ? { batteryLevel, batteryCachedAt } : undefined

  const catpissLastCleanedAtString = searchParams.get('catpiss_last_cleaned_at');
  const catpissLastCleanedAt = catpissLastCleanedAtString && new Date(catpissLastCleanedAtString);

  // Return the App component.
  return (
    <div className="flex flex-col max-w-md min-h-screen m-auto text-center text-white">
      <header className="flex flex-col items-center justify-center pt-8 pb-2">
        <h1 className="mb-8 text-6xl text-white font-cool">Catpiss</h1>
        <figure>
          <img src={blackCat} className="mb-2 h-72" alt="Black cat in flower pot" />
          <figcaption className="text-xs">
            Photo by <a href="https://www.pexels.com/@wildlittlethingsphoto" target="_blank" className="underline">Helena Lopes</a> from Pexels
          </figcaption>
        </figure>
      </header>

      {catpissLastCleanedAt && <div className="px-8 text-3xl font-cool">Catpiss was last cleaned {timeAgoInWords(catpissLastCleanedAt)}</div>}

      <Battery batteryInfo={batteryInfo} />
    </div>
  );
}

export default App;
