var active_community = null;
var memberlist_loaded = false;
var chatview_loaded = false;
var community_list = {};

// ■ ■ ■ ■ ■   ■ ■ ■ ■ ■   ■       ■   ■ ■ ■ ■     ■               ■ ■ ■   ■ ■ ■ ■ ■   ■ ■ ■ ■ ■     ■ ■ ■ 
//     ■       ■           ■ ■   ■ ■   ■       ■   ■             ■     ■       ■       ■           ■       ■
//     ■       ■           ■   ■   ■   ■       ■   ■           ■       ■       ■       ■           ■       
//     ■       ■ ■ ■ ■     ■   ■   ■   ■ ■ ■ ■     ■           ■       ■       ■       ■ ■ ■ ■       ■ ■ ■ 
//     ■       ■           ■       ■   ■           ■           ■ ■ ■ ■ ■       ■       ■                   ■
//     ■       ■           ■       ■   ■           ■           ■       ■       ■       ■           ■       ■
//     ■       ■ ■ ■ ■ ■   ■       ■   ■           ■ ■ ■ ■ ■   ■       ■       ■       ■ ■ ■ ■ ■     ■ ■ ■ 



var dropdown_menu_line = '<li><a href="#" class="a-changecommunity dropdown" target-id="${id}">${name}</a></li>';
$.template("dropdown_menu_line", dropdown_menu_line);

var button_parts = '<div class="btn-group pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-pencil"></span></button><ul style="z-index: 1000;" class="dropdown-menu dropdown-menu-inline" role="menu">{{if deletable}}<li class="pull-right"><a href="#" data-target_id="${id}" class="chat_delete"><span class="glyphicon glyphicon-trash"></span>削除</a></li>{{/if}}</ul></div>';

var chat_line = '<div class="row row-chatsingle chat_line" data-target_id=${id}><div class="col-lg-1 col-xs-2"><div class="div-chatmember"><img src="${member.profile_image}" width="36" height="36" class="img-rounded" alt=""></div></div><div class="col-lg-11 col-xs-10"><div class="row row-chatmemberinfo"><a href="/member/${member.id}" class="screenname"><div class="col-lg-8 col-xs-6">${member.name}</div></a><div class="col-lg-4 col-xs-6">'+button_parts+'<div class="pull-right">${created_at}</div></div></div><div class="row"><div class="col-lg-11">{{html body}}</div></div></div></div>';
$.template("chat_line", chat_line);

var task_line = '<div class="block-task"><div class="row"><div class="col-lg-1"><img width="24" height="24" src="${member.profile_image}"></div></div>';
task_line += '<div class="row"><div class="col-lg-3"><small><input type="checkbox" target-id="${id}">${body}</small></div></div><div class="row"><div class="col-lg-2 offset1 text-right"><small><a href="">追加時点に移動</a></small></div></div></div>';
$.template("task_line", task_line);

var communitytmpl_list = '<div class="panel panel-default"><div class="panel-heading panel-chatroom-list"><h5 class="panel-title"><a class="a-changecommunity" data-toggle="collapse" data-parent="#accordion" href="#collapse-${id}" target-id="${id}"><img width="36" height="36" src="${community_image_url}" alt="">${name}</a></h5></div><div id="collapse-${id}" class="panel-collapse collapse"><div class="panel-body"></div></div></div>';
$.template("communitytmpl_list", communitytmpl_list);

var chatmember_line = '<img class="img-rounded3 pad1 tooltip-member" src="${profile_image}" width="24" height="24" data-toggle="tooltip" data-placement="top" title="${name}">';
$.template("chatmemberTMPL", chatmember_line);


//  ■ ■ ■ ■ ■   ■       ■   ■       ■     ■ ■ ■     ■ ■ ■ ■ ■     ■ ■ ■     ■ ■ ■     ■       ■     ■ ■ ■ 
//  ■           ■       ■   ■       ■   ■       ■       ■           ■     ■       ■   ■       ■   ■       ■
//  ■           ■       ■   ■ ■     ■   ■               ■           ■     ■       ■   ■ ■     ■     ■     
//  ■ ■ ■ ■     ■       ■   ■   ■   ■   ■               ■           ■     ■       ■   ■   ■   ■       ■   
//  ■           ■       ■   ■     ■ ■   ■               ■           ■     ■       ■   ■     ■ ■         ■ 
//  ■           ■       ■   ■       ■   ■       ■       ■           ■     ■       ■   ■       ■   ■       ■
//  ■             ■ ■ ■     ■       ■     ■ ■ ■         ■         ■ ■ ■     ■ ■ ■     ■       ■     ■ ■ ■ 

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
    url:  openpne.apiBase + 'snsconfig/search.json',
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
    url: openpne.apiBase + 'member/community.json',
    dataType: 'json',
    data: {apiKey: openpne.apiKey},
    async: isAsync,
    success: function(json) {
      console.log(json.data);
      json.data = sortChatRoomOrder(json.data);
      $.tmpl("communitytmpl_list",json.data).appendTo(".community-list");
      $.tmpl("dropdown_menu_line",json.data).appendTo(".dropdown-menu-community");

      result = json.data[0];
      for(var i=0;i < json.data.length;i++){
        community_list[json.data[i].id] = json.data[i];
      }
    }
  });
  return result;
}
function updateChatRoom(scroll){
  //update room name
  $(".chatroom-name").text(active_community["name"]);

  //update timeline
  $.get(openpne.apiBase + 'topic_comment/search.json', {apiKey: openpne.apiKey,community_id: active_community.id,count: 30}, function(json) {
      $(".chatview").html("");
      var newArray = json.data.map(function (value, index, context) {
          var tmp_body = value.body;
          value.body = tmp_body.replace(/((http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ');
          date = new Date(value.created_at.replace(/-/g,"/"));
          month_00 = ("0"+(date.getMonth()+1)).slice(-2);
          date_00 = ("0"+date.getDate()).slice(-2);
          hour_00 = ("0"+date.getHours()).slice(-2);
          minutes_00 = ("0"+date.getMinutes()).slice(-2);
          value.created_at =  month_00+"/" + date_00 + " " + hour_00 + ":" + minutes_00; 
          return value;
      });
      document.title = json.data.pop().id + '@' + active_community["name"];
      $.tmpl("chat_line",newArray).appendTo(".chatview");
      if(scroll){
        scroll2Bottom(".chatview");
      }
  },"json");
}

function scroll2Bottom(selector){
  $(selector).scrollTop($(selector)[0].scrollHeight);
}


//  ■ ■ ■ ■ ■   ■       ■   ■ ■ ■ ■ ■   ■       ■   ■ ■ ■ ■ ■     ■ ■ ■ 
//  ■           ■       ■   ■           ■       ■       ■       ■       ■
//  ■           ■       ■   ■           ■ ■     ■       ■         ■     
//  ■ ■ ■ ■     ■       ■   ■ ■ ■ ■     ■   ■   ■       ■           ■   
//  ■           ■       ■   ■           ■     ■ ■       ■             ■ 
//  ■             ■   ■     ■           ■       ■       ■       ■       ■
//  ■ ■ ■ ■ ■       ■       ■ ■ ■ ■ ■   ■       ■       ■         ■ ■ ■ 

$(document).on("click",".chat_delete",function(){
  target_id = $(this).attr('data-target_id');
  var jqxhr = $.ajax({
    type: 'POST',
    url: openpne.apiBase + 'topic_comment/delete.json',
    data: {apiKey: openpne.apiKey,id: target_id},
    timeout: 5000,
    dataType: 'json'
  })
    .done(function(json){
      $('.chat_line[data-target_id='+target_id+']').hide(500);
    })
    .always(function(){
    });
});
$(document).on("click", ".a-changecommunity.dropdown", function(){
  var targetId = $(this).attr('target-id');
  active_community = community_list[targetId];
  updateChatRoom(true);
});

$(document).on("click", ".a-changecommunity", function(){
  var targetId = $(this).attr('target-id');
  active_community = community_list[targetId];
  updateChatRoom(true);

  var sleep = 0;
  if($(".accordion-inner[target-id='"+ targetId +"'] > *").size() > 0){
    sleep = 30000;
  }
  setTimeout(function() {
    $.get(openpne.apiBase + 'community/member.json',{apiKey: openpne.apiKey ,community_id: targetId},function(json){
      $("#collapse-"+ targetId +" .panel-body > *").remove();
      $.tmpl("chatmemberTMPL",json.data).appendTo("#collapse-" +targetId+ " .panel-body");
      $(".tooltip-member").tooltip();
    },"json");
  }, sleep);
});

$(document).on("focusin",".chatform-textarea",function(){
  shortcut.add("Shift+Enter",function() {
    $("#chatform-post").click();
  });
});
$(document).on("focusout",".chatform-textarea",function(){
  shortcut.remove("Shift+Enter");
});

$(document).on("click","#chatform-post",function(event){
  event.preventDefault();
  var btn = $(this);
  btn.button('loading');
  var msg = $(".chatform-textarea").val();
  if(!msg){
    btn.button('reset');
    return;
  }
  var jqxhr = $.ajax({
    type: 'POST',
    url: openpne.apiBase + 'topic_comment/post.json',
    data: {apiKey: openpne.apiKey,community_id: active_community.id, body: msg},
    timeout: 5000,
    dataType: 'json'
  })
    .done(function(json){
      json.data.body = json.data.body.replace(/((http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ');
      $.tmpl("chat_line",json.data).appendTo(".chatview");
      scroll2Bottom(".chatview");
      $(".chatform-textarea").val("");
    })
    .always(function(){
      btn.button('reset');
    });
});

$(window).resize(function(){
  doResize();
});

//   ■ ■ ■       ■ ■ ■     ■ ■ ■ ■       ■ ■ ■     ■ ■ ■ ■     ■ ■ ■ ■ ■     ■ ■ ■ 
// ■       ■   ■       ■   ■       ■       ■       ■       ■       ■       ■       ■
// ■           ■           ■       ■       ■       ■       ■       ■       ■       
//   ■ ■ ■     ■           ■ ■ ■ ■         ■       ■ ■ ■ ■         ■         ■ ■ ■ 
//         ■   ■           ■   ■           ■       ■               ■               ■
// ■       ■   ■       ■   ■     ■         ■       ■               ■       ■       ■
//   ■ ■ ■       ■ ■ ■     ■       ■     ■ ■ ■     ■               ■         ■ ■ ■ 
if (!window.console){
   window.console = { log:function(msg){ }};
}
$(document).ready(function(){
  var community = loadCommunityList(false);
  if(community.id >= 1){
    chatview_loaded = true;
    active_community = community;
  }else{
    alert("ネットが不安定です。ブラウザをリロードしてください。" + community.id);
  }
  updateChatRoom(true);
  doResize();
  setInterval(function() {
    updateChatRoom(false);
  }, 20000);
  
});