$(document).ready(function() {

/*
 * ------------------------------ HEADER BEGIN ----------------------------------------------------
 */

  function setupLoginDialog() {
  	$('#login-button').click( function() {
  		var dialogdiv = $('#login-dialog');
  		if (dialogdiv.css('display') == 'none') {
  			dialogdiv.show();
  			$('#loginwrapper').show();
  			setTimeout(function() {
  				dialogdiv.css('top', '70px');
  			}, 20);
  		}
  	});
  	$('#register-button').click( function() {
  		var dialogdiv = $('#register-dialog');
  		if (dialogdiv.css('display') == 'none') {
  			dialogdiv.show();
  			$('#loginwrapper').show();
  			setTimeout(function() {
  				dialogdiv.css('top', '70px');
  			}, 20);
  		}
  	});
  	$('#loginwrapper').click( function() {
  		var dialogdiv = $('#login-dialog');
  		if (dialogdiv.css('display') == 'block') {
  			dialogdiv.css('top', '-300px');
  			setTimeout(function() {
  				dialogdiv.hide();
  				$('#loginwrapper').hide();
  			}, 300);
  		}
  		var dialogdiv1 = $('#register-dialog');
  		if (dialogdiv1.css('display') == 'block') {
  			dialogdiv1.css('top', '-600px');
  			setTimeout(function() {
  				dialogdiv1.hide();
  				$('#loginwrapper').hide();
  			}, 300);
  		}
  	});	
  }

  function setupRegistrationValidate() {

	$('#name').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });
    $('#email').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });
    $('#password').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });
    $('#college').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });
    $('#password').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });
    $('#confirmpassword').keyup( function() {
    	$(this).removeClass('validationerror'); 
    });

  	$('#registerForm').submit( function () {
  		var toReturn = true;
  		if ($('#password').val() != $('#confirmpassword').val()) {
  			toReturn = false;
  			$('#confirmpassword').addClass('validationerror');
  		}
  		var email = $('#email').val();
  		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
  			toReturn = false;
  			$('#email').addClass('validationerror');
  		}
  		if ($('#name').val() == '') {
  			toReturn = false;
  			$('#name').addClass('validationerror');
  		}
  		if ($('#college').val() == '') {
  			toReturn = false;
  			$('#college').addClass('validationerror');
  		}

  		var phone = $('#phone').val();
  		if (/^(\d)+$/.test(phone) == false) {
  			toReturn = false;
  			$('#phone').addClass('validationerror');
  		}
  		if ($('#city').val() == '') {
  			toReturn = false;
  			$('#city').addClass('validationerror');
  		}
  		if ($('#password').val() == '') {
  			toReturn = false;
  			$('#password').addClass('validationerror');
  		}
  		return toReturn;
  	});
  }
  
  setupLoginDialog();
  setupRegistrationValidate();

/*
 * ------------------------------ HEADER ENDS ----------------------------------------------------
 */

/* 
 * ------------------------------ WRAPPER BEGIN ---------------------------------------------------
 * Contains scripts for the 'wrapper' section
 */

	var fetchedContentData, currentContentObject; // currentContentObject corresponds to the content for the centre node
	var fetchedMenuData, currentMenuObject; // currentMenuObject corresponds to the centre node in the menu
	var fetchedNotificationData;

	/* Invokes the circular menu plugin */
  function applyCircleMenu(){
  	console.log("applyCircleMenu");
  	$('.nav-menu-list').circleMenu({
		    trigger: 'hover',
		    item_diameter: 126,
		    circle_radius: 126,
		    direction: 'full',
		    delay: 2000
	   });
			
       $('.someclass').each( function(){
         var textHeight = $(this).height();
         var nodeHeight = $(this).parent().height(); 
         console.log( $(this).text() );
         console.log( $(this).parent().text() );
         $(this).css({
           'position': 'relative',
           'top': ( ( nodeHeight - textHeight ) / 2 ) + 'px'
         });
       });

		/* Simulate a hover to open the menu on initialization.
		 * Triggering just a mouseover event does not close the
		 * menu when the mouse is idle
		 */
		$('.nav-menu-list').trigger('mouseover');
		$('.nav-menu-list').trigger('mouseout');
  }

	/* Updates the content section */
	function updateContent(key){
		var item = fetchedMenuData[key];

		/* Update section only if a new node is clicked. In other words,
		 * do not update if the section already has contents corresponding to the node clicked
		 */
		  /* Fade out the contents, empty the section, update the class name associated
			 * ( wrapper-column should always remain for layout reasons ), fill in the 
			 * content as children and then fade back in.
			 */
			$('#content').fadeOut(function() {
				var contentDiv = $('#content');
				currentContentObject = fetchedContentData[key];
				var heading = currentContentObject.heading;
				var content = currentContentObject.content;

		  		$('#content h1').html(heading);
		  		$('#content-body').html(content);
		  		contentDiv.fadeIn(function() {
		  			$("#content-body-wrapper").mCustomScrollbar('update');
		  		});
			});
	}

	/* Handler for a click on a child node */
	function clickedNode(key){
		console.log("clickedNode");
		var item = fetchedMenuData[key];

		/* No need to reinitialize the menu if the centre node was clicked */
		if( currentMenuObject != item ){
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

					currentMenuObject = item;
					setUpMenu(key);
					applyCircleMenu();
					$('.nav-menu-list').fadeIn();
				});
			}
		}
		updateContent(key);
	}

  function setUpMenu(key){
  	console.log("setUpMenu");
  	var item = currentMenuObject;
  	var centreNodeText = item.text;
 		$('.nav-menu-list').append('<li class="centre-node" id="' + key + '" ><div class="someclass">' + centreNodeText + '</div></li>');

		$.each(item.childNodes, function() {
			var id = this.toString();
			var nodeText = fetchedMenuData[id].text;
			$('.nav-menu-list').append('<li class="child-node" id="' + id + '" ><div class="someclass">' + nodeText + '</div></li>');

			$('#' + id).click(function() {
				clickedNode(id);
			});
		});

		if( item.parent != "none" ){
			var parentId = item.parent;
			var nodeText = fetchedMenuData[parentId].text;
			$('.nav-menu-list').append('<li class="back-node" id="' + parentId + '" ><div class="someclass">' + 'Back to ' + nodeText + '</div></li>');
			$('#' + parentId).click(function() {
				clickedNode(parentId);
			});
		}
  }

	$.getJSON('scripts/content.json', function(data) {
		fetchedContentData = data;
	});

	$.getJSON('scripts/menuContents.json', function(data) {
		fetchedMenuData = data;
		currentMenuObject = fetchedMenuData['mukti'];
		setUpMenu('mukti');
		applyCircleMenu();
		updateContent('mukti');	
	});

	var index;
	function cycleHappeningNow(){
		$('#happening-now-content').fadeOut('slow', function(){
			$(this).html('<div class="happening-now-content-text">' + fetchedNotificationData.live[index].text + '</div>').fadeIn('slow');
			console.log('index'+'='+index+' length='+ fetchedNotificationData.live.length);
			index = ( index + 1 ) % fetchedNotificationData.live.length;
		});
	}

	function flashtext(){
		var element = $('#happening-now-banner');
		//console.log(element.css('background-color'));
    /*if( element.css('background-color') != 'rgb(255, 0, 0)'  )
			element.animate({ 'background-color': 'red' }, 300 );		
		else
			element.animate({ 'background-color': 'black' }, 300 );*/
		if (element.hasClass('red-background')) {
			element.removeClass('red-background');
		}
		else {
			element.addClass('red-background');
		}
	}

	var intervalId, flashingId;
	function updateHappeningNow(){
			var element = $('#happening-now-content');
 			if( $.isEmptyObject(fetchedNotificationData.live))
			{	
				clearInterval(intervalId);
				clearInterval(flashingId);
				$('#happening-now-content').fadeOut('slow', function(){
					$(this).html('<div class="happening-now-content-text">No live events right now</div>').fadeIn('slow');
				});
				$('#happening-now-banner').animate({ 'background-color': 'black' }, 300 );		
			}
			else
			{
				index = 0;
				clearInterval(intervalId);
				clearInterval(flashingId);
				intervalId = setInterval( cycleHappeningNow, 3000 );
				flashingId = setInterval( flashtext, 900 );
			}
		
	}

	var since_id = 8;									// The notifications will start after this id no
	function showNotifications(index){
		var data = fetchedNotificationData;
		if( index >= 0 ){
			if( since_id < data.results[index].id_no ){
				$('<div class="notification-text-wrapper"><div class="notification-text"><p>' + data.results[index].text + '</p><p class=\"timestamp\">Posted @ ' + data.results[index].time +', ' + data.results[index].date + '</p></div><div>').hide().prependTo('#notification-content').slideDown('slow').promise().done( function() {
					$("#notification-content-wrapper").mCustomScrollbar('update');
					since_id = data.results[index].id_no;
					index = index - 1;
				  console.log(index);
				  console.log('since'+since_id);
				  showNotifications(index);
				});
			}
			else{
					index = index - 1;
				  console.log(index+'else');
				  console.log('since'+since_id+'else');
				  showNotifications(index);
			}
		}
	}

	function fetchNotifications(){
		console.log('here');
		$.ajaxSetup({ cache: false});		
		$.getJSON('scripts/notifications.json', function(data) {
			fetchedNotificationData = data;
			console.log(fetchedNotificationData);
			console.log('here123');
			showNotifications(fetchedNotificationData.results.length - 1);
			updateHappeningNow();

			$.ajaxSetup({ cache: true});
		});
			setTimeout( fetchNotifications, 30000 );
	}

	fetchNotifications();

/* ------------------------------ WRAPPER END --------------------------------------------------- */

/* 
 * ------------------------------ FOOTER BEGIN ---------------------------------------------------
 * Contains scripts for the 'footer' section
 */	

	/* Responsible for removing default content from form field on focus
	 * and restoring default content in case focus is lifted and no data
	 * has been entered
	 */
	$('input.clear').each(function(index) {
		$(this)
		.data('default', $(this).val())
		.addClass('inactive')
		.focus(function(){
			$(this).removeClass('inactive');
			if( $(this).val() === $(this).data('default') || $(this).val() === "" ) {
				$(this).val("");
			}
		})
		.blur(function() {
			if( $(this).val() === "" ) {
				$(this).addClass('inactive').val( $(this).data('default') );
			}	
		});
	});
});

