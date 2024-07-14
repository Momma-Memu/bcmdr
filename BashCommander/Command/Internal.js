import BashCommand from "./BashCommand.js";

export default {
  pwd: new BashCommand("pwd", null, false, true),
  whoami: new BashCommand("whoami", null, false, true),
  // dolphin: new BashCommand("dolphin", ["pwd"], true, false),
};

