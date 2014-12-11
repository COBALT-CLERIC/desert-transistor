describe('appRoutes', function(){
  //tests routes
  var $route;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have /student route, template, and controller', function(){
    expect($route.routes['/student']).to.be.ok();
    expect($route.routes['/student'].controller).to.be('StudentController');
    expect($route.routes['/student'].templateUrl).to.be('App/Student/student.html');
  });

  it('Should have /teacher route, template and controller', function(){
    expect($route.routes['/teacher']).to.be.ok();
    expect($route.routes['/teacher'].controller).to.be('TeacherController');
    expect($route.routes['/teacher'].templateUrl).to.be('App/Teacher/teacher.html');
  });

})