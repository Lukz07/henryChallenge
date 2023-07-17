import { request, pagination } from "./utils";

const REST_API_URL = 'http://localhost:3000/api/';

export const getTours = async () => {
  const fullUrl = REST_API_URL + 'tours';
  try {
    const result = await request(fullUrl);
    return result;
  } catch(err) {
    console.error(err);
  }
}

export const getTourRankings = async ({tour_id, season_id}: {tour_id: number, season_id: number}, pageNumber: number) => {
  const fullUrl = REST_API_URL + `rankings/${tour_id}/${season_id}`;
  const page = !pageNumber ? 0 : pageNumber;

  try {
    const response = await request(fullUrl);
    const items = response;
    
    return pagination(items, page);
  } catch(err) {
    console.log(err);
  }
}