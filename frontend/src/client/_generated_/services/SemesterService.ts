/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SemesterResponse } from "../models/SemesterResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class SemesterService {
  /**
   * @param studyPlanExternalId
   * @param userExternalId
   * @returns SemesterResponse OK
   * @throws ApiError
   */
  public static getSemesters(
    studyPlanExternalId: string,
    userExternalId?: string,
  ): CancelablePromise<Array<SemesterResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me/study-plan/{studyPlanExternalId}/semesters",
      path: {
        studyPlanExternalId: studyPlanExternalId,
      },
      headers: {
        "User-External-Id": userExternalId,
      },
    });
  }
}
