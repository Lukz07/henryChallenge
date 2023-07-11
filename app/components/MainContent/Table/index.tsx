"use client"

import TableFooter from "../TableFooter";
import "./index.scss";

interface RankingProps {
  player_name: string,
  position: number,
  num_wins: number,
  points: string,
  num_top_tens: number,
  num_events: number
}

interface TableProps {
  ranking: RankingProps[],
  currentPage: number,
  lastPage: number,
  totalItems: number
}

const Table = ({rankingTours, setRanking}: {rankingTours: TableProps | undefined, setRanking: any}) => {
  return (
    <div className="leaderboard-table w-full">
      <table className="leaderboard-table-main table-auto">
        <thead>
          <tr>
            <th className="px-4 h-12 w-14 text-center border-r">#</th>
            <th className="px-4 h-12 w-56 text-left border-r">NAME</th>
            <th className="px-4 h-12 w-56 text-left border-r">POINTS</th>
            <th className="px-4 h-12 w-56 text-left border-r"># OF WINS</th>
            <th className="px-4 h-12 w-56 text-left border-r"># OF TOP 10'S</th>
            <th className="px-4 h-12 w-56 text-left border-r"># OF EVENTS</th>
          </tr>
        </thead>
        <tbody>
          {
            rankingTours && rankingTours.ranking && rankingTours.ranking.map(({player_name, position, num_wins, points, num_top_tens, num_events}, index) => (
              <tr key={index}>
                <td className="px-4 h-14 text-center" data-label="#">{position}</td>
                <td className="px-4 h-12 w-56 text-left" data-label="NAME">{player_name}</td>
                <td className="px-4 h-12 w-56 text-left" data-label="POINTS">{points}</td>
                <td className="px-4 h-12 w-56 text-left" data-label="# OF WINS">{num_wins}</td>
                <td className="px-4 h-12 w-56 text-left" data-label="# OF TOP 10'S">{num_top_tens}</td>
                <td className="px-4 h-12 w-56 text-left" data-label="# OF EVENTS">{num_events}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="leaderboard-table-footer">
        <TableFooter 
          currentPage={rankingTours?.currentPage} 
          totalItems={rankingTours?.totalItems}
          lastPage={rankingTours?.lastPage}
          setRanking={setRanking}
        />
      </div>
    </div>
  )
}

export default Table;