// Force colapse hide when Portfolio menu link is clicked 
$(".migration").click( function (index) {
  $(".navbar-collapse").collapse('hide');
});

/* To detect when window is resized */
$(window).resize(function() {
  var icon = "<span class='fas fa-globe-americas fa-fw fa-lg' style='color:#1a4f98'></span>";
  if ($(document).width()<=820)  {
    $('.migration').html(icon + " Canada - Immigration");
  } else {
    $('.migration').html(icon + " Canada - World Immigration Statistics from 1980 to 2013");
  }
});


// jQuery to control pages
$( ".dropdown-item" ).each(function( ) {
    $( this ).click( function (index) {
      if ($.trim(this.textContent) == 'Global Areas') {
        $("#map-container").addClass('hide-this-thing');
        $("#top5countries").addClass('hide-this-thing');
        $("#top10countries").addClass('hide-this-thing');
        $("#summary").addClass('hide-this-thing');
        $("#global_areas").removeClass('hide-this-thing');
      } else if ($.trim(this.textContent) == 'Top 5 Countries') { 
        $("#map-container").addClass('hide-this-thing');
        $("#global_areas").addClass('hide-this-thing');
        $("#top10countries").addClass('hide-this-thing');
        $("#summary").addClass('hide-this-thing');
        $("#top5countries").removeClass('hide-this-thing');
      } else if ($.trim(this.textContent) == 'Top 10 Countries') { 
        $("#map-container").addClass('hide-this-thing');
        $("#global_areas").addClass('hide-this-thing');
        $("#top5countries").addClass('hide-this-thing');
        $("#summary").addClass('hide-this-thing');
        $("#top10countries").removeClass('hide-this-thing');
      } else if ($.trim(this.textContent) == 'Bonus') { 
        $("#map-container").addClass('hide-this-thing');
        $("#global_areas").addClass('hide-this-thing');
        $("#top5countries").addClass('hide-this-thing');
        $("#top10countries").addClass('hide-this-thing');
        $("#summary").removeClass('hide-this-thing');
      } 
    $(".navbar-collapse").collapse('hide');
    });
  });

$( ".nav-item" ).each(function( ) {
    $( this ).click( function (index) {
      if ( $('.nav-item').index(this) != 1) {
        $(".navbar-collapse").collapse('hide');
      }
    });
});

$(".migration").click( function (index) {
  $("#global_areas").addClass('hide-this-thing');
  $("#top5countries").addClass('hide-this-thing');
  $("#top10countries").addClass('hide-this-thing');
  $("#summary").addClass('hide-this-thing');
  $("#map-container").removeClass('hide-this-thing');
});

