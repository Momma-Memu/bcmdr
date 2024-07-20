import BashCommand from "./BashCommander/Command/index.js";
import AliasEditor from "./BashCommander/utils/AliasEditor.js";
import Parser from "./BashCommander/Parser/index.js";


class BashCommander {
  #aliasEditor = new AliasEditor();
  parser = new Parser();

  constructor() {
    this.#parse();
  }

  help() {
    this.parser.logHelp();
  }

  config() {
    this.parser.logConfig();
  }

  guide() {
    this.parser.logGuide();
  }

  list() {
    console.log("\n~ Your Aliases ~\n");
    console.log(this.usrAliases, "\n");
  }

  addAlias() {
    this.#aliasEditor.addAlias();
  }

  editAlias() {
    this.#aliasEditor.editAlias();
  }

  removeAlias() {
    this.#aliasEditor.removeAlias();
  }

  #run () {
    const commandChain = new BashCommand(this.parser.args.alias);
    console.log(commandChain);

    // commandChain.run();
  }

  #parse() {
    if (this[this.parser.args.prefix]) {
      this[this.parser.args.prefix]();
    } else if (this.parser.args.alias) {
      this.#run();
    } else {
      this.parser.logHelp();
    }
  }
}

new BashCommander();
