import BashCommand from "./BashCommander/BashCommand.js";
import PathCommand from "./BashCommander/PathCommand.js";

class DolphinCommand extends BashCommand {
  constructor() {
    super("dolphin", [new PathCommand()], true, false);
  }
}

const command = new DolphinCommand();
command.run();
