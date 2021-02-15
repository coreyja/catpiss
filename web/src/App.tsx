import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import logo from './logo.png';
import blackCat from './pexels-helena-lopes-1931367.jpg';


interface BatteryProps {
  batteryInfo?: {batteryLevel: number, batteryCachedAt: Date}
}

const timeAgoInWords = (timeInPast: Date): string => {
  const diffMillis = new Date().valueOf() - timeInPast.valueOf();

  if (diffMillis < 1000) { return "just now" }

  const diffSeconds = diffMillis / 1000;
  if (diffSeconds < 60) { return `${Math.round(diffSeconds)} seconds ago` }

  const diffMinutes = diffSeconds / 60;
  if (diffMinutes < 60) { return `${Math.round(diffMinutes)} minutes ago` }

  const diffHours = diffMinutes / 60;
  if (diffHours < 24) { return `${Math.round(diffHours)} hours ago` }

  const diffDays = diffHours / 24
  return `${Math.round(diffDays)} days and ${Math.round(diffHours)} hours`
}

const backgroundColorClassForBatteryLevel = (level: number) => {
  if (level > 50) {
    return 'bg-green-500';
  } else if (level > 25) {
    return 'bg-yellow-500';
  } else {
    return 'bg-red-500';
  }
}

const Battery: FunctionComponent<BatteryProps> = ({batteryInfo}) => {
  if (!batteryInfo) return null;

  const batteryColorClass = backgroundColorClassForBatteryLevel(batteryInfo.batteryLevel)

  const batteryCachedAtAgoMillis = new Date().valueOf() - batteryInfo.batteryCachedAt.valueOf()
  const batteryCachedAtAgoHours = batteryCachedAtAgoMillis / 1000 / 60 / 60;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex w-24 my-1 border-2 border-gray-400 rounded shadow">
        <div
          className="absolute z-10 flex h-6 mt-2 ml-24 border-r-8 border-gray-400 rounded-r"></div>
        <div
          className={`flex items-center justify-center py-4 m-1 text-xs font-bold leading-none text-center text-white ${batteryColorClass} cursor-default`}
          style={{width: `${batteryInfo.batteryLevel}%`}}>
          <div className="absolute left-0 w-full text-white">
            {`${batteryInfo.batteryLevel}%`}
          </div>
        </div>
      </div>

      <div>
        As of {timeAgoInWords(batteryInfo.batteryCachedAt)}
      </div>
    </div>
  )
}

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
    <div className="min-h-screen text-center text-white bg-gray-800">
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="mb-8 text-4xl text-white">Catpiss</h1>
        <figure>
          <img src={blackCat} className="mb-2 h-72" alt="Black cat in flower pot" />
          <figcaption className="text-xs">
            Photo by <a href="https://www.pexels.com/@wildlittlethingsphoto" target="_blank" className="underline">Helena Lopes</a> from Pexels
          </figcaption>
        </figure>
      </header>

      <Battery batteryInfo={batteryInfo} />

      {catpissLastCleanedAt && <div>Catpiss was last cleaned {timeAgoInWords(catpissLastCleanedAt)}</div>}
    </div>
  );
}

export default App;
