/**
 * Created by Brinzoiu on 6/25/2016.
 */

angular.module('ui.bootstrap').controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'images/carousel'+currIndex+'.png',
      htext: ['KEEP CALM AND KEEP GOOD POSTURE ', 'A good stance and posture reflect a proper state of mind.','You\'ve got one body - treat it well' ,'Your best posture is your next posture'][slides.length % 4],
      ptext: ['','(Morihei Ueshiba)','',''][slides.length % 4],
      firstButtonText: 'Edit User',
      secondButtonText: 'Submit image',
      id: currIndex++
    });
  };


  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }
    return array;
  }

  $scope.changeClass = function () {
    $scope.class = "carousel-hover";
  }

});
