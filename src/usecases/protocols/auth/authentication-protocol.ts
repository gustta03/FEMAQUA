import { AccountModel } from "../../../domain/models/account-model";

/* eslint-disable @typescript-eslint/no-namespace */
export interface AuthenticationRepo {
  auth: (params: AuthenticationTypes.Param) => Promise<AuthenticationTypes.Response>;
}

export namespace AuthenticationTypes {
  export type Param = {
    url: string;
    data: {
      email: string;
      password: string;
    };
  };

  export type Response = {
    status: number;
    data: Model;
  };

  export type Model = AccountModel
}
