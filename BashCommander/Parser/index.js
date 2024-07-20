// @ts-check

// Node Module Imports
import { argv } from "node:process";

// Internal Imports
import Alias, { aliases } from "../Alias/index.js";
import { config } from "../config/index.js";
import { helpStr, configStr, tutorialStr } from "../utils/outputStrings.js";


export default class Parser {
  /** @type {Array<string>} */
  #args = argv.slice(2) || [];

  /** @type {{ prefix: string, options: string[], alias: Alias | null }} */
  #parsedArgs = { 
    prefix: "help", 
    options: [], 
    alias: null 
  };

  #HELP = "help";
  #CONFIG = "config";
  #PATH = "path";
  #GUIDE = "guide";
  #LIST = "list";
  #ADD = "add";
  #EDIT = "edit";
  #REMOVE = "remove";

  #prefixes = {
    help: this.#HELP,
    config: this.#CONFIG,
    path: this.#PATH,
    guide: this.#GUIDE,
    list: this.#LIST,
    add: this.#ADD,
    edit: this.#EDIT,
    remove: this.#REMOVE,
    h: this.#HELP,
    c: this.#CONFIG,
    g: this.#GUIDE,
    l: this.#LIST,
    a: this.#ADD,
    e: this.#EDIT,
    r: this.#REMOVE,
  };


  #aliases = aliases;
  #bcmdrPath = "/bcmdr/BashCommander/config/";
  #config = config;

  constructor() {
    this.logHelp = helpStr;
    this.logGuide = tutorialStr;
    this.logConfig = () => configStr(config, this.#bcmdrPath);

    if (this.#args.length) {
      const main = this.#args[0];

      this.args.prefix = this.#prefixes[main] || aliases[main]?.name || "help";
      this.args.options = this.#args.slice(1);
    }

    this.#buildAliasProps();
  }

  get bcmdrPath () {
    return this.#bcmdrPath;
  }

  get config () {
    return this.#config;
  }

  /** @param {{ username: string, path: string }} config */
  set config(config) {
    this.#config = config;
  }

  /** @returns {Object.<string, Alias>} */
  get usrAliases () {
    return this.#aliases;
  }
  
  get args () {
    return this.#parsedArgs;
  }
  
  #buildAliasProps() {
    const { prefix } = this.args;
    
    if (prefix in aliases) {
      // Check if cmd is to run a user alias.
      this.args.alias = aliases[prefix];
    } else if ([this.#ADD, this.#REMOVE, this.#EDIT].includes(prefix)) {
      // Check if cmd is an alias operation.
      const alias = new Alias("");
  
      this.args.options.forEach((option) => {
        const [name, value] = option.split("=");
  
        if (name in alias) {
          alias[name] = value;
        }
      });
  
      this.args.alias = alias;
    }
  }
}
