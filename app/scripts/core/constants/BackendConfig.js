'use strict';

  // for development
  // var apiUrl = 'http://localhost:1337';

  // for production
  // var apiUrl = 'http://128.199.205.77:1337';
  var apiUrl = '@@apiUrl';

  angular.module('frontend')
    .constant('BackendConfig', {
      url: apiUrl,
      uploadUrl: apiUrl + '/portfolio/create'

    })
  ;
