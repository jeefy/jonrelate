jQuery(document).ready(function($) {
  $('.page-node-add-causal-relationship #edit-field-cause-und').change(function(){
    var baseurl = window.location.protocol + '//' + window.location.hostname;
    $.get(baseurl+'/search-homologene', 'search-homologene-string='+$(this).val(), function(data){
      $('.page-node-add-causal-relationship #edit-field-cause-und').after(data);
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
});