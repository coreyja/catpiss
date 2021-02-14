//// GLOBALS
declare const LED1: Pin;
declare const LED2: Pin;
declare const LED3: Pin;

const RED_LED = LED1;
const GREEN_LED = LED2;
const BLUE_LED = LED3;

declare const BTN: Pin;

const LEDS = [LED1, LED2, LED3];

//// UTILITIES

const blinkLed = (led: Pin, duration = 300) => {
  led.set();
  setTimeout(() => {
    led.reset();
  }, duration);
};

const blinkAll = () => {
  LEDS.forEach(blinkLed);
};

// Basically a wrapper to hide my `any` cast as much as possible
// This method isn't in the type definitions
const setNfcUrl = (url: string) => {
  (NRF as any).nfcURL(url); // eslint-disable-line @typescript-eslint/no-explicit-any
};

const onLongPress = (callback: () => void, longPressDuration = 2000) => {
  setWatch(
    () => {
      const longPressTimeoutId = setTimeout(() => {
        callback();
      }, longPressDuration);

      setWatch(
        () => {
          clearTimeout(longPressTimeoutId);
        },
        BTN,
        { edge: "falling", repeat: false }
      );
    },
    BTN,
    { edge: "rising", repeat: true }
  );
};

const onClick = (callback: () => void) => {
  setWatch(callback, BTN, { edge: "rising", repeat: true });
};

const toQueryString = (obj: Record<string, unknown>): string =>
  "?" +
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");

//// BUSINESS LOGIC
const BASE_URL = "https://catpiss.coreyja.com";

const batteryCache = {
  value: (E as any).getBattery(),
  cachedAt: new Date(),
};

const updateBatteryCache = () => {
  batteryCache.value = (E as any).getBattery();
  batteryCache.cachedAt = new Date();
};

const catpissCache: { lastCleanedAt?: Date } = {
  lastCleanedAt: undefined,
};
const cleanedCatPiss = () => {
  catpissCache.lastCleanedAt = new Date();
};

const updateNfcUrl = () => {
  updateBatteryCache();
  const queryString = toQueryString({
    battery_level: batteryCache.value,
    battery_level_cached_at: batteryCache.cachedAt.toISOString(),
    catpiss_last_cleaned_at: catpissCache.lastCleanedAt?.toISOString(),
  });
  setNfcUrl(`${BASE_URL}${queryString}`);
};

enum CatpissStatus {
  NoCleaningNeeded,
  CouldBeCleaned,
  CleaningNeeded,
  CleaningNeededBadly,
}

const determineCatpissStatus = (): CatpissStatus => {
  if (!catpissCache.lastCleanedAt) {
    return CatpissStatus.CleaningNeeded;
  }

  const millisecondsSinceCleaning =
    new Date().valueOf() - catpissCache.lastCleanedAt.valueOf();
  const hoursSinceCleaning = millisecondsSinceCleaning / 1000 / 60 / 60;

  if (hoursSinceCleaning < 24) {
    return CatpissStatus.NoCleaningNeeded;
  } else if (hoursSinceCleaning < 48) {
    return CatpissStatus.CouldBeCleaned;
  } else if (hoursSinceCleaning < 72) {
    return CatpissStatus.CleaningNeeded;
  } else {
    return CatpissStatus.CleaningNeededBadly;
  }
};

const blinkCatpissStatus = () => {
  const catpissStatus = determineCatpissStatus();

  switch (catpissStatus) {
    case CatpissStatus.NoCleaningNeeded:
      blinkLed(GREEN_LED, 300);
      break;
    case CatpissStatus.CouldBeCleaned:
      blinkLed(BLUE_LED, 300);
      break;
    case CatpissStatus.CleaningNeeded:
      blinkLed(RED_LED, 300);
      break;
    case CatpissStatus.CleaningNeededBadly:
      blinkLed(RED_LED, 300);
      setTimeout(() => {
        blinkLed(RED_LED, 300);
      }, 300);
      break;
    default:
      const e: never = catpissStatus;
      throw new Error(`Status was unexpected how did we get here?: ${e}`);
  }
};

// Setup Callbacks
onLongPress(() => {
  console.log("Long Press Achieved");
  blinkLed(GREEN_LED, 300);
  cleanedCatPiss();
  updateNfcUrl();
});

onClick(() => {
  console.log("Short press");
  blinkCatpissStatus();
  updateNfcUrl();
});

// After boot
updateNfcUrl();
blinkAll();
