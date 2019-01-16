// node myFile.js //run node in here we are doing right here the event loop does not actually immediately get executed instead at the very start like 
// when we first invoke node and ffed in a file node it take the contents of this file right here the contents of my files and executes all the code inside of it

// new timers, tasks, operations are recorded from myFile Running
myFile.runContents();
//After the contents of that file are executed we then immediately enter the nodejs event loop
//entire body executes in one 'tick'

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];
function shouldCountinue(){
  // in here nodejs does three separate checks, three checks to decide whether or not the event loop should countinue for another iteration
  // the first check is to look to see if there are still any function that have been registered with set timeout set interval or set immediate and still need to be executed
  // check one : any peding setTimeout, setInterval, setImmediate? so if there is any functions that still have to be executed through setTimeout... then our program does not exit
  // it continues running for another tick
  // Check two: any pending OS tasks? (Like server listing to port)
  // check three: any pending long running operations? (Like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length

}

while(shouldCountinue()){
   // when the condition return false the while loop is no longer going to exeute that same idea applies to the event loop as well
   // so every single time that the event loop is about to execute node first does a quick check to decide whether or not it should allow the loop to preceed for another iteration
   // if no decides that the loop should not be entered or it should not be executed again than the body of or has the entire event loop gets skipped
   
   //body
   //1) Node looks at pendingTimers and sees if any functions are ready to be called, setTimerout, setInterval
   
   //2) node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

   //3) node actually pauses execution temporarily, Pause execution. continue whenever some number of events occur
   // - a new pendingOSTasks is done
   // - new pendingOperation is done
   // - a timer is about to complete

   //4) Look at pendingTimers. Call any setImmediate

   //5) Handle any 'close' events --> this do some clean up code
}

// exit back to terminal
