import BashCommand from "./index.js";

export default {
  pwd: new BashCommand("pwd", null, false, true),
  whoami: new BashCommand("whoami", null, false, true),
};

