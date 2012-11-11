<?php
class dummy{
  function getMemberApiKey(){
    return "OPNEPNEDUMMYAPIKEY";
  }
}
$sf_user = new dummy();
function use_helper(){}
function app_url_for($arg1, $arg2){
  return "/".$arg1.".php/";
}

function javascript_tag($tag){

$script = <<<EOF
  <link href="/opChatTaskPlugin/QUnit/qunit.css" rel="stylesheet">
  <script src="/opChatTaskPlugin/QUnit/qunit.js"></script>
  <script src="/opChatTaskPlugin/QUnit/jquery.mockjax.js"></script>
  <script src="/opChatTaskPlugin/QUnit/mock.js"></script>
  <script src="/opChatTaskPlugin/QUnit/tests.js"></script>
EOF;

  $tag = '<script type="text/javascript">
//<![CDATA[' . $tag . '//]]>
</script>';
  return $script . $tag;
}
require_once(dirname(__FILE__)."/../apps/pc_frontend/modules/chattask/templates/indexSuccess.php");

