// Ambient "commons" dot-field for Common Trust — pink graph-paper agents
// that drift and cluster into concentric commons, then disperse.
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const PINK = "255,45,155";
  const SP = 40;
  let W, H, dpr, agents = [], commons = [], raf;

  function setup() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    agents = [];
    for (let y = SP * 0.5; y < H; y += SP)
      for (let x = SP * 0.5; x < W; x += SP)
        agents.push({ hx: x, hy: y, x: x, y: y });
    commons = [
      { sx: 0.14, sy: 0.34, R: 72, dur: 16, delay: 0 },
      { sx: 0.38, sy: 0.72, R: 96, dur: 21, delay: 6 },
      { sx: 0.6, sy: 0.24, R: 82, dur: 18, delay: 12 },
      { sx: 0.82, sy: 0.58, R: 88, dur: 19, delay: 4 },
    ];
  }

  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const t0 = performance.now();

  function draw(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const ox = Math.sin(t * 0.06) * 26 + Math.sin(t * 0.017) * 14;
    const oy = Math.cos(t * 0.05) * 22;
    const info = commons.map((c) => {
      const p = ((((t - c.delay) % c.dur) + c.dur) % c.dur) / c.dur;
      let w;
      if (p < 0.32) w = ease(p / 0.32);
      else if (p < 0.6) w = 1;
      else w = 1 - ease((p - 0.6) / 0.4);
      return {
        cx: c.sx * W + Math.sin(t * 0.08 + c.delay) * 40 + ox,
        cy: c.sy * H + Math.cos(t * 0.07 + c.delay) * 34 + oy,
        R: c.R,
        w: w,
      };
    });
    info.forEach((a) => {
      if (a.w > 0.02) {
        ctx.beginPath();
        ctx.arc(a.cx, a.cy, a.R, 0, 6.2832);
        ctx.strokeStyle = "rgba(" + PINK + "," + 0.12 * a.w + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(a.cx, a.cy, a.R * 0.62, 0, 6.2832);
        ctx.strokeStyle = "rgba(" + PINK + "," + 0.08 * a.w + ")";
        ctx.stroke();
      }
    });
    for (let i = 0; i < agents.length; i++) {
      const ag = agents[i];
      let tx = ag.hx + ox, ty = ag.hy + oy, bright = 0.16;
      let bestW = 0, best = null, bestD = 0;
      for (const a of info) {
        if (a.w <= 0.02) continue;
        const dx = ag.hx + ox - a.cx, dy = ag.hy + oy - a.cy;
        const d = Math.hypot(dx, dy);
        const ww = a.w * Math.exp(-Math.pow(d / (a.R * 1.7), 2));
        if (ww > bestW) { bestW = ww; best = a; bestD = d; }
      }
      if (best && bestW > 0.01) {
        const dx = ag.hx + ox - best.cx, dy = ag.hy + oy - best.cy;
        const d = bestD || 0.001;
        tx += (best.cx + (dx / d) * best.R - tx) * bestW;
        ty += (best.cy + (dy / d) * best.R - ty) * bestW;
        bright = 0.16 + bestW * 0.5;
      }
      ag.x += (tx - ag.x) * 0.05;
      ag.y += (ty - ag.y) * 0.05;
      ctx.beginPath();
      ctx.arc(ag.x, ag.y, 1.3, 0, 6.2832);
      ctx.fillStyle = "rgba(" + PINK + "," + bright + ")";
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  setup();
  window.addEventListener("resize", setup);
  raf = requestAnimationFrame(draw);
})();
