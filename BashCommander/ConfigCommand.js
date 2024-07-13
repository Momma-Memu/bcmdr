import BashCommand from "./BashCommand.js";
import AliasEditor from "./AliasEditor.js";

export default class ConfigCommand extends BashCommand {
  #aliasEditor = new AliasEditor();
  
  constructor() {
    super("pwd", null, false, true);
  }

  showConfig() {
    console.log(this.#aliasEditor.config);
  }
}
