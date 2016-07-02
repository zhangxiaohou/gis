<?php
return array(
    'TMPL_PARSE_STRING'  =>array(
        '__PUBLIC__' => 'Application/Home/View/Public', // 更改默认的/Public 替换规则
        '__JS__'     => '/gis/Application/Home/View/Public/js', // 增加新的JS类库路径替换规则
        '__CSS__'    => '/gis/Application/Home/View/Public/css', // 增加新的CSS类库路径替换规则
        '__IMG__'    => '/gis/Application/Home/View/Public/img',
        '__UPLOAD__' => '/Uploads', // 增加新的上传路径替换规则
    )
);