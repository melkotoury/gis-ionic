var mgisApp = angular.module('mgisApp.controllers', []);




mgisApp.controller('LoginCtrl', function($scope,$state, $stateParams, userService, $ionicPopup) {



  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: 'invalid username or password'
    });
    alertPopup.then(function(res) {
      console.log('you have accepted the alert');
    });
  }




    $scope.onSignInClicked = function(username,password,auth) {


      var inputUsername=username,
        inputPassword=password,
        inputAuth=auth;

      console.log("Input Fields:"+ inputUsername + "- "+inputPassword+ "- "+inputAuth);
      // var user = userService.getUser(inputUsername,inputPassword,inputAuth);
      userService.getUser(inputUsername,inputPassword,inputAuth).then(function(user){
        //user
        var serviceUsername=user.data.username,
          servicePassword=user.data.password,
          serviceAuth=user.data.auth;
        console.log("Service Fields:"+ serviceUsername + "- "+servicePassword+ "- "+serviceAuth);
        console.log("Service ID: "+ user.id);
        console.log(user);
        if (inputUsername == serviceUsername && inputPassword == servicePassword && inputAuth == serviceAuth) {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('id',user.data.id);
          localStorage.setItem('fullname',user.data.fullname);
          localStorage.setItem('auth',user.data.auth);
          localStorage.setItem('api_token',user.data.api_token);
          localStorage.setItem('avatar',user.data.avatar);

          $state.go('tab.dash');
        } else {
          $scope.showAlert();
        }

      });
      // var serviceUsername=user.username,
      //     servicePassword=user.password,
      //     serviceAuth=user.auth;
      // console.log("Service Fields:"+ serviceUsername + "- "+servicePassword+ "- "+serviceAuth);
      // console.log("Service ID: "+ user.id);
      // console.log(user);

      // if (inputUsername == serviceUsername && inputPassword == servicePassword && inputAuth == serviceAuth) {
      //   localStorage.setItem('loggedIn', true);
      //   $state.go('tab.dash');
      // } else {
      //   $scope.showAlert();
      // }
    }


});

// mgisApp.controller('LoginCtrl', function($scope, $state, $ionicPopup){
//     // An alert dialog
//   $scope.showAlert = function() {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Error',
//       template: 'invalid username or password'
//     });
//     alertPopup.then(function(res) {
//       console.log('you have accepted the alert');
//     });
//   }
//
//   $scope.onSignInClicked = function(username, password) {
//     if (username == 'admin' && password == 'admin') {
//       localStorage.setItem('loggedIn', true);
//       $state.go('tab.dash');
//     } else {
//       $scope.showAlert();
//     }
//   }
// });


mgisApp.controller('DashCtrl', function($scope, $rootScope ,userService) {
 var fullname = localStorage.getItem("fullname");
  var avatar = localStorage.getItem("avatar");

  console.log("current user is= "+fullname);
  $scope.fullname=fullname;
  $scope.imgURL=avatar;

});

mgisApp.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

mgisApp.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

mgisApp.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
