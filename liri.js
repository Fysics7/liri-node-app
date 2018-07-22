// require keys.js
require("dotenv").config();
const keys = require("./keys.js");
// require spotify
var Spotify = require("node-spotify-api");
// require twitter
var Twitter = require("twitter");
// require inquirer
var inquirer = require("inquirer");
// require request
var request = require('request');
// require file-system
var fs = require('file-system');

// calls twitter api and returns 20 tweets
var getTweets = function (screenName) {

    // set variable for twitter api keys
    var client = new Twitter(keys.twitter);

    // set parameter variable
    var params = {
        screen_name: screenName,
        count: '20'
    };

    // call twitter and return tweets
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            // loops through response for created_at and text parameters
            tweets.forEach(function (element) {
                console.log("Created On: " + element.created_at + " ==> " + element.text);

                var logResponse = "Created On: " + element.created_at + " ==> " + element.text + '\r\n';

                fs.appendFileSync("./log.txt", logResponse, function (err) {
                    if (err) throw err;
                });
            })

        } else {
            console.log(error);
        }
    });

}

// calls spotify api and returns songs
var getSongInfo = function (mySong) {

    // set variable for spotify api keys
    var client = new Spotify(keys.spotify);

    client.search({
        type: 'track',
        query: mySong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < 1; i++) {

            console.log("*************************************************")
            console.log(`Artist: ${data.tracks.items[i].artists[0].name}`);
            console.log(`Song: ${data.tracks.items[i].name}`);
            console.log(`Preview: ${data.tracks.items[i].preview_url}`);
            console.log(`Album: ${data.tracks.items[i].album.name}`);

            var artist = `Artist: ${data.tracks.items[i].artists[0].name}\r\n`;
            var song = `Song: ${data.tracks.items[i].name}\r\n`;
            var preview = `Preview: ${data.tracks.items[i].preview_url}\r\n`;
            var album = `Album: ${data.tracks.items[i].album.name}\r\n`;

            fs.appendFileSync("./log.txt", artist, function (err) {
                if (err) throw err;
            });
            fs.appendFileSync("./log.txt", song, function (err) {
                if (err) throw err;
            });
            fs.appendFileSync("./log.txt", preview, function (err) {
                if (err) throw err;
            });
            fs.appendFileSync("./log.txt", album, function (err) {
                if (err) throw err;
            });

        }

    });

}

var getMovieInfo = function (myMovie) {

    var apiKey = 'trilogy'
    var reqURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${myMovie}`

    request(reqURL, function (error, response, body) {

        console.log('*******************************************************************');
        console.log('Title:', JSON.parse(body).Title); // Print Movie Title
        console.log('Year Released:', JSON.parse(body).Year); // Print Movie Release Year
        console.log('IMDB Rating:', JSON.parse(body).imdbRating); // Print Movie Imdb Rating
        console.log('Rotten Tomato Rating:', JSON.parse(body).Ratings[1].Value); // Print Movie Rotten Tomatoes Rating
        console.log('Country:', JSON.parse(body).Country); // Print Movie Country
        console.log('Language:', JSON.parse(body).Language); // Print Movie Language
        console.log('Plot:', JSON.parse(body).Plot); // Print Movie Plot
        console.log('Actors:', JSON.parse(body).Actors); // Print Movie Actors

        
        var title = ('Title: ' + JSON.parse(body).Title + '\r\n'); // Print Movie Title
        var release = ('Year Released: ' + JSON.parse(body).Year + '\r\n'); // Print Movie Release Year
        var imdb = ('IMDB Rating: ' + JSON.parse(body).imdbRating + '\r\n'); // Print Movie Imdb Rating
        var rotten = ('Rotten Tomato Rating: ' + JSON.parse(body).Ratings[1].Value + '\r\n'); // Print Movie Rotten Tomatoes Rating
        var country = ('Country: ' + JSON.parse(body).Country + '\r\n'); // Print Movie Country
        var language = ('Language: ' + JSON.parse(body).Language + '\r\n'); // Print Movie Language
        var plot = ('Plot: ' + JSON.parse(body).Plot + '\r\n'); // Print Movie Plot
        var actors = ('Actors: ' + JSON.parse(body).Actors + '\r\n'); // Print Movie Actors

        fs.appendFileSync("./log.txt", seperator, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", title, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", release, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", imdb, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", rotten, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", country, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", language, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", plot, function (err) {
            if (err) throw err;
        });
        fs.appendFileSync("./log.txt", actors, function (err) {
            if (err) throw err;
        });
    });



}

// error handling
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// inquirer menu
inquirer
    .prompt([
        // prompt user with a list
        {
            type: "list",
            message: "What would you like to do today?",
            choices: ["Find Tweets", "Find Information About A Song", "Find Information About A Movie", "Do-What-It-Says"],
            name: "command"
        },

    ])

    .then(function (inquirerResponse) {
        // Action to be executed if "Find My Tweets" is chosen
        if (inquirerResponse.command === "Find Tweets") {

            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "Whose tweets would you like to find?",
                        name: "tweets",
                        default: "elonmusk"
                    },
                ])
                .then(function (inquirerResponse) {

                    screenName = inquirerResponse.tweets
                    seperator = "********************************************************************************************************************************************************************************************" + "\r\n";

                    var fileName = "./log.txt";

                    fs.appendFileSync(fileName, seperator, function (err) {
                        if (err) throw err;
                    });

                    fs.appendFileSync(fileName, "UserInput: " + screenName + "\r\n", function (err) {
                        if (err) throw err;
                    });

                    fs.appendFileSync(fileName, seperator, function (err) {
                        if (err) throw err;
                    });


                    getTweets(screenName);

                })

        }
        // Action to be executed if "Find Information About A Song" is chosen
        if (inquirerResponse.command === "Find Information About A Song") {

            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "What song would you like to find info on?",
                        name: "song",
                        default: "Thriller"
                    },
                ])
                .then(function (inquirerResponse) {

                    mySong = inquirerResponse.song


                    seperator = "********************************************************************************************************************************************************************************************" + "\r\n";

                    var fileName = "./log.txt";

                    fs.appendFileSync(fileName, seperator, function (err) {
                        if (err) throw err;
                    });

                    fs.appendFileSync(fileName, "UserInput: " + mySong + "\r\n", function (err) {
                        if (err) throw err;
                    });

                    fs.appendFileSync(fileName, seperator, function (err) {
                        if (err) throw err;
                    });


                    getSongInfo(mySong);

                })

        }
        // Action to be executed if "Find Information About A Movie" is chosen
        if (inquirerResponse.command === "Find Information About A Movie") {

            inquirer
                .prompt([

                    {
                        type: "input",
                        message: "What movie would you like to find info on?",
                        name: "movie",
                        default: "Tron"
                    },
                ])
                .then(function (inquirerResponse) {

                    myMovie = inquirerResponse.movie;

                    seperator = "********************************************************************************************************************************************************************************************" + "\r\n";

                    var fileName = "./log.txt";

                    fs.appendFileSync(fileName, seperator, function (err) {
                        if (err) throw err;
                    });

                    fs.appendFileSync(fileName, "UserInput: " + myMovie + "\r\n", function (err) {
                        if (err) throw err;
                    });

                    getMovieInfo(myMovie);

                })
        }
        // Action to be executed if "Do-What-It-Says" is chosen
        if (inquirerResponse.command === "Do-What-It-Says") {

            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // We will then print the contents of data
                console.log(data);

                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");

                // We will then re-display the content as an array for later use.
                console.log(dataArr);

                if (dataArr[0] === "Find Tweets") {

                    var screenName = dataArr[1];
                    getTweets(screenName);

                } else if (dataArr[0] === "Find Song") {

                    var mySong = dataArr[1];
                    getSongInfo(mySong);

                } else if (dataArr[0] === "Find Movie") {

                    var myMovie = dataArr[1];
                    getMovieInfo(myMovie);

                }

                seperator = "********************************************************************************************************************************************************************************************" + "\r\n";

                var fileName = "./log.txt";

                fs.appendFileSync(fileName, seperator, function (err) {
                    if (err) throw err;
                });

                fs.appendFileSync(fileName, "UserInput: " + dataArr + "\r\n", function (err) {
                    if (err) throw err;
                });

            });
        }

    });