jQuery(document).ready(function($){
  $('#connections-header-body').hide();
  $('#connections-header-title').css('cursor', 'pointer');
  $('#connections-header-title').toggle(function(){
    $('#connections-header-body').slideDown();
  }, function(){
    $('#connections-header-body').slideUp();
  });

  //add cytoscape web functionality
  $('.view-connections .view-filters').after('<div id="cytoscapeweb"></div><div id="note"></div>');
  //$('.view-connections .view-filters').after('<br><br><div id="working-model-head">Working model<hr></div>');
  var div_id = "cytoscapeweb";
  
  // create a network model object
  var network_json = {
          // you need to specify a data schema for custom attributes!
          dataSchema: {
              nodes: [ { name: "label", type: "string" },
                       { name: "link", type: "string"},
                       { name: "type", type: "string"},
                  ],
              edges: [ { name: "label", type: "string" },
                       //{ name: "directed", type: "boolean", defValue: true},
                       { name: "relType", type: "string"},
                       { name: "link", type: "string"},
              ]
          },
          // NOTE the custom attributes on nodes and edges
          data: {
              nodes: [],
              edges: []
          }
  };

  //add cytoscape nodes for each term, if they don't already exist.
  function insertNode(term, link, type){
    var term_exists = false;
    for(var i=0; i<network_json.data.nodes.length; i++){
      if(term == network_json.data.nodes[i].label){
        term_exists = true;
        break;
      }
    }
    if(!term_exists){
      network_json.data.nodes.push({id: term, label: term, link: link, type: type});
    }
  }
  //add nodes and edges for each connection
  $('.views-row').each(function(index, value){
    var cause_term = $(this).find('.field-cause-class').text();
    var cause_link = $(this).find('.field-cause-class').attr('href');
    var effect_term = $(this).find('.field-effect-class').text();
    var effect_link = $(this).find('.field-effect-class').attr('href');
    if(cause_term != "" && effect_term != ""){
      insertNode(cause_term, cause_link, "gene");
      insertNode(effect_term, effect_link, "gene");

      //add edge no matter what
      var relationship = $(this).find('.field-action').text();
      var edge_id = cause_term+'_'+relationship+'_'+effect_term+'_'+index;
      var edge_label = cause_term+' '+relationship+' '+effect_term;
      var edge_link = $(this).find('.view-full-entry-link').attr('href');
      //add the relationship to the network_json object
      network_json.data.edges.push({id: edge_id, target: effect_term, source: cause_term, label: edge_label, directed: true, relType: relationship.toLowerCase(), link: edge_link});
    }
  });
var arrowShapeMapper = {
  attrName: "relType",
  entries: [ { attrValue: "increases", value: "ARROW" },
             { attrValue: "decreases", value: "T" }]
};
var edgeColorMapper = {
  attrName: "relType",
  entries: [ { attrValue: "increases", value: "#00274c" },
             { attrValue: "decreases", value: "#ffcb05" }]
};
var nodeShapeMapper = {
  attrName: "type",
  entries: [{attrValue: "gene", value: "ELLIPSE"}]
}
  var visual_style = {
    nodes: {
      opacity: 0.5,
      shape: {discreteMapper: nodeShapeMapper} ,
    },
    edges: {
      targetArrowShape: {discreteMapper: arrowShapeMapper} ,
      color: {discreteMapper: edgeColorMapper} ,
      width: 2,
      opacity: 0.5,
    }
  };


  // initialization options
  var options = {
      swfPath: "/sites/all/themes/subboot/cytoscape/swf/CytoscapeWeb",
      flashInstallerPath: "/sites/all/themes/subboot/cytoscape/swf/playerProductInstall"
  };
  
  var vis = new org.cytoscapeweb.Visualization(div_id, options);
  // callback when Cytoscape Web has finished drawing
  vis.ready(function() {
  
      // add a listener for when nodes and edges are clicked
      vis.addListener("click", "nodes", function(event) {
          handle_click(event);
      })
      .addListener("click", "edges", function(event) {
          handle_click(event);
      });
      //when clicking on a node or edge, send the user to the link referenced in the entity
      function handle_click(event) {
        var target = event.target;
        if(target.data['link']){
          window.location.href = target.data['link'];
        }
        else{
          clear();
          print("event.group = " + event.group);
          for (var i in target.data) {
            var variable_name = i;
            var variable_value = target.data[i];
            print( "event.target.data." + variable_name + " = " + variable_value );
          }          
        }
      }
      
      function clear() {
          document.getElementById("note").innerHTML = "";
      }
  
      function print(msg) {
          document.getElementById("note").innerHTML += "<p>" + msg + "</p>";
      }
  });

  // draw options
  var draw_options = {
      // your data goes here
      network: network_json,
      // hide pan zoom
      //panZoomControlVisible: false 
      visualStyle: visual_style,
  };
  
  vis.draw(draw_options);
  
  //below did not work to resize for some reason...
  /*var scale;
  vis.addListener("zoom", function(evt) {
      scale = evt.value;
  });
  vis.zoomToFit();*/





  //this function is for getting the variables sent in the url. Used below to get the search term.
  function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
  }

  //group the results based on if they cause or are caused by the search term
  $('.view-connections .view-content').before('<div class="connections-from-addition"></div>');
  var field_effect_tid = getUrlVars()["field_effect_tid"];
  if(field_effect_tid != null){
    $('.views-row').each(function(index){
      var action = $(this).find(".field-action").text();
      var effect = $(this).find(".field-effect-class").text();
      if(effect.toLowerCase() == field_effect_tid.toLowerCase()){
        if(action == 'Decreases'){
          var decreased_action = $('.connections-from-addition .action-decreased');
          if(!(decreased_action.length)){
            $('.connections-from-addition').append('<h3 class="action-decreased">Is Decreased by</h3>');
          }
          $('.connections-from-addition').append($(this));
        }        
        if(action == 'Increases'){
          var decreased_action = $('.connections-from-addition .action-increased');
          if(!(decreased_action.length)){
            $('.connections-from-addition').append('<h3 class="action-increased">Is Increased by</h3>');
          }
          $('.connections-from-addition').append($(this));
        }        
        if(action == "Doesn't change"){
          var decreased_action = $('.connections-from-addition .action-none');
          if(!(decreased_action.length)){
            $('.connections-from-addition').append('<h3 class="action-none">Is not changed by</h3>');
          }
          $('.connections-from-addition').append($(this));
        }        
      }
    });
  }

  //hide effect search box and autofill with cause box when submitting search form
  $('#edit-field-effect-tid-wrapper').hide();
  //$('.view-connections .view-content').css('float','right');
  $('#views-exposed-form-connections-page').submit(function(){
    $('#edit-field-effect-tid').val($('#edit-field-cause-tid').val());
  });


});
