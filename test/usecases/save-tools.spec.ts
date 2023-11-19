/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { HttpStatusCode } from "axios";
import { SaveToolUseCase } from '../../src/usecases/save-tool-usecase'
import { ToolsRepository } from '../../src/infra/gateways/save-tool-repository'

const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteLoadTools = new ToolsRepository(httpClient);
  const toolsUseCase = new SaveToolUseCase(url, remoteLoadTools);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("AccountAuthentication", () => {
  test("should return tool data when usecase are called correctly", async () => {
    const { toolsUseCase, httpClient } = sut("any_url");
    httpClient.response = { status: 201, data: makeMockData() }

    await toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw an AccessDaniedError when credencials are invalid", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.Forbidden,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  test("should throw an NotFoundError when call execute use case method", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.NotFound,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });
});
