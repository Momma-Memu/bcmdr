import { createRequire } from "module";

/** @type {{ username: string, path: string }} */
export const config = createRequire(import.meta.url)("../config/config.json");

/** @type {Object.<string, BashCommand>} */
export const aliases = createRequire(import.meta.url)("../config/aliases.json");
