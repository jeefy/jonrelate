(function ($) {
  Drupal.behaviors.MMextra_advertiser = { 
    attach: function(context,settings) {
      //CURRENTLY NOT USED (see template.php). this is what i did when we wanted to use published status for advertisers as indicator for if they were active or not. i needed publishcontent module for this...
      //restyle published field and label it Active for non-administrators
      $('#edit-field-ad-group').after($('#edit-options'));
      $('#edit-options').show();
      $('#edit-options label').contents().filter(function() {
        return this.nodeType == 3
      }).each(function(){
        this.textContent = this.textContent.replace('Published','Active');
      });
      //$('#edit-options label').text('Active');
      $('#edit-options').after('<p class="help-block">Uncheck this box if you do not wish to show ads from this advertiser at this time on your site.</p>');
      $('.vertical-tabs').hide();
    }
  };
}) (jQuery);
