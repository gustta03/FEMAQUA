import axios from "axios";
import { HttpClient, RequestConfig } from "../../src/infra/http/request";
import { Request } from "../../src/infra/http/request";

jest.mock("axios")

describe("Request class", () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new Request();
  });

  test("should make a GET request", async () => {
    const url = "https://example.com";
    const config: RequestConfig = {
      headers: { "Content-Type": "application/json" },
    };

    const responseData = { data: [], status: 200 };
    jest.spyOn(axios, 'get').mockResolvedValueOnce(responseData);

    const response = await httpClient.get(url, config);

    expect(axios.get).toHaveBeenCalledWith(url, config);
    expect(response).toEqual(responseData);
  });

  test("should make a POST request", async () => {
    const url = "https://example.com";
    const body = {};
    const config: RequestConfig = {
      headers: { "Content-Type": "application/json" },
    };
  
    const responseData = { data: {}, status: 201 };
    (axios.post as jest.Mock).mockResolvedValueOnce(responseData);
  
    const response = await httpClient.post(url, body, config);
  
    expect(response).toEqual(responseData);
  });
  
  test("should make a DELETE request", async () => {
    const url = "https://example.com";

    const responseData = { data: null, status: 200 };
    (axios.delete as jest.Mock).mockResolvedValueOnce(responseData);

    const response = await httpClient.delete(url);
    expect(response).toEqual(responseData);
  });
});
