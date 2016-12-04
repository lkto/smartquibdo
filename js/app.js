// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services',
  'ngCordova',
  'ngAlertify'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    /*WELCOME*/
    .state('welcome', {
      url: '/welcome',
      abstract: true,
      template: '<ion-nav-bar class="bar-dark"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view></ion-nav-view>'
    })

    .state('welcome.greeting', {
      url: '/greeting',
      templateUrl: 'templates/welcome/greeting.html',
      controller: 'SignupCtrl'
    })

    .state('welcome.signup', {
      url: '/signup',
      templateUrl: 'templates/welcome/signup.html',
      controller: 'SignupCtrl'
    })

    .state('welcome.login', {
      url: '/login',
      templateUrl: 'templates/welcome/login.html',
      controller: 'SignupCtrl'
    })

    /*HOME*/
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'templates/home/tabs.html'
    })

    .state('home.feeds', {
      url: '/feeds',
      views: {
        'feeds': {
          templateUrl: 'templates/home/feeds.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('home.comment', {
      url: '/comment',
      views: {
        'feeds': {
          templateUrl: 'templates/home/comment.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('home.search', {
      url: '/search',
      views: {
        'search': {
          templateUrl: 'templates/home/search.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('home.channel', {
      url: '/channel',
      views: {
        'search': {
          templateUrl: 'templates/home/channel.html'
        }
      }
    })

    .state('home.create', {
      url: '/create',
      views: {
        'create': {
          templateUrl: 'templates/home/create.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('home.activity', {
      url: '/activity',
      views: {
        'activity': {
          templateUrl: 'templates/home/activity.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('home.me', {
      url: '/me',
      views: {
        'me': {
          templateUrl: 'templates/home/me.html',
          controller: 'DemoCtrl'
        }
      }
    })
    
    .state('home.settings', {
      url: '/settings',
      views: {
        'me': {
          templateUrl: 'templates/home/settings.html'
        }
      }
    })

    /*Menu*/
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu/inicio.html'
    })

    .state('menu.noticias', {
      url: '/noticias',
      cache: false,
      views: {
        'noti': {
          templateUrl: 'templates/menu/noticias.html',
          controller: 'NoticeCtr'

        }
      }
    })

    .state('menu.ver_noticias', {
      url: '/ver_noticias',
      cache: false,
      views: {
        'noti': {
          templateUrl: 'templates/menu/ver_noticias.html',
          controller: 'VerNoticeCtr'
        }
      }
    })

    .state('menu.AgreComen', {
      url: '/AgreComen',
      cache: false,
      views: {
        'noti': {
          templateUrl: 'templates/menu/comentar.html',
          controller: 'VerNoticeCtr'
        }
      }
    })

    .state('menu.categoria', {
      url: '/categoria',
      views: {
        'cate': {
          templateUrl: 'templates/menu/categoria.html',
          controller: 'CategoryCtr'
        }
      }
    })

    .state('menu.ver_categoria', {
      url: '/ver_categoria',
      views: {
        'cate': {
          templateUrl: 'templates/menu/ver_categoria.html',
          controller: 'ver_categoriaCrt'
        }
      }
    })

    .state('menu.publicar', {
      url: '/publicar',
      views: {
        'publi': {
          templateUrl: 'templates/menu/publicar.html',
          controller: 'publicarCrt'
        }
      }
    })

    .state('menu.contacto', {
      url: '/contacto',
      views: {
        'cont': {
          templateUrl: 'templates/menu/contacto.html'
          
        }
      }
    })

    .state('menu.sujerencias', {
      url: '/sujerencias',
      views: {
        'suj': {
          templateUrl: 'templates/menu/sujerencias.html',
          controller: 'sujerenciaCrt'
        }
      }
    })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/noticias');

});
