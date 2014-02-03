<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <link href="opChatTaskPlugin/css/bootstrap.css" rel="stylesheet">
    <link href="opChatTaskPlugin/css/custom.css" rel="stylesheet">
    <title>ChatTask</title>
    <!-- libs -->
    <script src="opChatTaskPlugin/js/jquery.js"></script>
    <script src="opChatTaskPlugin/js/jquery.tmpl.js"></script>
    <script src="opChatTaskPlugin/js/bootstrap.js"></script>
    <script src="opChatTaskPlugin/js/shortcut.js"></script>
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
    <script src="opChatTaskPlugin/js/index.js"></script>
</head>

<body style="">
<!-- Wrap all page content here -->
<div id="wrap">

    <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a id="chatroom-name" class="navbar-brand" href="#"></a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="#">OpenPNE</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Begin page content -->
    <div class="container">
        <div class="row resizeheight-full">
            <div class="col-sm-4 col-md-3 col-lg-3 bg-success col-left resizeheight-full chatroom-list">
                <div class="panel-group community-list" id="accordion"></div>
            </div>
            <div class="col-sm-8 col-md-7 col-lg-7">
                <div class="resizeheight-middle chatview"></div>

                <div class="chatform">
                    <form class="form" role="form">
                        <textarea id="chatform-textarea" class="form-control" rows="4"></textarea>
                        <button id="chatform-post" type="submit" class="btn btn-success btn-sm btn-block">送信（Shift＋Enterで送信）</button>
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