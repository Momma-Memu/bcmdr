import { createRequire } from "module";

/** @type {{ username: string, path: string }} */
export const config = createRequire(import.meta.url)("../config/config.json");

/** @type {Object.<string, BashCommand>} */
export const aliases = createRequire(import.meta.url)("../config/aliases.json");

export const actions = {
  translation: {
    h: "help",
    c: "config",
    t: "tutorial",
    l: "list",
    a: "add",
    e: "edit",
    r: "remove"
  },
  action: {
    help: { prefix: "help" },
    config: { prefix: "config" },
    tutor: { prefix: "tutorial" },
    list:  { prefix: "list" },
    add: {
      prefix: "add",
      name: null,
      cmd: null,
      parg: null,
      darg: null,
      detach: null,
      logs: null
    },
    edit: {
      prefix: "edit",
      alias: null,
      name: null,
      cmd: null,
      parg: null,
      darg: null,
      detach: null,
      logs: null
    },
    remove: { 
      prefix: "remove",
      alias: null 
    }
  }
};
