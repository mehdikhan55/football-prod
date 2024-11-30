import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSiderbar from "../../components/sidebar/sidebar";
import axios from "axios";
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import { BiFootball } from "react-icons/bi";

const URL = import.meta.env.VITE_BACKEND_URL;

const AdminLeagueDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [league, setLeague] = useState(null);
  const [showMatches, setShowMatches] = useState(false);

  const [topScorers, setTopScorers] = useState([]);

  const [totalGoals, setTotalGoals] = useState(0);

  const fetchLeague = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/leagues/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setLeague(data.league);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeague();
  }, []);

  const [pointsTable, setPointsTable] = useState({});

  const calculatePointsTable = () => {
    const pointsTable = {};

    // Initialize stats for each team
    league?.teams.forEach((team) => {
      pointsTable[team._id] = {
        points: 0,
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
      };
    });

    // Iterate over matches and calculate stats
    league?.matches.forEach((match) => {
      const { teamA, teamB, winner } = match;

      if (teamA && teamB) {
        pointsTable[teamA._id].matchesPlayed++;
        pointsTable[teamB._id].matchesPlayed++;

        if (winner) {
          pointsTable[winner._id].wins++;
          pointsTable[winner._id].points += 3;
          // Update losses based on the winner
          if (winner._id === teamA._id) {
            pointsTable[teamB._id].losses++; // teamB loses
          } else {
            pointsTable[teamA._id].losses++; // teamA loses
          }

          console.log('pointsTable', pointsTable)
        } else {
          // Match is a draw
          pointsTable[teamA._id].draws++;
          pointsTable[teamB._id].draws++;
          pointsTable[teamA._id].points += 1;
          pointsTable[teamB._id].points += 1;
        }
      }
    });

    // Convert the points table to an array and sort by points
    const sortedPointsTable = Object.entries(pointsTable)
      .map(([teamId, stats]) => ({
        team: league.teams.find((t) => t._id === teamId),
        ...stats,
      }))
      .sort((a, b) => b.points - a.points || b.wins - a.wins);

    setPointsTable(sortedPointsTable);
  };


  const getTopScorerAndTotalGoals = () => {
    const scorers = [];
    let totalGoals = 0;
    league?.matches.forEach((match) => {
      match.scorers.forEach((scorer) => {
        const scorerIndex = scorers.findIndex(
          (s) => s.player === scorer.player
        );
        if (scorerIndex !== -1) {
          scorers[scorerIndex].score += scorer.score;
        } else {
          scorers.push({ player: scorer.player, score: scorer.score, team: scorer.team.teamName });
        }
        totalGoals += scorer.score;
      });
    });
    //sort the scorers
    scorers.sort((a, b) => b.score - a.score);
    console.log('scorer', scorers)
    setTopScorers(scorers);
    setTotalGoals(totalGoals);
  };


  useEffect(() => {
    calculatePointsTable();
    getTopScorerAndTotalGoals();
  }, [league]);

  return (
    <div
      className="min-h-screen bg-gray-100 p-20 pt-5 max-sm:p-4"
      style={{
        backgroundImage: `url(${dfawallpaper})`,
        backgroundSize: "cover",
      }}
    >
      <AdminSiderbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className=" mx-auto mt-20 border p-10 max-sm:p-2">
          {error && (
            <div
              role="alert"
              className="alert alert-error flex justify-between items-center py-2 mb-4 bg-red-100 border border-red-400 rounded-md"
            >
              <span className="text-red-600">{error}</span>
              <button
                className="text-red-600 font-bold"
                onClick={() => setError(null)}
              >
                x
              </button>
            </div>
          )}
          <div className="flex justify-between items-center mb-6 max-sm:flex-col">
            <h1 className="text-4xl font-bold mb-6 text-center w-1/2 items-center flex-col flex max-sm:text-xl">
              <BiFootball className="inline-block text-4xl max-sm:text-xl" />
              {league?.leagueName} Details
              <p className="mb-2 text-sm font-normal mt-2">
                <span className="flex">
                  {new Date(league?.startDate).toLocaleDateString()} -{" "}
                  {new Date(league?.endDate).toLocaleDateString()}
                </span>
              </p>
            </h1>
            <div className="mb-6 p-6 rounded-lg w-1/2 text-sm max-sm:w-full border border-dashed">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700">League Information</p>

                <p className="">
                  <strong>Total Teams:</strong> {league?.teams?.length}
                </p>
              </div>

              <p>
                <strong>Teams:</strong>
              </p>
              <ol className="list-decimal ml-5">
                {league?.teams?.map((team, idx) => (
                  <li key={idx} className=" text-gray-800">
                    {team.teamName}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800 max-sm:text-xl">
            Points Table
          </h2>
          <div className="max-sm:text-sm md:table mb-10">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Team</th>
                  <th className="text-left">GP</th>
                  {/* wins */}
                  <th className="text-left">W</th>
                  {/* draws */}
                  <th className="text-left">D</th>
                  {/* losses */}
                  <th className="text-left">L</th>

                  {/* leave the following three 0 */}
                  <th className="text-left">GF</th>
                  <th className="text-left">GA</th>
                  <th className="text-left">GD</th>

                  <th className="text-left">Matches</th>
                  <th className="text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((team, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{team.team.teamName}</td>
                    <td>0</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{team.matchesPlayed}</td>
                    <td>{team.points || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800 max-sm:text-xl">
            Statistics
          </h2>
          <div className="grid grid-cols-1 gap-6 max-sm:grid-cols-1 bg-white mb-10">
            <div className=" p-5 rounded-lg shadow-lg max-sm:text-sm">
              <div className="flex justify-between items-center mb-4 max-sm:flex-col">
                <p className="">
                  <strong>Total Goals:</strong> {totalGoals}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold mb-4 text-black max-sm:text-xl">
                  Top Scorers
                </h2>
                <div className="max-sm:text-sm md:table mb-10">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Scorer</th>
                        <th className="text-left">Team</th>
                        <th className="text-left">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topScorers.map((scorer, i) => (
                        <tr key={i}>
                          <td>{scorer.player}</td>
                          <td>{scorer.team}</td>
                          <td>{scorer.score}</td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


          <div className="text-center">
            <button
              onClick={() => setShowMatches(!showMatches)}
              className="btn "
            >
              {showMatches ? "Hide Matches" : "Show Matches"}
            </button>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800 max-sm:text-xl">
            Matches
          </h2>
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">

            {showMatches && (
              <>
                {league?.matches?.map((match, idx) => (
                  <div
                    key={idx}
                    className=" p-5 rounded-lg shadow-lg max-sm:text-sm"
                  >
                    <div className="flex justify-between items-center mb-4 max-sm:flex-col">
                      <p className="">
                        <strong>Match:</strong> {match.teamA?.teamName} vs{" "}
                        {match.teamB?.teamName}
                      </p>
                      <p className="">
                        <strong>Date:</strong>{" "}
                        {new Date(match.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-4 max-sm:flex-col">
                      <p className="">
                        <strong>Winner:</strong> {match.winner?.teamName}
                      </p>
                      <p className="">
                        <strong>Score:</strong> {match.score?.teamA} -{" "}
                        {match.score?.teamB}
                      </p>
                    </div>
                    <div>
                      <strong>Scorers:</strong>
                      <ul className="mt-2 ml-4 list-disc">
                        {match.scorers.map((scorer, i) => (
                          <li key={i} className="text-sm">
                            {scorer.player} ({scorer.team?.teamName}) -{" "}
                            {scorer?.score}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </>
            )}  
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeagueDetails;
