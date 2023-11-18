import { AccountAuthentication } from "../../../usecases/authentication";
import { makeApiUrl } from "../infra/http/make-api-url";
import { makeAuthRepository } from "../infra/repos/make-auth-repo";

export const makeAuthUseCase = () =>
  new AccountAuthentication(makeApiUrl("auth/login"), makeAuthRepository());
