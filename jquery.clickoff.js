/**
 * jquery.clickoff.js
 *
 * easily detect when you have clicked outside of an element and fire a callback (often used to close/hide an element)
 *
 * Features:
 * - touch and pointerevent support
 * - automatic input blurring for clicking off forms on mobile devices (closes keyboard)
 *
 * @author Brendan McQuade
 * @website http://www.pixelcarve.com
 *
 **/
;(function($,doc){

'use strict';

function ClickOff($container,options) {

	var 
		self = this, // reference to ClickOff object

		isForm, // detect if our container is a form; if so, we will automatically trigger input.blurs onclickoff (to close mobile keyboards)
		
		hasCB, // if the user has passed a callback, we will run the callback onclickoff

		hasException, // if the user has passed an exception condition, we will prevent the clickoff when true
		
		callback, // internal reference to callback function
		
		except, // internal reference to except condition
		
		touch = 'ontouchstart' in doc, // check for touch support
		
		mspointer = navigator.msPointerEnabled, // check for ms pointer support
		
		settings, // internal reference to settings object
		
		defaults = { // default settings
			
			eventContext: doc, // change this if you want to use pointerevents of if you just want a certain element to catch the events (jQuery selector)
			
			usePointerEvents: false // enable this if you want to use the jquery.pointerevents plugin
		
		};

	function coClickOff(e) {

		var condition;

		// if we are using the jquery.pointerevents plugin, we must get the correct pointerevent object
		e = settings.usePointerEvents ? e.originalEvent: e;

		// if the user has passed an exception condition, use it; else let the condition pass
		condition = hasException ? except: function(e){ return false; };

		// if click happens within container, of our exception condition is true, exit
		if ( $(e.target).closest($container).length || condition(e) ) {
			return;
		}

		// else run clickoff callbacks

		// if the container is a form, and the device is mobile, blur form inputs
		if ( isForm && ( touch || mspointer ) ) {
			coBlur();
		}

		// is user has passed a callback, run it
		if ( hasCB ) {
			callback();
		}
	
	}

	// blur all inputs within container (if form)
	function coBlur() {
		
		var i, len, $inputs = $container.find('input,textarea');
		
		for ( i = 0, len = $inputs.length; i < len; i++ ) {
			$inputs.eq(i).blur();
		}
	
	}

	// when destroy is called, unbind all events
	function coUnbind() {

		if ( settings.usePointerEvents ) {
			$(settings.eventContext).off( 'pointerup', coClickOff );
		} else if ( touch ) {
			$(settings.eventContext).off( 'touchend', coClickOff );
		} else {
			$(settings.eventContext).off( 'mouseup', coClickOff );
		}
	
	}

	function coBind() {

		// bind click off by prefered input
		if ( settings.usePointerEvents ) {
			$(settings.eventContext).on( 'pointerup', coClickOff );
		} else if ( touch ) {
			$(settings.eventContext).on( 'touchend', coClickOff );
		} else {
			$(settings.eventContext).on( 'mouseup', coClickOff );
		}

	}

	function coInitAPI() {

		self.set 		= coSet
		self.destroy 	= coUnbind;

	}

	function coSet(options) {

		// if user settings already exist, use those instead of the defaults
		settings = settings ? $.extend( {}, settings, options ): $.extend( {}, defaults, options );

		// internalize options
		callback  = settings.callback;
		except    = settings.except;

		// type check arguments
		isForm      = $container[0].tagName.toLowerCase() == 'form';
		hasCB       = typeof callback === 'function';
		hasException  = typeof except === 'function';

	}

	function coInit() {

		coInitAPI();

		coSet(options);

		coBind();

	}

	coInit();

}

$.fn.clickoff = function(options) {

	return this.each(function(){

		var $el = $(this);

		if ( !$el.data('clickoff') ) {
			$el.data( 'clickoff', new ClickOff($el,options) );
		}

		return this;

	});

}

})(window.jQuery,document);