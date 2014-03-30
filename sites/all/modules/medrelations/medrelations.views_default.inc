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
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['label'] = 'PubMow Description';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<div id="connections-header-title">What am I looking at?</div>
<div id="connections-header-body">
This is an interactive map of the relationships between biological entities that have been demonstrated by experiments and shown in published figures. Clicking on a biological entity will show all relationships with that entity. Clicking on a line will show the published figure that is referenced. A list of all the relationships is shown below the interactive map.<br>
Use the search box below to search by name for a particular biological entity, and please add to this body of knowledge by clicking <em>Add Relationship</em> above (only for logged in users), and either publishing your figure directly to this site, or referencing the relationships demonstrated by an already published figure. Thank you!
</div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['label'] = 'No connections';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'Sorry, there are no connections that match your search, please search again.';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Cause Homologene */
  $handler->display->display_options['fields']['field_cause_homologene']['id'] = 'field_cause_homologene';
  $handler->display->display_options['fields']['field_cause_homologene']['table'] = 'field_data_field_cause_homologene';
  $handler->display->display_options['fields']['field_cause_homologene']['field'] = 'field_cause_homologene';
  $handler->display->display_options['fields']['field_cause_homologene']['label'] = '';
  $handler->display->display_options['fields']['field_cause_homologene']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_cause_homologene']['element_label_colon'] = FALSE;
  /* Field: Content: Cause Name */
  $handler->display->display_options['fields']['field_cause']['id'] = 'field_cause';
  $handler->display->display_options['fields']['field_cause']['table'] = 'field_data_field_cause';
  $handler->display->display_options['fields']['field_cause']['field'] = 'field_cause';
  $handler->display->display_options['fields']['field_cause']['label'] = '';
  $handler->display->display_options['fields']['field_cause']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_cause']['element_label_colon'] = FALSE;
  /* Field: Content: Cause category */
  $handler->display->display_options['fields']['field_cause_category']['id'] = 'field_cause_category';
  $handler->display->display_options['fields']['field_cause_category']['table'] = 'field_data_field_cause_category';
  $handler->display->display_options['fields']['field_cause_category']['field'] = 'field_cause_category';
  $handler->display->display_options['fields']['field_cause_category']['label'] = '';
  $handler->display->display_options['fields']['field_cause_category']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_cause_category']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_cause_category']['alter']['text'] = '[field_cause_category] ';
  $handler->display->display_options['fields']['field_cause_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_cause_category']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Action */
  $handler->display->display_options['fields']['field_action']['id'] = 'field_action';
  $handler->display->display_options['fields']['field_action']['table'] = 'field_data_field_action';
  $handler->display->display_options['fields']['field_action']['field'] = 'field_action';
  $handler->display->display_options['fields']['field_action']['label'] = '';
  $handler->display->display_options['fields']['field_action']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_action']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_action']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Effect Homologene */
  $handler->display->display_options['fields']['field_effect_homologene']['id'] = 'field_effect_homologene';
  $handler->display->display_options['fields']['field_effect_homologene']['table'] = 'field_data_field_effect_homologene';
  $handler->display->display_options['fields']['field_effect_homologene']['field'] = 'field_effect_homologene';
  $handler->display->display_options['fields']['field_effect_homologene']['label'] = '';
  $handler->display->display_options['fields']['field_effect_homologene']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_effect_homologene']['element_label_colon'] = FALSE;
  /* Field: Content: Effect Name */
  $handler->display->display_options['fields']['field_effect']['id'] = 'field_effect';
  $handler->display->display_options['fields']['field_effect']['table'] = 'field_data_field_effect';
  $handler->display->display_options['fields']['field_effect']['field'] = 'field_effect';
  $handler->display->display_options['fields']['field_effect']['label'] = '';
  $handler->display->display_options['fields']['field_effect']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_effect']['element_label_colon'] = FALSE;
  /* Field: Content: Effect Category */
  $handler->display->display_options['fields']['field_effect_category']['id'] = 'field_effect_category';
  $handler->display->display_options['fields']['field_effect_category']['table'] = 'field_data_field_effect_category';
  $handler->display->display_options['fields']['field_effect_category']['field'] = 'field_effect_category';
  $handler->display->display_options['fields']['field_effect_category']['label'] = '';
  $handler->display->display_options['fields']['field_effect_category']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_effect_category']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_effect_category']['alter']['text'] = '[field_effect_category] ';
  $handler->display->display_options['fields']['field_effect_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_effect_category']['type'] = 'taxonomy_term_reference_plain';
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
  /* Field: Content: Figure/Table Letter */
  $handler->display->display_options['fields']['field_figure_table_letter']['id'] = 'field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['table'] = 'field_data_field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['field'] = 'field_figure_table_letter';
  $handler->display->display_options['fields']['field_figure_table_letter']['label'] = '';
  $handler->display->display_options['fields']['field_figure_table_letter']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_figure_table_letter']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_figure_table_letter']['hide_alter_empty'] = FALSE;
  /* Field: Content: Figure/Table Number */
  $handler->display->display_options['fields']['field_figure_table_number']['id'] = 'field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['table'] = 'field_data_field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['field'] = 'field_figure_table_number';
  $handler->display->display_options['fields']['field_figure_table_number']['label'] = '';
  $handler->display->display_options['fields']['field_figure_table_number']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_figure_table_number']['alter']['text'] = '<div data-action-group="[field_action]">
[field_cause_category]<span class="field-cause-homologene">[field_cause_homologene]</span>
<a href="/connections?field_cause_value=[field_cause]&field_effect_value=[field_cause]&field_cause_homologene_value=[field_cause]&field_effect_homologene_value=[field_cause]" class="field-cause-class">[field_cause]</a>
<span class="field-action">[field_action]</span>
[field_effect_category]<span class="field-effect-homologene">[field_effect_homologene]</span>
<a href="/connections?field_cause_value=[field_effect]&field_effect_value=[field_effect]&field_cause_homologene_value=[field_effect]&field_effect_homologene_value=[field_effect]" class="field-effect-class">[field_effect]</a>
based on Pubmed ID#[field_pubmed_id] Fig.[field_figure_table_number][field_figure_table_letter].
<a href="/node/[nid]" class="view-full-entry-link">&lt;View&gt;</a> 
</div>';
  $handler->display->display_options['fields']['field_figure_table_number']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_figure_table_number']['type'] = 'number_unformatted';
  $handler->display->display_options['fields']['field_figure_table_number']['settings'] = array(
    'thousand_separator' => '',
    'prefix_suffix' => 0,
  );
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
  $handler->display->display_options['filters']['field_cause_value']['id'] = 'field_cause_value';
  $handler->display->display_options['filters']['field_cause_value']['table'] = 'field_data_field_cause';
  $handler->display->display_options['filters']['field_cause_value']['field'] = 'field_cause_value';
  $handler->display->display_options['filters']['field_cause_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_cause_value']['group'] = 2;
  $handler->display->display_options['filters']['field_cause_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_cause_value']['expose']['operator_id'] = 'field_cause_value_op';
  $handler->display->display_options['filters']['field_cause_value']['expose']['operator'] = 'field_cause_value_op';
  $handler->display->display_options['filters']['field_cause_value']['expose']['identifier'] = 'field_cause_value';
  $handler->display->display_options['filters']['field_cause_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Effect Name (field_effect) */
  $handler->display->display_options['filters']['field_effect_value']['id'] = 'field_effect_value';
  $handler->display->display_options['filters']['field_effect_value']['table'] = 'field_data_field_effect';
  $handler->display->display_options['filters']['field_effect_value']['field'] = 'field_effect_value';
  $handler->display->display_options['filters']['field_effect_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_effect_value']['group'] = 2;
  $handler->display->display_options['filters']['field_effect_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_effect_value']['expose']['operator_id'] = 'field_effect_value_op';
  $handler->display->display_options['filters']['field_effect_value']['expose']['operator'] = 'field_effect_value_op';
  $handler->display->display_options['filters']['field_effect_value']['expose']['identifier'] = 'field_effect_value';
  $handler->display->display_options['filters']['field_effect_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Cause Homologene (field_cause_homologene) */
  $handler->display->display_options['filters']['field_cause_homologene_value']['id'] = 'field_cause_homologene_value';
  $handler->display->display_options['filters']['field_cause_homologene_value']['table'] = 'field_data_field_cause_homologene';
  $handler->display->display_options['filters']['field_cause_homologene_value']['field'] = 'field_cause_homologene_value';
  $handler->display->display_options['filters']['field_cause_homologene_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_cause_homologene_value']['group'] = 2;
  $handler->display->display_options['filters']['field_cause_homologene_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_cause_homologene_value']['expose']['operator_id'] = 'field_cause_homologene_value_op';
  $handler->display->display_options['filters']['field_cause_homologene_value']['expose']['operator'] = 'field_cause_homologene_value_op';
  $handler->display->display_options['filters']['field_cause_homologene_value']['expose']['identifier'] = 'field_cause_homologene_value';
  $handler->display->display_options['filters']['field_cause_homologene_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Effect Homologene (field_effect_homologene) */
  $handler->display->display_options['filters']['field_effect_homologene_value']['id'] = 'field_effect_homologene_value';
  $handler->display->display_options['filters']['field_effect_homologene_value']['table'] = 'field_data_field_effect_homologene';
  $handler->display->display_options['filters']['field_effect_homologene_value']['field'] = 'field_effect_homologene_value';
  $handler->display->display_options['filters']['field_effect_homologene_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_effect_homologene_value']['group'] = 2;
  $handler->display->display_options['filters']['field_effect_homologene_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_effect_homologene_value']['expose']['operator_id'] = 'field_effect_homologene_value_op';
  $handler->display->display_options['filters']['field_effect_homologene_value']['expose']['operator'] = 'field_effect_homologene_value_op';
  $handler->display->display_options['filters']['field_effect_homologene_value']['expose']['identifier'] = 'field_effect_homologene_value';
  $handler->display->display_options['filters']['field_effect_homologene_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );

  /* Display: Connections */
  $handler = $view->new_display('page', 'Connections', 'page');
  $handler->display->display_options['path'] = 'connections';

  /* Display: MyMOWs */
  $handler = $view->new_display('page', 'MyMOWs', 'page_1');
  $handler->display->display_options['defaults']['access'] = FALSE;
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    3 => '3',
    2 => '2',
  );
  $handler->display->display_options['defaults']['empty'] = FALSE;
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['label'] = 'No connections of mine';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'Sorry, there are no connections that you have made that match your search. Please search again, or add a relationship by clicking "Add Relationship" above.';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Author uid */
  $handler->display->display_options['arguments']['uid']['id'] = 'uid';
  $handler->display->display_options['arguments']['uid']['table'] = 'node';
  $handler->display->display_options['arguments']['uid']['field'] = 'uid';
  $handler->display->display_options['arguments']['uid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['uid']['default_argument_type'] = 'current_user';
  $handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['path'] = 'mymows';
  $export['connections'] = $view;

  return $export;
}
