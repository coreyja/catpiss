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

const blinkLed = (led: Pin, duration = 100) => {
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

//// BUSINESS LOGIC
blinkAll();

onLongPress(() => {
  console.log("Long Press Achieved");
  blinkLed(GREEN_LED, 300);
});

onLongPress(() => {
  console.log("SUPPER Long Press Achieved");
  blinkLed(BLUE_LED, 300);
}, 3000);

onClick(() => {
  console.log("Short press");
  blinkLed(RED_LED, 300);
});
