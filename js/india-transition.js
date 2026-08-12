/*
 * INDIA REIMAGINED — CINEMATIC INDIA TRANSITION
 * ------------------------------------------------
 */

(() => {
  "use strict";

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {
    svgPath: "assets/india.svg",
    duration: 4200,
    skipOnReturn: false,
    showOncePerSession: false,
    particleCount: 850,

    // Change these if you want to tune the experience later.
    background: "#02040a",
    accent1: "#ff9933",
    accent2: "#ffffff",
    accent3: "#138808"
  };

  /* =========================================================
     DON'T RUN INSIDE AN EMBED / PREVIEW
     ========================================================= */

  if (window.self !== window.top) return;

  if (
    CONFIG.showOncePerSession &&
    sessionStorage.getItem("indiaReimaginedIntroShown")
  ) {
    return;
  }

  if (CONFIG.showOncePerSession) {
    sessionStorage.setItem("indiaReimaginedIntroShown", "1");
  }

  /* =========================================================
     LOAD THREE.JS
     ========================================================= */

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);

      if (existing) {
        existing.addEventListener("load", resolve);
        if (window.THREE) resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

  /* =========================================================
     GLOBAL STYLES
     ========================================================= */

  const style = document.createElement("style");

  style.textContent = `
    html.india-intro-active,
    html.india-intro-active body {
      overflow: hidden !important;
      height: 100% !important;
    }

    #india-reimagined-intro {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background:
        radial-gradient(
          circle at 50% 46%,
          rgba(25, 45, 80, 0.22),
          transparent 35%
        ),
        #02040a;
      opacity: 1;
      visibility: visible;
      transition:
        opacity 1.25s cubic-bezier(.77,0,.18,1),
        visibility 1.25s;
      overflow: hidden;
      pointer-events: auto;
    }

    #india-reimagined-intro.intro-exit {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    #india-reimagined-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    .india-intro-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(
          ellipse at center,
          transparent 35%,
          rgba(0,0,0,.22) 65%,
          rgba(0,0,0,.78) 100%
        );
    }

    .india-intro-grain {
      position: absolute;
      inset: -50%;
      pointer-events: none;
      opacity: .055;
      background-image:
        url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
      animation: indiaGrain .18s steps(2) infinite;
    }

    @keyframes indiaGrain {
      0% { transform: translate(0,0); }
      25% { transform: translate(2%, -2%); }
      50% { transform: translate(-2%, 2%); }
      75% { transform: translate(2%, 2%); }
      100% { transform: translate(-2%, -2%); }
    }

    .india-intro-title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform:
        translate(-50%, -50%)
        translateY(135px);
      width: max-content;
      max-width: 90vw;
      text-align: center;
      color: white;
      font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      letter-spacing: .34em;
      text-transform: uppercase;
      font-size: clamp(10px, 1vw, 15px);
      font-weight: 500;
      opacity: 0;
      animation:
        indiaTitleIn 1.2s cubic-bezier(.16,1,.3,1) 1.35s forwards;
      pointer-events: none;
    }

    .india-intro-title strong {
      display: block;
      margin-top: 9px;
      font-size: clamp(18px, 2.3vw, 34px);
      font-weight: 700;
      letter-spacing: .2em;
      background:
        linear-gradient(
          90deg,
          ${CONFIG.accent1},
          white 48%,
          ${CONFIG.accent3}
        );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .india-intro-line {
      position: absolute;
      left: 50%;
      top: 50%;
      width: min(240px, 42vw);
      height: 1px;
      transform: translateX(-50%) translateY(111px) scaleX(0);
      transform-origin: center;
      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,.65),
          transparent
        );
      animation:
        indiaLineIn .9s cubic-bezier(.16,1,.3,1) 1.15s forwards;
    }

    .india-intro-skip {
      position: absolute;
      right: 26px;
      bottom: 24px;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.035);
      color: rgba(255,255,255,.55);
      padding: 8px 13px;
      border-radius: 999px;
      font: 500 10px/1 Inter, sans-serif;
      letter-spacing: .13em;
      text-transform: uppercase;
      cursor: pointer;
      backdrop-filter: blur(12px);
      transition:
        color .25s ease,
        border-color .25s ease,
        background .25s ease;
    }

    .india-intro-skip:hover {
      color: white;
      border-color: rgba(255,255,255,.4);
      background: rgba(255,255,255,.08);
    }

    @keyframes indiaTitleIn {
      from {
        opacity: 0;
        transform:
          translate(-50%, -50%)
          translateY(145px);
        filter: blur(8px);
      }

      to {
        opacity: .92;
        transform:
          translate(-50%, -50%)
          translateY(135px);
        filter: blur(0);
      }
    }

    @keyframes indiaLineIn {
      to {
        transform: translateX(-50%) translateY(111px) scaleX(1);
      }
    }

    @media (max-width: 700px) {
      .india-intro-title {
        transform:
          translate(-50%, -50%)
          translateY(125px);
      }

      .india-intro-skip {
        right: 15px;
        bottom: 15px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .india-intro-title,
      .india-intro-line,
      .india-intro-grain {
        animation: none !important;
      }

      .india-intro-title {
        opacity: .9;
      }

      .india-intro-line {
        transform: translateX(-50%) translateY(111px) scaleX(1);
      }
    }
  `;

  document.head.appendChild(style);

  /* =========================================================
     CREATE INTRO DOM
     ========================================================= */

  const intro = document.createElement("div");
  intro.id = "india-reimagined-intro";

  intro.innerHTML = `
    <canvas id="india-reimagined-canvas"></canvas>

    <div class="india-intro-vignette"></div>
    <div class="india-intro-grain"></div>

    <div class="india-intro-line"></div>

    <div class="india-intro-title">
      A billion possibilities
      <strong>India Reimagined</strong>
    </div>

    <button class="india-intro-skip" type="button">
      Skip
    </button>
  `;

  document.documentElement.classList.add("india-intro-active");
  document.body.appendChild(intro);

  /* =========================================================
     SKIP
     ========================================================= */

  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;

    intro.classList.add("intro-exit");
    document.documentElement.classList.remove("india-intro-active");

    setTimeout(() => {
      intro.remove();
      style.remove();
    }, 1400);
  };

  intro
    .querySelector(".india-intro-skip")
    .addEventListener("click", finish);

  /* =========================================================
     THREE.JS EXPERIENCE
     ========================================================= */

  const startExperience = () => {
    if (!window.THREE) {
      finish();
      return;
    }

    const THREE = window.THREE;
    const canvas = document.getElementById("india-reimagined-canvas");

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(CONFIG.background);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /* =======================================================
       INDIA SILHOUETTE
       -------------------------------------------------------
       Stylised geographically recognizable India outline.
       Designed specifically for this intro.
       ======================================================= */

    const loader = new THREE.SVGLoader();

loader.load(
  "assets/india.svg",
  (data) => {
      // Convert SVG paths into 3D geometry
      // Create India
      // Add lighting
      // Add glow
      // Add particles
      // Continue animation
  }
);
    /* =======================================================
       INDIA MATERIAL
       ======================================================= */

    const indiaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0e1724,
      metalness: 0.72,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
      emissive: 0x07111d,
      emissiveIntensity: 0.9
    });

    const india = new THREE.Mesh(
      geometry,
      indiaMaterial
    );

    india.rotation.x = -0.08;
    india.rotation.y = -0.10;

    scene.add(india);

    /* =======================================================
       EDGE GLOW
       ======================================================= */

    const edgesGeometry =
      new THREE.EdgesGeometry(geometry, 18);

    const edgeMaterial =
      new THREE.LineBasicMaterial({
        color: 0xff9933,
        transparent: true,
        opacity: 0.88
      });

    const edges = new THREE.LineSegments(
      edgesGeometry,
      edgeMaterial
    );

    edges.scale.setScalar(1.003);

    india.add(edges);

    /* =======================================================
       TRICOLOR ENERGY RINGS
       ======================================================= */

    const ringGroup = new THREE.Group();

    const ringColors = [
      0xff9933,
      0xffffff,
      0x138808
    ];

    ringColors.forEach((color, index) => {
      const ringGeometry =
        new THREE.RingGeometry(
          2.65 + index * 0.15,
          2.66 + index * 0.15,
          128
        );

      const ringMaterial =
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide
        });

      const ring = new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

      ring.rotation.x = Math.PI / 2;

      ringGroup.add(ring);
    });

    scene.add(ringGroup);

    /* =======================================================
       PARTICLES
       ======================================================= */

    const particleGeometry =
      new THREE.BufferGeometry();

    const positions =
      new Float32Array(CONFIG.particleCount * 3);

    const colors =
      new Float32Array(CONFIG.particleCount * 3);

    const particleColor = new THREE.Color();

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;

      const radius =
        2.7 + Math.random() * 3.7;

      const angle =
        Math.random() * Math.PI * 2;

      positions[i3] =
        Math.cos(angle) *
        radius *
        (0.7 + Math.random() * 0.55);

      positions[i3 + 1] =
        (Math.random() - 0.5) *
        6.5;

      positions[i3 + 2] =
        Math.sin(angle) *
        radius *
        (0.45 + Math.random() * 0.55);

      const choice = Math.random();

      if (choice < 0.34) {
        particleColor.setHex(0xff9933);
      } else if (choice < 0.67) {
        particleColor.setHex(0xffffff);
      } else {
        particleColor.setHex(0x138808);
      }

      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        colors,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    /* =======================================================
       ASHOKA CHAKRA
       ======================================================= */

    const chakraGroup =
      new THREE.Group();

    const chakraRadius = 0.42;

    const chakraGeometry =
      new THREE.RingGeometry(
        chakraRadius - 0.015,
        chakraRadius + 0.015,
        64
      );

    const chakraMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x6da8ff,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide
      });

    const chakra =
      new THREE.Mesh(
        chakraGeometry,
        chakraMaterial
      );

    chakra.rotation.x = Math.PI / 2;

    chakraGroup.add(chakra);

    for (let i = 0; i < 24; i++) {
      const a =
        (Math.PI * 2 * i) / 24;

      const spokeGeometry =
        new THREE.BoxGeometry(
          0.018,
          0.28,
          0.018
        );

      const spokeMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x6da8ff,
          transparent: true,
          opacity: 0.55
        });

      const spoke =
        new THREE.Mesh(
          spokeGeometry,
          spokeMaterial
        );

      spoke.position.x =
        Math.cos(a) * chakraRadius / 2;

      spoke.position.z =
        Math.sin(a) * chakraRadius / 2;

      spoke.rotation.y = a;

      chakraGroup.add(spoke);
    }

    chakraGroup.position.set(
      -0.15,
      0.35,
      0.22
    );

    scene.add(chakraGroup);

    /* =======================================================
       LIGHTING
       ======================================================= */

    const ambient =
      new THREE.AmbientLight(
        0x7894b8,
        1.8
      );

    scene.add(ambient);

    const orangeLight =
      new THREE.PointLight(
        0xff9933,
        8,
        8
      );

    orangeLight.position.set(
      -4,
      2,
      4
    );

    scene.add(orangeLight);

    const greenLight =
      new THREE.PointLight(
        0x138808,
        7,
        8
      );

    greenLight.position.set(
      4,
      -2,
      3
    );

    scene.add(greenLight);

    const whiteLight =
      new THREE.PointLight(
        0xffffff,
        5,
        7
      );

    whiteLight.position.set(
      0,
      4,
      4
    );

    scene.add(whiteLight);

    /* =======================================================
       MOUSE PARALLAX
       ======================================================= */

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX =
          (event.clientX / window.innerWidth - 0.5) * 2;

        mouseY =
          (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    /* =======================================================
       ANIMATION
       ======================================================= */

    const clock =
      new THREE.Clock();

    const startedAt =
      performance.now();

    const animate = () => {
      if (finished) return;

      requestAnimationFrame(animate);

      const elapsed =
        performance.now() - startedAt;

      const progress =
        Math.min(
          elapsed / CONFIG.duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          4
        );

      /* India slowly arrives */
      const introScale =
        Math.min(
          1,
          Math.max(
            0,
            (progress - 0.04) / 0.55
          )
        );

      const scaleEase =
        1 -
        Math.pow(
          1 - introScale,
          3
        );

      const targetScale =
        0.66 +
        scaleEase * 0.34;

      india.scale.setScalar(
        targetScale
      );

      /* Cinematic rotation */
      india.rotation.y =
        -0.10 +
        mouseX * 0.08 +
        Math.sin(
          elapsed * 0.00025
        ) * 0.055;

      india.rotation.x =
        -0.08 -
        mouseY * 0.035;

      /* Particles orbit */
      particles.rotation.y =
        elapsed * 0.000055;

      particles.rotation.x =
        Math.sin(
          elapsed * 0.00015
        ) * 0.04;

      /* Energy rings */
      ringGroup.rotation.z =
        elapsed * 0.00018;

      ringGroup.rotation.x =
        Math.sin(
          elapsed * 0.0002
        ) * 0.15;

      /* Chakra rotation */
      chakraGroup.rotation.z =
        -elapsed * 0.0008;

      /* Camera breathing */
      const cameraTarget =
        8.5 -
        eased * 1.35;

      camera.position.z +=
        (cameraTarget -
          camera.position.z) *
        0.025;

      camera.position.x +=
        (mouseX * 0.24 -
          camera.position.x) *
        0.025;

      camera.position.y +=
        (-mouseY * 0.16 -
          camera.position.y) *
        0.025;

      camera.lookAt(0, 0, 0);

      /* Final cinematic zoom */
      if (progress > 0.72) {
        const exitProgress =
          (progress - 0.72) / 0.28;

        camera.position.z =
          7.15 -
          exitProgress * 3.8;

        indiaMaterial.emissiveIntensity =
          0.9 +
          exitProgress * 2.4;

        edgeMaterial.opacity =
          0.88 +
          exitProgress * 0.12;

        particleMaterial.opacity =
          0.78 *
          (1 - exitProgress * 0.65);
      }

      renderer.render(
        scene,
        camera
      );

      if (progress >= 1) {
        finish();
      }
    };

    animate();

    /* =======================================================
       RESIZE
       ======================================================= */

    window.addEventListener(
      "resize",
      () => {
        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            2
          )
        );
      },
      { passive: true }
    );

    /* =======================================================
       SAFETY FALLBACK
       ======================================================= */

    setTimeout(() => {
      if (!finished) finish();
    }, CONFIG.duration + 2500);
  };

  /* =========================================================
     START
     ========================================================= */

  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
  )
    .then(startExperience)
    .catch(() => {
      // If Three.js cannot load, don't break the website.
      finish();
    });
})();
