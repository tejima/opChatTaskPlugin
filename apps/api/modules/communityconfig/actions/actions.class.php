<?php

/**
 * memberconfig actions.
 *
 * @package    OpenPNE
 * @subpackage memberconfig
 * @author     Mamoru Tejima
 */
class communityconfigActions extends opJsonApiActions
{
 /**
  * Executes index action
  *
  * @param sfWebRequest $request A request object
  */
  public function executeSearch(sfWebRequest $request)
  {
    $_community = Doctrine::getTable("Community")->find($request['community_id']);
    if(!$_community){
      $ar = array("status" => "error" , "message" => "Community not found. community_id:" + $request["community_id"]);
      return $this->renderText(json_encode($ar));
    }
    if(!$_community->isPrivilegeBelong($this->getUser()->getMemberId())){
      $ar = array("status" => "error" , "message" => "Not community member. community_id:" + $request["community_id"]);
      return $this->renderText(json_encode($ar));
    }
    if(!preg_match("/^public_/" ,$request['key'])){
      $ar = array("status" => "error" , "message" => "Parameter must start with public_");
      return $this->renderText(json_encode($ar));
    }

    $value = Doctrine::getTable("CommunityConfig")->retrieveValueByNameAndCommunityId($request['key'],$request['community_id']);
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
    $_community = Doctrine::getTable("Community")->find($request['community_id']);
    if(!$_community){
      $ar = array("status" => "error" , "message" => "Community not found. community_id:" + $request["community_id"]);
      return $this->renderText(json_encode($ar));
    }
    if(!$_community->isPrivilegeBelong($this->getUser()->getMemberId())){
      $ar = array("status" => "error" , "message" => "Not community member. community_id:" + $request["community_id"]);
      return $this->renderText(json_encode($ar));
    }
    if(!preg_match("/^public_/" ,$request['key'])){
      $ar = array("status" => "error" , "message" => "Parameter must start with public_");
      return $this->renderText(json_encode($ar));
    }

    $res =     Doctrine_Query::create()
    ->update('CommunityConfig cc')
    ->set('cc.value', '?' ,$request['value'])
    ->where('cc.community_id = ?', $request['community_id'])
    ->andWhere('cc.name= ?', $request['key'])
    ->execute();
    if($res){
      $result = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => $value));
    }else{
      $q = new CommunityConfig();
      $q->setName($request['key']);
      $q->setValue('');
      $q->setCommunityId($request['community_id']);   
      $q->save();
      $result = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => ""));
    }
    return $this->renderText(json_encode($result));
  }
}
