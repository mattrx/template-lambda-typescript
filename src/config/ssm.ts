import { SSM } from "aws-sdk";

export class SSMConfigLoader {
  ssm: SSM;

  constructor() {
    if (!process.env.CONFIG_STORE_SSM_PATH) {
      throw new Error("Config: SSM path not defined");
    }

    this.ssm = new SSM();
  }

  getParameter(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.ssm
        .getParameter({
          Name: process.env.CONFIG_STORE_SSM_PATH + "/" + name,
          WithDecryption: true
        })
        .promise()
        .then((result: SSM.GetParameterResult) => {
          if (!result.Parameter || !result.Parameter.Value) {
            reject(new Error("Config: SSM parameter not defined: " + name));
          } else {
            resolve(result.Parameter.Value);
          }
        })
        .catch((err: any) => reject(err));
    });
  }
}
