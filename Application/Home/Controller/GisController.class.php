<?php
namespace Home\Controller;
use Think\Controller;
class GisController extends Controller {
    public function __construct(){
        parent::__construct();

        if(session("rid")==""){
            $this->error("您还没有选择要加入的房间",U('Login/index'));
        }
    }

}