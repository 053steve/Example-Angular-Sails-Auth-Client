	'use strict';

	angular.module('frontend.core.service')
    .factory('AuthService', [
      '$http', '$state', '$localStorage',
      'BackendConfig',
      function factory(
        $http, $state, $localStorage,
        BackendConfig
      ) {
        return {
          /**
           * Method to authorize current user with given access level in application.
           *
           * @param   {Number}    accessLevel Access level to check
           *
           * @returns {Boolean}
           */

					//  No accessLevel
					authorize: function authorize(accessLevel) {
							if(accessLevel === 'admin'){
									return this.isAuthenticated();
							}else{
									return false;
							}

					},
          // authorize: function authorize(accessLevel) {
          //   if (accessLevel === AccessLevels.user) {
          //     return this.isAuthenticated();
          //   } else if (accessLevel === AccessLevels.admin) {
          //     return this.isAuthenticated() && Boolean($localStorage.credentials.user.admin);
          //   } else {
          //     return accessLevel === AccessLevels.anon;
          //   }
          // },

          /**
           * Method to check if current user is authenticated or not. This will just
           * simply call 'Storage' service 'get' method and returns it results.
           *
           * @returns {Boolean}
           */
          isAuthenticated: function isAuthenticated() {
            return Boolean($localStorage.credentials);
          },

          /**
           * Method make login request to backend server. Successfully response from
           * server contains user data and JWT token as in JSON object. After successful
           * authentication method will store user data and JWT token to local storage
           * where those can be used.
           *
           * @param   {*} credentials
           *
           * @returns {*|Promise}
           */
          login: function login(credentials) {
            return $http
              .post(BackendConfig.url + '/auth/signin', credentials, {withCredentials: true})
              .then(
                function(response) {
									// console.log(JSON.stringify(response));
                  $localStorage.credentials = response.data;
                }
              )
            ;
          },

					signup: function login(credentials) {
            return $http
              .post(BackendConfig.url + '/auth/signup', credentials, {withCredentials: true})
              .then(
                function(response) {
									// console.log(JSON.stringify(response));
                  $localStorage.credentials = response.data;
                }
              )
            ;
          },

          /**
           * The backend doesn't care about actual user logout, just delete the token
           * and you're good to go.
           *
           * Question still: Should we make logout process to backend side?
           */
          logout: function logout() {
            $localStorage.$reset();
            $state.go('login');
          }
        };
      }
    ]);

		angular.module('frontend.core.service')
    .factory('UserService', [
      '$localStorage',
      function factory($localStorage) {
        return {
          user: function user() {
            return $localStorage.credentials ? $localStorage.credentials.user : {};
          }
        };
      }
    ])
  ;
