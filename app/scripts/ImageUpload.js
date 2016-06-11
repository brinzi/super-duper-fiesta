/**
 * Created by Brinzoiu on 3/22/2016.
 */
'use strict';

 // global variable used for saving one user uploaded image.
var fileToLoad;
var interestPoints;


var fitImageOn = function(canvas, imageObj) {
  var context = canvas.getContext("2d");
  var imageAspectRatio = imageObj.width / imageObj.height;
  var canvasAspectRatio = canvas.width / canvas.height;
  var renderableHeight, renderableWidth, xStart, yStart;

  // If image's aspect ratio is less than canvas's we fit on height
  // and place the image centrally along width
  if(imageAspectRatio < canvasAspectRatio) {
    renderableHeight = canvas.height;
    renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
    xStart = (canvas.width - renderableWidth) / 2;
    yStart = 0;
  }

  // If image's aspect ratio is greater than canvas's we fit on width
  // and place the image centrally along height
  else if(imageAspectRatio > canvasAspectRatio) {
    renderableWidth = canvas.width
    renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
    xStart = 0;
    yStart = (canvas.height - renderableHeight) / 2;
  }

  // Happy path - keep aspect ratio
  else {
    renderableHeight = canvas.height;
    renderableWidth = canvas.width;
    xStart = 0;
    yStart = 0;
  }
  context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

var ImageLoad = function() {
 interestPoints = [];
  var ctx = null;
  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    fileToLoad = filesSelected[0];

    if (fileToLoad.type.match("image.*")) {
      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        var imageHolder = document.getElementById("current_image");
        var drawArea = document.getElementById("modal-body");
        var __user_image__ = new Image();

        drawArea.appendChild(imageHolder);


        __user_image__.src = fileLoadedEvent.target.result;
        ctx = imageHolder.getContext("2d");
        console.log(drawArea);


        drawArea.style.display = "block";


        __user_image__.onload = function () {

        //  ctx.drawImage(__user_image__, 0, 0);

          fitImageOn(imageHolder, __user_image__);

          imageHolder.addEventListener("click", function (evt) {
            drawMark(evt);

          });
        };
      };
      fileReader.readAsDataURL(fileToLoad);
      return true;
    }
  } else {
    return false;
  }
};
