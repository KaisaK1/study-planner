/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurriculumResponse } from "../models/CurriculumResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CurriculumService {
  /**
   * @param studyPlanExternalId
   * @param userExternalId
   * @returns CurriculumResponse OK
   * @throws ApiError
   */
  public static getCurriculumByStudyPlan(
    studyPlanExternalId: string,
    userExternalId?: string,
  ): CancelablePromise<CurriculumResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me/study-plan/{studyPlanExternalId}/curriculum",
      path: {
        studyPlanExternalId: studyPlanExternalId,
      },
      headers: {
        "User-External-Id": userExternalId,
      },
    });
  }
}
