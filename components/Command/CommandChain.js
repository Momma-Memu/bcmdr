import BashCommand from "./index.js";
import BashCommandError from "../utils/BCError.js";
import Alias, { aliases } from "../Alias/index.js";

export default class CommandChain {

  /** @param {Alias} rootAlias */
  constructor(rootAlias) {
    this.alias = rootAlias;
    // const bashAlias = new Alias("bash", "bash", ["-i", "-c"])
    // const bashRoot = new BashCommand(bashAlias);

    try {
      const cmdChargs = this.#buildCmdChain(rootAlias.chargs);
      const cmdChain = this.#buildCmdChain(rootAlias.chain);
      
      this.rootCmd = new BashCommand(rootAlias, cmdChargs, cmdChain);
    } catch (err) {
      console.error(err);
    }
  }

  run () {
    this.rootCmd.run();
  }

  /** 
   * @param {Array<string>} commandChain  
   * @param {Array<BashCommand>} commandChain?
   * @param {number} depth?
   * @returns {Array<BashCommand>}
   */
  #buildCmdChain(cmdChain = [], cmdTree = [], depth = 0) {
    if (!cmdChain || (Array.isArray(cmdChain) && !cmdChain.length)) {
      return [];
    }

    for (const cmd of cmdChain) {
      if (this.#isUnsafe(cmd, cmdTree)) {
        console.log(cmd, cmdTree)
        throw new BashCommandError({
          name: "BashCommanderError",
          msg: `IllegalCommandChain: ${cmd} executes a parent. WARNING: Command rejected for causing a stack overflow.`,
        });
      }
    }

    cmdTree.push(cmdChain);

    return cmdChain.map((name) => {
      const alias = aliases[name];

      if (!alias) {
        throw new BashCommandError({
          name: "BashCommanderError",
          msg: `IllegalCommandChain: ${cmd} is not a known user alias.`,
        });
      }

      const chargs = this.#buildCmdChain(alias.chargs, cmdTree, depth + 1);
      const chain = this.#buildCmdChain(alias.chain, cmdTree, depth + 1);

      return new BashCommand(alias, chargs, chain);
    });
  }
  
  /**
   * @param {string} cmd
   * @param {Array<Array<string>>} tree
   */
  #isUnsafe(cmd, tree) {
    if (this.alias.name === cmd) {
      throw new BashCommandError({
        name: "BashCommanderError",
        msg: `IllegalCommandChain: ${cmd} executes itself. WARNING: Command rejected for causing a stack overflow.`,
      });
    } else {
      return tree.some((cmdNames) =>{
        return cmdNames.some(name => name === cmd);
      });
    }
  }
}