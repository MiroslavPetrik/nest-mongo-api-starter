import * as bunyan from "bunyan";

import {createLogsDirectory} from "./helpers";

export default bunyan.createLogger({
  name: "logger",
  streams: [
    {
      stream: process.stdout,
    },
    {
      type: "rotating-file",
      path: createLogsDirectory() + "/logs.log",
    },
  ],
});
