/* jshint esversion: 6 */

/* Detect when window is resized */
$(window).resize(function() {
  var icon = "<span class='fas fa-globe-americas fa-fw fa-lg' style='color:#1a4f98'></span>";
  if ($(document).width()<=820)  {
    $('.migration').html(icon + " Canada - Immigration");
  } else {
    $('.migration').html(icon + " Canada - World Immigration Statistics from 1980 to 2013");
  }
});

// Set visible/unvisible to pages according with menu selected
changeMenu = ( idToBeVisible ) => {
  $('.page').each( function ( ) { 
    var curId = "#" + $(this).prop('id');
    if ( curId != idToBeVisible ) {
      $(this).addClass('hide-this-thing');
    } else {
      $(this).removeClass('hide-this-thing');
    }
    $(".navbar-collapse").collapse('hide');
  });
};

// Get the selected menu
$(document).ready(function() {
  $( ".dropdown-item" ).click( function (index) {
    changeMenu( $(this).attr('href') );
  });
});

// Get the click to come back to main page.
$(".migration").click( function (index) {
  changeMenu( $(this).attr('href') );
  // Force menu colapse hide when Portfolio link is clicked 
  $(".navbar-collapse").collapse('hide');
});

