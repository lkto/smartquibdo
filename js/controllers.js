angular.module('starter.controllers', [])

.controller('SignupCtrl', function($scope, $ionicLoading, $timeout, $state) {
  $scope.done = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });

    $timeout(function() {
      $ionicLoading.hide();
      $state.go('home.feeds');
    }, 2000);
  }
})


.controller('NoticeCtr', function($scope,$http,$state){

  var token = "HYT6&/_AB$K+]XxN2rm";

  var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/listado_publicaciones",
            data: {
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              $scope.publicacion = data.dataObj;
            });

   $scope.ver_noti = function(id){

    console.log(id);
    localStorage.setItem("id_publi", id);

    $state.go('menu.ver_noticias');




   }

})

.controller('VerNoticeCtr', function($scope,$http,$ionicModal,alertify,$state){

  var token = "HYT6&/_AB$K+]XxN2rm";
  var id = localStorage.getItem("id_publi");

  $scope.cargarNotice = function(){

      var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/Detalles_publicacion/"+id,
            data: {
                    token: token
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              $scope.Det_publicacion = data.dataObj;
            });


  }

    $scope.cargarNotice();




  $scope.AgrCom=function(){

    var comentario = document.getElementById("txtcomentario").value;
    console.log(txtcomentario);


        var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/Registrar_comentario",
            data: {
                    token: token,
                    id_blog:id,
                    descripcion: comentario
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              alertify.logPosition("top right");
              alertify.success(data.dataObj);
              document.getElementById("txtcomentario").value ="";
              $state.go('menu.ver_noticias');
              
            });



      }

       $scope.AgrCom1=function(){

    var comentario = document.getElementById("txtcomentario").value;
    console.log(txtcomentario);


        var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/Registrar_comentario",
            data: {
                    token: token,
                    id_blog:id,
                    descripcion: comentario
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              alertify.logPosition("top right");
              alertify.success(data.dataObj);
              document.getElementById("txtcomentario").value ="";
              $state.go('menu.ver_noti_categ');
              
            });



      }

})

.controller('CategoryCtr', function($scope,$http,$state){

  var token = "HYT6&/_AB$K+]XxN2rm";

  var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/listado_categorias",
            data: {
                    token: token
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              $scope.CategoryPu = data.dataObj;
            });

   $scope.Ver_category = function(id){

    console.log(id);
    localStorage.setItem("id_cat", id);

    $state.go('menu.ver_categoria');




   }

})

.controller('ver_categoriaCrt', function($scope,$http,$state){

  var token = "HYT6&/_AB$K+]XxN2rm";
  var id = localStorage.getItem("id_cat");

  var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/listado_publicaciones/"+id,
            data: {
                    token: token
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              $scope.Det_categoria = data.dataObj;
            });

    $scope.ver_noti1 = function(id){

    console.log(id);
    localStorage.setItem("id_publi", id);

    $state.go('menu.ver_noti_categ');




   }



})
.controller('publicarCrt', function($scope,$cordovaCapture, $cordovaCamera,Camara){

  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
//Angular

  $scope.takePhoto = function() {
    $scope.capturedImage = ''; 

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.capturedImage = "data:image/jpeg;base64," + imageData;
      alert(capturedImage);
    }, function(err) {
      alert(err);
    });
  }

//Cordova
  $scope.tomaFoto = function() {
        Camara.tomaFoto().then(function(imageURI) {
            //$scope.ultimaFoto = imageURI;
            document.getElementById("img_cordova").src= "imageURI";
            alert(imageURI);
        }, function(err) {
            console.err(err);
        }, {
            quality: 75,
            targetWidth: 200,
            targetHeight: 200,
            saveToPhotoAlbum: true
        });
    };

/*
var imageUpload = new ImageUpload();
  $scope.file = {};
  $scope.upload = function() {
    alert("FUnciona");
    imageUpload.push($scope.file, function(data){
      console.log('File uploaded Successfully', $scope.file, data);
      $scope.uploadUri = data.url;
      $scope.$digest();
    });
  }; */

})

.controller('sujerenciaCrt', function($scope,$http,$state,alertify){

  var token = "HYT6&/_AB$K+]XxN2rm";

  $scope.AgrSuj=function(){

    var descripcion = document.getElementById("txtcomentario").value;
    var titulo = document.getElementById("titulo").value;
    console.log(txtcomentario);


        var request = $http({
            method: "post",
            url: "http://smartquibdo.sigtics.org/services/Publicaciones/Registrar_sugerencias",
            data: {
                    token: token,
                    titulo:titulo,
                    descripcion: descripcion
                 
                },

                  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
               
            });
            request.success(function (data) {
              console.log(data.dataObj);
              alertify.logPosition("top right");
              alertify.success(data.dataObj);
              document.getElementById("txtcomentario").value ="";
              document.getElementById("titulo").value="";
              
              
            });



      }


})
.controller('DemoCtrl', function($scope, $ionicActionSheet, $cordovaCapture, $cordovaCamera, $ionicModal) {
  $scope.refresh = function() {
    // Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.actionSheet = function() {
    var hideSheet = $ionicActionSheet.show({
      // titleText: 'Modify your album',
      buttons: [
        { text: 'Block or report' },
        { text: 'Copy Link' }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        return true;
      }
    });
  }

  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  $scope.takePhoto = function() {
    $scope.capturedImage = ''; 

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.capturedImage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      alert(err);
    });
  }

  // Search modal
  $ionicModal.fromTemplateUrl('templates/partial/search.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openSearch = function() {
    $scope.modal.show();
  };
  $scope.closeSearch = function() {
    $scope.modal.hide();
  };

  // People modal
  $ionicModal.fromTemplateUrl('templates/partial/friends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPeople = modal;
  });
  $scope.openPeople = function() {
    $scope.modalPeople.show();
  };
  $scope.closePeople = function() {
    $scope.modalPeople.hide();
  };

  // Messages modal
  $ionicModal.fromTemplateUrl('templates/partial/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalMessage = modal;
  });
  $scope.openMessage = function() {
    $scope.modalMessage.show();
  };
  $scope.closeMessage = function() {
    $scope.modalMessage.hide();
  };
})
