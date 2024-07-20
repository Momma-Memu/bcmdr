import { spawn } from "node:child_process";
import Alias from "../Alias/index.js";

export default class BashCommand {
  /**
   * A re-usable NodeJS command line object that allows you to quickly 
   * create custom command line tools without having to work with a bashrc/bash_profile
   * file. Additionally, it offers you a way to add command line options anywhere within
   * the command, and using whatever format you want.
   * 
   * @constructor
   * @param {Alias} alias
   * @param {BashCommand[] | undefined} cmdChargs
   * @param {BashCommand[] | undefined} cmdChain
   */
  constructor(alias, cmdChargs=[], cmdChain=[]) {    
    if (alias instanceof Alias) {
      this.alias = alias;
    } else {
      throw new Error("BashCommanderError: Illegal constructor, the given alias is not an instance of class, 'Alias'");
    }

    this.logs = {
      exitCode: "",
      output: "",
      error: "",
    }
    
    this.cmdChargs = cmdChargs || [];
    this.cmdChain = cmdChain || [];

    this.args = [...alias.pargs]

    if (!this.args.length) {
      this.args.push(...this.alias.dargs)
    }
  }

  async run() {
    if (this.cmdChargs.length) {
      for await (const command of this.cmdChargs) {
        const result = await command.run();
        this.args.push(result);
      }
    } else if (this.cmdChain.length) {
      for await (const command of this.cmdChain) {
        await command.run();
      }
    }

    return await this.#execute();
  }

  /** @returns {Promise<string>} */
  async #execute() {
    if (this.alias.detach) {
      const command = spawn(this.alias.cmd, this.args, {
        stdio: 'ignore', 
        detached: true,
      });
      
      command.unref();
      
      return "";
    } else {
      const command = spawn(this.alias.cmd, this.args);

      for await (const chunk of command.stdout) {
        this.logs.output += chunk;
      }
      
      for await (const chunk of command.stderr) {
        this.logs.error += chunk;
      }
  
      const exitCode = await new Promise((resolve, reject) => {
        command.on('close', resolve);
        if (this.alias.logs) {
          console.log(this.alias, this.logs.output);
        }
      });
  
      if (exitCode) {
        throw new Error(`${this.alias.cmd} process exited with code ${exitCode}, ${error}`);
      }

      return this.logs.output.split("\n")[0].trim();
    }
  }

  #buildLogStr() {
    const { output, error, exitCode } = this.logs;
    
    let logStr = `Command: ${this.alias.cmd}\n`;
    logStr += output ? `Output: ${output}\n` : "";
    logStr += error ? `Error: ${error}\n` : "";
    logStr += exitCode ? `Exit Code: ${exitCode}\n` : "";
    
    return logStr;
  }
}
