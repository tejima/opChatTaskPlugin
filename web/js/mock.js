/*

$.mockjax({
  url: '/api.php/community/search.json',
  proxy: 'opChatTaskPlugin/community_search.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "2" },
  proxy: 'opChatTaskPlugin/activity_post.json'
});

$.mockjax({
  url: '/api.php/activity/post.json',
  data: { message: "1" },
  status: 500
});

$.mockjax({
  url: '/api.php/activity/post.json',
  proxy: 'opChatTaskPlugin/activity_post.json'
});
*/

/*
$.mockjax({
  url: '/api.php/activity/search.json',
  proxy: 'opChatTaskPlugin/activity_search.json'
});
*/
$.mockjax({
  url: '/api.php/communityconfig/update.json',
  proxy: 'opChatTaskPlugin/communityconfig_update.json'
});

$.mockjax({
  url: '/api.php/communityconfig/search.json',
  proxy: 'opChatTaskPlugin/communityconfig_search.json'
});

$.mockjax({
  url: '/api.php/activity/delete.json',
  proxy: 'opChatTaskPlugin/activity_delete.json'
});
/*
$.mockjax({
  url: '/api.php/community/member.json',
  proxy: 'opChatTaskPlugin/community_member.json'
});
*/
