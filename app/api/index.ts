const url = 'https://golf-leaderboard-data.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eae4aa820amsh0eaaa2fc6d80491p1a4afdjsn8e9890b9686b',
		'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com'
	}
};
const PAGE_SIZE = 10;

export interface TourRankingResponse {
  player_id: number,
  player_name: string,
  position: number,
  movement: number,
  num_events: number,
  num_wins: number,
  points: string,
  num_top_tens: number
}

const pagination = (array: TourRankingResponse[], pageNumber: number) => {
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

const request = async (url: string, option: any) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch(err) {
    console.error(err)
  }
}


export const getTours = async () => {
  const fullUrl = url + 'tours';
  try {
    const result = await request(fullUrl, options);
    return result?.results;
  } catch(err) {
    console.error(err);
  }
}

export const getTourRankings = async ({tour_id, season_id}: {tour_id: number, season_id: number}, pageNumber: number) => {
  const fullUrl = url + `tour-rankings/${tour_id}/${season_id}`;
  const page = !pageNumber ? 0 : pageNumber;

  try {
    const response = await request(fullUrl, options);
    const items = response.results.rankings;
    
    return pagination(items, page);
  } catch(err) {
    console.log(err);
  }
}