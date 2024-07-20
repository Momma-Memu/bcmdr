import CommandChain from "./components/Command/CommandChain.js";
import AliasEditor from "./components/AliasEditor/index.js";
import Parser from "./components/Parser/index.js";


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
    console.log(this.parser.usrAliases, "\n");
  }

  add() {
    this.#aliasEditor.addAlias(this.parser.args.alias);
  }

  edit() {
    this.#aliasEditor.editAlias(this.parser.args.alias);
  }

  remove() {
    this.#aliasEditor.removeAlias(this.parser.args.alias.name);
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
