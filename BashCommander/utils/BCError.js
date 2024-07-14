// @ts-check

export default class BashCommandError extends Error {
  /**
   * @param {{ name: string, msg: string }} blueprint
   */
  constructor({ name, msg }) {
    super(msg);

    this.name = name;
    this.msg = msg;
  }
}