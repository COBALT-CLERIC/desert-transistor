describe('AuthController', function () {
  var $scope, $rootScope, $window, authFactory;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('AuthController'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    authFactory = $injector.get('authFactory');
    $window = $injector.get('$window');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        authFactory: authFactory
      });
    };

    createController();
  }));

  it('should have a student method', function() {
    expect($scope.student).to.be.a('function');
  });

});