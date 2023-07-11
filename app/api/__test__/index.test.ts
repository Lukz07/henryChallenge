
import { getTourRankings, getTours } from "..";
import {expect} from "@jest/globals";

const url = 'https://golf-leaderboard-data.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eae4aa820amsh0eaaa2fc6d80491p1a4afdjsn8e9890b9686b',
		'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com'
	}
};

const getToursResponse = {
  "meta": {
      "title": "Golf Tours",
      "description": "Golf tours and associated ids and seasons covered, use combination of season_id and tour_id to access fixtures and leaderboards",
      "fields": {
          "tour_id": "Integer",
          "tour_name": "String",
          "season_id": "Integer",
          "active": "Integer (1 or 0)"
      }
  },
  "results": [
      {
          "tour_id": 1,
          "tour_name": "European Tour",
          "season_id": 2023,
          "active": 1
      },
      {
          "tour_id": 2,
          "tour_name": "US PGA Tour",
          "season_id": 2023,
          "active": 1
      },
      {
          "tour_id": 1,
          "tour_name": "European Tour",
          "season_id": 2022,
          "active": 0
      },
      {
          "tour_id": 2,
          "tour_name": "PGA Tour",
          "season_id": 2022,
          "active": 0
      },
      {
          "tour_id": 4,
          "tour_name": "LIV Golf",
          "season_id": 2022,
          "active": 1
      },
      {
          "tour_id": 1,
          "tour_name": "European Tour",
          "season_id": 2021,
          "active": 0
      },
      {
          "tour_id": 2,
          "tour_name": "US PGA Tour",
          "season_id": 2021,
          "active": 0
      },
      {
          "tour_id": 1,
          "tour_name": "European Tour",
          "season_id": 2020,
          "active": 0
      },
      {
          "tour_id": 2,
          "tour_name": "US PGA Tour",
          "season_id": 2020,
          "active": 0
      },
      {
          "tour_id": 3,
          "tour_name": "Sunshine Tour",
          "season_id": 2020,
          "active": 0
      },
      {
          "tour_id": 1,
          "tour_name": "European Tour",
          "season_id": 2019,
          "active": 0
      }
  ]
};

const getRankingsResponse = {
  "meta": {
      "title": "Race To Dubai Rankings 2023",
      "description": "Tour rankings for given season",
      "fields": {
          "last_updated": "Timestamp - Format ISO UTC 2020-08-13T05:45:03+00:00"
      }
  },
  "results": {
    "last_updated": "2023-07-10T13:00:15+00:00",
    "rankings": [
      {
          "player_id": 102088,
          "player_name": "Rory Mcilroy",
          "position": 1,
          "movement": 0,
          "num_events": 5,
          "num_wins": 1,
          "points": "3223.0",
          "num_top_tens": 4
      },
      {
          "player_id": 123640,
          "player_name": "Jon Rahm",
          "position": 2,
          "movement": 0,
          "num_events": 4,
          "num_wins": 1,
          "points": "1942.64",
          "num_top_tens": 2
      },
      {
          "player_id": 111169,
          "player_name": "Adrian Meronk",
          "position": 3,
          "movement": 0,
          "num_events": 14,
          "num_wins": 2,
          "points": "1780.74",
          "num_top_tens": 6
      },
      {
          "player_id": 122584,
          "player_name": "Victor Perez",
          "position": 4,
          "movement": 0,
          "num_events": 10,
          "num_wins": 1,
          "points": "1766.61",
          "num_top_tens": 2
      }
    ]
  }
};

global.fetch = jest.fn(async () =>
  Promise.resolve({ json: async () => Promise.resolve() })
) as jest.Mock;

describe('API Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('test getTours request', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({ json: async () => Promise.resolve(getToursResponse) })
    ) as jest.Mock;

    const fullUrl = url + 'tours';
    const response = await getTours();

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(fullUrl, options);
    expect(response.length).toBe(11);
  });

  it('test getRanking request', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({ json: async () => Promise.resolve(getRankingsResponse) })
    ) as jest.Mock;

    const formatedResponse = {
      currentPage: 1,
      lastPage: 1,
      ranking: [
        {
          player_id: 102088,
          player_name: 'Rory Mcilroy',
          position: 1,
          movement: 0,
          num_events: 5,
          num_wins: 1,
          points: '3223.0',
          num_top_tens: 4
        },
        {
          player_id: 123640,
          player_name: 'Jon Rahm',
          position: 2,
          movement: 0,
          num_events: 4,
          num_wins: 1,
          points: '1942.64',
          num_top_tens: 2
        },
        {
          player_id: 111169,
          player_name: 'Adrian Meronk',
          position: 3,
          movement: 0,
          num_events: 14,
          num_wins: 2,
          points: '1780.74',
          num_top_tens: 6
        },
        {
          player_id: 122584,
          player_name: 'Victor Perez',
          position: 4,
          movement: 0,
          num_events: 10,
          num_wins: 1,
          points: '1766.61',
          num_top_tens: 2
        }
      ],
      totalItems: 4
    }

    const fullUrl = url + 'tour-rankings/1/2023';
    const response = await getTourRankings({tour_id: 1, season_id: 2023}, 1);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(fullUrl, options);
    expect(response).toStrictEqual(formatedResponse);
  })
})