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
  function saveState(json){
    localStorage['cytojs_state'] = JSON.stringify(json);
    return json;
  }
  function loadState(){
    console.log('time to load');
    if('cytojs_state' in localStorage){
      console.log('found old state!');
      return JSON.parse(localStorage['cytojs_state']);
    }
    // nothing else to return! DERP
    console.log('no old state!');
    return false;
  }


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
      network_json.data.nodes.push({data:{id: term, label: term, link: link, type: type}});
    }
  }
  function insertEdge(edge_term, cause_term, effect_term, edge_link, relationship){
    var term_exists = false;
    for(var i=0; i<network_json.data.edges.length; i++){
      if(edge_term == network_json.data.edges[i].label){
        term_exists = true;
        break;
      }
    }
    if(!term_exists){
      network_json.data.edges.push({data: {id: edge_term, label: edge_term, source: cause_term, target: effect_term, directed: true, relType: relationship.toLowerCase(), link: edge_link}});
    }
  }
  //add nodes and edges for each connection
  $('.views-row').each(function(index, value){
    var cause_name = $(this).find('.field-cause-class').text() ? $(this).find('.field-cause-class').text() : '';
    var effect_name = $(this).find('.field-effect-class').text() ? $(this).find('.field-effect-class').text() : '';
    var cause_homologene = $(this).find('.field-cause-homologene').text() ? $(this).find('.field-cause-homologene').text() : '';
    var effect_homologene = $(this).find('.field-effect-homologene').text() ? $(this).find('.field-effect-homologene').text() : '';
    var cause_term = cause_homologene ? cause_homologene : cause_name;
    var effect_term = effect_homologene ? effect_homologene : effect_name;
    var cause_link = $(this).find('.field-cause-homologene-class').attr('href') ? $(this).find('.field-cause-homologene-class').attr('href') : $(this).find('.field-cause-class').attr('href');
    var effect_link = $(this).find('.field-effect-homologene-class').attr('href') ? $(this).find('.field-effect-homologene-class').attr('href') : $(this).find('.field-effect-class').attr('href');
    if(cause_term != "" && effect_term != ""){
      insertNode(cause_term, cause_link, "gene");
      insertNode(effect_term, effect_link, "gene");

      //add edge no matter what
      var relationship = $(this).find('.field-action').text();

      var edge_term = cause_term+' '+relationship+' '+effect_term;
      //var edge_id = cause_term+'_'+relationship+'_'+effect_term+'_'+index;
      //var edge_label = cause_term+' '+relationship+' '+effect_term;
      //var edge_link = $(this).find('.view-full-entry-link').attr('href');
      var cause_name_if = cause_homologene ? '' : cause_name;
      var effect_name_if = effect_homologene ? '' : effect_name;
      var edge_link = "/connections?field_cause_value_2="+cause_name_if+"&field_cause_homologene_value_2="+cause_homologene+"&field_effect_value_2="+effect_name_if+"&field_effect_homologene_value_2="+effect_homologene+"&field_action_tid="+relationship;
      //add the relationship to the network_json object
      //network_json.data.edges.push({id: edge_id, target: effect_term, source: cause_term, label: edge_label, directed: true, relType: relationship.toLowerCase(), link: edge_link});
      insertEdge(edge_term, cause_term, effect_term, edge_link, relationship);
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
               { attrValue: "decreases", value: "#750300" }]
               //{ attrValue: "decreases", value: "#ffcb05" }]
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

var oldState = loadState();
$('#' + div_id).cytoscape({
  style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'font-size': 10,
          'content': 'data(label)',
          'text-valign': 'center',
          'color': 'white',
          'text-outline-width': 2,
          'text-outline-color': '#888',
          'min-zoomed-font-size': 8,
//          'width': 'mapData(score, 0, 1, 20, 50)',
//          'height': 'mapData(score, 0, 1, 20, 50)'
        })
      .selector('node:selected')
        .css({
          'background-color': '#000',
          'text-outline-color': '#000'
        })
      .selector('edge')
        .css({
          'target-arrow-shape': 'triangle',
          'width': 2,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd'
        })
      .selector('edge[relType = "decreases"]')
        .css({
          'target-arrow-shape': 'tee',
          'line-color': '#FF4444',
          'target-arrow-color': '#FF4444'
        })
      .selector('edge[relType = "increases"]')
        .css({
          'line-color': '#3333AD',
          'target-arrow-color': '#3333AD'
        })
    .selector('edge:selected'),
  layout: {
/* Breadth First */
/*
    name: 'breadthfirst',

    fit: true, // whether to fit the viewport to the graph
    directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: true, // put depths in concentric circles if true, put depths top down if false
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: false, // prevents node overlap, may overflow boundingBox if not enough space
    roots: undefined, // the roots of the trees
    maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
    animate: true, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    ready: undefined, // callback on layoutready
    stop: undefined
*/

/* COSE */
  
    name:"cose",
    animate: false,
    //debug: true


/* Cola */
/*
  name: 'cola',

    animate: true, // whether to show the layout as it's running
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    fit: true, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }

    // layout event callbacks
    ready: function(){}, // on layoutready
    stop: function(){
      console.log('layout over!');
      saveState(this.json());
    }, // on layoutstop

    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 10; }, // extra spacing around nodes
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }

    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap

    // infinite layout options
    infinite: true // overrides all other options for a forces-all-the-time mode
*/

/* springy */
/*
    name: 'springy',

    animate: true, // whether to show the layout as it's running
    maxSimulationTime: 1000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    fit: true, // whether to fit the viewport to the graph
    padding: 30, // padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    random: false, // whether to use random initial positions
    infinite: false, // overrides all other options for a forces-all-the-time mode
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop

    // springy forces
    stiffness: 400,
    repulsion: 400,
    damping: 0.5
*/

  },
  // on graph initial layout done (could be async depending on layout...)
  ready: function(){
    var cy = this;
    this.on('tap', 'node', function(){
      window.location.href = this.data('link');
    });
    this.on('tap', 'edge', function(){
      window.location.href = this.data('link');
    });
    this.on('tapend', 'node', function(){
      saveState(cy.json());
    });
    this.on('tapend', 'edge', function(){
      saveState(cy.json());
    });
    this.on('ready', function(){
      if(oldState){
        this.add(oldState['elements']);
      } else {
        this.load(network_json['data']);
      }
    })
  }
});


  /*vis.ready(function() {
  
      // add a listener for when nodes and edges are clicked
      vis.on("click", "nodes", function(event) {
          handle_click(event);
      })
      .on("click", "edges", function(event) {
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
  };*/
  
  //vis.draw(draw_options);
  //vis.load(network_json.data);
  
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
  /*$('.view-connections .view-content').before('<div class="connections-from-addition"></div>');
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
  }*/

  //hide effect search box and autofill with cause box when submitting search form
  $('#edit-field-effect-value-wrapper').hide();
  $('#edit-field-cause-homologene-value-wrapper').hide();
  $('#edit-field-effect-homologene-value-wrapper').hide();
  $('#edit-field-cause-value-1-wrapper').hide();
  $('#edit-field-effect-value-1-wrapper').hide();
  $('#edit-field-cause-homologene-value-1-wrapper').hide();
  $('#edit-field-effect-homologene-value-1-wrapper').hide();
  $('#edit-field-cause-value-2-wrapper').hide();
  $('#edit-field-effect-value-2-wrapper').hide();
  $('#edit-field-cause-homologene-value-2-wrapper').hide();
  $('#edit-field-effect-homologene-value-2-wrapper').hide();
  $('#edit-field-action-tid-wrapper').hide();
  //$('.view-connections .view-content').css('float','right');
  $('#views-exposed-form-connections-page').submit(function(){
    $('#edit-field-effect-value').val($('#edit-field-cause-value').val());
    $('#edit-field-cause-homologene-value').val($('#edit-field-cause-value').val());
    $('#edit-field-effect-homologene-value').val($('#edit-field-cause-value').val());
  });


});
