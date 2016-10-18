var mgisApp = angular.module('mgisApp.services', []);

mgisApp.factory('userService', function($http) {
  var users = {};

  return {
    getUser: function(username,password,auth){

      var servicebase = "http://www.al-almanya.com/alalmanya-api/login-route-api?";
      return $http.get(servicebase + "username="+username+"&password=" + password + "&auth="+auth).then(function(response){
        //http://www.al-almanya.com/alalmanya-api/login-route-api?username=301&password=123456&auth=student
        users = response;
        return users;
      });
    },
    getSingleUser: function(uid){

      return users[uid];
    }
  }

});

mgisApp.factory('Chats', function($http) {
  var chats = {};

  return {
    getChats: function(auth,id,api_token){
      var servicebase = "http://al-almanya.com/alalmanya-api/notifications-route-api?";
      return $http.get(servicebase + "auth="+auth+"&id=" + id + "&api_token="+api_token).then(function(response){
        // http://al-almanya.com/alalmanya-api/notifications-route-api?auth=student&id=301&api_token=sEy4nqOUxOI6FGD7ekbUElDvR0XN6AmekL2CcGxl
       chats = response;
       return chats;
      });
    },
    
  }
});

// mgisApp.factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
