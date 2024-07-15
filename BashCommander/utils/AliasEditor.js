// @ts-check

import BCObject from './BCObject.js';
import FileManager from "./FileManager.js";

/** 
 * - Manages the retrieval, appending, editing, and removing of aliases within
 * the a specified bash config file, or default .bashrc file.
*/
export default class AliasEditor extends BCObject {
  /** @type {FileManager} */
  #configFile;
  /** @type {FileManager} */
  #bashFile;
  /** @type {FileManager} */
  #aliasFile;
  
  constructor() {
    super();
    
    if (!this.config.username || !this.config.path) {
      try {
        this.#initConfig();
      } catch (err) {
        console.error(err);
      }
    } else {
      this.#loadFiles();
    }
  }

  addAlias() {
    this.usrAliases[this.parsedArgs[0]] = this.#getAliasObject();
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  editAlias() {
    this.usrAliases[this.parsedArgs[0]] = this.#getAliasObject(this.parsedArgs.slice(1));
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  removeAlias() {
    delete this.usrAliases[this.parsedArgs[0]];
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  /** @param {{ username: string, path: string }} newConfig  */
  changeConfig(newConfig) {
    this.config = newConfig;
    this.#configFile.saveChanges(this.config);
  }

  async #initConfig() {
    this.config.username = await this.internalCmds.whoami.run();
    this.config.path = `/home/${this.config.username}/.bashrc`;

    this.#loadFiles();
  }

  /** @param {Array<string>} argSlice? */
  #getAliasObject(argSlice = this.parsedArgs) {
    const [name, cmd, args, detach, logs] = argSlice;
    return {
      command: cmd || name,
      defaultArgs: args && typeof args === "string" ? [args] : [],
      forceFreeTerminal: detach ? detach.toLowerCase() === "true" : false,
      showLogs: logs ? logs.toLowerCase() === "true" : false,
    };
  }

  #loadFiles() {
    this.#configFile = new FileManager(`/home/${this.config.username}${this.bcmdrPath}config.json`);
    this.#aliasFile = new FileManager(`/home/${this.config.username}${this.bcmdrPath}aliases.json`);
    this.#bashFile = new FileManager(this.config.path, true);
  }
}


const poop = new AliasEditor();

