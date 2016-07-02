<?php
namespace Home\Controller;
use Home\Controller\GisController;

class IndexController extends GisController {
    public function __construct(){
        parent::__construct();
    }

    public function index(){
        $this -> display("index");
     }
}