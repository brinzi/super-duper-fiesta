/**
 * Created by Brinzoiu on 5/9/2016.
 */
app.directive('magnifier', function () {
  return {
    restrict: "A",
    scope: {
      zoom: "@"
    },
    link: function (scope, element) {

      var imageStartX = 0,
        imageStartY = 0,
        magradius = 75,
        handlelinewidth = 20,
        handlelength = 30,
        maglinewidth = 8,
        lineWidth = 10,
        shadowBlur = 15,
        shadowOffsetX = 5,
        shadowOffsetY = 5;

      var canvas = document.getElementById("current_image");
      var context = canvas.getContext("2d");



      element.on('mousedown', function (e) {

        e.preventDefault();
        element.on('mousemove', mousemove);
       // element.on('mouseup', mouseup);
       // element.on('mouseleave', mouseup);
        var p = getMousePos(e);
        console.log(p);
        drawmagnify(p.x , p.y);
      });

      function putImage(x, y) {
        context.save();

        var image = new Image();
        image.src = canvas.toDataURL();
        context.drawImage(image, x, y);

        context.restore();
      }
      function mousemove(e) {
        drawmagnify(e.pageX, e.pageY);
      }

      function mouseup() {
        element.off('mousemove', mousemove);
        element.off('mouseup', mouseup);
        putImage(imageStartX, imageStartY);
      }

      function drawmagnify(x, y) {
        dodrawmagnify(x,
          y,
          magradius,
          handlelinewidth,
          handlelength,
          maglinewidth,
          lineWidth,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY);
      }

      function dodrawmagnify(x, y, r,  lw, sb, sx, sy) {

        var clickx = Math.trunc(x);
        var clicky = Math.trunc(y);

        putImage(imageStartX, imageStartY);
        context.save();

        context.lineWidth = lw;
        context.shadowColor = "#000";
        context.shadowBlur = sb;
        context.shadowOffsetX = sx;
        context.shadowOffsetY = sy;

        var magnified = new Image();
        context.save();
        context.beginPath();
        context.arc(clickx, clicky, r, 0, Math.PI * 2, true);
        context.clip();

        magnified.src =  canvas.toDataURL();
        context.scale(scope.zoom, scope.zoom);
        var zoomX = clickx - (clickx / scope.zoom);
        var zoomY = clicky - (clicky / scope.zoom);
        context.drawImage(magnified, -(zoomX), -(zoomY));
        context.restore();
        context.stroke();
        context.restore();
      };

    }
  };
})
