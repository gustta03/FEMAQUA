import { ToolRepo, Tool } from "../../usecases/protocols/tool-protocols";
import { HttpClient } from "../http/request";

export class ToolsRepository implements ToolRepo {
  constructor(private readonly httpClient: HttpClient) {}

  async deleteById(params: Tool.Param): Promise<Tool.Response> {
    const response = await this.httpClient.delete(`${params.url}/${params.data}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    });

    return { status: response.status, data: response.data };
  }

  async insert(params: Tool.Param): Promise<Tool.Response> {
    const response = await this.httpClient.post(params.url || '', params.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    });

    return { status: response.status, data: response.data };
  }

  async load(params: Tool.Param): Promise<Tool.Response> {
    const response = await this.httpClient.get(params.url || '', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    });

    return { status: response.status, data: response.data };
  }
}
