var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vo(r) {
  if (r.__esModule)
    return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
var Fu = {}, jt = {}, Ou = {};
Object.defineProperty(Ou, "__esModule", { value: !0 });
const fl = (r) => {
  const e = [];
  for (let t = 0, n = r.length; t < n; t++) {
    const i = r.charCodeAt(t);
    if (i < 128)
      e.push(i);
    else if (i < 2048)
      e.push(i >> 6 | 192, i & 63 | 128);
    else if (t + 1 < r.length && (i & 64512) === 55296 && (r.charCodeAt(t + 1) & 64512) === 56320) {
      const o = 65536 + ((i & 1023) << 10) + (r.charCodeAt(++t) & 1023);
      e.push(o >> 18 | 240, o >> 12 & 63 | 128, o >> 6 & 63 | 128, o & 63 | 128);
    } else
      e.push(i >> 12 | 224, i >> 6 & 63 | 128, i & 63 | 128);
  }
  return Uint8Array.from(e);
}, cl = (r) => {
  let e = "";
  for (let t = 0, n = r.length; t < n; t++) {
    const i = r[t];
    if (i < 128)
      e += String.fromCharCode(i);
    else if (192 <= i && i < 224) {
      const o = r[++t];
      e += String.fromCharCode((i & 31) << 6 | o & 63);
    } else if (240 <= i && i < 365) {
      const s = "%" + [i, r[++t], r[++t], r[++t]].map((a) => a.toString(16)).join("%");
      e += decodeURIComponent(s);
    } else
      e += String.fromCharCode((i & 15) << 12 | (r[++t] & 63) << 6 | r[++t] & 63);
  }
  return e;
};
function ll(r) {
  return new TextEncoder().encode(r);
}
function hl(r) {
  return new TextDecoder("utf-8").decode(r);
}
const dl = (r) => typeof TextEncoder == "function" ? ll(r) : fl(r), pl = (r) => typeof TextDecoder == "function" ? hl(r) : cl(r), _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fromUtf8: dl,
  toUtf8: pl
}, Symbol.toStringTag, { value: "Module" })), Ar = /* @__PURE__ */ Vo(_l);
var Ht = {}, Jn = {}, et = {}, Wr = {};
Wr.byteLength = xl;
Wr.toByteArray = bl;
Wr.fromByteArray = El;
var vt = [], rt = [], vl = typeof Uint8Array < "u" ? Uint8Array : Array, Xn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var ur = 0, yl = Xn.length; ur < yl; ++ur)
  vt[ur] = Xn[ur], rt[Xn.charCodeAt(ur)] = ur;
rt[45] = 62;
rt[95] = 63;
function Mu(r) {
  var e = r.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var t = r.indexOf("=");
  t === -1 && (t = e);
  var n = t === e ? 0 : 4 - t % 4;
  return [t, n];
}
function xl(r) {
  var e = Mu(r), t = e[0], n = e[1];
  return (t + n) * 3 / 4 - n;
}
function gl(r, e, t) {
  return (e + t) * 3 / 4 - t;
}
function bl(r) {
  var e, t = Mu(r), n = t[0], i = t[1], o = new vl(gl(r, n, i)), s = 0, a = i > 0 ? n - 4 : n, f;
  for (f = 0; f < a; f += 4)
    e = rt[r.charCodeAt(f)] << 18 | rt[r.charCodeAt(f + 1)] << 12 | rt[r.charCodeAt(f + 2)] << 6 | rt[r.charCodeAt(f + 3)], o[s++] = e >> 16 & 255, o[s++] = e >> 8 & 255, o[s++] = e & 255;
  return i === 2 && (e = rt[r.charCodeAt(f)] << 2 | rt[r.charCodeAt(f + 1)] >> 4, o[s++] = e & 255), i === 1 && (e = rt[r.charCodeAt(f)] << 10 | rt[r.charCodeAt(f + 1)] << 4 | rt[r.charCodeAt(f + 2)] >> 2, o[s++] = e >> 8 & 255, o[s++] = e & 255), o;
}
function wl(r) {
  return vt[r >> 18 & 63] + vt[r >> 12 & 63] + vt[r >> 6 & 63] + vt[r & 63];
}
function ml(r, e, t) {
  for (var n, i = [], o = e; o < t; o += 3)
    n = (r[o] << 16 & 16711680) + (r[o + 1] << 8 & 65280) + (r[o + 2] & 255), i.push(wl(n));
  return i.join("");
}
function El(r) {
  for (var e, t = r.length, n = t % 3, i = [], o = 16383, s = 0, a = t - n; s < a; s += o)
    i.push(ml(r, s, s + o > a ? a : s + o));
  return n === 1 ? (e = r[t - 1], i.push(
    vt[e >> 2] + vt[e << 4 & 63] + "=="
  )) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(
    vt[e >> 10] + vt[e >> 4 & 63] + vt[e << 2 & 63] + "="
  )), i.join("");
}
var wn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
wn.read = function(r, e, t, n, i) {
  var o, s, a = i * 8 - n - 1, f = (1 << a) - 1, u = f >> 1, c = -7, h = t ? i - 1 : 0, y = t ? -1 : 1, T = r[e + h];
  for (h += y, o = T & (1 << -c) - 1, T >>= -c, c += a; c > 0; o = o * 256 + r[e + h], h += y, c -= 8)
    ;
  for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = s * 256 + r[e + h], h += y, c -= 8)
    ;
  if (o === 0)
    o = 1 - u;
  else {
    if (o === f)
      return s ? NaN : (T ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, n), o = o - u;
  }
  return (T ? -1 : 1) * s * Math.pow(2, o - n);
};
wn.write = function(r, e, t, n, i, o) {
  var s, a, f, u = o * 8 - i - 1, c = (1 << u) - 1, h = c >> 1, y = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, T = n ? 0 : o - 1, A = n ? 1 : -1, B = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (f = Math.pow(2, -s)) < 1 && (s--, f *= 2), s + h >= 1 ? e += y / f : e += y * Math.pow(2, 1 - h), e * f >= 2 && (s++, f /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (e * f - 1) * Math.pow(2, i), s = s + h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; r[t + T] = a & 255, T += A, a /= 256, i -= 8)
    ;
  for (s = s << i | a, u += i; u > 0; r[t + T] = s & 255, T += A, s /= 256, u -= 8)
    ;
  r[t + T - A] |= B * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(r) {
  const e = Wr, t = wn, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = a, r.SlowBuffer = _, r.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  r.kMaxLength = i, a.TYPED_ARRAY_SUPPORT = o(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const I = new Uint8Array(1), v = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(v, Uint8Array.prototype), Object.setPrototypeOf(I, v), I.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(a.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.byteOffset;
    }
  });
  function s(I) {
    if (I > i)
      throw new RangeError('The value "' + I + '" is invalid for option "size"');
    const v = new Uint8Array(I);
    return Object.setPrototypeOf(v, a.prototype), v;
  }
  function a(I, v, g) {
    if (typeof I == "number") {
      if (typeof v == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return h(I);
    }
    return f(I, v, g);
  }
  a.poolSize = 8192;
  function f(I, v, g) {
    if (typeof I == "string")
      return y(I, v);
    if (ArrayBuffer.isView(I))
      return A(I);
    if (I == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof I
      );
    if (ae(I, ArrayBuffer) || I && ae(I.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ae(I, SharedArrayBuffer) || I && ae(I.buffer, SharedArrayBuffer)))
      return B(I, v, g);
    if (typeof I == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const W = I.valueOf && I.valueOf();
    if (W != null && W !== I)
      return a.from(W, v, g);
    const re = O(I);
    if (re)
      return re;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof I[Symbol.toPrimitive] == "function")
      return a.from(I[Symbol.toPrimitive]("string"), v, g);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof I
    );
  }
  a.from = function(I, v, g) {
    return f(I, v, g);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function u(I) {
    if (typeof I != "number")
      throw new TypeError('"size" argument must be of type number');
    if (I < 0)
      throw new RangeError('The value "' + I + '" is invalid for option "size"');
  }
  function c(I, v, g) {
    return u(I), I <= 0 ? s(I) : v !== void 0 ? typeof g == "string" ? s(I).fill(v, g) : s(I).fill(v) : s(I);
  }
  a.alloc = function(I, v, g) {
    return c(I, v, g);
  };
  function h(I) {
    return u(I), s(I < 0 ? 0 : d(I) | 0);
  }
  a.allocUnsafe = function(I) {
    return h(I);
  }, a.allocUnsafeSlow = function(I) {
    return h(I);
  };
  function y(I, v) {
    if ((typeof v != "string" || v === "") && (v = "utf8"), !a.isEncoding(v))
      throw new TypeError("Unknown encoding: " + v);
    const g = E(I, v) | 0;
    let W = s(g);
    const re = W.write(I, v);
    return re !== g && (W = W.slice(0, re)), W;
  }
  function T(I) {
    const v = I.length < 0 ? 0 : d(I.length) | 0, g = s(v);
    for (let W = 0; W < v; W += 1)
      g[W] = I[W] & 255;
    return g;
  }
  function A(I) {
    if (ae(I, Uint8Array)) {
      const v = new Uint8Array(I);
      return B(v.buffer, v.byteOffset, v.byteLength);
    }
    return T(I);
  }
  function B(I, v, g) {
    if (v < 0 || I.byteLength < v)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (I.byteLength < v + (g || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let W;
    return v === void 0 && g === void 0 ? W = new Uint8Array(I) : g === void 0 ? W = new Uint8Array(I, v) : W = new Uint8Array(I, v, g), Object.setPrototypeOf(W, a.prototype), W;
  }
  function O(I) {
    if (a.isBuffer(I)) {
      const v = d(I.length) | 0, g = s(v);
      return g.length === 0 || I.copy(g, 0, 0, v), g;
    }
    if (I.length !== void 0)
      return typeof I.length != "number" || pe(I.length) ? s(0) : T(I);
    if (I.type === "Buffer" && Array.isArray(I.data))
      return T(I.data);
  }
  function d(I) {
    if (I >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return I | 0;
  }
  function _(I) {
    return +I != I && (I = 0), a.alloc(+I);
  }
  a.isBuffer = function(v) {
    return v != null && v._isBuffer === !0 && v !== a.prototype;
  }, a.compare = function(v, g) {
    if (ae(v, Uint8Array) && (v = a.from(v, v.offset, v.byteLength)), ae(g, Uint8Array) && (g = a.from(g, g.offset, g.byteLength)), !a.isBuffer(v) || !a.isBuffer(g))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (v === g)
      return 0;
    let W = v.length, re = g.length;
    for (let oe = 0, ce = Math.min(W, re); oe < ce; ++oe)
      if (v[oe] !== g[oe]) {
        W = v[oe], re = g[oe];
        break;
      }
    return W < re ? -1 : re < W ? 1 : 0;
  }, a.isEncoding = function(v) {
    switch (String(v).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, a.concat = function(v, g) {
    if (!Array.isArray(v))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (v.length === 0)
      return a.alloc(0);
    let W;
    if (g === void 0)
      for (g = 0, W = 0; W < v.length; ++W)
        g += v[W].length;
    const re = a.allocUnsafe(g);
    let oe = 0;
    for (W = 0; W < v.length; ++W) {
      let ce = v[W];
      if (ae(ce, Uint8Array))
        oe + ce.length > re.length ? (a.isBuffer(ce) || (ce = a.from(ce)), ce.copy(re, oe)) : Uint8Array.prototype.set.call(
          re,
          ce,
          oe
        );
      else if (a.isBuffer(ce))
        ce.copy(re, oe);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      oe += ce.length;
    }
    return re;
  };
  function E(I, v) {
    if (a.isBuffer(I))
      return I.length;
    if (ArrayBuffer.isView(I) || ae(I, ArrayBuffer))
      return I.byteLength;
    if (typeof I != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof I
      );
    const g = I.length, W = arguments.length > 2 && arguments[2] === !0;
    if (!W && g === 0)
      return 0;
    let re = !1;
    for (; ; )
      switch (v) {
        case "ascii":
        case "latin1":
        case "binary":
          return g;
        case "utf8":
        case "utf-8":
          return x(I).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return g * 2;
        case "hex":
          return g >>> 1;
        case "base64":
          return ee(I).length;
        default:
          if (re)
            return W ? -1 : x(I).length;
          v = ("" + v).toLowerCase(), re = !0;
      }
  }
  a.byteLength = E;
  function M(I, v, g) {
    let W = !1;
    if ((v === void 0 || v < 0) && (v = 0), v > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, v >>>= 0, g <= v))
      return "";
    for (I || (I = "utf8"); ; )
      switch (I) {
        case "hex":
          return X(this, v, g);
        case "utf8":
        case "utf-8":
          return Z(this, v, g);
        case "ascii":
          return R(this, v, g);
        case "latin1":
        case "binary":
          return U(this, v, g);
        case "base64":
          return V(this, v, g);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ue(this, v, g);
        default:
          if (W)
            throw new TypeError("Unknown encoding: " + I);
          I = (I + "").toLowerCase(), W = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function S(I, v, g) {
    const W = I[v];
    I[v] = I[g], I[g] = W;
  }
  a.prototype.swap16 = function() {
    const v = this.length;
    if (v % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let g = 0; g < v; g += 2)
      S(this, g, g + 1);
    return this;
  }, a.prototype.swap32 = function() {
    const v = this.length;
    if (v % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let g = 0; g < v; g += 4)
      S(this, g, g + 3), S(this, g + 1, g + 2);
    return this;
  }, a.prototype.swap64 = function() {
    const v = this.length;
    if (v % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let g = 0; g < v; g += 8)
      S(this, g, g + 7), S(this, g + 1, g + 6), S(this, g + 2, g + 5), S(this, g + 3, g + 4);
    return this;
  }, a.prototype.toString = function() {
    const v = this.length;
    return v === 0 ? "" : arguments.length === 0 ? Z(this, 0, v) : M.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(v) {
    if (!a.isBuffer(v))
      throw new TypeError("Argument must be a Buffer");
    return this === v ? !0 : a.compare(this, v) === 0;
  }, a.prototype.inspect = function() {
    let v = "";
    const g = r.INSPECT_MAX_BYTES;
    return v = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (v += " ... "), "<Buffer " + v + ">";
  }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(v, g, W, re, oe) {
    if (ae(v, Uint8Array) && (v = a.from(v, v.offset, v.byteLength)), !a.isBuffer(v))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof v
      );
    if (g === void 0 && (g = 0), W === void 0 && (W = v ? v.length : 0), re === void 0 && (re = 0), oe === void 0 && (oe = this.length), g < 0 || W > v.length || re < 0 || oe > this.length)
      throw new RangeError("out of range index");
    if (re >= oe && g >= W)
      return 0;
    if (re >= oe)
      return -1;
    if (g >= W)
      return 1;
    if (g >>>= 0, W >>>= 0, re >>>= 0, oe >>>= 0, this === v)
      return 0;
    let ce = oe - re, be = W - g;
    const Oe = Math.min(ce, be), Te = this.slice(re, oe), Ie = v.slice(g, W);
    for (let Be = 0; Be < Oe; ++Be)
      if (Te[Be] !== Ie[Be]) {
        ce = Te[Be], be = Ie[Be];
        break;
      }
    return ce < be ? -1 : be < ce ? 1 : 0;
  };
  function C(I, v, g, W, re) {
    if (I.length === 0)
      return -1;
    if (typeof g == "string" ? (W = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, pe(g) && (g = re ? 0 : I.length - 1), g < 0 && (g = I.length + g), g >= I.length) {
      if (re)
        return -1;
      g = I.length - 1;
    } else if (g < 0)
      if (re)
        g = 0;
      else
        return -1;
    if (typeof v == "string" && (v = a.from(v, W)), a.isBuffer(v))
      return v.length === 0 ? -1 : m(I, v, g, W, re);
    if (typeof v == "number")
      return v = v & 255, typeof Uint8Array.prototype.indexOf == "function" ? re ? Uint8Array.prototype.indexOf.call(I, v, g) : Uint8Array.prototype.lastIndexOf.call(I, v, g) : m(I, [v], g, W, re);
    throw new TypeError("val must be string, number or Buffer");
  }
  function m(I, v, g, W, re) {
    let oe = 1, ce = I.length, be = v.length;
    if (W !== void 0 && (W = String(W).toLowerCase(), W === "ucs2" || W === "ucs-2" || W === "utf16le" || W === "utf-16le")) {
      if (I.length < 2 || v.length < 2)
        return -1;
      oe = 2, ce /= 2, be /= 2, g /= 2;
    }
    function Oe(Ie, Be) {
      return oe === 1 ? Ie[Be] : Ie.readUInt16BE(Be * oe);
    }
    let Te;
    if (re) {
      let Ie = -1;
      for (Te = g; Te < ce; Te++)
        if (Oe(I, Te) === Oe(v, Ie === -1 ? 0 : Te - Ie)) {
          if (Ie === -1 && (Ie = Te), Te - Ie + 1 === be)
            return Ie * oe;
        } else
          Ie !== -1 && (Te -= Te - Ie), Ie = -1;
    } else
      for (g + be > ce && (g = ce - be), Te = g; Te >= 0; Te--) {
        let Ie = !0;
        for (let Be = 0; Be < be; Be++)
          if (Oe(I, Te + Be) !== Oe(v, Be)) {
            Ie = !1;
            break;
          }
        if (Ie)
          return Te;
      }
    return -1;
  }
  a.prototype.includes = function(v, g, W) {
    return this.indexOf(v, g, W) !== -1;
  }, a.prototype.indexOf = function(v, g, W) {
    return C(this, v, g, W, !0);
  }, a.prototype.lastIndexOf = function(v, g, W) {
    return C(this, v, g, W, !1);
  };
  function D(I, v, g, W) {
    g = Number(g) || 0;
    const re = I.length - g;
    W ? (W = Number(W), W > re && (W = re)) : W = re;
    const oe = v.length;
    W > oe / 2 && (W = oe / 2);
    let ce;
    for (ce = 0; ce < W; ++ce) {
      const be = parseInt(v.substr(ce * 2, 2), 16);
      if (pe(be))
        return ce;
      I[g + ce] = be;
    }
    return ce;
  }
  function w(I, v, g, W) {
    return fe(x(v, I.length - g), I, g, W);
  }
  function F(I, v, g, W) {
    return fe(b(v), I, g, W);
  }
  function L(I, v, g, W) {
    return fe(ee(v), I, g, W);
  }
  function z(I, v, g, W) {
    return fe(H(v, I.length - g), I, g, W);
  }
  a.prototype.write = function(v, g, W, re) {
    if (g === void 0)
      re = "utf8", W = this.length, g = 0;
    else if (W === void 0 && typeof g == "string")
      re = g, W = this.length, g = 0;
    else if (isFinite(g))
      g = g >>> 0, isFinite(W) ? (W = W >>> 0, re === void 0 && (re = "utf8")) : (re = W, W = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const oe = this.length - g;
    if ((W === void 0 || W > oe) && (W = oe), v.length > 0 && (W < 0 || g < 0) || g > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    re || (re = "utf8");
    let ce = !1;
    for (; ; )
      switch (re) {
        case "hex":
          return D(this, v, g, W);
        case "utf8":
        case "utf-8":
          return w(this, v, g, W);
        case "ascii":
        case "latin1":
        case "binary":
          return F(this, v, g, W);
        case "base64":
          return L(this, v, g, W);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return z(this, v, g, W);
        default:
          if (ce)
            throw new TypeError("Unknown encoding: " + re);
          re = ("" + re).toLowerCase(), ce = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function V(I, v, g) {
    return v === 0 && g === I.length ? e.fromByteArray(I) : e.fromByteArray(I.slice(v, g));
  }
  function Z(I, v, g) {
    g = Math.min(I.length, g);
    const W = [];
    let re = v;
    for (; re < g; ) {
      const oe = I[re];
      let ce = null, be = oe > 239 ? 4 : oe > 223 ? 3 : oe > 191 ? 2 : 1;
      if (re + be <= g) {
        let Oe, Te, Ie, Be;
        switch (be) {
          case 1:
            oe < 128 && (ce = oe);
            break;
          case 2:
            Oe = I[re + 1], (Oe & 192) === 128 && (Be = (oe & 31) << 6 | Oe & 63, Be > 127 && (ce = Be));
            break;
          case 3:
            Oe = I[re + 1], Te = I[re + 2], (Oe & 192) === 128 && (Te & 192) === 128 && (Be = (oe & 15) << 12 | (Oe & 63) << 6 | Te & 63, Be > 2047 && (Be < 55296 || Be > 57343) && (ce = Be));
            break;
          case 4:
            Oe = I[re + 1], Te = I[re + 2], Ie = I[re + 3], (Oe & 192) === 128 && (Te & 192) === 128 && (Ie & 192) === 128 && (Be = (oe & 15) << 18 | (Oe & 63) << 12 | (Te & 63) << 6 | Ie & 63, Be > 65535 && Be < 1114112 && (ce = Be));
        }
      }
      ce === null ? (ce = 65533, be = 1) : ce > 65535 && (ce -= 65536, W.push(ce >>> 10 & 1023 | 55296), ce = 56320 | ce & 1023), W.push(ce), re += be;
    }
    return ie(W);
  }
  const ne = 4096;
  function ie(I) {
    const v = I.length;
    if (v <= ne)
      return String.fromCharCode.apply(String, I);
    let g = "", W = 0;
    for (; W < v; )
      g += String.fromCharCode.apply(
        String,
        I.slice(W, W += ne)
      );
    return g;
  }
  function R(I, v, g) {
    let W = "";
    g = Math.min(I.length, g);
    for (let re = v; re < g; ++re)
      W += String.fromCharCode(I[re] & 127);
    return W;
  }
  function U(I, v, g) {
    let W = "";
    g = Math.min(I.length, g);
    for (let re = v; re < g; ++re)
      W += String.fromCharCode(I[re]);
    return W;
  }
  function X(I, v, g) {
    const W = I.length;
    (!v || v < 0) && (v = 0), (!g || g < 0 || g > W) && (g = W);
    let re = "";
    for (let oe = v; oe < g; ++oe)
      re += ve[I[oe]];
    return re;
  }
  function ue(I, v, g) {
    const W = I.slice(v, g);
    let re = "";
    for (let oe = 0; oe < W.length - 1; oe += 2)
      re += String.fromCharCode(W[oe] + W[oe + 1] * 256);
    return re;
  }
  a.prototype.slice = function(v, g) {
    const W = this.length;
    v = ~~v, g = g === void 0 ? W : ~~g, v < 0 ? (v += W, v < 0 && (v = 0)) : v > W && (v = W), g < 0 ? (g += W, g < 0 && (g = 0)) : g > W && (g = W), g < v && (g = v);
    const re = this.subarray(v, g);
    return Object.setPrototypeOf(re, a.prototype), re;
  };
  function J(I, v, g) {
    if (I % 1 !== 0 || I < 0)
      throw new RangeError("offset is not uint");
    if (I + v > g)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(v, g, W) {
    v = v >>> 0, g = g >>> 0, W || J(v, g, this.length);
    let re = this[v], oe = 1, ce = 0;
    for (; ++ce < g && (oe *= 256); )
      re += this[v + ce] * oe;
    return re;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(v, g, W) {
    v = v >>> 0, g = g >>> 0, W || J(v, g, this.length);
    let re = this[v + --g], oe = 1;
    for (; g > 0 && (oe *= 256); )
      re += this[v + --g] * oe;
    return re;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(v, g) {
    return v = v >>> 0, g || J(v, 1, this.length), this[v];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(v, g) {
    return v = v >>> 0, g || J(v, 2, this.length), this[v] | this[v + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(v, g) {
    return v = v >>> 0, g || J(v, 2, this.length), this[v] << 8 | this[v + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), (this[v] | this[v + 1] << 8 | this[v + 2] << 16) + this[v + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), this[v] * 16777216 + (this[v + 1] << 16 | this[v + 2] << 8 | this[v + 3]);
  }, a.prototype.readBigUInt64LE = ye(function(v) {
    v = v >>> 0, Y(v, "offset");
    const g = this[v], W = this[v + 7];
    (g === void 0 || W === void 0) && he(v, this.length - 8);
    const re = g + this[++v] * 2 ** 8 + this[++v] * 2 ** 16 + this[++v] * 2 ** 24, oe = this[++v] + this[++v] * 2 ** 8 + this[++v] * 2 ** 16 + W * 2 ** 24;
    return BigInt(re) + (BigInt(oe) << BigInt(32));
  }), a.prototype.readBigUInt64BE = ye(function(v) {
    v = v >>> 0, Y(v, "offset");
    const g = this[v], W = this[v + 7];
    (g === void 0 || W === void 0) && he(v, this.length - 8);
    const re = g * 2 ** 24 + this[++v] * 2 ** 16 + this[++v] * 2 ** 8 + this[++v], oe = this[++v] * 2 ** 24 + this[++v] * 2 ** 16 + this[++v] * 2 ** 8 + W;
    return (BigInt(re) << BigInt(32)) + BigInt(oe);
  }), a.prototype.readIntLE = function(v, g, W) {
    v = v >>> 0, g = g >>> 0, W || J(v, g, this.length);
    let re = this[v], oe = 1, ce = 0;
    for (; ++ce < g && (oe *= 256); )
      re += this[v + ce] * oe;
    return oe *= 128, re >= oe && (re -= Math.pow(2, 8 * g)), re;
  }, a.prototype.readIntBE = function(v, g, W) {
    v = v >>> 0, g = g >>> 0, W || J(v, g, this.length);
    let re = g, oe = 1, ce = this[v + --re];
    for (; re > 0 && (oe *= 256); )
      ce += this[v + --re] * oe;
    return oe *= 128, ce >= oe && (ce -= Math.pow(2, 8 * g)), ce;
  }, a.prototype.readInt8 = function(v, g) {
    return v = v >>> 0, g || J(v, 1, this.length), this[v] & 128 ? (255 - this[v] + 1) * -1 : this[v];
  }, a.prototype.readInt16LE = function(v, g) {
    v = v >>> 0, g || J(v, 2, this.length);
    const W = this[v] | this[v + 1] << 8;
    return W & 32768 ? W | 4294901760 : W;
  }, a.prototype.readInt16BE = function(v, g) {
    v = v >>> 0, g || J(v, 2, this.length);
    const W = this[v + 1] | this[v] << 8;
    return W & 32768 ? W | 4294901760 : W;
  }, a.prototype.readInt32LE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), this[v] | this[v + 1] << 8 | this[v + 2] << 16 | this[v + 3] << 24;
  }, a.prototype.readInt32BE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), this[v] << 24 | this[v + 1] << 16 | this[v + 2] << 8 | this[v + 3];
  }, a.prototype.readBigInt64LE = ye(function(v) {
    v = v >>> 0, Y(v, "offset");
    const g = this[v], W = this[v + 7];
    (g === void 0 || W === void 0) && he(v, this.length - 8);
    const re = this[v + 4] + this[v + 5] * 2 ** 8 + this[v + 6] * 2 ** 16 + (W << 24);
    return (BigInt(re) << BigInt(32)) + BigInt(g + this[++v] * 2 ** 8 + this[++v] * 2 ** 16 + this[++v] * 2 ** 24);
  }), a.prototype.readBigInt64BE = ye(function(v) {
    v = v >>> 0, Y(v, "offset");
    const g = this[v], W = this[v + 7];
    (g === void 0 || W === void 0) && he(v, this.length - 8);
    const re = (g << 24) + // Overflow
    this[++v] * 2 ** 16 + this[++v] * 2 ** 8 + this[++v];
    return (BigInt(re) << BigInt(32)) + BigInt(this[++v] * 2 ** 24 + this[++v] * 2 ** 16 + this[++v] * 2 ** 8 + W);
  }), a.prototype.readFloatLE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), t.read(this, v, !0, 23, 4);
  }, a.prototype.readFloatBE = function(v, g) {
    return v = v >>> 0, g || J(v, 4, this.length), t.read(this, v, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(v, g) {
    return v = v >>> 0, g || J(v, 8, this.length), t.read(this, v, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(v, g) {
    return v = v >>> 0, g || J(v, 8, this.length), t.read(this, v, !1, 52, 8);
  };
  function te(I, v, g, W, re, oe) {
    if (!a.isBuffer(I))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (v > re || v < oe)
      throw new RangeError('"value" argument is out of bounds');
    if (g + W > I.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(v, g, W, re) {
    if (v = +v, g = g >>> 0, W = W >>> 0, !re) {
      const be = Math.pow(2, 8 * W) - 1;
      te(this, v, g, W, be, 0);
    }
    let oe = 1, ce = 0;
    for (this[g] = v & 255; ++ce < W && (oe *= 256); )
      this[g + ce] = v / oe & 255;
    return g + W;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(v, g, W, re) {
    if (v = +v, g = g >>> 0, W = W >>> 0, !re) {
      const be = Math.pow(2, 8 * W) - 1;
      te(this, v, g, W, be, 0);
    }
    let oe = W - 1, ce = 1;
    for (this[g + oe] = v & 255; --oe >= 0 && (ce *= 256); )
      this[g + oe] = v / ce & 255;
    return g + W;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 1, 255, 0), this[g] = v & 255, g + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 2, 65535, 0), this[g] = v & 255, this[g + 1] = v >>> 8, g + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 2, 65535, 0), this[g] = v >>> 8, this[g + 1] = v & 255, g + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 4, 4294967295, 0), this[g + 3] = v >>> 24, this[g + 2] = v >>> 16, this[g + 1] = v >>> 8, this[g] = v & 255, g + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 4, 4294967295, 0), this[g] = v >>> 24, this[g + 1] = v >>> 16, this[g + 2] = v >>> 8, this[g + 3] = v & 255, g + 4;
  };
  function j(I, v, g, W, re) {
    N(v, W, re, I, g, 7);
    let oe = Number(v & BigInt(4294967295));
    I[g++] = oe, oe = oe >> 8, I[g++] = oe, oe = oe >> 8, I[g++] = oe, oe = oe >> 8, I[g++] = oe;
    let ce = Number(v >> BigInt(32) & BigInt(4294967295));
    return I[g++] = ce, ce = ce >> 8, I[g++] = ce, ce = ce >> 8, I[g++] = ce, ce = ce >> 8, I[g++] = ce, g;
  }
  function K(I, v, g, W, re) {
    N(v, W, re, I, g, 7);
    let oe = Number(v & BigInt(4294967295));
    I[g + 7] = oe, oe = oe >> 8, I[g + 6] = oe, oe = oe >> 8, I[g + 5] = oe, oe = oe >> 8, I[g + 4] = oe;
    let ce = Number(v >> BigInt(32) & BigInt(4294967295));
    return I[g + 3] = ce, ce = ce >> 8, I[g + 2] = ce, ce = ce >> 8, I[g + 1] = ce, ce = ce >> 8, I[g] = ce, g + 8;
  }
  a.prototype.writeBigUInt64LE = ye(function(v, g = 0) {
    return j(this, v, g, BigInt(0), BigInt("0xffffffffffffffff"));
  }), a.prototype.writeBigUInt64BE = ye(function(v, g = 0) {
    return K(this, v, g, BigInt(0), BigInt("0xffffffffffffffff"));
  }), a.prototype.writeIntLE = function(v, g, W, re) {
    if (v = +v, g = g >>> 0, !re) {
      const Oe = Math.pow(2, 8 * W - 1);
      te(this, v, g, W, Oe - 1, -Oe);
    }
    let oe = 0, ce = 1, be = 0;
    for (this[g] = v & 255; ++oe < W && (ce *= 256); )
      v < 0 && be === 0 && this[g + oe - 1] !== 0 && (be = 1), this[g + oe] = (v / ce >> 0) - be & 255;
    return g + W;
  }, a.prototype.writeIntBE = function(v, g, W, re) {
    if (v = +v, g = g >>> 0, !re) {
      const Oe = Math.pow(2, 8 * W - 1);
      te(this, v, g, W, Oe - 1, -Oe);
    }
    let oe = W - 1, ce = 1, be = 0;
    for (this[g + oe] = v & 255; --oe >= 0 && (ce *= 256); )
      v < 0 && be === 0 && this[g + oe + 1] !== 0 && (be = 1), this[g + oe] = (v / ce >> 0) - be & 255;
    return g + W;
  }, a.prototype.writeInt8 = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 1, 127, -128), v < 0 && (v = 255 + v + 1), this[g] = v & 255, g + 1;
  }, a.prototype.writeInt16LE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 2, 32767, -32768), this[g] = v & 255, this[g + 1] = v >>> 8, g + 2;
  }, a.prototype.writeInt16BE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 2, 32767, -32768), this[g] = v >>> 8, this[g + 1] = v & 255, g + 2;
  }, a.prototype.writeInt32LE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 4, 2147483647, -2147483648), this[g] = v & 255, this[g + 1] = v >>> 8, this[g + 2] = v >>> 16, this[g + 3] = v >>> 24, g + 4;
  }, a.prototype.writeInt32BE = function(v, g, W) {
    return v = +v, g = g >>> 0, W || te(this, v, g, 4, 2147483647, -2147483648), v < 0 && (v = 4294967295 + v + 1), this[g] = v >>> 24, this[g + 1] = v >>> 16, this[g + 2] = v >>> 8, this[g + 3] = v & 255, g + 4;
  }, a.prototype.writeBigInt64LE = ye(function(v, g = 0) {
    return j(this, v, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), a.prototype.writeBigInt64BE = ye(function(v, g = 0) {
    return K(this, v, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function se(I, v, g, W, re, oe) {
    if (g + W > I.length)
      throw new RangeError("Index out of range");
    if (g < 0)
      throw new RangeError("Index out of range");
  }
  function q(I, v, g, W, re) {
    return v = +v, g = g >>> 0, re || se(I, v, g, 4), t.write(I, v, g, W, 23, 4), g + 4;
  }
  a.prototype.writeFloatLE = function(v, g, W) {
    return q(this, v, g, !0, W);
  }, a.prototype.writeFloatBE = function(v, g, W) {
    return q(this, v, g, !1, W);
  };
  function l(I, v, g, W, re) {
    return v = +v, g = g >>> 0, re || se(I, v, g, 8), t.write(I, v, g, W, 52, 8), g + 8;
  }
  a.prototype.writeDoubleLE = function(v, g, W) {
    return l(this, v, g, !0, W);
  }, a.prototype.writeDoubleBE = function(v, g, W) {
    return l(this, v, g, !1, W);
  }, a.prototype.copy = function(v, g, W, re) {
    if (!a.isBuffer(v))
      throw new TypeError("argument should be a Buffer");
    if (W || (W = 0), !re && re !== 0 && (re = this.length), g >= v.length && (g = v.length), g || (g = 0), re > 0 && re < W && (re = W), re === W || v.length === 0 || this.length === 0)
      return 0;
    if (g < 0)
      throw new RangeError("targetStart out of bounds");
    if (W < 0 || W >= this.length)
      throw new RangeError("Index out of range");
    if (re < 0)
      throw new RangeError("sourceEnd out of bounds");
    re > this.length && (re = this.length), v.length - g < re - W && (re = v.length - g + W);
    const oe = re - W;
    return this === v && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(g, W, re) : Uint8Array.prototype.set.call(
      v,
      this.subarray(W, re),
      g
    ), oe;
  }, a.prototype.fill = function(v, g, W, re) {
    if (typeof v == "string") {
      if (typeof g == "string" ? (re = g, g = 0, W = this.length) : typeof W == "string" && (re = W, W = this.length), re !== void 0 && typeof re != "string")
        throw new TypeError("encoding must be a string");
      if (typeof re == "string" && !a.isEncoding(re))
        throw new TypeError("Unknown encoding: " + re);
      if (v.length === 1) {
        const ce = v.charCodeAt(0);
        (re === "utf8" && ce < 128 || re === "latin1") && (v = ce);
      }
    } else
      typeof v == "number" ? v = v & 255 : typeof v == "boolean" && (v = Number(v));
    if (g < 0 || this.length < g || this.length < W)
      throw new RangeError("Out of range index");
    if (W <= g)
      return this;
    g = g >>> 0, W = W === void 0 ? this.length : W >>> 0, v || (v = 0);
    let oe;
    if (typeof v == "number")
      for (oe = g; oe < W; ++oe)
        this[oe] = v;
    else {
      const ce = a.isBuffer(v) ? v : a.from(v, re), be = ce.length;
      if (be === 0)
        throw new TypeError('The value "' + v + '" is invalid for argument "value"');
      for (oe = 0; oe < W - g; ++oe)
        this[oe + g] = ce[oe % be];
    }
    return this;
  };
  const p = {};
  function $(I, v, g) {
    p[I] = class extends g {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: v.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${I}]`, this.stack, delete this.name;
      }
      get code() {
        return I;
      }
      set code(re) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: re,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${I}]: ${this.message}`;
      }
    };
  }
  $(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(I) {
      return I ? `${I} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), $(
    "ERR_INVALID_ARG_TYPE",
    function(I, v) {
      return `The "${I}" argument must be of type number. Received type ${typeof v}`;
    },
    TypeError
  ), $(
    "ERR_OUT_OF_RANGE",
    function(I, v, g) {
      let W = `The value of "${I}" is out of range.`, re = g;
      return Number.isInteger(g) && Math.abs(g) > 2 ** 32 ? re = G(String(g)) : typeof g == "bigint" && (re = String(g), (g > BigInt(2) ** BigInt(32) || g < -(BigInt(2) ** BigInt(32))) && (re = G(re)), re += "n"), W += ` It must be ${v}. Received ${re}`, W;
    },
    RangeError
  );
  function G(I) {
    let v = "", g = I.length;
    const W = I[0] === "-" ? 1 : 0;
    for (; g >= W + 4; g -= 3)
      v = `_${I.slice(g - 3, g)}${v}`;
    return `${I.slice(0, g)}${v}`;
  }
  function P(I, v, g) {
    Y(v, "offset"), (I[v] === void 0 || I[v + g] === void 0) && he(v, I.length - (g + 1));
  }
  function N(I, v, g, W, re, oe) {
    if (I > g || I < v) {
      const ce = typeof v == "bigint" ? "n" : "";
      let be;
      throw oe > 3 ? v === 0 || v === BigInt(0) ? be = `>= 0${ce} and < 2${ce} ** ${(oe + 1) * 8}${ce}` : be = `>= -(2${ce} ** ${(oe + 1) * 8 - 1}${ce}) and < 2 ** ${(oe + 1) * 8 - 1}${ce}` : be = `>= ${v}${ce} and <= ${g}${ce}`, new p.ERR_OUT_OF_RANGE("value", be, I);
    }
    P(W, re, oe);
  }
  function Y(I, v) {
    if (typeof I != "number")
      throw new p.ERR_INVALID_ARG_TYPE(v, "number", I);
  }
  function he(I, v, g) {
    throw Math.floor(I) !== I ? (Y(I, g), new p.ERR_OUT_OF_RANGE(g || "offset", "an integer", I)) : v < 0 ? new p.ERR_BUFFER_OUT_OF_BOUNDS() : new p.ERR_OUT_OF_RANGE(
      g || "offset",
      `>= ${g ? 1 : 0} and <= ${v}`,
      I
    );
  }
  const _e = /[^+/0-9A-Za-z-_]/g;
  function k(I) {
    if (I = I.split("=")[0], I = I.trim().replace(_e, ""), I.length < 2)
      return "";
    for (; I.length % 4 !== 0; )
      I = I + "=";
    return I;
  }
  function x(I, v) {
    v = v || 1 / 0;
    let g;
    const W = I.length;
    let re = null;
    const oe = [];
    for (let ce = 0; ce < W; ++ce) {
      if (g = I.charCodeAt(ce), g > 55295 && g < 57344) {
        if (!re) {
          if (g > 56319) {
            (v -= 3) > -1 && oe.push(239, 191, 189);
            continue;
          } else if (ce + 1 === W) {
            (v -= 3) > -1 && oe.push(239, 191, 189);
            continue;
          }
          re = g;
          continue;
        }
        if (g < 56320) {
          (v -= 3) > -1 && oe.push(239, 191, 189), re = g;
          continue;
        }
        g = (re - 55296 << 10 | g - 56320) + 65536;
      } else
        re && (v -= 3) > -1 && oe.push(239, 191, 189);
      if (re = null, g < 128) {
        if ((v -= 1) < 0)
          break;
        oe.push(g);
      } else if (g < 2048) {
        if ((v -= 2) < 0)
          break;
        oe.push(
          g >> 6 | 192,
          g & 63 | 128
        );
      } else if (g < 65536) {
        if ((v -= 3) < 0)
          break;
        oe.push(
          g >> 12 | 224,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else if (g < 1114112) {
        if ((v -= 4) < 0)
          break;
        oe.push(
          g >> 18 | 240,
          g >> 12 & 63 | 128,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return oe;
  }
  function b(I) {
    const v = [];
    for (let g = 0; g < I.length; ++g)
      v.push(I.charCodeAt(g) & 255);
    return v;
  }
  function H(I, v) {
    let g, W, re;
    const oe = [];
    for (let ce = 0; ce < I.length && !((v -= 2) < 0); ++ce)
      g = I.charCodeAt(ce), W = g >> 8, re = g % 256, oe.push(re), oe.push(W);
    return oe;
  }
  function ee(I) {
    return e.toByteArray(k(I));
  }
  function fe(I, v, g, W) {
    let re;
    for (re = 0; re < W && !(re + g >= v.length || re >= I.length); ++re)
      v[re + g] = I[re];
    return re;
  }
  function ae(I, v) {
    return I instanceof v || I != null && I.constructor != null && I.constructor.name != null && I.constructor.name === v.name;
  }
  function pe(I) {
    return I !== I;
  }
  const ve = function() {
    const I = "0123456789abcdef", v = new Array(256);
    for (let g = 0; g < 16; ++g) {
      const W = g * 16;
      for (let re = 0; re < 16; ++re)
        v[W + re] = I[g] + I[re];
    }
    return v;
  }();
  function ye(I) {
    return typeof BigInt > "u" ? Ae : I;
  }
  function Ae() {
    throw new Error("BigInt not supported");
  }
})(et);
var Iu = { exports: {} }, ke = Iu.exports = {}, pt, _t;
function yo() {
  throw new Error("setTimeout has not been defined");
}
function xo() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? pt = setTimeout : pt = yo;
  } catch {
    pt = yo;
  }
  try {
    typeof clearTimeout == "function" ? _t = clearTimeout : _t = xo;
  } catch {
    _t = xo;
  }
})();
function Nu(r) {
  if (pt === setTimeout)
    return setTimeout(r, 0);
  if ((pt === yo || !pt) && setTimeout)
    return pt = setTimeout, setTimeout(r, 0);
  try {
    return pt(r, 0);
  } catch {
    try {
      return pt.call(null, r, 0);
    } catch {
      return pt.call(this, r, 0);
    }
  }
}
function Sl(r) {
  if (_t === clearTimeout)
    return clearTimeout(r);
  if ((_t === xo || !_t) && clearTimeout)
    return _t = clearTimeout, clearTimeout(r);
  try {
    return _t(r);
  } catch {
    try {
      return _t.call(null, r);
    } catch {
      return _t.call(this, r);
    }
  }
}
var Ct = [], vr = !1, Yt, on = -1;
function Al() {
  !vr || !Yt || (vr = !1, Yt.length ? Ct = Yt.concat(Ct) : on = -1, Ct.length && Ru());
}
function Ru() {
  if (!vr) {
    var r = Nu(Al);
    vr = !0;
    for (var e = Ct.length; e; ) {
      for (Yt = Ct, Ct = []; ++on < e; )
        Yt && Yt[on].run();
      on = -1, e = Ct.length;
    }
    Yt = null, vr = !1, Sl(r);
  }
}
ke.nextTick = function(r) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  Ct.push(new Pu(r, e)), Ct.length === 1 && !vr && Nu(Ru);
};
function Pu(r, e) {
  this.fun = r, this.array = e;
}
Pu.prototype.run = function() {
  this.fun.apply(null, this.array);
};
ke.title = "browser";
ke.browser = !0;
ke.env = {};
ke.argv = [];
ke.version = "";
ke.versions = {};
function Mt() {
}
ke.on = Mt;
ke.addListener = Mt;
ke.once = Mt;
ke.off = Mt;
ke.removeListener = Mt;
ke.removeAllListeners = Mt;
ke.emit = Mt;
ke.prependListener = Mt;
ke.prependOnceListener = Mt;
ke.listeners = function(r) {
  return [];
};
ke.binding = function(r) {
  throw new Error("process.binding is not supported");
};
ke.cwd = function() {
  return "/";
};
ke.chdir = function(r) {
  throw new Error("process.chdir is not supported");
};
ke.umask = function() {
  return 0;
};
var Bl = Iu.exports, ku = Q && Q.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
}, Cl = ku(et), Tl = ku(Bl);
window && (window.Buffer = Cl.default.Buffer, window.process = Tl.default, window.global = window);
var ju = {};
const Dl = {}, Fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dl
}, Symbol.toStringTag, { value: "Module" })), Ne = /* @__PURE__ */ Vo(Fl);
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.newLiftedPromise = er.makeSelfCleaningPromise = void 0;
function Ol(r, e) {
  return e ? r.finally(function() {
    e();
  }) : r;
}
er.makeSelfCleaningPromise = Ol;
function Ml(r) {
  var e = void 0, t = void 0, n = new Promise(function(i, o) {
    e = i, t = o;
  });
  if (!e || !t)
    throw new Error("Failed to bind resolve and reject when making lifted promise");
  return r && r(e, t), {
    promise: n,
    resolve: e,
    reject: t
  };
}
er.newLiftedPromise = Ml;
(function(r) {
  var e = Q && Q.__createBinding || (Object.create ? function(f, u, c, h) {
    h === void 0 && (h = c);
    var y = Object.getOwnPropertyDescriptor(u, c);
    (!y || ("get" in y ? !u.__esModule : y.writable || y.configurable)) && (y = { enumerable: !0, get: function() {
      return u[c];
    } }), Object.defineProperty(f, h, y);
  } : function(f, u, c, h) {
    h === void 0 && (h = c), f[h] = u[c];
  }), t = Q && Q.__setModuleDefault || (Object.create ? function(f, u) {
    Object.defineProperty(f, "default", { enumerable: !0, value: u });
  } : function(f, u) {
    f.default = u;
  }), n = Q && Q.__importStar || function(f) {
    if (f && f.__esModule)
      return f;
    var u = {};
    if (f != null)
      for (var c in f)
        c !== "default" && Object.prototype.hasOwnProperty.call(f, c) && e(u, f, c);
    return t(u, f), u;
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), r.newCancellablePromiseFromNextEvent = r.CancelController = r.EVENT_NAME = void 0;
  var i = Ne, o = n(er);
  r.EVENT_NAME = "cancelled";
  var s = (
    /** @class */
    function() {
      function f(u) {
        this.cancelled = !1, u && u.emitterFactory ? this.emitter = u.emitterFactory() : this.emitter = new i.EventEmitter();
      }
      return f.prototype.cancel = function() {
        this.cancelled || (this.cancelled = !0, this.emitter.emit(r.EVENT_NAME), this.emitter.removeAllListeners(r.EVENT_NAME));
      }, f.prototype.hasBeenCancelled = function() {
        return this.cancelled;
      }, f.prototype.addListener = function(u) {
        var c = this;
        if (this.cancelled) {
          u();
          return;
        }
        return this.emitter.on(r.EVENT_NAME, u), function() {
          c.emitter.removeListener(r.EVENT_NAME, u);
        };
      }, f;
    }()
  );
  r.CancelController = s;
  function a(f) {
    var u = void 0, c = void 0, h = o.newLiftedPromise();
    return u = function(y) {
      try {
        f.eventDataTransformer ? h.resolve(f.eventDataTransformer(y)) : h.resolve(y);
      } catch (T) {
        h.reject(T);
      }
    }, f.emitter.addListener(f.eventName, u), f.cancelController && (c = f.cancelController.addListener(function() {
      h.reject(f.cancelMessage);
    })), o.makeSelfCleaningPromise(h.promise, function() {
      u && f.emitter.removeListener(f.eventName, u), c && c();
    });
  }
  r.newCancellablePromiseFromNextEvent = a;
})(ju);
var nt = {};
const Il = "aws-crt", Nl = "1.21.1", Rl = "NodeJS/browser bindings to the aws-c-* libraries", Pl = "https://github.com/awslabs/aws-crt-nodejs", kl = {
  type: "git",
  url: "git+https://github.com/awslabs/aws-crt-nodejs.git"
}, jl = [
  "AWS Common Runtime Team <aws-sdk-common-runtime@amazon.com>"
], Ul = "Apache-2.0", Ll = "./dist/index.js", ql = "./dist.browser/browser.js", Hl = "./dist/index.d.ts", $l = {
  tsc: "node ./scripts/tsc.js",
  test: "npm run test:native",
  "test:node": "npm run test:native",
  "test:native": "npx jest --runInBand --verbose --config test/native/jest.config.js --forceExit",
  "test:browser": "npx jest --runInBand --verbose --config test/browser/jest.config.js --forceExit",
  "test:browser:ci": "npm run install:puppeteer && npm run test:browser",
  "install:puppeteer": "npm install --save-dev jest-puppeteer puppeteer @types/puppeteer",
  prepare: "node ./scripts/tsc.js && node ./scripts/install.js",
  install: "node ./scripts/install.js"
}, Wl = {
  "@types/crypto-js": "^3.1.43",
  "@types/jest": "^27.0.1",
  "@types/node": "^10.17.54",
  "@types/prettier": "2.6.0",
  "@types/puppeteer": "^5.4.7",
  "@types/uuid": "^3.4.13",
  "@types/ws": "^7.4.7",
  "aws-sdk": "^2.1537.0",
  "cmake-js": "^7.3.0",
  "https-proxy-agent": "^5.0.1",
  jest: "^27.2.1",
  "jest-puppeteer": "^5.0.4",
  "jest-runtime": "^27.2.1",
  puppeteer: "^3.3.0",
  tar: "^6.2.0",
  "ts-jest": "^27.0.5",
  typedoc: "^0.24.8",
  "typedoc-plugin-merge-modules": "^5.1.0",
  typescript: "^4.9.5",
  uuid: "^8.3.2",
  yargs: "^17.2.1"
}, zl = {
  "@aws-sdk/util-utf8-browser": "^3.109.0",
  "@httptoolkit/websocket-stream": "^6.0.1",
  axios: "^1.6.0",
  buffer: "^6.0.3",
  "crypto-js": "^4.2.0",
  mqtt: "^4.3.8",
  process: "^0.11.10"
}, Kl = {
  name: Il,
  version: Nl,
  description: Rl,
  homepage: Pl,
  repository: kl,
  contributors: jl,
  license: Ul,
  main: Ll,
  browser: ql,
  types: Hl,
  scripts: $l,
  devDependencies: Wl,
  dependencies: zl
};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.crt_version = nt.package_info = nt.is_browser = nt.is_nodejs = void 0;
function Uu() {
  return typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node < "u";
}
nt.is_nodejs = Uu;
function Vl() {
  return !Uu();
}
nt.is_browser = Vl;
function Lu() {
  try {
    var r = Kl;
    return r;
  } catch {
    return {
      name: "aws-crt-nodejs",
      version: "UNKNOWN"
    };
  }
}
nt.package_info = Lu;
function Gl() {
  var r = Lu();
  return r.version;
}
nt.crt_version = Gl;
var mn = {}, Ql = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
}, Jl = Q && Q.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, s;
  return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (t = 0)), t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, { value: u[1], done: !1 };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.using = void 0;
function Xl(r, e) {
  return Ql(this, void 0, void 0, function() {
    return Jl(this, function(t) {
      switch (t.label) {
        case 0:
          return t.trys.push([0, , 2, 3]), [4, e(r)];
        case 1:
          return t.sent(), [3, 3];
        case 2:
          return r.close(), [
            7
            /*endfinally*/
          ];
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
mn.using = Xl;
var En = {}, go = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.SocketDomain = r.SocketType = r.TlsVersion = void 0, function(e) {
    e[e.SSLv3 = 0] = "SSLv3", e[e.TLSv1 = 1] = "TLSv1", e[e.TLSv1_1 = 2] = "TLSv1_1", e[e.TLSv1_2 = 3] = "TLSv1_2", e[e.TLSv1_3 = 4] = "TLSv1_3", e[e.Default = 128] = "Default";
  }(r.TlsVersion || (r.TlsVersion = {})), function(e) {
    e[e.STREAM = 0] = "STREAM", e[e.DGRAM = 1] = "DGRAM";
  }(r.SocketType || (r.SocketType = {})), function(e) {
    e[e.IPV4 = 0] = "IPV4", e[e.IPV6 = 1] = "IPV6", e[e.LOCAL = 2] = "LOCAL";
  }(r.SocketDomain || (r.SocketDomain = {}));
})(go);
(function(r) {
  var e = Q && Q.__extends || /* @__PURE__ */ function() {
    var h = function(y, T) {
      return h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, B) {
        A.__proto__ = B;
      } || function(A, B) {
        for (var O in B)
          Object.prototype.hasOwnProperty.call(B, O) && (A[O] = B[O]);
      }, h(y, T);
    };
    return function(y, T) {
      if (typeof T != "function" && T !== null)
        throw new TypeError("Class extends value " + String(T) + " is not a constructor or null");
      h(y, T);
      function A() {
        this.constructor = y;
      }
      y.prototype = T === null ? Object.create(T) : (A.prototype = T.prototype, new A());
    };
  }();
  Object.defineProperty(r, "__esModule", { value: !0 }), r.SocketOptions = r.ClientTlsContext = r.TlsContext = r.TlsConnectionOptions = r.ClientBootstrap = r.InputStream = r.is_alpn_available = r.SocketDomain = r.SocketType = r.TlsVersion = void 0;
  var t = go;
  Object.defineProperty(r, "TlsVersion", { enumerable: !0, get: function() {
    return t.TlsVersion;
  } }), Object.defineProperty(r, "SocketType", { enumerable: !0, get: function() {
    return t.SocketType;
  } }), Object.defineProperty(r, "SocketDomain", { enumerable: !0, get: function() {
    return t.SocketDomain;
  } });
  var n = go;
  function i() {
    return !1;
  }
  r.is_alpn_available = i;
  var o = (
    /** @class */
    /* @__PURE__ */ function() {
      function h(y) {
        this.data = y;
      }
      return h;
    }()
  );
  r.InputStream = o;
  var s = (
    /** @class */
    /* @__PURE__ */ function() {
      function h() {
      }
      return h;
    }()
  );
  r.ClientBootstrap = s;
  var a = (
    /** @class */
    /* @__PURE__ */ function() {
      function h(y, T, A) {
        A === void 0 && (A = []), this.tls_ctx = y, this.server_name = T, this.alpn_list = A;
      }
      return h;
    }()
  );
  r.TlsConnectionOptions = a;
  var f = (
    /** @class */
    /* @__PURE__ */ function() {
      function h() {
      }
      return h;
    }()
  );
  r.TlsContext = f;
  var u = (
    /** @class */
    function(h) {
      e(y, h);
      function y(T) {
        return h.call(this) || this;
      }
      return y;
    }(f)
  );
  r.ClientTlsContext = u;
  var c = (
    /** @class */
    /* @__PURE__ */ function() {
      function h(y, T, A, B, O, d, _) {
        y === void 0 && (y = n.SocketType.STREAM), T === void 0 && (T = n.SocketDomain.IPV6), A === void 0 && (A = 5e3), B === void 0 && (B = !1), O === void 0 && (O = 0), d === void 0 && (d = 0), _ === void 0 && (_ = 0), this.type = y, this.domain = T, this.connect_timeout_ms = A, this.keepalive = B, this.keep_alive_interval_sec = O, this.keep_alive_timeout_sec = d, this.keep_alive_max_failed_probes = _;
      }
      return h;
    }()
  );
  r.SocketOptions = c;
})(En);
var Yn = {}, zr = { exports: {} }, Go = Zl, Yl = Object.prototype.hasOwnProperty;
function Zl() {
  for (var r = {}, e = 0; e < arguments.length; e++) {
    var t = arguments[e];
    for (var n in t)
      Yl.call(t, n) && (r[n] = t[n]);
  }
  return r;
}
var bo = { exports: {} }, qu = Ne.EventEmitter, Zn, ws;
function e0() {
  if (ws)
    return Zn;
  ws = 1;
  function r(A, B) {
    var O = Object.keys(A);
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(A);
      B && (d = d.filter(function(_) {
        return Object.getOwnPropertyDescriptor(A, _).enumerable;
      })), O.push.apply(O, d);
    }
    return O;
  }
  function e(A) {
    for (var B = 1; B < arguments.length; B++) {
      var O = arguments[B] != null ? arguments[B] : {};
      B % 2 ? r(Object(O), !0).forEach(function(d) {
        t(A, d, O[d]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(O)) : r(Object(O)).forEach(function(d) {
        Object.defineProperty(A, d, Object.getOwnPropertyDescriptor(O, d));
      });
    }
    return A;
  }
  function t(A, B, O) {
    return B = s(B), B in A ? Object.defineProperty(A, B, { value: O, enumerable: !0, configurable: !0, writable: !0 }) : A[B] = O, A;
  }
  function n(A, B) {
    if (!(A instanceof B))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(A, B) {
    for (var O = 0; O < B.length; O++) {
      var d = B[O];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(A, s(d.key), d);
    }
  }
  function o(A, B, O) {
    return B && i(A.prototype, B), O && i(A, O), Object.defineProperty(A, "prototype", { writable: !1 }), A;
  }
  function s(A) {
    var B = a(A, "string");
    return typeof B == "symbol" ? B : String(B);
  }
  function a(A, B) {
    if (typeof A != "object" || A === null)
      return A;
    var O = A[Symbol.toPrimitive];
    if (O !== void 0) {
      var d = O.call(A, B || "default");
      if (typeof d != "object")
        return d;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (B === "string" ? String : Number)(A);
  }
  var f = et, u = f.Buffer, c = Ne, h = c.inspect, y = h && h.custom || "inspect";
  function T(A, B, O) {
    u.prototype.copy.call(A, B, O);
  }
  return Zn = /* @__PURE__ */ function() {
    function A() {
      n(this, A), this.head = null, this.tail = null, this.length = 0;
    }
    return o(A, [{
      key: "push",
      value: function(O) {
        var d = {
          data: O,
          next: null
        };
        this.length > 0 ? this.tail.next = d : this.head = d, this.tail = d, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(O) {
        var d = {
          data: O,
          next: this.head
        };
        this.length === 0 && (this.tail = d), this.head = d, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var O = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, O;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(O) {
        if (this.length === 0)
          return "";
        for (var d = this.head, _ = "" + d.data; d = d.next; )
          _ += O + d.data;
        return _;
      }
    }, {
      key: "concat",
      value: function(O) {
        if (this.length === 0)
          return u.alloc(0);
        for (var d = u.allocUnsafe(O >>> 0), _ = this.head, E = 0; _; )
          T(_.data, d, E), E += _.data.length, _ = _.next;
        return d;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(O, d) {
        var _;
        return O < this.head.data.length ? (_ = this.head.data.slice(0, O), this.head.data = this.head.data.slice(O)) : O === this.head.data.length ? _ = this.shift() : _ = d ? this._getString(O) : this._getBuffer(O), _;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(O) {
        var d = this.head, _ = 1, E = d.data;
        for (O -= E.length; d = d.next; ) {
          var M = d.data, S = O > M.length ? M.length : O;
          if (S === M.length ? E += M : E += M.slice(0, O), O -= S, O === 0) {
            S === M.length ? (++_, d.next ? this.head = d.next : this.head = this.tail = null) : (this.head = d, d.data = M.slice(S));
            break;
          }
          ++_;
        }
        return this.length -= _, E;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(O) {
        var d = u.allocUnsafe(O), _ = this.head, E = 1;
        for (_.data.copy(d), O -= _.data.length; _ = _.next; ) {
          var M = _.data, S = O > M.length ? M.length : O;
          if (M.copy(d, d.length - O, 0, S), O -= S, O === 0) {
            S === M.length ? (++E, _.next ? this.head = _.next : this.head = this.tail = null) : (this.head = _, _.data = M.slice(S));
            break;
          }
          ++E;
        }
        return this.length -= E, d;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: y,
      value: function(O, d) {
        return h(this, e(e({}, d), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), A;
  }(), Zn;
}
function t0(r, e) {
  var t = this, n = this._readableState && this._readableState.destroyed, i = this._writableState && this._writableState.destroyed;
  return n || i ? (e ? e(r) : r && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process.nextTick(wo, this, r)) : process.nextTick(wo, this, r)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(r || null, function(o) {
    !e && o ? t._writableState ? t._writableState.errorEmitted ? process.nextTick(sn, t) : (t._writableState.errorEmitted = !0, process.nextTick(ms, t, o)) : process.nextTick(ms, t, o) : e ? (process.nextTick(sn, t), e(o)) : process.nextTick(sn, t);
  }), this);
}
function ms(r, e) {
  wo(r, e), sn(r);
}
function sn(r) {
  r._writableState && !r._writableState.emitClose || r._readableState && !r._readableState.emitClose || r.emit("close");
}
function r0() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function wo(r, e) {
  r.emit("error", e);
}
function n0(r, e) {
  var t = r._readableState, n = r._writableState;
  t && t.autoDestroy || n && n.autoDestroy ? r.destroy(e) : r.emit("error", e);
}
var Hu = {
  destroy: t0,
  undestroy: r0,
  errorOrDestroy: n0
}, ir = {};
function i0(r, e) {
  r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r.__proto__ = e;
}
var $u = {};
function st(r, e, t) {
  t || (t = Error);
  function n(o, s, a) {
    return typeof e == "string" ? e : e(o, s, a);
  }
  var i = /* @__PURE__ */ function(o) {
    i0(s, o);
    function s(a, f, u) {
      return o.call(this, n(a, f, u)) || this;
    }
    return s;
  }(t);
  i.prototype.name = t.name, i.prototype.code = r, $u[r] = i;
}
function Es(r, e) {
  if (Array.isArray(r)) {
    var t = r.length;
    return r = r.map(function(n) {
      return String(n);
    }), t > 2 ? "one of ".concat(e, " ").concat(r.slice(0, t - 1).join(", "), ", or ") + r[t - 1] : t === 2 ? "one of ".concat(e, " ").concat(r[0], " or ").concat(r[1]) : "of ".concat(e, " ").concat(r[0]);
  } else
    return "of ".concat(e, " ").concat(String(r));
}
function o0(r, e, t) {
  return r.substr(!t || t < 0 ? 0 : +t, e.length) === e;
}
function s0(r, e, t) {
  return (t === void 0 || t > r.length) && (t = r.length), r.substring(t - e.length, t) === e;
}
function a0(r, e, t) {
  return typeof t != "number" && (t = 0), t + e.length > r.length ? !1 : r.indexOf(e, t) !== -1;
}
st("ERR_INVALID_OPT_VALUE", function(r, e) {
  return 'The value "' + e + '" is invalid for option "' + r + '"';
}, TypeError);
st("ERR_INVALID_ARG_TYPE", function(r, e, t) {
  var n;
  typeof e == "string" && o0(e, "not ") ? (n = "must not be", e = e.replace(/^not /, "")) : n = "must be";
  var i;
  if (s0(r, " argument"))
    i = "The ".concat(r, " ").concat(n, " ").concat(Es(e, "type"));
  else {
    var o = a0(r, ".") ? "property" : "argument";
    i = 'The "'.concat(r, '" ').concat(o, " ").concat(n, " ").concat(Es(e, "type"));
  }
  return i += ". Received type ".concat(typeof t), i;
}, TypeError);
st("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
st("ERR_METHOD_NOT_IMPLEMENTED", function(r) {
  return "The " + r + " method is not implemented";
});
st("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
st("ERR_STREAM_DESTROYED", function(r) {
  return "Cannot call " + r + " after a stream was destroyed";
});
st("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
st("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
st("ERR_STREAM_WRITE_AFTER_END", "write after end");
st("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
st("ERR_UNKNOWN_ENCODING", function(r) {
  return "Unknown encoding: " + r;
}, TypeError);
st("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
ir.codes = $u;
var u0 = ir.codes.ERR_INVALID_OPT_VALUE;
function f0(r, e, t) {
  return r.highWaterMark != null ? r.highWaterMark : e ? r[t] : null;
}
function c0(r, e, t, n) {
  var i = f0(e, n, t);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var o = n ? t : "highWaterMark";
      throw new u0(o, i);
    }
    return Math.floor(i);
  }
  return r.objectMode ? 16 : 16 * 1024;
}
var Wu = {
  getHighWaterMark: c0
}, mo = { exports: {} };
typeof Object.create == "function" ? mo.exports = function(e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : mo.exports = function(e, t) {
  if (t) {
    e.super_ = t;
    var n = function() {
    };
    n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
  }
};
var Ue = mo.exports, Qo = l0;
function l0(r, e) {
  if (ei("noDeprecation"))
    return r;
  var t = !1;
  function n() {
    if (!t) {
      if (ei("throwDeprecation"))
        throw new Error(e);
      ei("traceDeprecation") ? console.trace(e) : console.warn(e), t = !0;
    }
    return r.apply(this, arguments);
  }
  return n;
}
function ei(r) {
  try {
    if (!Q.localStorage)
      return !1;
  } catch {
    return !1;
  }
  var e = Q.localStorage[r];
  return e == null ? !1 : String(e).toLowerCase() === "true";
}
var ti, Ss;
function zu() {
  if (Ss)
    return ti;
  Ss = 1, ti = D;
  function r(q) {
    var l = this;
    this.next = null, this.entry = null, this.finish = function() {
      se(l, q);
    };
  }
  var e;
  D.WritableState = C;
  var t = {
    deprecate: Qo
  }, n = qu, i = et.Buffer, o = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(q) {
    return i.from(q);
  }
  function a(q) {
    return i.isBuffer(q) || q instanceof o;
  }
  var f = Hu, u = Wu, c = u.getHighWaterMark, h = ir.codes, y = h.ERR_INVALID_ARG_TYPE, T = h.ERR_METHOD_NOT_IMPLEMENTED, A = h.ERR_MULTIPLE_CALLBACK, B = h.ERR_STREAM_CANNOT_PIPE, O = h.ERR_STREAM_DESTROYED, d = h.ERR_STREAM_NULL_VALUES, _ = h.ERR_STREAM_WRITE_AFTER_END, E = h.ERR_UNKNOWN_ENCODING, M = f.errorOrDestroy;
  Ue(D, n);
  function S() {
  }
  function C(q, l, p) {
    e = e || br(), q = q || {}, typeof p != "boolean" && (p = l instanceof e), this.objectMode = !!q.objectMode, p && (this.objectMode = this.objectMode || !!q.writableObjectMode), this.highWaterMark = c(this, q, "writableHighWaterMark", p), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var $ = q.decodeStrings === !1;
    this.decodeStrings = !$, this.defaultEncoding = q.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(G) {
      ie(l, G);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = q.emitClose !== !1, this.autoDestroy = !!q.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  C.prototype.getBuffer = function() {
    for (var l = this.bufferedRequest, p = []; l; )
      p.push(l), l = l.next;
    return p;
  }, function() {
    try {
      Object.defineProperty(C.prototype, "buffer", {
        get: t.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var m;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (m = Function.prototype[Symbol.hasInstance], Object.defineProperty(D, Symbol.hasInstance, {
    value: function(l) {
      return m.call(this, l) ? !0 : this !== D ? !1 : l && l._writableState instanceof C;
    }
  })) : m = function(l) {
    return l instanceof this;
  };
  function D(q) {
    e = e || br();
    var l = this instanceof e;
    if (!l && !m.call(D, this))
      return new D(q);
    this._writableState = new C(q, this, l), this.writable = !0, q && (typeof q.write == "function" && (this._write = q.write), typeof q.writev == "function" && (this._writev = q.writev), typeof q.destroy == "function" && (this._destroy = q.destroy), typeof q.final == "function" && (this._final = q.final)), n.call(this);
  }
  D.prototype.pipe = function() {
    M(this, new B());
  };
  function w(q, l) {
    var p = new _();
    M(q, p), process.nextTick(l, p);
  }
  function F(q, l, p, $) {
    var G;
    return p === null ? G = new d() : typeof p != "string" && !l.objectMode && (G = new y("chunk", ["string", "Buffer"], p)), G ? (M(q, G), process.nextTick($, G), !1) : !0;
  }
  D.prototype.write = function(q, l, p) {
    var $ = this._writableState, G = !1, P = !$.objectMode && a(q);
    return P && !i.isBuffer(q) && (q = s(q)), typeof l == "function" && (p = l, l = null), P ? l = "buffer" : l || (l = $.defaultEncoding), typeof p != "function" && (p = S), $.ending ? w(this, p) : (P || F(this, $, q, p)) && ($.pendingcb++, G = z(this, $, P, q, l, p)), G;
  }, D.prototype.cork = function() {
    this._writableState.corked++;
  }, D.prototype.uncork = function() {
    var q = this._writableState;
    q.corked && (q.corked--, !q.writing && !q.corked && !q.bufferProcessing && q.bufferedRequest && X(this, q));
  }, D.prototype.setDefaultEncoding = function(l) {
    if (typeof l == "string" && (l = l.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((l + "").toLowerCase()) > -1))
      throw new E(l);
    return this._writableState.defaultEncoding = l, this;
  }, Object.defineProperty(D.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function L(q, l, p) {
    return !q.objectMode && q.decodeStrings !== !1 && typeof l == "string" && (l = i.from(l, p)), l;
  }
  Object.defineProperty(D.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function z(q, l, p, $, G, P) {
    if (!p) {
      var N = L(l, $, G);
      $ !== N && (p = !0, G = "buffer", $ = N);
    }
    var Y = l.objectMode ? 1 : $.length;
    l.length += Y;
    var he = l.length < l.highWaterMark;
    if (he || (l.needDrain = !0), l.writing || l.corked) {
      var _e = l.lastBufferedRequest;
      l.lastBufferedRequest = {
        chunk: $,
        encoding: G,
        isBuf: p,
        callback: P,
        next: null
      }, _e ? _e.next = l.lastBufferedRequest : l.bufferedRequest = l.lastBufferedRequest, l.bufferedRequestCount += 1;
    } else
      V(q, l, !1, Y, $, G, P);
    return he;
  }
  function V(q, l, p, $, G, P, N) {
    l.writelen = $, l.writecb = N, l.writing = !0, l.sync = !0, l.destroyed ? l.onwrite(new O("write")) : p ? q._writev(G, l.onwrite) : q._write(G, P, l.onwrite), l.sync = !1;
  }
  function Z(q, l, p, $, G) {
    --l.pendingcb, p ? (process.nextTick(G, $), process.nextTick(j, q, l), q._writableState.errorEmitted = !0, M(q, $)) : (G($), q._writableState.errorEmitted = !0, M(q, $), j(q, l));
  }
  function ne(q) {
    q.writing = !1, q.writecb = null, q.length -= q.writelen, q.writelen = 0;
  }
  function ie(q, l) {
    var p = q._writableState, $ = p.sync, G = p.writecb;
    if (typeof G != "function")
      throw new A();
    if (ne(p), l)
      Z(q, p, $, l, G);
    else {
      var P = ue(p) || q.destroyed;
      !P && !p.corked && !p.bufferProcessing && p.bufferedRequest && X(q, p), $ ? process.nextTick(R, q, p, P, G) : R(q, p, P, G);
    }
  }
  function R(q, l, p, $) {
    p || U(q, l), l.pendingcb--, $(), j(q, l);
  }
  function U(q, l) {
    l.length === 0 && l.needDrain && (l.needDrain = !1, q.emit("drain"));
  }
  function X(q, l) {
    l.bufferProcessing = !0;
    var p = l.bufferedRequest;
    if (q._writev && p && p.next) {
      var $ = l.bufferedRequestCount, G = new Array($), P = l.corkedRequestsFree;
      P.entry = p;
      for (var N = 0, Y = !0; p; )
        G[N] = p, p.isBuf || (Y = !1), p = p.next, N += 1;
      G.allBuffers = Y, V(q, l, !0, l.length, G, "", P.finish), l.pendingcb++, l.lastBufferedRequest = null, P.next ? (l.corkedRequestsFree = P.next, P.next = null) : l.corkedRequestsFree = new r(l), l.bufferedRequestCount = 0;
    } else {
      for (; p; ) {
        var he = p.chunk, _e = p.encoding, k = p.callback, x = l.objectMode ? 1 : he.length;
        if (V(q, l, !1, x, he, _e, k), p = p.next, l.bufferedRequestCount--, l.writing)
          break;
      }
      p === null && (l.lastBufferedRequest = null);
    }
    l.bufferedRequest = p, l.bufferProcessing = !1;
  }
  D.prototype._write = function(q, l, p) {
    p(new T("_write()"));
  }, D.prototype._writev = null, D.prototype.end = function(q, l, p) {
    var $ = this._writableState;
    return typeof q == "function" ? (p = q, q = null, l = null) : typeof l == "function" && (p = l, l = null), q != null && this.write(q, l), $.corked && ($.corked = 1, this.uncork()), $.ending || K(this, $, p), this;
  }, Object.defineProperty(D.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function ue(q) {
    return q.ending && q.length === 0 && q.bufferedRequest === null && !q.finished && !q.writing;
  }
  function J(q, l) {
    q._final(function(p) {
      l.pendingcb--, p && M(q, p), l.prefinished = !0, q.emit("prefinish"), j(q, l);
    });
  }
  function te(q, l) {
    !l.prefinished && !l.finalCalled && (typeof q._final == "function" && !l.destroyed ? (l.pendingcb++, l.finalCalled = !0, process.nextTick(J, q, l)) : (l.prefinished = !0, q.emit("prefinish")));
  }
  function j(q, l) {
    var p = ue(l);
    if (p && (te(q, l), l.pendingcb === 0 && (l.finished = !0, q.emit("finish"), l.autoDestroy))) {
      var $ = q._readableState;
      (!$ || $.autoDestroy && $.endEmitted) && q.destroy();
    }
    return p;
  }
  function K(q, l, p) {
    l.ending = !0, j(q, l), p && (l.finished ? process.nextTick(p) : q.once("finish", p)), l.ended = !0, q.writable = !1;
  }
  function se(q, l, p) {
    var $ = q.entry;
    for (q.entry = null; $; ) {
      var G = $.callback;
      l.pendingcb--, G(p), $ = $.next;
    }
    l.corkedRequestsFree.next = q;
  }
  return Object.defineProperty(D.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(l) {
      this._writableState && (this._writableState.destroyed = l);
    }
  }), D.prototype.destroy = f.destroy, D.prototype._undestroy = f.undestroy, D.prototype._destroy = function(q, l) {
    l(q);
  }, ti;
}
var ri, As;
function br() {
  if (As)
    return ri;
  As = 1;
  var r = Object.keys || function(u) {
    var c = [];
    for (var h in u)
      c.push(h);
    return c;
  };
  ri = s;
  var e = Vu(), t = zu();
  Ue(s, e);
  for (var n = r(t.prototype), i = 0; i < n.length; i++) {
    var o = n[i];
    s.prototype[o] || (s.prototype[o] = t.prototype[o]);
  }
  function s(u) {
    if (!(this instanceof s))
      return new s(u);
    e.call(this, u), t.call(this, u), this.allowHalfOpen = !0, u && (u.readable === !1 && (this.readable = !1), u.writable === !1 && (this.writable = !1), u.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", a)));
  }
  Object.defineProperty(s.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(s.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(s.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function a() {
    this._writableState.ended || process.nextTick(f, this);
  }
  function f(u) {
    u.end();
  }
  return Object.defineProperty(s.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(c) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = c, this._writableState.destroyed = c);
    }
  }), ri;
}
var ni = {}, Yr = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Bs;
function h0() {
  return Bs || (Bs = 1, function(r, e) {
    var t = et, n = t.Buffer;
    function i(s, a) {
      for (var f in s)
        a[f] = s[f];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
    function o(s, a, f) {
      return n(s, a, f);
    }
    o.prototype = Object.create(n.prototype), i(n, o), o.from = function(s, a, f) {
      if (typeof s == "number")
        throw new TypeError("Argument must not be a number");
      return n(s, a, f);
    }, o.alloc = function(s, a, f) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      var u = n(s);
      return a !== void 0 ? typeof f == "string" ? u.fill(a, f) : u.fill(a) : u.fill(0), u;
    }, o.allocUnsafe = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return n(s);
    }, o.allocUnsafeSlow = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(s);
    };
  }(Yr, Yr.exports)), Yr.exports;
}
var Cs;
function Ts() {
  if (Cs)
    return ni;
  Cs = 1;
  var r = h0().Buffer, e = r.isEncoding || function(d) {
    switch (d = "" + d, d && d.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function t(d) {
    if (!d)
      return "utf8";
    for (var _; ; )
      switch (d) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return d;
        default:
          if (_)
            return;
          d = ("" + d).toLowerCase(), _ = !0;
      }
  }
  function n(d) {
    var _ = t(d);
    if (typeof _ != "string" && (r.isEncoding === e || !e(d)))
      throw new Error("Unknown encoding: " + d);
    return _ || d;
  }
  ni.StringDecoder = i;
  function i(d) {
    this.encoding = n(d);
    var _;
    switch (this.encoding) {
      case "utf16le":
        this.text = h, this.end = y, _ = 4;
        break;
      case "utf8":
        this.fillLast = f, _ = 4;
        break;
      case "base64":
        this.text = T, this.end = A, _ = 3;
        break;
      default:
        this.write = B, this.end = O;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(_);
  }
  i.prototype.write = function(d) {
    if (d.length === 0)
      return "";
    var _, E;
    if (this.lastNeed) {
      if (_ = this.fillLast(d), _ === void 0)
        return "";
      E = this.lastNeed, this.lastNeed = 0;
    } else
      E = 0;
    return E < d.length ? _ ? _ + this.text(d, E) : this.text(d, E) : _ || "";
  }, i.prototype.end = c, i.prototype.text = u, i.prototype.fillLast = function(d) {
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, d.length), this.lastNeed -= d.length;
  };
  function o(d) {
    return d <= 127 ? 0 : d >> 5 === 6 ? 2 : d >> 4 === 14 ? 3 : d >> 3 === 30 ? 4 : d >> 6 === 2 ? -1 : -2;
  }
  function s(d, _, E) {
    var M = _.length - 1;
    if (M < E)
      return 0;
    var S = o(_[M]);
    return S >= 0 ? (S > 0 && (d.lastNeed = S - 1), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (d.lastNeed = S - 2), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (S === 2 ? S = 0 : d.lastNeed = S - 3), S) : 0));
  }
  function a(d, _, E) {
    if ((_[0] & 192) !== 128)
      return d.lastNeed = 0, "�";
    if (d.lastNeed > 1 && _.length > 1) {
      if ((_[1] & 192) !== 128)
        return d.lastNeed = 1, "�";
      if (d.lastNeed > 2 && _.length > 2 && (_[2] & 192) !== 128)
        return d.lastNeed = 2, "�";
    }
  }
  function f(d) {
    var _ = this.lastTotal - this.lastNeed, E = a(this, d);
    if (E !== void 0)
      return E;
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, _, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, _, 0, d.length), this.lastNeed -= d.length;
  }
  function u(d, _) {
    var E = s(this, d, _);
    if (!this.lastNeed)
      return d.toString("utf8", _);
    this.lastTotal = E;
    var M = d.length - (E - this.lastNeed);
    return d.copy(this.lastChar, 0, M), d.toString("utf8", _, M);
  }
  function c(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + "�" : _;
  }
  function h(d, _) {
    if ((d.length - _) % 2 === 0) {
      var E = d.toString("utf16le", _);
      if (E) {
        var M = E.charCodeAt(E.length - 1);
        if (M >= 55296 && M <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1], E.slice(0, -1);
      }
      return E;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = d[d.length - 1], d.toString("utf16le", _, d.length - 1);
  }
  function y(d) {
    var _ = d && d.length ? this.write(d) : "";
    if (this.lastNeed) {
      var E = this.lastTotal - this.lastNeed;
      return _ + this.lastChar.toString("utf16le", 0, E);
    }
    return _;
  }
  function T(d, _) {
    var E = (d.length - _) % 3;
    return E === 0 ? d.toString("base64", _) : (this.lastNeed = 3 - E, this.lastTotal = 3, E === 1 ? this.lastChar[0] = d[d.length - 1] : (this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1]), d.toString("base64", _, d.length - E));
  }
  function A(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : _;
  }
  function B(d) {
    return d.toString(this.encoding);
  }
  function O(d) {
    return d && d.length ? this.write(d) : "";
  }
  return ni;
}
var Ds = ir.codes.ERR_STREAM_PREMATURE_CLOSE;
function d0(r) {
  var e = !1;
  return function() {
    if (!e) {
      e = !0;
      for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++)
        n[i] = arguments[i];
      r.apply(this, n);
    }
  };
}
function p0() {
}
function _0(r) {
  return r.setHeader && typeof r.abort == "function";
}
function Ku(r, e, t) {
  if (typeof e == "function")
    return Ku(r, null, e);
  e || (e = {}), t = d0(t || p0);
  var n = e.readable || e.readable !== !1 && r.readable, i = e.writable || e.writable !== !1 && r.writable, o = function() {
    r.writable || a();
  }, s = r._writableState && r._writableState.finished, a = function() {
    i = !1, s = !0, n || t.call(r);
  }, f = r._readableState && r._readableState.endEmitted, u = function() {
    n = !1, f = !0, i || t.call(r);
  }, c = function(A) {
    t.call(r, A);
  }, h = function() {
    var A;
    if (n && !f)
      return (!r._readableState || !r._readableState.ended) && (A = new Ds()), t.call(r, A);
    if (i && !s)
      return (!r._writableState || !r._writableState.ended) && (A = new Ds()), t.call(r, A);
  }, y = function() {
    r.req.on("finish", a);
  };
  return _0(r) ? (r.on("complete", a), r.on("abort", h), r.req ? y() : r.on("request", y)) : i && !r._writableState && (r.on("end", o), r.on("close", o)), r.on("end", u), r.on("finish", a), e.error !== !1 && r.on("error", c), r.on("close", h), function() {
    r.removeListener("complete", a), r.removeListener("abort", h), r.removeListener("request", y), r.req && r.req.removeListener("finish", a), r.removeListener("end", o), r.removeListener("close", o), r.removeListener("finish", a), r.removeListener("end", u), r.removeListener("error", c), r.removeListener("close", h);
  };
}
var Jo = Ku, ii, Fs;
function v0() {
  if (Fs)
    return ii;
  Fs = 1;
  var r;
  function e(E, M, S) {
    return M = t(M), M in E ? Object.defineProperty(E, M, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : E[M] = S, E;
  }
  function t(E) {
    var M = n(E, "string");
    return typeof M == "symbol" ? M : String(M);
  }
  function n(E, M) {
    if (typeof E != "object" || E === null)
      return E;
    var S = E[Symbol.toPrimitive];
    if (S !== void 0) {
      var C = S.call(E, M || "default");
      if (typeof C != "object")
        return C;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (M === "string" ? String : Number)(E);
  }
  var i = Jo, o = Symbol("lastResolve"), s = Symbol("lastReject"), a = Symbol("error"), f = Symbol("ended"), u = Symbol("lastPromise"), c = Symbol("handlePromise"), h = Symbol("stream");
  function y(E, M) {
    return {
      value: E,
      done: M
    };
  }
  function T(E) {
    var M = E[o];
    if (M !== null) {
      var S = E[h].read();
      S !== null && (E[u] = null, E[o] = null, E[s] = null, M(y(S, !1)));
    }
  }
  function A(E) {
    process.nextTick(T, E);
  }
  function B(E, M) {
    return function(S, C) {
      E.then(function() {
        if (M[f]) {
          S(y(void 0, !0));
          return;
        }
        M[c](S, C);
      }, C);
    };
  }
  var O = Object.getPrototypeOf(function() {
  }), d = Object.setPrototypeOf((r = {
    get stream() {
      return this[h];
    },
    next: function() {
      var M = this, S = this[a];
      if (S !== null)
        return Promise.reject(S);
      if (this[f])
        return Promise.resolve(y(void 0, !0));
      if (this[h].destroyed)
        return new Promise(function(w, F) {
          process.nextTick(function() {
            M[a] ? F(M[a]) : w(y(void 0, !0));
          });
        });
      var C = this[u], m;
      if (C)
        m = new Promise(B(C, this));
      else {
        var D = this[h].read();
        if (D !== null)
          return Promise.resolve(y(D, !1));
        m = new Promise(this[c]);
      }
      return this[u] = m, m;
    }
  }, e(r, Symbol.asyncIterator, function() {
    return this;
  }), e(r, "return", function() {
    var M = this;
    return new Promise(function(S, C) {
      M[h].destroy(null, function(m) {
        if (m) {
          C(m);
          return;
        }
        S(y(void 0, !0));
      });
    });
  }), r), O), _ = function(M) {
    var S, C = Object.create(d, (S = {}, e(S, h, {
      value: M,
      writable: !0
    }), e(S, o, {
      value: null,
      writable: !0
    }), e(S, s, {
      value: null,
      writable: !0
    }), e(S, a, {
      value: null,
      writable: !0
    }), e(S, f, {
      value: M._readableState.endEmitted,
      writable: !0
    }), e(S, c, {
      value: function(D, w) {
        var F = C[h].read();
        F ? (C[u] = null, C[o] = null, C[s] = null, D(y(F, !1))) : (C[o] = D, C[s] = w);
      },
      writable: !0
    }), S));
    return C[u] = null, i(M, function(m) {
      if (m && m.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var D = C[s];
        D !== null && (C[u] = null, C[o] = null, C[s] = null, D(m)), C[a] = m;
        return;
      }
      var w = C[o];
      w !== null && (C[u] = null, C[o] = null, C[s] = null, w(y(void 0, !0))), C[f] = !0;
    }), M.on("readable", A.bind(null, C)), C;
  };
  return ii = _, ii;
}
var oi, Os;
function y0() {
  return Os || (Os = 1, oi = function() {
    throw new Error("Readable.from is not available in the browser");
  }), oi;
}
var si, Ms;
function Vu() {
  if (Ms)
    return si;
  Ms = 1, si = w;
  var r;
  w.ReadableState = D, Ne.EventEmitter;
  var e = function(N, Y) {
    return N.listeners(Y).length;
  }, t = qu, n = et.Buffer, i = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function o(P) {
    return n.from(P);
  }
  function s(P) {
    return n.isBuffer(P) || P instanceof i;
  }
  var a = Ne, f;
  a && a.debuglog ? f = a.debuglog("stream") : f = function() {
  };
  var u = e0(), c = Hu, h = Wu, y = h.getHighWaterMark, T = ir.codes, A = T.ERR_INVALID_ARG_TYPE, B = T.ERR_STREAM_PUSH_AFTER_EOF, O = T.ERR_METHOD_NOT_IMPLEMENTED, d = T.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, _, E, M;
  Ue(w, t);
  var S = c.errorOrDestroy, C = ["error", "close", "destroy", "pause", "resume"];
  function m(P, N, Y) {
    if (typeof P.prependListener == "function")
      return P.prependListener(N, Y);
    !P._events || !P._events[N] ? P.on(N, Y) : Array.isArray(P._events[N]) ? P._events[N].unshift(Y) : P._events[N] = [Y, P._events[N]];
  }
  function D(P, N, Y) {
    r = r || br(), P = P || {}, typeof Y != "boolean" && (Y = N instanceof r), this.objectMode = !!P.objectMode, Y && (this.objectMode = this.objectMode || !!P.readableObjectMode), this.highWaterMark = y(this, P, "readableHighWaterMark", Y), this.buffer = new u(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = P.emitClose !== !1, this.autoDestroy = !!P.autoDestroy, this.destroyed = !1, this.defaultEncoding = P.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, P.encoding && (_ || (_ = Ts().StringDecoder), this.decoder = new _(P.encoding), this.encoding = P.encoding);
  }
  function w(P) {
    if (r = r || br(), !(this instanceof w))
      return new w(P);
    var N = this instanceof r;
    this._readableState = new D(P, this, N), this.readable = !0, P && (typeof P.read == "function" && (this._read = P.read), typeof P.destroy == "function" && (this._destroy = P.destroy)), t.call(this);
  }
  Object.defineProperty(w.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(N) {
      this._readableState && (this._readableState.destroyed = N);
    }
  }), w.prototype.destroy = c.destroy, w.prototype._undestroy = c.undestroy, w.prototype._destroy = function(P, N) {
    N(P);
  }, w.prototype.push = function(P, N) {
    var Y = this._readableState, he;
    return Y.objectMode ? he = !0 : typeof P == "string" && (N = N || Y.defaultEncoding, N !== Y.encoding && (P = n.from(P, N), N = ""), he = !0), F(this, P, N, !1, he);
  }, w.prototype.unshift = function(P) {
    return F(this, P, null, !0, !1);
  };
  function F(P, N, Y, he, _e) {
    f("readableAddChunk", N);
    var k = P._readableState;
    if (N === null)
      k.reading = !1, ie(P, k);
    else {
      var x;
      if (_e || (x = z(k, N)), x)
        S(P, x);
      else if (k.objectMode || N && N.length > 0)
        if (typeof N != "string" && !k.objectMode && Object.getPrototypeOf(N) !== n.prototype && (N = o(N)), he)
          k.endEmitted ? S(P, new d()) : L(P, k, N, !0);
        else if (k.ended)
          S(P, new B());
        else {
          if (k.destroyed)
            return !1;
          k.reading = !1, k.decoder && !Y ? (N = k.decoder.write(N), k.objectMode || N.length !== 0 ? L(P, k, N, !1) : X(P, k)) : L(P, k, N, !1);
        }
      else
        he || (k.reading = !1, X(P, k));
    }
    return !k.ended && (k.length < k.highWaterMark || k.length === 0);
  }
  function L(P, N, Y, he) {
    N.flowing && N.length === 0 && !N.sync ? (N.awaitDrain = 0, P.emit("data", Y)) : (N.length += N.objectMode ? 1 : Y.length, he ? N.buffer.unshift(Y) : N.buffer.push(Y), N.needReadable && R(P)), X(P, N);
  }
  function z(P, N) {
    var Y;
    return !s(N) && typeof N != "string" && N !== void 0 && !P.objectMode && (Y = new A("chunk", ["string", "Buffer", "Uint8Array"], N)), Y;
  }
  w.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, w.prototype.setEncoding = function(P) {
    _ || (_ = Ts().StringDecoder);
    var N = new _(P);
    this._readableState.decoder = N, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var Y = this._readableState.buffer.head, he = ""; Y !== null; )
      he += N.write(Y.data), Y = Y.next;
    return this._readableState.buffer.clear(), he !== "" && this._readableState.buffer.push(he), this._readableState.length = he.length, this;
  };
  var V = 1073741824;
  function Z(P) {
    return P >= V ? P = V : (P--, P |= P >>> 1, P |= P >>> 2, P |= P >>> 4, P |= P >>> 8, P |= P >>> 16, P++), P;
  }
  function ne(P, N) {
    return P <= 0 || N.length === 0 && N.ended ? 0 : N.objectMode ? 1 : P !== P ? N.flowing && N.length ? N.buffer.head.data.length : N.length : (P > N.highWaterMark && (N.highWaterMark = Z(P)), P <= N.length ? P : N.ended ? N.length : (N.needReadable = !0, 0));
  }
  w.prototype.read = function(P) {
    f("read", P), P = parseInt(P, 10);
    var N = this._readableState, Y = P;
    if (P !== 0 && (N.emittedReadable = !1), P === 0 && N.needReadable && ((N.highWaterMark !== 0 ? N.length >= N.highWaterMark : N.length > 0) || N.ended))
      return f("read: emitReadable", N.length, N.ended), N.length === 0 && N.ended ? p(this) : R(this), null;
    if (P = ne(P, N), P === 0 && N.ended)
      return N.length === 0 && p(this), null;
    var he = N.needReadable;
    f("need readable", he), (N.length === 0 || N.length - P < N.highWaterMark) && (he = !0, f("length less than watermark", he)), N.ended || N.reading ? (he = !1, f("reading or ended", he)) : he && (f("do read"), N.reading = !0, N.sync = !0, N.length === 0 && (N.needReadable = !0), this._read(N.highWaterMark), N.sync = !1, N.reading || (P = ne(Y, N)));
    var _e;
    return P > 0 ? _e = l(P, N) : _e = null, _e === null ? (N.needReadable = N.length <= N.highWaterMark, P = 0) : (N.length -= P, N.awaitDrain = 0), N.length === 0 && (N.ended || (N.needReadable = !0), Y !== P && N.ended && p(this)), _e !== null && this.emit("data", _e), _e;
  };
  function ie(P, N) {
    if (f("onEofChunk"), !N.ended) {
      if (N.decoder) {
        var Y = N.decoder.end();
        Y && Y.length && (N.buffer.push(Y), N.length += N.objectMode ? 1 : Y.length);
      }
      N.ended = !0, N.sync ? R(P) : (N.needReadable = !1, N.emittedReadable || (N.emittedReadable = !0, U(P)));
    }
  }
  function R(P) {
    var N = P._readableState;
    f("emitReadable", N.needReadable, N.emittedReadable), N.needReadable = !1, N.emittedReadable || (f("emitReadable", N.flowing), N.emittedReadable = !0, process.nextTick(U, P));
  }
  function U(P) {
    var N = P._readableState;
    f("emitReadable_", N.destroyed, N.length, N.ended), !N.destroyed && (N.length || N.ended) && (P.emit("readable"), N.emittedReadable = !1), N.needReadable = !N.flowing && !N.ended && N.length <= N.highWaterMark, q(P);
  }
  function X(P, N) {
    N.readingMore || (N.readingMore = !0, process.nextTick(ue, P, N));
  }
  function ue(P, N) {
    for (; !N.reading && !N.ended && (N.length < N.highWaterMark || N.flowing && N.length === 0); ) {
      var Y = N.length;
      if (f("maybeReadMore read 0"), P.read(0), Y === N.length)
        break;
    }
    N.readingMore = !1;
  }
  w.prototype._read = function(P) {
    S(this, new O("_read()"));
  }, w.prototype.pipe = function(P, N) {
    var Y = this, he = this._readableState;
    switch (he.pipesCount) {
      case 0:
        he.pipes = P;
        break;
      case 1:
        he.pipes = [he.pipes, P];
        break;
      default:
        he.pipes.push(P);
        break;
    }
    he.pipesCount += 1, f("pipe count=%d opts=%j", he.pipesCount, N);
    var _e = (!N || N.end !== !1) && P !== process.stdout && P !== process.stderr, k = _e ? b : Ae;
    he.endEmitted ? process.nextTick(k) : Y.once("end", k), P.on("unpipe", x);
    function x(I, v) {
      f("onunpipe"), I === Y && v && v.hasUnpiped === !1 && (v.hasUnpiped = !0, fe());
    }
    function b() {
      f("onend"), P.end();
    }
    var H = J(Y);
    P.on("drain", H);
    var ee = !1;
    function fe() {
      f("cleanup"), P.removeListener("close", ve), P.removeListener("finish", ye), P.removeListener("drain", H), P.removeListener("error", pe), P.removeListener("unpipe", x), Y.removeListener("end", b), Y.removeListener("end", Ae), Y.removeListener("data", ae), ee = !0, he.awaitDrain && (!P._writableState || P._writableState.needDrain) && H();
    }
    Y.on("data", ae);
    function ae(I) {
      f("ondata");
      var v = P.write(I);
      f("dest.write", v), v === !1 && ((he.pipesCount === 1 && he.pipes === P || he.pipesCount > 1 && G(he.pipes, P) !== -1) && !ee && (f("false write response, pause", he.awaitDrain), he.awaitDrain++), Y.pause());
    }
    function pe(I) {
      f("onerror", I), Ae(), P.removeListener("error", pe), e(P, "error") === 0 && S(P, I);
    }
    m(P, "error", pe);
    function ve() {
      P.removeListener("finish", ye), Ae();
    }
    P.once("close", ve);
    function ye() {
      f("onfinish"), P.removeListener("close", ve), Ae();
    }
    P.once("finish", ye);
    function Ae() {
      f("unpipe"), Y.unpipe(P);
    }
    return P.emit("pipe", Y), he.flowing || (f("pipe resume"), Y.resume()), P;
  };
  function J(P) {
    return function() {
      var Y = P._readableState;
      f("pipeOnDrain", Y.awaitDrain), Y.awaitDrain && Y.awaitDrain--, Y.awaitDrain === 0 && e(P, "data") && (Y.flowing = !0, q(P));
    };
  }
  w.prototype.unpipe = function(P) {
    var N = this._readableState, Y = {
      hasUnpiped: !1
    };
    if (N.pipesCount === 0)
      return this;
    if (N.pipesCount === 1)
      return P && P !== N.pipes ? this : (P || (P = N.pipes), N.pipes = null, N.pipesCount = 0, N.flowing = !1, P && P.emit("unpipe", this, Y), this);
    if (!P) {
      var he = N.pipes, _e = N.pipesCount;
      N.pipes = null, N.pipesCount = 0, N.flowing = !1;
      for (var k = 0; k < _e; k++)
        he[k].emit("unpipe", this, {
          hasUnpiped: !1
        });
      return this;
    }
    var x = G(N.pipes, P);
    return x === -1 ? this : (N.pipes.splice(x, 1), N.pipesCount -= 1, N.pipesCount === 1 && (N.pipes = N.pipes[0]), P.emit("unpipe", this, Y), this);
  }, w.prototype.on = function(P, N) {
    var Y = t.prototype.on.call(this, P, N), he = this._readableState;
    return P === "data" ? (he.readableListening = this.listenerCount("readable") > 0, he.flowing !== !1 && this.resume()) : P === "readable" && !he.endEmitted && !he.readableListening && (he.readableListening = he.needReadable = !0, he.flowing = !1, he.emittedReadable = !1, f("on readable", he.length, he.reading), he.length ? R(this) : he.reading || process.nextTick(j, this)), Y;
  }, w.prototype.addListener = w.prototype.on, w.prototype.removeListener = function(P, N) {
    var Y = t.prototype.removeListener.call(this, P, N);
    return P === "readable" && process.nextTick(te, this), Y;
  }, w.prototype.removeAllListeners = function(P) {
    var N = t.prototype.removeAllListeners.apply(this, arguments);
    return (P === "readable" || P === void 0) && process.nextTick(te, this), N;
  };
  function te(P) {
    var N = P._readableState;
    N.readableListening = P.listenerCount("readable") > 0, N.resumeScheduled && !N.paused ? N.flowing = !0 : P.listenerCount("data") > 0 && P.resume();
  }
  function j(P) {
    f("readable nexttick read 0"), P.read(0);
  }
  w.prototype.resume = function() {
    var P = this._readableState;
    return P.flowing || (f("resume"), P.flowing = !P.readableListening, K(this, P)), P.paused = !1, this;
  };
  function K(P, N) {
    N.resumeScheduled || (N.resumeScheduled = !0, process.nextTick(se, P, N));
  }
  function se(P, N) {
    f("resume", N.reading), N.reading || P.read(0), N.resumeScheduled = !1, P.emit("resume"), q(P), N.flowing && !N.reading && P.read(0);
  }
  w.prototype.pause = function() {
    return f("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (f("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function q(P) {
    var N = P._readableState;
    for (f("flow", N.flowing); N.flowing && P.read() !== null; )
      ;
  }
  w.prototype.wrap = function(P) {
    var N = this, Y = this._readableState, he = !1;
    P.on("end", function() {
      if (f("wrapped end"), Y.decoder && !Y.ended) {
        var x = Y.decoder.end();
        x && x.length && N.push(x);
      }
      N.push(null);
    }), P.on("data", function(x) {
      if (f("wrapped data"), Y.decoder && (x = Y.decoder.write(x)), !(Y.objectMode && x == null) && !(!Y.objectMode && (!x || !x.length))) {
        var b = N.push(x);
        b || (he = !0, P.pause());
      }
    });
    for (var _e in P)
      this[_e] === void 0 && typeof P[_e] == "function" && (this[_e] = /* @__PURE__ */ function(b) {
        return function() {
          return P[b].apply(P, arguments);
        };
      }(_e));
    for (var k = 0; k < C.length; k++)
      P.on(C[k], this.emit.bind(this, C[k]));
    return this._read = function(x) {
      f("wrapped _read", x), he && (he = !1, P.resume());
    }, this;
  }, typeof Symbol == "function" && (w.prototype[Symbol.asyncIterator] = function() {
    return E === void 0 && (E = v0()), E(this);
  }), Object.defineProperty(w.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(w.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(w.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(N) {
      this._readableState && (this._readableState.flowing = N);
    }
  }), w._fromList = l, Object.defineProperty(w.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function l(P, N) {
    if (N.length === 0)
      return null;
    var Y;
    return N.objectMode ? Y = N.buffer.shift() : !P || P >= N.length ? (N.decoder ? Y = N.buffer.join("") : N.buffer.length === 1 ? Y = N.buffer.first() : Y = N.buffer.concat(N.length), N.buffer.clear()) : Y = N.buffer.consume(P, N.decoder), Y;
  }
  function p(P) {
    var N = P._readableState;
    f("endReadable", N.endEmitted), N.endEmitted || (N.ended = !0, process.nextTick($, N, P));
  }
  function $(P, N) {
    if (f("endReadableNT", P.endEmitted, P.length), !P.endEmitted && P.length === 0 && (P.endEmitted = !0, N.readable = !1, N.emit("end"), P.autoDestroy)) {
      var Y = N._writableState;
      (!Y || Y.autoDestroy && Y.finished) && N.destroy();
    }
  }
  typeof Symbol == "function" && (w.from = function(P, N) {
    return M === void 0 && (M = y0()), M(w, P, N);
  });
  function G(P, N) {
    for (var Y = 0, he = P.length; Y < he; Y++)
      if (P[Y] === N)
        return Y;
    return -1;
  }
  return si;
}
var Gu = Dt, Sn = ir.codes, x0 = Sn.ERR_METHOD_NOT_IMPLEMENTED, g0 = Sn.ERR_MULTIPLE_CALLBACK, b0 = Sn.ERR_TRANSFORM_ALREADY_TRANSFORMING, w0 = Sn.ERR_TRANSFORM_WITH_LENGTH_0, An = br();
Ue(Dt, An);
function m0(r, e) {
  var t = this._transformState;
  t.transforming = !1;
  var n = t.writecb;
  if (n === null)
    return this.emit("error", new g0());
  t.writechunk = null, t.writecb = null, e != null && this.push(e), n(r);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function Dt(r) {
  if (!(this instanceof Dt))
    return new Dt(r);
  An.call(this, r), this._transformState = {
    afterTransform: m0.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, r && (typeof r.transform == "function" && (this._transform = r.transform), typeof r.flush == "function" && (this._flush = r.flush)), this.on("prefinish", E0);
}
function E0() {
  var r = this;
  typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(e, t) {
    Is(r, e, t);
  }) : Is(this, null, null);
}
Dt.prototype.push = function(r, e) {
  return this._transformState.needTransform = !1, An.prototype.push.call(this, r, e);
};
Dt.prototype._transform = function(r, e, t) {
  t(new x0("_transform()"));
};
Dt.prototype._write = function(r, e, t) {
  var n = this._transformState;
  if (n.writecb = t, n.writechunk = r, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
Dt.prototype._read = function(r) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
Dt.prototype._destroy = function(r, e) {
  An.prototype._destroy.call(this, r, function(t) {
    e(t);
  });
};
function Is(r, e, t) {
  if (e)
    return r.emit("error", e);
  if (t != null && r.push(t), r._writableState.length)
    throw new w0();
  if (r._transformState.transforming)
    throw new b0();
  return r.push(null);
}
var S0 = Lr, Qu = Gu;
Ue(Lr, Qu);
function Lr(r) {
  if (!(this instanceof Lr))
    return new Lr(r);
  Qu.call(this, r);
}
Lr.prototype._transform = function(r, e, t) {
  t(null, r);
};
var ai;
function A0(r) {
  var e = !1;
  return function() {
    e || (e = !0, r.apply(void 0, arguments));
  };
}
var Ju = ir.codes, B0 = Ju.ERR_MISSING_ARGS, C0 = Ju.ERR_STREAM_DESTROYED;
function Ns(r) {
  if (r)
    throw r;
}
function T0(r) {
  return r.setHeader && typeof r.abort == "function";
}
function D0(r, e, t, n) {
  n = A0(n);
  var i = !1;
  r.on("close", function() {
    i = !0;
  }), ai === void 0 && (ai = Jo), ai(r, {
    readable: e,
    writable: t
  }, function(s) {
    if (s)
      return n(s);
    i = !0, n();
  });
  var o = !1;
  return function(s) {
    if (!i && !o) {
      if (o = !0, T0(r))
        return r.abort();
      if (typeof r.destroy == "function")
        return r.destroy();
      n(s || new C0("pipe"));
    }
  };
}
function Rs(r) {
  r();
}
function F0(r, e) {
  return r.pipe(e);
}
function O0(r) {
  return !r.length || typeof r[r.length - 1] != "function" ? Ns : r.pop();
}
function M0() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  var n = O0(e);
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2)
    throw new B0("streams");
  var i, o = e.map(function(s, a) {
    var f = a < e.length - 1, u = a > 0;
    return D0(s, f, u, function(c) {
      i || (i = c), c && o.forEach(Rs), !f && (o.forEach(Rs), n(i));
    });
  });
  return e.reduce(F0);
}
var I0 = M0;
(function(r, e) {
  e = r.exports = Vu(), e.Stream = e, e.Readable = e, e.Writable = zu(), e.Duplex = br(), e.Transform = Gu, e.PassThrough = S0, e.finished = Jo, e.pipeline = I0;
})(bo, bo.exports);
var or = bo.exports;
const N0 = Go, R0 = or.Readable, P0 = { objectMode: !0 }, k0 = {
  clean: !0
};
function $t(r) {
  if (!(this instanceof $t))
    return new $t(r);
  this.options = r || {}, this.options = N0(k0, r), this._inflights = /* @__PURE__ */ new Map();
}
$t.prototype.put = function(r, e) {
  return this._inflights.set(r.messageId, r), e && e(), this;
};
$t.prototype.createStream = function() {
  const r = new R0(P0), e = [];
  let t = !1, n = 0;
  return this._inflights.forEach(function(i, o) {
    e.push(i);
  }), r._read = function() {
    !t && n < e.length ? this.push(e[n++]) : this.push(null);
  }, r.destroy = function() {
    if (t)
      return;
    const i = this;
    t = !0, setTimeout(function() {
      i.emit("close");
    }, 0);
  }, r;
};
$t.prototype.del = function(r, e) {
  return r = this._inflights.get(r.messageId), r ? (this._inflights.delete(r.messageId), e(null, r)) : e && e(new Error("missing packet")), this;
};
$t.prototype.get = function(r, e) {
  return r = this._inflights.get(r.messageId), r ? e(null, r) : e && e(new Error("missing packet")), this;
};
$t.prototype.close = function(r) {
  this.options.clean && (this._inflights = null), r && r();
};
var Xu = $t;
function wr(r) {
  if (!(this instanceof wr))
    return new wr(r);
  this.aliasToTopic = {}, this.max = r;
}
wr.prototype.put = function(r, e) {
  return e === 0 || e > this.max ? !1 : (this.aliasToTopic[e] = r, this.length = Object.keys(this.aliasToTopic).length, !0);
};
wr.prototype.getTopicByAlias = function(r) {
  return this.aliasToTopic[r];
};
wr.prototype.clear = function() {
  this.aliasToTopic = {};
};
var j0 = wr, ui, Ps;
function U0() {
  return Ps || (Ps = 1, ui = function(r) {
    r.prototype[Symbol.iterator] = function* () {
      for (let e = this.head; e; e = e.next)
        yield e.value;
    };
  }), ui;
}
var L0 = Se;
Se.Node = tr;
Se.create = Se;
function Se(r) {
  var e = this;
  if (e instanceof Se || (e = new Se()), e.tail = null, e.head = null, e.length = 0, r && typeof r.forEach == "function")
    r.forEach(function(i) {
      e.push(i);
    });
  else if (arguments.length > 0)
    for (var t = 0, n = arguments.length; t < n; t++)
      e.push(arguments[t]);
  return e;
}
Se.prototype.removeNode = function(r) {
  if (r.list !== this)
    throw new Error("removing node which does not belong to this list");
  var e = r.next, t = r.prev;
  return e && (e.prev = t), t && (t.next = e), r === this.head && (this.head = e), r === this.tail && (this.tail = t), r.list.length--, r.next = null, r.prev = null, r.list = null, e;
};
Se.prototype.unshiftNode = function(r) {
  if (r !== this.head) {
    r.list && r.list.removeNode(r);
    var e = this.head;
    r.list = this, r.next = e, e && (e.prev = r), this.head = r, this.tail || (this.tail = r), this.length++;
  }
};
Se.prototype.pushNode = function(r) {
  if (r !== this.tail) {
    r.list && r.list.removeNode(r);
    var e = this.tail;
    r.list = this, r.prev = e, e && (e.next = r), this.tail = r, this.head || (this.head = r), this.length++;
  }
};
Se.prototype.push = function() {
  for (var r = 0, e = arguments.length; r < e; r++)
    H0(this, arguments[r]);
  return this.length;
};
Se.prototype.unshift = function() {
  for (var r = 0, e = arguments.length; r < e; r++)
    $0(this, arguments[r]);
  return this.length;
};
Se.prototype.pop = function() {
  if (this.tail) {
    var r = this.tail.value;
    return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, r;
  }
};
Se.prototype.shift = function() {
  if (this.head) {
    var r = this.head.value;
    return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, r;
  }
};
Se.prototype.forEach = function(r, e) {
  e = e || this;
  for (var t = this.head, n = 0; t !== null; n++)
    r.call(e, t.value, n, this), t = t.next;
};
Se.prototype.forEachReverse = function(r, e) {
  e = e || this;
  for (var t = this.tail, n = this.length - 1; t !== null; n--)
    r.call(e, t.value, n, this), t = t.prev;
};
Se.prototype.get = function(r) {
  for (var e = 0, t = this.head; t !== null && e < r; e++)
    t = t.next;
  if (e === r && t !== null)
    return t.value;
};
Se.prototype.getReverse = function(r) {
  for (var e = 0, t = this.tail; t !== null && e < r; e++)
    t = t.prev;
  if (e === r && t !== null)
    return t.value;
};
Se.prototype.map = function(r, e) {
  e = e || this;
  for (var t = new Se(), n = this.head; n !== null; )
    t.push(r.call(e, n.value, this)), n = n.next;
  return t;
};
Se.prototype.mapReverse = function(r, e) {
  e = e || this;
  for (var t = new Se(), n = this.tail; n !== null; )
    t.push(r.call(e, n.value, this)), n = n.prev;
  return t;
};
Se.prototype.reduce = function(r, e) {
  var t, n = this.head;
  if (arguments.length > 1)
    t = e;
  else if (this.head)
    n = this.head.next, t = this.head.value;
  else
    throw new TypeError("Reduce of empty list with no initial value");
  for (var i = 0; n !== null; i++)
    t = r(t, n.value, i), n = n.next;
  return t;
};
Se.prototype.reduceReverse = function(r, e) {
  var t, n = this.tail;
  if (arguments.length > 1)
    t = e;
  else if (this.tail)
    n = this.tail.prev, t = this.tail.value;
  else
    throw new TypeError("Reduce of empty list with no initial value");
  for (var i = this.length - 1; n !== null; i--)
    t = r(t, n.value, i), n = n.prev;
  return t;
};
Se.prototype.toArray = function() {
  for (var r = new Array(this.length), e = 0, t = this.head; t !== null; e++)
    r[e] = t.value, t = t.next;
  return r;
};
Se.prototype.toArrayReverse = function() {
  for (var r = new Array(this.length), e = 0, t = this.tail; t !== null; e++)
    r[e] = t.value, t = t.prev;
  return r;
};
Se.prototype.slice = function(r, e) {
  e = e || this.length, e < 0 && (e += this.length), r = r || 0, r < 0 && (r += this.length);
  var t = new Se();
  if (e < r || e < 0)
    return t;
  r < 0 && (r = 0), e > this.length && (e = this.length);
  for (var n = 0, i = this.head; i !== null && n < r; n++)
    i = i.next;
  for (; i !== null && n < e; n++, i = i.next)
    t.push(i.value);
  return t;
};
Se.prototype.sliceReverse = function(r, e) {
  e = e || this.length, e < 0 && (e += this.length), r = r || 0, r < 0 && (r += this.length);
  var t = new Se();
  if (e < r || e < 0)
    return t;
  r < 0 && (r = 0), e > this.length && (e = this.length);
  for (var n = this.length, i = this.tail; i !== null && n > e; n--)
    i = i.prev;
  for (; i !== null && n > r; n--, i = i.prev)
    t.push(i.value);
  return t;
};
Se.prototype.splice = function(r, e, ...t) {
  r > this.length && (r = this.length - 1), r < 0 && (r = this.length + r);
  for (var n = 0, i = this.head; i !== null && n < r; n++)
    i = i.next;
  for (var o = [], n = 0; i && n < e; n++)
    o.push(i.value), i = this.removeNode(i);
  i === null && (i = this.tail), i !== this.head && i !== this.tail && (i = i.prev);
  for (var n = 0; n < t.length; n++)
    i = q0(this, i, t[n]);
  return o;
};
Se.prototype.reverse = function() {
  for (var r = this.head, e = this.tail, t = r; t !== null; t = t.prev) {
    var n = t.prev;
    t.prev = t.next, t.next = n;
  }
  return this.head = e, this.tail = r, this;
};
function q0(r, e, t) {
  var n = e === r.head ? new tr(t, null, e, r) : new tr(t, e, e.next, r);
  return n.next === null && (r.tail = n), n.prev === null && (r.head = n), r.length++, n;
}
function H0(r, e) {
  r.tail = new tr(e, r.tail, null, r), r.head || (r.head = r.tail), r.length++;
}
function $0(r, e) {
  r.head = new tr(e, null, r.head, r), r.tail || (r.tail = r.head), r.length++;
}
function tr(r, e, t, n) {
  if (!(this instanceof tr))
    return new tr(r, e, t, n);
  this.list = n, this.value = r, e ? (e.next = this, this.prev = e) : this.prev = null, t ? (t.prev = this, this.next = t) : this.next = null;
}
try {
  U0()(Se);
} catch {
}
const W0 = L0, Xt = Symbol("max"), Bt = Symbol("length"), fr = Symbol("lengthCalculator"), jr = Symbol("allowStale"), Zt = Symbol("maxAge"), At = Symbol("dispose"), ks = Symbol("noDisposeOnSet"), Le = Symbol("lruList"), ft = Symbol("cache"), Yu = Symbol("updateAgeOnGet"), fi = () => 1;
class z0 {
  constructor(e) {
    if (typeof e == "number" && (e = { max: e }), e || (e = {}), e.max && (typeof e.max != "number" || e.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[Xt] = e.max || 1 / 0;
    const t = e.length || fi;
    if (this[fr] = typeof t != "function" ? fi : t, this[jr] = e.stale || !1, e.maxAge && typeof e.maxAge != "number")
      throw new TypeError("maxAge must be a number");
    this[Zt] = e.maxAge || 0, this[At] = e.dispose, this[ks] = e.noDisposeOnSet || !1, this[Yu] = e.updateAgeOnGet || !1, this.reset();
  }
  // resize the cache when the max changes.
  set max(e) {
    if (typeof e != "number" || e < 0)
      throw new TypeError("max must be a non-negative number");
    this[Xt] = e || 1 / 0, Dr(this);
  }
  get max() {
    return this[Xt];
  }
  set allowStale(e) {
    this[jr] = !!e;
  }
  get allowStale() {
    return this[jr];
  }
  set maxAge(e) {
    if (typeof e != "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[Zt] = e, Dr(this);
  }
  get maxAge() {
    return this[Zt];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(e) {
    typeof e != "function" && (e = fi), e !== this[fr] && (this[fr] = e, this[Bt] = 0, this[Le].forEach((t) => {
      t.length = this[fr](t.value, t.key), this[Bt] += t.length;
    })), Dr(this);
  }
  get lengthCalculator() {
    return this[fr];
  }
  get length() {
    return this[Bt];
  }
  get itemCount() {
    return this[Le].length;
  }
  rforEach(e, t) {
    t = t || this;
    for (let n = this[Le].tail; n !== null; ) {
      const i = n.prev;
      js(this, e, n, t), n = i;
    }
  }
  forEach(e, t) {
    t = t || this;
    for (let n = this[Le].head; n !== null; ) {
      const i = n.next;
      js(this, e, n, t), n = i;
    }
  }
  keys() {
    return this[Le].toArray().map((e) => e.key);
  }
  values() {
    return this[Le].toArray().map((e) => e.value);
  }
  reset() {
    this[At] && this[Le] && this[Le].length && this[Le].forEach((e) => this[At](e.key, e.value)), this[ft] = /* @__PURE__ */ new Map(), this[Le] = new W0(), this[Bt] = 0;
  }
  dump() {
    return this[Le].map((e) => pn(this, e) ? !1 : {
      k: e.key,
      v: e.value,
      e: e.now + (e.maxAge || 0)
    }).toArray().filter((e) => e);
  }
  dumpLru() {
    return this[Le];
  }
  set(e, t, n) {
    if (n = n || this[Zt], n && typeof n != "number")
      throw new TypeError("maxAge must be a number");
    const i = n ? Date.now() : 0, o = this[fr](t, e);
    if (this[ft].has(e)) {
      if (o > this[Xt])
        return yr(this, this[ft].get(e)), !1;
      const f = this[ft].get(e).value;
      return this[At] && (this[ks] || this[At](e, f.value)), f.now = i, f.maxAge = n, f.value = t, this[Bt] += o - f.length, f.length = o, this.get(e), Dr(this), !0;
    }
    const s = new K0(e, t, o, i, n);
    return s.length > this[Xt] ? (this[At] && this[At](e, t), !1) : (this[Bt] += s.length, this[Le].unshift(s), this[ft].set(e, this[Le].head), Dr(this), !0);
  }
  has(e) {
    if (!this[ft].has(e))
      return !1;
    const t = this[ft].get(e).value;
    return !pn(this, t);
  }
  get(e) {
    return ci(this, e, !0);
  }
  peek(e) {
    return ci(this, e, !1);
  }
  pop() {
    const e = this[Le].tail;
    return e ? (yr(this, e), e.value) : null;
  }
  del(e) {
    yr(this, this[ft].get(e));
  }
  load(e) {
    this.reset();
    const t = Date.now();
    for (let n = e.length - 1; n >= 0; n--) {
      const i = e[n], o = i.e || 0;
      if (o === 0)
        this.set(i.k, i.v);
      else {
        const s = o - t;
        s > 0 && this.set(i.k, i.v, s);
      }
    }
  }
  prune() {
    this[ft].forEach((e, t) => ci(this, t, !1));
  }
}
const ci = (r, e, t) => {
  const n = r[ft].get(e);
  if (n) {
    const i = n.value;
    if (pn(r, i)) {
      if (yr(r, n), !r[jr])
        return;
    } else
      t && (r[Yu] && (n.value.now = Date.now()), r[Le].unshiftNode(n));
    return i.value;
  }
}, pn = (r, e) => {
  if (!e || !e.maxAge && !r[Zt])
    return !1;
  const t = Date.now() - e.now;
  return e.maxAge ? t > e.maxAge : r[Zt] && t > r[Zt];
}, Dr = (r) => {
  if (r[Bt] > r[Xt])
    for (let e = r[Le].tail; r[Bt] > r[Xt] && e !== null; ) {
      const t = e.prev;
      yr(r, e), e = t;
    }
}, yr = (r, e) => {
  if (e) {
    const t = e.value;
    r[At] && r[At](t.key, t.value), r[Bt] -= t.length, r[ft].delete(t.key), r[Le].removeNode(e);
  }
};
class K0 {
  constructor(e, t, n, i, o) {
    this.key = e, this.value = t, this.length = n, this.now = i, this.maxAge = o || 0;
  }
}
const js = (r, e, t, n) => {
  let i = t.value;
  pn(r, i) && (yr(r, t), r[jr] || (i = void 0)), i && e.call(n, i.value, i.key, r);
};
var V0 = z0, Zu = {}, G0 = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Bn = function() {
  function r(e) {
    e === void 0 && (e = 0), this.iteratorType = e;
  }
  return r.prototype.equals = function(e) {
    return this.o === e.o;
  }, r;
}(), Cn = function() {
  function r() {
    this.M = 0;
  }
  return Object.defineProperty(r.prototype, "length", {
    get: function() {
      return this.M;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.size = function() {
    return this.M;
  }, r.prototype.empty = function() {
    return this.M === 0;
  }, r;
}(), Xo = function(r) {
  G0(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Cn), Q0 = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), J0 = function(r) {
  Q0(e, r);
  function e(t) {
    t === void 0 && (t = []);
    var n = r.call(this) || this;
    n.nt = [];
    var i = n;
    return t.forEach(function(o) {
      i.push(o);
    }), n;
  }
  return e.prototype.clear = function() {
    this.M = 0, this.nt = [];
  }, e.prototype.push = function(t) {
    return this.nt.push(t), this.M += 1, this.M;
  }, e.prototype.pop = function() {
    if (this.M !== 0)
      return this.M -= 1, this.nt.pop();
  }, e.prototype.top = function() {
    return this.nt[this.M - 1];
  }, e;
}(Cn);
const X0 = J0;
var Y0 = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Z0 = function(r) {
  Y0(e, r);
  function e(t) {
    t === void 0 && (t = []);
    var n = r.call(this) || this;
    n.A = 0, n.tt = [];
    var i = n;
    return t.forEach(function(o) {
      i.push(o);
    }), n;
  }
  return e.prototype.clear = function() {
    this.tt = [], this.M = this.A = 0;
  }, e.prototype.push = function(t) {
    var n = this.tt.length;
    if (this.A / n > 0.5 && this.A + this.M >= n && n > 4096) {
      for (var i = this.M, o = 0; o < i; ++o)
        this.tt[o] = this.tt[this.A + o];
      this.A = 0, this.tt[this.M] = t;
    } else
      this.tt[this.A + this.M] = t;
    return ++this.M;
  }, e.prototype.pop = function() {
    if (this.M !== 0) {
      var t = this.tt[this.A++];
      return this.M -= 1, t;
    }
  }, e.prototype.front = function() {
    if (this.M !== 0)
      return this.tt[this.A];
  }, e;
}(Cn);
const eh = Z0;
var th = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Us = function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = {
      error: a
    };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, Ls = function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}, rh = function(r) {
  th(e, r);
  function e(t, n, i) {
    t === void 0 && (t = []), n === void 0 && (n = function(u, c) {
      return u > c ? -1 : u < c ? 1 : 0;
    }), i === void 0 && (i = !0);
    var o = r.call(this) || this;
    if (o.$ = n, Array.isArray(t))
      o.ii = i ? Ls([], Us(t), !1) : t;
    else {
      o.ii = [];
      var s = o;
      t.forEach(function(u) {
        s.ii.push(u);
      });
    }
    o.M = o.ii.length;
    for (var a = o.M >> 1, f = o.M - 1 >> 1; f >= 0; --f)
      o.ri(f, a);
    return o;
  }
  return e.prototype.ti = function(t) {
    for (var n = this.ii[t]; t > 0; ) {
      var i = t - 1 >> 1, o = this.ii[i];
      if (this.$(o, n) <= 0)
        break;
      this.ii[t] = o, t = i;
    }
    this.ii[t] = n;
  }, e.prototype.ri = function(t, n) {
    for (var i = this.ii[t]; t < n; ) {
      var o = t << 1 | 1, s = o + 1, a = this.ii[o];
      if (s < this.M && this.$(a, this.ii[s]) > 0 && (o = s, a = this.ii[s]), this.$(a, i) >= 0)
        break;
      this.ii[t] = a, t = o;
    }
    this.ii[t] = i;
  }, e.prototype.clear = function() {
    this.M = 0, this.ii.length = 0;
  }, e.prototype.push = function(t) {
    this.ii.push(t), this.ti(this.M), this.M += 1;
  }, e.prototype.pop = function() {
    if (this.M !== 0) {
      var t = this.ii[0], n = this.ii.pop();
      return this.M -= 1, this.M && (this.ii[0] = n, this.ri(0, this.M >> 1)), t;
    }
  }, e.prototype.top = function() {
    return this.ii[0];
  }, e.prototype.find = function(t) {
    return this.ii.indexOf(t) >= 0;
  }, e.prototype.remove = function(t) {
    var n = this.ii.indexOf(t);
    return n < 0 ? !1 : (n === 0 ? this.pop() : n === this.M - 1 ? (this.ii.pop(), this.M -= 1) : (this.ii.splice(n, 1, this.ii.pop()), this.M -= 1, this.ti(n), this.ri(n, this.M >> 1)), !0);
  }, e.prototype.updateItem = function(t) {
    var n = this.ii.indexOf(t);
    return n < 0 ? !1 : (this.ti(n), this.ri(n, this.M >> 1), !0);
  }, e.prototype.toArray = function() {
    return Ls([], Us(this.ii), !1);
  }, e;
}(Cn);
const nh = rh;
var ih = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), oh = function(r) {
  ih(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Xo);
const Yo = oh;
function De() {
  throw new RangeError("Iterator access denied!");
}
var sh = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), ef = function(r) {
  sh(e, r);
  function e(t, n) {
    var i = r.call(this, n) || this;
    return i.o = t, i.iteratorType === 0 ? (i.pre = function() {
      return this.o === 0 && De(), this.o -= 1, this;
    }, i.next = function() {
      return this.o === this.container.size() && De(), this.o += 1, this;
    }) : (i.pre = function() {
      return this.o === this.container.size() - 1 && De(), this.o += 1, this;
    }, i.next = function() {
      return this.o === -1 && De(), this.o -= 1, this;
    }), i;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      return this.container.getElementByPos(this.o);
    },
    set: function(t) {
      this.container.setElementByPos(this.o, t);
    },
    enumerable: !1,
    configurable: !0
  }), e;
}(Bn), tf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), ah = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, qs = function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = {
      error: a
    };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, Hs = function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}, uh = function(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), {
          value: r && r[n++],
          done: !r
        };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Fr = function(r) {
  tf(e, r);
  function e(t, n, i) {
    var o = r.call(this, t, i) || this;
    return o.container = n, o;
  }
  return e.prototype.copy = function() {
    return new e(this.o, this.container, this.iteratorType);
  }, e;
}(ef), fh = function(r) {
  tf(e, r);
  function e(t, n) {
    t === void 0 && (t = []), n === void 0 && (n = !0);
    var i = r.call(this) || this;
    if (Array.isArray(t))
      i.J = n ? Hs([], qs(t), !1) : t, i.M = t.length;
    else {
      i.J = [];
      var o = i;
      t.forEach(function(s) {
        o.pushBack(s);
      });
    }
    return i;
  }
  return e.prototype.clear = function() {
    this.M = 0, this.J.length = 0;
  }, e.prototype.begin = function() {
    return new Fr(0, this);
  }, e.prototype.end = function() {
    return new Fr(this.M, this);
  }, e.prototype.rBegin = function() {
    return new Fr(this.M - 1, this, 1);
  }, e.prototype.rEnd = function() {
    return new Fr(-1, this, 1);
  }, e.prototype.front = function() {
    return this.J[0];
  }, e.prototype.back = function() {
    return this.J[this.M - 1];
  }, e.prototype.getElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    return this.J[t];
  }, e.prototype.eraseElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    return this.J.splice(t, 1), this.M -= 1, this.M;
  }, e.prototype.eraseElementByValue = function(t) {
    for (var n = 0, i = 0; i < this.M; ++i)
      this.J[i] !== t && (this.J[n++] = this.J[i]);
    return this.M = this.J.length = n, this.M;
  }, e.prototype.eraseElementByIterator = function(t) {
    var n = t.o;
    return t = t.next(), this.eraseElementByPos(n), t;
  }, e.prototype.pushBack = function(t) {
    return this.J.push(t), this.M += 1, this.M;
  }, e.prototype.popBack = function() {
    if (this.M !== 0)
      return this.M -= 1, this.J.pop();
  }, e.prototype.setElementByPos = function(t, n) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    this.J[t] = n;
  }, e.prototype.insert = function(t, n, i) {
    var o;
    if (i === void 0 && (i = 1), t < 0 || t > this.M)
      throw new RangeError();
    return (o = this.J).splice.apply(o, Hs([t, 0], qs(new Array(i).fill(n)), !1)), this.M += i, this.M;
  }, e.prototype.find = function(t) {
    for (var n = 0; n < this.M; ++n)
      if (this.J[n] === t)
        return new Fr(n, this);
    return this.end();
  }, e.prototype.reverse = function() {
    this.J.reverse();
  }, e.prototype.unique = function() {
    for (var t = 1, n = 1; n < this.M; ++n)
      this.J[n] !== this.J[n - 1] && (this.J[t++] = this.J[n]);
    return this.M = this.J.length = t, this.M;
  }, e.prototype.sort = function(t) {
    this.J.sort(t);
  }, e.prototype.forEach = function(t) {
    for (var n = 0; n < this.M; ++n)
      t(this.J[n], n, this);
  }, e.prototype[Symbol.iterator] = function() {
    return (function() {
      return ah(this, function(t) {
        switch (t.label) {
          case 0:
            return [5, uh(this.J)];
          case 1:
            return t.sent(), [2];
        }
      });
    }).bind(this)();
  }, e;
}(Yo);
const ch = fh;
var rf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), lh = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, Or = function(r) {
  rf(e, r);
  function e(t, n, i, o) {
    var s = r.call(this, o) || this;
    return s.o = t, s.h = n, s.container = i, s.iteratorType === 0 ? (s.pre = function() {
      return this.o.L === this.h && De(), this.o = this.o.L, this;
    }, s.next = function() {
      return this.o === this.h && De(), this.o = this.o.m, this;
    }) : (s.pre = function() {
      return this.o.m === this.h && De(), this.o = this.o.m, this;
    }, s.next = function() {
      return this.o === this.h && De(), this.o = this.o.L, this;
    }), s;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      return this.o === this.h && De(), this.o.p;
    },
    set: function(t) {
      this.o === this.h && De(), this.o.p = t;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.copy = function() {
    return new e(this.o, this.h, this.container, this.iteratorType);
  }, e;
}(Bn), hh = function(r) {
  rf(e, r);
  function e(t) {
    t === void 0 && (t = []);
    var n = r.call(this) || this;
    n.h = {}, n.H = n.l = n.h.L = n.h.m = n.h;
    var i = n;
    return t.forEach(function(o) {
      i.pushBack(o);
    }), n;
  }
  return e.prototype.G = function(t) {
    var n = t.L, i = t.m;
    n.m = i, i.L = n, t === this.H && (this.H = i), t === this.l && (this.l = n), this.M -= 1;
  }, e.prototype.F = function(t, n) {
    var i = n.m, o = {
      p: t,
      L: n,
      m: i
    };
    n.m = o, i.L = o, n === this.h && (this.H = o), i === this.h && (this.l = o), this.M += 1;
  }, e.prototype.clear = function() {
    this.M = 0, this.H = this.l = this.h.L = this.h.m = this.h;
  }, e.prototype.begin = function() {
    return new Or(this.H, this.h, this);
  }, e.prototype.end = function() {
    return new Or(this.h, this.h, this);
  }, e.prototype.rBegin = function() {
    return new Or(this.l, this.h, this, 1);
  }, e.prototype.rEnd = function() {
    return new Or(this.h, this.h, this, 1);
  }, e.prototype.front = function() {
    return this.H.p;
  }, e.prototype.back = function() {
    return this.l.p;
  }, e.prototype.getElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var n = this.H; t--; )
      n = n.m;
    return n.p;
  }, e.prototype.eraseElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var n = this.H; t--; )
      n = n.m;
    return this.G(n), this.M;
  }, e.prototype.eraseElementByValue = function(t) {
    for (var n = this.H; n !== this.h; )
      n.p === t && this.G(n), n = n.m;
    return this.M;
  }, e.prototype.eraseElementByIterator = function(t) {
    var n = t.o;
    return n === this.h && De(), t = t.next(), this.G(n), t;
  }, e.prototype.pushBack = function(t) {
    return this.F(t, this.l), this.M;
  }, e.prototype.popBack = function() {
    if (this.M !== 0) {
      var t = this.l.p;
      return this.G(this.l), t;
    }
  }, e.prototype.pushFront = function(t) {
    return this.F(t, this.h), this.M;
  }, e.prototype.popFront = function() {
    if (this.M !== 0) {
      var t = this.H.p;
      return this.G(this.H), t;
    }
  }, e.prototype.setElementByPos = function(t, n) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var i = this.H; t--; )
      i = i.m;
    i.p = n;
  }, e.prototype.insert = function(t, n, i) {
    if (i === void 0 && (i = 1), t < 0 || t > this.M)
      throw new RangeError();
    if (i <= 0)
      return this.M;
    if (t === 0)
      for (; i--; )
        this.pushFront(n);
    else if (t === this.M)
      for (; i--; )
        this.pushBack(n);
    else {
      for (var o = this.H, s = 1; s < t; ++s)
        o = o.m;
      var a = o.m;
      for (this.M += i; i--; )
        o.m = {
          p: n,
          L: o
        }, o.m.L = o, o = o.m;
      o.m = a, a.L = o;
    }
    return this.M;
  }, e.prototype.find = function(t) {
    for (var n = this.H; n !== this.h; ) {
      if (n.p === t)
        return new Or(n, this.h, this);
      n = n.m;
    }
    return this.end();
  }, e.prototype.reverse = function() {
    if (!(this.M <= 1))
      for (var t = this.H, n = this.l, i = 0; i << 1 < this.M; ) {
        var o = t.p;
        t.p = n.p, n.p = o, t = t.m, n = n.L, i += 1;
      }
  }, e.prototype.unique = function() {
    if (this.M <= 1)
      return this.M;
    for (var t = this.H; t !== this.h; ) {
      for (var n = t; n.m !== this.h && n.p === n.m.p; )
        n = n.m, this.M -= 1;
      t.m = n.m, t.m.L = t, t = t.m;
    }
    return this.M;
  }, e.prototype.sort = function(t) {
    if (!(this.M <= 1)) {
      var n = [];
      this.forEach(function(o) {
        n.push(o);
      }), n.sort(t);
      var i = this.H;
      n.forEach(function(o) {
        i.p = o, i = i.m;
      });
    }
  }, e.prototype.merge = function(t) {
    var n = this;
    if (this.M === 0)
      t.forEach(function(o) {
        n.pushBack(o);
      });
    else {
      var i = this.H;
      t.forEach(function(o) {
        for (; i !== n.h && i.p <= o; )
          i = i.m;
        n.F(o, i.L);
      });
    }
    return this.M;
  }, e.prototype.forEach = function(t) {
    for (var n = this.H, i = 0; n !== this.h; )
      t(n.p, i++, this), n = n.m;
  }, e.prototype[Symbol.iterator] = function() {
    return (function() {
      var t;
      return lh(this, function(n) {
        switch (n.label) {
          case 0:
            if (this.M === 0)
              return [2];
            t = this.H, n.label = 1;
          case 1:
            return t === this.h ? [3, 3] : [4, t.p];
          case 2:
            return n.sent(), t = t.m, [3, 1];
          case 3:
            return [2];
        }
      });
    }).bind(this)();
  }, e;
}(Yo);
const dh = hh;
var nf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), ph = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, _h = function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = {
      error: a
    };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, vh = function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}, Mr = function(r) {
  nf(e, r);
  function e(t, n, i) {
    var o = r.call(this, t, i) || this;
    return o.container = n, o;
  }
  return e.prototype.copy = function() {
    return new e(this.o, this.container, this.iteratorType);
  }, e;
}(ef), yh = function(r) {
  nf(e, r);
  function e(t, n) {
    t === void 0 && (t = []), n === void 0 && (n = 4096);
    var i = r.call(this) || this;
    i.A = 0, i.S = 0, i.R = 0, i.k = 0, i.C = 0, i.j = [];
    var o = function() {
      if (typeof t.length == "number")
        return t.length;
      if (typeof t.size == "number")
        return t.size;
      if (typeof t.size == "function")
        return t.size();
      throw new TypeError("Cannot get the length or size of the container");
    }();
    i.B = n, i.C = Math.max(Math.ceil(o / i.B), 1);
    for (var s = 0; s < i.C; ++s)
      i.j.push(new Array(i.B));
    var a = Math.ceil(o / i.B);
    i.A = i.R = (i.C >> 1) - (a >> 1), i.S = i.k = i.B - o % i.B >> 1;
    var f = i;
    return t.forEach(function(u) {
      f.pushBack(u);
    }), i;
  }
  return e.prototype.O = function() {
    for (var t = [], n = Math.max(this.C >> 1, 1), i = 0; i < n; ++i)
      t[i] = new Array(this.B);
    for (var i = this.A; i < this.C; ++i)
      t[t.length] = this.j[i];
    for (var i = 0; i < this.R; ++i)
      t[t.length] = this.j[i];
    t[t.length] = vh([], _h(this.j[this.R]), !1), this.A = n, this.R = t.length - 1;
    for (var i = 0; i < n; ++i)
      t[t.length] = new Array(this.B);
    this.j = t, this.C = t.length;
  }, e.prototype.T = function(t) {
    var n = this.S + t + 1, i = n % this.B, o = i - 1, s = this.A + (n - i) / this.B;
    return i === 0 && (s -= 1), s %= this.C, o < 0 && (o += this.B), {
      curNodeBucketIndex: s,
      curNodePointerIndex: o
    };
  }, e.prototype.clear = function() {
    this.j = [new Array(this.B)], this.C = 1, this.A = this.R = this.M = 0, this.S = this.k = this.B >> 1;
  }, e.prototype.begin = function() {
    return new Mr(0, this);
  }, e.prototype.end = function() {
    return new Mr(this.M, this);
  }, e.prototype.rBegin = function() {
    return new Mr(this.M - 1, this, 1);
  }, e.prototype.rEnd = function() {
    return new Mr(-1, this, 1);
  }, e.prototype.front = function() {
    if (this.M !== 0)
      return this.j[this.A][this.S];
  }, e.prototype.back = function() {
    if (this.M !== 0)
      return this.j[this.R][this.k];
  }, e.prototype.pushBack = function(t) {
    return this.M && (this.k < this.B - 1 ? this.k += 1 : this.R < this.C - 1 ? (this.R += 1, this.k = 0) : (this.R = 0, this.k = 0), this.R === this.A && this.k === this.S && this.O()), this.M += 1, this.j[this.R][this.k] = t, this.M;
  }, e.prototype.popBack = function() {
    if (this.M !== 0) {
      var t = this.j[this.R][this.k];
      return this.M !== 1 && (this.k > 0 ? this.k -= 1 : this.R > 0 ? (this.R -= 1, this.k = this.B - 1) : (this.R = this.C - 1, this.k = this.B - 1)), this.M -= 1, t;
    }
  }, e.prototype.pushFront = function(t) {
    return this.M && (this.S > 0 ? this.S -= 1 : this.A > 0 ? (this.A -= 1, this.S = this.B - 1) : (this.A = this.C - 1, this.S = this.B - 1), this.A === this.R && this.S === this.k && this.O()), this.M += 1, this.j[this.A][this.S] = t, this.M;
  }, e.prototype.popFront = function() {
    if (this.M !== 0) {
      var t = this.j[this.A][this.S];
      return this.M !== 1 && (this.S < this.B - 1 ? this.S += 1 : this.A < this.C - 1 ? (this.A += 1, this.S = 0) : (this.A = 0, this.S = 0)), this.M -= 1, t;
    }
  }, e.prototype.getElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    var n = this.T(t), i = n.curNodeBucketIndex, o = n.curNodePointerIndex;
    return this.j[i][o];
  }, e.prototype.setElementByPos = function(t, n) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    var i = this.T(t), o = i.curNodeBucketIndex, s = i.curNodePointerIndex;
    this.j[o][s] = n;
  }, e.prototype.insert = function(t, n, i) {
    if (i === void 0 && (i = 1), t < 0 || t > this.M)
      throw new RangeError();
    if (t === 0)
      for (; i--; )
        this.pushFront(n);
    else if (t === this.M)
      for (; i--; )
        this.pushBack(n);
    else {
      for (var o = [], s = t; s < this.M; ++s)
        o.push(this.getElementByPos(s));
      this.cut(t - 1);
      for (var s = 0; s < i; ++s)
        this.pushBack(n);
      for (var s = 0; s < o.length; ++s)
        this.pushBack(o[s]);
    }
    return this.M;
  }, e.prototype.cut = function(t) {
    if (t < 0)
      return this.clear(), 0;
    var n = this.T(t), i = n.curNodeBucketIndex, o = n.curNodePointerIndex;
    return this.R = i, this.k = o, this.M = t + 1, this.M;
  }, e.prototype.eraseElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    if (t === 0)
      this.popFront();
    else if (t === this.M - 1)
      this.popBack();
    else {
      for (var n = [], i = t + 1; i < this.M; ++i)
        n.push(this.getElementByPos(i));
      this.cut(t), this.popBack();
      var o = this;
      n.forEach(function(s) {
        o.pushBack(s);
      });
    }
    return this.M;
  }, e.prototype.eraseElementByValue = function(t) {
    if (this.M === 0)
      return 0;
    for (var n = [], i = 0; i < this.M; ++i) {
      var o = this.getElementByPos(i);
      o !== t && n.push(o);
    }
    for (var s = n.length, i = 0; i < s; ++i)
      this.setElementByPos(i, n[i]);
    return this.cut(s - 1);
  }, e.prototype.eraseElementByIterator = function(t) {
    var n = t.o;
    return this.eraseElementByPos(n), t = t.next(), t;
  }, e.prototype.find = function(t) {
    for (var n = 0; n < this.M; ++n)
      if (this.getElementByPos(n) === t)
        return new Mr(n, this);
    return this.end();
  }, e.prototype.reverse = function() {
    for (var t = 0, n = this.M - 1; t < n; ) {
      var i = this.getElementByPos(t);
      this.setElementByPos(t, this.getElementByPos(n)), this.setElementByPos(n, i), t += 1, n -= 1;
    }
  }, e.prototype.unique = function() {
    if (this.M <= 1)
      return this.M;
    for (var t = 1, n = this.getElementByPos(0), i = 1; i < this.M; ++i) {
      var o = this.getElementByPos(i);
      o !== n && (n = o, this.setElementByPos(t++, o));
    }
    for (; this.M > t; )
      this.popBack();
    return this.M;
  }, e.prototype.sort = function(t) {
    for (var n = [], i = 0; i < this.M; ++i)
      n.push(this.getElementByPos(i));
    n.sort(t);
    for (var i = 0; i < this.M; ++i)
      this.setElementByPos(i, n[i]);
  }, e.prototype.shrinkToFit = function() {
    if (this.M !== 0) {
      var t = [];
      this.forEach(function(i) {
        t.push(i);
      }), this.C = Math.max(Math.ceil(this.M / this.B), 1), this.M = this.A = this.R = this.S = this.k = 0, this.j = [];
      for (var n = 0; n < this.C; ++n)
        this.j.push(new Array(this.B));
      for (var n = 0; n < t.length; ++n)
        this.pushBack(t[n]);
    }
  }, e.prototype.forEach = function(t) {
    for (var n = 0; n < this.M; ++n)
      t(this.getElementByPos(n), n, this);
  }, e.prototype[Symbol.iterator] = function() {
    return (function() {
      var t;
      return ph(this, function(n) {
        switch (n.label) {
          case 0:
            t = 0, n.label = 1;
          case 1:
            return t < this.M ? [4, this.getElementByPos(t)] : [3, 4];
          case 2:
            n.sent(), n.label = 3;
          case 3:
            return ++t, [3, 1];
          case 4:
            return [2];
        }
      });
    }).bind(this)();
  }, e;
}(Yo);
const xh = yh;
var gh = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), of = function() {
  function r(e, t) {
    this.ee = 1, this.u = void 0, this.p = void 0, this.K = void 0, this.N = void 0, this.rr = void 0, this.u = e, this.p = t;
  }
  return r.prototype.L = function() {
    var e = this;
    if (e.ee === 1 && e.rr.rr === e)
      e = e.N;
    else if (e.K)
      for (e = e.K; e.N; )
        e = e.N;
    else {
      for (var t = e.rr; t.K === e; )
        e = t, t = e.rr;
      e = t;
    }
    return e;
  }, r.prototype.m = function() {
    var e = this;
    if (e.N) {
      for (e = e.N; e.K; )
        e = e.K;
      return e;
    } else {
      for (var t = e.rr; t.N === e; )
        e = t, t = e.rr;
      return e.N !== t ? t : e;
    }
  }, r.prototype.ne = function() {
    var e = this.rr, t = this.N, n = t.K;
    return e.rr === this ? e.rr = t : e.K === this ? e.K = t : e.N = t, t.rr = e, t.K = this, this.rr = t, this.N = n, n && (n.rr = this), t;
  }, r.prototype.te = function() {
    var e = this.rr, t = this.K, n = t.N;
    return e.rr === this ? e.rr = t : e.K === this ? e.K = t : e.N = t, t.rr = e, t.N = this, this.rr = t, this.K = n, n && (n.rr = this), t;
  }, r;
}(), bh = function(r) {
  gh(e, r);
  function e() {
    var t = r !== null && r.apply(this, arguments) || this;
    return t.tr = 1, t;
  }
  return e.prototype.ne = function() {
    var t = r.prototype.ne.call(this);
    return this.ie(), t.ie(), t;
  }, e.prototype.te = function() {
    var t = r.prototype.te.call(this);
    return this.ie(), t.ie(), t;
  }, e.prototype.ie = function() {
    this.tr = 1, this.K && (this.tr += this.K.tr), this.N && (this.tr += this.N.tr);
  }, e;
}(of), wh = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), $s = function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = {
      error: a
    };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, Ws = function(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), {
          value: r && r[n++],
          done: !r
        };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, mh = function(r) {
  wh(e, r);
  function e(t, n) {
    t === void 0 && (t = function(o, s) {
      return o < s ? -1 : o > s ? 1 : 0;
    }), n === void 0 && (n = !1);
    var i = r.call(this) || this;
    return i.W = void 0, i.$ = t, n ? (i.re = bh, i.v = function(o, s, a) {
      var f = this.se(o, s, a);
      if (f) {
        for (var u = f.rr; u !== this.h; )
          u.tr += 1, u = u.rr;
        var c = this.fe(f);
        if (c) {
          var h = c, y = h.parentNode, T = h.grandParent, A = h.curNode;
          y.ie(), T.ie(), A.ie();
        }
      }
      return this.M;
    }, i.G = function(o) {
      for (var s = this.he(o); s !== this.h; )
        s.tr -= 1, s = s.rr;
    }) : (i.re = of, i.v = function(o, s, a) {
      var f = this.se(o, s, a);
      return f && this.fe(f), this.M;
    }, i.G = i.he), i.h = new i.re(), i;
  }
  return e.prototype.U = function(t, n) {
    for (var i = this.h; t; ) {
      var o = this.$(t.u, n);
      if (o < 0)
        t = t.N;
      else if (o > 0)
        i = t, t = t.K;
      else
        return t;
    }
    return i;
  }, e.prototype.X = function(t, n) {
    for (var i = this.h; t; ) {
      var o = this.$(t.u, n);
      o <= 0 ? t = t.N : (i = t, t = t.K);
    }
    return i;
  }, e.prototype.Y = function(t, n) {
    for (var i = this.h; t; ) {
      var o = this.$(t.u, n);
      if (o < 0)
        i = t, t = t.N;
      else if (o > 0)
        t = t.K;
      else
        return t;
    }
    return i;
  }, e.prototype.Z = function(t, n) {
    for (var i = this.h; t; ) {
      var o = this.$(t.u, n);
      o < 0 ? (i = t, t = t.N) : t = t.K;
    }
    return i;
  }, e.prototype.ue = function(t) {
    for (; ; ) {
      var n = t.rr;
      if (n === this.h)
        return;
      if (t.ee === 1) {
        t.ee = 0;
        return;
      }
      if (t === n.K) {
        var i = n.N;
        if (i.ee === 1)
          i.ee = 0, n.ee = 1, n === this.W ? this.W = n.ne() : n.ne();
        else if (i.N && i.N.ee === 1) {
          i.ee = n.ee, n.ee = 0, i.N.ee = 0, n === this.W ? this.W = n.ne() : n.ne();
          return;
        } else
          i.K && i.K.ee === 1 ? (i.ee = 1, i.K.ee = 0, i.te()) : (i.ee = 1, t = n);
      } else {
        var i = n.K;
        if (i.ee === 1)
          i.ee = 0, n.ee = 1, n === this.W ? this.W = n.te() : n.te();
        else if (i.K && i.K.ee === 1) {
          i.ee = n.ee, n.ee = 0, i.K.ee = 0, n === this.W ? this.W = n.te() : n.te();
          return;
        } else
          i.N && i.N.ee === 1 ? (i.ee = 1, i.N.ee = 0, i.ne()) : (i.ee = 1, t = n);
      }
    }
  }, e.prototype.he = function(t) {
    var n, i;
    if (this.M === 1)
      return this.clear(), this.h;
    for (var o = t; o.K || o.N; ) {
      if (o.N)
        for (o = o.N; o.K; )
          o = o.K;
      else
        o = o.K;
      n = $s([o.u, t.u], 2), t.u = n[0], o.u = n[1], i = $s([o.p, t.p], 2), t.p = i[0], o.p = i[1], t = o;
    }
    this.h.K === o ? this.h.K = o.rr : this.h.N === o && (this.h.N = o.rr), this.ue(o);
    var s = o.rr;
    return o === s.K ? s.K = void 0 : s.N = void 0, this.M -= 1, this.W.ee = 0, s;
  }, e.prototype.ae = function(t, n) {
    if (t === void 0)
      return !1;
    var i = this.ae(t.K, n);
    return i || n(t) ? !0 : this.ae(t.N, n);
  }, e.prototype.fe = function(t) {
    for (; ; ) {
      var n = t.rr;
      if (n.ee === 0)
        return;
      var i = n.rr;
      if (n === i.K) {
        var o = i.N;
        if (o && o.ee === 1) {
          if (o.ee = n.ee = 0, i === this.W)
            return;
          i.ee = 1, t = i;
          continue;
        } else if (t === n.N) {
          if (t.ee = 0, t.K && (t.K.rr = n), t.N && (t.N.rr = i), n.N = t.K, i.K = t.N, t.K = n, t.N = i, i === this.W)
            this.W = t, this.h.rr = t;
          else {
            var s = i.rr;
            s.K === i ? s.K = t : s.N = t;
          }
          return t.rr = i.rr, n.rr = t, i.rr = t, i.ee = 1, {
            parentNode: n,
            grandParent: i,
            curNode: t
          };
        } else
          n.ee = 0, i === this.W ? this.W = i.te() : i.te(), i.ee = 1;
      } else {
        var o = i.K;
        if (o && o.ee === 1) {
          if (o.ee = n.ee = 0, i === this.W)
            return;
          i.ee = 1, t = i;
          continue;
        } else if (t === n.K) {
          if (t.ee = 0, t.K && (t.K.rr = i), t.N && (t.N.rr = n), i.N = t.K, n.K = t.N, t.K = i, t.N = n, i === this.W)
            this.W = t, this.h.rr = t;
          else {
            var s = i.rr;
            s.K === i ? s.K = t : s.N = t;
          }
          return t.rr = i.rr, n.rr = t, i.rr = t, i.ee = 1, {
            parentNode: n,
            grandParent: i,
            curNode: t
          };
        } else
          n.ee = 0, i === this.W ? this.W = i.ne() : i.ne(), i.ee = 1;
      }
      return;
    }
  }, e.prototype.se = function(t, n, i) {
    if (this.W === void 0) {
      this.M += 1, this.W = new this.re(t, n), this.W.ee = 0, this.W.rr = this.h, this.h.rr = this.W, this.h.K = this.W, this.h.N = this.W;
      return;
    }
    var o, s = this.h.K, a = this.$(s.u, t);
    if (a === 0) {
      s.p = n;
      return;
    } else if (a > 0)
      s.K = new this.re(t, n), s.K.rr = s, o = s.K, this.h.K = o;
    else {
      var f = this.h.N, u = this.$(f.u, t);
      if (u === 0) {
        f.p = n;
        return;
      } else if (u < 0)
        f.N = new this.re(t, n), f.N.rr = f, o = f.N, this.h.N = o;
      else {
        if (i !== void 0) {
          var c = i.o;
          if (c !== this.h) {
            var h = this.$(c.u, t);
            if (h === 0) {
              c.p = n;
              return;
            } else if (h > 0) {
              var y = c.L(), T = this.$(y.u, t);
              if (T === 0) {
                y.p = n;
                return;
              } else
                T < 0 && (o = new this.re(t, n), y.N === void 0 ? (y.N = o, o.rr = y) : (c.K = o, o.rr = c));
            }
          }
        }
        if (o === void 0)
          for (o = this.W; ; ) {
            var A = this.$(o.u, t);
            if (A > 0) {
              if (o.K === void 0) {
                o.K = new this.re(t, n), o.K.rr = o, o = o.K;
                break;
              }
              o = o.K;
            } else if (A < 0) {
              if (o.N === void 0) {
                o.N = new this.re(t, n), o.N.rr = o, o = o.N;
                break;
              }
              o = o.N;
            } else {
              o.p = n;
              return;
            }
          }
      }
    }
    return this.M += 1, o;
  }, e.prototype.g = function(t, n) {
    for (; t; ) {
      var i = this.$(t.u, n);
      if (i < 0)
        t = t.N;
      else if (i > 0)
        t = t.K;
      else
        return t;
    }
    return t || this.h;
  }, e.prototype.clear = function() {
    this.M = 0, this.W = void 0, this.h.rr = void 0, this.h.K = this.h.N = void 0;
  }, e.prototype.updateKeyByIterator = function(t, n) {
    var i = t.o;
    if (i === this.h && De(), this.M === 1)
      return i.u = n, !0;
    if (i === this.h.K)
      return this.$(i.m().u, n) > 0 ? (i.u = n, !0) : !1;
    if (i === this.h.N)
      return this.$(i.L().u, n) < 0 ? (i.u = n, !0) : !1;
    var o = i.L().u;
    if (this.$(o, n) >= 0)
      return !1;
    var s = i.m().u;
    return this.$(s, n) <= 0 ? !1 : (i.u = n, !0);
  }, e.prototype.eraseElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    var n = 0, i = this;
    return this.ae(this.W, function(o) {
      return t === n ? (i.G(o), !0) : (n += 1, !1);
    }), this.M;
  }, e.prototype.eraseElementByKey = function(t) {
    if (this.M === 0)
      return !1;
    var n = this.g(this.W, t);
    return n === this.h ? !1 : (this.G(n), !0);
  }, e.prototype.eraseElementByIterator = function(t) {
    var n = t.o;
    n === this.h && De();
    var i = n.N === void 0, o = t.iteratorType === 0;
    return o ? i && t.next() : (!i || n.K === void 0) && t.next(), this.G(n), t;
  }, e.prototype.forEach = function(t) {
    var n, i, o = 0;
    try {
      for (var s = Ws(this), a = s.next(); !a.done; a = s.next()) {
        var f = a.value;
        t(f, o++, this);
      }
    } catch (u) {
      n = {
        error: u
      };
    } finally {
      try {
        a && !a.done && (i = s.return) && i.call(s);
      } finally {
        if (n)
          throw n.error;
      }
    }
  }, e.prototype.getElementByPos = function(t) {
    var n, i;
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    var o, s = 0;
    try {
      for (var a = Ws(this), f = a.next(); !f.done; f = a.next()) {
        var u = f.value;
        if (s === t) {
          o = u;
          break;
        }
        s += 1;
      }
    } catch (c) {
      n = {
        error: c
      };
    } finally {
      try {
        f && !f.done && (i = a.return) && i.call(a);
      } finally {
        if (n)
          throw n.error;
      }
    }
    return o;
  }, e.prototype.getHeight = function() {
    if (this.M === 0)
      return 0;
    var t = function(n) {
      return n ? Math.max(t(n.K), t(n.N)) + 1 : 0;
    };
    return t(this.W);
  }, e;
}(Xo);
const sf = mh;
var Eh = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Sh = function(r) {
  Eh(e, r);
  function e(t, n, i) {
    var o = r.call(this, i) || this;
    return o.o = t, o.h = n, o.iteratorType === 0 ? (o.pre = function() {
      return this.o === this.h.K && De(), this.o = this.o.L(), this;
    }, o.next = function() {
      return this.o === this.h && De(), this.o = this.o.m(), this;
    }) : (o.pre = function() {
      return this.o === this.h.N && De(), this.o = this.o.m(), this;
    }, o.next = function() {
      return this.o === this.h && De(), this.o = this.o.L(), this;
    }), o;
  }
  return Object.defineProperty(e.prototype, "index", {
    get: function() {
      var t = this.o, n = this.h.rr;
      if (t === this.h)
        return n ? n.tr - 1 : 0;
      var i = 0;
      for (t.K && (i += t.K.tr); t !== n; ) {
        var o = t.rr;
        t === o.N && (i += 1, o.K && (i += o.K.tr)), t = o;
      }
      return i;
    },
    enumerable: !1,
    configurable: !0
  }), e;
}(Bn);
const af = Sh;
var uf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Ah = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, zs = function(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), {
          value: r && r[n++],
          done: !r
        };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, mt = function(r) {
  uf(e, r);
  function e(t, n, i, o) {
    var s = r.call(this, t, n, o) || this;
    return s.container = i, s;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      return this.o === this.h && De(), this.o.u;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.copy = function() {
    return new e(this.o, this.h, this.container, this.iteratorType);
  }, e;
}(af), Bh = function(r) {
  uf(e, r);
  function e(t, n, i) {
    t === void 0 && (t = []);
    var o = r.call(this, n, i) || this, s = o;
    return t.forEach(function(a) {
      s.insert(a);
    }), o;
  }
  return e.prototype.P = function(t) {
    return Ah(this, function(n) {
      switch (n.label) {
        case 0:
          return t === void 0 ? [2] : [5, zs(this.P(t.K))];
        case 1:
          return n.sent(), [4, t.u];
        case 2:
          return n.sent(), [5, zs(this.P(t.N))];
        case 3:
          return n.sent(), [2];
      }
    });
  }, e.prototype.begin = function() {
    return new mt(this.h.K || this.h, this.h, this);
  }, e.prototype.end = function() {
    return new mt(this.h, this.h, this);
  }, e.prototype.rBegin = function() {
    return new mt(this.h.N || this.h, this.h, this, 1);
  }, e.prototype.rEnd = function() {
    return new mt(this.h, this.h, this, 1);
  }, e.prototype.front = function() {
    return this.h.K ? this.h.K.u : void 0;
  }, e.prototype.back = function() {
    return this.h.N ? this.h.N.u : void 0;
  }, e.prototype.insert = function(t, n) {
    return this.v(t, void 0, n);
  }, e.prototype.find = function(t) {
    var n = this.g(this.W, t);
    return new mt(n, this.h, this);
  }, e.prototype.lowerBound = function(t) {
    var n = this.U(this.W, t);
    return new mt(n, this.h, this);
  }, e.prototype.upperBound = function(t) {
    var n = this.X(this.W, t);
    return new mt(n, this.h, this);
  }, e.prototype.reverseLowerBound = function(t) {
    var n = this.Y(this.W, t);
    return new mt(n, this.h, this);
  }, e.prototype.reverseUpperBound = function(t) {
    var n = this.Z(this.W, t);
    return new mt(n, this.h, this);
  }, e.prototype.union = function(t) {
    var n = this;
    return t.forEach(function(i) {
      n.insert(i);
    }), this.M;
  }, e.prototype[Symbol.iterator] = function() {
    return this.P(this.W);
  }, e;
}(sf);
const Ch = Bh;
var ff = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Th = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, Ks = function(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), {
          value: r && r[n++],
          done: !r
        };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, Et = function(r) {
  ff(e, r);
  function e(t, n, i, o) {
    var s = r.call(this, t, n, o) || this;
    return s.container = i, s;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      this.o === this.h && De();
      var t = this;
      return new Proxy([], {
        get: function(n, i) {
          if (i === "0")
            return t.o.u;
          if (i === "1")
            return t.o.p;
        },
        set: function(n, i, o) {
          if (i !== "1")
            throw new TypeError("props must be 1");
          return t.o.p = o, !0;
        }
      });
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.copy = function() {
    return new e(this.o, this.h, this.container, this.iteratorType);
  }, e;
}(af), Dh = function(r) {
  ff(e, r);
  function e(t, n, i) {
    t === void 0 && (t = []);
    var o = r.call(this, n, i) || this, s = o;
    return t.forEach(function(a) {
      s.setElement(a[0], a[1]);
    }), o;
  }
  return e.prototype.P = function(t) {
    return Th(this, function(n) {
      switch (n.label) {
        case 0:
          return t === void 0 ? [2] : [5, Ks(this.P(t.K))];
        case 1:
          return n.sent(), [4, [t.u, t.p]];
        case 2:
          return n.sent(), [5, Ks(this.P(t.N))];
        case 3:
          return n.sent(), [2];
      }
    });
  }, e.prototype.begin = function() {
    return new Et(this.h.K || this.h, this.h, this);
  }, e.prototype.end = function() {
    return new Et(this.h, this.h, this);
  }, e.prototype.rBegin = function() {
    return new Et(this.h.N || this.h, this.h, this, 1);
  }, e.prototype.rEnd = function() {
    return new Et(this.h, this.h, this, 1);
  }, e.prototype.front = function() {
    if (this.M !== 0) {
      var t = this.h.K;
      return [t.u, t.p];
    }
  }, e.prototype.back = function() {
    if (this.M !== 0) {
      var t = this.h.N;
      return [t.u, t.p];
    }
  }, e.prototype.lowerBound = function(t) {
    var n = this.U(this.W, t);
    return new Et(n, this.h, this);
  }, e.prototype.upperBound = function(t) {
    var n = this.X(this.W, t);
    return new Et(n, this.h, this);
  }, e.prototype.reverseLowerBound = function(t) {
    var n = this.Y(this.W, t);
    return new Et(n, this.h, this);
  }, e.prototype.reverseUpperBound = function(t) {
    var n = this.Z(this.W, t);
    return new Et(n, this.h, this);
  }, e.prototype.setElement = function(t, n, i) {
    return this.v(t, n, i);
  }, e.prototype.find = function(t) {
    var n = this.g(this.W, t);
    return new Et(n, this.h, this);
  }, e.prototype.getElementByKey = function(t) {
    var n = this.g(this.W, t);
    return n.p;
  }, e.prototype.union = function(t) {
    var n = this;
    return t.forEach(function(i) {
      n.setElement(i[0], i[1]);
    }), this.M;
  }, e.prototype[Symbol.iterator] = function() {
    return this.P(this.W);
  }, e;
}(sf);
const Fh = Dh;
function an(r) {
  var e = typeof r;
  return e === "object" && r !== null || e === "function";
}
var cf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), lf = function(r) {
  cf(e, r);
  function e(t, n, i) {
    var o = r.call(this, i) || this;
    return o.o = t, o.h = n, o.iteratorType === 0 ? (o.pre = function() {
      return this.o.L === this.h && De(), this.o = this.o.L, this;
    }, o.next = function() {
      return this.o === this.h && De(), this.o = this.o.m, this;
    }) : (o.pre = function() {
      return this.o.m === this.h && De(), this.o = this.o.m, this;
    }, o.next = function() {
      return this.o === this.h && De(), this.o = this.o.L, this;
    }), o;
  }
  return e;
}(Bn), hf = function(r) {
  cf(e, r);
  function e() {
    var t = r.call(this) || this;
    return t._ = [], t.I = {}, t.HASH_TAG = Symbol("@@HASH_TAG"), Object.setPrototypeOf(t.I, null), t.h = {}, t.h.L = t.h.m = t.H = t.l = t.h, t;
  }
  return e.prototype.G = function(t) {
    var n = t.L, i = t.m;
    n.m = i, i.L = n, t === this.H && (this.H = i), t === this.l && (this.l = n), this.M -= 1;
  }, e.prototype.v = function(t, n, i) {
    i === void 0 && (i = an(t));
    var o;
    if (i) {
      var s = t[this.HASH_TAG];
      if (s !== void 0)
        return this._[s].p = n, this.M;
      Object.defineProperty(t, this.HASH_TAG, {
        value: this._.length,
        configurable: !0
      }), o = {
        u: t,
        p: n,
        L: this.l,
        m: this.h
      }, this._.push(o);
    } else {
      var a = this.I[t];
      if (a)
        return a.p = n, this.M;
      o = {
        u: t,
        p: n,
        L: this.l,
        m: this.h
      }, this.I[t] = o;
    }
    return this.M === 0 ? (this.H = o, this.h.m = o) : this.l.m = o, this.l = o, this.h.L = o, ++this.M;
  }, e.prototype.g = function(t, n) {
    if (n === void 0 && (n = an(t)), n) {
      var i = t[this.HASH_TAG];
      return i === void 0 ? this.h : this._[i];
    } else
      return this.I[t] || this.h;
  }, e.prototype.clear = function() {
    var t = this.HASH_TAG;
    this._.forEach(function(n) {
      delete n.u[t];
    }), this._ = [], this.I = {}, Object.setPrototypeOf(this.I, null), this.M = 0, this.H = this.l = this.h.L = this.h.m = this.h;
  }, e.prototype.eraseElementByKey = function(t, n) {
    var i;
    if (n === void 0 && (n = an(t)), n) {
      var o = t[this.HASH_TAG];
      if (o === void 0)
        return !1;
      delete t[this.HASH_TAG], i = this._[o], delete this._[o];
    } else {
      if (i = this.I[t], i === void 0)
        return !1;
      delete this.I[t];
    }
    return this.G(i), !0;
  }, e.prototype.eraseElementByIterator = function(t) {
    var n = t.o;
    return n === this.h && De(), this.G(n), t.next();
  }, e.prototype.eraseElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var n = this.H; t--; )
      n = n.m;
    return this.G(n), this.M;
  }, e;
}(Xo), df = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Oh = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, Ir = function(r) {
  df(e, r);
  function e(t, n, i, o) {
    var s = r.call(this, t, n, o) || this;
    return s.container = i, s;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      return this.o === this.h && De(), this.o.u;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.copy = function() {
    return new e(this.o, this.h, this.container, this.iteratorType);
  }, e;
}(lf), Mh = function(r) {
  df(e, r);
  function e(t) {
    t === void 0 && (t = []);
    var n = r.call(this) || this, i = n;
    return t.forEach(function(o) {
      i.insert(o);
    }), n;
  }
  return e.prototype.begin = function() {
    return new Ir(this.H, this.h, this);
  }, e.prototype.end = function() {
    return new Ir(this.h, this.h, this);
  }, e.prototype.rBegin = function() {
    return new Ir(this.l, this.h, this, 1);
  }, e.prototype.rEnd = function() {
    return new Ir(this.h, this.h, this, 1);
  }, e.prototype.front = function() {
    return this.H.u;
  }, e.prototype.back = function() {
    return this.l.u;
  }, e.prototype.insert = function(t, n) {
    return this.v(t, void 0, n);
  }, e.prototype.getElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var n = this.H; t--; )
      n = n.m;
    return n.u;
  }, e.prototype.find = function(t, n) {
    var i = this.g(t, n);
    return new Ir(i, this.h, this);
  }, e.prototype.forEach = function(t) {
    for (var n = 0, i = this.H; i !== this.h; )
      t(i.u, n++, this), i = i.m;
  }, e.prototype[Symbol.iterator] = function() {
    return (function() {
      var t;
      return Oh(this, function(n) {
        switch (n.label) {
          case 0:
            t = this.H, n.label = 1;
          case 1:
            return t === this.h ? [3, 3] : [4, t.u];
          case 2:
            return n.sent(), t = t.m, [3, 1];
          case 3:
            return [2];
        }
      });
    }).bind(this)();
  }, e;
}(hf);
const Ih = Mh;
var pf = /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), Nh = function(r, e) {
  var t = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, n, i, o, s;
  return s = {
    next: a(0),
    throw: a(1),
    return: a(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, {
              value: u[1],
              done: !1
            };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}, Nr = function(r) {
  pf(e, r);
  function e(t, n, i, o) {
    var s = r.call(this, t, n, o) || this;
    return s.container = i, s;
  }
  return Object.defineProperty(e.prototype, "pointer", {
    get: function() {
      this.o === this.h && De();
      var t = this;
      return new Proxy([], {
        get: function(n, i) {
          if (i === "0")
            return t.o.u;
          if (i === "1")
            return t.o.p;
        },
        set: function(n, i, o) {
          if (i !== "1")
            throw new TypeError("props must be 1");
          return t.o.p = o, !0;
        }
      });
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.copy = function() {
    return new e(this.o, this.h, this.container, this.iteratorType);
  }, e;
}(lf), Rh = function(r) {
  pf(e, r);
  function e(t) {
    t === void 0 && (t = []);
    var n = r.call(this) || this, i = n;
    return t.forEach(function(o) {
      i.setElement(o[0], o[1]);
    }), n;
  }
  return e.prototype.begin = function() {
    return new Nr(this.H, this.h, this);
  }, e.prototype.end = function() {
    return new Nr(this.h, this.h, this);
  }, e.prototype.rBegin = function() {
    return new Nr(this.l, this.h, this, 1);
  }, e.prototype.rEnd = function() {
    return new Nr(this.h, this.h, this, 1);
  }, e.prototype.front = function() {
    if (this.M !== 0)
      return [this.H.u, this.H.p];
  }, e.prototype.back = function() {
    if (this.M !== 0)
      return [this.l.u, this.l.p];
  }, e.prototype.setElement = function(t, n, i) {
    return this.v(t, n, i);
  }, e.prototype.getElementByKey = function(t, n) {
    if (n === void 0 && (n = an(t)), n) {
      var i = t[this.HASH_TAG];
      return i !== void 0 ? this._[i].p : void 0;
    }
    var o = this.I[t];
    return o ? o.p : void 0;
  }, e.prototype.getElementByPos = function(t) {
    if (t < 0 || t > this.M - 1)
      throw new RangeError();
    for (var n = this.H; t--; )
      n = n.m;
    return [n.u, n.p];
  }, e.prototype.find = function(t, n) {
    var i = this.g(t, n);
    return new Nr(i, this.h, this);
  }, e.prototype.forEach = function(t) {
    for (var n = 0, i = this.H; i !== this.h; )
      t([i.u, i.p], n++, this), i = i.m;
  }, e.prototype[Symbol.iterator] = function() {
    return (function() {
      var t;
      return Nh(this, function(n) {
        switch (n.label) {
          case 0:
            t = this.H, n.label = 1;
          case 1:
            return t === this.h ? [3, 3] : [4, [t.u, t.p]];
          case 2:
            return n.sent(), t = t.m, [3, 1];
          case 3:
            return [2];
        }
      });
    }).bind(this)();
  }, e;
}(hf);
const Ph = Rh, kh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Deque: xh,
  HashMap: Ph,
  HashSet: Ih,
  LinkList: dh,
  OrderedMap: Fh,
  OrderedSet: Ch,
  PriorityQueue: nh,
  Queue: eh,
  Stack: X0,
  Vector: ch
}, Symbol.toStringTag, { value: "Module" })), jh = /* @__PURE__ */ Vo(kh);
var Eo = { exports: {} }, li, Vs;
function Uh() {
  if (Vs)
    return li;
  Vs = 1;
  var r = 1e3, e = r * 60, t = e * 60, n = t * 24, i = n * 7, o = n * 365.25;
  li = function(c, h) {
    h = h || {};
    var y = typeof c;
    if (y === "string" && c.length > 0)
      return s(c);
    if (y === "number" && isFinite(c))
      return h.long ? f(c) : a(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (h) {
        var y = parseFloat(h[1]), T = (h[2] || "ms").toLowerCase();
        switch (T) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return y * o;
          case "weeks":
          case "week":
          case "w":
            return y * i;
          case "days":
          case "day":
          case "d":
            return y * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return y * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return y * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return y * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return y;
          default:
            return;
        }
      }
    }
  }
  function a(c) {
    var h = Math.abs(c);
    return h >= n ? Math.round(c / n) + "d" : h >= t ? Math.round(c / t) + "h" : h >= e ? Math.round(c / e) + "m" : h >= r ? Math.round(c / r) + "s" : c + "ms";
  }
  function f(c) {
    var h = Math.abs(c);
    return h >= n ? u(c, h, n, "day") : h >= t ? u(c, h, t, "hour") : h >= e ? u(c, h, e, "minute") : h >= r ? u(c, h, r, "second") : c + " ms";
  }
  function u(c, h, y, T) {
    var A = h >= y * 1.5;
    return Math.round(c / y) + " " + T + (A ? "s" : "");
  }
  return li;
}
function Lh(r) {
  t.debug = t, t.default = t, t.coerce = f, t.disable = o, t.enable = i, t.enabled = s, t.humanize = Uh(), t.destroy = u, Object.keys(r).forEach((c) => {
    t[c] = r[c];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(c) {
    let h = 0;
    for (let y = 0; y < c.length; y++)
      h = (h << 5) - h + c.charCodeAt(y), h |= 0;
    return t.colors[Math.abs(h) % t.colors.length];
  }
  t.selectColor = e;
  function t(c) {
    let h, y = null, T, A;
    function B(...O) {
      if (!B.enabled)
        return;
      const d = B, _ = Number(/* @__PURE__ */ new Date()), E = _ - (h || _);
      d.diff = E, d.prev = h, d.curr = _, h = _, O[0] = t.coerce(O[0]), typeof O[0] != "string" && O.unshift("%O");
      let M = 0;
      O[0] = O[0].replace(/%([a-zA-Z%])/g, (C, m) => {
        if (C === "%%")
          return "%";
        M++;
        const D = t.formatters[m];
        if (typeof D == "function") {
          const w = O[M];
          C = D.call(d, w), O.splice(M, 1), M--;
        }
        return C;
      }), t.formatArgs.call(d, O), (d.log || t.log).apply(d, O);
    }
    return B.namespace = c, B.useColors = t.useColors(), B.color = t.selectColor(c), B.extend = n, B.destroy = t.destroy, Object.defineProperty(B, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => y !== null ? y : (T !== t.namespaces && (T = t.namespaces, A = t.enabled(c)), A),
      set: (O) => {
        y = O;
      }
    }), typeof t.init == "function" && t.init(B), B;
  }
  function n(c, h) {
    const y = t(this.namespace + (typeof h > "u" ? ":" : h) + c);
    return y.log = this.log, y;
  }
  function i(c) {
    t.save(c), t.namespaces = c, t.names = [], t.skips = [];
    let h;
    const y = (typeof c == "string" ? c : "").split(/[\s,]+/), T = y.length;
    for (h = 0; h < T; h++)
      y[h] && (c = y[h].replace(/\*/g, ".*?"), c[0] === "-" ? t.skips.push(new RegExp("^" + c.slice(1) + "$")) : t.names.push(new RegExp("^" + c + "$")));
  }
  function o() {
    const c = [
      ...t.names.map(a),
      ...t.skips.map(a).map((h) => "-" + h)
    ].join(",");
    return t.enable(""), c;
  }
  function s(c) {
    if (c[c.length - 1] === "*")
      return !0;
    let h, y;
    for (h = 0, y = t.skips.length; h < y; h++)
      if (t.skips[h].test(c))
        return !1;
    for (h = 0, y = t.names.length; h < y; h++)
      if (t.names[h].test(c))
        return !0;
    return !1;
  }
  function a(c) {
    return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function f(c) {
    return c instanceof Error ? c.stack || c.message : c;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var qh = Lh;
(function(r, e) {
  e.formatArgs = n, e.save = i, e.load = o, e.useColors = t, e.storage = s(), e.destroy = /* @__PURE__ */ (() => {
    let f = !1;
    return () => {
      f || (f = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function n(f) {
    if (f[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + f[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    f.splice(1, 0, u, "color: inherit");
    let c = 0, h = 0;
    f[0].replace(/%[a-zA-Z%]/g, (y) => {
      y !== "%%" && (c++, y === "%c" && (h = c));
    }), f.splice(h, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(f) {
    try {
      f ? e.storage.setItem("debug", f) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function o() {
    let f;
    try {
      f = e.storage.getItem("debug");
    } catch {
    }
    return !f && typeof process < "u" && "env" in process && (f = process.env.DEBUG), f;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = qh(e);
  const { formatters: a } = r.exports;
  a.j = function(f) {
    try {
      return JSON.stringify(f);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Eo, Eo.exports);
var It = Eo.exports;
const Hh = jh.OrderedSet, yt = It("number-allocator:trace"), $h = It("number-allocator:error");
function Je(r, e) {
  this.low = r, this.high = e;
}
Je.prototype.equals = function(r) {
  return this.low === r.low && this.high === r.high;
};
Je.prototype.compare = function(r) {
  return this.low < r.low && this.high < r.low ? -1 : r.low < this.low && r.high < this.low ? 1 : 0;
};
function bt(r, e) {
  if (!(this instanceof bt))
    return new bt(r, e);
  this.min = r, this.max = e, this.ss = new Hh(
    [],
    (t, n) => t.compare(n)
  ), yt("Create"), this.clear();
}
bt.prototype.firstVacant = function() {
  return this.ss.size() === 0 ? null : this.ss.front().low;
};
bt.prototype.alloc = function() {
  if (this.ss.size() === 0)
    return yt("alloc():empty"), null;
  const r = this.ss.begin(), e = r.pointer.low, t = r.pointer.high, n = e;
  return n + 1 <= t ? this.ss.updateKeyByIterator(r, new Je(e + 1, t)) : this.ss.eraseElementByPos(0), yt("alloc():" + n), n;
};
bt.prototype.use = function(r) {
  const e = new Je(r, r), t = this.ss.lowerBound(e);
  if (!t.equals(this.ss.end())) {
    const n = t.pointer.low, i = t.pointer.high;
    return t.pointer.equals(e) ? (this.ss.eraseElementByIterator(t), yt("use():" + r), !0) : n > r ? !1 : n === r ? (this.ss.updateKeyByIterator(t, new Je(n + 1, i)), yt("use():" + r), !0) : i === r ? (this.ss.updateKeyByIterator(t, new Je(n, i - 1)), yt("use():" + r), !0) : (this.ss.updateKeyByIterator(t, new Je(r + 1, i)), this.ss.insert(new Je(n, r - 1)), yt("use():" + r), !0);
  }
  return yt("use():failed"), !1;
};
bt.prototype.free = function(r) {
  if (r < this.min || r > this.max) {
    $h("free():" + r + " is out of range");
    return;
  }
  const e = new Je(r, r), t = this.ss.upperBound(e);
  if (t.equals(this.ss.end())) {
    if (t.equals(this.ss.begin())) {
      this.ss.insert(e);
      return;
    }
    t.pre();
    const n = t.pointer.high;
    t.pointer.high + 1 === r ? this.ss.updateKeyByIterator(t, new Je(n, r)) : this.ss.insert(e);
  } else if (t.equals(this.ss.begin()))
    if (r + 1 === t.pointer.low) {
      const n = t.pointer.high;
      this.ss.updateKeyByIterator(t, new Je(r, n));
    } else
      this.ss.insert(e);
  else {
    const n = t.pointer.low, i = t.pointer.high;
    t.pre();
    const o = t.pointer.low;
    t.pointer.high + 1 === r ? r + 1 === n ? (this.ss.eraseElementByIterator(t), this.ss.updateKeyByIterator(t, new Je(o, i))) : this.ss.updateKeyByIterator(t, new Je(o, r)) : r + 1 === n ? (this.ss.eraseElementByIterator(t.next()), this.ss.insert(new Je(r, i))) : this.ss.insert(e);
  }
  yt("free():" + r);
};
bt.prototype.clear = function() {
  yt("clear()"), this.ss.clear(), this.ss.insert(new Je(this.min, this.max));
};
bt.prototype.intervalCount = function() {
  return this.ss.size();
};
bt.prototype.dump = function() {
  console.log("length:" + this.ss.size());
  for (const r of this.ss)
    console.log(r);
};
var Wh = bt;
const zh = Wh;
Zu.NumberAllocator = zh;
const Kh = V0, Vh = Zu.NumberAllocator;
function Wt(r) {
  if (!(this instanceof Wt))
    return new Wt(r);
  r > 0 && (this.aliasToTopic = new Kh({ max: r }), this.topicToAlias = {}, this.numberAllocator = new Vh(1, r), this.max = r, this.length = 0);
}
Wt.prototype.put = function(r, e) {
  if (e === 0 || e > this.max)
    return !1;
  const t = this.aliasToTopic.get(e);
  return t && delete this.topicToAlias[t], this.aliasToTopic.set(e, r), this.topicToAlias[r] = e, this.numberAllocator.use(e), this.length = this.aliasToTopic.length, !0;
};
Wt.prototype.getTopicByAlias = function(r) {
  return this.aliasToTopic.get(r);
};
Wt.prototype.getAliasByTopic = function(r) {
  const e = this.topicToAlias[r];
  return typeof e < "u" && this.aliasToTopic.get(e), e;
};
Wt.prototype.clear = function() {
  this.aliasToTopic.reset(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
};
Wt.prototype.getLruAlias = function() {
  const r = this.numberAllocator.firstVacant();
  return r || this.aliasToTopic.keys()[this.aliasToTopic.length - 1];
};
var Gh = Wt, Tn = {}, Dn = { exports: {} }, _f = {};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(r) {
  var e = Wr, t = wn, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = a, r.SlowBuffer = _, r.INSPECT_MAX_BYTES = 50;
  var i = 2147483647;
  r.kMaxLength = i, a.TYPED_ARRAY_SUPPORT = o(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      var k = new Uint8Array(1), x = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(x, Uint8Array.prototype), Object.setPrototypeOf(k, x), k.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(a.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.byteOffset;
    }
  });
  function s(k) {
    if (k > i)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
    var x = new Uint8Array(k);
    return Object.setPrototypeOf(x, a.prototype), x;
  }
  function a(k, x, b) {
    if (typeof k == "number") {
      if (typeof x == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return h(k);
    }
    return f(k, x, b);
  }
  a.poolSize = 8192;
  function f(k, x, b) {
    if (typeof k == "string")
      return y(k, x);
    if (ArrayBuffer.isView(k))
      return A(k);
    if (k == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
      );
    if (Y(k, ArrayBuffer) || k && Y(k.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Y(k, SharedArrayBuffer) || k && Y(k.buffer, SharedArrayBuffer)))
      return B(k, x, b);
    if (typeof k == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var H = k.valueOf && k.valueOf();
    if (H != null && H !== k)
      return a.from(H, x, b);
    var ee = O(k);
    if (ee)
      return ee;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof k[Symbol.toPrimitive] == "function")
      return a.from(
        k[Symbol.toPrimitive]("string"),
        x,
        b
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
    );
  }
  a.from = function(k, x, b) {
    return f(k, x, b);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function u(k) {
    if (typeof k != "number")
      throw new TypeError('"size" argument must be of type number');
    if (k < 0)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
  }
  function c(k, x, b) {
    return u(k), k <= 0 ? s(k) : x !== void 0 ? typeof b == "string" ? s(k).fill(x, b) : s(k).fill(x) : s(k);
  }
  a.alloc = function(k, x, b) {
    return c(k, x, b);
  };
  function h(k) {
    return u(k), s(k < 0 ? 0 : d(k) | 0);
  }
  a.allocUnsafe = function(k) {
    return h(k);
  }, a.allocUnsafeSlow = function(k) {
    return h(k);
  };
  function y(k, x) {
    if ((typeof x != "string" || x === "") && (x = "utf8"), !a.isEncoding(x))
      throw new TypeError("Unknown encoding: " + x);
    var b = E(k, x) | 0, H = s(b), ee = H.write(k, x);
    return ee !== b && (H = H.slice(0, ee)), H;
  }
  function T(k) {
    for (var x = k.length < 0 ? 0 : d(k.length) | 0, b = s(x), H = 0; H < x; H += 1)
      b[H] = k[H] & 255;
    return b;
  }
  function A(k) {
    if (Y(k, Uint8Array)) {
      var x = new Uint8Array(k);
      return B(x.buffer, x.byteOffset, x.byteLength);
    }
    return T(k);
  }
  function B(k, x, b) {
    if (x < 0 || k.byteLength < x)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (k.byteLength < x + (b || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var H;
    return x === void 0 && b === void 0 ? H = new Uint8Array(k) : b === void 0 ? H = new Uint8Array(k, x) : H = new Uint8Array(k, x, b), Object.setPrototypeOf(H, a.prototype), H;
  }
  function O(k) {
    if (a.isBuffer(k)) {
      var x = d(k.length) | 0, b = s(x);
      return b.length === 0 || k.copy(b, 0, 0, x), b;
    }
    if (k.length !== void 0)
      return typeof k.length != "number" || he(k.length) ? s(0) : T(k);
    if (k.type === "Buffer" && Array.isArray(k.data))
      return T(k.data);
  }
  function d(k) {
    if (k >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return k | 0;
  }
  function _(k) {
    return +k != k && (k = 0), a.alloc(+k);
  }
  a.isBuffer = function(x) {
    return x != null && x._isBuffer === !0 && x !== a.prototype;
  }, a.compare = function(x, b) {
    if (Y(x, Uint8Array) && (x = a.from(x, x.offset, x.byteLength)), Y(b, Uint8Array) && (b = a.from(b, b.offset, b.byteLength)), !a.isBuffer(x) || !a.isBuffer(b))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (x === b)
      return 0;
    for (var H = x.length, ee = b.length, fe = 0, ae = Math.min(H, ee); fe < ae; ++fe)
      if (x[fe] !== b[fe]) {
        H = x[fe], ee = b[fe];
        break;
      }
    return H < ee ? -1 : ee < H ? 1 : 0;
  }, a.isEncoding = function(x) {
    switch (String(x).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, a.concat = function(x, b) {
    if (!Array.isArray(x))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (x.length === 0)
      return a.alloc(0);
    var H;
    if (b === void 0)
      for (b = 0, H = 0; H < x.length; ++H)
        b += x[H].length;
    var ee = a.allocUnsafe(b), fe = 0;
    for (H = 0; H < x.length; ++H) {
      var ae = x[H];
      if (Y(ae, Uint8Array))
        fe + ae.length > ee.length ? a.from(ae).copy(ee, fe) : Uint8Array.prototype.set.call(
          ee,
          ae,
          fe
        );
      else if (a.isBuffer(ae))
        ae.copy(ee, fe);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      fe += ae.length;
    }
    return ee;
  };
  function E(k, x) {
    if (a.isBuffer(k))
      return k.length;
    if (ArrayBuffer.isView(k) || Y(k, ArrayBuffer))
      return k.byteLength;
    if (typeof k != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof k
      );
    var b = k.length, H = arguments.length > 2 && arguments[2] === !0;
    if (!H && b === 0)
      return 0;
    for (var ee = !1; ; )
      switch (x) {
        case "ascii":
        case "latin1":
        case "binary":
          return b;
        case "utf8":
        case "utf-8":
          return p(k).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return b * 2;
        case "hex":
          return b >>> 1;
        case "base64":
          return P(k).length;
        default:
          if (ee)
            return H ? -1 : p(k).length;
          x = ("" + x).toLowerCase(), ee = !0;
      }
  }
  a.byteLength = E;
  function M(k, x, b) {
    var H = !1;
    if ((x === void 0 || x < 0) && (x = 0), x > this.length || ((b === void 0 || b > this.length) && (b = this.length), b <= 0) || (b >>>= 0, x >>>= 0, b <= x))
      return "";
    for (k || (k = "utf8"); ; )
      switch (k) {
        case "hex":
          return X(this, x, b);
        case "utf8":
        case "utf-8":
          return Z(this, x, b);
        case "ascii":
          return R(this, x, b);
        case "latin1":
        case "binary":
          return U(this, x, b);
        case "base64":
          return V(this, x, b);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ue(this, x, b);
        default:
          if (H)
            throw new TypeError("Unknown encoding: " + k);
          k = (k + "").toLowerCase(), H = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function S(k, x, b) {
    var H = k[x];
    k[x] = k[b], k[b] = H;
  }
  a.prototype.swap16 = function() {
    var x = this.length;
    if (x % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var b = 0; b < x; b += 2)
      S(this, b, b + 1);
    return this;
  }, a.prototype.swap32 = function() {
    var x = this.length;
    if (x % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var b = 0; b < x; b += 4)
      S(this, b, b + 3), S(this, b + 1, b + 2);
    return this;
  }, a.prototype.swap64 = function() {
    var x = this.length;
    if (x % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var b = 0; b < x; b += 8)
      S(this, b, b + 7), S(this, b + 1, b + 6), S(this, b + 2, b + 5), S(this, b + 3, b + 4);
    return this;
  }, a.prototype.toString = function() {
    var x = this.length;
    return x === 0 ? "" : arguments.length === 0 ? Z(this, 0, x) : M.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(x) {
    if (!a.isBuffer(x))
      throw new TypeError("Argument must be a Buffer");
    return this === x ? !0 : a.compare(this, x) === 0;
  }, a.prototype.inspect = function() {
    var x = "", b = r.INSPECT_MAX_BYTES;
    return x = this.toString("hex", 0, b).replace(/(.{2})/g, "$1 ").trim(), this.length > b && (x += " ... "), "<Buffer " + x + ">";
  }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(x, b, H, ee, fe) {
    if (Y(x, Uint8Array) && (x = a.from(x, x.offset, x.byteLength)), !a.isBuffer(x))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof x
      );
    if (b === void 0 && (b = 0), H === void 0 && (H = x ? x.length : 0), ee === void 0 && (ee = 0), fe === void 0 && (fe = this.length), b < 0 || H > x.length || ee < 0 || fe > this.length)
      throw new RangeError("out of range index");
    if (ee >= fe && b >= H)
      return 0;
    if (ee >= fe)
      return -1;
    if (b >= H)
      return 1;
    if (b >>>= 0, H >>>= 0, ee >>>= 0, fe >>>= 0, this === x)
      return 0;
    for (var ae = fe - ee, pe = H - b, ve = Math.min(ae, pe), ye = this.slice(ee, fe), Ae = x.slice(b, H), I = 0; I < ve; ++I)
      if (ye[I] !== Ae[I]) {
        ae = ye[I], pe = Ae[I];
        break;
      }
    return ae < pe ? -1 : pe < ae ? 1 : 0;
  };
  function C(k, x, b, H, ee) {
    if (k.length === 0)
      return -1;
    if (typeof b == "string" ? (H = b, b = 0) : b > 2147483647 ? b = 2147483647 : b < -2147483648 && (b = -2147483648), b = +b, he(b) && (b = ee ? 0 : k.length - 1), b < 0 && (b = k.length + b), b >= k.length) {
      if (ee)
        return -1;
      b = k.length - 1;
    } else if (b < 0)
      if (ee)
        b = 0;
      else
        return -1;
    if (typeof x == "string" && (x = a.from(x, H)), a.isBuffer(x))
      return x.length === 0 ? -1 : m(k, x, b, H, ee);
    if (typeof x == "number")
      return x = x & 255, typeof Uint8Array.prototype.indexOf == "function" ? ee ? Uint8Array.prototype.indexOf.call(k, x, b) : Uint8Array.prototype.lastIndexOf.call(k, x, b) : m(k, [x], b, H, ee);
    throw new TypeError("val must be string, number or Buffer");
  }
  function m(k, x, b, H, ee) {
    var fe = 1, ae = k.length, pe = x.length;
    if (H !== void 0 && (H = String(H).toLowerCase(), H === "ucs2" || H === "ucs-2" || H === "utf16le" || H === "utf-16le")) {
      if (k.length < 2 || x.length < 2)
        return -1;
      fe = 2, ae /= 2, pe /= 2, b /= 2;
    }
    function ve(g, W) {
      return fe === 1 ? g[W] : g.readUInt16BE(W * fe);
    }
    var ye;
    if (ee) {
      var Ae = -1;
      for (ye = b; ye < ae; ye++)
        if (ve(k, ye) === ve(x, Ae === -1 ? 0 : ye - Ae)) {
          if (Ae === -1 && (Ae = ye), ye - Ae + 1 === pe)
            return Ae * fe;
        } else
          Ae !== -1 && (ye -= ye - Ae), Ae = -1;
    } else
      for (b + pe > ae && (b = ae - pe), ye = b; ye >= 0; ye--) {
        for (var I = !0, v = 0; v < pe; v++)
          if (ve(k, ye + v) !== ve(x, v)) {
            I = !1;
            break;
          }
        if (I)
          return ye;
      }
    return -1;
  }
  a.prototype.includes = function(x, b, H) {
    return this.indexOf(x, b, H) !== -1;
  }, a.prototype.indexOf = function(x, b, H) {
    return C(this, x, b, H, !0);
  }, a.prototype.lastIndexOf = function(x, b, H) {
    return C(this, x, b, H, !1);
  };
  function D(k, x, b, H) {
    b = Number(b) || 0;
    var ee = k.length - b;
    H ? (H = Number(H), H > ee && (H = ee)) : H = ee;
    var fe = x.length;
    H > fe / 2 && (H = fe / 2);
    for (var ae = 0; ae < H; ++ae) {
      var pe = parseInt(x.substr(ae * 2, 2), 16);
      if (he(pe))
        return ae;
      k[b + ae] = pe;
    }
    return ae;
  }
  function w(k, x, b, H) {
    return N(p(x, k.length - b), k, b, H);
  }
  function F(k, x, b, H) {
    return N($(x), k, b, H);
  }
  function L(k, x, b, H) {
    return N(P(x), k, b, H);
  }
  function z(k, x, b, H) {
    return N(G(x, k.length - b), k, b, H);
  }
  a.prototype.write = function(x, b, H, ee) {
    if (b === void 0)
      ee = "utf8", H = this.length, b = 0;
    else if (H === void 0 && typeof b == "string")
      ee = b, H = this.length, b = 0;
    else if (isFinite(b))
      b = b >>> 0, isFinite(H) ? (H = H >>> 0, ee === void 0 && (ee = "utf8")) : (ee = H, H = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var fe = this.length - b;
    if ((H === void 0 || H > fe) && (H = fe), x.length > 0 && (H < 0 || b < 0) || b > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    ee || (ee = "utf8");
    for (var ae = !1; ; )
      switch (ee) {
        case "hex":
          return D(this, x, b, H);
        case "utf8":
        case "utf-8":
          return w(this, x, b, H);
        case "ascii":
        case "latin1":
        case "binary":
          return F(this, x, b, H);
        case "base64":
          return L(this, x, b, H);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return z(this, x, b, H);
        default:
          if (ae)
            throw new TypeError("Unknown encoding: " + ee);
          ee = ("" + ee).toLowerCase(), ae = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function V(k, x, b) {
    return x === 0 && b === k.length ? e.fromByteArray(k) : e.fromByteArray(k.slice(x, b));
  }
  function Z(k, x, b) {
    b = Math.min(k.length, b);
    for (var H = [], ee = x; ee < b; ) {
      var fe = k[ee], ae = null, pe = fe > 239 ? 4 : fe > 223 ? 3 : fe > 191 ? 2 : 1;
      if (ee + pe <= b) {
        var ve, ye, Ae, I;
        switch (pe) {
          case 1:
            fe < 128 && (ae = fe);
            break;
          case 2:
            ve = k[ee + 1], (ve & 192) === 128 && (I = (fe & 31) << 6 | ve & 63, I > 127 && (ae = I));
            break;
          case 3:
            ve = k[ee + 1], ye = k[ee + 2], (ve & 192) === 128 && (ye & 192) === 128 && (I = (fe & 15) << 12 | (ve & 63) << 6 | ye & 63, I > 2047 && (I < 55296 || I > 57343) && (ae = I));
            break;
          case 4:
            ve = k[ee + 1], ye = k[ee + 2], Ae = k[ee + 3], (ve & 192) === 128 && (ye & 192) === 128 && (Ae & 192) === 128 && (I = (fe & 15) << 18 | (ve & 63) << 12 | (ye & 63) << 6 | Ae & 63, I > 65535 && I < 1114112 && (ae = I));
        }
      }
      ae === null ? (ae = 65533, pe = 1) : ae > 65535 && (ae -= 65536, H.push(ae >>> 10 & 1023 | 55296), ae = 56320 | ae & 1023), H.push(ae), ee += pe;
    }
    return ie(H);
  }
  var ne = 4096;
  function ie(k) {
    var x = k.length;
    if (x <= ne)
      return String.fromCharCode.apply(String, k);
    for (var b = "", H = 0; H < x; )
      b += String.fromCharCode.apply(
        String,
        k.slice(H, H += ne)
      );
    return b;
  }
  function R(k, x, b) {
    var H = "";
    b = Math.min(k.length, b);
    for (var ee = x; ee < b; ++ee)
      H += String.fromCharCode(k[ee] & 127);
    return H;
  }
  function U(k, x, b) {
    var H = "";
    b = Math.min(k.length, b);
    for (var ee = x; ee < b; ++ee)
      H += String.fromCharCode(k[ee]);
    return H;
  }
  function X(k, x, b) {
    var H = k.length;
    (!x || x < 0) && (x = 0), (!b || b < 0 || b > H) && (b = H);
    for (var ee = "", fe = x; fe < b; ++fe)
      ee += _e[k[fe]];
    return ee;
  }
  function ue(k, x, b) {
    for (var H = k.slice(x, b), ee = "", fe = 0; fe < H.length - 1; fe += 2)
      ee += String.fromCharCode(H[fe] + H[fe + 1] * 256);
    return ee;
  }
  a.prototype.slice = function(x, b) {
    var H = this.length;
    x = ~~x, b = b === void 0 ? H : ~~b, x < 0 ? (x += H, x < 0 && (x = 0)) : x > H && (x = H), b < 0 ? (b += H, b < 0 && (b = 0)) : b > H && (b = H), b < x && (b = x);
    var ee = this.subarray(x, b);
    return Object.setPrototypeOf(ee, a.prototype), ee;
  };
  function J(k, x, b) {
    if (k % 1 !== 0 || k < 0)
      throw new RangeError("offset is not uint");
    if (k + x > b)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(x, b, H) {
    x = x >>> 0, b = b >>> 0, H || J(x, b, this.length);
    for (var ee = this[x], fe = 1, ae = 0; ++ae < b && (fe *= 256); )
      ee += this[x + ae] * fe;
    return ee;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(x, b, H) {
    x = x >>> 0, b = b >>> 0, H || J(x, b, this.length);
    for (var ee = this[x + --b], fe = 1; b > 0 && (fe *= 256); )
      ee += this[x + --b] * fe;
    return ee;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(x, b) {
    return x = x >>> 0, b || J(x, 1, this.length), this[x];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(x, b) {
    return x = x >>> 0, b || J(x, 2, this.length), this[x] | this[x + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(x, b) {
    return x = x >>> 0, b || J(x, 2, this.length), this[x] << 8 | this[x + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), (this[x] | this[x + 1] << 8 | this[x + 2] << 16) + this[x + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), this[x] * 16777216 + (this[x + 1] << 16 | this[x + 2] << 8 | this[x + 3]);
  }, a.prototype.readIntLE = function(x, b, H) {
    x = x >>> 0, b = b >>> 0, H || J(x, b, this.length);
    for (var ee = this[x], fe = 1, ae = 0; ++ae < b && (fe *= 256); )
      ee += this[x + ae] * fe;
    return fe *= 128, ee >= fe && (ee -= Math.pow(2, 8 * b)), ee;
  }, a.prototype.readIntBE = function(x, b, H) {
    x = x >>> 0, b = b >>> 0, H || J(x, b, this.length);
    for (var ee = b, fe = 1, ae = this[x + --ee]; ee > 0 && (fe *= 256); )
      ae += this[x + --ee] * fe;
    return fe *= 128, ae >= fe && (ae -= Math.pow(2, 8 * b)), ae;
  }, a.prototype.readInt8 = function(x, b) {
    return x = x >>> 0, b || J(x, 1, this.length), this[x] & 128 ? (255 - this[x] + 1) * -1 : this[x];
  }, a.prototype.readInt16LE = function(x, b) {
    x = x >>> 0, b || J(x, 2, this.length);
    var H = this[x] | this[x + 1] << 8;
    return H & 32768 ? H | 4294901760 : H;
  }, a.prototype.readInt16BE = function(x, b) {
    x = x >>> 0, b || J(x, 2, this.length);
    var H = this[x + 1] | this[x] << 8;
    return H & 32768 ? H | 4294901760 : H;
  }, a.prototype.readInt32LE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), this[x] | this[x + 1] << 8 | this[x + 2] << 16 | this[x + 3] << 24;
  }, a.prototype.readInt32BE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), this[x] << 24 | this[x + 1] << 16 | this[x + 2] << 8 | this[x + 3];
  }, a.prototype.readFloatLE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), t.read(this, x, !0, 23, 4);
  }, a.prototype.readFloatBE = function(x, b) {
    return x = x >>> 0, b || J(x, 4, this.length), t.read(this, x, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(x, b) {
    return x = x >>> 0, b || J(x, 8, this.length), t.read(this, x, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(x, b) {
    return x = x >>> 0, b || J(x, 8, this.length), t.read(this, x, !1, 52, 8);
  };
  function te(k, x, b, H, ee, fe) {
    if (!a.isBuffer(k))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (x > ee || x < fe)
      throw new RangeError('"value" argument is out of bounds');
    if (b + H > k.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(x, b, H, ee) {
    if (x = +x, b = b >>> 0, H = H >>> 0, !ee) {
      var fe = Math.pow(2, 8 * H) - 1;
      te(this, x, b, H, fe, 0);
    }
    var ae = 1, pe = 0;
    for (this[b] = x & 255; ++pe < H && (ae *= 256); )
      this[b + pe] = x / ae & 255;
    return b + H;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(x, b, H, ee) {
    if (x = +x, b = b >>> 0, H = H >>> 0, !ee) {
      var fe = Math.pow(2, 8 * H) - 1;
      te(this, x, b, H, fe, 0);
    }
    var ae = H - 1, pe = 1;
    for (this[b + ae] = x & 255; --ae >= 0 && (pe *= 256); )
      this[b + ae] = x / pe & 255;
    return b + H;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 1, 255, 0), this[b] = x & 255, b + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 2, 65535, 0), this[b] = x & 255, this[b + 1] = x >>> 8, b + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 2, 65535, 0), this[b] = x >>> 8, this[b + 1] = x & 255, b + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 4, 4294967295, 0), this[b + 3] = x >>> 24, this[b + 2] = x >>> 16, this[b + 1] = x >>> 8, this[b] = x & 255, b + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 4, 4294967295, 0), this[b] = x >>> 24, this[b + 1] = x >>> 16, this[b + 2] = x >>> 8, this[b + 3] = x & 255, b + 4;
  }, a.prototype.writeIntLE = function(x, b, H, ee) {
    if (x = +x, b = b >>> 0, !ee) {
      var fe = Math.pow(2, 8 * H - 1);
      te(this, x, b, H, fe - 1, -fe);
    }
    var ae = 0, pe = 1, ve = 0;
    for (this[b] = x & 255; ++ae < H && (pe *= 256); )
      x < 0 && ve === 0 && this[b + ae - 1] !== 0 && (ve = 1), this[b + ae] = (x / pe >> 0) - ve & 255;
    return b + H;
  }, a.prototype.writeIntBE = function(x, b, H, ee) {
    if (x = +x, b = b >>> 0, !ee) {
      var fe = Math.pow(2, 8 * H - 1);
      te(this, x, b, H, fe - 1, -fe);
    }
    var ae = H - 1, pe = 1, ve = 0;
    for (this[b + ae] = x & 255; --ae >= 0 && (pe *= 256); )
      x < 0 && ve === 0 && this[b + ae + 1] !== 0 && (ve = 1), this[b + ae] = (x / pe >> 0) - ve & 255;
    return b + H;
  }, a.prototype.writeInt8 = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 1, 127, -128), x < 0 && (x = 255 + x + 1), this[b] = x & 255, b + 1;
  }, a.prototype.writeInt16LE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 2, 32767, -32768), this[b] = x & 255, this[b + 1] = x >>> 8, b + 2;
  }, a.prototype.writeInt16BE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 2, 32767, -32768), this[b] = x >>> 8, this[b + 1] = x & 255, b + 2;
  }, a.prototype.writeInt32LE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 4, 2147483647, -2147483648), this[b] = x & 255, this[b + 1] = x >>> 8, this[b + 2] = x >>> 16, this[b + 3] = x >>> 24, b + 4;
  }, a.prototype.writeInt32BE = function(x, b, H) {
    return x = +x, b = b >>> 0, H || te(this, x, b, 4, 2147483647, -2147483648), x < 0 && (x = 4294967295 + x + 1), this[b] = x >>> 24, this[b + 1] = x >>> 16, this[b + 2] = x >>> 8, this[b + 3] = x & 255, b + 4;
  };
  function j(k, x, b, H, ee, fe) {
    if (b + H > k.length)
      throw new RangeError("Index out of range");
    if (b < 0)
      throw new RangeError("Index out of range");
  }
  function K(k, x, b, H, ee) {
    return x = +x, b = b >>> 0, ee || j(k, x, b, 4), t.write(k, x, b, H, 23, 4), b + 4;
  }
  a.prototype.writeFloatLE = function(x, b, H) {
    return K(this, x, b, !0, H);
  }, a.prototype.writeFloatBE = function(x, b, H) {
    return K(this, x, b, !1, H);
  };
  function se(k, x, b, H, ee) {
    return x = +x, b = b >>> 0, ee || j(k, x, b, 8), t.write(k, x, b, H, 52, 8), b + 8;
  }
  a.prototype.writeDoubleLE = function(x, b, H) {
    return se(this, x, b, !0, H);
  }, a.prototype.writeDoubleBE = function(x, b, H) {
    return se(this, x, b, !1, H);
  }, a.prototype.copy = function(x, b, H, ee) {
    if (!a.isBuffer(x))
      throw new TypeError("argument should be a Buffer");
    if (H || (H = 0), !ee && ee !== 0 && (ee = this.length), b >= x.length && (b = x.length), b || (b = 0), ee > 0 && ee < H && (ee = H), ee === H || x.length === 0 || this.length === 0)
      return 0;
    if (b < 0)
      throw new RangeError("targetStart out of bounds");
    if (H < 0 || H >= this.length)
      throw new RangeError("Index out of range");
    if (ee < 0)
      throw new RangeError("sourceEnd out of bounds");
    ee > this.length && (ee = this.length), x.length - b < ee - H && (ee = x.length - b + H);
    var fe = ee - H;
    return this === x && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(b, H, ee) : Uint8Array.prototype.set.call(
      x,
      this.subarray(H, ee),
      b
    ), fe;
  }, a.prototype.fill = function(x, b, H, ee) {
    if (typeof x == "string") {
      if (typeof b == "string" ? (ee = b, b = 0, H = this.length) : typeof H == "string" && (ee = H, H = this.length), ee !== void 0 && typeof ee != "string")
        throw new TypeError("encoding must be a string");
      if (typeof ee == "string" && !a.isEncoding(ee))
        throw new TypeError("Unknown encoding: " + ee);
      if (x.length === 1) {
        var fe = x.charCodeAt(0);
        (ee === "utf8" && fe < 128 || ee === "latin1") && (x = fe);
      }
    } else
      typeof x == "number" ? x = x & 255 : typeof x == "boolean" && (x = Number(x));
    if (b < 0 || this.length < b || this.length < H)
      throw new RangeError("Out of range index");
    if (H <= b)
      return this;
    b = b >>> 0, H = H === void 0 ? this.length : H >>> 0, x || (x = 0);
    var ae;
    if (typeof x == "number")
      for (ae = b; ae < H; ++ae)
        this[ae] = x;
    else {
      var pe = a.isBuffer(x) ? x : a.from(x, ee), ve = pe.length;
      if (ve === 0)
        throw new TypeError('The value "' + x + '" is invalid for argument "value"');
      for (ae = 0; ae < H - b; ++ae)
        this[ae + b] = pe[ae % ve];
    }
    return this;
  };
  var q = /[^+/0-9A-Za-z-_]/g;
  function l(k) {
    if (k = k.split("=")[0], k = k.trim().replace(q, ""), k.length < 2)
      return "";
    for (; k.length % 4 !== 0; )
      k = k + "=";
    return k;
  }
  function p(k, x) {
    x = x || 1 / 0;
    for (var b, H = k.length, ee = null, fe = [], ae = 0; ae < H; ++ae) {
      if (b = k.charCodeAt(ae), b > 55295 && b < 57344) {
        if (!ee) {
          if (b > 56319) {
            (x -= 3) > -1 && fe.push(239, 191, 189);
            continue;
          } else if (ae + 1 === H) {
            (x -= 3) > -1 && fe.push(239, 191, 189);
            continue;
          }
          ee = b;
          continue;
        }
        if (b < 56320) {
          (x -= 3) > -1 && fe.push(239, 191, 189), ee = b;
          continue;
        }
        b = (ee - 55296 << 10 | b - 56320) + 65536;
      } else
        ee && (x -= 3) > -1 && fe.push(239, 191, 189);
      if (ee = null, b < 128) {
        if ((x -= 1) < 0)
          break;
        fe.push(b);
      } else if (b < 2048) {
        if ((x -= 2) < 0)
          break;
        fe.push(
          b >> 6 | 192,
          b & 63 | 128
        );
      } else if (b < 65536) {
        if ((x -= 3) < 0)
          break;
        fe.push(
          b >> 12 | 224,
          b >> 6 & 63 | 128,
          b & 63 | 128
        );
      } else if (b < 1114112) {
        if ((x -= 4) < 0)
          break;
        fe.push(
          b >> 18 | 240,
          b >> 12 & 63 | 128,
          b >> 6 & 63 | 128,
          b & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return fe;
  }
  function $(k) {
    for (var x = [], b = 0; b < k.length; ++b)
      x.push(k.charCodeAt(b) & 255);
    return x;
  }
  function G(k, x) {
    for (var b, H, ee, fe = [], ae = 0; ae < k.length && !((x -= 2) < 0); ++ae)
      b = k.charCodeAt(ae), H = b >> 8, ee = b % 256, fe.push(ee), fe.push(H);
    return fe;
  }
  function P(k) {
    return e.toByteArray(l(k));
  }
  function N(k, x, b, H) {
    for (var ee = 0; ee < H && !(ee + b >= x.length || ee >= k.length); ++ee)
      x[ee + b] = k[ee];
    return ee;
  }
  function Y(k, x) {
    return k instanceof x || k != null && k.constructor != null && k.constructor.name != null && k.constructor.name === x.name;
  }
  function he(k) {
    return k !== k;
  }
  var _e = function() {
    for (var k = "0123456789abcdef", x = new Array(256), b = 0; b < 16; ++b)
      for (var H = b * 16, ee = 0; ee < 16; ++ee)
        x[H + ee] = k[b] + k[ee];
    return x;
  }();
})(_f);
const { Buffer: lt } = _f, vf = Symbol.for("BufferList");
function Fe(r) {
  if (!(this instanceof Fe))
    return new Fe(r);
  Fe._init.call(this, r);
}
Fe._init = function(e) {
  Object.defineProperty(this, vf, { value: !0 }), this._bufs = [], this.length = 0, e && this.append(e);
};
Fe.prototype._new = function(e) {
  return new Fe(e);
};
Fe.prototype._offset = function(e) {
  if (e === 0)
    return [0, 0];
  let t = 0;
  for (let n = 0; n < this._bufs.length; n++) {
    const i = t + this._bufs[n].length;
    if (e < i || n === this._bufs.length - 1)
      return [n, e - t];
    t = i;
  }
};
Fe.prototype._reverseOffset = function(r) {
  const e = r[0];
  let t = r[1];
  for (let n = 0; n < e; n++)
    t += this._bufs[n].length;
  return t;
};
Fe.prototype.get = function(e) {
  if (e > this.length || e < 0)
    return;
  const t = this._offset(e);
  return this._bufs[t[0]][t[1]];
};
Fe.prototype.slice = function(e, t) {
  return typeof e == "number" && e < 0 && (e += this.length), typeof t == "number" && t < 0 && (t += this.length), this.copy(null, 0, e, t);
};
Fe.prototype.copy = function(e, t, n, i) {
  if ((typeof n != "number" || n < 0) && (n = 0), (typeof i != "number" || i > this.length) && (i = this.length), n >= this.length || i <= 0)
    return e || lt.alloc(0);
  const o = !!e, s = this._offset(n), a = i - n;
  let f = a, u = o && t || 0, c = s[1];
  if (n === 0 && i === this.length) {
    if (!o)
      return this._bufs.length === 1 ? this._bufs[0] : lt.concat(this._bufs, this.length);
    for (let h = 0; h < this._bufs.length; h++)
      this._bufs[h].copy(e, u), u += this._bufs[h].length;
    return e;
  }
  if (f <= this._bufs[s[0]].length - c)
    return o ? this._bufs[s[0]].copy(e, t, c, c + f) : this._bufs[s[0]].slice(c, c + f);
  o || (e = lt.allocUnsafe(a));
  for (let h = s[0]; h < this._bufs.length; h++) {
    const y = this._bufs[h].length - c;
    if (f > y)
      this._bufs[h].copy(e, u, c), u += y;
    else {
      this._bufs[h].copy(e, u, c, c + f), u += y;
      break;
    }
    f -= y, c && (c = 0);
  }
  return e.length > u ? e.slice(0, u) : e;
};
Fe.prototype.shallowSlice = function(e, t) {
  if (e = e || 0, t = typeof t != "number" ? this.length : t, e < 0 && (e += this.length), t < 0 && (t += this.length), e === t)
    return this._new();
  const n = this._offset(e), i = this._offset(t), o = this._bufs.slice(n[0], i[0] + 1);
  return i[1] === 0 ? o.pop() : o[o.length - 1] = o[o.length - 1].slice(0, i[1]), n[1] !== 0 && (o[0] = o[0].slice(n[1])), this._new(o);
};
Fe.prototype.toString = function(e, t, n) {
  return this.slice(t, n).toString(e);
};
Fe.prototype.consume = function(e) {
  if (e = Math.trunc(e), Number.isNaN(e) || e <= 0)
    return this;
  for (; this._bufs.length; )
    if (e >= this._bufs[0].length)
      e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
    else {
      this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
      break;
    }
  return this;
};
Fe.prototype.duplicate = function() {
  const e = this._new();
  for (let t = 0; t < this._bufs.length; t++)
    e.append(this._bufs[t]);
  return e;
};
Fe.prototype.append = function(e) {
  if (e == null)
    return this;
  if (e.buffer)
    this._appendBuffer(lt.from(e.buffer, e.byteOffset, e.byteLength));
  else if (Array.isArray(e))
    for (let t = 0; t < e.length; t++)
      this.append(e[t]);
  else if (this._isBufferList(e))
    for (let t = 0; t < e._bufs.length; t++)
      this.append(e._bufs[t]);
  else
    typeof e == "number" && (e = e.toString()), this._appendBuffer(lt.from(e));
  return this;
};
Fe.prototype._appendBuffer = function(e) {
  this._bufs.push(e), this.length += e.length;
};
Fe.prototype.indexOf = function(r, e, t) {
  if (t === void 0 && typeof e == "string" && (t = e, e = void 0), typeof r == "function" || Array.isArray(r))
    throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
  if (typeof r == "number" ? r = lt.from([r]) : typeof r == "string" ? r = lt.from(r, t) : this._isBufferList(r) ? r = r.slice() : Array.isArray(r.buffer) ? r = lt.from(r.buffer, r.byteOffset, r.byteLength) : lt.isBuffer(r) || (r = lt.from(r)), e = Number(e || 0), isNaN(e) && (e = 0), e < 0 && (e = this.length + e), e < 0 && (e = 0), r.length === 0)
    return e > this.length ? this.length : e;
  const n = this._offset(e);
  let i = n[0], o = n[1];
  for (; i < this._bufs.length; i++) {
    const s = this._bufs[i];
    for (; o < s.length; )
      if (s.length - o >= r.length) {
        const f = s.indexOf(r, o);
        if (f !== -1)
          return this._reverseOffset([i, f]);
        o = s.length - r.length + 1;
      } else {
        const f = this._reverseOffset([i, o]);
        if (this._match(f, r))
          return f;
        o++;
      }
    o = 0;
  }
  return -1;
};
Fe.prototype._match = function(r, e) {
  if (this.length - r < e.length)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (this.get(r + t) !== e[t])
      return !1;
  return !0;
};
(function() {
  const r = {
    readDoubleBE: 8,
    readDoubleLE: 8,
    readFloatBE: 4,
    readFloatLE: 4,
    readInt32BE: 4,
    readInt32LE: 4,
    readUInt32BE: 4,
    readUInt32LE: 4,
    readInt16BE: 2,
    readInt16LE: 2,
    readUInt16BE: 2,
    readUInt16LE: 2,
    readInt8: 1,
    readUInt8: 1,
    readIntBE: null,
    readIntLE: null,
    readUIntBE: null,
    readUIntLE: null
  };
  for (const e in r)
    (function(t) {
      r[t] === null ? Fe.prototype[t] = function(n, i) {
        return this.slice(n, n + i)[t](0, i);
      } : Fe.prototype[t] = function(n = 0) {
        return this.slice(n, n + r[t])[t](0);
      };
    })(e);
})();
Fe.prototype._isBufferList = function(e) {
  return e instanceof Fe || Fe.isBufferList(e);
};
Fe.isBufferList = function(e) {
  return e != null && e[vf];
};
var Qh = Fe;
const Zo = or.Duplex, Jh = Ue, Kr = Qh;
function Ge(r) {
  if (!(this instanceof Ge))
    return new Ge(r);
  if (typeof r == "function") {
    this._callback = r;
    const e = (function(n) {
      this._callback && (this._callback(n), this._callback = null);
    }).bind(this);
    this.on("pipe", function(n) {
      n.on("error", e);
    }), this.on("unpipe", function(n) {
      n.removeListener("error", e);
    }), r = null;
  }
  Kr._init.call(this, r), Zo.call(this);
}
Jh(Ge, Zo);
Object.assign(Ge.prototype, Kr.prototype);
Ge.prototype._new = function(e) {
  return new Ge(e);
};
Ge.prototype._write = function(e, t, n) {
  this._appendBuffer(e), typeof n == "function" && n();
};
Ge.prototype._read = function(e) {
  if (!this.length)
    return this.push(null);
  e = Math.min(e, this.length), this.push(this.slice(0, e)), this.consume(e);
};
Ge.prototype.end = function(e) {
  Zo.prototype.end.call(this, e), this._callback && (this._callback(null, this.slice()), this._callback = null);
};
Ge.prototype._destroy = function(e, t) {
  this._bufs.length = 0, this.length = 0, t(e);
};
Ge.prototype._isBufferList = function(e) {
  return e instanceof Ge || e instanceof Kr || Ge.isBufferList(e);
};
Ge.isBufferList = Kr.isBufferList;
Dn.exports = Ge;
Dn.exports.BufferListStream = Ge;
Dn.exports.BufferList = Kr;
var Xh = Dn.exports;
let Yh = class {
  constructor() {
    this.cmd = null, this.retain = !1, this.qos = 0, this.dup = !1, this.length = -1, this.topic = null, this.payload = null;
  }
};
var Zh = Yh, yf = { exports: {} };
(function(r) {
  const e = r.exports;
  e.types = {
    0: "reserved",
    1: "connect",
    2: "connack",
    3: "publish",
    4: "puback",
    5: "pubrec",
    6: "pubrel",
    7: "pubcomp",
    8: "subscribe",
    9: "suback",
    10: "unsubscribe",
    11: "unsuback",
    12: "pingreq",
    13: "pingresp",
    14: "disconnect",
    15: "auth"
  }, e.codes = {};
  for (const n in e.types) {
    const i = e.types[n];
    e.codes[i] = n;
  }
  e.CMD_SHIFT = 4, e.CMD_MASK = 240, e.DUP_MASK = 8, e.QOS_MASK = 3, e.QOS_SHIFT = 1, e.RETAIN_MASK = 1, e.VARBYTEINT_MASK = 127, e.VARBYTEINT_FIN_MASK = 128, e.VARBYTEINT_MAX = 268435455, e.SESSIONPRESENT_MASK = 1, e.SESSIONPRESENT_HEADER = Buffer.from([e.SESSIONPRESENT_MASK]), e.CONNACK_HEADER = Buffer.from([e.codes.connack << e.CMD_SHIFT]), e.USERNAME_MASK = 128, e.PASSWORD_MASK = 64, e.WILL_RETAIN_MASK = 32, e.WILL_QOS_MASK = 24, e.WILL_QOS_SHIFT = 3, e.WILL_FLAG_MASK = 4, e.CLEAN_SESSION_MASK = 2, e.CONNECT_HEADER = Buffer.from([e.codes.connect << e.CMD_SHIFT]), e.properties = {
    sessionExpiryInterval: 17,
    willDelayInterval: 24,
    receiveMaximum: 33,
    maximumPacketSize: 39,
    topicAliasMaximum: 34,
    requestResponseInformation: 25,
    requestProblemInformation: 23,
    userProperties: 38,
    authenticationMethod: 21,
    authenticationData: 22,
    payloadFormatIndicator: 1,
    messageExpiryInterval: 2,
    contentType: 3,
    responseTopic: 8,
    correlationData: 9,
    maximumQoS: 36,
    retainAvailable: 37,
    assignedClientIdentifier: 18,
    reasonString: 31,
    wildcardSubscriptionAvailable: 40,
    subscriptionIdentifiersAvailable: 41,
    sharedSubscriptionAvailable: 42,
    serverKeepAlive: 19,
    responseInformation: 26,
    serverReference: 28,
    topicAlias: 35,
    subscriptionIdentifier: 11
  }, e.propertiesCodes = {};
  for (const n in e.properties) {
    const i = e.properties[n];
    e.propertiesCodes[i] = n;
  }
  e.propertiesTypes = {
    sessionExpiryInterval: "int32",
    willDelayInterval: "int32",
    receiveMaximum: "int16",
    maximumPacketSize: "int32",
    topicAliasMaximum: "int16",
    requestResponseInformation: "byte",
    requestProblemInformation: "byte",
    userProperties: "pair",
    authenticationMethod: "string",
    authenticationData: "binary",
    payloadFormatIndicator: "byte",
    messageExpiryInterval: "int32",
    contentType: "string",
    responseTopic: "string",
    correlationData: "binary",
    maximumQoS: "int8",
    retainAvailable: "byte",
    assignedClientIdentifier: "string",
    reasonString: "string",
    wildcardSubscriptionAvailable: "byte",
    subscriptionIdentifiersAvailable: "byte",
    sharedSubscriptionAvailable: "byte",
    serverKeepAlive: "int16",
    responseInformation: "string",
    serverReference: "string",
    topicAlias: "int16",
    subscriptionIdentifier: "var"
  };
  function t(n) {
    return [0, 1, 2].map((i) => [0, 1].map((o) => [0, 1].map((s) => {
      const a = Buffer.alloc(1);
      return a.writeUInt8(
        e.codes[n] << e.CMD_SHIFT | (o ? e.DUP_MASK : 0) | i << e.QOS_SHIFT | s,
        0,
        !0
      ), a;
    })));
  }
  e.PUBLISH_HEADER = t("publish"), e.SUBSCRIBE_HEADER = t("subscribe"), e.SUBSCRIBE_OPTIONS_QOS_MASK = 3, e.SUBSCRIBE_OPTIONS_NL_MASK = 1, e.SUBSCRIBE_OPTIONS_NL_SHIFT = 2, e.SUBSCRIBE_OPTIONS_RAP_MASK = 1, e.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3, e.SUBSCRIBE_OPTIONS_RH_MASK = 3, e.SUBSCRIBE_OPTIONS_RH_SHIFT = 4, e.SUBSCRIBE_OPTIONS_RH = [0, 16, 32], e.SUBSCRIBE_OPTIONS_NL = 4, e.SUBSCRIBE_OPTIONS_RAP = 8, e.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2], e.UNSUBSCRIBE_HEADER = t("unsubscribe"), e.ACKS = {
    unsuback: t("unsuback"),
    puback: t("puback"),
    pubcomp: t("pubcomp"),
    pubrel: t("pubrel"),
    pubrec: t("pubrec")
  }, e.SUBACK_HEADER = Buffer.from([e.codes.suback << e.CMD_SHIFT]), e.VERSION3 = Buffer.from([3]), e.VERSION4 = Buffer.from([4]), e.VERSION5 = Buffer.from([5]), e.VERSION131 = Buffer.from([131]), e.VERSION132 = Buffer.from([132]), e.QOS = [0, 1, 2].map((n) => Buffer.from([n])), e.EMPTY = {
    pingreq: Buffer.from([e.codes.pingreq << 4, 0]),
    pingresp: Buffer.from([e.codes.pingresp << 4, 0]),
    disconnect: Buffer.from([e.codes.disconnect << 4, 0])
  };
})(yf);
var xf = yf.exports;
const ed = Xh, td = Ne, Gs = Zh, Ce = xf, xe = It("mqtt-packet:parser");
class _n extends td {
  constructor() {
    super(), this.parser = this.constructor.parser;
  }
  static parser(e) {
    return this instanceof _n ? (this.settings = e || {}, this._states = [
      "_parseHeader",
      "_parseLength",
      "_parsePayload",
      "_newPacket"
    ], this._resetState(), this) : new _n().parser(e);
  }
  _resetState() {
    xe("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new Gs(), this.error = null, this._list = ed(), this._stateCounter = 0;
  }
  parse(e) {
    for (this.error && this._resetState(), this._list.append(e), xe("parse: current state: %s", this._states[this._stateCounter]); (this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error; )
      this._stateCounter++, xe("parse: state complete. _stateCounter is now: %d", this._stateCounter), xe("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);
    return xe("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
  }
  _parseHeader() {
    const e = this._list.readUInt8(0);
    return this.packet.cmd = Ce.types[e >> Ce.CMD_SHIFT], this.packet.retain = (e & Ce.RETAIN_MASK) !== 0, this.packet.qos = e >> Ce.QOS_SHIFT & Ce.QOS_MASK, this.packet.dup = (e & Ce.DUP_MASK) !== 0, xe("_parseHeader: packet: %o", this.packet), this._list.consume(1), !0;
  }
  _parseLength() {
    const e = this._parseVarByteNum(!0);
    return e && (this.packet.length = e.value, this._list.consume(e.bytes)), xe("_parseLength %d", e.value), !!e;
  }
  _parsePayload() {
    xe("_parsePayload: payload %O", this._list);
    let e = !1;
    if (this.packet.length === 0 || this._list.length >= this.packet.length) {
      switch (this._pos = 0, this.packet.cmd) {
        case "connect":
          this._parseConnect();
          break;
        case "connack":
          this._parseConnack();
          break;
        case "publish":
          this._parsePublish();
          break;
        case "puback":
        case "pubrec":
        case "pubrel":
        case "pubcomp":
          this._parseConfirmation();
          break;
        case "subscribe":
          this._parseSubscribe();
          break;
        case "suback":
          this._parseSuback();
          break;
        case "unsubscribe":
          this._parseUnsubscribe();
          break;
        case "unsuback":
          this._parseUnsuback();
          break;
        case "pingreq":
        case "pingresp":
          break;
        case "disconnect":
          this._parseDisconnect();
          break;
        case "auth":
          this._parseAuth();
          break;
        default:
          this._emitError(new Error("Not supported"));
      }
      e = !0;
    }
    return xe("_parsePayload complete result: %s", e), e;
  }
  _parseConnect() {
    xe("_parseConnect");
    let e, t, n, i;
    const o = {}, s = this.packet, a = this._parseString();
    if (a === null)
      return this._emitError(new Error("Cannot parse protocolId"));
    if (a !== "MQTT" && a !== "MQIsdp")
      return this._emitError(new Error("Invalid protocolId"));
    if (s.protocolId = a, this._pos >= this._list.length)
      return this._emitError(new Error("Packet too short"));
    if (s.protocolVersion = this._list.readUInt8(this._pos), s.protocolVersion >= 128 && (s.bridgeMode = !0, s.protocolVersion = s.protocolVersion - 128), s.protocolVersion !== 3 && s.protocolVersion !== 4 && s.protocolVersion !== 5)
      return this._emitError(new Error("Invalid protocol version"));
    if (this._pos++, this._pos >= this._list.length)
      return this._emitError(new Error("Packet too short"));
    if (o.username = this._list.readUInt8(this._pos) & Ce.USERNAME_MASK, o.password = this._list.readUInt8(this._pos) & Ce.PASSWORD_MASK, o.will = this._list.readUInt8(this._pos) & Ce.WILL_FLAG_MASK, o.will && (s.will = {}, s.will.retain = (this._list.readUInt8(this._pos) & Ce.WILL_RETAIN_MASK) !== 0, s.will.qos = (this._list.readUInt8(this._pos) & Ce.WILL_QOS_MASK) >> Ce.WILL_QOS_SHIFT), s.clean = (this._list.readUInt8(this._pos) & Ce.CLEAN_SESSION_MASK) !== 0, this._pos++, s.keepalive = this._parseNum(), s.keepalive === -1)
      return this._emitError(new Error("Packet too short"));
    if (s.protocolVersion === 5) {
      const u = this._parseProperties();
      Object.getOwnPropertyNames(u).length && (s.properties = u);
    }
    const f = this._parseString();
    if (f === null)
      return this._emitError(new Error("Packet too short"));
    if (s.clientId = f, xe("_parseConnect: packet.clientId: %s", s.clientId), o.will) {
      if (s.protocolVersion === 5) {
        const u = this._parseProperties();
        Object.getOwnPropertyNames(u).length && (s.will.properties = u);
      }
      if (e = this._parseString(), e === null)
        return this._emitError(new Error("Cannot parse will topic"));
      if (s.will.topic = e, xe("_parseConnect: packet.will.topic: %s", s.will.topic), t = this._parseBuffer(), t === null)
        return this._emitError(new Error("Cannot parse will payload"));
      s.will.payload = t, xe("_parseConnect: packet.will.paylaod: %s", s.will.payload);
    }
    if (o.username) {
      if (i = this._parseString(), i === null)
        return this._emitError(new Error("Cannot parse username"));
      s.username = i, xe("_parseConnect: packet.username: %s", s.username);
    }
    if (o.password) {
      if (n = this._parseBuffer(), n === null)
        return this._emitError(new Error("Cannot parse password"));
      s.password = n;
    }
    return this.settings = s, xe("_parseConnect: complete"), s;
  }
  _parseConnack() {
    xe("_parseConnack");
    const e = this.packet;
    if (this._list.length < 1)
      return null;
    if (e.sessionPresent = !!(this._list.readUInt8(this._pos++) & Ce.SESSIONPRESENT_MASK), this.settings.protocolVersion === 5)
      this._list.length >= 2 ? e.reasonCode = this._list.readUInt8(this._pos++) : e.reasonCode = 0;
    else {
      if (this._list.length < 2)
        return null;
      e.returnCode = this._list.readUInt8(this._pos++);
    }
    if (e.returnCode === -1 || e.reasonCode === -1)
      return this._emitError(new Error("Cannot parse return code"));
    if (this.settings.protocolVersion === 5) {
      const t = this._parseProperties();
      Object.getOwnPropertyNames(t).length && (e.properties = t);
    }
    xe("_parseConnack: complete");
  }
  _parsePublish() {
    xe("_parsePublish");
    const e = this.packet;
    if (e.topic = this._parseString(), e.topic === null)
      return this._emitError(new Error("Cannot parse topic"));
    if (!(e.qos > 0 && !this._parseMessageId())) {
      if (this.settings.protocolVersion === 5) {
        const t = this._parseProperties();
        Object.getOwnPropertyNames(t).length && (e.properties = t);
      }
      e.payload = this._list.slice(this._pos, e.length), xe("_parsePublish: payload from buffer list: %o", e.payload);
    }
  }
  _parseSubscribe() {
    xe("_parseSubscribe");
    const e = this.packet;
    let t, n, i, o, s, a, f;
    if (e.qos !== 1)
      return this._emitError(new Error("Wrong subscribe header"));
    if (e.subscriptions = [], !!this._parseMessageId()) {
      if (this.settings.protocolVersion === 5) {
        const u = this._parseProperties();
        Object.getOwnPropertyNames(u).length && (e.properties = u);
      }
      for (; this._pos < e.length; ) {
        if (t = this._parseString(), t === null)
          return this._emitError(new Error("Cannot parse topic"));
        if (this._pos >= e.length)
          return this._emitError(new Error("Malformed Subscribe Payload"));
        n = this._parseByte(), i = n & Ce.SUBSCRIBE_OPTIONS_QOS_MASK, a = (n >> Ce.SUBSCRIBE_OPTIONS_NL_SHIFT & Ce.SUBSCRIBE_OPTIONS_NL_MASK) !== 0, s = (n >> Ce.SUBSCRIBE_OPTIONS_RAP_SHIFT & Ce.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0, o = n >> Ce.SUBSCRIBE_OPTIONS_RH_SHIFT & Ce.SUBSCRIBE_OPTIONS_RH_MASK, f = { topic: t, qos: i }, this.settings.protocolVersion === 5 ? (f.nl = a, f.rap = s, f.rh = o) : this.settings.bridgeMode && (f.rh = 0, f.rap = !0, f.nl = !0), xe("_parseSubscribe: push subscription `%s` to subscription", f), e.subscriptions.push(f);
      }
    }
  }
  _parseSuback() {
    xe("_parseSuback");
    const e = this.packet;
    if (this.packet.granted = [], !!this._parseMessageId()) {
      if (this.settings.protocolVersion === 5) {
        const t = this._parseProperties();
        Object.getOwnPropertyNames(t).length && (e.properties = t);
      }
      for (; this._pos < this.packet.length; )
        this.packet.granted.push(this._list.readUInt8(this._pos++));
    }
  }
  _parseUnsubscribe() {
    xe("_parseUnsubscribe");
    const e = this.packet;
    if (e.unsubscriptions = [], !!this._parseMessageId()) {
      if (this.settings.protocolVersion === 5) {
        const t = this._parseProperties();
        Object.getOwnPropertyNames(t).length && (e.properties = t);
      }
      for (; this._pos < e.length; ) {
        const t = this._parseString();
        if (t === null)
          return this._emitError(new Error("Cannot parse topic"));
        xe("_parseUnsubscribe: push topic `%s` to unsubscriptions", t), e.unsubscriptions.push(t);
      }
    }
  }
  _parseUnsuback() {
    xe("_parseUnsuback");
    const e = this.packet;
    if (!this._parseMessageId())
      return this._emitError(new Error("Cannot parse messageId"));
    if (this.settings.protocolVersion === 5) {
      const t = this._parseProperties();
      for (Object.getOwnPropertyNames(t).length && (e.properties = t), e.granted = []; this._pos < this.packet.length; )
        this.packet.granted.push(this._list.readUInt8(this._pos++));
    }
  }
  // parse packets like puback, pubrec, pubrel, pubcomp
  _parseConfirmation() {
    xe("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
    const e = this.packet;
    if (this._parseMessageId(), this.settings.protocolVersion === 5 && (e.length > 2 ? (e.reasonCode = this._parseByte(), xe("_parseConfirmation: packet.reasonCode `%d`", e.reasonCode)) : e.reasonCode = 0, e.length > 3)) {
      const t = this._parseProperties();
      Object.getOwnPropertyNames(t).length && (e.properties = t);
    }
    return !0;
  }
  // parse disconnect packet
  _parseDisconnect() {
    const e = this.packet;
    if (xe("_parseDisconnect"), this.settings.protocolVersion === 5) {
      this._list.length > 0 ? e.reasonCode = this._parseByte() : e.reasonCode = 0;
      const t = this._parseProperties();
      Object.getOwnPropertyNames(t).length && (e.properties = t);
    }
    return xe("_parseDisconnect result: true"), !0;
  }
  // parse auth packet
  _parseAuth() {
    xe("_parseAuth");
    const e = this.packet;
    if (this.settings.protocolVersion !== 5)
      return this._emitError(new Error("Not supported auth packet for this version MQTT"));
    e.reasonCode = this._parseByte();
    const t = this._parseProperties();
    return Object.getOwnPropertyNames(t).length && (e.properties = t), xe("_parseAuth: result: true"), !0;
  }
  _parseMessageId() {
    const e = this.packet;
    return e.messageId = this._parseNum(), e.messageId === null ? (this._emitError(new Error("Cannot parse messageId")), !1) : (xe("_parseMessageId: packet.messageId %d", e.messageId), !0);
  }
  _parseString(e) {
    const t = this._parseNum(), n = t + this._pos;
    if (t === -1 || n > this._list.length || n > this.packet.length)
      return null;
    const i = this._list.toString("utf8", this._pos, n);
    return this._pos += t, xe("_parseString: result: %s", i), i;
  }
  _parseStringPair() {
    return xe("_parseStringPair"), {
      name: this._parseString(),
      value: this._parseString()
    };
  }
  _parseBuffer() {
    const e = this._parseNum(), t = e + this._pos;
    if (e === -1 || t > this._list.length || t > this.packet.length)
      return null;
    const n = this._list.slice(this._pos, t);
    return this._pos += e, xe("_parseBuffer: result: %o", n), n;
  }
  _parseNum() {
    if (this._list.length - this._pos < 2)
      return -1;
    const e = this._list.readUInt16BE(this._pos);
    return this._pos += 2, xe("_parseNum: result: %s", e), e;
  }
  _parse4ByteNum() {
    if (this._list.length - this._pos < 4)
      return -1;
    const e = this._list.readUInt32BE(this._pos);
    return this._pos += 4, xe("_parse4ByteNum: result: %s", e), e;
  }
  _parseVarByteNum(e) {
    xe("_parseVarByteNum");
    const t = 4;
    let n = 0, i = 1, o = 0, s = !1, a;
    const f = this._pos ? this._pos : 0;
    for (; n < t && f + n < this._list.length; ) {
      if (a = this._list.readUInt8(f + n++), o += i * (a & Ce.VARBYTEINT_MASK), i *= 128, !(a & Ce.VARBYTEINT_FIN_MASK)) {
        s = !0;
        break;
      }
      if (this._list.length <= n)
        break;
    }
    return !s && n === t && this._list.length >= n && this._emitError(new Error("Invalid variable byte integer")), f && (this._pos += n), s = s ? e ? {
      bytes: n,
      value: o
    } : o : !1, xe("_parseVarByteNum: result: %o", s), s;
  }
  _parseByte() {
    let e;
    return this._pos < this._list.length && (e = this._list.readUInt8(this._pos), this._pos++), xe("_parseByte: result: %o", e), e;
  }
  _parseByType(e) {
    switch (xe("_parseByType: type: %s", e), e) {
      case "byte":
        return this._parseByte() !== 0;
      case "int8":
        return this._parseByte();
      case "int16":
        return this._parseNum();
      case "int32":
        return this._parse4ByteNum();
      case "var":
        return this._parseVarByteNum();
      case "string":
        return this._parseString();
      case "pair":
        return this._parseStringPair();
      case "binary":
        return this._parseBuffer();
    }
  }
  _parseProperties() {
    xe("_parseProperties");
    const e = this._parseVarByteNum(), n = this._pos + e, i = {};
    for (; this._pos < n; ) {
      const o = this._parseByte();
      if (!o)
        return this._emitError(new Error("Cannot parse property code type")), !1;
      const s = Ce.propertiesCodes[o];
      if (!s)
        return this._emitError(new Error("Unknown property")), !1;
      if (s === "userProperties") {
        i[s] || (i[s] = /* @__PURE__ */ Object.create(null));
        const a = this._parseByType(Ce.propertiesTypes[s]);
        if (i[s][a.name])
          if (Array.isArray(i[s][a.name]))
            i[s][a.name].push(a.value);
          else {
            const f = i[s][a.name];
            i[s][a.name] = [f], i[s][a.name].push(a.value);
          }
        else
          i[s][a.name] = a.value;
        continue;
      }
      i[s] ? Array.isArray(i[s]) ? i[s].push(this._parseByType(Ce.propertiesTypes[s])) : (i[s] = [i[s]], i[s].push(this._parseByType(Ce.propertiesTypes[s]))) : i[s] = this._parseByType(Ce.propertiesTypes[s]);
    }
    return i;
  }
  _newPacket() {
    return xe("_newPacket"), this.packet && (this._list.consume(this.packet.length), xe("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), xe("_newPacket: new packet"), this.packet = new Gs(), this._pos = 0, !0;
  }
  _emitError(e) {
    xe("_emitError"), this.error = e, this.emit("error", e);
  }
}
var rd = _n;
const nd = 65536, gf = {}, id = Buffer.isBuffer(Buffer.from([1, 2]).subarray(0, 1));
function bf(r) {
  const e = Buffer.allocUnsafe(2);
  return e.writeUInt8(r >> 8, 0), e.writeUInt8(r & 255, 1), e;
}
function od() {
  for (let r = 0; r < nd; r++)
    gf[r] = bf(r);
}
function sd(r) {
  let t = 0, n = 0;
  const i = Buffer.allocUnsafe(4);
  do
    t = r % 128 | 0, r = r / 128 | 0, r > 0 && (t = t | 128), i.writeUInt8(t, n++);
  while (r > 0 && n < 4);
  return r > 0 && (n = 0), id ? i.subarray(0, n) : i.slice(0, n);
}
function ad(r) {
  const e = Buffer.allocUnsafe(4);
  return e.writeUInt32BE(r, 0), e;
}
var ud = {
  cache: gf,
  generateCache: od,
  generateNumber: bf,
  genBufVariableByteInt: sd,
  generate4ByteBuffer: ad
}, So = { exports: {} };
typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? So.exports = { nextTick: fd } : So.exports = process;
function fd(r, e, t, n) {
  if (typeof r != "function")
    throw new TypeError('"callback" argument must be a function');
  var i = arguments.length, o, s;
  switch (i) {
    case 0:
    case 1:
      return process.nextTick(r);
    case 2:
      return process.nextTick(function() {
        r.call(null, e);
      });
    case 3:
      return process.nextTick(function() {
        r.call(null, e, t);
      });
    case 4:
      return process.nextTick(function() {
        r.call(null, e, t, n);
      });
    default:
      for (o = new Array(i - 1), s = 0; s < o.length; )
        o[s++] = arguments[s];
      return process.nextTick(function() {
        r.apply(null, o);
      });
  }
}
var Nt = So.exports;
const ge = xf, cd = Buffer.allocUnsafe(0), ld = Buffer.from([0]), Vr = ud, hd = Nt.nextTick, ot = It("mqtt-packet:writeToStream"), vn = Vr.cache, dd = Vr.generateNumber, pd = Vr.generateCache, Ao = Vr.genBufVariableByteInt, _d = Vr.generate4ByteBuffer;
let Xe = Bo, yn = !0;
function wf(r, e, t) {
  switch (ot("generate called"), e.cork && (e.cork(), hd(vd, e)), yn && (yn = !1, pd()), ot("generate: packet.cmd: %s", r.cmd), r.cmd) {
    case "connect":
      return yd(r, e);
    case "connack":
      return xd(r, e, t);
    case "publish":
      return gd(r, e, t);
    case "puback":
    case "pubrec":
    case "pubrel":
    case "pubcomp":
      return bd(r, e, t);
    case "subscribe":
      return wd(r, e, t);
    case "suback":
      return md(r, e, t);
    case "unsubscribe":
      return Ed(r, e, t);
    case "unsuback":
      return Sd(r, e, t);
    case "pingreq":
    case "pingresp":
      return Ad(r, e);
    case "disconnect":
      return Bd(r, e, t);
    case "auth":
      return Cd(r, e, t);
    default:
      return e.emit("error", new Error("Unknown command")), !1;
  }
}
Object.defineProperty(wf, "cacheNumbers", {
  get() {
    return Xe === Bo;
  },
  set(r) {
    r ? ((!vn || Object.keys(vn).length === 0) && (yn = !0), Xe = Bo) : (yn = !1, Xe = Td);
  }
});
function vd(r) {
  r.uncork();
}
function yd(r, e, t) {
  const n = r || {}, i = n.protocolId || "MQTT";
  let o = n.protocolVersion || 4;
  const s = n.will;
  let a = n.clean;
  const f = n.keepalive || 0, u = n.clientId || "", c = n.username, h = n.password, y = n.properties;
  a === void 0 && (a = !0);
  let T = 0;
  if (!i || typeof i != "string" && !Buffer.isBuffer(i))
    return e.emit("error", new Error("Invalid protocolId")), !1;
  if (T += i.length + 2, o !== 3 && o !== 4 && o !== 5)
    return e.emit("error", new Error("Invalid protocol version")), !1;
  if (T += 1, (typeof u == "string" || Buffer.isBuffer(u)) && (u || o >= 4) && (u || a))
    T += Buffer.byteLength(u) + 2;
  else {
    if (o < 4)
      return e.emit("error", new Error("clientId must be supplied before 3.1.1")), !1;
    if (a * 1 === 0)
      return e.emit("error", new Error("clientId must be given if cleanSession set to 0")), !1;
  }
  if (typeof f != "number" || f < 0 || f > 65535 || f % 1 !== 0)
    return e.emit("error", new Error("Invalid keepalive")), !1;
  if (T += 2, T += 1, o === 5) {
    var A = zt(e, y);
    if (!A)
      return !1;
    T += A.length;
  }
  if (s) {
    if (typeof s != "object")
      return e.emit("error", new Error("Invalid will")), !1;
    if (!s.topic || typeof s.topic != "string")
      return e.emit("error", new Error("Invalid will topic")), !1;
    if (T += Buffer.byteLength(s.topic) + 2, T += 2, s.payload)
      if (s.payload.length >= 0)
        typeof s.payload == "string" ? T += Buffer.byteLength(s.payload) : T += s.payload.length;
      else
        return e.emit("error", new Error("Invalid will payload")), !1;
    var B = {};
    if (o === 5) {
      if (B = zt(e, s.properties), !B)
        return !1;
      T += B.length;
    }
  }
  let O = !1;
  if (c != null)
    if (Zs(c))
      O = !0, T += Buffer.byteLength(c) + 2;
    else
      return e.emit("error", new Error("Invalid username")), !1;
  if (h != null) {
    if (!O)
      return e.emit("error", new Error("Username is required to use password")), !1;
    if (Zs(h))
      T += mf(h) + 2;
    else
      return e.emit("error", new Error("Invalid password")), !1;
  }
  e.write(ge.CONNECT_HEADER), at(e, T), dr(e, i), n.bridgeMode && (o += 128), e.write(
    o === 131 ? ge.VERSION131 : o === 132 ? ge.VERSION132 : o === 4 ? ge.VERSION4 : o === 5 ? ge.VERSION5 : ge.VERSION3
  );
  let d = 0;
  return d |= c != null ? ge.USERNAME_MASK : 0, d |= h != null ? ge.PASSWORD_MASK : 0, d |= s && s.retain ? ge.WILL_RETAIN_MASK : 0, d |= s && s.qos ? s.qos << ge.WILL_QOS_SHIFT : 0, d |= s ? ge.WILL_FLAG_MASK : 0, d |= a ? ge.CLEAN_SESSION_MASK : 0, e.write(Buffer.from([d])), Xe(e, f), o === 5 && A.write(), dr(e, u), s && (o === 5 && B.write(), rr(e, s.topic), dr(e, s.payload)), c != null && dr(e, c), h != null && dr(e, h), !0;
}
function xd(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = n === 5 ? i.reasonCode : i.returnCode, s = i.properties;
  let a = 2;
  if (typeof o != "number")
    return e.emit("error", new Error("Invalid return code")), !1;
  let f = null;
  if (n === 5) {
    if (f = zt(e, s), !f)
      return !1;
    a += f.length;
  }
  return e.write(ge.CONNACK_HEADER), at(e, a), e.write(i.sessionPresent ? ge.SESSIONPRESENT_HEADER : ld), e.write(Buffer.from([o])), f != null && f.write(), !0;
}
function gd(r, e, t) {
  ot("publish: packet: %o", r);
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.qos || 0, s = i.retain ? ge.RETAIN_MASK : 0, a = i.topic, f = i.payload || cd, u = i.messageId, c = i.properties;
  let h = 0;
  if (typeof a == "string")
    h += Buffer.byteLength(a) + 2;
  else if (Buffer.isBuffer(a))
    h += a.length + 2;
  else
    return e.emit("error", new Error("Invalid topic")), !1;
  if (Buffer.isBuffer(f) ? h += f.length : h += Buffer.byteLength(f), o && typeof u != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  o && (h += 2);
  let y = null;
  if (n === 5) {
    if (y = zt(e, c), !y)
      return !1;
    h += y.length;
  }
  return e.write(ge.PUBLISH_HEADER[o][i.dup ? 1 : 0][s ? 1 : 0]), at(e, h), Xe(e, mf(a)), e.write(a), o > 0 && Xe(e, u), y != null && y.write(), ot("publish: payload: %o", f), e.write(f);
}
function bd(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.cmd || "puback", s = i.messageId, a = i.dup && o === "pubrel" ? ge.DUP_MASK : 0;
  let f = 0;
  const u = i.reasonCode, c = i.properties;
  let h = n === 5 ? 3 : 2;
  if (o === "pubrel" && (f = 1), typeof s != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  let y = null;
  if (n === 5 && typeof c == "object") {
    if (y = Gr(e, c, t, h), !y)
      return !1;
    h += y.length;
  }
  return e.write(ge.ACKS[o][f][a][0]), at(e, h), Xe(e, s), n === 5 && e.write(Buffer.from([u])), y !== null && y.write(), !0;
}
function wd(r, e, t) {
  ot("subscribe: packet: ");
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.dup ? ge.DUP_MASK : 0, s = i.messageId, a = i.subscriptions, f = i.properties;
  let u = 0;
  if (typeof s != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  u += 2;
  let c = null;
  if (n === 5) {
    if (c = zt(e, f), !c)
      return !1;
    u += c.length;
  }
  if (typeof a == "object" && a.length)
    for (let y = 0; y < a.length; y += 1) {
      const T = a[y].topic, A = a[y].qos;
      if (typeof T != "string")
        return e.emit("error", new Error("Invalid subscriptions - invalid topic")), !1;
      if (typeof A != "number")
        return e.emit("error", new Error("Invalid subscriptions - invalid qos")), !1;
      if (n === 5) {
        if (typeof (a[y].nl || !1) != "boolean")
          return e.emit("error", new Error("Invalid subscriptions - invalid No Local")), !1;
        if (typeof (a[y].rap || !1) != "boolean")
          return e.emit("error", new Error("Invalid subscriptions - invalid Retain as Published")), !1;
        const d = a[y].rh || 0;
        if (typeof d != "number" || d > 2)
          return e.emit("error", new Error("Invalid subscriptions - invalid Retain Handling")), !1;
      }
      u += Buffer.byteLength(T) + 2 + 1;
    }
  else
    return e.emit("error", new Error("Invalid subscriptions")), !1;
  ot("subscribe: writing to stream: %o", ge.SUBSCRIBE_HEADER), e.write(ge.SUBSCRIBE_HEADER[1][o ? 1 : 0][0]), at(e, u), Xe(e, s), c !== null && c.write();
  let h = !0;
  for (const y of a) {
    const T = y.topic, A = y.qos, B = +y.nl, O = +y.rap, d = y.rh;
    let _;
    rr(e, T), _ = ge.SUBSCRIBE_OPTIONS_QOS[A], n === 5 && (_ |= B ? ge.SUBSCRIBE_OPTIONS_NL : 0, _ |= O ? ge.SUBSCRIBE_OPTIONS_RAP : 0, _ |= d ? ge.SUBSCRIBE_OPTIONS_RH[d] : 0), h = e.write(Buffer.from([_]));
  }
  return h;
}
function md(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.messageId, s = i.granted, a = i.properties;
  let f = 0;
  if (typeof o != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  if (f += 2, typeof s == "object" && s.length)
    for (let c = 0; c < s.length; c += 1) {
      if (typeof s[c] != "number")
        return e.emit("error", new Error("Invalid qos vector")), !1;
      f += 1;
    }
  else
    return e.emit("error", new Error("Invalid qos vector")), !1;
  let u = null;
  if (n === 5) {
    if (u = Gr(e, a, t, f), !u)
      return !1;
    f += u.length;
  }
  return e.write(ge.SUBACK_HEADER), at(e, f), Xe(e, o), u !== null && u.write(), e.write(Buffer.from(s));
}
function Ed(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.messageId, s = i.dup ? ge.DUP_MASK : 0, a = i.unsubscriptions, f = i.properties;
  let u = 0;
  if (typeof o != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  if (u += 2, typeof a == "object" && a.length)
    for (let y = 0; y < a.length; y += 1) {
      if (typeof a[y] != "string")
        return e.emit("error", new Error("Invalid unsubscriptions")), !1;
      u += Buffer.byteLength(a[y]) + 2;
    }
  else
    return e.emit("error", new Error("Invalid unsubscriptions")), !1;
  let c = null;
  if (n === 5) {
    if (c = zt(e, f), !c)
      return !1;
    u += c.length;
  }
  e.write(ge.UNSUBSCRIBE_HEADER[1][s ? 1 : 0][0]), at(e, u), Xe(e, o), c !== null && c.write();
  let h = !0;
  for (let y = 0; y < a.length; y++)
    h = rr(e, a[y]);
  return h;
}
function Sd(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.messageId, s = i.dup ? ge.DUP_MASK : 0, a = i.granted, f = i.properties, u = i.cmd, c = 0;
  let h = 2;
  if (typeof o != "number")
    return e.emit("error", new Error("Invalid messageId")), !1;
  if (n === 5)
    if (typeof a == "object" && a.length)
      for (let T = 0; T < a.length; T += 1) {
        if (typeof a[T] != "number")
          return e.emit("error", new Error("Invalid qos vector")), !1;
        h += 1;
      }
    else
      return e.emit("error", new Error("Invalid qos vector")), !1;
  let y = null;
  if (n === 5) {
    if (y = Gr(e, f, t, h), !y)
      return !1;
    h += y.length;
  }
  return e.write(ge.ACKS[u][c][s][0]), at(e, h), Xe(e, o), y !== null && y.write(), n === 5 && e.write(Buffer.from(a)), !0;
}
function Ad(r, e, t) {
  return e.write(ge.EMPTY[r.cmd]);
}
function Bd(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.reasonCode, s = i.properties;
  let a = n === 5 ? 1 : 0, f = null;
  if (n === 5) {
    if (f = Gr(e, s, t, a), !f)
      return !1;
    a += f.length;
  }
  return e.write(Buffer.from([ge.codes.disconnect << 4])), at(e, a), n === 5 && e.write(Buffer.from([o])), f !== null && f.write(), !0;
}
function Cd(r, e, t) {
  const n = t ? t.protocolVersion : 4, i = r || {}, o = i.reasonCode, s = i.properties;
  let a = n === 5 ? 1 : 0;
  n !== 5 && e.emit("error", new Error("Invalid mqtt version for auth packet"));
  const f = Gr(e, s, t, a);
  return f ? (a += f.length, e.write(Buffer.from([ge.codes.auth << 4])), at(e, a), e.write(Buffer.from([o])), f !== null && f.write(), !0) : !1;
}
const Qs = {};
function at(r, e) {
  if (e > ge.VARBYTEINT_MAX)
    return r.emit("error", new Error(`Invalid variable byte integer: ${e}`)), !1;
  let t = Qs[e];
  return t || (t = Ao(e), e < 16384 && (Qs[e] = t)), ot("writeVarByteInt: writing to stream: %o", t), r.write(t);
}
function rr(r, e) {
  const t = Buffer.byteLength(e);
  return Xe(r, t), ot("writeString: %s", e), r.write(e, "utf8");
}
function Js(r, e, t) {
  rr(r, e), rr(r, t);
}
function Bo(r, e) {
  return ot("writeNumberCached: number: %d", e), ot("writeNumberCached: %o", vn[e]), r.write(vn[e]);
}
function Td(r, e) {
  const t = dd(e);
  return ot("writeNumberGenerated: %o", t), r.write(t);
}
function Dd(r, e) {
  const t = _d(e);
  return ot("write4ByteNumber: %o", t), r.write(t);
}
function dr(r, e) {
  typeof e == "string" ? rr(r, e) : e ? (Xe(r, e.length), r.write(e)) : Xe(r, 0);
}
function zt(r, e) {
  if (typeof e != "object" || e.length != null)
    return {
      length: 1,
      write() {
        Ys(r, {}, 0);
      }
    };
  let t = 0;
  function n(o, s) {
    const a = ge.propertiesTypes[o];
    let f = 0;
    switch (a) {
      case "byte": {
        if (typeof s != "boolean")
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 2;
        break;
      }
      case "int8": {
        if (typeof s != "number" || s < 0 || s > 255)
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 2;
        break;
      }
      case "binary": {
        if (s && s === null)
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 1 + Buffer.byteLength(s) + 2;
        break;
      }
      case "int16": {
        if (typeof s != "number" || s < 0 || s > 65535)
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 3;
        break;
      }
      case "int32": {
        if (typeof s != "number" || s < 0 || s > 4294967295)
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 5;
        break;
      }
      case "var": {
        if (typeof s != "number" || s < 0 || s > 268435455)
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 1 + Buffer.byteLength(Ao(s));
        break;
      }
      case "string": {
        if (typeof s != "string")
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += 3 + Buffer.byteLength(s.toString());
        break;
      }
      case "pair": {
        if (typeof s != "object")
          return r.emit("error", new Error(`Invalid ${o}: ${s}`)), !1;
        f += Object.getOwnPropertyNames(s).reduce((u, c) => {
          const h = s[c];
          return Array.isArray(h) ? u += h.reduce((y, T) => (y += 3 + Buffer.byteLength(c.toString()) + 2 + Buffer.byteLength(T.toString()), y), 0) : u += 3 + Buffer.byteLength(c.toString()) + 2 + Buffer.byteLength(s[c].toString()), u;
        }, 0);
        break;
      }
      default:
        return r.emit("error", new Error(`Invalid property ${o}: ${s}`)), !1;
    }
    return f;
  }
  if (e)
    for (const o in e) {
      let s = 0, a = 0;
      const f = e[o];
      if (Array.isArray(f))
        for (let u = 0; u < f.length; u++) {
          if (a = n(o, f[u]), !a)
            return !1;
          s += a;
        }
      else {
        if (a = n(o, f), !a)
          return !1;
        s = a;
      }
      if (!s)
        return !1;
      t += s;
    }
  return {
    length: Buffer.byteLength(Ao(t)) + t,
    write() {
      Ys(r, e, t);
    }
  };
}
function Gr(r, e, t, n) {
  const i = ["reasonString", "userProperties"], o = t && t.properties && t.properties.maximumPacketSize ? t.properties.maximumPacketSize : 0;
  let s = zt(r, e);
  if (o)
    for (; n + s.length > o; ) {
      const a = i.shift();
      if (a && e[a])
        delete e[a], s = zt(r, e);
      else
        return !1;
    }
  return s;
}
function Xs(r, e, t) {
  switch (ge.propertiesTypes[e]) {
    case "byte": {
      r.write(Buffer.from([ge.properties[e]])), r.write(Buffer.from([+t]));
      break;
    }
    case "int8": {
      r.write(Buffer.from([ge.properties[e]])), r.write(Buffer.from([t]));
      break;
    }
    case "binary": {
      r.write(Buffer.from([ge.properties[e]])), dr(r, t);
      break;
    }
    case "int16": {
      r.write(Buffer.from([ge.properties[e]])), Xe(r, t);
      break;
    }
    case "int32": {
      r.write(Buffer.from([ge.properties[e]])), Dd(r, t);
      break;
    }
    case "var": {
      r.write(Buffer.from([ge.properties[e]])), at(r, t);
      break;
    }
    case "string": {
      r.write(Buffer.from([ge.properties[e]])), rr(r, t);
      break;
    }
    case "pair": {
      Object.getOwnPropertyNames(t).forEach((i) => {
        const o = t[i];
        Array.isArray(o) ? o.forEach((s) => {
          r.write(Buffer.from([ge.properties[e]])), Js(r, i.toString(), s.toString());
        }) : (r.write(Buffer.from([ge.properties[e]])), Js(r, i.toString(), o.toString()));
      });
      break;
    }
    default:
      return r.emit("error", new Error(`Invalid property ${e} value: ${t}`)), !1;
  }
}
function Ys(r, e, t) {
  at(r, t);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && e[n] !== null) {
      const i = e[n];
      if (Array.isArray(i))
        for (let o = 0; o < i.length; o++)
          Xs(r, n, i[o]);
      else
        Xs(r, n, i);
    }
}
function mf(r) {
  return r ? r instanceof Buffer ? r.length : Buffer.byteLength(r) : 0;
}
function Zs(r) {
  return typeof r == "string" || r instanceof Buffer;
}
var Ef = wf;
const Fd = Ef, Od = Ne;
function Md(r, e) {
  const t = new Id();
  return Fd(r, t, e), t.concat();
}
class Id extends Od {
  constructor() {
    super(), this._array = new Array(20), this._i = 0;
  }
  write(e) {
    return this._array[this._i++] = e, !0;
  }
  concat() {
    let e = 0;
    const t = new Array(this._array.length), n = this._array;
    let i = 0, o;
    for (o = 0; o < n.length && n[o] !== void 0; o++)
      typeof n[o] != "string" ? t[o] = n[o].length : t[o] = Buffer.byteLength(n[o]), e += t[o];
    const s = Buffer.allocUnsafe(e);
    for (o = 0; o < n.length && n[o] !== void 0; o++)
      typeof n[o] != "string" ? (n[o].copy(s, i), i += t[o]) : (s.write(n[o], i), i += t[o]);
    return s;
  }
}
var Nd = Md;
Tn.parser = rd.parser;
Tn.generate = Nd;
Tn.writeToStream = Ef;
function Kt() {
  if (!(this instanceof Kt))
    return new Kt();
  this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
}
Kt.prototype.allocate = function() {
  const r = this.nextId++;
  return this.nextId === 65536 && (this.nextId = 1), r;
};
Kt.prototype.getLastAllocated = function() {
  return this.nextId === 1 ? 65535 : this.nextId - 1;
};
Kt.prototype.register = function(r) {
  return !0;
};
Kt.prototype.deallocate = function(r) {
};
Kt.prototype.clear = function() {
};
var Rd = Kt;
function Pd(r, e, t) {
  var n = this;
  this._callback = r, this._args = t, this._interval = setInterval(r, e, this._args), this.reschedule = function(i) {
    i || (i = n._interval), n._interval && clearInterval(n._interval), n._interval = setInterval(n._callback, i, n._args);
  }, this.clear = function() {
    n._interval && (clearInterval(n._interval), n._interval = void 0);
  }, this.destroy = function() {
    n._interval && clearInterval(n._interval), n._callback = void 0, n._interval = void 0, n._args = void 0;
  };
}
function kd() {
  if (typeof arguments[0] != "function")
    throw new Error("callback needed");
  if (typeof arguments[1] != "number")
    throw new Error("interval needed");
  var r;
  if (arguments.length > 0) {
    r = new Array(arguments.length - 2);
    for (var e = 0; e < r.length; e++)
      r[e] = arguments[e + 2];
  }
  return new Pd(arguments[0], arguments[1], r);
}
var jd = kd, Ud = Ld;
function xr(r) {
  return r instanceof Buffer ? Buffer.from(r) : new r.constructor(r.buffer.slice(), r.byteOffset, r.length);
}
function Ld(r) {
  if (r = r || {}, r.circles)
    return qd(r);
  return r.proto ? n : t;
  function e(i, o) {
    for (var s = Object.keys(i), a = new Array(s.length), f = 0; f < s.length; f++) {
      var u = s[f], c = i[u];
      typeof c != "object" || c === null ? a[u] = c : c instanceof Date ? a[u] = new Date(c) : ArrayBuffer.isView(c) ? a[u] = xr(c) : a[u] = o(c);
    }
    return a;
  }
  function t(i) {
    if (typeof i != "object" || i === null)
      return i;
    if (i instanceof Date)
      return new Date(i);
    if (Array.isArray(i))
      return e(i, t);
    if (i instanceof Map)
      return new Map(e(Array.from(i), t));
    if (i instanceof Set)
      return new Set(e(Array.from(i), t));
    var o = {};
    for (var s in i)
      if (Object.hasOwnProperty.call(i, s) !== !1) {
        var a = i[s];
        typeof a != "object" || a === null ? o[s] = a : a instanceof Date ? o[s] = new Date(a) : a instanceof Map ? o[s] = new Map(e(Array.from(a), t)) : a instanceof Set ? o[s] = new Set(e(Array.from(a), t)) : ArrayBuffer.isView(a) ? o[s] = xr(a) : o[s] = t(a);
      }
    return o;
  }
  function n(i) {
    if (typeof i != "object" || i === null)
      return i;
    if (i instanceof Date)
      return new Date(i);
    if (Array.isArray(i))
      return e(i, n);
    if (i instanceof Map)
      return new Map(e(Array.from(i), n));
    if (i instanceof Set)
      return new Set(e(Array.from(i), n));
    var o = {};
    for (var s in i) {
      var a = i[s];
      typeof a != "object" || a === null ? o[s] = a : a instanceof Date ? o[s] = new Date(a) : a instanceof Map ? o[s] = new Map(e(Array.from(a), n)) : a instanceof Set ? o[s] = new Set(e(Array.from(a), n)) : ArrayBuffer.isView(a) ? o[s] = xr(a) : o[s] = n(a);
    }
    return o;
  }
}
function qd(r) {
  var e = [], t = [];
  return r.proto ? o : i;
  function n(s, a) {
    for (var f = Object.keys(s), u = new Array(f.length), c = 0; c < f.length; c++) {
      var h = f[c], y = s[h];
      if (typeof y != "object" || y === null)
        u[h] = y;
      else if (y instanceof Date)
        u[h] = new Date(y);
      else if (ArrayBuffer.isView(y))
        u[h] = xr(y);
      else {
        var T = e.indexOf(y);
        T !== -1 ? u[h] = t[T] : u[h] = a(y);
      }
    }
    return u;
  }
  function i(s) {
    if (typeof s != "object" || s === null)
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (Array.isArray(s))
      return n(s, i);
    if (s instanceof Map)
      return new Map(n(Array.from(s), i));
    if (s instanceof Set)
      return new Set(n(Array.from(s), i));
    var a = {};
    e.push(s), t.push(a);
    for (var f in s)
      if (Object.hasOwnProperty.call(s, f) !== !1) {
        var u = s[f];
        if (typeof u != "object" || u === null)
          a[f] = u;
        else if (u instanceof Date)
          a[f] = new Date(u);
        else if (u instanceof Map)
          a[f] = new Map(n(Array.from(u), i));
        else if (u instanceof Set)
          a[f] = new Set(n(Array.from(u), i));
        else if (ArrayBuffer.isView(u))
          a[f] = xr(u);
        else {
          var c = e.indexOf(u);
          c !== -1 ? a[f] = t[c] : a[f] = i(u);
        }
      }
    return e.pop(), t.pop(), a;
  }
  function o(s) {
    if (typeof s != "object" || s === null)
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (Array.isArray(s))
      return n(s, o);
    if (s instanceof Map)
      return new Map(n(Array.from(s), o));
    if (s instanceof Set)
      return new Set(n(Array.from(s), o));
    var a = {};
    e.push(s), t.push(a);
    for (var f in s) {
      var u = s[f];
      if (typeof u != "object" || u === null)
        a[f] = u;
      else if (u instanceof Date)
        a[f] = new Date(u);
      else if (u instanceof Map)
        a[f] = new Map(n(Array.from(u), o));
      else if (u instanceof Set)
        a[f] = new Set(n(Array.from(u), o));
      else if (ArrayBuffer.isView(u))
        a[f] = xr(u);
      else {
        var c = e.indexOf(u);
        c !== -1 ? a[f] = t[c] : a[f] = o(u);
      }
    }
    return e.pop(), t.pop(), a;
  }
}
var Hd = Ud();
function $d(r) {
  const e = r.split("/");
  for (let t = 0; t < e.length; t++)
    if (e[t] !== "+") {
      if (e[t] === "#")
        return t === e.length - 1;
      if (e[t].indexOf("+") !== -1 || e[t].indexOf("#") !== -1)
        return !1;
    }
  return !0;
}
function Wd(r) {
  if (r.length === 0)
    return "empty_topic_list";
  for (let e = 0; e < r.length; e++)
    if (!$d(r[e]))
      return r[e];
  return null;
}
var zd = {
  validateTopics: Wd
};
const Sf = Ne.EventEmitter, xn = Xu, Kd = j0, Vd = Gh, Af = Tn, Gd = Rd, Qd = or.Writable, Jd = Ue, Xd = jd, Bf = Hd, Cf = zd, Fn = Go, le = It("mqttjs:client"), es = process ? process.nextTick : function(r) {
  setTimeout(r, 0);
}, ts = Q.setImmediate || function(r) {
  es(r);
}, ea = {
  keepalive: 60,
  reschedulePings: !0,
  protocolId: "MQTT",
  protocolVersion: 4,
  reconnectPeriod: 1e3,
  connectTimeout: 30 * 1e3,
  clean: !0,
  resubscribe: !0
}, gn = {
  0: "",
  1: "Unacceptable protocol version",
  2: "Identifier rejected",
  3: "Server unavailable",
  4: "Bad username or password",
  5: "Not authorized",
  16: "No matching subscribers",
  17: "No subscription existed",
  128: "Unspecified error",
  129: "Malformed Packet",
  130: "Protocol Error",
  131: "Implementation specific error",
  132: "Unsupported Protocol Version",
  133: "Client Identifier not valid",
  134: "Bad User Name or Password",
  135: "Not authorized",
  136: "Server unavailable",
  137: "Server busy",
  138: "Banned",
  139: "Server shutting down",
  140: "Bad authentication method",
  141: "Keep Alive timeout",
  142: "Session taken over",
  143: "Topic Filter invalid",
  144: "Topic Name invalid",
  145: "Packet identifier in use",
  146: "Packet Identifier not found",
  147: "Receive Maximum exceeded",
  148: "Topic Alias invalid",
  149: "Packet too large",
  150: "Message rate too high",
  151: "Quota exceeded",
  152: "Administrative action",
  153: "Payload format invalid",
  154: "Retain not supported",
  155: "QoS not supported",
  156: "Use another server",
  157: "Server moved",
  158: "Shared Subscriptions not supported",
  159: "Connection rate exceeded",
  160: "Maximum connect time",
  161: "Subscription Identifiers not supported",
  162: "Wildcard Subscriptions not supported"
};
function Yd() {
  return "mqttjs_" + Math.random().toString(16).substr(2, 8);
}
function Zd(r, e) {
  if (r.options.protocolVersion === 5 && e.cmd === "publish") {
    let t;
    e.properties && (t = e.properties.topicAlias);
    const n = e.topic.toString();
    if (r.topicAliasSend)
      if (t) {
        if (n.length !== 0 && (le("applyTopicAlias :: register topic: %s - alias: %d", n, t), !r.topicAliasSend.put(n, t)))
          return le("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, t), new Error("Sending Topic Alias out of range");
      } else
        n.length !== 0 && (r.options.autoAssignTopicAlias ? (t = r.topicAliasSend.getAliasByTopic(n), t ? (e.topic = "", e.properties = { ...e.properties, topicAlias: t }, le("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", n, t)) : (t = r.topicAliasSend.getLruAlias(), r.topicAliasSend.put(n, t), e.properties = { ...e.properties, topicAlias: t }, le("applyTopicAlias :: auto assign topic: %s - alias: %d", n, t))) : r.options.autoUseTopicAlias && (t = r.topicAliasSend.getAliasByTopic(n), t && (e.topic = "", e.properties = { ...e.properties, topicAlias: t }, le("applyTopicAlias :: auto use topic: %s - alias: %d", n, t))));
    else if (t)
      return le("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, t), new Error("Sending Topic Alias out of range");
  }
}
function Tf(r, e) {
  let t;
  e.properties && (t = e.properties.topicAlias);
  let n = e.topic.toString();
  if (n.length === 0) {
    if (typeof t > "u")
      return new Error("Unregistered Topic Alias");
    if (n = r.topicAliasSend.getTopicByAlias(t), typeof n > "u")
      return new Error("Unregistered Topic Alias");
    e.topic = n;
  }
  t && delete e.properties.topicAlias;
}
function gr(r, e, t) {
  le("sendPacket :: packet: %O", e), le("sendPacket :: emitting `packetsend`"), r.emit("packetsend", e), le("sendPacket :: writing to stream");
  const n = Af.writeToStream(e, r.stream, r.options);
  le("sendPacket :: writeToStream result %s", n), !n && t && t !== We ? (le("sendPacket :: handle events on `drain` once through callback."), r.stream.once("drain", t)) : t && (le("sendPacket :: invoking cb"), t());
}
function ep(r) {
  r && (le("flush: queue exists? %b", !!r), Object.keys(r).forEach(function(e) {
    typeof r[e].cb == "function" && (r[e].cb(new Error("Connection closed")), delete r[e]);
  }));
}
function tp(r) {
  r && (le("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(r).forEach(function(e) {
    r[e].volatile && typeof r[e].cb == "function" && (r[e].cb(new Error("Connection closed")), delete r[e]);
  }));
}
function ta(r, e, t, n) {
  le("storeAndSend :: store packet with cmd %s to outgoingStore", e.cmd);
  let i = e, o;
  if (i.cmd === "publish" && (i = Bf(e), o = Tf(r, i), o))
    return t && t(o);
  r.outgoingStore.put(i, function(a) {
    if (a)
      return t && t(a);
    n(), gr(r, e, t);
  });
}
function We(r) {
  le("nop ::", r);
}
function we(r, e) {
  let t;
  const n = this;
  if (!(this instanceof we))
    return new we(r, e);
  this.options = e || {};
  for (t in ea)
    typeof this.options[t] > "u" ? this.options[t] = ea[t] : this.options[t] = e[t];
  le("MqttClient :: options.protocol", e.protocol), le("MqttClient :: options.protocolVersion", e.protocolVersion), le("MqttClient :: options.username", e.username), le("MqttClient :: options.keepalive", e.keepalive), le("MqttClient :: options.reconnectPeriod", e.reconnectPeriod), le("MqttClient :: options.rejectUnauthorized", e.rejectUnauthorized), le("MqttClient :: options.topicAliasMaximum", e.topicAliasMaximum), this.options.clientId = typeof e.clientId == "string" ? e.clientId : Yd(), le("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = e.protocolVersion === 5 && e.customHandleAcks ? e.customHandleAcks : function() {
    arguments[3](0);
  }, this.streamBuilder = r, this.messageIdProvider = typeof this.options.messageIdProvider > "u" ? new Gd() : this.options.messageIdProvider, this.outgoingStore = e.outgoingStore || new xn(), this.incomingStore = e.incomingStore || new xn(), this.queueQoSZero = e.queueQoSZero === void 0 ? !0 : e.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.pingTimer = null, this.connected = !1, this.disconnecting = !1, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = !1, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = !0, e.topicAliasMaximum > 0 && (e.topicAliasMaximum > 65535 ? le("MqttClient :: options.topicAliasMaximum is out of range") : this.topicAliasRecv = new Kd(e.topicAliasMaximum)), this.on("connect", function() {
    const i = this.queue;
    function o() {
      const s = i.shift();
      le("deliver :: entry %o", s);
      let a = null;
      if (!s) {
        n._resubscribe();
        return;
      }
      a = s.packet, le("deliver :: call _sendPacket for %o", a);
      let f = !0;
      a.messageId && a.messageId !== 0 && (n.messageIdProvider.register(a.messageId) || (f = !1)), f ? n._sendPacket(
        a,
        function(u) {
          s.cb && s.cb(u), o();
        }
      ) : (le("messageId: %d has already used. The message is skipped and removed.", a.messageId), o());
    }
    le("connect :: sending queued packets"), o();
  }), this.on("close", function() {
    le("close :: connected set to `false`"), this.connected = !1, le("close :: clearing connackTimer"), clearTimeout(this.connackTimer), le("close :: clearing ping timer"), n.pingTimer !== null && (n.pingTimer.clear(), n.pingTimer = null), this.topicAliasRecv && this.topicAliasRecv.clear(), le("close :: calling _setupReconnect"), this._setupReconnect();
  }), Sf.call(this), le("MqttClient :: setting up stream"), this._setupStream();
}
Jd(we, Sf);
we.prototype._setupStream = function() {
  const r = this, e = new Qd(), t = Af.parser(this.options);
  let n = null;
  const i = [];
  le("_setupStream :: calling method to clear reconnect"), this._clearReconnect(), le("_setupStream :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), t.on("packet", function(u) {
    le("parser :: on packet push to packets array."), i.push(u);
  });
  function o() {
    if (i.length)
      es(s);
    else {
      const u = n;
      n = null, u();
    }
  }
  function s() {
    le("work :: getting next packet in queue");
    const u = i.shift();
    if (u)
      le("work :: packet pulled from queue"), r._handlePacket(u, o);
    else {
      le("work :: no packets in queue");
      const c = n;
      n = null, le("work :: done flag is %s", !!c), c && c();
    }
  }
  e._write = function(u, c, h) {
    n = h, le("writable stream :: parsing buffer"), t.parse(u), s();
  };
  function a(u) {
    le("streamErrorHandler :: error", u.message), u.code ? (le("streamErrorHandler :: emitting error"), r.emit("error", u)) : We(u);
  }
  le("_setupStream :: pipe stream to writable stream"), this.stream.pipe(e), this.stream.on("error", a), this.stream.on("close", function() {
    le("(%s)stream :: on close", r.options.clientId), tp(r.outgoing), le("stream: emit close to MqttClient"), r.emit("close");
  }), le("_setupStream: sending packet `connect`");
  const f = Object.create(this.options);
  if (f.cmd = "connect", this.topicAliasRecv && (f.properties || (f.properties = {}), this.topicAliasRecv && (f.properties.topicAliasMaximum = this.topicAliasRecv.max)), gr(this, f), t.on("error", this.emit.bind(this, "error")), this.options.properties) {
    if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData)
      return r.end(() => this.emit(
        "error",
        new Error("Packet has no Authentication Method")
      )), this;
    if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket == "object") {
      const u = Fn({ cmd: "auth", reasonCode: 0 }, this.options.authPacket);
      gr(this, u);
    }
  }
  this.stream.setMaxListeners(1e3), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(function() {
    le("!!connectTimeout hit!! Calling _cleanUp with force `true`"), r._cleanUp(!0);
  }, this.options.connectTimeout);
};
we.prototype._handlePacket = function(r, e) {
  const t = this.options;
  if (t.protocolVersion === 5 && t.properties && t.properties.maximumPacketSize && t.properties.maximumPacketSize < r.length)
    return this.emit("error", new Error("exceeding packets size " + r.cmd)), this.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } }), this;
  switch (le("_handlePacket :: emitting packetreceive"), this.emit("packetreceive", r), r.cmd) {
    case "publish":
      this._handlePublish(r, e);
      break;
    case "puback":
    case "pubrec":
    case "pubcomp":
    case "suback":
    case "unsuback":
      this._handleAck(r), e();
      break;
    case "pubrel":
      this._handlePubrel(r, e);
      break;
    case "connack":
      this._handleConnack(r), e();
      break;
    case "auth":
      this._handleAuth(r), e();
      break;
    case "pingresp":
      this._handlePingresp(r), e();
      break;
    case "disconnect":
      this._handleDisconnect(r), e();
      break;
  }
};
we.prototype._checkDisconnecting = function(r) {
  return this.disconnecting && (r && r !== We ? r(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
};
we.prototype.publish = function(r, e, t, n) {
  le("publish :: message `%s` to topic `%s`", e, r);
  const i = this.options;
  if (typeof t == "function" && (n = t, t = null), t = Fn({ qos: 0, retain: !1, dup: !1 }, t), this._checkDisconnecting(n))
    return this;
  const s = this, a = function() {
    let f = 0;
    if ((t.qos === 1 || t.qos === 2) && (f = s._nextId(), f === null))
      return le("No messageId left"), !1;
    const u = {
      cmd: "publish",
      topic: r,
      payload: e,
      qos: t.qos,
      retain: t.retain,
      messageId: f,
      dup: t.dup
    };
    switch (i.protocolVersion === 5 && (u.properties = t.properties), le("publish :: qos", t.qos), t.qos) {
      case 1:
      case 2:
        s.outgoing[u.messageId] = {
          volatile: !1,
          cb: n || We
        }, le("MqttClient:publish: packet cmd: %s", u.cmd), s._sendPacket(u, void 0, t.cbStorePut);
        break;
      default:
        le("MqttClient:publish: packet cmd: %s", u.cmd), s._sendPacket(u, n, t.cbStorePut);
        break;
    }
    return !0;
  };
  return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !a()) && this._storeProcessingQueue.push(
    {
      invoke: a,
      cbStorePut: t.cbStorePut,
      callback: n
    }
  ), this;
};
we.prototype.subscribe = function() {
  const r = this, e = new Array(arguments.length);
  for (let h = 0; h < arguments.length; h++)
    e[h] = arguments[h];
  const t = [];
  let n = e.shift();
  const i = n.resubscribe;
  let o = e.pop() || We, s = e.pop();
  const a = this.options.protocolVersion;
  delete n.resubscribe, typeof n == "string" && (n = [n]), typeof o != "function" && (s = o, o = We);
  const f = Cf.validateTopics(n);
  if (f !== null)
    return ts(o, new Error("Invalid topic " + f)), this;
  if (this._checkDisconnecting(o))
    return le("subscribe: discconecting true"), this;
  const u = {
    qos: 0
  };
  if (a === 5 && (u.nl = !1, u.rap = !1, u.rh = 0), s = Fn(u, s), Array.isArray(n) ? n.forEach(function(h) {
    if (le("subscribe: array topic %s", h), !Object.prototype.hasOwnProperty.call(r._resubscribeTopics, h) || r._resubscribeTopics[h].qos < s.qos || i) {
      const y = {
        topic: h,
        qos: s.qos
      };
      a === 5 && (y.nl = s.nl, y.rap = s.rap, y.rh = s.rh, y.properties = s.properties), le("subscribe: pushing topic `%s` and qos `%s` to subs list", y.topic, y.qos), t.push(y);
    }
  }) : Object.keys(n).forEach(function(h) {
    if (le("subscribe: object topic %s", h), !Object.prototype.hasOwnProperty.call(r._resubscribeTopics, h) || r._resubscribeTopics[h].qos < n[h].qos || i) {
      const y = {
        topic: h,
        qos: n[h].qos
      };
      a === 5 && (y.nl = n[h].nl, y.rap = n[h].rap, y.rh = n[h].rh, y.properties = s.properties), le("subscribe: pushing `%s` to subs list", y), t.push(y);
    }
  }), !t.length)
    return o(null, []), this;
  const c = function() {
    const h = r._nextId();
    if (h === null)
      return le("No messageId left"), !1;
    const y = {
      cmd: "subscribe",
      subscriptions: t,
      qos: 1,
      retain: !1,
      dup: !1,
      messageId: h
    };
    if (s.properties && (y.properties = s.properties), r.options.resubscribe) {
      le("subscribe :: resubscribe true");
      const T = [];
      t.forEach(function(A) {
        if (r.options.reconnectPeriod > 0) {
          const B = { qos: A.qos };
          a === 5 && (B.nl = A.nl || !1, B.rap = A.rap || !1, B.rh = A.rh || 0, B.properties = A.properties), r._resubscribeTopics[A.topic] = B, T.push(A.topic);
        }
      }), r.messageIdToTopic[y.messageId] = T;
    }
    return r.outgoing[y.messageId] = {
      volatile: !0,
      cb: function(T, A) {
        if (!T) {
          const B = A.granted;
          for (let O = 0; O < B.length; O += 1)
            t[O].qos = B[O];
        }
        o(T, t);
      }
    }, le("subscribe :: call _sendPacket"), r._sendPacket(y), !0;
  };
  return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !c()) && this._storeProcessingQueue.push(
    {
      invoke: c,
      callback: o
    }
  ), this;
};
we.prototype.unsubscribe = function() {
  const r = this, e = new Array(arguments.length);
  for (let a = 0; a < arguments.length; a++)
    e[a] = arguments[a];
  let t = e.shift(), n = e.pop() || We, i = e.pop();
  typeof t == "string" && (t = [t]), typeof n != "function" && (i = n, n = We);
  const o = Cf.validateTopics(t);
  if (o !== null)
    return ts(n, new Error("Invalid topic " + o)), this;
  if (r._checkDisconnecting(n))
    return this;
  const s = function() {
    const a = r._nextId();
    if (a === null)
      return le("No messageId left"), !1;
    const f = {
      cmd: "unsubscribe",
      qos: 1,
      messageId: a
    };
    return typeof t == "string" ? f.unsubscriptions = [t] : Array.isArray(t) && (f.unsubscriptions = t), r.options.resubscribe && f.unsubscriptions.forEach(function(u) {
      delete r._resubscribeTopics[u];
    }), typeof i == "object" && i.properties && (f.properties = i.properties), r.outgoing[f.messageId] = {
      volatile: !0,
      cb: n
    }, le("unsubscribe: call _sendPacket"), r._sendPacket(f), !0;
  };
  return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s()) && this._storeProcessingQueue.push(
    {
      invoke: s,
      callback: n
    }
  ), this;
};
we.prototype.end = function(r, e, t) {
  const n = this;
  le("end :: (%s)", this.options.clientId), (r == null || typeof r != "boolean") && (t = e || We, e = r, r = !1, typeof e != "object" && (t = e, e = null, typeof t != "function" && (t = We))), typeof e != "object" && (t = e, e = null), le("end :: cb? %s", !!t), t = t || We;
  function i() {
    le("end :: closeStores: closing incoming and outgoing stores"), n.disconnected = !0, n.incomingStore.close(function(s) {
      n.outgoingStore.close(function(a) {
        if (le("end :: closeStores: emitting end"), n.emit("end"), t) {
          const f = s || a;
          le("end :: closeStores: invoking callback with args"), t(f);
        }
      });
    }), n._deferredReconnect && n._deferredReconnect();
  }
  function o() {
    le("end :: (%s) :: finish :: calling _cleanUp with force %s", n.options.clientId, r), n._cleanUp(r, () => {
      le("end :: finish :: calling process.nextTick on closeStores"), es(i.bind(n));
    }, e);
  }
  return this.disconnecting ? (t(), this) : (this._clearReconnect(), this.disconnecting = !0, !r && Object.keys(this.outgoing).length > 0 ? (le("end :: (%s) :: calling finish in 10ms once outgoing is empty", n.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, o, 10))) : (le("end :: (%s) :: immediately calling finish", n.options.clientId), o()), this);
};
we.prototype.removeOutgoingMessage = function(r) {
  const e = this.outgoing[r] ? this.outgoing[r].cb : null;
  return delete this.outgoing[r], this.outgoingStore.del({ messageId: r }, function() {
    e(new Error("Message removed"));
  }), this;
};
we.prototype.reconnect = function(r) {
  le("client reconnect");
  const e = this, t = function() {
    r ? (e.options.incomingStore = r.incomingStore, e.options.outgoingStore = r.outgoingStore) : (e.options.incomingStore = null, e.options.outgoingStore = null), e.incomingStore = e.options.incomingStore || new xn(), e.outgoingStore = e.options.outgoingStore || new xn(), e.disconnecting = !1, e.disconnected = !1, e._deferredReconnect = null, e._reconnect();
  };
  return this.disconnecting && !this.disconnected ? this._deferredReconnect = t : t(), this;
};
we.prototype._reconnect = function() {
  le("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
    this._setupStream();
  }), le("client already connected. disconnecting first.")) : (le("_reconnect: calling _setupStream"), this._setupStream());
};
we.prototype._setupReconnect = function() {
  const r = this;
  !r.disconnecting && !r.reconnectTimer && r.options.reconnectPeriod > 0 ? (this.reconnecting || (le("_setupReconnect :: emit `offline` state"), this.emit("offline"), le("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = !0), le("_setupReconnect :: setting reconnectTimer for %d ms", r.options.reconnectPeriod), r.reconnectTimer = setInterval(function() {
    le("reconnectTimer :: reconnect triggered!"), r._reconnect();
  }, r.options.reconnectPeriod)) : le("_setupReconnect :: doing nothing...");
};
we.prototype._clearReconnect = function() {
  le("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
};
we.prototype._cleanUp = function(r, e) {
  const t = arguments[2];
  if (e && (le("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", e)), le("_cleanUp :: forced? %s", r), r)
    this.options.reconnectPeriod === 0 && this.options.clean && ep(this.outgoing), le("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();
  else {
    const n = Fn({ cmd: "disconnect" }, t);
    le("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(
      n,
      ts.bind(
        null,
        this.stream.end.bind(this.stream)
      )
    );
  }
  this.disconnecting || (le("_cleanUp :: client not disconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), this.pingTimer !== null && (le("_cleanUp :: clearing pingTimer"), this.pingTimer.clear(), this.pingTimer = null), e && !this.connected && (le("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", e), e());
};
we.prototype._sendPacket = function(r, e, t) {
  le("_sendPacket :: (%s) ::  start", this.options.clientId), t = t || We, e = e || We;
  const n = Zd(this, r);
  if (n) {
    e(n);
    return;
  }
  if (!this.connected) {
    if (r.cmd === "auth") {
      this._shiftPingInterval(), gr(this, r, e);
      return;
    }
    le("_sendPacket :: client not connected. Storing packet offline."), this._storePacket(r, e, t);
    return;
  }
  switch (this._shiftPingInterval(), r.cmd) {
    case "publish":
      break;
    case "pubrel":
      ta(this, r, e, t);
      return;
    default:
      gr(this, r, e);
      return;
  }
  switch (r.qos) {
    case 2:
    case 1:
      ta(this, r, e, t);
      break;
    case 0:
    default:
      gr(this, r, e);
      break;
  }
  le("_sendPacket :: (%s) ::  end", this.options.clientId);
};
we.prototype._storePacket = function(r, e, t) {
  le("_storePacket :: packet: %o", r), le("_storePacket :: cb? %s", !!e), t = t || We;
  let n = r;
  if (n.cmd === "publish") {
    n = Bf(r);
    const i = Tf(this, n);
    if (i)
      return e && e(i);
  }
  (n.qos || 0) === 0 && this.queueQoSZero || n.cmd !== "publish" ? this.queue.push({ packet: n, cb: e }) : n.qos > 0 ? (e = this.outgoing[n.messageId] ? this.outgoing[n.messageId].cb : null, this.outgoingStore.put(n, function(i) {
    if (i)
      return e && e(i);
    t();
  })) : e && e(new Error("No connection to broker"));
};
we.prototype._setupPingTimer = function() {
  le("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
  const r = this;
  !this.pingTimer && this.options.keepalive && (this.pingResp = !0, this.pingTimer = Xd(function() {
    r._checkPing();
  }, this.options.keepalive * 1e3));
};
we.prototype._shiftPingInterval = function() {
  this.pingTimer && this.options.keepalive && this.options.reschedulePings && this.pingTimer.reschedule(this.options.keepalive * 1e3);
};
we.prototype._checkPing = function() {
  le("_checkPing :: checking ping..."), this.pingResp ? (le("_checkPing :: ping response received. Clearing flag and sending `pingreq`"), this.pingResp = !1, this._sendPacket({ cmd: "pingreq" })) : (le("_checkPing :: calling _cleanUp with force true"), this._cleanUp(!0));
};
we.prototype._handlePingresp = function() {
  this.pingResp = !0;
};
we.prototype._handleConnack = function(r) {
  le("_handleConnack");
  const e = this.options, n = e.protocolVersion === 5 ? r.reasonCode : r.returnCode;
  if (clearTimeout(this.connackTimer), delete this.topicAliasSend, r.properties) {
    if (r.properties.topicAliasMaximum) {
      if (r.properties.topicAliasMaximum > 65535) {
        this.emit("error", new Error("topicAliasMaximum from broker is out of range"));
        return;
      }
      r.properties.topicAliasMaximum > 0 && (this.topicAliasSend = new Vd(r.properties.topicAliasMaximum));
    }
    r.properties.serverKeepAlive && e.keepalive && (e.keepalive = r.properties.serverKeepAlive, this._shiftPingInterval()), r.properties.maximumPacketSize && (e.properties || (e.properties = {}), e.properties.maximumPacketSize = r.properties.maximumPacketSize);
  }
  if (n === 0)
    this.reconnecting = !1, this._onConnect(r);
  else if (n > 0) {
    const i = new Error("Connection refused: " + gn[n]);
    i.code = n, this.emit("error", i);
  }
};
we.prototype._handleAuth = function(r) {
  const t = this.options.protocolVersion, n = t === 5 ? r.reasonCode : r.returnCode;
  if (t !== 5) {
    const o = new Error("Protocol error: Auth packets are only supported in MQTT 5. Your version:" + t);
    o.code = n, this.emit("error", o);
    return;
  }
  const i = this;
  this.handleAuth(r, function(o, s) {
    if (o) {
      i.emit("error", o);
      return;
    }
    if (n === 24)
      i.reconnecting = !1, i._sendPacket(s);
    else {
      const a = new Error("Connection refused: " + gn[n]);
      o.code = n, i.emit("error", a);
    }
  });
};
we.prototype.handleAuth = function(r, e) {
  e();
};
we.prototype._handlePublish = function(r, e) {
  le("_handlePublish: packet %o", r), e = typeof e < "u" ? e : We;
  let t = r.topic.toString();
  const n = r.payload, i = r.qos, o = r.messageId, s = this, a = this.options, f = [0, 16, 128, 131, 135, 144, 145, 151, 153];
  if (this.options.protocolVersion === 5) {
    let u;
    if (r.properties && (u = r.properties.topicAlias), typeof u < "u")
      if (t.length === 0)
        if (u > 0 && u <= 65535) {
          const c = this.topicAliasRecv.getTopicByAlias(u);
          if (c)
            t = c, le("_handlePublish :: topic complemented by alias. topic: %s - alias: %d", t, u);
          else {
            le("_handlePublish :: unregistered topic alias. alias: %d", u), this.emit("error", new Error("Received unregistered Topic Alias"));
            return;
          }
        } else {
          le("_handlePublish :: topic alias out of range. alias: %d", u), this.emit("error", new Error("Received Topic Alias is out of range"));
          return;
        }
      else if (this.topicAliasRecv.put(t, u))
        le("_handlePublish :: registered topic: %s - alias: %d", t, u);
      else {
        le("_handlePublish :: topic alias out of range. alias: %d", u), this.emit("error", new Error("Received Topic Alias is out of range"));
        return;
      }
  }
  switch (le("_handlePublish: qos %d", i), i) {
    case 2: {
      a.customHandleAcks(t, n, r, function(u, c) {
        if (u instanceof Error || (c = u, u = null), u)
          return s.emit("error", u);
        if (f.indexOf(c) === -1)
          return s.emit("error", new Error("Wrong reason code for pubrec"));
        c ? s._sendPacket({ cmd: "pubrec", messageId: o, reasonCode: c }, e) : s.incomingStore.put(r, function() {
          s._sendPacket({ cmd: "pubrec", messageId: o }, e);
        });
      });
      break;
    }
    case 1: {
      a.customHandleAcks(t, n, r, function(u, c) {
        if (u instanceof Error || (c = u, u = null), u)
          return s.emit("error", u);
        if (f.indexOf(c) === -1)
          return s.emit("error", new Error("Wrong reason code for puback"));
        c || s.emit("message", t, n, r), s.handleMessage(r, function(h) {
          if (h)
            return e && e(h);
          s._sendPacket({ cmd: "puback", messageId: o, reasonCode: c }, e);
        });
      });
      break;
    }
    case 0:
      this.emit("message", t, n, r), this.handleMessage(r, e);
      break;
    default:
      le("_handlePublish: unknown QoS. Doing nothing.");
      break;
  }
};
we.prototype.handleMessage = function(r, e) {
  e();
};
we.prototype._handleAck = function(r) {
  const e = r.messageId, t = r.cmd;
  let n = null;
  const i = this.outgoing[e] ? this.outgoing[e].cb : null, o = this;
  let s;
  if (!i) {
    le("_handleAck :: Server sent an ack in error. Ignoring.");
    return;
  }
  switch (le("_handleAck :: packet type", t), t) {
    case "pubcomp":
    case "puback": {
      const a = r.reasonCode;
      a && a > 0 && a !== 16 && (s = new Error("Publish error: " + gn[a]), s.code = a, i(s, r)), delete this.outgoing[e], this.outgoingStore.del(r, i), this.messageIdProvider.deallocate(e), this._invokeStoreProcessingQueue();
      break;
    }
    case "pubrec": {
      n = {
        cmd: "pubrel",
        qos: 2,
        messageId: e
      };
      const a = r.reasonCode;
      a && a > 0 && a !== 16 ? (s = new Error("Publish error: " + gn[a]), s.code = a, i(s, r)) : this._sendPacket(n);
      break;
    }
    case "suback": {
      delete this.outgoing[e], this.messageIdProvider.deallocate(e);
      for (let a = 0; a < r.granted.length; a++)
        if (r.granted[a] & 128) {
          const f = this.messageIdToTopic[e];
          f && f.forEach(function(u) {
            delete o._resubscribeTopics[u];
          });
        }
      this._invokeStoreProcessingQueue(), i(null, r);
      break;
    }
    case "unsuback": {
      delete this.outgoing[e], this.messageIdProvider.deallocate(e), this._invokeStoreProcessingQueue(), i(null);
      break;
    }
    default:
      o.emit("error", new Error("unrecognized packet type"));
  }
  this.disconnecting && Object.keys(this.outgoing).length === 0 && this.emit("outgoingEmpty");
};
we.prototype._handlePubrel = function(r, e) {
  le("handling pubrel packet"), e = typeof e < "u" ? e : We;
  const t = r.messageId, n = this, i = { cmd: "pubcomp", messageId: t };
  n.incomingStore.get(r, function(o, s) {
    o ? n._sendPacket(i, e) : (n.emit("message", s.topic, s.payload, s), n.handleMessage(s, function(a) {
      if (a)
        return e(a);
      n.incomingStore.del(s, We), n._sendPacket(i, e);
    }));
  });
};
we.prototype._handleDisconnect = function(r) {
  this.emit("disconnect", r);
};
we.prototype._nextId = function() {
  return this.messageIdProvider.allocate();
};
we.prototype.getLastMessageId = function() {
  return this.messageIdProvider.getLastAllocated();
};
we.prototype._resubscribe = function() {
  le("_resubscribe");
  const r = Object.keys(this._resubscribeTopics);
  if (!this._firstConnection && (this.options.clean || this.options.protocolVersion === 5 && !this.connackPacket.sessionPresent) && r.length > 0)
    if (this.options.resubscribe)
      if (this.options.protocolVersion === 5) {
        le("_resubscribe: protocolVersion 5");
        for (let e = 0; e < r.length; e++) {
          const t = {};
          t[r[e]] = this._resubscribeTopics[r[e]], t.resubscribe = !0, this.subscribe(t, { properties: t[r[e]].properties });
        }
      } else
        this._resubscribeTopics.resubscribe = !0, this.subscribe(this._resubscribeTopics);
    else
      this._resubscribeTopics = {};
  this._firstConnection = !1;
};
we.prototype._onConnect = function(r) {
  if (this.disconnected) {
    this.emit("connect", r);
    return;
  }
  const e = this;
  this.connackPacket = r, this.messageIdProvider.clear(), this._setupPingTimer(), this.connected = !0;
  function t() {
    let n = e.outgoingStore.createStream();
    function i() {
      e._storeProcessing = !1, e._packetIdsDuringStoreProcessing = {};
    }
    e.once("close", o), n.on("error", function(a) {
      i(), e._flushStoreProcessingQueue(), e.removeListener("close", o), e.emit("error", a);
    });
    function o() {
      n.destroy(), n = null, e._flushStoreProcessingQueue(), i();
    }
    function s() {
      if (!n)
        return;
      e._storeProcessing = !0;
      const a = n.read(1);
      let f;
      if (!a) {
        n.once("readable", s);
        return;
      }
      if (e._packetIdsDuringStoreProcessing[a.messageId]) {
        s();
        return;
      }
      !e.disconnecting && !e.reconnectTimer ? (f = e.outgoing[a.messageId] ? e.outgoing[a.messageId].cb : null, e.outgoing[a.messageId] = {
        volatile: !1,
        cb: function(u, c) {
          f && f(u, c), s();
        }
      }, e._packetIdsDuringStoreProcessing[a.messageId] = !0, e.messageIdProvider.register(a.messageId) ? e._sendPacket(a) : le("messageId: %d has already used.", a.messageId)) : n.destroy && n.destroy();
    }
    n.on("end", function() {
      let a = !0;
      for (const f in e._packetIdsDuringStoreProcessing)
        if (!e._packetIdsDuringStoreProcessing[f]) {
          a = !1;
          break;
        }
      a ? (i(), e.removeListener("close", o), e._invokeAllStoreProcessingQueue(), e.emit("connect", r)) : t();
    }), s();
  }
  t();
};
we.prototype._invokeStoreProcessingQueue = function() {
  if (this._storeProcessingQueue.length > 0) {
    const r = this._storeProcessingQueue[0];
    if (r && r.invoke())
      return this._storeProcessingQueue.shift(), !0;
  }
  return !1;
};
we.prototype._invokeAllStoreProcessingQueue = function() {
  for (; this._invokeStoreProcessingQueue(); )
    ;
};
we.prototype._flushStoreProcessingQueue = function() {
  for (const r of this._storeProcessingQueue)
    r.cbStorePut && r.cbStorePut(new Error("Connection closed")), r.callback && r.callback(new Error("Connection closed"));
  this._storeProcessingQueue.splice(0);
};
var rp = we, hi, ra;
function na() {
  if (ra)
    return hi;
  ra = 1;
  const r = Ne, e = It("mqttjs:tcp");
  function t(n, i) {
    i.port = i.port || 1883, i.hostname = i.hostname || i.host || "localhost";
    const o = i.port, s = i.hostname;
    return e("port %d and host %s", o, s), r.createConnection(o, s);
  }
  return hi = t, hi;
}
var di, ia;
function pi() {
  if (ia)
    return di;
  ia = 1;
  const r = Ne, e = Ne, t = It("mqttjs:tls");
  function n(i, o) {
    o.port = o.port || 8883, o.host = o.hostname || o.host || "localhost", e.isIP(o.host) === 0 && (o.servername = o.host), o.rejectUnauthorized = o.rejectUnauthorized !== !1, delete o.path, t("port %d host %s rejectUnauthorized %b", o.port, o.host, o.rejectUnauthorized);
    const s = r.connect(o);
    s.on("secureConnect", function() {
      o.rejectUnauthorized && !s.authorized ? s.emit("error", new Error("TLS not authorized")) : s.removeListener("error", a);
    });
    function a(f) {
      o.rejectUnauthorized && i.emit("error", f), s.end();
    }
    return s.on("error", a), s;
  }
  return di = n, di;
}
var rs = { exports: {} }, np = Df;
function Df(r, e) {
  if (r && e)
    return Df(r)(e);
  if (typeof r != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(r).forEach(function(n) {
    t[n] = r[n];
  }), t;
  function t() {
    for (var n = new Array(arguments.length), i = 0; i < n.length; i++)
      n[i] = arguments[i];
    var o = r.apply(this, n), s = n[n.length - 1];
    return typeof o == "function" && o !== s && Object.keys(s).forEach(function(a) {
      o[a] = s[a];
    }), o;
  }
}
var Ff = np;
rs.exports = Ff(un);
rs.exports.strict = Ff(Of);
un.proto = un(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return un(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return Of(this);
    },
    configurable: !0
  });
});
function un(r) {
  var e = function() {
    return e.called ? e.value : (e.called = !0, e.value = r.apply(this, arguments));
  };
  return e.called = !1, e;
}
function Of(r) {
  var e = function() {
    if (e.called)
      throw new Error(e.onceError);
    return e.called = !0, e.value = r.apply(this, arguments);
  }, t = r.name || "Function wrapped with `once`";
  return e.onceError = t + " shouldn't be called more than once", e.called = !1, e;
}
var ip = rs.exports, op = ip, sp = function() {
}, ap = function(r) {
  return r.setHeader && typeof r.abort == "function";
}, up = function(r) {
  return r.stdio && Array.isArray(r.stdio) && r.stdio.length === 3;
}, Mf = function(r, e, t) {
  if (typeof e == "function")
    return Mf(r, null, e);
  e || (e = {}), t = op(t || sp);
  var n = r._writableState, i = r._readableState, o = e.readable || e.readable !== !1 && r.readable, s = e.writable || e.writable !== !1 && r.writable, a = !1, f = function() {
    r.writable || u();
  }, u = function() {
    s = !1, o || t.call(r);
  }, c = function() {
    o = !1, s || t.call(r);
  }, h = function(O) {
    t.call(r, O ? new Error("exited with error code: " + O) : null);
  }, y = function(O) {
    t.call(r, O);
  }, T = function() {
    process.nextTick(A);
  }, A = function() {
    if (!a) {
      if (o && !(i && i.ended && !i.destroyed))
        return t.call(r, new Error("premature close"));
      if (s && !(n && n.ended && !n.destroyed))
        return t.call(r, new Error("premature close"));
    }
  }, B = function() {
    r.req.on("finish", u);
  };
  return ap(r) ? (r.on("complete", u), r.on("abort", T), r.req ? B() : r.on("request", B)) : s && !n && (r.on("end", f), r.on("close", f)), up(r) && r.on("exit", h), r.on("end", c), r.on("finish", u), e.error !== !1 && r.on("error", y), r.on("close", T), function() {
    a = !0, r.removeListener("complete", u), r.removeListener("abort", T), r.removeListener("request", B), r.req && r.req.removeListener("finish", u), r.removeListener("end", f), r.removeListener("close", f), r.removeListener("finish", u), r.removeListener("exit", h), r.removeListener("end", c), r.removeListener("error", y), r.removeListener("close", T);
  };
}, If = Mf, Nf = fp;
function fp(r) {
  var e = r._readableState;
  return e ? e.objectMode || typeof r._duplexState == "number" ? r.read() : r.read(cp(e)) : null;
}
function cp(r) {
  if (r.buffer.length) {
    var e = r.bufferIndex || 0;
    if (r.buffer.head)
      return r.buffer.head.data.length;
    if (r.buffer.length - e > 0 && r.buffer[e])
      return r.buffer[e].length;
  }
  return r.length;
}
var On = or, Rf = If, lp = Ue, hp = Nf, Pf = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([0]) : new Buffer([0]), Co = function(r, e) {
  r._corked ? r.once("uncork", e) : e();
}, dp = function(r, e) {
  r._autoDestroy && r.destroy(e);
}, kf = function(r, e) {
  return function(t) {
    t ? dp(r, t.message === "premature close" ? null : t) : e && !r._ended && r.end();
  };
}, pp = function(r, e) {
  if (!r || r._writableState && r._writableState.finished)
    return e();
  if (r._writableState)
    return r.end(e);
  r.end(), e();
}, _p = function() {
}, vp = function(r) {
  return new On.Readable({ objectMode: !0, highWaterMark: 16 }).wrap(r);
}, ze = function(r, e, t) {
  if (!(this instanceof ze))
    return new ze(r, e, t);
  On.Duplex.call(this, t), this._writable = null, this._readable = null, this._readable2 = null, this._autoDestroy = !t || t.autoDestroy !== !1, this._forwardDestroy = !t || t.destroy !== !1, this._forwardEnd = !t || t.end !== !1, this._corked = 1, this._ondrain = null, this._drained = !1, this._forwarding = !1, this._unwrite = null, this._unread = null, this._ended = !1, this.destroyed = !1, r && this.setWritable(r), e && this.setReadable(e);
};
lp(ze, On.Duplex);
ze.obj = function(r, e, t) {
  return t || (t = {}), t.objectMode = !0, t.highWaterMark = 16, new ze(r, e, t);
};
ze.prototype.cork = function() {
  ++this._corked === 1 && this.emit("cork");
};
ze.prototype.uncork = function() {
  this._corked && --this._corked === 0 && this.emit("uncork");
};
ze.prototype.setWritable = function(r) {
  if (this._unwrite && this._unwrite(), this.destroyed) {
    r && r.destroy && r.destroy();
    return;
  }
  if (r === null || r === !1) {
    this.end();
    return;
  }
  var e = this, t = Rf(r, { writable: !0, readable: !1 }, kf(this, this._forwardEnd)), n = function() {
    var o = e._ondrain;
    e._ondrain = null, o && o();
  }, i = function() {
    e._writable.removeListener("drain", n), t();
  };
  this._unwrite && process.nextTick(n), this._writable = r, this._writable.on("drain", n), this._unwrite = i, this.uncork();
};
ze.prototype.setReadable = function(r) {
  if (this._unread && this._unread(), this.destroyed) {
    r && r.destroy && r.destroy();
    return;
  }
  if (r === null || r === !1) {
    this.push(null), this.resume();
    return;
  }
  var e = this, t = Rf(r, { writable: !1, readable: !0 }, kf(this)), n = function() {
    e._forward();
  }, i = function() {
    e.push(null);
  }, o = function() {
    e._readable2.removeListener("readable", n), e._readable2.removeListener("end", i), t();
  };
  this._drained = !0, this._readable = r, this._readable2 = r._readableState ? r : vp(r), this._readable2.on("readable", n), this._readable2.on("end", i), this._unread = o, this._forward();
};
ze.prototype._read = function() {
  this._drained = !0, this._forward();
};
ze.prototype._forward = function() {
  if (!(this._forwarding || !this._readable2 || !this._drained)) {
    this._forwarding = !0;
    for (var r; this._drained && (r = hp(this._readable2)) !== null; )
      this.destroyed || (this._drained = this.push(r));
    this._forwarding = !1;
  }
};
ze.prototype.destroy = function(r, e) {
  if (e || (e = _p), this.destroyed)
    return e(null);
  this.destroyed = !0;
  var t = this;
  process.nextTick(function() {
    t._destroy(r), e(null);
  });
};
ze.prototype._destroy = function(r) {
  if (r) {
    var e = this._ondrain;
    this._ondrain = null, e ? e(r) : this.emit("error", r);
  }
  this._forwardDestroy && (this._readable && this._readable.destroy && this._readable.destroy(), this._writable && this._writable.destroy && this._writable.destroy()), this.emit("close");
};
ze.prototype._write = function(r, e, t) {
  if (!this.destroyed) {
    if (this._corked)
      return Co(this, this._write.bind(this, r, e, t));
    if (r === Pf)
      return this._finish(t);
    if (!this._writable)
      return t();
    this._writable.write(r) === !1 ? this._ondrain = t : this.destroyed || t();
  }
};
ze.prototype._finish = function(r) {
  var e = this;
  this.emit("preend"), Co(this, function() {
    pp(e._forwardEnd && e._writable, function() {
      e._writableState.prefinished === !1 && (e._writableState.prefinished = !0), e.emit("prefinish"), Co(e, r);
    });
  });
};
ze.prototype.end = function(r, e, t) {
  return typeof r == "function" ? this.end(null, null, r) : typeof e == "function" ? this.end(r, null, e) : (this._ended = !0, r && this.write(r), !this._writableState.ending && !this._writableState.destroyed && this.write(Pf), On.Writable.prototype.end.call(this, t));
};
var ns = ze, _i, oa;
function sa() {
  if (oa)
    return _i;
  oa = 1;
  const { Buffer: r } = et, e = or.Transform, t = ns;
  let n, i, o;
  function s() {
    const h = new e();
    return h._write = function(y, T, A) {
      n.send({
        data: y.buffer,
        success: function() {
          A();
        },
        fail: function(B) {
          A(new Error(B));
        }
      });
    }, h._flush = function(T) {
      n.close({
        success: function() {
          T();
        }
      });
    }, h;
  }
  function a(h) {
    h.hostname || (h.hostname = "localhost"), h.path || (h.path = "/"), h.wsOptions || (h.wsOptions = {});
  }
  function f(h, y) {
    const T = h.protocol === "wxs" ? "wss" : "ws";
    let A = T + "://" + h.hostname + h.path;
    return h.port && h.port !== 80 && h.port !== 443 && (A = T + "://" + h.hostname + ":" + h.port + h.path), typeof h.transformWsUrl == "function" && (A = h.transformWsUrl(A, h, y)), A;
  }
  function u() {
    n.onOpen(function() {
      o.setReadable(i), o.setWritable(i), o.emit("connect");
    }), n.onMessage(function(h) {
      let y = h.data;
      y instanceof ArrayBuffer ? y = r.from(y) : y = r.from(y, "utf8"), i.push(y);
    }), n.onClose(function() {
      o.end(), o.destroy();
    }), n.onError(function(h) {
      o.destroy(new Error(h.errMsg));
    });
  }
  function c(h, y) {
    if (y.hostname = y.hostname || y.host, !y.hostname)
      throw new Error("Could not determine host. Specify host manually.");
    const T = y.protocolId === "MQIsdp" && y.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
    a(y);
    const A = f(y, h);
    n = wx.connectSocket({
      url: A,
      protocols: [T]
    }), i = s(), o = t.obj(), o._destroy = function(O, d) {
      n.close({
        success: function() {
          d && d(O);
        }
      });
    };
    const B = o.destroy;
    return o.destroy = (function() {
      o.destroy = B;
      const O = this;
      setTimeout(function() {
        n.close({
          fail: function() {
            O._destroy(new Error());
          }
        });
      }, 0);
    }).bind(o), u(), o;
  }
  return _i = c, _i;
}
var vi, aa;
function ua() {
  if (aa)
    return vi;
  aa = 1;
  const { Buffer: r } = et, e = or.Transform, t = ns;
  let n, i, o, s = !1;
  function a() {
    const y = new e();
    return y._write = function(T, A, B) {
      n.sendSocketMessage({
        data: T.buffer,
        success: function() {
          B();
        },
        fail: function() {
          B(new Error());
        }
      });
    }, y._flush = function(A) {
      n.closeSocket({
        success: function() {
          A();
        }
      });
    }, y;
  }
  function f(y) {
    y.hostname || (y.hostname = "localhost"), y.path || (y.path = "/"), y.wsOptions || (y.wsOptions = {});
  }
  function u(y, T) {
    const A = y.protocol === "alis" ? "wss" : "ws";
    let B = A + "://" + y.hostname + y.path;
    return y.port && y.port !== 80 && y.port !== 443 && (B = A + "://" + y.hostname + ":" + y.port + y.path), typeof y.transformWsUrl == "function" && (B = y.transformWsUrl(B, y, T)), B;
  }
  function c() {
    s || (s = !0, n.onSocketOpen(function() {
      o.setReadable(i), o.setWritable(i), o.emit("connect");
    }), n.onSocketMessage(function(y) {
      if (typeof y.data == "string") {
        const T = r.from(y.data, "base64");
        i.push(T);
      } else {
        const T = new FileReader();
        T.addEventListener("load", function() {
          let A = T.result;
          A instanceof ArrayBuffer ? A = r.from(A) : A = r.from(A, "utf8"), i.push(A);
        }), T.readAsArrayBuffer(y.data);
      }
    }), n.onSocketClose(function() {
      o.end(), o.destroy();
    }), n.onSocketError(function(y) {
      o.destroy(y);
    }));
  }
  function h(y, T) {
    if (T.hostname = T.hostname || T.host, !T.hostname)
      throw new Error("Could not determine host. Specify host manually.");
    const A = T.protocolId === "MQIsdp" && T.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
    f(T);
    const B = u(T, y);
    return n = T.my, n.connectSocket({
      url: B,
      protocols: A
    }), i = a(), o = t.obj(), c(), o;
  }
  return vi = h, vi;
}
var To = { exports: {} }, yp = function() {
  throw new Error(
    "ws does not work in the browser. Browser clients must use the native WebSocket object"
  );
};
const { Buffer: Rr } = et, jf = yp, Ur = It("mqttjs:ws"), xp = ns, gp = or.Transform, bp = [
  "rejectUnauthorized",
  "ca",
  "cert",
  "key",
  "pfx",
  "passphrase"
], Uf = typeof process < "u" && process.title === "browser" || typeof __webpack_require__ == "function";
function Lf(r, e) {
  let t = r.protocol + "://" + r.hostname + ":" + r.port + r.path;
  return typeof r.transformWsUrl == "function" && (t = r.transformWsUrl(t, r, e)), t;
}
function qf(r) {
  const e = r;
  return r.hostname || (e.hostname = "localhost"), r.port || (r.protocol === "wss" ? e.port = 443 : e.port = 80), r.path || (e.path = "/"), r.wsOptions || (e.wsOptions = {}), !Uf && r.protocol === "wss" && bp.forEach(function(t) {
    Object.prototype.hasOwnProperty.call(r, t) && !Object.prototype.hasOwnProperty.call(r.wsOptions, t) && (e.wsOptions[t] = r[t]);
  }), e;
}
function wp(r) {
  const e = qf(r);
  if (e.hostname || (e.hostname = e.host), !e.hostname) {
    if (typeof document > "u")
      throw new Error("Could not determine host. Specify host manually.");
    const t = new URL(document.URL);
    e.hostname = t.hostname, e.port || (e.port = t.port);
  }
  return e.objectMode === void 0 && (e.objectMode = !(e.binary === !0 || e.binary === void 0)), e;
}
function mp(r, e, t) {
  Ur("createWebSocket"), Ur("protocol: " + t.protocolId + " " + t.protocolVersion);
  const n = t.protocolId === "MQIsdp" && t.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
  return Ur("creating new Websocket for url: " + e + " and protocol: " + n), new jf(e, [n], t.wsOptions);
}
function Ep(r, e) {
  const t = e.protocolId === "MQIsdp" && e.protocolVersion === 3 ? "mqttv3.1" : "mqtt", n = Lf(e, r), i = new WebSocket(n, [t]);
  return i.binaryType = "arraybuffer", i;
}
function Sp(r, e) {
  Ur("streamBuilder");
  const t = qf(e), n = Lf(t, r), i = mp(r, n, t), o = jf.createWebSocketStream(i, t.wsOptions);
  return o.url = n, i.on("close", () => {
    o.destroy();
  }), o;
}
function Ap(r, e) {
  Ur("browserStreamBuilder");
  let t;
  const i = wp(e).browserBufferSize || 1024 * 512, o = e.browserBufferTimeout || 1e3, s = !e.objectMode, a = Ep(r, e), f = c(e, O, d);
  e.objectMode || (f._writev = B), f.on("close", () => {
    a.close();
  });
  const u = typeof a.addEventListener < "u";
  a.readyState === a.OPEN ? t = f : (t = t = xp(void 0, void 0, e), e.objectMode || (t._writev = B), u ? a.addEventListener("open", h) : a.onopen = h), t.socket = a, u ? (a.addEventListener("close", y), a.addEventListener("error", T), a.addEventListener("message", A)) : (a.onclose = y, a.onerror = T, a.onmessage = A);
  function c(_, E, M) {
    const S = new gp({
      objectModeMode: _.objectMode
    });
    return S._write = E, S._flush = M, S;
  }
  function h() {
    t.setReadable(f), t.setWritable(f), t.emit("connect");
  }
  function y() {
    t.end(), t.destroy();
  }
  function T(_) {
    t.destroy(_);
  }
  function A(_) {
    let E = _.data;
    E instanceof ArrayBuffer ? E = Rr.from(E) : E = Rr.from(E, "utf8"), f.push(E);
  }
  function B(_, E) {
    const M = new Array(_.length);
    for (let S = 0; S < _.length; S++)
      typeof _[S].chunk == "string" ? M[S] = Rr.from(_[S], "utf8") : M[S] = _[S].chunk;
    this._write(Rr.concat(M), "binary", E);
  }
  function O(_, E, M) {
    a.bufferedAmount > i && setTimeout(O, o, _, E, M), s && typeof _ == "string" && (_ = Rr.from(_, "utf8"));
    try {
      a.send(_);
    } catch (S) {
      return M(S);
    }
    M();
  }
  function d(_) {
    a.close(), _();
  }
  return t;
}
Uf ? To.exports = Ap : To.exports = Sp;
var Hf = To.exports;
const $f = rp, Bp = Xu, Cp = Ne, Tp = Go, fa = It("mqttjs"), Ze = {};
typeof process < "u" && process.title !== "browser" || typeof __webpack_require__ != "function" ? (Ze.mqtt = na(), Ze.tcp = na(), Ze.ssl = pi(), Ze.tls = pi(), Ze.mqtts = pi()) : (Ze.wx = sa(), Ze.wxs = sa(), Ze.ali = ua(), Ze.alis = ua());
Ze.ws = Hf;
Ze.wss = Hf;
function Dp(r) {
  let e;
  r.auth && (e = r.auth.match(/^(.+):(.+)$/), e ? (r.username = e[1], r.password = e[2]) : r.username = r.auth);
}
function Wf(r, e) {
  if (fa("connecting to an MQTT broker..."), typeof r == "object" && !e && (e = r, r = null), e = e || {}, r) {
    const i = Cp.parse(r, !0);
    if (i.port != null && (i.port = Number(i.port)), e = Tp(i, e), e.protocol === null)
      throw new Error("Missing protocol");
    e.protocol = e.protocol.replace(/:$/, "");
  }
  if (Dp(e), e.query && typeof e.query.clientId == "string" && (e.clientId = e.query.clientId), e.cert && e.key)
    if (e.protocol) {
      if (["mqtts", "wss", "wxs", "alis"].indexOf(e.protocol) === -1)
        switch (e.protocol) {
          case "mqtt":
            e.protocol = "mqtts";
            break;
          case "ws":
            e.protocol = "wss";
            break;
          case "wx":
            e.protocol = "wxs";
            break;
          case "ali":
            e.protocol = "alis";
            break;
          default:
            throw new Error('Unknown protocol for secure connection: "' + e.protocol + '"!');
        }
    } else
      throw new Error("Missing secure protocol key");
  if (!Ze[e.protocol]) {
    const i = ["mqtts", "wss"].indexOf(e.protocol) !== -1;
    e.protocol = [
      "mqtt",
      "mqtts",
      "ws",
      "wss",
      "wx",
      "wxs",
      "ali",
      "alis"
    ].filter(function(o, s) {
      return i && s % 2 === 0 ? !1 : typeof Ze[o] == "function";
    })[0];
  }
  if (e.clean === !1 && !e.clientId)
    throw new Error("Missing clientId for unclean clients");
  e.protocol && (e.defaultProtocol = e.protocol);
  function t(i) {
    return e.servers && ((!i._reconnectCount || i._reconnectCount === e.servers.length) && (i._reconnectCount = 0), e.host = e.servers[i._reconnectCount].host, e.port = e.servers[i._reconnectCount].port, e.protocol = e.servers[i._reconnectCount].protocol ? e.servers[i._reconnectCount].protocol : e.defaultProtocol, e.hostname = e.host, i._reconnectCount++), fa("calling streambuilder for", e.protocol), Ze[e.protocol](i, e);
  }
  const n = new $f(t, e);
  return n.on("error", function() {
  }), n;
}
zr.exports = Wf;
zr.exports.connect = Wf;
zr.exports.MqttClient = $f;
zr.exports.Store = Bp;
var zf = zr.exports, ut = {}, yi = {}, Br = {}, Fp = Q && Q.__extends || /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), ca = Q && Q.__read || function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, la = Q && Q.__spreadArray || function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.BufferedEventEmitter = void 0;
var Op = Ne, Mp = (
  /** @class */
  /* @__PURE__ */ function() {
    function r(e, t) {
      this.event = e, this.args = t;
    }
    return r;
  }()
), Ip = (
  /** @class */
  function(r) {
    Fp(e, r);
    function e() {
      var t = r.call(this) || this;
      return t.corked = !1, t;
    }
    return e.prototype.cork = function() {
      this.corked = !0;
    }, e.prototype.uncork = function() {
      for (this.corked = !1; this.eventQueue; ) {
        var t = this.eventQueue;
        r.prototype.emit.apply(this, la([t.event], ca(t.args), !1)), this.eventQueue = this.eventQueue.next;
      }
    }, e.prototype.emit = function(t) {
      for (var n = [], i = 1; i < arguments.length; i++)
        n[i - 1] = arguments[i];
      if (this.corked) {
        var o = this.lastQueuedEvent;
        return this.lastQueuedEvent = new Mp(t, n), o ? o.next = this.lastQueuedEvent : this.eventQueue = this.lastQueuedEvent, this.listeners(t).length > 0;
      }
      return r.prototype.emit.apply(this, la([t], ca(n), !1));
    }, e;
  }(Op.EventEmitter)
);
Br.BufferedEventEmitter = Ip;
var fn = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.InboundTopicAliasBehaviorType = r.OutboundTopicAliasBehaviorType = r.RetryJitterType = r.ClientSessionBehavior = void 0, function(e) {
    e[e.Default = 0] = "Default", e[e.Clean = 1] = "Clean", e[e.RejoinPostSuccess = 2] = "RejoinPostSuccess", e[e.RejoinAlways = 3] = "RejoinAlways";
  }(r.ClientSessionBehavior || (r.ClientSessionBehavior = {})), function(e) {
    e[e.Default = 0] = "Default", e[e.None = 1] = "None", e[e.Full = 2] = "Full", e[e.Decorrelated = 3] = "Decorrelated";
  }(r.RetryJitterType || (r.RetryJitterType = {})), function(e) {
    e[e.Default = 0] = "Default", e[e.Manual = 1] = "Manual", e[e.LRU = 2] = "LRU", e[e.Disabled = 3] = "Disabled";
  }(r.OutboundTopicAliasBehaviorType || (r.OutboundTopicAliasBehaviorType = {})), function(e) {
    e[e.Default = 0] = "Default", e[e.Enabled = 1] = "Enabled", e[e.Disabled = 2] = "Disabled";
  }(r.InboundTopicAliasBehaviorType || (r.InboundTopicAliasBehaviorType = {}));
})(fn);
var Do = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.PacketType = r.RetainHandlingType = r.QoS = r.PayloadFormatIndicator = r.isSuccessfulPubackReasonCode = r.PubackReasonCode = r.isSuccessfulUnsubackReasonCode = r.UnsubackReasonCode = r.isSuccessfulSubackReasonCode = r.SubackReasonCode = r.isSuccessfulDisconnectReasonCode = r.DisconnectReasonCode = r.isSuccessfulConnectReasonCode = r.ConnectReasonCode = void 0, function(s) {
    s[s.Success = 0] = "Success", s[s.UnspecifiedError = 128] = "UnspecifiedError", s[s.MalformedPacket = 129] = "MalformedPacket", s[s.ProtocolError = 130] = "ProtocolError", s[s.ImplementationSpecificError = 131] = "ImplementationSpecificError", s[s.UnsupportedProtocolVersion = 132] = "UnsupportedProtocolVersion", s[s.ClientIdentifierNotValid = 133] = "ClientIdentifierNotValid", s[s.BadUsernameOrPassword = 134] = "BadUsernameOrPassword", s[s.NotAuthorized = 135] = "NotAuthorized", s[s.ServerUnavailable = 136] = "ServerUnavailable", s[s.ServerBusy = 137] = "ServerBusy", s[s.Banned = 138] = "Banned", s[s.BadAuthenticationMethod = 140] = "BadAuthenticationMethod", s[s.TopicNameInvalid = 144] = "TopicNameInvalid", s[s.PacketTooLarge = 149] = "PacketTooLarge", s[s.QuotaExceeded = 151] = "QuotaExceeded", s[s.PayloadFormatInvalid = 153] = "PayloadFormatInvalid", s[s.RetainNotSupported = 154] = "RetainNotSupported", s[s.QosNotSupported = 155] = "QosNotSupported", s[s.UseAnotherServer = 156] = "UseAnotherServer", s[s.ServerMoved = 157] = "ServerMoved", s[s.ConnectionRateExceeded = 159] = "ConnectionRateExceeded";
  }(r.ConnectReasonCode || (r.ConnectReasonCode = {}));
  function e(s) {
    return s < 128;
  }
  r.isSuccessfulConnectReasonCode = e, function(s) {
    s[s.NormalDisconnection = 0] = "NormalDisconnection", s[s.DisconnectWithWillMessage = 4] = "DisconnectWithWillMessage", s[s.UnspecifiedError = 128] = "UnspecifiedError", s[s.MalformedPacket = 129] = "MalformedPacket", s[s.ProtocolError = 130] = "ProtocolError", s[s.ImplementationSpecificError = 131] = "ImplementationSpecificError", s[s.NotAuthorized = 135] = "NotAuthorized", s[s.ServerBusy = 137] = "ServerBusy", s[s.ServerShuttingDown = 139] = "ServerShuttingDown", s[s.KeepAliveTimeout = 141] = "KeepAliveTimeout", s[s.SessionTakenOver = 142] = "SessionTakenOver", s[s.TopicFilterInvalid = 143] = "TopicFilterInvalid", s[s.TopicNameInvalid = 144] = "TopicNameInvalid", s[s.ReceiveMaximumExceeded = 147] = "ReceiveMaximumExceeded", s[s.TopicAliasInvalid = 148] = "TopicAliasInvalid", s[s.PacketTooLarge = 149] = "PacketTooLarge", s[s.MessageRateTooHigh = 150] = "MessageRateTooHigh", s[s.QuotaExceeded = 151] = "QuotaExceeded", s[s.AdministrativeAction = 152] = "AdministrativeAction", s[s.PayloadFormatInvalid = 153] = "PayloadFormatInvalid", s[s.RetainNotSupported = 154] = "RetainNotSupported", s[s.QosNotSupported = 155] = "QosNotSupported", s[s.UseAnotherServer = 156] = "UseAnotherServer", s[s.ServerMoved = 157] = "ServerMoved", s[s.SharedSubscriptionsNotSupported = 158] = "SharedSubscriptionsNotSupported", s[s.ConnectionRateExceeded = 159] = "ConnectionRateExceeded", s[s.MaximumConnectTime = 160] = "MaximumConnectTime", s[s.SubscriptionIdentifiersNotSupported = 161] = "SubscriptionIdentifiersNotSupported", s[s.WildcardSubscriptionsNotSupported = 162] = "WildcardSubscriptionsNotSupported";
  }(r.DisconnectReasonCode || (r.DisconnectReasonCode = {}));
  function t(s) {
    return s < 128;
  }
  r.isSuccessfulDisconnectReasonCode = t, function(s) {
    s[s.GrantedQoS0 = 0] = "GrantedQoS0", s[s.GrantedQoS1 = 1] = "GrantedQoS1", s[s.GrantedQoS2 = 2] = "GrantedQoS2", s[s.UnspecifiedError = 128] = "UnspecifiedError", s[s.ImplementationSpecificError = 131] = "ImplementationSpecificError", s[s.NotAuthorized = 135] = "NotAuthorized", s[s.TopicFilterInvalid = 143] = "TopicFilterInvalid", s[s.PacketIdentifierInUse = 145] = "PacketIdentifierInUse", s[s.QuotaExceeded = 151] = "QuotaExceeded", s[s.SharedSubscriptionsNotSupported = 158] = "SharedSubscriptionsNotSupported", s[s.SubscriptionIdentifiersNotSupported = 161] = "SubscriptionIdentifiersNotSupported", s[s.WildcardSubscriptionsNotSupported = 162] = "WildcardSubscriptionsNotSupported";
  }(r.SubackReasonCode || (r.SubackReasonCode = {}));
  function n(s) {
    return s < 128;
  }
  r.isSuccessfulSubackReasonCode = n, function(s) {
    s[s.Success = 0] = "Success", s[s.NoSubscriptionExisted = 17] = "NoSubscriptionExisted", s[s.UnspecifiedError = 128] = "UnspecifiedError", s[s.ImplementationSpecificError = 131] = "ImplementationSpecificError", s[s.NotAuthorized = 135] = "NotAuthorized", s[s.TopicFilterInvalid = 143] = "TopicFilterInvalid", s[s.PacketIdentifierInUse = 145] = "PacketIdentifierInUse";
  }(r.UnsubackReasonCode || (r.UnsubackReasonCode = {}));
  function i(s) {
    return s < 128;
  }
  r.isSuccessfulUnsubackReasonCode = i, function(s) {
    s[s.Success = 0] = "Success", s[s.NoMatchingSubscribers = 16] = "NoMatchingSubscribers", s[s.UnspecifiedError = 128] = "UnspecifiedError", s[s.ImplementationSpecificError = 131] = "ImplementationSpecificError", s[s.NotAuthorized = 135] = "NotAuthorized", s[s.TopicNameInvalid = 144] = "TopicNameInvalid", s[s.PacketIdentifierInUse = 145] = "PacketIdentifierInUse", s[s.QuotaExceeded = 151] = "QuotaExceeded", s[s.PayloadFormatInvalid = 153] = "PayloadFormatInvalid";
  }(r.PubackReasonCode || (r.PubackReasonCode = {}));
  function o(s) {
    return s < 128;
  }
  r.isSuccessfulPubackReasonCode = o, function(s) {
    s[s.Bytes = 0] = "Bytes", s[s.Utf8 = 1] = "Utf8";
  }(r.PayloadFormatIndicator || (r.PayloadFormatIndicator = {})), function(s) {
    s[s.AtMostOnce = 0] = "AtMostOnce", s[s.AtLeastOnce = 1] = "AtLeastOnce", s[s.ExactlyOnce = 2] = "ExactlyOnce";
  }(r.QoS || (r.QoS = {})), function(s) {
    s[s.SendOnSubscribe = 0] = "SendOnSubscribe", s[s.SendOnSubscribeIfNew = 1] = "SendOnSubscribeIfNew", s[s.DontSend = 2] = "DontSend";
  }(r.RetainHandlingType || (r.RetainHandlingType = {})), function(s) {
    s[s.Connect = 1] = "Connect", s[s.Connack = 2] = "Connack", s[s.Publish = 3] = "Publish", s[s.Puback = 4] = "Puback", s[s.Pubrec = 5] = "Pubrec", s[s.Pubrel = 6] = "Pubrel", s[s.Pubcomp = 7] = "Pubcomp", s[s.Subscribe = 8] = "Subscribe", s[s.Suback = 9] = "Suback", s[s.Unsubscribe = 10] = "Unsubscribe", s[s.Unsuback = 11] = "Unsuback", s[s.Pingreq = 12] = "Pingreq", s[s.Pingresp = 13] = "Pingresp", s[s.Disconnect = 14] = "Disconnect", s[s.Auth = 15] = "Auth";
  }(r.PacketType || (r.PacketType = {}));
})(Do);
var Rt = {}, Np = Q && Q.__extends || /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}();
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.CrtError = void 0;
var Rp = (
  /** @class */
  function(r) {
    Np(e, r);
    function e(t) {
      var n = r.call(this, t.toString()) || this;
      return n.error = t, n.error_name = t.toString(), n;
    }
    return e;
  }(Error)
);
Rt.CrtError = Rp;
var xi = {}, Vt = {};
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.DEFAULT_KEEP_ALIVE = Vt.normalize_payload = void 0;
function Pp(r) {
  if (r instanceof Buffer || typeof r == "string")
    return r;
  if (ArrayBuffer.isView(r)) {
    var e = r;
    return Buffer.from(e.buffer, e.byteOffset, e.byteLength);
  }
  if (r instanceof ArrayBuffer)
    return Buffer.from(r);
  if (typeof r == "object")
    return JSON.stringify(r);
  if (!r)
    return "";
  throw new TypeError("payload parameter must be a string, object, or DataView.");
}
Vt.normalize_payload = Pp;
Vt.DEFAULT_KEEP_ALIVE = 1200;
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.set_defined_property = void 0;
function kp(r, e, t) {
  return t === void 0 || t == null ? !1 : (r[e] = t, !0);
}
Qr.set_defined_property = kp;
var ha;
function jp() {
  return ha || (ha = 1, function(r) {
    var e = Q && Q.__createBinding || (Object.create ? function(j, K, se, q) {
      q === void 0 && (q = se);
      var l = Object.getOwnPropertyDescriptor(K, se);
      (!l || ("get" in l ? !K.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
        return K[se];
      } }), Object.defineProperty(j, q, l);
    } : function(j, K, se, q) {
      q === void 0 && (q = se), j[q] = K[se];
    }), t = Q && Q.__setModuleDefault || (Object.create ? function(j, K) {
      Object.defineProperty(j, "default", { enumerable: !0, value: K });
    } : function(j, K) {
      j.default = K;
    }), n = Q && Q.__importStar || function(j) {
      if (j && j.__esModule)
        return j;
      var K = {};
      if (j != null)
        for (var se in j)
          se !== "default" && Object.prototype.hasOwnProperty.call(j, se) && e(K, j, se);
      return t(K, j), K;
    }, i = Q && Q.__read || function(j, K) {
      var se = typeof Symbol == "function" && j[Symbol.iterator];
      if (!se)
        return j;
      var q = se.call(j), l, p = [], $;
      try {
        for (; (K === void 0 || K-- > 0) && !(l = q.next()).done; )
          p.push(l.value);
      } catch (G) {
        $ = { error: G };
      } finally {
        try {
          l && !l.done && (se = q.return) && se.call(q);
        } finally {
          if ($)
            throw $.error;
        }
      }
      return p;
    }, o = Q && Q.__values || function(j) {
      var K = typeof Symbol == "function" && Symbol.iterator, se = K && j[K], q = 0;
      if (se)
        return se.call(j);
      if (j && typeof j.length == "number")
        return {
          next: function() {
            return j && q >= j.length && (j = void 0), { value: j && j[q++], done: !j };
          }
        };
      throw new TypeError(K ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.transform_mqtt_js_unsuback_to_crt_unsuback = r.transform_crt_unsubscribe_to_mqtt_js_unsubscribe_options = r.transform_mqtt_js_puback_to_crt_puback = r.transform_mqtt_js_publish_to_crt_publish = r.transform_crt_publish_to_mqtt_js_publish_options = r.transform_mqtt_js_subscription_grants_to_crt_suback = r.transform_crt_subscribe_to_mqtt_js_subscribe_options = r.transform_crt_subscribe_to_mqtt_js_subscription_map = r.transform_mqtt_js_disconnect_to_crt_disconnect = r.transform_crt_disconnect_to_mqtt_js_disconnect = r.transform_mqtt_js_user_properties_to_crt_user_properties = r.transform_crt_user_properties_to_mqtt_js_user_properties = r.create_mqtt_js_client_config_from_crt_client_config = r.compute_mqtt_js_reconnect_delay_from_crt_max_delay = r.getOrderedReconnectDelayBounds = r.create_negotiated_settings = r.transform_mqtt_js_connack_to_crt_connack = r.DEFAULT_MIN_CONNECTED_TIME_TO_RESET_RECONNECT_DELAY_MS = r.DEFAULT_MAX_RECONNECT_DELAY_MS = r.DEFAULT_MIN_RECONNECT_DELAY_MS = r.DEFAULT_CONNECT_TIMEOUT_MS = r.DEFAULT_RECEIVE_MAXIMUM = r.MAXIMUM_PACKET_SIZE = r.MAXIMUM_VARIABLE_LENGTH_INTEGER = void 0;
    var s = n(Vt), a = n(Mn()), f = n(Qr), u = Rt;
    r.MAXIMUM_VARIABLE_LENGTH_INTEGER = 268435455, r.MAXIMUM_PACKET_SIZE = 5 + r.MAXIMUM_VARIABLE_LENGTH_INTEGER, r.DEFAULT_RECEIVE_MAXIMUM = 65535, r.DEFAULT_CONNECT_TIMEOUT_MS = 3e4, r.DEFAULT_MIN_RECONNECT_DELAY_MS = 1e3, r.DEFAULT_MAX_RECONNECT_DELAY_MS = 12e4, r.DEFAULT_MIN_CONNECTED_TIME_TO_RESET_RECONNECT_DELAY_MS = 3e4;
    function c(j) {
      var K, se, q, l, p, $, G, P, N, Y, he, _e, k, x, b, H;
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_connack_to_crt_connack: mqtt_js_connack not defined");
      var ee = {
        type: a.PacketType.Connack,
        sessionPresent: j.sessionPresent,
        reasonCode: (K = j.reasonCode) !== null && K !== void 0 ? K : a.ConnectReasonCode.Success
      };
      return f.set_defined_property(ee, "sessionExpiryInterval", (se = j.properties) === null || se === void 0 ? void 0 : se.sessionExpiryInterval), f.set_defined_property(ee, "receiveMaximum", (q = j.properties) === null || q === void 0 ? void 0 : q.receiveMaximum), f.set_defined_property(ee, "maximumQos", (l = j.properties) === null || l === void 0 ? void 0 : l.maximumQoS), f.set_defined_property(ee, "retainAvailable", (p = j.properties) === null || p === void 0 ? void 0 : p.retainAvailable), f.set_defined_property(ee, "maximumPacketSize", ($ = j.properties) === null || $ === void 0 ? void 0 : $.maximumPacketSize), f.set_defined_property(ee, "assignedClientIdentifier", (G = j.properties) === null || G === void 0 ? void 0 : G.assignedClientIdentifier), f.set_defined_property(ee, "topicAliasMaximum", (P = j.properties) === null || P === void 0 ? void 0 : P.topicAliasMaximum), f.set_defined_property(ee, "reasonString", (N = j.properties) === null || N === void 0 ? void 0 : N.reasonString), f.set_defined_property(ee, "userProperties", w((Y = j.properties) === null || Y === void 0 ? void 0 : Y.userProperties)), f.set_defined_property(ee, "wildcardSubscriptionsAvailable", (he = j.properties) === null || he === void 0 ? void 0 : he.wildcardSubscriptionAvailable), f.set_defined_property(ee, "subscriptionIdentifiersAvailable", (_e = j.properties) === null || _e === void 0 ? void 0 : _e.subscriptionIdentifiersAvailable), f.set_defined_property(ee, "sharedSubscriptionsAvailable", (k = j.properties) === null || k === void 0 ? void 0 : k.sharedSubscriptionAvailable), f.set_defined_property(ee, "serverKeepAlive", (x = j.properties) === null || x === void 0 ? void 0 : x.serverKeepAlive), f.set_defined_property(ee, "responseInformation", (b = j.properties) === null || b === void 0 ? void 0 : b.responseInformation), f.set_defined_property(ee, "serverReference", (H = j.properties) === null || H === void 0 ? void 0 : H.serverReference), ee;
    }
    r.transform_mqtt_js_connack_to_crt_connack = c;
    function h(j, K) {
      var se, q, l, p, $, G, P, N, Y, he, _e, k, x, b, H, ee, fe, ae, pe, ve, ye;
      if (j == null || j == null)
        throw new u.CrtError("create_negotiated_settings: config not defined");
      if (K == null || K == null)
        throw new u.CrtError("create_negotiated_settings: connack not defined");
      return {
        maximumQos: Math.min((se = K.maximumQos) !== null && se !== void 0 ? se : a.QoS.ExactlyOnce, a.QoS.AtLeastOnce),
        sessionExpiryInterval: (p = (q = K.sessionExpiryInterval) !== null && q !== void 0 ? q : (l = j.connectProperties) === null || l === void 0 ? void 0 : l.sessionExpiryIntervalSeconds) !== null && p !== void 0 ? p : 0,
        receiveMaximumFromServer: ($ = K.receiveMaximum) !== null && $ !== void 0 ? $ : r.DEFAULT_RECEIVE_MAXIMUM,
        maximumPacketSizeToServer: (G = K.maximumPacketSize) !== null && G !== void 0 ? G : r.MAXIMUM_PACKET_SIZE,
        topicAliasMaximumToServer: Math.min((N = (P = j.topicAliasingOptions) === null || P === void 0 ? void 0 : P.outboundCacheMaxSize) !== null && N !== void 0 ? N : 0, (Y = K.topicAliasMaximum) !== null && Y !== void 0 ? Y : 0),
        topicAliasMaximumToClient: (_e = (he = j.topicAliasingOptions) === null || he === void 0 ? void 0 : he.inboundCacheMaxSize) !== null && _e !== void 0 ? _e : 0,
        serverKeepAlive: (b = (k = K.serverKeepAlive) !== null && k !== void 0 ? k : (x = j.connectProperties) === null || x === void 0 ? void 0 : x.keepAliveIntervalSeconds) !== null && b !== void 0 ? b : s.DEFAULT_KEEP_ALIVE,
        retainAvailable: (H = K.retainAvailable) !== null && H !== void 0 ? H : !0,
        wildcardSubscriptionsAvailable: (ee = K.wildcardSubscriptionsAvailable) !== null && ee !== void 0 ? ee : !0,
        subscriptionIdentifiersAvailable: (fe = K.subscriptionIdentifiersAvailable) !== null && fe !== void 0 ? fe : !0,
        sharedSubscriptionsAvailable: (ae = K.sharedSubscriptionsAvailable) !== null && ae !== void 0 ? ae : !0,
        rejoinedSession: K.sessionPresent,
        clientId: (ye = (pe = K.assignedClientIdentifier) !== null && pe !== void 0 ? pe : (ve = j.connectProperties) === null || ve === void 0 ? void 0 : ve.clientId) !== null && ye !== void 0 ? ye : ""
      };
    }
    r.create_negotiated_settings = h;
    function y(j) {
      var K, se;
      if (!(!j || !j.will)) {
        var q = j.will, l = !1, p = {};
        l = f.set_defined_property(p, "willDelayInterval", j.willDelayIntervalSeconds) || l, q.payloadFormat !== void 0 && (l = f.set_defined_property(p, "payloadFormatIndicator", q.payloadFormat == a.PayloadFormatIndicator.Utf8) || l), l = f.set_defined_property(p, "messageExpiryInterval", q.messageExpiryIntervalSeconds) || l, l = f.set_defined_property(p, "contentType", q.contentType) || l, l = f.set_defined_property(p, "responseTopic", q.responseTopic) || l, l = f.set_defined_property(p, "correlationData", q.correlationData) || l, l = f.set_defined_property(p, "userProperties", D(q.userProperties)) || l;
        var $ = {
          topic: q.topicName,
          payload: (K = q.payload) !== null && K !== void 0 ? K : "",
          qos: q.qos,
          retain: (se = q.retain) !== null && se !== void 0 ? se : !1
        };
        return l && ($.properties = p), $;
      }
    }
    function T(j, K) {
      var se = Math.max(1, j ?? r.DEFAULT_MIN_RECONNECT_DELAY_MS), q = Math.max(1, K ?? r.DEFAULT_MAX_RECONNECT_DELAY_MS);
      return se > q ? [q, se] : [se, q];
    }
    r.getOrderedReconnectDelayBounds = T;
    function A(j) {
      return j !== a.ClientSessionBehavior.RejoinPostSuccess && j !== a.ClientSessionBehavior.RejoinAlways;
    }
    function B(j) {
      return j * 2 + 6e4;
    }
    r.compute_mqtt_js_reconnect_delay_from_crt_max_delay = B;
    function O(j, K) {
      if (K < 0 || K > 65535)
        throw new u.CrtError("Invalid value for property ".concat(j, ": ") + K);
    }
    function d(j, K) {
      K !== void 0 && O(j, K);
    }
    function _(j, K) {
      if (K < 0 || K >= 4294967296)
        throw new u.CrtError("Invalid value for property ".concat(j, ": ") + K);
    }
    function E(j, K) {
      K !== void 0 && _(j, K);
    }
    function M(j, K) {
      if (K <= 0 || K >= 4294967296)
        throw new u.CrtError("Invalid value for property ".concat(j, ": ") + K);
    }
    function S(j, K) {
      K !== void 0 && M(j, K);
    }
    function C(j) {
      var K, se, q, l, p, $;
      if (j == null || j == null)
        throw new u.CrtError("validate_mqtt5_client_config: crtConfig not defined");
      O("keepAliveIntervalSeconds", (se = (K = j.connectProperties) === null || K === void 0 ? void 0 : K.keepAliveIntervalSeconds) !== null && se !== void 0 ? se : 0), E("sessionExpiryIntervalSeconds", (q = j.connectProperties) === null || q === void 0 ? void 0 : q.sessionExpiryIntervalSeconds), d("receiveMaximum", (l = j.connectProperties) === null || l === void 0 ? void 0 : l.receiveMaximum), S("maximumPacketSizeBytes", (p = j.connectProperties) === null || p === void 0 ? void 0 : p.maximumPacketSizeBytes), E("willDelayIntervalSeconds", ($ = j.connectProperties) === null || $ === void 0 ? void 0 : $.willDelayIntervalSeconds);
    }
    function m(j) {
      var K, se, q, l, p, $, G, P, N, Y, he, _e, k, x;
      C(j);
      var b = i(T(j.minReconnectDelayMs, j.maxReconnectDelayMs), 2);
      b[0];
      var H = b[1];
      H = B(H);
      var ee = {
        protocolVersion: 5,
        keepalive: (se = (K = j.connectProperties) === null || K === void 0 ? void 0 : K.keepAliveIntervalSeconds) !== null && se !== void 0 ? se : s.DEFAULT_KEEP_ALIVE,
        connectTimeout: (q = j.connectTimeoutMs) !== null && q !== void 0 ? q : r.DEFAULT_CONNECT_TIMEOUT_MS,
        clean: A(j.sessionBehavior),
        reconnectPeriod: H,
        // @ts-ignore
        autoUseTopicAlias: !1,
        // @ts-ignore
        autoAssignTopicAlias: !1,
        queueQoSZero: !1,
        transformWsUrl: void 0,
        resubscribe: !1
      }, fe = j.topicAliasingOptions;
      if (fe)
        switch ((l = fe.outboundBehavior) !== null && l !== void 0 ? l : a.OutboundTopicAliasBehaviorType.Default) {
          case a.OutboundTopicAliasBehaviorType.LRU:
            ee.autoUseTopicAlias = !0, ee.autoAssignTopicAlias = !0;
            break;
          case a.OutboundTopicAliasBehaviorType.Manual:
            ee.autoUseTopicAlias = !0;
            break;
        }
      f.set_defined_property(ee, "clientId", ($ = (p = j.connectProperties) === null || p === void 0 ? void 0 : p.clientId) !== null && $ !== void 0 ? $ : ""), f.set_defined_property(ee, "username", (G = j.connectProperties) === null || G === void 0 ? void 0 : G.username), f.set_defined_property(ee, "password", (P = j.connectProperties) === null || P === void 0 ? void 0 : P.password), f.set_defined_property(ee, "will", y(j.connectProperties));
      var ae = !1, pe = {};
      return ae = f.set_defined_property(pe, "sessionExpiryInterval", (N = j.connectProperties) === null || N === void 0 ? void 0 : N.sessionExpiryIntervalSeconds) || ae, ae = f.set_defined_property(pe, "receiveMaximum", (Y = j.connectProperties) === null || Y === void 0 ? void 0 : Y.receiveMaximum) || ae, ae = f.set_defined_property(pe, "maximumPacketSize", (he = j.connectProperties) === null || he === void 0 ? void 0 : he.maximumPacketSizeBytes) || ae, ae = f.set_defined_property(pe, "requestResponseInformation", (_e = j.connectProperties) === null || _e === void 0 ? void 0 : _e.requestResponseInformation) || ae, ae = f.set_defined_property(pe, "requestProblemInformation", (k = j.connectProperties) === null || k === void 0 ? void 0 : k.requestProblemInformation) || ae, ae = f.set_defined_property(pe, "userProperties", D((x = j.connectProperties) === null || x === void 0 ? void 0 : x.userProperties)) || ae, ae && (ee.properties = pe), ee;
    }
    r.create_mqtt_js_client_config_from_crt_client_config = m;
    function D(j) {
      var K, se;
      if (j) {
        var q = {};
        try {
          for (var l = o(j), p = l.next(); !p.done; p = l.next()) {
            var $ = p.value, G = $.name;
            G in q || (q[G] = []), q[G].push($.value);
          }
        } catch (P) {
          K = { error: P };
        } finally {
          try {
            p && !p.done && (se = l.return) && se.call(l);
          } finally {
            if (K)
              throw K.error;
          }
        }
        return q;
      }
    }
    r.transform_crt_user_properties_to_mqtt_js_user_properties = D;
    function w(j) {
      var K, se, q, l;
      if (j) {
        var p = void 0;
        try {
          for (var $ = o(Object.entries(j)), G = $.next(); !G.done; G = $.next()) {
            var P = i(G.value, 2), N = P[0], Y = P[1], he = typeof Y == "string" ? [Y] : Y;
            try {
              for (var _e = (q = void 0, o(he)), k = _e.next(); !k.done; k = _e.next()) {
                var x = k.value, b = { name: N, value: x };
                p ? p.push(b) : p = [b];
              }
            } catch (H) {
              q = { error: H };
            } finally {
              try {
                k && !k.done && (l = _e.return) && l.call(_e);
              } finally {
                if (q)
                  throw q.error;
              }
            }
          }
        } catch (H) {
          K = { error: H };
        } finally {
          try {
            G && !G.done && (se = $.return) && se.call($);
          } finally {
            if (K)
              throw K.error;
          }
        }
        return p;
      }
    }
    r.transform_mqtt_js_user_properties_to_crt_user_properties = w;
    function F(j) {
      if (j == null || j == null)
        throw new u.CrtError("validate_crt_disconnect: disconnect not defined");
      E("sessionExpiryIntervalSeconds", j.sessionExpiryIntervalSeconds);
    }
    function L(j) {
      F(j);
      var K = {}, se = !1;
      se = f.set_defined_property(K, "sessionExpiryInterval", j.sessionExpiryIntervalSeconds) || se, se = f.set_defined_property(K, "reasonString", j.reasonString) || se, se = f.set_defined_property(K, "userProperties", D(j.userProperties)) || se, se = f.set_defined_property(K, "serverReference", j.serverReference) || se;
      var q = {
        cmd: "disconnect",
        reasonCode: j.reasonCode
      };
      return se && (q.properties = K), q;
    }
    r.transform_crt_disconnect_to_mqtt_js_disconnect = L;
    function z(j) {
      var K, se, q, l, p;
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_disconnect_to_crt_disconnect: disconnect not defined");
      var $ = {
        type: a.PacketType.Disconnect,
        reasonCode: (K = j.reasonCode) !== null && K !== void 0 ? K : a.DisconnectReasonCode.NormalDisconnection
      };
      return f.set_defined_property($, "sessionExpiryIntervalSeconds", (se = j.properties) === null || se === void 0 ? void 0 : se.sessionExpiryInterval), f.set_defined_property($, "reasonString", (q = j.properties) === null || q === void 0 ? void 0 : q.reasonString), f.set_defined_property($, "userProperties", w((l = j.properties) === null || l === void 0 ? void 0 : l.userProperties)), f.set_defined_property($, "serverReference", (p = j.properties) === null || p === void 0 ? void 0 : p.serverReference), $;
    }
    r.transform_mqtt_js_disconnect_to_crt_disconnect = z;
    function V(j) {
      if (j == null || j == null)
        throw new u.CrtError("validate_crt_subscribe: subscribe not defined");
      E("subscriptionIdentifier", j.subscriptionIdentifier);
    }
    function Z(j) {
      var K, se, q, l, p;
      V(j);
      var $ = {};
      try {
        for (var G = o(j.subscriptions), P = G.next(); !P.done; P = G.next()) {
          var N = P.value, Y = {
            qos: N.qos,
            nl: (q = N.noLocal) !== null && q !== void 0 ? q : !1,
            rap: (l = N.retainAsPublished) !== null && l !== void 0 ? l : !1,
            rh: (p = N.retainHandlingType) !== null && p !== void 0 ? p : a.RetainHandlingType.SendOnSubscribe
          };
          $[N.topicFilter] = Y;
        }
      } catch (he) {
        K = { error: he };
      } finally {
        try {
          P && !P.done && (se = G.return) && se.call(G);
        } finally {
          if (K)
            throw K.error;
        }
      }
      return $;
    }
    r.transform_crt_subscribe_to_mqtt_js_subscription_map = Z;
    function ne(j) {
      var K = {}, se = !1;
      if (j == null || j == null)
        throw new u.CrtError("transform_crt_subscribe_to_mqtt_js_subscribe_options: subscribe not defined");
      se = f.set_defined_property(K, "subscriptionIdentifier", j.subscriptionIdentifier) || se, se = f.set_defined_property(K, "userProperties", D(j.userProperties)) || se;
      var q = {
        qos: 0
      };
      return se && (q.properties = K), q;
    }
    r.transform_crt_subscribe_to_mqtt_js_subscribe_options = ne;
    function ie(j) {
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_subscription_grants_to_crt_suback: subscriptionsGranted not defined");
      var K = {
        type: a.PacketType.Suback,
        reasonCodes: j.map(function(se, q, l) {
          return se.qos;
        })
      };
      return K;
    }
    r.transform_mqtt_js_subscription_grants_to_crt_suback = ie;
    function R(j) {
      if (j == null || j == null)
        throw new u.CrtError("validate_crt_publish: publish not defined");
      E("messageExpiryIntervalSeconds", j.messageExpiryIntervalSeconds);
    }
    function U(j) {
      var K;
      R(j);
      var se = {}, q = !1;
      j.payloadFormat !== void 0 && (q = f.set_defined_property(se, "payloadFormatIndicator", j.payloadFormat == a.PayloadFormatIndicator.Utf8) || q), q = f.set_defined_property(se, "messageExpiryInterval", j.messageExpiryIntervalSeconds) || q, q = f.set_defined_property(se, "responseTopic", j.responseTopic) || q, q = f.set_defined_property(se, "correlationData", j.correlationData) || q, q = f.set_defined_property(se, "userProperties", D(j.userProperties)) || q, q = f.set_defined_property(se, "contentType", j.contentType) || q, q = f.set_defined_property(se, "topicAlias", j.topicAlias) || q;
      var l = {
        qos: j.qos,
        retain: (K = j.retain) !== null && K !== void 0 ? K : !1
      };
      return q && (l.properties = se), l;
    }
    r.transform_crt_publish_to_mqtt_js_publish_options = U;
    function X(j) {
      var K, se, q, l, p, $;
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_publish_to_crt_publish: publish not defined");
      var G = {
        type: a.PacketType.Publish,
        qos: j.qos,
        retain: j.retain,
        topicName: j.topic,
        payload: j.payload
      };
      if (j.properties) {
        j.properties.payloadFormatIndicator !== void 0 && f.set_defined_property(G, "payloadFormat", j.properties.payloadFormatIndicator ? a.PayloadFormatIndicator.Utf8 : a.PayloadFormatIndicator.Bytes), f.set_defined_property(G, "messageExpiryIntervalSeconds", (K = j.properties) === null || K === void 0 ? void 0 : K.messageExpiryInterval), f.set_defined_property(G, "responseTopic", (se = j.properties) === null || se === void 0 ? void 0 : se.responseTopic), f.set_defined_property(G, "correlationData", (q = j.properties) === null || q === void 0 ? void 0 : q.correlationData), f.set_defined_property(G, "userProperties", w((l = j.properties) === null || l === void 0 ? void 0 : l.userProperties)), f.set_defined_property(G, "contentType", (p = j.properties) === null || p === void 0 ? void 0 : p.contentType);
        var P = ($ = j.properties) === null || $ === void 0 ? void 0 : $.subscriptionIdentifier, N = typeof P;
        P && (N == "number" ? G.subscriptionIdentifiers = [P] : Array.isArray(P) && (G.subscriptionIdentifiers = P));
      }
      return G;
    }
    r.transform_mqtt_js_publish_to_crt_publish = X;
    function ue(j) {
      var K, se, q;
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_puback_to_crt_puback: puback not defined");
      var l = {
        type: a.PacketType.Puback,
        reasonCode: (K = j.reasonCode) !== null && K !== void 0 ? K : a.PubackReasonCode.Success
      };
      return j.properties && (f.set_defined_property(l, "reasonString", (se = j.properties) === null || se === void 0 ? void 0 : se.reasonString), f.set_defined_property(l, "userProperties", w((q = j.properties) === null || q === void 0 ? void 0 : q.userProperties))), l;
    }
    r.transform_mqtt_js_puback_to_crt_puback = ue;
    function J(j) {
      if (j == null || j == null)
        throw new u.CrtError("transform_crt_unsubscribe_to_mqtt_js_unsubscribe_options: unsubscribe not defined");
      var K = {}, se = !1;
      se = f.set_defined_property(K, "userProperties", D(j.userProperties));
      var q = {};
      return se && (q.properties = K), q;
    }
    r.transform_crt_unsubscribe_to_mqtt_js_unsubscribe_options = J;
    function te(j) {
      var K, se;
      if (j == null || j == null)
        throw new u.CrtError("transform_mqtt_js_unsuback_to_crt_unsuback: packet not defined");
      var q = j.reasonCode, l;
      Array.isArray(q) ? l = q : typeof q == "number" ? l = [q] : l = [];
      var p = {
        type: a.PacketType.Unsuback,
        reasonCodes: l
      };
      return j.properties && (f.set_defined_property(p, "reasonString", (K = j.properties) === null || K === void 0 ? void 0 : K.reasonString), f.set_defined_property(p, "userProperties", w((se = j.properties) === null || se === void 0 ? void 0 : se.userProperties))), p;
    }
    r.transform_mqtt_js_unsuback_to_crt_unsuback = te;
  }(xi)), xi;
}
var da;
function Mn() {
  return da || (da = 1, function(r) {
    var e = Q && Q.__extends || /* @__PURE__ */ function() {
      var m = function(D, w) {
        return m = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(F, L) {
          F.__proto__ = L;
        } || function(F, L) {
          for (var z in L)
            Object.prototype.hasOwnProperty.call(L, z) && (F[z] = L[z]);
        }, m(D, w);
      };
      return function(D, w) {
        if (typeof w != "function" && w !== null)
          throw new TypeError("Class extends value " + String(w) + " is not a constructor or null");
        m(D, w);
        function F() {
          this.constructor = D;
        }
        D.prototype = w === null ? Object.create(w) : (F.prototype = w.prototype, new F());
      };
    }(), t = Q && Q.__createBinding || (Object.create ? function(m, D, w, F) {
      F === void 0 && (F = w);
      var L = Object.getOwnPropertyDescriptor(D, w);
      (!L || ("get" in L ? !D.__esModule : L.writable || L.configurable)) && (L = { enumerable: !0, get: function() {
        return D[w];
      } }), Object.defineProperty(m, F, L);
    } : function(m, D, w, F) {
      F === void 0 && (F = w), m[F] = D[w];
    }), n = Q && Q.__setModuleDefault || (Object.create ? function(m, D) {
      Object.defineProperty(m, "default", { enumerable: !0, value: D });
    } : function(m, D) {
      m.default = D;
    }), i = Q && Q.__importStar || function(m) {
      if (m && m.__esModule)
        return m;
      var D = {};
      if (m != null)
        for (var w in m)
          w !== "default" && Object.prototype.hasOwnProperty.call(m, w) && t(D, m, w);
      return n(D, m), D;
    }, o = Q && Q.__exportStar || function(m, D) {
      for (var w in m)
        w !== "default" && !Object.prototype.hasOwnProperty.call(D, w) && t(D, m, w);
    }, s = Q && Q.__awaiter || function(m, D, w, F) {
      function L(z) {
        return z instanceof w ? z : new w(function(V) {
          V(z);
        });
      }
      return new (w || (w = Promise))(function(z, V) {
        function Z(R) {
          try {
            ie(F.next(R));
          } catch (U) {
            V(U);
          }
        }
        function ne(R) {
          try {
            ie(F.throw(R));
          } catch (U) {
            V(U);
          }
        }
        function ie(R) {
          R.done ? z(R.value) : L(R.value).then(Z, ne);
        }
        ie((F = F.apply(m, D || [])).next());
      });
    }, a = Q && Q.__generator || function(m, D) {
      var w = { label: 0, sent: function() {
        if (z[0] & 1)
          throw z[1];
        return z[1];
      }, trys: [], ops: [] }, F, L, z, V;
      return V = { next: Z(0), throw: Z(1), return: Z(2) }, typeof Symbol == "function" && (V[Symbol.iterator] = function() {
        return this;
      }), V;
      function Z(ie) {
        return function(R) {
          return ne([ie, R]);
        };
      }
      function ne(ie) {
        if (F)
          throw new TypeError("Generator is already executing.");
        for (; V && (V = 0, ie[0] && (w = 0)), w; )
          try {
            if (F = 1, L && (z = ie[0] & 2 ? L.return : ie[0] ? L.throw || ((z = L.return) && z.call(L), 0) : L.next) && !(z = z.call(L, ie[1])).done)
              return z;
            switch (L = 0, z && (ie = [ie[0] & 2, z.value]), ie[0]) {
              case 0:
              case 1:
                z = ie;
                break;
              case 4:
                return w.label++, { value: ie[1], done: !1 };
              case 5:
                w.label++, L = ie[1], ie = [0];
                continue;
              case 7:
                ie = w.ops.pop(), w.trys.pop();
                continue;
              default:
                if (z = w.trys, !(z = z.length > 0 && z[z.length - 1]) && (ie[0] === 6 || ie[0] === 2)) {
                  w = 0;
                  continue;
                }
                if (ie[0] === 3 && (!z || ie[1] > z[0] && ie[1] < z[3])) {
                  w.label = ie[1];
                  break;
                }
                if (ie[0] === 6 && w.label < z[1]) {
                  w.label = z[1], z = ie;
                  break;
                }
                if (z && w.label < z[2]) {
                  w.label = z[2], w.ops.push(ie);
                  break;
                }
                z[2] && w.ops.pop(), w.trys.pop();
                continue;
            }
            ie = D.call(m, w);
          } catch (R) {
            ie = [6, R], L = 0;
          } finally {
            F = z = 0;
          }
        if (ie[0] & 5)
          throw ie[1];
        return { value: ie[0] ? ie[1] : void 0, done: !0 };
      }
    }, f = Q && Q.__read || function(m, D) {
      var w = typeof Symbol == "function" && m[Symbol.iterator];
      if (!w)
        return m;
      var F = w.call(m), L, z = [], V;
      try {
        for (; (D === void 0 || D-- > 0) && !(L = F.next()).done; )
          z.push(L.value);
      } catch (Z) {
        V = { error: Z };
      } finally {
        try {
          L && !L.done && (w = F.return) && w.call(F);
        } finally {
          if (V)
            throw V.error;
        }
      }
      return z;
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.Mqtt5Client = r.Mqtt5WebsocketUrlFactoryType = void 0;
    var u = Br, c = i(zf), h = i(fn), y = fn, T = i(Do), A = Rt, B = i(xc()), O = i(jp()), d = i(Vt);
    o(fn, r), o(Do, r);
    var _;
    (function(m) {
      m[m.Ws = 1] = "Ws", m[m.Wss = 2] = "Wss", m[m.Sigv4 = 3] = "Sigv4", m[m.Custom = 4] = "Custom";
    })(_ = r.Mqtt5WebsocketUrlFactoryType || (r.Mqtt5WebsocketUrlFactoryType = {}));
    var E = (
      /** @class */
      function() {
        function m(D, w) {
          this.browserClient = D, this.clientConfig = w, this.connectionFailureCount = 0, this.lastReconnectDelay = 0, this.resetConnectionFailureCountTask = void 0, this.reconnectionTask = void 0, this.lastReconnectDelay = void 0;
        }
        return m.prototype.onSuccessfulConnection = function() {
          var D = this, w;
          this.clearTasks(), this.resetConnectionFailureCountTask = setTimeout(function() {
            D.connectionFailureCount = 0, D.lastReconnectDelay = void 0;
          }, (w = this.clientConfig.minConnectedTimeToResetReconnectDelayMs) !== null && w !== void 0 ? w : O.DEFAULT_MIN_CONNECTED_TIME_TO_RESET_RECONNECT_DELAY_MS);
        }, m.prototype.onConnectionFailureOrDisconnection = function() {
          var D = this;
          this.clearTasks();
          var w = this.calculateNextReconnectDelay();
          this.lastReconnectDelay = w, this.connectionFailureCount += 1, this.reconnectionTask = setTimeout(function() {
            return s(D, void 0, void 0, function() {
              var F, L;
              return a(this, function(z) {
                switch (z.label) {
                  case 0:
                    return F = this.clientConfig.websocketOptions, F && F.urlFactoryOptions.urlFactory == _.Sigv4 ? (L = F.urlFactoryOptions, L.credentialsProvider ? [4, L.credentialsProvider.refreshCredentials()] : [3, 2]) : [3, 2];
                  case 1:
                    z.sent(), z.label = 2;
                  case 2:
                    return this.browserClient.reconnect(), [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }, w);
        }, m.prototype.clearTasks = function() {
          this.reconnectionTask && clearTimeout(this.reconnectionTask), this.resetConnectionFailureCountTask && clearTimeout(this.resetConnectionFailureCountTask);
        }, m.prototype.randomInRange = function(D, w) {
          return D + (w - D) * Math.random();
        }, m.prototype.calculateNextReconnectDelay = function() {
          var D, w = (D = this.clientConfig.retryJitterMode) !== null && D !== void 0 ? D : h.RetryJitterType.Default, F = f(O.getOrderedReconnectDelayBounds(this.clientConfig.minReconnectDelayMs, this.clientConfig.maxReconnectDelayMs), 2), L = F[0], z = F[1], V = Math.min(52, this.connectionFailureCount), Z = 0;
          return w == h.RetryJitterType.None ? Z = L * Math.pow(2, V) : w == h.RetryJitterType.Decorrelated && this.lastReconnectDelay ? Z = this.randomInRange(L, 3 * this.lastReconnectDelay) : Z = this.randomInRange(L, Math.min(z, L * Math.pow(2, V))), Z = Math.min(z, Z), this.lastReconnectDelay = Z, Z;
        }, m;
      }()
    ), M;
    (function(m) {
      m[m.Stopped = 0] = "Stopped", m[m.Running = 1] = "Running", m[m.Stopping = 2] = "Stopping", m[m.Restarting = 3] = "Restarting";
    })(M || (M = {}));
    var S;
    (function(m) {
      m[m.None = 0] = "None", m[m.Connecting = 1] = "Connecting", m[m.Connected = 2] = "Connected", m[m.Disconnected = 3] = "Disconnected";
    })(S || (S = {}));
    var C = (
      /** @class */
      function(m) {
        e(D, m);
        function D(w) {
          var F = m.call(this) || this;
          return F.config = w, F.on_message = function(L, z, V) {
            var Z = O.transform_mqtt_js_publish_to_crt_publish(V), ne = {
              message: Z
            };
            setTimeout(function() {
              F.emit(D.MESSAGE_RECEIVED, ne);
            }, 0);
          }, F.mqttJsConfig = O.create_mqtt_js_client_config_from_crt_client_config(F.config), F.state = M.Stopped, F.lifecycleEventState = S.None, F.topicAliasBindings = /* @__PURE__ */ new Map(), F;
        }
        return D.prototype.close = function() {
        }, D.prototype.start = function() {
          var w = this;
          if (this.state == M.Stopped) {
            this.lifecycleEventState = S.Connecting, this.lastDisconnect = void 0, this.cork(), this.emit("attemptingConnect");
            var F = function(L) {
              return B.create_mqtt5_websocket_stream(w.config);
            };
            this.browserClient = new c.MqttClient(F, this.mqttJsConfig), this.browserClient.on("end", function() {
              w._on_stopped_internal();
            }), this.browserClient.on("reconnect", function() {
              w.on_attempting_connect();
            }), this.browserClient.on("connect", function(L) {
              w.on_connection_success(L);
            }), this.browserClient.on("message", function(L, z, V) {
              w.on_message(L, z, V);
            }), this.browserClient.on("error", function(L) {
              w.on_browser_client_error(L);
            }), this.browserClient.on("close", function() {
              w.on_browser_close();
            }), this.browserClient.on("disconnect", function(L) {
              w.on_browser_disconnect_packet(L);
            }), this.reconnectionScheduler = new E(this.browserClient, this.config), this.state = M.Running, this.uncork();
          } else
            this.state == M.Stopping && (this.state = M.Restarting);
        }, D.prototype.stop = function(w) {
          var F, L;
          this.state == M.Running ? (w ? (F = this.browserClient) === null || F === void 0 || F.end(!0, O.transform_crt_disconnect_to_mqtt_js_disconnect(w)) : (L = this.browserClient) === null || L === void 0 || L.end(!0), this.state = M.Stopping) : this.state == M.Restarting && (this.state = M.Stopping);
        }, D.prototype.subscribe = function(w) {
          return s(this, void 0, void 0, function() {
            var F = this;
            return a(this, function(L) {
              return [2, new Promise(function(z, V) {
                try {
                  if (!F.browserClient) {
                    V(new Error("Client is stopped and cannot subscribe"));
                    return;
                  }
                  if (!w) {
                    V(new Error("Invalid subscribe packet"));
                    return;
                  }
                  var Z = O.transform_crt_subscribe_to_mqtt_js_subscription_map(w), ne = O.transform_crt_subscribe_to_mqtt_js_subscribe_options(w);
                  F.browserClient.subscribe(Z, ne, function(ie, R) {
                    if (ie) {
                      V(ie);
                      return;
                    }
                    var U = O.transform_mqtt_js_subscription_grants_to_crt_suback(R);
                    z(U);
                  });
                } catch (ie) {
                  V(ie);
                }
              })];
            });
          });
        }, D.prototype.unsubscribe = function(w) {
          return s(this, void 0, void 0, function() {
            var F = this;
            return a(this, function(L) {
              return [2, new Promise(function(z, V) {
                try {
                  if (!F.browserClient) {
                    V(new Error("Client is stopped and cannot unsubscribe"));
                    return;
                  }
                  if (!w) {
                    V(new Error("Invalid unsubscribe packet"));
                    return;
                  }
                  var Z = w.topicFilters, ne = O.transform_crt_unsubscribe_to_mqtt_js_unsubscribe_options(w);
                  F.browserClient.unsubscribe(Z, ne, function(ie, R) {
                    if (ie) {
                      V(ie);
                      return;
                    }
                    if (!R || R.cmd !== "unsuback") {
                      var U = {
                        type: T.PacketType.Unsuback,
                        reasonCodes: Z.map(function(X, ue, J) {
                          return T.UnsubackReasonCode.Success;
                        })
                      };
                      z(U);
                    } else {
                      var U = O.transform_mqtt_js_unsuback_to_crt_unsuback(R);
                      z(U);
                    }
                  });
                } catch (ie) {
                  V(ie);
                }
              })];
            });
          });
        }, D.prototype.reset_topic_aliases = function() {
          this.topicAliasBindings.clear();
        }, D.prototype.bind_topic_alias = function(w, F) {
          this.topicAliasBindings.set(w, F);
        }, D.prototype.is_topic_alias_bound = function(w, F) {
          return F ? this.topicAliasBindings.get(w) === F : !1;
        }, D.prototype.publish = function(w) {
          return s(this, void 0, void 0, function() {
            var F = this;
            return a(this, function(L) {
              return [2, new Promise(function(z, V) {
                var Z, ne;
                try {
                  if (!F.browserClient) {
                    V(new Error("Client is stopped and cannot publish"));
                    return;
                  }
                  if (!w) {
                    V(new Error("Invalid publish packet"));
                    return;
                  }
                  ((ne = (Z = F.config.topicAliasingOptions) === null || Z === void 0 ? void 0 : Z.outboundBehavior) !== null && ne !== void 0 ? ne : y.OutboundTopicAliasBehaviorType.Default) == y.OutboundTopicAliasBehaviorType.Manual ? w.topicAlias && F.lifecycleEventState == S.Connected && (F.is_topic_alias_bound(w.topicAlias, w.topicName) && delete w.topicAlias, F.bind_topic_alias(w.topicAlias, w.topicName)) : delete w.topicAlias;
                  var ie = O.transform_crt_publish_to_mqtt_js_publish_options(w), R = w.qos, U = d.normalize_payload(w.payload);
                  F.browserClient.publish(w.topicName, U, ie, function(X, ue) {
                    if (X) {
                      V(X);
                      return;
                    }
                    switch (R) {
                      case T.QoS.AtMostOnce:
                        z(void 0);
                        break;
                      case T.QoS.AtLeastOnce:
                        if (!ue) {
                          V(new Error("Invalid puback packet from mqtt-js"));
                          return;
                        }
                        ue.cmd !== "puback" && z({
                          type: T.PacketType.Puback,
                          reasonCode: T.PubackReasonCode.Success
                        });
                        var J = O.transform_mqtt_js_puback_to_crt_puback(ue);
                        z(J);
                        break;
                      default:
                        V(new Error("Unsupported QoS value"));
                        break;
                    }
                  });
                } catch (X) {
                  V(X);
                }
              })];
            });
          });
        }, D.prototype.on = function(w, F) {
          return m.prototype.on.call(this, w, F), this;
        }, D.prototype.on_browser_disconnect_packet = function(w) {
          this.lastDisconnect = O.transform_mqtt_js_disconnect_to_crt_disconnect(w);
        }, D.prototype.on_browser_close = function() {
          var w = this, F, L, z, V, Z = this.lastDisconnect, ne = this.lastError;
          if (this.lifecycleEventState == S.Connected) {
            this.lifecycleEventState = S.Disconnected, (F = this.reconnectionScheduler) === null || F === void 0 || F.onConnectionFailureOrDisconnection();
            var ie = {
              error: new A.CrtError((L = ne == null ? void 0 : ne.toString()) !== null && L !== void 0 ? L : "disconnected")
            };
            Z !== void 0 && (ie.disconnect = Z), setTimeout(function() {
              w.emit(D.DISCONNECTION, ie);
            }, 0);
          } else if (this.lifecycleEventState == S.Connecting) {
            this.lifecycleEventState = S.Disconnected, (z = this.reconnectionScheduler) === null || z === void 0 || z.onConnectionFailureOrDisconnection();
            var R = {
              error: new A.CrtError((V = ne == null ? void 0 : ne.toString()) !== null && V !== void 0 ? V : "connectionFailure")
            };
            setTimeout(function() {
              w.emit(D.CONNECTION_FAILURE, R);
            }, 0);
          }
          this.lastDisconnect = void 0, this.lastError = void 0;
        }, D.prototype.on_browser_client_error = function(w) {
          var F = this;
          this.lastError = w, setTimeout(function() {
            F.emit(D.INFO, new A.CrtError(w));
          }, 0);
        }, D.prototype.on_attempting_connect = function() {
          var w = this;
          this.lifecycleEventState = S.Connecting;
          var F = {};
          setTimeout(function() {
            w.emit(D.ATTEMPTING_CONNECT, F);
          }, 0);
        }, D.prototype.on_connection_success = function(w) {
          var F = this, L;
          this.lifecycleEventState = S.Connected, this.reset_topic_aliases(), (L = this.reconnectionScheduler) === null || L === void 0 || L.onSuccessfulConnection();
          var z = O.transform_mqtt_js_connack_to_crt_connack(w), V = O.create_negotiated_settings(this.config, z), Z = {
            connack: z,
            settings: V
          };
          setTimeout(function() {
            F.emit(D.CONNECTION_SUCCESS, Z);
          }, 0);
        }, D.prototype._on_stopped_internal = function() {
          var w;
          (w = this.reconnectionScheduler) === null || w === void 0 || w.clearTasks(), this.reconnectionScheduler = void 0, this.browserClient = void 0, this.lifecycleEventState = S.None, this.lastDisconnect = void 0, this.lastError = void 0, this.state == M.Restarting ? (this.state = M.Stopped, this.start()) : this.state != M.Stopped && (this.state = M.Stopped, this.emit(D.STOPPED));
        }, D.ERROR = "error", D.INFO = "info", D.MESSAGE_RECEIVED = "messageReceived", D.ATTEMPTING_CONNECT = "attemptingConnect", D.CONNECTION_SUCCESS = "connectionSuccess", D.CONNECTION_FAILURE = "connectionFailure", D.DISCONNECTION = "disconnection", D.STOPPED = "stopped", D;
      }(u.BufferedEventEmitter)
    );
    r.Mqtt5Client = C;
  }(yi)), yi;
}
var Fo = { exports: {} }, Up = {}.toString, Kf = Array.isArray || function(r) {
  return Up.call(r) == "[object Array]";
}, Vf = Ne.EventEmitter, Oo = { exports: {} };
(function(r, e) {
  var t = et, n = t.Buffer;
  function i(s, a) {
    for (var f in s)
      a[f] = s[f];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
  function o(s, a, f) {
    return n(s, a, f);
  }
  i(n, o), o.from = function(s, a, f) {
    if (typeof s == "number")
      throw new TypeError("Argument must not be a number");
    return n(s, a, f);
  }, o.alloc = function(s, a, f) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    var u = n(s);
    return a !== void 0 ? typeof f == "string" ? u.fill(a, f) : u.fill(a) : u.fill(0), u;
  }, o.allocUnsafe = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return n(s);
  }, o.allocUnsafeSlow = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return t.SlowBuffer(s);
  };
})(Oo, Oo.exports);
var is = Oo.exports, Me = {};
function Lp(r) {
  return Array.isArray ? Array.isArray(r) : In(r) === "[object Array]";
}
Me.isArray = Lp;
function qp(r) {
  return typeof r == "boolean";
}
Me.isBoolean = qp;
function Hp(r) {
  return r === null;
}
Me.isNull = Hp;
function $p(r) {
  return r == null;
}
Me.isNullOrUndefined = $p;
function Wp(r) {
  return typeof r == "number";
}
Me.isNumber = Wp;
function zp(r) {
  return typeof r == "string";
}
Me.isString = zp;
function Kp(r) {
  return typeof r == "symbol";
}
Me.isSymbol = Kp;
function Vp(r) {
  return r === void 0;
}
Me.isUndefined = Vp;
function Gp(r) {
  return In(r) === "[object RegExp]";
}
Me.isRegExp = Gp;
function Qp(r) {
  return typeof r == "object" && r !== null;
}
Me.isObject = Qp;
function Jp(r) {
  return In(r) === "[object Date]";
}
Me.isDate = Jp;
function Xp(r) {
  return In(r) === "[object Error]" || r instanceof Error;
}
Me.isError = Xp;
function Yp(r) {
  return typeof r == "function";
}
Me.isFunction = Yp;
function Zp(r) {
  return r === null || typeof r == "boolean" || typeof r == "number" || typeof r == "string" || typeof r == "symbol" || // ES6 symbol
  typeof r > "u";
}
Me.isPrimitive = Zp;
Me.isBuffer = et.Buffer.isBuffer;
function In(r) {
  return Object.prototype.toString.call(r);
}
var gi = { exports: {} }, pa;
function e_() {
  return pa || (pa = 1, function(r) {
    function e(o, s) {
      if (!(o instanceof s))
        throw new TypeError("Cannot call a class as a function");
    }
    var t = is.Buffer, n = Ne;
    function i(o, s, a) {
      o.copy(s, a);
    }
    r.exports = function() {
      function o() {
        e(this, o), this.head = null, this.tail = null, this.length = 0;
      }
      return o.prototype.push = function(a) {
        var f = { data: a, next: null };
        this.length > 0 ? this.tail.next = f : this.head = f, this.tail = f, ++this.length;
      }, o.prototype.unshift = function(a) {
        var f = { data: a, next: this.head };
        this.length === 0 && (this.tail = f), this.head = f, ++this.length;
      }, o.prototype.shift = function() {
        if (this.length !== 0) {
          var a = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, a;
        }
      }, o.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, o.prototype.join = function(a) {
        if (this.length === 0)
          return "";
        for (var f = this.head, u = "" + f.data; f = f.next; )
          u += a + f.data;
        return u;
      }, o.prototype.concat = function(a) {
        if (this.length === 0)
          return t.alloc(0);
        for (var f = t.allocUnsafe(a >>> 0), u = this.head, c = 0; u; )
          i(u.data, f, c), c += u.data.length, u = u.next;
        return f;
      }, o;
    }(), n && n.inspect && n.inspect.custom && (r.exports.prototype[n.inspect.custom] = function() {
      var o = n.inspect({ length: this.length });
      return this.constructor.name + " " + o;
    });
  }(gi)), gi.exports;
}
var Zr = Nt;
function t_(r, e) {
  var t = this, n = this._readableState && this._readableState.destroyed, i = this._writableState && this._writableState.destroyed;
  return n || i ? (e ? e(r) : r && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, Zr.nextTick(en, this, r)) : Zr.nextTick(en, this, r)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(r || null, function(o) {
    !e && o ? t._writableState ? t._writableState.errorEmitted || (t._writableState.errorEmitted = !0, Zr.nextTick(en, t, o)) : Zr.nextTick(en, t, o) : e && e(o);
  }), this);
}
function r_() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function en(r, e) {
  r.emit("error", e);
}
var Gf = {
  destroy: t_,
  undestroy: r_
}, bi, _a;
function Qf() {
  if (_a)
    return bi;
  _a = 1;
  var r = Nt;
  bi = B;
  function e(R) {
    var U = this;
    this.next = null, this.entry = null, this.finish = function() {
      ie(U, R);
    };
  }
  var t = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : r.nextTick, n;
  B.WritableState = T;
  var i = Object.create(Me);
  i.inherits = Ue;
  var o = {
    deprecate: Qo
  }, s = Vf, a = is.Buffer, f = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function u(R) {
    return a.from(R);
  }
  function c(R) {
    return a.isBuffer(R) || R instanceof f;
  }
  var h = Gf;
  i.inherits(B, s);
  function y() {
  }
  function T(R, U) {
    n = n || mr(), R = R || {};
    var X = U instanceof n;
    this.objectMode = !!R.objectMode, X && (this.objectMode = this.objectMode || !!R.writableObjectMode);
    var ue = R.highWaterMark, J = R.writableHighWaterMark, te = this.objectMode ? 16 : 16 * 1024;
    ue || ue === 0 ? this.highWaterMark = ue : X && (J || J === 0) ? this.highWaterMark = J : this.highWaterMark = te, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var j = R.decodeStrings === !1;
    this.decodeStrings = !j, this.defaultEncoding = R.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(K) {
      m(U, K);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new e(this);
  }
  T.prototype.getBuffer = function() {
    for (var U = this.bufferedRequest, X = []; U; )
      X.push(U), U = U.next;
    return X;
  }, function() {
    try {
      Object.defineProperty(T.prototype, "buffer", {
        get: o.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var A;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (A = Function.prototype[Symbol.hasInstance], Object.defineProperty(B, Symbol.hasInstance, {
    value: function(R) {
      return A.call(this, R) ? !0 : this !== B ? !1 : R && R._writableState instanceof T;
    }
  })) : A = function(R) {
    return R instanceof this;
  };
  function B(R) {
    if (n = n || mr(), !A.call(B, this) && !(this instanceof n))
      return new B(R);
    this._writableState = new T(R, this), this.writable = !0, R && (typeof R.write == "function" && (this._write = R.write), typeof R.writev == "function" && (this._writev = R.writev), typeof R.destroy == "function" && (this._destroy = R.destroy), typeof R.final == "function" && (this._final = R.final)), s.call(this);
  }
  B.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function O(R, U) {
    var X = new Error("write after end");
    R.emit("error", X), r.nextTick(U, X);
  }
  function d(R, U, X, ue) {
    var J = !0, te = !1;
    return X === null ? te = new TypeError("May not write null values to stream") : typeof X != "string" && X !== void 0 && !U.objectMode && (te = new TypeError("Invalid non-string/buffer chunk")), te && (R.emit("error", te), r.nextTick(ue, te), J = !1), J;
  }
  B.prototype.write = function(R, U, X) {
    var ue = this._writableState, J = !1, te = !ue.objectMode && c(R);
    return te && !a.isBuffer(R) && (R = u(R)), typeof U == "function" && (X = U, U = null), te ? U = "buffer" : U || (U = ue.defaultEncoding), typeof X != "function" && (X = y), ue.ended ? O(this, X) : (te || d(this, ue, R, X)) && (ue.pendingcb++, J = E(this, ue, te, R, U, X)), J;
  }, B.prototype.cork = function() {
    var R = this._writableState;
    R.corked++;
  }, B.prototype.uncork = function() {
    var R = this._writableState;
    R.corked && (R.corked--, !R.writing && !R.corked && !R.bufferProcessing && R.bufferedRequest && F(this, R));
  }, B.prototype.setDefaultEncoding = function(U) {
    if (typeof U == "string" && (U = U.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((U + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + U);
    return this._writableState.defaultEncoding = U, this;
  };
  function _(R, U, X) {
    return !R.objectMode && R.decodeStrings !== !1 && typeof U == "string" && (U = a.from(U, X)), U;
  }
  Object.defineProperty(B.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function E(R, U, X, ue, J, te) {
    if (!X) {
      var j = _(U, ue, J);
      ue !== j && (X = !0, J = "buffer", ue = j);
    }
    var K = U.objectMode ? 1 : ue.length;
    U.length += K;
    var se = U.length < U.highWaterMark;
    if (se || (U.needDrain = !0), U.writing || U.corked) {
      var q = U.lastBufferedRequest;
      U.lastBufferedRequest = {
        chunk: ue,
        encoding: J,
        isBuf: X,
        callback: te,
        next: null
      }, q ? q.next = U.lastBufferedRequest : U.bufferedRequest = U.lastBufferedRequest, U.bufferedRequestCount += 1;
    } else
      M(R, U, !1, K, ue, J, te);
    return se;
  }
  function M(R, U, X, ue, J, te, j) {
    U.writelen = ue, U.writecb = j, U.writing = !0, U.sync = !0, X ? R._writev(J, U.onwrite) : R._write(J, te, U.onwrite), U.sync = !1;
  }
  function S(R, U, X, ue, J) {
    --U.pendingcb, X ? (r.nextTick(J, ue), r.nextTick(Z, R, U), R._writableState.errorEmitted = !0, R.emit("error", ue)) : (J(ue), R._writableState.errorEmitted = !0, R.emit("error", ue), Z(R, U));
  }
  function C(R) {
    R.writing = !1, R.writecb = null, R.length -= R.writelen, R.writelen = 0;
  }
  function m(R, U) {
    var X = R._writableState, ue = X.sync, J = X.writecb;
    if (C(X), U)
      S(R, X, ue, U, J);
    else {
      var te = L(X);
      !te && !X.corked && !X.bufferProcessing && X.bufferedRequest && F(R, X), ue ? t(D, R, X, te, J) : D(R, X, te, J);
    }
  }
  function D(R, U, X, ue) {
    X || w(R, U), U.pendingcb--, ue(), Z(R, U);
  }
  function w(R, U) {
    U.length === 0 && U.needDrain && (U.needDrain = !1, R.emit("drain"));
  }
  function F(R, U) {
    U.bufferProcessing = !0;
    var X = U.bufferedRequest;
    if (R._writev && X && X.next) {
      var ue = U.bufferedRequestCount, J = new Array(ue), te = U.corkedRequestsFree;
      te.entry = X;
      for (var j = 0, K = !0; X; )
        J[j] = X, X.isBuf || (K = !1), X = X.next, j += 1;
      J.allBuffers = K, M(R, U, !0, U.length, J, "", te.finish), U.pendingcb++, U.lastBufferedRequest = null, te.next ? (U.corkedRequestsFree = te.next, te.next = null) : U.corkedRequestsFree = new e(U), U.bufferedRequestCount = 0;
    } else {
      for (; X; ) {
        var se = X.chunk, q = X.encoding, l = X.callback, p = U.objectMode ? 1 : se.length;
        if (M(R, U, !1, p, se, q, l), X = X.next, U.bufferedRequestCount--, U.writing)
          break;
      }
      X === null && (U.lastBufferedRequest = null);
    }
    U.bufferedRequest = X, U.bufferProcessing = !1;
  }
  B.prototype._write = function(R, U, X) {
    X(new Error("_write() is not implemented"));
  }, B.prototype._writev = null, B.prototype.end = function(R, U, X) {
    var ue = this._writableState;
    typeof R == "function" ? (X = R, R = null, U = null) : typeof U == "function" && (X = U, U = null), R != null && this.write(R, U), ue.corked && (ue.corked = 1, this.uncork()), ue.ending || ne(this, ue, X);
  };
  function L(R) {
    return R.ending && R.length === 0 && R.bufferedRequest === null && !R.finished && !R.writing;
  }
  function z(R, U) {
    R._final(function(X) {
      U.pendingcb--, X && R.emit("error", X), U.prefinished = !0, R.emit("prefinish"), Z(R, U);
    });
  }
  function V(R, U) {
    !U.prefinished && !U.finalCalled && (typeof R._final == "function" ? (U.pendingcb++, U.finalCalled = !0, r.nextTick(z, R, U)) : (U.prefinished = !0, R.emit("prefinish")));
  }
  function Z(R, U) {
    var X = L(U);
    return X && (V(R, U), U.pendingcb === 0 && (U.finished = !0, R.emit("finish"))), X;
  }
  function ne(R, U, X) {
    U.ending = !0, Z(R, U), X && (U.finished ? r.nextTick(X) : R.once("finish", X)), U.ended = !0, R.writable = !1;
  }
  function ie(R, U, X) {
    var ue = R.entry;
    for (R.entry = null; ue; ) {
      var J = ue.callback;
      U.pendingcb--, J(X), ue = ue.next;
    }
    U.corkedRequestsFree.next = R;
  }
  return Object.defineProperty(B.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(R) {
      this._writableState && (this._writableState.destroyed = R);
    }
  }), B.prototype.destroy = h.destroy, B.prototype._undestroy = h.undestroy, B.prototype._destroy = function(R, U) {
    this.end(), U(R);
  }, bi;
}
var wi, va;
function mr() {
  if (va)
    return wi;
  va = 1;
  var r = Nt, e = Object.keys || function(h) {
    var y = [];
    for (var T in h)
      y.push(T);
    return y;
  };
  wi = f;
  var t = Object.create(Me);
  t.inherits = Ue;
  var n = Jf(), i = Qf();
  t.inherits(f, n);
  for (var o = e(i.prototype), s = 0; s < o.length; s++) {
    var a = o[s];
    f.prototype[a] || (f.prototype[a] = i.prototype[a]);
  }
  function f(h) {
    if (!(this instanceof f))
      return new f(h);
    n.call(this, h), i.call(this, h), h && h.readable === !1 && (this.readable = !1), h && h.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, h && h.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", u);
  }
  Object.defineProperty(f.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function u() {
    this.allowHalfOpen || this._writableState.ended || r.nextTick(c, this);
  }
  function c(h) {
    h.end();
  }
  return Object.defineProperty(f.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(h) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = h, this._writableState.destroyed = h);
    }
  }), f.prototype._destroy = function(h, y) {
    this.push(null), this.end(), r.nextTick(y, h);
  }, wi;
}
var mi = {}, tn = { exports: {} }, ya;
function n_() {
  return ya || (ya = 1, function(r, e) {
    var t = et, n = t.Buffer;
    function i(s, a) {
      for (var f in s)
        a[f] = s[f];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
    function o(s, a, f) {
      return n(s, a, f);
    }
    i(n, o), o.from = function(s, a, f) {
      if (typeof s == "number")
        throw new TypeError("Argument must not be a number");
      return n(s, a, f);
    }, o.alloc = function(s, a, f) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      var u = n(s);
      return a !== void 0 ? typeof f == "string" ? u.fill(a, f) : u.fill(a) : u.fill(0), u;
    }, o.allocUnsafe = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return n(s);
    }, o.allocUnsafeSlow = function(s) {
      if (typeof s != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(s);
    };
  }(tn, tn.exports)), tn.exports;
}
var xa;
function ga() {
  if (xa)
    return mi;
  xa = 1;
  var r = n_().Buffer, e = r.isEncoding || function(d) {
    switch (d = "" + d, d && d.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function t(d) {
    if (!d)
      return "utf8";
    for (var _; ; )
      switch (d) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return d;
        default:
          if (_)
            return;
          d = ("" + d).toLowerCase(), _ = !0;
      }
  }
  function n(d) {
    var _ = t(d);
    if (typeof _ != "string" && (r.isEncoding === e || !e(d)))
      throw new Error("Unknown encoding: " + d);
    return _ || d;
  }
  mi.StringDecoder = i;
  function i(d) {
    this.encoding = n(d);
    var _;
    switch (this.encoding) {
      case "utf16le":
        this.text = h, this.end = y, _ = 4;
        break;
      case "utf8":
        this.fillLast = f, _ = 4;
        break;
      case "base64":
        this.text = T, this.end = A, _ = 3;
        break;
      default:
        this.write = B, this.end = O;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(_);
  }
  i.prototype.write = function(d) {
    if (d.length === 0)
      return "";
    var _, E;
    if (this.lastNeed) {
      if (_ = this.fillLast(d), _ === void 0)
        return "";
      E = this.lastNeed, this.lastNeed = 0;
    } else
      E = 0;
    return E < d.length ? _ ? _ + this.text(d, E) : this.text(d, E) : _ || "";
  }, i.prototype.end = c, i.prototype.text = u, i.prototype.fillLast = function(d) {
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, d.length), this.lastNeed -= d.length;
  };
  function o(d) {
    return d <= 127 ? 0 : d >> 5 === 6 ? 2 : d >> 4 === 14 ? 3 : d >> 3 === 30 ? 4 : d >> 6 === 2 ? -1 : -2;
  }
  function s(d, _, E) {
    var M = _.length - 1;
    if (M < E)
      return 0;
    var S = o(_[M]);
    return S >= 0 ? (S > 0 && (d.lastNeed = S - 1), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (d.lastNeed = S - 2), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (S === 2 ? S = 0 : d.lastNeed = S - 3), S) : 0));
  }
  function a(d, _, E) {
    if ((_[0] & 192) !== 128)
      return d.lastNeed = 0, "�";
    if (d.lastNeed > 1 && _.length > 1) {
      if ((_[1] & 192) !== 128)
        return d.lastNeed = 1, "�";
      if (d.lastNeed > 2 && _.length > 2 && (_[2] & 192) !== 128)
        return d.lastNeed = 2, "�";
    }
  }
  function f(d) {
    var _ = this.lastTotal - this.lastNeed, E = a(this, d);
    if (E !== void 0)
      return E;
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, _, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, _, 0, d.length), this.lastNeed -= d.length;
  }
  function u(d, _) {
    var E = s(this, d, _);
    if (!this.lastNeed)
      return d.toString("utf8", _);
    this.lastTotal = E;
    var M = d.length - (E - this.lastNeed);
    return d.copy(this.lastChar, 0, M), d.toString("utf8", _, M);
  }
  function c(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + "�" : _;
  }
  function h(d, _) {
    if ((d.length - _) % 2 === 0) {
      var E = d.toString("utf16le", _);
      if (E) {
        var M = E.charCodeAt(E.length - 1);
        if (M >= 55296 && M <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1], E.slice(0, -1);
      }
      return E;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = d[d.length - 1], d.toString("utf16le", _, d.length - 1);
  }
  function y(d) {
    var _ = d && d.length ? this.write(d) : "";
    if (this.lastNeed) {
      var E = this.lastTotal - this.lastNeed;
      return _ + this.lastChar.toString("utf16le", 0, E);
    }
    return _;
  }
  function T(d, _) {
    var E = (d.length - _) % 3;
    return E === 0 ? d.toString("base64", _) : (this.lastNeed = 3 - E, this.lastTotal = 3, E === 1 ? this.lastChar[0] = d[d.length - 1] : (this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1]), d.toString("base64", _, d.length - E));
  }
  function A(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : _;
  }
  function B(d) {
    return d.toString(this.encoding);
  }
  function O(d) {
    return d && d.length ? this.write(d) : "";
  }
  return mi;
}
var Ei, ba;
function Jf() {
  if (ba)
    return Ei;
  ba = 1;
  var r = Nt;
  Ei = _;
  var e = Kf, t;
  _.ReadableState = d, Ne.EventEmitter;
  var n = function(l, p) {
    return l.listeners(p).length;
  }, i = Vf, o = is.Buffer, s = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(l) {
    return o.from(l);
  }
  function f(l) {
    return o.isBuffer(l) || l instanceof s;
  }
  var u = Object.create(Me);
  u.inherits = Ue;
  var c = Ne, h = void 0;
  c && c.debuglog ? h = c.debuglog("stream") : h = function() {
  };
  var y = e_(), T = Gf, A;
  u.inherits(_, i);
  var B = ["error", "close", "destroy", "pause", "resume"];
  function O(l, p, $) {
    if (typeof l.prependListener == "function")
      return l.prependListener(p, $);
    !l._events || !l._events[p] ? l.on(p, $) : e(l._events[p]) ? l._events[p].unshift($) : l._events[p] = [$, l._events[p]];
  }
  function d(l, p) {
    t = t || mr(), l = l || {};
    var $ = p instanceof t;
    this.objectMode = !!l.objectMode, $ && (this.objectMode = this.objectMode || !!l.readableObjectMode);
    var G = l.highWaterMark, P = l.readableHighWaterMark, N = this.objectMode ? 16 : 16 * 1024;
    G || G === 0 ? this.highWaterMark = G : $ && (P || P === 0) ? this.highWaterMark = P : this.highWaterMark = N, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new y(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = l.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, l.encoding && (A || (A = ga().StringDecoder), this.decoder = new A(l.encoding), this.encoding = l.encoding);
  }
  function _(l) {
    if (t = t || mr(), !(this instanceof _))
      return new _(l);
    this._readableState = new d(l, this), this.readable = !0, l && (typeof l.read == "function" && (this._read = l.read), typeof l.destroy == "function" && (this._destroy = l.destroy)), i.call(this);
  }
  Object.defineProperty(_.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(l) {
      this._readableState && (this._readableState.destroyed = l);
    }
  }), _.prototype.destroy = T.destroy, _.prototype._undestroy = T.undestroy, _.prototype._destroy = function(l, p) {
    this.push(null), p(l);
  }, _.prototype.push = function(l, p) {
    var $ = this._readableState, G;
    return $.objectMode ? G = !0 : typeof l == "string" && (p = p || $.defaultEncoding, p !== $.encoding && (l = o.from(l, p), p = ""), G = !0), E(this, l, p, !1, G);
  }, _.prototype.unshift = function(l) {
    return E(this, l, null, !0, !1);
  };
  function E(l, p, $, G, P) {
    var N = l._readableState;
    if (p === null)
      N.reading = !1, F(l, N);
    else {
      var Y;
      P || (Y = S(N, p)), Y ? l.emit("error", Y) : N.objectMode || p && p.length > 0 ? (typeof p != "string" && !N.objectMode && Object.getPrototypeOf(p) !== o.prototype && (p = a(p)), G ? N.endEmitted ? l.emit("error", new Error("stream.unshift() after end event")) : M(l, N, p, !0) : N.ended ? l.emit("error", new Error("stream.push() after EOF")) : (N.reading = !1, N.decoder && !$ ? (p = N.decoder.write(p), N.objectMode || p.length !== 0 ? M(l, N, p, !1) : V(l, N)) : M(l, N, p, !1))) : G || (N.reading = !1);
    }
    return C(N);
  }
  function M(l, p, $, G) {
    p.flowing && p.length === 0 && !p.sync ? (l.emit("data", $), l.read(0)) : (p.length += p.objectMode ? 1 : $.length, G ? p.buffer.unshift($) : p.buffer.push($), p.needReadable && L(l)), V(l, p);
  }
  function S(l, p) {
    var $;
    return !f(p) && typeof p != "string" && p !== void 0 && !l.objectMode && ($ = new TypeError("Invalid non-string/buffer chunk")), $;
  }
  function C(l) {
    return !l.ended && (l.needReadable || l.length < l.highWaterMark || l.length === 0);
  }
  _.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, _.prototype.setEncoding = function(l) {
    return A || (A = ga().StringDecoder), this._readableState.decoder = new A(l), this._readableState.encoding = l, this;
  };
  var m = 8388608;
  function D(l) {
    return l >= m ? l = m : (l--, l |= l >>> 1, l |= l >>> 2, l |= l >>> 4, l |= l >>> 8, l |= l >>> 16, l++), l;
  }
  function w(l, p) {
    return l <= 0 || p.length === 0 && p.ended ? 0 : p.objectMode ? 1 : l !== l ? p.flowing && p.length ? p.buffer.head.data.length : p.length : (l > p.highWaterMark && (p.highWaterMark = D(l)), l <= p.length ? l : p.ended ? p.length : (p.needReadable = !0, 0));
  }
  _.prototype.read = function(l) {
    h("read", l), l = parseInt(l, 10);
    var p = this._readableState, $ = l;
    if (l !== 0 && (p.emittedReadable = !1), l === 0 && p.needReadable && (p.length >= p.highWaterMark || p.ended))
      return h("read: emitReadable", p.length, p.ended), p.length === 0 && p.ended ? K(this) : L(this), null;
    if (l = w(l, p), l === 0 && p.ended)
      return p.length === 0 && K(this), null;
    var G = p.needReadable;
    h("need readable", G), (p.length === 0 || p.length - l < p.highWaterMark) && (G = !0, h("length less than watermark", G)), p.ended || p.reading ? (G = !1, h("reading or ended", G)) : G && (h("do read"), p.reading = !0, p.sync = !0, p.length === 0 && (p.needReadable = !0), this._read(p.highWaterMark), p.sync = !1, p.reading || (l = w($, p)));
    var P;
    return l > 0 ? P = ue(l, p) : P = null, P === null ? (p.needReadable = !0, l = 0) : p.length -= l, p.length === 0 && (p.ended || (p.needReadable = !0), $ !== l && p.ended && K(this)), P !== null && this.emit("data", P), P;
  };
  function F(l, p) {
    if (!p.ended) {
      if (p.decoder) {
        var $ = p.decoder.end();
        $ && $.length && (p.buffer.push($), p.length += p.objectMode ? 1 : $.length);
      }
      p.ended = !0, L(l);
    }
  }
  function L(l) {
    var p = l._readableState;
    p.needReadable = !1, p.emittedReadable || (h("emitReadable", p.flowing), p.emittedReadable = !0, p.sync ? r.nextTick(z, l) : z(l));
  }
  function z(l) {
    h("emit readable"), l.emit("readable"), X(l);
  }
  function V(l, p) {
    p.readingMore || (p.readingMore = !0, r.nextTick(Z, l, p));
  }
  function Z(l, p) {
    for (var $ = p.length; !p.reading && !p.flowing && !p.ended && p.length < p.highWaterMark && (h("maybeReadMore read 0"), l.read(0), $ !== p.length); )
      $ = p.length;
    p.readingMore = !1;
  }
  _.prototype._read = function(l) {
    this.emit("error", new Error("_read() is not implemented"));
  }, _.prototype.pipe = function(l, p) {
    var $ = this, G = this._readableState;
    switch (G.pipesCount) {
      case 0:
        G.pipes = l;
        break;
      case 1:
        G.pipes = [G.pipes, l];
        break;
      default:
        G.pipes.push(l);
        break;
    }
    G.pipesCount += 1, h("pipe count=%d opts=%j", G.pipesCount, p);
    var P = (!p || p.end !== !1) && l !== process.stdout && l !== process.stderr, N = P ? he : pe;
    G.endEmitted ? r.nextTick(N) : $.once("end", N), l.on("unpipe", Y);
    function Y(ve, ye) {
      h("onunpipe"), ve === $ && ye && ye.hasUnpiped === !1 && (ye.hasUnpiped = !0, x());
    }
    function he() {
      h("onend"), l.end();
    }
    var _e = ne($);
    l.on("drain", _e);
    var k = !1;
    function x() {
      h("cleanup"), l.removeListener("close", fe), l.removeListener("finish", ae), l.removeListener("drain", _e), l.removeListener("error", ee), l.removeListener("unpipe", Y), $.removeListener("end", he), $.removeListener("end", pe), $.removeListener("data", H), k = !0, G.awaitDrain && (!l._writableState || l._writableState.needDrain) && _e();
    }
    var b = !1;
    $.on("data", H);
    function H(ve) {
      h("ondata"), b = !1;
      var ye = l.write(ve);
      ye === !1 && !b && ((G.pipesCount === 1 && G.pipes === l || G.pipesCount > 1 && q(G.pipes, l) !== -1) && !k && (h("false write response, pause", G.awaitDrain), G.awaitDrain++, b = !0), $.pause());
    }
    function ee(ve) {
      h("onerror", ve), pe(), l.removeListener("error", ee), n(l, "error") === 0 && l.emit("error", ve);
    }
    O(l, "error", ee);
    function fe() {
      l.removeListener("finish", ae), pe();
    }
    l.once("close", fe);
    function ae() {
      h("onfinish"), l.removeListener("close", fe), pe();
    }
    l.once("finish", ae);
    function pe() {
      h("unpipe"), $.unpipe(l);
    }
    return l.emit("pipe", $), G.flowing || (h("pipe resume"), $.resume()), l;
  };
  function ne(l) {
    return function() {
      var p = l._readableState;
      h("pipeOnDrain", p.awaitDrain), p.awaitDrain && p.awaitDrain--, p.awaitDrain === 0 && n(l, "data") && (p.flowing = !0, X(l));
    };
  }
  _.prototype.unpipe = function(l) {
    var p = this._readableState, $ = { hasUnpiped: !1 };
    if (p.pipesCount === 0)
      return this;
    if (p.pipesCount === 1)
      return l && l !== p.pipes ? this : (l || (l = p.pipes), p.pipes = null, p.pipesCount = 0, p.flowing = !1, l && l.emit("unpipe", this, $), this);
    if (!l) {
      var G = p.pipes, P = p.pipesCount;
      p.pipes = null, p.pipesCount = 0, p.flowing = !1;
      for (var N = 0; N < P; N++)
        G[N].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Y = q(p.pipes, l);
    return Y === -1 ? this : (p.pipes.splice(Y, 1), p.pipesCount -= 1, p.pipesCount === 1 && (p.pipes = p.pipes[0]), l.emit("unpipe", this, $), this);
  }, _.prototype.on = function(l, p) {
    var $ = i.prototype.on.call(this, l, p);
    if (l === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (l === "readable") {
      var G = this._readableState;
      !G.endEmitted && !G.readableListening && (G.readableListening = G.needReadable = !0, G.emittedReadable = !1, G.reading ? G.length && L(this) : r.nextTick(ie, this));
    }
    return $;
  }, _.prototype.addListener = _.prototype.on;
  function ie(l) {
    h("readable nexttick read 0"), l.read(0);
  }
  _.prototype.resume = function() {
    var l = this._readableState;
    return l.flowing || (h("resume"), l.flowing = !0, R(this, l)), this;
  };
  function R(l, p) {
    p.resumeScheduled || (p.resumeScheduled = !0, r.nextTick(U, l, p));
  }
  function U(l, p) {
    p.reading || (h("resume read 0"), l.read(0)), p.resumeScheduled = !1, p.awaitDrain = 0, l.emit("resume"), X(l), p.flowing && !p.reading && l.read(0);
  }
  _.prototype.pause = function() {
    return h("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function X(l) {
    var p = l._readableState;
    for (h("flow", p.flowing); p.flowing && l.read() !== null; )
      ;
  }
  _.prototype.wrap = function(l) {
    var p = this, $ = this._readableState, G = !1;
    l.on("end", function() {
      if (h("wrapped end"), $.decoder && !$.ended) {
        var Y = $.decoder.end();
        Y && Y.length && p.push(Y);
      }
      p.push(null);
    }), l.on("data", function(Y) {
      if (h("wrapped data"), $.decoder && (Y = $.decoder.write(Y)), !($.objectMode && Y == null) && !(!$.objectMode && (!Y || !Y.length))) {
        var he = p.push(Y);
        he || (G = !0, l.pause());
      }
    });
    for (var P in l)
      this[P] === void 0 && typeof l[P] == "function" && (this[P] = /* @__PURE__ */ function(Y) {
        return function() {
          return l[Y].apply(l, arguments);
        };
      }(P));
    for (var N = 0; N < B.length; N++)
      l.on(B[N], this.emit.bind(this, B[N]));
    return this._read = function(Y) {
      h("wrapped _read", Y), G && (G = !1, l.resume());
    }, this;
  }, Object.defineProperty(_.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), _._fromList = ue;
  function ue(l, p) {
    if (p.length === 0)
      return null;
    var $;
    return p.objectMode ? $ = p.buffer.shift() : !l || l >= p.length ? (p.decoder ? $ = p.buffer.join("") : p.buffer.length === 1 ? $ = p.buffer.head.data : $ = p.buffer.concat(p.length), p.buffer.clear()) : $ = J(l, p.buffer, p.decoder), $;
  }
  function J(l, p, $) {
    var G;
    return l < p.head.data.length ? (G = p.head.data.slice(0, l), p.head.data = p.head.data.slice(l)) : l === p.head.data.length ? G = p.shift() : G = $ ? te(l, p) : j(l, p), G;
  }
  function te(l, p) {
    var $ = p.head, G = 1, P = $.data;
    for (l -= P.length; $ = $.next; ) {
      var N = $.data, Y = l > N.length ? N.length : l;
      if (Y === N.length ? P += N : P += N.slice(0, l), l -= Y, l === 0) {
        Y === N.length ? (++G, $.next ? p.head = $.next : p.head = p.tail = null) : (p.head = $, $.data = N.slice(Y));
        break;
      }
      ++G;
    }
    return p.length -= G, P;
  }
  function j(l, p) {
    var $ = o.allocUnsafe(l), G = p.head, P = 1;
    for (G.data.copy($), l -= G.data.length; G = G.next; ) {
      var N = G.data, Y = l > N.length ? N.length : l;
      if (N.copy($, $.length - l, 0, Y), l -= Y, l === 0) {
        Y === N.length ? (++P, G.next ? p.head = G.next : p.head = p.tail = null) : (p.head = G, G.data = N.slice(Y));
        break;
      }
      ++P;
    }
    return p.length -= P, $;
  }
  function K(l) {
    var p = l._readableState;
    if (p.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    p.endEmitted || (p.ended = !0, r.nextTick(se, p, l));
  }
  function se(l, p) {
    !l.endEmitted && l.length === 0 && (l.endEmitted = !0, p.readable = !1, p.emit("end"));
  }
  function q(l, p) {
    for (var $ = 0, G = l.length; $ < G; $++)
      if (l[$] === p)
        return $;
    return -1;
  }
  return Ei;
}
var Xf = Ft, Nn = mr(), Yf = Object.create(Me);
Yf.inherits = Ue;
Yf.inherits(Ft, Nn);
function i_(r, e) {
  var t = this._transformState;
  t.transforming = !1;
  var n = t.writecb;
  if (!n)
    return this.emit("error", new Error("write callback called multiple times"));
  t.writechunk = null, t.writecb = null, e != null && this.push(e), n(r);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function Ft(r) {
  if (!(this instanceof Ft))
    return new Ft(r);
  Nn.call(this, r), this._transformState = {
    afterTransform: i_.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, r && (typeof r.transform == "function" && (this._transform = r.transform), typeof r.flush == "function" && (this._flush = r.flush)), this.on("prefinish", o_);
}
function o_() {
  var r = this;
  typeof this._flush == "function" ? this._flush(function(e, t) {
    wa(r, e, t);
  }) : wa(this, null, null);
}
Ft.prototype.push = function(r, e) {
  return this._transformState.needTransform = !1, Nn.prototype.push.call(this, r, e);
};
Ft.prototype._transform = function(r, e, t) {
  throw new Error("_transform() is not implemented");
};
Ft.prototype._write = function(r, e, t) {
  var n = this._transformState;
  if (n.writecb = t, n.writechunk = r, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
Ft.prototype._read = function(r) {
  var e = this._transformState;
  e.writechunk !== null && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
Ft.prototype._destroy = function(r, e) {
  var t = this;
  Nn.prototype._destroy.call(this, r, function(n) {
    e(n), t.emit("close");
  });
};
function wa(r, e, t) {
  if (e)
    return r.emit("error", e);
  if (t != null && r.push(t), r._writableState.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (r._transformState.transforming)
    throw new Error("Calling transform done when still transforming");
  return r.push(null);
}
var s_ = qr, Zf = Xf, ec = Object.create(Me);
ec.inherits = Ue;
ec.inherits(qr, Zf);
function qr(r) {
  if (!(this instanceof qr))
    return new qr(r);
  Zf.call(this, r);
}
qr.prototype._transform = function(r, e, t) {
  t(null, r);
};
(function(r, e) {
  e = r.exports = Jf(), e.Stream = e, e.Readable = e, e.Writable = Qf(), e.Duplex = mr(), e.Transform = Xf, e.PassThrough = s_;
})(Fo, Fo.exports);
var a_ = Fo.exports, Mo = { exports: {} }, tc = Ne.EventEmitter, Io = { exports: {} };
(function(r, e) {
  var t = et, n = t.Buffer;
  function i(s, a) {
    for (var f in s)
      a[f] = s[f];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
  function o(s, a, f) {
    return n(s, a, f);
  }
  i(n, o), o.from = function(s, a, f) {
    if (typeof s == "number")
      throw new TypeError("Argument must not be a number");
    return n(s, a, f);
  }, o.alloc = function(s, a, f) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    var u = n(s);
    return a !== void 0 ? typeof f == "string" ? u.fill(a, f) : u.fill(a) : u.fill(0), u;
  }, o.allocUnsafe = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return n(s);
  }, o.allocUnsafeSlow = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return t.SlowBuffer(s);
  };
})(Io, Io.exports);
var Rn = Io.exports, Si = { exports: {} }, ma;
function u_() {
  return ma || (ma = 1, function(r) {
    function e(o, s) {
      if (!(o instanceof s))
        throw new TypeError("Cannot call a class as a function");
    }
    var t = Rn.Buffer, n = Ne;
    function i(o, s, a) {
      o.copy(s, a);
    }
    r.exports = function() {
      function o() {
        e(this, o), this.head = null, this.tail = null, this.length = 0;
      }
      return o.prototype.push = function(a) {
        var f = { data: a, next: null };
        this.length > 0 ? this.tail.next = f : this.head = f, this.tail = f, ++this.length;
      }, o.prototype.unshift = function(a) {
        var f = { data: a, next: this.head };
        this.length === 0 && (this.tail = f), this.head = f, ++this.length;
      }, o.prototype.shift = function() {
        if (this.length !== 0) {
          var a = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, a;
        }
      }, o.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, o.prototype.join = function(a) {
        if (this.length === 0)
          return "";
        for (var f = this.head, u = "" + f.data; f = f.next; )
          u += a + f.data;
        return u;
      }, o.prototype.concat = function(a) {
        if (this.length === 0)
          return t.alloc(0);
        for (var f = t.allocUnsafe(a >>> 0), u = this.head, c = 0; u; )
          i(u.data, f, c), c += u.data.length, u = u.next;
        return f;
      }, o;
    }(), n && n.inspect && n.inspect.custom && (r.exports.prototype[n.inspect.custom] = function() {
      var o = n.inspect({ length: this.length });
      return this.constructor.name + " " + o;
    });
  }(Si)), Si.exports;
}
var rn = Nt;
function f_(r, e) {
  var t = this, n = this._readableState && this._readableState.destroyed, i = this._writableState && this._writableState.destroyed;
  return n || i ? (e ? e(r) : r && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, rn.nextTick(nn, this, r)) : rn.nextTick(nn, this, r)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(r || null, function(o) {
    !e && o ? t._writableState ? t._writableState.errorEmitted || (t._writableState.errorEmitted = !0, rn.nextTick(nn, t, o)) : rn.nextTick(nn, t, o) : e && e(o);
  }), this);
}
function c_() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function nn(r, e) {
  r.emit("error", e);
}
var rc = {
  destroy: f_,
  undestroy: c_
}, Ai, Ea;
function nc() {
  if (Ea)
    return Ai;
  Ea = 1;
  var r = Nt;
  Ai = B;
  function e(R) {
    var U = this;
    this.next = null, this.entry = null, this.finish = function() {
      ie(U, R);
    };
  }
  var t = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : r.nextTick, n;
  B.WritableState = T;
  var i = Object.create(Me);
  i.inherits = Ue;
  var o = {
    deprecate: Qo
  }, s = tc, a = Rn.Buffer, f = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function u(R) {
    return a.from(R);
  }
  function c(R) {
    return a.isBuffer(R) || R instanceof f;
  }
  var h = rc;
  i.inherits(B, s);
  function y() {
  }
  function T(R, U) {
    n = n || Er(), R = R || {};
    var X = U instanceof n;
    this.objectMode = !!R.objectMode, X && (this.objectMode = this.objectMode || !!R.writableObjectMode);
    var ue = R.highWaterMark, J = R.writableHighWaterMark, te = this.objectMode ? 16 : 16 * 1024;
    ue || ue === 0 ? this.highWaterMark = ue : X && (J || J === 0) ? this.highWaterMark = J : this.highWaterMark = te, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var j = R.decodeStrings === !1;
    this.decodeStrings = !j, this.defaultEncoding = R.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(K) {
      m(U, K);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new e(this);
  }
  T.prototype.getBuffer = function() {
    for (var U = this.bufferedRequest, X = []; U; )
      X.push(U), U = U.next;
    return X;
  }, function() {
    try {
      Object.defineProperty(T.prototype, "buffer", {
        get: o.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var A;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (A = Function.prototype[Symbol.hasInstance], Object.defineProperty(B, Symbol.hasInstance, {
    value: function(R) {
      return A.call(this, R) ? !0 : this !== B ? !1 : R && R._writableState instanceof T;
    }
  })) : A = function(R) {
    return R instanceof this;
  };
  function B(R) {
    if (n = n || Er(), !A.call(B, this) && !(this instanceof n))
      return new B(R);
    this._writableState = new T(R, this), this.writable = !0, R && (typeof R.write == "function" && (this._write = R.write), typeof R.writev == "function" && (this._writev = R.writev), typeof R.destroy == "function" && (this._destroy = R.destroy), typeof R.final == "function" && (this._final = R.final)), s.call(this);
  }
  B.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function O(R, U) {
    var X = new Error("write after end");
    R.emit("error", X), r.nextTick(U, X);
  }
  function d(R, U, X, ue) {
    var J = !0, te = !1;
    return X === null ? te = new TypeError("May not write null values to stream") : typeof X != "string" && X !== void 0 && !U.objectMode && (te = new TypeError("Invalid non-string/buffer chunk")), te && (R.emit("error", te), r.nextTick(ue, te), J = !1), J;
  }
  B.prototype.write = function(R, U, X) {
    var ue = this._writableState, J = !1, te = !ue.objectMode && c(R);
    return te && !a.isBuffer(R) && (R = u(R)), typeof U == "function" && (X = U, U = null), te ? U = "buffer" : U || (U = ue.defaultEncoding), typeof X != "function" && (X = y), ue.ended ? O(this, X) : (te || d(this, ue, R, X)) && (ue.pendingcb++, J = E(this, ue, te, R, U, X)), J;
  }, B.prototype.cork = function() {
    var R = this._writableState;
    R.corked++;
  }, B.prototype.uncork = function() {
    var R = this._writableState;
    R.corked && (R.corked--, !R.writing && !R.corked && !R.bufferProcessing && R.bufferedRequest && F(this, R));
  }, B.prototype.setDefaultEncoding = function(U) {
    if (typeof U == "string" && (U = U.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((U + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + U);
    return this._writableState.defaultEncoding = U, this;
  };
  function _(R, U, X) {
    return !R.objectMode && R.decodeStrings !== !1 && typeof U == "string" && (U = a.from(U, X)), U;
  }
  Object.defineProperty(B.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function E(R, U, X, ue, J, te) {
    if (!X) {
      var j = _(U, ue, J);
      ue !== j && (X = !0, J = "buffer", ue = j);
    }
    var K = U.objectMode ? 1 : ue.length;
    U.length += K;
    var se = U.length < U.highWaterMark;
    if (se || (U.needDrain = !0), U.writing || U.corked) {
      var q = U.lastBufferedRequest;
      U.lastBufferedRequest = {
        chunk: ue,
        encoding: J,
        isBuf: X,
        callback: te,
        next: null
      }, q ? q.next = U.lastBufferedRequest : U.bufferedRequest = U.lastBufferedRequest, U.bufferedRequestCount += 1;
    } else
      M(R, U, !1, K, ue, J, te);
    return se;
  }
  function M(R, U, X, ue, J, te, j) {
    U.writelen = ue, U.writecb = j, U.writing = !0, U.sync = !0, X ? R._writev(J, U.onwrite) : R._write(J, te, U.onwrite), U.sync = !1;
  }
  function S(R, U, X, ue, J) {
    --U.pendingcb, X ? (r.nextTick(J, ue), r.nextTick(Z, R, U), R._writableState.errorEmitted = !0, R.emit("error", ue)) : (J(ue), R._writableState.errorEmitted = !0, R.emit("error", ue), Z(R, U));
  }
  function C(R) {
    R.writing = !1, R.writecb = null, R.length -= R.writelen, R.writelen = 0;
  }
  function m(R, U) {
    var X = R._writableState, ue = X.sync, J = X.writecb;
    if (C(X), U)
      S(R, X, ue, U, J);
    else {
      var te = L(X);
      !te && !X.corked && !X.bufferProcessing && X.bufferedRequest && F(R, X), ue ? t(D, R, X, te, J) : D(R, X, te, J);
    }
  }
  function D(R, U, X, ue) {
    X || w(R, U), U.pendingcb--, ue(), Z(R, U);
  }
  function w(R, U) {
    U.length === 0 && U.needDrain && (U.needDrain = !1, R.emit("drain"));
  }
  function F(R, U) {
    U.bufferProcessing = !0;
    var X = U.bufferedRequest;
    if (R._writev && X && X.next) {
      var ue = U.bufferedRequestCount, J = new Array(ue), te = U.corkedRequestsFree;
      te.entry = X;
      for (var j = 0, K = !0; X; )
        J[j] = X, X.isBuf || (K = !1), X = X.next, j += 1;
      J.allBuffers = K, M(R, U, !0, U.length, J, "", te.finish), U.pendingcb++, U.lastBufferedRequest = null, te.next ? (U.corkedRequestsFree = te.next, te.next = null) : U.corkedRequestsFree = new e(U), U.bufferedRequestCount = 0;
    } else {
      for (; X; ) {
        var se = X.chunk, q = X.encoding, l = X.callback, p = U.objectMode ? 1 : se.length;
        if (M(R, U, !1, p, se, q, l), X = X.next, U.bufferedRequestCount--, U.writing)
          break;
      }
      X === null && (U.lastBufferedRequest = null);
    }
    U.bufferedRequest = X, U.bufferProcessing = !1;
  }
  B.prototype._write = function(R, U, X) {
    X(new Error("_write() is not implemented"));
  }, B.prototype._writev = null, B.prototype.end = function(R, U, X) {
    var ue = this._writableState;
    typeof R == "function" ? (X = R, R = null, U = null) : typeof U == "function" && (X = U, U = null), R != null && this.write(R, U), ue.corked && (ue.corked = 1, this.uncork()), ue.ending || ne(this, ue, X);
  };
  function L(R) {
    return R.ending && R.length === 0 && R.bufferedRequest === null && !R.finished && !R.writing;
  }
  function z(R, U) {
    R._final(function(X) {
      U.pendingcb--, X && R.emit("error", X), U.prefinished = !0, R.emit("prefinish"), Z(R, U);
    });
  }
  function V(R, U) {
    !U.prefinished && !U.finalCalled && (typeof R._final == "function" ? (U.pendingcb++, U.finalCalled = !0, r.nextTick(z, R, U)) : (U.prefinished = !0, R.emit("prefinish")));
  }
  function Z(R, U) {
    var X = L(U);
    return X && (V(R, U), U.pendingcb === 0 && (U.finished = !0, R.emit("finish"))), X;
  }
  function ne(R, U, X) {
    U.ending = !0, Z(R, U), X && (U.finished ? r.nextTick(X) : R.once("finish", X)), U.ended = !0, R.writable = !1;
  }
  function ie(R, U, X) {
    var ue = R.entry;
    for (R.entry = null; ue; ) {
      var J = ue.callback;
      U.pendingcb--, J(X), ue = ue.next;
    }
    U.corkedRequestsFree.next = R;
  }
  return Object.defineProperty(B.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(R) {
      this._writableState && (this._writableState.destroyed = R);
    }
  }), B.prototype.destroy = h.destroy, B.prototype._undestroy = h.undestroy, B.prototype._destroy = function(R, U) {
    this.end(), U(R);
  }, Ai;
}
var Bi, Sa;
function Er() {
  if (Sa)
    return Bi;
  Sa = 1;
  var r = Nt, e = Object.keys || function(h) {
    var y = [];
    for (var T in h)
      y.push(T);
    return y;
  };
  Bi = f;
  var t = Object.create(Me);
  t.inherits = Ue;
  var n = ic(), i = nc();
  t.inherits(f, n);
  for (var o = e(i.prototype), s = 0; s < o.length; s++) {
    var a = o[s];
    f.prototype[a] || (f.prototype[a] = i.prototype[a]);
  }
  function f(h) {
    if (!(this instanceof f))
      return new f(h);
    n.call(this, h), i.call(this, h), h && h.readable === !1 && (this.readable = !1), h && h.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, h && h.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", u);
  }
  Object.defineProperty(f.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function u() {
    this.allowHalfOpen || this._writableState.ended || r.nextTick(c, this);
  }
  function c(h) {
    h.end();
  }
  return Object.defineProperty(f.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(h) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = h, this._writableState.destroyed = h);
    }
  }), f.prototype._destroy = function(h, y) {
    this.push(null), this.end(), r.nextTick(y, h);
  }, Bi;
}
var Ci = {}, Aa;
function Ba() {
  if (Aa)
    return Ci;
  Aa = 1;
  var r = Rn.Buffer, e = r.isEncoding || function(d) {
    switch (d = "" + d, d && d.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function t(d) {
    if (!d)
      return "utf8";
    for (var _; ; )
      switch (d) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return d;
        default:
          if (_)
            return;
          d = ("" + d).toLowerCase(), _ = !0;
      }
  }
  function n(d) {
    var _ = t(d);
    if (typeof _ != "string" && (r.isEncoding === e || !e(d)))
      throw new Error("Unknown encoding: " + d);
    return _ || d;
  }
  Ci.StringDecoder = i;
  function i(d) {
    this.encoding = n(d);
    var _;
    switch (this.encoding) {
      case "utf16le":
        this.text = h, this.end = y, _ = 4;
        break;
      case "utf8":
        this.fillLast = f, _ = 4;
        break;
      case "base64":
        this.text = T, this.end = A, _ = 3;
        break;
      default:
        this.write = B, this.end = O;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(_);
  }
  i.prototype.write = function(d) {
    if (d.length === 0)
      return "";
    var _, E;
    if (this.lastNeed) {
      if (_ = this.fillLast(d), _ === void 0)
        return "";
      E = this.lastNeed, this.lastNeed = 0;
    } else
      E = 0;
    return E < d.length ? _ ? _ + this.text(d, E) : this.text(d, E) : _ || "";
  }, i.prototype.end = c, i.prototype.text = u, i.prototype.fillLast = function(d) {
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, d.length), this.lastNeed -= d.length;
  };
  function o(d) {
    return d <= 127 ? 0 : d >> 5 === 6 ? 2 : d >> 4 === 14 ? 3 : d >> 3 === 30 ? 4 : d >> 6 === 2 ? -1 : -2;
  }
  function s(d, _, E) {
    var M = _.length - 1;
    if (M < E)
      return 0;
    var S = o(_[M]);
    return S >= 0 ? (S > 0 && (d.lastNeed = S - 1), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (d.lastNeed = S - 2), S) : --M < E || S === -2 ? 0 : (S = o(_[M]), S >= 0 ? (S > 0 && (S === 2 ? S = 0 : d.lastNeed = S - 3), S) : 0));
  }
  function a(d, _, E) {
    if ((_[0] & 192) !== 128)
      return d.lastNeed = 0, "�";
    if (d.lastNeed > 1 && _.length > 1) {
      if ((_[1] & 192) !== 128)
        return d.lastNeed = 1, "�";
      if (d.lastNeed > 2 && _.length > 2 && (_[2] & 192) !== 128)
        return d.lastNeed = 2, "�";
    }
  }
  function f(d) {
    var _ = this.lastTotal - this.lastNeed, E = a(this, d);
    if (E !== void 0)
      return E;
    if (this.lastNeed <= d.length)
      return d.copy(this.lastChar, _, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    d.copy(this.lastChar, _, 0, d.length), this.lastNeed -= d.length;
  }
  function u(d, _) {
    var E = s(this, d, _);
    if (!this.lastNeed)
      return d.toString("utf8", _);
    this.lastTotal = E;
    var M = d.length - (E - this.lastNeed);
    return d.copy(this.lastChar, 0, M), d.toString("utf8", _, M);
  }
  function c(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + "�" : _;
  }
  function h(d, _) {
    if ((d.length - _) % 2 === 0) {
      var E = d.toString("utf16le", _);
      if (E) {
        var M = E.charCodeAt(E.length - 1);
        if (M >= 55296 && M <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1], E.slice(0, -1);
      }
      return E;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = d[d.length - 1], d.toString("utf16le", _, d.length - 1);
  }
  function y(d) {
    var _ = d && d.length ? this.write(d) : "";
    if (this.lastNeed) {
      var E = this.lastTotal - this.lastNeed;
      return _ + this.lastChar.toString("utf16le", 0, E);
    }
    return _;
  }
  function T(d, _) {
    var E = (d.length - _) % 3;
    return E === 0 ? d.toString("base64", _) : (this.lastNeed = 3 - E, this.lastTotal = 3, E === 1 ? this.lastChar[0] = d[d.length - 1] : (this.lastChar[0] = d[d.length - 2], this.lastChar[1] = d[d.length - 1]), d.toString("base64", _, d.length - E));
  }
  function A(d) {
    var _ = d && d.length ? this.write(d) : "";
    return this.lastNeed ? _ + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : _;
  }
  function B(d) {
    return d.toString(this.encoding);
  }
  function O(d) {
    return d && d.length ? this.write(d) : "";
  }
  return Ci;
}
var Ti, Ca;
function ic() {
  if (Ca)
    return Ti;
  Ca = 1;
  var r = Nt;
  Ti = _;
  var e = Kf, t;
  _.ReadableState = d, Ne.EventEmitter;
  var n = function(l, p) {
    return l.listeners(p).length;
  }, i = tc, o = Rn.Buffer, s = (typeof Q < "u" ? Q : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(l) {
    return o.from(l);
  }
  function f(l) {
    return o.isBuffer(l) || l instanceof s;
  }
  var u = Object.create(Me);
  u.inherits = Ue;
  var c = Ne, h = void 0;
  c && c.debuglog ? h = c.debuglog("stream") : h = function() {
  };
  var y = u_(), T = rc, A;
  u.inherits(_, i);
  var B = ["error", "close", "destroy", "pause", "resume"];
  function O(l, p, $) {
    if (typeof l.prependListener == "function")
      return l.prependListener(p, $);
    !l._events || !l._events[p] ? l.on(p, $) : e(l._events[p]) ? l._events[p].unshift($) : l._events[p] = [$, l._events[p]];
  }
  function d(l, p) {
    t = t || Er(), l = l || {};
    var $ = p instanceof t;
    this.objectMode = !!l.objectMode, $ && (this.objectMode = this.objectMode || !!l.readableObjectMode);
    var G = l.highWaterMark, P = l.readableHighWaterMark, N = this.objectMode ? 16 : 16 * 1024;
    G || G === 0 ? this.highWaterMark = G : $ && (P || P === 0) ? this.highWaterMark = P : this.highWaterMark = N, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new y(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = l.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, l.encoding && (A || (A = Ba().StringDecoder), this.decoder = new A(l.encoding), this.encoding = l.encoding);
  }
  function _(l) {
    if (t = t || Er(), !(this instanceof _))
      return new _(l);
    this._readableState = new d(l, this), this.readable = !0, l && (typeof l.read == "function" && (this._read = l.read), typeof l.destroy == "function" && (this._destroy = l.destroy)), i.call(this);
  }
  Object.defineProperty(_.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(l) {
      this._readableState && (this._readableState.destroyed = l);
    }
  }), _.prototype.destroy = T.destroy, _.prototype._undestroy = T.undestroy, _.prototype._destroy = function(l, p) {
    this.push(null), p(l);
  }, _.prototype.push = function(l, p) {
    var $ = this._readableState, G;
    return $.objectMode ? G = !0 : typeof l == "string" && (p = p || $.defaultEncoding, p !== $.encoding && (l = o.from(l, p), p = ""), G = !0), E(this, l, p, !1, G);
  }, _.prototype.unshift = function(l) {
    return E(this, l, null, !0, !1);
  };
  function E(l, p, $, G, P) {
    var N = l._readableState;
    if (p === null)
      N.reading = !1, F(l, N);
    else {
      var Y;
      P || (Y = S(N, p)), Y ? l.emit("error", Y) : N.objectMode || p && p.length > 0 ? (typeof p != "string" && !N.objectMode && Object.getPrototypeOf(p) !== o.prototype && (p = a(p)), G ? N.endEmitted ? l.emit("error", new Error("stream.unshift() after end event")) : M(l, N, p, !0) : N.ended ? l.emit("error", new Error("stream.push() after EOF")) : (N.reading = !1, N.decoder && !$ ? (p = N.decoder.write(p), N.objectMode || p.length !== 0 ? M(l, N, p, !1) : V(l, N)) : M(l, N, p, !1))) : G || (N.reading = !1);
    }
    return C(N);
  }
  function M(l, p, $, G) {
    p.flowing && p.length === 0 && !p.sync ? (l.emit("data", $), l.read(0)) : (p.length += p.objectMode ? 1 : $.length, G ? p.buffer.unshift($) : p.buffer.push($), p.needReadable && L(l)), V(l, p);
  }
  function S(l, p) {
    var $;
    return !f(p) && typeof p != "string" && p !== void 0 && !l.objectMode && ($ = new TypeError("Invalid non-string/buffer chunk")), $;
  }
  function C(l) {
    return !l.ended && (l.needReadable || l.length < l.highWaterMark || l.length === 0);
  }
  _.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, _.prototype.setEncoding = function(l) {
    return A || (A = Ba().StringDecoder), this._readableState.decoder = new A(l), this._readableState.encoding = l, this;
  };
  var m = 8388608;
  function D(l) {
    return l >= m ? l = m : (l--, l |= l >>> 1, l |= l >>> 2, l |= l >>> 4, l |= l >>> 8, l |= l >>> 16, l++), l;
  }
  function w(l, p) {
    return l <= 0 || p.length === 0 && p.ended ? 0 : p.objectMode ? 1 : l !== l ? p.flowing && p.length ? p.buffer.head.data.length : p.length : (l > p.highWaterMark && (p.highWaterMark = D(l)), l <= p.length ? l : p.ended ? p.length : (p.needReadable = !0, 0));
  }
  _.prototype.read = function(l) {
    h("read", l), l = parseInt(l, 10);
    var p = this._readableState, $ = l;
    if (l !== 0 && (p.emittedReadable = !1), l === 0 && p.needReadable && (p.length >= p.highWaterMark || p.ended))
      return h("read: emitReadable", p.length, p.ended), p.length === 0 && p.ended ? K(this) : L(this), null;
    if (l = w(l, p), l === 0 && p.ended)
      return p.length === 0 && K(this), null;
    var G = p.needReadable;
    h("need readable", G), (p.length === 0 || p.length - l < p.highWaterMark) && (G = !0, h("length less than watermark", G)), p.ended || p.reading ? (G = !1, h("reading or ended", G)) : G && (h("do read"), p.reading = !0, p.sync = !0, p.length === 0 && (p.needReadable = !0), this._read(p.highWaterMark), p.sync = !1, p.reading || (l = w($, p)));
    var P;
    return l > 0 ? P = ue(l, p) : P = null, P === null ? (p.needReadable = !0, l = 0) : p.length -= l, p.length === 0 && (p.ended || (p.needReadable = !0), $ !== l && p.ended && K(this)), P !== null && this.emit("data", P), P;
  };
  function F(l, p) {
    if (!p.ended) {
      if (p.decoder) {
        var $ = p.decoder.end();
        $ && $.length && (p.buffer.push($), p.length += p.objectMode ? 1 : $.length);
      }
      p.ended = !0, L(l);
    }
  }
  function L(l) {
    var p = l._readableState;
    p.needReadable = !1, p.emittedReadable || (h("emitReadable", p.flowing), p.emittedReadable = !0, p.sync ? r.nextTick(z, l) : z(l));
  }
  function z(l) {
    h("emit readable"), l.emit("readable"), X(l);
  }
  function V(l, p) {
    p.readingMore || (p.readingMore = !0, r.nextTick(Z, l, p));
  }
  function Z(l, p) {
    for (var $ = p.length; !p.reading && !p.flowing && !p.ended && p.length < p.highWaterMark && (h("maybeReadMore read 0"), l.read(0), $ !== p.length); )
      $ = p.length;
    p.readingMore = !1;
  }
  _.prototype._read = function(l) {
    this.emit("error", new Error("_read() is not implemented"));
  }, _.prototype.pipe = function(l, p) {
    var $ = this, G = this._readableState;
    switch (G.pipesCount) {
      case 0:
        G.pipes = l;
        break;
      case 1:
        G.pipes = [G.pipes, l];
        break;
      default:
        G.pipes.push(l);
        break;
    }
    G.pipesCount += 1, h("pipe count=%d opts=%j", G.pipesCount, p);
    var P = (!p || p.end !== !1) && l !== process.stdout && l !== process.stderr, N = P ? he : pe;
    G.endEmitted ? r.nextTick(N) : $.once("end", N), l.on("unpipe", Y);
    function Y(ve, ye) {
      h("onunpipe"), ve === $ && ye && ye.hasUnpiped === !1 && (ye.hasUnpiped = !0, x());
    }
    function he() {
      h("onend"), l.end();
    }
    var _e = ne($);
    l.on("drain", _e);
    var k = !1;
    function x() {
      h("cleanup"), l.removeListener("close", fe), l.removeListener("finish", ae), l.removeListener("drain", _e), l.removeListener("error", ee), l.removeListener("unpipe", Y), $.removeListener("end", he), $.removeListener("end", pe), $.removeListener("data", H), k = !0, G.awaitDrain && (!l._writableState || l._writableState.needDrain) && _e();
    }
    var b = !1;
    $.on("data", H);
    function H(ve) {
      h("ondata"), b = !1;
      var ye = l.write(ve);
      ye === !1 && !b && ((G.pipesCount === 1 && G.pipes === l || G.pipesCount > 1 && q(G.pipes, l) !== -1) && !k && (h("false write response, pause", G.awaitDrain), G.awaitDrain++, b = !0), $.pause());
    }
    function ee(ve) {
      h("onerror", ve), pe(), l.removeListener("error", ee), n(l, "error") === 0 && l.emit("error", ve);
    }
    O(l, "error", ee);
    function fe() {
      l.removeListener("finish", ae), pe();
    }
    l.once("close", fe);
    function ae() {
      h("onfinish"), l.removeListener("close", fe), pe();
    }
    l.once("finish", ae);
    function pe() {
      h("unpipe"), $.unpipe(l);
    }
    return l.emit("pipe", $), G.flowing || (h("pipe resume"), $.resume()), l;
  };
  function ne(l) {
    return function() {
      var p = l._readableState;
      h("pipeOnDrain", p.awaitDrain), p.awaitDrain && p.awaitDrain--, p.awaitDrain === 0 && n(l, "data") && (p.flowing = !0, X(l));
    };
  }
  _.prototype.unpipe = function(l) {
    var p = this._readableState, $ = { hasUnpiped: !1 };
    if (p.pipesCount === 0)
      return this;
    if (p.pipesCount === 1)
      return l && l !== p.pipes ? this : (l || (l = p.pipes), p.pipes = null, p.pipesCount = 0, p.flowing = !1, l && l.emit("unpipe", this, $), this);
    if (!l) {
      var G = p.pipes, P = p.pipesCount;
      p.pipes = null, p.pipesCount = 0, p.flowing = !1;
      for (var N = 0; N < P; N++)
        G[N].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Y = q(p.pipes, l);
    return Y === -1 ? this : (p.pipes.splice(Y, 1), p.pipesCount -= 1, p.pipesCount === 1 && (p.pipes = p.pipes[0]), l.emit("unpipe", this, $), this);
  }, _.prototype.on = function(l, p) {
    var $ = i.prototype.on.call(this, l, p);
    if (l === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (l === "readable") {
      var G = this._readableState;
      !G.endEmitted && !G.readableListening && (G.readableListening = G.needReadable = !0, G.emittedReadable = !1, G.reading ? G.length && L(this) : r.nextTick(ie, this));
    }
    return $;
  }, _.prototype.addListener = _.prototype.on;
  function ie(l) {
    h("readable nexttick read 0"), l.read(0);
  }
  _.prototype.resume = function() {
    var l = this._readableState;
    return l.flowing || (h("resume"), l.flowing = !0, R(this, l)), this;
  };
  function R(l, p) {
    p.resumeScheduled || (p.resumeScheduled = !0, r.nextTick(U, l, p));
  }
  function U(l, p) {
    p.reading || (h("resume read 0"), l.read(0)), p.resumeScheduled = !1, p.awaitDrain = 0, l.emit("resume"), X(l), p.flowing && !p.reading && l.read(0);
  }
  _.prototype.pause = function() {
    return h("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function X(l) {
    var p = l._readableState;
    for (h("flow", p.flowing); p.flowing && l.read() !== null; )
      ;
  }
  _.prototype.wrap = function(l) {
    var p = this, $ = this._readableState, G = !1;
    l.on("end", function() {
      if (h("wrapped end"), $.decoder && !$.ended) {
        var Y = $.decoder.end();
        Y && Y.length && p.push(Y);
      }
      p.push(null);
    }), l.on("data", function(Y) {
      if (h("wrapped data"), $.decoder && (Y = $.decoder.write(Y)), !($.objectMode && Y == null) && !(!$.objectMode && (!Y || !Y.length))) {
        var he = p.push(Y);
        he || (G = !0, l.pause());
      }
    });
    for (var P in l)
      this[P] === void 0 && typeof l[P] == "function" && (this[P] = /* @__PURE__ */ function(Y) {
        return function() {
          return l[Y].apply(l, arguments);
        };
      }(P));
    for (var N = 0; N < B.length; N++)
      l.on(B[N], this.emit.bind(this, B[N]));
    return this._read = function(Y) {
      h("wrapped _read", Y), G && (G = !1, l.resume());
    }, this;
  }, Object.defineProperty(_.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), _._fromList = ue;
  function ue(l, p) {
    if (p.length === 0)
      return null;
    var $;
    return p.objectMode ? $ = p.buffer.shift() : !l || l >= p.length ? (p.decoder ? $ = p.buffer.join("") : p.buffer.length === 1 ? $ = p.buffer.head.data : $ = p.buffer.concat(p.length), p.buffer.clear()) : $ = J(l, p.buffer, p.decoder), $;
  }
  function J(l, p, $) {
    var G;
    return l < p.head.data.length ? (G = p.head.data.slice(0, l), p.head.data = p.head.data.slice(l)) : l === p.head.data.length ? G = p.shift() : G = $ ? te(l, p) : j(l, p), G;
  }
  function te(l, p) {
    var $ = p.head, G = 1, P = $.data;
    for (l -= P.length; $ = $.next; ) {
      var N = $.data, Y = l > N.length ? N.length : l;
      if (Y === N.length ? P += N : P += N.slice(0, l), l -= Y, l === 0) {
        Y === N.length ? (++G, $.next ? p.head = $.next : p.head = p.tail = null) : (p.head = $, $.data = N.slice(Y));
        break;
      }
      ++G;
    }
    return p.length -= G, P;
  }
  function j(l, p) {
    var $ = o.allocUnsafe(l), G = p.head, P = 1;
    for (G.data.copy($), l -= G.data.length; G = G.next; ) {
      var N = G.data, Y = l > N.length ? N.length : l;
      if (N.copy($, $.length - l, 0, Y), l -= Y, l === 0) {
        Y === N.length ? (++P, G.next ? p.head = G.next : p.head = p.tail = null) : (p.head = G, G.data = N.slice(Y));
        break;
      }
      ++P;
    }
    return p.length -= P, $;
  }
  function K(l) {
    var p = l._readableState;
    if (p.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    p.endEmitted || (p.ended = !0, r.nextTick(se, p, l));
  }
  function se(l, p) {
    !l.endEmitted && l.length === 0 && (l.endEmitted = !0, p.readable = !1, p.emit("end"));
  }
  function q(l, p) {
    for (var $ = 0, G = l.length; $ < G; $++)
      if (l[$] === p)
        return $;
    return -1;
  }
  return Ti;
}
var oc = Ot, Pn = Er(), sc = Object.create(Me);
sc.inherits = Ue;
sc.inherits(Ot, Pn);
function l_(r, e) {
  var t = this._transformState;
  t.transforming = !1;
  var n = t.writecb;
  if (!n)
    return this.emit("error", new Error("write callback called multiple times"));
  t.writechunk = null, t.writecb = null, e != null && this.push(e), n(r);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function Ot(r) {
  if (!(this instanceof Ot))
    return new Ot(r);
  Pn.call(this, r), this._transformState = {
    afterTransform: l_.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, r && (typeof r.transform == "function" && (this._transform = r.transform), typeof r.flush == "function" && (this._flush = r.flush)), this.on("prefinish", h_);
}
function h_() {
  var r = this;
  typeof this._flush == "function" ? this._flush(function(e, t) {
    Ta(r, e, t);
  }) : Ta(this, null, null);
}
Ot.prototype.push = function(r, e) {
  return this._transformState.needTransform = !1, Pn.prototype.push.call(this, r, e);
};
Ot.prototype._transform = function(r, e, t) {
  throw new Error("_transform() is not implemented");
};
Ot.prototype._write = function(r, e, t) {
  var n = this._transformState;
  if (n.writecb = t, n.writechunk = r, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
Ot.prototype._read = function(r) {
  var e = this._transformState;
  e.writechunk !== null && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
Ot.prototype._destroy = function(r, e) {
  var t = this;
  Pn.prototype._destroy.call(this, r, function(n) {
    e(n), t.emit("close");
  });
};
function Ta(r, e, t) {
  if (e)
    return r.emit("error", e);
  if (t != null && r.push(t), r._writableState.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (r._transformState.transforming)
    throw new Error("Calling transform done when still transforming");
  return r.push(null);
}
var d_ = Hr, ac = oc, uc = Object.create(Me);
uc.inherits = Ue;
uc.inherits(Hr, ac);
function Hr(r) {
  if (!(this instanceof Hr))
    return new Hr(r);
  ac.call(this, r);
}
Hr.prototype._transform = function(r, e, t) {
  t(null, r);
};
(function(r, e) {
  e = r.exports = ic(), e.Stream = e, e.Readable = e, e.Writable = nc(), e.Duplex = Er(), e.Transform = oc, e.PassThrough = d_;
})(Mo, Mo.exports);
var p_ = Mo.exports, kn = p_, fc = If, __ = Ue, v_ = Nf, cc = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([0]) : new Buffer([0]), No = function(r, e) {
  r._corked ? r.once("uncork", e) : e();
}, y_ = function(r, e) {
  r._autoDestroy && r.destroy(e);
}, lc = function(r, e) {
  return function(t) {
    t ? y_(r, t.message === "premature close" ? null : t) : e && !r._ended && r.end();
  };
}, x_ = function(r, e) {
  if (!r || r._writableState && r._writableState.finished)
    return e();
  if (r._writableState)
    return r.end(e);
  r.end(), e();
}, g_ = function(r) {
  return new kn.Readable({ objectMode: !0, highWaterMark: 16 }).wrap(r);
}, Ke = function(r, e, t) {
  if (!(this instanceof Ke))
    return new Ke(r, e, t);
  kn.Duplex.call(this, t), this._writable = null, this._readable = null, this._readable2 = null, this._autoDestroy = !t || t.autoDestroy !== !1, this._forwardDestroy = !t || t.destroy !== !1, this._forwardEnd = !t || t.end !== !1, this._corked = 1, this._ondrain = null, this._drained = !1, this._forwarding = !1, this._unwrite = null, this._unread = null, this._ended = !1, this.destroyed = !1, r && this.setWritable(r), e && this.setReadable(e);
};
__(Ke, kn.Duplex);
Ke.obj = function(r, e, t) {
  return t || (t = {}), t.objectMode = !0, t.highWaterMark = 16, new Ke(r, e, t);
};
Ke.prototype.cork = function() {
  ++this._corked === 1 && this.emit("cork");
};
Ke.prototype.uncork = function() {
  this._corked && --this._corked === 0 && this.emit("uncork");
};
Ke.prototype.setWritable = function(r) {
  if (this._unwrite && this._unwrite(), this.destroyed) {
    r && r.destroy && r.destroy();
    return;
  }
  if (r === null || r === !1) {
    this.end();
    return;
  }
  var e = this, t = fc(r, { writable: !0, readable: !1 }, lc(this, this._forwardEnd)), n = function() {
    var o = e._ondrain;
    e._ondrain = null, o && o();
  }, i = function() {
    e._writable.removeListener("drain", n), t();
  };
  this._unwrite && process.nextTick(n), this._writable = r, this._writable.on("drain", n), this._unwrite = i, this.uncork();
};
Ke.prototype.setReadable = function(r) {
  if (this._unread && this._unread(), this.destroyed) {
    r && r.destroy && r.destroy();
    return;
  }
  if (r === null || r === !1) {
    this.push(null), this.resume();
    return;
  }
  var e = this, t = fc(r, { writable: !1, readable: !0 }, lc(this)), n = function() {
    e._forward();
  }, i = function() {
    e.push(null);
  }, o = function() {
    e._readable2.removeListener("readable", n), e._readable2.removeListener("end", i), t();
  };
  this._drained = !0, this._readable = r, this._readable2 = r._readableState ? r : g_(r), this._readable2.on("readable", n), this._readable2.on("end", i), this._unread = o, this._forward();
};
Ke.prototype._read = function() {
  this._drained = !0, this._forward();
};
Ke.prototype._forward = function() {
  if (!(this._forwarding || !this._readable2 || !this._drained)) {
    this._forwarding = !0;
    for (var r; this._drained && (r = v_(this._readable2)) !== null; )
      this.destroyed || (this._drained = this.push(r));
    this._forwarding = !1;
  }
};
Ke.prototype.destroy = function(r) {
  if (!this.destroyed) {
    this.destroyed = !0;
    var e = this;
    process.nextTick(function() {
      e._destroy(r);
    });
  }
};
Ke.prototype._destroy = function(r) {
  if (r) {
    var e = this._ondrain;
    this._ondrain = null, e ? e(r) : this.emit("error", r);
  }
  this._forwardDestroy && (this._readable && this._readable.destroy && this._readable.destroy(), this._writable && this._writable.destroy && this._writable.destroy()), this.emit("close");
};
Ke.prototype._write = function(r, e, t) {
  if (this.destroyed)
    return t();
  if (this._corked)
    return No(this, this._write.bind(this, r, e, t));
  if (r === cc)
    return this._finish(t);
  if (!this._writable)
    return t();
  this._writable.write(r) === !1 ? this._ondrain = t : t();
};
Ke.prototype._finish = function(r) {
  var e = this;
  this.emit("preend"), No(this, function() {
    x_(e._forwardEnd && e._writable, function() {
      e._writableState.prefinished === !1 && (e._writableState.prefinished = !0), e.emit("prefinish"), No(e, r);
    });
  });
};
Ke.prototype.end = function(r, e, t) {
  return typeof r == "function" ? this.end(null, null, r) : typeof e == "function" ? this.end(r, null, e) : (this._ended = !0, r && this.write(r), this._writableState.ending || this.write(cc), kn.Writable.prototype.end.call(this, t));
};
var b_ = Ke, pr = null;
typeof WebSocket < "u" ? pr = WebSocket : typeof MozWebSocket < "u" ? pr = MozWebSocket : typeof Q < "u" ? pr = Q.WebSocket || Q.MozWebSocket : typeof window < "u" ? pr = window.WebSocket || window.MozWebSocket : typeof self < "u" && (pr = self.WebSocket || self.MozWebSocket);
var w_ = pr, Ro = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(r, e) {
  var t = et, n = t.Buffer;
  function i(s, a) {
    for (var f in s)
      a[f] = s[f];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = o);
  function o(s, a, f) {
    return n(s, a, f);
  }
  o.prototype = Object.create(n.prototype), i(n, o), o.from = function(s, a, f) {
    if (typeof s == "number")
      throw new TypeError("Argument must not be a number");
    return n(s, a, f);
  }, o.alloc = function(s, a, f) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    var u = n(s);
    return a !== void 0 ? typeof f == "string" ? u.fill(a, f) : u.fill(a) : u.fill(0), u;
  }, o.allocUnsafe = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return n(s);
  }, o.allocUnsafeSlow = function(s) {
    if (typeof s != "number")
      throw new TypeError("Argument must be a number");
    return t.SlowBuffer(s);
  };
})(Ro, Ro.exports);
var m_ = Ro.exports, E_ = a_.Transform, S_ = b_, Da = w_, cr = m_.Buffer, A_ = C_;
function B_(r, e, t) {
  var n = new E_({
    objectMode: r.objectMode
  });
  return n._write = e, n._flush = t, n;
}
function C_(r, e, t) {
  var n, i, o = process.title === "browser", s = !!Q.WebSocket, a = o ? A : T;
  e && !Array.isArray(e) && typeof e == "object" && (t = e, e = void 0, (typeof t.protocol == "string" || Array.isArray(t.protocol)) && (e = t.protocol)), t || (t = {}), t.objectMode === void 0 && (t.objectMode = !(t.binary === !0 || t.binary === void 0));
  var f = B_(t, a, B);
  t.objectMode || (f._writev = S);
  var u = t.browserBufferSize || 1024 * 512, c = t.browserBufferTimeout || 1e3;
  typeof r == "object" ? i = r : (s && o ? i = new Da(r, e) : i = new Da(r, e, t), i.binaryType = "arraybuffer");
  var h = typeof i.addEventListener > "u";
  i.readyState === i.OPEN ? n = f : (n = S_(void 0, void 0, t), t.objectMode || (n._writev = S), h ? i.addEventListener("open", O) : i.onopen = O), n.socket = i, h ? (i.addEventListener("close", d), i.addEventListener("error", _), i.addEventListener("message", E)) : (i.onclose = d, i.onerror = _, i.onmessage = E), f.on("close", M);
  var y = !t.objectMode;
  function T(C, m, D) {
    if (i.readyState !== i.OPEN) {
      D();
      return;
    }
    y && typeof C == "string" && (C = cr.from(C, "utf8")), i.send(C, D);
  }
  function A(C, m, D) {
    if (i.bufferedAmount > u) {
      setTimeout(A, c, C, m, D);
      return;
    }
    y && typeof C == "string" && (C = cr.from(C, "utf8"));
    try {
      i.send(C);
    } catch (w) {
      return D(w);
    }
    D();
  }
  function B(C) {
    i.close(), C();
  }
  function O() {
    n.setReadable(f), n.setWritable(f), n.emit("connect");
  }
  function d(C) {
    n.emit("ws-close", C), n.end(), n.destroy();
  }
  function _(C) {
    n.destroy(C);
  }
  function E(C) {
    var m = C.data;
    m instanceof ArrayBuffer ? m = cr.from(m) : m = cr.from(m, "utf8"), f.push(m);
  }
  function M() {
    i.close();
  }
  function S(C, m) {
    for (var D = new Array(C.length), w = 0; w < C.length; w++)
      typeof C[w].chunk == "string" ? D[w] = cr.from(C[w], "utf8") : D[w] = C[w].chunk;
    this._write(cr.concat(D), "binary", m);
  }
  return n;
}
var hc = { exports: {} };
function T_(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Di = { exports: {} }, Fa;
function me() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n();
    })(Q, function() {
      var t = t || function(n, i) {
        var o;
        if (typeof window < "u" && window.crypto && (o = window.crypto), typeof self < "u" && self.crypto && (o = self.crypto), typeof globalThis < "u" && globalThis.crypto && (o = globalThis.crypto), !o && typeof window < "u" && window.msCrypto && (o = window.msCrypto), !o && typeof Q < "u" && Q.crypto && (o = Q.crypto), !o && typeof T_ == "function")
          try {
            o = Ne;
          } catch {
          }
        var s = function() {
          if (o) {
            if (typeof o.getRandomValues == "function")
              try {
                return o.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof o.randomBytes == "function")
              try {
                return o.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, a = Object.create || /* @__PURE__ */ function() {
          function _() {
          }
          return function(E) {
            var M;
            return _.prototype = E, M = new _(), _.prototype = null, M;
          };
        }(), f = {}, u = f.lib = {}, c = u.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(_) {
              var E = a(this);
              return _ && E.mixIn(_), (!E.hasOwnProperty("init") || this.init === E.init) && (E.init = function() {
                E.$super.init.apply(this, arguments);
              }), E.init.prototype = E, E.$super = this, E;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var _ = this.extend();
              return _.init.apply(_, arguments), _;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(_) {
              for (var E in _)
                _.hasOwnProperty(E) && (this[E] = _[E]);
              _.hasOwnProperty("toString") && (this.toString = _.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), h = u.WordArray = c.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(_, E) {
            _ = this.words = _ || [], E != i ? this.sigBytes = E : this.sigBytes = _.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(_) {
            return (_ || T).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(_) {
            var E = this.words, M = _.words, S = this.sigBytes, C = _.sigBytes;
            if (this.clamp(), S % 4)
              for (var m = 0; m < C; m++) {
                var D = M[m >>> 2] >>> 24 - m % 4 * 8 & 255;
                E[S + m >>> 2] |= D << 24 - (S + m) % 4 * 8;
              }
            else
              for (var w = 0; w < C; w += 4)
                E[S + w >>> 2] = M[w >>> 2];
            return this.sigBytes += C, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var _ = this.words, E = this.sigBytes;
            _[E >>> 2] &= 4294967295 << 32 - E % 4 * 8, _.length = n.ceil(E / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var _ = c.clone.call(this);
            return _.words = this.words.slice(0), _;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(_) {
            for (var E = [], M = 0; M < _; M += 4)
              E.push(s());
            return new h.init(E, _);
          }
        }), y = f.enc = {}, T = y.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(_) {
            for (var E = _.words, M = _.sigBytes, S = [], C = 0; C < M; C++) {
              var m = E[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              S.push((m >>> 4).toString(16)), S.push((m & 15).toString(16));
            }
            return S.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(_) {
            for (var E = _.length, M = [], S = 0; S < E; S += 2)
              M[S >>> 3] |= parseInt(_.substr(S, 2), 16) << 24 - S % 8 * 4;
            return new h.init(M, E / 2);
          }
        }, A = y.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(_) {
            for (var E = _.words, M = _.sigBytes, S = [], C = 0; C < M; C++) {
              var m = E[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              S.push(String.fromCharCode(m));
            }
            return S.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(_) {
            for (var E = _.length, M = [], S = 0; S < E; S++)
              M[S >>> 2] |= (_.charCodeAt(S) & 255) << 24 - S % 4 * 8;
            return new h.init(M, E);
          }
        }, B = y.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(_) {
            try {
              return decodeURIComponent(escape(A.stringify(_)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(_) {
            return A.parse(unescape(encodeURIComponent(_)));
          }
        }, O = u.BufferedBlockAlgorithm = c.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new h.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(_) {
            typeof _ == "string" && (_ = B.parse(_)), this._data.concat(_), this._nDataBytes += _.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(_) {
            var E, M = this._data, S = M.words, C = M.sigBytes, m = this.blockSize, D = m * 4, w = C / D;
            _ ? w = n.ceil(w) : w = n.max((w | 0) - this._minBufferSize, 0);
            var F = w * m, L = n.min(F * 4, C);
            if (F) {
              for (var z = 0; z < F; z += m)
                this._doProcessBlock(S, z);
              E = S.splice(0, F), M.sigBytes -= L;
            }
            return new h.init(E, L);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var _ = c.clone.call(this);
            return _._data = this._data.clone(), _;
          },
          _minBufferSize: 0
        });
        u.Hasher = O.extend({
          /**
           * Configuration options.
           */
          cfg: c.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(_) {
            this.cfg = this.cfg.extend(_), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            O.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(_) {
            return this._append(_), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(_) {
            _ && this._append(_);
            var E = this._doFinalize();
            return E;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(_) {
            return function(E, M) {
              return new _.init(M).finalize(E);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(_) {
            return function(E, M) {
              return new d.HMAC.init(_, M).finalize(E);
            };
          }
        });
        var d = f.algo = {};
        return f;
      }(Math);
      return t;
    });
  }(Di)), Di.exports;
}
var Fi = { exports: {} }, Oa;
function jn() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function(n) {
        var i = t, o = i.lib, s = o.Base, a = o.WordArray, f = i.x64 = {};
        f.Word = s.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(u, c) {
            this.high = u, this.low = c;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), f.WordArray = s.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(u, c) {
            u = this.words = u || [], c != n ? this.sigBytes = c : this.sigBytes = u.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var u = this.words, c = u.length, h = [], y = 0; y < c; y++) {
              var T = u[y];
              h.push(T.high), h.push(T.low);
            }
            return a.create(h, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var u = s.clone.call(this), c = u.words = this.words.slice(0), h = c.length, y = 0; y < h; y++)
              c[y] = c[y].clone();
            return u;
          }
        });
      }(), t;
    });
  }(Fi)), Fi.exports;
}
var Oi = { exports: {} }, Ma;
function D_() {
  return Ma || (Ma = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var n = t, i = n.lib, o = i.WordArray, s = o.init, a = o.init = function(f) {
            if (f instanceof ArrayBuffer && (f = new Uint8Array(f)), (f instanceof Int8Array || typeof Uint8ClampedArray < "u" && f instanceof Uint8ClampedArray || f instanceof Int16Array || f instanceof Uint16Array || f instanceof Int32Array || f instanceof Uint32Array || f instanceof Float32Array || f instanceof Float64Array) && (f = new Uint8Array(f.buffer, f.byteOffset, f.byteLength)), f instanceof Uint8Array) {
              for (var u = f.byteLength, c = [], h = 0; h < u; h++)
                c[h >>> 2] |= f[h] << 24 - h % 4 * 8;
              s.call(this, c, u);
            } else
              s.apply(this, arguments);
          };
          a.prototype = o;
        }
      }(), t.lib.WordArray;
    });
  }(Oi)), Oi.exports;
}
var Mi = { exports: {} }, Ia;
function F_() {
  return Ia || (Ia = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = n.enc;
        s.Utf16 = s.Utf16BE = {
          /**
           * Converts a word array to a UTF-16 BE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 BE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
           */
          stringify: function(f) {
            for (var u = f.words, c = f.sigBytes, h = [], y = 0; y < c; y += 2) {
              var T = u[y >>> 2] >>> 16 - y % 4 * 8 & 65535;
              h.push(String.fromCharCode(T));
            }
            return h.join("");
          },
          /**
           * Converts a UTF-16 BE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 BE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
           */
          parse: function(f) {
            for (var u = f.length, c = [], h = 0; h < u; h++)
              c[h >>> 1] |= f.charCodeAt(h) << 16 - h % 2 * 16;
            return o.create(c, u * 2);
          }
        }, s.Utf16LE = {
          /**
           * Converts a word array to a UTF-16 LE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 LE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
           */
          stringify: function(f) {
            for (var u = f.words, c = f.sigBytes, h = [], y = 0; y < c; y += 2) {
              var T = a(u[y >>> 2] >>> 16 - y % 4 * 8 & 65535);
              h.push(String.fromCharCode(T));
            }
            return h.join("");
          },
          /**
           * Converts a UTF-16 LE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 LE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
           */
          parse: function(f) {
            for (var u = f.length, c = [], h = 0; h < u; h++)
              c[h >>> 1] |= a(f.charCodeAt(h) << 16 - h % 2 * 16);
            return o.create(c, u * 2);
          }
        };
        function a(f) {
          return f << 8 & 4278255360 | f >>> 8 & 16711935;
        }
      }(), t.enc.Utf16;
    });
  }(Mi)), Mi.exports;
}
var Ii = { exports: {} }, Na;
function sr() {
  return Na || (Na = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = n.enc;
        s.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(f) {
            var u = f.words, c = f.sigBytes, h = this._map;
            f.clamp();
            for (var y = [], T = 0; T < c; T += 3)
              for (var A = u[T >>> 2] >>> 24 - T % 4 * 8 & 255, B = u[T + 1 >>> 2] >>> 24 - (T + 1) % 4 * 8 & 255, O = u[T + 2 >>> 2] >>> 24 - (T + 2) % 4 * 8 & 255, d = A << 16 | B << 8 | O, _ = 0; _ < 4 && T + _ * 0.75 < c; _++)
                y.push(h.charAt(d >>> 6 * (3 - _) & 63));
            var E = h.charAt(64);
            if (E)
              for (; y.length % 4; )
                y.push(E);
            return y.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(f) {
            var u = f.length, c = this._map, h = this._reverseMap;
            if (!h) {
              h = this._reverseMap = [];
              for (var y = 0; y < c.length; y++)
                h[c.charCodeAt(y)] = y;
            }
            var T = c.charAt(64);
            if (T) {
              var A = f.indexOf(T);
              A !== -1 && (u = A);
            }
            return a(f, u, h);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function a(f, u, c) {
          for (var h = [], y = 0, T = 0; T < u; T++)
            if (T % 4) {
              var A = c[f.charCodeAt(T - 1)] << T % 4 * 2, B = c[f.charCodeAt(T)] >>> 6 - T % 4 * 2, O = A | B;
              h[y >>> 2] |= O << 24 - y % 4 * 8, y++;
            }
          return o.create(h, y);
        }
      }(), t.enc.Base64;
    });
  }(Ii)), Ii.exports;
}
var Ni = { exports: {} }, Ra;
function O_() {
  return Ra || (Ra = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = n.enc;
        s.Base64url = {
          /**
           * Converts a word array to a Base64url string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {string} The Base64url string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
           */
          stringify: function(f, u) {
            u === void 0 && (u = !0);
            var c = f.words, h = f.sigBytes, y = u ? this._safe_map : this._map;
            f.clamp();
            for (var T = [], A = 0; A < h; A += 3)
              for (var B = c[A >>> 2] >>> 24 - A % 4 * 8 & 255, O = c[A + 1 >>> 2] >>> 24 - (A + 1) % 4 * 8 & 255, d = c[A + 2 >>> 2] >>> 24 - (A + 2) % 4 * 8 & 255, _ = B << 16 | O << 8 | d, E = 0; E < 4 && A + E * 0.75 < h; E++)
                T.push(y.charAt(_ >>> 6 * (3 - E) & 63));
            var M = y.charAt(64);
            if (M)
              for (; T.length % 4; )
                T.push(M);
            return T.join("");
          },
          /**
           * Converts a Base64url string to a word array.
           *
           * @param {string} base64Str The Base64url string.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
           */
          parse: function(f, u) {
            u === void 0 && (u = !0);
            var c = f.length, h = u ? this._safe_map : this._map, y = this._reverseMap;
            if (!y) {
              y = this._reverseMap = [];
              for (var T = 0; T < h.length; T++)
                y[h.charCodeAt(T)] = T;
            }
            var A = h.charAt(64);
            if (A) {
              var B = f.indexOf(A);
              B !== -1 && (c = B);
            }
            return a(f, c, y);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function a(f, u, c) {
          for (var h = [], y = 0, T = 0; T < u; T++)
            if (T % 4) {
              var A = c[f.charCodeAt(T - 1)] << T % 4 * 2, B = c[f.charCodeAt(T)] >>> 6 - T % 4 * 2, O = A | B;
              h[y >>> 2] |= O << 24 - y % 4 * 8, y++;
            }
          return o.create(h, y);
        }
      }(), t.enc.Base64url;
    });
  }(Ni)), Ni.exports;
}
var Ri = { exports: {} }, Pa;
function ar() {
  return Pa || (Pa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function(n) {
        var i = t, o = i.lib, s = o.WordArray, a = o.Hasher, f = i.algo, u = [];
        (function() {
          for (var B = 0; B < 64; B++)
            u[B] = n.abs(n.sin(B + 1)) * 4294967296 | 0;
        })();
        var c = f.MD5 = a.extend({
          _doReset: function() {
            this._hash = new s.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(B, O) {
            for (var d = 0; d < 16; d++) {
              var _ = O + d, E = B[_];
              B[_] = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360;
            }
            var M = this._hash.words, S = B[O + 0], C = B[O + 1], m = B[O + 2], D = B[O + 3], w = B[O + 4], F = B[O + 5], L = B[O + 6], z = B[O + 7], V = B[O + 8], Z = B[O + 9], ne = B[O + 10], ie = B[O + 11], R = B[O + 12], U = B[O + 13], X = B[O + 14], ue = B[O + 15], J = M[0], te = M[1], j = M[2], K = M[3];
            J = h(J, te, j, K, S, 7, u[0]), K = h(K, J, te, j, C, 12, u[1]), j = h(j, K, J, te, m, 17, u[2]), te = h(te, j, K, J, D, 22, u[3]), J = h(J, te, j, K, w, 7, u[4]), K = h(K, J, te, j, F, 12, u[5]), j = h(j, K, J, te, L, 17, u[6]), te = h(te, j, K, J, z, 22, u[7]), J = h(J, te, j, K, V, 7, u[8]), K = h(K, J, te, j, Z, 12, u[9]), j = h(j, K, J, te, ne, 17, u[10]), te = h(te, j, K, J, ie, 22, u[11]), J = h(J, te, j, K, R, 7, u[12]), K = h(K, J, te, j, U, 12, u[13]), j = h(j, K, J, te, X, 17, u[14]), te = h(te, j, K, J, ue, 22, u[15]), J = y(J, te, j, K, C, 5, u[16]), K = y(K, J, te, j, L, 9, u[17]), j = y(j, K, J, te, ie, 14, u[18]), te = y(te, j, K, J, S, 20, u[19]), J = y(J, te, j, K, F, 5, u[20]), K = y(K, J, te, j, ne, 9, u[21]), j = y(j, K, J, te, ue, 14, u[22]), te = y(te, j, K, J, w, 20, u[23]), J = y(J, te, j, K, Z, 5, u[24]), K = y(K, J, te, j, X, 9, u[25]), j = y(j, K, J, te, D, 14, u[26]), te = y(te, j, K, J, V, 20, u[27]), J = y(J, te, j, K, U, 5, u[28]), K = y(K, J, te, j, m, 9, u[29]), j = y(j, K, J, te, z, 14, u[30]), te = y(te, j, K, J, R, 20, u[31]), J = T(J, te, j, K, F, 4, u[32]), K = T(K, J, te, j, V, 11, u[33]), j = T(j, K, J, te, ie, 16, u[34]), te = T(te, j, K, J, X, 23, u[35]), J = T(J, te, j, K, C, 4, u[36]), K = T(K, J, te, j, w, 11, u[37]), j = T(j, K, J, te, z, 16, u[38]), te = T(te, j, K, J, ne, 23, u[39]), J = T(J, te, j, K, U, 4, u[40]), K = T(K, J, te, j, S, 11, u[41]), j = T(j, K, J, te, D, 16, u[42]), te = T(te, j, K, J, L, 23, u[43]), J = T(J, te, j, K, Z, 4, u[44]), K = T(K, J, te, j, R, 11, u[45]), j = T(j, K, J, te, ue, 16, u[46]), te = T(te, j, K, J, m, 23, u[47]), J = A(J, te, j, K, S, 6, u[48]), K = A(K, J, te, j, z, 10, u[49]), j = A(j, K, J, te, X, 15, u[50]), te = A(te, j, K, J, F, 21, u[51]), J = A(J, te, j, K, R, 6, u[52]), K = A(K, J, te, j, D, 10, u[53]), j = A(j, K, J, te, ne, 15, u[54]), te = A(te, j, K, J, C, 21, u[55]), J = A(J, te, j, K, V, 6, u[56]), K = A(K, J, te, j, ue, 10, u[57]), j = A(j, K, J, te, L, 15, u[58]), te = A(te, j, K, J, U, 21, u[59]), J = A(J, te, j, K, w, 6, u[60]), K = A(K, J, te, j, ie, 10, u[61]), j = A(j, K, J, te, m, 15, u[62]), te = A(te, j, K, J, Z, 21, u[63]), M[0] = M[0] + J | 0, M[1] = M[1] + te | 0, M[2] = M[2] + j | 0, M[3] = M[3] + K | 0;
          },
          _doFinalize: function() {
            var B = this._data, O = B.words, d = this._nDataBytes * 8, _ = B.sigBytes * 8;
            O[_ >>> 5] |= 128 << 24 - _ % 32;
            var E = n.floor(d / 4294967296), M = d;
            O[(_ + 64 >>> 9 << 4) + 15] = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, O[(_ + 64 >>> 9 << 4) + 14] = (M << 8 | M >>> 24) & 16711935 | (M << 24 | M >>> 8) & 4278255360, B.sigBytes = (O.length + 1) * 4, this._process();
            for (var S = this._hash, C = S.words, m = 0; m < 4; m++) {
              var D = C[m];
              C[m] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return S;
          },
          clone: function() {
            var B = a.clone.call(this);
            return B._hash = this._hash.clone(), B;
          }
        });
        function h(B, O, d, _, E, M, S) {
          var C = B + (O & d | ~O & _) + E + S;
          return (C << M | C >>> 32 - M) + O;
        }
        function y(B, O, d, _, E, M, S) {
          var C = B + (O & _ | d & ~_) + E + S;
          return (C << M | C >>> 32 - M) + O;
        }
        function T(B, O, d, _, E, M, S) {
          var C = B + (O ^ d ^ _) + E + S;
          return (C << M | C >>> 32 - M) + O;
        }
        function A(B, O, d, _, E, M, S) {
          var C = B + (d ^ (O | ~_)) + E + S;
          return (C << M | C >>> 32 - M) + O;
        }
        i.MD5 = a._createHelper(c), i.HmacMD5 = a._createHmacHelper(c);
      }(Math), t.MD5;
    });
  }(Ri)), Ri.exports;
}
var Pi = { exports: {} }, ka;
function dc() {
  return ka || (ka = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = i.Hasher, a = n.algo, f = [], u = a.SHA1 = s.extend({
          _doReset: function() {
            this._hash = new o.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(c, h) {
            for (var y = this._hash.words, T = y[0], A = y[1], B = y[2], O = y[3], d = y[4], _ = 0; _ < 80; _++) {
              if (_ < 16)
                f[_] = c[h + _] | 0;
              else {
                var E = f[_ - 3] ^ f[_ - 8] ^ f[_ - 14] ^ f[_ - 16];
                f[_] = E << 1 | E >>> 31;
              }
              var M = (T << 5 | T >>> 27) + d + f[_];
              _ < 20 ? M += (A & B | ~A & O) + 1518500249 : _ < 40 ? M += (A ^ B ^ O) + 1859775393 : _ < 60 ? M += (A & B | A & O | B & O) - 1894007588 : M += (A ^ B ^ O) - 899497514, d = O, O = B, B = A << 30 | A >>> 2, A = T, T = M;
            }
            y[0] = y[0] + T | 0, y[1] = y[1] + A | 0, y[2] = y[2] + B | 0, y[3] = y[3] + O | 0, y[4] = y[4] + d | 0;
          },
          _doFinalize: function() {
            var c = this._data, h = c.words, y = this._nDataBytes * 8, T = c.sigBytes * 8;
            return h[T >>> 5] |= 128 << 24 - T % 32, h[(T + 64 >>> 9 << 4) + 14] = Math.floor(y / 4294967296), h[(T + 64 >>> 9 << 4) + 15] = y, c.sigBytes = h.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var c = s.clone.call(this);
            return c._hash = this._hash.clone(), c;
          }
        });
        n.SHA1 = s._createHelper(u), n.HmacSHA1 = s._createHmacHelper(u);
      }(), t.SHA1;
    });
  }(Pi)), Pi.exports;
}
var ki = { exports: {} }, ja;
function os() {
  return ja || (ja = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      return function(n) {
        var i = t, o = i.lib, s = o.WordArray, a = o.Hasher, f = i.algo, u = [], c = [];
        (function() {
          function T(d) {
            for (var _ = n.sqrt(d), E = 2; E <= _; E++)
              if (!(d % E))
                return !1;
            return !0;
          }
          function A(d) {
            return (d - (d | 0)) * 4294967296 | 0;
          }
          for (var B = 2, O = 0; O < 64; )
            T(B) && (O < 8 && (u[O] = A(n.pow(B, 1 / 2))), c[O] = A(n.pow(B, 1 / 3)), O++), B++;
        })();
        var h = [], y = f.SHA256 = a.extend({
          _doReset: function() {
            this._hash = new s.init(u.slice(0));
          },
          _doProcessBlock: function(T, A) {
            for (var B = this._hash.words, O = B[0], d = B[1], _ = B[2], E = B[3], M = B[4], S = B[5], C = B[6], m = B[7], D = 0; D < 64; D++) {
              if (D < 16)
                h[D] = T[A + D] | 0;
              else {
                var w = h[D - 15], F = (w << 25 | w >>> 7) ^ (w << 14 | w >>> 18) ^ w >>> 3, L = h[D - 2], z = (L << 15 | L >>> 17) ^ (L << 13 | L >>> 19) ^ L >>> 10;
                h[D] = F + h[D - 7] + z + h[D - 16];
              }
              var V = M & S ^ ~M & C, Z = O & d ^ O & _ ^ d & _, ne = (O << 30 | O >>> 2) ^ (O << 19 | O >>> 13) ^ (O << 10 | O >>> 22), ie = (M << 26 | M >>> 6) ^ (M << 21 | M >>> 11) ^ (M << 7 | M >>> 25), R = m + ie + V + c[D] + h[D], U = ne + Z;
              m = C, C = S, S = M, M = E + R | 0, E = _, _ = d, d = O, O = R + U | 0;
            }
            B[0] = B[0] + O | 0, B[1] = B[1] + d | 0, B[2] = B[2] + _ | 0, B[3] = B[3] + E | 0, B[4] = B[4] + M | 0, B[5] = B[5] + S | 0, B[6] = B[6] + C | 0, B[7] = B[7] + m | 0;
          },
          _doFinalize: function() {
            var T = this._data, A = T.words, B = this._nDataBytes * 8, O = T.sigBytes * 8;
            return A[O >>> 5] |= 128 << 24 - O % 32, A[(O + 64 >>> 9 << 4) + 14] = n.floor(B / 4294967296), A[(O + 64 >>> 9 << 4) + 15] = B, T.sigBytes = A.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var T = a.clone.call(this);
            return T._hash = this._hash.clone(), T;
          }
        });
        i.SHA256 = a._createHelper(y), i.HmacSHA256 = a._createHmacHelper(y);
      }(Math), t.SHA256;
    });
  }(ki)), ki.exports;
}
var ji = { exports: {} }, Ua;
function M_() {
  return Ua || (Ua = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), os());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = n.algo, a = s.SHA256, f = s.SHA224 = a.extend({
          _doReset: function() {
            this._hash = new o.init([
              3238371032,
              914150663,
              812702999,
              4144912697,
              4290775857,
              1750603025,
              1694076839,
              3204075428
            ]);
          },
          _doFinalize: function() {
            var u = a._doFinalize.call(this);
            return u.sigBytes -= 4, u;
          }
        });
        n.SHA224 = a._createHelper(f), n.HmacSHA224 = a._createHmacHelper(f);
      }(), t.SHA224;
    });
  }(ji)), ji.exports;
}
var Ui = { exports: {} }, La;
function pc() {
  return La || (La = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), jn());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.Hasher, s = n.x64, a = s.Word, f = s.WordArray, u = n.algo;
        function c() {
          return a.create.apply(a, arguments);
        }
        var h = [
          c(1116352408, 3609767458),
          c(1899447441, 602891725),
          c(3049323471, 3964484399),
          c(3921009573, 2173295548),
          c(961987163, 4081628472),
          c(1508970993, 3053834265),
          c(2453635748, 2937671579),
          c(2870763221, 3664609560),
          c(3624381080, 2734883394),
          c(310598401, 1164996542),
          c(607225278, 1323610764),
          c(1426881987, 3590304994),
          c(1925078388, 4068182383),
          c(2162078206, 991336113),
          c(2614888103, 633803317),
          c(3248222580, 3479774868),
          c(3835390401, 2666613458),
          c(4022224774, 944711139),
          c(264347078, 2341262773),
          c(604807628, 2007800933),
          c(770255983, 1495990901),
          c(1249150122, 1856431235),
          c(1555081692, 3175218132),
          c(1996064986, 2198950837),
          c(2554220882, 3999719339),
          c(2821834349, 766784016),
          c(2952996808, 2566594879),
          c(3210313671, 3203337956),
          c(3336571891, 1034457026),
          c(3584528711, 2466948901),
          c(113926993, 3758326383),
          c(338241895, 168717936),
          c(666307205, 1188179964),
          c(773529912, 1546045734),
          c(1294757372, 1522805485),
          c(1396182291, 2643833823),
          c(1695183700, 2343527390),
          c(1986661051, 1014477480),
          c(2177026350, 1206759142),
          c(2456956037, 344077627),
          c(2730485921, 1290863460),
          c(2820302411, 3158454273),
          c(3259730800, 3505952657),
          c(3345764771, 106217008),
          c(3516065817, 3606008344),
          c(3600352804, 1432725776),
          c(4094571909, 1467031594),
          c(275423344, 851169720),
          c(430227734, 3100823752),
          c(506948616, 1363258195),
          c(659060556, 3750685593),
          c(883997877, 3785050280),
          c(958139571, 3318307427),
          c(1322822218, 3812723403),
          c(1537002063, 2003034995),
          c(1747873779, 3602036899),
          c(1955562222, 1575990012),
          c(2024104815, 1125592928),
          c(2227730452, 2716904306),
          c(2361852424, 442776044),
          c(2428436474, 593698344),
          c(2756734187, 3733110249),
          c(3204031479, 2999351573),
          c(3329325298, 3815920427),
          c(3391569614, 3928383900),
          c(3515267271, 566280711),
          c(3940187606, 3454069534),
          c(4118630271, 4000239992),
          c(116418474, 1914138554),
          c(174292421, 2731055270),
          c(289380356, 3203993006),
          c(460393269, 320620315),
          c(685471733, 587496836),
          c(852142971, 1086792851),
          c(1017036298, 365543100),
          c(1126000580, 2618297676),
          c(1288033470, 3409855158),
          c(1501505948, 4234509866),
          c(1607167915, 987167468),
          c(1816402316, 1246189591)
        ], y = [];
        (function() {
          for (var A = 0; A < 80; A++)
            y[A] = c();
        })();
        var T = u.SHA512 = o.extend({
          _doReset: function() {
            this._hash = new f.init([
              new a.init(1779033703, 4089235720),
              new a.init(3144134277, 2227873595),
              new a.init(1013904242, 4271175723),
              new a.init(2773480762, 1595750129),
              new a.init(1359893119, 2917565137),
              new a.init(2600822924, 725511199),
              new a.init(528734635, 4215389547),
              new a.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(A, B) {
            for (var O = this._hash.words, d = O[0], _ = O[1], E = O[2], M = O[3], S = O[4], C = O[5], m = O[6], D = O[7], w = d.high, F = d.low, L = _.high, z = _.low, V = E.high, Z = E.low, ne = M.high, ie = M.low, R = S.high, U = S.low, X = C.high, ue = C.low, J = m.high, te = m.low, j = D.high, K = D.low, se = w, q = F, l = L, p = z, $ = V, G = Z, P = ne, N = ie, Y = R, he = U, _e = X, k = ue, x = J, b = te, H = j, ee = K, fe = 0; fe < 80; fe++) {
              var ae, pe, ve = y[fe];
              if (fe < 16)
                pe = ve.high = A[B + fe * 2] | 0, ae = ve.low = A[B + fe * 2 + 1] | 0;
              else {
                var ye = y[fe - 15], Ae = ye.high, I = ye.low, v = (Ae >>> 1 | I << 31) ^ (Ae >>> 8 | I << 24) ^ Ae >>> 7, g = (I >>> 1 | Ae << 31) ^ (I >>> 8 | Ae << 24) ^ (I >>> 7 | Ae << 25), W = y[fe - 2], re = W.high, oe = W.low, ce = (re >>> 19 | oe << 13) ^ (re << 3 | oe >>> 29) ^ re >>> 6, be = (oe >>> 19 | re << 13) ^ (oe << 3 | re >>> 29) ^ (oe >>> 6 | re << 26), Oe = y[fe - 7], Te = Oe.high, Ie = Oe.low, Be = y[fe - 16], el = Be.high, _s = Be.low;
                ae = g + Ie, pe = v + Te + (ae >>> 0 < g >>> 0 ? 1 : 0), ae = ae + be, pe = pe + ce + (ae >>> 0 < be >>> 0 ? 1 : 0), ae = ae + _s, pe = pe + el + (ae >>> 0 < _s >>> 0 ? 1 : 0), ve.high = pe, ve.low = ae;
              }
              var tl = Y & _e ^ ~Y & x, vs = he & k ^ ~he & b, rl = se & l ^ se & $ ^ l & $, nl = q & p ^ q & G ^ p & G, il = (se >>> 28 | q << 4) ^ (se << 30 | q >>> 2) ^ (se << 25 | q >>> 7), ys = (q >>> 28 | se << 4) ^ (q << 30 | se >>> 2) ^ (q << 25 | se >>> 7), ol = (Y >>> 14 | he << 18) ^ (Y >>> 18 | he << 14) ^ (Y << 23 | he >>> 9), sl = (he >>> 14 | Y << 18) ^ (he >>> 18 | Y << 14) ^ (he << 23 | Y >>> 9), xs = h[fe], al = xs.high, gs = xs.low, tt = ee + sl, Pt = H + ol + (tt >>> 0 < ee >>> 0 ? 1 : 0), tt = tt + vs, Pt = Pt + tl + (tt >>> 0 < vs >>> 0 ? 1 : 0), tt = tt + gs, Pt = Pt + al + (tt >>> 0 < gs >>> 0 ? 1 : 0), tt = tt + ae, Pt = Pt + pe + (tt >>> 0 < ae >>> 0 ? 1 : 0), bs = ys + nl, ul = il + rl + (bs >>> 0 < ys >>> 0 ? 1 : 0);
              H = x, ee = b, x = _e, b = k, _e = Y, k = he, he = N + tt | 0, Y = P + Pt + (he >>> 0 < N >>> 0 ? 1 : 0) | 0, P = $, N = G, $ = l, G = p, l = se, p = q, q = tt + bs | 0, se = Pt + ul + (q >>> 0 < tt >>> 0 ? 1 : 0) | 0;
            }
            F = d.low = F + q, d.high = w + se + (F >>> 0 < q >>> 0 ? 1 : 0), z = _.low = z + p, _.high = L + l + (z >>> 0 < p >>> 0 ? 1 : 0), Z = E.low = Z + G, E.high = V + $ + (Z >>> 0 < G >>> 0 ? 1 : 0), ie = M.low = ie + N, M.high = ne + P + (ie >>> 0 < N >>> 0 ? 1 : 0), U = S.low = U + he, S.high = R + Y + (U >>> 0 < he >>> 0 ? 1 : 0), ue = C.low = ue + k, C.high = X + _e + (ue >>> 0 < k >>> 0 ? 1 : 0), te = m.low = te + b, m.high = J + x + (te >>> 0 < b >>> 0 ? 1 : 0), K = D.low = K + ee, D.high = j + H + (K >>> 0 < ee >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var A = this._data, B = A.words, O = this._nDataBytes * 8, d = A.sigBytes * 8;
            B[d >>> 5] |= 128 << 24 - d % 32, B[(d + 128 >>> 10 << 5) + 30] = Math.floor(O / 4294967296), B[(d + 128 >>> 10 << 5) + 31] = O, A.sigBytes = B.length * 4, this._process();
            var _ = this._hash.toX32();
            return _;
          },
          clone: function() {
            var A = o.clone.call(this);
            return A._hash = this._hash.clone(), A;
          },
          blockSize: 1024 / 32
        });
        n.SHA512 = o._createHelper(T), n.HmacSHA512 = o._createHmacHelper(T);
      }(), t.SHA512;
    });
  }(Ui)), Ui.exports;
}
var Li = { exports: {} }, qa;
function I_() {
  return qa || (qa = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), jn(), pc());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.x64, o = i.Word, s = i.WordArray, a = n.algo, f = a.SHA512, u = a.SHA384 = f.extend({
          _doReset: function() {
            this._hash = new s.init([
              new o.init(3418070365, 3238371032),
              new o.init(1654270250, 914150663),
              new o.init(2438529370, 812702999),
              new o.init(355462360, 4144912697),
              new o.init(1731405415, 4290775857),
              new o.init(2394180231, 1750603025),
              new o.init(3675008525, 1694076839),
              new o.init(1203062813, 3204075428)
            ]);
          },
          _doFinalize: function() {
            var c = f._doFinalize.call(this);
            return c.sigBytes -= 16, c;
          }
        });
        n.SHA384 = f._createHelper(u), n.HmacSHA384 = f._createHmacHelper(u);
      }(), t.SHA384;
    });
  }(Li)), Li.exports;
}
var qi = { exports: {} }, Ha;
function N_() {
  return Ha || (Ha = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), jn());
    })(Q, function(t) {
      return function(n) {
        var i = t, o = i.lib, s = o.WordArray, a = o.Hasher, f = i.x64, u = f.Word, c = i.algo, h = [], y = [], T = [];
        (function() {
          for (var O = 1, d = 0, _ = 0; _ < 24; _++) {
            h[O + 5 * d] = (_ + 1) * (_ + 2) / 2 % 64;
            var E = d % 5, M = (2 * O + 3 * d) % 5;
            O = E, d = M;
          }
          for (var O = 0; O < 5; O++)
            for (var d = 0; d < 5; d++)
              y[O + 5 * d] = d + (2 * O + 3 * d) % 5 * 5;
          for (var S = 1, C = 0; C < 24; C++) {
            for (var m = 0, D = 0, w = 0; w < 7; w++) {
              if (S & 1) {
                var F = (1 << w) - 1;
                F < 32 ? D ^= 1 << F : m ^= 1 << F - 32;
              }
              S & 128 ? S = S << 1 ^ 113 : S <<= 1;
            }
            T[C] = u.create(m, D);
          }
        })();
        var A = [];
        (function() {
          for (var O = 0; O < 25; O++)
            A[O] = u.create();
        })();
        var B = c.SHA3 = a.extend({
          /**
           * Configuration options.
           *
           * @property {number} outputLength
           *   The desired number of bits in the output hash.
           *   Only values permitted are: 224, 256, 384, 512.
           *   Default: 512
           */
          cfg: a.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            for (var O = this._state = [], d = 0; d < 25; d++)
              O[d] = new u.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(O, d) {
            for (var _ = this._state, E = this.blockSize / 2, M = 0; M < E; M++) {
              var S = O[d + 2 * M], C = O[d + 2 * M + 1];
              S = (S << 8 | S >>> 24) & 16711935 | (S << 24 | S >>> 8) & 4278255360, C = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360;
              var m = _[M];
              m.high ^= C, m.low ^= S;
            }
            for (var D = 0; D < 24; D++) {
              for (var w = 0; w < 5; w++) {
                for (var F = 0, L = 0, z = 0; z < 5; z++) {
                  var m = _[w + 5 * z];
                  F ^= m.high, L ^= m.low;
                }
                var V = A[w];
                V.high = F, V.low = L;
              }
              for (var w = 0; w < 5; w++)
                for (var Z = A[(w + 4) % 5], ne = A[(w + 1) % 5], ie = ne.high, R = ne.low, F = Z.high ^ (ie << 1 | R >>> 31), L = Z.low ^ (R << 1 | ie >>> 31), z = 0; z < 5; z++) {
                  var m = _[w + 5 * z];
                  m.high ^= F, m.low ^= L;
                }
              for (var U = 1; U < 25; U++) {
                var F, L, m = _[U], X = m.high, ue = m.low, J = h[U];
                J < 32 ? (F = X << J | ue >>> 32 - J, L = ue << J | X >>> 32 - J) : (F = ue << J - 32 | X >>> 64 - J, L = X << J - 32 | ue >>> 64 - J);
                var te = A[y[U]];
                te.high = F, te.low = L;
              }
              var j = A[0], K = _[0];
              j.high = K.high, j.low = K.low;
              for (var w = 0; w < 5; w++)
                for (var z = 0; z < 5; z++) {
                  var U = w + 5 * z, m = _[U], se = A[U], q = A[(w + 1) % 5 + 5 * z], l = A[(w + 2) % 5 + 5 * z];
                  m.high = se.high ^ ~q.high & l.high, m.low = se.low ^ ~q.low & l.low;
                }
              var m = _[0], p = T[D];
              m.high ^= p.high, m.low ^= p.low;
            }
          },
          _doFinalize: function() {
            var O = this._data, d = O.words;
            this._nDataBytes * 8;
            var _ = O.sigBytes * 8, E = this.blockSize * 32;
            d[_ >>> 5] |= 1 << 24 - _ % 32, d[(n.ceil((_ + 1) / E) * E >>> 5) - 1] |= 128, O.sigBytes = d.length * 4, this._process();
            for (var M = this._state, S = this.cfg.outputLength / 8, C = S / 8, m = [], D = 0; D < C; D++) {
              var w = M[D], F = w.high, L = w.low;
              F = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360, L = (L << 8 | L >>> 24) & 16711935 | (L << 24 | L >>> 8) & 4278255360, m.push(L), m.push(F);
            }
            return new s.init(m, S);
          },
          clone: function() {
            for (var O = a.clone.call(this), d = O._state = this._state.slice(0), _ = 0; _ < 25; _++)
              d[_] = d[_].clone();
            return O;
          }
        });
        i.SHA3 = a._createHelper(B), i.HmacSHA3 = a._createHmacHelper(B);
      }(Math), t.SHA3;
    });
  }(qi)), qi.exports;
}
var Hi = { exports: {} }, $a;
function R_() {
  return $a || ($a = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      /** @preserve
      			(c) 2012 by Cédric Mesnil. All rights reserved.
      
      			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      
      			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      
      			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      			*/
      return function(n) {
        var i = t, o = i.lib, s = o.WordArray, a = o.Hasher, f = i.algo, u = s.create([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          7,
          4,
          13,
          1,
          10,
          6,
          15,
          3,
          12,
          0,
          9,
          5,
          2,
          14,
          11,
          8,
          3,
          10,
          14,
          4,
          9,
          15,
          8,
          1,
          2,
          7,
          0,
          6,
          13,
          11,
          5,
          12,
          1,
          9,
          11,
          10,
          0,
          8,
          12,
          4,
          13,
          3,
          7,
          15,
          14,
          5,
          6,
          2,
          4,
          0,
          5,
          9,
          7,
          12,
          2,
          10,
          14,
          1,
          3,
          8,
          11,
          6,
          15,
          13
        ]), c = s.create([
          5,
          14,
          7,
          0,
          9,
          2,
          11,
          4,
          13,
          6,
          15,
          8,
          1,
          10,
          3,
          12,
          6,
          11,
          3,
          7,
          0,
          13,
          5,
          10,
          14,
          15,
          8,
          12,
          4,
          9,
          1,
          2,
          15,
          5,
          1,
          3,
          7,
          14,
          6,
          9,
          11,
          8,
          12,
          2,
          10,
          0,
          4,
          13,
          8,
          6,
          4,
          1,
          3,
          11,
          15,
          0,
          5,
          12,
          2,
          13,
          9,
          7,
          10,
          14,
          12,
          15,
          10,
          4,
          1,
          5,
          8,
          7,
          6,
          2,
          13,
          14,
          0,
          3,
          9,
          11
        ]), h = s.create([
          11,
          14,
          15,
          12,
          5,
          8,
          7,
          9,
          11,
          13,
          14,
          15,
          6,
          7,
          9,
          8,
          7,
          6,
          8,
          13,
          11,
          9,
          7,
          15,
          7,
          12,
          15,
          9,
          11,
          7,
          13,
          12,
          11,
          13,
          6,
          7,
          14,
          9,
          13,
          15,
          14,
          8,
          13,
          6,
          5,
          12,
          7,
          5,
          11,
          12,
          14,
          15,
          14,
          15,
          9,
          8,
          9,
          14,
          5,
          6,
          8,
          6,
          5,
          12,
          9,
          15,
          5,
          11,
          6,
          8,
          13,
          12,
          5,
          12,
          13,
          14,
          11,
          8,
          5,
          6
        ]), y = s.create([
          8,
          9,
          9,
          11,
          13,
          15,
          15,
          5,
          7,
          7,
          8,
          11,
          14,
          14,
          12,
          6,
          9,
          13,
          15,
          7,
          12,
          8,
          9,
          11,
          7,
          7,
          12,
          7,
          6,
          15,
          13,
          11,
          9,
          7,
          15,
          11,
          8,
          6,
          6,
          14,
          12,
          13,
          5,
          14,
          13,
          13,
          7,
          5,
          15,
          5,
          8,
          11,
          14,
          14,
          6,
          14,
          6,
          9,
          12,
          9,
          12,
          5,
          15,
          8,
          8,
          5,
          12,
          9,
          12,
          5,
          14,
          6,
          8,
          13,
          6,
          5,
          15,
          13,
          11,
          11
        ]), T = s.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), A = s.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), B = f.RIPEMD160 = a.extend({
          _doReset: function() {
            this._hash = s.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(C, m) {
            for (var D = 0; D < 16; D++) {
              var w = m + D, F = C[w];
              C[w] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360;
            }
            var L = this._hash.words, z = T.words, V = A.words, Z = u.words, ne = c.words, ie = h.words, R = y.words, U, X, ue, J, te, j, K, se, q, l;
            j = U = L[0], K = X = L[1], se = ue = L[2], q = J = L[3], l = te = L[4];
            for (var p, D = 0; D < 80; D += 1)
              p = U + C[m + Z[D]] | 0, D < 16 ? p += O(X, ue, J) + z[0] : D < 32 ? p += d(X, ue, J) + z[1] : D < 48 ? p += _(X, ue, J) + z[2] : D < 64 ? p += E(X, ue, J) + z[3] : p += M(X, ue, J) + z[4], p = p | 0, p = S(p, ie[D]), p = p + te | 0, U = te, te = J, J = S(ue, 10), ue = X, X = p, p = j + C[m + ne[D]] | 0, D < 16 ? p += M(K, se, q) + V[0] : D < 32 ? p += E(K, se, q) + V[1] : D < 48 ? p += _(K, se, q) + V[2] : D < 64 ? p += d(K, se, q) + V[3] : p += O(K, se, q) + V[4], p = p | 0, p = S(p, R[D]), p = p + l | 0, j = l, l = q, q = S(se, 10), se = K, K = p;
            p = L[1] + ue + q | 0, L[1] = L[2] + J + l | 0, L[2] = L[3] + te + j | 0, L[3] = L[4] + U + K | 0, L[4] = L[0] + X + se | 0, L[0] = p;
          },
          _doFinalize: function() {
            var C = this._data, m = C.words, D = this._nDataBytes * 8, w = C.sigBytes * 8;
            m[w >>> 5] |= 128 << 24 - w % 32, m[(w + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360, C.sigBytes = (m.length + 1) * 4, this._process();
            for (var F = this._hash, L = F.words, z = 0; z < 5; z++) {
              var V = L[z];
              L[z] = (V << 8 | V >>> 24) & 16711935 | (V << 24 | V >>> 8) & 4278255360;
            }
            return F;
          },
          clone: function() {
            var C = a.clone.call(this);
            return C._hash = this._hash.clone(), C;
          }
        });
        function O(C, m, D) {
          return C ^ m ^ D;
        }
        function d(C, m, D) {
          return C & m | ~C & D;
        }
        function _(C, m, D) {
          return (C | ~m) ^ D;
        }
        function E(C, m, D) {
          return C & D | m & ~D;
        }
        function M(C, m, D) {
          return C ^ (m | ~D);
        }
        function S(C, m) {
          return C << m | C >>> 32 - m;
        }
        i.RIPEMD160 = a._createHelper(B), i.HmacRIPEMD160 = a._createHmacHelper(B);
      }(), t.RIPEMD160;
    });
  }(Hi)), Hi.exports;
}
var $i = { exports: {} }, Wa;
function ss() {
  return Wa || (Wa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(me());
    })(Q, function(t) {
      (function() {
        var n = t, i = n.lib, o = i.Base, s = n.enc, a = s.Utf8, f = n.algo;
        f.HMAC = o.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(u, c) {
            u = this._hasher = new u.init(), typeof c == "string" && (c = a.parse(c));
            var h = u.blockSize, y = h * 4;
            c.sigBytes > y && (c = u.finalize(c)), c.clamp();
            for (var T = this._oKey = c.clone(), A = this._iKey = c.clone(), B = T.words, O = A.words, d = 0; d < h; d++)
              B[d] ^= 1549556828, O[d] ^= 909522486;
            T.sigBytes = A.sigBytes = y, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var u = this._hasher;
            u.reset(), u.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(u) {
            return this._hasher.update(u), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(u) {
            var c = this._hasher, h = c.finalize(u);
            c.reset();
            var y = c.finalize(this._oKey.clone().concat(h));
            return y;
          }
        });
      })();
    });
  }($i)), $i.exports;
}
var Wi = { exports: {} }, za;
function P_() {
  return za || (za = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), os(), ss());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.Base, s = i.WordArray, a = n.algo, f = a.SHA256, u = a.HMAC, c = a.PBKDF2 = o.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hasher to use. Default: SHA256
           * @property {number} iterations The number of iterations to perform. Default: 250000
           */
          cfg: o.extend({
            keySize: 128 / 32,
            hasher: f,
            iterations: 25e4
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.PBKDF2.create();
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
           */
          init: function(h) {
            this.cfg = this.cfg.extend(h);
          },
          /**
           * Computes the Password-Based Key Derivation Function 2.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(h, y) {
            for (var T = this.cfg, A = u.create(T.hasher, h), B = s.create(), O = s.create([1]), d = B.words, _ = O.words, E = T.keySize, M = T.iterations; d.length < E; ) {
              var S = A.update(y).finalize(O);
              A.reset();
              for (var C = S.words, m = C.length, D = S, w = 1; w < M; w++) {
                D = A.finalize(D), A.reset();
                for (var F = D.words, L = 0; L < m; L++)
                  C[L] ^= F[L];
              }
              B.concat(S), _[0]++;
            }
            return B.sigBytes = E * 4, B;
          }
        });
        n.PBKDF2 = function(h, y, T) {
          return c.create(T).compute(h, y);
        };
      }(), t.PBKDF2;
    });
  }(Wi)), Wi.exports;
}
var zi = { exports: {} }, Ka;
function Qt() {
  return Ka || (Ka = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), dc(), ss());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.Base, s = i.WordArray, a = n.algo, f = a.MD5, u = a.EvpKDF = o.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: o.extend({
            keySize: 128 / 32,
            hasher: f,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(c) {
            this.cfg = this.cfg.extend(c);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(c, h) {
            for (var y, T = this.cfg, A = T.hasher.create(), B = s.create(), O = B.words, d = T.keySize, _ = T.iterations; O.length < d; ) {
              y && A.update(y), y = A.update(c).finalize(h), A.reset();
              for (var E = 1; E < _; E++)
                y = A.finalize(y), A.reset();
              B.concat(y);
            }
            return B.sigBytes = d * 4, B;
          }
        });
        n.EvpKDF = function(c, h, y) {
          return u.create(y).compute(c, h);
        };
      }(), t.EvpKDF;
    });
  }(zi)), zi.exports;
}
var Ki = { exports: {} }, Va;
function $e() {
  return Va || (Va = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), Qt());
    })(Q, function(t) {
      t.lib.Cipher || function(n) {
        var i = t, o = i.lib, s = o.Base, a = o.WordArray, f = o.BufferedBlockAlgorithm, u = i.enc;
        u.Utf8;
        var c = u.Base64, h = i.algo, y = h.EvpKDF, T = o.Cipher = f.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: s.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(F, L) {
            return this.create(this._ENC_XFORM_MODE, F, L);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(F, L) {
            return this.create(this._DEC_XFORM_MODE, F, L);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(F, L, z) {
            this.cfg = this.cfg.extend(z), this._xformMode = F, this._key = L, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            f.reset.call(this), this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(F) {
            return this._append(F), this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(F) {
            F && this._append(F);
            var L = this._doFinalize();
            return L;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function F(L) {
              return typeof L == "string" ? w : C;
            }
            return function(L) {
              return {
                encrypt: function(z, V, Z) {
                  return F(V).encrypt(L, z, V, Z);
                },
                decrypt: function(z, V, Z) {
                  return F(V).decrypt(L, z, V, Z);
                }
              };
            };
          }()
        });
        o.StreamCipher = T.extend({
          _doFinalize: function() {
            var F = this._process(!0);
            return F;
          },
          blockSize: 1
        });
        var A = i.mode = {}, B = o.BlockCipherMode = s.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(F, L) {
            return this.Encryptor.create(F, L);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(F, L) {
            return this.Decryptor.create(F, L);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(F, L) {
            this._cipher = F, this._iv = L;
          }
        }), O = A.CBC = function() {
          var F = B.extend();
          F.Encryptor = F.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(z, V) {
              var Z = this._cipher, ne = Z.blockSize;
              L.call(this, z, V, ne), Z.encryptBlock(z, V), this._prevBlock = z.slice(V, V + ne);
            }
          }), F.Decryptor = F.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(z, V) {
              var Z = this._cipher, ne = Z.blockSize, ie = z.slice(V, V + ne);
              Z.decryptBlock(z, V), L.call(this, z, V, ne), this._prevBlock = ie;
            }
          });
          function L(z, V, Z) {
            var ne, ie = this._iv;
            ie ? (ne = ie, this._iv = n) : ne = this._prevBlock;
            for (var R = 0; R < Z; R++)
              z[V + R] ^= ne[R];
          }
          return F;
        }(), d = i.pad = {}, _ = d.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(F, L) {
            for (var z = L * 4, V = z - F.sigBytes % z, Z = V << 24 | V << 16 | V << 8 | V, ne = [], ie = 0; ie < V; ie += 4)
              ne.push(Z);
            var R = a.create(ne, V);
            F.concat(R);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(F) {
            var L = F.words[F.sigBytes - 1 >>> 2] & 255;
            F.sigBytes -= L;
          }
        };
        o.BlockCipher = T.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: T.cfg.extend({
            mode: O,
            padding: _
          }),
          reset: function() {
            var F;
            T.reset.call(this);
            var L = this.cfg, z = L.iv, V = L.mode;
            this._xformMode == this._ENC_XFORM_MODE ? F = V.createEncryptor : (F = V.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == F ? this._mode.init(this, z && z.words) : (this._mode = F.call(V, this, z && z.words), this._mode.__creator = F);
          },
          _doProcessBlock: function(F, L) {
            this._mode.processBlock(F, L);
          },
          _doFinalize: function() {
            var F, L = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (L.pad(this._data, this.blockSize), F = this._process(!0)) : (F = this._process(!0), L.unpad(F)), F;
          },
          blockSize: 128 / 32
        });
        var E = o.CipherParams = s.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(F) {
            this.mixIn(F);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(F) {
            return (F || this.formatter).stringify(this);
          }
        }), M = i.format = {}, S = M.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(F) {
            var L, z = F.ciphertext, V = F.salt;
            return V ? L = a.create([1398893684, 1701076831]).concat(V).concat(z) : L = z, L.toString(c);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(F) {
            var L, z = c.parse(F), V = z.words;
            return V[0] == 1398893684 && V[1] == 1701076831 && (L = a.create(V.slice(2, 4)), V.splice(0, 4), z.sigBytes -= 16), E.create({ ciphertext: z, salt: L });
          }
        }, C = o.SerializableCipher = s.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: s.extend({
            format: S
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(F, L, z, V) {
            V = this.cfg.extend(V);
            var Z = F.createEncryptor(z, V), ne = Z.finalize(L), ie = Z.cfg;
            return E.create({
              ciphertext: ne,
              key: z,
              iv: ie.iv,
              algorithm: F,
              mode: ie.mode,
              padding: ie.padding,
              blockSize: F.blockSize,
              formatter: V.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(F, L, z, V) {
            V = this.cfg.extend(V), L = this._parse(L, V.format);
            var Z = F.createDecryptor(z, V).finalize(L.ciphertext);
            return Z;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(F, L) {
            return typeof F == "string" ? L.parse(F, this) : F;
          }
        }), m = i.kdf = {}, D = m.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(F, L, z, V, Z) {
            if (V || (V = a.random(64 / 8)), Z)
              var ne = y.create({ keySize: L + z, hasher: Z }).compute(F, V);
            else
              var ne = y.create({ keySize: L + z }).compute(F, V);
            var ie = a.create(ne.words.slice(L), z * 4);
            return ne.sigBytes = L * 4, E.create({ key: ne, iv: ie, salt: V });
          }
        }, w = o.PasswordBasedCipher = C.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: C.cfg.extend({
            kdf: D
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(F, L, z, V) {
            V = this.cfg.extend(V);
            var Z = V.kdf.execute(z, F.keySize, F.ivSize, V.salt, V.hasher);
            V.iv = Z.iv;
            var ne = C.encrypt.call(this, F, L, Z.key, V);
            return ne.mixIn(Z), ne;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(F, L, z, V) {
            V = this.cfg.extend(V), L = this._parse(L, V.format);
            var Z = V.kdf.execute(z, F.keySize, F.ivSize, L.salt, V.hasher);
            V.iv = Z.iv;
            var ne = C.decrypt.call(this, F, L, Z.key, V);
            return ne;
          }
        });
      }();
    });
  }(Ki)), Ki.exports;
}
var Vi = { exports: {} }, Ga;
function k_() {
  return Ga || (Ga = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.mode.CFB = function() {
        var n = t.lib.BlockCipherMode.extend();
        n.Encryptor = n.extend({
          processBlock: function(o, s) {
            var a = this._cipher, f = a.blockSize;
            i.call(this, o, s, f, a), this._prevBlock = o.slice(s, s + f);
          }
        }), n.Decryptor = n.extend({
          processBlock: function(o, s) {
            var a = this._cipher, f = a.blockSize, u = o.slice(s, s + f);
            i.call(this, o, s, f, a), this._prevBlock = u;
          }
        });
        function i(o, s, a, f) {
          var u, c = this._iv;
          c ? (u = c.slice(0), this._iv = void 0) : u = this._prevBlock, f.encryptBlock(u, 0);
          for (var h = 0; h < a; h++)
            o[s + h] ^= u[h];
        }
        return n;
      }(), t.mode.CFB;
    });
  }(Vi)), Vi.exports;
}
var Gi = { exports: {} }, Qa;
function j_() {
  return Qa || (Qa = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.mode.CTR = function() {
        var n = t.lib.BlockCipherMode.extend(), i = n.Encryptor = n.extend({
          processBlock: function(o, s) {
            var a = this._cipher, f = a.blockSize, u = this._iv, c = this._counter;
            u && (c = this._counter = u.slice(0), this._iv = void 0);
            var h = c.slice(0);
            a.encryptBlock(h, 0), c[f - 1] = c[f - 1] + 1 | 0;
            for (var y = 0; y < f; y++)
              o[s + y] ^= h[y];
          }
        });
        return n.Decryptor = i, n;
      }(), t.mode.CTR;
    });
  }(Gi)), Gi.exports;
}
var Qi = { exports: {} }, Ja;
function U_() {
  return Ja || (Ja = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      /** @preserve
       * Counter block mode compatible with  Dr Brian Gladman fileenc.c
       * derived from CryptoJS.mode.CTR
       * Jan Hruby jhruby.web@gmail.com
       */
      return t.mode.CTRGladman = function() {
        var n = t.lib.BlockCipherMode.extend();
        function i(a) {
          if ((a >> 24 & 255) === 255) {
            var f = a >> 16 & 255, u = a >> 8 & 255, c = a & 255;
            f === 255 ? (f = 0, u === 255 ? (u = 0, c === 255 ? c = 0 : ++c) : ++u) : ++f, a = 0, a += f << 16, a += u << 8, a += c;
          } else
            a += 1 << 24;
          return a;
        }
        function o(a) {
          return (a[0] = i(a[0])) === 0 && (a[1] = i(a[1])), a;
        }
        var s = n.Encryptor = n.extend({
          processBlock: function(a, f) {
            var u = this._cipher, c = u.blockSize, h = this._iv, y = this._counter;
            h && (y = this._counter = h.slice(0), this._iv = void 0), o(y);
            var T = y.slice(0);
            u.encryptBlock(T, 0);
            for (var A = 0; A < c; A++)
              a[f + A] ^= T[A];
          }
        });
        return n.Decryptor = s, n;
      }(), t.mode.CTRGladman;
    });
  }(Qi)), Qi.exports;
}
var Ji = { exports: {} }, Xa;
function L_() {
  return Xa || (Xa = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.mode.OFB = function() {
        var n = t.lib.BlockCipherMode.extend(), i = n.Encryptor = n.extend({
          processBlock: function(o, s) {
            var a = this._cipher, f = a.blockSize, u = this._iv, c = this._keystream;
            u && (c = this._keystream = u.slice(0), this._iv = void 0), a.encryptBlock(c, 0);
            for (var h = 0; h < f; h++)
              o[s + h] ^= c[h];
          }
        });
        return n.Decryptor = i, n;
      }(), t.mode.OFB;
    });
  }(Ji)), Ji.exports;
}
var Xi = { exports: {} }, Ya;
function q_() {
  return Ya || (Ya = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.mode.ECB = function() {
        var n = t.lib.BlockCipherMode.extend();
        return n.Encryptor = n.extend({
          processBlock: function(i, o) {
            this._cipher.encryptBlock(i, o);
          }
        }), n.Decryptor = n.extend({
          processBlock: function(i, o) {
            this._cipher.decryptBlock(i, o);
          }
        }), n;
      }(), t.mode.ECB;
    });
  }(Xi)), Xi.exports;
}
var Yi = { exports: {} }, Za;
function H_() {
  return Za || (Za = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.pad.AnsiX923 = {
        pad: function(n, i) {
          var o = n.sigBytes, s = i * 4, a = s - o % s, f = o + a - 1;
          n.clamp(), n.words[f >>> 2] |= a << 24 - f % 4 * 8, n.sigBytes += a;
        },
        unpad: function(n) {
          var i = n.words[n.sigBytes - 1 >>> 2] & 255;
          n.sigBytes -= i;
        }
      }, t.pad.Ansix923;
    });
  }(Yi)), Yi.exports;
}
var Zi = { exports: {} }, eu;
function $_() {
  return eu || (eu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.pad.Iso10126 = {
        pad: function(n, i) {
          var o = i * 4, s = o - n.sigBytes % o;
          n.concat(t.lib.WordArray.random(s - 1)).concat(t.lib.WordArray.create([s << 24], 1));
        },
        unpad: function(n) {
          var i = n.words[n.sigBytes - 1 >>> 2] & 255;
          n.sigBytes -= i;
        }
      }, t.pad.Iso10126;
    });
  }(Zi)), Zi.exports;
}
var eo = { exports: {} }, tu;
function W_() {
  return tu || (tu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.pad.Iso97971 = {
        pad: function(n, i) {
          n.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(n, i);
        },
        unpad: function(n) {
          t.pad.ZeroPadding.unpad(n), n.sigBytes--;
        }
      }, t.pad.Iso97971;
    });
  }(eo)), eo.exports;
}
var to = { exports: {} }, ru;
function z_() {
  return ru || (ru = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.pad.ZeroPadding = {
        pad: function(n, i) {
          var o = i * 4;
          n.clamp(), n.sigBytes += o - (n.sigBytes % o || o);
        },
        unpad: function(n) {
          for (var i = n.words, o = n.sigBytes - 1, o = n.sigBytes - 1; o >= 0; o--)
            if (i[o >>> 2] >>> 24 - o % 4 * 8 & 255) {
              n.sigBytes = o + 1;
              break;
            }
        }
      }, t.pad.ZeroPadding;
    });
  }(to)), to.exports;
}
var ro = { exports: {} }, nu;
function K_() {
  return nu || (nu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return t.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, t.pad.NoPadding;
    });
  }(ro)), ro.exports;
}
var no = { exports: {} }, iu;
function V_() {
  return iu || (iu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), $e());
    })(Q, function(t) {
      return function(n) {
        var i = t, o = i.lib, s = o.CipherParams, a = i.enc, f = a.Hex, u = i.format;
        u.Hex = {
          /**
           * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The hexadecimally encoded string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
           */
          stringify: function(c) {
            return c.ciphertext.toString(f);
          },
          /**
           * Converts a hexadecimally encoded ciphertext string to a cipher params object.
           *
           * @param {string} input The hexadecimally encoded string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
           */
          parse: function(c) {
            var h = f.parse(c);
            return s.create({ ciphertext: h });
          }
        };
      }(), t.format.Hex;
    });
  }(no)), no.exports;
}
var io = { exports: {} }, ou;
function G_() {
  return ou || (ou = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.BlockCipher, s = n.algo, a = [], f = [], u = [], c = [], h = [], y = [], T = [], A = [], B = [], O = [];
        (function() {
          for (var E = [], M = 0; M < 256; M++)
            M < 128 ? E[M] = M << 1 : E[M] = M << 1 ^ 283;
          for (var S = 0, C = 0, M = 0; M < 256; M++) {
            var m = C ^ C << 1 ^ C << 2 ^ C << 3 ^ C << 4;
            m = m >>> 8 ^ m & 255 ^ 99, a[S] = m, f[m] = S;
            var D = E[S], w = E[D], F = E[w], L = E[m] * 257 ^ m * 16843008;
            u[S] = L << 24 | L >>> 8, c[S] = L << 16 | L >>> 16, h[S] = L << 8 | L >>> 24, y[S] = L;
            var L = F * 16843009 ^ w * 65537 ^ D * 257 ^ S * 16843008;
            T[m] = L << 24 | L >>> 8, A[m] = L << 16 | L >>> 16, B[m] = L << 8 | L >>> 24, O[m] = L, S ? (S = D ^ E[E[E[F ^ D]]], C ^= E[E[C]]) : S = C = 1;
          }
        })();
        var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], _ = s.AES = o.extend({
          _doReset: function() {
            var E;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var M = this._keyPriorReset = this._key, S = M.words, C = M.sigBytes / 4, m = this._nRounds = C + 6, D = (m + 1) * 4, w = this._keySchedule = [], F = 0; F < D; F++)
                F < C ? w[F] = S[F] : (E = w[F - 1], F % C ? C > 6 && F % C == 4 && (E = a[E >>> 24] << 24 | a[E >>> 16 & 255] << 16 | a[E >>> 8 & 255] << 8 | a[E & 255]) : (E = E << 8 | E >>> 24, E = a[E >>> 24] << 24 | a[E >>> 16 & 255] << 16 | a[E >>> 8 & 255] << 8 | a[E & 255], E ^= d[F / C | 0] << 24), w[F] = w[F - C] ^ E);
              for (var L = this._invKeySchedule = [], z = 0; z < D; z++) {
                var F = D - z;
                if (z % 4)
                  var E = w[F];
                else
                  var E = w[F - 4];
                z < 4 || F <= 4 ? L[z] = E : L[z] = T[a[E >>> 24]] ^ A[a[E >>> 16 & 255]] ^ B[a[E >>> 8 & 255]] ^ O[a[E & 255]];
              }
            }
          },
          encryptBlock: function(E, M) {
            this._doCryptBlock(E, M, this._keySchedule, u, c, h, y, a);
          },
          decryptBlock: function(E, M) {
            var S = E[M + 1];
            E[M + 1] = E[M + 3], E[M + 3] = S, this._doCryptBlock(E, M, this._invKeySchedule, T, A, B, O, f);
            var S = E[M + 1];
            E[M + 1] = E[M + 3], E[M + 3] = S;
          },
          _doCryptBlock: function(E, M, S, C, m, D, w, F) {
            for (var L = this._nRounds, z = E[M] ^ S[0], V = E[M + 1] ^ S[1], Z = E[M + 2] ^ S[2], ne = E[M + 3] ^ S[3], ie = 4, R = 1; R < L; R++) {
              var U = C[z >>> 24] ^ m[V >>> 16 & 255] ^ D[Z >>> 8 & 255] ^ w[ne & 255] ^ S[ie++], X = C[V >>> 24] ^ m[Z >>> 16 & 255] ^ D[ne >>> 8 & 255] ^ w[z & 255] ^ S[ie++], ue = C[Z >>> 24] ^ m[ne >>> 16 & 255] ^ D[z >>> 8 & 255] ^ w[V & 255] ^ S[ie++], J = C[ne >>> 24] ^ m[z >>> 16 & 255] ^ D[V >>> 8 & 255] ^ w[Z & 255] ^ S[ie++];
              z = U, V = X, Z = ue, ne = J;
            }
            var U = (F[z >>> 24] << 24 | F[V >>> 16 & 255] << 16 | F[Z >>> 8 & 255] << 8 | F[ne & 255]) ^ S[ie++], X = (F[V >>> 24] << 24 | F[Z >>> 16 & 255] << 16 | F[ne >>> 8 & 255] << 8 | F[z & 255]) ^ S[ie++], ue = (F[Z >>> 24] << 24 | F[ne >>> 16 & 255] << 16 | F[z >>> 8 & 255] << 8 | F[V & 255]) ^ S[ie++], J = (F[ne >>> 24] << 24 | F[z >>> 16 & 255] << 16 | F[V >>> 8 & 255] << 8 | F[Z & 255]) ^ S[ie++];
            E[M] = U, E[M + 1] = X, E[M + 2] = ue, E[M + 3] = J;
          },
          keySize: 256 / 32
        });
        n.AES = o._createHelper(_);
      }(), t.AES;
    });
  }(io)), io.exports;
}
var oo = { exports: {} }, su;
function Q_() {
  return su || (su = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.WordArray, s = i.BlockCipher, a = n.algo, f = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36,
          63,
          55,
          47,
          39,
          31,
          23,
          15,
          7,
          62,
          54,
          46,
          38,
          30,
          22,
          14,
          6,
          61,
          53,
          45,
          37,
          29,
          21,
          13,
          5,
          28,
          20,
          12,
          4
        ], u = [
          14,
          17,
          11,
          24,
          1,
          5,
          3,
          28,
          15,
          6,
          21,
          10,
          23,
          19,
          12,
          4,
          26,
          8,
          16,
          7,
          27,
          20,
          13,
          2,
          41,
          52,
          31,
          37,
          47,
          55,
          30,
          40,
          51,
          45,
          33,
          48,
          44,
          49,
          39,
          56,
          34,
          53,
          46,
          42,
          50,
          36,
          29,
          32
        ], c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], h = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ], y = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ], T = a.DES = s.extend({
          _doReset: function() {
            for (var d = this._key, _ = d.words, E = [], M = 0; M < 56; M++) {
              var S = f[M] - 1;
              E[M] = _[S >>> 5] >>> 31 - S % 32 & 1;
            }
            for (var C = this._subKeys = [], m = 0; m < 16; m++) {
              for (var D = C[m] = [], w = c[m], M = 0; M < 24; M++)
                D[M / 6 | 0] |= E[(u[M] - 1 + w) % 28] << 31 - M % 6, D[4 + (M / 6 | 0)] |= E[28 + (u[M + 24] - 1 + w) % 28] << 31 - M % 6;
              D[0] = D[0] << 1 | D[0] >>> 31;
              for (var M = 1; M < 7; M++)
                D[M] = D[M] >>> (M - 1) * 4 + 3;
              D[7] = D[7] << 5 | D[7] >>> 27;
            }
            for (var F = this._invSubKeys = [], M = 0; M < 16; M++)
              F[M] = C[15 - M];
          },
          encryptBlock: function(d, _) {
            this._doCryptBlock(d, _, this._subKeys);
          },
          decryptBlock: function(d, _) {
            this._doCryptBlock(d, _, this._invSubKeys);
          },
          _doCryptBlock: function(d, _, E) {
            this._lBlock = d[_], this._rBlock = d[_ + 1], A.call(this, 4, 252645135), A.call(this, 16, 65535), B.call(this, 2, 858993459), B.call(this, 8, 16711935), A.call(this, 1, 1431655765);
            for (var M = 0; M < 16; M++) {
              for (var S = E[M], C = this._lBlock, m = this._rBlock, D = 0, w = 0; w < 8; w++)
                D |= h[w][((m ^ S[w]) & y[w]) >>> 0];
              this._lBlock = m, this._rBlock = C ^ D;
            }
            var F = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = F, A.call(this, 1, 1431655765), B.call(this, 8, 16711935), B.call(this, 2, 858993459), A.call(this, 16, 65535), A.call(this, 4, 252645135), d[_] = this._lBlock, d[_ + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function A(d, _) {
          var E = (this._lBlock >>> d ^ this._rBlock) & _;
          this._rBlock ^= E, this._lBlock ^= E << d;
        }
        function B(d, _) {
          var E = (this._rBlock >>> d ^ this._lBlock) & _;
          this._lBlock ^= E, this._rBlock ^= E << d;
        }
        n.DES = s._createHelper(T);
        var O = a.TripleDES = s.extend({
          _doReset: function() {
            var d = this._key, _ = d.words;
            if (_.length !== 2 && _.length !== 4 && _.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var E = _.slice(0, 2), M = _.length < 4 ? _.slice(0, 2) : _.slice(2, 4), S = _.length < 6 ? _.slice(0, 2) : _.slice(4, 6);
            this._des1 = T.createEncryptor(o.create(E)), this._des2 = T.createEncryptor(o.create(M)), this._des3 = T.createEncryptor(o.create(S));
          },
          encryptBlock: function(d, _) {
            this._des1.encryptBlock(d, _), this._des2.decryptBlock(d, _), this._des3.encryptBlock(d, _);
          },
          decryptBlock: function(d, _) {
            this._des3.decryptBlock(d, _), this._des2.encryptBlock(d, _), this._des1.decryptBlock(d, _);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        n.TripleDES = s._createHelper(O);
      }(), t.TripleDES;
    });
  }(oo)), oo.exports;
}
var so = { exports: {} }, au;
function J_() {
  return au || (au = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.StreamCipher, s = n.algo, a = s.RC4 = o.extend({
          _doReset: function() {
            for (var c = this._key, h = c.words, y = c.sigBytes, T = this._S = [], A = 0; A < 256; A++)
              T[A] = A;
            for (var A = 0, B = 0; A < 256; A++) {
              var O = A % y, d = h[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              B = (B + T[A] + d) % 256;
              var _ = T[A];
              T[A] = T[B], T[B] = _;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(c, h) {
            c[h] ^= f.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function f() {
          for (var c = this._S, h = this._i, y = this._j, T = 0, A = 0; A < 4; A++) {
            h = (h + 1) % 256, y = (y + c[h]) % 256;
            var B = c[h];
            c[h] = c[y], c[y] = B, T |= c[(c[h] + c[y]) % 256] << 24 - A * 8;
          }
          return this._i = h, this._j = y, T;
        }
        n.RC4 = o._createHelper(a);
        var u = s.RC4Drop = a.extend({
          /**
           * Configuration options.
           *
           * @property {number} drop The number of keystream words to drop. Default 192
           */
          cfg: a.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            a._doReset.call(this);
            for (var c = this.cfg.drop; c > 0; c--)
              f.call(this);
          }
        });
        n.RC4Drop = o._createHelper(u);
      }(), t.RC4;
    });
  }(so)), so.exports;
}
var ao = { exports: {} }, uu;
function X_() {
  return uu || (uu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.StreamCipher, s = n.algo, a = [], f = [], u = [], c = s.Rabbit = o.extend({
          _doReset: function() {
            for (var y = this._key.words, T = this.cfg.iv, A = 0; A < 4; A++)
              y[A] = (y[A] << 8 | y[A] >>> 24) & 16711935 | (y[A] << 24 | y[A] >>> 8) & 4278255360;
            var B = this._X = [
              y[0],
              y[3] << 16 | y[2] >>> 16,
              y[1],
              y[0] << 16 | y[3] >>> 16,
              y[2],
              y[1] << 16 | y[0] >>> 16,
              y[3],
              y[2] << 16 | y[1] >>> 16
            ], O = this._C = [
              y[2] << 16 | y[2] >>> 16,
              y[0] & 4294901760 | y[1] & 65535,
              y[3] << 16 | y[3] >>> 16,
              y[1] & 4294901760 | y[2] & 65535,
              y[0] << 16 | y[0] >>> 16,
              y[2] & 4294901760 | y[3] & 65535,
              y[1] << 16 | y[1] >>> 16,
              y[3] & 4294901760 | y[0] & 65535
            ];
            this._b = 0;
            for (var A = 0; A < 4; A++)
              h.call(this);
            for (var A = 0; A < 8; A++)
              O[A] ^= B[A + 4 & 7];
            if (T) {
              var d = T.words, _ = d[0], E = d[1], M = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, S = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, C = M >>> 16 | S & 4294901760, m = S << 16 | M & 65535;
              O[0] ^= M, O[1] ^= C, O[2] ^= S, O[3] ^= m, O[4] ^= M, O[5] ^= C, O[6] ^= S, O[7] ^= m;
              for (var A = 0; A < 4; A++)
                h.call(this);
            }
          },
          _doProcessBlock: function(y, T) {
            var A = this._X;
            h.call(this), a[0] = A[0] ^ A[5] >>> 16 ^ A[3] << 16, a[1] = A[2] ^ A[7] >>> 16 ^ A[5] << 16, a[2] = A[4] ^ A[1] >>> 16 ^ A[7] << 16, a[3] = A[6] ^ A[3] >>> 16 ^ A[1] << 16;
            for (var B = 0; B < 4; B++)
              a[B] = (a[B] << 8 | a[B] >>> 24) & 16711935 | (a[B] << 24 | a[B] >>> 8) & 4278255360, y[T + B] ^= a[B];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function h() {
          for (var y = this._X, T = this._C, A = 0; A < 8; A++)
            f[A] = T[A];
          T[0] = T[0] + 1295307597 + this._b | 0, T[1] = T[1] + 3545052371 + (T[0] >>> 0 < f[0] >>> 0 ? 1 : 0) | 0, T[2] = T[2] + 886263092 + (T[1] >>> 0 < f[1] >>> 0 ? 1 : 0) | 0, T[3] = T[3] + 1295307597 + (T[2] >>> 0 < f[2] >>> 0 ? 1 : 0) | 0, T[4] = T[4] + 3545052371 + (T[3] >>> 0 < f[3] >>> 0 ? 1 : 0) | 0, T[5] = T[5] + 886263092 + (T[4] >>> 0 < f[4] >>> 0 ? 1 : 0) | 0, T[6] = T[6] + 1295307597 + (T[5] >>> 0 < f[5] >>> 0 ? 1 : 0) | 0, T[7] = T[7] + 3545052371 + (T[6] >>> 0 < f[6] >>> 0 ? 1 : 0) | 0, this._b = T[7] >>> 0 < f[7] >>> 0 ? 1 : 0;
          for (var A = 0; A < 8; A++) {
            var B = y[A] + T[A], O = B & 65535, d = B >>> 16, _ = ((O * O >>> 17) + O * d >>> 15) + d * d, E = ((B & 4294901760) * B | 0) + ((B & 65535) * B | 0);
            u[A] = _ ^ E;
          }
          y[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0, y[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0, y[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0, y[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0, y[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0, y[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0, y[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0, y[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0;
        }
        n.Rabbit = o._createHelper(c);
      }(), t.Rabbit;
    });
  }(ao)), ao.exports;
}
var uo = { exports: {} }, fu;
function Y_() {
  return fu || (fu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.StreamCipher, s = n.algo, a = [], f = [], u = [], c = s.RabbitLegacy = o.extend({
          _doReset: function() {
            var y = this._key.words, T = this.cfg.iv, A = this._X = [
              y[0],
              y[3] << 16 | y[2] >>> 16,
              y[1],
              y[0] << 16 | y[3] >>> 16,
              y[2],
              y[1] << 16 | y[0] >>> 16,
              y[3],
              y[2] << 16 | y[1] >>> 16
            ], B = this._C = [
              y[2] << 16 | y[2] >>> 16,
              y[0] & 4294901760 | y[1] & 65535,
              y[3] << 16 | y[3] >>> 16,
              y[1] & 4294901760 | y[2] & 65535,
              y[0] << 16 | y[0] >>> 16,
              y[2] & 4294901760 | y[3] & 65535,
              y[1] << 16 | y[1] >>> 16,
              y[3] & 4294901760 | y[0] & 65535
            ];
            this._b = 0;
            for (var O = 0; O < 4; O++)
              h.call(this);
            for (var O = 0; O < 8; O++)
              B[O] ^= A[O + 4 & 7];
            if (T) {
              var d = T.words, _ = d[0], E = d[1], M = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, S = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, C = M >>> 16 | S & 4294901760, m = S << 16 | M & 65535;
              B[0] ^= M, B[1] ^= C, B[2] ^= S, B[3] ^= m, B[4] ^= M, B[5] ^= C, B[6] ^= S, B[7] ^= m;
              for (var O = 0; O < 4; O++)
                h.call(this);
            }
          },
          _doProcessBlock: function(y, T) {
            var A = this._X;
            h.call(this), a[0] = A[0] ^ A[5] >>> 16 ^ A[3] << 16, a[1] = A[2] ^ A[7] >>> 16 ^ A[5] << 16, a[2] = A[4] ^ A[1] >>> 16 ^ A[7] << 16, a[3] = A[6] ^ A[3] >>> 16 ^ A[1] << 16;
            for (var B = 0; B < 4; B++)
              a[B] = (a[B] << 8 | a[B] >>> 24) & 16711935 | (a[B] << 24 | a[B] >>> 8) & 4278255360, y[T + B] ^= a[B];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function h() {
          for (var y = this._X, T = this._C, A = 0; A < 8; A++)
            f[A] = T[A];
          T[0] = T[0] + 1295307597 + this._b | 0, T[1] = T[1] + 3545052371 + (T[0] >>> 0 < f[0] >>> 0 ? 1 : 0) | 0, T[2] = T[2] + 886263092 + (T[1] >>> 0 < f[1] >>> 0 ? 1 : 0) | 0, T[3] = T[3] + 1295307597 + (T[2] >>> 0 < f[2] >>> 0 ? 1 : 0) | 0, T[4] = T[4] + 3545052371 + (T[3] >>> 0 < f[3] >>> 0 ? 1 : 0) | 0, T[5] = T[5] + 886263092 + (T[4] >>> 0 < f[4] >>> 0 ? 1 : 0) | 0, T[6] = T[6] + 1295307597 + (T[5] >>> 0 < f[5] >>> 0 ? 1 : 0) | 0, T[7] = T[7] + 3545052371 + (T[6] >>> 0 < f[6] >>> 0 ? 1 : 0) | 0, this._b = T[7] >>> 0 < f[7] >>> 0 ? 1 : 0;
          for (var A = 0; A < 8; A++) {
            var B = y[A] + T[A], O = B & 65535, d = B >>> 16, _ = ((O * O >>> 17) + O * d >>> 15) + d * d, E = ((B & 4294901760) * B | 0) + ((B & 65535) * B | 0);
            u[A] = _ ^ E;
          }
          y[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0, y[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0, y[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0, y[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0, y[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0, y[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0, y[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0, y[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0;
        }
        n.RabbitLegacy = o._createHelper(c);
      }(), t.RabbitLegacy;
    });
  }(uo)), uo.exports;
}
var fo = { exports: {} }, cu;
function Z_() {
  return cu || (cu = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(me(), sr(), ar(), Qt(), $e());
    })(Q, function(t) {
      return function() {
        var n = t, i = n.lib, o = i.BlockCipher, s = n.algo;
        const a = 16, f = [
          608135816,
          2242054355,
          320440878,
          57701188,
          2752067618,
          698298832,
          137296536,
          3964562569,
          1160258022,
          953160567,
          3193202383,
          887688300,
          3232508343,
          3380367581,
          1065670069,
          3041331479,
          2450970073,
          2306472731
        ], u = [
          [
            3509652390,
            2564797868,
            805139163,
            3491422135,
            3101798381,
            1780907670,
            3128725573,
            4046225305,
            614570311,
            3012652279,
            134345442,
            2240740374,
            1667834072,
            1901547113,
            2757295779,
            4103290238,
            227898511,
            1921955416,
            1904987480,
            2182433518,
            2069144605,
            3260701109,
            2620446009,
            720527379,
            3318853667,
            677414384,
            3393288472,
            3101374703,
            2390351024,
            1614419982,
            1822297739,
            2954791486,
            3608508353,
            3174124327,
            2024746970,
            1432378464,
            3864339955,
            2857741204,
            1464375394,
            1676153920,
            1439316330,
            715854006,
            3033291828,
            289532110,
            2706671279,
            2087905683,
            3018724369,
            1668267050,
            732546397,
            1947742710,
            3462151702,
            2609353502,
            2950085171,
            1814351708,
            2050118529,
            680887927,
            999245976,
            1800124847,
            3300911131,
            1713906067,
            1641548236,
            4213287313,
            1216130144,
            1575780402,
            4018429277,
            3917837745,
            3693486850,
            3949271944,
            596196993,
            3549867205,
            258830323,
            2213823033,
            772490370,
            2760122372,
            1774776394,
            2652871518,
            566650946,
            4142492826,
            1728879713,
            2882767088,
            1783734482,
            3629395816,
            2517608232,
            2874225571,
            1861159788,
            326777828,
            3124490320,
            2130389656,
            2716951837,
            967770486,
            1724537150,
            2185432712,
            2364442137,
            1164943284,
            2105845187,
            998989502,
            3765401048,
            2244026483,
            1075463327,
            1455516326,
            1322494562,
            910128902,
            469688178,
            1117454909,
            936433444,
            3490320968,
            3675253459,
            1240580251,
            122909385,
            2157517691,
            634681816,
            4142456567,
            3825094682,
            3061402683,
            2540495037,
            79693498,
            3249098678,
            1084186820,
            1583128258,
            426386531,
            1761308591,
            1047286709,
            322548459,
            995290223,
            1845252383,
            2603652396,
            3431023940,
            2942221577,
            3202600964,
            3727903485,
            1712269319,
            422464435,
            3234572375,
            1170764815,
            3523960633,
            3117677531,
            1434042557,
            442511882,
            3600875718,
            1076654713,
            1738483198,
            4213154764,
            2393238008,
            3677496056,
            1014306527,
            4251020053,
            793779912,
            2902807211,
            842905082,
            4246964064,
            1395751752,
            1040244610,
            2656851899,
            3396308128,
            445077038,
            3742853595,
            3577915638,
            679411651,
            2892444358,
            2354009459,
            1767581616,
            3150600392,
            3791627101,
            3102740896,
            284835224,
            4246832056,
            1258075500,
            768725851,
            2589189241,
            3069724005,
            3532540348,
            1274779536,
            3789419226,
            2764799539,
            1660621633,
            3471099624,
            4011903706,
            913787905,
            3497959166,
            737222580,
            2514213453,
            2928710040,
            3937242737,
            1804850592,
            3499020752,
            2949064160,
            2386320175,
            2390070455,
            2415321851,
            4061277028,
            2290661394,
            2416832540,
            1336762016,
            1754252060,
            3520065937,
            3014181293,
            791618072,
            3188594551,
            3933548030,
            2332172193,
            3852520463,
            3043980520,
            413987798,
            3465142937,
            3030929376,
            4245938359,
            2093235073,
            3534596313,
            375366246,
            2157278981,
            2479649556,
            555357303,
            3870105701,
            2008414854,
            3344188149,
            4221384143,
            3956125452,
            2067696032,
            3594591187,
            2921233993,
            2428461,
            544322398,
            577241275,
            1471733935,
            610547355,
            4027169054,
            1432588573,
            1507829418,
            2025931657,
            3646575487,
            545086370,
            48609733,
            2200306550,
            1653985193,
            298326376,
            1316178497,
            3007786442,
            2064951626,
            458293330,
            2589141269,
            3591329599,
            3164325604,
            727753846,
            2179363840,
            146436021,
            1461446943,
            4069977195,
            705550613,
            3059967265,
            3887724982,
            4281599278,
            3313849956,
            1404054877,
            2845806497,
            146425753,
            1854211946
          ],
          [
            1266315497,
            3048417604,
            3681880366,
            3289982499,
            290971e4,
            1235738493,
            2632868024,
            2414719590,
            3970600049,
            1771706367,
            1449415276,
            3266420449,
            422970021,
            1963543593,
            2690192192,
            3826793022,
            1062508698,
            1531092325,
            1804592342,
            2583117782,
            2714934279,
            4024971509,
            1294809318,
            4028980673,
            1289560198,
            2221992742,
            1669523910,
            35572830,
            157838143,
            1052438473,
            1016535060,
            1802137761,
            1753167236,
            1386275462,
            3080475397,
            2857371447,
            1040679964,
            2145300060,
            2390574316,
            1461121720,
            2956646967,
            4031777805,
            4028374788,
            33600511,
            2920084762,
            1018524850,
            629373528,
            3691585981,
            3515945977,
            2091462646,
            2486323059,
            586499841,
            988145025,
            935516892,
            3367335476,
            2599673255,
            2839830854,
            265290510,
            3972581182,
            2759138881,
            3795373465,
            1005194799,
            847297441,
            406762289,
            1314163512,
            1332590856,
            1866599683,
            4127851711,
            750260880,
            613907577,
            1450815602,
            3165620655,
            3734664991,
            3650291728,
            3012275730,
            3704569646,
            1427272223,
            778793252,
            1343938022,
            2676280711,
            2052605720,
            1946737175,
            3164576444,
            3914038668,
            3967478842,
            3682934266,
            1661551462,
            3294938066,
            4011595847,
            840292616,
            3712170807,
            616741398,
            312560963,
            711312465,
            1351876610,
            322626781,
            1910503582,
            271666773,
            2175563734,
            1594956187,
            70604529,
            3617834859,
            1007753275,
            1495573769,
            4069517037,
            2549218298,
            2663038764,
            504708206,
            2263041392,
            3941167025,
            2249088522,
            1514023603,
            1998579484,
            1312622330,
            694541497,
            2582060303,
            2151582166,
            1382467621,
            776784248,
            2618340202,
            3323268794,
            2497899128,
            2784771155,
            503983604,
            4076293799,
            907881277,
            423175695,
            432175456,
            1378068232,
            4145222326,
            3954048622,
            3938656102,
            3820766613,
            2793130115,
            2977904593,
            26017576,
            3274890735,
            3194772133,
            1700274565,
            1756076034,
            4006520079,
            3677328699,
            720338349,
            1533947780,
            354530856,
            688349552,
            3973924725,
            1637815568,
            332179504,
            3949051286,
            53804574,
            2852348879,
            3044236432,
            1282449977,
            3583942155,
            3416972820,
            4006381244,
            1617046695,
            2628476075,
            3002303598,
            1686838959,
            431878346,
            2686675385,
            1700445008,
            1080580658,
            1009431731,
            832498133,
            3223435511,
            2605976345,
            2271191193,
            2516031870,
            1648197032,
            4164389018,
            2548247927,
            300782431,
            375919233,
            238389289,
            3353747414,
            2531188641,
            2019080857,
            1475708069,
            455242339,
            2609103871,
            448939670,
            3451063019,
            1395535956,
            2413381860,
            1841049896,
            1491858159,
            885456874,
            4264095073,
            4001119347,
            1565136089,
            3898914787,
            1108368660,
            540939232,
            1173283510,
            2745871338,
            3681308437,
            4207628240,
            3343053890,
            4016749493,
            1699691293,
            1103962373,
            3625875870,
            2256883143,
            3830138730,
            1031889488,
            3479347698,
            1535977030,
            4236805024,
            3251091107,
            2132092099,
            1774941330,
            1199868427,
            1452454533,
            157007616,
            2904115357,
            342012276,
            595725824,
            1480756522,
            206960106,
            497939518,
            591360097,
            863170706,
            2375253569,
            3596610801,
            1814182875,
            2094937945,
            3421402208,
            1082520231,
            3463918190,
            2785509508,
            435703966,
            3908032597,
            1641649973,
            2842273706,
            3305899714,
            1510255612,
            2148256476,
            2655287854,
            3276092548,
            4258621189,
            236887753,
            3681803219,
            274041037,
            1734335097,
            3815195456,
            3317970021,
            1899903192,
            1026095262,
            4050517792,
            356393447,
            2410691914,
            3873677099,
            3682840055
          ],
          [
            3913112168,
            2491498743,
            4132185628,
            2489919796,
            1091903735,
            1979897079,
            3170134830,
            3567386728,
            3557303409,
            857797738,
            1136121015,
            1342202287,
            507115054,
            2535736646,
            337727348,
            3213592640,
            1301675037,
            2528481711,
            1895095763,
            1721773893,
            3216771564,
            62756741,
            2142006736,
            835421444,
            2531993523,
            1442658625,
            3659876326,
            2882144922,
            676362277,
            1392781812,
            170690266,
            3921047035,
            1759253602,
            3611846912,
            1745797284,
            664899054,
            1329594018,
            3901205900,
            3045908486,
            2062866102,
            2865634940,
            3543621612,
            3464012697,
            1080764994,
            553557557,
            3656615353,
            3996768171,
            991055499,
            499776247,
            1265440854,
            648242737,
            3940784050,
            980351604,
            3713745714,
            1749149687,
            3396870395,
            4211799374,
            3640570775,
            1161844396,
            3125318951,
            1431517754,
            545492359,
            4268468663,
            3499529547,
            1437099964,
            2702547544,
            3433638243,
            2581715763,
            2787789398,
            1060185593,
            1593081372,
            2418618748,
            4260947970,
            69676912,
            2159744348,
            86519011,
            2512459080,
            3838209314,
            1220612927,
            3339683548,
            133810670,
            1090789135,
            1078426020,
            1569222167,
            845107691,
            3583754449,
            4072456591,
            1091646820,
            628848692,
            1613405280,
            3757631651,
            526609435,
            236106946,
            48312990,
            2942717905,
            3402727701,
            1797494240,
            859738849,
            992217954,
            4005476642,
            2243076622,
            3870952857,
            3732016268,
            765654824,
            3490871365,
            2511836413,
            1685915746,
            3888969200,
            1414112111,
            2273134842,
            3281911079,
            4080962846,
            172450625,
            2569994100,
            980381355,
            4109958455,
            2819808352,
            2716589560,
            2568741196,
            3681446669,
            3329971472,
            1835478071,
            660984891,
            3704678404,
            4045999559,
            3422617507,
            3040415634,
            1762651403,
            1719377915,
            3470491036,
            2693910283,
            3642056355,
            3138596744,
            1364962596,
            2073328063,
            1983633131,
            926494387,
            3423689081,
            2150032023,
            4096667949,
            1749200295,
            3328846651,
            309677260,
            2016342300,
            1779581495,
            3079819751,
            111262694,
            1274766160,
            443224088,
            298511866,
            1025883608,
            3806446537,
            1145181785,
            168956806,
            3641502830,
            3584813610,
            1689216846,
            3666258015,
            3200248200,
            1692713982,
            2646376535,
            4042768518,
            1618508792,
            1610833997,
            3523052358,
            4130873264,
            2001055236,
            3610705100,
            2202168115,
            4028541809,
            2961195399,
            1006657119,
            2006996926,
            3186142756,
            1430667929,
            3210227297,
            1314452623,
            4074634658,
            4101304120,
            2273951170,
            1399257539,
            3367210612,
            3027628629,
            1190975929,
            2062231137,
            2333990788,
            2221543033,
            2438960610,
            1181637006,
            548689776,
            2362791313,
            3372408396,
            3104550113,
            3145860560,
            296247880,
            1970579870,
            3078560182,
            3769228297,
            1714227617,
            3291629107,
            3898220290,
            166772364,
            1251581989,
            493813264,
            448347421,
            195405023,
            2709975567,
            677966185,
            3703036547,
            1463355134,
            2715995803,
            1338867538,
            1343315457,
            2802222074,
            2684532164,
            233230375,
            2599980071,
            2000651841,
            3277868038,
            1638401717,
            4028070440,
            3237316320,
            6314154,
            819756386,
            300326615,
            590932579,
            1405279636,
            3267499572,
            3150704214,
            2428286686,
            3959192993,
            3461946742,
            1862657033,
            1266418056,
            963775037,
            2089974820,
            2263052895,
            1917689273,
            448879540,
            3550394620,
            3981727096,
            150775221,
            3627908307,
            1303187396,
            508620638,
            2975983352,
            2726630617,
            1817252668,
            1876281319,
            1457606340,
            908771278,
            3720792119,
            3617206836,
            2455994898,
            1729034894,
            1080033504
          ],
          [
            976866871,
            3556439503,
            2881648439,
            1522871579,
            1555064734,
            1336096578,
            3548522304,
            2579274686,
            3574697629,
            3205460757,
            3593280638,
            3338716283,
            3079412587,
            564236357,
            2993598910,
            1781952180,
            1464380207,
            3163844217,
            3332601554,
            1699332808,
            1393555694,
            1183702653,
            3581086237,
            1288719814,
            691649499,
            2847557200,
            2895455976,
            3193889540,
            2717570544,
            1781354906,
            1676643554,
            2592534050,
            3230253752,
            1126444790,
            2770207658,
            2633158820,
            2210423226,
            2615765581,
            2414155088,
            3127139286,
            673620729,
            2805611233,
            1269405062,
            4015350505,
            3341807571,
            4149409754,
            1057255273,
            2012875353,
            2162469141,
            2276492801,
            2601117357,
            993977747,
            3918593370,
            2654263191,
            753973209,
            36408145,
            2530585658,
            25011837,
            3520020182,
            2088578344,
            530523599,
            2918365339,
            1524020338,
            1518925132,
            3760827505,
            3759777254,
            1202760957,
            3985898139,
            3906192525,
            674977740,
            4174734889,
            2031300136,
            2019492241,
            3983892565,
            4153806404,
            3822280332,
            352677332,
            2297720250,
            60907813,
            90501309,
            3286998549,
            1016092578,
            2535922412,
            2839152426,
            457141659,
            509813237,
            4120667899,
            652014361,
            1966332200,
            2975202805,
            55981186,
            2327461051,
            676427537,
            3255491064,
            2882294119,
            3433927263,
            1307055953,
            942726286,
            933058658,
            2468411793,
            3933900994,
            4215176142,
            1361170020,
            2001714738,
            2830558078,
            3274259782,
            1222529897,
            1679025792,
            2729314320,
            3714953764,
            1770335741,
            151462246,
            3013232138,
            1682292957,
            1483529935,
            471910574,
            1539241949,
            458788160,
            3436315007,
            1807016891,
            3718408830,
            978976581,
            1043663428,
            3165965781,
            1927990952,
            4200891579,
            2372276910,
            3208408903,
            3533431907,
            1412390302,
            2931980059,
            4132332400,
            1947078029,
            3881505623,
            4168226417,
            2941484381,
            1077988104,
            1320477388,
            886195818,
            18198404,
            3786409e3,
            2509781533,
            112762804,
            3463356488,
            1866414978,
            891333506,
            18488651,
            661792760,
            1628790961,
            3885187036,
            3141171499,
            876946877,
            2693282273,
            1372485963,
            791857591,
            2686433993,
            3759982718,
            3167212022,
            3472953795,
            2716379847,
            445679433,
            3561995674,
            3504004811,
            3574258232,
            54117162,
            3331405415,
            2381918588,
            3769707343,
            4154350007,
            1140177722,
            4074052095,
            668550556,
            3214352940,
            367459370,
            261225585,
            2610173221,
            4209349473,
            3468074219,
            3265815641,
            314222801,
            3066103646,
            3808782860,
            282218597,
            3406013506,
            3773591054,
            379116347,
            1285071038,
            846784868,
            2669647154,
            3771962079,
            3550491691,
            2305946142,
            453669953,
            1268987020,
            3317592352,
            3279303384,
            3744833421,
            2610507566,
            3859509063,
            266596637,
            3847019092,
            517658769,
            3462560207,
            3443424879,
            370717030,
            4247526661,
            2224018117,
            4143653529,
            4112773975,
            2788324899,
            2477274417,
            1456262402,
            2901442914,
            1517677493,
            1846949527,
            2295493580,
            3734397586,
            2176403920,
            1280348187,
            1908823572,
            3871786941,
            846861322,
            1172426758,
            3287448474,
            3383383037,
            1655181056,
            3139813346,
            901632758,
            1897031941,
            2986607138,
            3066810236,
            3447102507,
            1393639104,
            373351379,
            950779232,
            625454576,
            3124240540,
            4148612726,
            2007998917,
            544563296,
            2244738638,
            2330496472,
            2058025392,
            1291430526,
            424198748,
            50039436,
            29584100,
            3605783033,
            2429876329,
            2791104160,
            1057563949,
            3255363231,
            3075367218,
            3463963227,
            1469046755,
            985887462
          ]
        ];
        var c = {
          pbox: [],
          sbox: []
        };
        function h(O, d) {
          let _ = d >> 24 & 255, E = d >> 16 & 255, M = d >> 8 & 255, S = d & 255, C = O.sbox[0][_] + O.sbox[1][E];
          return C = C ^ O.sbox[2][M], C = C + O.sbox[3][S], C;
        }
        function y(O, d, _) {
          let E = d, M = _, S;
          for (let C = 0; C < a; ++C)
            E = E ^ O.pbox[C], M = h(O, E) ^ M, S = E, E = M, M = S;
          return S = E, E = M, M = S, M = M ^ O.pbox[a], E = E ^ O.pbox[a + 1], { left: E, right: M };
        }
        function T(O, d, _) {
          let E = d, M = _, S;
          for (let C = a + 1; C > 1; --C)
            E = E ^ O.pbox[C], M = h(O, E) ^ M, S = E, E = M, M = S;
          return S = E, E = M, M = S, M = M ^ O.pbox[1], E = E ^ O.pbox[0], { left: E, right: M };
        }
        function A(O, d, _) {
          for (let m = 0; m < 4; m++) {
            O.sbox[m] = [];
            for (let D = 0; D < 256; D++)
              O.sbox[m][D] = u[m][D];
          }
          let E = 0;
          for (let m = 0; m < a + 2; m++)
            O.pbox[m] = f[m] ^ d[E], E++, E >= _ && (E = 0);
          let M = 0, S = 0, C = 0;
          for (let m = 0; m < a + 2; m += 2)
            C = y(O, M, S), M = C.left, S = C.right, O.pbox[m] = M, O.pbox[m + 1] = S;
          for (let m = 0; m < 4; m++)
            for (let D = 0; D < 256; D += 2)
              C = y(O, M, S), M = C.left, S = C.right, O.sbox[m][D] = M, O.sbox[m][D + 1] = S;
          return !0;
        }
        var B = s.Blowfish = o.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var O = this._keyPriorReset = this._key, d = O.words, _ = O.sigBytes / 4;
              A(c, d, _);
            }
          },
          encryptBlock: function(O, d) {
            var _ = y(c, O[d], O[d + 1]);
            O[d] = _.left, O[d + 1] = _.right;
          },
          decryptBlock: function(O, d) {
            var _ = T(c, O[d], O[d + 1]);
            O[d] = _.left, O[d + 1] = _.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        n.Blowfish = o._createHelper(B);
      }(), t.Blowfish;
    });
  }(fo)), fo.exports;
}
(function(r, e) {
  (function(t, n, i) {
    r.exports = n(me(), jn(), D_(), F_(), sr(), O_(), ar(), dc(), os(), M_(), pc(), I_(), N_(), R_(), ss(), P_(), Qt(), $e(), k_(), j_(), U_(), L_(), q_(), H_(), $_(), W_(), z_(), K_(), V_(), G_(), Q_(), J_(), X_(), Y_(), Z_());
  })(Q, function(t) {
    return t;
  });
})(hc);
var _c = hc.exports, He = {}, ev = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), tv = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), vc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && ev(e, r, t);
  return tv(e, r), e;
};
Object.defineProperty(He, "__esModule", { value: !0 });
He.extractRegionFromEndpoint = He.buildMqtt5FinalUsername = He.canonicalizeCustomAuthConfig = He.canonicalizeCustomAuthTokenSignature = He.populate_username_string_with_custom_authorizer = He.is_string_and_not_empty = He.add_to_username_parameter = void 0;
var rv = vc(nt), lr = vc(Qr);
function cn(r, e, t) {
  var n = r;
  return n.indexOf("?") != -1 ? n += "&" : n += "?", e.indexOf(t) != -1 ? n + e : n + t + e;
}
He.add_to_username_parameter = cn;
function dt(r) {
  return r != null && typeof r == "string" && r != "";
}
He.is_string_and_not_empty = dt;
function nv(r, e, t, n, i, o, s) {
  var a = "";
  if (r && (a += r), dt(e) == !1 ? dt(i) && i && (a += i) : a += e, dt(t) && t && (a = cn(a, t, "x-amz-customauthorizer-name=")), (dt(n) || dt(s) || dt(o)) && (!s || !o || !n))
    throw new Error("Signing-based custom authentication requires all token-related properties to be set");
  return dt(n) && n && (a = cn(a, n, "x-amz-customauthorizer-signature=")), dt(s) && dt(o) && (a = cn(a, s, o + "=")), a;
}
He.populate_username_string_with_custom_authorizer = nv;
function yc(r) {
  if (!(r === void 0 || r == null)) {
    var e = r.indexOf("%") != -1;
    return e ? r : encodeURIComponent(r);
  }
}
He.canonicalizeCustomAuthTokenSignature = yc;
function iv(r) {
  var e = {};
  return lr.set_defined_property(e, "authorizerName", r.authorizerName), lr.set_defined_property(e, "username", r.username), lr.set_defined_property(e, "password", r.password), lr.set_defined_property(e, "tokenKeyName", r.tokenKeyName), lr.set_defined_property(e, "tokenValue", r.tokenValue), lr.set_defined_property(e, "tokenSignature", yc(r.tokenSignature)), e;
}
He.canonicalizeCustomAuthConfig = iv;
function co(r, e, t) {
  e && t.push([r, e]);
}
function ov(r) {
  var e = "", t = [];
  if (r) {
    var n = !1;
    if ((r.tokenValue || r.tokenKeyName || r.tokenSignature) && (n = !0, !r.tokenValue || !r.tokenKeyName || !r.tokenSignature))
      throw new Error("Token-based custom authentication requires all token-related properties to be set");
    var i = r.username, o = (i ?? "").split("?"), s = o.slice(1);
    if (e = o[0], s.length > 1)
      throw new Error("Custom auth username property value is invalid");
    s.length == 1 && s[0].split("&").forEach(function(a, f, u) {
      var c, h = a.split("=");
      t.push([h[0], (c = h[1]) !== null && c !== void 0 ? c : ""]);
    }), co("x-amz-customauthorizer-name", r.authorizerName, t), n && (co(r.tokenKeyName, r.tokenValue, t), co("x-amz-customauthorizer-signature", r.tokenSignature, t));
  }
  return t.push(["SDK", "NodeJSv2"]), t.push(["Version", rv.crt_version()]), (e ?? "") + "?" + t.map(function(a) {
    return "".concat(a[0], "=").concat(a[1]);
  }).join("&");
}
He.buildMqtt5FinalUsername = ov;
function sv(r) {
  var e = /^[\w\-]+\.[\w\-]+\.([\w+\-]+)\./, t = r.match(e);
  if (t)
    return t[1];
  throw new Error("AWS region could not be extracted from endpoint.  Use 'region' property on WebsocketConfig to set manually.");
}
He.extractRegionFromEndpoint = sv;
var lu;
function xc() {
  if (lu)
    return ut;
  lu = 1;
  var r = Q && Q.__createBinding || (Object.create ? function(d, _, E, M) {
    M === void 0 && (M = E);
    var S = Object.getOwnPropertyDescriptor(_, E);
    (!S || ("get" in S ? !_.__esModule : S.writable || S.configurable)) && (S = { enumerable: !0, get: function() {
      return _[E];
    } }), Object.defineProperty(d, M, S);
  } : function(d, _, E, M) {
    M === void 0 && (M = E), d[M] = _[E];
  }), e = Q && Q.__setModuleDefault || (Object.create ? function(d, _) {
    Object.defineProperty(d, "default", { enumerable: !0, value: _ });
  } : function(d, _) {
    d.default = _;
  }), t = Q && Q.__importStar || function(d) {
    if (d && d.__esModule)
      return d;
    var _ = {};
    if (d != null)
      for (var E in d)
        E !== "default" && Object.prototype.hasOwnProperty.call(d, E) && r(_, d, E);
    return e(_, d), _;
  };
  Object.defineProperty(ut, "__esModule", { value: !0 }), ut.create_mqtt5_websocket_stream = ut.create_mqtt5_websocket_url = ut.create_websocket_stream = ut.create_websocket_url = void 0;
  var n = t(Mn()), i = Rt, o = A_, s = t(_c), a = t(He);
  function f(d) {
    return d > 9 ? d : "0" + d.toString();
  }
  function u(d) {
    var _ = d ?? /* @__PURE__ */ new Date();
    return "".concat(_.getUTCFullYear()).concat(f(_.getUTCMonth() + 1)).concat(f(_.getUTCDate()), "T") + "".concat(f(_.getUTCHours())).concat(f(_.getUTCMinutes())).concat(f(_.getUTCSeconds()), "Z");
  }
  function c(d) {
    return d === void 0 && (d = u()), d.substring(0, d.indexOf("T"));
  }
  function h(d, _, E) {
    if (d == null || d == null)
      throw new i.CrtError("make_signing_key: credentials not defined");
    var M = { asBytes: !0 }, S = s.HmacSHA256(_, "AWS4" + d.aws_secret_key, M);
    return S = s.HmacSHA256(d.aws_region || "", S, M), S = s.HmacSHA256(E, S, M), S = s.HmacSHA256("aws4_request", S, M), S;
  }
  function y(d, _, E, M, S, C) {
    var m;
    if (M === void 0 && (M = u()), S === void 0 && (S = c(M)), C === void 0 && (C = ""), E == null || E == null)
      throw new i.CrtError("sign_url: signing_config not defined");
    var D = (m = E.credentials.aws_region) !== null && m !== void 0 ? m : E.region, w = "host", F = E.service, L = "host:".concat(_.hostname.toLowerCase(), `
`), z = s.SHA256(C, { asBytes: !0 }), V = _.search.replace(new RegExp("^\\?"), ""), Z = "".concat(d, `
`).concat(_.pathname, `
`).concat(V, `
`).concat(L, `
`).concat(w, `
`).concat(z), ne = s.SHA256(Z, { asBytes: !0 }), ie = `AWS4-HMAC-SHA256
`.concat(M, `
`).concat(S, "/").concat(D, "/").concat(F, `/aws4_request
`).concat(ne), R = h(E.credentials, S, F), U = s.HmacSHA256(ie, R, { asBytes: !0 }), X = "".concat(_.search, "&X-Amz-Signature=").concat(U);
    E.credentials.aws_sts_token && (X += "&X-Amz-Security-Token=".concat(encodeURIComponent(E.credentials.aws_sts_token)));
    var ue = "".concat(_.protocol, "//").concat(_.hostname).concat(_.pathname).concat(X);
    return ue;
  }
  function T(d) {
    var _, E, M, S;
    if (d == null || d == null)
      throw new i.CrtError("create_websocket_url: config not defined");
    var C = "/mqtt", m = (d.websocket || {}).protocol || "wss";
    if (m === "wss") {
      var D = d.websocket, w = (_ = d.credentials_provider) === null || _ === void 0 ? void 0 : _.getCredentials(), F = (M = (E = D.create_signing_config) === null || E === void 0 ? void 0 : E.call(D)) !== null && M !== void 0 ? M : {
        service: (S = D.service) !== null && S !== void 0 ? S : "iotdevicegateway",
        credentials: w,
        date: /* @__PURE__ */ new Date()
      }, L = F, z = u(L.date), V = c(z), Z = "X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=".concat(L.credentials.aws_access_id) + "%2F".concat(V, "%2F").concat(L.credentials.aws_region, "%2F").concat(L.service, "%2Faws4_request&X-Amz-Date=").concat(z, "&X-Amz-SignedHeaders=host"), ne = new URL("wss://".concat(d.host_name, ":").concat(d.port).concat(C, "?").concat(Z));
      return y("GET", ne, L, z, V);
    } else if (m === "wss-custom-auth")
      return "wss://".concat(d.host_name, ":").concat(d.port).concat(C);
    throw new URIError("Invalid protocol requested: ".concat(m));
  }
  ut.create_websocket_url = T;
  function A(d) {
    var _ = T(d);
    return o(_, ["mqttv3.1"], d.websocket);
  }
  ut.create_websocket_stream = A;
  function B(d) {
    var _, E;
    if (d == null || d == null)
      throw new i.CrtError("create_mqtt5_websocket_url: config not defined");
    var M = "/mqtt", S = (_ = d.websocketOptions) !== null && _ !== void 0 ? _ : { urlFactoryOptions: { urlFactory: n.Mqtt5WebsocketUrlFactoryType.Ws } }, C = S.urlFactoryOptions.urlFactory;
    switch (C) {
      case n.Mqtt5WebsocketUrlFactoryType.Ws:
        return "ws://".concat(d.hostName, ":").concat(d.port).concat(M);
      case n.Mqtt5WebsocketUrlFactoryType.Wss:
        return "wss://".concat(d.hostName, ":").concat(d.port).concat(M);
      case n.Mqtt5WebsocketUrlFactoryType.Sigv4:
        var m = S.urlFactoryOptions, D = m.credentialsProvider.getCredentials();
        if (D === void 0)
          throw new i.CrtError("Websockets with sigv4 requires valid AWS credentials");
        var w = (E = m.region) !== null && E !== void 0 ? E : a.extractRegionFromEndpoint(d.hostName), F = {
          service: "iotdevicegateway",
          region: w,
          credentials: D,
          date: /* @__PURE__ */ new Date()
        }, L = u(F.date), z = c(L), V = "X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=".concat(F.credentials.aws_access_id) + "%2F".concat(z, "%2F").concat(w, "%2F").concat(F.service, "%2Faws4_request&X-Amz-Date=").concat(L, "&X-Amz-SignedHeaders=host"), Z = new URL("wss://".concat(d.hostName, ":").concat(d.port).concat(M, "?").concat(V));
        return y("GET", Z, F, L, z);
      case n.Mqtt5WebsocketUrlFactoryType.Custom:
        var ne = S.urlFactoryOptions;
        return ne.customUrlFactory();
    }
    throw new URIError("Invalid url factory requested: ".concat(C));
  }
  ut.create_mqtt5_websocket_url = B;
  function O(d) {
    var _, E = B(d), M = o(E, ["mqtt"], (_ = d.websocketOptions) === null || _ === void 0 ? void 0 : _.wsOptions);
    return M;
  }
  return ut.create_mqtt5_websocket_stream = O, ut;
}
var Gt = {}, av = Q && Q.__extends || /* @__PURE__ */ function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var o in i)
        Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
  };
}(), uv = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
}, fv = Q && Q.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, s;
  return s = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(c) {
      return f([u, c]);
    };
  }
  function f(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (t = 0)), t; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return t.label++, { value: u[1], done: !1 };
          case 5:
            t.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = u;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(u);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(r, t);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.StaticCredentialProvider = Gt.CredentialsProvider = void 0;
var gc = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.getCredentials = function() {
    }, r.prototype.refreshCredentials = function() {
      return uv(this, void 0, void 0, function() {
        return fv(this, function(e) {
          return [2, new Promise(function(t, n) {
            t();
          })];
        });
      });
    }, r;
  }()
);
Gt.CredentialsProvider = gc;
var cv = (
  /** @class */
  function(r) {
    av(e, r);
    function e(t) {
      var n = r.call(this) || this;
      return n.getCredentials = function() {
        return n.credentials;
      }, n.credentials = t, n;
    }
    return e;
  }(gc)
);
Gt.StaticCredentialProvider = cv;
var bc = {};
(function(r) {
  var e = Q && Q.__values || function(o) {
    var s = typeof Symbol == "function" && Symbol.iterator, a = s && o[s], f = 0;
    if (a)
      return a.call(o);
    if (o && typeof o.length == "number")
      return {
        next: function() {
          return o && f >= o.length && (o = void 0), { value: o && o[f++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), r.Trie = r.TrieOp = r.Node = void 0;
  var t = (
    /** @class */
    /* @__PURE__ */ function() {
      function o(s, a, f) {
        f === void 0 && (f = /* @__PURE__ */ new Map()), this.key = s, this.value = a, this.children = f;
      }
      return o;
    }()
  );
  r.Node = t;
  var n;
  (function(o) {
    o[o.Insert = 0] = "Insert", o[o.Delete = 1] = "Delete", o[o.Find = 2] = "Find";
  })(n = r.TrieOp || (r.TrieOp = {}));
  var i = (
    /** @class */
    function() {
      function o(s) {
        if (this.root = new t(), typeof s == "string") {
          var a = s;
          s = function(f) {
            return f.split(a);
          };
        }
        this.split_key = s;
      }
      return o.prototype.find_node = function(s, a) {
        var f, u, c = this.split_key(s), h = this.root, y = void 0;
        try {
          for (var T = e(c), A = T.next(); !A.done; A = T.next()) {
            var B = A.value, O = h.children.get(B);
            if (!O)
              if (a == n.Insert)
                h.children.set(B, O = new t(B));
              else
                return;
            y = h, h = O;
          }
        } catch (d) {
          f = { error: d };
        } finally {
          try {
            A && !A.done && (u = T.return) && u.call(T);
          } finally {
            if (f)
              throw f.error;
          }
        }
        return y && a == n.Delete && y.children.delete(h.key), h;
      }, o.prototype.insert = function(s, a) {
        var f = this.find_node(s, n.Insert);
        f.value = a;
      }, o.prototype.remove = function(s) {
        this.find_node(s, n.Delete);
      }, o.prototype.find = function(s) {
        var a = this.find_node(s, n.Find);
        return a ? a.value : void 0;
      }, o;
    }()
  );
  r.Trie = i;
})(bc);
var Po = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.DEFAULT_RECONNECT_MIN_SEC = r.DEFAULT_RECONNECT_MAX_SEC = r.MqttWill = r.QoS = void 0, function(t) {
    t[t.AtMostOnce = 0] = "AtMostOnce", t[t.AtLeastOnce = 1] = "AtLeastOnce", t[t.ExactlyOnce = 2] = "ExactlyOnce";
  }(r.QoS || (r.QoS = {}));
  var e = (
    /** @class */
    /* @__PURE__ */ function() {
      function t(n, i, o, s) {
        s === void 0 && (s = !1), this.topic = n, this.qos = i, this.payload = o, this.retain = s;
      }
      return t;
    }()
  );
  r.MqttWill = e, r.DEFAULT_RECONNECT_MAX_SEC = 128, r.DEFAULT_RECONNECT_MIN_SEC = 1;
})(Po);
var hu;
function lv() {
  return hu || (hu = 1, function(r) {
    var e = Q && Q.__extends || /* @__PURE__ */ function() {
      var S = function(C, m) {
        return S = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(D, w) {
          D.__proto__ = w;
        } || function(D, w) {
          for (var F in w)
            Object.prototype.hasOwnProperty.call(w, F) && (D[F] = w[F]);
        }, S(C, m);
      };
      return function(C, m) {
        if (typeof m != "function" && m !== null)
          throw new TypeError("Class extends value " + String(m) + " is not a constructor or null");
        S(C, m);
        function D() {
          this.constructor = C;
        }
        C.prototype = m === null ? Object.create(m) : (D.prototype = m.prototype, new D());
      };
    }(), t = Q && Q.__createBinding || (Object.create ? function(S, C, m, D) {
      D === void 0 && (D = m);
      var w = Object.getOwnPropertyDescriptor(C, m);
      (!w || ("get" in w ? !C.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: function() {
        return C[m];
      } }), Object.defineProperty(S, D, w);
    } : function(S, C, m, D) {
      D === void 0 && (D = m), S[D] = C[m];
    }), n = Q && Q.__setModuleDefault || (Object.create ? function(S, C) {
      Object.defineProperty(S, "default", { enumerable: !0, value: C });
    } : function(S, C) {
      S.default = C;
    }), i = Q && Q.__importStar || function(S) {
      if (S && S.__esModule)
        return S;
      var C = {};
      if (S != null)
        for (var m in S)
          m !== "default" && Object.prototype.hasOwnProperty.call(S, m) && t(C, S, m);
      return n(C, S), C;
    }, o = Q && Q.__awaiter || function(S, C, m, D) {
      function w(F) {
        return F instanceof m ? F : new m(function(L) {
          L(F);
        });
      }
      return new (m || (m = Promise))(function(F, L) {
        function z(ne) {
          try {
            Z(D.next(ne));
          } catch (ie) {
            L(ie);
          }
        }
        function V(ne) {
          try {
            Z(D.throw(ne));
          } catch (ie) {
            L(ie);
          }
        }
        function Z(ne) {
          ne.done ? F(ne.value) : w(ne.value).then(z, V);
        }
        Z((D = D.apply(S, C || [])).next());
      });
    }, s = Q && Q.__generator || function(S, C) {
      var m = { label: 0, sent: function() {
        if (F[0] & 1)
          throw F[1];
        return F[1];
      }, trys: [], ops: [] }, D, w, F, L;
      return L = { next: z(0), throw: z(1), return: z(2) }, typeof Symbol == "function" && (L[Symbol.iterator] = function() {
        return this;
      }), L;
      function z(Z) {
        return function(ne) {
          return V([Z, ne]);
        };
      }
      function V(Z) {
        if (D)
          throw new TypeError("Generator is already executing.");
        for (; L && (L = 0, Z[0] && (m = 0)), m; )
          try {
            if (D = 1, w && (F = Z[0] & 2 ? w.return : Z[0] ? w.throw || ((F = w.return) && F.call(w), 0) : w.next) && !(F = F.call(w, Z[1])).done)
              return F;
            switch (w = 0, F && (Z = [Z[0] & 2, F.value]), Z[0]) {
              case 0:
              case 1:
                F = Z;
                break;
              case 4:
                return m.label++, { value: Z[1], done: !1 };
              case 5:
                m.label++, w = Z[1], Z = [0];
                continue;
              case 7:
                Z = m.ops.pop(), m.trys.pop();
                continue;
              default:
                if (F = m.trys, !(F = F.length > 0 && F[F.length - 1]) && (Z[0] === 6 || Z[0] === 2)) {
                  m = 0;
                  continue;
                }
                if (Z[0] === 3 && (!F || Z[1] > F[0] && Z[1] < F[3])) {
                  m.label = Z[1];
                  break;
                }
                if (Z[0] === 6 && m.label < F[1]) {
                  m.label = F[1], F = Z;
                  break;
                }
                if (F && m.label < F[2]) {
                  m.label = F[2], m.ops.push(Z);
                  break;
                }
                F[2] && m.ops.pop(), m.trys.pop();
                continue;
            }
            Z = C.call(S, m);
          } catch (ne) {
            Z = [6, ne], w = 0;
          } finally {
            D = F = 0;
          }
        if (Z[0] & 5)
          throw Z[1];
        return { value: Z[0] ? Z[1] : void 0, done: !0 };
      }
    }, a = Q && Q.__values || function(S) {
      var C = typeof Symbol == "function" && Symbol.iterator, m = C && S[C], D = 0;
      if (m)
        return m.call(S);
      if (S && typeof S.length == "number")
        return {
          next: function() {
            return S && D >= S.length && (S = void 0), { value: S && S[D++], done: !S };
          }
        };
      throw new TypeError(C ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.MqttClientConnection = r.MqttClient = r.MqttWill = r.QoS = void 0;
    var f = i(zf), u = i(xc()), c = i(Gt), h = bc, y = Br, T = Kn(), A = Po, B = Vt, O = Po;
    Object.defineProperty(r, "QoS", { enumerable: !0, get: function() {
      return O.QoS;
    } }), Object.defineProperty(r, "MqttWill", { enumerable: !0, get: function() {
      return O.MqttWill;
    } });
    var d = (
      /** @class */
      function() {
        function S(C) {
        }
        return S.prototype.new_connection = function(C) {
          return new M(this, C);
        }, S;
      }()
    );
    r.MqttClient = d;
    var _;
    (function(S) {
      S[S.Connected = 0] = "Connected", S[S.Stopped = 1] = "Stopped";
    })(_ || (_ = {}));
    var E = (
      /** @class */
      function(S) {
        e(C, S);
        function C() {
          return S.call(this, "/") || this;
        }
        return C.prototype.find_node = function(m, D) {
          var w, F, L = this.split_key(m), z = this.root, V = void 0;
          try {
            for (var Z = a(L), ne = Z.next(); !ne.done; ne = Z.next()) {
              var ie = ne.value, R = z.children.get(ie);
              if (!R) {
                if (R = z.children.get("#"), R)
                  return R;
                R = z.children.get("+");
              }
              if (!R)
                if (D == h.TrieOp.Insert)
                  z.children.set(ie, R = new h.Node(ie));
                else
                  return;
              V = z, z = R;
            }
          } catch (U) {
            w = { error: U };
          } finally {
            try {
              ne && !ne.done && (F = Z.return) && F.call(Z);
            } finally {
              if (w)
                throw w.error;
            }
          }
          return V && D == h.TrieOp.Delete && V.children.delete(z.key), z;
        }, C;
      }(h.Trie)
    ), M = (
      /** @class */
      function(S) {
        e(C, S);
        function C(m, D) {
          var w = S.call(this) || this;
          w.client = m, w.config = D, w.subscriptions = new E(), w.connection_count = 0, w.reconnect_count = 0, w.reconnect_min_sec = A.DEFAULT_RECONNECT_MIN_SEC, w.reconnect_max_sec = A.DEFAULT_RECONNECT_MAX_SEC, w.currentState = _.Stopped, w.desiredState = _.Stopped, w.on_connect = function(ne) {
            w.on_online(ne.sessionPresent);
          }, w.on_online = function(ne) {
            w.currentState = _.Connected, ++w.connection_count == 1 ? w.emit("connect", ne) : (w.reset_reconnect_times(), w.emit("resume", 0, ne));
            var ie = { session_present: ne };
            w.emit("connection_success", ie);
          }, w.on_close = function() {
            var ne, ie = w.lastError;
            if (w.currentState == _.Connected && (w.currentState = _.Stopped, w.emit("interrupt", -1), w.desiredState == _.Stopped && w.emit("closed")), w.desiredState == _.Connected) {
              var R = new T.CrtError((ne = ie == null ? void 0 : ie.toString()) !== null && ne !== void 0 ? ne : "connectionFailure"), U = { error: R };
              w.emit("connection_failure", U);
              var X = w.get_reconnect_time_sec();
              w.reconnectTask = setTimeout(function() {
                w.reconnect_count++, w.connection.reconnect();
              }, X * 1e3);
            }
            w.lastError = void 0;
          }, w.on_disconnected = function() {
            if (w.emit("disconnect"), w.currentState == _.Connected && w.desiredState == _.Stopped) {
              var ne = {};
              w.emit("closed", ne);
            }
          }, w.on_error = function(ne) {
            w.lastError = ne, w.emit("error", new T.CrtError(ne));
          }, w.on_message = function(ne, ie, R) {
            var U = ie.buffer.slice(ie.byteOffset, ie.byteOffset + ie.byteLength), X = w.subscriptions.find(ne);
            X && X(ne, U, R.dup, R.qos, R.retain), w.emit("message", ne, U, R.dup, R.qos, R.retain);
          };
          var F = function(ne) {
            return u.create_websocket_stream(w.config);
          }, L = function(ne, ie, R) {
            return u.create_websocket_url(w.config);
          };
          if (D == null || D == null)
            throw new T.CrtError("MqttClientConnection constructor: config not defined");
          var z = w.config.will ? {
            topic: w.config.will.topic,
            payload: (0, B.normalize_payload)(w.config.will.payload),
            qos: w.config.will.qos,
            retain: w.config.will.retain
          } : void 0;
          if (D.reconnect_min_sec !== void 0 && (w.reconnect_min_sec = D.reconnect_min_sec, w.reconnect_max_sec = Math.max(w.reconnect_min_sec, w.reconnect_max_sec)), D.reconnect_max_sec !== void 0 && (w.reconnect_max_sec = D.reconnect_max_sec, w.reconnect_min_sec = Math.min(w.reconnect_min_sec, w.reconnect_max_sec)), w.reset_reconnect_times(), w.config.credentials_provider == null && w.config.credentials != null) {
            var V = new c.StaticCredentialProvider({
              aws_region: w.config.credentials.aws_region,
              aws_access_id: w.config.credentials.aws_access_id,
              aws_secret_key: w.config.credentials.aws_secret_key,
              aws_sts_token: w.config.credentials.aws_sts_token
            });
            w.config.credentials_provider = V;
          }
          var Z = (w.config.websocket || {}).protocol != "wss-custom-auth" ? L : void 0;
          return w.connection = new f.MqttClient(F, {
            // service default is 1200 seconds
            keepalive: w.config.keep_alive ? w.config.keep_alive : 1200,
            clientId: w.config.client_id,
            connectTimeout: w.config.ping_timeout ? w.config.ping_timeout : 30 * 1e3,
            clean: w.config.clean_session,
            username: w.config.username,
            password: w.config.password,
            reconnectPeriod: w.reconnect_max_sec * 1e3,
            will: z,
            transformWsUrl: Z
          }), w.connection.on("connect", w.on_connect), w.connection.on("error", w.on_error), w.connection.on("message", w.on_message), w.connection.on("close", w.on_close), w.connection.on("end", w.on_disconnected), w;
        }
        return C.prototype.on = function(m, D) {
          return S.prototype.on.call(this, m, D);
        }, C.prototype.connect = function() {
          return o(this, void 0, void 0, function() {
            var m = this;
            return s(this, function(D) {
              return this.desiredState = _.Connected, setTimeout(function() {
                m.uncork();
              }, 0), [2, new Promise(function(w, F) {
                return o(m, void 0, void 0, function() {
                  var L, z, V = this;
                  return s(this, function(Z) {
                    switch (Z.label) {
                      case 0:
                        return L = this.config.credentials_provider, L ? [4, L.refreshCredentials()] : [3, 2];
                      case 1:
                        Z.sent(), Z.label = 2;
                      case 2:
                        return z = function(ne) {
                          var ie = new T.CrtError(ne), R = { error: ie };
                          V.emit("connection_failure", R), F(ie);
                        }, this.connection.once("error", z), this.connection.once("connect", function(ne) {
                          V.connection.removeListener("error", z), w(ne.sessionPresent);
                        }), [
                          2
                          /*return*/
                        ];
                    }
                  });
                });
              })];
            });
          });
        }, C.prototype.reconnect = function() {
          return o(this, void 0, void 0, function() {
            return s(this, function(m) {
              return [2, this.connect()];
            });
          });
        }, C.prototype.publish = function(m, D, w, F) {
          return F === void 0 && (F = !1), o(this, void 0, void 0, function() {
            var L, z = this;
            return s(this, function(V) {
              return typeof m != "string" ? [2, Promise.reject("topic is not a string")] : typeof w != "number" ? [2, Promise.reject("qos is not a number")] : typeof F != "boolean" ? [2, Promise.reject("retain is not a boolean")] : (L = (0, B.normalize_payload)(D), [2, new Promise(function(Z, ne) {
                z.connection.publish(m, L, { qos: w, retain: F }, function(ie, R) {
                  if (ie)
                    return ne(new T.CrtError(ie)), z.on_error(ie);
                  var U = void 0;
                  w != A.QoS.AtMostOnce && (U = R.messageId), Z({ packet_id: U });
                });
              })]);
            });
          });
        }, C.prototype.subscribe = function(m, D, w) {
          return o(this, void 0, void 0, function() {
            var F = this;
            return s(this, function(L) {
              return typeof m != "string" ? [2, Promise.reject("topic is not a string")] : typeof D != "number" ? [2, Promise.reject("qos is not a number")] : (this.subscriptions.insert(m, w), [2, new Promise(function(z, V) {
                F.connection.subscribe(m, { qos: D }, function(Z, ne) {
                  if (Z)
                    return V(new T.CrtError(Z)), F.on_error(Z);
                  var ie = ne[0];
                  z({ topic: ie.topic, qos: ie.qos });
                });
              })]);
            });
          });
        }, C.prototype.unsubscribe = function(m) {
          return o(this, void 0, void 0, function() {
            var D = this;
            return s(this, function(w) {
              return typeof m != "string" ? [2, Promise.reject("topic is not a string")] : (this.subscriptions.remove(m), [2, new Promise(function(F, L) {
                D.connection.unsubscribe(m, void 0, function(z, V) {
                  if (z)
                    return L(new T.CrtError(z)), D.on_error(z);
                  F({
                    packet_id: V ? V.messageId : void 0
                  });
                });
              })]);
            });
          });
        }, C.prototype.disconnect = function() {
          return o(this, void 0, void 0, function() {
            var m = this;
            return s(this, function(D) {
              return this.desiredState = _.Stopped, this.reconnectTask && (clearTimeout(this.reconnectTask), this.reconnectTask = void 0), [2, new Promise(function(w) {
                m.connection.end(!1, {}, w);
              })];
            });
          });
        }, C.prototype.reset_reconnect_times = function() {
          this.reconnect_count = 0;
        }, C.prototype.get_reconnect_time_sec = function() {
          if (this.reconnect_min_sec == 0 && this.reconnect_max_sec == 0)
            return 0;
          var m = this.reconnect_max_sec - this.reconnect_min_sec, D = Math.max(this.reconnect_min_sec, 1), w = Math.random() * Math.min(m, D * Math.pow(2, this.reconnect_count));
          return this.reconnect_min_sec + w;
        }, C.CONNECT = "connect", C.DISCONNECT = "disconnect", C.ERROR = "error", C.INTERRUPT = "interrupt", C.RESUME = "resume", C.MESSAGE = "message", C.CONNECTION_SUCCESS = "connection_success", C.CONNECTION_FAILURE = "connection_failure", C.CLOSED = "closed", C;
      }(y.BufferedEventEmitter)
    );
    r.MqttClientConnection = M;
  }(Yn)), Yn;
}
var wc = {}, ko = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.CommonHttpProxyOptions = r.HttpProxyAuthenticationType = r.HttpVersion = void 0, function(n) {
    n[n.Unknown = 0] = "Unknown", n[n.Http1_0 = 1] = "Http1_0", n[n.Http1_1 = 2] = "Http1_1", n[n.Http2 = 3] = "Http2";
  }(r.HttpVersion || (r.HttpVersion = {}));
  var e;
  (function(n) {
    n[n.None = 0] = "None", n[n.Basic = 1] = "Basic";
  })(e = r.HttpProxyAuthenticationType || (r.HttpProxyAuthenticationType = {}));
  var t = (
    /** @class */
    /* @__PURE__ */ function() {
      function n(i, o, s, a, f) {
        s === void 0 && (s = e.None), this.host_name = i, this.port = o, this.auth_method = s, this.auth_username = a, this.auth_password = f;
      }
      return n;
    }()
  );
  r.CommonHttpProxyOptions = t;
})(ko);
function mc(r, e) {
  return function() {
    return r.apply(e, arguments);
  };
}
const { toString: hv } = Object.prototype, { getPrototypeOf: as } = Object, Un = /* @__PURE__ */ ((r) => (e) => {
  const t = hv.call(e);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), wt = (r) => (r = r.toLowerCase(), (e) => Un(e) === r), Ln = (r) => (e) => typeof e === r, { isArray: Cr } = Array, $r = Ln("undefined");
function dv(r) {
  return r !== null && !$r(r) && r.constructor !== null && !$r(r.constructor) && it(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
const Ec = wt("ArrayBuffer");
function pv(r) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Ec(r.buffer), e;
}
const _v = Ln("string"), it = Ln("function"), Sc = Ln("number"), qn = (r) => r !== null && typeof r == "object", vv = (r) => r === !0 || r === !1, ln = (r) => {
  if (Un(r) !== "object")
    return !1;
  const e = as(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
}, yv = wt("Date"), xv = wt("File"), gv = wt("Blob"), bv = wt("FileList"), wv = (r) => qn(r) && it(r.pipe), mv = (r) => {
  let e;
  return r && (typeof FormData == "function" && r instanceof FormData || it(r.append) && ((e = Un(r)) === "formdata" || // detect form-data instance
  e === "object" && it(r.toString) && r.toString() === "[object FormData]"));
}, Ev = wt("URLSearchParams"), Sv = (r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Jr(r, e, { allOwnKeys: t = !1 } = {}) {
  if (r === null || typeof r > "u")
    return;
  let n, i;
  if (typeof r != "object" && (r = [r]), Cr(r))
    for (n = 0, i = r.length; n < i; n++)
      e.call(null, r[n], n, r);
  else {
    const o = t ? Object.getOwnPropertyNames(r) : Object.keys(r), s = o.length;
    let a;
    for (n = 0; n < s; n++)
      a = o[n], e.call(null, r[a], a, r);
  }
}
function Ac(r, e) {
  e = e.toLowerCase();
  const t = Object.keys(r);
  let n = t.length, i;
  for (; n-- > 0; )
    if (i = t[n], e === i.toLowerCase())
      return i;
  return null;
}
const Bc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Q, Cc = (r) => !$r(r) && r !== Bc;
function jo() {
  const { caseless: r } = Cc(this) && this || {}, e = {}, t = (n, i) => {
    const o = r && Ac(e, i) || i;
    ln(e[o]) && ln(n) ? e[o] = jo(e[o], n) : ln(n) ? e[o] = jo({}, n) : Cr(n) ? e[o] = n.slice() : e[o] = n;
  };
  for (let n = 0, i = arguments.length; n < i; n++)
    arguments[n] && Jr(arguments[n], t);
  return e;
}
const Av = (r, e, t, { allOwnKeys: n } = {}) => (Jr(e, (i, o) => {
  t && it(i) ? r[o] = mc(i, t) : r[o] = i;
}, { allOwnKeys: n }), r), Bv = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), Cv = (r, e, t, n) => {
  r.prototype = Object.create(e.prototype, n), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: e.prototype
  }), t && Object.assign(r.prototype, t);
}, Tv = (r, e, t, n) => {
  let i, o, s;
  const a = {};
  if (e = e || {}, r == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(r), o = i.length; o-- > 0; )
      s = i[o], (!n || n(s, r, e)) && !a[s] && (e[s] = r[s], a[s] = !0);
    r = t !== !1 && as(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}, Dv = (r, e, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  const n = r.indexOf(e, t);
  return n !== -1 && n === t;
}, Fv = (r) => {
  if (!r)
    return null;
  if (Cr(r))
    return r;
  let e = r.length;
  if (!Sc(e))
    return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = r[e];
  return t;
}, Ov = /* @__PURE__ */ ((r) => (e) => r && e instanceof r)(typeof Uint8Array < "u" && as(Uint8Array)), Mv = (r, e) => {
  const n = (r && r[Symbol.iterator]).call(r);
  let i;
  for (; (i = n.next()) && !i.done; ) {
    const o = i.value;
    e.call(r, o[0], o[1]);
  }
}, Iv = (r, e) => {
  let t;
  const n = [];
  for (; (t = r.exec(e)) !== null; )
    n.push(t);
  return n;
}, Nv = wt("HTMLFormElement"), Rv = (r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, n, i) {
    return n.toUpperCase() + i;
  }
), du = (({ hasOwnProperty: r }) => (e, t) => r.call(e, t))(Object.prototype), Pv = wt("RegExp"), Tc = (r, e) => {
  const t = Object.getOwnPropertyDescriptors(r), n = {};
  Jr(t, (i, o) => {
    let s;
    (s = e(i, o, r)) !== !1 && (n[o] = s || i);
  }), Object.defineProperties(r, n);
}, kv = (r) => {
  Tc(r, (e, t) => {
    if (it(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const n = r[t];
    if (it(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, jv = (r, e) => {
  const t = {}, n = (i) => {
    i.forEach((o) => {
      t[o] = !0;
    });
  };
  return Cr(r) ? n(r) : n(String(r).split(e)), t;
}, Uv = () => {
}, Lv = (r, e) => (r = +r, Number.isFinite(r) ? r : e), lo = "abcdefghijklmnopqrstuvwxyz", pu = "0123456789", Dc = {
  DIGIT: pu,
  ALPHA: lo,
  ALPHA_DIGIT: lo + lo.toUpperCase() + pu
}, qv = (r = 16, e = Dc.ALPHA_DIGIT) => {
  let t = "";
  const { length: n } = e;
  for (; r--; )
    t += e[Math.random() * n | 0];
  return t;
};
function Hv(r) {
  return !!(r && it(r.append) && r[Symbol.toStringTag] === "FormData" && r[Symbol.iterator]);
}
const $v = (r) => {
  const e = new Array(10), t = (n, i) => {
    if (qn(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[i] = n;
        const o = Cr(n) ? [] : {};
        return Jr(n, (s, a) => {
          const f = t(s, i + 1);
          !$r(f) && (o[a] = f);
        }), e[i] = void 0, o;
      }
    }
    return n;
  };
  return t(r, 0);
}, Wv = wt("AsyncFunction"), zv = (r) => r && (qn(r) || it(r)) && it(r.then) && it(r.catch);
var de = {
  isArray: Cr,
  isArrayBuffer: Ec,
  isBuffer: dv,
  isFormData: mv,
  isArrayBufferView: pv,
  isString: _v,
  isNumber: Sc,
  isBoolean: vv,
  isObject: qn,
  isPlainObject: ln,
  isUndefined: $r,
  isDate: yv,
  isFile: xv,
  isBlob: gv,
  isRegExp: Pv,
  isFunction: it,
  isStream: wv,
  isURLSearchParams: Ev,
  isTypedArray: Ov,
  isFileList: bv,
  forEach: Jr,
  merge: jo,
  extend: Av,
  trim: Sv,
  stripBOM: Bv,
  inherits: Cv,
  toFlatObject: Tv,
  kindOf: Un,
  kindOfTest: wt,
  endsWith: Dv,
  toArray: Fv,
  forEachEntry: Mv,
  matchAll: Iv,
  isHTMLForm: Nv,
  hasOwnProperty: du,
  hasOwnProp: du,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Tc,
  freezeMethods: kv,
  toObjectSet: jv,
  toCamelCase: Rv,
  noop: Uv,
  toFiniteNumber: Lv,
  findKey: Ac,
  global: Bc,
  isContextDefined: Cc,
  ALPHABET: Dc,
  generateString: qv,
  isSpecCompliantForm: Hv,
  toJSONObject: $v,
  isAsyncFn: Wv,
  isThenable: zv
};
function Ee(r, e, t, n, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), n && (this.request = n), i && (this.response = i);
}
de.inherits(Ee, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: de.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Fc = Ee.prototype, Oc = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((r) => {
  Oc[r] = { value: r };
});
Object.defineProperties(Ee, Oc);
Object.defineProperty(Fc, "isAxiosError", { value: !0 });
Ee.from = (r, e, t, n, i, o) => {
  const s = Object.create(Fc);
  return de.toFlatObject(r, s, function(f) {
    return f !== Error.prototype;
  }, (a) => a !== "isAxiosError"), Ee.call(s, r.message, e, t, n, i), s.cause = r, s.name = r.name, o && Object.assign(s, o), s;
};
var Kv = null;
function Uo(r) {
  return de.isPlainObject(r) || de.isArray(r);
}
function Mc(r) {
  return de.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
function _u(r, e, t) {
  return r ? r.concat(e).map(function(i, o) {
    return i = Mc(i), !t && o ? "[" + i + "]" : i;
  }).join(t ? "." : "") : e;
}
function Vv(r) {
  return de.isArray(r) && !r.some(Uo);
}
const Gv = de.toFlatObject(de, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Hn(r, e, t) {
  if (!de.isObject(r))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = de.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(B, O) {
    return !de.isUndefined(O[B]);
  });
  const n = t.metaTokens, i = t.visitor || c, o = t.dots, s = t.indexes, f = (t.Blob || typeof Blob < "u" && Blob) && de.isSpecCompliantForm(e);
  if (!de.isFunction(i))
    throw new TypeError("visitor must be a function");
  function u(A) {
    if (A === null)
      return "";
    if (de.isDate(A))
      return A.toISOString();
    if (!f && de.isBlob(A))
      throw new Ee("Blob is not supported. Use a Buffer instead.");
    return de.isArrayBuffer(A) || de.isTypedArray(A) ? f && typeof Blob == "function" ? new Blob([A]) : Buffer.from(A) : A;
  }
  function c(A, B, O) {
    let d = A;
    if (A && !O && typeof A == "object") {
      if (de.endsWith(B, "{}"))
        B = n ? B : B.slice(0, -2), A = JSON.stringify(A);
      else if (de.isArray(A) && Vv(A) || (de.isFileList(A) || de.endsWith(B, "[]")) && (d = de.toArray(A)))
        return B = Mc(B), d.forEach(function(E, M) {
          !(de.isUndefined(E) || E === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? _u([B], M, o) : s === null ? B : B + "[]",
            u(E)
          );
        }), !1;
    }
    return Uo(A) ? !0 : (e.append(_u(O, B, o), u(A)), !1);
  }
  const h = [], y = Object.assign(Gv, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Uo
  });
  function T(A, B) {
    if (!de.isUndefined(A)) {
      if (h.indexOf(A) !== -1)
        throw Error("Circular reference detected in " + B.join("."));
      h.push(A), de.forEach(A, function(d, _) {
        (!(de.isUndefined(d) || d === null) && i.call(
          e,
          d,
          de.isString(_) ? _.trim() : _,
          B,
          y
        )) === !0 && T(d, B ? B.concat(_) : [_]);
      }), h.pop();
    }
  }
  if (!de.isObject(r))
    throw new TypeError("data must be an object");
  return T(r), e;
}
function vu(r) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function us(r, e) {
  this._pairs = [], r && Hn(r, this, e);
}
const Ic = us.prototype;
Ic.append = function(e, t) {
  this._pairs.push([e, t]);
};
Ic.toString = function(e) {
  const t = e ? function(n) {
    return e.call(this, n, vu);
  } : vu;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
function Qv(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Nc(r, e, t) {
  if (!e)
    return r;
  const n = t && t.encode || Qv, i = t && t.serialize;
  let o;
  if (i ? o = i(e, t) : o = de.isURLSearchParams(e) ? e.toString() : new us(e, t).toString(n), o) {
    const s = r.indexOf("#");
    s !== -1 && (r = r.slice(0, s)), r += (r.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return r;
}
class Jv {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, t, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    de.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
var yu = Jv, Rc = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Xv = typeof URLSearchParams < "u" ? URLSearchParams : us, Yv = typeof FormData < "u" ? FormData : null, Zv = typeof Blob < "u" ? Blob : null, ey = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Xv,
    FormData: Yv,
    Blob: Zv
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const Pc = typeof window < "u" && typeof document < "u", ty = ((r) => Pc && ["ReactNative", "NativeScript", "NS"].indexOf(r) < 0)(typeof navigator < "u" && navigator.product), ry = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function";
var ny = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  hasBrowserEnv: Pc,
  hasStandardBrowserWebWorkerEnv: ry,
  hasStandardBrowserEnv: ty
}), xt = {
  ...ny,
  ...ey
};
function iy(r, e) {
  return Hn(r, new xt.classes.URLSearchParams(), Object.assign({
    visitor: function(t, n, i, o) {
      return xt.isNode && de.isBuffer(t) ? (this.append(n, t.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function oy(r) {
  return de.matchAll(/\w+|\[(\w*)]/g, r).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function sy(r) {
  const e = {}, t = Object.keys(r);
  let n;
  const i = t.length;
  let o;
  for (n = 0; n < i; n++)
    o = t[n], e[o] = r[o];
  return e;
}
function kc(r) {
  function e(t, n, i, o) {
    let s = t[o++];
    if (s === "__proto__")
      return !0;
    const a = Number.isFinite(+s), f = o >= t.length;
    return s = !s && de.isArray(i) ? i.length : s, f ? (de.hasOwnProp(i, s) ? i[s] = [i[s], n] : i[s] = n, !a) : ((!i[s] || !de.isObject(i[s])) && (i[s] = []), e(t, n, i[s], o) && de.isArray(i[s]) && (i[s] = sy(i[s])), !a);
  }
  if (de.isFormData(r) && de.isFunction(r.entries)) {
    const t = {};
    return de.forEachEntry(r, (n, i) => {
      e(oy(n), i, t, 0);
    }), t;
  }
  return null;
}
function ay(r, e, t) {
  if (de.isString(r))
    try {
      return (e || JSON.parse)(r), de.trim(r);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (t || JSON.stringify)(r);
}
const fs = {
  transitional: Rc,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const n = t.getContentType() || "", i = n.indexOf("application/json") > -1, o = de.isObject(e);
    if (o && de.isHTMLForm(e) && (e = new FormData(e)), de.isFormData(e))
      return i ? JSON.stringify(kc(e)) : e;
    if (de.isArrayBuffer(e) || de.isBuffer(e) || de.isStream(e) || de.isFile(e) || de.isBlob(e))
      return e;
    if (de.isArrayBufferView(e))
      return e.buffer;
    if (de.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let a;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return iy(e, this.formSerializer).toString();
      if ((a = de.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const f = this.env && this.env.FormData;
        return Hn(
          a ? { "files[]": e } : e,
          f && new f(),
          this.formSerializer
        );
      }
    }
    return o || i ? (t.setContentType("application/json", !1), ay(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || fs.transitional, n = t && t.forcedJSONParsing, i = this.responseType === "json";
    if (e && de.isString(e) && (n && !this.responseType || i)) {
      const s = !(t && t.silentJSONParsing) && i;
      try {
        return JSON.parse(e);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? Ee.from(a, Ee.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: xt.classes.FormData,
    Blob: xt.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
de.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  fs.headers[r] = {};
});
var cs = fs;
const uy = de.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var fy = (r) => {
  const e = {};
  let t, n, i;
  return r && r.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), t = s.substring(0, i).trim().toLowerCase(), n = s.substring(i + 1).trim(), !(!t || e[t] && uy[t]) && (t === "set-cookie" ? e[t] ? e[t].push(n) : e[t] = [n] : e[t] = e[t] ? e[t] + ", " + n : n);
  }), e;
};
const xu = Symbol("internals");
function Pr(r) {
  return r && String(r).trim().toLowerCase();
}
function hn(r) {
  return r === !1 || r == null ? r : de.isArray(r) ? r.map(hn) : String(r);
}
function cy(r) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = t.exec(r); )
    e[n[1]] = n[2];
  return e;
}
const ly = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());
function ho(r, e, t, n, i) {
  if (de.isFunction(n))
    return n.call(this, e, t);
  if (i && (e = t), !!de.isString(e)) {
    if (de.isString(n))
      return e.indexOf(n) !== -1;
    if (de.isRegExp(n))
      return n.test(e);
  }
}
function hy(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function dy(r, e) {
  const t = de.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(r, n + t, {
      value: function(i, o, s) {
        return this[n].call(this, e, i, o, s);
      },
      configurable: !0
    });
  });
}
class $n {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    const i = this;
    function o(a, f, u) {
      const c = Pr(f);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const h = de.findKey(i, c);
      (!h || i[h] === void 0 || u === !0 || u === void 0 && i[h] !== !1) && (i[h || f] = hn(a));
    }
    const s = (a, f) => de.forEach(a, (u, c) => o(u, c, f));
    return de.isPlainObject(e) || e instanceof this.constructor ? s(e, t) : de.isString(e) && (e = e.trim()) && !ly(e) ? s(fy(e), t) : e != null && o(t, e, n), this;
  }
  get(e, t) {
    if (e = Pr(e), e) {
      const n = de.findKey(this, e);
      if (n) {
        const i = this[n];
        if (!t)
          return i;
        if (t === !0)
          return cy(i);
        if (de.isFunction(t))
          return t.call(this, i, n);
        if (de.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = Pr(e), e) {
      const n = de.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || ho(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let i = !1;
    function o(s) {
      if (s = Pr(s), s) {
        const a = de.findKey(n, s);
        a && (!t || ho(n, n[a], a, t)) && (delete n[a], i = !0);
      }
    }
    return de.isArray(e) ? e.forEach(o) : o(e), i;
  }
  clear(e) {
    const t = Object.keys(this);
    let n = t.length, i = !1;
    for (; n--; ) {
      const o = t[n];
      (!e || ho(this, this[o], o, e, !0)) && (delete this[o], i = !0);
    }
    return i;
  }
  normalize(e) {
    const t = this, n = {};
    return de.forEach(this, (i, o) => {
      const s = de.findKey(n, o);
      if (s) {
        t[s] = hn(i), delete t[o];
        return;
      }
      const a = e ? hy(o) : String(o).trim();
      a !== o && delete t[o], t[a] = hn(i), n[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return de.forEach(this, (n, i) => {
      n != null && n !== !1 && (t[i] = e && de.isArray(n) ? n.join(", ") : n);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const n = new this(e);
    return t.forEach((i) => n.set(i)), n;
  }
  static accessor(e) {
    const n = (this[xu] = this[xu] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function o(s) {
      const a = Pr(s);
      n[a] || (dy(i, s), n[a] = !0);
    }
    return de.isArray(e) ? e.forEach(o) : o(e), this;
  }
}
$n.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
de.reduceDescriptors($n.prototype, ({ value: r }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => r,
    set(n) {
      this[t] = n;
    }
  };
});
de.freezeMethods($n);
var Tt = $n;
function po(r, e) {
  const t = this || cs, n = e || t, i = Tt.from(n.headers);
  let o = n.data;
  return de.forEach(r, function(a) {
    o = a.call(t, o, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), o;
}
function jc(r) {
  return !!(r && r.__CANCEL__);
}
function Xr(r, e, t) {
  Ee.call(this, r ?? "canceled", Ee.ERR_CANCELED, e, t), this.name = "CanceledError";
}
de.inherits(Xr, Ee, {
  __CANCEL__: !0
});
function py(r, e, t) {
  const n = t.config.validateStatus;
  !t.status || !n || n(t.status) ? r(t) : e(new Ee(
    "Request failed with status code " + t.status,
    [Ee.ERR_BAD_REQUEST, Ee.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
var _y = xt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, e, t, n, i, o) {
      const s = [r + "=" + encodeURIComponent(e)];
      de.isNumber(t) && s.push("expires=" + new Date(t).toGMTString()), de.isString(n) && s.push("path=" + n), de.isString(i) && s.push("domain=" + i), o === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(r) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(r) {
      this.write(r, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function vy(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function yy(r, e) {
  return e ? r.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r;
}
function Uc(r, e) {
  return r && !vy(e) ? yy(r, e) : e;
}
var xy = xt.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
    let n;
    function i(o) {
      let s = o;
      return e && (t.setAttribute("href", s), s = t.href), t.setAttribute("href", s), {
        href: t.href,
        protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
        host: t.host,
        search: t.search ? t.search.replace(/^\?/, "") : "",
        hash: t.hash ? t.hash.replace(/^#/, "") : "",
        hostname: t.hostname,
        port: t.port,
        pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
      };
    }
    return n = i(window.location.href), function(s) {
      const a = de.isString(s) ? i(s) : s;
      return a.protocol === n.protocol && a.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function gy(r) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return e && e[1] || "";
}
function by(r, e) {
  r = r || 10;
  const t = new Array(r), n = new Array(r);
  let i = 0, o = 0, s;
  return e = e !== void 0 ? e : 1e3, function(f) {
    const u = Date.now(), c = n[o];
    s || (s = u), t[i] = f, n[i] = u;
    let h = o, y = 0;
    for (; h !== i; )
      y += t[h++], h = h % r;
    if (i = (i + 1) % r, i === o && (o = (o + 1) % r), u - s < e)
      return;
    const T = c && u - c;
    return T ? Math.round(y * 1e3 / T) : void 0;
  };
}
function gu(r, e) {
  let t = 0;
  const n = by(50, 250);
  return (i) => {
    const o = i.loaded, s = i.lengthComputable ? i.total : void 0, a = o - t, f = n(a), u = o <= s;
    t = o;
    const c = {
      loaded: o,
      total: s,
      progress: s ? o / s : void 0,
      bytes: a,
      rate: f || void 0,
      estimated: f && s && u ? (s - o) / f : void 0,
      event: i
    };
    c[e ? "download" : "upload"] = !0, r(c);
  };
}
const wy = typeof XMLHttpRequest < "u";
var my = wy && function(r) {
  return new Promise(function(t, n) {
    let i = r.data;
    const o = Tt.from(r.headers).normalize();
    let { responseType: s, withXSRFToken: a } = r, f;
    function u() {
      r.cancelToken && r.cancelToken.unsubscribe(f), r.signal && r.signal.removeEventListener("abort", f);
    }
    let c;
    if (de.isFormData(i)) {
      if (xt.hasStandardBrowserEnv || xt.hasStandardBrowserWebWorkerEnv)
        o.setContentType(!1);
      else if ((c = o.getContentType()) !== !1) {
        const [B, ...O] = c ? c.split(";").map((d) => d.trim()).filter(Boolean) : [];
        o.setContentType([B || "multipart/form-data", ...O].join("; "));
      }
    }
    let h = new XMLHttpRequest();
    if (r.auth) {
      const B = r.auth.username || "", O = r.auth.password ? unescape(encodeURIComponent(r.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(B + ":" + O));
    }
    const y = Uc(r.baseURL, r.url);
    h.open(r.method.toUpperCase(), Nc(y, r.params, r.paramsSerializer), !0), h.timeout = r.timeout;
    function T() {
      if (!h)
        return;
      const B = Tt.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), d = {
        data: !s || s === "text" || s === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: B,
        config: r,
        request: h
      };
      py(function(E) {
        t(E), u();
      }, function(E) {
        n(E), u();
      }, d), h = null;
    }
    if ("onloadend" in h ? h.onloadend = T : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(T);
    }, h.onabort = function() {
      h && (n(new Ee("Request aborted", Ee.ECONNABORTED, r, h)), h = null);
    }, h.onerror = function() {
      n(new Ee("Network Error", Ee.ERR_NETWORK, r, h)), h = null;
    }, h.ontimeout = function() {
      let O = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const d = r.transitional || Rc;
      r.timeoutErrorMessage && (O = r.timeoutErrorMessage), n(new Ee(
        O,
        d.clarifyTimeoutError ? Ee.ETIMEDOUT : Ee.ECONNABORTED,
        r,
        h
      )), h = null;
    }, xt.hasStandardBrowserEnv && (a && de.isFunction(a) && (a = a(r)), a || a !== !1 && xy(y))) {
      const B = r.xsrfHeaderName && r.xsrfCookieName && _y.read(r.xsrfCookieName);
      B && o.set(r.xsrfHeaderName, B);
    }
    i === void 0 && o.setContentType(null), "setRequestHeader" in h && de.forEach(o.toJSON(), function(O, d) {
      h.setRequestHeader(d, O);
    }), de.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials), s && s !== "json" && (h.responseType = r.responseType), typeof r.onDownloadProgress == "function" && h.addEventListener("progress", gu(r.onDownloadProgress, !0)), typeof r.onUploadProgress == "function" && h.upload && h.upload.addEventListener("progress", gu(r.onUploadProgress)), (r.cancelToken || r.signal) && (f = (B) => {
      h && (n(!B || B.type ? new Xr(null, r, h) : B), h.abort(), h = null);
    }, r.cancelToken && r.cancelToken.subscribe(f), r.signal && (r.signal.aborted ? f() : r.signal.addEventListener("abort", f)));
    const A = gy(y);
    if (A && xt.protocols.indexOf(A) === -1) {
      n(new Ee("Unsupported protocol " + A + ":", Ee.ERR_BAD_REQUEST, r));
      return;
    }
    h.send(i || null);
  });
};
const Lo = {
  http: Kv,
  xhr: my
};
de.forEach(Lo, (r, e) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: e });
    } catch {
    }
    Object.defineProperty(r, "adapterName", { value: e });
  }
});
const bu = (r) => `- ${r}`, Ey = (r) => de.isFunction(r) || r === null || r === !1;
var Lc = {
  getAdapter: (r) => {
    r = de.isArray(r) ? r : [r];
    const { length: e } = r;
    let t, n;
    const i = {};
    for (let o = 0; o < e; o++) {
      t = r[o];
      let s;
      if (n = t, !Ey(t) && (n = Lo[(s = String(t)).toLowerCase()], n === void 0))
        throw new Ee(`Unknown adapter '${s}'`);
      if (n)
        break;
      i[s || "#" + o] = n;
    }
    if (!n) {
      const o = Object.entries(i).map(
        ([a, f]) => `adapter ${a} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = e ? o.length > 1 ? `since :
` + o.map(bu).join(`
`) : " " + bu(o[0]) : "as no adapter specified";
      throw new Ee(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Lo
};
function _o(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Xr(null, r);
}
function wu(r) {
  return _o(r), r.headers = Tt.from(r.headers), r.data = po.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), Lc.getAdapter(r.adapter || cs.adapter)(r).then(function(n) {
    return _o(r), n.data = po.call(
      r,
      r.transformResponse,
      n
    ), n.headers = Tt.from(n.headers), n;
  }, function(n) {
    return jc(n) || (_o(r), n && n.response && (n.response.data = po.call(
      r,
      r.transformResponse,
      n.response
    ), n.response.headers = Tt.from(n.response.headers))), Promise.reject(n);
  });
}
const mu = (r) => r instanceof Tt ? { ...r } : r;
function Sr(r, e) {
  e = e || {};
  const t = {};
  function n(u, c, h) {
    return de.isPlainObject(u) && de.isPlainObject(c) ? de.merge.call({ caseless: h }, u, c) : de.isPlainObject(c) ? de.merge({}, c) : de.isArray(c) ? c.slice() : c;
  }
  function i(u, c, h) {
    if (de.isUndefined(c)) {
      if (!de.isUndefined(u))
        return n(void 0, u, h);
    } else
      return n(u, c, h);
  }
  function o(u, c) {
    if (!de.isUndefined(c))
      return n(void 0, c);
  }
  function s(u, c) {
    if (de.isUndefined(c)) {
      if (!de.isUndefined(u))
        return n(void 0, u);
    } else
      return n(void 0, c);
  }
  function a(u, c, h) {
    if (h in e)
      return n(u, c);
    if (h in r)
      return n(void 0, u);
  }
  const f = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (u, c) => i(mu(u), mu(c), !0)
  };
  return de.forEach(Object.keys(Object.assign({}, r, e)), function(c) {
    const h = f[c] || i, y = h(r[c], e[c], c);
    de.isUndefined(y) && h !== a || (t[c] = y);
  }), t;
}
const qc = "1.6.8", ls = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, e) => {
  ls[r] = function(n) {
    return typeof n === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
const Eu = {};
ls.transitional = function(e, t, n) {
  function i(o, s) {
    return "[Axios v" + qc + "] Transitional option '" + o + "'" + s + (n ? ". " + n : "");
  }
  return (o, s, a) => {
    if (e === !1)
      throw new Ee(
        i(s, " has been removed" + (t ? " in " + t : "")),
        Ee.ERR_DEPRECATED
      );
    return t && !Eu[s] && (Eu[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(o, s, a) : !0;
  };
};
function Sy(r, e, t) {
  if (typeof r != "object")
    throw new Ee("options must be an object", Ee.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(r);
  let i = n.length;
  for (; i-- > 0; ) {
    const o = n[i], s = e[o];
    if (s) {
      const a = r[o], f = a === void 0 || s(a, o, r);
      if (f !== !0)
        throw new Ee("option " + o + " must be " + f, Ee.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new Ee("Unknown option " + o, Ee.ERR_BAD_OPTION);
  }
}
var qo = {
  assertOptions: Sy,
  validators: ls
};
const kt = qo.validators;
class bn {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new yu(),
      response: new yu()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (n) {
      if (n instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
      }
      throw n;
    }
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = Sr(this.defaults, t);
    const { transitional: n, paramsSerializer: i, headers: o } = t;
    n !== void 0 && qo.assertOptions(n, {
      silentJSONParsing: kt.transitional(kt.boolean),
      forcedJSONParsing: kt.transitional(kt.boolean),
      clarifyTimeoutError: kt.transitional(kt.boolean)
    }, !1), i != null && (de.isFunction(i) ? t.paramsSerializer = {
      serialize: i
    } : qo.assertOptions(i, {
      encode: kt.function,
      serialize: kt.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let s = o && de.merge(
      o.common,
      o[t.method]
    );
    o && de.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (A) => {
        delete o[A];
      }
    ), t.headers = Tt.concat(s, o);
    const a = [];
    let f = !0;
    this.interceptors.request.forEach(function(B) {
      typeof B.runWhen == "function" && B.runWhen(t) === !1 || (f = f && B.synchronous, a.unshift(B.fulfilled, B.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(B) {
      u.push(B.fulfilled, B.rejected);
    });
    let c, h = 0, y;
    if (!f) {
      const A = [wu.bind(this), void 0];
      for (A.unshift.apply(A, a), A.push.apply(A, u), y = A.length, c = Promise.resolve(t); h < y; )
        c = c.then(A[h++], A[h++]);
      return c;
    }
    y = a.length;
    let T = t;
    for (h = 0; h < y; ) {
      const A = a[h++], B = a[h++];
      try {
        T = A(T);
      } catch (O) {
        B.call(this, O);
        break;
      }
    }
    try {
      c = wu.call(this, T);
    } catch (A) {
      return Promise.reject(A);
    }
    for (h = 0, y = u.length; h < y; )
      c = c.then(u[h++], u[h++]);
    return c;
  }
  getUri(e) {
    e = Sr(this.defaults, e);
    const t = Uc(e.baseURL, e.url);
    return Nc(t, e.params, e.paramsSerializer);
  }
}
de.forEach(["delete", "get", "head", "options"], function(e) {
  bn.prototype[e] = function(t, n) {
    return this.request(Sr(n || {}, {
      method: e,
      url: t,
      data: (n || {}).data
    }));
  };
});
de.forEach(["post", "put", "patch"], function(e) {
  function t(n) {
    return function(o, s, a) {
      return this.request(Sr(a || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  bn.prototype[e] = t(), bn.prototype[e + "Form"] = t(!0);
});
var dn = bn;
class hs {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(o) {
      t = o;
    });
    const n = this;
    this.promise.then((i) => {
      if (!n._listeners)
        return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](i);
      n._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const s = new Promise((a) => {
        n.subscribe(a), o = a;
      }).then(i);
      return s.cancel = function() {
        n.unsubscribe(o);
      }, s;
    }, e(function(o, s, a) {
      n.reason || (n.reason = new Xr(o, s, a), t(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new hs(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
}
var Ay = hs;
function By(r) {
  return function(t) {
    return r.apply(null, t);
  };
}
function Cy(r) {
  return de.isObject(r) && r.isAxiosError === !0;
}
const Ho = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ho).forEach(([r, e]) => {
  Ho[e] = r;
});
var Ty = Ho;
function Hc(r) {
  const e = new dn(r), t = mc(dn.prototype.request, e);
  return de.extend(t, dn.prototype, e, { allOwnKeys: !0 }), de.extend(t, e, null, { allOwnKeys: !0 }), t.create = function(i) {
    return Hc(Sr(r, i));
  }, t;
}
const je = Hc(cs);
je.Axios = dn;
je.CanceledError = Xr;
je.CancelToken = Ay;
je.isCancel = jc;
je.VERSION = qc;
je.toFormData = Hn;
je.AxiosError = Ee;
je.Cancel = je.CanceledError;
je.all = function(e) {
  return Promise.all(e);
};
je.spread = By;
je.isAxiosError = Cy;
je.mergeConfig = Sr;
je.AxiosHeaders = Tt;
je.formToJSON = (r) => kc(de.isHTMLForm(r) ? new FormData(r) : r);
je.getAdapter = Lc.getAdapter;
je.HttpStatusCode = Ty;
je.default = je;
var Dy = je;
(function(r) {
  var e = Q && Q.__extends || /* @__PURE__ */ function() {
    var S = function(C, m) {
      return S = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(D, w) {
        D.__proto__ = w;
      } || function(D, w) {
        for (var F in w)
          Object.prototype.hasOwnProperty.call(w, F) && (D[F] = w[F]);
      }, S(C, m);
    };
    return function(C, m) {
      if (typeof m != "function" && m !== null)
        throw new TypeError("Class extends value " + String(m) + " is not a constructor or null");
      S(C, m);
      function D() {
        this.constructor = C;
      }
      C.prototype = m === null ? Object.create(m) : (D.prototype = m.prototype, new D());
    };
  }(), t = Q && Q.__createBinding || (Object.create ? function(S, C, m, D) {
    D === void 0 && (D = m);
    var w = Object.getOwnPropertyDescriptor(C, m);
    (!w || ("get" in w ? !C.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: function() {
      return C[m];
    } }), Object.defineProperty(S, D, w);
  } : function(S, C, m, D) {
    D === void 0 && (D = m), S[D] = C[m];
  }), n = Q && Q.__setModuleDefault || (Object.create ? function(S, C) {
    Object.defineProperty(S, "default", { enumerable: !0, value: C });
  } : function(S, C) {
    S.default = C;
  }), i = Q && Q.__importStar || function(S) {
    if (S && S.__esModule)
      return S;
    var C = {};
    if (S != null)
      for (var m in S)
        m !== "default" && Object.prototype.hasOwnProperty.call(S, m) && t(C, S, m);
    return n(C, S), C;
  }, o = Q && Q.__generator || function(S, C) {
    var m = { label: 0, sent: function() {
      if (F[0] & 1)
        throw F[1];
      return F[1];
    }, trys: [], ops: [] }, D, w, F, L;
    return L = { next: z(0), throw: z(1), return: z(2) }, typeof Symbol == "function" && (L[Symbol.iterator] = function() {
      return this;
    }), L;
    function z(Z) {
      return function(ne) {
        return V([Z, ne]);
      };
    }
    function V(Z) {
      if (D)
        throw new TypeError("Generator is already executing.");
      for (; L && (L = 0, Z[0] && (m = 0)), m; )
        try {
          if (D = 1, w && (F = Z[0] & 2 ? w.return : Z[0] ? w.throw || ((F = w.return) && F.call(w), 0) : w.next) && !(F = F.call(w, Z[1])).done)
            return F;
          switch (w = 0, F && (Z = [Z[0] & 2, F.value]), Z[0]) {
            case 0:
            case 1:
              F = Z;
              break;
            case 4:
              return m.label++, { value: Z[1], done: !1 };
            case 5:
              m.label++, w = Z[1], Z = [0];
              continue;
            case 7:
              Z = m.ops.pop(), m.trys.pop();
              continue;
            default:
              if (F = m.trys, !(F = F.length > 0 && F[F.length - 1]) && (Z[0] === 6 || Z[0] === 2)) {
                m = 0;
                continue;
              }
              if (Z[0] === 3 && (!F || Z[1] > F[0] && Z[1] < F[3])) {
                m.label = Z[1];
                break;
              }
              if (Z[0] === 6 && m.label < F[1]) {
                m.label = F[1], F = Z;
                break;
              }
              if (F && m.label < F[2]) {
                m.label = F[2], m.ops.push(Z);
                break;
              }
              F[2] && m.ops.pop(), m.trys.pop();
              continue;
          }
          Z = C.call(S, m);
        } catch (ne) {
          Z = [6, ne], w = 0;
        } finally {
          D = F = 0;
        }
      if (Z[0] & 5)
        throw Z[1];
      return { value: Z[0] ? Z[1] : void 0, done: !0 };
    }
  }, s = Q && Q.__values || function(S) {
    var C = typeof Symbol == "function" && Symbol.iterator, m = C && S[C], D = 0;
    if (m)
      return m.call(S);
    if (S && typeof S.length == "number")
      return {
        next: function() {
          return S && D >= S.length && (S = void 0), { value: S && S[D++], done: !S };
        }
      };
    throw new TypeError(C ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), r.HttpClientConnectionManager = r.HttpClientStream = r.HttpClientConnection = r.HttpRequest = r.HttpProxyOptions = r.HttpHeaders = r.HttpProxyAuthenticationType = void 0;
  var a = ko, f = ko;
  Object.defineProperty(r, "HttpProxyAuthenticationType", { enumerable: !0, get: function() {
    return f.HttpProxyAuthenticationType;
  } });
  var u = Br, c = Rt, h = i(Dy), y = En, T = Ar, A = (
    /** @class */
    function() {
      function S(C) {
        var m, D;
        C === void 0 && (C = []), this.headers = {};
        try {
          for (var w = s(C), F = w.next(); !F.done; F = w.next()) {
            var L = F.value;
            this.add(L[0], L[1]);
          }
        } catch (z) {
          m = { error: z };
        } finally {
          try {
            F && !F.done && (D = w.return) && D.call(w);
          } finally {
            if (m)
              throw m.error;
          }
        }
      }
      return Object.defineProperty(S.prototype, "length", {
        /**
         * Fetches the total length of all headers
         *
         * @returns the total length of all headers
         */
        get: function() {
          var C = 0;
          for (var m in this.headers)
            C += this.headers[m].length;
          return C;
        },
        enumerable: !1,
        configurable: !0
      }), S.prototype.add = function(C, m) {
        var D = this.headers[C.toLowerCase()];
        D ? D.push([C, m]) : this.headers[C.toLowerCase()] = [[C, m]];
      }, S.prototype.set = function(C, m) {
        this.headers[C.toLowerCase()] = [[C, m]];
      }, S.prototype.get_values = function(C) {
        var m, D, w = [], F = this.headers[C.toLowerCase()] || [];
        try {
          for (var L = s(F), z = L.next(); !z.done; z = L.next()) {
            var V = z.value;
            w.push(V[1]);
          }
        } catch (Z) {
          m = { error: Z };
        } finally {
          try {
            z && !z.done && (D = L.return) && D.call(L);
          } finally {
            if (m)
              throw m.error;
          }
        }
        return w;
      }, S.prototype.get = function(C, m) {
        m === void 0 && (m = "");
        var D = this.headers[C.toLowerCase()];
        return D && D[0][1] || m;
      }, S.prototype.remove = function(C) {
        delete this.headers[C.toLowerCase()];
      }, S.prototype.remove_value = function(C, m) {
        for (var D = C.toLowerCase(), w = this.headers[D], F = 0; F < w.length; ++F) {
          var L = w[F];
          if (L[1] === m) {
            w.length === 1 ? delete this.headers[D] : delete w[F];
            return;
          }
        }
      }, S.prototype.clear = function() {
        this.headers = {};
      }, S.prototype[Symbol.iterator] = function() {
        var C, m, D, w, F, L, z, V, Z, ne, ie, R;
        return o(this, function(U) {
          switch (U.label) {
            case 0:
              C = this.headers, m = [];
              for (D in C)
                m.push(D);
              w = 0, U.label = 1;
            case 1:
              if (!(w < m.length))
                return [3, 10];
              if (D = m[w], !(D in C))
                return [3, 9];
              F = D, L = this.headers[F], U.label = 2;
            case 2:
              U.trys.push([2, 7, 8, 9]), z = (ie = void 0, s(L)), V = z.next(), U.label = 3;
            case 3:
              return V.done ? [3, 6] : (Z = V.value, [4, Z]);
            case 4:
              U.sent(), U.label = 5;
            case 5:
              return V = z.next(), [3, 3];
            case 6:
              return [3, 9];
            case 7:
              return ne = U.sent(), ie = { error: ne }, [3, 9];
            case 8:
              try {
                V && !V.done && (R = z.return) && R.call(z);
              } finally {
                if (ie)
                  throw ie.error;
              }
              return [
                7
                /*endfinally*/
              ];
            case 9:
              return w++, [3, 1];
            case 10:
              return [
                2
                /*return*/
              ];
          }
        });
      }, S.prototype._flatten = function() {
        var C, m, D = [];
        try {
          for (var w = s(this), F = w.next(); !F.done; F = w.next()) {
            var L = F.value;
            D.push(L);
          }
        } catch (z) {
          C = { error: z };
        } finally {
          try {
            F && !F.done && (m = w.return) && m.call(w);
          } finally {
            if (C)
              throw C.error;
          }
        }
        return D;
      }, S;
    }()
  );
  r.HttpHeaders = A;
  var B = (
    /** @class */
    function(S) {
      e(C, S);
      function C() {
        return S !== null && S.apply(this, arguments) || this;
      }
      return C;
    }(a.CommonHttpProxyOptions)
  );
  r.HttpProxyOptions = B;
  var O = (
    /** @class */
    /* @__PURE__ */ function() {
      function S(C, m, D, w) {
        D === void 0 && (D = new A()), this.method = C, this.path = m, this.headers = D, this.body = w;
      }
      return S;
    }()
  );
  r.HttpRequest = O;
  var d = (
    /** @class */
    function(S) {
      e(C, S);
      function C(m, D, w, F, L, z) {
        var V = S.call(this) || this;
        V.cork(), V.bootstrap = m, V.socket_options = F, V.tls_options = L, V.proxy_options = z;
        var Z = V.tls_options || w === 443 ? "https" : "http";
        return V.axios_options = {
          baseURL: "".concat(Z, "://").concat(D, ":").concat(w, "/")
        }, V.proxy_options && (V.axios_options.proxy = {
          host: V.proxy_options.host_name,
          port: V.proxy_options.port
        }, V.proxy_options.auth_method == a.HttpProxyAuthenticationType.Basic && (V.axios_options.proxy.auth = {
          username: V.proxy_options.auth_username || "",
          password: V.proxy_options.auth_password || ""
        })), V._axios = h.default.create(V.axios_options), setTimeout(function() {
          V.emit("connect");
        }, 0), V;
      }
      return C.prototype.on = function(m, D) {
        var w = this;
        return S.prototype.on.call(this, m, D), m == "connect" && setTimeout(function() {
          w.uncork();
        }, 0), this;
      }, C.prototype.request = function(m) {
        return _(this, m);
      }, C.prototype.close = function() {
        this.emit("close"), this._axios = void 0;
      }, C.CONNECT = "connect", C.ERROR = "error", C.CLOSE = "close", C;
    }(u.BufferedEventEmitter)
  );
  r.HttpClientConnection = d;
  function _(S, C) {
    if (C == null || C == null)
      throw new c.CrtError("HttpClientConnection stream_request: request not defined");
    var m = function(F) {
      var L, z, V = ["host", "user-agent"], Z = {};
      try {
        for (var ne = s(F), ie = ne.next(); !ie.done; ie = ne.next()) {
          var R = ie.value;
          V.indexOf(R[0].toLowerCase()) == -1 && (Z[R[0]] = F.get(R[0]));
        }
      } catch (U) {
        L = { error: U };
      } finally {
        try {
          ie && !ie.done && (z = ne.return) && z.call(ne);
        } finally {
          if (L)
            throw L.error;
        }
      }
      return Z;
    }, D = C.body ? C.body.data : void 0, w = E._create(S);
    return w.connection._axios.request({
      url: C.path,
      method: C.method.toLowerCase(),
      headers: m(C.headers),
      body: D
    }).then(function(F) {
      w._on_response(F);
    }).catch(function(F) {
      w._on_error(F);
    }), w;
  }
  var E = (
    /** @class */
    function(S) {
      e(C, S);
      function C(m) {
        var D = S.call(this) || this;
        return D.connection = m, D.cork(), D;
      }
      return C.prototype.status_code = function() {
        return this.response_status_code;
      }, C.prototype.activate = function() {
        var m = this;
        setTimeout(function() {
          m.uncork();
        }, 0);
      }, C.prototype.on = function(m, D) {
        return S.prototype.on.call(this, m, D);
      }, C._create = function(m) {
        return new C(m);
      }, C.prototype._on_response = function(m) {
        this.response_status_code = m.status;
        var D = new A();
        for (var w in m.headers)
          D.add(w, m.headers[w]);
        this.emit("response", this.response_status_code, D);
        var F = m.data;
        F && !(F instanceof ArrayBuffer) && (F = (0, T.fromUtf8)(F.toString())), this.emit("data", F), this.emit("end");
      }, C.prototype._on_error = function(m) {
        var D = "";
        m.response ? (this.response_status_code = m.response.status, D += "status_code=".concat(m.response.status), m.response.headers && (D += " headers=".concat(JSON.stringify(m.response.headers))), m.response.data && (D += " data=".concat(m.response.data))) : D = "No response from server", this.connection.close(), this.emit("error", new Error("msg=".concat(m.message, ", connection=").concat(JSON.stringify(this.connection), ", info=").concat(D)));
      }, C.RESPONSE = "response", C.DATA = "data", C.ERROR = "error", C.END = "end", C;
    }(u.BufferedEventEmitter)
  );
  r.HttpClientStream = E;
  var M = (
    /** @class */
    function() {
      function S(C, m, D, w, F, L, z, V) {
        this.bootstrap = C, this.host = m, this.port = D, this.max_connections = w, this.initial_window_size = F, this.socket_options = L, this.tls_opts = z, this.proxy_options = V, this.pending_connections = /* @__PURE__ */ new Set(), this.live_connections = /* @__PURE__ */ new Set(), this.free_connections = [], this.pending_requests = [];
      }
      return S.prototype.remove = function(C) {
        this.pending_connections.delete(C), this.live_connections.delete(C);
        var m = this.free_connections.indexOf(C);
        m != -1 && this.free_connections.splice(m, 1);
      }, S.prototype.resolve = function(C) {
        var m = this.pending_requests.shift();
        m ? m.resolve(C) : this.free_connections.push(C);
      }, S.prototype.reject = function(C) {
        var m = this.pending_requests.shift();
        m && m.reject(C);
      }, S.prototype.pump = function() {
        var C = this;
        if (this.pending_requests.length != 0) {
          {
            var m = this.free_connections.pop();
            if (m)
              return this.resolve(m);
          }
          if (this.live_connections.size + this.pending_connections.size != this.max_connections) {
            var D = new d(new y.ClientBootstrap(), this.host, this.port, this.socket_options, this.tls_opts, this.proxy_options);
            this.pending_connections.add(D);
            var w = function() {
              C.pending_connections.delete(D), C.live_connections.add(D), C.free_connections.push(D), C.resolve(D);
            }, F = function(z) {
              if (C.pending_connections.has(D))
                return C.reject(new c.CrtError(z));
              C.remove(D), C.pump();
            }, L = function() {
              C.remove(D), C.pump();
            };
            D.on("connect", w), D.on("error", F), D.on("close", L);
          }
        }
      }, S.prototype.acquire = function() {
        var C = this;
        return new Promise(function(m, D) {
          C.pending_requests.push({
            resolve: m,
            reject: D
          }), C.pump();
        });
      }, S.prototype.release = function(C) {
        this.free_connections.push(C), this.pump();
      }, S.prototype.close = function() {
        this.pending_requests.forEach(function(C) {
          C.reject(new c.CrtError("HttpClientConnectionManager shutting down"));
        });
      }, S;
    }()
  );
  r.HttpClientConnectionManager = M;
})(wc);
var qe = {}, Fy = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), Oy = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), My = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && Fy(e, r, t);
  return Oy(e, r), e;
};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.hmac_sha256 = qe.Sha256Hmac = qe.hash_sha1 = qe.Sha1Hash = qe.hash_sha256 = qe.Sha256Hash = qe.hash_md5 = qe.Md5Hash = void 0;
var nr = My(_c), Tr = Ar, $c = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.update = function(e) {
      this.hash = nr.MD5(e.toString(), this.hash ? this.hash.toString() : void 0);
    }, r.prototype.finalize = function(e) {
      var t = this.hash ? this.hash.toString() : "", n = t.substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
      return new DataView(i.buffer);
    }, r;
  }()
);
qe.Md5Hash = $c;
function Iy(r, e) {
  var t = new $c();
  return t.update(r), t.finalize(e);
}
qe.hash_md5 = Iy;
var Ny = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.update = function(e) {
      this.hash = nr.SHA256(e.toString(), this.hash ? this.hash.toString() : void 0);
    }, r.prototype.finalize = function(e) {
      var t = this.hash ? this.hash.toString() : "", n = t.substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
      return new DataView(i.buffer);
    }, r;
  }()
);
qe.Sha256Hash = Ny;
function Ry(r, e) {
  var t = nr.SHA256(r.toString()).toString(), n = t.substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
  return new DataView(i.buffer);
}
qe.hash_sha256 = Ry;
var Py = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.update = function(e) {
      this.hash = nr.SHA1(e.toString(), this.hash ? this.hash.toString() : void 0);
    }, r.prototype.finalize = function(e) {
      var t = this.hash ? this.hash.toString() : "", n = t.substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
      return new DataView(i.buffer);
    }, r;
  }()
);
qe.Sha1Hash = Py;
function ky(r, e) {
  var t = nr.SHA1(r.toString()).toString(), n = t.substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
  return new DataView(i.buffer);
}
qe.hash_sha1 = ky;
var Wc = (
  /** @class */
  function() {
    function r(e) {
      this.hmac = nr.algo.HMAC.create(nr.algo.SHA256, e);
    }
    return r.prototype.update = function(e) {
      this.hmac.update(e.toString());
    }, r.prototype.finalize = function(e) {
      var t = this.hmac.finalize(), n = t.toString().substring(0, e || t.length), i = (0, Tr.fromUtf8)(n);
      return new DataView(i.buffer);
    }, r;
  }()
);
qe.Sha256Hmac = Wc;
function jy(r, e, t) {
  var n = new Wc(r);
  return n.update(e), n.finalize(t);
}
qe.hmac_sha256 = jy;
var zc = {}, Wn = {}, Uy = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), Ly = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), Kc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && Uy(e, r, t);
  return Ly(e, r), e;
}, qy = Q && Q.__read || function(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), i, o = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}, Hy = Q && Q.__spreadArray || function(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.AwsIotMqttConnectionConfigBuilder = void 0;
var $y = Gt, Wy = En, zy = Kc(nt), Su = Kc(He), Ky = (
  /** @class */
  function() {
    function r() {
      this.params = {
        client_id: "",
        host_name: "",
        socket_options: new Wy.SocketOptions(),
        port: 443,
        clean_session: !1,
        keep_alive: void 0,
        will: void 0,
        username: "",
        password: void 0,
        websocket: {},
        credentials_provider: void 0
      };
    }
    return r.new_mtls_builder = function() {
      return r.new_builder_for_websocket();
    }, r.new_default_builder = function() {
      return r.new_builder_for_websocket();
    }, r.new_websocket_builder = function() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      return this.new_with_websockets.apply(this, Hy([], qy(e), !1));
    }, r.new_with_websockets = function() {
      return r.new_builder_for_websocket();
    }, r.new_builder_for_websocket = function() {
      var e = new r();
      return e;
    }, r.prototype.with_endpoint = function(e) {
      return this.params.host_name = e, this;
    }, r.prototype.with_client_id = function(e) {
      return this.params.client_id = e, this;
    }, r.prototype.with_port = function(e) {
      return this.params.port = e, this;
    }, r.prototype.with_clean_session = function(e) {
      return this.params.clean_session = e, this;
    }, r.prototype.with_use_websockets = function() {
      return this;
    }, r.prototype.with_keep_alive_seconds = function(e) {
      return this.params.keep_alive = e, this;
    }, r.prototype.with_timeout_ms = function(e) {
      return this.with_ping_timeout_ms(e), this;
    }, r.prototype.with_ping_timeout_ms = function(e) {
      return this.params.ping_timeout = e, this;
    }, r.prototype.with_will = function(e) {
      return this.params.will = e, this;
    }, r.prototype.with_socket_options = function(e) {
      return this.params.socket_options = e, this;
    }, r.prototype.with_websocket_headers = function(e) {
      return this.params.websocket = {
        headers: e
      }, this;
    }, r.prototype.with_credentials = function(e, t, n, i) {
      var o = new $y.StaticCredentialProvider({
        aws_region: e,
        aws_access_id: t,
        aws_secret_key: n,
        aws_sts_token: i
      });
      return this.params.credentials_provider = o, this;
    }, r.prototype.with_credential_provider = function(e) {
      return this.params.credentials_provider = e, this;
    }, r.prototype.with_custom_authorizer = function(e, t, n, i, o, s) {
      var a = Su.canonicalizeCustomAuthTokenSignature(n), f = Su.populate_username_string_with_custom_authorizer("", e, t, a, this.params.username, o, s);
      return this.params.username = f, this.params.password = i, this.params.websocket && (this.params.websocket.protocol = "wss-custom-auth"), this;
    }, r.prototype.with_username = function(e) {
      return this.params.username = e, this;
    }, r.prototype.with_password = function(e) {
      return this.params.password = e, this;
    }, r.prototype.with_reconnect_max_sec = function(e) {
      return this.params.reconnect_max_sec = e, this;
    }, r.prototype.with_reconnect_min_sec = function(e) {
      return this.params.reconnect_min_sec = e, this;
    }, r.prototype.build = function() {
      if (this.params.client_id === void 0 || this.params.host_name === void 0)
        throw "client_id and endpoint are required";
      return this.params.username == null || this.params.username == null || this.params.username == "" ? this.params.username = "?SDK=NodeJSv2&Version=" : this.params.username.indexOf("?") != -1 ? this.params.username += "&SDK=NodeJSv2&Version=" : this.params.username += "?SDK=NodeJSv2&Version=", this.params.username += zy.crt_version(), this.params;
    }, r;
  }()
);
Wn.AwsIotMqttConnectionConfigBuilder = Ky;
var zn = {}, Vy = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), Gy = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), Vc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && Vy(e, r, t);
  return Gy(e, r), e;
};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.AwsIotMqtt5ClientConfigBuilder = void 0;
var Au = Vc(Mn()), vo = Vc(He), Qy = Rt, Jy = (
  /** @class */
  function() {
    function r(e, t, n) {
      this.config = {
        hostName: e,
        port: t,
        connectProperties: {
          keepAliveIntervalSeconds: r.DEFAULT_KEEP_ALIVE
        },
        websocketOptions: n
      };
    }
    return r.newWebsocketMqttBuilderWithSigv4Auth = function(e, t) {
      var n;
      if (t == null || t == null)
        throw new Qy.CrtError("AwsIotMqtt5ClientConfigBuilder newWebsocketMqttBuilderWithSigv4Auth: sigv4Config not defined");
      var i = (n = t.region) !== null && n !== void 0 ? n : vo.extractRegionFromEndpoint(e), o = {
        urlFactoryOptions: {
          urlFactory: Au.Mqtt5WebsocketUrlFactoryType.Sigv4,
          region: i,
          credentialsProvider: t.credentialsProvider
        }
      }, s = new r(e, r.DEFAULT_WEBSOCKET_MQTT_PORT, o);
      return s;
    }, r.newWebsocketMqttBuilderWithCustomAuth = function(e, t) {
      var n = {
        urlFactoryOptions: {
          urlFactory: Au.Mqtt5WebsocketUrlFactoryType.Wss
        }
      }, i = new r(e, r.DEFAULT_WEBSOCKET_MQTT_PORT, n);
      return i.customAuthConfig = vo.canonicalizeCustomAuthConfig(t), i;
    }, r.prototype.withPort = function(e) {
      return this.config.port = e, this;
    }, r.prototype.withConnectProperties = function(e) {
      return this.config.connectProperties = e, this;
    }, r.prototype.withSessionBehavior = function(e) {
      return this.config.sessionBehavior = e, this;
    }, r.prototype.withRetryJitterMode = function(e) {
      return this.config.retryJitterMode = e, this;
    }, r.prototype.withMinReconnectDelayMs = function(e) {
      return this.config.minReconnectDelayMs = e, this;
    }, r.prototype.withMaxReconnectDelayMs = function(e) {
      return this.config.maxReconnectDelayMs = e, this;
    }, r.prototype.withMinConnectedTimeToResetReconnectDelayMs = function(e) {
      return this.config.minConnectedTimeToResetReconnectDelayMs = e, this;
    }, r.prototype.withConnectTimeoutMs = function(e) {
      return this.config.connectTimeoutMs = e, this;
    }, r.prototype.withWebsocketTransportOptions = function(e) {
      return this.config.websocketOptions && (this.config.websocketOptions.wsOptions = e), this;
    }, r.prototype.build = function() {
      var e, t;
      return this.config.connectProperties && (this.config.connectProperties.username = vo.buildMqtt5FinalUsername(this.customAuthConfig), !((e = this.customAuthConfig) === null || e === void 0) && e.password && (this.config.connectProperties.password = (t = this.customAuthConfig) === null || t === void 0 ? void 0 : t.password)), this.config;
    }, r.DEFAULT_WEBSOCKET_MQTT_PORT = 443, r;
  }()
);
zn.AwsIotMqtt5ClientConfigBuilder = Jy;
(function(r) {
  var e = Q && Q.__createBinding || (Object.create ? function(n, i, o, s) {
    s === void 0 && (s = o);
    var a = Object.getOwnPropertyDescriptor(i, o);
    (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
      return i[o];
    } }), Object.defineProperty(n, s, a);
  } : function(n, i, o, s) {
    s === void 0 && (s = o), n[s] = i[o];
  }), t = Q && Q.__exportStar || function(n, i) {
    for (var o in n)
      o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && e(i, n, o);
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), t(Wn, r), t(zn, r);
})(zc);
var Bu;
function Kn() {
  return Bu || (Bu = 1, function(r) {
    var e = Q && Q.__createBinding || (Object.create ? function(O, d, _, E) {
      E === void 0 && (E = _);
      var M = Object.getOwnPropertyDescriptor(d, _);
      (!M || ("get" in M ? !d.__esModule : M.writable || M.configurable)) && (M = { enumerable: !0, get: function() {
        return d[_];
      } }), Object.defineProperty(O, E, M);
    } : function(O, d, _, E) {
      E === void 0 && (E = _), O[E] = d[_];
    }), t = Q && Q.__setModuleDefault || (Object.create ? function(O, d) {
      Object.defineProperty(O, "default", { enumerable: !0, value: d });
    } : function(O, d) {
      O.default = d;
    }), n = Q && Q.__importStar || function(O) {
      if (O && O.__esModule)
        return O;
      var d = {};
      if (O != null)
        for (var _ in O)
          _ !== "default" && Object.prototype.hasOwnProperty.call(O, _) && e(d, O, _);
      return t(d, O), d;
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.CrtError = r.resource_safety = r.promise = r.platform = r.mqtt5 = r.mqtt = r.iot = r.io = r.http = r.crypto = r.cancel = r.auth = void 0;
    var i = n(ju);
    r.cancel = i;
    var o = n(nt);
    r.platform = o;
    var s = n(er);
    r.promise = s;
    var a = n(mn);
    r.resource_safety = a;
    var f = n(En);
    r.io = f;
    var u = n(lv());
    r.mqtt = u;
    var c = n(Mn());
    r.mqtt5 = c;
    var h = n(wc);
    r.http = h;
    var y = n(qe);
    r.crypto = y;
    var T = n(zc);
    r.iot = T;
    var A = n(Gt);
    r.auth = A;
    var B = Rt;
    Object.defineProperty(r, "CrtError", { enumerable: !0, get: function() {
      return B.CrtError;
    } });
  }(Jn)), Jn;
}
var _r = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
};
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.ServiceClientMqtt5Adapter = Ht.ServiceClientMqtt311Adapter = void 0;
const kr = Kn();
class Xy {
  constructor(e) {
    this.connection = e;
  }
  publish(e, t, n) {
    return _r(this, void 0, void 0, function* () {
      return this.connection.publish(e, t, n);
    });
  }
  subscribe(e, t, n) {
    return _r(this, void 0, void 0, function* () {
      return this.connection.subscribe(e, t, n);
    });
  }
}
Ht.ServiceClientMqtt311Adapter = Xy;
class Yy {
  onMessageReceivedHandler(e) {
    var t;
    let n = e.message, i = n.topicName, o = this.subscriptionHandlers.get(i);
    o && o(i, n.payload, !1, n.qos, (t = n.retain) !== null && t !== void 0 ? t : !1);
  }
  constructor(e) {
    this.client = e, this.subscriptionHandlers = /* @__PURE__ */ new Map(), e.on("messageReceived", this.onMessageReceivedHandler.bind(this));
  }
  publish(e, t, n) {
    return _r(this, void 0, void 0, function* () {
      return new Promise((i, o) => _r(this, void 0, void 0, function* () {
        try {
          let s = yield this.client.publish({
            topicName: e,
            payload: t,
            qos: n
          });
          if (s === void 0) {
            n == kr.mqtt.QoS.AtMostOnce ? i({}) : o("Publish failed due to internal error");
            return;
          }
          let a = s;
          kr.mqtt5.isSuccessfulPubackReasonCode(a.reasonCode) ? i({}) : o(new kr.CrtError("Publish failed with reason code: " + a.reasonCode));
        } catch (s) {
          o(s);
        }
      }));
    });
  }
  subscribe(e, t, n) {
    return _r(this, void 0, void 0, function* () {
      return new Promise((i, o) => _r(this, void 0, void 0, function* () {
        try {
          this.subscriptionHandlers.set(e, n);
          let a = (yield this.client.subscribe({
            subscriptions: [{ topicFilter: e, qos: t }]
          })).reasonCodes[0];
          if (kr.mqtt5.isSuccessfulSubackReasonCode(a))
            i({
              topic: e,
              qos: a
            });
          else
            throw new kr.CrtError("Subscribe failed with reason code: " + a);
        } catch (s) {
          this.subscriptionHandlers.delete(e), o(s);
        }
      }));
    });
  }
}
Ht.ServiceClientMqtt5Adapter = Yy;
var Zy = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), ex = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), Gc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && Zy(e, r, t);
  return ex(e, r), e;
}, St = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.IotIdentityClient = jt.IotIdentityError = jt.model = void 0;
const tx = Gc(Ou);
jt.model = tx;
const hr = Ar, Cu = Gc(Ht);
class $o extends Error {
  constructor(e, t) {
    super(e), this.payload = t;
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.prototype = n;
  }
}
jt.IotIdentityError = $o;
class ct {
  static createClientError(e, t) {
    return e instanceof Error ? new $o(e.message, t) : new $o(ct.INVALID_PAYLOAD_PARSING_ERROR, t);
  }
  constructor(e) {
    e !== void 0 && (this.mqttAdapter = new Cu.ServiceClientMqtt311Adapter(e));
  }
  /**
   * Creates a new IotIdentityClient that uses the SDK Mqtt5 client internally.
   *
   * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
   * must support
   *
   * ```
   * new IotIdentityClient(mqtt311connection);
   * ```
   *
   * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
   *
   * @param client the MQTT5 client to use with this service client
   *
   * @returns a new IotIdentityClient instance
   */
  static newFromMqtt5Client(e) {
    let t = new ct();
    return t.mqttAdapter = new Cu.ServiceClientMqtt5Adapter(e), t;
  }
  /**
   * Creates new keys and a certificate. AWS IoT provides client certificates that are signed by the Amazon Root certificate authority (CA). The new certificate has a PENDING_ACTIVATION status. When you call RegisterThing to provision a thing with this certificate, the certificate status changes to ACTIVE or INACTIVE as described in the template.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotIdentity
   */
  publishCreateKeysAndCertificate(e, t) {
    return St(this, void 0, void 0, function* () {
      return this.mqttAdapter.publish("$aws/certificates/create/json", JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic of the CreateKeysAndCertificate operation.
   *
   *
   * subscribeToCreateKeysAndCertificateAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToCreateKeysAndCertificateAccepted(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/certificates/create/json/accepted";
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic of the CreateKeysAndCertificate operation.
   *
   *
   * subscribeToCreateKeysAndCertificateRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToCreateKeysAndCertificateRejected(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/certificates/create/json/rejected";
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic of the RegisterThing operation.
   *
   *
   * subscribeToRegisterThingRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToRegisterThingRejected(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/provisioning-templates/{templateName}/provision/json/rejected";
      i = i.replace("{templateName}", e.templateName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic of the CreateCertificateFromCsr operation.
   *
   *
   * subscribeToCreateCertificateFromCsrAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToCreateCertificateFromCsrAccepted(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/certificates/create-from-csr/json/accepted";
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Provisions an AWS IoT thing using a pre-defined template.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotIdentity
   */
  publishRegisterThing(e, t) {
    return St(this, void 0, void 0, function* () {
      let n = "$aws/provisioning-templates/{templateName}/provision/json";
      return n = n.replace("{templateName}", e.templateName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic of the RegisterThing operation.
   *
   *
   * subscribeToRegisterThingAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToRegisterThingAccepted(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/provisioning-templates/{templateName}/provision/json/accepted";
      i = i.replace("{templateName}", e.templateName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic of the CreateCertificateFromCsr operation.
   *
   *
   * subscribeToCreateCertificateFromCsrRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotIdentity
   */
  subscribeToCreateCertificateFromCsrRejected(e, t, n) {
    return St(this, void 0, void 0, function* () {
      let i = "$aws/certificates/create-from-csr/json/rejected";
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, hr.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = ct.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Creates a certificate from a certificate signing request (CSR). AWS IoT provides client certificates that are signed by the Amazon Root certificate authority (CA). The new certificate has a PENDING_ACTIVATION status. When you call RegisterThing to provision a thing with this certificate, the certificate status changes to ACTIVE or INACTIVE as described in the template.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/provision-wo-cert.html#fleet-provision-api
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotIdentity
   */
  publishCreateCertificateFromCsr(e, t) {
    return St(this, void 0, void 0, function* () {
      return this.mqttAdapter.publish("$aws/certificates/create-from-csr/json", JSON.stringify(e), t);
    });
  }
}
jt.IotIdentityClient = ct;
ct.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
var Ut = {}, gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.DiscoverResponse = gt.GGGroup = gt.GGCore = gt.ConnectivityInfo = void 0;
const ds = Ne;
class Vn {
  constructor(e, t, n, i) {
    this.id = e, this.host_address = t, this.port = n, this.metadata = i;
  }
  /** @internal */
  static from_json(e) {
    return new Vn(e.Id, e.HostAddress, e.PortNumber, e.Metadata);
  }
}
gt.ConnectivityInfo = Vn;
class Gn {
  constructor(e, t) {
    this.thing_arn = e, this.connectivity = t;
  }
  /** @internal */
  static from_json(e) {
    const t = [];
    return e.Connectivity && (0, ds.isArray)(e.Connectivity) && e.Connectivity.forEach((n) => {
      t.push(Vn.from_json(n));
    }), new Gn(e.thingArn, t);
  }
}
gt.GGCore = Gn;
class Qn {
  constructor(e, t = [], n = []) {
    this.gg_group_id = e, this.cores = t, this.certificate_authorities = n;
  }
  /** @internal */
  static from_json(e) {
    const t = [];
    return e.Cores && (0, ds.isArray)(e.Cores) && e.Cores.forEach((n) => {
      t.push(Gn.from_json(n));
    }), new Qn(e.GGGroupId, t, e.CAs);
  }
}
gt.GGGroup = Qn;
class ps {
  constructor(e = []) {
    this.gg_groups = e;
  }
  /** @internal */
  static from_json(e) {
    const t = [];
    return e.GGGroups && (0, ds.isArray)(e.GGGroups) && e.GGGroups.forEach((n) => {
      t.push(Qn.from_json(n));
    }), new ps(t);
  }
}
gt.DiscoverResponse = ps;
var rx = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), nx = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), ix = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && rx(e, r, t);
  return nx(e, r), e;
}, ox = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.DiscoveryClient = Ut.DiscoveryError = Ut.model = void 0;
const Jt = Kn(), sx = Ar, Qc = ix(gt);
Ut.model = Qc;
class Wo extends Error {
  constructor(e, t) {
    super(e), this.response_code = t;
  }
}
Ut.DiscoveryError = Wo;
class ax {
  /**
   *
   * @param bootstrap The `ClientBootstrap` to use to make an HTTP connection to the Greengrass service
   * @param socket_options `SocketOptions` for HTTP connection to the Greengrass service
   * @param tls_ctx TLS Options for the HTTP connection to Greengrass service
   * @param region Region to send Greengrass discovery requests to (ignored if gg_server_name is set)
   * @param gg_server_name Optional name of greengrass endpoint
   */
  constructor(e, t, n, i, o = "") {
    this.bootstrap = e, this.socket_options = t, this.tls_ctx = n, this.region = i, this.gg_server_name = o, this.gg_server_name !== "" ? this.endpoint = this.gg_server_name : this.endpoint = `greengrass-ats.iot.${i}.amazonaws.com`, this.connection_manager = new Jt.http.HttpClientConnectionManager(this.bootstrap, this.endpoint, Jt.io.is_alpn_available() ? 443 : 8443, 4, 16 * 1024, this.socket_options, new Jt.io.TlsConnectionOptions(this.tls_ctx, this.endpoint, Jt.io.is_alpn_available() ? ["x-amzn-http-ca"] : void 0));
  }
  /**
   * Performs the discover API call for the supplied Thing, and returns any associated Greengrass
   * groups/cores/connection info.
   *
   * @param thing_name The name of your IoT Thing, as configured in the console for Greengrass
   */
  discover(e) {
    return new Promise((t, n) => ox(this, void 0, void 0, function* () {
      this.connection_manager.acquire().then((i) => {
        const o = new Jt.http.HttpRequest("GET", `/greengrass/discover/thing/${e}`, new Jt.http.HttpHeaders([["host", this.endpoint]])), s = i.request(o);
        let a = "";
        s.on("response", (f, u) => {
          f != 200 && n(new Wo(`Discovery failed (headers: ${u})`, f));
        }), s.on("data", (f) => {
          a += (0, sx.toUtf8)(new Uint8Array(f));
        }), s.on("end", () => {
          const f = JSON.parse(a), u = Qc.DiscoverResponse.from_json(f);
          t(u);
        }), s.on("error", (f) => {
          n(new Wo(f.toString()));
        }), s.activate();
      }).catch((i) => {
        n(new Jt.CrtError(i));
      });
    }));
  }
}
Ut.DiscoveryClient = ax;
var Lt = {}, Jc = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.JobStatus = r.RejectedErrorCode = void 0, function(e) {
    e.UNKNOWN_ENUM_VALUE = "UNKNOWN_ENUM_VALUE", e.INVALID_TOPIC = "InvalidTopic", e.INVALID_STATE_TRANSITION = "InvalidStateTransition", e.RESOURCE_NOT_FOUND = "ResourceNotFound", e.INVALID_REQUEST = "InvalidRequest", e.REQUEST_THROTTLED = "RequestThrottled", e.INTERNAL_ERROR = "InternalError", e.TERMINAL_STATE_REACHED = "TerminalStateReached", e.INVALID_JSON = "InvalidJson", e.VERSION_MISMATCH = "VersionMismatch";
  }(r.RejectedErrorCode || (r.RejectedErrorCode = {})), function(e) {
    e.UNKNOWN_ENUM_VALUE = "UNKNOWN_ENUM_VALUE", e.IN_PROGRESS = "IN_PROGRESS", e.FAILED = "FAILED", e.QUEUED = "QUEUED", e.TIMED_OUT = "TIMED_OUT", e.SUCCEEDED = "SUCCEEDED", e.CANCELED = "CANCELED", e.REJECTED = "REJECTED", e.REMOVED = "REMOVED";
  }(r.JobStatus || (r.JobStatus = {}));
})(Jc);
var ux = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), fx = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), Xc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && ux(e, r, t);
  return fx(e, r), e;
}, Ye = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.IotJobsClient = Lt.IotJobsError = Lt.model = void 0;
const cx = Xc(Jc);
Lt.model = cx;
const ht = Ar, Tu = Xc(Ht);
class zo extends Error {
  constructor(e, t) {
    super(e), this.payload = t;
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.prototype = n;
  }
}
Lt.IotJobsError = zo;
class Qe {
  static createClientError(e, t) {
    return e instanceof Error ? new zo(e.message, t) : new zo(Qe.INVALID_PAYLOAD_PARSING_ERROR, t);
  }
  constructor(e) {
    e !== void 0 && (this.mqttAdapter = new Tu.ServiceClientMqtt311Adapter(e));
  }
  /**
   * Creates a new IotJobsClient that uses the SDK Mqtt5 client internally.
   *
   * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
   * must support
   *
   * ```
   * new IotJobsClient(mqtt311connection);
   * ```
   *
   * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
   *
   * @param client the MQTT5 client to use with this service client
   *
   * @returns a new IotJobsClient instance
   */
  static newFromMqtt5Client(e) {
    let t = new Qe();
    return t.mqttAdapter = new Tu.ServiceClientMqtt5Adapter(e), t;
  }
  /**
   * Subscribes to JobExecutionsChanged notifications for a given IoT thing.
   *
   *
   * subscribeToJobExecutionsChangedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-jobexecutionschanged
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToJobExecutionsChangedEvents(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/notify";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic for the StartNextPendingJobExecution operation
   *
   *
   * subscribeToStartNextPendingJobExecutionAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToStartNextPendingJobExecutionAccepted(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/start-next/accepted";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the DescribeJobExecution operation
   *
   *
   * subscribeToDescribeJobExecutionRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToDescribeJobExecutionRejected(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/{jobId}/get/rejected";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{jobId}", e.jobId);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   *
   *
   *
   * subscribeToNextJobExecutionChangedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-nextjobexecutionchanged
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToNextJobExecutionChangedEvents(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/notify-next";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the UpdateJobExecution operation
   *
   *
   * subscribeToUpdateJobExecutionRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToUpdateJobExecutionRejected(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/{jobId}/update/rejected";
      i = i.replace("{jobId}", e.jobId), i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic for the UpdateJobExecution operation
   *
   *
   * subscribeToUpdateJobExecutionAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToUpdateJobExecutionAccepted(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/{jobId}/update/accepted";
      i = i.replace("{jobId}", e.jobId), i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Updates the status of a job execution. You can optionally create a step timer by setting a value for the stepTimeoutInMinutes property. If you don't update the value of this property by running UpdateJobExecution again, the job execution times out when the step timer expires.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-updatejobexecution
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotJobs
   */
  publishUpdateJobExecution(e, t) {
    return Ye(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/jobs/{jobId}/update";
      return n = n.replace("{thingName}", e.thingName), n = n.replace("{jobId}", e.jobId), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic for the DescribeJobExecution operation
   *
   *
   * subscribeToDescribeJobExecutionAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToDescribeJobExecutionAccepted(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/{jobId}/get/accepted";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{jobId}", e.jobId);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Gets the list of all jobs for a thing that are not in a terminal state.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotJobs
   */
  publishGetPendingJobExecutions(e, t) {
    return Ye(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/jobs/get";
      return n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic for the GetPendingJobsExecutions operation
   *
   *
   * subscribeToGetPendingJobExecutionsAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToGetPendingJobExecutionsAccepted(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/get/accepted";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the StartNextPendingJobExecution operation
   *
   *
   * subscribeToStartNextPendingJobExecutionRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToStartNextPendingJobExecutionRejected(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/start-next/rejected";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the GetPendingJobsExecutions operation
   *
   *
   * subscribeToGetPendingJobExecutionsRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-getpendingjobexecutions
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotJobs
   */
  subscribeToGetPendingJobExecutionsRejected(e, t, n) {
    return Ye(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/jobs/get/rejected";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, ht.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Qe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Gets and starts the next pending job execution for a thing (status IN_PROGRESS or QUEUED).
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-startnextpendingjobexecution
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotJobs
   */
  publishStartNextPendingJobExecution(e, t) {
    return Ye(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/jobs/start-next";
      return n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Gets detailed information about a job execution.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/jobs-api.html#mqtt-describejobexecution
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotJobs
   */
  publishDescribeJobExecution(e, t) {
    return Ye(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/jobs/{jobId}/get";
      return n = n.replace("{thingName}", e.thingName), n = n.replace("{jobId}", e.jobId), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
}
Lt.IotJobsClient = Qe;
Qe.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
var qt = {}, Yc = {};
Object.defineProperty(Yc, "__esModule", { value: !0 });
var lx = Q && Q.__createBinding || (Object.create ? function(r, e, t, n) {
  n === void 0 && (n = t);
  var i = Object.getOwnPropertyDescriptor(e, t);
  (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, n, i);
} : function(r, e, t, n) {
  n === void 0 && (n = t), r[n] = e[t];
}), hx = Q && Q.__setModuleDefault || (Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}), Zc = Q && Q.__importStar || function(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      t !== "default" && Object.prototype.hasOwnProperty.call(r, t) && lx(e, r, t);
  return hx(e, r), e;
}, Re = Q && Q.__awaiter || function(r, e, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (h) {
        s(h);
      }
    }
    function f(c) {
      try {
        u(n.throw(c));
      } catch (h) {
        s(h);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(a, f);
    }
    u((n = n.apply(r, e || [])).next());
  });
};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.IotShadowClient = qt.IotShadowError = qt.model = void 0;
const dx = Zc(Yc);
qt.model = dx;
const Ve = Ar, Du = Zc(Ht);
class Ko extends Error {
  constructor(e, t) {
    super(e), this.payload = t;
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.prototype = n;
  }
}
qt.IotShadowError = Ko;
class Pe {
  static createClientError(e, t) {
    return e instanceof Error ? new Ko(e.message, t) : new Ko(Pe.INVALID_PAYLOAD_PARSING_ERROR, t);
  }
  constructor(e) {
    e !== void 0 && (this.mqttAdapter = new Du.ServiceClientMqtt311Adapter(e));
  }
  /**
   * Creates a new IotShadowClient that uses the SDK Mqtt5 client internally.
   *
   * The pre-existing constructor that is bound to the MQTT311 client makes this awkward since we
   * must support
   *
   * ```
   * new IotShadowClient(mqtt311connection);
   * ```
   *
   * for backwards compatibility, but still want to be able to inject an MQTT5 client as well.
   *
   * @param client the MQTT5 client to use with this service client
   *
   * @returns a new IotShadowClient instance
   */
  static newFromMqtt5Client(e) {
    let t = new Pe();
    return t.mqttAdapter = new Du.ServiceClientMqtt5Adapter(e), t;
  }
  /**
   * Subscribes to the rejected topic for the UpdateShadow operation
   *
   *
   * subscribeToUpdateShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToUpdateShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/update/rejected";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribe to ShadowDelta events for the (classic) shadow of an AWS IoT thing.
   *
   *
   * subscribeToShadowDeltaUpdatedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-delta-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToShadowDeltaUpdatedEvents(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/update/delta";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the GetNamedShadow operation.
   *
   *
   * subscribeToGetNamedShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToGetNamedShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/get/rejected";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the DeleteNamedShadow operation.
   *
   *
   * subscribeToDeleteNamedShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToDeleteNamedShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/delete/rejected";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Deletes the (classic) shadow for an AWS IoT thing.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishDeleteShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/delete";
      return n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Gets a named shadow for an AWS IoT thing.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishGetNamedShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/name/{shadowName}/get";
      return n = n.replace("{shadowName}", e.shadowName), n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic for the DeleteShadow operation
   *
   *
   * subscribeToDeleteShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToDeleteShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/delete/accepted";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic for the GetShadow operation.
   *
   *
   * subscribeToGetShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToGetShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/get/accepted";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic for the GetNamedShadow operation.
   *
   *
   * subscribeToGetNamedShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToGetNamedShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/get/accepted";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribe to ShadowUpdated events for a named shadow of an AWS IoT thing.
   *
   *
   * subscribeToNamedShadowUpdatedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-documents-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToNamedShadowUpdatedEvents(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/update/documents";
      i = i.replace("{shadowName}", e.shadowName), i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribe to ShadowUpdated events for the (classic) shadow of an AWS IoT thing.
   *
   *
   * subscribeToShadowUpdatedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-documents-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToShadowUpdatedEvents(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/update/documents";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Deletes a named shadow for an AWS IoT thing.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishDeleteNamedShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/name/{shadowName}/delete";
      return n = n.replace("{shadowName}", e.shadowName), n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic for the DeleteNamedShadow operation.
   *
   *
   * subscribeToDeleteNamedShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToDeleteNamedShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/delete/accepted";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the DeleteShadow operation
   *
   *
   * subscribeToDeleteShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#delete-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToDeleteShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/delete/rejected";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the GetShadow operation.
   *
   *
   * subscribeToGetShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToGetShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/get/rejected";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Update a device's (classic) shadow.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishUpdateShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/update";
      return n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Gets the (classic) shadow for an AWS IoT thing.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishGetShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/get";
      return n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribes to the accepted topic for the UpdateShadow operation
   *
   *
   * subscribeToUpdateShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToUpdateShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/update/accepted";
      i = i.replace("{thingName}", e.thingName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the rejected topic for the UpdateNamedShadow operation
   *
   *
   * subscribeToUpdateNamedShadowRejected may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-rejected-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToUpdateNamedShadowRejected(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/update/rejected";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Update a named shadow for a device.
   *
   * If the device is offline, the PUBLISH packet will be sent once the connection resumes.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-pub-sub-topic
   *
   * @param request Message to be serialized and sent
   * @param qos Quality of Service for delivering this message
   * @returns Promise which returns a `mqtt.MqttRequest` which will contain the packet id of
   *          the PUBLISH packet.
   *
   * * For QoS 0, completes as soon as the packet is sent.
   * * For QoS 1, completes when PUBACK is received.
   * * QoS 2 is not supported by AWS IoT.
   *
   * @category IotShadow
   */
  publishUpdateNamedShadow(e, t) {
    return Re(this, void 0, void 0, function* () {
      let n = "$aws/things/{thingName}/shadow/name/{shadowName}/update";
      return n = n.replace("{shadowName}", e.shadowName), n = n.replace("{thingName}", e.thingName), this.mqttAdapter.publish(n, JSON.stringify(e), t);
    });
  }
  /**
   * Subscribe to NamedShadowDelta events for a named shadow of an AWS IoT thing.
   *
   *
   * subscribeToNamedShadowDeltaUpdatedEvents may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-delta-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToNamedShadowDeltaUpdatedEvents(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/update/delta";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
  /**
   * Subscribes to the accepted topic for the UpdateNamedShadow operation
   *
   *
   * subscribeToUpdateNamedShadowAccepted may be called while the device is offline, though the async
   * operation cannot complete successfully until the connection resumes.
   *
   * Once subscribed, `messageHandler` is invoked each time a message matching
   * the `topic` is received. It is possible for such messages to arrive before
   * the SUBACK is received.
   *
   * AWS documentation: https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#update-accepted-pub-sub-topic
   *
   * @param request Subscription request configuration
   * @param qos Maximum requested QoS that server may use when sending messages to the client.
   *            The server may grant a lower QoS in the SUBACK
   * @param messageHandler Callback invoked when message or error is received from the server.
   * @returns Promise which returns a `mqtt.MqttSubscribeRequest` which will contain the
   *          result of the SUBSCRIBE. The Promise resolves when a SUBACK is returned
   *          from the server or is rejected when an exception occurs.
   *
   * @category IotShadow
   */
  subscribeToUpdateNamedShadowAccepted(e, t, n) {
    return Re(this, void 0, void 0, function* () {
      let i = "$aws/things/{thingName}/shadow/name/{shadowName}/update/accepted";
      i = i.replace("{thingName}", e.thingName), i = i.replace("{shadowName}", e.shadowName);
      const o = (s, a) => {
        let f, u;
        try {
          const c = (0, Ve.toUtf8)(new Uint8Array(a));
          f = JSON.parse(c);
        } catch (c) {
          u = Pe.createClientError(c, a);
        } finally {
          n(u, f);
        }
      };
      return this.mqttAdapter.subscribe(i, t, o);
    });
  }
}
qt.IotShadowClient = Pe;
Pe.INVALID_PAYLOAD_PARSING_ERROR = "Invalid/unknown error parsing payload into response";
(function(r) {
  var e = Q && Q.__createBinding || (Object.create ? function(u, c, h, y) {
    y === void 0 && (y = h);
    var T = Object.getOwnPropertyDescriptor(c, h);
    (!T || ("get" in T ? !c.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return c[h];
    } }), Object.defineProperty(u, y, T);
  } : function(u, c, h, y) {
    y === void 0 && (y = h), u[y] = c[h];
  }), t = Q && Q.__setModuleDefault || (Object.create ? function(u, c) {
    Object.defineProperty(u, "default", { enumerable: !0, value: c });
  } : function(u, c) {
    u.default = c;
  }), n = Q && Q.__importStar || function(u) {
    if (u && u.__esModule)
      return u;
    var c = {};
    if (u != null)
      for (var h in u)
        h !== "default" && Object.prototype.hasOwnProperty.call(u, h) && e(c, u, h);
    return t(c, u), c;
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), r.CrtError = r.mqtt5 = r.mqtt = r.iotshadow = r.iotjobs = r.iotidentity = r.iot = r.io = r.http = r.greengrass = r.auth = void 0;
  const i = n(jt);
  r.iotidentity = i;
  const o = n(Ut);
  r.greengrass = o;
  const s = n(Lt);
  r.iotjobs = s;
  const a = n(qt);
  r.iotshadow = a;
  const f = Kn();
  Object.defineProperty(r, "auth", { enumerable: !0, get: function() {
    return f.auth;
  } }), Object.defineProperty(r, "http", { enumerable: !0, get: function() {
    return f.http;
  } }), Object.defineProperty(r, "io", { enumerable: !0, get: function() {
    return f.io;
  } }), Object.defineProperty(r, "iot", { enumerable: !0, get: function() {
    return f.iot;
  } }), Object.defineProperty(r, "mqtt", { enumerable: !0, get: function() {
    return f.mqtt;
  } }), Object.defineProperty(r, "mqtt5", { enumerable: !0, get: function() {
    return f.mqtt5;
  } }), Object.defineProperty(r, "CrtError", { enumerable: !0, get: function() {
    return f.CrtError;
  } });
})(Fu);
addEventListener("message", async (r) => {
  console.log(`Message Received: ${r.data}`), console.log(Fu.auth);
});
