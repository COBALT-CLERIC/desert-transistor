describe('TeacherController', function () {
  var $scope, $rootScope, createController, teacherFactory, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    teacherFactory = $injector.get('teacherFactory');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('TeacherController', {
        $scope: $scope,
        authFactory: authFactory,
        teacherFactory: teacherFactory

      });
    };
  }));

  it('should have a confusedStudent method on the $scope', function () {
    createController();
    expect($scope.confusedStudent).to.be.a('function');
  });
  it('should have a getLinks method on the $scope', function () {
    createController();
    expect($scope.getLinks).to.be.a('function');
  });
});