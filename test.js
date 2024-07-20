import Alias, { aliases } from "./BashCommander/Alias/index.js";
import BashCommand from "./BashCommander/Command/index.js";

const testCases = {
  "recursion": {
    "command": "recursion",
    "defaultArgs": ["recursionC"],
    "showLogs": true,
    "forceFreeTerminal": false
  },
  "recursionB": {
    "command": "recursionB",
    "defaultArgs": ["recursionC"],
    "showLogs": true,
    "forceFreeTerminal": false
  },
  "recursionC": {
    "command": "recursionC",
    "defaultArgs": ["recursion"],
    "showLogs": true,
    "forceFreeTerminal": false
  }
}

// const pwdCmd = new BashCommand(pwd);

/** @param {Alias} alias */
const buildCmdChain = (alias) => {
  for (const cmdName of alias.chain) {
    if (cmdName in aliases) {
      console.log(aliases[cmdName])
    }
  }
}

buildCmdChain(aliases["open"])
