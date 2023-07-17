"use client"

import { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import "./index.scss";
import { Option } from "../../Dropdown";
import { loadTourRankings, loadTours } from "@/app/utils";

interface Tour {
  tour_id: number;
  tour_name: string;
  season_id: number;
  active: boolean;
}

const TableFilter = ({ setRanking }: {setRanking: any}) => {
  const DEFAULT_TOUR_TEXT = 'Tour';
  const DEFAULT_SEASON_TEXT = 'Season';

  const [tours, setTours] = useState<Tour[] | null>();
  const [toursName, setToursName] = useState<Option[]>([{text: DEFAULT_TOUR_TEXT, id: 0}]);
  const [season, setSeason] = useState<Option[]>([{text: DEFAULT_SEASON_TEXT, id: 0}]);

  useEffect(() => {
    loadTours(setTours);
  }, []);

  useEffect(() => {
    let uniqueToursName: Option[] = [];
    let uniqueSeasonId: Option[] = [];
    
    if(tours) {
      tours.filter((element) => {
        const tourNameResult = uniqueToursName.filter(item => element.tour_name === item.text);
        const seasonNameResult = uniqueSeasonId.filter(item => element.season_id.toString() === item.text);
        
        if (tourNameResult.length < 1 ) {
          uniqueToursName.push({
            text: element.tour_name,
            id: element.tour_id
          })
        }

        if(seasonNameResult.length < 1) {
          const season_id = element.season_id;
          uniqueSeasonId.push({text: season_id.toString(), id: season_id})
        }
      });
    }

    setToursName(uniqueToursName);
    setSeason(uniqueSeasonId);
  }, [tours]);

  const handleOnChange = () => {
    const seasonId = document.querySelector(".season-filter .season-button")?.dataset.id;
    const tourId = document.querySelector(".tour-filter .tour-button")?.dataset.id;

    if (tourId == 0 || seasonId == 0) return;

    loadTourRankings({season_id: seasonId, tour_id: tourId}, setRanking, 1);
  }

  return (
    <div className="table-filter">
      <Dropdown title="Tour" options={toursName} onChange={handleOnChange}/>
      <Dropdown title="Season" options={season} onChange={handleOnChange}/>
    </div>
  )
}

export default TableFilter;