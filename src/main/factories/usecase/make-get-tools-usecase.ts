import { LoadTool } from "../../../usecases/get-tool-by-id";
import { makeApiUrl } from "../infra/http/make-api-url";
import { makeToolRepo } from "../infra/repos/make-tool-repository";

export const makeLoadToolById = () =>
    new LoadTool(makeApiUrl("tools/"), makeToolRepo());
