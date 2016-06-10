<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $model = M("user");
        $name = $model -> select();

        $this -> display("index");
     }
}