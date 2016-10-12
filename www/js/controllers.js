var mgisApp = angular.module('mgisApp.controllers', []);


mgisApp.controller('LoginCtrl', function($scope, $stateParams, userService, $ionicPopup) {
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
  userService.getUsers().then(function(users){
    //users is an array of user objects
    $scope.onSignInClicked = function(username, password) {
      if (username == users.email && password == users.password && users.status === 1) {
        localStorage.setItem('loggedIn', true);
        $state.go('tab.dash');
      } else {
        $scope.showAlert();
      }
    }

  });
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


mgisApp.controller('DashCtrl', function($scope ,userService) {
  userService.getUsers().then(function(users){
    $scope.fullname = users.fullname;
    $scope.imgURL = users.avatar;
  });
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
