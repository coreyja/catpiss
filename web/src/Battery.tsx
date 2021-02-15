import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import {timeAgoInWords} from './Utils';

const backgroundColorClassForBatteryLevel = (level: number) => {
  if (level > 50) {
    return 'text-green-500';
  } else if (level > 25) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
}

interface BatteryProps {
  batteryInfo?: {batteryLevel: number, batteryCachedAt: Date}
}

const Battery: FunctionComponent<BatteryProps> = ({batteryInfo}) => {
  if (!batteryInfo) return null;

  const [infoExpanded, setInfoExpanded] = useState<Boolean>(false);
  const captionExpandedClass = infoExpanded ? 'opacity-100' : 'opacity-0'
  const toggleInfoExpanded = () => setInfoExpanded(x => !x)

  const batteryColorClass = backgroundColorClassForBatteryLevel(batteryInfo.batteryLevel)

  return (
  <figure className="flex flex-col items-center justify-center mt-auto mb-4" onClick={toggleInfoExpanded}>
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-8 mx-2">
      <path fill="currentColor" d="M 544 160 L 544 224 L 576 224 L 576 288 L 544 288 L 544 352 L 64 352 L 64 160 L 544 160 M 560 96 L 48 96 C 21.49 96 0 117.49 0 144 L 0 368 C 0 394.51 21.49 416 48 416 L 560 416 C 586.51 416 608 394.51 608 368 L 608 352 L 616 352 C 629.255 352 640 341.255 640 328 L 640 184 C 640 170.745 629.255 160 616 160 L 608 160 L 608 144 C 608 117.49 586.51 96 560 96 Z"></path>
      <rect x="71.242" y="166.969" width={`${465 * batteryInfo.batteryLevel / 100.0}`} className={`${batteryColorClass} fill-current`} height="178.936"></rect>
    </svg>
    <figcaption className={`${captionExpandedClass} mx-2 text-xs transition-opacity`}>
      <p>Battery Percent: {batteryInfo.batteryLevel}%</p>
      <p>As of {timeAgoInWords(batteryInfo.batteryCachedAt)}</p>
    </figcaption>
  </figure>
  )
}

export default Battery;
