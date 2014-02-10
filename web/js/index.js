// JavaScript
if (!window.console){
   window.console = { log:function(msg){ }};
}


function getWindowClientSize(){
  var result={"width":0,"height":0};
  if(window.self&&self.innerWidth){
    result.width=self.innerWidth;
    result.height=self.innerHeight;
  }else if(document.documentElement && document.documentElement.clientHeight){
    result.width=document.documentElement.clientWidth;
    result.height=document.documentElement.clientHeight;
  }else{
    result.width=document.body.clientWidth;
    result.height=document.body.clientHeight;
  }
  return result;
}
function doResize(){
  windowSize = getWindowClientSize();
  $(".resizeheight-full").css("height",(windowSize.height - 53) + "px");
  $(".resizeheight-middle").css("height",(windowSize.height - 53 - 100) + "px");
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
        newlist.push(data[i]);
      }
      console.log("newlist");
      console.log(newlist);
    }
  });
  return newlist;
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
      $.tmpl("communitylistTMPL",json.data).appendTo(".community-list");
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
  $("#chatroom-name").text(active_community["name"]);

  //update timeline
  $.get('/api.php/topic_comment/search.json', {apiKey: openpne.apiKey,community_id: active_community.id,count: 30}, function(json) {
      $(".chatview").html("");

      var newArray = json.data.map(function (value, index, context) {
          var tmp_body = value.body;
          value.body = tmp_body.replace(/((http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ');
          return value;
      });
      $.tmpl("chatTMPL",newArray).appendTo(".chatview");
      scroll2Bottom(".chatview");

  },"json");
}
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
function scroll2Bottom(selector){
  $(selector).scrollTop($(selector)[0].scrollHeight);
}

var active_community = null;
var memberlist_loaded = false;
var chatview_loaded = false;
var community_list = {};

$(window).resize(function(){
  doResize();
});
$(document).ready(function(){

  var chat_line = '<div class="row row-chatsingle"><div class="col-lg-1"><div class="div-chatmember"><img src="${member.profile_image}" width="36" height="36" class="img-rounded" alt=""></div></div><div class="col-lg-11"><div class="row row-chatmemberinfo"><a href="/member/${member.id}" class="screenname"><div class="col-lg-8">${member.name}</div></a><div class="col-lg-4"><div class="pull-right">${created_at}</div></div></div><div class="row"><div class="col-lg-11">{{html body}}</div></div></div></div>';
  $.template("chatTMPL", chat_line);

  var task_line = '<div class="block-task"><div class="row"><div class="col-lg-1"><img width="24" height="24" src="${member.profile_image}"></div></div>';
  task_line += '<div class="row"><div class="col-lg-3"><small><input type="checkbox" target-id="${id}">${body}</small></div></div><div class="row"><div class="col-lg-2 offset1 text-right"><small><a href="">追加時点に移動</a></small></div></div></div>';
  $.template("taskTMPL", task_line);

  var communitytmpl_list = '<div class="panel panel-default"><div class="panel-heading panel-chatroom-list"><h5 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse-${id}" target-id="${id}"><img width="36" height="36" src="${community_image_url}" alt="">${name}</a></h5></div><div id="collapse-${id}" class="panel-collapse collapse"><div class="panel-body"></div></div></div>';
  $.template("communitylistTMPL", communitytmpl_list);

  var chatmember_line = '<img class="img-rounded3 pad1 tooltip-member" src="${profile_image}" width="24" height="24" data-toggle="tooltip" data-placement="top" title="${name}">';
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
    $("#chatform-textarea").focusin(function(){
      shortcut.add("Shift+Enter",function() {
        $("#chatform-post").click();
      });
    });
    $("#chatform-textarea").focusout(function(){
      shortcut.remove("Shift+Enter");
    });

    $("#chatform-post").click(function(event){
      event.preventDefault();
      var msg = $("#chatform-textarea").val();
      if(!msg){
        return;
      }
      $.post('/api.php/topic_comment/post.json',{apiKey: openpne.apiKey,community_id: active_community.id, body: msg},function(json){

        json.data.body = json.data.body.replace(/((http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ');
        $.tmpl("chatTMPL",json.data).appendTo(".chatview");
        scroll2Bottom(".chatview");
        $("#chatform-textarea").val("");
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

    $(document).on("click", ".panel-title a", function(){
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

          $("#collapse-"+ targetId +" .panel-body > *").remove();

          $.tmpl("chatmemberTMPL",json.data).appendTo("#collapse-" +targetId+ " .panel-body");
          $(".tooltip-member").tooltip();

        },"json");
      }, sleep);
    });
    setInterval(function() {
      updateChatRoom();
    }, 20000);

  });
doResize();
});