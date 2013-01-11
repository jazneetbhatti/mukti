$(document).ready(function() {
	var fetchedData, currentObject; // currentObject corresponds to the centre node in the menu

	/* Invokes the circular menu plugin */
  function applyCircleMenu(){
  	console.log("applyCircleMenu");
  	$('.nav-menu-list').circleMenu({
		    trigger: 'hover',
		    item_diameter: 100,
		    circle_radius: 125,
		    direction: 'full',
		    delay: 2000
	    });

		/* Simulate a hover to open the menu on initialization.
		   Triggering just a mouseover event does not close the
		   menu when the mouse is idle */
		$('.nav-menu-list').trigger('mouseover');
		$('.nav-menu-list').trigger('mouseout');
  }

	/* Handler for a click on a child node */
	function clickedNode(key){
		console.log("clickedNode");
		var item = fetchedData[key];

		/* Open a sub-menu only if the node has children */
		if( !$.isEmptyObject( item.childNodes ) )
		{
			$('.nav-menu-list').fadeOut('fast', function() {

				/* Remove the complete menu list element and then recreate it.
				   Just emptying its contents and repopulating with list items doesn't
				   work as desired because the plugin applies styles to the menu
				   list element and initiating the circle menu again causes problems*/
				$('.nav-menu-list').remove();
				$('#nav-menu').append('<ul class="nav-menu-list"></ul>');

				currentObject = item;
				setUpMenu();
				$('.nav-menu-list').hide();
				applyCircleMenu();
				$('.nav-menu-list').fadeIn();
			});	
	}
}

  function setUpMenu(){
  	console.log("setUpMenu");
  	var item = currentObject;
		console.log("1");
  	var centreNodeText = item.text;
 		$('.nav-menu-list').append('<li>' + centreNodeText + '</li>');

		$.each(item.childNodes, function() {
			var id = this;
			var nodeText = fetchedData[id].text;
			$('.nav-menu-list').append('<li id="' + id + '" >' + nodeText + '</li>');

			$('#' + id).click(function() {
				clickedNode(id);
			});
		});

		if( item.parent != "none" ){
			var parentId = item.parent;
			var nodeText = fetchedData[parentId].text;
			$('.nav-menu-list').append('<li id="' + parentId + '" >' + nodeText + '</li>');
			$('#' + parentId).click(function() {
				clickedNode(parentId);
			});
		}
  }

	$.getJSON('scripts/menuContents.json', function(data) {
		fetchedData = data;
		currentObject = fetchedData['mukti'];
		setUpMenu();
		applyCircleMenu();
	});
});
