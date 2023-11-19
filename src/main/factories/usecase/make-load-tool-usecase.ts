import { LoadTools } from "../../../usecases/load-tools-usecase";
import { makeApiUrl } from "../infra/http/make-api-url";
import { makeToolRepo } from "../infra/repos/make-tool-repository";

export const makeLoadTool = () =>
    new LoadTools(makeApiUrl("tools"), makeToolRepo());
