myApp.controller('LoginController', ['$http', '$location', function($http, $location) {

  console.log('LoginController loaded');
    var vm = this;

    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('here', vm.user);
      if(vm.user.username == '' || vm.user.password == '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username && response.data.admin === true) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to admin page');
            $location.path('/admin');
          } else if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/user');
          } else {
            console.log('failure: ', response);
            vm.message = "Try again! Your username or password did not match.";
          }
        });//end post
      }
    };


    // vm.registerUser = function() {
    //   if(vm.user.username == '' || vm.user.password == '') {
    //     vm.message = "Choose a username and password!";
    //   } else {
    //     console.log('sending to server...', vm.user);
    //     $http.post('/register', vm.user).then(function(response) {
    //       console.log('success');
    //       $location.path('/home');
    //     },
    //     function(response) {
    //       console.log('error');
    //       vm.message = "Please try again.";
    //     });
    //   }
    // };
}]);
