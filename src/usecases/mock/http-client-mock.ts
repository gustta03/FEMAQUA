/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestConfig } from "../../infra/http/request";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http/http-client-protocol";

export class HttpClientSpy implements HttpClient {
  url?: string;
  request: any;
  status!: number;
  response: any;

  async get(url: string, config: RequestConfig = {}) {
    if (this.response instanceof Error) {
      throw this.response;
    }
    return this.response;
  }

  async post(url: string, body = {}, config: RequestConfig = {}) {
    if (this.response instanceof Error) {
      throw this.response;
    }

    this.request = { method: "post", url, body, config, status: this.status || 200 };
    return this.response;
  }

  async delete(url: string): Promise<HttpResponse<any>> {
    if (this.response instanceof Error) {
      throw this.response;
    }

    return { status: HttpStatusCode.ok, data: null };
  }
}
