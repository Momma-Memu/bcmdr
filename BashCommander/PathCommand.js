import BashCommand from "./BashCommand.js";

export default class PathCommand extends BashCommand {
  constructor() {
    super("pwd", null, false, true);
  }
}
