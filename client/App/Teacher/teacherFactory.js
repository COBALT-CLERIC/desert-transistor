'use strict';

angular
  .module('teacherFactory', [])
  .factory('teacherFactory', teacherFactory);

function teacherFactory (){

	var socket = io();

	var confusedStudents = [];

	//listens for any updates and will call a function in the teacher.js
	//will also console.log the name from the student object that was submitted
	socket.on('teacher:update', function(data){
	    confusedStudents.push(data);
	    // console.log('isThresholdReached', isThresholdReached)
	    isThresholdReached()
	    calculateConfusion(confusedStudents);
	    popSquare(data);
	    console.log(data.studentID);
	    
	});
	console.log(confusedStudents);

	return {
		confusedStudents: confusedStudents
	};

}
