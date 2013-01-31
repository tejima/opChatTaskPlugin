


var active_community = null;
var memberlist_loaded = false;
var chatview_loaded = false;
var community_list = {};


var timeline_line = '<div class="row"><div class="span1"><div style="float: left;"><img width="36" height="36" src="${member.profile_image}"></div></div><div style="word-wrap: break-word;"><a href="/member/${member.id}" class="screenmae">${member.name}</a>${body}</div><ul class="nav nav-pills pull-right"><li class="disabled"><a href="#">${created_at}</a></li></ul></div>';
$.template("timelineTMPL", timeline_line);

var task_line = '<div class="block-task"><div class="row"><div class="span1"><img width="24" height="24" src="${member.profile_image}"></div></div>';
task_line += '<div class="row"><div class="span3"><small><input type="checkbox" target-id="${id}">${body}</small></div></div><div class="row"><div class="span2 offset1 text-right"><small><a href="">追加時点に移動</a></small></div></div></div>';
$.template("taskTMPL", task_line);

var chatlist_line = '<div class="accordion-group"><div class="accordion-heading"><img width="36" height="36" src="${community_image_url}" style="float: left;margin-right: 2px;"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse-${id}" target-id="${id}">${name}</a></div>';
chatlist_line += '<div id="collapse-${id}" class="accordion-body collapse"><div class="accordion-inner" target-id="${id}"></div></div></div>';
$.template("chatlistTMPL", chatlist_line);

var chatmember_line = '<img class="img-rounded3 pad1" src="${profile_image}" width="24" height="24">';
$.template("chatmemberTMPL", chatmember_line);

var community = loadCommunityList(false);
if(community.id >= 1){
  chatview_loaded = true;
  active_community = community;
}else{
  alert("ネットが不安定です。ブラウザをリロードしてください。" + community.id);
}


updateChatRoom();

$(function(){
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
    $.get('/api.php/activity/post.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community.id, body: msg},function(json){
      $.tmpl("timelineTMPL",json.data).appendTo("#chat-view");
      $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
      $("#chat-message").val("");
    },"json");
  });

  $("#info-mode-button").toggle(
    function(){
      memoEditMode(false);
    },
    function(){
      memoEditMode(true);
    }
  );

  $("#info-save-button").click(function(){
    var msg = $("#info-textarea").val();
    $.get('/api.php/communityconfig/update.json',{apiKey: openpne.apiKey , key: 'public_memo', value: msg , community_id: active_community.id} ,function(json){
      $("#info-textarea").val(msg);
      $("#done").show();
      $("#done").animate({opacity: 0.99}, 2000 );
      $("#done").fadeOut(1000);
      $("#info-mode-button").text("編集モードへ");
      $("#info-textarea").attr("readonly",true);
      $("#info-save-button").attr("disabled","disabled").addClass("disabled");
    },"json");
  });
  $("#taskdone-form :checkbox").live("click",function(){
    var block = $(this).parents(".block-task");
    if($(this).attr('checked')) {
      $.get('/api.php/activity/delete.json',{apiKey: openpne.apiKey ,id: $(this).attr('target-id')},function(json){
        if(json.result == "success"){
          block.fadeOut();
          msg = "タスク完了";
          $.get('/api.php/activity/post.json',{apiKey: openpne.apiKey,target: "community",target_id: active_community.id, body: msg},function(json){
            $.tmpl("timelineTMPL",json.data).appendTo("#chat-view");
            $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
          },"json");
        } else {
          alert("削除できなかった");
        }
      });
    } else {
    }
  });

  $(".accordion-toggle").live("click",function(){
    var targetId = $(this).attr('target-id');
    active_community = community_list[targetId];
    memoEditMode(false);
    updateChatRoom();

    var sleep = 0;
    if($(".accordion-inner[target-id='"+ targetId +"'] > *").size() > 0){
      sleep = 30000;
    }
    setTimeout(function() {
      $.get('/api.php/community/member.json',{apiKey: openpne.apiKey ,community_id: targetId},function(json){
        
        $(".accordion-inner[target-id='"+ targetId +"'] > *").remove();
        $.tmpl("chatmemberTMPL",json.data).appendTo(".accordion-inner[target-id='"+ targetId +"']");
      },"json");
    }, sleep);
  });

  setInterval(function() {
    updateChatRoom();
  }, 10000);

});
function memoEditMode(isEdit){
  if(isEdit){
    $("#info-mode-button").text("閲覧モードへ");
    $("#info-textarea").removeAttr("readonly").focus();
    $("#info-save-button").removeAttr("disabled").removeClass("disabled");
  }else{
    $("#info-mode-button").text("編集モードへ");
    $("#info-textarea").attr("readonly","readonly");
    $("#info-save-button").attr("disabled","disabled").addClass("disabled");
  }
}

function loadCommunityList(isAsync){
  if (isAsync === undefined){
    isAsync = true;
  }
  var result = -1;
  $.ajax({
    url: '/api.php/community/search.json',
    dataType: 'json',
    data: {apiKey: openpne.apiKey},
    async: isAsync,
    success: function(json) {
      console.log(json.data);
      json.data = sortChatRoomOrder(json.data);
      $.tmpl("chatlistTMPL",json.data).appendTo("#accordion2");
      result = json.data[0];
      for(var i=0;i < json.data.length;i++){
        community_list[json.data[i].id] = json.data[i];
      }
    }
  });
  return result;
}
function updateChatRoom(){
  //update memo
  if($("#info-textarea").attr("readonly")){
    $.get('/api.php/communityconfig/search.json', {apiKey: openpne.apiKey,community_id: active_community.id,key: 'public_memo'}, function(json) {
      $("#info-textarea").val(json.data['value']);
    },"json");
  }
  //update room name
  $("#room_name").text(active_community["name"]);

  //update timeline
  $.get('/api.php/activity/search.json', {apiKey: openpne.apiKey,target: "community", target_id: active_community.id}, function(json) {

  $("#chat-view").html("");
  $.tmpl("timelineTMPL",json.data.reverse()).appendTo("#chat-view");
  $('#chat-view').scrollTop($('#chat-view')[0].scrollHeight - $('#chat-view').height());
  },"json");
}

function sortChatRoomOrder(data){
  var newlist = [];
  $.ajax({
    type: "GET",
    url: "/api.php/snsconfig/search.json",
    data:  {apiKey: openpne.apiKey,key: 'public_chat_room_order'},
    async: false,
    dataType: "json",
    success: function(json){
      console.log("snsconfig/search.json");
      console.log(json);
      var order_list = json.data.value;

      console.log("order_list");
      console.log(order_list);

      console.log(data);

      for(var i=0;i<data.length;i++){
        //FIXME
        /*
        for(var j = 2; j>=0 ; j--){
          if(data[i].id == order_list[j]){
            newlist.unshift(data[i]);
          }
        }
        */
        if(data[i].name == "全員集合"){
          newlist.unshift(data[i]);
        }else{
          newlist.push(data[i]);
        }
        //newlist.push("aaa");
      }
      console.log("newlist");
      console.log(newlist);
      //return newlist;
      //return data;
    }
  });
  return newlist;
}









