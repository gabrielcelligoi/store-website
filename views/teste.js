$(document).ready(function() {

  $('#is_seller').change(function() {
    if ($(this).prop('checked')) {
      $('#seller').slideDown();
    } else {
      $('seller').slideUp();
    }
  })

  });
