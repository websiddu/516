window.exp=window.exp||{},window.exp=function(){var a,b,c,d="http://localhost:9292/send",e=2e3,f="Enter the percentage difference beween two bars";return a=$(".chart"),b={chart1:{width:500,height:500,bar1:{height:400},bar2:{height:300}},chart2:{height:500,width:500,bar1:{height:400},bar2:{height:100}},chart3:{height:320,width:480,bar1:{height:100},bar2:{height:200}},chart4:{height:320,width:480,bar1:{height:30},bar2:{height:300}}},renderLables=function(){$(".lable-text").text(f)},c=function(){var a;for(key in b)a=b[key],$("."+key).css({height:a.height+"px",width:a.width+"px"}),$("."+key+" .bar1").css({height:a.bar1.height+"px"}),$("."+key+" .bar2").css({height:a.bar2.height+"px"})},initNavigation=function(){$(document).on("click",".js_next",_handleNext)},submitAnswers=function(){$(document).on("click",".js_submit",_sendAnswers)},keyUps=function(){$(document).on("keyup","section input",_handleNext)},_sendAnswers=function(a){a.preventDefault(),target=$(a.target),target.parents(".slide").addClass("hide"),next=target.parents(".slide").next(),next.removeClass("hide"),$.ajax({url:d,method:"POST",data:{subject:$(".subject").val(),chart_1:$(".chart1val").val(),chart_2:$(".chart2val").val(),chart_3:$(".chart3val").val(),chart_4:$(".chart4val").val(),comments:$(".comments").val()},success:function(){}})},_handleNext=function(a){return a.preventDefault(),"keyup"==a.type&&13==a.keyCode&&$(this).hasClass("last")?void _sendAnswers(a):"keyup"!=a.type||13==a.keyCode?(target=$(a.target),input=target.parents(".slide").find("input"),input.val()?(input.parents("form-group").removeClass("has-error"),target.parents(".slide").addClass("hide"),next=target.parents(".slide").next(),next.removeClass("hide"),next.find(".chart").length>0&&setTimeout(function(){next.addClass("hide"),next.next().removeClass("hide"),next.next().find("input").focus()},e),void 0):(input.parents(".form-group").addClass("has-error"),!1)):void 0},{init:function(){c(),renderLables(),keyUps(),initNavigation(),submitAnswers()}}}(),$(exp.init);