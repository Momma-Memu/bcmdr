import BashCommand from "./BashCommand.js";

export default class WhoCommand extends BashCommand {
  constructor() {
    super("whoami", null, false, true);
  }
}
