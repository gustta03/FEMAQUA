/* eslint-disable @typescript-eslint/no-namespace */
import { AuthenticationRepo } from "../../usecases/protocols/auth/authentication-protocol";
import { AuthenticationTypes } from "../../usecases/protocols/auth/authentication-protocol";
import { HttpClient } from "../../usecases/protocols/http/http-client-protocol";

export class Authentication implements AuthenticationRepo {
  constructor(private readonly httpClient: HttpClient) {}

  async auth(params: AuthenticationTypes.Param) {
    const response = await this.httpClient.post(params.url, params.data, {});
    return { status: response.status, data: response.data };
  }
}

export namespace AuthAccountModel {
  export type AccountModel = AuthenticationTypes.Model;
}
