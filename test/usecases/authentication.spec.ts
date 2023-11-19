import { HttpStatusCode } from "axios";
import { HttpClientSpy } from "./mocks/http-client-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { Authentication } from "../../src/infra/gateways/authentication-account";
import { AccountAuthentication } from "../../src/usecases/authentication";

const API_URL = "http://any_url.com/api";

const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteAccountAuth = new Authentication(httpClient);
  const accountAuthentication = new AccountAuthentication(url, remoteAccountAuth);
  return {
    accountAuthentication,
    httpClient,
  };
};

describe("AccountAuthentication Use Case", () => {
  test("should make a POST request to the correct URL with the correct method and headers", async () => {
    const { accountAuthentication, httpClient } = sut(API_URL);

    httpClient.response = {
      status: HttpStatusCode.Ok,
    };

    await accountAuthentication.execute({
      email: 'any_user_email',
      password: 'any_user_password'
    });

    expect(httpClient.request.method).toBe("post");
    expect(httpClient.request.url).toBe(API_URL);
  });

  test("should throw an InvalidCredentialsError when credentials are invalid", async () => {
    const { accountAuthentication, httpClient } = sut(API_URL);

    httpClient.response = {
      status: HttpStatusCode.Forbidden,
    };

    await expect(
      accountAuthentication.execute({
        email: 'any_user_email',
        password: 'any_user_password'
      })
    ).rejects.toThrow(InvalidCredentialsError);
  });
});