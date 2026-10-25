/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponse } from "../models/UserResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserService {
  /**
   * @param userExternalId
   * @returns UserResponse OK
   * @throws ApiError
   */
  public static getAllUsers(
    userExternalId?: string,
  ): CancelablePromise<Array<UserResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users",
      headers: {
        "User-External-Id": userExternalId,
      },
    });
  }
}
