jQuery(document).ready(function($){

  //add cytoscape web functionality
  $('.view-connections').after('<br><br><div id="working-model-head">Working model<hr></div><div id="cytoscapeweb"></div><div id="note"><p>Click nodes or edges.</p></div>');
  var div_id = "cytoscapeweb";
  
  // create a network model object
  var network_json = {
          // you need to specify a data schema for custom attributes!
          dataSchema: {
              nodes: [ { name: "label", type: "string" }
                  ],
              edges: [ { name: "label", type: "string" },
                       { name: "directed", type: "boolean", defValue: true},
                       //{ name: "targetArrowShape", type: "string", defValue: 'T'},
              ]
          },
          // NOTE the custom attributes on nodes and edges
          data: {
              nodes: [],
              edges: []
          }
  };

  //add nodes for each term, if they don't already exist.
  function insertNode(term){
    var term_exists = false;
    for(var i=0; i<network_json.data.nodes.length; i++){
      if(term == network_json.data.nodes[i].label){
        term_exists = true;
        break;
      }
    }
    if(!term_exists){
      network_json.data.nodes.push({id: term, label: term});
    }
  }
  //add nodes and edges for each connection
  $('.views-row').each(function(index, value){
    var cause_term = $(this).find('.field-cause-class').text();
    var effect_term = $(this).find('.field-effect-class').text();
    if(cause_term != "" && effect_term != ""){
      insertNode(cause_term);
      insertNode(effect_term);

      //add edge no matter what
      var relationship = $(this).find('.field-action').text();
      var edge_id = cause_term+'_'+relationship+'_'+effect_term+'_'+index;
      var edge_label = cause_term+' '+relationship+' '+effect_term;
      network_json.data.edges.push({id: edge_id, target: effect_term, source: cause_term, label: edge_label});            
    }
  });
  
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
      
      function handle_click(event) {
           var target = event.target;
           
           clear();
           print("event.group = " + event.group);
           for (var i in target.data) {
              var variable_name = i;
              var variable_value = target.data[i];
              print( "event.target.data." + variable_name + " = " + variable_value );
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
  };
  
  vis.draw(draw_options);




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
