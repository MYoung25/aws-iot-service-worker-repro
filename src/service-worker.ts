/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

import { Buffer } from "buffer"; // note: the trailing slash is important!


addEventListener("message", async (event) => {
  console.log(`Message Received: ${event.data}`);
  self.Buffer = Buffer;

  console.log(new Buffer("Hello World"))
  // prints Uint8Array(11) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]...
});
