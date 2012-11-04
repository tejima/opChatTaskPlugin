<?php use_stylesheet('/opChatTaskPlugin/css/bootstrap.css') ?>
<?php use_stylesheet('/opChatTaskPlugin/css/docs.css') ?>
<?php use_stylesheet('/opChatTaskPlugin/css/custom.css') ?>

<?php use_javascript('/opChatTaskPlugin/js/jquery.js') ?>
<?php //use_javascript('/opChatTaskPlugin/js/jquery.tmpl.js') ?>
<?php use_javascript('/opChatTaskPlugin/js/bootstrap.js') ?>
<?php use_javascript('/opChatTaskPlugin/js/shortcut.js') ?>
<?php use_javascript('/opChatTaskPlugin/js/jquery.mockjax.js') ?>
<?php use_javascript('/opChatTaskPlugin/js/mock.js') ?>

<?php use_javascript('http://code.jquery.com/qunit/qunit-1.10.0.js') ?>
<?php use_javascript('/opChatTaskPlugin/js/index.js','last') ?>


<div id="body">
<div class="main-window row full-h">
  <div class="span3 full-h">
    <div class="accordion" id="accordion2">
    </div>
  </div>
  <div class="span6 full-h">
    <div id="chat-view">
    </div>
    <div id="chat-input" class="row">
      <div class="span5 full-h">
        <textarea id="chat-message" class="span5" name="" cols="30"></textarea>
      </div>
      <div class="span1">
        <button id="chat-post" class="btn  btn-block btn-large"><i class="icon-pencil"></i>送信<br><small>Shift+Enter</small></button>
      </div>
    </div>
  </div>
  <!--
  <div class="span3">
    <div class="row">
      <textarea readonly id="info-textarea">
      </textarea>
    </div>
    <div class="row" >
      <div class="btn-group">
        <button id="info-mode-button" class="btn btn-mini">編集モードへ</button>
        <button id="info-save-button" class="btn btn-mini btn-primary disabled" disabled> __SAVE__ </button>
      </div>
      <div id="done" class="alert alert-success" style="display: none;">
        保存しました！
      </div>
    </div>
    <div class="row">
        Task List
      <form id="taskdone-form">
      <div id="task-view">
      </div>
      </form>
    </div>
  </div>
-->
</div>

<div id="footer" class="main-window row">
  Footer
</div>
</div>
