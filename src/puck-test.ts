declare const LED1: Pin
declare const LED2: Pin
declare const LED3: Pin

declare const BTN: Pin

setWatch(function() { LED1.write(!LED1.read()) }, BTN, { edge: 'rising', debounce: 50, repeat: true })

LED1.set()
LED2.set()
LED3.set()

LED1.reset()
LED2.reset()
LED3.reset()

console.log('Loaded code')
