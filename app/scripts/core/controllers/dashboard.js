'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('frontend')
  .controller('DashboardCtrl', function($scope, $state, AuthService) {

    $scope.$state = $state;
    $scope.logout = function() {
      AuthService.logout();
    };

  });
