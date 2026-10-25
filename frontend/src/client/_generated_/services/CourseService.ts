/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseResponse } from "../models/CourseResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CourseService {
  /**
   * @param start
   * @param take
   * @param title
   * @param code
   * @param userExternalId
   * @returns CourseResponse OK
   * @throws ApiError
   */
  public static getAllCourses(
    start: number = 1,
    take: number = 300,
    title?: string,
    code?: string,
    userExternalId?: string,
  ): CancelablePromise<Array<CourseResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/courses",
      headers: {
        "User-External-Id": userExternalId,
      },
      query: {
        start: start,
        take: take,
        title: title,
        code: code,
      },
    });
  }
}
