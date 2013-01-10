$(document).ready(function() {
	$('ul:not(:first)').hide(); /* Only the main menu list should be visible initially*/

	$('#nav-menu-mukti').circleMenu({
		trigger: 'hover',
		item_diameter: 100,
		circle_radius: 125,
		direction: 'full'
	});

	$('#nav-menu-mukti').addClass('menu-active').trigger('mouseover');

  $('li').click(function() {
  	var selected = $('a', this);
    if( !selected.hasClass('centre-node') ){
      var nextMenuId = '#nav-menu-' + selected.attr('class');
/*      selected.text(nextMenuId); */
			$('.menu-active').removeClass('menu-active').fadeOut();
			$( nextMenuId ).circleMenu({
		    trigger: 'hover',
		    item_diameter: 100,
		    circle_radius: 125,
		    direction: 'full'
	   });
	    $( nextMenuId ).addClass('menu-active').fadeIn().trigger('mouseover');
    }
  });
}); 
