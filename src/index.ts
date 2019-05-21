import { CognitoUserPoolTriggerEvent as Event } from "aws-lambda";
import { LoadConfig, Config } from "./config";

export const handler = async (event: Event): Promise<Event> => {
  const config: Config = await LoadConfig();

  console.log(config, event);

  return event;
};
