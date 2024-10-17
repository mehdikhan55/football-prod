import React, { useState, useEffect } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import dfawallpaper from "../../assets/dfa-wallpaper.png";

const EditLeagueForm = ({ leagueData, onSubmit }) => {
    const [leagueName, setLeagueName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (leagueData) {
            setLeagueName(leagueData.leagueName);
            setStartDate(leagueData.startDate);
            setEndDate(leagueData.endDate);
            setTeams(leagueData.teams);
            setMatches(leagueData.matches);
        }
    }, [leagueData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedLeague = {
            leagueName,
            startDate,
            endDate,
            teams,
            matches,
        };
        console.log(updatedLeague);
        onSubmit(updatedLeague);
        setLoading(false);
    };

    const addMatch = () => {
        setMatches([...matches, { teamA: '', teamB: '', score: { teamA: 0, teamB: 0 }, scorers: [], date: '' }]);
    };

    const addScorer = (matchIndex) => {
        const newMatches = [...matches];
        newMatches[matchIndex].scorers.push({ player: '', team: '' });
        setMatches(newMatches);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${dfawallpaper})`,
                backgroundSize: "cover",
            }}
        >
            <AdminSiderbar />
            <div className="flex flex-col justify-center gap-4 w-full max-sm:w-full max-md:w-2/3 max-sm:mt-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4 mx-auto">
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

                    <label className="text-gray-500">Teams (Comma Separated)</label>
                    <input
                        type="text"
                        value={teams.join(', ')}
                        onChange={(e) => setTeams(e.target.value.split(',').map(team => team.trim()))}
                        className="rounded-md p-3 border border-gray-300"
                    />

                    {matches.map((match, index) => (
                        <div key={index} className="flex flex-col gap-4 border p-4 rounded-md border-gray-300">
                            <label className="text-gray-500">Match {index + 1}</label>
                            <div className="flex gap-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-500">Team A (ID)</label>
                                    <input
                                        type="text"
                                        value={match.teamA}
                                        onChange={(e) => {
                                            const newMatches = [...matches];
                                            newMatches[index].teamA = e.target.value;
                                            setMatches(newMatches);
                                        }}
                                        className="rounded-md p-3 border border-gray-300"
                                    />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-500">Team B (ID)</label>
                                    <input
                                        type="text"
                                        value={match.teamB}
                                        onChange={(e) => {
                                            const newMatches = [...matches];
                                            newMatches[index].teamB = e.target.value;
                                            setMatches(newMatches);
                                        }}
                                        className="rounded-md p-3 border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-500">Score (Team A: Team B)</label>
                                    <input
                                        type="text"
                                        value={`${match.score.teamA}:${match.score.teamB}`}
                                        onChange={(e) => {
                                            const [scoreA, scoreB] = e.target.value.split(':').map(Number);
                                            const newMatches = [...matches];
                                            newMatches[index].score = { teamA: scoreA || 0, teamB: scoreB || 0 };
                                            setMatches(newMatches);
                                        }}
                                        className="rounded-md p-3 border border-gray-300"
                                    />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-gray-500">Scorers</label>
                                    {match.scorers.map((scorer, scorerIndex) => (
                                        <div key={scorerIndex} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Player Name"
                                                value={scorer.player}
                                                onChange={(e) => {
                                                    const newMatches = [...matches];
                                                    newMatches[index].scorers[scorerIndex].player = e.target.value;
                                                    setMatches(newMatches);
                                                }}
                                                className="rounded-md p-3 border border-gray-300 w-2/3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Team ID"
                                                value={scorer.team}
                                                onChange={(e) => {
                                                    const newMatches = [...matches];
                                                    newMatches[index].scorers[scorerIndex].team = e.target.value;
                                                    setMatches(newMatches);
                                                }}
                                                className="rounded-md p-3 border border-gray-300 w-1/3"
                                            />
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
                            <label className="text-gray-500">Match Date</label>
                            <input
                                type="date"
                                value={match.date}
                                onChange={(e) => {
                                    const newMatches = [...matches];
                                    newMatches[index].date = e.target.value;
                                    setMatches(newMatches);
                                }}
                                className="rounded-md p-3 border border-gray-300"
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addMatch}
                        className="mt-4 bg-secondary text-white rounded-md py-2"
                    >
                        + Add More Matches
                    </button>

                    <button type="submit" className="mt-5 bg-primary text-white rounded-md py-2">
                        {loading ? 'Updating League...' : 'Update League'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditLeagueForm;
