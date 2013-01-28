<?php

/**
 * memberconfig actions.
 *
 * @package    OpenPNE
 * @subpackage memberconfig
 * @author     Mamoru Tejima
 */
class memberconfigActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfWebRequest $request A request object
  */
  public function executeSearch(sfWebRequest $request)
  {
    if(!preg_match("/^public_/" ,$request['key'])){
      $ar = array("status" => "error" , "message" => "Parameter must start with public_");
      return $this->renderText(json_encode($ar));
    }
    $member = $this->getUser()->getMember();
    $value = $member->getConfig($request['key']);
    if($value) 
    {
      $ar = array("status"=>"success" , "data" => array( "key" => $request['key'] , "value" => $value));
    }else{
      $ar = array("status"=>"success" , "data" => array( "key" => $request['key'] , "value" => ''));
    }
    return $this->renderText(json_encode($ar));
  }

  public function executeUpdate(sfWebRequest $request)
  {
    if(!preg_match("/^public_/" ,$request['key'])){
      $ar = array("status" => "error" , "message" => "Parameter must start with public_");
      return $this->renderText(json_encode($ar));
    }
    $member = $this->getUser()->getMember();
    $member->setConfig($request['key'], $request['value']);

    $result = array("status"=>"success" , "data" => array( "key" => $request['key'] , "value" => $request['value']));
    return $this->renderText(json_encode($result));
  }
}
