// @ts-check

import BCObject from './BCObject.js';
import BashCommand from '../Command/index.js';
import BashCommandError from './BCError.js';
import FileManager from "./FileManager.js";

// import WhoCommand from "./WhoCommand.js";

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
  

  #aliasNote = `# NOTE: Editing the comment above, or the last comment below, is not advised.
# BashCommander relies on these two comments in order to edit your BashCommands.
# You may move these two comments anywhere you like within this file but their
# content must NOT be altered.`;

  #usrNameErr = new BashCommandError({
    name: "AliasEditor_Error",
    msg: "Unable to determine username from the internal, 'WhoCommand'.",
  });

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

  /** 
   * @param {{
   *  command: string,
   *  defaultArgs: Array<string>,
   *  showLogs: boolean,
   *  forceFreeTerminal: boolean
   * }} alias  
   */
  addAlias(alias) {
    this.usrAliases[alias.command] = alias;

    // this.#writeFile(this.#aliasPath, aliases);
  }

  editAlias() {

  }

  removeAlias() {
    
  }

  changeConfig() {

  }

  async #initConfig() {
    this.config.username = await this.internalCmds.whoami.run();
    this.config.path = `/home/${this.config.username}/.bashrc`;
    
    this.#loadFiles();
  }

  #loadFiles() {
    this.#configFile = new FileManager(`/home/${this.config.username}${this.bcmdrPath}config.json`);
    this.#aliasFile = new FileManager(`/home/${this.config.username}${this.bcmdrPath}aliases.json`);
    this.#bashFile = new FileManager(this.config.path, true);
  }

  #save() {
    this.#configFile.saveChanges(this.config);
    this.#aliasFile.saveChanges(this.usrAliases);
  }
}


const poop = new AliasEditor();

