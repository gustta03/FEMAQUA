import { HttpStatusCode } from "axios";
import { AuthenticationRepo } from "./protocols/auth/authentication-protocol";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UnexpectedError } from "./errors/unexpected-error";

export class AccountAuthentication {
  constructor(
    private readonly url: string,
    private readonly authentication: AuthenticationRepo
  ) {}

  async auth() {
    const remoteAccountAuth = await this.authentication.auth({
      url: this.url,
      data: {
        email: "any_user_email@mail.com",
        password: "any_user_password",
      },
    });

    switch (remoteAccountAuth.status) {
      case HttpStatusCode.Ok:
        return remoteAccountAuth;
      case HttpStatusCode.Forbidden:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
