<?php

function subboot_preprocess_html(&$variables,$hook) {
  $path = drupal_get_destination();
  $path_cur = current_path();
  $request_path = request_path();

  if(preg_match('#^node/add/causal-relationship$#', $path_cur) ||
     preg_match('#^node/[1-9][0-9]*/edit$#', $path_cur)){
    drupal_add_js(path_to_theme() . '/js/add-relationship.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    drupal_add_css(path_to_theme() . '/css/add-relationship.css', array('weight' => CSS_THEME));
  }
  elseif(preg_match('#^connections$#', $path_cur) || preg_match('#^mymows$#', $path_cur)){
    drupal_add_css(path_to_theme() . '/css/connections.css', array('weight' => CSS_THEME));
    drupal_add_js(path_to_theme() . '/cytoscape/js/min/json2.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    drupal_add_js(path_to_theme() . '/cytoscape/js/min/AC_OETags.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    drupal_add_js(path_to_theme() . '/cytoscape/build/cytoscape.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    drupal_add_js(path_to_theme() . '/js/connections.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
  }
  elseif(preg_match('#^cytoscape$#', $path_cur)){
    drupal_add_css(path_to_theme() . '/cytoscape/cytoscape.css', array('weight' => CSS_THEME));
    drupal_add_js(path_to_theme() . '/cytoscape/js/min/json2.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    drupal_add_js(path_to_theme() . '/cytoscape/js/min/AC_OETags.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
    //drupal_add_js(path_to_theme() . '/cytoscape/build/arbor.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));   
    //drupal_add_js(path_to_theme() . '/cytoscape/build/arbor-tween.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));   
    drupal_add_js(path_to_theme() . '/cytoscape/build/cytoscape.min.js',array('type' => 'file', 'scope' => 'footer', 'weight' => 100, 'group' => JS_THEME));      
  }
}
