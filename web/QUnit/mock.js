$.mockjaxSettings = {
  log:           function(msg) { window['console'] && window.console.log && window.console.log(msg); },   
  status:        200,
  statusText:    'OK',
  responseTime:  100,
  isTimeout:     false,
  contentType:   'text/plain',
  response:      '',
  responseText:  '',
  responseXML:   '',
  proxy:         '',
  lastModified:  null,
  etag:          ''
};


$.mockjax({
  url: '/api.php/community/search.json',
  proxy: 'opChatTaskPlugin/QUnit/community_search.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "2" },
  proxy: 'opChatTaskPlugin/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "1" },
  status: 500
});

$.mockjax({
  url: '/api.php/activity/post.json',
  proxy: 'opChatTaskPlugin/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/search.json',
  proxy: 'opChatTaskPlugin/QUnit/activity_search.json'
});

$.mockjax({
  url: '/api.php/communityconfig/update.json',
  proxy: 'opChatTaskPlugin/QUnit/communityconfig_update.json'
});

$.mockjax({
  url: '/api.php/communityconfig/search.json',
  proxy: 'opChatTaskPlugin/QUnit/communityconfig_search.json'
});
$.mockjax({
  url: '/api.php/activity/delete.json',
  proxy: 'opChatTaskPlugin/QUnit/activity_delete.json'
});
$.mockjax({
  url: '/api.php/community/member.json',
  proxy: 'opChatTaskPlugin/QUnit/community_member.json'
});
