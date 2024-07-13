import { argv } from "node:process";
import { createRequire } from "module";
import { helpStr, configStr, tutorialStr } from "./BashCommander/internal/outputStrings.js";
import AliasEditor from "./BashCommander/AliasEditor.js";


const config = createRequire(import.meta.url)("./BashCommander/config/config.json");

class BashCommander {
  #bcmdrPath = "/bcmdr/BashCommander/config/config.json";
  #main = "";

  #argMap = {
    h: () => this.helpCmd(),
    help: () => this.helpCmd(),
    
    c: () => this.configCmd(),
    config: () => this.configCmd(),

    t: () => this.tutorialCmd(),
    tutorial: () => this.tutorialCmd(),

    l: () => this.showAliases(),
    list: () => this.showAliases(),
  }
  
  #aliasEditor = new AliasEditor();
  #config = config;

  args = [];

  constructor() {
    if (argv.length > 2) {
      this.args = [...argv.slice(2)];
      this.#parse();
    } else {
      this.helpCmd();
    }
  }

  get config() {
    return this.#config;
  }

  showAliases() {
    this.#aliasEditor.listAliases();
  }

  addAlias() {
    this.#aliasEditor.addAlias();
  }

  editAlias() {
    this.#aliasEditor.editAlias();
  }

  removeAliase() {
    this.#aliasEditor.removeAlias();
  }

  tutorialCmd() {
    console.log(tutorialStr());
  }

  configCmd() {
    console.log(configStr(this.config, this.#bcmdrPath))
  }

  helpCmd() {
    console.log(helpStr());
  }

  #parse() {
    const flags = this.args.join("").split("-").filter((arg) => arg !== "");

    if (!flags.length) {
      this.helpCmd();
    } else {
      this.#main = flags[0];

      if (!this.#argMap[this.#main]) {
        this.helpCmd();
      } else {
        const method = this.#argMap[flags[0]];

        method();
      }
    }
  }
}


new BashCommander();