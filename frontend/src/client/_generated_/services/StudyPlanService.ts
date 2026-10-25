/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StudyPlanResponse } from "../models/StudyPlanResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class StudyPlanService {
  /**
   * @param userExternalId
   * @returns StudyPlanResponse OK
   * @throws ApiError
   */
  public static getStudyPlans(
    userExternalId?: string,
  ): CancelablePromise<Array<StudyPlanResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me/study-plans",
      headers: {
        "User-External-Id": userExternalId,
      },
    });
  }
}
