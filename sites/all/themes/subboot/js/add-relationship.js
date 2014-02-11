jQuery(document).ready(function($) {
  $('#edit-field-cause-und, #edit-field-effect-und').change(function(){
    if($(this).val().length > 2){
      if($(this).attr('id') == 'edit-field-cause-und'){
        var causeOrEffect = 'cause';
      }
      else{
        var causeOrEffect = 'effect';
      }
      var baseurl = window.location.protocol + '//' + window.location.hostname;
      $('.'+causeOrEffect+'-homologene-searching').remove();
      
      //search first for the specific thing
      var db_selected = $('#edit-field-'+causeOrEffect+'-category-und option:selected').text().toLowerCase();
      var db_search = 'homologene';
      if(db_selected == 'homologene' ||
         db_selected == 'gene' ||
         db_selected == 'protein' ||
         db_selected == 'small molecule' ||
         db_selected == 'transcript'){
        switch (db_selected){
          case 'homologene': db_search="homologene";break;
          case 'gene': db_search="gene";break;
          case 'protein': db_search="protein";break;
          case 'small molecule': db_search="pcsubstance";break;
          case 'transcript': db_search="nuccore";break;
        }
        $('#edit-field-'+causeOrEffect+'-und').after('<p class="'+causeOrEffect+'-searching">Searching NCBI '+db_search+' database...</p>');
        $.get(baseurl+'/search-ncbi', 'search-ncbi-string='+$(this).val()+'&database='+db_search, function(data){
          $('.'+causeOrEffect+'-searching').remove();
          $('#'+causeOrEffect+'-select').remove();
          if(data != "null" && data != ""){
            data_json = $.parseJSON(data);
            $('#edit-field-'+causeOrEffect+'-und').after('<br><select id="'+causeOrEffect+'-select" multiple="multiple"></select>');
            for(i=0; i<data_json.length; i++){
              $('#'+causeOrEffect+'-select').append('<option value="'+data_json[i].id+'">'+data_json[i].id+data_json[i].name+'</option>');
            }
            $('#'+causeOrEffect+'-select').append('<option>None of these</option>');            
            $('#'+causeOrEffect+'-select').focus();      
          }
          else{
            $('#edit-field-'+causeOrEffect+'-und').after('<p class="'+causeOrEffect+'-searching"><em>Sorry, no results found in NCBI '+db_search+' database</em></p>');            
          }
        });

      }
      
      //next, search for the homologene
      $('#edit-field-'+causeOrEffect+'-homologene-und').after('<p class="'+causeOrEffect+'-homologene-searching">Searching NCBI homologene database...</p>');
      $.get(baseurl+'/search-ncbi', 'search-ncbi-string='+$(this).val()+'&database=homologene', function(data){
        $('.'+causeOrEffect+'-homologene-searching').remove();
        $('#'+causeOrEffect+'-homologene-select').remove();
        if(data != "null" && data != ""){
          data_json = $.parseJSON(data);
          //$('#edit-field-cause-homologene-und').hide();
          $('#edit-field-'+causeOrEffect+'-homologene-und').after('<br><select id="'+causeOrEffect+'-homologene-select" multiple="multiple"></select>');
          for(i=0; i<data_json.length; i++){
            $('#'+causeOrEffect+'-homologene-select').append('<option value="'+data_json[i].id+'">'+data_json[i].id+data_json[i].name+'</option>');
          }
          $('#'+causeOrEffect+'-homologene-select').append('<option>None of these</option>');            
          $('#'+causeOrEffect+'-homologene-select').focus();      
        }
        else{
          $('#edit-field-'+causeOrEffect+'-homologene-und').after('<p class="'+causeOrEffect+'-homologene-searching"><em>Sorry, no results found in NCBI homologene database</em></p>');            
        }
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
    }
  });
  $('body').on('change','#cause-select, #effect-select, #cause-homologene-select, #effect-homologene-select', function(){
    if($(this).attr('id') == 'cause-homologene-select' || $(this).attr('id') == 'cause-select'){
      var causeOrEffect = 'cause';
    }
    else{
      var causeOrEffect = 'effect';
    }
    if($(this).attr('id') == 'cause-homologene-select' || $(this).attr('id') == 'effect-homologene-select'){
      var homolOrNot = '-homologene';
    }
    else{
      var homolOrNot = '';
    }
    if($(this).val() != 'None of these'){
      $('#edit-field-'+causeOrEffect+homolOrNot+'-und').val($(this).val());
    }
    $('#edit-field-'+causeOrEffect+homolOrNot+'-und').show();
    $('#edit-field-'+causeOrEffect+homolOrNot+'-und').focus();
    $(this).remove();
  });
  /*$('body').on('blur','#cause-homologene-select, #effect-homologene-select', function(){
    if($(this).attr('id') == 'cause-homologene-select'){
      var causeOrEffect = 'cause';
    }
    else{
      var causeOrEffect = 'effect';
    }
    $('#edit-field-'+causeOrEffect+'-homologene-und').show();
    $(this).remove();
  });*/

  //do the same for effect
  /*$('.page-node-add-causal-relationship #edit-field-effect-und').change(function(){
    if($(this).val().length > 2){
      var baseurl = window.location.protocol + '//' + window.location.hostname;
      $.get(baseurl+'/search-homologene', 'search-homologene-string='+$(this).val(), function(data){
        if(data != "null" && data != ""){
          data_json = $.parseJSON(data);
          $('#effect-homologene-select').remove();
          //$('#edit-field-effect-homologene-und').hide();
          $('#edit-field-effect-homologene-und').after('<br><select id="effect-homologene-select" multiple="multiple"></select>');
          for(i=0; i<data_json.length; i++){
            $('#effect-homologene-select').append('<option value="'+data_json[i].id+'">'+data_json[i].id+': '+data_json[i].name+'</option>');
          }
          $('#effect-homologene-select').append('<option>None of these</option>');
          $('#effect-homologene-select').focus();      
        }
      });      
    }
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
  });*/
});
