import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { NotFoundError } from "./errors/not-found-error";
import { UnexpectedError } from "./errors/unexpected-error";
import { HttpStatusCode } from "./protocols/http/http-client-protocol";
import { ToolRepo, Tool, Tools } from "./protocols/tool-protocols";

export class LoadTool implements Tools {
  constructor(
    private readonly url: string,
    private readonly loadToolById: ToolRepo
  ) {}

  async execute(params: Tool.Param): Promise<Tool.Response | undefined> {
    const response = await this.loadToolById.loadById({
      url: this.url,
      data: params.data,
      token: params.token,
    });
    console.log(response)
    switch (response.status) {
      case HttpStatusCode.ok:return response;
      case HttpStatusCode.unauthorized:throw new InvalidCredentialsError();
      case HttpStatusCode.notFound:throw new NotFoundError();
      default:throw new UnexpectedError();
    }
  }
}
