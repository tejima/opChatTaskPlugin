
module("communityconfig API Test"),{
}


asyncTest('communityconfig/search.json', function() {
  $.get('/api.php/communityconfig/search.json',{apiKey: openpne.apiKey,community_id: active_community_id,key: 'private_hogehoge'}, function(json){
  },"json").error(function(){
    ok("privateキーワードはAPIから読み込み不可");
  });

});


asyncTest('communityconfig/update.json', function() {
  setTimeout(function() {
    ok($("#chat-view > *").size() > 0,"フィールドにエントリが増えてればOK");

    start();
  },1000);
});




module("UI Test"),{
  setup:function(){
    $("#chat-view > *").remove();
  }
}

asyncTest('timelineロード', function() {
  setTimeout(function() {
    ok($("#chat-view > *").size() > 0,"フィールドにエントリが増えてればOK");

    start();
  },1000);
});

asyncTest('タイムライン投稿', function() {
  var prev_size = $("#chat-view > *").size();
  $("#chat-post").click();

  setTimeout(function() {
   equal($("#chat-view > *").size(),prev_size,"空投稿は更新されない");
   start();
  },1000);
});

asyncTest('memberlist-click', function() {

  $("a.accordion-toggle[target-id=1]").click();
  
  setTimeout(function() {
    start();
    ok($("#collapse-1").hasClass('in'),"id=1 open");
  },1000);
});
asyncTest('memberlist-click', function() {
  $("a.accordion-toggle[target-id=4]").click();

  setTimeout(function() {
    start();
    ok($("#collapse-4").hasClass('in'),"id=4 open");
  },1000);
});
asyncTest('memberlist-click', function() {
  $("a.accordion-toggle[target-id=5]").click();  
  
  setTimeout(function() {
    start();
    ok($("#collapse-5").hasClass('in'),"id=5 open");
  },1000);

});
asyncTest('memberlist-click', function() {

  $("a.accordion-toggle[target-id=3]").click();

  setTimeout(function() {
    start();
    ok($("#collapse-3").hasClass('in'),"id=3 open");
  },1000);
});

asyncTest('memo-edit', function() {
  
  $("#info-mode-button").click();

  setTimeout(function() {
    start();
    $("#info-textarea").text("MEMOMEMOMEMO");
  },1000);
  
  setTimeout(function() {
    start();
    $("#info-save-button").click();
  },1000);
  
  ok(true,"no error OK");
});

/*
asyncTest('task done', function() {
  
  var prev_size = -99;
  setTimeout(function() {
    prev_size = $("#task-view :checkbox").size();
    $("#task-view :checkbox:first").click();
    start();
  }, timer += interval);

  
  setTimeout(function() {
    equal( $("#chat-view > *").size(),prev_size -1);
    start();
  }, timer += interval);
});
*/


/*
asyncTest( "task done test", function(){
  var prev_size = -100 
  setTimeout(function() {
    prev_size = $("#taskdone-form :checkbox").size(); 
    $("#taskdone-form :checkbox:first").click();
  }, timer += interval);

  
  setTimeout(function() { 
    equal($("#taskdone-form input:checkbox").size(),prev_size - 1);
    start();
  }, timer += interval);
});
*/



