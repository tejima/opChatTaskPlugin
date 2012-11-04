
var timer = 1000;

test('timeline loaded', function() {
  stop();
  setTimeout(function() {
    equal($("#chat-view > *").size(),4);
    start();
  }, timer += 1000);
});

test('chat post', function() {
  $("#chat-post").click();
  stop();
  var prev_size = $("#chat-view > *").size();
  setTimeout(function() {
   equal($("#chat-view > *").size(),prev_size + 1);
   start();
  }, timer += 1000);
});

test('click to open memberlist', function() {
  stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=4]").click();
    start();
  }, timer += 1000);

  stop();
  setTimeout(function() {
    ok($("#collapse-4").hasClass('in'));
    equal($(".accordion-inner[target-id=4] > *").size(),4);
    start();
  }, timer += 1000);

 stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=5]").click();
    start();
  }, timer += 1000);

  stop();
  setTimeout(function() {
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=5] > *").size(),4);
    start();
  }, timer += 1000);

});

test('memo edit', function() {
  stop();
  setTimeout(function() {
    $("#info-mode-button").click();
    start();
  }, timer += 1000);

  stop();
  setTimeout(function() {
    $("#info-save-button").click();
    start();
  }, timer += 1000);
  
  ok(true,"no error OK");
});

/*
test('task done', function() {
  stop();
  var prev_size = -99;
  setTimeout(function() {
    prev_size = $("#task-view :checkbox").size();
    $("#task-view :checkbox:first").click();
    start();
  }, timer += 1000);

  stop();
  setTimeout(function() {
    equal( $("#chat-view > *").size(),prev_size -1);
    start();
  }, timer += 1000);
});
*/


/*
test( "task done test", function(){
  var prev_size = -100 
  setTimeout(function() {
    prev_size = $("#taskdone-form :checkbox").size(); 
    $("#taskdone-form :checkbox:first").click();
  }, timer += 1000);

  stop();
  setTimeout(function() { 
    equal($("#taskdone-form input:checkbox").size(),prev_size - 1);
    start();
  }, timer += 1000);
});
*/



