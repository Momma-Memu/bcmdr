import { writeFile, readFileSync } from 'node:fs';

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
    this.isJson = filePathParts[filePathParts.length - 1] === "json";
    
    if (openNow) {
      this.readFile();
    }
  }

  /** @returns {string | { file: string }} */
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
      this.#content = readFileSync(this.#path, { encoding: 'utf8', flag: 'r' });

      console.log(this.isJson)

      if (this.isJson) {
        this.#content = JSON.parse(this.#content);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /** @param {string} data */
  #writeFile(data) {
    console.log(data);
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