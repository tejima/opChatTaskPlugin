<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta charset="UTF-8">
    <link href="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/css/custom.css" rel="stylesheet">
    <title>ChatTask</title>
    <!-- libs -->
    <script src="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/js/jquery.js"></script>
    <script src="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/js/jquery.tmpl.js"></script>
    <script src="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/js/bootstrap.js"></script>
    <script src="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/js/shortcut.js"></script>
<?php
use_helper('Javascript');
$jsonData = array(
  'apiKey' =>
$sf_user->getMemberApiKey(),
  'apiBase' => app_url_for('api', 'homepage'),
);
echo javascript_tag('
var openpne = '.json_encode($jsonData).';
');
?>
    <script src="<?php echo sfConfig::get('op_base_url') ?>/opChatTaskPlugin/js/index.js"></script>
</head>

<body style="">
<!-- Wrap all page content here -->
<div id="wrap">

    <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand chatroom-name" href="#"></a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav dropdown-menu-community visible-xs">
                </ul>
                <ul class="nav navbar-nav navbar-right hidden-xs">
                    <li>
                        <a href="<?php echo sfConfig::get('op_base_url') ?>"><?php echo $op_config['sns_name'] ?></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Begin page content -->
    <div class="container">
        <div class="row resizeheight-full">
            <div class="col-sm-4 col-md-3 col-lg-3 bg-success col-left resizeheight-full chatroom-list hidden-xs">
                <div class="panel-group community-list" id="accordion"></div>
            </div>
            <div class="col-sm-8 col-md-7 col-lg-7">
                <div class="resizeheight-middle chatview"></div>

                <div class="chatform">
                    <form class="form" role="form">
                        <textarea class="chatform-textarea form-control" rows="1"></textarea>
                        <input id="chatform-post" type="submit" value="送信（Shift＋Enterで送信）" class="btn btn-success btn-sm btn-block" data-loading-text="送信中.....">
                    </form>
                </div>
            </div>
            <div class="col-md-2 col-lg-2 bg-success resizeheight-full hidden-sm hidden-xs col-right">
                <p>COL-RIGHT</p>
            </div>
        </div>
    </div>
</div>

</body>
</html>