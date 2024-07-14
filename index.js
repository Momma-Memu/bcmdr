import { argv } from "node:process";
import BCObject from "./BashCommander/utils/BCObject.js";
// import AliasEditor from "./BashCommander/utils/AliasEditor.js";


class BashCommander extends BCObject {
  #aliasName = "";
  #argMap = {
    h: () => this.logHelp(),
    help: () => this.logHelp(),
    
    c: () => this.logConfig(),
    config: () => this.logConfig(),

    t: () => this.logTutorial(),
    tutorial: () => this.logTutorial(),

    l: () => this.showAliases(),
    list: () => this.showAliases(),
  }
  
  // #aliasEditor = new AliasEditor();
  constructor() {
    if (argv.length > 2) {
      this.args = [...argv.slice(2)];
      this.#parse();
    } else {
      this.helpCmd();
    }
  }

  showAliases() {
    // this.#aliasEditor.listAliases();
  }

  addAlias() {
    // this.#aliasEditor.addAlias();
  }

  editAlias() {
    // this.#aliasEditor.editAlias();
  }

  removeAliase() {
    // this.#aliasEditor.removeAlias();
  }

  #parse() {
    if (!this.parsedArgs.length) {
      this.logHelp();
    } else {
      this.#aliasName = flags[0];

      if (!this.#argMap[this.#aliasName]) {
        this.logHelp();
      } else {
        const method = this.#argMap[flags[0]];

        method();
      }
    }
  }
}


new BashCommander();