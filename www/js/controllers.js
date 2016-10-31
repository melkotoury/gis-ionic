var mgisApp = angular.module('mgisApp.controllers', []);

mgisApp.controller('MessageCtrl',  function($scope,Chats,userService){
  var auth = localStorage.getItem("auth");
  var id = localStorage.getItem("id");
  var username = localStorage.getItem("username");
  var auth = localStorage.getItem("auth");
  var password = localStorage.getItem("password");


  // var api_token = localStorage.getItem("api_token");
  userService.getUser(username,password,auth).then(function(user){
    var api_token = user.data.api_token;
    console.log("token in messages");
    console.log(api_token);
    Chats.getChats(auth,id,api_token).then(function(chats){
    $scope.chats = chats.data.messages;
    console.log("hamborgar");
            console.log(chats.data.messages[0].id);
  });
  });

});

mgisApp.controller('ChatDetailCtrl', function($scope, $stateParams,userService, Chats) {
  //$scope.chatDetails =$stateParams.chatId;
  console.log("StateParams: ");
  var chatID = $stateParams.chatId;
  var auth = localStorage.getItem("auth");
  var id = localStorage.getItem("id");
  var username = localStorage.getItem("username");
  var auth = localStorage.getItem("auth");
  var password = localStorage.getItem("password");


  // var api_token = localStorage.getItem("api_token");
  userService.getUser(username,password,auth).then(function(user){
    var api_token = user.data.api_token;
    console.log("russia");
    console.log(api_token);
    Chats.getChats(auth,id,api_token).then(function(chats){
      var messages = chats.data.messages;
      console.log("inside getChats: ");
      console.log(chats.data.messages);
      console.log("Messages length");
      console.log(chats.data.messages.size);
  for (var i = 0; i <= messages.length; i++) {
    console.log(i);
    if (chats.data.messages[i].id==chatID) {
      // statement
      $scope.chatDetails = chats.data.messages[i];
      console.log("from inside messageDetails: ");
      console.log(chats.data.messages[i].id);
    } else {
      // statement
    }
  }
});
  console.log(chatID);
})

});


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
        console.log("user object");
        console.log(user);
        if (inputUsername == serviceUsername && inputPassword == servicePassword && inputAuth == serviceAuth) {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('id',user.data.id);
          localStorage.setItem('username',user.data.username);
          localStorage.setItem('fullname',user.data.fullname);
          localStorage.setItem('auth',user.data.auth);
          localStorage.setItem('password',user.data.password);
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

// mgisApp.controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// });



mgisApp.controller('AccountCtrl', function($scope,$state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function (){
    localStorage.removeItem('api_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('avatar');
    localStorage.removeItem('fullname');
    localStorage.removeItem('id');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('password');
    localStorage.removeItem('username');
  $state.go('login');
  };
});
