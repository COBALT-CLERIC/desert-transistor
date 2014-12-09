'use strict';

angular
  .module('StudentController', [])
  .controller('StudentController', StudentController);

StudentController.$inject = ['$scope', 'studentFactory', 'authFactory'];

function StudentController ($scope, studentFactory, authFactory){

	studentFactory.connect();

  //references the existing object in the authFactory so that it can grab the value entered
  //by the student in the login page
  $scope.student = authFactory;

  $scope.confusedStudent = function() {
		studentFactory.confusedStudent ($scope.student.studentName);
  };

}

