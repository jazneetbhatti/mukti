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

	/* Updates the content section */
	function updateContent(key){
		var item = fetchedData[key];

		/* Update section only if a new node is clicked. In other words,
		 * do not update if the section already has contents corresponding to the node clicked
		 */
		if( !$('#content').hasClass(key) )
		{
		  /* Fade out the contents, empty the section, update the class name associated
			 * ( wrapper-column should always remain for layout reasons ), fill in the 
			 * content as children and then fade back in.
			 */
			$('#content').fadeOut(function(){
		  	$(this).empty().attr('class', 'wrapper-column ' + key ).append('<p>Content for ' + item.text + '</p>').fadeIn();
			});
		}
	}

	/* Handler for a click on a child node */
	function clickedNode(key){
		console.log("clickedNode");
		var item = fetchedData[key];

		/* No need to reinitialize the menu if the centre node was clicked */
		if( currentObject != item ){
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
					setUpMenu(key);
					$('.nav-menu-list').hide();
					applyCircleMenu();
					$('.nav-menu-list').fadeIn();
				});
			}
		}
		updateContent(key);
	}

  function setUpMenu(key){
  	console.log("setUpMenu");
  	var item = currentObject;
  	var centreNodeText = item.text;
 		$('.nav-menu-list').append('<li id="' + key + '" >' + centreNodeText + '</li>');
 		$('#' + key).click(function() {
				clickedNode(key);
		});

		$.each(item.childNodes, function() {
			var id = this.toString();
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
		setUpMenu('mukti');
		applyCircleMenu();
		updateContent('mukti');
	});
});
