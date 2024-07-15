// @ts-check
import { argv } from "node:process";

import internalCmds from '../Command/Internal.js';
import { config, aliases } from "../config/index.js";
import { helpStr, configStr, tutorialStr } from "./outputStrings.js";


class BCObject {
  /** @type {Array<string>} */
  #args = argv.slice(2) || [];
  
  /** @type {Array<string>} */
  #parsedArgs = [];
  
  #internalCmds = internalCmds;
  #bcmdrPath = "/bcmdr/BashCommander/config/";
  #config = config;
  #aliases = aliases;

  constructor() {
    this.logHelp = helpStr;
    this.logTutorial =  tutorialStr;
    this.logConfig = () => configStr(config, this.#bcmdrPath);

    if (this.args.length) {
      this.#parsedArgs = this.args.join("").split("-").filter((arg) => arg !== "");
    }
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
}

export default BCObject;
