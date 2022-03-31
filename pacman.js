
var e;
e || (e = typeof Module !== 'undefined' ? Module : {});
var aa = Object.assign({}, e), ba = [], ca = "./this.program", k = (a, b) => {
  throw b;
}, da = "object" == typeof window, l = "function" == typeof importScripts, t = "", ea, u, v, fs, w, fa;
if ("object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node) {
  t = l ? require("path").dirname(t) + "/" : __dirname + "/", fa = () => {
    w || (fs = require("fs"), w = require("path"));
  }, ea = function(a, b) {
    fa();
    a = w.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8");
  }, v = a => {
    a = ea(a, !0);
    a.buffer || (a = new Uint8Array(a));
    return a;
  }, u = (a, b, c) => {
    fa();
    a = w.normalize(a);
    fs.readFile(a, function(d, f) {
      d ? c(d) : b(f.buffer);
    });
  }, 1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/")), ba = process.argv.slice(2), "undefined" != typeof module && (module.exports = e), process.on("uncaughtException", function(a) {
    if (!(a instanceof x)) {
      throw a;
    }
  }), process.on("unhandledRejection", function(a) {
    throw a;
  }), k = (a, b) => {
    if (noExitRuntime || 0 < ha) {
      throw process.exitCode = a, b;
    }
    b instanceof x || y("exiting due to exception: " + b);
    process.exit(a);
  }, e.inspect = function() {
    return "[Emscripten Module object]";
  };
} else if (da || l) {
  l ? t = self.location.href : "undefined" != typeof document && document.currentScript && (t = document.currentScript.src), t = 0 !== t.indexOf("blob:") ? t.substr(0, t.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", ea = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  }, l && (v = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  }), u = (a, b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
    };
    d.onerror = c;
    d.send(null);
  };
}
var ia = e.print || console.log.bind(console), y = e.printErr || console.warn.bind(console);
Object.assign(e, aa);
aa = null;
e.arguments && (ba = e.arguments);
e.thisProgram && (ca = e.thisProgram);
e.quit && (k = e.quit);
var z;
e.wasmBinary && (z = e.wasmBinary);
var noExitRuntime = e.noExitRuntime || !0;
"object" != typeof WebAssembly && A("no native wasm support detected");
var ja, ka = !1;
function la(a, b, c) {
  var d = {string:function(n) {
    var p = 0;
    if (null !== n && void 0 !== n && 0 !== n) {
      var r = (n.length << 2) + 1;
      p = B(r);
      C(n, D, p, r);
    }
    return p;
  }, array:function(n) {
    var p = B(n.length);
    ma.set(n, p);
    return p;
  }};
  a = e["_" + a];
  var f = [], h = 0;
  if (c) {
    for (var g = 0; g < c.length; g++) {
      var m = d[b[g]];
      m ? (0 === h && (h = na()), f[g] = m(c[g])) : f[g] = c[g];
    }
  }
  b = a.apply(null, f);
  b = function(n) {
    0 !== h && oa(h);
    return n;
  }(b);
}
var pa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function qa(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.subarray && pa) {
    return pa.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var f = a[b++];
    if (f & 128) {
      var h = a[b++] & 63;
      if (192 == (f & 224)) {
        d += String.fromCharCode((f & 31) << 6 | h);
      } else {
        var g = a[b++] & 63;
        f = 224 == (f & 240) ? (f & 15) << 12 | h << 6 | g : (f & 7) << 18 | h << 12 | g << 6 | a[b++] & 63;
        65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
      }
    } else {
      d += String.fromCharCode(f);
    }
  }
  return d;
}
function E(a, b) {
  return a ? qa(D, a, b) : "";
}
function C(a, b, c, d) {
  if (!(0 < d)) {
    return 0;
  }
  var f = c;
  d = c + d - 1;
  for (var h = 0; h < a.length; ++h) {
    var g = a.charCodeAt(h);
    if (55296 <= g && 57343 >= g) {
      var m = a.charCodeAt(++h);
      g = 65536 + ((g & 1023) << 10) | m & 1023;
    }
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else {
      if (2047 >= g) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | g >> 6;
      } else {
        if (65535 >= g) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | g >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          b[c++] = 240 | g >> 18;
          b[c++] = 128 | g >> 12 & 63;
        }
        b[c++] = 128 | g >> 6 & 63;
      }
      b[c++] = 128 | g & 63;
    }
  }
  b[c] = 0;
  return c - f;
}
function ra(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
    127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4;
  }
  return b;
}
"undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
function sa(a) {
  var b = ra(a) + 1, c = B(b);
  C(a, ma, c, b);
  return c;
}
var ma, D, ta, ua, F, va, wa, G, xa, ya = [], za = [], Aa = [], Ba = [], Ca = [], ha = 0;
function Da() {
  var a = e.preRun.shift();
  ya.unshift(a);
}
var H = 0, Ea = null, I = null;
e.preloadedImages = {};
e.preloadedAudios = {};
function A(a) {
  if (e.onAbort) {
    e.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  y(a);
  ka = !0;
  throw new WebAssembly.RuntimeError(a + ". Build with -s ASSERTIONS=1 for more info.");
}
function Fa() {
  return K.startsWith("data:application/octet-stream;base64,");
}
var K;
K = "pacman.wasm";
if (!Fa()) {
  var Ga = K;
  K = e.locateFile ? e.locateFile(Ga, t) : t + Ga;
}
function Ha() {
  var a = K;
  try {
    if (a == K && z) {
      return new Uint8Array(z);
    }
    if (v) {
      return v(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (b) {
    A(b);
  }
}
function Ia() {
  if (!z && (da || l)) {
    if ("function" == typeof fetch && !K.startsWith("file://")) {
      return fetch(K, {credentials:"same-origin"}).then(function(a) {
        if (!a.ok) {
          throw "failed to load wasm binary file at '" + K + "'";
        }
        return a.arrayBuffer();
      }).catch(function() {
        return Ha();
      });
    }
    if (u) {
      return new Promise(function(a, b) {
        u(K, function(c) {
          a(new Uint8Array(c));
        }, b);
      });
    }
  }
  return Promise.resolve().then(function() {
    return Ha();
  });
}
function L(a) {
  for (; 0 < a.length;) {
    var b = a.shift();
    if ("function" == typeof b) {
      b(e);
    } else {
      var c = b.fa;
      "number" == typeof c ? void 0 === b.F ? M(c)() : M(c)(b.F) : c(void 0 === b.F ? null : b.F);
    }
  }
}
var N = [];
function M(a) {
  var b = N[a];
  b || (a >= N.length && (N.length = a + 1), N[a] = b = xa.get(a));
  return b;
}
var Ja = 0;
function Ka() {
  for (var a = O.length - 1; 0 <= a; --a) {
    La(a);
  }
  O = [];
  P = [];
}
var P = [];
function Ma() {
  if (Ja && Na.v) {
    for (var a = 0; a < P.length; ++a) {
      var b = P[a];
      P.splice(a, 1);
      --a;
      b.ma.apply(null, b.ba);
    }
  }
}
var O = [];
function La(a) {
  var b = O[a];
  b.target.removeEventListener(b.h, b.X, b.i);
  O.splice(a, 1);
}
function Q(a) {
  function b(d) {
    ++Ja;
    Na = a;
    Ma();
    a.l(d);
    Ma();
    --Ja;
  }
  if (a.j) {
    a.X = b, a.target.addEventListener(a.h, b, a.i), O.push(a), Oa || (Ba.push(Ka), Oa = !0);
  } else {
    for (var c = 0; c < O.length; ++c) {
      O[c].target == a.target && O[c].h == a.h && La(c--);
    }
  }
}
function Pa(a) {
  return a ? a == window ? "#window" : a == screen ? "#screen" : a && a.nodeName ? a.nodeName : "" : "";
}
var Oa, Na, Qa, Ra, Sa, Ta, Ua, Va, Wa, Xa = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];
function R(a) {
  a = 2 < a ? E(a) : a;
  return Xa[a] || ("undefined" != typeof document ? document.querySelector(a) : void 0);
}
function Ya(a) {
  return 0 > Xa.indexOf(a) ? a.getBoundingClientRect() : {left:0, top:0};
}
function Za(a, b, c, d, f, h) {
  Qa || (Qa = S(256));
  a = {target:R(a), h, j:d, l:function(g) {
    g = g || event;
    var m = g.target.id ? g.target.id : "", n = Qa;
    C(Pa(g.target), D, n + 0, 128);
    C(m, D, n + 128, 128);
    M(d)(f, n, b) && g.preventDefault();
  }, i:c};
  Q(a);
}
function $a(a, b, c, d, f, h) {
  Ra || (Ra = S(176));
  a = {target:R(a), v:!0, h, j:d, l:function(g) {
    var m = Ra;
    G[m >> 3] = g.timeStamp;
    var n = m >> 2;
    F[n + 2] = g.location;
    F[n + 3] = g.ctrlKey;
    F[n + 4] = g.shiftKey;
    F[n + 5] = g.altKey;
    F[n + 6] = g.metaKey;
    F[n + 7] = g.repeat;
    F[n + 8] = g.charCode;
    F[n + 9] = g.keyCode;
    F[n + 10] = g.which;
    C(g.key || "", D, m + 44, 32);
    C(g.code || "", D, m + 76, 32);
    C(g.char || "", D, m + 108, 32);
    C(g.locale || "", D, m + 140, 32);
    M(d)(f, m, b) && g.preventDefault();
  }, i:c};
  Q(a);
}
function ab(a, b, c) {
  G[a >> 3] = b.timeStamp;
  a >>= 2;
  F[a + 2] = b.screenX;
  F[a + 3] = b.screenY;
  F[a + 4] = b.clientX;
  F[a + 5] = b.clientY;
  F[a + 6] = b.ctrlKey;
  F[a + 7] = b.shiftKey;
  F[a + 8] = b.altKey;
  F[a + 9] = b.metaKey;
  ta[2 * a + 20] = b.button;
  ta[2 * a + 21] = b.buttons;
  F[a + 11] = b.movementX;
  F[a + 12] = b.movementY;
  c = Ya(c);
  F[a + 13] = b.clientX - c.left;
  F[a + 14] = b.clientY - c.top;
}
function T(a, b, c, d, f, h) {
  Sa || (Sa = S(72));
  a = R(a);
  Q({target:a, v:"mousemove" != h && "mouseenter" != h && "mouseleave" != h, h, j:d, l:function(g) {
    g = g || event;
    ab(Sa, g, a);
    M(d)(f, Sa, b) && g.preventDefault();
  }, i:c});
}
function bb(a, b, c, d, f) {
  Ta || (Ta = S(260));
  Q({target:a, h:f, j:d, l:function(h) {
    h = h || event;
    var g = Ta, m = document.pointerLockElement || document.o || document.K || document.J;
    F[g >> 2] = !!m;
    var n = m && m.id ? m.id : "";
    C(Pa(m), D, g + 4, 128);
    C(n, D, g + 132, 128);
    M(d)(20, g, b) && h.preventDefault();
  }, i:c});
}
function cb(a, b, c, d, f) {
  Q({target:a, h:f, j:d, l:function(h) {
    h = h || event;
    M(d)(38, 0, b) && h.preventDefault();
  }, i:c});
}
function db(a, b, c, d) {
  Ua || (Ua = S(36));
  a = R(a);
  Q({target:a, h:"resize", j:d, l:function(f) {
    f = f || event;
    if (f.target == a) {
      var h = document.body;
      if (h) {
        var g = Ua;
        F[g >> 2] = f.detail;
        F[g + 4 >> 2] = h.clientWidth;
        F[g + 8 >> 2] = h.clientHeight;
        F[g + 12 >> 2] = innerWidth;
        F[g + 16 >> 2] = innerHeight;
        F[g + 20 >> 2] = outerWidth;
        F[g + 24 >> 2] = outerHeight;
        F[g + 28 >> 2] = pageXOffset;
        F[g + 32 >> 2] = pageYOffset;
        M(d)(10, g, b) && f.preventDefault();
      }
    }
  }, i:c});
}
function eb(a, b, c, d, f, h) {
  Va || (Va = S(1696));
  a = R(a);
  Q({target:a, v:"touchstart" == h || "touchend" == h, h, j:d, l:function(g) {
    for (var m, n = {}, p = g.touches, r = 0; r < p.length; ++r) {
      m = p[r], m.L = m.M = 0, n[m.identifier] = m;
    }
    for (r = 0; r < g.changedTouches.length; ++r) {
      m = g.changedTouches[r], m.L = 1, n[m.identifier] = m;
    }
    for (r = 0; r < g.targetTouches.length; ++r) {
      n[g.targetTouches[r].identifier].M = 1;
    }
    p = Va;
    G[p >> 3] = g.timeStamp;
    var q = p >> 2;
    F[q + 3] = g.ctrlKey;
    F[q + 4] = g.shiftKey;
    F[q + 5] = g.altKey;
    F[q + 6] = g.metaKey;
    q += 7;
    var J = Ya(a), jb = 0;
    for (r in n) {
      if (m = n[r], F[q] = m.identifier, F[q + 1] = m.screenX, F[q + 2] = m.screenY, F[q + 3] = m.clientX, F[q + 4] = m.clientY, F[q + 5] = m.pageX, F[q + 6] = m.pageY, F[q + 7] = m.L, F[q + 8] = m.M, F[q + 9] = m.clientX - J.left, F[q + 10] = m.clientY - J.top, q += 13, 31 < ++jb) {
        break;
      }
    }
    F[p + 8 >> 2] = jb;
    M(d)(f, p, b) && g.preventDefault();
  }, i:c});
}
function fb(a, b, c, d, f, h) {
  a = {target:R(a), h, j:d, l:function(g) {
    g = g || event;
    M(d)(f, 0, b) && g.preventDefault();
  }, i:c};
  Q(a);
}
function gb(a, b, c, d) {
  Wa || (Wa = S(104));
  Q({target:a, v:!0, h:"wheel", j:d, l:function(f) {
    f = f || event;
    var h = Wa;
    ab(h, f, a);
    G[h + 72 >> 3] = f.deltaX;
    G[h + 80 >> 3] = f.deltaY;
    G[h + 88 >> 3] = f.deltaZ;
    F[h + 96 >> 2] = f.deltaMode;
    M(d)(9, h, b) && f.preventDefault();
  }, i:c});
}
function hb(a) {
  var b = a.getExtension("ANGLE_instanced_arrays");
  b && (a.vertexAttribDivisor = function(c, d) {
    b.vertexAttribDivisorANGLE(c, d);
  }, a.drawArraysInstanced = function(c, d, f, h) {
    b.drawArraysInstancedANGLE(c, d, f, h);
  }, a.drawElementsInstanced = function(c, d, f, h, g) {
    b.drawElementsInstancedANGLE(c, d, f, h, g);
  });
}
function ib(a) {
  var b = a.getExtension("OES_vertex_array_object");
  b && (a.createVertexArray = function() {
    return b.createVertexArrayOES();
  }, a.deleteVertexArray = function(c) {
    b.deleteVertexArrayOES(c);
  }, a.bindVertexArray = function(c) {
    b.bindVertexArrayOES(c);
  }, a.isVertexArray = function(c) {
    return b.isVertexArrayOES(c);
  });
}
function kb(a) {
  var b = a.getExtension("WEBGL_draw_buffers");
  b && (a.drawBuffers = function(c, d) {
    b.drawBuffersWEBGL(c, d);
  });
}
function lb(a) {
  a.ia = a.getExtension("WEBGL_multi_draw");
}
var mb = 1, nb = [], U = [], ob = [], V = [], W = [], X = [], pb = [], qb = {};
function Y(a) {
  rb || (rb = a);
}
function sb(a) {
  for (var b = mb++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  return b;
}
function tb(a, b) {
  a.o || (a.o = a.getContext, a.getContext = function(d, f) {
    f = a.o(d, f);
    return "webgl" == d == f instanceof WebGLRenderingContext ? f : null;
  });
  var c = a.getContext("webgl", b);
  return c ? ub(c, b) : 0;
}
function ub(a, b) {
  var c = sb(pb), d = {ga:c, attributes:b, version:b.$, D:a};
  a.canvas && (a.canvas.aa = d);
  pb[c] = d;
  ("undefined" == typeof b.I || b.I) && vb(d);
  return c;
}
function vb(a) {
  a || (a = wb);
  if (!a.Z) {
    a.Z = !0;
    var b = a.D;
    hb(b);
    ib(b);
    kb(b);
    b.ea = b.getExtension("EXT_disjoint_timer_query");
    lb(b);
    (b.getSupportedExtensions() || []).forEach(function(c) {
      c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
    });
  }
}
var rb, wb, xb = ["default", "low-power", "high-performance"], yb = [null, [], []];
function zb(a, b, c, d) {
  for (var f = 0; f < a; f++) {
    var h = Z[c](), g = h && sb(d);
    h ? (h.name = g, d[g] = h) : Y(1282);
    F[b + 4 * f >> 2] = g;
  }
}
function Ab(a, b) {
  if (b) {
    var c = void 0;
    switch(a) {
      case 36346:
        c = 1;
        break;
      case 36344:
        return;
      case 36345:
        c = 0;
        break;
      case 34466:
        var d = Z.getParameter(34467);
        c = d ? d.length : 0;
    }
    if (void 0 === c) {
      switch(d = Z.getParameter(a), typeof d) {
        case "number":
          c = d;
          break;
        case "boolean":
          c = d ? 1 : 0;
          break;
        case "string":
          Y(1280);
          return;
        case "object":
          if (null === d) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 34068:
                c = 0;
                break;
              default:
                Y(1280);
                return;
            }
          } else {
            if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
              for (a = 0; a < d.length; ++a) {
                F[b + 4 * a >> 2] = d[a];
              }
              return;
            }
            try {
              c = d.name | 0;
            } catch (f) {
              Y(1280);
              y("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + f + ")");
              return;
            }
          }
          break;
        default:
          Y(1280);
          y("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
          return;
      }
    }
    F[b >> 2] = c;
  } else {
    Y(1281);
  }
}
function Bb(a) {
  var b = ra(a) + 1, c = S(b);
  C(a, D, c, b);
  return c;
}
function Cb(a) {
  return "]" == a.slice(-1) && a.lastIndexOf("[");
}
var Z, Jb = {__assert_fail:function(a, b, c, d) {
  A("Assertion failed: " + E(a) + ", at: " + [b ? E(b) : "unknown filename", c, d ? E(d) : "unknown function"]);
}, emscripten_get_device_pixel_ratio:function() {
  return "number" == typeof devicePixelRatio && devicePixelRatio || 1.0;
}, emscripten_get_element_css_size:function(a, b, c) {
  a = R(a);
  if (!a) {
    return -4;
  }
  a = Ya(a);
  G[b >> 3] = a.width;
  G[c >> 3] = a.height;
  return 0;
}, emscripten_memcpy_big:function(a, b, c) {
  D.copyWithin(a, b, b + c);
}, emscripten_request_animation_frame_loop:function(a, b) {
  function c(d) {
    M(a)(d, b) && requestAnimationFrame(c);
  }
  return requestAnimationFrame(c);
}, emscripten_resize_heap:function() {
  A("OOM");
}, emscripten_set_blur_callback_on_thread:function(a, b, c, d) {
  Za(a, b, c, d, 12, "blur");
  return 0;
}, emscripten_set_canvas_element_size:function(a, b, c) {
  a = R(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_set_focus_callback_on_thread:function(a, b, c, d) {
  Za(a, b, c, d, 13, "focus");
  return 0;
}, emscripten_set_keydown_callback_on_thread:function(a, b, c, d) {
  $a(a, b, c, d, 2, "keydown");
  return 0;
}, emscripten_set_keypress_callback_on_thread:function(a, b, c, d) {
  $a(a, b, c, d, 1, "keypress");
  return 0;
}, emscripten_set_keyup_callback_on_thread:function(a, b, c, d) {
  $a(a, b, c, d, 3, "keyup");
  return 0;
}, emscripten_set_mousedown_callback_on_thread:function(a, b, c, d) {
  T(a, b, c, d, 5, "mousedown");
  return 0;
}, emscripten_set_mouseenter_callback_on_thread:function(a, b, c, d) {
  T(a, b, c, d, 33, "mouseenter");
  return 0;
}, emscripten_set_mouseleave_callback_on_thread:function(a, b, c, d) {
  T(a, b, c, d, 34, "mouseleave");
  return 0;
}, emscripten_set_mousemove_callback_on_thread:function(a, b, c, d) {
  T(a, b, c, d, 8, "mousemove");
  return 0;
}, emscripten_set_mouseup_callback_on_thread:function(a, b, c, d) {
  T(a, b, c, d, 6, "mouseup");
  return 0;
}, emscripten_set_pointerlockchange_callback_on_thread:function(a, b, c, d) {
  if (!document || !document.body || !(document.body.requestPointerLock || document.body.o || document.body.K || document.body.J)) {
    return -1;
  }
  a = R(a);
  if (!a) {
    return -4;
  }
  bb(a, b, c, d, "pointerlockchange");
  bb(a, b, c, d, "mozpointerlockchange");
  bb(a, b, c, d, "webkitpointerlockchange");
  bb(a, b, c, d, "mspointerlockchange");
  return 0;
}, emscripten_set_pointerlockerror_callback_on_thread:function(a, b, c, d) {
  if (!document || !(document.body.requestPointerLock || document.body.o || document.body.K || document.body.J)) {
    return -1;
  }
  a = R(a);
  if (!a) {
    return -4;
  }
  cb(a, b, c, d, "pointerlockerror");
  cb(a, b, c, d, "mozpointerlockerror");
  cb(a, b, c, d, "webkitpointerlockerror");
  cb(a, b, c, d, "mspointerlockerror");
  return 0;
}, emscripten_set_resize_callback_on_thread:function(a, b, c, d) {
  db(a, b, c, d);
  return 0;
}, emscripten_set_touchcancel_callback_on_thread:function(a, b, c, d) {
  eb(a, b, c, d, 25, "touchcancel");
  return 0;
}, emscripten_set_touchend_callback_on_thread:function(a, b, c, d) {
  eb(a, b, c, d, 23, "touchend");
  return 0;
}, emscripten_set_touchmove_callback_on_thread:function(a, b, c, d) {
  eb(a, b, c, d, 24, "touchmove");
  return 0;
}, emscripten_set_touchstart_callback_on_thread:function(a, b, c, d) {
  eb(a, b, c, d, 22, "touchstart");
  return 0;
}, emscripten_set_webglcontextlost_callback_on_thread:function(a, b, c, d) {
  fb(a, b, c, d, 31, "webglcontextlost");
  return 0;
}, emscripten_set_webglcontextrestored_callback_on_thread:function(a, b, c, d) {
  fb(a, b, c, d, 32, "webglcontextrestored");
  return 0;
}, emscripten_set_wheel_callback_on_thread:function(a, b, c, d) {
  a = R(a);
  return "undefined" != typeof a.onwheel ? (gb(a, b, c, d), 0) : -1;
}, emscripten_webgl_create_context:function(a, b) {
  b >>= 2;
  b = {alpha:!!F[b], depth:!!F[b + 1], stencil:!!F[b + 2], antialias:!!F[b + 3], premultipliedAlpha:!!F[b + 4], preserveDrawingBuffer:!!F[b + 5], powerPreference:xb[F[b + 6]], failIfMajorPerformanceCaveat:!!F[b + 7], $:F[b + 8], ha:F[b + 9], I:F[b + 10], Y:F[b + 11], ja:F[b + 12], ka:F[b + 13]};
  a = R(a);
  return !a || b.Y ? 0 : tb(a, b);
}, emscripten_webgl_enable_extension:function(a, b) {
  a = pb[a];
  b = E(b);
  b.startsWith("GL_") && (b = b.substr(3));
  "ANGLE_instanced_arrays" == b && hb(Z);
  "OES_vertex_array_object" == b && ib(Z);
  "WEBGL_draw_buffers" == b && kb(Z);
  "WEBGL_multi_draw" == b && lb(Z);
  return !!a.D.getExtension(b);
}, emscripten_webgl_init_context_attributes:function(a) {
  a >>= 2;
  for (var b = 0; 14 > b; ++b) {
    F[a + b] = 0;
  }
  F[a] = F[a + 1] = F[a + 3] = F[a + 4] = F[a + 8] = F[a + 10] = 1;
}, emscripten_webgl_make_context_current:function(a) {
  wb = pb[a];
  e.da = Z = wb && wb.D;
  return !a || Z ? 0 : -5;
}, fd_write:function(a, b, c, d) {
  for (var f = 0, h = 0; h < c; h++) {
    var g = F[b >> 2], m = F[b + 4 >> 2];
    b += 8;
    for (var n = 0; n < m; n++) {
      var p = D[g + n], r = yb[a];
      0 === p || 10 === p ? ((1 === a ? ia : y)(qa(r, 0)), r.length = 0) : r.push(p);
    }
    f += m;
  }
  F[d >> 2] = f;
  return 0;
}, glActiveTexture:function(a) {
  Z.activeTexture(a);
}, glAttachShader:function(a, b) {
  Z.attachShader(U[a], X[b]);
}, glBindBuffer:function(a, b) {
  Z.bindBuffer(a, nb[b]);
}, glBindFramebuffer:function(a, b) {
  Z.bindFramebuffer(a, ob[b]);
}, glBindRenderbuffer:function(a, b) {
  Z.bindRenderbuffer(a, V[b]);
}, glBindTexture:function(a, b) {
  Z.bindTexture(a, W[b]);
}, glBlendColor:function(a, b, c, d) {
  Z.blendColor(a, b, c, d);
}, glBlendEquationSeparate:function(a, b) {
  Z.blendEquationSeparate(a, b);
}, glBlendFuncSeparate:function(a, b, c, d) {
  Z.blendFuncSeparate(a, b, c, d);
}, glBufferData:function(a, b, c, d) {
  Z.bufferData(a, c ? D.subarray(c, c + b) : b, d);
}, glBufferSubData:function(a, b, c, d) {
  Z.bufferSubData(a, b, D.subarray(d, d + c));
}, glCheckFramebufferStatus:function(a) {
  return Z.checkFramebufferStatus(a);
}, glClear:function(a) {
  Z.clear(a);
}, glClearColor:function(a, b, c, d) {
  Z.clearColor(a, b, c, d);
}, glClearDepthf:function(a) {
  Z.clearDepth(a);
}, glClearStencil:function(a) {
  Z.clearStencil(a);
}, glColorMask:function(a, b, c, d) {
  Z.colorMask(!!a, !!b, !!c, !!d);
}, glCompileShader:function(a) {
  Z.compileShader(X[a]);
}, glCompressedTexImage2D:function(a, b, c, d, f, h, g, m) {
  Z.compressedTexImage2D(a, b, c, d, f, h, m ? D.subarray(m, m + g) : null);
}, glCreateProgram:function() {
  var a = sb(U), b = Z.createProgram();
  b.name = a;
  b.C = b.A = b.B = 0;
  b.H = 1;
  U[a] = b;
  return a;
}, glCreateShader:function(a) {
  var b = sb(X);
  X[b] = Z.createShader(a);
  return b;
}, glCullFace:function(a) {
  Z.cullFace(a);
}, glDeleteBuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = F[b + 4 * c >> 2], f = nb[d];
    f && (Z.deleteBuffer(f), f.name = 0, nb[d] = null);
  }
}, glDeleteFramebuffers:function(a, b) {
  for (var c = 0; c < a; ++c) {
    var d = F[b + 4 * c >> 2], f = ob[d];
    f && (Z.deleteFramebuffer(f), f.name = 0, ob[d] = null);
  }
}, glDeleteProgram:function(a) {
  if (a) {
    var b = U[a];
    b ? (Z.deleteProgram(b), b.name = 0, U[a] = null) : Y(1281);
  }
}, glDeleteRenderbuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = F[b + 4 * c >> 2], f = V[d];
    f && (Z.deleteRenderbuffer(f), f.name = 0, V[d] = null);
  }
}, glDeleteShader:function(a) {
  if (a) {
    var b = X[a];
    b ? (Z.deleteShader(b), X[a] = null) : Y(1281);
  }
}, glDeleteTextures:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = F[b + 4 * c >> 2], f = W[d];
    f && (Z.deleteTexture(f), f.name = 0, W[d] = null);
  }
}, glDepthFunc:function(a) {
  Z.depthFunc(a);
}, glDepthMask:function(a) {
  Z.depthMask(!!a);
}, glDisable:function(a) {
  Z.disable(a);
}, glDisableVertexAttribArray:function(a) {
  Z.disableVertexAttribArray(a);
}, glDrawArrays:function(a, b, c) {
  Z.drawArrays(a, b, c);
}, glDrawArraysInstancedANGLE:function(a, b, c, d) {
  Z.drawArraysInstanced(a, b, c, d);
}, glDrawElements:function(a, b, c, d) {
  Z.drawElements(a, b, c, d);
}, glDrawElementsInstancedANGLE:function(a, b, c, d, f) {
  Z.drawElementsInstanced(a, b, c, d, f);
}, glEnable:function(a) {
  Z.enable(a);
}, glEnableVertexAttribArray:function(a) {
  Z.enableVertexAttribArray(a);
}, glFramebufferRenderbuffer:function(a, b, c, d) {
  Z.framebufferRenderbuffer(a, b, c, V[d]);
}, glFramebufferTexture2D:function(a, b, c, d, f) {
  Z.framebufferTexture2D(a, b, c, W[d], f);
}, glFrontFace:function(a) {
  Z.frontFace(a);
}, glGenBuffers:function(a, b) {
  zb(a, b, "createBuffer", nb);
}, glGenFramebuffers:function(a, b) {
  zb(a, b, "createFramebuffer", ob);
}, glGenRenderbuffers:function(a, b) {
  zb(a, b, "createRenderbuffer", V);
}, glGenTextures:function(a, b) {
  zb(a, b, "createTexture", W);
}, glGetAttribLocation:function(a, b) {
  return Z.getAttribLocation(U[a], E(b));
}, glGetError:function() {
  var a = Z.getError() || rb;
  rb = 0;
  return a;
}, glGetIntegerv:function(a, b) {
  Ab(a, b);
}, glGetProgramInfoLog:function(a, b, c, d) {
  a = Z.getProgramInfoLog(U[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? C(a, D, d, b) : 0;
  c && (F[c >> 2] = b);
}, glGetProgramiv:function(a, b, c) {
  if (c) {
    if (a >= mb) {
      Y(1281);
    } else {
      if (a = U[a], 35716 == b) {
        a = Z.getProgramInfoLog(a), null === a && (a = "(unknown error)"), F[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.C) {
          for (b = 0; b < Z.getProgramParameter(a, 35718); ++b) {
            a.C = Math.max(a.C, Z.getActiveUniform(a, b).name.length + 1);
          }
        }
        F[c >> 2] = a.C;
      } else if (35722 == b) {
        if (!a.A) {
          for (b = 0; b < Z.getProgramParameter(a, 35721); ++b) {
            a.A = Math.max(a.A, Z.getActiveAttrib(a, b).name.length + 1);
          }
        }
        F[c >> 2] = a.A;
      } else if (35381 == b) {
        if (!a.B) {
          for (b = 0; b < Z.getProgramParameter(a, 35382); ++b) {
            a.B = Math.max(a.B, Z.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        F[c >> 2] = a.B;
      } else {
        F[c >> 2] = Z.getProgramParameter(a, b);
      }
    }
  } else {
    Y(1281);
  }
}, glGetShaderInfoLog:function(a, b, c, d) {
  a = Z.getShaderInfoLog(X[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? C(a, D, d, b) : 0;
  c && (F[c >> 2] = b);
}, glGetShaderiv:function(a, b, c) {
  c ? 35716 == b ? (a = Z.getShaderInfoLog(X[a]), null === a && (a = "(unknown error)"), F[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = Z.getShaderSource(X[a]), F[c >> 2] = a ? a.length + 1 : 0) : F[c >> 2] = Z.getShaderParameter(X[a], b) : Y(1281);
}, glGetString:function(a) {
  var b = qb[a];
  if (!b) {
    switch(a) {
      case 7939:
        b = Z.getSupportedExtensions() || [];
        b = b.concat(b.map(function(d) {
          return "GL_" + d;
        }));
        b = Bb(b.join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        (b = Z.getParameter(a)) || Y(1280);
        b = b && Bb(b);
        break;
      case 7938:
        b = Bb("OpenGL ES 2.0 (" + Z.getParameter(7938) + ")");
        break;
      case 35724:
        b = Z.getParameter(35724);
        var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
        b = Bb(b);
        break;
      default:
        Y(1280);
    }
    qb[a] = b;
  }
  return b;
}, glGetUniformLocation:function(a, b) {
  b = E(b);
  if (a = U[a]) {
    var c = a, d = c.u, f = c.V, h;
    if (!d) {
      for (c.u = d = {}, c.U = {}, h = 0; h < Z.getProgramParameter(c, 35718); ++h) {
        var g = Z.getActiveUniform(c, h);
        var m = g.name;
        g = g.size;
        var n = Cb(m);
        n = 0 < n ? m.slice(0, n) : m;
        var p = c.H;
        c.H += g;
        f[n] = [g, p];
        for (m = 0; m < g; ++m) {
          d[p] = m, c.U[p++] = n;
        }
      }
    }
    c = a.u;
    d = 0;
    f = b;
    h = Cb(b);
    0 < h && (d = parseInt(b.slice(h + 1)) >>> 0, f = b.slice(0, h));
    if ((f = a.V[f]) && d < f[0] && (d += f[1], c[d] = c[d] || Z.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    Y(1281);
  }
  return -1;
}, glLinkProgram:function(a) {
  a = U[a];
  Z.linkProgram(a);
  a.u = 0;
  a.V = {};
}, glPolygonOffset:function(a, b) {
  Z.polygonOffset(a, b);
}, glRenderbufferStorage:function(a, b, c, d) {
  Z.renderbufferStorage(a, b, c, d);
}, glScissor:function(a, b, c, d) {
  Z.scissor(a, b, c, d);
}, glShaderSource:function(a, b, c, d) {
  for (var f = "", h = 0; h < b; ++h) {
    var g = d ? F[d + 4 * h >> 2] : -1;
    f += E(F[c + 4 * h >> 2], 0 > g ? void 0 : g);
  }
  Z.shaderSource(X[a], f);
}, glStencilFunc:function(a, b, c) {
  Z.stencilFunc(a, b, c);
}, glStencilFuncSeparate:function(a, b, c, d) {
  Z.stencilFuncSeparate(a, b, c, d);
}, glStencilMask:function(a) {
  Z.stencilMask(a);
}, glStencilOp:function(a, b, c) {
  Z.stencilOp(a, b, c);
}, glStencilOpSeparate:function(a, b, c, d) {
  Z.stencilOpSeparate(a, b, c, d);
}, glTexImage2D:function(a, b, c, d, f, h, g, m, n) {
  var p = Z, r = p.texImage2D;
  if (n) {
    var q = m - 5120;
    q = 1 == q ? D : 4 == q ? F : 6 == q ? wa : 5 == q || 28922 == q ? va : ua;
    var J = 31 - Math.clz32(q.BYTES_PER_ELEMENT);
    n = q.subarray(n >> J, n + f * (d * ({5:3, 6:4, 8:2, 29502:3, 29504:4,}[g - 6402] || 1) * (1 << J) + 4 - 1 & -4) >> J);
  } else {
    n = null;
  }
  r.call(p, a, b, c, d, f, h, g, m, n);
}, glTexParameteri:function(a, b, c) {
  Z.texParameteri(a, b, c);
}, glUniform1i:function(a, b) {
  var c = Z, d = c.uniform1i;
  var f = Z.W;
  if (f) {
    var h = f.u[a];
    "number" == typeof h && (f.u[a] = h = Z.getUniformLocation(f, f.U[a] + (0 < h ? "[" + h + "]" : "")));
    a = h;
  } else {
    Y(1282), a = void 0;
  }
  d.call(c, a, b);
}, glUseProgram:function(a) {
  a = U[a];
  Z.useProgram(a);
  Z.W = a;
}, glVertexAttribDivisorANGLE:function(a, b) {
  Z.vertexAttribDivisor(a, b);
}, glVertexAttribPointer:function(a, b, c, d, f, h) {
  Z.vertexAttribPointer(a, b, c, !!d, f, h);
}, glViewport:function(a, b, c, d) {
  Z.viewport(a, b, c, d);
}, sapp_js_add_beforeunload_listener:function() {
  e.N = function(a) {
    0 != Db() && (a.preventDefault(), a.returnValue = " ");
  };
  window.addEventListener("beforeunload", e.N);
}, sapp_js_add_clipboard_listener:function() {
  e.T = function(a) {
    a = a.clipboardData.getData("text");
    la("_sapp_emsc_onpaste", ["string"], [a]);
  };
  window.addEventListener("paste", e.T);
}, sapp_js_add_dragndrop_listeners:function(a) {
  e.la = [];
  a = E(a);
  a = document.getElementById(a);
  e.O = function(b) {
    b.stopPropagation();
    b.preventDefault();
  };
  e.P = function(b) {
    b.stopPropagation();
    b.preventDefault();
  };
  e.R = function(b) {
    b.stopPropagation();
    b.preventDefault();
  };
  e.S = function(b) {
    b.stopPropagation();
    b.preventDefault();
    var c = b.dataTransfer.files;
    e.G = c;
    Eb(c.length);
    var d;
    for (d = 0; d < c.length; d++) {
      la("_sapp_emsc_drop", ["number", "string"], [d, c[d].name]);
    }
    Fb(b.clientX, b.clientY);
  };
  a.addEventListener("dragenter", e.O, !1);
  a.addEventListener("dragleave", e.P, !1);
  a.addEventListener("dragover", e.R, !1);
  a.addEventListener("drop", e.S, !1);
}, sapp_js_clear_favicon:function() {
  var a = document.getElementById("sokol-app-favicon");
  a && document.head.removeChild(a);
}, sapp_js_create_textfield:function() {
  var a = document.createElement("input");
  a.type = "text";
  a.id = "_sokol_app_input_element";
  a.autocapitalize = "none";
  a.addEventListener("focusout", function() {
    Gb();
  });
  document.body.append(a);
}, sapp_js_dropped_file_size:function(a) {
  return 0 > a || a >= e.G.length ? 0 : e.G[a].size;
}, sapp_js_exit_pointerlock:function() {
  document.exitPointerLock && document.exitPointerLock();
}, sapp_js_fetch_dropped_file:function(a, b, c, d, f) {
  var h = new FileReader();
  h.onload = function(g) {
    g = g.target.result;
    g.byteLength > d ? Hb(a, 0, 1, b, 0, c, d, f) : (D.set(new Uint8Array(g), c), Hb(a, 1, 0, b, g.byteLength, c, d, f));
  };
  h.onerror = function() {
    Hb(a, 0, 2, b, 0, c, d, f);
  };
  h.readAsArrayBuffer(e.G[a]);
}, sapp_js_focus_textfield:function() {
  document.getElementById("_sokol_app_input_element").focus();
}, sapp_js_pointer_init:function(a) {
  a = E(a);
  e.s = document.getElementById(a);
  e.s || console.log("sokol_app.h: invalid target:" + a);
  e.s.requestPointerLock || console.log("sokol_app.h: target doesn't support requestPointerLock:" + a);
}, sapp_js_remove_beforeunload_listener:function() {
  window.removeEventListener("beforeunload", e.N);
}, sapp_js_remove_clipboard_listener:function() {
  window.removeEventListener("paste", e.T);
}, sapp_js_remove_dragndrop_listeners:function(a) {
  a = E(a);
  a = document.getElementById(a);
  a.removeEventListener("dragenter", e.O);
  a.removeEventListener("dragleave", e.P);
  a.removeEventListener("dragover", e.R);
  a.removeEventListener("drop", e.S);
}, sapp_js_request_pointerlock:function() {
  e.s && e.s.requestPointerLock && e.s.requestPointerLock();
}, sapp_js_set_favicon:function(a, b, c) {
  var d = document.createElement("canvas");
  d.width = a;
  d.height = b;
  var f = d.getContext("2d"), h = f.createImageData(a, b);
  h.data.set(D.subarray(c, c + a * b * 4));
  f.putImageData(h, 0, 0);
  a = document.createElement("link");
  a.id = "sokol-app-favicon";
  a.rel = "shortcut icon";
  a.href = d.toDataURL();
  document.head.appendChild(a);
}, sapp_js_unfocus_textfield:function() {
  document.getElementById("_sokol_app_input_element").blur();
}, sapp_js_write_clipboard:function(a) {
  a = E(a);
  var b = document.createElement("textarea");
  b.setAttribute("autocomplete", "off");
  b.setAttribute("autocorrect", "off");
  b.setAttribute("autocapitalize", "off");
  b.setAttribute("spellcheck", "false");
  b.style.left = "-100px";
  b.style.top = "-100px";
  b.style.height = 1;
  b.style.width = 1;
  b.value = a;
  document.body.appendChild(b);
  b.select();
  document.execCommand("copy");
  document.body.removeChild(b);
}, saudio_js_buffer_frames:function() {
  return e.m ? e.m.bufferSize : 0;
}, saudio_js_init:function(a, b, c) {
  e.g = null;
  e.m = null;
  "undefined" !== typeof AudioContext ? e.g = new AudioContext({sampleRate:a, latencyHint:"interactive",}) : "undefined" !== typeof webkitAudioContext ? e.g = new webkitAudioContext({sampleRate:a, latencyHint:"interactive",}) : (e.g = null, console.log("sokol_audio.h: no WebAudio support"));
  return e.g ? (console.log("sokol_audio.h: sample rate ", e.g.sampleRate), e.m = e.g.createScriptProcessor(c, 0, b), e.m.onaudioprocess = function(d) {
    var f = d.outputBuffer.length, h = Ib(f);
    if (h) {
      for (var g = d.outputBuffer.numberOfChannels, m = 0; m < g; m++) {
        for (var n = d.outputBuffer.getChannelData(m), p = 0; p < f; p++) {
          n[p] = wa[(h >> 2) + (g * p + m)];
        }
      }
    }
  }, e.m.connect(e.g.destination), a = function() {
    e.g && "suspended" === e.g.state && e.g.resume();
  }, document.addEventListener("click", a, {once:!0}), document.addEventListener("touchstart", a, {once:!0}), document.addEventListener("keydown", a, {once:!0}), 1) : 0;
}, saudio_js_sample_rate:function() {
  return e.g ? e.g.sampleRate : 0;
}, saudio_js_shutdown:function() {
  null !== e.g && (e.m && e.m.disconnect(), e.g.close(), e.g = null, e.m = null);
}, saudio_js_suspended:function() {
  if (e.g) {
    return "suspended" === e.g.state ? 1 : 0;
  }
}, setTempRet0:function() {
}};
(function() {
  function a(f) {
    e.asm = f.exports;
    ja = e.asm.memory;
    f = ja.buffer;
    e.HEAP8 = ma = new Int8Array(f);
    e.HEAP16 = ta = new Int16Array(f);
    e.HEAP32 = F = new Int32Array(f);
    e.HEAPU8 = D = new Uint8Array(f);
    e.HEAPU16 = ua = new Uint16Array(f);
    e.HEAPU32 = va = new Uint32Array(f);
    e.HEAPF32 = wa = new Float32Array(f);
    e.HEAPF64 = G = new Float64Array(f);
    xa = e.asm.__indirect_function_table;
    za.unshift(e.asm.__wasm_call_ctors);
    H--;
    e.monitorRunDependencies && e.monitorRunDependencies(H);
    0 == H && (null !== Ea && (clearInterval(Ea), Ea = null), I && (f = I, I = null, f()));
  }
  function b(f) {
    a(f.instance);
  }
  function c(f) {
    return Ia().then(function(h) {
      return WebAssembly.instantiate(h, d);
    }).then(function(h) {
      return h;
    }).then(f, function(h) {
      y("failed to asynchronously prepare wasm: " + h);
      A(h);
    });
  }
  var d = {env:Jb, wasi_snapshot_preview1:Jb,};
  H++;
  e.monitorRunDependencies && e.monitorRunDependencies(H);
  if (e.instantiateWasm) {
    try {
      return e.instantiateWasm(d, a);
    } catch (f) {
      return y("Module.instantiateWasm callback failed with error: " + f), !1;
    }
  }
  (function() {
    return z || "function" != typeof WebAssembly.instantiateStreaming || Fa() || K.startsWith("file://") || "function" != typeof fetch ? c(b) : fetch(K, {credentials:"same-origin"}).then(function(f) {
      return WebAssembly.instantiateStreaming(f, d).then(b, function(h) {
        y("wasm streaming compile failed: " + h);
        y("falling back to ArrayBuffer instantiation");
        return c(b);
      });
    });
  })();
  return {};
})();
e.___wasm_call_ctors = function() {
  return (e.___wasm_call_ctors = e.asm.__wasm_call_ctors).apply(null, arguments);
};
var Gb = e.__sapp_emsc_notify_keyboard_hidden = function() {
  return (Gb = e.__sapp_emsc_notify_keyboard_hidden = e.asm._sapp_emsc_notify_keyboard_hidden).apply(null, arguments);
};
e.__sapp_emsc_onpaste = function() {
  return (e.__sapp_emsc_onpaste = e.asm._sapp_emsc_onpaste).apply(null, arguments);
};
var Db = e.__sapp_html5_get_ask_leave_site = function() {
  return (Db = e.__sapp_html5_get_ask_leave_site = e.asm._sapp_html5_get_ask_leave_site).apply(null, arguments);
}, Eb = e.__sapp_emsc_begin_drop = function() {
  return (Eb = e.__sapp_emsc_begin_drop = e.asm._sapp_emsc_begin_drop).apply(null, arguments);
};
e.__sapp_emsc_drop = function() {
  return (e.__sapp_emsc_drop = e.asm._sapp_emsc_drop).apply(null, arguments);
};
var Fb = e.__sapp_emsc_end_drop = function() {
  return (Fb = e.__sapp_emsc_end_drop = e.asm._sapp_emsc_end_drop).apply(null, arguments);
}, Hb = e.__sapp_emsc_invoke_fetch_cb = function() {
  return (Hb = e.__sapp_emsc_invoke_fetch_cb = e.asm._sapp_emsc_invoke_fetch_cb).apply(null, arguments);
};
e._main = function() {
  return (e._main = e.asm.main).apply(null, arguments);
};
var S = e._malloc = function() {
  return (S = e._malloc = e.asm.malloc).apply(null, arguments);
};
e._free = function() {
  return (e._free = e.asm.free).apply(null, arguments);
};
var Ib = e.__saudio_emsc_pull = function() {
  return (Ib = e.__saudio_emsc_pull = e.asm._saudio_emsc_pull).apply(null, arguments);
};
e.___errno_location = function() {
  return (e.___errno_location = e.asm.__errno_location).apply(null, arguments);
};
var na = e.stackSave = function() {
  return (na = e.stackSave = e.asm.stackSave).apply(null, arguments);
}, oa = e.stackRestore = function() {
  return (oa = e.stackRestore = e.asm.stackRestore).apply(null, arguments);
}, B = e.stackAlloc = function() {
  return (B = e.stackAlloc = e.asm.stackAlloc).apply(null, arguments);
};
e.dynCall_jiji = function() {
  return (e.dynCall_jiji = e.asm.dynCall_jiji).apply(null, arguments);
};
var Kb;
function x(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
I = function Lb() {
  Kb || Mb();
  Kb || (I = Lb);
};
function Mb(a) {
  function b() {
    if (!Kb && (Kb = !0, e.calledRun = !0, !ka)) {
      L(za);
      L(Aa);
      if (e.onRuntimeInitialized) {
        e.onRuntimeInitialized();
      }
      if (Nb) {
        var c = a, d = e._main;
        c = c || [];
        var f = c.length + 1, h = B(4 * (f + 1));
        F[h >> 2] = sa(ca);
        for (var g = 1; g < f; g++) {
          F[(h >> 2) + g] = sa(c[g - 1]);
        }
        F[(h >> 2) + f] = 0;
        try {
          var m = d(f, h);
          if (!(noExitRuntime || 0 < ha)) {
            if (e.onExit) {
              e.onExit(m);
            }
            ka = !0;
          }
          k(m, new x(m));
        } catch (n) {
          n instanceof x || "unwind" == n || k(1, n);
        } finally {
        }
      }
      if (e.postRun) {
        for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
          c = e.postRun.shift(), Ca.unshift(c);
        }
      }
      L(Ca);
    }
  }
  a = a || ba;
  if (!(0 < H)) {
    if (e.preRun) {
      for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) {
        Da();
      }
    }
    L(ya);
    0 < H || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        e.setStatus("");
      }, 1);
      b();
    }, 1)) : b());
  }
}
e.run = Mb;
if (e.preInit) {
  for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) {
    e.preInit.pop()();
  }
}
var Nb = !0;
e.noInitialRun && (Nb = !1);
Mb();

