// this is where the main server will run from

//this will get express started
const express = require('express');
const app = express();
//end of start of express


//creating a route that the front-end can request data from
const { animals } = require('./data/animals');








//1. api/animal route with get method - which requires two arguments (request, response)
//if the user uses that api/animals in url then they will be sent the response "Hello!" 
//send() is a way to send short messages
//changing send() to json() so the client knows they're receiving JSON aka more that a short message
//in order to see this you need to 'npm start' to end do control+c

// app.get('/api/animals', (req, res) => {
//     res.send('Hello!');
// });

//end of send() api/animals route

//2. this is the json() api/animals route
//this will list all the animals in json

// app.get('/api/animals', (req, res) => {
//     res.json(animals);
// });

//end of json() api/animals route

//4. creating a function filterByQuery()
//this will only show the json with the specific name called in URL
//ex. if http://localhost:3001/api/animals?name=Erica it will only show Erica json
//would be the same if either name, species, or diet

// function filterByQuery(query, animalsArray) {
//     let filteredResults = animalsArray;
//     if (query.diet) {
//         filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//     }
//     if (query.species) {
//         filteredResults = filteredResults.filter(animal => animal.species === query.species);
//     }
//     if (query.name) {
//         filteredResults = filteredResults.filter(animal => animal.name === query.name);
//     }
//     return filteredResults;
// }

//end of function filterByQuery() for diet, species, and name

//this is the function that handles the one above and specifics like personality traits and makes it into a string

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}

//ex. http://localhost:3001/api/animals?personalityTraits=hungry would list all animals with the personalityTrait that is labeled as 'hungry'
//ex. http://localhost:3001/api/animals?personalityTraits=hungry&personalityTraits=zany 
    //This added both traits which are 'hungry' and 'zany'
//end of the function that handles it all








//4-callback. filterByQuery() app.get() callback
//this is the callback that will only list what was called in URL

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//



//3. accessing the query property on req object
//this will show the name value in the terminal 

// app.get('/api/animals', (req, res) => {
//     let results = animals;
//     console.log(req.query)
//     res.json(results);
// });

//end of accessing the query property on req object


//listen method
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
  //end of listen method