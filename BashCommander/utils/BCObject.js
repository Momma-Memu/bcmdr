// @ts-check
import { argv } from "node:process";

import internalCmds from '../Command/Internal.js';
import { config, aliases } from "../config/index.js";
import { helpStr, configStr, tutorialStr } from "./outputStrings.js";

/** @typedef {import("../Command/BashCommand.js").default} BashCommand */

export default class BCObject {
  /** @type {Array<string>} */
  #args = argv.slice(2) || [];
  
  /** @type {Array<string>} */
  #parsedArgs = [];
  
  #internalCmds = internalCmds;
  #bcmdrPath = "/bcmdr/BashCommander/config/config.json";
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

  /** @returns {Object.<string, BashCommand>} */
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

  /** @param {string} name */
  getAliasByName (name) {
    if (name in this.usrAliases) {
      return this.usrAliases[name];
    }

    return null;
  }
}
