
var timer = 1000;
var interval = 500;

test('timeline-load', function() {
  stop();
  setTimeout(function() {
    equal($("#chat-view > *").size(),4);
    start();
  }, timer += interval);
});

test('chat-post', function() {
  var prev_size = $("#chat-view > *").size();
  $("#chat-post").click();
  stop();
  setTimeout(function() {
   equal($("#chat-view > *").size(),prev_size + 1);
   start();
  }, timer += interval);
});

test('memberlist-click', function() {
  stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=4]").click();
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    ok($("#collapse-4").hasClass('in'));
    equal($(".accordion-inner[target-id=4] > *").size(),4);
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=5]").click();
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=5] > *").size(),4);
    start();
  }, timer += interval);


  stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=1]").click();
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=1] > *").size(),4);
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    $("a.accordion-toggle[target-id=3]").click();
    start();
  }, timer += interval);

  stop();
  setTimeout(function() {
    ok($("#collapse-5").hasClass('in'));
    equal($(".accordion-inner[target-id=3] > *").size(),4);
    start();
  }, timer += interval);

});

test('memo-edit', function() {
  stop();
  setTimeout(function() {
    $("#info-mode-button").click();
    start();
  }, timer += interval);

  $("#info-textarea").text("MEMOMEMOMEMO");

  stop();
  setTimeout(function() {
    $("#info-save-button").click();
    start();
  }, timer += interval);
  
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
  }, timer += interval);

  stop();
  setTimeout(function() {
    equal( $("#chat-view > *").size(),prev_size -1);
    start();
  }, timer += interval);
});
*/


/*
test( "task done test", function(){
  var prev_size = -100 
  setTimeout(function() {
    prev_size = $("#taskdone-form :checkbox").size(); 
    $("#taskdone-form :checkbox:first").click();
  }, timer += interval);

  stop();
  setTimeout(function() { 
    equal($("#taskdone-form input:checkbox").size(),prev_size - 1);
    start();
  }, timer += interval);
});
*/



