// @ts-check

// Node Module Imports
import { argv } from "node:process";

// Internal Imports
import Alias, { aliases } from "../Alias/index.js";
import { config } from "../config/index.js";
import { helpStr, configStr, tutorialStr } from "./outputStrings.js";


class BCObject {
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
  #REMOVE = "remove"

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
    this.logTutorial =  tutorialStr;
    this.logConfig = () => configStr(config, this.#bcmdrPath);

    if (this.#args.length) {
      this.parsedArgs.prefix = this.#prefixes[this.#args[0]] || "help";
      this.parsedArgs.options = this.#args.slice(1);
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
  
  get parsedArgs () {
    return this.#parsedArgs;
  }
  #buildAliasProps() {
    const { prefix } = this.parsedArgs;
    if ([this.#ADD, this.#REMOVE, this.#EDIT].includes(prefix)) {
      const alias = new Alias("");
  
      this.parsedArgs.options.forEach((option) => {
        const [name, value] = option.split("=");
  
        if (name in alias) {
          alias[name] = value;
        }
      });
  
      this.parsedArgs.alias = alias;
    }
  }
}

export default BCObject;
