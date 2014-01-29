<?php
/**
 * @file
 * medrelations.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function medrelations_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'connections';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Connections';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Connections';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Search';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'field_action',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Cause Name */
  $handler->display->display_options['fields']['field_cause']['id'] = 'field_cause';
  $handler->display->display_options['fields']['field_cause']['table'] = 'field_data_field_cause';
  $handler->display->display_options['fields']['field_cause']['field'] = 'field_cause';
  $handler->display->display_options['fields']['field_cause']['label'] = '';
  $handler->display->display_options['fields']['field_cause']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_cause']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_cause']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Action */
  $handler->display->display_options['fields']['field_action']['id'] = 'field_action';
  $handler->display->display_options['fields']['field_action']['table'] = 'field_data_field_action';
  $handler->display->display_options['fields']['field_action']['field'] = 'field_action';
  $handler->display->display_options['fields']['field_action']['label'] = '';
  $handler->display->display_options['fields']['field_action']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_action']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_action']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Effect Name */
  $handler->display->display_options['fields']['field_effect']['id'] = 'field_effect';
  $handler->display->display_options['fields']['field_effect']['table'] = 'field_data_field_effect';
  $handler->display->display_options['fields']['field_effect']['field'] = 'field_effect';
  $handler->display->display_options['fields']['field_effect']['label'] = '';
  $handler->display->display_options['fields']['field_effect']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_effect']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_effect']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Pubmed ID */
  $handler->display->display_options['fields']['field_pubmed_id']['id'] = 'field_pubmed_id';
  $handler->display->display_options['fields']['field_pubmed_id']['table'] = 'field_data_field_pubmed_id';
  $handler->display->display_options['fields']['field_pubmed_id']['field'] = 'field_pubmed_id';
  $handler->display->display_options['fields']['field_pubmed_id']['label'] = '';
  $handler->display->display_options['fields']['field_pubmed_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_pubmed_id']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_pubmed_id']['alter']['text'] = '<a href="http://www.ncbi.nlm.nih.gov/pubmed/[field_pubmed_id]" target="_blank">[field_pubmed_id]</a>';
  $handler->display->display_options['fields']['field_pubmed_id']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_pubmed_id']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 0,
  );
  /* Field: Content: Figure/Table Number */
  $handler->display->display_options['fields']['field_figure_table_number']['id'] = 'field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['table'] = 'field_data_field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['field'] = 'field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['label'] = '';
  $handler->display->display_options['fields']['field_figure_table_number']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_figure_table_number']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_figure_table_number']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 0,
  );
  /* Field: Content: Figure/Table Letter */
  $handler->display->display_options['fields']['field_figure_table_letter']['id'] = 'field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['table'] = 'field_data_field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['field'] = 'field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['label'] = '';
  $handler->display->display_options['fields']['field_figure_table_letter']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_figure_table_letter']['alter']['text'] = '<div data-action-group="[field_action]">
<a href="/connections?field_cause_tid=[field_cause]&field_effect_tid=[field_cause]" class="field-cause-class">[field_cause]</a>
<span class="field-action">[field_action]</span>
<a href="/connections?field_cause_tid=[field_effect]&field_effect_tid=[field_effect]" class="field-effect-class">[field_effect]</a>
based on Pubmed ID#[field_pubmed_id] Fig.[field_figure_table_number][field_figure_table_letter].
<a href="/node/[nid]" class="view-full-entry-link">&lt;View&gt;</a> 
</div>';
  $handler->display->display_options['fields']['field_figure_table_letter']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  $handler->display->display_options['filter_groups']['groups'] = array(
    1 => 'AND',
    2 => 'OR',
  );
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'causal_relationship' => 'causal_relationship',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Cause Name (field_cause) */
  $handler->display->display_options['filters']['field_cause_tid']['id'] = 'field_cause_tid';
  $handler->display->display_options['filters']['field_cause_tid']['table'] = 'field_data_field_cause';
  $handler->display->display_options['filters']['field_cause_tid']['field'] = 'field_cause_tid';
  $handler->display->display_options['filters']['field_cause_tid']['value'] = '';
  $handler->display->display_options['filters']['field_cause_tid']['group'] = 2;
  $handler->display->display_options['filters']['field_cause_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_cause_tid']['expose']['operator_id'] = 'field_cause_tid_op';
  $handler->display->display_options['filters']['field_cause_tid']['expose']['operator'] = 'field_cause_tid_op';
  $handler->display->display_options['filters']['field_cause_tid']['expose']['identifier'] = 'field_cause_tid';
  $handler->display->display_options['filters']['field_cause_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_cause_tid']['vocabulary'] = 'from_and_to_terms';
  /* Filter criterion: Content: Effect Name (field_effect) */
  $handler->display->display_options['filters']['field_effect_tid']['id'] = 'field_effect_tid';
  $handler->display->display_options['filters']['field_effect_tid']['table'] = 'field_data_field_effect';
  $handler->display->display_options['filters']['field_effect_tid']['field'] = 'field_effect_tid';
  $handler->display->display_options['filters']['field_effect_tid']['value'] = '';
  $handler->display->display_options['filters']['field_effect_tid']['group'] = 2;
  $handler->display->display_options['filters']['field_effect_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_effect_tid']['expose']['operator_id'] = 'field_effect_tid_op';
  $handler->display->display_options['filters']['field_effect_tid']['expose']['label'] = 'Effect';
  $handler->display->display_options['filters']['field_effect_tid']['expose']['operator'] = 'field_effect_tid_op';
  $handler->display->display_options['filters']['field_effect_tid']['expose']['identifier'] = 'field_effect_tid';
  $handler->display->display_options['filters']['field_effect_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_effect_tid']['vocabulary'] = 'from_and_to_terms';

  /* Display: Connections */
  $handler = $view->new_display('page', 'Connections', 'page');
  $handler->display->display_options['path'] = 'connections';
  $export['connections'] = $view;

  return $export;
}
