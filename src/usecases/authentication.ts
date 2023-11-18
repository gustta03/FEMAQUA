import { HttpStatusCode } from "axios";
import { AuthenticationRepo } from "./protocols/auth/authentication-protocol";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UnexpectedError } from "./errors/unexpected-error";
import { Authentication, AuthenticationUseCase } from "./protocols/authentication-protocols";

export class AccountAuthentication implements AuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly authentication: AuthenticationRepo
  ) {}

  async execute(params: Authentication.Param) {
    const remoteAccountAuth = await this.authentication.auth({
      url: this.url,
      data: params,
    });

    switch (remoteAccountAuth.status) {
      case HttpStatusCode.Ok: return remoteAccountAuth;
      case HttpStatusCode.Forbidden: throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
