// PokeAPI Link
// https://pokeapi.co/

// Documentation
// https://pokeapi.co/docs/v2
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const axios = require("axios");
let random = 0;
let Pokemons = [];
numberlimitwarning = false;
async function makeRequest(number) {
  for (let i = 0; i < number; i++) {
    random = Math.floor(Math.random() * (150 - 1 + 1)) + 1;
    const config = {
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/" + random,
    };
    let res = await axios(config);
    Pokemons[i] = res.data;
  }
}
app.set("view engine", "ejs");
app.get("/", async function (req, res) {
  await makeRequest(3); //value changes on page load
  res.render("pages/index", {
    Pokemons: Pokemons,
  });
});
app.post("/", async (req, res) => {
  Pokemons = [];
  let numberofpokemons = 0;
  if (req.body.numberofpokemons < 10) {
    numberlimitwarning = false;
    numberofpokemons = req.body.numberofpokemons;
  } else {
    numberlimitwarning = true;
    numberofpokemons = 3;
  }
  console.log("Number: " + numberofpokemons);
  await makeRequest(numberofpokemons);
  res.render("pages/index", {
    Pokemons: Pokemons,
    numberlimitwarning: numberlimitwarning,
  });
});
app.listen(3000);
console.log("Server is listening on port 3000");
console.log("http://localhost:3000");
