const axios = require("axios");
const models = require("./models/index");

function buildPlayer(player, id, response) {
  const isHomeTeam = response.data.gameData.teams.home === player.currentTeam;
  const playerStats = isHomeTeam
    ? response.data.liveData.boxscore.teams.home.players[id]?.stats?.skaterStats
    : response.data.liveData.boxscore.teams.away.players[id]?.stats
        ?.skaterStats;

  const playerObj = {
    playerId: player.id,
    playerName: player.fullName,
    teamId: player.currentTeam.id,
    teamName: player.currentTeam.name,
    playerAge: player.currentAge,
    playerNumber: player.primaryNumber,
    playerPosition: player.primaryPosition.name,
    opponnetTeam: isHomeTeam
      ? response.data.gameData.teams.home.name
      : response.data.gameData.teams.away.name,
    assists: playerStats?.assists,
    goals: playerStats?.goals,
    hits: playerStats?.hits,
    penaltyMinutes: playerStats?.penaltyMinutes,
    points: "TODO",
  };

  return playerObj;
}

// TODO: change to a queue
async function getLiveGames() {
  try {
    const todaysGames = await axios.get(
      "https://statsapi.web.nhl.com/api/v1/schedule"
    );

    const liveGames = todaysGames.data.dates[0].games
      .filter((item) => item.status.abstractGameState === "Live")
      .map((item) => {
        return axios
          .get(`https://statsapi.web.nhl.com${item.link}`)
          .then((response) => {
            Object.entries(response.data.gameData.players).forEach((entry) => {
              const [id, player] = entry;
              const playerObj = buildPlayer(player, id, response);
              models.Player.create(playerObj);
            });
          });
      });

    await Promise.all(liveGames);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getLiveGames };
