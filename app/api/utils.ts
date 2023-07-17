import { PAGE_SIZE } from "./constants";
import { TourRankingResponse } from "./types";

export const request = async (url: string, option?: any) => {
  try {
    const response = await fetch(url, option);
    const result = await response.json();

    return result;
  } catch(err) {
    console.error(err);
  }
}

export const pagination = (array: TourRankingResponse[], pageNumber: number) => {
  const param1 = (pageNumber - 1 ) * PAGE_SIZE;
  const param2 = pageNumber * PAGE_SIZE;

  const response = {
    currentPage: pageNumber,
    lastPage: Math.ceil(array.length / PAGE_SIZE),
    ranking: array.slice(param1, param2),
    totalItems: array.length
  }

  return response;
}