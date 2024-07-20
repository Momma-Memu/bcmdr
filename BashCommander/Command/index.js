import { spawn } from "node:child_process";
import BashCommandError from "../utils/BCError.js";
import Alias, { aliases } from "../Alias/index.js";

export default class BashCommand {
  /**
   * A re-usable NodeJS command line object that allows you to quickly 
   * create custom command line tools without having to work with a bashrc/bash_profile
   * file. Additionally, it offers you a way to add command line options anywhere within
   * the command, and using whatever format you want.
   * 
   * @constructor
   * @param {Alias} alias
   */
  constructor(alias) {
    this.logs = {
      exitCode: "",
      output: "",
      error: "",
    }
    
    if (alias instanceof Alias) {
      this.alias = alias;
    } else {
      throw new Error("BashCommanderError: Illegal constructor, the given alias is not an instance of class, 'Alias'");
    }

    this.chargs = this.#buildCmdChain(this.alias.chargs, [this.alias.chargs]);
    this.chain = this.#buildCmdChain(this.alias.chain, [this.alias.chain]);

    // console.log(this);
  }

  async run() {
    // if (this.alias.chain.length) {
    //   // const dependents = this.alias.

    //   for await (const command of dependencyComannds) {
    //     const result = await command.run();
    //     this.args.push(result);
    //   }
    // }

    // const dependencyComannds = this.defaultArgs.filter((
    //   command
    // ) => command instanceof BashCommand);
    

    // return await this.#execute();
  }

  /** @returns {Promise<string>} */
  async #execute() {
    if (this.freeTerminal) {
      const command = spawn(this.command, this.args, {
        stdio: 'ignore', 
        detached: true,
      });
      
      command.unref();
      
      return "";
    } else {
      const command = spawn(this.command, this.args);

      for await (const chunk of command.stdout) {
        this.logs.output += chunk;
      }
      
      for await (const chunk of command.stderr) {
        this.logs.error += chunk;
      }
  
      const exitCode = await new Promise((resolve, reject) => {
        command.on('close', resolve);
      });
  
      if (exitCode) {
        throw new Error(`${this.command} process exited with code ${exitCode}, ${error}`);
      }
  
      if (this.showLogs) {
        this.#buildLogStr();
      }
  
      return this.logs.output.split("\n")[0].trim();
    }
  }

  #buildLogStr() {
    const { output, error, exitCode } = this.logs;
    
    let logStr = `Command: ${this.command}\n`;
    logStr += output ? `Output: ${output}\n` : "";
    logStr += error ? `Error: ${error}\n` : "";
    logStr += exitCode ? `Exit Code: ${exitCode}\n` : "";
    
    return logStr;
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

    for (let cmd of cmdChain) {
      if (this.#isUnsafe(cmd, cmdTree)) {
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

      return new BashCommand(alias);
    });
  }

  /**
   * @param {string} command
   * @param {Array<Array<string>>} tree
   */
  #isUnsafe(command, tree) {
    if (this.alias.name === command) {
      return true;
    } else {
      console.log(command, tree)
      return true;
      return tree.some((cmdNames) =>{
        return cmdNames.some(name => name === command);
      });
    }
  }
}
