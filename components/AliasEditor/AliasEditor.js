// @ts-check

import Alias from '../Alias/index.js';
import BCObject from '../utils/BCObject.js';
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
export default class AliasEditor extends BCObject {
  #path = `${__dirname.split("/").slice(0, 3).join("/")}/`;
  #bcmdrPath = `/bcmdr/${__dirname.split("/bcmdr/")[1].split("/AliasEditor")[0]}/config/`

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

  /** @param {Alias} alias */
  addAlias(alias) {
    this.usrAliases[alias.name] = alias;
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  /** @param {Alias} alias */
  editAlias(alias) {
    this.usrAliases[alias.name] = alias;
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  /** @param {string} name */
  removeAlias(name) {
    delete this.usrAliases[name];
    this.#aliasFile.saveChanges(this.usrAliases);
  }

  /** @param {{ username: string, path: string }} newConfig  */
  changeConfig(newConfig) {
    this.config = newConfig;
    this.#configFile.saveChanges(this.config);
  }

  async #initConfig() {
    // console.log(__dirname); // < use this instead to fix config info
    // this.config.path = `/home/${this.config.username}/.bashrc`;

    this.#loadFiles();
  }

  #loadFiles() {
    this.#configFile = new FileManager(`${this.#path}${this.#bcmdrPath}config.json`);
    this.#aliasFile = new FileManager(`${this.#path}${this.#bcmdrPath}aliases.json`);
    this.#bashFile = new FileManager(this.#path + ".bashrc");
  }
}
