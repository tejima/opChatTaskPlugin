<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="opChatTaskPlugin/css/bootstrap.css" rel="stylesheet">
  <link href="opChatTaskPlugin/css/docs.css" rel="stylesheet">
  <link href="opChatTaskPlugin/css/custom.css" rel="stylesheet">

  <title></title>
    <!-- libs -->
  <script src="opChatTaskPlugin/js/jquery.js"></script>
  <script src="opChatTaskPlugin/js/jquery.tmpl.js"></script>
  <script src="opChatTaskPlugin/js/bootstrap.js"></script>
  <script src="opChatTaskPlugin/js/shortcut.js"></script>
<!--
  <style>
    body {
      padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
    }
  </style>
-->
<?php
use_helper('Javascript');

$jsonData = array(
  'apiKey' => $sf_user->getMemberApiKey(),
  'apiBase' => app_url_for('api', 'homepage'),
);
echo javascript_tag('
var openpne = '.json_encode($jsonData).';
');
?>
</head>
<body>
<div class="navbar navbar-inverse navbar-static-top">
  <div class="navbar-inner">
      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <a class="brand" href="#">Project name</a>
      <div class="nav-collapse collapse">
        <ul class="nav pull-right">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
  </div>
</div>
<div id="container_left" class="resize" style="position: absolute;margin: 0px;left: 0px;right: auto;top: 40px;bottom: 30px;z-index: 1;width: 239px;display: block;visibility: visible;overflow: hidden; background: #f5f5f5;">


  <div class="navbar">
    <div class="navbar-inner">
      <form class="navbar-form pull-left">
        <input type="text" placeholder="チャット名を検索" style="width: 150px;">
      </form>
    </div>
  </div>
  <div class="accordion" id="accordion2">
  </div>
</div>
<div id="container_center" class="resize" style="position: absolute;margin: 0px;left: 240px;right: 0px;top: 40px;bottom: 30px;width: 922px;z-index: 1;display: block;visibility: visible;overflow: hidden;">
  <div class="navbar">
    <div class="navbar-inner">
      <a class="brand" href="#">●●チャットルーム</a>

    <ul class="nav pull-right">
                <li class="divider-vertical"></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-wrench"></i>設定<b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
                  </div>


  </div>

  <div id="chat-view" class="resize-150" style="overflow: scroll;">
  </div>

  <div id="chat-input" class="row" style="position: absolute;margin: 0px;top: auto;bottom: 0px;left: 0px;right: 0px;width: auto;z-index: 1;height: 80px;display: block;visibility: visible;">
    <div class="">
      <textarea id="chat-message" class="span5" name="" cols="30" style="position: absolute;left: 0px;height: 68px; right:0px; width: auto; margin-right: 90px;"></textarea>
    </div>
  
    <div class="">
      <button id="chat-post" class="btn  btn-block btn-large" style="position: absolute; top: 5px; right: 5px; width: 80px; height: 70px;"><i class="icon-pencil"></i>送信<br><small>Shift+Enter</small></button>
    </div>
  </div>  
</div>
<div id="container_right" class="resize" style="position: absolute;margin: 0px;left: auto;right: 0px;top: 40px;bottom: 0px;z-index: 1;width: 240px;display: block;visibility: visible;overflow: hidden;">
  <div class="navbar">
    <div class="navbar-inner">
      <p class="navbar-text">メモ＆タスク</p>
    </div>
  </div>

      <textarea readonly id="info-textarea" style="width: 100%;">
      </textarea>
       <div class="btn-group" style="position: relative;">
        <button id="info-mode-button" class="btn btn-mini">編集モードへ</button>
        <button id="info-save-button" class="btn btn-mini btn-primary disabled" disabled> __SAVE__ </button>
      </div>
      <div id="done" class="alert alert-success" style="display: none;">
        保存しました！
      </div>

              Task List
      <form id="taskdone-form">
      <div id="task-view">
      </div>
      </form>


</div>


<div style="position: absolute; bottom: 0px; height: 24px; background: #333333; width: auto; left: 0px; right: 0px;">
  BBBBBBBBBB
</div>


<script src="opChatTaskPlugin/js/index.js"></script>
<div id="qunit"></div>


    <SCRIPT type="text/javascript">
<!--

function getWindowClientSize(){
  var result={"width":0,"height":0};
  if(window.self&&self.innerWidth){
    result.width=self.innerWidth;
    result.height=self.innerHeight;
  }else if(document.documentElement && document.documentElement.clientHeight){
    result.width=document.documentElement.clientWidth;
    result.height=document.documentElement.clientHeight;
  }else{
    result.width=document.body.clientWidth;
    result.height=document.body.clientHeight;
  }
  return result;
}
//-->
</SCRIPT>
    <script>
    $(window).resize(function(){
      windowSize = getWindowClientSize();
        $(".resize").css("height",(windowSize.height - 65) + "px");
       $(".resize-150").css("height",(windowSize.height - 215) + "px");

    });

    $(document).ready(function(){
      windowSize = getWindowClientSize();
        $(".resize").css("height",(windowSize.height - 65) + "px");
        $(".resize-150").css("height",(windowSize.height - 215) + "px");

    });
    </script>

</body>
</html>
