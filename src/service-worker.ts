/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

import { auth } from "aws-iot-device-sdk-v2";

addEventListener("message", async (event) => {
  console.log(`Message Received: ${event.data}`);

  console.log(auth)
});
