import { Authentication } from "../../../../infra/gateways/authentication-account"
import makeHttpClient from "../http/make-http-request-client"

export const makeAuthRepository = () => new Authentication(makeHttpClient())