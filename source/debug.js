export default class Debug {
  /**
   * the static log() method from this class should be used for logging
   * everywhere in the codebase to avoid memory leaks. do not use console.log()!!!
   */
  constructor() {}
  static log(obj) {
    try {
      console.log(obj.toString());
    } catch (error) {
      console.log("trying to Debug log an object caused the following error:");
      console.log(error);
    }
  }
}
