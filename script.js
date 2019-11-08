function draw(resolution) {
  const canvas = document.getElementById('canvas'); 
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.height = resolution;

  if (resolution == 256) {
    var img = new Image();

    img.src = './assets/image.png';

    ctx.drawImage(img, 0, 0);

    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };

    return;
  }

  var src;

  if (resolution == 4) {
    src = img4
      .flat(1)
      .map(hexToRGBA)
      .flat(1);
  } else if (resolution == 32) {
    src = img32.flat(Infinity);
  }

  for (var y = 0; y < resolution; y++) {
    for (var x = 0; x < resolution; x++) {
      var pos = y * resolution + x;

      ctx.fillStyle =
        'rgba(' +
        src[pos * 4 + 0] +
        ',' +
        src[pos * 4 + 1] +
        ',' +
        src[pos * 4 + 2] +
        ',' +
        src[pos * 4 + 3] +
        ')';
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function radioButtons() {
  const radios = document.getElementsByName('resolution');

  radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      draw(this.value);
    });
  });
}

function hexToRGBA(hex) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4), 16);

  return [r, g, b, 255];
}

function init() {
  radioButtons();
}
