/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatusCode } from "axios";
import { HttpClientSpy } from "./mock/http-client-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { Authentication } from "../../src/infra/gateways/authentication-account";
import { AccountAuthentication } from "../../src/usecases/authentication";

const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteAccountAuth = new Authentication(httpClient);
  const accountAuthentication = new AccountAuthentication(
    url,
    remoteAccountAuth
  );
  return {
    accountAuthentication,
    httpClient,
  };
};

describe("AccountAuthentication", () => {
  test("should call HttpClient with correct URL, Method and Headers", async () => {
    const url = "any_url";
    const { accountAuthentication, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.Ok,
    };

    await accountAuthentication.auth();

    expect(httpClient).toBeDefined();
    expect(httpClient.request.method).toBe("post");
    expect(httpClient.request.url).toBe(url);
  });

  test("should throw an AccessDaniedError when credencials are invalid", async () => {
    const url = "any_url";
    const { accountAuthentication, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.Forbidden,
    };

    await expect(accountAuthentication.auth()).rejects.toThrow(
      InvalidCredentialsError
    );
  });
});
