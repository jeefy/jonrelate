jQuery(document).ready(function($) {
  //when searching in the specific term field for cause or effect, search for specific terms from ncbi (via ajax request)
  //as well as homologenes.
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
        //make ajax request after alerting user that we are searching
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
});
