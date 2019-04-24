import { CognitoUserPoolTriggerEvent as Event } from "aws-lambda";

export const handler = async (event: Event): Promise<Event> => {
  console.log(event);
  return event;
};
