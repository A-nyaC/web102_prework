/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';


// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container

const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        //console.log(typeof games);
        //console.log(typeof games[0]);
        for(const game in games){

           // console.log(`Test  ${games[game].name}`);
          //  console.log(`Test  ${games[game]['description']}`);
          //  console.log(`Test  ${games[game].pledged}`);
          //  console.log(`Test  ${games[game].goal}`);
           // console.log(`Test  ${games[game].backers}`);
          //  console.log(`Test  "${games[game].img}"`);

            
        
        // create a new div element, which will become the game card

        const gameCard = document.createElement("div");
        // add the class game-card to the list

        gameCard.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML=
        `
        <img class="game-img" src="${games[game].img}"/>
        <h2>${games[game].name}</h2>
        ${games[game]['description']}
        <h3>Pledged: $${games[game].pledged.toLocaleString("en-US")}</h3>
        <h3>Goal: $${games[game].goal.toLocaleString("en-US")}</h3>
        <h3>Backers: ${games[game].backers.toLocaleString("en-US")}</h3>
        
        `
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (total,game) => {
    console.log(game.backers);
    return total + game.backers;}
    ,0);

console.log(totalContributions.toLocaleString("en-US"));

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = 
`
<h2>
${totalContributions.toLocaleString("en-US")}
</h2>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (total,game)=> {
    return total + game.pledged;
},0);

// set inner HTML using template literal
raisedCard.innerHTML= 
`
<h2>
${totalRaised.toLocaleString("en-US")}
</h2>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((total,game)=>{
    return total+1;
}
    ,0);

gamesCard.innerHTML =
`
<h2>
${totalGames}
</h2>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter( (game)=>{
        if (game.pledged <game.goal){
            console.log(`Underfunded Games: ${game.name}`);
        
        return game.pledged <game.goal;
        }
        
    });


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game)=>{
        if (game.pledged >=game.goal){
            console.log(`Funded Games: ${game.name}`);
            return game.pledged>=game.goal;
        }
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const num_of_underfunded = GAMES_JSON.reduce((count,game) => {
    if(game.pledged<game.goal){
        count++;
    }
    return count;
},0);




console.log("UNDERFUNDED ",num_of_underfunded);

// create a string that explains the number of unfunded games using the ternary operator
GAMES_JSON.map((game)=>{ 
    const fundedExplained= `funded => `;
    const underfundedExplained = `underfunded => `;

// create a new DOM element containing the template string and append it to the description container
const string= `${game.name} is ${game.pledged<game.goal ? underfundedExplained : fundedExplained} $${game.pledged.toLocaleString("en-US")}/$${game.goal.toLocaleString("en-US")}`;

console.log(string);

const paragraph= document.createElement("p");
paragraph.innerHTML = string;
descriptionContainer.append(paragraph);

});
const paragraph= document.createElement("h2");
paragraph.innerHTML = `We have ${num_of_underfunded} games that still need funding!`;
descriptionContainer.append(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [game1,game2] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const topPledgedGame = document.createElement("h1");
topPledgedGame.innerHTML =`${game1.name}`;
firstGameContainer.appendChild(topPledgedGame);

// do the same for the runner up item

const runnerUpPledgedGame = document.createElement("h1");
runnerUpPledgedGame.innerHTML = `${game2.name}`;
secondGameContainer.appendChild(runnerUpPledgedGame);