window.exp = window.exp || {};

window.exp = (function() {

  var POST_URL = "http://localhost:9292/send",
    TIME = 2 * 1000, // 2 sec
    LABEL = "Enter the percentage difference beween two bars",
    HELP_TEXT = "Type in the number and click on next or press enter";

  var charts, chartsConfig, initCharts;

  charts = $('.chart');
  chartsConfig = {
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

  };

  renderLables = function() {
    $('.lable-text')
      .text(LABEL)
  }

  initCharts = function() {
    var chart, results;

    for (key in chartsConfig) {
      chart = chartsConfig[key]
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
    target = $(e.target);
    target.parents('.slide')
      .addClass('hide');

    next = target.parents('.slide')
      .next()

    next.removeClass('hide');

    $.ajax({
      url: POST_URL,
      method: 'POST',
      data: {
        'subject': $('.subject')
          .val(),
        'chart_1': $('.chart1val')
          .val(),
        'chart_2': $('.chart2val')
          .val(),
        'chart_3': $('.chart3val')
          .val(),
        'chart_4': $('.chart4val')
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
    target = $(e.target);
    input = target.parents('.slide')
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
      next = target.parents('.slide')
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
        }, TIME)
      }
    }

  };

  return {
    init: function() {
      initCharts();
      renderLables();
      keyUps();
      initNavigation();
      submitAnswers();
    }
  };
})();

$(exp.init);
