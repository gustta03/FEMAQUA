/* eslint-disable  @typescript-eslint/no-explicit-any */

import { RequestConfig } from "../../../infra/http/request";

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpResponse<T = any> = {
  status: HttpStatusCode
  data?: T
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  forbidden = 403,
  serverError = 500,
  notFound = 404
}

export interface HttpClient {
  get: (url: string, config: RequestConfig) => Promise<HttpResponse>;
  post: (url: string, body?: any, headers?: any) => Promise<HttpResponse>;
  delete: (url: string) => Promise<HttpResponse>;
}
