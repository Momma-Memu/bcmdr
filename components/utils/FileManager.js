import { writeFile, readFileSync } from 'node:fs';
import BashCommandError from './BCError.js';

export default class FileManager {
  #content;
  #path = "";

  /**
   * Interfaces with "node:fs" to handle read/write operations
   * on behalf of BashCommander.
   * 
   * @constructor
   * @name FileManager
   * @param {string} path
   * @param {boolean} openNow?
   */
  constructor(path, openNow = false) {
    this.#path = path;
    this.openNow = openNow;

    const filePathParts = this.#path.split(".");
    this.isJson = filePathParts[filePathParts.length] === "json";
    
    if (openNow) {
      this.readFile();
    }
  }

  /** @returns {string | {}} */
  get content() {
    return this.#content || "";
  }

  saveChanges(data) {
    if (this.isJson) {
      const json = JSON.stringify(data, null, 2);
      this.#writeFile(json);
    } else {

    }
  }

  readFile() {
    try {
      if (!this.isJson) {
        this.#content = readFileSync(this.#path, { encoding: 'utf8', flag: 'r' });
      }
    } catch (err) {
      console.error(err);
    }
  }

  /** @param {string} data */
  #writeFile(data) {
    print(data);
    // writeFile(this.#path, data, 'utf8', (err) => {
    //   if (err) {
    //     throw new BashCommandError({
    //       name: "FileWriterError: ",
    //       msg: `Could not write to, or locate file at the given path, "${this.#path}"`
    //     });
    //   }
    // }); 
  }
}