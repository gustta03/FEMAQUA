import { SaveToolUseCase } from "../../../usecases/save-tool-usecase";
import { makeApiUrl } from "../infra/http/make-api-url";
import { makeToolRepo } from "../infra/repos/make-tool-repository";

export const makeSaveTool = () =>
    new SaveToolUseCase(makeApiUrl("tools/"), makeToolRepo());
