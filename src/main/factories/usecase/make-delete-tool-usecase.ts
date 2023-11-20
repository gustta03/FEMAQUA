import { DeleteTool } from "../../../usecases/delete-tool-by-id";
import { makeApiUrl } from "../infra/http/make-api-url";
import { makeToolRepo } from "../infra/repos/make-tool-repository";

export const makeDeleteTool = () =>
    new DeleteTool(makeApiUrl("tools"), makeToolRepo());
