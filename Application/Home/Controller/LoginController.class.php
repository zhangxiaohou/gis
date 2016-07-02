<?php
namespace Home\Controller;
use Think\Controller;

class LoginController extends Controller {

    public function index(){
        if(session('rid')){
            $this -> success('您已登录,将自动跳转',U('Index/index'),3);
        }else{

            $this -> display("login");
        }

     }
    public function loginIn(){
        $rid = I('post.roomId');
        $name = I('post.name');

        $model = M('user');

        $where['rid'] = $rid;
        if($data = $model -> where($where) -> find()){
            $checkName['rid'] = $rid;
            $checkName['name'] = $name;
            if($model -> where($checkName) -> find()){
                echo 0;
            }else{
                $newMem['rid'] = $rid;
                $newMem['name'] = $name;
                $model -> add($newMem);
                session('rid',I("post.roomId"));
                echo U("index/index");
            }
        }else{
            $newMem['rid'] = $rid;
            $newMem['name'] = $name;
            $model -> add($newMem);
            session('rid',I("post.roomId"));
            echo U("index/index");
        }
    }
}