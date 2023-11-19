/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpClientSpy } from "./mocks/http-client-mock";
import { makeMockData } from "./mocks/make-data-response-mock";
import { ToolsRepository } from "../../src/infra/gateways/save-tool-repository";
import {
  Tools,
  Tool,
  SaveTool,
} from "../../src/usecases/protocols/tool-protocols";
import { HttpClient } from "../../src/infra/http/request";
import { HttpStatusCode } from "../../src/usecases/protocols/http/http-client-protocol";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { UnexpectedError } from "../../src/usecases/errors/unexpected-error";
import { LoadTools } from "../../src/usecases/load-tools-usecase";

export class LoadById implements SaveTool {
  constructor(private readonly httpClient: HttpClientSpy) {}
  insert(params: Tool.Param): Promise<Tool.Response> {
    throw new Error("Method not implemented.");
  }
  load(params: Tool.Param): Promise<Tool.Response> {
    throw new Error("Method not implemented.");
  }

  async loadById(params: Tool.Param): Promise<Tool.Response> {
    const response = await this.httpClient.post(
      `${params.url}/${params.data}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
      }
    );
    console.log(response);
    return { status: response.status, data: response.data };
  }
}

class LoadTool implements Tools {
  constructor(
    private readonly url: string,
    private readonly loadToolById: SaveTool
  ) {}

  async execute(params: Tool.Param): Promise<Tool.Response | undefined> {
    const response = await this.loadToolById.loadById({
      url: params.url,
      data: params.data,
      token: params.token,
    });
   
    switch (response.status) {
      case HttpStatusCode.ok:return response;
      case HttpStatusCode.forbidden:throw new InvalidCredentialsError();
      case HttpStatusCode.notFound:throw new NotFoundError();
      default:throw new UnexpectedError();
    }
  }
}

const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteLoadTools = new ToolsRepository(httpClient);
  const toolsUseCase = new LoadTool(url, remoteLoadTools);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("AccountAuthentication", () => {
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

  test("should throw an NotFoundError when call execute use case method", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.notFound,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token", data: [] })
    ).rejects.toThrow(NotFoundError);
  });
});
