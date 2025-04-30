(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});
;
'use strict';

var matomoUrl = document.querySelector('script[data-id="matomo-optout"]').getAttribute('data-matomo-optout-url');
var matomoOptOutIsTracked = true;

/**
 * Activate user tracking.
 */
function matomoOptOutTrack() {
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doTrack&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    matomoOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Deactivate user tracking.
 */
function matomoOptOutBlock() {
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.doIgnore&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function () {
    matomoOptOutStatus();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Get tracking status
 */

function matomoOptOutStatus() {
  // Retrieve initial status from piwik installation.
  var url = matomoUrl + '/index.php?module=API&method=AjaxOptOut.isTracked&format=json';

  fetchJsonp(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    matomoOptOutIsTracked = json.value;
    updateText();
  }).catch(function (ex) {
    console.log('parsing failed', ex);
  });
}

/**
 * Update status text with tracking status.
 */
function updateText() {
  var trackText = document.querySelector('.MatomoOptout-message--track');
  var blockText = document.querySelector('.MatomoOptout-message--block');
  if (matomoOptOutIsTracked === true) {
    trackText.classList.remove('is-hidden');
    blockText.classList.add('is-hidden');
  } else {
    blockText.classList.remove('is-hidden');
    trackText.classList.add('is-hidden');
  }
}

function documentReady() {
  // Get initial tracking status
  matomoOptOutStatus();

  // Add listener for the "do track" button.
  var doTrackBtn = document.querySelector('.MatomoOptout-button--track');
  doTrackBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    matomoOptOutTrack();
  });

  // Add listener for the "do not track" button.
  var doBlockBtn = document.querySelector('.MatomoOptout-button--block');
  doBlockBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    matomoOptOutStatus();
    if (matomoOptOutIsTracked === true) {
      matomoOptOutBlock();
    }
  });
}

// Check if the DOMContentLoaded has already been completed
if (document.readyState !== 'loading') {
  documentReady();
} else {
  document.addEventListener('DOMContentLoaded', documentReady);
}