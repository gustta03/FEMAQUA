
import { HttpClientSpy } from "./mocks/http-client-mock";
import { ToolsRepository } from "../../src/infra/gateways/save-tool-repository";
import { HttpStatusCode } from "../../src/usecases/protocols/http/http-client-protocol";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { DeleteTool } from '../../src/usecases/delete-tool-by-id'

const API_URL = "any_url";

const setupTest = (url: string) => {
  const httpClient = new HttpClientSpy();
  const toolsRepository = new ToolsRepository(httpClient);
  const toolsUseCase = new DeleteTool(url, toolsRepository);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("DeleteTool Use Case", () => {
  test("should return success if the tool is deleted correctly", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = { status: HttpStatusCode.ok, data: {} };

    await toolsUseCase.execute({
      url: API_URL,
      token: "any_token",
      data: "any_id",
    });

    expect(httpClient.response).toEqual(httpClient.response);
  });

  test("should throw an InvalidCredentialsError when credentials are invalid", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.forbidden,
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  test("should throw a NotFoundError when credentials are invalid", async () => {
    const { toolsUseCase, httpClient } = setupTest(API_URL);
    httpClient.response = {
      status: HttpStatusCode.notFound
    };

    await expect(
      toolsUseCase.execute({ url: API_URL, token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });
});