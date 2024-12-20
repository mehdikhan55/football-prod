import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import { BiFootball } from "react-icons/bi";
import Navbar from "../../components/navbar/navbar";
import { useTeam } from "../../context/teamContext";

const URL = import.meta.env.VITE_BACKEND_URL;

const LeagueDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [league, setLeague] = useState(null);
  const [showMatches, setShowMatches] = useState(false);
  const [acitveTableTab, setActiveTableTab] = useState('topScorers');


  const { currTeam } = useTeam();

  const [topScorers, setTopScorers] = useState([]);

  const [topAssists, setTopAssists] = useState([]);

  const [topCleanSheets, setTopCleanSheets] = useState([]);

  const [totalGoals, setTotalGoals] = useState(0);

  const fetchLeague = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/teams/leagues/${id}`, {
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
      console.log('league', data.league)
    } catch (error) {
      setError(error.response?.data?.message || "Some Error Occurred");
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
        goalsFor: 0,      // GF
        goalsAgainst: 0,  // GA
        goalDiff: 0       // GD
      };
    });

    // Iterate over matches and calculate stats
    league?.matches.forEach((match) => {
      const { teamA, teamB, winner, score } = match;

      if (teamA && teamB && score) {
        pointsTable[teamA._id].matchesPlayed++;
        pointsTable[teamB._id].matchesPlayed++;

        // Update goals for and against
        pointsTable[teamA._id].goalsFor += score.teamA;
        pointsTable[teamA._id].goalsAgainst += score.teamB;
        pointsTable[teamB._id].goalsFor += score.teamB;
        pointsTable[teamB._id].goalsAgainst += score.teamA;

        if (winner) {
          pointsTable[winner._id].wins++;
          pointsTable[winner._id].points += 3;
          // Update losses based on the winner
          if (winner._id === teamA._id) {
            pointsTable[teamB._id].losses++; // teamB loses
          } else {
            pointsTable[teamA._id].losses++; // teamA loses
          }
        } else {
          // Match is a draw
          pointsTable[teamA._id].draws++;
          pointsTable[teamB._id].draws++;
          pointsTable[teamA._id].points += 1;
          pointsTable[teamB._id].points += 1;
        }
      }
    });

    // Calculate goal difference and create sorted table
    Object.keys(pointsTable).forEach((teamId) => {
      const team = pointsTable[teamId];
      team.goalDiff = team.goalsFor - team.goalsAgainst;
    });

    // Convert the points table to an array and sort by points, then goal difference
    const sortedPointsTable = Object.entries(pointsTable)
      .map(([teamId, stats]) => ({
        team: league.teams.find((t) => t._id === teamId),
        ...stats,
      }))
      .sort((a, b) =>
        b.points - a.points || // First sort by points
        b.goalDiff - a.goalDiff || // Then by goal difference
        b.goalsFor - a.goalsFor // Then by goals scored
      );

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

  const getTopAssists = () => {
    const scorers = [];
    let totalGoals = 0;
    league?.matches.forEach((match) => {
      match.assists && match.assists.forEach((scorer) => {
        const scorerIndex = scorers.findIndex(
          (s) => s.player === scorer.player
        );
        if (scorerIndex !== -1) {
          scorers[scorerIndex].score += scorer.score;
        } else {
          scorers.push({ player: scorer.player, score: scorer.score, team: scorer.team.teamName });
        }
      });
    });
    //sort the scorers
    scorers.sort((a, b) => b.score - a.score);
    console.log('scorer', scorers)
    setTopAssists(scorers);
  };


  // Modify your getTopCleanSheets function
  const getTopCleanSheets = () => {
    const cleanSheetStats = {};

    league?.matches.forEach((match) => {
      if (match.cleanSheets) {
        // Process Team A clean sheet
        if (match.cleanSheets.teamA && match.cleanSheets.goalKeeperA) {
          const teamId = match.teamA._id;
          const teamName = match.teamA.teamName;
          const goalkeeper = match.cleanSheets.goalKeeperA;

          if (!cleanSheetStats[teamId]) {
            cleanSheetStats[teamId] = {
              teamName,
              goalkeepers: {},
              totalCleanSheets: 0
            };
          }

          if (!cleanSheetStats[teamId].goalkeepers[goalkeeper]) {
            cleanSheetStats[teamId].goalkeepers[goalkeeper] = 0;
          }
          cleanSheetStats[teamId].goalkeepers[goalkeeper]++;
          cleanSheetStats[teamId].totalCleanSheets++;
        }

        // Process Team B clean sheet
        if (match.cleanSheets.teamB && match.cleanSheets.goalKeeperB) {
          const teamId = match.teamB._id;
          const teamName = match.teamB.teamName;
          const goalkeeper = match.cleanSheets.goalKeeperB;

          if (!cleanSheetStats[teamId]) {
            cleanSheetStats[teamId] = {
              teamName,
              goalkeepers: {},
              totalCleanSheets: 0
            };
          }

          if (!cleanSheetStats[teamId].goalkeepers[goalkeeper]) {
            cleanSheetStats[teamId].goalkeepers[goalkeeper] = 0;
          }
          cleanSheetStats[teamId].goalkeepers[goalkeeper]++;
          cleanSheetStats[teamId].totalCleanSheets++;
        }
      }
    });

    // Convert to array and sort by total clean sheets
    const sortedStats = Object.values(cleanSheetStats)
      .sort((a, b) => b.totalCleanSheets - a.totalCleanSheets);

    setTopCleanSheets(sortedStats);
  };


  useEffect(() => {
    calculatePointsTable();
    getTopScorerAndTotalGoals();
    getTopAssists();
    getTopCleanSheets();
  }, [league]);


  const tableTabs = [
    { id: 'topScorers', label: 'Top Scorers' },
    { id: 'topAssists', label: 'Top Assists' },
    { id: 'cleanSheets', label: 'Clean Sheets' },
  ];


  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-20 pt-5 max-sm:p-4"  >
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className=" mx-auto mt-20 border p-10 max-sm:p-2 border-gray-400">
          {error && (
            <div
              role="alert"
              className="alert alert-error flex justify-between items-center py-2 mb-4 bg-red-400 border border-red-500 rounded-md "
            >
              <span className="text-black">{error}</span>
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
            <div className="mb-6 p-6 rounded-lg w-1/2 text-sm max-sm:w-full border border-gray-400 border-dashed">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-200">League Information</p>

                <p className="">
                  <strong>Total Teams:</strong> {league?.teams?.length}
                </p>
              </div>

              <p>
                <strong>Teams:</strong>
              </p>
              <ol className="list-decimal ml-5">
                {league?.teams?.map((team, idx) => (
                  <li key={idx} className=" text-gray-200">
                    {team.teamName}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
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

                  <th className="text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((team, idx) => (
                  <tr
                    key={idx}
                    className={`
        ${pointsTable.length >= 6
                        ? (idx < 4
                          ? 'bg-green-800 bg-opacity-50'
                          : (idx >= pointsTable.length - 2
                            ? 'bg-red-800 bg-opacity-50'
                            : ''))
                        : ''}
      `}
                  >
                    <td>{idx + 1}</td>
                    <td>{team.team.teamName}</td>
                    <td>{team.matchesPlayed}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{Math.abs(team.goalDiff)}</td>
                    <td>{team.points || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
            Statistics
          </h2>
          <div className="grid grid-cols-1 gap-6 max-sm:grid-cols-1 bg-gray-900 text-white mb-10">
            <div className=" p-5 rounded-lg shadow-lg max-sm:text-sm">
              <div className="flex justify-between items-center mb-4 max-sm:flex-col">
                <p className="">
                  <strong>Total Goals:</strong> {totalGoals}
                </p>
              </div>

              <div>


                <div className="flex justify-center space-x-4">
                  {tableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTableTab(tab.id)}
                      className={`px-6 py-2 rounded-lg transition-colors duration-300 
            ${acitveTableTab === tab.id ? 'bg-gray-100 text-black' : 'bg-gray-700 text-gray-300'} 
            hover:bg-gray-100 hover:text-black focus:outline-none`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {acitveTableTab === 'topScorers' && (
                  <>
                    {/* top scorers */}
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
                        Top Scorers
                      </h2>
                      <div className="max-sm:text-sm md:table mb-10">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left">Sr No.</th>
                              <th className="text-left">Scorer</th>
                              <th className="text-left">Team</th>
                              <th className="text-left">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topScorers.map((scorer, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
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
                  </>
                )}

                {acitveTableTab === 'topAssists' && (
                  <>
                    {/* top assists */}
                    <div className="">
                      <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
                        Top Assists
                      </h2>
                      <div className="max-sm:text-sm md:table mb-10">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left">Sr No.</th>
                              <th className="text-left">Scorer</th>
                              <th className="text-left">Team</th>
                              <th className="text-left">Assists</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topAssists.map((scorer, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
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
                  </>
                )}

                {acitveTableTab === 'cleanSheets' && (
                  <>
                    {acitveTableTab === 'cleanSheets' && (
                      <div className="">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
                          Clean Sheets
                        </h2>
                        <div className="max-sm:text-sm md:table mb-10">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-left">Sr No.</th>
                                <th className="text-left">Team</th>
                                <th className="text-left">Goal Keeper(s)</th>
                                <th className="text-left">Clean Sheets</th>
                              </tr>
                            </thead>
                            <tbody>
                              {topCleanSheets.map((stat, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{stat.teamName}</td>
                                  <td>
                                    {Object.entries(stat.goalkeepers)
                                      .map(([name, count]) => `${name} (${count})`)
                                      .join(', ')}
                                  </td>
                                  <td>{stat.totalCleanSheets}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                )}



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


          <h2 className="text-3xl font-semibold mb-4 text-gray-300 max-sm:text-xl">
            Matches
          </h2>
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 border border-gray-600 rounded-lg">
            {showMatches && (
              <>
                {league?.matches?.map((match, idx) => (
                  <div
                    key={idx}
                    className=" p-5 rounded-lg shadow-lg max-sm:text-sm border-2  border-gray-100"
                  >
                    <div className="flex justify-between mb-4 max-sm:flex-col">
                      <p className="">
                        <strong>Match:</strong> {match.teamA?.teamName} vs{" "}
                        {match.teamB?.teamName}
                      </p>
                      <div className="flex flex-col">
                        <p className="">
                          <strong>Date:</strong>{" "}
                          {new Date(match.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong>{" "}
                          {match.time || "Not Available"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4 max-sm:flex-col">
                      <p className="">
                        <strong>Winner:</strong> {match.winner?.teamName || "Draw"}
                      </p>
                      <p className="">
                        <strong>Score:</strong> {match.score?.teamA} -{" "}
                        {match.score?.teamB}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                    <div>
                      <strong>Scorers:</strong>
                     {
                      match.scorers.length > 0 ? (
                        <>
                         <ul className="mt-2 ml-4 list-disc">
                        {match.scorers.map((scorer, i) => (
                          <li key={i} className="text-sm">
                            {scorer.player} ({scorer.team?.teamName}) -{" "}
                            {scorer?.score}
                          </li>
                        ))}
                      </ul>
                        </>
                      ):(
                        <p className="text-sm italic">No Scorers</p>
                      )
                     }
                    </div>
                    <div className="">
                      <strong>Assists:</strong>
                     {
                      match.scorers.length > 0 ? (
                        <>
                         <ul className="mt-2 ml-4 list-disc">
                        {match.assists.map((scorer, i) => (
                          <li key={i} className="text-sm">
                            {scorer.player} ({scorer.team?.teamName}) -{" "}
                            {scorer?.score}
                          </li>
                        ))}
                      </ul>
                        </>
                      ):(
                        <p className="text-sm italic">No Assists</p>
                      )
                     }
                    </div>
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

export default LeagueDetails;
