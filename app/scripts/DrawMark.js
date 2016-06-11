/**
 * Created by Brinzoiu on 3/22/1016.
 */
'use strict';

var getMousePos =  function(evt)  {
  var canvas =  document.getElementById("current_image");

  var rect =canvas.getBoundingClientRect();

  return {
    x: (evt.clientX-rect.left)/(rect.right-rect.left)*canvas.offsetWidth,
    y: (evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.offsetHeight
  };
}

var drawMark = function (evt) {

  if (interestPoints.length >= 10){
    console.log("here");
    return;
  }


  var canvas =  document.getElementById("current_image");
  var ctx = canvas.getContext("2d");
  var cursorPos = getMousePos(evt);



  ctx.beginPath();
  ctx.moveTo(cursorPos.x - 10, cursorPos.y - 10);
  ctx.lineTo(cursorPos.x + 10, cursorPos.y + 10);

  ctx.moveTo(cursorPos.x + 10, cursorPos.y - 10);
  ctx.lineTo(cursorPos.x - 10, cursorPos.y + 10);
  ctx.stroke();
  ctx.closePath();
  interestPoints.push(cursorPos);

}
