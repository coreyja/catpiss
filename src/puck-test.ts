declare const LED1: Pin;
declare const LED2: Pin;
declare const LED3: Pin;

declare const BTN: Pin;

const LEDS = [LED1, LED2, LED3];

const blinkAll = () => {
  LEDS.forEach((led) => led.set());
  LEDS.forEach((led) => led.reset());
};

// Basically a wrapper to hide my `any` cast as much as possible
// This method isn't in the type definitions
const setNfcUrl = (url: string) => {
  (NRF as any).nfcURL(url); // eslint-disable-line @typescript-eslint/no-explicit-any
};

const onButton = () => {
  const whenPressed = Date.now();
  LED1.set();
  setNfcUrl(`https://coreyja.com?now=${whenPressed.toString()}`);

  setTimeout(() => {
    LED1.reset();
  }, 5000);
};

setWatch(onButton, BTN, { edge: "rising", debounce: 50, repeat: true });

blinkAll();
