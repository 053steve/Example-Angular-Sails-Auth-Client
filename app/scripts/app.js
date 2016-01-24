'use strict';

/**
 * @ngdoc overview
 * @name frontend
 * @description
 * # frontend
 *
 * Main module of the application.
 */
 angular
 .module('frontend', [
    'frontend.core',
    ])
 .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Add interceptors for $httpProvider and $sailsSocketProvider
    $httpProvider.interceptors.push('AuthInterceptor');
    // $httpProvider.interceptors.push('ErrorInterceptor');


    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');


    $stateProvider
    .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
    })
    .state('login', {
      url: '/login',
      parent: 'base',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
  })
    .state('dashboard', {
      url: '/dashboard',
      parent: 'base',
      data: {
              access: 'admin'
          },
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
  })
    .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/overview.html'
    })
    .state('reports', {
        url: '/reports',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/reports.html'
    });

});

  /**
   * Frontend application run hook configuration. This will attach auth status
   * check whenever application changes URL states.
   */
  angular.module('frontend')
    .run([
      '$rootScope', '$state', '$injector',
      'AuthService',
      function run(
        $rootScope, $state, $injector,
        AuthService
      ) {
        // Set usage of Bootstrap 3 CSS with angular-xeditable

        /**
         * Route state change start event, this is needed for following:
         *  1) Check if user is authenticated to access page, and if not redirect user back to home page
         */
        $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
          $rootScope.title = toState.name;

          if (!AuthService.authorize(toState.data.access)) {
            event.preventDefault();
            $state.go('login');
          }


          // $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
          //
          //     $rootScope.title = current.$$route.title;
          // });

        });



      }
    ]);
