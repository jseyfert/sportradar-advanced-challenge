import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(even) {
    console.log(even.target.value);
    setSearchText(even.target.value);
  }

  useEffect(() => {
    axios
      .get(`/players?search=${searchText}`)
      .then(function (response) {
        setPlayers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchText]);

  return (
    <div>
      <h1>NHL players</h1>

      <label for="fname">Server side search</label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={searchText}
        onChange={handleSearchChange}
      />

      <br />
      <br />

      <table id="customers">
        <tr>
          <th>playerId</th>
          <th>playerName</th>
          <th>teamId</th>
          <th>teamName</th>
          <th>playerAge</th>
          <th>playerNumber</th>
          <th>playerPosition</th>
          <th>assists</th>
          <th>goals</th>
          <th>hits</th>
          <th>points</th>
          <th>penaltyMinutes</th>
          <th>opponnetTeam</th>
        </tr>
        {players.map((p) => {
          return (
            <tr>
              <td>{p.playerId}</td>
              <td>{p.playerName}</td>
              <td>{p.teamId}</td>
              <td>{p.teamName}</td>
              <td>{p.playerAge}</td>
              <td>{p.playerNumber}</td>
              <td>{p.playerPosition}</td>
              <td>{p.assists}</td>
              <td>{p.goals}</td>
              <td>{p.hits}</td>
              <td>{p.points}</td>
              <td>{p.penaltyMinutes}</td>
              <td>{p.opponnetTeam}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
