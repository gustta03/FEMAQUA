/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpClientSpy } from "./mocks/http-client-mock";
import { Tool } from "../../src/domain/models/tools-model";
import { makeMockData } from "./mocks/make-data-response-mock";
import { InvalidCredentialsError } from "../../src/usecases/errors/invalid-credentials-error";
import { NotFoundError } from "../../src/usecases/errors/not-found-error";
import { UnexpectedError } from "../../src/usecases/errors/unexpected-error";
import { HttpStatusCode } from "axios";
import { HttpClient } from "../../src/infra/http/request";

export interface ToolsRepo {
  load(params: ToolType.Param): Promise<ToolType.Response>;
}

export interface Tools {
  execute(params: ToolType.Param): Promise<ToolType.Response | undefined>;
}

/* eslint-disable @typescript-eslint/no-namespace */

export namespace ToolType {
  export type Param = {
    url: string;
    token: string;
  };

  export type Response = {
    status: number;
    data: Tool;
  };
}

export class ToolsRepository implements ToolsRepo {
  constructor(private readonly httpClient: HttpClient) {}

  async load(params: ToolType.Param) {
    const response = await this.httpClient.get(params.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    });
    return { status: response.status, data: response.data };
  }
}

export class LoadTools implements Tools {
  constructor(
    private readonly url: string,
    private readonly loadToolsRepository: ToolsRepo
  ) {}

  async execute(
    params: ToolType.Param
  ): Promise<ToolType.Response | undefined> {
    const toolData = await this.loadToolsRepository.load({
      url: this.url,
      token: params.token,
    });

    switch (toolData.status) {
      case HttpStatusCode.Ok:return toolData;
      case HttpStatusCode.Forbidden:throw new InvalidCredentialsError();
      case HttpStatusCode.NotFound:throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}

const sut = (url: string) => {
  const httpClient = new HttpClientSpy();
  const remoteLoadTools = new ToolsRepository(httpClient);
  const toolsUseCase = new LoadTools(url, remoteLoadTools);
  return {
    toolsUseCase,
    httpClient,
  };
};

describe("AccountAuthentication", () => {
  test("should return tool data when usecase are called correctly", async () => {
    const { toolsUseCase, httpClient } = sut("any_url");
    httpClient.response = makeMockData();

    await toolsUseCase.execute({ url: "any_url", token: "any_token" });
    expect(httpClient.response).toEqual(makeMockData());
  });

  test("should throw an AccessDaniedError when credencials are invalid", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.Forbidden,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token" })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  test("should throw an NotFoundError when credencials are invalid", async () => {
    const url = "any_url";
    const { toolsUseCase, httpClient } = sut(url);

    httpClient.response = {
      status: HttpStatusCode.NotFound,
    };

    await expect(
      toolsUseCase.execute({ url: "any_url", token: "any_token" })
    ).rejects.toThrow(NotFoundError);
  });
});
