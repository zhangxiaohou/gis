<?php
namespace Home\Controller;
use Home\Controller\GisController;

class GameController extends GisController {
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        if(session("?leader")) $this -> assign('leader',1);
        $this -> display("index");
     }
}