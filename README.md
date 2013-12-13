
jquery.clickoff.js

Easily detect when you have clicked outside of an element and fire a callback (often used to close/hide an element).

Features:
- touch and pointerevent support
- automatic input blurring for clicking off forms on mobile devices (closes keyboard)

Usage:

call the 'clickoff' method on a jQuery object. 
ex. $myObject.clickoff(); 

Options:

'callback': Callback to run when a 'clickoff' is detected (nothing by default) 
'except': A function containing a condition that will prevent a 'clickoff' from happening (return BOOL: true to prevent clickoff, false to allow -- nothing by default) 
'usePointerEvents': Get your events from the jquery.pointerevents plugin (defaults to false) 
'eventContext': The element that will listen for your clickoff events (jQuery selector: defaults to document) 