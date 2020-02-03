'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10; // для отрисовки тени облака
var GAP = 40; // зазор между облаком и статистикой
var FONT_GAP = 10;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var randomSaturate = Math.floor(Math.random() * 100);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + BAR_WIDTH + BAR_GAP, CLOUD_Y + CLOUD_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_GAP, CLOUD_Y + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (TEXT_WIDTH + GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + randomSaturate + '%' + ', 34%)';
    }
    ctx.fillRect(CLOUD_X + GAP + (TEXT_WIDTH + GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - BAR_HEIGHT, BAR_WIDTH, ((BAR_HEIGHT - FONT_GAP) * times[i]) / maxTime);
  }
};
