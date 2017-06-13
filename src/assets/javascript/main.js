(function() {

  // visual grid
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });

  // fade-in content
  $(document).ready(function() {
     var html = $('html');
     setTimeout(function(){
       $(html).removeClass('load').addClass('loaded');
     }, 250);
  });

  // Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'XXX', 'auto');
  ga('send', 'pageview');

  // make splits height the same
  var maxSplit = 0;
  var splits = $('.split-right, .split-left');
  $(splits).each(function(){
     maxSplit = $(this).height() > maxSplit ? $(this).height() : maxSplit;
  });

  $(splits).each(function(){
    $(this).height(maxSplit);
  });

  // footer modal
  $(function() {
    $("#modal-x").on("change", function() {
      if ($(this).is(":checked")) {
        $("body").addClass("modal-open");
      } else {
        $("body").removeClass("modal-open");
      }
    });

    $(".modal-fade-screen, .modal-close").on("click", function() {
      $(".modal-state:checked").prop("checked", false).change();
    });

    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });
  });

  // visual grid: use 'g' key to toggle body class
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });

  // enquire: media queries, but for javascript
  enquire.register("screen and (max-width: 999px)", {
    match : function() {
      $('main').addClass('mobile');
    },
    unmatch : function() {
      $('main').removeClass('mobile');
    }
  })
  .register("screen and (min-width: 1000px)", {
    match : function() {
      $('main').addClass('desktop');
    },
    unmatch : function() {
      $('main').removeClass('desktop');
    }
  });

  // header navbar
  var menuToggle = $('#js-navigation-mobile-menu').unbind();
  // $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });

  // overlay

  (function() {
    var triggerBttn = document.querySelector( 'button.c-hamburger')
      overlay = document.querySelector( 'div.overlay' ),
      // closeBttn = document.querySelector( 'button.c-hamburger');
      transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
      },
      transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
      support = { transitions : Modernizr.csstransitions };

    function toggleOverlay() {
      if( !classie.has(triggerBttn, 'is-active' ) ) {
        classie.add(triggerBttn, 'is-active' );
      }
      else if ( classie.has(triggerBttn, 'is-active' ) ) {
        classie.remove(triggerBttn, 'is-active' );
      }


      if( classie.has( overlay, 'open' ) ) {
        classie.remove( overlay, 'open' );
        classie.add( overlay, 'close' );
        var onEndTransitionFn = function( ev ) {
          if( support.transitions ) {
            if( ev.propertyName !== 'visibility' ) return;
            this.removeEventListener( transEndEventName, onEndTransitionFn );
          }
          classie.remove( overlay, 'close' );
        };
        if( support.transitions ) {
          overlay.addEventListener( transEndEventName, onEndTransitionFn );
        }
        else {
          onEndTransitionFn();
        }
      }
      else if( !classie.has( overlay, 'close' ) ) {
        classie.add( overlay, 'open' );
      }
    }

    // triggerBttn.addEventListener( 'click', toggleOverlay );
    triggerBttn.addEventListener( 'click', toggleOverlay );
  })();

  /*
  * Replace all SVG images with inline SVG
  * http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996#11978996
  */
  jQuery('img.svg').each(function(){
     var $img = jQuery(this);
     var imgID = $img.attr('id');
     var imgClass = $img.attr('class');
     var imgURL = $img.attr('src');

   jQuery.get(imgURL, function(data) {
     // Get the SVG tag, ignore the rest
     var $svg = jQuery(data).find('svg');

     // Add replaced image's ID to the new SVG
     if(typeof imgID !== 'undefined') {
         $svg = $svg.attr('id', imgID);
     }
     // Add replaced image's classes to the new SVG
     if(typeof imgClass !== 'undefined') {
         $svg = $svg.attr('class', imgClass+' replaced-svg');
     }

     // Remove any invalid XML tags as per http://validator.w3.org
     $svg = $svg.removeAttr('xmlns:a');

     // Replace image with new SVG
     $img.replaceWith($svg);

     }, 'xml');

  });

})();