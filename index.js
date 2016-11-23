var TCPConnected = require('connectedbytcp');

Test = new TCPConnected("192.168.1.61");

// print process.argv
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

if(process.argv.length < 4) {
	console.log("error - too few args: need room name and state: ON/OFF/DIM");
	process.exit(1);
}

var room = process.argv[2];
var stateDesired = process.argv[3].toLowerCase;

if(stateDesired === "dim") {
	// in this case, we need an extra argument
	if(process.argv[4] === undefined) {
		console.log("error - missing brightness level: 0 - 100");
		process.exit(2);
	}
}


// TODO try this code first!!!!
Test.Init(function (error) {
	if(!error) {
		console.log("token is fine");
		if(stateDesired == "on") {
			console.log("trying to turn on " + room);
			Test.TurnOnRoomByName(room, function (error) {
				Test.GWEnd();
			});
		} else {
			console.log("trying to turn off " + room);
			Test.TurnOffRoomByName(room, function (error) {
				Test.GWEnd();
			});
		}
	} else {
		console.log("There was an issue initializing the token");
	}
});

// TODO: brightness

// TODO if above code not working, uncomment this block and try
// Test.Init(function (error) {
// 	if (!error) {
// 		console.log("token is fine");
// 		Test.GetState(function (error, system) {
// 			Test.GetRoomStateByName(room, function (error, state, level) {
// 				console.log("Room " + room + " - State " + state + " at Level " + level);
// 				if (state == 1) {
// 					// lights are on, if stateDesired is ON, nothing to do
// 					// if stateDesired is OFF, turn lights off
// 					if (stateDesired == "on") {
// 						Test.TurnOffRoomByName(room, function (error) {
// 							Test.GWEnd();
// 						});
// 					}
// 				} else {
// 					// lights are off, if stateDesired is OFF, nothing to do
// 					// if stateDesired is ON, turn lights on
// 					if (stateDesired == "on") {
// 						Test.TurnOnRoomByName(room, function (error) {
// 							Test.GWEnd();
// 						});
// 					}
// 				}
// 			});
// 		});
// 	} else {
// 		console.log("There was an issue initializing the token");
// 	}
// });
