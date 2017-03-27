(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }

  // Convert an RGB colour to HEX
  function rgbToHex(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    var color = '#' + parts.join('');
    return color;
  }

  // Copies a string to the clipboard
  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
  	textArea.value = text;
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Copying text command was ' + msg);
    } catch (err) {
      // console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  }

  // copies the background color to clipboard on click
  $('.js-copy-color').on('click', function() {
    var color = $(this).css('background-color');
    copyTextToClipboard(rgbToHex(color));
  });


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // loop through each section and add to the site navigation
  var navList  = $('.js-nav-list'),
      navItems = $('.js-nav-item');
  navItems.each(function() {
    var navId    = $(this).attr('id'),
        navTitle = $(this).data('nav-title');
    navList.append('<li class="side-nav__item js-nav-item-'+ navId + '"><a class="side-nav__link" href="#'+ navId + '">' + navTitle + '</a></li>');
  });


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }

///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end