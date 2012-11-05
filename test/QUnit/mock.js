
$.mockjax({
  url: '/api.php/community/search.json',
  proxy: 'test/QUnit/community_search.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "2" },
  proxy: 'test/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "1" },
  status: 500
});

$.mockjax({
  url: '/api.php/activity/post.json',
  proxy: 'test/QUnit/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/search.json',
  proxy: 'test/QUnit/activity_search.json'
});

$.mockjax({
  url: '/api.php/communityconfig/update.json',
  proxy: 'test/QUnit/communityconfig_update.json'
});

$.mockjax({
  url: '/api.php/communityconfig/search.json',
  proxy: 'test/QUnit/communityconfig_search.json'
});
$.mockjax({
  url: '/api.php/activity/delete.json',
  proxy: 'test/QUnit/activity_delete.json'
});
$.mockjax({
  url: '/api.php/community/member.json',
  proxy: 'test/QUnit/community_member.json'
});
