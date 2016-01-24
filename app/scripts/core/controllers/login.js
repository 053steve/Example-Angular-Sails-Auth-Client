'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('frontend')
  .controller('LoginCtrl', function($scope, $location, $http, AuthService, $state) {

      if (AuthService.isAuthenticated()) {
        console.log('is authenticated');
        $location.url('/dashboard');
      }

      $scope.showLogin = true;
      $scope.showRegister = false;
      $scope.switchButtonLabel = "Register for account?";

      if($scope.showLogin){
          $scope.switchButtonLabel = "Register for account?";
      }else{
          $scope.switchButtonLabel = "Login";
      }


      $scope.switchForm = function() {


          if($scope.showLogin){
              $scope.showLogin = false;
              $scope.showRegister = true;
              $scope.switchButtonLabel = "Login";
          }else{
              $scope.showLogin = true;
              $scope.showRegister = false;
              $scope.switchButtonLabel = "Register for account?";
          }

      };

      // Scope function to perform actual login request to server
      $scope.submit = function() {
        AuthService
          .login($scope.credentials)
          .then(
            function successCallback() {
              $location.url('/dashboard');
            },
            function errorCallback() {
              $scope.loginError = true;
              _reset();
            }
          );
      };

      $scope.signup = function() {
        AuthService
          .signup($scope.credentials)
          .then(
            function successCallback() {
              $location.url('/dashboard');
            },
            function errorCallback() {
              $scope.loginError = true;
              _reset();
            }
          );
      };



      /**
         * Private helper function to reset credentials and set focus to username input.
         *
         * @private
         */
        function _reset() {

          // Initialize credentials
          $scope.credentials = {
            username: '',
            email: '',
            password: '',

          };



        }

        _reset();
  });
