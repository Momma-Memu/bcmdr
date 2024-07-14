import { readFile, writeFile } from 'node:fs';

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
   * @param {boolean} isJson?
   */
  constructor(path, isJson = false) {
    this.#path = path;
    this.isJson = isJson;
    this.#readFile(path)
  }

  /** @returns {string | {}} */
  get content() {
    return this.#content || "";
  }

  saveChanges(test) {
    if (!test) {
      this.#writeFile(this.#path);
    }
  }

  #readFile() {
    readFile(this.#path, 'utf8', (err, data) => {
      if (err) {
        throw new BashCommandError({
          name: "FileReaderError: ",
          msg: `Could not open, or locate file at the given path, "${path}"`
        });
      } else {
        if (this.isJson) {
          this.#content = JSON.parse(data);
        } else {
          this.#content = data;
        }
      }
    });
  }

  /** @param {string} data */
  #writeFile(data) {
    writeFile(this.#path, data, 'utf8', (err) => {
      if (err) {
        throw new BashCommandError({
          name: "FileWriterError: ",
          msg: `Could not write to, or locate file at the given path, "${path}"`
        });
      }
    }); 
  }
}