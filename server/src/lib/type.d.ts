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

type TCheckUniqueUpdate = {
  model: typeof Model;
  key: string;
  value: string;
  id: string | undefined;
  message: string;
};

export { TCheckExist, TCheckUnique, TCheckUniqueUpdate };
