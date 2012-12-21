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
    $memberId = $this->getUser()->getMemberId();
//    $value = Doctrine::getTable("MemberConfig")->retrieveValueByNameAndCommunityId($request['key'],$request['member_id']);
    if($value) 
    {
      $ar = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => $value));
      return $this->renderText(json_encode($ar));
    }else{

      $q = new CommunityConfig();
      $q->setName('memo');
      $q->setValue('');
      $q->setCommunityId($request['community_id']);   
      $q->save();
      $ar = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => ''));

      return $this->renderText(json_encode($ar));
    }
  }

  public function executeUpdate(sfWebRequest $request)
  {

    $res =     Doctrine_Query::create()
    ->update('CommunityConfig cc')
    ->set('cc.value', '?' ,$request['value'])
    ->where('cc.community_id = ?', $request['community_id'])
    ->andWhere('cc.name= ?', $request['key'])
    ->execute();
    if($res){
      $result = array("status"=>"success" , "data" => array( "community_id" => $request['community_id'] , "key" => $request['key'] , "value" => $value));
    }else{
      $result = array("status" => "error");      
    }
    return $this->renderText(json_encode($result));
  }
}
