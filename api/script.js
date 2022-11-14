const axios = require("axios");
const models = require("./models/index");

function buildPlayer(player, id, response) {
  const isHomeTeam = response.data.gameData.teams.home === player.currentTeam;
  const statsData = isHomeTeam
    ? response.data.liveData.boxscore.teams.home.players
    : response.data.liveData.boxscore.teams.away.players;

  const stats = statsData[id]?.stats?.skaterStats;
  const playerStats = {
    assists: stats?.assists,
    goals: stats?.goals,
    hits: stats?.hits,
    penaltyMinutes: stats?.penaltyMinutes,
    points: "TODO",
  };

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
    ...playerStats,
  };

  return playerObj;
}

function getLiveGames() {
  return axios
    .get("https://statsapi.web.nhl.com/api/v1/schedule")
    .then((response) => {
      const liveGames = response.data.dates[0].games
        .map((item) => item)
        // .filter((item) => item.status.abstractGameState === "Live")
        .map((item) => item.link);
      return liveGames;
    })
    .then((items) => {
      return (
        axios
          .get(`https://statsapi.web.nhl.com${items[0]}`)
          // .get("https://statsapi.web.nhl.com/api/v1/game/2022020210/feed/live")
          .then((response) => {
            Object.entries(response.data.gameData.players).forEach((entry) => {
              const [id, player] = entry;
              const playerObj = buildPlayer(player, id, response);
              models.Player.create(playerObj);
            });
          })
          .catch((error) => console.log(error))
      );
    })
    .catch((error) => console.log(error));
}

getLiveGames();
// setInterval(getLiveGames, 1000);
