import { spawn } from "node:child_process";
import { argv } from "node:process";
import BCObject from "../utils/BCObject";


class BashCommand extends BCObject {
  /**
   * A re-usable NodeJS command line object that allows you to quickly 
   * create custom command line tools without having to work with a bashrc/bash_profile
   * file. Additionally, it offers you a way to add command line options anywhere within
   * the command, and using whatever format you want.
   * 
   * @constructor
   * @name BashCommand
   * @param {string} command
   * @param {Array<string | BashCommand>} defaultArgs?
   * @param {boolean} freeTerminal?
   * @param {boolean} showLogs?
   */
  constructor(command, defaultArgs=[], freeTerminal = false, showLogs=true) {
    this.command = command;
    this.logs = {
      exitCode: "",
      output: "",
      error: "",
    }
    
    this.defaultArgs = defaultArgs || [];
    this.args = [];
    
    this.freeTerminal = freeTerminal;
    this.showLogs = showLogs;

    try {
      if (!this.command) {
        throw new Error("");
      }
  
      this.#init();
    } catch (err) {
      console.error(err);
    }
  }

  async run() {
    const dependencyComannds = this.args.filter((command) => command instanceof BashCommand);
    
    for (let index = 0; index < dependencyComannds.length; index++) {
      const command = dependencyComannds[index];
      const result = await command.run();
      this.args[index] = result;
    }

    return await this.#execute();
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

  #init() {
    if (argv.length > 2) {
      this.args = [...argv.slice(2)];
    } else if (this.defaultArgs.length) {
      this.args.push(...this.defaultArgs);
    }
  }
}

export default BashCommand;
