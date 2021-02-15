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
    return 'text-green-500';
  } else if (level > 25) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
}

const Battery: FunctionComponent<BatteryProps> = ({batteryInfo}) => {
  if (!batteryInfo) return null;

  const batteryColorClass = backgroundColorClassForBatteryLevel(batteryInfo.batteryLevel)

  return (
  <figure className="flex flex-row items-center justify-center my-2">
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-8 mx-2">
      <path fill="currentColor" d="M 544 160 L 544 224 L 576 224 L 576 288 L 544 288 L 544 352 L 64 352 L 64 160 L 544 160 M 560 96 L 48 96 C 21.49 96 0 117.49 0 144 L 0 368 C 0 394.51 21.49 416 48 416 L 560 416 C 586.51 416 608 394.51 608 368 L 608 352 L 616 352 C 629.255 352 640 341.255 640 328 L 640 184 C 640 170.745 629.255 160 616 160 L 608 160 L 608 144 C 608 117.49 586.51 96 560 96 Z"></path>
      <rect x="71.242" y="166.969" width={`${465 * batteryInfo.batteryLevel / 100.0}`} className={`${batteryColorClass} fill-current`} height="178.936"></rect>
    </svg>
    <figcaption className="mx-2 text-xs">
      <p>Battery Percent: {batteryInfo.batteryLevel}%</p>
      <p>As of {timeAgoInWords(batteryInfo.batteryCachedAt)}</p>
    </figcaption>
  </figure>
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
    <div className="max-w-md min-h-screen m-auto text-center text-white">
      <header className="flex flex-col items-center justify-center pt-8 pb-2">
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
