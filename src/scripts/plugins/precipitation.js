var $ = require('../vendor/jquery-2.1.4.js');

var precipitation = (function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var wrapper = $('#wrapper');
  var timeOutID;
  var clearId;
  var W = $(wrapper).width() + 40;
  var H = $(wrapper).height() + 40;
  var mp = 200;
  var particles = [];
  var angle = 0;
  var i;
  canvas.width = W;
  canvas.height = H;

  for (i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, //x-coordinate
      y: Math.random() * H, //y-coordinate
      r: Math.random() * 1 + 1, //radius
      d: Math.random() * mp //density
    });
  }

  function draw() {
    var i;
    var p; //parts
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    for (i = 0; i < mp; i++) {
      p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  function update() {
    var i;
    var p; //parts
    angle += 0.00;
    for (i = 0; i < mp; i++) {
      p = particles[i];
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;
      if (p.x > W || p.x < 0 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          if (Math.sin(angle) > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
  }

  return {
    start: function () {
      $(canvas).removeClass('stopSnow').addClass('startSnow');
      clearTimeout(clearId);
      timeOutID = setInterval(draw, 24);
    },
    stop: function () {
      $(canvas).removeClass('startSnow').addClass('stopSnow');
      clearId = setTimeout(function () {
        clearInterval(timeOutID);
        ctx.clearRect(0, 0, W, H);
      }, 4000);
    }
  };
})();

module.exports = precipitation;
