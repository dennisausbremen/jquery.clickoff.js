
jquery.clickoff.js

Easily detect when you have clicked outside of an element and fire a callback (often used to close/hide an element).

Features:
- touch and pointerevent support
- automatic input blurring for clicking off forms on mobile devices (closes keyboard)

Usage:

call the 'clickoff' method on a jQuery object.
ex. $myObject.clickoff();

Options:

'usePointerEvents': Get your events from the jquery.pointerevents plugin (defaults to false)
'eventContext': The element that will listen for your clickoff events (jQuery selector: defaults to document) 