describe('StudentController', function(){
  var $scope, studentFactory, authFactory, controller;

  beforeEach(function(){
    module('app');

    inject(function($rootScope, $controller,_studentFactory_, _authFactory_){
      $scope = $rootScope.new();
      studentFactory = _studentFactory_;
      authFactory = _authFactory_;

      controller = $controller('StudentController', {
        $scope: $scope
      });
    });
  });

  it("should have a $scope variable", function(){
    expect($scope).toBeDefined();
  });



})