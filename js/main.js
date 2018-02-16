

/////////////////////////////////
// WHEN THE PAGE LOADS //
/////////////////////////////////

window.onload = function() {


	var windowWidth, 
		windowHeight,
		largeWindowWidth,
		controlsVisible = false,
		c = document.getElementById('canvas'),
		context = c.getContext('2d'),
		clicker = $('.coordinates'), // video overlay trigger
		canvasVidIsPlaying = false;
		audio = $('audio').get(0);
		hoverTimer = null;
		vid = document.createElement("video"); // video overlay object
		vid.setAttribute("id", "overlay-video");
		jsLoaded = false;
		
	resizeVariables();
	
	// scroll and fade in objects
	window.sr = ScrollReveal();
	sr.reveal('.scroll-reveal', { duration: 500, distance:'50px', scale: 1, easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)', delay: 200, origin:'bottom'});
	
	$('#loader').fadeOut();


	// on resize	
	$(window).resize(function(){
		
		resizeVariables();
		
	});
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function resizeVariables() {
		
		 windowWidth = $('body').width();
		 windowHeight = $('body').height();	
		 windowAspectRatio = windowWidth / windowHeight;
		 desiredAspectRatio = 16 / 9; // 1.777
		 
		 if (windowWidth > 800) {
			 
			 largeWindowWidth = true;
// 			 console.log('largeWindowWidth = true;')
			 
			 
		 } else {
			 
			 largeWindowWidth = false;
// 			 console.log('largeWindowWidth = false;')
			 
		 }
		 
		 executeJS();
		 
// 		 console.log(largeWindowWidth)
		 
	    canvas.width = windowWidth;
	    canvas.height = windowHeight;
		 	 
		
	}
	
	
	function playVideo(id, playPause, thisVideo, thisVideoObject) {
				
		if (thisVideo.hasClass('paused')) {
			
// 			thisVideo.css({"border-top":"50px solid rgba(0,0,0, .8)", "border-bottom":"50px solid black"})
// 			$('.sidebar').css({'opacity':.2})
// 			$('.intro').css({'opacity':.2})
			thisVideoObject.play();
			thisVideo.removeClass('paused').addClass('playing');
			playPause.removeClass('play').addClass('pause');
			
			thisVideo.parent().addClass('child-playing')
// 			$(".intro").css({'opacity':.2});

			$('.sidebar').removeClass('half-width').addClass('full-width')
			
// 			console.log('play video');
			
		}
				
		
		// Update the seek bar as the video plays
		thisVideoObject.addEventListener("timeupdate", function(){
			
			updateScrubberBar ();
			
		  if (thisVideoObject.currentTime >= thisVideoObject.duration) {
		  
// 			 console.log('resetVideo');
		
			pauseVideo(id, playPause, thisVideo, thisVideoObject);
			thisVideoObject.currentTime = 0;
			scrubberBar.value = 0;
			
			}
			
		});
		
		
		
		
		
		
	}
	
	function pauseVideo(id, playPause, thisVideo, thisVideoObject) {
		
		
		if (thisVideo.hasClass('playing')) {
			
// 			thisVideo.css({"border-top":"50px solid transparent", "border-bottom":"50px solid transparent"})
			thisVideoObject.pause();
			thisVideo.removeClass('playing').addClass('paused');
			playPause.removeClass('pause').addClass('play');
			
			$('.sidebar').removeClass('full-width').addClass('half-width')

			
// 			console.log('pauseVideo');
			
		}
		
	}
	
	
	function updateScrubberBar () {
		
		
	  // Calculate the slider value
	  var value = (thisVideoObject.currentTime / thisVideoObject.duration) * 100;
	  // Update the slider value
	  $(scrubberBar).children('span').css('left', value + "%");
	  
		
	}
	
	function updateVideoTime(id, playPause, thisVideo, thisVideoObject) {
		
// 	  console.log('udpateVideoTime');
	  
/*
	  // Calculate the new time
	  var time = Math.floor(thisVideoObject.duration * (scrubberBar.value / 100));
	
	  // Update the video time
	  thisVideoObject.currentTime = time;
	  
	  console.log('new video time = ' + time)
*/

	  
// 	  playVideo(id, playPause, thisVideo, thisVideoObject)
		
	}
	
	function showControls() {
		
// 		console.log('showControls')	
		$('.video-controls').removeClass('invisible').addClass('visible');
		$('.video-details').removeClass('invisible').addClass('visible');
		controlsVisible = true;

	}
	
	
	function hideControls() {
		
// 		console.log('hideControls')	
		$('.video-controls').addClass('invisible').removeClass('visible');
		$('.video-details').addClass('invisible').removeClass('visible');
		controlsVisible = false;
		
	}
	
    // Canvas video overlay needs to loop
    function loopVideo() {
	    
// 	    console.log('loopvideo');
	    
	    // if aspect ratio of the window is 
	    
	    
	    if (/* windowWidth > windowHeight */ windowAspectRatio > desiredAspectRatio) {
		    
// 		    console.log('windowAspectRatio > desiredAspectRatio')
		    
		    // if windowWidth is greather than windowheight
		    // video needs to be 
		    newHeight = windowWidth / desiredAspectRatio;
		    verticalCenter = -(newHeight - windowHeight) /2;
		    
		    // draw the frame (element, left, top, width, height)
		    context.drawImage(vid, 0, verticalCenter, windowWidth, newHeight);
		    
// 		    console.log ('windowWidth > windowHeight'  + ' windowwidth = ' + windowWidth + " height " + newHeight )
	    } 
	    
	    
	    
	    else if (/* windowWidth < windowHeight */ windowAspectRatio < desiredAspectRatio) {
		    
// 		    console.log('windowAspectRatio < desiredAspectRatio')
		    
		    newWidth = windowHeight * desiredAspectRatio
		    horiztonalCenter = -(newWidth - windowWidth) /2;
		    
		    context.drawImage(vid, horiztonalCenter, 0, newWidth, windowHeight);
		    
// 		    console.log ('windowWidth < windowHeight' + ' height = ' + newWidth + " width " + windowHeight )
	    }
	    
	    // keep running
	    loopVideoTimer = setTimeout(loopVideo, 10);
	    
    }
    
    
    function pauseCanvasVideo(vid) {
        
//         console.log('pauseCanvasVideo')
		
			
        canvas.className = "hide-me";
	    $('#cloud').removeClass('visible').addClass('hide-me');
	    
		vid.pause();
		vid.currentTime = 0;
        clearTimeout(loopVideoTimer);
        
        canvasVidIsPlaying = false;

    }
    
    function playCanvasVideo (vid) {
        
//         console.log('playCanvasVideo')
		
		vid.volume = 0;
		vid.currentTime = 0;
        
        // play the video
        vid.play();
        canvas.className = "visible";
	    $('#cloud').removeClass('hide-me').addClass('visible');
	    
	    canvasVidIsPlaying = true;
        
        // need to redraw every frame
        setTimeout(loopVideo, 5);
        
		vid.addEventListener("timeupdate", function(){
	        
	        if (vid.currentTime >= vid.duration) {
		        
// 		        console.log('canvas video has ended')
		        
		        pauseCanvasVideo(vid)
		        
	        }
	        
	    });
	    
       var fadeVideoAudio = setInterval(function () {
	       
	       
	       if (!vid.paused && vid.volume < .9) {
		       
		       vid.volume = vid.volume + .05;
// 				       console.log(vid.volume)
// 				console.log('fadeVideoAudio')
		       
	       } else {
		       vid.volume = 1;
		       clearInterval(fadeVideoAudio);
// 				       console.log('clearInterval')
	       }
	       
	       
       }, 100);
	    
	    
        
	    
	    
    }
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// END FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// we don't want most of the JS to execute unless we're on a big screen
	
	
	function executeJS() {
		
		if (largeWindowWidth == true && jsLoaded == false) {
			
// 			console.log('executeJS && jsloaded = false')
			jsLoaded = true;
			
			
// 			console.log('big window > load js')
		
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// PLAY, PAUSE & SCRUB VIDEOS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			$('.video-controls').click(function(e){
				
				var id = $(this).data('id');
					playPause = $(this).children('.play-pause'); // should be playPause
					thisVideo = $("video[data-id='" + id +"']"); 
					thisVideoObject = thisVideo.get(0);
					scrubberBar = $(this).children('.scrubber-bar').get(0);
					isPlaying = thisVideoObject.currentTime > 0 && !thisVideoObject.paused && !thisVideoObject.ended && thisVideoObject.readyState > 2; // check if true or false
				
				// click play button
				// if we clicked on the play button and  the video is not playing 
				if ( $(e.target).hasClass('play') && !isPlaying ) {
								
					// if another video is already playing pause it
					if ( $('.playing').length ) {
						
						$('.playing').get(0).pause();
						$('.playing').removeClass('playing').addClass('paused');
						$('.pause').removeClass('pause').addClass('play');
						
					}
					
					playVideo(id, playPause, thisVideo, thisVideoObject);
							
				} 
				
				// click pause button
				// if the paused button is clicked and the video is playing then pause the video
				else if ($(e.target).hasClass('pause') && isPlaying) {
					
					pauseVideo(id, playPause, thisVideo, thisVideoObject);
										
				}
				
				// click full screen button
				else if ( $(e.target).hasClass('full-screen') ) {
					
					  if (thisVideoObject.requestFullscreen) {
						  
					    thisVideoObject.requestFullscreen();
					    
					  } 
					  
					  else if (thisVideoObject.mozRequestFullScreen) {
						  
					    thisVideoObject.mozRequestFullScreen(); // Firefox
					    
					  } else if (thisVideoObject.webkitRequestFullscreen) {
						  
					    thisVideoObject.webkitRequestFullscreen(); // Chrome and Safari
					    
					  }
					  
					  // force the fullscreen to play the video so we don't have to deal with play/pause issues on exit
					  playVideo(id, playPause, thisVideo, thisVideoObject);
				}	
				
				
				
				
				// click scrubber bar
				else if ( $(e.target).hasClass('scrubber-bar') ) {
					
// 					console.log('scrubber-bar clicked')
					
					offset = $(scrubberBar).offset();
				    left = (e.pageX - offset.left);
				    totalWidth = $(scrubberBar).width(); //910
					percentage = left / totalWidth
					videoTime = thisVideoObject.duration * percentage
					
					thisVideoObject.currentTime = videoTime;
					
// 					console.log($(this))
					
				}
				
			});
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// END -- PLAY, PAUSE & SCRUB VIDEOS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			
			
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// HIDE/SHOW VIDEO CONTROLS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			$(".video-wrapper").mousemove(function(){
// 				console.log('move')
				clearTimeout(hoverTimer)
				showControls();
				hoverTimer = setTimeout( function () {hideControls()}, 1000 )
			});
			
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// END -- HIDE/SHOW VIDEO CONTROLS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// CANVAS VIDEO OVERLAY ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		    vid.muted = false;
		     
			// what happens when you click and hold
		    clicker.mousedown( function(){
			    
			    
			    
				audio = document.createElement("audio")
				audio.src = $(this).attr('data-audio');
				audio.play();
				
				vid.src = $(this).parent().parent().attr('data-overlay-vid');
			    
			    if ( vid.paused && $('#canvas').hasClass('hide-me') && !vid.currentTime > 0 && !canvasVidIsPlaying ) {
				    
// 				    console.log('all is true')
			
					playCanvasVideo (vid);
				    
			    }

		    });
		    
		    // what happens when you release
		    clicker.mouseup( function(){
			        
			    pauseCanvasVideo(vid)
				
		    });
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// END -- CANVAS VIDEO OVERLAY ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			    
			
			
			
			
			
			
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// PRIMARY NAVIGATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			// Select all links with hashes
			$('a[href*="#"]')
			  // Remove links that don't actually link to anything
			  .not('[href="#"]')
			  .not('[href="#0"]')
			  .click(function(event) {
			    // On-page links
			    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			      
			      // Figure out element to scroll to
			      var target = $(this.hash);
// 			       console.log (target.attr('id'));
			      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			      
			     
			        
			        
				      // Does a scroll target exist?
				      if (target.length) {
				        // Only prevent default if animation is actually gonna happen
				        event.preventDefault();
				        $('.active').removeClass('active');
				        $('a[href="#'+ target.attr('id') +'"]').addClass('active');
				        $('html, body').animate({scrollTop: target.offset().top}, 1000, function() {
				         
				         
				         
				          // Callback after animation
				          // Must change focus!
				          var $target = $(target);
				          $target.focus();
				          if ($target.is(":focus")) { // Checking if the target was focused
				            return false;
				          } 
				          
				          else {
				            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				            $target.focus(); // Set focus again
				          }
				          
				          
				        });
				      }
			    }
			  });
			  
			  
			  function updateURL(refElement) {
				  
		        window.location.hash = refElement.get(0);

				  
			  }
			  
			  // UPDATE NAV ON SCROLL
			  $(document).on("scroll", onScroll);
			  
			  function onScroll(event){
			    
			    var scrollPos = $(document).scrollTop();
			//     console.log(scrollPos)
			    
/*
			    $('nav li').each(function () {
			        var currLink = $(this);
			        var refElement = $(currLink.children().attr("href"));
			       
			       
			        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			            $('nav li').removeClass("active");
			            currLink.addClass("active");
			            
// 				        console.log(refElement.get(0))
			            
			            // update the url
			            window.history.pushState('x', 'title', currLink.children().attr("href") );
			            
			        }
			        else{
			            currLink.removeClass("active");
			        }
			    });
			    
			    // track scroll direction
*/
			    
			    if (scrollPos < 100) {
				    
				    $('.scroll-hide').removeClass('invisible').addClass('visible');
				    
			    } else if (scrollPos > 100 && $('.scroll-hide').hasClass('visible')) {
				    
				    $('.scroll-hide').removeClass('visible').addClass('invisible');
				    
			    }
			}
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// END -- PRIMARY NAVIGATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
						
			
			
			
			
			
			
		} else if (largeWindowWidth != true && jsLoaded == false) {
			
// 			console.log('small window  - simplified JS')
			
			$('.video-controls').click(function(e){
				
				var id = $(this).data('id');
					playPause = $(this).children('.play-pause'); // should be playPause
					thisVideo = $("video[data-id='" + id +"']"); 
					thisVideoObject = thisVideo.get(0);
					scrubberBar = $(this).children('.scrubber-bar').get(0);
					isPlaying = thisVideoObject.currentTime > 0 && !thisVideoObject.paused && !thisVideoObject.ended && thisVideoObject.readyState > 2; // check if true or false
				
					
// 					playVideo(id, playPause, thisVideo, thisVideoObject);
					thisVideoObject.play();
							
			}); 
			
			
			
		}
		
		
	}
	
	
	
	
	
};


			/// EMAIL FORM
			// https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
			var $form = $('form#submission-form'),
			    url = 'https://script.google.com/a/kingspoke.co/macros/s/AKfycbyJiiht9by1aDJY-VRxGgjptIYK19LO8E_x0v4noQaFYE1yo2g/exec'
			
			$('#submit-form').on('click', function(e) {
				
				console.log('clicked')
			 
			  e.preventDefault();
			  
			  if ( $("textarea").val() ) {
				  
				  
				  var jqxhr = $.ajax({
				   
				    url: url,
				    method: "GET",
				    dataType: "json",
				    data: $form.serializeObject(),
				    success: function (data) {
		                Success = true;//doesnt goes here
// 		                console.log('success')
		                $('#submit-form').html("Thanks.");
		                $('textarea').css({'opacity':.25})
		            },
		            error: function (textStatus, errorThrown) {
		                Success = false;//doesnt goes here
// 						console.log('failed')
		            }
				    
				
					})
				  				  
			  } else {
				  
				  
// 				  console.log ('no info')
				  $('.error').removeClass('hide').addClass('show')
				  
				  setTimeout(function(){
					  $('.error').removeClass('show').addClass('hide')
				  }, 2000);
				  
				  
			  }
			  
			});




