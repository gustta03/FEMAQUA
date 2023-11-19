import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { HttpStatusCode } from "axios";
import { SaveToolUseCase } from '../../src/usecases/save-tool-usecase'
import { ToolsRepository } from '../../src/infra/gateways/save-tool-repository'

const API_URL = "any_url";

const setupTest = (url: string) => {
  const httpClient = new HttpClientSpy();
  const toolsRepository = new ToolsRepository(httpClient);
  const toolsUseCase = new SaveToolUseCase(url, toolsRepository);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("SaveToolUseCase", () => {
  test("should successfully save tool data when the use case is called correctly", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: 201, data: makeMockData() };

    await toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] });
    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw an InvalidCredentialsError when credentials are invalid", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: HttpStatusCode.Unauthorized };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  test("should throw a NotFoundError when the execute use case method is called", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: HttpStatusCode.NotFound };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });
});
