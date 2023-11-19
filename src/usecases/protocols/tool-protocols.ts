/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tool } from "../../domain/models/tools-model";

export interface ToolRepo {
  insert(params: Tool.Param): Promise<Tool.Response>;
  load(params: Tool.Param): Promise<Tool.Response>;
  loadById(params: Tool.Param): Promise<Tool.Response>;
  deleteById(params: Tool.Param): Promise<Tool.Response>;
}

export interface Tools {
  execute(params: Tool.Param): Promise<Tool.Response | undefined>;
}

/* eslint-disable @typescript-eslint/no-namespace */

export namespace Tool {
  export type Param = {
    url?: string;
    token: string;
    data?: any
  };

  export type Response = {
    status: number;
    data: Tool;
  };
}
