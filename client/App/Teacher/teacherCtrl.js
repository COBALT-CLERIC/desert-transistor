'use strict';

angular
  .module('TeacherController', [])
  .controller('TeacherController', TeacherController);

TeacherController.$inject = ['$scope', 'teacherFactory'];

function TeacherController ($scope, teacherFactory){
	$scope.confusedStudents = teacherFactory.confusedStudents;
}
