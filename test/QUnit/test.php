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
  <link href="../plugins/opChatTaskPlugin/test/QUnit/qunit.css" rel="stylesheet">
  <script src="../plugins/opChatTaskPlugin/test/QUnit/qunit.js"></script>
  <script src="../plugins/opChatTaskPlugin/test/QUnit/jquery.mockjax.js"></script>
  <script src="../plugins/opChatTaskPlugin/test/QUnit/mock.js"></script>
  <script src="../plugins/opChatTaskPlugin/test/QUnit/tests.js"></script>
EOF;


  $tag = '<script type="text/javascript">
//<![CDATA[' . $tag . '//]]>
</script>';
  return $script . $tag;
}
require_once(dirname(__FILE__)."/../../apps/pc_frontend/modules/chattask/templates/indexSuccess.php");

