// @ts-check

// Node Module Imports
import { argv } from "node:process";

// Internal Imports
import internalCmds from '../Command/Internal.js';
import { config, aliases, actions } from "../config/index.js";
import { helpStr, configStr, tutorialStr } from "./outputStrings.js";


class BCObject {
  /** @type {Array<string>} */
  #args = argv.slice(2) || [];
  
  /** @type {Array<string>} */
  #parsedArgs = [];

  #actions = actions;

  
  #internalCmds = internalCmds;
  #bcmdrPath = "/bcmdr/BashCommander/config/";
  #config = config;
  #aliases = aliases;

  constructor() {
    this.logHelp = helpStr;
    this.logTutorial =  tutorialStr;
    this.logConfig = () => configStr(config, this.#bcmdrPath);

    if (this.args.length) {
      this.#parsedArgs = this.args.map(arg => arg.split("-").join(""));
    }
    console.log(this.#buildArgMap());
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

  /** 
   * @returns {Object.<string, 
   * {
   *  command: string, 
   *  defaultArgs: Array<string>,
   *  showLogs: boolean,
   *  forceFreeTerminal: boolean
   * }>} 
   */
  get usrAliases () {
    return this.#aliases;
  }

  get internalCmds () {
    return this.#internalCmds;
  }

  get args () {
    return this.#args;
  }

  get parsedArgs () {
    return this.#parsedArgs;
  }

  #buildArgMap() {
    const parsed = {};

    try {
      let [prefix, options] = this.args;

      const fullName = this.#actions.translation[prefix];
      prefix = fullName ? fullName : prefix;

      const params = options.split(",");
      return {
        args: this.#args,
        prefix,
        options,
        params,
      };
    } catch(_) {
      return { prefix: "help" };
    }
  }
}

export default BCObject;
