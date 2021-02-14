//// GLOBALS
declare const LED1: Pin;
declare const LED2: Pin;
declare const LED3: Pin;

declare const BTN: Pin;

const LEDS = [LED1, LED2, LED3];

//// UTILITIES

const blinkAll = () => {
  LEDS.forEach((led) => led.set());
  LEDS.forEach((led) => led.reset());
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

//// BUSINESS LOGIC

// const onButton = () => {
//   const whenPressed = Date.now();
//   LED1.set();
//   setNfcUrl(`https://coreyja.com?now=${whenPressed.toString()}`);

//   setTimeout(() => { LED1.reset() }, 5000)
// }

// setWatch(onButton, BTN, { edge: 'rising', debounce: 50, repeat: true })

onLongPress(() => {
  console.log("Long Press Achieved");
  LED3.set();
  setTimeout(() => {
    LED3.reset();
  }, 300);
}, 2000);

blinkAll();
