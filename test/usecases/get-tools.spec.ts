/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpClientSpy } from "./mocks/http-client-mock";
import { Tool } from "../../src/domain/models/tools-model";
import { makeMockData } from "./mocks/make-data-response-mock";

export interface ToolsRepo {
  load(params: ToolType.Param): Promise<any>;
}

export interface Tools {
  execute(url: ToolType.Param): Promise<ToolType.Response>;
}

/* eslint-disable @typescript-eslint/no-namespace */

export namespace ToolType {
  export type Param = {
    url: string;
    token: string;
  };

  export type Response = Tool;
}

export class ToolsRepository implements ToolsRepo {
  constructor(private readonly httpClient: any) {}

  async load(params: ToolType.Param) {
    return await this.httpClient.get(params.url, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    });
  }
}

export class LoadTools implements Tools {
  constructor(
    private readonly url: string,
    private readonly loadToolsRepository: ToolsRepo
  ) {}

  async execute() {
    return await this.loadToolsRepository.load({
      url: this.url,
      token: "any_token",
    });
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
    
    const response = await toolsUseCase.execute();
    expect(response).toEqual(makeMockData())
  });
});
