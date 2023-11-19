import { ToolsRepository } from "../../../../infra/gateways/save-tool-repository";
import makeHttpClient from "../http/make-http-request-client";

export const makeToolRepo = () =>  new ToolsRepository(makeHttpClient())
