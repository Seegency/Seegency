
(() => {
    let t, e, n, o, i, a = null;
let s = 65;
const c = new Set();
const r = 1111;

function d(t) {
    o = performance.now();
    const e = t.target.closest("a");
    m(e) && p(e.href, "high");
}

function u(t) {
    if (performance.now() - o < r) return;
    if (!("closest" in t.target)) return;
    const e = t.target.closest("a");
    m(e) && (e.addEventListener("mouseout", f, { passive: !0 }), i = setTimeout(() => {
        p(e.href, "high");
        i = void 0;
    }, s));
}

function l(t) {
    const e = t.target.closest("a");
    m(e) && p(e.href, "high");
}

function f(t) {
    if (t.relatedTarget && t.target.closest("a") == t.relatedTarget.closest("a")) return;
    if (i) {
        clearTimeout(i);
        i = void 0;
    }
}

function h(t) {
    if (performance.now() - o < r) return;
    const e = t.target.closest("a");
    if (t.which > 1 || t.metaKey || t.ctrlKey) return;
    if (!e) return;
    e.addEventListener("click", function(t) {
        if (1337 != t.detail) return;
        t.preventDefault();
    }, { capture: !0, passive: !1, once: !0 });
    const n = new MouseEvent("click", { view: window, bubbles: !0, cancelable: !1, detail: 1337 });
    e.dispatchEvent(n);
}

function m(o) {
    if (o && o.href && (!n || "instant" in o.dataset)) {
        if (o.origin != location.origin) {
            if (!(e || "instant" in o.dataset) || !a) return false;
        }
        if (["http:", "https:"].includes(o.protocol) && ("http:" != o.protocol || "https:" != location.protocol) && (t || !o.search || "instant" in o.dataset) && !(o.hash && o.pathname + o.search == location.pathname + location.search || "noInstant" in o.dataset)) {
            if (o.href.includes && !o.href.includes('#'))
                return true;
        }
    }
    return false;
}

function p(t, e = "auto") {
    if (c.has(t)) return;
    const n = document.createElement("link");
    n.rel = "prefetch";
    n.href = t;
    n.fetchPriority = e;
    n.as = "document";
    document.head.appendChild(n);
    c.add(t);
}

(function() {
    if (!document.createElement("link").relList.supports("prefetch")) return;
    const o = "instantVaryAccept" in document.body.dataset || "Shopify" in window;
    const i = navigator.userAgent.indexOf("Chrome/");
    if (i > -1) {
        a = parseInt(navigator.userAgent.substring(i + "Chrome/".length));
    }
    if (o && a && a < 110) return;
    const c = "instantMousedownShortcut" in document.body.dataset;
    t = "instantAllowQueryString" in document.body.dataset;
    e = "instantAllowExternalLinks" in document.body.dataset;
    n = "instantWhitelist" in document.body.dataset;
    const f = { capture: !0, passive: !0 };
    let v = !1;
    let g = !1;
    if ("instantIntensity" in document.body.dataset) {
        const t = document.body.dataset.instantIntensity;
        if (t.startsWith("mousedown")) {
            v = !0;
            if (t === "mousedown-only") {
                g = !0;
            }
        } else if (t.startsWith("viewport")) {
            const e = navigator.connection && navigator.connection.saveData;
            const n = navigator.connection && navigator.connection.effectiveType && navigator.connection.effectiveType.includes("2g");
            if (!e && !n) {
                if (t === "viewport") {
                    if (document.documentElement.clientWidth * document.documentElement.clientHeight < 450000) {
                        g = !0;
                    }
                } else if (t === "viewport-all") {
                    g = !0;
                }
            }
        } else {
            const e = parseInt(t);
            if (!isNaN(e)) {
                s = e;
            }
        }
    }
    if (!g) {
        if (v) {
            if (!c) {
                document.addEventListener("mousedown", l, f);
            }
        } else {
            document.addEventListener("mouseover", u, f);
        }
    }
    if (c) {
        document.addEventListener("mousedown", h, f);
    }
    if (g) {
        let t = window.requestIdleCallback;
        if (!t) {
            t = (t => { t() });
        }
        t(function() {
            const t = new IntersectionObserver(e => {
                e.forEach(e => {
                    if (e.isIntersecting) {
                        const n = e.target;
                        t.unobserve(n);
                        p(n.href);
                    }
                });
            });
            document.querySelectorAll("a").forEach(e => {
                if (m(e)) {
                    t.observe(e);
                }
            });
        }, { timeout: 1500 });
    }
})();
  })();
