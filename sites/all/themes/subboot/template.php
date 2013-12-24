<?php

function subboot_preprocess_html(&$variables,$hook) {
  $path = drupal_get_destination();
  $path_cur = current_path();
  $request_path = request_path();

  //if(preg_match('#^node/add/causal-relationship$#', $path_cur)){
  //  drupal_add_js(path_to_theme() . '/js/add-relationship.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
  //}
}
