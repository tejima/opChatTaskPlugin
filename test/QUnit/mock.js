
$.mockjax({
  url: '/api.php/community/search.json',
  proxy: 'community_search.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "2" },
  proxy: 'activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "1" },
  status: 500
});

$.mockjax({
  url: '/api.php/activity/post.json',
  proxy: 'activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/search.json',
  proxy: 'activity_search.json'
});

$.mockjax({
  url: '/api.php/communityconfig/update.json',
  proxy: 'communityconfig_update.json'
});

$.mockjax({
  url: '/api.php/communityconfig/search.json',
  proxy: 'communityconfig_search.json'
});
$.mockjax({
  url: '/api.php/activity/delete.json',
  proxy: 'activity_delete.json'
});
$.mockjax({
  url: '/api.php/community/member.json',
  proxy: 'community_member.json'
});
