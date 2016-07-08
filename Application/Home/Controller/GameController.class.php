<?php
namespace Home\Controller;
use Home\Controller\GisController;

class GameController extends GisController {
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        if(session("?leader")) $this -> assign('leader',1);
        $m = M("game");
        $where['rid'] = session('rid');
        if(!$m -> where($where) -> find()){
            $data['rid'] = session('rid');
            $m -> add($data);
            $this -> display("index");
        }else{
            $data = $m -> where($where) -> find();
            if($data["status"] == 1){
                $this->game();
            }else{
                $this -> display("index");
            }
        }
     }
    public function checkStatus(){
        $m = M("game");
        $where['rid'] = session('rid');

        $data = $m -> where($where) -> find();
        $data["self"] = session("id");
        echo json_encode($data);
    }
    public function startGame(){
        $m = M("game");
        $data['time'] = I("get.time");
        $data['startpoint'] = I("get.startPointX").",".I("get.startPointY");
        $data["endpoint"] = I("get.endPointX").",".I("get.endPointY");
        $data["status"] = 1;
        $data["lasttime"] = $data["time"] * 60;
        if($m -> where("rid=".session('rid')) -> save($data)){

            echo U("game");
        }else{
            echo 0;
        }
    }
    public function game(){
        $chatModel = M("chat");
        session("chatTime", time()-1);
        if(session("?leader")){
            if(!session("?startTime"))session("startTime",time());
            if(session("chatTime")==session("startTime"))chatInfo(32767,"游戏即将开始,将有三分钟准备时间,请两队分开,安排战略,祝您获胜");
            $gameTime = M('game') -> where("rid=".session("rid")) -> getField("time");
            $gameTime = $gameTime * 60;
            session("gameTime",$gameTime);
        }
        $data['uid'] = session('id');
        $data["rid"] = session("rid");
        $data["team"] = M("user") -> where("id=".session("id"))->getField("team");
        session("team");
        if(!M("gamemem")->where($data)->find()){
            M("gamemem") -> add($data);
        }
        $this -> display('game');
    }
    public function chat(){
        $chatModel = M("chat");
        $where["rid"] = session(rid);
        $data = $chatModel -> where($where) -> field('uid,content,time') -> select();
        if(session("?leader")) {
            $pastTime = time() - session("startTime");
            switch ($pastTime){
                case 120:
                    chatInfo(32767,"还有一分钟准备时间");
                    break;
                case 150:
                    chatInfo(32767,"还有一分钟准备时间");
                    break;
                case 180:
                    chatInfo(32767,"游戏开始!");
                    $this->gameBegin();
                    break;

            }

        }
        foreach ($data as $k => $v){
            if($v["time"] > session("chatTime")){
                $id["id"] = $v["uid"];
                $name=M("user")->where($id)->getField('name');
                if($name == null){
                    $name = "systemInfo";
                }

                $res[] = array($v["content"],$name);
            }
        }
        session("chatTime",time());
        echo json_encode($res);
    }
    function gameBegin(){
        $m = M("game");
        $where["rid"] = session("rid");
        $data["status"] = 2;
        $m -> where($where) -> save($data);
        session("gamestart",1);
    }
    function gameCheck(){
        $m = M("gamemem");
        $posiWhere["uid"] = session("id");
        $data["position"] = I("get.x").",".I("get.y");
        $m -> where($posiWhere) -> save($data);
        $where["rid"] = session("rid");
        $allMem = $m -> where($where) -> select();
        echo json_encode($allMem);
    }
}