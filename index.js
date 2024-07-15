import BCObject from "./BashCommander/utils/BCObject.js";
import BashCommand from "./BashCommander/Command/index.js";
import BashCommandError from "./BashCommander/utils/BCError.js";
import AliasEditor from "./BashCommander/utils/AliasEditor.js";


class BashCommander extends BCObject {
  #aliasEditor = new AliasEditor();
  #argMap = {
    h: () => this.logHelp(),
    help: () => this.logHelp(),
    
    c: () => this.logConfig(),
    config: () => this.logConfig(),

    t: () => this.logTutorial(),
    tutorial: () => this.logTutorial(),

    l: () => this.showAliases(),
    list: () => this.showAliases(),
  }
  
  constructor() {
    super();
    this.#parse();
  }

  showAliases() {
    console.log("\n~ Your Aliases ~\n");
    console.log(this.usrAliases, "\n");
  }

  addAlias() {
    // this.#aliasEditor.addAlias();
  }

  editAlias() {
    // this.#aliasEditor.editAlias();
  }

  removeAliase() {
    // this.#aliasEditor.removeAlias();
  }

  #parse() {
    if (!this.#validateArgs()) {
      this.logHelp();
    } else if (this.#isBCmdCLI()) {
      this.#argMap[this.parsedArgs[0]]();
    } else {
      const { command, defaultArgs, forceFreeTerminal, showLogs } = this.#isInternalCmd() || this.#isUsrCmd();
      const chain = new BashCommand(command, this.#buildCmdChain(defaultArgs), forceFreeTerminal, showLogs);
      console.log(chain);
    }
  }
  
  #isBCmdCLI() {
    return this.#argMap[this.parsedArgs[0]];
  }

  #isInternalCmd(name = this.parsedArgs[0]) {
    return this.internalCmds[name];
  }

  #isUsrCmd(name = this.parsedArgs[0]) {
    return this.usrAliases[name];
  }

  #validateArgs() {
    return this.parsedArgs.length && (this.#isInternalCmd() || this.#isUsrCmd());
  }

  /** 
   * @param {Array<string>} commandChain  
   * @param {Array<BashCommand>} commandChain?
   * @param {number} depth?
   * @returns {Array<BashCommand>}
   */
  #buildCmdChain(commandChain = [], commandTree = [], depth = 0) {
    // TODO: Need to add option for non BashCommand args...
    if (!commandChain || (Array.isArray(commandChain) && !commandChain.length)) {
      console.log(commandTree);
      return [];
    }

    for (let command of commandChain) {
      if (this.#isUnsafe(command, commandTree)) {
        throw new BashCommandError({
          name: "BashCommanderError",
          msg: `IllegalCommandChain: ${command} executes a parent. This is a WARNING that the command was rejected and results in a stack overflow.`,
        });
      }
    }

    commandTree.push(commandChain);

    return commandChain.map((name) => {
      const bcmd = this.#isInternalCmd(name) || this.#isUsrCmd(name);

      const { command, defaultArgs, forceFreeTerminal, showLogs } = bcmd;
      return new BashCommand(command, this.#buildCmdChain(defaultArgs, commandTree, depth + 1), forceFreeTerminal, showLogs);
    });
  }

  /**
   * @param {string} command
   * @param {Array<Array<string>>} tree
   */
  #isUnsafe(command, tree) {
    return tree.some((cmdNames) =>{
      return cmdNames.some(name => name === command);
    });
  }
}


new BashCommander();