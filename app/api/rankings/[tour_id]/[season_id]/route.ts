import { OPTIONS, URL } from "@/app/api/constants";
import { request as handleRequest } from "@/app/api/utils";
import { NextResponse } from "next/server";

export async function GET (request: Response, {params}: {
  params: {
    season_id: string,
    tour_id: string
  }
}) {
  const { season_id, tour_id } = params;
  const FULL_URL = URL + `tour-rankings/${tour_id}/${season_id}`;

  try {
    console.log(FULL_URL)
    const res = await handleRequest(FULL_URL, OPTIONS);
    return NextResponse.json(res.results.rankings);
  } catch(err) {
    console.log(err)
  }
}