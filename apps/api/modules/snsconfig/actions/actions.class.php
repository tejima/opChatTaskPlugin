<?php

/**
 * memberconfig actions.
 *
 * @package    OpenPNE
 * @subpackage memberconfig
 * @author     Mamoru Tejima
 */
class snsconfigActions extends opJsonApiActions
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
    $value = unserialize(Doctrine::getTable('SnsConfig')->get($request['key']));
    if($value) 
    {
      $ar = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => $value));
    }else{
      $ar = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => ''));
    }
    return $this->renderText(json_encode($ar));
  }
  public function executeUpdate(sfWebRequest $request)
  {
    if(!preg_match("/^public_/" ,$request['key'])){
      $ar = array("status" => "error" , "message" => "Parameter must start with public_");
      return $this->renderText(json_encode($ar));
    }

    Doctrine::getTable('SnsConfig')->set($request['key'], serialize($request['value']));
    $result = array("status"=>"success" , "data" => array( "key" => $request['key'] , "value" => json_encode($request['value'])));
    return $this->renderText(json_encode($result));

  }
}
