import { pathToFileURL } from "url";

export class JSONConfigLoader {
  config: { [key: string]: string };

  constructor() {
    if (!process.env.CONFIG_STORE_JSON_FILE) {
      throw new Error("Config: JSON file not defined");
    }

    this.config = require(process.env.CONFIG_STORE_JSON_FILE);
  }

  getParameter(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const value: string = this.config[name];

      if (!value) {
        reject(new Error("Config: parameter not defined, " + name));
      }

      resolve(value);
    });
  }
}
