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
var stateDesired = process.argv[3];

if(stateDesired === "dim") {
	// in this case, we need an extra argument
	if(process.argv[4] === undefined) {
		console.log("error - missing brightness level: 0 - 100");
		process.exit(2);
	}
}

Test.Init(function(error){
	if(!error){
		console.log("all is well with the setup");
	}else{
		console.log("There was an issue initializing the token");
	}
});

if(stateDesired == "on"){
	console.log("trying to turn on " + room);
	Test.TurnOnRoomByName(room, function(error){
		Test.GWEnd();
	});
}else{
	console.log("trying to turn off " + room);
	Test.TurnOffRoomByName(room, function(error){
		Test.GWEnd();
	});
}

// TODO: brightness


// Test.Init(function(error){
// 	if(!error){
// 		Test.GetState(function(error,system){
// 			// room = "Hallway";
// 			Test.GetRoomStateByName(room, function(error,state,level){
// 				console.log("State: " + state + " at Level: " + level);
// 				if(state == 1){
// 					Test.TurnOffRoomByName(room, function(error){
// 						Test.GWEnd();
// 					});
// 				}else{
// 					Test.TurnOnRoomByName(room, function(error){
// 						Test.GWEnd();
// 					});
// 				}
// 			});
// 		});
// 	}else{
// 		console.log("There was an issue initializing the token");
// 	}
// });
