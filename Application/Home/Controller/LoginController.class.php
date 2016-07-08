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
            }elseif($data['status'] > 0) {
                echo 1;
            }else{
                $newMem['rid'] = $rid;
                $newMem['name'] = $name;
                $model -> add($newMem);
                session('rid',I("post.roomId"));
                $where['name'] = $name;
                $data = $model -> where($where) -> find();
                session('id',$data['id']);
                echo U("index/index");
            }
        }else{
            $newMem['rid'] = $rid;
            $newMem['name'] = $name;
            $newMem['leader'] = 1;
            $model -> add($newMem);
            $where['name'] = $name;
            $data = $model -> where($where) -> find();
            session('id',$data['id']);
            session('rid',I("post.roomId"));
            session('leader',1);
            echo U("index/index");
        }
    }
    function reLogin(){
        $rid = I('post.roomId');
        $name = I('post.name');

        $model = M('user');

        $where['rid'] = $rid;
        if($data = $model -> where($where) -> select()){
            $flag = false;
            foreach ($data as $k => $v){
                if($v["name"] == $name){
                    $flag = true;
                    session('id',$v['id']);
                    session('rid',$rid);
                    break;
                }
            }
            if($flag){
                echo U("index/index");

            }else{
                echo 0;
            }
        }else{
            echo 1;
        }
    }
    function chat(){

    }
}