import { createRequire } from "module";

/** @type {{ file: string }} */
export const config = createRequire(import.meta.url)("../config/config.json");
