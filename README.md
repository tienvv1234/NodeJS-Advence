#Node internal

- When we run Node and t hen index not just at the command line we are invoking the Nodejs project
- Two of the most important dependencies and these are two dependencies that we are going to focus: V8 project and the libuv project
- The V8 project is an open source javascript engine created by google (pbkdf2)

* the purpose of this project is to be able to execute javascript code outside of the browser and that's what we do when we run our javascript code from the terminal (70% code is C++)

- so the purpose of the V8 project inside of all this node source code is to essentially act as the intermediary and allow values that are defined inside of javascript to be translated into c## equivalence

* the libuv project is a C++ open source project that gives node access to the operating system underlying file system, it gives us access to networking and it also handles some aspects of concurrency as well (100 code is C++)
  because of (100 code is C++) (70% code is C++) so that's one of the purposes of, nodejs gives us a nice interface to use to relate our javascript

- flow chart

* Javascript code we write --> Node's javascript side(lib folder in node repo) process.binding(this method connects js and c++ functions) --> V8 (Converts values between JS and C++ world) ---> Node's C++ side (src folder in node repo) --> libuv(gives node easy access to underlying OS)

Threads:

- whenever run programs on our on compouter we start up something called a process,

* a process is an instance of a computer program that has been executed within a single process we can have multiple things called threats

- eventLoop is used by node to handle asynchronous code

* whenever start up a node program on our computer node automatically creates on thread and then executes all of our code inside of that one single thread, you can think of the event loop as being like a control structure that decides that our one thread should be doing at any given point in time, this event loop is the absolute core of every program run has exactly one event loop understanding how the event loop works is extremely important because a lot of performance concerns about node boidled down to eventually how the event loop behaves

nodejs is single thread but some of function nodejs run outside of that single thread so simply declaring that node is single threaded is not absolutely true. the event loop uses a single thread but a lot of the code that you and i write does not actually execute inside that thread entirely

- event loop job is to look at the stack and look at the task queue, if the stack is empty it takes the first thing on the task queue and pushes it on to the stack

#Review

Node index.js --> process and execute code in index.js file --> do we still have work to do? look at timers, OS tasks, threadpool

- no exit the program
- yes --> run setTimeout's, setInterval's --> run callbacks for any os tasks or threadpool tasks that are done. this is 99% of our code. --> pause and wait for stuff to happen, run any 'setImmediate' functions --> handle close envets ---> check agin do we still have work to do? again and again

#Performance

- how we can set up node to run inside of cluster mode

* cluster mode is used to start up multiple copies of node that are all running your server inside them, a similar fashion as making node kind of multi threaded

- these worker threads are going to use the thread pool that is set up by libuv whenever we start up our node application
- starting up node in cluster mode to handle a lot of heavy duty performance relevant calculations or whatever might be that you are doing the recommended approach here for improving performance of your application
- using worker threads is something that is way more experimental and it's something that i am showing you just for the sake of your knowledge

#Cluster

- we are going to be starting up multiple node processes
  one kind of like overarching process called the cluster manager, the cluster manager itself doesn't actually execute any application, it's responsible for monitoring the health of each of these individual instances
  diagram: run node index.js --> index.js --> node instance

* run a command at the terminal like node index.js takes the contents of that file, it executes it, then starts up the event loop, when we start to use clustering this entire flow right here changes just a little bit.
* when we start to use clustering we are still going to run something like node index.js at command line node is still going to boot up our application by reading the contents of that file and launching a node instance
* the first instance of node that gets launched when we run that command is what we refer to as the cluster
* when we use the cluster it's automatically created for us the cluster manager is resposible for starting up worker instances
* there's one particular function on that cluster module called fork and whenever we call that fork function
* so when we call fork node internally goes back to our index.js file and it executes it a second time but it executes it that second time in a slightly different mode
* test your server ab -c 50 -n 500 localhost:3000/fast -c 50 (chạy đồng thời 50 request)
  -n 500(chạy tổng cộng 500 request)

so to start up our application using pm to in cluster we are going to write out pm to start index
pm2 start index.js -i 0
-i 0 --> the number 0 here will make the pm 2 is going to set up a number of instances equal to the number of logical your cores on your computer
kill pm2 --> pm2 delete index
pm2 list, pm2 show index
so in general you can use this thing just in a production environment and it's going to take care of managing the health of every single one of your instances, so if one of these children end up crashing no problem pm 2 is going to automatically restart it for you

`Improving node performance`

- Recommended --> use Node in 'cluster mode'
- experimental -->use worker threads

npm install --save webworker-threads

#Caching

- 2 ways to solve this performance concern (index property in database)

* add index for that given field(not recommend)

* query caching layer

- this only use for reading data
  install redis, ---> npm install redis, create redisURL = 'redis://127.0,0,1:6379'

  client.get('hi', console.log) --> this will print all console.log

overarching : bao chùm
-adjective: the overarching mangroves
-verb: an old dirt road, overarched by forest
spread out: trải ra
refer: tham khảo
fork: cái nĩa

CI --> countinuous integration
CI Providers: Travis CI, Circle CI, Codeship, AWS Code build

dist: trusty --> this option to specify os we want to have, this os called trusty(specific version of linux)
