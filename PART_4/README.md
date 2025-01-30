# Contents: unit-testing, integration-testing

# Use "router" object to handle requests in a modular and organized way

# => Can define specific routes and middleware for different parts of your application

# Using lodash library

# Using express-async-errors to under the hood handle exceptions without catch blocks

# Promise.all waits for all promises resolved before executing other operations

<!-- beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)  // Note: "await" keyword
}) => notes will not be saved to the database right away, instead promiseArray will return a promise representing the whole saving process, then the Promise.all method transforms an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as an argument is resolved. -->
<!--
But Promise.all executes promises it receives in parallel => if we want to execute them in order, use for-of loop
	  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  } -->

# bcrypt library: create a hashed password

# Token authentication jwt library

# Difference between authentication and authorization
# Authentication: 
