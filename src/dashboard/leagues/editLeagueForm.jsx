import React, { useState, useEffect } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import { inputDateFormat } from "../../utils/inputDateFormat";

const EditLeagueForm = ({ leagueData, onSubmit, teamsData }) => {
  const [leagueName, setLeagueName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamsData, setSelectedTeamsData] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);

  useEffect(() => {
    console.log("leagueData", leagueData);
    setLoading(true);
    if (leagueData) {
      setLeagueName(leagueData.leagueName);
      setStartDate(inputDateFormat(leagueData.startDate));
      setEndDate(inputDateFormat(leagueData.endDate));
      setSelectedTeams(leagueData.teams.map((team) => team._id));
      setSelectedTeamsData(leagueData.teams);
      setMatches(leagueData.matches.map(match => ({
        ...match,
        time: match.time || "", // Added time field handling
      })));
      setAvailablePlayers(() => {
        const players = [];
        leagueData.teams.forEach((leagueTeam) => {
          const teamPlayers = teamsData.find(
            (team) => team._id === leagueTeam._id
          ).players;
          teamPlayers.forEach((player) => {
            players.push({ teamId: leagueTeam._id, playerName: player });
          });
        });
        return players;
      });
    }
    setLoading(false);
  }, [leagueData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);



    const updatedMatches = matches.map((match) => ({
      _id: match._id || undefined, // Include _id for existing matches, omit for new ones
      teamA: match.teamA,
      teamB: match.teamB,
      score: match.score,
      scorers: match.scorers,
      date: match.date,
      time: match.time,
      winner: match.winner,
    }));

    const updatedLeague = {
      leagueName,
      startDate,
      endDate,
      teams: selectedTeams,
      matches: updatedMatches,
    };
    console.log(updatedLeague);
    onSubmit(updatedLeague);
    setLoading(false);
  };

  const addMatch = () => {
    setMatches([
      ...matches,
      {
        teamA: "",
        teamB: "",
        score: { teamA: 0, teamB: 0 },
        scorers: [],
        date: "",
        time: "",
        winner: "",
      },
    ]);
  };

  const removeMatch = (index) => {
    const newMatches = matches.filter((_, i) => i !== index);
    setMatches(newMatches);
  };

  const addScorer = (matchIndex) => {
    const newMatches = [...matches];
    newMatches[matchIndex].scorers.push({ player: "", team: "" });
    setMatches(newMatches);
  };

  const removeScorer = (matchIndex, scorerIndex) => {
    const newMatches = [...matches];
    newMatches[matchIndex].scorers = newMatches[matchIndex].scorers.filter(
      (_, i) => i !== scorerIndex
    );
    setMatches(newMatches);
  };

  const handleTeamChange = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
    setSelectedTeamsData((prev) =>
      prev.find((team) => team._id === teamId)
        ? prev.filter((team) => team._id !== teamId)
        : [...prev, teamsData.find((team) => team._id === teamId)]
    );
    setAvailablePlayers((prev) => {
      const teamPlayers = teamsData.find((team) => team._id === teamId).players;
      const players = teamPlayers.map((player) => ({
        teamId,
        playerName: player,
      }));
      return [...prev, ...players];
    });
  };

  const getTeamById = (teamId) => {
    const team = teamsData.find((team) => team._id === teamId);
    return team ? team.teamName : "Unknown Team";
  };



  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (

        <div
          style={{
            backgroundImage: `url(${dfawallpaper})`,
            backgroundSize: "cover",
          }}
        >
          <AdminSiderbar />
          <div className="flex flex-col justify-center gap-4 w-full max-sm:w-full max-md:w-2/3 mt-6 max-sm:mt-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-3/4 mx-auto"
            >
              <h1 className="text-2xl font-bold">Edit League</h1>

              <label className="text-gray-500">League Name</label>
              <input
                type="text"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                className="rounded-md p-3 border border-gray-300"
                required
              />

              <label className="text-gray-500">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-md p-3 border border-gray-300"
                required
              />

              <label className="text-gray-500">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-md p-3 border border-gray-300"
                required
              />

              <div className="flex flex-col gap-4">
                <label className="text-gray-500">Teams</label>
                {teamsData.map((team) => (
                  <div key={team._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTeams.includes(team._id)}
                      onChange={() => handleTeamChange(team._id)}
                      className="rounded"
                    />
                    <span>{team.teamName}</span>
                  </div>
                ))}
              </div>

              {matches.map((match, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 border p-4 rounded-md border-gray-300"
                >
                  <label className="text-gray-500">Match {index + 1}</label>
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label className="text-gray-500">Team A</label>
                      <select
                        value={match.teamA._id}
                        onChange={(e) => {
                          const newMatches = [...matches];
                          newMatches[index].teamA = e.target.value;
                          setMatches(newMatches);
                        }}
                        className="rounded-md p-3 border border-gray-300"
                        required
                      >
                        <option value="">Select Team A</option>
                        {selectedTeamsData.filter((tm) => match.teamB ? tm._id !== (typeof match.teamB === 'string' ? match.teamB : match.teamB._id) : tm).map((team) => (
                          <option key={team._id} value={team._id}>
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="text-gray-500">Team B</label>
                      <select
                        required
                        value={match.teamB._id}
                        onChange={(e) => {
                          const newMatches = [...matches];
                          newMatches[index].teamB = e.target.value;
                          setMatches(newMatches);
                        }}
                        className="rounded-md p-3 border border-gray-300"
                      >
                        <option value="">Select Team B</option>
                        {selectedTeamsData.filter((tm) => match.teamA ? tm._id !== (typeof match.teamA === 'string' ? match.teamA : match.teamA._id) : tm).map((team) => (
                          <option key={team._id} value={team._id}>
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col w-1/2">
                      <label className="text-gray-500">
                        Score (Team A: Team B)
                      </label>
                      <input
                        type="text"
                        value={`${match.score.teamA}:${match.score.teamB}`}
                        onChange={(e) => {
                          const [scoreA, scoreB] = e.target.value
                            .split(":")
                            .map(Number);
                          const newMatches = [...matches];
                          newMatches[index].score = {
                            teamA: scoreA || 0,
                            teamB: scoreB || 0,
                          };
                          setMatches(newMatches);
                        }}
                        className="rounded-md p-3 border border-gray-300"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <label className="text-gray-500">Scorers</label>
                      {match.scorers.map((scorer, scorerIndex) => (
                        <div key={scorerIndex} className="flex gap-2">
                          <select
                            required
                            type="text"
                            placeholder="Player Name"
                            value={scorer.player}
                            onChange={(e) => {
                              const selectedPlayer = e.target.value;

                              // Find the corresponding teamId based on the selected player
                              const foundPlayer = availablePlayers.find(
                                (player) => player.playerName === selectedPlayer
                              );
                              const teamId = foundPlayer ? foundPlayer.teamId : ""; // Get the teamId or an empty string

                              const newMatches = [...matches];
                              newMatches[index].scorers[scorerIndex].player =
                                selectedPlayer;
                              newMatches[index].scorers[scorerIndex].team = teamId; // Set the teamId
                              setMatches(newMatches);
                            }}
                            className="rounded-md p-3 border border-gray-300 w-2/3"
                          >
                            <option value="">Select Player</option>
                            {availablePlayers.filter(
                              (player) =>
                                player.teamId === ((typeof match.teamA === 'string') ? match.teamA : match.teamA._id) ||
                                player.teamId === ((typeof match.teamB === 'string') ? match.teamB : match.teamB._id)
                            ).map((player) => (
                              <option
                                key={player.playerName}
                                value={player.playerName}
                                selected={player.playerName === scorer.player}
                              >
                                {player.playerName}
                              </option>
                            ))}
                          </select>
                          <input
                            required
                            type="text"
                            placeholder="Team Name"
                            value={scorer.team ? (((scorer.team === (typeof match.teamA === 'string' ? match.teamA : match.teamA._id)) || (scorer.team === (typeof match.teamB === 'string' ? match.teamB : match.teamB._id))) ? getTeamById(scorer.team) : removeScorer(
                              index, scorerIndex
                            )) : ""}
                            readOnly
                            className="rounded-md p-3 border border-gray-300 w-1/3"
                          />
                          <input
                            required
                            type="number"
                            placeholder="Score"
                            value={scorer?.score || 0}
                            className="rounded-md p-3 border border-gray-300 w-1/3"
                            onChange={(e) => {
                              const newMatches = [...matches];
                              newMatches[index].scorers[scorerIndex].score =
                                e.target.value;
                              setMatches(newMatches);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeScorer(index, scorerIndex)}
                            className="btn btn-secondary"
                          >
                            Remove Scorer
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addScorer(index)}
                        className="mt-2 bg-secondary text-white rounded-md py-1"
                      >
                        + Add Scorer
                      </button>
                    </div>
                  </div>
                  <label className="text-gray-500">Winner</label>
                  <select
                    required
                    value={match.winner}
                    onChange={(e) => {
                      const newMatches = [...matches];
                      newMatches[index].winner = e.target.value === "Draw" ? null : e.target.value;
                      console.log('value setted:', e.target.value);
                      setMatches(newMatches);
                    }}
                    className="rounded-md p-3 border border-gray-300"
                  >
                    <option value="">Select Winner</option>
                    {/* // Add the team names that are playing this match as options */}
                    <option value={(typeof match.teamA === 'string') ? match.teamA : match.teamA._id}>
                      {(typeof match.teamA) === 'string' ?
                        getTeamById(match.teamA) : match.teamA.teamName}
                    </option>
                    <option value={(typeof match.teamB === 'string') ? match.teamB : match.teamB._id}>
                      {(typeof match.teamB) === 'string' ?
                        getTeamById(match.teamB) : match.teamB.teamName}
                    </option>
                    <option selected={!match.winner} value="Draw">Draw</option>
                  </select>

                  <label className="text-gray-500">Match Date</label>
                  <input
                    required
                    type="date"
                    value={inputDateFormat(match.date)}
                    onChange={(e) => {
                      const newMatches = [...matches];
                      newMatches[index].date = e.target.value;
                      setMatches(newMatches);
                    }}
                    className="rounded-md p-3 border border-gray-300"
                  />
                  <label className="text-gray-500">Match Time</label>
                  <input
                    type="time"
                    value={match.time || ""}
                    onChange={(e) => {
                      const newMatches = [...matches];
                      newMatches[index].time = e.target.value;
                      setMatches(newMatches);
                    }}
                    className="rounded-md p-3 border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeMatch(index)}
                    className="btn btn-secondary"
                  >
                    Remove Match
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addMatch}
                className="mt-4 bg-secondary text-white rounded-md py-2"
              >
                + Add Match
              </button>

              <button
                type="submit"
                className="mt-4 bg-primary text-white rounded-md py-2"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update League"}
              </button>
            </form>
          </div>
        </div>
      )
      }
    </>

  );
};

export default EditLeagueForm;
