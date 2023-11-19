/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { ToolsRepository } from "../../src/infra/gateways/save-tool-repository";
import { HttpStatusCode } from "../../src/usecases/protocols/http/http-client-protocol";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { LoadTool } from '../../src/usecases/get-tool-by-id'


const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteLoadTools = new ToolsRepository(httpClient);
  const toolsUseCase = new LoadTool(url, remoteLoadTools);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("RemoteTools", () => {
  test("should return tool data when usecase are called correctly", async () => {
    const { toolsUseCase, httpClient } = sut("any_url");
    httpClient.response = { status: 200, data: makeMockData() };

    await toolsUseCase.execute({
      url: "any_url",
      token: "any_token",
      data: "any_id",
    });
    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw an NotFoundError when HttpClient return 404", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.notFound,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });

  test("should throw an InvalidCredentialsError when HttpClient return 401", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.forbidden,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
