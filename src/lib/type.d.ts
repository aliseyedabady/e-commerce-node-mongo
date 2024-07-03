import { Model } from "mongoose";

type TCheckExist = {
  model: typeof Model;
  message: string;
  key: string;
  value: string;
};

type TCheckUnique = {
  value: string;
  model: typeof Model;
  message: string;
  key: string;
};

export { TCheckExist, TCheckUnique };
