<?php

function chatInfo($uid,$content){
    $chat = M("chat");
    $info["uid"] = $uid;
    $info["content"] = $content;
    $info["time"] = time();
    $info["rid"] = session("rid");

    $chat -> add($info);
}
?>