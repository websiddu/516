window.exp=window.exp||{},window.exp=function(){var a,b,c,d,e,f,g,h,i={POST_URL:"http://hcde516.herokuapp.com/send",TIME:2e3,LABEL:"Enter the percentage difference beween two bars",HELP_TEXT:"Type in the number and click on next or press enter",CCONFIG:{chart1:{width:500,height:500,bar1:{height:400},bar2:{height:300}},chart2:{height:500,width:500,bar1:{height:400},bar2:{height:100}},chart3:{height:320,width:480,bar1:{height:100},bar2:{height:200}},chart4:{height:320,width:480,bar1:{height:30},bar2:{height:300}},chart5:{height:320,width:480,bar1:{height:30},bar2:{height:300}},chart6:{height:320,width:480,bar1:{height:30},bar2:{height:300}},chart7:{height:320,width:480,bar1:{height:30},bar2:{height:300}},chart8:{height:320,width:480,bar1:{height:30},bar2:{height:300}}}};return b=function(){$.ajax({url:"https://sheetsu.com/apis/5d547327",method:"GET",success:function(b){for(var g=0;g<b.result.length;g++){var h=b.result[g].param,j=h.split(".");4===j.length?i[j[0]][j[1]][j[2]][j[3]]=b.result[g].value:3===j.length?i[j[0]][j[1]][j[2]]=b.result[g].value:2===j.length?i[j[0]][j[1]]=b.result[g].value:i[b.result[g].param]=b.result[g].value}a(),c(),f(),d(),e()}})},c=function(){$(".lable-text").text(i.LABEL)},a=function(){var a,b;for(b in i.CCONFIG)a=i.CCONFIG[b],$("."+b).css({height:a.height+"px",width:a.width+"px"}),$("."+b+" .bar1").css({height:a.bar1.height+"px"}),$("."+b+" .bar2").css({height:a.bar2.height+"px"})},d=function(){$(document).on("click",".js_next",h)},e=function(){$(document).on("click",".js_submit",g)},f=function(){$(document).on("keyup","section input",h)},g=function(a){a.preventDefault();var b=$(a.target);b.parents(".slide").addClass("hide");var c=b.parents(".slide").next();c.removeClass("hide"),$.ajax({url:i.POST_URL,method:"POST",data:{subject:$(".subject").val(),chart_1:$(".chart2val").val(),chart_2:$(".chart4val").val(),chart_3:$(".chart6val").val(),chart_4:$(".chart8val").val(),comments:$(".comments").val()},success:function(){}})},h=function(a){if(a.preventDefault(),"keyup"==a.type&&13==a.keyCode&&$(this).hasClass("last"))return void g(a);if("keyup"!=a.type||13==a.keyCode){var b=$(a.target),c=b.parents(".slide").find("input");if(!c.val())return c.parents(".form-group").addClass("has-error"),!1;c.parents("form-group").removeClass("has-error"),b.parents(".slide").addClass("hide");var d=b.parents(".slide").next();d.removeClass("hide"),d.find(".chart").length>0&&setTimeout(function(){d.addClass("hide"),d.next().removeClass("hide"),d.next().find("input").focus()},i.TIME)}},{init:function(){b()}}}(),$(exp.init);