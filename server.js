// PokeAPI Link
// https://pokeapi.co/

// Documentation
// https://pokeapi.co/docs/v2
const express = require("express");
const app = express();
const axios = require("axios");
let random = 0;
let Pokemons = [];
async function makeRequest() {
  for (let i = 0; i < 3; i++) {
    random = Math.floor(Math.random() * (150 - 1 + 1)) + 1;
    // Configure request
    const config = {
      method: "get", // request method (get, post, ...)
      url: "https://pokeapi.co/api/v2/pokemon/" + random, // API link
    };
    let res = await axios(config);
    //console.log("Response Data");
    //console.log(res.data);
    //console.log("--------------------");
    // console.log("Extracted info from response data:");
    // console.log("--------------------");
    // console.log(`Pokemon Name: ${res.data.name}`);
    // console.log(`Pokemon Order: ${res.data.order}`);
    // console.log(`Pokemon Species URL: ${res.data.species.url}`);
    Pokemons[i] = res.data;
  }
}

// set the view engine to ejs
app.set("view engine", "ejs");
// use res.render to load up an ejs view file
// index page
app.get("/", async function (req, res) {
  await makeRequest(); //value changes on page load
  res.render("pages/index", {
    Pokemons: Pokemons,
  });
});
app.listen(3000);
console.log("Server is listening on port 3000");
console.log("http://localhost:3000");
