$.mockjaxSettings = {
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
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/community_search.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "2" },
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "1" },
  status: 500
});

$.mockjax({
  url: '/api.php/activity/post.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/search.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/activity_search.json'
});

$.mockjax({
  url: '/api.php/communityconfig/update.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/communityconfig_update.json'
});

$.mockjax({
  url: '/api.php/communityconfig/search.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/communityconfig_search.json'
});
$.mockjax({
  url: '/api.php/activity/delete.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/activity_delete.json'
});
$.mockjax({
  url: '/api.php/community/member.json',
  proxy: '../plugins/opChatTaskPlugin/test/QUnit/community_member.json'
});
