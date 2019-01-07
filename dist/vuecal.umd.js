(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuecal"] = factory();
	else
		root["vuecal"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0699":
/***/ (function(module) {

module.exports = {"weekDays":["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],"months":["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],"years":"Années","year":"Année","month":"Mois","week":"Semaine","day":"Jour","today":"Aujourd'hui","noEvent":"Aucun événement","deleteEvent":"Supprimer","createEvent":"Créer un événement","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "17ac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85e1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__("aae3");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "2a6b":
/***/ (function(module) {

module.exports = {"weekDays":["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"],"months":["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],"years":"År","year":"År","month":"Månad","week":"Vecka","day":"Dag","today":"Idag","noEvent":"Ingen händelse","deleteEvent":"Ta bort","createEvent":"Skapa händelse","dateFormat":"DDDD den d mmmm yyyy"};

/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "386b":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4da1":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./de.json": "8d7d",
	"./en.json": "7213",
	"./es.json": "e240",
	"./fr.json": "0699",
	"./hr.json": "7cd4",
	"./it.json": "eed7",
	"./nl.json": "b258",
	"./pt-br.json": "89f4",
	"./ru.json": "a65a",
	"./sv.json": "2a6b",
	"./zh-cn.json": "88b4"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "4da1";

/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6b6a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7213":
/***/ (function(module) {

module.exports = {"weekDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"years":"Years","year":"Year","month":"Month","week":"Week","day":"Day","today":"Today","noEvent":"No Event","deleteEvent":"Delete","createEvent":"Create an event","dateFormat":"DDDD mmmm d{S}, yyyy"};

/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7cd4":
/***/ (function(module) {

module.exports = {"weekDays":["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota","Nedjelja"],"months":["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],"years":"Godine","year":"Godina","month":"Mjesec","week":"Tjedan","day":"Dan","today":"Današnji dan","noEvent":"Nema događaja","deleteEvent":"Obriši","createEvent":"Kreiraj događaj","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85e1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "88b4":
/***/ (function(module) {

module.exports = {"weekDays":["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],"months":["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],"years":"年","year":"本年","month":"月","week":"周","day":"日","today":"今日","noEvent":"暂无活动","deleteEvent":"删除","createEvent":"新建活动","dateFormat":"yyyy mmmm d DDDD"};

/***/ }),

/***/ "89f4":
/***/ (function(module) {

module.exports = {"weekDays":["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"],"months":["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],"years":"Anos","year":"Ano","month":"Mês","week":"Semana","day":"Dia","today":"Hoje","noEvent":"Sem eventos","deleteEvent":"Remover","createEvent":"Criar um evento","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8d7d":
/***/ (function(module) {

module.exports = {"weekDays":["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],"months":["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],"years":"Jahre","year":"Jahr","month":"Monat","week":"Woche","day":"Tag","today":"Heute","noEvent":"Keine Events","deleteEvent":"Löschen","createEvent":"Event erstellen","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "a65a":
/***/ (function(module) {

module.exports = {"weekDays":["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],"months":["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],"years":"Годы","year":"Год","month":"Месяц","week":"Неделя","day":"День","today":"Сегодня","noEvent":"Нет событий","deleteEvent":"Удалить","createEvent":"Создать событие","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b258":
/***/ (function(module) {

module.exports = {"weekDays":["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],"months":["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],"years":"Jaren","year":"Jaar","month":"Maand","week":"Week","day":"Dag","today":"Vandaag","noEvent":"Geen afspraken","deleteEvent":"Verwijderen","createEvent":"Nieuwe afspraak aanmaken","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d011":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cell_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6b6a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cell_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cell_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_cell_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e240":
/***/ (function(module) {

module.exports = {"weekDays":["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],"months":["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],"years":"Años","year":"Año","month":"Mes","week":"Semana","day":"Día","today":"Hoy","noEvent":"No hay envento","deleteEvent":"Borrar","createEvent":"Crear un evento","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "eed7":
/***/ (function(module) {

module.exports = {"weekDays":["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"],"months":["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],"years":"Anni","year":"Anno","month":"Mese","week":"Settimana","day":"Giorno","today":"Oggi","noEvent":"No evento","deleteEvent":"Cancellare","createEvent":"Creare un evento","dateFormat":"DDDD d mmmm yyyy"};

/***/ }),

/***/ "f386":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__("386b")('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0f87e5ee-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-cal/index.vue?vue&type=template&id=aac07750&lang=pug&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vuecal__flex vuecal",class:_vm.cssClasses,attrs:{"column":"","lang":_vm.locale}},[_c('div',{staticClass:"vuecal__header"},[(!_vm.hideViewSelector)?_c('ul',{staticClass:"vuecal__flex vuecal__menu"},_vm._l((_vm.views),function(v,id){return (v.enabled)?_c('li',{class:{ active: _vm.view.id === id },on:{"click":function($event){_vm.switchView(id)}}},[_vm._v(_vm._s(v.label))]):_vm._e()})):_vm._e(),_c('div',{staticClass:"vuecal__title"},[_c('div',{staticClass:"vuecal__arrow vuecal__arrow--prev",on:{"click":_vm.previous}},[_vm._t("arrowPrev",[_c('i',{staticClass:"angle"})])],2),_c('span',{class:{ clickable: !!_vm.broaderView },on:{"click":function($event){_vm.switchToBroaderView()}}},[_vm._v(_vm._s(_vm.viewTitle))]),_c('div',{staticClass:"vuecal__arrow vuecal__arrow--next",on:{"click":_vm.next}},[_vm._t("arrowNext",[_c('i',{staticClass:"angle"})])],2)]),(_vm.viewHeadings.length && !(_vm.hasSplits && _vm.view.id === 'week'))?_c('div',{staticClass:"vuecal__flex vuecal__weekdays-headings"},_vm._l((_vm.viewHeadings),function(heading,i){return _c('div',{key:i,staticClass:"vuecal__flex vuecal__heading",class:heading.class,style:(_vm.weekdayCellStyles)},[_vm._l((3),function(j){return _c('span',{key:j},[_vm._v(_vm._s(heading['label' + j]))])}),(heading.label4)?_c('span',[_vm._v(" ")]):_vm._e(),(heading.label4)?_c('span',[_vm._v(_vm._s(heading.label4))]):_vm._e()],2)})):_vm._e()]),_c('div',{staticClass:"vuecal__flex vuecal__body",attrs:{"grow":""}},[_c('div',{class:{ vuecal__flex: !_vm.hasTimeColumn },staticStyle:{"min-width":"100%"}},[_c('div',{staticClass:"vuecal__bg",attrs:{"grow":""}},[(_vm.time && ['week', 'day'].indexOf(_vm.view.id) > -1)?_c('div',{staticClass:"vuecal__time-column"},_vm._l((_vm.timeCells),function(cell,i){return _c('div',{key:i,staticClass:"vuecal__time-cell",style:(("height: " + _vm.timeCellHeight + "px"))},[_vm._v(_vm._s(cell.label))])})):_vm._e(),_c('div',{staticClass:"vuecal__flex vuecal__cells",attrs:{"grow":"","column":_vm.hasSplits && _vm.view.id === 'week'}},[(_vm.hasSplits && _vm.view.id === 'week')?_c('div',{staticClass:"vuecal__flex vuecal__weekdays-headings"},_vm._l((_vm.viewHeadings),function(heading,i){return _c('div',{key:i,staticClass:"vuecal__flex vuecal__heading",class:heading.class,style:(_vm.weekdayCellStyles)},[_vm._l((3),function(j){return _c('span',{key:j},[_vm._v(_vm._s(heading['label' + j]))])}),(heading.label4)?_c('span',[_vm._v(" ")]):_vm._e(),(heading.label4)?_c('span',[_vm._v(_vm._s(heading.label4))]):_vm._e()],2)})):_vm._e(),(_vm.hasSplits)?_c('div',{staticClass:"vuecal__flex",attrs:{"grow":""}},_vm._l((_vm.viewCells),function(cell,i){return _c('vuecal-cell',{key:i,class:cell.class,attrs:{"date":cell.date,"formatted-date":cell.formattedDate,"today":cell.today,"content":cell.content,"splits":_vm.splitDays},nativeOn:{"click":function($event){_vm.selectCell(cell)},"dblclick":function($event){_vm.dblClickToNavigate && _vm.switchToNarrowerView()}}})})):_vm._l((_vm.viewCells),function(cell,i){return _c('vuecal-cell',{key:i,class:cell.class,attrs:{"date":cell.date,"formatted-date":cell.formattedDate,"today":cell.today,"content":cell.content},nativeOn:{"click":function($event){_vm.selectCell(cell)},"dblclick":function($event){_vm.dblClickToNavigate && _vm.switchToNarrowerView()}}})})],2)])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-cal/index.vue?vue&type=template&id=aac07750&lang=pug&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.small.js
var es6_string_small = __webpack_require__("f386");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./src/components/vue-cal/date-utils.js


var now = new Date(); // Cache today's date for better isDateToday() performances. Formatted without leading 0.

var todayFormatted = "".concat(now.getFullYear(), "-").concat(now.getMonth(), "-").concat(now.getDate()); // eslint-disable-next-line

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}; // eslint-disable-next-line


Date.prototype.subtractDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
}; // eslint-disable-next-line


Date.prototype.getWeek = function () {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

var isDateToday = function isDateToday(date) {
  return "".concat(date.getFullYear(), "-").concat(date.getMonth(), "-").concat(date.getDate()) === todayFormatted;
};
/* export const getDateOfWeek = (w, y) => {
  let d = (1 + (w - 1) * 7) // 1st of January + 7 days for each week.
  return new Date(y, 0, d)
} */
// Returns today if it's Monday or previous Monday otherwise.

var getPreviousMonday = function getPreviousMonday() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var prevMonday = date && new Date(date.valueOf()) || new Date();
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
  return prevMonday;
};
/**
 * @param {int} The month number, 0 based.
 * @param {int} The year, not zero based, required to account for leap years.
 * @return {Date[]} List with date objects for each day of the month.
 */

var getDaysInMonth = function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};
/* export const getDaysInWeek = (date) => {
  date = getPreviousMonday(date)
  let days = []
  for (let i = 0; i < 7; i++) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return days
} */

var nth = function nth(d) {
  if (d > 3 && d < 21) return 'th';

  switch (d % 10) {
    case 1:
      return 'st';

    case 2:
      return 'nd';

    case 3:
      return 'rd';

    default:
      return 'th';
  }
};

var date_utils_formatTime = function formatTime(time) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm';
  var H = Math.floor(time / 60);
  var h = H % 12 ? H % 12 : 12;
  var am = H < 12 ? 'am' : 'pm';
  var m = Math.floor(time % 60);
  var timeObj = {
    H: H,
    h: h,
    HH: (H < 10 ? '0' : '') + H,
    hh: (h < 10 ? '0' : '') + h,
    am: am,
    AM: am.toUpperCase(),
    m: m,
    mm: (m < 10 ? '0' : '') + m
  };
  return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, function (m, contents) {
    return timeObj[contents.replace(/\{|\}/g, '')];
  });
};
var formatDate = function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  var localizedTexts = arguments.length > 2 ? arguments[2] : undefined;
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var dateObj = {
    D: date.getDay(),
    // 0 to 6.
    DD: localizedTexts.weekDays[(date.getDay() - 1 + 7) % 7][0],
    // M to S.
    DDD: localizedTexts.weekDays[(date.getDay() - 1 + 7) % 7].substr(0, 3),
    // Mon to Sun.
    DDDD: localizedTexts.weekDays[(date.getDay() - 1 + 7) % 7],
    // Monday to Sunday.
    d: d,
    // 1 to 31.
    dd: (d < 10 ? '0' : '') + d,
    // 01 to 31.
    S: nth(d),
    // st, nd, rd, th.
    m: m,
    // 1 to 12.
    mm: (m < 10 ? '0' : '') + m,
    // 01 to 12.
    mmm: localizedTexts.months[m - 1].substr(0, 3),
    // Jan to Dec.
    mmmm: localizedTexts.months[m - 1],
    // January to December.
    yyyy: date.getFullYear(),
    // 2018.
    yy: date.getFullYear().toString().substr(2, 4) // 18.

  };
  return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, function (m, contents) {
    var result = dateObj[contents.replace(/\{|\}/g, '')];
    return result !== undefined ? result : contents;
  });
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0f87e5ee-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-cal/cell.vue?vue&type=template&id=4a668146&lang=pug&
var cellvue_type_template_id_4a668146_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vuecal__cell",class:( _obj = { splitted: _vm.splits.length, 'vuecal__cell--has-events': _vm.events.length }, _obj[_vm.cssClass] = true, _obj[("vuecal__cell--has-events-" + (_vm.events.length))] = true, _obj ),style:(_vm.cellStyles)},[_vm._l(((_vm.splits.length || 1)),function(i){return _c('div',{staticClass:"vuecal__cell-content",class:_vm.splits.length && ("vuecal__cell-split " + (_vm.splits[i - 1].class))},[(_vm.splits.length)?_c('div',{staticClass:"split-label",domProps:{"innerHTML":_vm._s(_vm.splits[i - 1].label)}}):_vm._e(),(_vm.content)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}}):_c('div',[(!_vm.events.length)?_c('div',{staticClass:"vuecal__no-event"},[_vm._v(_vm._s(_vm.texts.noEvent))]):_vm._l(((_vm.splits.length ? _vm.splitEvents[i] : _vm.events)),function(event,j){return _c('div',{key:j,staticClass:"vuecal__event",class:_vm.eventClasses(event),style:(_vm.eventStyles(event)),on:{"mousedown":function($event){_vm.onMouseDown($event, event)},"contextmenu":function($event){_vm.onContextMenu($event, event)},"touchstart":function($event){_vm.onTouchStart($event, event)}}},[(_vm.editableEvents)?_c('div',{staticClass:"vuecal__event-delete",on:{"mousedown":function($event){$event.stopPropagation();$event.preventDefault();_vm.deleteEvent(event)},"touchstart":function($event){$event.stopPropagation();$event.preventDefault();_vm.touchDeleteEvent(event)}}},[_vm._v(_vm._s(_vm.texts.deleteEvent))]):_vm._e(),(_vm.editableEvents && event.title)?_c('div',{staticClass:"vuecal__event-title vuecal__event-title--edit",attrs:{"contenteditable":""},domProps:{"innerHTML":_vm._s(event.title)},on:{"blur":function($event){_vm.onEventTitleBlur($event, event)}}}):(event.title)?_c('div',{staticClass:"vuecal__event-title"},[_vm._v(_vm._s(event.title))]):_vm._e(),(event.startTimeMinutes)?_c('div',{staticClass:"vuecal__event-time"},[_vm._v(_vm._s(_vm._f("formatTime")(event.startTimeMinutes,_vm.timeFormat))),(event.endTimeMinutes)?_c('span',[_vm._v(" - "+_vm._s(_vm._f("formatTime")(event.endTimeMinutes,_vm.timeFormat)))]):_vm._e()]):_vm._e(),(event.content)?_c('div',{staticClass:"vuecal__event-content",domProps:{"innerHTML":_vm._s(event.content)}}):_vm._e(),(_vm.editableEvents && event.startTime)?_c('div',{staticClass:"vuecal__event-resize-handle",on:{"mousedown":function($event){_vm.editableEvents && _vm.time && _vm.onDragHandleMouseDown($event, event)},"touchstart":function($event){_vm.editableEvents && _vm.time && _vm.onDragHandleMouseDown($event, event)}}}):_vm._e()])})],2),(_vm.$parent.view.id === 'month' && _vm.events.length && !_vm.events[0].hideCount)?_c('span',{staticClass:"vuecal__cell-events-count"},[_vm._v(_vm._s(_vm.events.length))]):_vm._e()])}),(_vm.today && _vm.time)?_c('div',{staticClass:"vuecal__now-line",style:(("top: " + _vm.todaysTimePosition + "px"))}):_vm._e()],2)
var _obj;}
var cellvue_type_template_id_4a668146_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/vue-cal/cell.vue?vue&type=template&id=4a668146&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-cal/cell.vue?vue&type=script&lang=js&








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var cellvue_type_script_lang_js_ = ({
  props: {
    cssClass: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      required: true
    },
    formattedDate: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    },
    splits: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    today: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      splitEvents: {}
    };
  },
  filters: {
    formatTime: function formatTime(value, format) {
      return value && (date_utils_formatTime(value, format) || '');
    }
  },
  methods: {
    updateEventPosition: function updateEventPosition(event) {
      var minutesFromTop = event.startTimeMinutes - this.timeFrom;
      var top = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep);
      minutesFromTop = event.endTimeMinutes - this.timeFrom;
      var bottom = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep);
      event.top = top;
      event.height = bottom - top;
    },
    eventStyles: function eventStyles(event) {
      if (!event.startTime) return {};
      var resizeAnEvent = this.domEvents.resizeAnEvent;
      return {
        top: "".concat(event.top, "px"),
        height: "".concat(resizeAnEvent.newHeight && resizeAnEvent.eventId === event.id ? resizeAnEvent.newHeight : event.height, "px")
      };
    },
    eventClasses: function eventClasses(event) {
      var _this = this;

      var overlapping = Object.keys(event.overlapping).length;
      var overlapped = Object.keys(event.overlapped).length;
      var simultaneous = Object.keys(event.simultaneous).length + 1;
      var forceLeft = false;

      if (simultaneous >= 3) {
        var split3 = simultaneous - 1;
        Object.keys(event.simultaneous).forEach(function (eventId) {
          if (split3 && Object.keys(_this.events.find(function (e) {
            return e.id === eventId;
          }).simultaneous).length + 1 < 3) {
            split3--;
          }
        });
        if (!split3) simultaneous = 2;
      } else if (simultaneous === 2) {
        var otherEvent = this.events.find(function (e) {
          return e.id === Object.keys(event.simultaneous)[0];
        });

        if (Object.keys(otherEvent.overlapping).length && Object.keys(otherEvent.overlapped).length) {
          forceLeft = true;
        }
      }

      return _objectSpread({}, event.classes, {
        'vuecal__event--focus': this.domEvents.focusAnEvent.eventId === event.id,
        'vuecal__event--deletable': this.domEvents.clickHoldAnEvent.eventId === event.id,
        'vuecal__event--overlapped': overlapped,
        'vuecal__event--overlapping': overlapping,
        'vuecal__event--split2': simultaneous === 2,
        'vuecal__event--split3': simultaneous >= 3,
        'vuecal__event--split-middle': overlapped && overlapping && simultaneous >= 3,
        'vuecal__event--split-left': forceLeft
      });
    },
    // Will recalculate all the overlappings of the current cell or only of the given split if provided.
    checkCellOverlappingEvents: function checkCellOverlappingEvents() {
      var _this2 = this;

      var split = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.events) {
        var foregroundEventsList = this.events.filter(function (item) {
          return !item.background && (split ? item.split === split : 1);
        });

        if (foregroundEventsList.length) {
          // Do the mapping outside of the next loop if not splitted cell.
          // If splitted need the whole event object to compare splits.
          var foregroundEventsIdList = foregroundEventsList.map(function (item) {
            return item.id;
          });
          var comparisonArray = {};
          this.events.forEach(function (event) {
            if (!event.background) {
              var comparisonArrayKeys = Object.keys(comparisonArray); // Unique comparison of events.

              comparisonArray[event.id] = _this2.splits.length ? foregroundEventsList.filter(function (item) {
                return item.id !== event.id && comparisonArrayKeys.indexOf(item.id) === -1 && item.split === event.split;
              }).map(function (item) {
                return item.id;
              }) : foregroundEventsIdList.filter(function (id) {
                return id !== event.id && comparisonArrayKeys.indexOf(id) === -1;
              });
              if (comparisonArray[event.id].length) _this2.checkOverlappingEvents(event, comparisonArray[event.id]);
            }
          });
        }
      }
    },
    checkOverlappingEvents: function checkOverlappingEvents(event, comparisonArray) {
      var _this3 = this;

      comparisonArray.forEach(function (event2id, i) {
        var event2 = _this3.events.find(function (item) {
          return item.id === event2id;
        });

        var event1startsFirst = event.startTimeMinutes < event2.startTimeMinutes;
        var event1overlapsEvent2 = !event1startsFirst && event2.endTimeMinutes > event.startTimeMinutes;
        var event2overlapsEvent1 = event1startsFirst && event.endTimeMinutes > event2.startTimeMinutes;

        if (event1overlapsEvent2) {
          event.overlapping[event2.id] = true;
          event2.overlapped[event.id] = true;
        } else {
          delete event.overlapping[event2.id];
          delete event2.overlapped[event.id];
        }

        if (event2overlapsEvent1) {
          event2.overlapping[event.id] = true;
          event.overlapped[event2.id] = true;
        } else {
          delete event2.overlapping[event.id];
          delete event.overlapped[event2.id];
        } // If up to 3 events start at the same time.


        if (event.startTimeMinutes === event2.startTimeMinutes || event1overlapsEvent2 || event2overlapsEvent1) {
          event.simultaneous[event2.id] = true;
          event2.simultaneous[event.id] = true;
        } else {
          delete event.simultaneous[event2.id];
          delete event2.simultaneous[event.id];
        }

        if (_this3.splits.length) {
          _this3.splitEvents[event.split] = _this3.events.filter(function (e) {
            return e.split === event.split;
          });
        }
      });
    },
    onEventTitleBlur: function onEventTitleBlur(e, event) {
      event.title = e.target.innerHTML;
      this.$parent.emitWithEvent('event-change', event);
      this.$parent.emitWithEvent('event-title-change', event);
    },
    onResizeEvent: function onResizeEvent() {
      var _this$$parent$domEven = this.$parent.domEvents.resizeAnEvent,
          eventId = _this$$parent$domEven.eventId,
          newHeight = _this$$parent$domEven.newHeight;
      var event = this.events.filter(function (e) {
        return e.id === eventId;
      })[0];

      if (event) {
        event.height = Math.max(newHeight, 10);
        this.updateEndTimeOnResize(event);
        if (!event.background) this.checkCellOverlappingEvents(event.split || 0);
      }
    },
    updateEndTimeOnResize: function updateEndTimeOnResize(event) {
      var bottom = event.top + event.height;
      var endTime = (bottom / this.timeCellHeight * this.timeStep + this.timeFrom) / 60;
      var hours = parseInt(endTime);
      var minutes = parseInt((endTime - hours) * 60);
      event.endTimeMinutes = endTime * 60;
      event.endTime = "".concat(hours, ":").concat((minutes < 10 ? '0' : '') + minutes);
      event.end = event.end.split(' ')[0] + " ".concat(event.endTime);
    },
    // On an event.
    onMouseDown: function onMouseDown(e, event) {
      var touch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false;
      var clickHoldAnEvent = this.domEvents.clickHoldAnEvent;
      var resizeAnEvent = this.domEvents.resizeAnEvent; // If the delete button is already out and event is on focus then delete event.

      if (this.domEvents.focusAnEvent.eventId === event.id && clickHoldAnEvent.eventId === event.id) {
        return true;
      } // Focus the clicked event.


      this.focusEvent(event);
      clickHoldAnEvent.eventId = null; // Reinit click hold on each click.
      // Don't show delete button if dragging event or mousedown was on touch device.
      // If touchstart, show delete on contextmenu event.

      if (!resizeAnEvent.start) {
        clickHoldAnEvent.timeoutId = setTimeout(function () {
          clickHoldAnEvent.eventId = event.id;
        }, clickHoldAnEvent.timeout);
      }
    },
    onContextMenu: function onContextMenu(e, event) {
      e.preventDefault();
      return false;
    },
    onTouchStart: function onTouchStart(e, event) {
      this.onMouseDown(e, event, true);
    },
    onDragHandleMouseDown: function onDragHandleMouseDown(e, event) {
      var start = 'ontouchstart' in window && e.touches ? e.touches[0].clientY : e.clientY;
      this.domEvents.resizeAnEvent = Object.assign(this.domEvents.resizeAnEvent, {
        start: start,
        originalHeight: event.height,
        newHeight: event.height,
        eventId: event.id,
        eventStartDate: event.startDate
      });
    },
    deleteEvent: function deleteEvent(event) {
      var _this4 = this;

      var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false;
      this.$parent.emitWithEvent('event-delete', event);
      this.events = this.events.filter(function (e) {
        return e.id !== event.id;
      });

      if (!event.background) {
        // Remove this event from possible other overlapping events of the same cell.
        Object.keys(event.overlapped).forEach(function (id) {
          return delete _this4.events.find(function (item) {
            return item.id === id;
          }).overlapping[event.id];
        });
        Object.keys(event.overlapping).forEach(function (id) {
          return delete _this4.events.find(function (item) {
            return item.id === id;
          }).overlapped[event.id];
        });
        Object.keys(event.simultaneous).forEach(function (id) {
          return delete _this4.events.find(function (item) {
            return item.id === id;
          }).simultaneous[event.id];
        });
        this.checkCellOverlappingEvents(event.split || 0);
      }

      if (this.splits.length) this.splitEvents[event.split] = this.events.filter(function (e) {
        return e.id !== event.id && e.split === event.split;
      });
    },
    touchDeleteEvent: function touchDeleteEvent(event) {
      this.deleteEvent(event, true);
    },
    focusEvent: function focusEvent(event) {
      this.$parent.emitWithEvent('event-focus', event);
      this.domEvents.focusAnEvent.eventId = event.id;
    }
  },
  computed: {
    texts: function texts() {
      return this.$parent.texts;
    },
    time: function time() {
      return this.$parent.time;
    },
    timeFormat: function timeFormat() {
      return this.$parent.timeFormat || (this.$parent['12Hour'] ? 'h:mm{am}' : 'HH:mm');
    },
    timeCellHeight: function timeCellHeight() {
      return parseInt(this.$parent.timeCellHeight);
    },
    timeFrom: function timeFrom() {
      return parseInt(this.$parent.timeFrom);
    },
    timeStep: function timeStep() {
      return parseInt(this.$parent.timeStep);
    },
    editableEvents: function editableEvents() {
      return this.$parent.editableEvents;
    },
    noEventOverlaps: function noEventOverlaps() {
      var _this5 = this;

      this.$nextTick(function () {
        return _this5.checkCellOverlappingEvents();
      });
      return this.$parent.noEventOverlaps;
    },
    domEvents: {
      get: function get() {
        if (this.$parent.domEvents.resizeAnEvent.eventId) this.onResizeEvent();
        return this.$parent.domEvents;
      },
      set: function set(object) {
        this.$parent.domEvents = object;
      }
    },
    cellStyles: function cellStyles() {
      return {
        minWidth: "".concat(this.$parent.minCellWidth, "px") || false
      };
    },
    events: {
      get: function get() {
        var _this6 = this;

        var events = this.$parent.mutableEvents[this.formattedDate] || []; // eslint-disable-next-line

        this.splitEvents = [];
        events.forEach(function (event) {
          if (event.startTime) _this6.updateEventPosition(event); // Only for splits.

          if (_this6.splits.length && event.split) {
            // eslint-disable-next-line
            if (!_this6.splitEvents[event.split]) _this6.$set(_this6.splitEvents, event.split, []); // eslint-disable-next-line

            _this6.splitEvents[event.split].push(event);
          }
        }); // NextTick() prevents a cyclic redundancy.

        this.$nextTick(function () {
          _this6.checkCellOverlappingEvents();

          _this6.$forceUpdate(); // @todo: find a way to avoid this.

        });
        return events;
      },
      set: function set(events) {
        this.$parent.mutableEvents[this.formattedDate] = events;
      }
    },
    cellSplitEvents: function cellSplitEvents() {
      var splitsEventIndexes = {};
      this.events.forEach(function (e, i) {
        if (!splitsEventIndexes[e.split || 0]) splitsEventIndexes[e.split || 0] = {};
        splitsEventIndexes[e.split || 0][e.id] = i;
      });
      return splitsEventIndexes;
    },
    todaysTimePosition: function todaysTimePosition() {
      // Make sure to skip the Maths if not relevant.
      if (!this.today || !this.time) return;
      var now = new Date();
      var startTimeMinutes = now.getHours() * 60 + now.getMinutes();
      var minutesFromTop = startTimeMinutes - this.timeFrom;
      return Math.round(minutesFromTop * this.timeCellHeight / this.timeStep);
    }
  }
});
// CONCATENATED MODULE: ./src/components/vue-cal/cell.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_cal_cellvue_type_script_lang_js_ = (cellvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/vue-cal/cell.vue?vue&type=style&index=0&lang=scss&
var cellvue_type_style_index_0_lang_scss_ = __webpack_require__("d011");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/vue-cal/cell.vue






/* normalize component */

var component = normalizeComponent(
  vue_cal_cellvue_type_script_lang_js_,
  cellvue_type_template_id_4a668146_lang_pug_render,
  cellvue_type_template_id_4a668146_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "cell.vue"
/* harmony default export */ var vue_cal_cell = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/vue-cal/index.vue?vue&type=script&lang=js&













//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var vue_calvue_type_script_lang_js_ = ({
  name: 'vue-cal',
  components: {
    'vuecal-cell': vue_cal_cell
  },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    hideViewSelector: {
      type: Boolean,
      default: false
    },
    hideWeekends: {
      type: Boolean,
      default: false
    },
    disableViews: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultView: {
      type: String,
      default: 'week'
    },
    selectedDate: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    xsmall: {
      type: Boolean,
      default: false
    },
    clickToNavigate: {
      type: Boolean,
      default: false
    },
    dblClickToNavigate: {
      type: Boolean,
      default: true
    },
    time: {
      type: Boolean,
      default: true
    },
    timeFrom: {
      type: Number,
      default: 0 // In minutes.

    },
    timeTo: {
      type: Number,
      default: 24 * 60 // In minutes.

    },
    timeStep: {
      type: Number,
      default: 60 // In minutes.

    },
    timeCellHeight: {
      type: Number,
      default: 40 // In pixels.

    },
    '12Hour': {
      type: Boolean,
      default: false
    },
    'timeFormat': {
      type: String,
      default: ''
    },
    minCellWidth: {
      type: Number,
      default: 0
    },
    splitDays: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    events: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    editableEvents: {
      type: Boolean,
      default: false
    },
    noEventOverlaps: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      ready: false,
      now: now,
      view: {
        id: '',
        title: '',
        startDate: null,
        selectedDate: null
      },
      eventIdIncrement: 1,
      domEvents: {
        resizeAnEvent: {
          eventId: null,
          // Only one at a time.
          start: null,
          originalHeight: 0,
          newHeight: 0
        },
        dragAnEvent: {
          eventId: null // Only one at a time.

        },
        focusAnEvent: {
          eventId: null // Only one at a time.

        },
        clickHoldAnEvent: {
          eventId: null,
          // Only one at a time.
          timeout: 1200,
          timeoutId: null
        },
        dblTapACell: {
          taps: 0,
          timeout: 500
        }
      },
      mutableEvents: {} // An indexed array of mutable events updated each time given events array changes.

    };
  },
  methods: {
    previous: function previous() {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, new Date(this.view.startDate.getFullYear() - 25, 0, 1));
          break;

        case 'year':
          var firstDayOfYear = new Date(this.view.startDate.getFullYear() - 1, 1, 1);
          this.switchView(this.view.id, firstDayOfYear);
          break;

        case 'month':
          var firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() - 1, 1);
          this.switchView(this.view.id, firstDayOfMonth);
          break;

        case 'week':
          var firstDayOfPrevWeek = getPreviousMonday(this.view.startDate).subtractDays(7);
          this.switchView(this.view.id, firstDayOfPrevWeek);
          break;

        case 'day':
          var day = this.view.startDate.subtractDays(1);
          this.switchView(this.view.id, day);
          break;
      }
    },
    next: function next() {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, new Date(this.view.startDate.getFullYear() + 25, 0, 1));
          break;

        case 'year':
          var firstDayOfYear = new Date(this.view.startDate.getFullYear() + 1, 0, 1);
          this.switchView(this.view.id, firstDayOfYear);
          break;

        case 'month':
          var firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() + 1, 1);
          this.switchView(this.view.id, firstDayOfMonth);
          break;

        case 'week':
          var firstDayOfNextWeek = getPreviousMonday(this.view.startDate).addDays(7);
          this.switchView(this.view.id, firstDayOfNextWeek);
          break;

        case 'day':
          var day = this.view.startDate.addDays(1);
          this.switchView(this.view.id, day);
          break;
      }
    },
    switchToBroaderView: function switchToBroaderView() {
      if (this.broaderView) this.switchView(this.broaderView);
    },
    switchToNarrowerView: function switchToNarrowerView() {
      var _this = this;

      var views = Object.keys(this.views);
      views = views.slice(views.indexOf(this.view.id) + 1);
      var view = views.find(function (v) {
        return _this.views[v].enabled;
      });
      if (view) this.switchView(view);
    },
    switchView: function switchView(view) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.view.id = view;

      if (!date) {
        date = this.view.selectedDate || this.view.startDate;
        if (view === 'week') date = getPreviousMonday(date);
      }

      switch (view) {
        case 'years':
          // Always fill first cell with a multiple of 25 years, E.g. year 2000, or 2025.
          this.view.startDate = new Date(Math.floor(date.getFullYear() / 25) * 25 || 2000, 0, 1);
          break;

        case 'year':
          this.view.startDate = new Date(date.getFullYear(), 0, 1);
          break;

        case 'month':
          this.view.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
          break;

        case 'week':
        case 'day':
          this.view.startDate = date;
          break;
      }

      if (this.ready) {
        var params = {
          view: view,
          startDate: this.view.startDate
        };
        if (view === 'week') params.week = this.view.startDate.getWeek();
        this.$emit('view-change', params);
      }
    },
    findAncestor: function findAncestor(el, Class) {
      while ((el = el.parentElement) && !el.classList.contains(Class)) {
        ;
      }

      return el;
    },
    isDOMElementAnEvent: function isDOMElementAnEvent(el) {
      return el.classList.contains('vuecal__event') || this.findAncestor(el, 'vuecal__event');
    },
    selectCell: function selectCell(cell) {
      var _this2 = this;

      if (this.view.selectedDate.toString() !== cell.date.toString()) {
        this.view.selectedDate = cell.date;
        this.$emit('day-focus', cell.date);
      } // Switch to narrower view.


      if (this.clickToNavigate) this.switchToNarrowerView(); // Handle double click manually for touch devices.
      else if (this.dblClickToNavigate && 'ontouchstart' in window) {
          this.domEvents.dblTapACell.taps++;
          setTimeout(function () {
            return _this2.domEvents.dblTapACell.taps = 0;
          }, this.domEvents.dblTapACell.timeout);

          if (this.domEvents.dblTapACell.taps >= 2) {
            this.domEvents.dblTapACell.taps = 0;
            this.switchToNarrowerView();
          }
        }
    },
    // Event resizing is started in cell component (onMouseDown) but place onMouseMove & onMouseUp
    // handlers in the single parent for performance.
    onMouseMove: function onMouseMove(e) {
      var resizeAnEvent = this.domEvents.resizeAnEvent;
      if (resizeAnEvent.eventId === null) return;
      e.preventDefault();
      var y = 'ontouchstart' in window ? e.touches[0].clientY : e.clientY;
      resizeAnEvent.newHeight = resizeAnEvent.originalHeight + (y - resizeAnEvent.start);
    },
    onMouseUp: function onMouseUp(e) {
      var focusAnEvent = this.domEvents.focusAnEvent;
      var resizeAnEvent = this.domEvents.resizeAnEvent;
      var clickHoldAnEvent = this.domEvents.clickHoldAnEvent; // On event resize end, emit event.

      if (resizeAnEvent.eventId) {
        var event = this.mutableEvents[resizeAnEvent.eventStartDate].find(function (item) {
          return item.id === resizeAnEvent.eventId;
        });
        this.emitWithEvent('event-change', event);
        this.emitWithEvent('event-duration-change', event);
      } // If not mouse up on an event, unfocus any event except if just dragged.


      if (!this.isDOMElementAnEvent(e.target) && !resizeAnEvent.eventId) {
        focusAnEvent.eventId = null; // Cancel event focus.

        clickHoldAnEvent.eventId = null; // Hide delete button.
      } // Prevent showing delete button if click and hold was not long enough.
      // Click & hold timeout happens in onMouseDown() in cell component.


      if (clickHoldAnEvent.timeoutId && !clickHoldAnEvent.eventId) {
        clearTimeout(clickHoldAnEvent.timeoutId);
        clickHoldAnEvent.timeoutId = null;
      } // Any mouse up must cancel event resizing.


      resizeAnEvent.eventId = null;
      resizeAnEvent.start = null;
      resizeAnEvent.originalHeight = null;
      resizeAnEvent.newHeight = null;
    },
    // Object of arrays of events indexed by dates.
    updateMutableEvents: function updateMutableEvents() {
      var _this3 = this;

      // eslint-disable-next-line
      this.mutableEvents = {}; // Group events into dates.

      this.events.map(function (event) {
        var _classes;

        var _event$start$split = event.start.split(' '),
            _event$start$split2 = _slicedToArray(_event$start$split, 2),
            startDate = _event$start$split2[0],
            _event$start$split2$ = _event$start$split2[1],
            startTime = _event$start$split2$ === void 0 ? '' : _event$start$split2$;

        var _startTime$split = startTime.split(':'),
            _startTime$split2 = _slicedToArray(_startTime$split, 2),
            hoursStart = _startTime$split2[0],
            minutesStart = _startTime$split2[1];

        var startTimeMinutes = parseInt(hoursStart) * 60 + parseInt(minutesStart);

        var _event$end$split = event.end.split(' '),
            _event$end$split2 = _slicedToArray(_event$end$split, 2),
            endDate = _event$end$split2[0],
            _event$end$split2$ = _event$end$split2[1],
            endTime = _event$end$split2$ === void 0 ? '' : _event$end$split2$;

        var _endTime$split = endTime.split(':'),
            _endTime$split2 = _slicedToArray(_endTime$split, 2),
            hoursEnd = _endTime$split2[0],
            minutesEnd = _endTime$split2[1];

        var endTimeMinutes = parseInt(hoursEnd) * 60 + parseInt(minutesEnd); // Keep the event ids scoped to this calendar instance.
        // eslint-disable-next-line

        var id = "".concat(_this3._uid, "_").concat(_this3.eventIdIncrement++);
        event = Object.assign({}, event, {
          id: id,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          startTimeMinutes: startTimeMinutes,
          endTime: endTime,
          endTimeMinutes: endTimeMinutes,
          height: 0,
          top: 0,
          overlapped: {},
          overlapping: {},
          simultaneous: {},
          classes: (_classes = {}, _defineProperty(_classes, event.class, true), _defineProperty(_classes, 'vuecal__event--background', event.background), _classes)
        }); // Make array reactive for future events creations & deletions.

        if (!(event.startDate in _this3.mutableEvents)) _this3.$set(_this3.mutableEvents, event.startDate, []); // eslint-disable-next-line

        _this3.mutableEvents[event.startDate].push(event);

        return event;
      });
    },
    emitWithEvent: function emitWithEvent(eventName, event) {
      // Delete vue-cal specific props instead of returning a set of props so user
      // can place whatever they want inside an event and see it returned.
      var evt = _objectSpread({}, event);

      delete evt.height;
      delete evt.top;
      delete evt.overlapped;
      delete evt.overlapping;
      delete evt.simultaneous;
      delete evt.classes; // Return date objects for easy manipulation.

      var _evt$start$split = evt.start.split(' '),
          _evt$start$split2 = _slicedToArray(_evt$start$split, 2),
          date1 = _evt$start$split2[0],
          time1 = _evt$start$split2[1];

      var _ref = date1 && date1.split('-') || [0, 0, 0],
          _ref2 = _slicedToArray(_ref, 3),
          y1 = _ref2[0],
          m1 = _ref2[1],
          d1 = _ref2[2];

      var _ref3 = time1 && time1.split(':') || [0, 0],
          _ref4 = _slicedToArray(_ref3, 2),
          h1 = _ref4[0],
          min1 = _ref4[1];

      evt.startDate = new Date(y1, parseInt(m1) - 1, d1, h1, min1);

      var _evt$end$split = evt.end.split(' '),
          _evt$end$split2 = _slicedToArray(_evt$end$split, 2),
          date2 = _evt$end$split2[0],
          time2 = _evt$end$split2[1];

      var _ref5 = date2 && date2.split('-') || [0, 0, 0],
          _ref6 = _slicedToArray(_ref5, 3),
          y2 = _ref6[0],
          m2 = _ref6[1],
          d2 = _ref6[2];

      var _ref7 = time2 && time2.split(':') || [0, 0],
          _ref8 = _slicedToArray(_ref7, 2),
          h2 = _ref8[0],
          min2 = _ref8[1];

      evt.endDate = new Date(y2, parseInt(m2) - 1, d2, h2, min2);
      this.$emit(eventName, evt);
    }
  },
  created: function created() {
    // Init the array of events, then keep listening for changes in watcher.
    this.updateMutableEvents(this.events);

    if (this.selectedDate) {
      var _this$selectedDate$ma = this.selectedDate.match(/(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?/),
          _this$selectedDate$ma2 = _slicedToArray(_this$selectedDate$ma, 6),
          y = _this$selectedDate$ma2[1],
          m = _this$selectedDate$ma2[2],
          d = _this$selectedDate$ma2[3],
          _this$selectedDate$ma3 = _this$selectedDate$ma2[4],
          h = _this$selectedDate$ma3 === void 0 ? 0 : _this$selectedDate$ma3,
          _this$selectedDate$ma4 = _this$selectedDate$ma2[5],
          min = _this$selectedDate$ma4 === void 0 ? 0 : _this$selectedDate$ma4;

      this.view.selectedDate = new Date(y, parseInt(m) - 1, d, h, min);
    } else {
      this.view.selectedDate = this.now;
    }

    this.switchView(this.defaultView);
  },
  mounted: function mounted() {
    if (this.editableEvents && this.time) {
      var hasTouch = 'ontouchstart' in window;
      window.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, {
        passive: false
      });
      window.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp);
    }

    this.$emit('ready');
    this.ready = true;
  },
  computed: {
    texts: function texts() {
      return __webpack_require__("4da1")("./".concat(this.locale, ".json"));
    },
    views: function views() {
      return {
        years: {
          label: this.texts.years,
          enabled: this.disableViews.indexOf('years') === -1
        },
        year: {
          label: this.texts.year,
          enabled: this.disableViews.indexOf('year') === -1
        },
        month: {
          label: this.texts.month,
          enabled: this.disableViews.indexOf('month') === -1
        },
        week: {
          label: this.texts.week,
          enabled: this.disableViews.indexOf('week') === -1
        },
        day: {
          label: this.texts.day,
          enabled: this.disableViews.indexOf('day') === -1
        }
      };
    },
    broaderView: function broaderView() {
      var _this4 = this;

      var views = Object.keys(this.views);
      views = views.slice(0, views.indexOf(this.view.id));
      views.reverse();
      return views.find(function (v) {
        return _this4.views[v].enabled;
      });
    },
    hasTimeColumn: function hasTimeColumn() {
      return this.time && ['week', 'day'].indexOf(this.view.id) > -1;
    },
    // For week & day views.
    timeCells: function timeCells() {
      var timeCells = [];

      for (var i = this.timeFrom, max = this.timeTo; i <= max; i += this.timeStep) {
        timeCells.push({
          label: date_utils_formatTime(i, this.timeFormat || (this['12Hour'] ? 'h:mm{am}' : 'HH:mm')),
          value: i
        });
      }

      return timeCells;
    },
    // Whether the current view has days splits.
    hasSplits: function hasSplits() {
      return !!this.splitDays.length && ['week', 'day'].indexOf(this.view.id) > -1;
    },
    weekDays: function weekDays() {
      return this.texts.weekDays.map(function (day) {
        return {
          label: day
        };
      });
    },
    months: function months() {
      return this.texts.months.map(function (month) {
        return {
          label: month
        };
      });
    },
    viewTitle: function viewTitle() {
      var title = '';
      var date = this.view.startDate;
      var year = date.getFullYear();
      var month = date.getMonth();

      switch (this.view.id) {
        case 'years':
          title = this.texts.years;
          break;

        case 'year':
          title = year;
          break;

        case 'month':
          title = "".concat(this.months[month].label, " ").concat(year);
          break;

        case 'week':
          var lastDayOfWeek = date.addDays(6);
          var formattedMonthYear = formatDate(date, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts); // If week is not ending in the same month it started in.

          if (lastDayOfWeek.getMonth() !== date.getMonth()) {
            var _formattedMonthYear$s = formattedMonthYear.split(' '),
                _formattedMonthYear$s2 = _slicedToArray(_formattedMonthYear$s, 2),
                m1 = _formattedMonthYear$s2[0],
                y1 = _formattedMonthYear$s2[1];

            var _formatDate$split = formatDate(lastDayOfWeek, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts).split(' '),
                _formatDate$split2 = _slicedToArray(_formatDate$split, 2),
                m2 = _formatDate$split2[0],
                y2 = _formatDate$split2[1];

            formattedMonthYear = y1 === y2 ? "".concat(m1, " - ").concat(m2, " ").concat(y1) : "".concat(m1, " ").concat(y1, " - ").concat(m2, " ").concat(y2);
          }

          title = "".concat(this.texts.week, " ").concat(date.getWeek(), " (").concat(formattedMonthYear, ")");
          break;

        case 'day':
          title = formatDate(date, this.texts.dateFormat, this.texts);
          break;
      }

      return title;
    },
    viewHeadings: function viewHeadings() {
      var _this5 = this;

      var headings = [];

      switch (this.view.id) {
        case 'month':
        case 'week':
          headings = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map(function (cell, i) {
            return _objectSpread({
              label1: _this5.locale === 'zh-cn' ? cell.label.substr(0, 2) : cell.label[0],
              label2: _this5.locale === 'zh-cn' ? cell.label.substr(2) : cell.label.substr(1, 2),
              label3: _this5.locale === 'zh-cn' ? '' : cell.label.substr(3)
            }, _this5.view.id === 'week' && {
              label4: _this5.view.startDate.addDays(i).getDate()
            } || {});
          });
          break;
      }

      return headings;
    },
    viewCells: function viewCells() {
      var _this6 = this;

      var cells = [];
      var fromYear = null;
      var todayFound = false;

      switch (this.view.id) {
        case 'years':
          fromYear = this.view.startDate.getFullYear();
          cells = Array.apply(null, Array(25)).map(function (cell, i) {
            return {
              content: fromYear + i,
              date: new Date(fromYear + i, 0, 1),
              class: {
                current: fromYear + i === _this6.now.getFullYear(),
                selected: _this6.view.selectedDate && fromYear + i === _this6.view.selectedDate.getFullYear()
              }
            };
          });
          break;

        case 'year':
          fromYear = this.view.startDate.getFullYear();
          cells = Array.apply(null, Array(12)).map(function (cell, i) {
            return {
              content: _this6.xsmall ? _this6.months[i].label.substr(0, 3) : _this6.months[i].label,
              date: new Date(fromYear, i, 1),
              class: {
                current: i === _this6.now.getMonth() && fromYear === _this6.now.getFullYear(),
                selected: i === _this6.view.selectedDate.getMonth() && fromYear === _this6.view.selectedDate.getFullYear()
              }
            };
          });
          break;

        case 'month':
          var month = this.view.startDate.getMonth();
          var year = this.view.startDate.getFullYear();
          var days = getDaysInMonth(month, year);
          var firstOfMonthDayOfWeek = days[0].getDay();
          var selectedDateAtMidnight = new Date(this.view.selectedDate.getTime());
          selectedDateAtMidnight.setHours(0, 0, 0, 0);
          todayFound = false;
          var nextMonthDays = 0; // If the first day of the month is not a Monday, prepend missing days to the days array.

          if (days[0].getDay() !== 1) {
            var d = getPreviousMonday(days[0]);
            var prevWeek = [];

            for (var i = 0; i < 7; i++) {
              prevWeek.push(new Date(d));
              d.setDate(d.getDate() + 1);
              if (d.getDay() === firstOfMonthDayOfWeek) break;
            }

            days.unshift.apply(days, prevWeek);
          } // Create 42 cells (6 rows x 7 days) and populate them with days.


          cells = Array.apply(null, Array(42)).map(function (cell, i) {
            var cellDate = days[i] || new Date(year, month + 1, ++nextMonthDays); // To increase performance skip checking isToday if today already found.

            var isToday = !todayFound && cellDate && cellDate.getDate() === _this6.now.getDate() && cellDate.getMonth() === _this6.now.getMonth() && cellDate.getFullYear() === _this6.now.getFullYear() && !todayFound++;
            var formattedDate = formatDate(cellDate, 'yyyy-mm-dd', _this6.texts);
            return {
              content: cellDate.getDate(),
              date: cellDate,
              formattedDate: formattedDate,
              today: isToday,
              class: {
                today: isToday,
                'out-of-scope': cellDate.getMonth() !== month,
                selected: _this6.view.selectedDate && cellDate.getTime() === selectedDateAtMidnight.getTime()
              }
            };
          });

          if (this.hideWeekends) {
            cells = cells.filter(function (cell) {
              return cell.date.getDay() > 0 && cell.date.getDay() < 6;
            });
          }

          break;

        case 'week':
          todayFound = false;
          var firstDayOfWeek = this.view.startDate;
          cells = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map(function (cell, i) {
            var date = firstDayOfWeek.addDays(i);
            var formattedDate = formatDate(date, 'yyyy-mm-dd', _this6.texts);
            var isToday = !todayFound && isDateToday(date) && !todayFound++;
            return {
              date: date,
              formattedDate: formattedDate,
              today: isToday,
              class: {
                today: isToday,
                selected: _this6.view.selectedDate && firstDayOfWeek.addDays(i).getTime() === _this6.view.selectedDate.getTime()
              }
            };
          });
          break;

        case 'day':
          var formattedDate = formatDate(this.view.startDate, 'yyyy-mm-dd', this.texts);
          var isToday = isDateToday(this.view.startDate);
          cells = [{
            date: this.view.startDate,
            formattedDate: formattedDate,
            today: isToday,
            class: {
              today: isToday,
              selected: this.view.selectedDate && this.view.startDate.getTime() === this.view.selectedDate.getTime()
            }
          }];
          break;
      }

      return cells;
    },
    weekdayCellStyles: function weekdayCellStyles() {
      return {
        minWidth: "".concat(this.minCellWidth, "px") || false
      };
    },
    cssClasses: function cssClasses() {
      var _ref9;

      return _ref9 = {}, _defineProperty(_ref9, "vuecal--".concat(this.view.id, "-view"), true), _defineProperty(_ref9, "vuecal--".concat(this.locale), this.locale), _defineProperty(_ref9, 'vuecal--no-time', !this.time), _defineProperty(_ref9, 'vuecal--view-with-time', this.hasTimeColumn), _defineProperty(_ref9, 'vuecal--time-12-hour', this['12Hour']), _defineProperty(_ref9, 'vuecal--click-to-navigate', this.clickToNavigate), _defineProperty(_ref9, 'vuecal--hide-weekends', this.hideWeekends), _defineProperty(_ref9, 'vuecal--split-days', this.splitDays.length), _defineProperty(_ref9, 'vuecal--overflow-x', this.minCellWidth), _defineProperty(_ref9, 'vuecal--small', this.small), _defineProperty(_ref9, 'vuecal--xsmall', this.xsmall), _defineProperty(_ref9, 'vuecal--no-event-overlaps', this.noEventOverlaps), _ref9;
    }
  },
  watch: {
    events: function events(_events, oldEvents) {
      this.updateMutableEvents(_events);
    }
  }
});
// CONCATENATED MODULE: ./src/components/vue-cal/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_vue_calvue_type_script_lang_js_ = (vue_calvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/vue-cal/index.vue?vue&type=style&index=0&lang=scss&
var vue_calvue_type_style_index_0_lang_scss_ = __webpack_require__("17ac");

// CONCATENATED MODULE: ./src/components/vue-cal/index.vue






/* normalize component */

var vue_cal_component = normalizeComponent(
  components_vue_calvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

vue_cal_component.options.__file = "index.vue"
/* harmony default export */ var vue_cal = (vue_cal_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_cal);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vuecal.umd.js.map