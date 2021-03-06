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
              $scope.cargarNotice();
              
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
              $scope.cargarNotice();
              
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
$scope.fotoT = function (){
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
   destinationType: Camera.DestinationType.FILE_URI });

}

function onSuccess(imageURI) {
    var image = document.getElementById('fotoLocal');
    image.src = imageURI;
}
        
function onFail(message) {
    alert('Failed because: ' + message);
}

 $scope.subir = function () {
    var options = new FileUploadOptions();
    options.fileKey = "imagen";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://smartquibdo.sigtics.org/services/Publicaciones/Registrar_publicacion"), uploadSuccess, uploadFail, options);


 }

 function uploadSuccess(r) {
    alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
}

function uploadFail(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);

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
      saveToPhotoAlbum: true,
      correctOrientation:true 
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

      $scope.capturedImage = "data:image/jpeg;base64," + imageData;
      alert(imageData);
    }, function(err) {
      alert(err);
    });
  }

//Cordova
  $scope.tomaFoto = function() {
        Camara.tomaFoto().then(function(imageURI) {

          var datos = JSON.parse(imageURI);
          alert(datos);
            alert(datos['filename']);
  

            var img = datos['filename'];
            var img2 = img.replace("file:///","");

            alert(img2);
            
            document.getElementById("img_cordova").src = img;
            document.getElementById("img_cordova1").src = img2;
            //$scope.capturedImage = datos1;
            $scope.SubirFoto(imageURI);

        }, function(err) {
            console.err(err);
        }, {
            quality: 75,
            targetWidth: 200,
            targetHeight: 200,
            saveToPhotoAlbum: false
        });
    };


  $scope.SubirFoto = function uploadFile(mediaFile) {

        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
            alert(name);

        ft.upload(path,
            "http://smartquibdo.sigtics.org/services/Publicaciones/Registrar_publicacion",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');

                alert('Upload success: ' + result.responseCode);
                alert(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                alert('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
    }



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
  }; 
*/
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
