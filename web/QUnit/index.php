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
  <link href="http://code.jquery.com/qunit/qunit-1.10.0.css" rel="stylesheet">
  <script src="http://code.jquery.com/qunit/qunit-1.10.0.js"></script>
  <script src="test/QUnit/jquery.mockjax.js"></script>
  <script src="test/QUnit/mock.js"></script>
  <script src="test/QUnit/tests.js"></script>
EOF;


  $tag = '<script type="text/javascript">
//<![CDATA[' . $tag . '//]]>
</script>';
  return $script . $tag;
}
require_once("apps/pc_frontend/modules/chattask/templates/indexSuccess.php");

