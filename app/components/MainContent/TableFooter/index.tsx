import Image from "next/image";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { loadTourRankings } from "@/app/utils";

interface TableFooterProps {
  currentPage: number | undefined,
  lastPage: number | undefined,
  totalItems: number | undefined,
  setRanking: any
}

const TableFooter = ({currentPage, lastPage, totalItems, setRanking}: TableFooterProps) => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (!currentPage) return;
    
    if (currentPage || currentPage != page) {
      setPage(currentPage);
    }
  }, [currentPage]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if(currentPage == 1) return;

    const seasonId = document.querySelector(".season-filter .season-button")?.dataset.id;
    const tourId = document.querySelector(".tour-filter .tour-button")?.dataset.id;

    loadTourRankings({season_id: seasonId, tour_id: tourId}, setRanking, currentPage - 1);
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if(currentPage == lastPage) return;

    const seasonId = document.querySelector(".season-filter .season-button")?.dataset.id;
    const tourId = document.querySelector(".tour-filter .tour-button")?.dataset.id;

    loadTourRankings({season_id: seasonId, tour_id: tourId}, setRanking, currentPage + 1);
  }

  return (
    <div className="table-footer">
      <div className="pagination">
        <a href="#" className="arrow-left" onClick={(e) => handlePrev(e)}>
          <Image src={"/arrow.svg"} height={24} width={24} alt="arrow left"/>
        </a>
        <p><b>{!page ? 0 : page}</b> de <b>{!lastPage ? 0 : lastPage}</b></p>
        <a href="#" className="arrow-right" onClick={(e) => handleNext(e)}>
          <Image src={"/arrow.svg"} height={24} width={24} alt="arrow right"/>
        </a>
      </div>
      <div className="total-items">
        {!totalItems ? 0 : totalItems} items
      </div>
    </div>
  )
}

export default TableFooter;
