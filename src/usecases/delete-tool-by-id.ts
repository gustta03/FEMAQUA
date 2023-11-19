import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { NotFoundError } from "./errors/not-found-error";
import { UnexpectedError } from "./errors/unexpected-error";
import { HttpStatusCode } from "./protocols/http/http-client-protocol";
import { Tool, ToolRepo, Tools } from "./protocols/tool-protocols";

export class DeleteTool implements Tools {
    constructor(
      private readonly url: string,
      private readonly deleteToolById: ToolRepo
    ) {}
  
    async execute(params: Tool.Param): Promise<Tool.Response | undefined> {
      const response = await this.deleteToolById.deleteById({
        url: this.url,
        token: params.token,
        data: params.data,
      });
      console.log(response)
      switch (response.status) {
        case HttpStatusCode.ok:return response;
        case HttpStatusCode.forbidden:throw new InvalidCredentialsError();
        case HttpStatusCode.notFound:throw new NotFoundError();
        default:throw new UnexpectedError();
      }
    }
  }