<?php

/**
 * memberconfig actions.
 *
 * @package    OpenPNE
 * @subpackage memberconfig
 * @author     Your name here
 */
class memberconfigActions extends opJsonApiActions
{
 /**
  * Executes index action
  *
  * @param sfWebRequest $request A request object
  */
  public function executeSearch(sfWebRequest $request)
  {
  	$result = array("status" => "success");
  	$this->renderText(json_encode($result));
  }
  public function executeUpdate(sfWebRequest $request)
  {
  	$result = array("status" => "success");
  	$this->renderText(json_encode($result));    
  }

}
