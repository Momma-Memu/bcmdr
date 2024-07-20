import { createRequire } from "module";

/** @type {Object.<string, BashCommand>} */
const aliasConfigs = createRequire(import.meta.url)("./aliases.json");

export default class Alias {
  /** 
   * @param {string} name
   * @param {string} [cmd=""]
   * @param {string[]} [pargs=[]]
   * @param {string[]} [dargs=[]]
   * @param {string[]} [chargs=[]]
   * @param {string[]} [chain=[]]
   * @param {boolean} [logs=true]
   * @param {boolean} [detach=false]
   */
  constructor(name, cmd="", pargs=[], dargs=[], chargs=[], chain=[], logs=true, detach=false) {
    /** @type {string} */
    this.name = name;

    /** @type {string} */
    this.cmd = cmd;

    /** @type {string[]} */
    this.pargs = pargs || [];

    /** @type {string[]} */
    this.dargs = dargs || [];

    /** @type {string[]} */
    this.chargs = chargs || [];

    /** @type {string[]} */
    this.chain = chain || [];
    
    /** @type {boolean} */
    this.logs = typeof logs === "boolean" ? logs : true;

    /** @type {boolean} */
    this.detach = typeof detach === "boolean" ? detach : false;
  }

  get json () {
    return ({
      name: this.name,
      cmd: this.cmd,
      pargs: this.pargs,
      dargs: this.dargs,
      chargs: this.chargs,
      chain: this.chain,
      logs: this.logs,
      detach: this.detach
    });
  }
}

/** @type {Object.<string, Alias>} */
const aliases = {};

for (const alias of Object.values(aliasConfigs)) {
  const { name, cmd, pargs, dargs, chargs, chain, logs, detach } = alias;
  const aliasInstance = new Alias(name, cmd, pargs, dargs, chargs, chain, logs, detach);
  
  aliases[alias.name] = aliasInstance;
}

export { aliases };
