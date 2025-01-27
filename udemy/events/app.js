const EventEmitter = require("./events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("foo", () => {
  console.log("a foo occurred 2!");
});

myEmitter.on("foo", () => {
  console.log("a foo occurred 1!");
});

myEmitter.on("foo", (x) => {
  console.log("an event with a parameter occurred!");
  console.log(x);
});

myEmitter.once("bar", () => {
  console.log("a bar occurred!");
});

myEmitter.emit("foo", "text");
myEmitter.emit("foo");
myEmitter.emit("bar");
myEmitter.emit("bar");
myEmitter.emit("bar");
myEmitter.emit("bar");
myEmitter.emit("bar");
myEmitter.emit("bar");

// Event emitter is a class that allows us to create and handle custom events in Node.js. It is a part of the events module, which is a core module in Node.js. The EventEmitter class is defined and exposed by the events module. To use the EventEmitter class, we need to create an instance of it. We can then use the instance to emit events and listen for events.

// The EventEmitter class has a few methods that we can use to work with events. The on() method is used to listen for events. It takes two arguments: the name of the event and a callback function that will be called when the event is emitted. The emit() method is used to emit events. It takes the name of the event as an argument.

// In this example, we create an instance of the Emitter class and add an event listener for the "foo" event. When the "foo" event is emitted, the callback function is called, and "a foo occurred!" is logged to the console. We then emit the "foo" event to trigger the callback function.
