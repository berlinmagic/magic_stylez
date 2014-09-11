/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function() { this.JST || (this.JST = {}); this.JST["views/app/start"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <div class="row">\n      <div class="col-sm-9">\n        <h1>magic-stylez</h1>\n      </div>\n      <div class="col-sm-3">\n        <a href="https://github.com/berlinmagic/magic_stylez/tree/master" target="_blank" class="btn btn-sm btn-default btn-divided pull-right">\n          <span class="icn"><i class="icomoon-github3"></i></span>\n          <span>SourceCode</span>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class="section flatted">\n  <div class="corset tight">\n    <p class="loud"><em>Some style helpers used in a lot of our apps.</em></p>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset center_text">\n    <h2>Warning</h2>\n    <p class="loud">This Gem is still work in process!</p>\n    <p class="loud">Its just the start to outsource my style framework (I mostly rebuild for every app).</p>\n    <p class="loud">It is mostly driven by my own habits, so I don\'t know if its usefull for others.</p>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <h3>Dependencies</h3>\n    <ul class="list loud">\n      <li><a href="https://github.com/twbs/bootstrap-sass" target="_blank">bootstrap-sass</a></li>\n      <li><a href="http://bourbon.io/" target="_blank">bourbon</a></li>\n    </ul>\n    <p>(both are allready included)</p>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <h3 class="loud">Usage</h3>\n    <hr/>\n    <p class="highlight"><i class="olicons-hide-filter"></i> add the gem to your applications gemfile</p>\n    <pre><code>gem "magic_stylez"</code></pre>\n    <br/>\n    <p class="highlight"><i class="olicons-hide-filter"></i> run the generator</p>\n    <pre><code>$ rails g magic_stylez:install</code></pre>\n    <br/>\n    <p class="highlight"><i class="olicons-hide-filter"></i> add to stylesheets</p>\n    <pre><code>SASS:\n  @import \'magic-stylez\'; // import all\n  @import \'magic-min\';    // import basic\nCSS:\n  //= \'magic-stylez\'; /* import all */\n  //= \'magic-min\';    /* import basic */</code></pre>\n    <br/>\n    <p class="highlight"><i class="olicons-hide-filter"></i> add to javascripts</p>\n    <pre><code>  //= \'magic-stylez\'; /* import all */\n  //= \'magic-min\';    /* import basic */</code></pre>\n  </div>\n</div>\n\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <h3>Thanks</h3>\n    <p class="loud">\n      A lot of code for this gem is taken from <a href="https://github.com/twbs/bootstrap-sass" target="_blank">bootstrap-sass</a>,\n      so thank you guys for the great work.\n    </p>\n    <p class="loud">\n      Same goes for <a href="http://bourbon.io/" target="_blank">bourbon</a> thanks for a lightweight helper set.\n    </p>\n    <p class="loud">Also thanks to all the people, how share their knowlegde on <a href="http://stackoverflow.com/" target="_blank">stackoverflow</a>.</p>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <h3>Authors</h3>\n    <ul class="list">\n      <li><a href="http://twetzel.github.io/" target="_blank">Torsten Wetzel</a></li>\n      <li>many others ...</li>\n    </ul>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <h3>License</h3>\n    <p class="loud">MIT-License</p>\n  </div>\n</div>\n\n\n\n\n\n\n<div class="section shine-top flatted">\n  <div class="corset">\n    <p class="center_text">© 2014 Torsten Wetzel (berlinmagic UG)</p>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/content/box"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Boxes</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4> \n    <code>@import "magic/content/box";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    \n    \n    <div class="box">\n      <div class="header">\n        <h2>Hello World</h2>\n      </div>\n      <div class="body">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n      </div>\n    </div>\n    \n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/content/buttons"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var btn, buttons, i, _i, _j, _len, _len1;
      
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Splited and divided Buttons</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4> \n    <code>@import "magic/content/buttons";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    \n    \n    <div class="btn btn-success btn-lg btn-splited">\n      <div class="text">\n        .btn-splited\n      </div>\n      <div class="icn">\n        <i class="magicons-caret-right"></i>\n      </div>\n    </div>\n    \n    <div class="btn btn-default btn-lg btn-block btn-splited half">\n      <div class="icn">\n        <i class="olicons-message-full"></i>\n      </div>\n      <div class="text">\n        .btn-splited.half\n      </div>\n    </div>\n    \n    <div class="btn btn-primary btn-lg btn-block btn-divided">\n      <div class="icn">\n        <i class="olicons-overview"></i>\n      </div>\n      <div class="text">\n        .btn-divided\n      </div>\n    </div>\n    \n    <div class="btn btn-warning btn-block btn-divided half">\n      <div class="icn">\n        <i class="olicons-overview"></i>\n      </div>\n      <div class="text">\n        .btn-divided.half\n      </div>\n    </div>\n    \n    <div class="btn btn-danger btn-sm btn-divided">\n      <div class="icn">\n        <i class="olicons-contact-data"></i>\n      </div>\n      <div class="text">\n        .btn-divided\n      </div>\n      <div class="icn">\n        <i class="olicons-male"></i>\n      </div>\n    </div>\n    \n    <div class="btn btn-default btn-xs btn-splited">\n      <div class="icn">\n        <i class="olicons-ok"></i>\n      </div>\n      <div class="text">\n        .btn-splited\n      </div>\n      <div class="icn">\n        <i class="olicons-close"></i>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n\n<div class="section flat-bottom hard-top">\n  <div class="corset">\n    <h2>Social Buttons</h2>\n  </div>\n</div>\n\n<div class="section">\n  <div class="corset">\n    <div class="row">\n      <div class="col-md-6">\n        <h4 class="center_text">Flat</h4>\n        <hr/>\n        ');
      
        buttons = ["facebook", "google", "paypal", "twitter"];
      
        __out.push('\n        ');
      
        for (i = _i = 0, _len = buttons.length; _i < _len; i = ++_i) {
          btn = buttons[i];
          __out.push('\n          <div class="btn btn-');
          __out.push(__sanitize(btn));
          __out.push(' btn-lg btn-divided">\n            <div class="icn">\n              <i class="icomoon-');
          __out.push(__sanitize(btn === "google" ? "googleplus" : btn));
          __out.push('"></i>\n            </div>\n            <div class="text">\n              .btn-');
          __out.push(__sanitize(btn));
          __out.push('\n            </div>\n          </div>\n        ');
        }
      
        __out.push('\n      </div>\n      <div class="col-md-6">\n        <h4 class="center_text">Nice</h4>\n        <hr/>\n        ');
      
        buttons = ["facebook", "google", "paypal", "twitter"];
      
        __out.push('\n        ');
      
        for (i = _j = 0, _len1 = buttons.length; _j < _len1; i = ++_j) {
          btn = buttons[i];
          __out.push('\n          <div class="btn btn-');
          __out.push(__sanitize(btn));
          __out.push('-nice btn-lg btn-divided">\n            <div class="icn">\n              <i class="icomoon-');
          __out.push(__sanitize(btn === "google" ? "googleplus" : btn));
          __out.push('"></i>\n            </div>\n            <div class="text">\n              .btn-');
          __out.push(__sanitize(btn));
          __out.push('-nice\n            </div>\n          </div>\n        ');
        }
      
        __out.push('\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    <p class="loud">splited and divided buttons are nice little helper for buttons that contain an icon</p>\n    <p class="loud"><strong>Be carefull! .btn-splited & .btn-divided are always block elements.</strong></p>\n    <pre>\n      <code>\n  &lt;div class=&quot;btn btn-success btn-lg btn-splited&quot;&gt;<br/>    &lt;span&gt;.btn-splited&lt;/span&gt;<br/>    &lt;span class=&quot;icn&quot;&gt;<br/>      &lt;i class=&quot;magicons-caret-right&quot;&gt;&lt;/i&gt;<br/>    &lt;/span&gt;<br/>  &lt;/div&gt;<br/>  <br/>  <br/>  &lt;div class=&quot;btn btn-primary btn-lg btn-divided&quot;&gt;<br/>    &lt;div class=&quot;icn&quot;&gt;<br/>      &lt;i class=&quot;icomoon-globe&quot;&gt;&lt;/i&gt;<br/>    &lt;/div&gt;<br/>    &lt;div&gt;<br/>      .btn-divided<br/>    &lt;/div&gt;<br/>  &lt;/div&gt;<br/>\n      </code>\n    </pre>\n    <p class="loud">tag of inner element doesn\'t matter just the element conaining the icon need class <strong>.icn</strong></p>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/content/forms"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Inputs</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4> \n    <code>@import "magic/content/forms";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    \n    <div class="input-group labeled">\n      <div class="input-group-addon">\n        <input id="that_check_box" name="user[remember_me]" type="checkbox" value="1"> \n      </div>\n      <label for="that_check_box" class="form-control">\n        This is a input-group .labeled\n      </label>\n    </div>\n    \n    <div class="input-group">\n      <div class="input-group-addon">\n        <input id="that_check_box2" name="user[remember_me]" type="checkbox" value="1"> \n      </div>\n      <label for="that_check_box2" class="form-control">\n        This is a input-group\n      </label>\n    </div>\n    \n  </div>\n</div>\n\n<div class="section dark shine-top">\n  <div class="corset">\n    <pre><code>  &lt;div class=&quot;input-group labeled&quot;&gt;<br/>    &lt;div class=&quot;input-group-addon&quot;&gt;<br/>      &lt;input id=&quot;that_check_box&quot; name=&quot;user[remember_me]&quot; type=&quot;checkbox&quot; value=&quot;1&quot;&gt; <br/>    &lt;/div&gt;<br/>    &lt;label for=&quot;that_check_box&quot; class=&quot;form-control&quot;&gt;<br/>      This is a label<br/>    &lt;/label&gt;<br/>  &lt;/div&gt;</code></pre>\n  </div>\n</div>\n\n<div class="section flat hard-top"></div>\n\n<div class="fullpage-table">\n  <div class="table-row">\n    <div class="banner-box responsive-hero fill">\n      <div class="clearfix"></div>\n      <form accept-charset="UTF-8" action="#" class="centered-form"method="get">\n        <h3>form.centered-form</h3>\n        <div class="inpt-group">\n          <input class="form-control" id="that_email" name="email" placeholder="Email" type="email">\n          <input class="form-control" id="that_password" name="password" placeholder="Passwort" type="password">\n        </div>\n        <div class="press">\n          <input id="that_remember_me" name="user[remember_me]" type="checkbox" value="1"> \n          <label for="that_remember_me">Remember me</label>\n        </div>\n        <input class="btn btn-lg btn-primary btn-block" name="commit" type="submit" value="Sign in">\n      </form>\n      <div class="clearfix"></div>\n    </div>\n  </div>\n  <div class="table-row">\n    <div class="form-table-footer">\n      <div class="corset center_text">\n        <p>This is a form with class <em>.centered-form</em> in a <a href="#layout/fullpage_table"><em>fullpage-table</em></a></p>\n        <p>&copy; 2014 berlinmagic</p>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n\n\n\n<div class="section hard-top dark">\n  <div class="corset tight">\n    <div class="box">\n      <div class="header">\n        <h3>Some Form</h3>\n      </div>\n      <div class="body">\n        <form action="#" method="get" accept-charset="utf-8" class="form">\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <input type="text" class="form-control">\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>check_switch</label>\n            </div>\n            <div class="col-sm-3 press">\n              <div class="check_switch">\n                <div class="switch_toggle"></div>\n              </div>\n            </div>\n            <div class="col-sm-4 press">\n              <div class="check">\n                <a href="#" class="checka"><i class="icon-ok"></i></a>\n              </div>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <input type="text" class="form-control">\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <textarea class="form-control"></textarea>\n            </div>\n          </div>\n          <hr/>\n          <div class="row">\n            <div class="col-sm-4">\n              <button class="btn btn-success btn-splited" type="submit">\n                <span>Continue</span>\n                <span class="icn">→</span>\n              </button>\n            </div>\n            <div class="col-sm-4">\n              <button class="btn btn-default btn-block" type="reset">\n                Reset\n              </button>\n            </div>\n            <div class="col-sm-4 press">\n              &nbsp;\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="section shine-top shine-bottom">\n  <div class="corset tight">\n    <div class="row">\n      <div class="col-sm-4">\n        <div class="inpt-splited">\n          <span class="icn"><i class="icomoon-mail2"></i></span>\n          <div class="inpt">\n            <input placeholder="Email" type="email" value="">\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-4">\n        <div class="inpt-splited">\n          <span class="icn"><i class="icomoon-lock"></i></span>\n          <div class="inpt">\n            <input placeholder="Password" type="password" value="">\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-4">\n        <button class="btn btn-success btn-splited" type="submit">\n          <span>Continue</span>\n          <span class="icn">→</span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/content/inputs"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Inputs</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4> \n    <code>@import "magic/content/inputs";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    \n    <div class="inpt-splited input-lg">\n      <span class="icn"><i class="icomoon-mail2"></i></span>\n      <div class="inpt">\n        <input placeholder="E-Mail" type="email" value="">\n      </div>\n    </div>\n    \n    <div class="inpt-splited">\n      <span class="icn"><i class="icomoon-mail2"></i></span>\n      <div class="inpt">\n        <input placeholder="E-Mail" type="email" value="">\n      </div>\n    </div>\n    \n    <div class="inpt-splited input-sm">\n      <span class="icn"><i class="icomoon-mail2"></i></span>\n      <div class="inpt">\n        <input placeholder="E-Mail" type="email" value="">\n      </div>\n    </div>\n    \n    <div class="inpt-splited input-xs half">\n      <span class="icn"><i class="icomoon-mail2"></i></span>\n      <div class="inpt">\n        <input placeholder="E-Mail" type="email" value="">\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    <p class="loud">splited and divided input are nice little helper for inputs that contain an icon</p>\n    <p class="loud"><strong>Be carefull! .inpt-splited & .inpt-divided are always block elements.</strong></p>\n    <pre>\n      <code>\n  &lt;div class=&quot;inpt-splited press&quot;&gt;<br/>    &lt;span class=&quot;icn&quot;&gt;&lt;i class=&quot;icomoon-mail2&quot;&gt;&lt;/i&gt;&lt;/span&gt;<br/>    &lt;div class=&quot;inpt&quot;&gt;<br/>      &lt;input placeholder=&quot;E-Mail&quot; type=&quot;email&quot; value=&quot;&quot;&gt;<br/>    &lt;/div&gt;<br/>  &lt;/div&gt;\n      </code>\n    </pre>\n    <ul class="arrow loud">\n      <li>tag of inner element doesn\'t matter</li>\n      <li>element conaining icon need class <strong>.icn</strong></li>\n      <li>element conaining input need class <strong>.inpt</strong></li>\n    </ul>\n  </div>\n</div>\n\n\n\n<div class="section hard-top">\n  <div class="corset tight">\n    <div class="box">\n      <div class="header">\n        <h3>Some Form</h3>\n      </div>\n      <div class="body">\n        <form action="#" method="get" accept-charset="utf-8" class="form">\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <input type="text" class="form-control">\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>check_switch</label>\n            </div>\n            <div class="col-sm-3 press">\n              <div class="check_switch">\n                <div class="switch_toggle"></div>\n              </div>\n            </div>\n            <div class="col-sm-4 press">\n              <div class="check">\n                <a href="#" class="checka"><i class="icon-ok"></i></a>\n              </div>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <input type="text" class="form-control">\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-sm-5 press">\n              <label>Text-Field</label>\n            </div>\n            <div class="col-sm-7 press">\n              <textarea class="form-control"></textarea>\n            </div>\n          </div>\n          <hr/>\n          <div class="row">\n            <div class="col-sm-4">\n              <button class="btn btn-success btn-splited" type="submit">\n                <span>Continue</span>\n                <span class="icn">→</span>\n              </button>\n            </div>\n            <div class="col-sm-4">\n              <button class="btn btn-default btn-block" type="reset">\n                Reset\n              </button>\n            </div>\n            <div class="col-sm-4 press">\n              &nbsp;\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="section shine-top shine-bottom">\n  <div class="corset tight">\n    <div class="row">\n      <div class="col-sm-4">\n        <div class="inpt-splited">\n          <span class="icn"><i class="icomoon-mail2"></i></span>\n          <div class="inpt">\n            <input placeholder="Email" type="email" value="">\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-4">\n        <div class="inpt-splited">\n          <span class="icn"><i class="icomoon-lock"></i></span>\n          <div class="inpt">\n            <input placeholder="Password" type="password" value="">\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-4">\n        <button class="btn btn-success btn-splited" type="submit">\n          <span>Continue</span>\n          <span class="icn">→</span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="section warning">\n  <div class="corset">\n    <h2>Old style ... will be removed in next versions.</h2>\n    <p>Here is the old style icon-input helper:</p>\n  </div>\n</div>\n\n<div class="section">\n  <div class="corset tight">\n    \n    \n    <div class="icon_field fat mail">\n      <input class="form-control input-lg" id="user_email" name="user[email]" placeholder="E-Mail" type="email" value="">\n    </div>\n    \n    <br/>\n    \n    <div class="icon_field fat password press">\n      <input class="form-control input-lg" id="user_email" name="user[email]" placeholder="E-Mail" type="email" value="">\n    </div>\n    \n    \n  </div>\n</div>\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/effects/reflections"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Reflections</h1>\n  </div>\n</div>\n\n\n<div class="section">\n  <div class="corset top">\n\t<table class="layout fancy">\n        <tbody><tr>\n            <td class="tbox side-bar small bg-graySoft">\n                <div class="fancy_box">\n                    <div class="reflection"></div>\n                </div>\n                <div class="in_box">\n                    <ul id="devise_links" class="nav_list big">\n\t<li class="">\n\t\t<a href="#effects/reflections" class="shaguar">\n\t\t\t<i class="icon-check"></i> Anmelden\n</a>\t</li>\n\t\t<li class="">\n\t\t\t<a href="#effects/reflections" class="shaguar">\n\t\t\t\t<i class="icon-edit"></i> Registrieren\n</a>\t\t</li>\n\t<li class="">\n\t    <span class="lst_lnk"><i class="icon-cog"></i> Probleme</span>\n\t    <ul class="sub_nav">\n        \t\t<li class="">\n        \t\t\t<a href="#effects/reflections" class="shaguar">\n        \t\t\t\tPasswort vergessen\n</a>        \t\t</li>\n        \t\t<li class="">\n        \t\t\t<a href="#effects/reflections" class="shaguar">\n        \t\t\t\tBestätigung erneut senden\n</a>        \t\t</li>\n        \t\t<li class="">\n        \t\t\t<a href="#effects/reflections" class="shaguar">\n        \t\t\t\tEntsperr-E-Mail erneut senden\n</a>        \t\t</li>\n\t    </ul>\n    </li>\n</ul>\n\n\n                    <br>\n                </div>\n            </td>\n            <td class="tbox center">\n                <div class="fancy_box">\n                    <div class="reflection"></div>\n                </div>\n                <div class="in_box padding_10">\n                    body\n                </div>\n            </td>\n            <td class="tbox side-bar small min_grid_20 bg-graySoft">\n                <div class="fancy_box">\n                    <div class="reflection"></div>\n                </div>\n                <div class="in_box padding_10">\n                    \n                </div>\n            </td>\n        </tr>\n    </tbody></table>\n</div>\n</div>\n\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/effects/shadows"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Shadows</h1>\n  </div>\n</div>\n\n\n\t\t\t\n<div class="section">\n  <div class="corset top">\n    \n\n\t\t\t\n\t\t\t<div class="box">\n\t\t  <div class="header">\n        <a name="all">All Samples</a>\n\t\t  </div>\n\t\t  <div class="body onTop">\n\t\t    \n  \t\t\t\n\n<div class="samplebox raised_shadow smal">\n\t<h2>Raised Shadow</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox lifted_shadow smal">\n\t<h2>Lifted Shadow</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox vertical_curves smal">\n\t<h2>Vertical Curves</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox horizontal_curves smal">\n\t<h2>Horizontal Curves</h2>\n</div>\n\n\n\t\t\t\n\t\t\t\n  \t\t\t\n\n<div class="samplebox vertical_shine smal">\n\t<h2>Vertical Shine</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox horizontal_shine smal">\n\t<h2>Horizontal Shine</h2>\n</div>\n\n\n\t\t\t\n\t\t\t\n  \t\t\t\n\n<div class="samplebox single_shine smal">\n\t<h2>Single Shine</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox single_curve smal">\n\t<h2>Single Curve</h2>\n</div>\n\n\n\t\t\t\n\t\t\t\n  \t\t\t\n\n<div class="samplebox paper_shadow smal">\n\t<h2>Paper Shadow</h2>\n</div>\n\n\n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t\n  \t\t\t\n\n<div class="samplebox pseudo_raised_shadow smal">\n\t<h2>Pseudo-Raised Shadow</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t\n\n<div class="samplebox perspective_shadow smal">\n\t<h2>Perspective Shadow</h2>\n</div>\n\n\n\t\t\t\n  \t\t\t<div class="clearfix"></div>\n\t\t  \n\t\t  </div>\n\t\t</div>\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\t\t\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="raised_shadow">Raised Shadow</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox raised_shadow ">\n\t<h2>Raised Shadow</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tRaised Shadow via Box-Shadow .. no other box-shadows possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\traised_shadow( <span class="vars">color, times, horizontal, vertical, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>horizontal</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>vertical</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>-10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include raised_shadow( rgba(0, 0, 0, 0.5), 5 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox raised_shadow one smal">\n\t<h2>Raised Shadow</h2>\n\t\t<p class="warning">@include raised_shadow( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox raised_shadow two smal">\n\t<h2>Raised Shadow</h2>\n\t\t<p class="warning">@include raised_shadow( rgba(102, 53, 53, 0.5), 5, -10px, 0 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\t\n\t\n\t\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="lifted_shadow">Lifted Shadow</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox lifted_shadow ">\n\t<h2>Lifted Shadow</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tLifted Shadow via :before &amp; :after Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tlifted_shadow( <span class="vars">color, times, horizontal, vertical, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>horizontal</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>vertical</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>15px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include lifted_shadow( rgba(0, 0, 0, 0.5), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox lifted_shadow one smal">\n\t<h2>Lifted Shadow</h2>\n\t\t<p class="warning">@include lifted_shadow( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox lifted_shadow two smal">\n\t<h2>Lifted Shadow</h2>\n\t\t<p class="warning">@include lifted_shadow( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="vertical_curves">Vertical Curves</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox vertical_curves ">\n\t<h2>Vertical Curves</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tVertical Curves via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tvertical_curves( <span class="vars">color, times, horizontal, vertical, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>horizontal</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>vertical</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>15px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include vertical_curves( rgba(0, 0, 0, 0.42), 3 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox vertical_curves one smal">\n\t<h2>Vertical Curves</h2>\n\t\t<p class="warning">@include vertical_curves( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox vertical_curves two smal">\n\t<h2>Vertical Curves</h2>\n\t\t<p class="warning">@include vertical_curves( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="horizontal_curves">Horizontal Curves</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox horizontal_curves ">\n\t<h2>Horizontal Curves</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tHorizontal Curves via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\thorizontal_curves( <span class="vars">color, times, horizontal, vertical, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>horizontal</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>vertical</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>15px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include horizontal_curves( rgba(0, 0, 0, 0.42), 3 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox horizontal_curves one smal">\n\t<h2>Horizontal Curves</h2>\n\t\t<p class="warning">@include horizontal_curves( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox horizontal_curves two smal">\n\t<h2>Horizontal Curves</h2>\n\t\t<p class="warning">@include horizontal_curves( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="vertical_shine">Vertical Shine</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox vertical_shine ">\n\t<h2>Vertical Shine</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tVertical Shine via :before &amp; :after Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tvertical_shine( <span class="vars">color, times, width, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>width</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>3px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include vertical_shine( rgba(0, 0, 0, 0.3), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox vertical_shine one smal">\n\t<h2>Vertical Shine</h2>\n\t\t<p class="warning">@include vertical_shine( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox vertical_shine two smal">\n\t<h2>Vertical Shine</h2>\n\t\t<p class="warning">@include vertical_shine( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="horizontal_shine">Horizontal Shine</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox horizontal_shine ">\n\t<h2>Horizontal Shine</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tHorizontal Shine via :before &amp; :after Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\thorizontal_shine( <span class="vars">color, times, width, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>width</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>3px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include horizontal_shine( rgba(0, 0, 0, 0.3), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox horizontal_shine one smal">\n\t<h2>Horizontal Shine</h2>\n\t\t<p class="warning">@include horizontal_shine( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox horizontal_shine two smal">\n\t<h2>Horizontal Shine</h2>\n\t\t<p class="warning">@include horizontal_shine( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="single_curve">Single Curve</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox single_curve ">\n\t<h2>Single Curve</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tSingle Curve via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tsingle_curve( <span class="vars">color, times, position, width, blur, size, corner</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>position</th>\n\t\t\t\t<td>position</td>\n\t\t\t\t<td>top | left</td>\n\t\t\t\t<td>left</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>width</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>5px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>corner</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>50 | 100</td>\n\t\t\t\t<td>50</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include single_curve( rgba(0, 0, 0, 0.5), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox single_curve one smal">\n\t<h2>Single Curve</h2>\n\t\t<p class="warning">@include single_curve( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox single_curve two smal">\n\t<h2>Single Curve</h2>\n\t\t<p class="warning">@include single_curve( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="single_shine">Single Shine</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox single_shine ">\n\t<h2>Single Shine</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tSingle Shine via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tsingle_shine( <span class="vars">color, times, position, width, blur, size, corner</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>position</th>\n\t\t\t\t<td>position</td>\n\t\t\t\t<td>top | left</td>\n\t\t\t\t<td>right</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>width</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>5px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>corner</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>50 | 100</td>\n\t\t\t\t<td>50</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include single_shine( rgba(0, 0, 0, 0.5), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox single_shine one smal">\n\t<h2>Single Shine</h2>\n\t\t<p class="warning">@include single_shine( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox single_shine two smal">\n\t<h2>Single Shine</h2>\n\t\t<p class="warning">@include single_shine( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="paper_shadow">Paper Shadow</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox paper_shadow ">\n\t<h2>Paper Shadow</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tPaper Shadow via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tpaper_shadow( <span class="vars">color, times</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>1</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include paper_shadow( rgba(0, 0, 0, 0.5), 2 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox paper_shadow one smal">\n\t<h2>Paper Shadow</h2>\n\t\t<p class="warning">@include paper_shadow( rgba(102, 53, 53, 0.5), 5 );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox paper_shadow two smal">\n\t<h2>Paper Shadow</h2>\n\t\t<p class="warning">@include paper_shadow( rgba(204, 0, 0, 0.5), 2 );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="pseudo_raised_shadow">Pseudo Raised Shadow</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox pseudo_raised_shadow ">\n\t<h2>Pseudo Raised Shadow</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tPseudo Raised Shadow via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tpseudo_raised_shadow( <span class="vars">color, times, gap, radius, horizontal, vertical, blur, size</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>gap</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>radius</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>3px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>horizontal</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>vertical</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>5px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>5px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>size</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>0</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include paper_shadow( rgba(0, 0, 0, 0.5), 3 );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox pseudo_raised_shadow one smal">\n\t<h2>Pseudo Raised Shadow</h2>\n\t\t<p class="warning">@include pseudo_raised_shadow( rgba(102, 53, 53, 0.5), 5, 30px, 10px, 0, 10px );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox pseudo_raised_shadow two smal">\n\t<h2>Pseudo Raised Shadow</h2>\n\t\t<p class="warning">@include pseudo_raised_shadow( rgba(102, 53, 53, 0.5), 5, 10px, 10px, 20px, 10px );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n<div class="section">\n  <div class="corset top">\n\n\n\t<div class="box">\n\t\n\t<div class="header">\n\t\t<a name="perspective_shadow">Perspective Shadow</a>\n\t</div>\n\t<div class="body" style="position: relative; z-index: 1">\n\t\t\n\t\t<p class="warning">! <strong>Wrapper needs:</strong> "position: relative; z-index: 1" !</p>\n\t\t\n\t\t\n\t<div class="clearfix"></div>\n\n<div class="samplebox perspective_shadow ">\n\t<h2>Perspective Shadow</h2>\n\t\t<table class="code">\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tPerspective Shadow via :before Pseudo-Elements .. other box-shadows still possible !\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>usage</th>\n\t\t\t\t\t<td>\n\t\t\t\t\t\tperspective_shadow( <span class="vars">color, times, degre, blur</span> );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class="options">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t<table class="options">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="option">option</th>\n\t\t\t<th class="value">value</th>\n\t\t\t<th class="sample">sample</th>\n\t\t\t<th class="default">default</th>\n\t\t\t<th class="status">optional</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<th>color</th>\n\t\t\t\t<td>rgba | hex</td>\n\t\t\t\t<td>rgba(0,0,0,.5) | #333</td>\n\t\t\t\t<td> - </td>\n\t\t\t\t<td>✘</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>times</th>\n\t\t\t\t<td>number</td>\n\t\t\t\t<td>1 - 9</td>\n\t\t\t\t<td>3</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>degre</th>\n\t\t\t\t<td>degree</td>\n\t\t\t\t<td>50 | 30</td>\n\t\t\t\t<td>30</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<th>blur</th>\n\t\t\t\t<td>Pixel</td>\n\t\t\t\t<td>3px | 0</td>\n\t\t\t\t<td>10px</td>\n\t\t\t\t<td>✔</td>\n\t\t\t</tr>\n\t</tbody>\n</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>\n\t\t\t\t\t\tthis\n\t\t\t\t\t</th>\n\t\t\t\t\t<td class="code">\n\t\t\t\t\t\t@include perspective_shadow( rgba(0, 0, 0, 0.42), 1, 30, 3px );\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t</tbody></table>\n</div>\n\n\t<div class="clearfix"></div>\n\t<br>\n\t<div class="clearfix"></div>\n\n\t\t\n\t\t\n\n<div class="samplebox perspective_shadow one smal">\n\t<h2>Perspective Shadow</h2>\n\t\t<p class="warning">@include perspective_shadow( rgba(102, 53, 53, 0.5), 5, 50, 5px );</p>\n</div>\n\n\n\t\t\n\t\t\n\n<div class="samplebox perspective_shadow two smal">\n\t<h2>Perspective Shadow</h2>\n\t\t<p class="warning">@include perspective_shadow( rgba(204, 0, 0, 0.5), 2, 42, 10px );</p>\n</div>\n\n\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t<br>\n\t</div>\n</div>\n\n  </div>\n</div>\n\n\t\n\t\t\t\n\n\t</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/elements/circle_diagram"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>CSS Circle-Diagram</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4>\n    <table class="table table-condensed">\n      <tr>\n        <th>sass</th>\n        <td><code>@import "magic/elements/circle_diagram";</code></td>\n      </tr>\n      <tr>\n        <th>js </th>\n        <td><code>//= magic/circle_diagram</code></td>\n      </tr>\n    </table>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset tight">\n    \n    <div class="row">\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="circle-diagram" data-percent="87">\n\t\t\t\t\t<div class="outer_half_one"></div>\n\t\t\t\t\t<div class="outer_half_two"></div>\n\t\t\t\t\t<div class="inner_half_one"></div>\n\t\t\t\t\t<div class="inner_half_two"></div>\n\t\t\t\t\t<div class="middle_full">87 %</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="circle-diagram dark" data-percent="63">\n\t\t\t\t\t<div class="outer_half_one"></div>\n\t\t\t\t\t<div class="outer_half_two"></div>\n\t\t\t\t\t<div class="inner_half_one"></div>\n\t\t\t\t\t<div class="inner_half_two"></div>\n\t\t\t\t\t<div class="middle_full">63 %</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="clearfix"></div>\n    \n  </div>\n</div>\n\n\n<div class="section">\n  <div class="corset tight">\n    \n    <div class="row">\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="circle-diagram responsive" data-percent="87">\n          <img src="');
      
        __out.push(__sanitize(assetPath("magic/helper/blank_10.png")));
      
        __out.push('" class="placeholder-pic" />\n\t\t\t\t\t<div class="outer_half_one"></div>\n\t\t\t\t\t<div class="outer_half_two"></div>\n\t\t\t\t\t<div class="inner_half_one"></div>\n\t\t\t\t\t<div class="inner_half_two"></div>\n\t\t\t\t\t<div class="middle_full">87 %</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="circle-diagram dark responsive" data-percent="63">\n\t\t\t\t  <img src="');
      
        __out.push(__sanitize(assetPath("magic/helper/blank_10.png")));
      
        __out.push('" class="placeholder-pic" />\n\t\t\t\t\t<div class="outer_half_one"></div>\n\t\t\t\t\t<div class="outer_half_two"></div>\n\t\t\t\t\t<div class="inner_half_one"></div>\n\t\t\t\t\t<div class="inner_half_two"></div>\n\t\t\t\t\t<div class="middle_full">63 %</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="clearfix"></div>\n    \n  </div>\n</div>\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/helper/arrow_infos"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Arrow Infos</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4> \n    <code>@import "magic/helper/arrow_hints";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset center_text">\n    <br/>\n    <br/>\n    <br/>\n    <button class="btn btn-success help_arrow" data-text=".help_arrow">\n      Some element\n    </button>\n    \n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    \n    <p class="loud">Arrow Hints can be used on every element, just add class \'help_arrow\' and data-intro attribute with your Hint text.</p>\n    <pre>\n      <code>\n    &lt;button class=&quot;btn btn-success help_arrow&quot; data-text=&quot;Go baby Go!&quot;&gt;<br/>      Click Me<br/>    &lt;/button&gt;\n      </code>\n    </pre>\n    <p class="highlight">Be carefull! Arrow and Hint are absolute positioned, so they may overlap other content.</p>\n  </div>\n</div>\n\n\n<div class="section fat">\n  <div class="corset">\n    \n    <button class="btn btn-default help_arrow" data-text="Here goes your info text.">\n      .btn.help_arrow[data-text=\'Here goes your info text.\']\n    </button>\n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/helper/crossed_text"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Crossed Text</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4>\n    <code>@import "magic/helper/crossed";</code>\n  </div>\n</div>\n\n<div class="section hard-top fat">\n  <div class="corset">\n    \n    <h2 class="sans thin">Use the <span class="crossed" data-text="power">help</span> of magic_stylez and write your layouts faster.</h2>\n    \n  </div>\n</div>\n\n\n\n<div class="section shine-top">\n  <div class="corset">\n    <h2>Usage:</h2>\n    <pre><code>\n  &lt;span class=&quot;crossed&quot; data-text=&quot;power&quot;&gt;help&lt;/span&gt;\n    </code></pre>\n    <p class="loud"><strong>Absolute positioned .. needs space!</strong></p>\n  </div>\n</div>\n\n\n\n<div class="section hard-top fat">\n  <div class="corset">\n    <p class="loud">Allways provide enough space over the changed text</p>\n    <div class="divider">\n      <p>Good example:</p>\n    </div>\n    <br/>\n    <p class="loud">Hello <span class="crossed" data-text="You!">World</span> you look great today!</p>\n    <div class="divider">\n      <p>Bad example:</p>\n    </div>\n    <p class="loud">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <span class="crossed" data-text="consectetur">voluptate</span> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/helper/divider"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Divider</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4>\n    <code>@import "magic/helper/divider";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset center_text">\n    <p class="loud press">Divider are a nice hr-like text divider:</p>\n    \n    <div class="divider press">\n      <span class="name">I\'m a divider :)</span>\n    </div>\n    \n    <p class="loud press">There are many usecases for dividers</p>\n    \n    <div class="divider half press">\n      <span class="name">I\'m a .half divider</span>\n    </div>\n    \n\n    \n  </div>\n</div>\n\n\n<div class="section head">\n  <div class="corset">\n    <h3>ie. divide Buttons:</h3>\n  </div>\n</div>\n\n\n\n<div class="section">\n  <div class="corset tight center_text">\n    \n    <div class="btn btn-facebook btn-lg btn-divided">\n      <div class="icn">\n        <i class="icomoon-facebook"></i>\n      </div>\n      <div class="text">\n        Sign in with Facebook\n      </div>\n    </div>\n    <div class="divider">\n      <span>or</span>\n    </div>\n    <div class="inpt-splited input-lg">\n      <span class="icn"><i class="icomoon-mail2"></i></span>\n      <div class="inpt">\n        <input placeholder="Email" type="email" value="">\n      </div>\n    </div>\n    \n    <div class="inpt-splited input-lg">\n      <span class="icn"><i class="icomoon-key"></i></span>\n      <div class="inpt">\n        <input placeholder="Password" type="password" value="">\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n\n<div class="section head">\n  <div class="corset">\n    <h3>Usage:</h3>\n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    <pre>\n      <code>\n  &lt;div class=&quot;divider&quot;&gt;<br/>    &lt;span&gt;or&lt;/span&gt;<br/>  &lt;/div&gt;\n      </code>\n    </pre>\n    <p class="loud"><strong>Parent box needs background!</strong></p>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/helper/three_previews"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Three Previews</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency:</h4>\n    <code>@import "magic/helper/three_previews";</code>\n  </div>\n</div>\n\n<div class="section hard-top flat-bottom">\n  <div class="corset tight">\n    \n    <div class="three-previews">\n      \n      <div class="preview">\n        <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/seucide.jpg")));
      
        __out.push('" />\n      </div>\n      <div class="preview">\n        <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/hdr_landsberger.jpg")));
      
        __out.push('" />\n      </div>\n      <div class="preview">\n        <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/seucide.jpg")));
      
        __out.push('" />\n      </div>\n      \n    </div>\n    \n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    <ul class="arrows">\n      <li>Needs surrounding <em>.section.flat-bottom</em> and <em>.corset.tight</em></li>\n      <li>Next .section should have class <em>.hard-top</em> or <em>.shine-top</em></li>\n      <li>All Images should have the same dimensions</li>\n    </ul>\n  </div>\n</div>\n\n\n<div class="section hard-top">\n  <div class="corset">\n    <pre>\n      <code>\n  &lt;div class=&quot;three-previews&quot;&gt;<br/>    &lt;div class=&quot;preview&quot;&gt;<br/>      &lt;img src=&quot;/images/image_1.jpg&quot; /&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class=&quot;preview&quot;&gt;<br/>      &lt;img src=&quot;/images/image_2.jpg&quot; /&gt;<br/>    &lt;/div&gt;<br/>    &lt;div class=&quot;preview&quot;&gt;<br/>      &lt;img src=&quot;/images/image_3.jpg&quot; /&gt;<br/>    &lt;/div&gt;<br/>  &lt;/div&gt;\n      </code>\n    </pre>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/icons/glyphicons"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var i, icon, _i, _len;
      
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Glyphicons (from twitter bootstrap)</h1>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    \n    ');
      
        for (i = _i = 0, _len = glyphicons.length; _i < _len; i = ++_i) {
          icon = glyphicons[i];
          __out.push('\n    \n      <div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="glyphicon glyphicon-');
          __out.push(__sanitize(icon));
          __out.push('"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\t');
          __out.push(__sanitize(icon));
          __out.push('\n\t\t\t\t</div>\n\t\t\t</div>\n    \n    ');
        }
      
        __out.push('\n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/icons/icomoon"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var i, icon, _i, _len;
      
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Icomoon Free</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency: <small>(packable)</small></h4>\n    <code>@import "magic/icons/icomoon";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    \n    ');
      
        for (i = _i = 0, _len = icomoons.length; _i < _len; i = ++_i) {
          icon = icomoons[i];
          __out.push('\n    \n      <div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="icomoon-');
          __out.push(__sanitize(icon));
          __out.push('"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\t');
          __out.push(__sanitize(icon));
          __out.push('\n\t\t\t\t</div>\n\t\t\t</div>\n    \n    ');
        }
      
        __out.push('\n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/icons/magicons"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var i, icon, _i, _len;
      
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>magicons (used in earlier app)</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency: <small>(packable)</small></h4>\n    <code>@import "magic/icons/magicons";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    \n    ');
      
        for (i = _i = 0, _len = magicons.length; _i < _len; i = ++_i) {
          icon = magicons[i];
          __out.push('\n    \n      <div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="magicons-');
          __out.push(__sanitize(icon));
          __out.push('"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\t');
          __out.push(__sanitize(icon));
          __out.push('\n\t\t\t\t</div>\n\t\t\t</div>\n    \n    ');
        }
      
        __out.push('\n    \n  </div>\n</div>\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/icons/olicons"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var i, icon, _i, _len;
      
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Olicons (used in orderlift.com)</h1>\n  </div>\n</div>\n\n<div class="section dark flatted">\n  <div class="corset">\n    <h4>dependency: <small>(packable)</small></h4>\n    <code>@import "magic/icons/olicons";</code>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    \n    ');
      
        for (i = _i = 0, _len = olicons.length; _i < _len; i = ++_i) {
          icon = olicons[i];
          __out.push('\n    \n      <div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-');
          __out.push(__sanitize(icon));
          __out.push('"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\t');
          __out.push(__sanitize(icon));
          __out.push('\n\t\t\t\t</div>\n\t\t\t</div>\n    \n    ');
        }
      
        __out.push('\n    \n  </div>\n</div>\n\n<div class="section bright ">\n  <div class="corset">\n    <h2 class="highlight">Sorted Orderlifticons .. for better finding</h2>\n  </div>\n</div>\n\n\n<div class="section shine-top">\n  \n  <div class="corset">\n\t\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>header <small>(6)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-market"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmarket\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-projects-empty"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tprojects-empty\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-projects-full"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tprojects-full\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-tasks-empty"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttasks-empty\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-tasks-full"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttasks-full\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-settings"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsettings\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>main-nav <small>(4)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-overview"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\toverview\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-contacts"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcontacts\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-message-empty"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmessage-empty\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-message-full"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmessage-full\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>slidebar <small>(4)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-basket-empty"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbasket-empty\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-basket-full"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbasket-full\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-bell"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbell\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-notify"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tnotify\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>profile <small>(7)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-about-me"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tabout-me\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-portfolio"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tportfolio\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-portfolio-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tportfolio-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-general-informations"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgeneral-informations\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-contact-data"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcontact-data\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-career"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcareer\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-skills"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tskills\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>view <small>(5)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-view-list"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tview-list\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-view-tile"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tview-tile\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-view-cards"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tview-cards\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-view-map"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tview-map\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-view-map-2"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tview-map-2\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>action <small>(9)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-state-active"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tstate-active\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-state-inactive"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tstate-inactive\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-edit"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tedit\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-search"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsearch\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-zoom-in"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tzoom-in\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-zoom-out"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tzoom-out\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-comment"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcomment\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-share"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tshare\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-like"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tlike\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>#2 <small>(18)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-lock"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tlock\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-lock-open"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tlock-open\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-up"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-up\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-right"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-right\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-down"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-down\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-left"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-left\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-2-up"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-2-up\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-2-right"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-2-right\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-2-down"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-2-down\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-chevron-2-left"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tchevron-2-left\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-minus"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tminus\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-ok"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tok\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-close"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tclose\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus-sign"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus-sign\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-minus-sign"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tminus-sign\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-ok-sign"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tok-sign\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-close-sign"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tclose-sign\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>navigation <small>(2)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-show-sb"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tshow-sb\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-hide-sb"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\thide-sb\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>filterbar <small>(3)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-filter"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tfilter\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-preview"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tpreview\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-hide-filter"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\thide-filter\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>forms <small>(6)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-female"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tfemale\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-male"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmale\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-sex"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsex\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-sort-down"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsort-down\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-sort-up"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsort-up\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-sort"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsort\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>category <small>(2)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-product"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tproduct\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-object"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tobject\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>new <small>(2)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-question-answer"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tquestion-answer\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-secure"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsecure\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>edit ressource <small>(3)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-analytics"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tanalytics\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-inquiry"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tinquiry\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-orders"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\torders\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>product-properties <small>(3)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-environmentally-friendly"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tenvironmentally-friendly\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-waterproof"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twaterproof\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-delivery"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tdelivery\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>object-properties <small>(11)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-bright"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbright\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-dark"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tdark\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-indoor"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tindoor\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-outdoor"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\toutdoor\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-accessible"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\taccessible\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-smoker"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsmoker\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-non-smoker"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tnon-smoker\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-parking"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tparking\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-parking-meter"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tparking-meter\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-elevator"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\televator\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-max-people"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmax-people\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>features <small>(16)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-wlan"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twlan\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-beamer"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbeamer\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-microphone"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmicrophone\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-sockets"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsockets\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-internet"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tinternet\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-electricity"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\telectricity\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-coffee"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcoffee\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-water"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twater\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-pizza"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tpizza\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-burger"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tburger\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-drinks"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tdrinks\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-fast-food"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tfast-food\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-waiter"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twaiter\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-wine"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twine\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-dishes"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tdishes\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-stove"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tstove\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>layouts <small>(6)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-conference"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tconference\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-classroom"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tclassroom\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-banquet"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbanquet\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-theatre"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttheatre\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-u-shape"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tu-shape\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-workspace"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tworkspace\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>account <small>(6)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-woman"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\twoman\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-company"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcompany\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-store"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tstore\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-bar"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbar\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-restaurant"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\trestaurant\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>user <small>(7)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-investor"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-investor\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-work"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-work\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-business"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-business\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-normal"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-normal\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-business2"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-business2\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-dev"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-dev\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-men-html"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tmen-html\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>+ ... <small>(4)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus-contact"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus-contact\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus-picture"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus-picture\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus-company"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus-company\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-plus-company-contact"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tplus-company-contact\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>skills <small>(2)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-ruby"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\truby\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-html5"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\thtml5\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>social media <small>(12)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-facebook"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tfacebook\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-facebook-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tfacebook-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-google"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgoogle\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-google-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgoogle-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-google-cut"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgoogle-cut\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-google-cut-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgoogle-cut-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-twitter"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttwitter\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-twitter-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttwitter-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-linkedin"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tlinkedin\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-linkedin-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tlinkedin-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-xing"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\txing\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-xing-block"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\txing-block\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>other <small>(4)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-qr-code"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tqr-code\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-barcode"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tbarcode\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-cash"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcash\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-gift"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tgift\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n\n\t\n\t\n\t\n\t\n\n<div class="paper_box" id="icn">\n\t<div class="paper_head">\n\t\t<h2>New <small>(27)</small></h2>\n\t</div>\n\t<div class="inner">\n\t\t\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-auge"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tauge\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-inventar"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tinventar\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-analytics-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tanalytics-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-settings-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tsettings-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-slidebar"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tslidebar\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-info-circle"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tinfo-circle\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-product-circle"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tproduct-circle\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-pos-circle"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tpos-circle\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-user"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tuser\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-calendar"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcalendar\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-glass"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tglass\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-trash"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttrash\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-resize"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tresize\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-product-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tproduct-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-circle-plus"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcircle-plus\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-circle-times"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcircle-times\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-circle-minus"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcircle-minus\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-circle-ok"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcircle-ok\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-auge-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tauge-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-inventar-alt"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tinventar-alt\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-analytics-alt2"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tanalytics-alt2\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-euro-circle"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\teuro-circle\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-reports"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\treports\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-tasks"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\ttasks\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-vcard"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tvcard\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-catalog"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tcatalog\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="icon_sample">\n\t\t\t\t<div class="sample_icon">\n\t\t\t\t\t<i class="olicons-flyer"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class="sample_name">\n\t\t\t\t\tflyer\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\n\t\t<div class="clearfix"></div>\n\t\t\n\t\t\n\t</div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/layout/corset"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Corsets</h1>\n  </div>\n</div>\n<div class="section">\n  <div class="corset">\n    <h2>.section .corset</h2>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n  </div>\n</div>\n\n<div class="section">\n  <div class="corset tight">\n    <h2>.section .corset.tight</h2>\n    <div class="box">\n      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n    </div>\n  </div>\n</div>\n\n<div class="section">\n  <div class="corset full">\n    <h2>.section .corset.full</h2>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/layout/fullpage_table"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="fullpage-table" id="banner-one">\n  <div class="table-row">\n    <div class="banner-box responsive-hero with-footer with-header fill berlin">\n      <div class="banner-header">\n        <div class="corset">\n          <h1 class="loud">Fullpage Table</h1>\n        </div>\n      </div>\n      \n      <div class="banner-content">\n        <div class="corset">\n          <p class="loud">This is a fullpage-table, it allways uses fullpage-height<br/>(if content fits in).</p>\n        </div>\n      </div>\n      \n      <div class="banner-footer" id="sign_up_banner">\n        <div class="corset">\n          <div class="row">\n            <div class="col-sm-4 col-sm-offset-4">\n              <!--<a href="#" class="btn btn-success btn-block btn-lg">Sign up now</a>-->\n              <button class="btn btn-success btn-block help_arrow" data-text="Go click me!">\n                Click Me\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n</div>\n\n\n<div class="section shine-top">\n  <div class="corset">\n    <h2>Usage</h2>\n    <pre>\n    <code>\n&lt;div class=&quot;fullpage-table&quot; id=&quot;front-banner&quot;&gt;\n  &lt;div class=&quot;table-row&quot;&gt;<br/>    &lt;div class=&quot;banner-box responsive-hero with-footer with-header fill wood&quot;&gt;<br/>      &lt;div class=&quot;banner-header&quot;&gt;<br/>        &lt;div class=&quot;corset&quot;&gt;<br/>          &lt;h1 class=&quot;loud&quot;&gt;Fullpage Table&lt;/h1&gt;<br/>        &lt;/div&gt;<br/>      &lt;/div&gt;<br/>      <br/>      &lt;div class=&quot;banner-content&quot;&gt;<br/>        &lt;div class=&quot;corset&quot;&gt;<br/>          &lt;p class=&quot;loud&quot;&gt;This is a fullpage-table, it allways uses fullpage-height (if content fits in).&lt;/p&gt;<br/>        &lt;/div&gt;<br/>      &lt;/div&gt;<br/>      <br/>      &lt;div class=&quot;banner-footer&quot; id=&quot;sign_up_banner&quot;&gt;<br/>        &lt;div class=&quot;corset&quot;&gt;<br/>          &lt;div class=&quot;row&quot;&gt;<br/>            &lt;div class=&quot;col-sm-4 col-sm-offset-4&quot;&gt;<br/>              &lt;a href=&quot;#&quot; class=&quot;btn btn-success btn-block btn-lg&quot;&gt;Sign up now&lt;/a&gt;<br/>            &lt;/div&gt;<br/>          &lt;/div&gt;<br/>        &lt;/div&gt;<br/>      &lt;/div&gt;<br/>      <br/>    &lt;/div&gt;<br/>  &lt;/div&gt;<br/>&lt;/div&gt;\n    </code>\n    </pre>\n  </div>\n</div>\n\n<div class="fullpage-table" id="banner-two">\n  <div class="table-row">\n    <div class="banner-box responsive-hero with-footer with-header fill berlin fixed-bg">\n      <div class="banner-header">\n        <div class="corset">\n          <h1 class="loud">Fullpage Table <small>with fixed Background</small></h1>\n        </div>\n      </div>\n      \n      <div class="banner-content">\n        <div class="corset">\n          <p class="loud">This is a fullpage-table, it allways uses fullpage-height<br/>(if content fits in).</p>\n        </div>\n      </div>\n      \n      <div class="banner-footer" id="sign_up_banner">\n        <div class="corset">\n          <div class="row">\n            <div class="col-sm-4 col-sm-offset-4">\n              <!--<a href="#" class="btn btn-success btn-block btn-lg">Sign up now</a>-->\n              <button class="btn btn-success btn-block help_arrow" data-text="Go click me!">\n                Click Me\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/layout/layout_table"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Layout Table</h1>\n  </div>\n</div>\n\n<div class="section">\n  <div class="corset">\n    \n    <div class="layout-table middled">\n      <div class="cell col-5">\n        <span class="loud">.layout-table.middled > .cell</span>\n      </div>\n      <div class="cell col-7">\n        <div class="box">\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </div>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<div class="section">\n  <div class="corset">\n    \n    <div class="layout-table grid">\n      <div class="cell col-5">\n        <div class="pic">\n          <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/rain-flower.jpg")));
      
        __out.push('" />\n        </div>\n      </div>\n      <div class="cell col-7 top">\n        <span class="loud">.layout-table > .cell.top</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut \n        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n        nisi ut aliquip ex ea commodo consequat. \n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<div class="section">\n  <div class="corset">\n    \n    <div class="layout-table grid">\n      <div class="cell col-7 middle">\n        <span class="loud">.layout-table > .cell.middle</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut \n        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n        nisi ut aliquip ex ea commodo consequat. \n      </div>\n      <div class="cell col-5">\n        <div class="pic">\n          <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/seucide.jpg")));
      
        __out.push('" />\n        </div>\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n<div class="section">\n  <div class="corset">\n    \n    <div class="layout-table grid">\n      <div class="cell col-5">\n        <div class="pic">\n          <img src="');
      
        __out.push(__sanitize(assetPath("magic/bgs/rain-flower.jpg")));
      
        __out.push('" />\n        </div>\n      </div>\n      <div class="cell col-7 bottom">\n        <span class="loud">.layout-table > .cell.bottom</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut \n        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n        nisi ut aliquip ex ea commodo consequat. \n      </div>\n    </div>\n    \n  </div>\n</div>\n\n\n<div class="section shine-top">\n  <div class="corset">\n    <h2>Usage</h2>\n    <pre><code>    &lt;div class=&quot;layout-table middled&quot;&gt;<br/>      &lt;div class=&quot;cell col-5&quot;&gt;<br/>        ...<br/>      &lt;/div&gt;<br/>      &lt;div class=&quot;cell col-7&quot;&gt;<br/>        ...<br/>      &lt;/div&gt;<br/>    &lt;/div&gt;</code></pre>\n    \n    <pre><code>    &lt;div class=&quot;layout-table grid&quot;&gt;<br/>      &lt;div class=&quot;cell col-4&quot;&gt;<br/>        ...<br/>      &lt;/div&gt;<br/>      &lt;div class=&quot;cell col-8 bottom&quot;&gt;<br/>        ...<br/>      &lt;/div&gt;<br/>    &lt;/div&gt;</code></pre>\n  </div>\n</div>\n\n<div class="section shine-top">\n  <div class="corset">\n    <div class="divider">\n      <span>with .grid</span>\n    </div>\n    <div class="layout-table grid">\n      <div class="cell col-6">\n        <span class="loud">.layout-table.grid > .cell</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n      </div>\n      <div class="cell col-6">\n        <span class="loud">.layout-table.grid > .cell</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n      </div>\n    </div>\n    <div class="divider">\n      <span>without .grid</span>\n    </div>\n    <div class="layout-table">\n      <div class="cell col-6">\n        <span class="loud">.layout-table > .cell</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n      </div>\n      <div class="cell col-6">\n        <span class="loud">.layout-table > .cell</span>\n        <br/>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n      </div>\n    </div>\n    \n  </div>\n</div>\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/layout/section"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section head">\n  <div class="corset">\n    <h1>Sections <small>.section.head .corset h1</small></h1>\n  </div>\n</div>\n<div class="section">\n  <div class="corset">\n    <p class="loud">Sections are just wrapper for content, they come with some nice states:</p>\n  </div>\n</div>\n\n<div class="section hard-top">\n  <div class="corset">\n    <h4>.hard-top</h4>\n  </div>\n</div>\n<div class="section dotted-top">\n  <div class="corset">\n    <h4>.dotted-top</h4>\n  </div>\n</div>\n<div class="section shine-top">\n  <div class="corset">\n    <h4>.shine-top</h4>\n  </div>\n</div>\n<div class="section dark">\n  <div class="corset">\n    <h4>.dark</h4>\n  </div>\n</div>\n<div class="section bright">\n  <div class="corset">\n    <h4>.bright</h4>\n  </div>\n</div>\n<div class="section brand">\n  <div class="corset">\n    <h4>.brand</h4>\n  </div>\n</div>\n<div class="section blank">\n  <div class="corset">\n    <h4>.blank</h4>\n  </div>\n</div>\n\n\n\n\n<div class="section shine-top shine-bottom compact">\n  <div class="corset">\n    <h4>.shine-top .shine-bottom .compact</h4>\n  </div>\n</div>\n\n<div class="section shine-bottom compact">\n  <div class="corset">\n    <h4>.shine-bottom .compact</h4>\n  </div>\n</div>\n\n\n<div class="section">\n  <div class="corset">\n    <h2>Sizes:</h2>\n    <table class="table">\n      <thead>\n        <tr>\n          <th>Class</th>\n          <th>Padding-Top</th>\n          <th>Padding-Bottom</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <th> </th>\n          <td>50px</td>\n          <td>50px</td>\n        </tr>\n        <tr>\n          <th>.compact</th>\n          <td>10px</td>\n          <td>10px</td>\n        </tr>\n        <tr>\n          <th>.fat</th>\n          <td>80px</td>\n          <td>80px</td>\n        </tr>\n        <tr>\n          <th>.fatter</th>\n          <td>120px</td>\n          <td>120px</td>\n        </tr>\n        <tr>\n          <th>.flatted</th>\n          <td>30px</td>\n          <td>30px</td>\n        </tr>\n        <tr>\n          <th>.flat</th>\n          <td>0px</td>\n          <td>0px</td>\n        </tr>\n        <tr>\n          <th>.flat-top</th>\n          <td>0px</td>\n          <td> </td>\n        </tr>\n        <tr>\n          <th>.flat-bottom</th>\n          <td> </td>\n          <td>0px</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/layout/slide_boxes"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="section">\n  <div class="corset">\n    \n    <div class="layout-slider">\n      <div class="box aside left">\n    \n        <ul id="devise_links" class="nav_list big">\n          <li><a href="#" class="shaguar"><i class="icon-check"></i> Anmelden</a></li>\n          <li><a href="#" class="shaguar"><i class="icon-edit"></i> Registrieren</a></li>\n          <li><span class="lst_lnk"><i class="icon-cog"></i> Probleme</span>\n            <ul class="sub_nav">\n              <li><a href="#">Passwort vergessen</a></li>\n              <li><a href="#">Bestätigung erneut senden</a></li>\n              <li><a href="#">Entsperr-E-Mail erneut</a></li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n      <div class="box main" style="min-height: 0px;">\n      \t<div class="head">\n      \t\t<button class="btn layout-slider-oppener">\n      \t\t\t<i class="icon-list opener"></i>\n      \t\t\t<i class="icon-arrow-left closer"></i>\n      \t\t</button>\n      \t\t<h1>Tach</h1>\n      \t</div>\n      \tBla bla ...\n      </div>\n    </div>\n    \n    \n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/templates/aside-nav"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<iframe src="');
      
        __out.push(__sanitize("" + (rootPath()) + "aside-nav"));
      
        __out.push('" name="SELFHTML_in_a_box" id="mainFrame">\n  <p>Sorry, your Browser doesn\'t like Frames.\n  But we would need an iframe to show the template stuff\n  <a href="/aside-nav">Aside Nav</a></p>\n</iframe>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/templates/fixed_header"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<iframe src="');
      
        __out.push(__sanitize("" + (rootPath()) + "fixed-header"));
      
        __out.push('" name="SELFHTML_in_a_box" id="mainFrame">\n  <p>Sorry, your Browser doesn\'t like Frames.\n  But we would need an iframe to show the template stuff\n  <a href="/fixed-header">Fixed Header</a></p>\n</iframe>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/templates/fixed_subnav"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<iframe src="');
      
        __out.push(__sanitize("" + (rootPath()) + "fixed-subnav"));
      
        __out.push('" name="SELFHTML_in_a_box" id="mainFrame">\n  <p>Sorry, your Browser doesn\'t like Frames.\n  But we would need an iframe to show the template stuff\n  <a href="/responsive-slidebar">Fixed Subnav</a></p>\n</iframe>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/templates/slidebar_header"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<iframe src="');
      
        __out.push(__sanitize("" + (rootPath()) + "slidebar-header"));
      
        __out.push('" name="SELFHTML_in_a_box" id="mainFrame">\n  <p>Sorry, your Browser doesn\'t like Frames.\n  But we would need an iframe to show the template stuff\n  <a href="/responsive-slidebar">Slidebar Header</a></p>\n</iframe>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
(function() { this.JST || (this.JST = {}); this.JST["views/templates/slidebar_subnav"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<iframe src="');
      
        __out.push(__sanitize("" + (rootPath()) + "slidebar-subnav"));
      
        __out.push('" name="SELFHTML_in_a_box" id="mainFrame">\n  <p>Sorry, your Browser doesn\'t like Frames.\n  But we would need an iframe to show the template stuff\n  <a href="/responsive-slidebar">Slidebar Subnav</a></p>\n</iframe>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: position.top })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children('.item')

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid". not a typo. past tense of "to slide".
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () { // yes, "slid". not a typo. past tense of "to slide".
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0) // yes, "slid". not a typo. past tense of "to slide".
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel') // yes, "slid". not a typo. past tense of "to slide".
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function (e) {
      if (e && e.target != this.$element[0]) {
        this.$element
          .one($.support.transition.end, $.proxy(complete, this))
        return
      }
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function (e) {
      if (e && e.target != this.$element[0]) {
        this.$element
          .one($.support.transition.end, $.proxy(complete, this))
        return
      }
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scrollspy', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar =  function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? {top: 0, left: 0} : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
(function() {
  var CircleDiagram,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CircleDiagram = (function() {
    var defaults;

    function CircleDiagram(options) {
      this.set_rotation = __bind(this.set_rotation, this);
      this.rotate_to = __bind(this.rotate_to, this);
      this.opt = options ? options : {};
      this.options = $.extend({}, defaults, this.opt);
      this.circle = this.options.circle;
      this.el = this.circle.find(this.options.el);
      this.percent = this.options.percent;
      this.degree = this.options.deg;
      this.rotating = this.options.rotating;
      this.timer = this.options.timer;
      this.setup();
    }

    defaults = {
      el: '.inner_half_one',
      circle: '.circle-diagram',
      percent: 0,
      deg: 0,
      rotating: false,
      precision: "ungenau",
      timeStep: 20,
      fastStep: 5,
      slowStep: 50,
      timer: void 0
    };

    CircleDiagram.prototype.rotate = function() {
      this.clean_percent;
      this.set_rotation(this.percent);
      return this.timer = setTimeout(function() {
        ++this.percent;
        return this.rotate();
      }, this.options.timeStep);
    };

    CircleDiagram.prototype.rotate_to = function(value) {
      var deg, new_value, timerStep;
      this.clean_percent;
      deg = parseInt(360 / 100 * value);
      this.set_rotation(this.percent, this.degree);
      if (this.degree !== deg) {
        if (this.degree < deg) {
          new_value = this.degree + 1;
          timerStep = deg - this.degree;
        } else {
          new_value = this.degree - 1;
          timerStep = this.degree - deg;
        }
        this.degree = new_value;
        if (this.options.precision === "genau") {
          this.percent = (Math.round(new_value / 360 * 100 * 10) / 10).toFixed(1);
        } else {
          this.percent = parseInt(new_value / 360 * 100);
        }
        return this.timer = setTimeout((function(_this) {
          return function() {
            return _this.rotate_to(value);
          };
        })(this), this.getTimeStep(timerStep));
      } else {
        clearTimeout(this.timer);
        return this.set_rotation(value, this.degree);
      }
    };

    CircleDiagram.prototype.set_rotation = function(value, deg) {
      var circ;
      circ = deg + 90;
      this.el.css({
        "-webkit-transform": "rotate(" + circ + "deg)"
      });
      this.el.css({
        "-moz-transform": "rotate(" + circ + "deg)"
      });
      this.el.css({
        "-ms-transform": "rotate(" + circ + "deg)"
      });
      this.el.css({
        "-o-transform": "rotate(" + circ + "deg)"
      });
      this.el.css({
        "transform": "rotate(" + circ + "deg)"
      });
      this.circle.attr("data-deg", deg);
      this.circle.attr("data-percent", value);
      if (this.options.precision === "genau") {
        this.circle.find(".middle_full").html((Math.round(value * 10) / 10).toFixed(1) + " %");
      } else {
        this.circle.find(".middle_full").html(parseInt(value) + " %");
      }
      if (deg >= 180) {
        return this.circle.addClass("halfplus");
      } else {
        return this.circle.removeClass("halfplus");
      }
    };

    CircleDiagram.prototype.clean_percent = function() {
      if (this.percent > 100) {
        this.percent = this.percent - 100;
      }
      return this.percent;
    };

    CircleDiagram.prototype.setup = function() {
      var percent;
      percent = parseInt(this.circle.attr("data-percent")) || 0;
      if (percent !== this.percent) {
        return this.rotate_to(percent);
      }
    };

    CircleDiagram.prototype.getTimeStep = function(valu) {
      if (valu > 60) {
        return this.options.fastStep;
      } else if (valu > 18) {
        return this.options.timeStep;
      } else {
        return this.options.slowStep;
      }
    };

    return CircleDiagram;

  })();

  window.CircleDiagram = CircleDiagram;

}).call(this);
(function() {
  this.to_currency = function(number) {
    if (!isNaN(number)) {
      return (Math.round(parseFloat(number) * 100) / 100).toFixed(2);
    } else {
      return 0..toFixed(2);
    }
  };

  this.to_euro = function(number) {
    return "" + (to_currency(number)) + " €";
  };

  this.to_dollar = function(number) {
    return "$ " + (to_currency(number));
  };

  $(function() {
    return $("body").on("keyup", "input.number_field", function() {
      if (jQuery(this).val().indexOf(",") !== -1) {
        return jQuery(this).val(jQuery(this).val().replace(',', '.'));
      }
    });
  });

}).call(this);
(function() {
  $(function() {
    return $("body").on("click", ".navbar-slidebar .navbar-toggle", function(ev) {
      ev.preventDefault();
      $(this).closest(".navbar-slidebar").find(".navbar-collapse").toggleClass("on");
      return false;
    });
  });

}).call(this);
(function() {
  var icon;

  icon = function(icn) {
    return "<i class='icon icon-" + icn + "'></i>";
  };

}).call(this);
(function() {
  var appImages;

  appImages = {
    "magic/arrows/arrow-round1-a.png": "/assets/magic/arrows/arrow-round1-a.png",
    "magic/arrows/arrow-round1-b.png": "/assets/magic/arrows/arrow-round1-b.png",
    "magic/arrows/arrow-round2-a.png": "/assets/magic/arrows/arrow-round2-a.png",
    "magic/arrows/arrow-round2-b.png": "/assets/magic/arrows/arrow-round2-b.png",
    "magic/arrows/arrow1-a.png": "/assets/magic/arrows/arrow1-a.png",
    "magic/arrows/arrow1-b.png": "/assets/magic/arrows/arrow1-b.png",
    "magic/arrows/arrow1.png": "/assets/magic/arrows/arrow1.png",
    "magic/arrows/arrow2-1.png": "/assets/magic/arrows/arrow2-1.png",
    "magic/arrows/arrow2-2.png": "/assets/magic/arrows/arrow2-2.png",
    "magic/arrows/arrow2-a.png": "/assets/magic/arrows/arrow2-a.png",
    "magic/arrows/arrow2-b.png": "/assets/magic/arrows/arrow2-b.png",
    "magic/arrows/arrow3-a.png": "/assets/magic/arrows/arrow3-a.png",
    "magic/arrows/arrow3-b.png": "/assets/magic/arrows/arrow3-b.png",
    "magic/arrows/arrow4-a.png": "/assets/magic/arrows/arrow4-a.png",
    "magic/arrows/arrow4-b.png": "/assets/magic/arrows/arrow4-b.png",
    "magic/arrows/arrow5-a.png": "/assets/magic/arrows/arrow5-a.png",
    "magic/arrows/arrow5-b.png": "/assets/magic/arrows/arrow5-b.png",
    "magic/arrows/arrow6-a.png": "/assets/magic/arrows/arrow6-a.png",
    "magic/arrows/arrow6-b.png": "/assets/magic/arrows/arrow6-b.png",
    "magic/bgs/hdr_landsberger.jpg": "/assets/magic/bgs/hdr_landsberger.jpg",
    "magic/bgs/rain-flower.jpg": "/assets/magic/bgs/rain-flower.jpg",
    "magic/bgs/seucide.jpg": "/assets/magic/bgs/seucide.jpg",
    "magic/helper/blank_10.png": "/assets/magic/helper/blank_10.png",
    "magic/helper/crossed.png": "/assets/magic/helper/crossed.png",
    "magic/helper/hero_buy.png": "/assets/magic/helper/hero_buy.png",
    "magic/helper/white_10.png": "/assets/magic/helper/white_10.png"
  };

  this.assetPath = function(path) {
    return appImages["" + path];
  };

  this.rootPath = function() {
    if (window.location.hostname === "berlinmagic.github.io") {
      return "/magic_stylez/";
    } else {
      return "/";
    }
  };

  this.glyphicons = ["asterisk", "plus", "euro", "minus", "cloud", "envelope", "pencil", "glass", "music", "search", "heart", "star", "star-empty", "user", "film", "th-large", "th", "th-list", "ok", "remove", "zoom-in", "zoom-out", "off", "signal", "cog", "trash", "home", "file", "time", "road", "download-alt", "download", "upload", "inbox", "play-circle", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "indent-left", "indent-right", "facetime-video", "picture", "map-marker", "adjust", "tint", "edit", "share", "check", "move", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-sign", "minus-sign", "remove-sign", "ok-sign", "question-sign", "info-sign", "screenshot", "remove-circle", "ok-circle", "ban-circle", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "share-alt", "resize-full", "resize-small", "exclamation-sign", "gift", "leaf", "fire", "eye-open", "eye-close", "warning-sign", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder-close", "folder-open", "resize-vertical", "resize-horizontal", "hdd", "bullhorn", "bell", "certificate", "thumbs-up", "thumbs-down", "hand-right", "hand-left", "hand-up", "hand-down", "circle-arrow-right", "circle-arrow-left", "circle-arrow-up", "circle-arrow-down", "globe", "wrench", "tasks", "filter", "briefcase", "fullscreen", "dashboard", "paperclip", "heart-empty", "link", "phone", "pushpin", "usd", "gbp", "sort", "sort-by-alphabet", "sort-by-alphabet-alt", "sort-by-order", "sort-by-order-alt", "sort-by-attributes", "sort-by-attributes-alt", "unchecked", "expand", "collapse-down", "collapse-up", "log-in", "flash", "log-out", "new-window", "record", "save", "open", "saved", "import", "export", "send", "floppy-disk", "floppy-saved", "floppy-remove", "floppy-save", "floppy-open", "credit-card", "transfer", "cutlery", "header", "compressed", "earphone", "phone-alt", "tower", "stats", "sd-video", "hd-video", "subtitles", "sound-stereo", "sound-dolby", "sound-5-1", "sound-6-1", "sound-7-1", "copyright-mark", "registration-mark", "cloud-download", "cloud-upload", "tree-conifer", "tree-deciduous"];

  this.icomoons = ["home", "home2", "home3", "office", "newspaper", "pencil", "pencil2", "quill", "pen", "blog", "droplet", "paint-format", "image", "image2", "images", "camera", "music", "headphones", "play", "film", "camera2", "dice", "pacman", "spades", "clubs", "diamonds", "pawn", "bullhorn", "connection", "podcast", "feed", "book", "books", "library", "file", "profile", "file2", "file3", "file4", "copy", "copy2", "copy3", "paste", "paste2", "paste3", "stack", "folder", "folder-open", "tag", "tags", "barcode", "qrcode", "ticket", "cart", "cart2", "cart3", "coin", "credit", "calculate", "support", "phone", "phone-hang-up", "address-book", "notebook", "envelope", "pushpin", "location", "location2", "compass", "map", "map2", "history", "clock", "clock2", "alarm", "alarm2", "bell", "stopwatch", "calendar", "calendar2", "print", "keyboard", "screen", "laptop", "mobile", "mobile2", "tablet", "tv", "cabinet", "drawer", "drawer2", "drawer3", "box-add", "box-remove", "download", "upload", "disk", "storage", "undo", "redo", "flip", "flip2", "undo2", "redo2", "forward", "reply", "bubble", "bubbles", "bubbles2", "bubble2", "bubbles3", "bubbles4", "user", "users", "user2", "users2", "user3", "user4", "quotes-left", "busy", "spinner", "spinner2", "spinner3", "spinner4", "spinner5", "spinner6", "binoculars", "search", "zoomin", "zoomout", "expand", "contract", "expand2", "contract2", "key", "key2", "lock", "lock2", "unlocked", "wrench", "settings", "equalizer", "cog", "cogs", "cog2", "hammer", "wand", "aid", "bug", "pie", "stats", "bars", "bars2", "gift", "trophy", "glass", "mug", "food", "leaf", "rocket", "meter", "meter2", "dashboard", "hammer2", "fire", "lab", "magnet", "remove", "remove2", "briefcase", "airplane", "truck", "road", "accessibility", "target", "shield", "lightning", "switch", "powercord", "signup", "list", "list2", "numbered-list", "menu", "menu2", "tree", "cloud", "cloud-download", "cloud-upload", "download2", "upload2", "download3", "upload3", "globe", "earth", "link", "flag", "attachment", "eye", "eye-blocked", "eye2", "bookmark", "bookmarks", "brightness-medium", "brightness-contrast", "contrast", "star", "star2", "star3", "heart", "heart2", "heart-broken", "thumbs-up", "thumbs-up2", "happy", "happy2", "smiley", "smiley2", "tongue", "tongue2", "sad", "sad2", "wink", "wink2", "grin", "grin2", "cool", "cool2", "angry", "angry2", "evil", "evil2", "shocked", "shocked2", "confused", "confused2", "neutral", "neutral2", "wondering", "wondering2", "point-up", "point-right", "point-down", "point-left", "warning", "notification", "question", "info", "info2", "blocked", "cancel-circle", "checkmark-circle", "spam", "close", "checkmark", "checkmark2", "spell-check", "minus", "plus", "enter", "exit", "play2", "pause", "stop", "backward", "forward2", "play3", "pause2", "stop2", "backward2", "forward3", "first", "last", "previous", "next", "eject", "volume-high", "volume-medium", "volume-low", "volume-mute", "volume-mute2", "volume-increase", "volume-decrease", "loop", "loop2", "loop3", "shuffle", "arrow-up-left", "arrow-up", "arrow-up-right", "arrow-right", "arrow-down-right", "arrow-down", "arrow-down-left", "arrow-left", "arrow-up-left2", "arrow-up2", "arrow-up-right2", "arrow-right2", "arrow-down-right2", "arrow-down2", "arrow-down-left2", "arrow-left2", "arrow-up-left3", "arrow-up3", "arrow-up-right3", "arrow-right3", "arrow-down-right3", "arrow-down3", "arrow-down-left3", "arrow-left3", "tab", "checkbox-checked", "checkbox-unchecked", "checkbox-partial", "radio-checked", "radio-unchecked", "crop", "scissors", "filter", "filter2", "font", "text-height", "text-width", "bold", "underline", "italic", "strikethrough", "omega", "sigma", "table", "table2", "insert-template", "pilcrow", "lefttoright", "righttoleft", "paragraph-left", "paragraph-center", "paragraph-right", "paragraph-justify", "paragraph-left2", "paragraph-center2", "paragraph-right2", "paragraph-justify2", "indent-increase", "indent-decrease", "newtab", "embed", "code", "console", "share", "mail", "mail2", "mail3", "mail4", "google", "googleplus", "googleplus2", "googleplus3", "googleplus4", "google-drive", "facebook", "facebook2", "facebook3", "instagram", "twitter", "twitter2", "twitter3", "feed2", "feed3", "feed4", "youtube", "youtube2", "vimeo", "vimeo2", "vimeo3", "lanyrd", "flickr", "flickr2", "flickr3", "flickr4", "picassa", "picassa2", "dribbble", "dribbble2", "dribbble3", "forrst", "forrst2", "deviantart", "deviantart2", "steam", "steam2", "github", "github2", "github3", "github4", "github5", "wordpress", "wordpress2", "joomla", "blogger", "blogger2", "tumblr", "tumblr2", "yahoo", "tux", "apple", "finder", "android", "windows", "windows8", "soundcloud", "soundcloud2", "skype", "reddit", "linkedin", "lastfm", "lastfm2", "delicious", "stumbleupon", "stumbleupon2", "stackoverflow", "pinterest", "pinterest2", "xing", "xing2", "flattr", "foursquare", "foursquare2", "paypal", "paypal2", "paypal3", "yelp", "libreoffice", "file-pdf", "file-openoffice", "file-word", "file-excel", "file-zip", "file-powerpoint", "file-xml", "file-css", "html5", "html52", "css3", "chrome", "firefox", "IE", "opera", "safari", "IcoMoon"];

  this.magicons = ["close-round", "ok-round", "minus-round", "plus-round", "ban-circle", "attention-round", "info-round", "question-round", "arrow-up", "arrow-right", "arrow-down", "arrow-left", "fat-arrow-up", "fat-arrow-right", "fat-arrow-down", "fat-arrow-left", "chevron-round-up", "chevron-round-right", "chevron-round-down", "chevron-round-left", "caret-up", "caret-right", "caret-down", "caret-left", "hand-up", "hand-right", "hand-down", "hand-left", "hand-fuck", "hand-rock-back", "hand-rock", "thumb-up", "thumb-right", "thumb-down", "thumb-left", "handflat-left", "handflat-both", "handflat-right", "heart-round", "heart-empty", "comment", "comment-round", "comment-empty", "comments-round", "comments-empty", "bookmark", "bookmark-empty", "envelope", "envelope-alt", "envelope-open", "envelope-open-alt", "envelope-filled", "envelope-filled-alt", "envelope-inlay-open", "envelope-inlay-open-alt", "envelope-inlay-filled", "envelope-inlay-filled-alt", "tag", "tags", "star-round", "star-empty", "star-half-round", "star-half-empty", "user-male-round", "user-female-round", "user-group-round", "user-group-alt", "user-group-big", "search-round", "zoom-in", "zoom-out", "lock-round", "unlock-round", "wrench-round", "cog-round", "cog-alt", "cogs", "trash-round", "key", "key-alt", "pushpin-round", "map-marker-round", "time-round", "time-alt", "move", "resize-horizontal", "resize-vertical", "retweet", "reload", "random", "refresh", "adjust", "asterisk", "screenshot", "target-round", "volume-one", "volume-two", "volume-three", "sort-round", "sort-round-down", "sort-round-up", "signin", "signout", "sitemap", "signal", "download", "upload", "facebook", "twitter", "github", "github-alt", "pinterest", "linkedin", "google-plus", "flickr", "picasa", "rss", "firefox", "ie", "opera", "chrome", "safari", "phone", "phone-pickup", "phone-hangup", "pencil-round", "pencil-alt", "ballpen", "briefcase", "briefcase-alt", "inbox-round", "dashboard", "folder-close", "folder-open", "folder-alt", "book", "book-marked", "book-marked-alt", "address-book", "address-book-marked", "address-book-marked-alt", "book-open-round", "book-open-alt", "book-open-filled", "tasks", "reorder", "bar-chart-round", "clipboard-tasks", "clipboard-check", "clipboard-tasks-edge", "clipboard-check-edge", "pile-list-marked", "pile-check-marked-edge", "ringbinder-month", "ringbinder-day", "ringbinder-list", "ringbinder-month-edge", "ringbinder-day-edge", "ringbinder-list-edge", "picture-round", "picture-alt", "pictures", "external-link", "share", "edit", "check", "check-empty", "credit-card", "qrcode", "shopping-cart", "shopping-cart-alt", "shopping-cart-in", "shopping-cart-in-alt", "money", "money-euro-round", "money-dollar", "barcode", "barcode-alt", "globe-round", "globe-alt", "home", "truck", "plane", "road", "compass-round", "file", "files", "file-text", "file-alt", "file-edge", "file-black", "cut", "paste", "save", "paper-clip", "link", "link-alt", "undo", "repeat", "undo-alt", "repeat-alt", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "indent-left", "indent-right", "font", "bold", "italic", "strikethrough", "underline", "columns", "table", "th-large", "th", "th-list", "list-round", "list-ol", "list-ul", "list-alt", "staple", "staple-alt", "music", "power-round", "facetime-video", "film", "bullhorn", "camera-round", "camera-retro", "print-round", "print-alt", "hdd", "headphones", "play", "play-circle", "pause", "stop", "backward", "forward", "fast-backward", "fast-forward", "step-backward", "step-forward", "eject", "fullscreen", "resize-full", "resize-small", "trophy", "umbrella-round", "gift", "flag", "flag-alt", "certificate", "glass", "tint", "tints", "leaf", "legal", "cloud", "beaker", "lemon", "magic", "magic-alt", "bolt", "bolt-alt", "magnet", "thermometer", "bell", "filter", "hammer", "plug-round", "shirt", "steering-wheel", "triangle", "hands-up", "clock", "chart", "chart-open", "vitro", "vitro-bubble", "vitro-bubbles", "moon-round", "moon-empty", "moon-full", "sun-round", "sun-alt", "micro-round", "equalizer-round", "knots", "crop", "lectern", "html", "graph", "graph-alt", "transmit", "graduation-hat", "star-alt-round", "cog-more", "close-sign-round", "ok-sign-round", "plus-sign-round", "minus-sign-round", "attention-sign-round", "question-sign-round", "info-sign-round", "caret-up-sign", "caret-right-sign", "caret-down-sign", "caret-left-sign", "edit-sign", "user-minus", "user-plus", "user-unknown", "user-ok", "hand-high5", "hand-high5-back", "hand-shake", "hand-card", "compass", "globe", "inbox-empty", "inbox", "task-list", "user", "mail-empty", "mail", "cog", "chevron-cut-right", "chevron-cut-down", "chevron-cut-left", "chevron-up", "chevron-right", "chevron-down", "chevron-left", "lock", "unlock", "search", "visible", "unvisible", "pencil", "trash", "sort-down", "sort-up", "sort", "plus-sign", "minus-sign", "ok-sign", "close-sign", "question-sign", "info-sign", "attention-sign", "plus", "minus", "ok", "close", "question", "info", "attention", "work", "private", "picture", "pushpin", "heart", "map-marker", "user-group", "time", "star-alt", "book-open", "calendar", "calendar-invert", "target", "umbrella", "equalizer", "list", "star", "star-half", "money-euro", "tag-alt", "print", "message", "comment", "comments", "camera", "description", "bar-chart", "wrench", "user-male", "user-female", "user-male-alt", "user-female-alt", "company", "sun", "moon", "inside", "outside", "wlan", "beamer", "micro", "plug", "internet", "power", "wheelchair", "smoking-sign", "smoking", "no-smoking", "parking-sign", "parking-meter", "elevator", "toilette", "coffee", "water", "pizza", "burger", "softdrink", "fastfood", "catering", "wine", "plates", "kitchen", "layout-round-table", "layout-classroom", "layout-banquet", "layout-theater", "layout-u-table", "layout-workspace"];

  this.olicons = ["market", "projects-empty", "projects-full", "tasks-empty", "tasks-full", "settings", "overview", "contacts", "message-empty", "message-full", "basket-empty", "basket-full", "bell", "notify", "about-me", "portfolio", "portfolio-alt", "general-informations", "contact-data", "career", "skills", "view-list", "view-tile", "view-cards", "view-map", "state-active", "state-inactive", "edit", "view-map-2", "search", "zoom-in", "zoom-out", "comment", "share", "like", "lock", "lock-open", "chevron-up", "chevron-right", "chevron-down", "chevron-left", "chevron-2-up", "chevron-2-right", "chevron-2-down", "chevron-2-left", "plus", "minus", "ok", "close", "plus-sign", "minus-sign", "ok-sign", "close-sign", "show-sb", "hide-sb", "filter", "preview", "hide-filter", "female", "male", "sex", "sort-down", "sort-up", "sort", "product", "object", "question-answer", "secure", "analytics", "inquiry", "orders", "environmentally-friendly", "waterproof", "delivery", "bright", "dark", "indoor", "outdoor", "accessible", "smoker", "non-smoker", "parking", "parking-meter", "elevator", "max-people", "wlan", "beamer", "microphone", "sockets", "internet", "electricity", "coffee", "water", "pizza", "burger", "drinks", "fast-food", "waiter", "wine", "dishes", "stove", "conference", "classroom", "banquet", "theatre", "u-shape", "workspace", "men", "woman", "company", "store", "bar", "restaurant", "men-investor", "men-work", "men-business", "men-normal", "men-business2", "men-dev", "men-html", "plus-contact", "plus-picture", "plus-company", "plus-company-contact", "ruby", "html5", "facebook", "facebook-block", "google", "google-block", "google-cut", "google-cut-block", "twitter", "twitter-block", "linkedin", "linkedin-block", "xing", "xing-block", "qr-code", "barcode", "cash", "gift", "auge", "inventar", "analytics-alt", "settings-alt", "slidebar", "info-circle", "product-circle", "pos-circle", "user", "calendar", "glass", "trash", "resize", "product-alt", "circle-plus", "circle-times", "circle-minus", "circle-ok", "auge-alt", "inventar-alt", "analytics-alt", "euro-circle", "reports", "tasks", "vcard", "catalog", "flyer", "euro"];

}).call(this);
(function() {
  this.renderView = function(path, options) {
    var error;
    if (options == null) {
      options = {};
    }
    try {
      return JST["views/" + path](options);
    } catch (_error) {
      error = _error;
      if (App.Environment !== 'production') {
        if (typeof console !== "undefined" && console !== null) {
          console.log("Partial[" + path + "] => " + error);
        }
        return "<p class='error'>Sorry, there is no partial named '" + path + "'.</p>";
      } else {
        return '';
      }
    }
  };

}).call(this);
(function() {
  var currentPath, loadCircles, navigate;

  currentPath = "";

  loadCircles = function() {
    var count;
    if ($('.circle-diagram').length > 1) {
      window.circles = {};
      count = 0;
      return $('.circle-diagram').each(function() {
        window.circles[count] = new CircleDiagram({
          circle: $(this)
        });
        return count = count + 1;
      });
    } else if ($('.circle-diagram').length > 0) {
      return window.circleDiagram = new CircleDiagram({
        circle: $('.circle-diagram')
      });
    }
  };

  navigate = function() {
    var lnk, nav, nul, path;
    path = window.location.hash.replace(/#/, "");
    if (path !== currentPath) {
      if (path !== "") {
        $("#app_content").html($(renderView(path)));
      } else {
        $("#app_content").html($(renderView("app/start")));
      }
    }
    lnk = $(".app_lnk[data-target='" + path + "']").closest("li");
    nav = lnk.closest(".nav_list");
    nul = lnk.closest("ul");
    nav.find("li.active").removeClass("active");
    nav.find("li.current").removeClass("current");
    if (nav === nul) {
      lnk.addClass("current");
    } else {
      nul.closest("li").addClass("current");
    }
    lnk.addClass("active");
    loadCircles();
    return currentPath = path;
  };

  $(function() {
    $("body").on("click", ".hide_da_notice", function() {
      $("body").toggleClass("with_important_notice");
      return false;
    });
    $("body").on("click", ".get_some_borders", function() {
      $("#nav-aside").toggleClass("bordered");
      return false;
    });
    $("body").on("click", ".lst_lnk", function() {
      var nav, nul;
      nav = $(this).closest(".nav_list");
      nul = $(this).closest("ul");
      nav.find("li.active").removeClass("active");
      if (nav === nul) {
        nav.find("li.current").removeClass("current");
      } else {
        nul.find("li.current").removeClass("current");
      }
      $(this).closest("li").addClass("current");
      $(this).closest("li").addClass("active");
      if ($(this).attr("href") === "#") {
        return false;
      }
    });
    $("body").on("click", ".app_lnk", function() {
      var path;
      path = $(this).attr("data-target");
      if (path === void 0) {
        path = "";
      }
      return window.location.hash = path;
    });
    return $(window).on('popstate', function() {
      console.log("Popstate", window.location.pathname);
      return navigate();
    });
  });

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//






;
