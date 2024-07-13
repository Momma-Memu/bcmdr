// @ts-check

import { readFile, writeFile } from 'node:fs';
import { createRequire } from "module";
import BashCommandError from './internal/BCError.js';
import WhoCommand from "./WhoCommand.js";
const config = createRequire(import.meta.url)("./config/config.json");
const aliases = createRequire(import.meta.url)("./config/aliases.json");

/** 
 * - Manages the retrieval, appending, editing, and removing of aliases within
 * the a specified bash config file, or default .bashrc file.
*/
export default class AliasEditor {
  #configPath = "./config/config.json";
  #aliasPath = "./config/aliases.json";
  #aliasNote = `# NOTE: Editing the comment above, or the last comment below, is not advised.
# BashCommander relies on these two comments in order to edit your BashCommands.
# You may move these two comments anywhere you like within this file but their
# content must NOT be altered.`;

  #who = new WhoCommand();
  #usrNameErr = new BashCommandError({
    name: "AliasEditor_Error",
    msg: "Unable to determine username from the internal, 'WhoCommand'.",
  });

  constructor() {
    /** @type {{ username: string, path: string }} */
    this.config = config;
    this.aliases = aliases;
    
    if (!this.config.username || !this.config.path) {
      try {
        this.#updateConfig();
      } catch (err) {
        console.error(err);
      }
    }
  }

  listAliases() {
    this.#readFile(this.config.path, (data) => this.#listAliases(data));
  }

  addAlias(alias) {
    this.aliases[alias.name] = alias;

    this.#writeFile(this.#aliasPath, aliases);
  }

  editAlias() {

  }

  removeAlias() {
    
  }

  changeConfig() {

  }

  /** @param {string} data  */
  #listAliases(data) {
    const relevant = data.split("# ---------- BashCommanderJS ----------")[1];
    const aliases = relevant.split("alias ").slice(1);

    if (!aliases.length) {
      console.log(`- Could not find any BashCommander aliases found within file, "${this.config.path}"\n\nHINT:`);
      console.log("Is this the intended file BashCommander should interface with?");
      console.log("It may also be possible you have not made an alias yet.")
    } else {
      aliases.forEach(alias => console.log(alias));
    }
  }

  async #updateConfig() {
    this.config.username = await this.#who.run();
    this.config.path = `/home/${this.config.username}/.bashrc`;

    if (!this.config.username) {
      throw this.#usrNameErr;
    } else {
      this.#saveConfig();
    }
  }

  #saveConfig() {
    const json = JSON.stringify(this.config, null, 2);
    this.#writeFile(this.#configPath, json);
  }

  /**
   * @param {string} path 
   * @param {function | undefined} callback? 
  */
  #readFile(path, callback = undefined) {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw new BashCommandError({
          name: "FileReaderError: ",
          msg: `Could not open, or locate file at the given path, "${path}"`
        });
      } else {
        const fileData = data;

        if (callback) {
          callback(fileData);
        }
      }
    });
  }

  /**
   * @param {string} path 
   * @param {string} data 
  */
  #writeFile(path, data) {
    writeFile(path, data, 'utf8', (err) => {
      if (err) {
        throw new BashCommandError({
          name: "FileWriterError: ",
          msg: `Could not write to, or locate file at the given path, "${path}"`
        });
      }
    }); 
  }
}
