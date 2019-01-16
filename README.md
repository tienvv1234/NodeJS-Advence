#Node internal

- When we run Node and t hen index not just at the command line we are invoking the Nodejs project
- Two of the most important dependencies and these are two dependencies that we are going to focus: V8 project and the libuv project
- The V8 project is an open source javascript engine created by google (pbkdf2)

* the purpose of this project is to be able to execute javascript code outside of the browser and that's what we do when we run our javascript code from the terminal (70% code is C++)
+ so the purpose of the V8 project inside of all this node source code is to essentially act as the intermediary and allow values that are defined inside of javascript to be translated into c## equivalence
* the libuv project is a C++ open source project that gives node access to the operating system underlying file system, it gives us access to networking and it also handles some aspects of concurrency as well (100 code is C++)
because of (100 code is C++) (70% code is C++) so that's one of the purposes of, nodejs gives us a nice interface to use to relate our javascript

- flow chart
+ Javascript code we write --> Node's javascript side(lib folder in node repo) process.binding(this method connects js and c++ functions) --> V8 (Converts values between JS and C++ world) ---> Node's C++ side (src folder in node repo) --> libuv(gives node easy access to underlying OS)

Threads: 
- whenever run programs on our on compouter we start up something called a process,
+ a process is an instance of a computer program that has been executed within a single process we can have multiple things called threats

- eventLoop is used by node to handle asynchronous code
+ whenever start up a node program on our computer node automatically creates on thread and then executes all of our code inside of that one single thread, you can think of the event loop as being like a control structure that decides that our one thread should be doing at any given point in time, this event loop is the absolute core of every program run has exactly one event loop understanding how the event loop works is extremely important because a lot of performance concerns about node boidled down to eventually how the event loop behaves

nodejs is single thread but some of function nodejs run outside of that single thread so simply declaring that node is single threaded is not absolutely true. the event loop uses a single thread but a lot of the code that you and i write does not actually execute inside that thread entirely

- event loop job is to look at the stack and look at the task queue, if the stack is empty it takes the first thing on the task queue and pushes it on to the stack