/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModuleResponse } from "../models/ModuleResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ModuleService {
  /**
   * @param studyPlanExternalId
   * @param userExternalId
   * @returns ModuleResponse OK
   * @throws ApiError
   */
  public static getModules(
    studyPlanExternalId: string,
    userExternalId?: string,
  ): CancelablePromise<Array<ModuleResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me/study-plan/{studyPlanExternalId}/modules",
      path: {
        studyPlanExternalId: studyPlanExternalId,
      },
      headers: {
        "User-External-Id": userExternalId,
      },
    });
  }
}
