/*! reskin-fx · efectos de presentación · sin dependencias · no toca lógica
 *
 * Qué hace (todo opcional, se activa por atributos o config):
 *   particles  canvas decorativo (stars | dust | bubbles | pixels | confetti | orbs)
 *   reveal     entrada al hacer scroll   → [data-rs-reveal="up|down|left|right|scale|pop|fade"]
 *   parallax   desplazamiento con scroll → [data-rs-parallax="0.15"]
 *   tilt       inclinación 3D al puntero → [data-rs-tilt]
 *   spot       foco de luz que sigue el puntero dentro de una tarjeta → [data-rs-spot]
 *   glow       variables --rs-cx / --rs-cy con la posición del puntero (en <html>)
 *   magnet     botón/icono que se acerca al cursor → [data-rs-magnet="8"]
 *   scroll     expone --rs-scroll (0–1) en <html> para escenas que cambian de luz
 *   progress   barra de progreso de lectura (aria-hidden)
 *
 * Imágenes con vida: Ken Burns, zoom y sheen son CSS puro; .rs-img-reveal usa el observer de
 * scroll de este script. Ver reskin-fx.css y references/images.md.
 *
 * Config (elige UNA vía):
 *   A) <html data-rs-fx="particles reveal parallax tilt spot magnet progress"
 *            data-rs-particles="stars"
 *            data-rs-reveal-auto=".rs-card, .rs-stat, .rs-hero > *">
 *   B) window.RESKIN_FX = { fx:"particles reveal", particles:"dust", revealAuto:".rs-card" }
 *      (antes de cargar este archivo)
 *
 * Seguridad: respeta prefers-reduced-motion, pausa con la pestaña oculta, no captura
 * eventos (pointer-events:none), usa atributos data-* (React no los pisa) y nunca oculta
 * contenido si el script falla (la clase .rs-fx-on solo se pone al arrancar bien).
 */
(function () {
  "use strict";
  if (typeof window === "undefined" || window.__rsFx) return;
  window.__rsFx = true;

  var root = document.documentElement;
  var cfgIn = window.RESKIN_FX || {};
  var attr = function (n) { return root.getAttribute(n) || ""; };
  var fxList = (cfgIn.fx || attr("data-rs-fx")).split(/\s+/).filter(Boolean);
  var has = function (n) { return fxList.indexOf(n) > -1; };
  var kind = cfgIn.particles || attr("data-rs-particles") || "dust";
  var layer = cfgIn.layer || attr("data-rs-particles-layer") || "back";
  var revealAuto = cfgIn.revealAuto || attr("data-rs-reveal-auto");
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var finePointer = !!(window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches);
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  var scheduled = false, queue = [];
  function later(fn) { queue.push(fn); if (scheduled) return; scheduled = true; raf(function () { scheduled = false; var q = queue; queue = []; for (var i = 0; i < q.length; i++) q[i](); }); }

  /* ---------- reveal ---------- */
  var io = null;
  function markAuto() {
    if (!revealAuto) return;
    var list; try { list = document.querySelectorAll(revealAuto); } catch (e) { return; }
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (!el.hasAttribute("data-rs-reveal")) {
        el.setAttribute("data-rs-reveal", "up");
        var idx = 0, s = el.previousElementSibling;
        while (s && idx < 8) { idx++; s = s.previousElementSibling; }
        el.style.setProperty("--rs-i", idx);
      }
    }
  }
  function observeReveal() {
    var els = document.querySelectorAll("[data-rs-reveal]:not([data-rs-seen])");
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute("data-rs-seen", "");
      if (io) io.observe(els[i]); else els[i].setAttribute("data-rs-in", "");
    }
  }
  function observeImages() {
    var imgs = document.querySelectorAll(".rs-img-reveal:not([data-rs-seen])");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("data-rs-seen", "");
      if (io) io.observe(imgs[i]); else imgs[i].setAttribute("data-rs-in", "");
    }
  }
  function initReveal() {
    var imgReveal = document.querySelector(".rs-img-reveal");
    if (reduce || !(has("reveal") || revealAuto || imgReveal)) return;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) { entries[i].target.setAttribute("data-rs-in", ""); io.unobserve(entries[i].target); }
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    root.classList.add("rs-fx-on");
    markAuto(); observeReveal(); observeImages();
  }

  /* ---------- parallax ---------- */
  function runParallax() {
    var els = document.querySelectorAll("[data-rs-parallax]");
    var vh = window.innerHeight;
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) continue;
      var sp = parseFloat(els[i].getAttribute("data-rs-parallax")) || 0.12;
      var off = (r.top + r.height / 2) - vh / 2;
      els[i].style.setProperty("--rs-py", (-off * sp).toFixed(1) + "px");
    }
  }
  function initParallax() {
    if (reduce || !has("parallax")) return;
    var tick = function () { later(runParallax); };
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    tick();
  }

  /* ---------- scroll (variable) y progress (barra) ---------- */
  function initScroll() {
    if (reduce || !(has("scroll") || has("progress"))) return;
    if (has("progress")) {
      var bar = document.createElement("div");
      bar.className = "rs-fx-progress"; bar.setAttribute("aria-hidden", "true");
      bar.appendChild(document.createElement("i"));
      document.body.appendChild(bar);
    }
    var upd = function () {
      var h = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--rs-scroll", h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)).toFixed(4) : "0");
    };
    window.addEventListener("scroll", function () { later(upd); }, { passive: true });
    window.addEventListener("resize", function () { later(upd); });
    upd();
  }

  /* ---------- puntero: tilt, spot, glow ---------- */
  function initPointer() {
    if (reduce || !finePointer) return;
    var wantTilt = has("tilt"), wantSpot = has("spot"), wantGlow = has("glow"), wantMagnet = has("magnet");
    if (!wantTilt && !wantSpot && !wantGlow && !wantMagnet) return;
    document.addEventListener("pointermove", function (e) {
      var x = e.clientX, y = e.clientY, t = e.target;
      later(function () {
        if (wantGlow) { root.style.setProperty("--rs-cx", x + "px"); root.style.setProperty("--rs-cy", y + "px"); }
        if (!t || !t.closest) return;
        if (wantSpot) {
          var s = t.closest("[data-rs-spot]");
          if (s) { var rs = s.getBoundingClientRect(); s.style.setProperty("--rs-mx", (x - rs.left) + "px"); s.style.setProperty("--rs-my", (y - rs.top) + "px"); }
        }
        if (wantTilt) {
          var el = t.closest("[data-rs-tilt]");
          if (el) {
            var r = el.getBoundingClientRect();
            var max = parseFloat(el.getAttribute("data-rs-tilt")) || 7;
            var px = (x - r.left) / r.width - 0.5, py = (y - r.top) / r.height - 0.5;
            el.style.setProperty("--rs-ry", (px * max * 2).toFixed(2) + "deg");
            el.style.setProperty("--rs-rx", (-py * max * 2).toFixed(2) + "deg");
            el.setAttribute("data-rs-tilting", "");
          }
        }
        if (wantMagnet) {
          var mg = t.closest("[data-rs-magnet]");
          if (mg) {
            var mr = mg.getBoundingClientRect();
            var pull = parseFloat(mg.getAttribute("data-rs-magnet")) || 8;
            var mxp = ((x - mr.left) / mr.width - 0.5) * pull * 2;
            var myp = ((y - mr.top) / mr.height - 0.5) * pull * 2;
            mg.style.setProperty("--rs-mtx", mxp.toFixed(1) + "px");
            mg.style.setProperty("--rs-mty", myp.toFixed(1) + "px");
          }
        }
      });
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      var el = wantTilt && e.target && e.target.closest && e.target.closest("[data-rs-tilt]");
      if (el && !el.contains(e.relatedTarget)) {
        el.style.setProperty("--rs-rx", "0deg"); el.style.setProperty("--rs-ry", "0deg"); el.removeAttribute("data-rs-tilting");
      }
      var mg = wantMagnet && e.target && e.target.closest && e.target.closest("[data-rs-magnet]");
      if (mg && !mg.contains(e.relatedTarget)) {
        mg.style.setProperty("--rs-mtx", "0px"); mg.style.setProperty("--rs-mty", "0px");
      }
    });
  }

  /* ---------- partículas ---------- */
  function initParticles() {
    if (!has("particles") || !document.body) return;
    var c = document.createElement("canvas");
    c.className = "rs-fx-canvas"; c.setAttribute("aria-hidden", "true");
    if (layer === "front") c.setAttribute("data-layer", "front");
    document.body.appendChild(c);
    var ctx = c.getContext("2d"); if (!ctx) return;
    var cs = getComputedStyle(root);
    var cols = [1, 2, 3].map(function (i) { return (cs.getPropertyValue("--rs-fx-p" + i) || "").trim(); }).filter(Boolean);
    if (!cols.length) cols = [(cs.getPropertyValue("--rs-accent") || "#ffffff").trim()];
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, items = [], mx = -999, my = -999, last = 0, running = false;
    var rnd = function (a, b) { return a + Math.random() * (b - a); };
    function make() {
      var col = cols[Math.floor(Math.random() * cols.length)], p = { x: rnd(0, W), y: rnd(0, H), c: col, ph: rnd(0, 6.28) };
      switch (kind) {
        case "stars": p.r = rnd(0.4, 1.7); p.vx = rnd(-0.02, 0.02); p.vy = rnd(-0.02, 0.04); p.sp = rnd(0.6, 2); break;
        case "bubbles": p.r = rnd(4, 20); p.vx = 0; p.vy = -rnd(0.15, 0.6); p.sp = rnd(0.5, 1.4); break;
        case "pixels": p.r = Math.round(rnd(3, 6)); p.vx = 0; p.vy = rnd(0.25, 1); p.sp = 1; break;
        case "confetti": p.r = rnd(4, 8); p.vx = rnd(-0.2, 0.2); p.vy = rnd(0.4, 1.3); p.rot = rnd(0, 6.28); p.vr = rnd(-0.04, 0.04); p.sp = 1; break;
        case "orbs": p.r = rnd(120, 260); p.vx = rnd(-0.12, 0.12); p.vy = rnd(-0.1, 0.1); p.sp = 1; break;
        default: p.r = rnd(1, 3); p.vx = rnd(-0.12, 0.12); p.vy = rnd(-0.12, 0.12); p.sp = rnd(0.5, 1.5);
      }
      return p;
    }
    function seed() {
      var n = kind === "orbs" ? 5 : Math.round(Math.min(cfgIn.max || 90, (W * H) / 16000));
      if (W < 640 && kind !== "orbs") n = Math.round(n * 0.6);
      items = []; for (var i = 0; i < n; i++) items.push(make());
    }
    function size() { W = window.innerWidth; H = window.innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); seed(); }
    function draw(t, dt) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < items.length; i++) {
        var p = items[i];
        if (dt) {
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (kind === "bubbles") p.x += Math.sin(t / 900 * p.sp + p.ph) * 0.25;
          if (kind === "confetti") p.rot += p.vr * dt;
          if (finePointer && (kind === "dust" || kind === "bubbles") && mx > -900) {
            var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
            if (d2 < 14400 && d2 > 1) { var f = (1 - Math.sqrt(d2) / 120) * 1.4; p.x += (dx / Math.sqrt(d2)) * f * dt * 0.5; p.y += (dy / Math.sqrt(d2)) * f * dt * 0.5; }
          }
          var m = p.r + 4;
          if (p.x < -m) p.x = W + m; else if (p.x > W + m) p.x = -m;
          if (p.y < -m) p.y = H + m; else if (p.y > H + m) p.y = -m;
        }
        ctx.fillStyle = p.c; ctx.strokeStyle = p.c;
        if (kind === "stars") { ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t / 1000 * p.sp + p.ph)); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
        else if (kind === "bubbles") { ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.stroke(); ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.18, 0, 6.283); ctx.fill(); }
        else if (kind === "pixels") { ctx.globalAlpha = 0.7; ctx.fillRect(Math.round(p.x), Math.round(p.y), p.r, p.r); }
        else if (kind === "confetti") { ctx.globalAlpha = 0.85; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); }
        else if (kind === "orbs") { var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, p.c); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.globalAlpha = 0.22; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
        else { ctx.globalAlpha = 0.2 + 0.4 * Math.abs(Math.sin(t / 1500 * p.sp + p.ph)); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }
    function loop(ts) {
      if (!running) return;
      if (ts - last >= 33) { var dt = Math.min(3, (ts - last) / 16.7); last = ts; draw(ts, dt); }
      raf(loop);
    }
    function start() { if (running || reduce) return; running = true; last = performance.now(); raf(loop); }
    function stop() { running = false; }
    size(); draw(0, 0);                                   // un frame estático siempre (también con reduced motion)
    if (!reduce) {
      start();
      document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
      window.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    }
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduce) draw(0, 0); }, 150); });
  }

  /* ---------- arranque ---------- */
  function boot() {
    try {
      initReveal(); initParallax(); initScroll(); initPointer(); initParticles();
      if (document.body && "MutationObserver" in window && (revealAuto || has("reveal") || has("parallax") || document.querySelector(".rs-img-reveal"))) {
        new MutationObserver(function () { later(function () { markAuto(); if (io || !reduce) { observeReveal(); observeImages(); } if (has("parallax")) runParallax(); }); })
          .observe(document.body, { childList: true, subtree: true });
      }
    } catch (err) { root.classList.remove("rs-fx-on"); if (window.console) console.warn("[reskin-fx]", err); }
  }
  window.RSFX = { refresh: function () { markAuto(); observeReveal(); observeImages(); runParallax(); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
