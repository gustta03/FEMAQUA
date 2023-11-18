import { AccountModel } from "../../domain/models/account-model";
/* eslint-disable @typescript-eslint/no-namespace */
export interface AuthenticationUseCase {
  execute(params: Authentication.Param): Promise<Authentication.Response>;
}

export namespace Authentication {
  export type Param = {
    email: string;
    password: string;
  };

  export type Response = {
    status: number;
    data: Model;
  };

  export type Model = AccountModel
}
