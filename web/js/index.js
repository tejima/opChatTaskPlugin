var active_community_id = -1;

var timeline_line = '<div class="row"><div style="float: left;"><img width="36" height="36" src="${member.profile_image}"></div><div class="span5"><a href="#" class="screenmae">${member.name}</a>${body}</div></div>';
$.template("timelineTMPL",timeline_line);

var task_line = '<div class="block-task"><div class="row"><div class="span1"><img width="24" height="24" src="${member.profile_image}"></div></div>';
task_line += '<div class="row"><div class="span3"><small><input type="checkbox" target-id="${id}">${body}</small></div></div><div class="row"><div class="span2 offset1 text-right"><small><a href="">追加時点に移動</a></small></div></div></div>';
$.template("taskTMPL",task_line);

var chatlist_line = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse-${id}" target-id="${id}">${name}</a></div>';
chatlist_line += '<div id="collapse-${id}" class="accordion-body collapse"><div class="accordion-inner" target-id="${id}"></div></div></div>';
$.template("chatlistTMPL",chatlist_line);

var chatmember_line = '<img class="img-rounded3 pad1" src="${profile_image}" width="24" height="24">';
$.template("chatmemberTMPL",chatmember_line);


$.ajax({  
  url: '/api.php/community/search.json',  
  dataType: 'json',  
  data: {apiKey: openpne.apiKey},  
  async: false,  
  success: function(json){  
  console.log(json);
  active_community_id = json.data[0].id;
  $.tmpl("chatlistTMPL",json.data).appendTo("#accordion2");
                  //success code  
               }  
});  

//$.get('/api.php/community/search.json',{apiKey: openpne.apiKey},function(json){
//  console.log(json);
//active_community_id = json.data[0].id;
 // $.tmpl("chatlistTMPL",json.data).appendTo("#accordion2");
//},"json");

console.log("active_community_id");
console.log(active_community_id);

$.get('/api.php/activity/search.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community_id},function(json){
  console.log(json);
  $.tmpl("timelineTMPL",json.data.reverse()).appendTo("#chat-view");
  $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
},"json");

$.get('/api.php/activity/search.json',{apiKey: openpne.apiKey},function(json){
  console.log(json);
  /*
  $.tmpl("taskTMPL",json.data).appendTo("#task-view");
  */
},"json");

$.get('/api.php/communityconfig/search.json',{apiKey: openpne.apiKey}, function(json){
  console.log(json);
  $("#info-textarea").text(json.data.value); 
},"json");

$(function(){
  setTimeout(function() {
    stop();
    $("#chat-view").css("height",$("html").height()-130);
    //$("#chat-view").css("height",$(".layout").height()-130);
    start();
  }, 200);

  $("#chat-message").focusin(function(){
    shortcut.add("Shift+Enter",function() {
      $("#chat-post").click();
    });
  });
  $("#chat-message").focusout(function(){
    shortcut.remove("Shift+Enter");
  });

  $("#chat-post").click(function(){
    var msg = $("#chat-message").val();
    if(!msg){
      return;
    }
    $.get('/api.php/activity/post.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community_id, body: msg},function(json){
      console.log(json);
      $.tmpl("timelineTMPL",json.data).appendTo("#chat-view");
      $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
      $("#chat-message").val("");
    },"json").error(function(){console.log("通信できませんでした")});
  });

  $("#info-mode-button").toggle(
    function(){
      $("#info-mode-button").text("閲覧モードへ");
      $("#info-textarea").removeAttr("readonly").focus();
      $("#info-save-button").removeAttr("disabled").removeClass("disabled");
    },
    function(){
      $("#info-mode-button").text("編集モードへ");
      $("#info-textarea").attr("readonly","readonly");
      $("#info-save-button").attr("disabled","disabled").addClass("disabled");
    }
  );

  $("#info-save-button").click(function(){
    var msg = $("#info-textarea").val();
    $.get('/api.php/communityconfig/update.json',{apiKey: openpne.apiKey , message: msg},function(json){
      console.log("info-save-button");
      console.log(json);
      $("#info-textarea").text(json.data.value);
      $("#done").show();
      $("#done").animate({opacity: 0.99}, 2000 );
      $("#done").fadeOut(1000);
      $("#info-mode-button").text("編集モードへ");
      $("#info-textarea").attr("readonly","readonly");
      $("#info-save-button").attr("disabled","disabled").addClass("disabled");
    },"json");
  });

  $("#taskdone-form :checkbox").live("click",function(){
    console.log($(this).attr('checked'));
    var block = $(this).parents(".block-task");
    if($(this).attr('checked')) {
      $.get('/api.php/activity/delete.json',{apiKey: openpne.apiKey ,id: $(this).attr('target-id')},function(json){
        if(json.result = "success"){
          block.fadeOut();
          msg = "タスク完了";
          $.get('/api.php/activity/post.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community_id, body: msg},function(json){
            console.log(json);
            $.tmpl("timelineTMPL",json.data).appendTo("#chat-view");
            $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());

          },"json").error(function(){console.log("通信できませんでした")});

        } else {
          alert("削除できなかった");
        }
      });
    } else {
    }
  });

  $(".accordion-toggle").live("click",function(){
    var targetId = $(this).attr('target-id');
    active_community_id = targetId;
    $("#chat-view > *").remove();
    $.get('/api.php/activity/search.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community_id},function(json){
      console.log(json);
      $.tmpl("timelineTMPL",json.data.reverse()).appendTo("#chat-view");
      $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
    },"json");

    var sleep = 0;
    if($(".accordion-inner[target-id='"+ targetId +"'] > *").size() > 0){
      sleep = 3000;
    }
    stop();
    setTimeout(function() {
      $.get('/api.php/community/member.json',{apiKey: openpne.apiKey ,community_id: targetId},function(json){
        console.log(json.data);
        $(".accordion-inner[target-id='"+ targetId +"'] > *").remove();
        $.tmpl("chatmemberTMPL",json.data).appendTo(".accordion-inner[target-id='"+ targetId +"']");
      },"json");
      start();
    }, sleep);
  });
});


