// jQuery to control 
$( ".dropdown-item" ).each(function( ) {
    $( this ).click( function (index) {
      if ($.trim(this.textContent) == 'Global Areas') {
        $("#map-container").addClass('hide-this-thing');
        $("#top5countries").addClass('hide-this-thing');
        $("#top10countries").addClass('hide-this-thing');
        $("#global_areas").removeClass('hide-this-thing');
      } else if ($.trim(this.textContent) == 'Top 5 Countries') { 
        $("#map-container").addClass('hide-this-thing');
        $("#global_areas").addClass('hide-this-thing');
        $("#top10countries").addClass('hide-this-thing');
        $("#top5countries").removeClass('hide-this-thing');
      } else if ($.trim(this.textContent) == 'Top 10 Countries') { 
        $("#map-container").addClass('hide-this-thing');
        $("#global_areas").addClass('hide-this-thing');
        $("#top5countries").addClass('hide-this-thing');
        $("#top10countries").removeClass('hide-this-thing');
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
$("#map-container").removeClass('hide-this-thing');
});


/*  TOOL TIP  */
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});

