var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        //set the variable currentUser to the information submitted by the user.
        var currentFriend = req.body;
        //declare an empty array for the best friend match.
        var bestFriend = [];

        //function to find best friend.
        function getBestFriend() {
            //placeholder for the difference in score.
            var currentFriendScorePlaceHolder = 1000;

            //loop through friends array.
            for (var i = 0; i < friends.length; i++) {
                //placeholder for the individual score difference and the total difference.
                var difference = 0;
                var totalDifference = 0;

                //here we will loop through the two arrays for the current user, and friends[i].
                for (var j = 0; j < friends[i].scores.length; j++) {
                    //obtain the absolute difference bewteen the matching questions.
                    difference = Math.abs(parseInt(currentFriend.scores[j]) - parseInt(friends[i].scores[j]));
                    console.log("Difference = " + difference);
                    //add that to the total difference.
                    totalDifference += difference;
                    console.log("Total difference = " + totalDifference);
                }
                //if the new total difference is less then the current, if becomes the new best friend.
                if (totalDifference < currentFriendScorePlaceHolder) {
                    currentFriendScorePlaceHolder = totalDifference;
                    bestFriend = friends[i];
                    console.log("BestFriend = " + bestFriend);
                }
            }
        }
        //call the function
        getBestFriend();
        console.log(currentFriend);
        //push the currentfriend to the friends array
        friends.push(currentFriend);
        console.log(bestFriend);
        //send the best frined info to the modal in survey.html
        res.send(bestFriend);
    });
};