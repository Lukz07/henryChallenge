import { getTourRankings, getTours } from "../api";

export const loadTours = async (setTours: any) => {
  await getTours().then((res) => setTours(res));
}

export const loadTourRankings = async ({tour_id, season_id}: { tour_id: number, season_id: number}, setRanking: any, pageNumber: number) => {
  await getTourRankings({tour_id, season_id}, pageNumber).then(res => setRanking(res))
}