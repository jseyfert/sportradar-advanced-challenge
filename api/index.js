const { Op } = require("sequelize");
const models = require("./models/index");
const script = require("./script");

const express = require("express");
const app = express();
const port = 4000;

app.get("/players", function (req, res) {
  const search = req.query.search ? `%${req.query.search}%` : "%%";
  models.Player.findAll({
    where: {
      [Op.or]: [
        {
          playerId: {
            [Op.like]: search,
          },
        },
        {
          playerName: {
            [Op.like]: search,
          },
        },
        {
          teamId: {
            [Op.like]: search,
          },
        },
        {
          teamName: {
            [Op.like]: search,
          },
        },
      ],
    },
  }).then((players) => res.json(players));
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
