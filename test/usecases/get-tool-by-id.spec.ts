import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { ToolsRepository } from "../../src/infra/gateways/save-tool-repository";
import { HttpStatusCode } from "../../src/usecases/protocols/http/http-client-protocol";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { LoadTool } from '../../src/usecases/get-tool-by-id'

const API_URL = "any_url";

const setupTest = (url: string) => {
  const httpClient = new HttpClientSpy();
  const toolsRepository = new ToolsRepository(httpClient);
  const toolsUseCase = new LoadTool(url, toolsRepository);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("LoadTool Use Case", () => {
  test("should return tool data when the use case is called correctly", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: HttpStatusCode.ok, data: makeMockData() };

    await toolsUseCase.execute({
      url: API_URL,
      token: "any_token",
      data: "any_id",
    });
    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw a NotFoundError when HttpClient returns 404", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.notFound,
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });

  test("should throw an InvalidCredentialsError when HttpClient returns 401", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.forbidden,
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });
});