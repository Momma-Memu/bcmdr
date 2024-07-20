// @ts-check

import Alias, { aliases } from '../Alias/index.js';
import FileManager from "../utils/FileManager.js";

import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// bcmdr/components/config/
/** 
 * - Manages the retrieval, appending, editing, and removing of aliases within
 * the a specified bash config file, or default .bashrc file.
*/
export default class AliasEditor {
  #aliases = aliases;
  #path = `${__dirname.split("/bcmdr/")[0]}`;
  #bcmdrPath = `/bcmdr/${__dirname.split("/bcmdr/")[1].split("/AliasEditor")[0]}`

  /** @type {FileManager} */
  #configFile;
  
  /** @type {FileManager} */
  #bashFile;
  
  /** @type {FileManager} */
  #aliasFile;

  /** @type {{ file: string }} */
  #config


  
  constructor() {
    try {
      this.#configFile = new FileManager(`${this.#path}${this.#bcmdrPath}/config/config.json`, true);
      this.#aliasFile = new FileManager(`${this.#path}${this.#bcmdrPath}/Alias/aliases.json`);
      
      if (typeof this.#configFile.content === "object") {
        this.#config = this.#configFile.content;
      }
    } catch (e) {
      console.error(e);
    }
  }

  /** @param {Alias} alias */
  addAlias(alias) {
    this.#aliases[alias.name] = alias;
    this.#aliasFile.saveChanges(this.#aliases);
  }

  /** @param {Alias} alias */
  editAlias(alias) {
    this.#aliases[alias.name] = alias;
    this.#aliasFile.saveChanges(this.#aliases);
  }

  /** @param {string} name */
  removeAlias(name) {
    delete this.#aliases[name];
    this.#aliasFile.saveChanges(this.#aliases);
  }

  /** @param {{ file: string }} newConfig  */
  changeConfig(newConfig) {
    this.#config = newConfig;
    this.#configFile.saveChanges(this.#config);
  }

  async #initConfig() {
    // console.log(__dirname); // < use this instead to fix config info
    // this.config.path = `/home/${this.config.username}/.bashrc`;

    // this.#loadFiles();
  }
}
