import { Children as e, cloneElement as t, createContext as n, createElement as r, forwardRef as i, isValidElement as a, memo as o, useCallback as s, useContext as c } from "react";
// node_modules/@ark-ui/react/dist/utils/compose-refs.js
function l(...e) {
	return (t) => {
		let n = [], r = !1;
		for (let i of e) if (typeof i == "function") {
			let e = i(t);
			typeof e == "function" ? (r = !0, n.push(e)) : n.push(() => i(null));
		} else i && (i.current = t, n.push(() => {
			i.current = null;
		}));
		if (r) return () => {
			for (let e of n) e();
		};
	};
}
function u(...e) {
	return s(l(...e), e);
}
// node_modules/@zag-js/utils/dist/guard.mjs
var d = (e) => typeof e == "string";
Function.prototype.toString.call(Object);
// node_modules/@zag-js/utils/dist/functions.mjs
var f = (...e) => (...t) => {
	e.forEach(function(e) {
		e?.(...t);
	});
}, p = (...e) => e.map((e) => e?.trim?.()).filter(Boolean).join(" "), m = (...e) => Array.from(new Set(p(...e).split(/\s+/).filter(Boolean))).join(" "), h = /((?:--)?(?:\w+-?)+)\s*:\s*([\s\S]*)/, g = (e) => {
	let t = {}, n = (e) => {
		let n = h.exec(e);
		n && (t[n[1]] = n[2]);
	}, r = 0, i = 0, a = "", o = !1;
	for (let t = 0; t < e.length; t++) {
		let s = e[t];
		o ? s === "*" && e[t + 1] === "/" && (o = !1, t++) : a ? (s === "\\" && t++, s === a && (a = "")) : s === "\\" ? t++ : s === "/" && e[t + 1] === "*" ? (o = !0, t++) : s === "\"" || s === "'" ? a = s : s === "(" ? i++ : s === ")" && i ? i-- : s === ";" && !i && (n(e.slice(r, t)), r = t + 1);
	}
	return n(e.slice(r)), t;
}, _ = (e, t) => {
	if (d(e)) {
		if (d(t)) return `${e};${t}`;
		e = g(e);
	} else d(t) && (t = g(t));
	return Object.assign({}, e ?? {}, t ?? {});
};
function v(...e) {
	let t = {};
	for (let n of e) {
		if (!n) continue;
		for (let e in t) t[e] = e.startsWith("on") && typeof t[e] == "function" && typeof n[e] == "function" ? f(n[e], t[e]) : e === "className" || e === "class" ? p(t[e], n[e]) : e === "style" ? _(t[e], n[e]) : e === "data-ownedby" ? m(t[e], n[e]) : n[e] === void 0 ? t[e] : n[e];
		for (let e in n) t[e] === void 0 && (t[e] = n[e]);
		let e = Object.getOwnPropertySymbols(n);
		for (let r of e) t[r] = n[r];
	}
	return t;
}
// node_modules/@ark-ui/react/dist/components/factory.js
function y(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var b = Symbol.for("react.lazy");
function x(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === b;
}
function S(t) {
	if (a(t)) return t;
	if (x(t)) return e.toArray(t).find(a);
}
var C = (e) => {
	let n = o(i((n, i) => {
		let { asChild: a, children: o, ...s } = n, c = a ? S(o) : void 0, l = c ? y(c) : void 0, d = u(i, l);
		return a ? c ? t(c, {
			...v(s, c.props),
			ref: i ? d : l
		}) : null : r(e, {
			...s,
			ref: i
		}, o);
	}));
	return n.displayName = e.displayName || e.name, n;
}, w = (() => {
	let e = /* @__PURE__ */ new Map();
	return new Proxy(C, {
		apply(e, t, n) {
			return C(n[0]);
		},
		get(t, n) {
			let r = n;
			return e.has(r) || e.set(r, C(r)), e.get(r);
		}
	});
})();
// styled-system/helpers.js
function T(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var E = Object.prototype.hasOwnProperty;
function ee(e) {
	return e === "base";
}
function te(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) ee(e[n]) || t.push(e[n]);
	return t;
}
function ne(e) {
	let t = 5381;
	for (let n = e.length; n;) t = t * 33 ^ e.charCodeAt(--n);
	let n = t >>> 0, r = "";
	for (; n > 52; n = n / 52 | 0) {
		let e = n % 52;
		r = String.fromCharCode(e + (e > 25 ? 39 : 97)) + r;
	}
	let i = n % 52;
	return String.fromCharCode(i + (i > 25 ? 39 : 97)) + r;
}
function re(e) {
	let t = {};
	if (!e) return t;
	for (let n in e) e[n] !== void 0 && (t[n] = e[n]);
	return t;
}
function D(e, t) {
	return {
		...e,
		...re(t)
	};
}
function O(e) {
	let t = {};
	for (let n in e) t[n] = Object.keys(e[n]);
	return t;
}
function ie(e, t) {
	for (let n in e) {
		if (n === "css" || n === "className" || n === "classNames") continue;
		let r = e[n], i = t[n];
		if (Array.isArray(r) ? !r.includes(i) : i !== r) return !1;
	}
	return !0;
}
function ae(e, t, n) {
	let r = [];
	for (let i of e) ie(i, t) && i.className && r.push(n ? n(i.className) : i.className);
	return r.join(" ");
}
function oe(e, t) {
	let n = {};
	for (let r of e) ie(r, t) && (n = A(n, r.css));
	return n;
}
function se(e, t) {
	let n = [];
	for (let r of e) {
		let e = r.css?.[t], i = r.classNames?.[t] ?? r.className;
		if (!e && !i) continue;
		let a = e ? { css: e } : {};
		for (let e in r) e !== "css" && e !== "className" && e !== "classNames" && (a[e] = r[e]);
		i && (a.className = i), n.push(a);
	}
	return n;
}
function ce(e) {
	let t = {}, n = e.slots ?? [];
	for (let r of n) t[r] = {
		className: e.className ? e.className + "__" + r : r,
		base: e.base?.[r] ?? {},
		variants: {},
		defaultVariants: e.defaultVariants ?? {},
		compoundVariants: se(e.compoundVariants ?? [], r)
	};
	let r = e.variants ?? {};
	for (let e in r) {
		let i = r[e];
		for (let r of n) {
			let n = t[r].variants[e] = {};
			for (let e in i) n[e] = i[e][r] ?? {};
		}
	}
	return t;
}
function le(e, t) {
	let n = {};
	for (let r = 0; r < e.length; r++) e[r] != null && (n[t[r]] = e[r]);
	return n;
}
function ue(e, t, n) {
	n ||= {};
	let { stop: r, getKey: i } = n, a = (e, n = []) => {
		if (!e || typeof e != "object" || r?.(e, n)) return t(e, n);
		let o = Array.isArray(e) ? [] : {};
		for (let t in e) {
			if (!E.call(e, t) || t === "__proto__") continue;
			let r = i?.(t, e[t]) ?? t;
			n.push(r);
			let s = a(e[t], n);
			n.pop(), s != null && (o[r] = s);
		}
		return o;
	};
	return a(e);
}
function de(e, t, n) {
	let { utility: r, conditions: i } = t, { hasShorthand: a, resolveShorthand: o } = r;
	return n = n !== !1, ue(e, (e) => Array.isArray(e) ? le(e, i.breakpoints.keys) : e, {
		stop: Array.isArray,
		getKey: n ? (e) => a ? o(e) : e : void 0
	});
}
function fe(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (typeof r != "object" || !r) t = t * 33 ^ 1;
		else for (let e in r) {
			let n = r[e], i = typeof n;
			if (n !== null && i === "object") return null;
			for (let n = 0; n < e.length; n++) t = t * 33 ^ e.charCodeAt(n);
			if (i === "string") for (let e = 0; e < n.length; e++) t = t * 33 ^ n.charCodeAt(e);
			else t = i === "number" ? t * 33 ^ (n | 0) : i === "boolean" ? t * 33 ^ (n ? 991 : 997) : t * 33 ^ 2;
		}
	}
	return t >>> 0;
}
function pe(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r === i) continue;
		if (r === null || i === null || typeof r != "object" || typeof i != "object") return !1;
		let a = 0;
		for (let e in r) {
			if (r[e] !== i[e]) return !1;
			a++;
		}
		if (a !== Object.keys(i).length) return !1;
	}
	return !0;
}
function k(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new WeakSet(), i = () => ({
		objects: /* @__PURE__ */ new WeakMap(),
		prims: /* @__PURE__ */ new Map(),
		out: void 0,
		has: !1
	}), a = i(), o, s, c, l = !1, u = 0, d = (e, t) => {
		if (typeof t == "object" && t) {
			let n = e.objects.get(t);
			return n === void 0 && (n = i(), e.objects.set(t, n)), n;
		}
		let n = e.prims.get(t);
		return n === void 0 && (e.prims.size > 64 && e.prims.clear(), n = i(), e.prims.set(t, n)), n;
	}, f = (e, t) => {
		if (Array.isArray(t)) {
			e = d(e, "\0[");
			for (let n = 0; n < t.length; n++) e = f(e, t[n]);
			return d(e, "\0]");
		}
		return d(e, t);
	}, p = (e, t) => {
		if (e !== void 0) {
			if (Array.isArray(t)) {
				e = e.prims.get("\0[");
				for (let n = 0; n < t.length && e !== void 0; n++) e = p(e, t[n]);
				return e === void 0 ? void 0 : e.prims.get("\0]");
			}
			return typeof t == "object" && t ? e.objects.get(t) : e.prims.get(t);
		}
	}, m = (e) => {
		if (Array.isArray(e)) {
			let t = !0;
			for (let n = 0; n < e.length; n++) m(e[n]) || (t = !1);
			return t;
		}
		return typeof e != "object" || !e || r.has(e) ? !0 : (r.add(e), !1);
	};
	return ((...r) => {
		let i = !1;
		for (let e = 0; e < r.length; e++) if (Array.isArray(r[e])) {
			i = !0;
			break;
		}
		if (i) {
			let t = a;
			for (let e = 0; e < r.length && t !== void 0; e++) t = p(t, r[e]);
			if (t !== void 0 && t.has) return t.out;
			let i = JSON.stringify(r), d = l && o === void 0 && i === s ? c : n.get(i);
			d === void 0 && (d = e(...r), n.set(i, d), n.size > 500 && n.delete(n.keys().next().value));
			let h = !1;
			if (!(++u & 3)) {
				h = !0;
				for (let e = 0; e < r.length; e++) m(r[e]) || (h = !1);
			}
			if (h) {
				let e = a;
				for (let t = 0; t < r.length; t++) e = f(e, r[t]);
				e.out = d, e.has = !0;
			}
			return o = void 0, s = i, c = d, l = !0, d;
		}
		let d = fe(r);
		if (d !== null) {
			if (l && o === d && pe(r, s)) return c;
			let n = t.get(d);
			if (n) {
				for (let e = 0; e < n.length; e++) if (pe(r, n[e].args)) return o = d, s = r, c = n[e].out, l = !0, n[e].out;
			}
			let i = e(...r);
			return n || (n = [], t.set(d, n)), n.push({
				args: r,
				out: i
			}), n.length > 8 && n.shift(), t.size > 500 && t.delete(t.keys().next().value), o = d, s = r, c = i, l = !0, i;
		}
		let h = JSON.stringify(r);
		if (l && o === void 0 && h === s) return c;
		let g = n.get(h);
		if (g !== void 0) return o = void 0, s = h, c = g, l = !0, g;
		let _ = e(...r);
		return n.set(h, _), n.size > 500 && n.delete(n.keys().next().value), o = void 0, s = h, c = _, l = !0, _;
	});
}
function me(e) {
	let t = /* @__PURE__ */ new WeakMap();
	return ((n) => {
		if (!n || typeof n != "object") return e(n);
		if (t.has(n)) return t.get(n);
		let r = e(n);
		return t.set(n, r), r;
	});
}
function A(...e) {
	let t = {};
	for (let n of e) if (n) for (let e in n) {
		if (!E.call(n, e) || e === "__proto__" || e === "constructor" || e === "prototype") continue;
		let r = t[e], i = n[e];
		t[e] = T(r) && T(i) ? A(r, i) : i;
	}
	return t;
}
var he = /[\n\s]+/g, ge = (e) => typeof e == "string" ? e.replace(he, " ") : e;
function _e(e, t) {
	let n = [], r = (e) => {
		for (let t = 0; t < e.length; t++) {
			let i = e[t];
			if (Array.isArray(i)) r(i);
			else if (T(i)) {
				for (let e in i) if (i[e] !== void 0) {
					n.push(i);
					break;
				}
			}
		}
	};
	if (r(e), n.length < 2) return n;
	for (let e = 0; e < n.length; e++) n[e] = de(n[e], t);
	return n;
}
function j(e) {
	let t = e.utility, n = e.conditions, r = e.hash, i = (e) => t.prefix ? t.prefix + "-" + e : e, a = (e, a) => {
		let o = n.finalize(e);
		return o.push(r ? a : i(a)), r ? i(t.toHash(o, ne)) : o.join(":");
	};
	return me(k(function({ base: r, ...i } = {}) {
		let o = de(r ? Object.assign(i, r) : i, e), s = /* @__PURE__ */ new Set();
		ue(o, (e, r) => {
			if (e == null) return;
			let i = Ce(e), [o, ...c] = n.shift(r), l = te(c), u = t.transform(o, L(we(ge(e)))), d = a(l, u.className);
			i && (d += "!"), s.add(d);
		});
		let c = "";
		for (let e of s) c += c ? " " + e : e;
		return c;
	}));
}
function ve(e) {
	return function() {
		return A(..._e(arguments, e));
	};
}
function ye(e, t) {
	return k(function(...n) {
		return e(t(...n));
	});
}
var be = /[A-Z]/g, xe = /^ms-/;
function Se(e) {
	return e.startsWith("--") ? e : e.replace(be, "-$&").replace(xe, "-ms-").toLowerCase();
}
var M = /* @__PURE__ */ new WeakMap();
function N(e) {
	let t = M.get(e);
	if (t) return t;
	t = Object.create(null);
	for (let n = 0; n < e.length; n++) t[e[n]] = !0;
	return M.set(e, t), t;
}
function P(e, t, n) {
	let r = Object.getOwnPropertyDescriptor(e, n);
	r?.get || r?.set ? Object.defineProperty(t, n, r) : t[n] = e[n];
}
function F(e, ...t) {
	let n = Object.keys(e), r = t.length;
	if (r === 1) {
		let r = t[0], i = {}, a = {};
		if (Array.isArray(r)) {
			let t = N(r);
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				t[o] === !0 ? P(e, i, o) : P(e, a, o);
			}
			return [i, a];
		}
		for (let t = 0; t < n.length; t++) {
			let o = n[t];
			r(o) ? P(e, i, o) : P(e, a, o);
		}
		return [i, a];
	}
	let i = Array(r);
	for (let e = 0; e < r; e++) {
		let n = t[e];
		i[e] = Array.isArray(n) ? N(n) : n;
	}
	let a = Array(r + 1);
	for (let e = 0; e <= r; e++) a[e] = {};
	let o = a[r];
	for (let t = 0; t < n.length; t++) {
		let s = n[t], c = !1;
		for (let t = 0; t < r; t++) {
			let n = i[t];
			if (typeof n == "function" ? n(s) : n[s] === !0) {
				P(e, a[t], s), c = !0;
				break;
			}
		}
		c || P(e, o, s);
	}
	return a;
}
function I(...e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (n) for (let e = 0; e < n.length; e++) t.add(n[e]);
	return Array.from(t);
}
function L(e) {
	return typeof e == "string" && e.indexOf(" ") >= 0 ? e.replaceAll(" ", "_") : e;
}
var R = /\s*!(important)?\s*$/i;
function Ce(e) {
	return typeof e == "string" && R.test(e);
}
function we(e) {
	return typeof e == "string" ? e.replace(R, "").trim() : e;
}
// styled-system/css/conditions.js
var z = /* @__PURE__ */ new Set(/* @__PURE__ */ "_active,_after,_anyPointerCoarse,_anyPointerFine,_anyPointerNone,_atValue,_autofill,_backdrop,_before,_checked,_closed,_complete,_current,_currentPage,_currentStep,_dark,_default,_disabled,_dragging,_empty,_enabled,_even,_expanded,_file,_first,_firstLetter,_firstLine,_firstOfType,_focus,_focusVisible,_focusWithin,_fullscreen,_grabbed,_groupActive,_groupChecked,_groupDisabled,_groupExpanded,_groupFocus,_groupFocusVisible,_groupFocusWithin,_groupHover,_groupInvalid,_hidden,_highContrast,_highlighted,_horizontal,_hover,_icon,_inRange,_incomplete,_indeterminate,_inert,_invalid,_invertedColors,_landscape,_last,_lastOfType,_lessContrast,_light,_loading,_ltr,_marker,_moreContrast,_motionReduce,_motionSafe,_noscript,_now,_odd,_only,_onlyOfType,_open,_optional,_osDark,_osLight,_outOfRange,_overValue,_peerActive,_peerChecked,_peerDisabled,_peerExpanded,_peerFocus,_peerFocusVisible,_peerFocusWithin,_peerHover,_peerInvalid,_peerPlaceholderShown,_placeholder,_placeholderShown,_pointerCoarse,_pointerFine,_pointerNone,_portrait,_pressed,_print,_rangeEnd,_rangeStart,_readOnly,_readWrite,_required,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_selected,_selection,_starting,_target,_today,_topmost,_unavailable,_underValue,_userInvalid,_userValid,_valid,_vertical,_visited,base".split(",")), Te = /^@|&/, Ee = /^_/, De = /&|@/, B = ["base"];
function V(e) {
	return z.has(e) || Te.test(e);
}
function H(e) {
	return e.map((e) => z.has(e) ? e.replace(Ee, "") : De.test(e) ? `[${L(e.trim())}]` : e);
}
function Oe(e) {
	return [...e].sort((e, t) => {
		let n = V(e), r = V(t);
		return n && !r ? 1 : !n && r ? -1 : 0;
	});
}
// styled-system/css/css.js
var ke = "WebkitTextFillColor:wktf-c,accentColor:ac-c,alignContent:ac,alignItems:ai,alignSelf:as,animation:anim,animationComposition:anim-comp,animationDelay:anim-dly,animationDirection:anim-dir,animationDuration:anim-dur,animationFillMode:anim-fm,animationIterationCount:anim-ic,animationName:anim-n,animationPlayState:anim-ps,animationRange:anim-r,animationRangeEnd:anim-re,animationRangeStart:anim-rs,animationState:anim-s,animationTimeline:anim-tl,animationTimingFunction:anim-tmf,appearance:ap,aspectRatio:asp,backdropBlur:bkdp-blur,backdropBrightness:bkdp-brightness,backdropContrast:bkdp-contrast,backdropFilter:bkdp,backdropGrayscale:bkdp-grayscale,backdropHueRotate:bkdp-hue-rotate,backdropInvert:bkdp-invert,backdropOpacity:bkdp-opacity,backdropSaturate:bkdp-saturate,backdropSepia:bkdp-sepia,backfaceVisibility:bfv,background:bg/1,backgroundAttachment:bg-a/bgAttachment,backgroundBlendMode:bg-bm/bgBlendMode,backgroundClip:bg-cp/bgClip,backgroundColor:bg-c/bgColor,backgroundConic:bg-conic/bgConic,backgroundGradient:bg-grad/bgGradient,backgroundImage:bg-i/bgImage,backgroundLinear:bg-linear/bgLinear,backgroundOrigin:bg-o/bgOrigin,backgroundPosition:bg-p/bgPosition,backgroundPositionX:bg-p-x/bgPositionX,backgroundPositionY:bg-p-y/bgPositionY,backgroundRadial:bg-radial/bgRadial,backgroundRepeat:bg-r/bgRepeat,backgroundSize:bg-s/bgSize,blockSize:h-bs,border:bd,borderBlock:bd-y/borderY,borderBlockColor:bd-y-c/borderYColor,borderBlockEnd:bd-be,borderBlockEndColor:bd-be-c,borderBlockEndWidth:bd-be-w,borderBlockStart:bd-bs,borderBlockStartColor:bd-bs-c,borderBlockStartWidth:bd-bs-w,borderBlockWidth:bd-y-w/borderYWidth,borderBottom:bd-b,borderBottomColor:bd-b-c,borderBottomLeftRadius:bdr-bl/roundedBottomLeft,borderBottomRadius:bdr-b/roundedBottom,borderBottomRightRadius:bdr-br/roundedBottomRight,borderBottomWidth:bd-b-w,borderCollapse:bd-cl,borderColor:bd-c,borderEndEndRadius:bdr-ee/roundedEndEnd,borderEndRadius:bdr-e/roundedEnd,borderEndStartRadius:bdr-es/roundedEndStart,borderInline:bd-x/borderX,borderInlineColor:bd-x-c/borderXColor,borderInlineEnd:bd-e/borderEnd,borderInlineEndColor:bd-e-c/borderEndColor,borderInlineEndWidth:bd-e-w/borderEndWidth,borderInlineStart:bd-s/borderStart,borderInlineStartColor:bd-s-c/borderStartColor,borderInlineStartWidth:bd-s-w/borderStartWidth,borderInlineWidth:bd-x-w/borderXWidth,borderLeft:bd-l,borderLeftColor:bd-l-c,borderLeftRadius:bdr-l/roundedLeft,borderLeftWidth:bd-l-w,borderRadius:bdr/rounded,borderRight:bd-r,borderRightColor:bd-r-c,borderRightRadius:bdr-r/roundedRight,borderRightWidth:bd-r-w,borderSpacing:bd-sp,borderSpacingX:bd-sx,borderSpacingY:bd-sy,borderStartEndRadius:bdr-se/roundedStartEnd,borderStartRadius:bdr-s/roundedStart,borderStartStartRadius:bdr-ss/roundedStartStart,borderTop:bd-t,borderTopColor:bd-t-c,borderTopLeftRadius:bdr-tl/roundedTopLeft,borderTopRadius:bdr-t/roundedTop,borderTopRightRadius:bdr-tr/roundedTopRight,borderTopWidth:bd-t-w,borderWidth:bd-w,boxDecorationBreak:bx-db,boxShadow:bx-sh/shadow,boxShadowColor:bx-sh-c/shadowColor,boxSize:size,boxSizing:bx-s,caretColor:ca-c,clipPath:cp-path,color:c,columnGap:cg,container:cq,containerName:cq-n,containerType:cq-t,display:d,divideColor:dvd-c,divideStyle:dvd-s,divideX:dvd-x,divideY:dvd-y,flexBasis:flex-b,flexDirection:flex-d/flexDir,flexGrow:flex-g,flexShrink:flex-sh,focusRingColor:focus-ring-c,focusRingOffset:focus-ring-o,focusRingStyle:focus-ring-s,focusRingWidth:focus-ring-w,focusVisibleRing:focus-v-ring,fontFamily:ff,fontFeatureSettings:ff-s,fontKerning:fk,fontPalette:fp,fontSize:fs,fontSizeAdjust:fs-a,fontSmoothing:fsmt,fontVariant:fv,fontVariantAlternates:fv-alt,fontVariantCaps:fv-caps,fontVariantNumeric:fv-num,fontVariationSettings:fv-s,fontWeight:fw,gradientFrom:grad-from,gradientFromPosition:grad-from-pos,gradientTo:grad-to,gradientToPosition:grad-to-pos,gradientVia:grad-via,gradientViaPosition:grad-via-pos,gridAutoColumns:grid-ac,gridAutoFlow:grid-af,gridAutoRows:grid-ar,gridColumn:grid-c,gridColumnEnd:grid-ce,gridColumnGap:grid-cg,gridColumnStart:grid-cs,gridGap:grid-g,gridRow:grid-r,gridRowGap:grid-rg,gridTemplateColumns:grid-tc,gridTemplateRows:grid-tr,height:h/1,hideBelow:show,hideFrom:hide,hyphens:hy,inlineSize:w-is,insetBlock:inset-y/insetY,insetBlockEnd:inset-be,insetBlockStart:inset-bs,insetInline:inset-x/insetX,insetInlineEnd:inset-e/end/insetEnd,insetInlineStart:inset-s/insetStart/start,justifyContent:jc,letterSpacing:ls,lineClamp:lc,lineHeight:lh,listStyle:li-s,listStyleImage:li-img,listStylePosition:li-pos,listStyleType:li-t,margin:m/1,marginBlock:my/marginY/1,marginBlockEnd:mbe,marginBlockStart:mbs,marginBottom:mb/1,marginInline:mx/marginX/1,marginInlineEnd:me/marginEnd/1,marginInlineStart:ms/marginStart/1,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,mask:msk,maskBottomFrom:msk-b-from,maskBottomFromColor:msk-b-from-c,maskBottomTo:msk-b-to,maskBottomToColor:msk-b-to-c,maskClip:msk-cp,maskComposite:msk-cmp,maskConic:msk-conic,maskConicFrom:msk-conic-from,maskConicFromColor:msk-conic-from-c,maskConicTo:msk-conic-to,maskConicToColor:msk-conic-to-c,maskImage:msk-i,maskLeftFrom:msk-l-from,maskLeftFromColor:msk-l-from-c,maskLeftTo:msk-l-to,maskLeftToColor:msk-l-to-c,maskLinear:msk-linear,maskLinearFrom:msk-linear-from,maskLinearFromColor:msk-linear-from-c,maskLinearTo:msk-linear-to,maskLinearToColor:msk-linear-to-c,maskMode:msk-md,maskOrigin:msk-o,maskPosition:msk-p,maskRadial:msk-radial,maskRadialAt:msk-radial-at,maskRadialFrom:msk-radial-from,maskRadialFromColor:msk-radial-from-c,maskRadialShape:msk-radial-shape,maskRadialSize:msk-radial-sz,maskRadialTo:msk-radial-to,maskRadialToColor:msk-radial-to-c,maskRepeat:msk-r,maskRightFrom:msk-r-from,maskRightFromColor:msk-r-from-c,maskRightTo:msk-r-to,maskRightToColor:msk-r-to-c,maskSize:msk-s,maskTopFrom:msk-t-from,maskTopFromColor:msk-t-from-c,maskTopTo:msk-t-to,maskTopToColor:msk-t-to-c,maskType:msk-t,maskXFrom:msk-x-from,maskXFromColor:msk-x-from-c,maskXTo:msk-x-to,maskXToColor:msk-x-to-c,maskYFrom:msk-y-from,maskYFromColor:msk-y-from-c,maskYTo:msk-y-to,maskYToColor:msk-y-to-c,maxBlockSize:max-b,maxHeight:max-h/maxH,maxInlineSize:max-w-is,maxWidth:max-w/maxW,minBlockSize:min-h-bs,minHeight:min-h/minH,minInlineSize:min-w-is,minWidth:min-w/minW,mixBlendMode:mix-bm,objectFit:obj-f,objectPosition:obj-p,opacity:op,outline:ring/1,outlineColor:ring-c/ringColor,outlineOffset:ring-o/ringOffset,outlineWidth:ring-w/ringWidth,overflow:ov,overflowAnchor:ov-a,overflowBlock:ov-b,overflowClipBox:ovcp-bx,overflowClipMargin:ovcp-m,overflowInline:ov-i,overflowWrap:ov-wrap,overflowX:ov-x,overflowY:ov-y,overscrollBehavior:ovs-b,overscrollBehaviorBlock:ovs-bb,overscrollBehaviorInline:ovs-bi,overscrollBehaviorX:ovs-bx,overscrollBehaviorY:ovs-by,padding:p/1,paddingBlock:py/paddingY/1,paddingBlockEnd:pbe,paddingBlockStart:pbs,paddingBottom:pb/1,paddingInline:px/paddingX/1,paddingInlineEnd:pe/paddingEnd/1,paddingInlineStart:ps/paddingStart/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,position:pos/1,rowGap:rg,scrollBehavior:scr-bhv,scrollMargin:scr-m,scrollMarginBlock:scr-my/scrollMarginY,scrollMarginBlockEnd:scr-mbe,scrollMarginBlockStart:scr-mbt,scrollMarginBottom:scr-mb,scrollMarginInline:scr-mx/scrollMarginX,scrollMarginInlineEnd:scr-me,scrollMarginInlineStart:scr-ms,scrollMarginLeft:scr-ml,scrollMarginRight:scr-mr,scrollMarginTop:scr-mt,scrollPadding:scr-p,scrollPaddingBlock:scr-py/scrollPaddingY,scrollPaddingBlockEnd:scr-pbe,scrollPaddingBlockStart:scr-pbs,scrollPaddingBottom:scr-pb,scrollPaddingInline:scr-px/scrollPaddingX,scrollPaddingInlineEnd:scr-pe,scrollPaddingInlineStart:scr-ps,scrollPaddingLeft:scr-pl,scrollPaddingRight:scr-pr,scrollPaddingTop:scr-pt,scrollSnapAlign:scr-sa,scrollSnapCoordinate:scrs-c,scrollSnapDestination:scrs-d,scrollSnapMargin:scrs-m,scrollSnapMarginBottom:scrs-mb,scrollSnapMarginLeft:scrs-ml,scrollSnapMarginRight:scrs-mr,scrollSnapMarginTop:scrs-mt,scrollSnapPointsX:scrs-px,scrollSnapPointsY:scrs-py,scrollSnapStop:scrs-s,scrollSnapStrictness:scrs-strt,scrollSnapType:scrs-t,scrollSnapTypeX:scrs-tx,scrollSnapTypeY:scrs-ty,scrollTimeline:scrtl,scrollTimelineAxis:scrtl-a,scrollTimelineName:scrtl-n,scrollbar:scr-bar,scrollbarColor:scr-bar-c,scrollbarGutter:scr-bar-g,scrollbarThumb:scr-bar-th,scrollbarTrack:scr-bar-tk,scrollbarWidth:scr-bar-w,spaceX:sx,spaceY:sy,srOnly:sr,stroke:stk,strokeDasharray:stk-dsh,strokeDashoffset:stk-do,strokeLinecap:stk-lc,strokeLinejoin:stk-lj,strokeMiterlimit:stk-ml,strokeOpacity:stk-op,strokeWidth:stk-w,tableLayout:tbl,textAlign:ta,textDecoration:td,textDecorationColor:td-c,textDecorationStyle:td-s,textDecorationThickness:td-t,textEmphasisColor:te-c,textGradient:txt-grad,textIndent:ti,textOverflow:tov,textShadow:tsh,textShadowColor:tsh-c/textShadowColor,textSizeAdjust:txt-adj,textStyle:textStyle,textTransform:tt,textUnderlineOffset:tu-o,textWrap:tw,touchAction:tch-a,transform:trf,transformBox:trf-b,transformOrigin:trf-o,transformStyle:trf-s,transition:trs,transitionDelay:trs-dly,transitionDuration:trs-dur,transitionProperty:trs-prop,transitionTimingFunction:trs-tmf,translateX:/x,translateY:/y,translateZ:/z,truncate:trunc,userSelect:us,verticalAlign:va,visibility:vis,width:w/1,wordBreak:wb,zIndex:z";
function Ae() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
	ke.split(",").forEach((n) => {
		let [r, i] = n.split(":"), [a, ...o] = i.split("/");
		a && e.set(r, a), o.forEach((e) => {
			let n = e === "1" ? a : e;
			t.set(n, r);
		});
	});
	let n = (e) => t.get(e) || e;
	return {
		hash: !1,
		conditions: {
			shift: Oe,
			finalize: H,
			breakpoints: { keys: B }
		},
		utility: {
			prefix: null,
			hasShorthand: !0,
			toHash(e, t) {
				return t(e.join(":"));
			},
			transform(t, r) {
				let i = n(t);
				return { className: `${e.get(i) || Se(i)}_${L(r)}` };
			},
			resolveShorthand: n
		}
	};
}
var je = /* @__PURE__ */ Ae(), Me = /* @__PURE__ */ j(je), U = /* @__PURE__ */ ve(je), Ne = /* @__PURE__ */ ye(Me, U), W = /* @__PURE__ */ Object.assign(function(...e) {
	return e.length === 1 && T(e[0]) ? Me(e[0]) : Ne(...e);
}, { raw: function(...e) {
	return U(...e);
} }), G = (e) => {
	let t = (e) => ({
		base: {},
		variants: {},
		defaultVariants: {},
		compoundVariants: [],
		...e
	}), { base: n, variants: r, defaultVariants: i, compoundVariants: a } = t(e), o = (e) => D(i, e), s = (e = {}) => {
		let t = o(e), i = [n];
		for (let e in t) {
			let n = t[e];
			r[e]?.[n] && i.push(r[e][n]);
		}
		return i.push(oe(a, t)), U(...i);
	}, c = Object.keys(r), l = O(r), u = k(s);
	return Object.assign(k(function(e) {
		return W(s(e));
	}), {
		__cva__: !0,
		variantMap: l,
		variantKeys: c,
		raw: s,
		__memoizedRaw__: u,
		config: e,
		merge: (e) => {
			let o = t(e.config), s = I(e.variantKeys, c);
			return G({
				base: U(n, o.base),
				variants: Object.fromEntries(s.map((e) => [e, U(r[e], o.variants[e])])),
				defaultVariants: A(i, o.defaultVariants),
				compoundVariants: [...a, ...o.compoundVariants]
			});
		},
		splitVariantProps(e) {
			return F(e, c);
		},
		getVariantProps: o
	});
};
// styled-system/css/cx.js
function K(...e) {
	let t = "", n = 0, r;
	for (; n < arguments.length;) (r = arguments[n++]) && typeof r == "string" && (t && (t += " "), t += r);
	return t;
}
// styled-system/css/sva.js
var Pe = (e) => {
	let t = ce(e), n = [];
	for (let e in t) n.push([e, G(t[e])]);
	let r = e.defaultVariants ?? {}, i = {};
	if (e.className) for (let [e, t] of n) i[e] = t.config.className;
	let a = e.variants ?? {}, o = Object.keys(a), s = O(a), c = (e) => {
		let t = {};
		for (let [r, a] of n) t[r] = K(a(e), i[r]);
		return t;
	}, l = (e) => {
		let t = {};
		for (let [r, i] of n) t[r] = i.raw(e);
		return t;
	}, u = k(l);
	return Object.assign(k(c), {
		__cva__: !1,
		raw: l,
		__memoizedRaw__: u,
		config: e,
		variantMap: s,
		variantKeys: o,
		classNameMap: i,
		splitVariantProps(e) {
			return F(e, o);
		},
		getVariantProps(e) {
			return D(r, e);
		}
	});
}, Fe = (e, t) => !e.__shouldForwardProps__ || !t ? t : (n) => e.__shouldForwardProps__(n) && t(n), Ie = (e, t) => {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e.__cva__ && t.__cva__ || e.__recipe__ && t.__recipe__) return e.merge(t, G);
	let n = /* @__PURE__ */ TypeError("Cannot merge cva with recipe. Please use either cva or recipe.");
	throw TypeError.captureStackTrace?.(n), n;
};
function q(e, t) {
	let n = Object.assign({}, e);
	for (let e in t) t[e] !== void 0 && (n[e] = t[e]);
	return n;
}
var J = (e) => typeof e == "string" ? e : e?.displayName || e?.name || "Component", Le = {
	htmlWidth: "width",
	htmlHeight: "height",
	htmlTranslate: "translate",
	htmlContent: "content"
}, Re = Object.prototype.hasOwnProperty;
function ze(e, t, n, r, i) {
	let a, o, s, c, l, u, d = Object.keys(e);
	for (let f = 0; f < d.length; f++) {
		let p = d[f], m = e[p];
		m !== void 0 && (p === "className" || i && p === "class" || p === "as" || p === "unstyled" || p === "children" || (Re.call(Le, p) ? (a ||= Object.create(null), a[Le[p]] = m) : t(p) ? (o ||= Object.create(null), o[p] = m) : n.has(p) ? (s ||= Object.create(null), s[p] = m) : p === "css" ? l = m : r(p) ? (c ||= {})[p] = m : (u ||= Object.create(null), u[p] = m)));
	}
	return [
		a,
		o,
		s || {},
		c,
		l,
		u
	];
}
function Y(e, t, n) {
	return n === void 0 ? e ? t === void 0 ? W(e) : W(e, t) : W(t) : e ? t === void 0 ? W(n, e) : W(n, e, t) : W(n, t);
}
// styled-system/jsx/is-valid-prop.js
var Be = /* @__PURE__ */ new Set(/* @__PURE__ */ "WebkitAppearance.WebkitBorderBefore.WebkitBorderBeforeColor.WebkitBorderBeforeStyle.WebkitBorderBeforeWidth.WebkitBoxReflect.WebkitLineClamp.WebkitMask.WebkitMaskAttachment.WebkitMaskClip.WebkitMaskComposite.WebkitMaskImage.WebkitMaskOrigin.WebkitMaskPosition.WebkitMaskPositionX.WebkitMaskPositionY.WebkitMaskRepeat.WebkitMaskRepeatX.WebkitMaskRepeatY.WebkitMaskSize.WebkitOverflowScrolling.WebkitTapHighlightColor.WebkitTextFillColor.WebkitTextStroke.WebkitTextStrokeColor.WebkitTextStrokeWidth.WebkitTouchCallout.WebkitUserModify.WebkitUserSelect._active._after._anyPointerCoarse._anyPointerFine._anyPointerNone._atValue._autofill._backdrop._before._checked._closed._complete._current._currentPage._currentStep._dark._default._disabled._dragging._empty._enabled._even._expanded._file._first._firstLetter._firstLine._firstOfType._focus._focusVisible._focusWithin._fullscreen._grabbed._groupActive._groupChecked._groupDisabled._groupExpanded._groupFocus._groupFocusVisible._groupFocusWithin._groupHover._groupInvalid._hidden._highContrast._highlighted._horizontal._hover._icon._inRange._incomplete._indeterminate._inert._invalid._invertedColors._landscape._last._lastOfType._lessContrast._light._loading._ltr._marker._moreContrast._motionReduce._motionSafe._noscript._now._odd._only._onlyOfType._open._optional._osDark._osLight._outOfRange._overValue._peerActive._peerChecked._peerDisabled._peerExpanded._peerFocus._peerFocusVisible._peerFocusWithin._peerHover._peerInvalid._peerPlaceholderShown._placeholder._placeholderShown._pointerCoarse._pointerFine._pointerNone._portrait._pressed._print._rangeEnd._rangeStart._readOnly._readWrite._required._rtl._scrollbar._scrollbarThumb._scrollbarTrack._selected._selection._starting._target._today._topmost._unavailable._underValue._userInvalid._userValid._valid._vertical._visited.accentColor.alignContent.alignItems.alignSelf.alignTracks.alignmentBaseline.all.anchorName.anchorScope.animation.animationComposition.animationDelay.animationDirection.animationDuration.animationFillMode.animationIterationCount.animationName.animationPlayState.animationRange.animationRangeEnd.animationRangeStart.animationState.animationTimeline.animationTimingFunction.appearance.aspectRatio.backdropBlur.backdropBrightness.backdropContrast.backdropFilter.backdropGrayscale.backdropHueRotate.backdropInvert.backdropOpacity.backdropSaturate.backdropSepia.backfaceVisibility.background.backgroundAttachment.backgroundBlendMode.backgroundClip.backgroundColor.backgroundConic.backgroundGradient.backgroundImage.backgroundLinear.backgroundOrigin.backgroundPosition.backgroundPositionX.backgroundPositionY.backgroundRadial.backgroundRepeat.backgroundSize.base.baselineShift.baselineSource.bg.bgAttachment.bgBlendMode.bgClip.bgColor.bgConic.bgGradient.bgImage.bgLinear.bgOrigin.bgPosition.bgPositionX.bgPositionY.bgRadial.bgRepeat.bgSize.blockSize.blur.border.borderBlock.borderBlockColor.borderBlockEnd.borderBlockEndColor.borderBlockEndStyle.borderBlockEndWidth.borderBlockStart.borderBlockStartColor.borderBlockStartStyle.borderBlockStartWidth.borderBlockStyle.borderBlockWidth.borderBottom.borderBottomColor.borderBottomLeftRadius.borderBottomRadius.borderBottomRightRadius.borderBottomStyle.borderBottomWidth.borderCollapse.borderColor.borderEnd.borderEndColor.borderEndEndRadius.borderEndRadius.borderEndStartRadius.borderEndWidth.borderImage.borderImageOutset.borderImageRepeat.borderImageSlice.borderImageSource.borderImageWidth.borderInline.borderInlineColor.borderInlineEnd.borderInlineEndColor.borderInlineEndStyle.borderInlineEndWidth.borderInlineStart.borderInlineStartColor.borderInlineStartStyle.borderInlineStartWidth.borderInlineStyle.borderInlineWidth.borderLeft.borderLeftColor.borderLeftRadius.borderLeftStyle.borderLeftWidth.borderRadius.borderRight.borderRightColor.borderRightRadius.borderRightStyle.borderRightWidth.borderSpacing.borderSpacingX.borderSpacingY.borderStart.borderStartColor.borderStartEndRadius.borderStartRadius.borderStartStartRadius.borderStartWidth.borderStyle.borderTop.borderTopColor.borderTopLeftRadius.borderTopRadius.borderTopRightRadius.borderTopStyle.borderTopWidth.borderWidth.borderX.borderXColor.borderXWidth.borderY.borderYColor.borderYWidth.bottom.boxAlign.boxDecorationBreak.boxDirection.boxFlex.boxFlexGroup.boxLines.boxOrdinalGroup.boxOrient.boxPack.boxShadow.boxShadowColor.boxSize.boxSizing.breakAfter.breakBefore.breakInside.brightness.captionSide.caret.caretColor.caretShape.clear.clip.clipPath.clipRule.color.colorInterpolation.colorInterpolationFilters.colorPalette.colorRendering.colorScheme.columnCount.columnFill.columnGap.columnRule.columnRuleColor.columnRuleStyle.columnRuleWidth.columnSpan.columnWidth.columns.contain.containIntrinsicBlockSize.containIntrinsicHeight.containIntrinsicInlineSize.containIntrinsicSize.containIntrinsicWidth.container.containerName.containerType.content.contentVisibility.contrast.cornerBlockEndShape.cornerBlockStartShape.cornerBottomLeftShape.cornerBottomRightShape.cornerBottomShape.cornerEndEndShape.cornerEndStartShape.cornerInlineEndShape.cornerInlineStartShape.cornerLeftShape.cornerRightShape.cornerShape.cornerStartEndShape.cornerStartStartShape.cornerTopLeftShape.cornerTopRightShape.cornerTopShape.counterIncrement.counterReset.counterSet.css.cursor.cx.cy.d.debug.direction.display.divideColor.divideStyle.divideX.divideY.dominantBaseline.dropShadow.dynamicRangeLimit.emptyCells.end.fieldSizing.fill.fillOpacity.fillRule.filter.flex.flexBasis.flexDir.flexDirection.flexFlow.flexGrow.flexShrink.flexWrap.float.floodColor.floodOpacity.focusRing.focusRingColor.focusRingOffset.focusRingStyle.focusRingWidth.focusVisibleRing.font.fontFamily.fontFeatureSettings.fontKerning.fontLanguageOverride.fontOpticalSizing.fontPalette.fontSize.fontSizeAdjust.fontSmooth.fontSmoothing.fontStretch.fontStyle.fontSynthesis.fontSynthesisPosition.fontSynthesisSmallCaps.fontSynthesisStyle.fontSynthesisWeight.fontVariant.fontVariantAlternates.fontVariantCaps.fontVariantEastAsian.fontVariantEmoji.fontVariantLigatures.fontVariantNumeric.fontVariantPosition.fontVariationSettings.fontWeight.fontWidth.forcedColorAdjust.gap.glyphOrientationVertical.gradientFrom.gradientFromPosition.gradientTo.gradientToPosition.gradientVia.gradientViaPosition.grayscale.grid.gridArea.gridAutoColumns.gridAutoFlow.gridAutoRows.gridColumn.gridColumnEnd.gridColumnGap.gridColumnStart.gridGap.gridRow.gridRowEnd.gridRowGap.gridRowStart.gridTemplate.gridTemplateAreas.gridTemplateColumns.gridTemplateRows.h.hangingPunctuation.height.hideBelow.hideFrom.hueRotate.hyphenateCharacter.hyphenateLimitChars.hyphens.imageOrientation.imageRendering.imageResolution.imeMode.initialLetter.initialLetterAlign.inlineSize.inset.insetBlock.insetBlockEnd.insetBlockStart.insetEnd.insetInline.insetInlineEnd.insetInlineStart.insetStart.insetX.insetY.interpolateSize.invert.isolation.justifyContent.justifyItems.justifySelf.justifyTracks.left.letterSpacing.lightingColor.lineBreak.lineClamp.lineHeight.lineHeightStep.listStyle.listStyleImage.listStylePosition.listStyleType.m.margin.marginBlock.marginBlockEnd.marginBlockStart.marginBottom.marginEnd.marginInline.marginInlineEnd.marginInlineStart.marginLeft.marginRight.marginStart.marginTop.marginTrim.marginX.marginY.marker.markerEnd.markerMid.markerStart.mask.maskBorder.maskBorderMode.maskBorderOutset.maskBorderRepeat.maskBorderSlice.maskBorderSource.maskBorderWidth.maskBottomFrom.maskBottomFromColor.maskBottomTo.maskBottomToColor.maskClip.maskComposite.maskConic.maskConicFrom.maskConicFromColor.maskConicTo.maskConicToColor.maskImage.maskLeftFrom.maskLeftFromColor.maskLeftTo.maskLeftToColor.maskLinear.maskLinearFrom.maskLinearFromColor.maskLinearTo.maskLinearToColor.maskMode.maskOrigin.maskPosition.maskRadial.maskRadialAt.maskRadialFrom.maskRadialFromColor.maskRadialShape.maskRadialSize.maskRadialTo.maskRadialToColor.maskRepeat.maskRightFrom.maskRightFromColor.maskRightTo.maskRightToColor.maskSize.maskTopFrom.maskTopFromColor.maskTopTo.maskTopToColor.maskType.maskXFrom.maskXFromColor.maskXTo.maskXToColor.maskYFrom.maskYFromColor.maskYTo.maskYToColor.masonryAutoFlow.mathDepth.mathShift.mathStyle.maxBlockSize.maxH.maxHeight.maxInlineSize.maxLines.maxW.maxWidth.mb.me.minBlockSize.minH.minHeight.minInlineSize.minW.minWidth.mixBlendMode.ml.mr.ms.mt.mx.my.objectFit.objectPosition.objectViewBox.offset.offsetAnchor.offsetDistance.offsetPath.offsetPosition.offsetRotate.opacity.order.orphans.outline.outlineColor.outlineOffset.outlineStyle.outlineWidth.overflow.overflowAnchor.overflowBlock.overflowClipBox.overflowClipMargin.overflowInline.overflowWrap.overflowX.overflowY.overlay.overscrollBehavior.overscrollBehaviorBlock.overscrollBehaviorInline.overscrollBehaviorX.overscrollBehaviorY.p.padding.paddingBlock.paddingBlockEnd.paddingBlockStart.paddingBottom.paddingEnd.paddingInline.paddingInlineEnd.paddingInlineStart.paddingLeft.paddingRight.paddingStart.paddingTop.paddingX.paddingY.page.pageBreakAfter.pageBreakBefore.pageBreakInside.paintOrder.pb.pe.perspective.perspectiveOrigin.pl.placeContent.placeItems.placeSelf.pointerEvents.pos.position.positionAnchor.positionArea.positionTry.positionTryFallbacks.positionTryOrder.positionVisibility.pr.printColorAdjust.ps.pt.px.py.quotes.r.resize.right.ring.ringColor.ringOffset.ringWidth.rotate.rotateX.rotateY.rotateZ.rounded.roundedBottom.roundedBottomLeft.roundedBottomRight.roundedEnd.roundedEndEnd.roundedEndStart.roundedLeft.roundedRight.roundedStart.roundedStartEnd.roundedStartStart.roundedTop.roundedTopLeft.roundedTopRight.rowGap.rubyAlign.rubyMerge.rubyOverhang.rubyPosition.rx.ry.saturate.scale.scaleX.scaleY.scrollBehavior.scrollInitialTarget.scrollMargin.scrollMarginBlock.scrollMarginBlockEnd.scrollMarginBlockStart.scrollMarginBottom.scrollMarginInline.scrollMarginInlineEnd.scrollMarginInlineStart.scrollMarginLeft.scrollMarginRight.scrollMarginTop.scrollMarginX.scrollMarginY.scrollPadding.scrollPaddingBlock.scrollPaddingBlockEnd.scrollPaddingBlockStart.scrollPaddingBottom.scrollPaddingInline.scrollPaddingInlineEnd.scrollPaddingInlineStart.scrollPaddingLeft.scrollPaddingRight.scrollPaddingTop.scrollPaddingX.scrollPaddingY.scrollSnapAlign.scrollSnapCoordinate.scrollSnapDestination.scrollSnapMargin.scrollSnapMarginBottom.scrollSnapMarginLeft.scrollSnapMarginRight.scrollSnapMarginTop.scrollSnapPointsX.scrollSnapPointsY.scrollSnapStop.scrollSnapStrictness.scrollSnapType.scrollSnapTypeX.scrollSnapTypeY.scrollTimeline.scrollTimelineAxis.scrollTimelineName.scrollbar.scrollbarColor.scrollbarGutter.scrollbarThumb.scrollbarTrack.scrollbarWidth.sepia.shadow.shadowColor.shapeImageThreshold.shapeMargin.shapeOutside.shapeRendering.spaceX.spaceY.speakAs.srOnly.start.stopColor.stopOpacity.stroke.strokeColor.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.tabSize.tableLayout.textAlign.textAlignLast.textAnchor.textAutospace.textBox.textBoxEdge.textBoxTrim.textCombineUpright.textDecoration.textDecorationColor.textDecorationLine.textDecorationSkip.textDecorationSkipInk.textDecorationStyle.textDecorationThickness.textEmphasis.textEmphasisColor.textEmphasisPosition.textEmphasisStyle.textGradient.textIndent.textJustify.textOrientation.textOverflow.textRendering.textShadow.textShadowColor.textSizeAdjust.textSpacingTrim.textStyle.textTransform.textUnderlineOffset.textUnderlinePosition.textWrap.textWrapMode.textWrapStyle.timelineScope.top.touchAction.transform.transformBox.transformOrigin.transformStyle.transition.transitionBehavior.transitionDelay.transitionDuration.transitionProperty.transitionTimingFunction.translate.translateX.translateY.translateZ.truncate.unicodeBidi.userSelect.vectorEffect.verticalAlign.viewTimeline.viewTimelineAxis.viewTimelineInset.viewTimelineName.viewTransitionClass.viewTransitionName.visibility.w.whiteSpace.whiteSpaceCollapse.widows.width.willChange.wordBreak.wordSpacing.wordWrap.writingMode.x.y.z.zIndex.zoom".split(".")), Ve = /&|@/;
function He(e) {
	return Be.has(e) || e.startsWith("--") || Ve.test(e);
}
// styled-system/jsx/factory.js
function X(e, t = {}, n = {}) {
	let a = t.__cva__ || t.__recipe__ ? t : G(t), o = Ie(e.__cva__, a), s = o.__memoizedRaw__ || o.raw, c = o.variantKeys, l = new Set(c), u = n.shouldForwardProp || ((e) => !l.has(e) && !He(e)), d = n.forwardProps, f = d?.length ? new Set(d) : void 0, p = f ? (e) => f.has(e) || u(e, c) : (e) => u(e, c), m = n.dataAttr && t.__name__ ? { "data-recipe": t.__name__ } : {}, h = Object.assign(m, n.defaultProps), g = Object.keys(h).length > 0, _ = Fe(e, p), v = e.__base__ || e, y = /* @__PURE__ */ i(function(e, n) {
		let i = e.as === void 0 ? v : e.as, a = e.unstyled, c = e.children, u = e;
		if (g) {
			let { as: t, unstyled: n, children: r, ...i } = e;
			u = q(h, i);
		}
		let [d, f, p, m, y, b] = ze(u, _, l, He), x = m || y !== void 0, S;
		if (a) S = K(x && Y(m, y), u.className);
		else if (t.__recipe__) {
			let e = o.__getCompoundVariantClasses__?.(p);
			S = K(o(p, !1), e, x && Y(m, y), u.className);
		} else S = K(x ? Y(m, y, s(p)) : o(p), u.className);
		return r(i, {
			ref: n,
			...f,
			...b,
			...d,
			className: S
		}, c ?? u.children);
	});
	return y.displayName = `styled.${J(v)}`, y.__cva__ = o, y.__base__ = v, y.__shouldForwardProps__ = p, y;
}
function Ue() {
	let e = /* @__PURE__ */ new Map();
	return new Proxy(X, {
		apply(e, t, n) {
			return X(...n);
		},
		get(t, n) {
			return e.has(n) || e.set(n, X(n)), e.get(n);
		}
	});
}
var Z = /* @__PURE__ */ Ue();
// styled-system/jsx/create-slot-recipe-context.js
function We(e) {
	let t = n(void 0);
	return [t, (n, r) => {
		let i = c(t);
		if (i === void 0) {
			let t = n ? `Component "${n}"` : "A component", i = r ? ` (slot: "${r}")` : "";
			throw Error(`${t}${i} cannot access ${e} because it's missing its Provider.`);
		}
		return i;
	}];
}
function Ge(e) {
	if (e == null) throw Error("createSlotRecipeContext requires a slot recipe");
	if (typeof e.splitVariantProps == "function" || e.slots) return e;
	throw Error("createSlotRecipeContext requires a slot recipe");
}
function Ke(e) {
	let t = Ge(e), a = typeof t.splitVariantProps == "function", o = a && t.__recipe__ !== void 0, s = a && t.__name__ ? t.__name__ : void 0, [l, u] = We(s ? `createSlotRecipeContext("${s}")` : "createSlotRecipeContext"), d = n(void 0), f = () => c(d), p = (e, t) => t ? q(t, e) : e, m = a ? t : Pe(t.config ?? t), h = (e, t) => {
		let { unstyled: n, ...r } = e;
		return n ? r : o ? {
			...r,
			className: K(t, r.className)
		} : {
			...t,
			...r
		};
	}, g = (e) => {
		let t = o ? m(e) : m.raw(e);
		return o || (t._classNameMap = m.classNameMap, t._variantProps = e), t;
	}, _ = (e) => o ? e : m(e._variantProps);
	return {
		withRootProvider: (e, t) => {
			let n = (n) => {
				let i = p(n, f()), [a, o] = m.splitVariantProps(i), s = g(a), c = t?.defaultProps ? q(t.defaultProps, o) : o;
				return r(l.Provider, {
					value: s,
					children: r(e, c)
				});
			};
			return n.displayName = `withRootProvider(${J(e)})`, n;
		},
		withProvider: (e, t, n) => {
			let a = Z(e, {}, n), o = i(function(e, i) {
				let o = p(e, f()), [s, c] = m.splitVariantProps(o), u = g(s);
				c.className == null && n?.defaultProps?.className && (c.className = n.defaultProps.className);
				let d = h(c, u[t]);
				return n?.forwardProps?.forEach((e) => {
					e in s && (d[e] = s[e]);
				}), r(l.Provider, {
					value: u,
					children: r(a, {
						...d,
						className: K(d.className, u._classNameMap?.[t]),
						"data-slot": t,
						ref: i
					})
				});
			});
			return o.displayName = `withProvider(${J(e)})`, o;
		},
		withContext: (e, t, n) => {
			let a = Z(e, {}, n), o = J(e), s = i(function(e, i) {
				let s = u(o, t), c = e.className == null && n?.defaultProps?.className ? {
					...e,
					className: n.defaultProps.className
				} : e, l = h(c, s[t]);
				return r(a, {
					...l,
					className: K(l.className, s._classNameMap?.[t]),
					"data-slot": t,
					ref: i
				});
			});
			return s.displayName = `withContext(${o})`, s;
		},
		PropsProvider: d.Provider,
		usePropsContext: f,
		useClassNames: () => _(u("", ""))
	};
}
// styled-system/recipes/runtime.js
function qe(e) {
	let t = e.variantMap ?? {};
	return {
		name: e.name,
		className: e.className ?? e.name,
		slots: e.slots ?? [],
		variantMap: t,
		variantKeys: Object.keys(t),
		defaults: e.defaultVariants ?? {},
		compounds: e.compoundVariants ?? []
	};
}
function Je(e) {
	let { name: t, className: n, variantMap: r, variantKeys: i, defaults: a, compounds: o } = qe(e), s = /* @__PURE__ */ j({
		hash: !1,
		conditions: {
			shift: Oe,
			finalize: H,
			breakpoints: { keys: B }
		},
		utility: {
			prefix: null,
			toHash(e, t) {
				return t(e.join(":"));
			},
			transform(e, t) {
				return { className: t === "__ignore__" ? n : `${n}--${e}_${L(t)}` };
			}
		}
	}), c = (e) => e;
	function l(e = {}) {
		return {
			[n]: "__ignore__",
			...D(a, e)
		};
	}
	function u(e) {
		if (o.length !== 0) for (let t of i) {
			let r = e[t];
			if (typeof r == "object" && r) throw Error(`[recipe:${n}:${t}] Conditions are not supported when using compound variants.`);
		}
	}
	function d(e) {
		return ae(o, l(e), c);
	}
	let f = Q(k(function(e = {}, t = !0) {
		u(e);
		let n = s(l(e));
		return t ? K(n, d(e)) : n;
	}), t, i, r, l);
	return f.__recipe__ = !0, f.__getCompoundVariantClasses__ = d, f.merge = function(e) {
		return Xe(f, e);
	}, f;
}
function Ye(e) {
	let { name: t, className: n, slots: r, variantMap: i, variantKeys: a, defaults: o, compounds: s } = qe(e), c = r.map(function(e) {
		return [e, Je({
			name: t,
			className: `${n}__${e}`,
			variantMap: i,
			defaultVariants: o,
			compoundVariants: se(s, e)
		})];
	}), l = k(function(e = {}) {
		let t = {};
		for (let [n, r] of c) t[n] = r(e);
		return t;
	});
	return Q(l, t, a, i, function(e = {}) {
		return D(o, e);
	}), l.__recipe__ = !1, l.classNameMap = {}, l;
}
function Xe(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	function n(...n) {
		let r = e(...n), i = t(...n);
		return r && i ? `${r} ${i}` : r || i;
	}
	let r = I(e.variantKeys, t.variantKeys), i = {};
	for (let n of r) i[n] = I(e.variantMap[n], t.variantMap[n]);
	return Q(n, `${e.__name__} ${t.__name__}`, r, i, function(e) {
		return e;
	}), n.__recipe__ = !0, n;
}
function Q(e, t, n, r, i) {
	return e.__name__ = t, e.raw = function(e) {
		return e;
	}, e.variantKeys = n, e.variantMap = r, e.splitVariantProps = function(e) {
		return F(e, n);
	}, e.getVariantProps = i, e;
}
var Ze = /* @__PURE__ */ Je({
	name: "button",
	defaultVariants: {
		size: "md",
		variant: "solid"
	},
	variantMap: {
		variant: [
			"solid",
			"outline",
			"ghost"
		],
		size: [
			"sm",
			"md",
			"lg"
		]
	}
}), Qe = /* @__PURE__ */ Ye({
	name: "card",
	slots: [
		"root",
		"header",
		"footer",
		"body"
	]
}), $e = Z(w.button, Ze), { withContext: $, withProvider: et } = Ke(Qe), tt = {
	Root: et(w.article, "root"),
	Header: $(w.header, "header"),
	Footer: $(w.footer, "footer"),
	Body: $(w.div, "body")
};
export { $e as Button, tt as Card };
