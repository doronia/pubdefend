/**
 * FingerprintJS v3.0.5 - Copyright (c) FingerprintJS, Inc, 2021 (https://fingerprintjs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * This software contains code from open-source projects:
 * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
 */

var FingerprintJS = (function(exports) {
    'use strict';

    /*
     * Taken from https://github.com/karanlyons/murmurHash3.js/blob/a33d0723127e2e5415056c455f8aed2451ace208/murmurHash3.js
     */
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // added together as a 64bit int (as an array of two 32bit ints).
    //
    function x64Add(m, n) {
        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];
        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;
        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[0] += m[0] + n[0];
        o[0] &= 0xffff;
        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // multiplied together as a 64bit int (as an array of two 32bit ints).
    //
    function x64Multiply(m, n) {
        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];
        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;
        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;
        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;
        o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
        o[0] &= 0xffff;
        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) rotated left by that number of positions.
    //
    function x64Rotl(m, n) {
        n %= 64;
        if (n === 32) {
            return [m[1], m[0]];
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
        } else {
            n -= 32;
            return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
        }
    }
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) shifted left by that number of positions.
    //
    function x64LeftShift(m, n) {
        n %= 64;
        if (n === 0) {
            return m;
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
        } else {
            return [m[1] << (n - 32), 0];
        }
    }
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // xored together as a 64bit int (as an array of two 32bit ints).
    //
    function x64Xor(m, n) {
        return [m[0] ^ n[0], m[1] ^ n[1]];
    }
    //
    // Given a block, returns murmurHash3's final x64 mix of that block.
    // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
    // only place where we need to right shift 64bit ints.)
    //
    function x64Fmix(h) {
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [0xff51afd7, 0xed558ccd]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        return h;
    }
    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
    //
    function x64hash128(key, seed) {
        key = key || '';
        seed = seed || 0;
        var remainder = key.length % 16;
        var bytes = key.length - remainder;
        var h1 = [0, seed];
        var h2 = [0, seed];
        var k1 = [0, 0];
        var k2 = [0, 0];
        var c1 = [0x87c37b91, 0x114253d5];
        var c2 = [0x4cf5ad43, 0x2745937f];
        var i;
        for (i = 0; i < bytes; i = i + 16) {
            k1 = [
                (key.charCodeAt(i + 4) & 0xff) |
                ((key.charCodeAt(i + 5) & 0xff) << 8) |
                ((key.charCodeAt(i + 6) & 0xff) << 16) |
                ((key.charCodeAt(i + 7) & 0xff) << 24),
                (key.charCodeAt(i) & 0xff) |
                ((key.charCodeAt(i + 1) & 0xff) << 8) |
                ((key.charCodeAt(i + 2) & 0xff) << 16) |
                ((key.charCodeAt(i + 3) & 0xff) << 24),
            ];
            k2 = [
                (key.charCodeAt(i + 12) & 0xff) |
                ((key.charCodeAt(i + 13) & 0xff) << 8) |
                ((key.charCodeAt(i + 14) & 0xff) << 16) |
                ((key.charCodeAt(i + 15) & 0xff) << 24),
                (key.charCodeAt(i + 8) & 0xff) |
                ((key.charCodeAt(i + 9) & 0xff) << 8) |
                ((key.charCodeAt(i + 10) & 0xff) << 16) |
                ((key.charCodeAt(i + 11) & 0xff) << 24),
            ];
            k1 = x64Multiply(k1, c1);
            k1 = x64Rotl(k1, 31);
            k1 = x64Multiply(k1, c2);
            h1 = x64Xor(h1, k1);
            h1 = x64Rotl(h1, 27);
            h1 = x64Add(h1, h2);
            h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
            k2 = x64Multiply(k2, c2);
            k2 = x64Rotl(k2, 33);
            k2 = x64Multiply(k2, c1);
            h2 = x64Xor(h2, k2);
            h2 = x64Rotl(h2, 31);
            h2 = x64Add(h2, h1);
            h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }
        k1 = [0, 0];
        k2 = [0, 0];
        switch (remainder) {
            case 15:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
                // fallthrough
            case 14:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
                // fallthrough
            case 13:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
                // fallthrough
            case 12:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
                // fallthrough
            case 11:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
                // fallthrough
            case 10:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
                // fallthrough
            case 9:
                k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
                k2 = x64Multiply(k2, c2);
                k2 = x64Rotl(k2, 33);
                k2 = x64Multiply(k2, c1);
                h2 = x64Xor(h2, k2);
                // fallthrough
            case 8:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
                // fallthrough
            case 7:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
                // fallthrough
            case 6:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
                // fallthrough
            case 5:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
                // fallthrough
            case 4:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
                // fallthrough
            case 3:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
                // fallthrough
            case 2:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
                // fallthrough
            case 1:
                k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
                k1 = x64Multiply(k1, c1);
                k1 = x64Rotl(k1, 31);
                k1 = x64Multiply(k1, c2);
                h1 = x64Xor(h1, k1);
                // fallthrough
        }
        h1 = x64Xor(h1, [0, key.length]);
        h2 = x64Xor(h2, [0, key.length]);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        h1 = x64Fmix(h1);
        h2 = x64Fmix(h2);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        return (('00000000' + (h1[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (h1[1] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (h2[0] >>> 0).toString(16)).slice(-8) +
            ('00000000' + (h2[1] >>> 0).toString(16)).slice(-8));
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
        return new(P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
            f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

        function verb(n) { return function(v) { return step([n, v]); }; }

        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                            t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2];
                            _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e];
                y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var version = "3.0.5";

    var w = window;

    function requestIdleCallbackIfAvailable(fallbackTimeout, deadlineTimeout) {
        if (deadlineTimeout === void 0) { deadlineTimeout = Infinity; }
        return new Promise(function(resolve) {
            if (w.requestIdleCallback) {
                w.requestIdleCallback(function() { return resolve(); }, { timeout: deadlineTimeout });
            } else {
                setTimeout(resolve, Math.min(fallbackTimeout, deadlineTimeout));
            }
        });
    }

    /**
     * Converts an error object to a plain object that can be used with `JSON.stringify`.
     * If you just run `JSON.stringify(error)`, you'll get `'{}'`.
     */
    function errorToObject(error) {
        var _a;
        return __assign({ name: error.name, message: error.message, stack: (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('\n') }, error);
    }

    /*
     * This file contains functions to work with pure data only (no browser features, DOM, side effects, etc).
     */
    /**
     * Does the same as Array.prototype.includes but has better typing
     */
    function includes(haystack, needle) {
        for (var i = 0, l = haystack.length; i < l; ++i) {
            if (haystack[i] === needle) {
                return true;
            }
        }
        return false;
    }
    /**
     * Like `!includes()` but with proper typing
     */
    function excludes(haystack, needle) {
        return !includes(haystack, needle);
    }
    /**
     * Be careful, NaN can return
     */
    function toInt(value) {
        return parseInt(value);
    }
    /**
     * Be careful, NaN can return
     */
    function toFloat(value) {
        return parseFloat(value);
    }

    function replaceNaN(value, replacement) {
        return typeof value === 'number' && isNaN(value) ? replacement : value;
    }

    function countTruthy(values) {
        return values.reduce(function(sum, value) { return sum + (value ? 1 : 0); }, 0);
    }

    /*
     * Functions to help with features that vary through browsers
     */
    var w$1 = window;
    var n = navigator;
    var d = document;
    /**
     * Checks whether the browser is based on Trident (the Internet Explorer engine) without using user-agent.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isTrident() {
        // The properties are checked to be in IE 10, IE 11 and not to be in other browsers in October 2020
        return (countTruthy([
            'MSCSSMatrix' in w$1,
            'msSetImmediate' in w$1,
            'msIndexedDB' in w$1,
            'msMaxTouchPoints' in n,
            'msPointerEnabled' in n,
        ]) >= 4);
    }
    /**
     * Checks whether the browser is based on EdgeHTML (the pre-Chromium Edge engine) without using user-agent.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isEdgeHTML() {
        // Based on research in October 2020
        return (countTruthy(['msWriteProfilerMark' in w$1, 'MSStream' in w$1, 'msLaunchUri' in n, 'msSaveBlob' in n]) >= 3 &&
            !isTrident());
    }
    /**
     * Checks whether the browser is based on Chromium without using user-agent.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isChromium() {
        // Based on research in October 2020. Tested to detect Chromium 42-86.
        return (countTruthy([
            'webkitPersistentStorage' in n,
            'webkitTemporaryStorage' in n,
            n.vendor.indexOf('Google') === 0,
            'webkitResolveLocalFileSystemURL' in w$1,
            'BatteryManager' in w$1,
            'webkitMediaStream' in w$1,
            'webkitSpeechGrammar' in w$1,
        ]) >= 5);
    }
    /**
     * Checks whether the browser is based on mobile or desktop Safari without using user-agent.
     * All iOS browsers use WebKit (the Safari engine).
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isWebKit() {
        // Based on research in September 2020
        return (countTruthy([
            'ApplePayError' in w$1,
            'CSSPrimitiveValue' in w$1,
            'Counter' in w$1,
            n.vendor.indexOf('Apple') === 0,
            'getStorageUpdates' in n,
            'WebKitMediaKeys' in w$1,
        ]) >= 4);
    }
    /**
     * Checks whether the WebKit browser is a desktop Safari.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isDesktopSafari() {
        return (countTruthy([
            'safari' in w$1, !('DeviceMotionEvent' in w$1), !('ongestureend' in w$1), !('standalone' in n),
        ]) >= 3);
    }
    /**
     * Checks whether the browser is based on Gecko (Firefox engine) without using user-agent.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function isGecko() {
        var _a;
        // Based on research in September 2020
        return (countTruthy([
            'buildID' in n,
            ((_a = d.documentElement) === null || _a === void 0 ? void 0 : _a.style) && 'MozAppearance' in d.documentElement.style,
            'MediaRecorderErrorEvent' in w$1,
            'mozInnerScreenX' in w$1,
            'CSSMozDocumentRule' in w$1,
            'CanvasCaptureMediaStream' in w$1,
        ]) >= 4);
    }
    /**
     * Checks whether the browser is based on Chromium version ≥86 without using user-agent.
     * It doesn't check that the browser is based on Chromium, there is a separate function for this.
     */
    function isChromium86OrNewer() {
        // Checked in Chrome 85 vs Chrome 86 both on desktop and Android
        return (countTruthy([!('MediaSettingsRange' in w$1),
            'RTCEncodedAudioFrame' in w$1,
            '' + w$1.Intl === '[object Intl]',
            '' + w$1.Reflect === '[object Reflect]',
        ]) >= 3);
    }
    /**
     * Checks whether the browser is based on WebKit version ≥606 (Safari ≥12) without using user-agent.
     * It doesn't check that the browser is based on WebKit, there is a separate function for this.
     *
     * @link https://en.wikipedia.org/wiki/Safari_version_history#Release_history Safari-WebKit versions map
     */
    function isWebKit606OrNewer() {
        // Checked in Safari 9–14
        return (countTruthy([
            'DOMRectList' in w$1,
            'RTCPeerConnectionIceEvent' in w$1,
            'SVGGeometryElement' in w$1,
            'ontransitioncancel' in w$1,
        ]) >= 3);
    }

    var w$2 = window;
    var d$1 = document;
    // Inspired by and based on https://github.com/cozylife/audio-fingerprint
    function getAudioFingerprint() {
        return __awaiter(this, void 0, void 0, function() {
            var AudioContext, context, oscillator, compressor, buffer, error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        AudioContext = w$2.OfflineAudioContext || w$2.webkitOfflineAudioContext;
                        if (!AudioContext) {
                            return [2 /*return*/ , -2 /* NotSupported */ ];
                        }
                        // In some browsers, audio context always stays suspended unless the context is started in response to a user action
                        // (e.g. a click or a tap). It prevents audio fingerprint from being taken at an arbitrary moment of time.
                        // Such browsers are old and unpopular, so the audio fingerprinting is just skipped in them.
                        // See a similar case explanation at https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
                        if (doesCurrentBrowserSuspendAudioContext()) {
                            return [2 /*return*/ , -1 /* KnownToSuspend */ ];
                        }
                        context = new AudioContext(1, 44100, 44100);
                        oscillator = context.createOscillator();
                        oscillator.type = 'triangle';
                        setAudioParam(context, oscillator.frequency, 10000);
                        compressor = context.createDynamicsCompressor();
                        setAudioParam(context, compressor.threshold, -50);
                        setAudioParam(context, compressor.knee, 40);
                        setAudioParam(context, compressor.ratio, 12);
                        setAudioParam(context, compressor.reduction, -20);
                        setAudioParam(context, compressor.attack, 0);
                        setAudioParam(context, compressor.release, 0.25);
                        oscillator.connect(compressor);
                        compressor.connect(context.destination);
                        oscillator.start(0);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/ , renderAudio(context)];
                    case 2:
                        buffer = _a.sent();
                        return [3 /*break*/ , 5];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.name === "timeout" /* Timeout */ || error_1.name === "suspended" /* Suspended */ ) {
                            return [2 /*return*/ , -3 /* Timeout */ ];
                        }
                        throw error_1;
                    case 4:
                        oscillator.disconnect();
                        compressor.disconnect();
                        return [7 /*endfinally*/ ];
                    case 5:
                        return [2 /*return*/ , getHash(buffer.getChannelData(0))];
                }
            });
        });
    }
    /**
     * Checks if the current browser is known to always suspend audio context
     */
    function doesCurrentBrowserSuspendAudioContext() {
        return isWebKit() && !isDesktopSafari() && !isWebKit606OrNewer();
    }

    function setAudioParam(context, param, value) {
        var isAudioParam = function(value) {
            return value && typeof value.setValueAtTime === 'function';
        };
        if (isAudioParam(param)) {
            param.setValueAtTime(value, context.currentTime);
        }
    }

    function renderAudio(context) {
        var resumeTriesMaxCount = 3;
        var resumeRetryDelay = 500;
        var runningTimeout = 1000;
        return new Promise(function(resolve, reject) {
            context.oncomplete = function(event) { return resolve(event.renderedBuffer); };
            var resumeTriesLeft = resumeTriesMaxCount;
            var tryResume = function() {
                context.startRendering();
                switch (context.state) {
                    case 'running':
                        setTimeout(function() { return reject(makeInnerError("timeout" /* Timeout */ )); }, runningTimeout);
                        break;
                        // Sometimes the audio context doesn't start after calling `startRendering` (in addition to the cases where
                        // audio context doesn't start at all). A known case is starting an audio context when the browser tab is in
                        // background on iPhone. Retries usually help in this case.
                    case 'suspended':
                        // The audio context can reject starting until the tab is in foreground. Long fingerprint duration
                        // in background isn't a problem, therefore the retry attempts don't count in background. It can lead to
                        // a situation when a fingerprint takes very long time and finishes successfully. FYI, the audio context
                        // can be suspended when `document.hidden === false` and start running after a retry.
                        if (!d$1.hidden) {
                            resumeTriesLeft--;
                        }
                        if (resumeTriesLeft > 0) {
                            setTimeout(tryResume, resumeRetryDelay);
                        } else {
                            reject(makeInnerError("suspended" /* Suspended */ ));
                        }
                        break;
                }
            };
            tryResume();
        });
    }

    function getHash(signal) {
        var hash = 0;
        for (var i = 4500; i < 5000; ++i) {
            hash += Math.abs(signal[i]);
        }
        return hash;
    }

    function makeInnerError(name) {
        var error = new Error(name);
        error.name = name;
        return error;
    }

    var d$2 = document;
    // We use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated.
    var testString = 'mmMwWLliI0O&1';
    // We test using 48px font size, we may use any size. I guess larger the better.
    var testSize = '48px';
    // A font will be compared against all the three default fonts.
    // And if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];
    var fontList = [
        // This is android-specific font from "Roboto" family
        'sans-serif-thin',
        'ARNO PRO',
        'Agency FB',
        'Arabic Typesetting',
        'Arial Unicode MS',
        'AvantGarde Bk BT',
        'BankGothic Md BT',
        'Batang',
        'Bitstream Vera Sans Mono',
        'Calibri',
        'Century',
        'Century Gothic',
        'Clarendon',
        'EUROSTILE',
        'Franklin Gothic',
        'Futura Bk BT',
        'Futura Md BT',
        'GOTHAM',
        'Gill Sans',
        'HELV',
        'Haettenschweiler',
        'Helvetica Neue',
        'Humanst521 BT',
        'Leelawadee',
        'Letter Gothic',
        'Levenim MT',
        'Lucida Bright',
        'Lucida Sans',
        'Menlo',
        'MS Mincho',
        'MS Outlook',
        'MS Reference Specialty',
        'MS UI Gothic',
        'MT Extra',
        'MYRIAD PRO',
        'Marlett',
        'Meiryo UI',
        'Microsoft Uighur',
        'Minion Pro',
        'Monotype Corsiva',
        'PMingLiU',
        'Pristina',
        'SCRIPTINA',
        'Segoe UI Light',
        'Serifa',
        'SimHei',
        'Small Fonts',
        'Staccato222 BT',
        'TRAJAN PRO',
        'Univers CE 55 Medium',
        'Vrinda',
        'ZWAdobeF',
    ];
    var fontSpanStyle = {
        // CSS font reset to reset external styles
        fontStyle: 'normal',
        fontWeight: 'normal',
        letterSpacing: 'normal',
        lineBreak: 'auto',
        lineHeight: 'normal',
        textTransform: 'none',
        textAlign: 'left',
        textDecoration: 'none',
        textShadow: 'none',
        whiteSpace: 'normal',
        wordBreak: 'normal',
        wordSpacing: 'normal',
        // We need this css as in some weird browser this span elements shows up for a microSec which creates
        // a bad user experience
        position: 'absolute',
        left: '-9999px',
        fontSize: testSize,
    };
    // kudos to http://www.lalit.org/lab/javascript-css-font-detect/
    function getFonts() {
        var h = d$2.body;
        // div to load spans for the base fonts
        var baseFontsDiv = d$2.createElement('div');
        // div to load spans for the fonts to detect
        var fontsDiv = d$2.createElement('div');
        var defaultWidth = {};
        var defaultHeight = {};
        // creates a span where the fonts will be loaded
        var createSpan = function() {
            var span = d$2.createElement('span');
            span.textContent = testString;
            for (var _i = 0, _a = Object.keys(fontSpanStyle); _i < _a.length; _i++) {
                var prop = _a[_i];
                span.style[prop] = fontSpanStyle[prop];
            }
            return span;
        };
        // creates a span and load the font to detect and a base font for fallback
        var createSpanWithFonts = function(fontToDetect, baseFont) {
            var s = createSpan();
            s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
            return s;
        };
        // creates spans for the base fonts and adds them to baseFontsDiv
        var initializeBaseFontsSpans = function() {
            return baseFonts.map(function(baseFont) {
                var s = createSpan();
                s.style.fontFamily = baseFont;
                baseFontsDiv.appendChild(s);
                return s;
            });
        };
        // creates spans for the fonts to detect and adds them to fontsDiv
        var initializeFontsSpans = function() {
            // Stores {fontName : [spans for that font]}
            var spans = {};
            var _loop_1 = function(font) {
                spans[font] = baseFonts.map(function(baseFont) {
                    var s = createSpanWithFonts(font, baseFont);
                    fontsDiv.appendChild(s);
                    return s;
                });
            };
            for (var _i = 0, fontList_1 = fontList; _i < fontList_1.length; _i++) {
                var font = fontList_1[_i];
                _loop_1(font);
            }
            return spans;
        };
        // checks if a font is available
        var isFontAvailable = function(fontSpans) {
            return baseFonts.some(function(baseFont, baseFontIndex) {
                return fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] ||
                    fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont];
            });
        };
        // create spans for base fonts
        var baseFontsSpans = initializeBaseFontsSpans();
        // add the spans to the DOM
        h.appendChild(baseFontsDiv);
        // get the default width for the three base fonts
        for (var index = 0, length_1 = baseFonts.length; index < length_1; index++) {
            defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth; // width for the default font
            defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight; // height for the default font
        }
        // create spans for fonts to detect
        var fontsSpans = initializeFontsSpans();
        // add all the spans to the DOM
        h.appendChild(fontsDiv);
        // check available fonts
        var available = [];
        for (var i = 0, l = fontList.length; i < l; i++) {
            if (isFontAvailable(fontsSpans[fontList[i]])) {
                available.push(fontList[i]);
            }
        }
        // remove spans from DOM
        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);
        return available;
    }

    function getPlugins() {
        if (isTrident()) {
            return [];
        }
        if (!navigator.plugins) {
            return undefined;
        }
        var plugins = [];
        // Safari 10 doesn't support iterating navigator.plugins with for...of
        for (var i = 0; i < navigator.plugins.length; ++i) {
            var plugin = navigator.plugins[i];
            if (!plugin) {
                continue;
            }
            var mimeTypes = [];
            for (var j = 0; j < plugin.length; ++j) {
                var mimeType = plugin[j];
                mimeTypes.push({
                    type: mimeType.type,
                    suffixes: mimeType.suffixes,
                });
            }
            plugins.push({
                name: plugin.name,
                description: plugin.description,
                mimeTypes: mimeTypes,
            });
        }
        return plugins;
    }

    function makeCanvasContext() {
        var canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 140;
        canvas.style.display = 'inline';
        return [canvas, canvas.getContext('2d')];
    }

    function isSupported(canvas, context) {
        // TODO: look into: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        return !!(context && canvas.toDataURL);
    }

    function save(canvas) {
        // TODO: look into: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        return canvas.toDataURL();
    }
    // https://www.browserleaks.com/canvas#how-does-it-work
    function getCanvasFingerprint() {
        var _a = makeCanvasContext(),
            canvas = _a[0],
            context = _a[1];
        if (!isSupported(canvas, context)) {
            return { winding: false, data: '' };
        }
        // detect browser support of canvas winding
        // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
        // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
        context.rect(0, 0, 10, 10);
        context.rect(2, 2, 6, 6);
        var winding = !context.isPointInPath(5, 5, 'evenodd');
        context.textBaseline = 'alphabetic';
        context.fillStyle = '#f60';
        context.fillRect(125, 1, 62, 20);
        context.fillStyle = '#069';
        // https://github.com/Valve/fingerprintjs2/issues/66
        // this can affect FP generation when applying different CSS on different websites
        context.font = '11pt no-real-font-123';
        // the choice of emojis has a gigantic impact on rendering performance (especially in FF)
        // some newer emojis cause it to slow down 50-200 times
        // context.fillText("Cw爨m fjordbank \ud83d\ude03 gly", 2, 15)
        var printedText = 'Cwm fjordbank \ud83d\ude03 gly';
        context.fillText(printedText, 2, 15);
        context.fillStyle = 'rgba(102, 204, 0, 0.2)';
        context.font = '18pt Arial';
        context.fillText(printedText, 4, 45);
        // canvas blending
        // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
        // http://jsfiddle.net/NDYV8/16/
        context.globalCompositeOperation = 'multiply';
        context.fillStyle = 'rgb(255,0,255)';
        context.beginPath();
        context.arc(50, 50, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.fillStyle = 'rgb(0,255,255)';
        context.beginPath();
        context.arc(100, 50, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.fillStyle = 'rgb(255,255,0)';
        context.beginPath();
        context.arc(75, 100, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.fillStyle = 'rgb(255,0,255)';
        // canvas winding
        // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
        // http://jsfiddle.net/NDYV8/19/
        context.arc(75, 75, 75, 0, Math.PI * 2, true);
        context.arc(75, 75, 25, 0, Math.PI * 2, true);
        context.fill('evenodd');
        return {
            winding: winding,
            data: save(canvas),
        };
    }

    var n$1 = navigator;
    var w$3 = window;
    /**
     * This is a crude and primitive touch screen detection. It's not possible to currently reliably detect the availability
     * of a touch screen with a JS, without actually subscribing to a touch event.
     *
     * @see http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
     * @see https://github.com/Modernizr/Modernizr/issues/548
     */
    function getTouchSupport() {
        var maxTouchPoints = 0;
        var touchEvent;
        if (n$1.maxTouchPoints !== undefined) {
            maxTouchPoints = toInt(n$1.maxTouchPoints);
        } else if (n$1.msMaxTouchPoints !== undefined) {
            maxTouchPoints = n$1.msMaxTouchPoints;
        }
        try {
            document.createEvent('TouchEvent');
            touchEvent = true;
        } catch (_) {
            touchEvent = false;
        }
        var touchStart = 'ontouchstart' in w$3;
        return {
            maxTouchPoints: maxTouchPoints,
            touchEvent: touchEvent,
            touchStart: touchStart,
        };
    }

    function getOsCpu() {
        return navigator.oscpu;
    }

    var n$2 = navigator;

    function getLanguages() {
        var result = [];
        var language = n$2.language || n$2.userLanguage || n$2.browserLanguage || n$2.systemLanguage;
        if (language !== undefined) {
            result.push([language]);
        }
        if (Array.isArray(n$2.languages)) {
            // Starting from Chromium 86, there is only a single value in `navigator.language` in Incognito mode:
            // the value of `navigator.language`. Therefore the value is ignored in this browser.
            if (!(isChromium() && isChromium86OrNewer())) {
                result.push(n$2.languages);
            }
        } else if (typeof n$2.languages === 'string') {
            var languages = n$2.languages;
            if (languages) {
                result.push(languages.split(','));
            }
        }
        return result;
    }

    function getColorDepth() {
        return window.screen.colorDepth;
    }

    function getDeviceMemory() {
        // `navigator.deviceMemory` is a string containing a number in some unidentified cases
        return replaceNaN(toFloat(navigator.deviceMemory), undefined);
    }

    var w$4 = window;

    function getScreenResolution() {
        // Some browsers return screen resolution as strings, e.g. "1200", instead of a number, e.g. 1200.
        // I suspect it's done by certain plugins that randomize browser properties to prevent fingerprinting.
        var dimensions = [toInt(w$4.screen.width), toInt(w$4.screen.height)];
        dimensions.sort().reverse();
        return dimensions;
    }

    var w$5 = window;

    function getAvailableScreenResolution() {
        if (w$5.screen.availWidth && w$5.screen.availHeight) {
            // Some browsers return screen resolution as strings, e.g. "1200", instead of a number, e.g. 1200.
            // I suspect it's done by certain plugins that randomize browser properties to prevent fingerprinting.
            var dimensions = [toInt(w$5.screen.availWidth), toInt(w$5.screen.availHeight)];
            dimensions.sort().reverse();
            return dimensions;
        }
        return undefined;
    }

    function getHardwareConcurrency() {
        try {
            // sometimes hardware concurrency is a string
            var concurrency = toInt(navigator.hardwareConcurrency);
            return isNaN(concurrency) ? 1 : concurrency;
        } catch (e) {
            return 1;
        }
    }

    function getTimezoneOffset() {
        var currentYear = new Date().getFullYear();
        // The timezone offset may change over time due to daylight saving time (DST) shifts.
        // The non-DST timezone offset is used as the result timezone offset.
        // Since the DST season differs in the northern and the southern hemispheres,
        // both January and July timezones offsets are considered.
        return Math.max(
            // `getTimezoneOffset` returns a number as a string in some unidentified cases
            toFloat(new Date(currentYear, 0, 1).getTimezoneOffset()), toFloat(new Date(currentYear, 6, 1).getTimezoneOffset()));
    }

    var w$6 = window;

    function getTimezone() {
        var _a;
        if ((_a = w$6.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat) {
            return new w$6.Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        return undefined;
    }

    function getSessionStorage() {
        try {
            return !!window.sessionStorage;
        } catch (error) {
            /* SecurityError when referencing it means it exists */
            return true;
        }
    }

    // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
    function getLocalStorage() {
        try {
            return !!window.localStorage;
        } catch (e) {
            /* SecurityError when referencing it means it exists */
            return true;
        }
    }

    function getIndexedDB() {
        // IE and Edge don't allow accessing indexedDB in private mode, therefore IE and Edge will have different
        // visitor identifier in normal and private modes.
        if (isTrident() || isEdgeHTML()) {
            return undefined;
        }
        try {
            return !!window.indexedDB;
        } catch (e) {
            /* SecurityError when referencing it means it exists */
            return true;
        }
    }

    function getOpenDatabase() {
        return !!window.openDatabase;
    }

    function getCpuClass() {
        return navigator.cpuClass;
    }

    /**
     * It should be improved to handle mock value on iOS:
     * https://github.com/fingerprintjs/fingerprintjs/issues/514#issuecomment-727782842
     */
    function getPlatform() {
        return navigator.platform;
    }

    function getPluginsSupport() {
        return navigator.plugins !== undefined;
    }

    function getProductSub() {
        return navigator.productSub;
    }

    function getEmptyEvalLength() {
        return eval.toString().length;
    }

    function getErrorFF() {
        try {
            throw 'a';
        } catch (e) {
            try {
                e.toSource();
                return true;
            } catch (e2) {
                return false;
            }
        }
    }

    function getVendor() {
        return navigator.vendor;
    }

    function getChrome() {
        return window.chrome !== undefined;
    }

    var d$3 = document;
    /**
     * navigator.cookieEnabled cannot detect custom or nuanced cookie blocking configurations. For example, when blocking
     * cookies via the Advanced Privacy Settings in IE9, it always returns true. And there have been issues in the past with
     * site-specific exceptions. Don't rely on it.
     *
     * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cookies.js Taken from here
     */
    function areCookiesEnabled() {
        // Taken from here: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cookies.js
        // navigator.cookieEnabled cannot detect custom or nuanced cookie blocking configurations. For example, when blocking
        // cookies via the Advanced Privacy Settings in IE9, it always returns true. And there have been issues in the past
        // with site-specific exceptions. Don't rely on it.
        // try..catch because some in situations `document.cookie` is exposed but throws a
        // SecurityError if you try to access it; e.g. documents created from data URIs
        // or in sandboxed iframes (depending on flags/context)
        try {
            // Create cookie
            d$3.cookie = 'cookietest=1; SameSite=Strict;';
            var result = d$3.cookie.indexOf('cookietest=') !== -1;
            // Delete cookie
            d$3.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return result;
        } catch (e) {
            return false;
        }
    }

    /**
     * The list of entropy sources used to make visitor identifiers.
     *
     * This value isn't restricted by Semantic Versioning, i.e. it may be changed without bumping minor or major version of
     * this package.
     */
    var sources = {
        // Expected errors and default values must be handled inside the functions. Unexpected errors must be thrown.
        osCpu: getOsCpu,
        languages: getLanguages,
        colorDepth: getColorDepth,
        deviceMemory: getDeviceMemory,
        screenResolution: getScreenResolution,
        availableScreenResolution: getAvailableScreenResolution,
        hardwareConcurrency: getHardwareConcurrency,
        timezoneOffset: getTimezoneOffset,
        timezone: getTimezone,
        sessionStorage: getSessionStorage,
        localStorage: getLocalStorage,
        indexedDB: getIndexedDB,
        openDatabase: getOpenDatabase,
        cpuClass: getCpuClass,
        platform: getPlatform,
        plugins: getPlugins,
        canvas: getCanvasFingerprint,
        // adBlock: isAdblockUsed, // https://github.com/fingerprintjs/fingerprintjs/issues/405
        touchSupport: getTouchSupport,
        fonts: getFonts,
        audio: getAudioFingerprint,
        pluginsSupport: getPluginsSupport,
        productSub: getProductSub,
        emptyEvalLength: getEmptyEvalLength,
        errorFF: getErrorFF,
        vendor: getVendor,
        chrome: getChrome,
        cookiesEnabled: areCookiesEnabled,
    };
    /**
     * Gets a components list from the given list of entropy sources.
     *
     * Warning for package users:
     * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
     */
    function getComponents(sources, sourceOptions, excludeSources) {
        return __awaiter(this, void 0, void 0, function() {
            var timestamp, components, _i, _a, sourceKey, result, error_1, nextTimestamp;
            var _b;
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        timestamp = Date.now();
                        components = {};
                        _i = 0, _a = Object.keys(sources);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/ , 7];
                        sourceKey = _a[_i];
                        if (!excludes(excludeSources, sourceKey)) {
                            return [3 /*break*/ , 6];
                        }
                        result = void 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        _b = {};
                        return [4 /*yield*/ , sources[sourceKey](sourceOptions)];
                    case 3:
                        result = (_b.value = _c.sent(), _b);
                        return [3 /*break*/ , 5];
                    case 4:
                        error_1 = _c.sent();
                        result = error_1 && typeof error_1 === 'object' && 'message' in error_1 ? { error: error_1 } : { error: { message: error_1 } };
                        return [3 /*break*/ , 5];
                    case 5:
                        nextTimestamp = Date.now();
                        components[sourceKey] = __assign(__assign({}, result), { duration: nextTimestamp - timestamp }); // TypeScript has beaten me here
                        timestamp = nextTimestamp;
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/ , 1];
                    case 7:
                        return [2 /*return*/ , components];
                }
            });
        });
    }
    /**
     * Collects entropy components from the built-in sources to make the visitor identifier.
     */
    function getBuiltinComponents() {
        return getComponents(sources, undefined, []);
    }

    function componentsToCanonicalString(components) {
        var result = '';
        for (var _i = 0, _a = Object.keys(components); _i < _a.length; _i++) {
            var componentKey = _a[_i];
            var component = components[componentKey];
            var value = component.error ? 'error' : JSON.stringify(component.value);
            result += "" + (result ? '|' : '') + componentKey.replace(/([:|\\])/g, '\\$1') + ":" + value;
        }
        return result;
    }

    function componentsToDebugString(components) {
        return JSON.stringify(components, function(_key, value) {
            if (value instanceof Error) {
                return errorToObject(value);
            }
            return value;
        }, 2);
    }

    function hashComponents(components) {
        return x64hash128(componentsToCanonicalString(components));
    }
    /**
     * Makes a GetResult implementation that calculates the visitor id hash on demand.
     * Designed for optimisation.
     */
    function makeLazyGetResult(components) {
        var visitorIdCache;
        // A plain class isn't used because its getters and setters aren't enumerable.
        return {
            components: components,
            get visitorId() {
                if (visitorIdCache === undefined) {
                    visitorIdCache = hashComponents(this.components);
                }
                return visitorIdCache;
            },
            set visitorId(visitorId) {
                visitorIdCache = visitorId;
            },
        };
    }
    /**
     * The class isn't exported from the index file to not expose the constructor.
     * The hiding gives more freedom for future non-breaking updates.
     */
    var OpenAgent = /** @class */ (function() {
        function OpenAgent() {}
        /**
         * @inheritDoc
         */
        OpenAgent.prototype.get = function(options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function() {
                var components, result;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/ , getBuiltinComponents()];
                        case 1:
                            components = _a.sent();
                            result = makeLazyGetResult(components);
                            if (options.debug) {
                                // console.log is ok here because it's under a debug clause
                                // eslint-disable-next-line no-console
                                console.log("Copy the text below to get the debug data:\n\n```\nversion: " + version + "\nuserAgent: " + navigator.userAgent + "\ngetOptions: " + JSON.stringify(options, undefined, 2) + "\nvisitorId: " + result.visitorId + "\ncomponents: " + componentsToDebugString(components) + "\n```");
                            }
                            return [2 /*return*/ , result];
                    }
                });
            });
        };
        return OpenAgent;
    }());
    /**
     * Builds an instance of Agent and waits a delay required for a proper operation.
     */
    function load(_a) {
        var _b = (_a === void 0 ? {} : _a).delayFallback,
            delayFallback = _b === void 0 ? 50 : _b;
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        // A delay is required to ensure consistent entropy components.
                        // See https://github.com/fingerprintjs/fingerprintjs/issues/254
                        // and https://github.com/fingerprintjs/fingerprintjs/issues/307
                        // and https://github.com/fingerprintjs/fingerprintjs/commit/945633e7c5f67ae38eb0fea37349712f0e669b18
                        // A proper deadline is unknown. Let it be twice the fallback timeout so that both cases have the same average time.
                        return [4 /*yield*/ , requestIdleCallbackIfAvailable(delayFallback, delayFallback * 2)];
                    case 1:
                        // A delay is required to ensure consistent entropy components.
                        // See https://github.com/fingerprintjs/fingerprintjs/issues/254
                        // and https://github.com/fingerprintjs/fingerprintjs/issues/307
                        // and https://github.com/fingerprintjs/fingerprintjs/commit/945633e7c5f67ae38eb0fea37349712f0e669b18
                        // A proper deadline is unknown. Let it be twice the fallback timeout so that both cases have the same average time.
                        _c.sent();
                        return [2 /*return*/ , new OpenAgent()];
                }
            });
        });
    }

    // The default export is a syntax sugar (`import * as FP from '...' → import FP from '...'`).
    // It should contain all the public exported values.
    var index = { load: load, hashComponents: hashComponents, componentsToDebugString: componentsToDebugString };
    // The exports below are for private usage. They may change unexpectedly. Use them at your own risk.
    /** Not documented, out of Semantic Versioning, usage is at your own risk */
    var murmurX64Hash128 = x64hash128;

    exports.componentsToDebugString = componentsToDebugString;
    exports.default = index;
    exports.getComponents = getComponents;
    exports.hashComponents = hashComponents;
    exports.isChromium = isChromium;
    exports.isDesktopSafari = isDesktopSafari;
    exports.isEdgeHTML = isEdgeHTML;
    exports.isGecko = isGecko;
    exports.isTrident = isTrident;
    exports.isWebKit = isWebKit;
    exports.load = load;
    exports.murmurX64Hash128 = murmurX64Hash128;

    return exports;

}({}));