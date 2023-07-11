"use client"

import "./index.scss";
import Header from "./Header";
import TableFilter from "./TableFilter";
import Table from "./Table";
import { useState } from "react";

const MainContent = () => {
  const [ranking, setRanking] = useState();
  
  return(
    <div className="mainContent flex flex-col">
      <Header/>
      <div className="feed">
        <TableFilter setRanking={setRanking}/>
        <Table rankingTours={ranking} setRanking={setRanking}/>
      </div>
    </div>
  )
}

export default MainContent;