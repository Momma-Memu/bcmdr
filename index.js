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
    
    a: () => this.addAlias(),
    add: () => this.addAlias(),

    e: () => this.addAlias(),
    edit: () => this.addAlias(),

    r: () => this.addAlias(),
    remove: () => this.addAlias(),
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
    if (this.parsedArgs < 5) {
      this.logHelp();
    } else {
      this.#aliasEditor.addAlias();
    }
  }

  editAlias() {
    if (this.parsedArgs < 6) {
      this.logHelp();
    } else {
      this.#aliasEditor.editAlias();
    }
  }

  removeAliase() {
    if (this.parsedArgs < 1) {
      this.logHelp();      
    } else {
      this.#aliasEditor.removeAlias();
    }
  }

  #parse() {
    console.log(this.parsedArgs)
    // if (!this.#validateArgs()) {
    //   this.logHelp();
    // } else if (this.#isBCmdCLI()) {
    //   this.#argMap[this.parsedArgs[0]]();
    // } else {
    //   const { command, defaultArgs, forceFreeTerminal, showLogs } = this.#isInternalCmd() || this.#isUsrCmd();
    //   const commandChain = new BashCommand(command, this.#buildCmdChain(defaultArgs), forceFreeTerminal, showLogs);
    //   commandChain.run();
    // }
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
    return this.parsedArgs.length && (this.#isBCmdCLI() || this.#isInternalCmd() || this.#isUsrCmd());
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
