<?php
/**
 * @file
 * medrelations.features.inc
 */

/**
 * Implements hook_views_api().
 */
function medrelations_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function medrelations_node_info() {
  $items = array(
    'causal_relationship' => array(
      'name' => t('Causal Relationship'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
