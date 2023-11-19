import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { ToolsRepository } from "../../src/infra/gateways/save-tool-repository";
import { LoadTools } from '../../src/usecases/load-tools-usecase'
import { HttpStatusCode } from "../../src/usecases/protocols/http/http-client-protocol";

const API_URL = "http://any_url.com/api";

const setupTest = (url: string) => {
  const httpClient = new HttpClientSpy();
  const toolsRepository = new ToolsRepository(httpClient);
  const toolsUseCase = new LoadTools(url, toolsRepository);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("LoadTools Use Case", () => {
  test("should return tool data when the use case is called correctly", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: HttpStatusCode.ok, data: makeMockData() };

    await toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] });
    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw an InvalidCredentialsError when credentials are invalid", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.unauthorized,
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  test("should throw a NotFoundError when credentials are invalid", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.notFound,
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });
});
