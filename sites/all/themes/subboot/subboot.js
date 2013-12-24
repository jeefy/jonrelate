jQuery(document).ready(function($) {
  $('.page-node-add-causal-relationship #edit-field-cause-und').change(function(){
    var baseurl = window.location.protocol + '//' + window.location.hostname;
    $.get(baseurl+'/search-homologene', 'search-homologene-string='+$(this).val(), function(data){
      if(data != "null"){
        data_json = $.parseJSON(data);
        $('#edit-field-cause-homologene-und').hide();
        $('#edit-field-cause-homologene-und').before('<select id="cause-homologene-select" multiple="multiple"></select>');
        for(i=0; i<data_json.length; i++){
          $('#cause-homologene-select').append('<option>'+data_json[i].id+': '+data_json[i].name+'</option>');
        }
        $('#cause-homologene-select').append('<option>None of these</option>');
        $('#cause-homologene-select').focus();      
      }
      //$('.page-node-add-causal-relationship #edit-field-cause-und').after(data);
    });
    /*$.get('https://www.google.com/', null, function(text){
      alert($(text).find('#gbqfsa'));
    });*/
    /*$.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=homologene&term='+$(this).val()+'&retmode=xml', null, function(text){
      //var xml = $.parseXML(text);
      var id_array = $(text).find('id');
      var id_1 = $(text).find('id')[0];
      var b =4;
      //alert($(text).find('id'));
      alert(text);
    });*/
    /*$('.eutils-search').remove();
    $(this).after('<div class="eutils-search"><iframe src="http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=homologene&term='+$(this).val()+'"></iframe></div>');
    */
  });
  $('body').on('change','#cause-homologene-select', function(){
    if($(this).val() != 'None of these'){
      $('#edit-field-cause-homologene-und').val($(this).val());
    }
    $('#edit-field-cause-homologene-und').show();
    $('#edit-field-cause-homologene-und').focus();
    $(this).remove();
  });
  $('body').on('blur','#cause-homologene-select', function(){
    $('#edit-field-cause-homologene-und').show();
    $(this).remove();
  });

  //do the same for effect
  $('.page-node-add-causal-relationship #edit-field-effect-und').change(function(){
    var baseurl = window.location.protocol + '//' + window.location.hostname;
    $.get(baseurl+'/search-homologene', 'search-homologene-string='+$(this).val(), function(data){
      if(data != "null"){
        data_json = $.parseJSON(data);
        $('#edit-field-effect-homologene-und').hide();
        $('#edit-field-effect-homologene-und').before('<select id="effect-homologene-select" multiple="multiple"></select>');
        for(i=0; i<data_json.length; i++){
          $('#effect-homologene-select').append('<option>'+data_json[i].id+': '+data_json[i].name+'</option>');
        }
        $('#effect-homologene-select').append('<option>None of these</option>');
        $('#effect-homologene-select').focus();      
      }
    });
  });
  $('body').on('change','#effect-homologene-select', function(){
    if($(this).val() != 'None of these'){
      $('#edit-field-effect-homologene-und').val($(this).val());
    }
    $('#edit-field-effect-homologene-und').show();
    $('#edit-field-effect-homologene-und').focus();
    $(this).remove();
  });
  $('body').on('blur','#effect-homologene-select', function(){
    $('#edit-field-effect-homologene-und').show();
    $(this).remove();
  });
});
