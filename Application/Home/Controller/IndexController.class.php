<?php
namespace Home\Controller;
use Home\Controller\GisController;

class IndexController extends GisController {
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        $m = M("user");
        $where['rid'] = session('rid');
        $user = $m -> where($where) -> select();
        foreach ($user as $k => $v){
            if($v['team'] == 1){
                $red[] = $v;
            }elseif($v['team'] == 2){
                $blue[] = $v;
            }else{
                $oth[] = $v;
            }
            if($v['leader'] == 1){
                $leader = $v;
            }
        }
        $this -> assign('leader',$leader);
        $this -> assign('red',$red);
        $this -> assign('blue',$blue);
        $this -> assign('oth',$oth);
        $this -> display("index");
     }
    public function joinTeam(){
        $m = M("user");
        $team = I("get.team");
        $data['team'] = $team;
        $data['id'] = session('id');
        $m -> save($data);
    }
    public function refreshTeam(){
        $m = M("user");
        $data = $m -> where("rid=".session('rid')) -> select();
        if($data[0]['status'] == 1){
            $data = 1;
        }
        echo json_encode($data);
    }
    public function start(){
        $m = M("user");
        $data = $m -> where("rid=".session('rid')) -> select();
        $r = 0;
        $b = 0;
        $res[8] = 1;
        foreach($data as $k => $v){
            if($v['team'] == 0){
                $res['info'] = "还有成员没有选择队伍,无法开始";
                $res[8] = 0;
            }elseif($v['team'] == 1){
                $r ++;
            }else{
                $b ++;
            }
        }
        if($res[8] != 0) {
            if ($r != $b) {
                $res[8] = 0;
                $res['info'] = "两队人数不等,无法开始";
            }
        }
        if($res[8] != 0){
            foreach($data as $k => &$v) {
                $v['status'] = 1;
                $m -> save($v);
            }

        }
        echo json_encode($res);
    }
}