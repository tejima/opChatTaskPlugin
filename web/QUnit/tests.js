asyncTest('LOAD TEST', function() {
  setTimeout(function(){
    ok(true, 'asyncTest');
    start();
  });
});

asyncTest('timeline-load', function() {
  setTimeout(function() {
    equal($("#chat-view > *").size(),4);

    start();
  });
});

asyncTest('空投稿は無視', function() {
  var prev_size = $("#chat-view > *").size();
  $("#chat-post").click();

  setTimeout(function() {
   equal($("#chat-view > *").size(),prev_size);
   start();
  });
});

asyncTest('正しい投稿は一行増える',function(){
  var prev_size = $("#chat-view > *").size();
  $("#chat-message").text("DATADATA");
  $("#chat-post").click();

  setTimeout(function() {
   equal($("#chat-view > *").size(),prev_size+1,"一行増える");
   start();
  });
});

asyncTest('memberlist-click', function() {
  $("a.accordion-toggle[target-id=4]").click();

  setTimeout(function() {
    start();
    ok($("#collapse-4").hasClass('in'));
    equal($(".accordion-inner[target-id=4] > *").size(),4);
  });

  $("a.accordion-toggle[target-id=5]").click();  
  
  setTimeout(function() {
    start();
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=5] > *").size(),4);
  });

  $("a.accordion-toggle[target-id=1]").click();
  
  setTimeout(function() {
    start();
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=1] > *").size(),4);
  });
  
  $("a.accordion-toggle[target-id=3]").click();

  setTimeout(function() {
    start();
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=3] > *").size(),4);
  });
});

asyncTest('memo-edit', function() {
  
  $("#info-mode-button").click();

  setTimeout(function() {
    start();
    $("#info-textarea").text("MEMOMEMOMEMO");
  });
  
  setTimeout(function() {
    start();
    $("#info-save-button").click();
  });
  
  ok(true,"no error OK");
});

/*
uasyncTest('task done', function() {
  
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



