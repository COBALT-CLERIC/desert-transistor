describe('StudentController', function () {
  var $scope, $rootScope, createController, studentFactory, authFactory, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    authFactory = $injector.get('authFactory');
    studentFactory = $injector.get('studentFactory');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('StudentController', {
        $scope: $scope,
        authFactory: authFactory,
        studentFactory: studentFactory

      });
    };
  }));

  it('should have a authFactory connection', function() {
    createController();
    expect($scope.student).to.be.equal('authFactory');
  });

  it('should have a confusedStudent method on the $scope', function () {
    createController();
    expect($scope.confusedStudent).to.be.a('function');
  });
});