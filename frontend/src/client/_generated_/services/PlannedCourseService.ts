/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlannedCourseRequest } from "../models/PlannedCourseRequest";
import type { PlannedCourseResponse } from "../models/PlannedCourseResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class PlannedCourseService {
  /**
   * @param studyPlanExternalId
   * @param requestBody
   * @param userExternalId
   * @returns PlannedCourseResponse OK
   * @throws ApiError
   */
  public static setPlannedCourses(
    studyPlanExternalId: string,
    requestBody: Array<PlannedCourseRequest>,
    userExternalId?: string,
  ): CancelablePromise<Array<PlannedCourseResponse>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/users/me/study-plan/{studyPlanExternalId}/planned-courses",
      path: {
        studyPlanExternalId: studyPlanExternalId,
      },
      headers: {
        "User-External-Id": userExternalId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
