window.exp = window.exp || {};

window.exp = (function() {

  var CONFIG = {
    POST_URL: "http://hcde516.herokuapp.com/send",
    TIME: 2 * 1000, // 2 sec
    LABEL: "Enter the percentage difference beween two bars",
    HELP_TEXT: "Type in the number and click on next or press enter",
    CCONFIG: {
      chart1: {
        width: 500,
        height: 500,
        bar1: {
          height: 400
        },
        bar2: {
          height: 300
        }
      },

      chart2: {
        height: 500,
        width: 500,
        bar1: {
          height: 400
        },
        bar2: {
          height: 100
        }
      },

      chart3: {
        height: 320,
        width: 480,
        bar1: {
          height: 100
        },
        bar2: {
          height: 200
        }
      },

      chart4: {
        height: 320,
        width: 480,
        bar1: {
          height: 30
        },
        bar2: {
          height: 300
        }
      },

      chart5: {
        height: 320,
        width: 480,
        bar1: {
          height: 30
        },
        bar2: {
          height: 300
        }
      },

      chart6: {
        height: 320,
        width: 480,
        bar1: {
          height: 30
        },
        bar2: {
          height: 300
        }
      },

      chart7: {
        height: 320,
        width: 480,
        bar1: {
          height: 30
        },
        bar2: {
          height: 300
        }
      },

      chart8: {
        height: 320,
        width: 480,
        bar1: {
          height: 30
        },
        bar2: {
          height: 300
        }
      }

    }
  };

var charts, initCharts, getConfig, renderLables, initNavigation, submitAnswers, keyUps, _sendAnswers, _handleNext;

getConfig = function() {
  $.ajax({
    url: "https://sheetsu.com/apis/5d547327",
    method: 'GET',
    success: function(data) {

      for (var i = 0; i < data.result.length; i++) {
        var key = data.result[i].param;
        var keys = key.split('.')
        if(keys.length === 4) {
          CONFIG[keys[0]][keys[1]][keys[2]][keys[3]] = data.result[i].value;
        }
        else if(keys.length === 3) {
          CONFIG[keys[0]][keys[1]][keys[2]] = data.result[i].value;
        }
        else if(keys.length === 2) {
          CONFIG[keys[0]][keys[1]] = data.result[i].value;
        }
        else {
          CONFIG[data.result[i].param] = data.result[i].value;
        }

      }
      initCharts();
      renderLables();
      keyUps();
      initNavigation();
      submitAnswers();

    }

  })
};

renderLables = function() {
  $('.lable-text')
    .text(CONFIG['LABEL'])
};

initCharts = function() {
  var chart, results, key;

  for (key in CONFIG['CCONFIG']) {
    chart = CONFIG['CCONFIG'][key]
    $("." + key)
      .css({
        height: chart.height + "px",
        width: chart.width + "px"
      });

    $('.' + key + " .bar1")
      .css({
        height: chart.bar1.height + "px"
      })

    $('.' + key + " .bar2")
      .css({
        height: chart.bar2.height + "px"
      })
  }

};

initNavigation = function() {
  $(document)
    .on('click', '.js_next', _handleNext);
};

submitAnswers = function() {
  $(document)
    .on('click', '.js_submit', _sendAnswers);
};

keyUps = function() {
  $(document)
    .on('keyup', 'section input', _handleNext)
}

_sendAnswers = function(e) {
  e.preventDefault();
  var target = $(e.target);
  target.parents('.slide')
    .addClass('hide');

  var next = target.parents('.slide')
    .next()

  next.removeClass('hide');

  $.ajax({
    url: CONFIG['POST_URL'],
    method: 'POST',
    data: {
      'subject': $('.subject')
        .val(),
      'chart_1': $('.chart2val')
        .val(),
      'chart_2': $('.chart4val')
        .val(),
      'chart_3': $('.chart6val')
        .val(),
      'chart_4': $('.chart8val')
        .val(),
      'comments': $('.comments')
        .val()
    },
    success: function(data) {

    }
  })
};

_handleNext = function(e) {

  e.preventDefault();

  if (e.type == 'keyup' && e.keyCode == 13 && $(this)
    .hasClass('last')) {
    _sendAnswers(e);
    return;
  }

  if (e.type == 'keyup' && e.keyCode != 13) {
    return;
  }
  var target = $(e.target);
  var input = target.parents('.slide')
    .find('input')

  if (!input.val()) {
    input.parents('.form-group')
      .addClass('has-error')
    return false;
  } else {
    input.parents('form-group')
      .removeClass('has-error')
    target.parents('.slide')
      .addClass('hide');
    var next = target.parents('.slide')
      .next()

    next.removeClass('hide');

    if (next.find('.chart')
      .length > 0) {
      setTimeout(function() {
        next.addClass('hide')
        next.next()
          .removeClass('hide')
        next.next()
          .find('input')
          .focus()
      }, CONFIG['TIME'])
    }
  }

};

return {
  init: function() {
    getConfig();

  }
};
})();

$(exp.init);
