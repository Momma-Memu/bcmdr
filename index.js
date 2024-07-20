import BashCommand from "./components/Command/index.js";
import AliasEditor from "./components/utils/AliasEditor.js";
import Parser from "./components/Parser/index.js";
import CommandChain from "./components/Command/CommandChain.js";


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
    new CommandChain(this.parser.args.alias).run();
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
