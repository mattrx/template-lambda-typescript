import { SSMConfigLoader } from "./ssm";
import { JSONConfigLoader } from "./json";

if (!process.env.CONFIG_STORE_TYPE) {
  throw new Error("Config: Store type not defined");
}

export interface Config {
  // @TODO: add project specific configs
  EXAMPLE: string;
}

interface ConfigLoader {
  getParameter(name: string): Promise<string>;
}

export const LoadConfig = async (): Promise<Config> => {
  let configLoader: ConfigLoader | undefined = undefined;

  switch (process.env.CONFIG_STORE_TYPE) {
    case "ssm":
      configLoader = new SSMConfigLoader();
      break;
    case "json":
      configLoader = new JSONConfigLoader();
      break;
  }

  if (!configLoader) {
    throw new Error(
      "Config: store type not supported, " + process.env.CONFIG_STORE_TYPE
    );
  }

  return {
    // @TODO: add project specific configs
    EXAMPLE: await configLoader.getParameter("EXAMPLE")
  };
};
