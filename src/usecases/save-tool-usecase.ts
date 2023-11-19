import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { NotFoundError } from "./errors/not-found-error";
import { UnexpectedError } from "./errors/unexpected-error";
import { HttpStatusCode } from "./protocols/http/http-client-protocol";
import { SaveTool, Tool, Tools } from "./protocols/tool-protocols";

export class SaveToolUseCase implements Tools {
  constructor(
    private readonly url: string,
    private readonly saveToolsRepository: SaveTool
  ) {}

  async execute(params: Tool.Param): Promise<Tool.Response | undefined> {
    const toolData = await this.saveToolsRepository.insert({
      url: this.url,
      token: params.token,
      data: params.data
    });

    switch (toolData.status) {
      case HttpStatusCode.created:return toolData;
      case HttpStatusCode.forbidden:throw new InvalidCredentialsError();
      case HttpStatusCode.notFound:throw new NotFoundError();
      default:throw new UnexpectedError();
    }
  }
}
