/*
 * INDIA REIMAGINED — CINEMATIC INDIA TRANSITION
 */

(() => {
  "use strict";

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {
    // YOUR INDIA SVG
    svgPath: "assets/india.svg",

    // Total intro duration in milliseconds
    duration: 5200,

    // Show intro every time the homepage loads
    showOncePerSession: false,

    // Show Skip button
    allowSkip: true,

    // Number of surrounding particles
    particleCount: 1100,

    // Background
    background: "#02040a",

    // Indian tricolour
    saffron: 0xff9933,
    white: 0xffffff,
    green: 0x138808,

    // India body
    indiaColor: 0x111a28,
    indiaGlow: 0x07111d,

    // Chakra
    chakraColor: 0x7fb5ff
  };


  /* =========================================================
     PREVENT RUNNING INSIDE IFRAME
     ========================================================= */

  if (window.self !== window.top) return;


  /* =========================================================
     SESSION OPTION
     ========================================================= */

  if (
    CONFIG.showOncePerSession &&
    sessionStorage.getItem("indiaReimaginedIntroShown")
  ) {
    return;
  }

  if (CONFIG.showOncePerSession) {
    sessionStorage.setItem(
      "indiaReimaginedIntroShown",
      "1"
    );
  }


  /* =========================================================
     PAGE STYLES
     ========================================================= */

  const style = document.createElement("style");

  style.textContent = `

    html.india-reimagined-active,
    html.india-reimagined-active body {
      overflow: hidden !important;
      height: 100% !important;
    }

    #india-reimagined-intro {
      position: fixed;
      inset: 0;
      z-index: 2147483647;

      overflow: hidden;

      background:
        radial-gradient(
          circle at 50% 45%,
          rgba(25, 55, 95, 0.25),
          transparent 36%
        ),
        #02040a;

      opacity: 1;
      visibility: visible;

      transition:
        opacity 1.3s cubic-bezier(.77,0,.18,1),
        visibility 1.3s;

      pointer-events: auto;
    }

    #india-reimagined-intro.exit {
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

    .india-vignette {
      position: absolute;
      inset: 0;

      pointer-events: none;

      background:
        radial-gradient(
          ellipse at center,
          transparent 34%,
          rgba(0,0,0,.20) 62%,
          rgba(0,0,0,.82) 100%
        );
    }

    .india-grain {
      position: absolute;
      inset: -50%;

      pointer-events: none;

      opacity: .045;

      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E");

      animation:
        indiaNoise .18s steps(2) infinite;
    }

    @keyframes indiaNoise {

      0% {
        transform: translate(0,0);
      }

      25% {
        transform: translate(2%,-2%);
      }

      50% {
        transform: translate(-2%,2%);
      }

      75% {
        transform: translate(2%,2%);
      }

      100% {
        transform: translate(-2%,-2%);
      }

    }

    .india-title {
      position: absolute;

      left: 50%;
      top: 50%;

      transform:
        translate(-50%,-50%)
        translateY(150px);

      width: max-content;
      max-width: 90vw;

      text-align: center;

      color: rgba(255,255,255,.78);

      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

      font-size:
        clamp(9px,.9vw,14px);

      font-weight: 500;

      letter-spacing: .38em;

      text-transform: uppercase;

      opacity: 0;

      filter: blur(8px);

      animation:
        indiaTitleIn
        1.2s
        cubic-bezier(.16,1,.3,1)
        1.45s
        forwards;

      pointer-events: none;
    }

    .india-title strong {
      display: block;

      margin-top: 10px;

      font-size:
        clamp(18px,2.3vw,34px);

      font-weight: 750;

      letter-spacing: .20em;

      background:
        linear-gradient(
          90deg,
          #ff9933,
          #ffffff 48%,
          #138808
        );

      -webkit-background-clip: text;
      background-clip: text;

      color: transparent;
    }

    .india-line {
      position: absolute;

      left: 50%;
      top: 50%;

      width: min(270px,46vw);
      height: 1px;

      transform:
        translateX(-50%)
        translateY(124px)
        scaleX(0);

      transform-origin: center;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,.72),
          transparent
        );

      animation:
        indiaLineIn
        .9s
        cubic-bezier(.16,1,.3,1)
        1.25s
        forwards;
    }

    @keyframes indiaTitleIn {

      from {
        opacity: 0;

        transform:
          translate(-50%,-50%)
          translateY(165px);

        filter: blur(8px);
      }

      to {
        opacity: .94;

        transform:
          translate(-50%,-50%)
          translateY(150px);

        filter: blur(0);
      }

    }

    @keyframes indiaLineIn {

      to {
        transform:
          translateX(-50%)
          translateY(124px)
          scaleX(1);
      }

    }

    .india-skip {
      position: absolute;

      right: 25px;
      bottom: 23px;

      border:
        1px solid
        rgba(255,255,255,.16);

      border-radius: 999px;

      padding: 8px 13px;

      background:
        rgba(255,255,255,.035);

      color:
        rgba(255,255,255,.55);

      font:
        500 10px/1
        Inter,
        system-ui,
        sans-serif;

      letter-spacing: .13em;

      text-transform: uppercase;

      cursor: pointer;

      backdrop-filter: blur(12px);

      transition:
        .25s ease;
    }

    .india-skip:hover {
      color: white;

      border-color:
        rgba(255,255,255,.40);

      background:
        rgba(255,255,255,.08);
    }

    @media (max-width:700px) {

      .india-title {
        transform:
          translate(-50%,-50%)
          translateY(132px);
      }

      .india-skip {
        right: 14px;
        bottom: 14px;
      }

    }

    @media (prefers-reduced-motion:reduce) {

      .india-title,
      .india-line,
      .india-grain {
        animation: none !important;
      }

      .india-title {
        opacity: .94;
        filter: none;
      }

      .india-line {
        transform:
          translateX(-50%)
          translateY(124px)
          scaleX(1);
      }

    }

  `;

  document.head.appendChild(style);


  /* =========================================================
     CREATE INTRO
     ========================================================= */

  const intro = document.createElement("div");

  intro.id =
    "india-reimagined-intro";

  intro.innerHTML = `

    <canvas
      id="india-reimagined-canvas">
    </canvas>

    <div class="india-vignette"></div>

    <div class="india-grain"></div>

    <div class="india-line"></div>

    <div class="india-title">

      A billion possibilities

      <strong>
        India Reimagined
      </strong>

    </div>

    ${
      CONFIG.allowSkip
        ? `
          <button
            class="india-skip"
            type="button">
            Skip
          </button>
        `
        : ""
    }

  `;


  /* =========================================================
     MOUNT INTRO
     ========================================================= */

  const mount = () => {

    if (!document.body) return;

    document.documentElement.classList.add(
      "india-reimagined-active"
    );

    document.body.appendChild(
      intro
    );

  };


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      mount,
      { once:true }
    );

  } else {

    mount();

  }


  /* =========================================================
     FINISH / CLEANUP
     ========================================================= */

  let finished = false;

  let animationFrame = null;

  let renderer = null;


  const finish = () => {

    if (finished) return;

    finished = true;

    if (animationFrame) {

      cancelAnimationFrame(
        animationFrame
      );

    }

    document.documentElement.classList.remove(
      "india-reimagined-active"
    );

    intro.classList.add(
      "exit"
    );

    setTimeout(() => {

      intro.remove();

      style.remove();

      if (renderer) {

        try {
          renderer.dispose();
        } catch (_) {}

      }

    }, 1400);

  };


  /* =========================================================
     SKIP BUTTON
     ========================================================= */

  const skip =
    intro.querySelector(
      ".india-skip"
    );

  if (skip) {

    skip.addEventListener(
      "click",
      finish
    );

  }


  /* =========================================================
     LOAD THREE.JS + SVG LOADER
     ========================================================= */

  const loadModules =
    async () => {

      try {

        const THREE =
          await import(
            "https://cdn.jsdelivr.net/npm/three@0.160.0/+esm"
          );

        const {
          SVGLoader
        } =
          await import(
            "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/SVGLoader.js/+esm"
          );

        return {
          THREE,
          SVGLoader
        };

      } catch (error) {

        console.error(
          "India transition could not load Three.js:",
          error
        );

        finish();

        return null;

      }

    };


  /* =========================================================
     MAIN EXPERIENCE
     ========================================================= */

  const start =
    async () => {

      const modules =
        await loadModules();

      if (
        !modules ||
        finished
      ) {
        return;
      }

      const {
        THREE,
        SVGLoader
      } = modules;


      /* =====================================================
         CANVAS
         ===================================================== */

      const canvas =
        document.getElementById(
          "india-reimagined-canvas"
        );

      if (!canvas) {

        finish();

        return;

      }


      /* =====================================================
         SCENE
         ===================================================== */

      const scene =
        new THREE.Scene();

      scene.background =
        new THREE.Color(
          CONFIG.background
        );


      /* =====================================================
         CAMERA
         ===================================================== */

      const camera =
        new THREE.PerspectiveCamera(
          38,
          window.innerWidth /
            window.innerHeight,
          0.1,
          100
        );

      camera.position.set(
        0,
        0.1,
        8.7
      );


      /* =====================================================
         RENDERER
         ===================================================== */

      renderer =
        new THREE.WebGLRenderer({
          canvas: canvas,

          antialias: true,

          alpha: false,

          powerPreference:
            "high-performance"
        });

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          2
        )
      );

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.outputColorSpace =
        THREE.SRGBColorSpace;


      /* =====================================================
         LIGHTS
         ===================================================== */

      scene.add(
        new THREE.AmbientLight(
          0x7894b8,
          1.55
        )
      );


      const orangeLight =
        new THREE.PointLight(
          CONFIG.saffron,
          8,
          11
        );

      orangeLight.position.set(
        -4.2,
        2.8,
        4.5
      );

      scene.add(
        orangeLight
      );


      const greenLight =
        new THREE.PointLight(
          CONFIG.green,
          7,
          11
        );

      greenLight.position.set(
        4,
        -2.8,
        3.7
      );

      scene.add(
        greenLight
      );


      const whiteLight =
        new THREE.PointLight(
          CONFIG.white,
          5,
          10
        );

      whiteLight.position.set(
        0,
        4.5,
        5
      );

      scene.add(
        whiteLight
      );


      /* =====================================================
         LOAD YOUR ACTUAL INDIA SVG
         ===================================================== */

      const svgLoader =
        new SVGLoader();


      let svgData;


      try {

        svgData =
          await svgLoader.loadAsync(
            CONFIG.svgPath
          );

      } catch (error) {

        console.error(
          "Could not load India SVG:",
          CONFIG.svgPath,
          error
        );

        finish();

        return;

      }


      if (
        !svgData ||
        !svgData.paths ||
        !svgData.paths.length
      ) {

        console.error(
          "India SVG contains no usable paths."
        );

        finish();

        return;

      }


      /* =====================================================
         INDIA GROUP
         ===================================================== */

      const india =
        new THREE.Group();

      scene.add(
        india
      );


      /* =====================================================
         INDIA MATERIAL
         ===================================================== */

      const indiaMaterial =
        new THREE.MeshPhysicalMaterial({

          color:
            CONFIG.indiaColor,

          metalness:
            0.78,

          roughness:
            0.24,

          clearcoat:
            1,

          clearcoatRoughness:
            0.13,

          emissive:
            CONFIG.indiaGlow,

          emissiveIntensity:
            0.75,

          side:
            THREE.DoubleSide

        });


      const edgeMaterial =
        new THREE.LineBasicMaterial({

          color:
            CONFIG.saffron,

          transparent:
            true,

          opacity:
            0.86

        });


      /* =====================================================
         SVG → 3D GEOMETRY
         ===================================================== */

      for (
        const path of svgData.paths
      ) {

        const shapes =
          SVGLoader.createShapes(
            path
          );


        for (
          const shape of shapes
        ) {

          const geometry =
            new THREE.ExtrudeGeometry(
              shape,
              {

                depth:
                  0.24,

                bevelEnabled:
                  true,

                bevelSegments:
                  3,

                steps:
                  1,

                bevelSize:
                  0.035,

                bevelThickness:
                  0.035

              }
            );


          const mesh =
            new THREE.Mesh(
              geometry,
              indiaMaterial
            );


          india.add(
            mesh
          );


          /* -------------------------------------------------
             INDIA OUTLINE
             ------------------------------------------------- */

          const edgeGeometry =
            new THREE.EdgesGeometry(
              geometry,
              18
            );


          const edges =
            new THREE.LineSegments(
              edgeGeometry,
              edgeMaterial
            );


          edges.scale.setScalar(
            1.003
          );


          mesh.add(
            edges
          );

        }

      }


      /* =====================================================
         AUTOMATIC CENTRE + SCALE
         ===================================================== */

      const box =
        new THREE.Box3()
          .setFromObject(
            india
          );


      const center =
        box.getCenter(
          new THREE.Vector3()
        );


      const size =
        box.getSize(
          new THREE.Vector3()
        );


      india.position.sub(
        center
      );


      const largest =
        Math.max(
          size.x,
          size.y,
          size.z
        );


      if (
        largest > 0 &&
        Number.isFinite(
          largest
        )
      ) {

        const target =
          4.65;

        const scale =
          target / largest;

        /*
         * SVG coordinates normally have Y
         * increasing downward.
         *
         * Negative Y flips it vertically.
         */

        india.scale.set(
          scale,
          -scale,
          scale
        );

      }


      /* =====================================================
         3D TILT
         ===================================================== */

      india.rotation.x =
        -0.20;

      india.rotation.y =
        -0.08;


      /* =====================================================
         GLOW COPY
         ===================================================== */

      const glow =
        india.clone(
          true
        );


      glow.traverse(
        object => {

          if (
            object.isMesh
          ) {

            object.material =
              new THREE.MeshBasicMaterial({

                color:
                  CONFIG.saffron,

                transparent:
                  true,

                opacity:
                  0.035,

                side:
                  THREE.DoubleSide,

                blending:
                  THREE.AdditiveBlending,

                depthWrite:
                  false

              });

          }


          if (
            object.isLineSegments
          ) {

            object.material =
              new THREE.LineBasicMaterial({

                color:
                  CONFIG.green,

                transparent:
                  true,

                opacity:
                  0.08,

                blending:
                  THREE.AdditiveBlending

              });

          }

        }
      );


      glow.scale.multiplyScalar(
        1.035
      );

      glow.position.z =
        -0.08;

      scene.add(
        glow
      );


      /* =====================================================
         PARTICLES
         ===================================================== */

      const particleGeometry =
        new THREE.BufferGeometry();


      const positions =
        new Float32Array(
          CONFIG.particleCount * 3
        );


      const colors =
        new Float32Array(
          CONFIG.particleCount * 3
        );


      const color =
        new THREE.Color();


      for (
        let i = 0;
        i < CONFIG.particleCount;
        i++
      ) {

        const i3 =
          i * 3;


        const radius =
          2.6 +
          Math.random() * 4;


        const angle =
          Math.random() *
          Math.PI *
          2;


        positions[i3] =
          Math.cos(angle) *
          radius *
          (
            .7 +
            Math.random() * .55
          );


        positions[i3 + 1] =
          (
            Math.random() -
            .5
          ) * 6.8;


        positions[i3 + 2] =
          Math.sin(angle) *
          radius *
          (
            .45 +
            Math.random() * .65
          );


        const choice =
          Math.random();


        if (
          choice < .34
        ) {

          color.setHex(
            CONFIG.saffron
          );

        } else if (
          choice < .67
        ) {

          color.setHex(
            CONFIG.white
          );

        } else {

          color.setHex(
            CONFIG.green
          );

        }


        colors[i3] =
          color.r;

        colors[i3 + 1] =
          color.g;

        colors[i3 + 2] =
          color.b;

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

          size:
            0.024,

          vertexColors:
            true,

          transparent:
            true,

          opacity:
            0.72,

          blending:
            THREE.AdditiveBlending,

          depthWrite:
            false

        });


      const particles =
        new THREE.Points(
          particleGeometry,
          particleMaterial
        );


      scene.add(
        particles
      );


      /* =====================================================
         ASHOKA CHAKRA
         ===================================================== */

      const chakra =
        new THREE.Group();


      const chakraRadius =
        0.42;


      const chakraRing =
        new THREE.Mesh(

          new THREE.RingGeometry(
            chakraRadius - .014,
            chakraRadius + .014,
            64
          ),

          new THREE.MeshBasicMaterial({

            color:
              CONFIG.chakraColor,

            transparent:
              true,

            opacity:
              .72,

            side:
              THREE.DoubleSide,

            blending:
              THREE.AdditiveBlending

          })

        );


      chakraRing.rotation.x =
        Math.PI / 2;


      chakra.add(
        chakraRing
      );


      for (
        let i = 0;
        i < 24;
        i++
      ) {

        const angle =
          (
            Math.PI * 2 * i
          ) / 24;


        const spoke =
          new THREE.Mesh(

            new THREE.BoxGeometry(
              .018,
              .27,
              .018
            ),

            new THREE.MeshBasicMaterial({

              color:
                CONFIG.chakraColor,

              transparent:
                true,

              opacity:
                .54,

              blending:
                THREE.AdditiveBlending

            })

          );


        spoke.position.x =
          Math.cos(angle) *
          chakraRadius *
          .48;


        spoke.position.z =
          Math.sin(angle) *
          chakraRadius *
          .48;


        spoke.rotation.y =
          angle;


        chakra.add(
          spoke
        );

      }


      chakra.position.z =
        .45;


      scene.add(
        chakra
      );


      /* =====================================================
         TRICOLOUR RINGS
         ===================================================== */

      const rings =
        new THREE.Group();


      const ringData = [

        {
          color:
            CONFIG.saffron,
          size:
            2.8
        },

        {
          color:
            CONFIG.white,
          size:
            3.0
        },

        {
          color:
            CONFIG.green,
          size:
            3.2
        }

      ];


      ringData.forEach(
        data => {

          const ring =
            new THREE.Mesh(

              new THREE.RingGeometry(
                data.size - .008,
                data.size,
                160
              ),

              new THREE.MeshBasicMaterial({

                color:
                  data.color,

                transparent:
                  true,

                opacity:
                  .065,

                side:
                  THREE.DoubleSide,

                blending:
                  THREE.AdditiveBlending

              })

            );


          ring.rotation.x =
            Math.PI / 2;


          rings.add(
            ring
          );

        }
      );


      scene.add(
        rings
      );


      /* =====================================================
         MOUSE MOVEMENT
         ===================================================== */

      let mouseX = 0;
      let mouseY = 0;


      window.addEventListener(
        "mousemove",
        event => {

          mouseX =
            (
              event.clientX /
              window.innerWidth -
              .5
            ) * 2;


          mouseY =
            (
              event.clientY /
              window.innerHeight -
              .5
            ) * 2;

        },
        {
          passive:true
        }
      );


      /* =====================================================
         ANIMATION
         ===================================================== */

      const startTime =
        performance.now();


      const animate =
        () => {

          if (finished)
            return;


          animationFrame =
            requestAnimationFrame(
              animate
            );


          const elapsed =
            performance.now() -
            startTime;


          const progress =
            Math.min(
              elapsed /
                CONFIG.duration,
              1
            );


          const eased =
            1 -
            Math.pow(
              1 - progress,
              4
            );


          /* -------------------------------------------------
             INDIA APPEARS
             ------------------------------------------------- */

          const reveal =
            Math.min(
              1,
              Math.max(
                0,
                (
                  progress -
                  .03
                ) / .50
              )
            );


          const revealEase =
            1 -
            Math.pow(
              1 - reveal,
              3
            );


          const scale =
            .72 +
            revealEase * .28;


          india.scale.set(
            scale,
            -scale,
            scale
          );


          glow.scale.set(
            scale * 1.035,
            -scale * 1.035,
            scale * 1.035
          );


          /* -------------------------------------------------
             INDIA MOVEMENT
             ------------------------------------------------- */

          india.rotation.y =
            -.08 +
            mouseX * .075 +
            Math.sin(
              elapsed * .00023
            ) * .045;


          india.rotation.x =
            -.20 -
            mouseY * .035;


          glow.rotation.copy(
            india.rotation
          );


          /* -------------------------------------------------
             PARTICLES
             ------------------------------------------------- */

          particles.rotation.y =
            elapsed * .00005;


          particles.rotation.x =
            Math.sin(
              elapsed * .00013
            ) * .045;


          /* -------------------------------------------------
             RINGS
             ------------------------------------------------- */

          rings.rotation.z =
            elapsed * .00018;


          rings.rotation.x =
            Math.sin(
              elapsed * .00018
            ) * .13;


          /* -------------------------------------------------
             CHAKRA
             ------------------------------------------------- */

          chakra.rotation.z =
            -elapsed * .00075;


          /* -------------------------------------------------
             CAMERA
             ------------------------------------------------- */

          camera.position.x +=
            (
              mouseX * .20 -
              camera.position.x
            ) * .025;


          camera.position.y +=
            (
              -mouseY * .14 -
              camera.position.y
            ) * .025;


          if (
            progress <= .72
          ) {

            const targetZ =
              8.7 -
              eased * 1.45;


            camera.position.z +=
              (
                targetZ -
                camera.position.z
              ) * .025;

          }


          /* -------------------------------------------------
             FINAL ZOOM
             ------------------------------------------------- */

          if (
            progress > .72
          ) {

            const exitProgress =
              (
                progress -
                .72
              ) / .28;


            camera.position.z =
              7.25 -
              exitProgress * 4.25;


            indiaMaterial.emissiveIntensity =
              .75 +
              exitProgress * 2.5;


            particleMaterial.opacity =
              .72 *
              (
                1 -
                exitProgress * .72
              );

          }


          camera.lookAt(
            0,
            0,
            0
          );


          renderer.render(
            scene,
            camera
          );


          if (
            progress >= 1
          ) {

            finish();

          }

        };


      animate();


      /* =====================================================
         RESIZE
         ===================================================== */

      window.addEventListener(
        "resize",
        () => {

          if (
            finished ||
            !renderer
          ) return;


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
        {
          passive:true
        }
      );


      /* =====================================================
         SAFETY FALLBACK
         ===================================================== */

      setTimeout(
        () => {

          if (!finished)
            finish();

        },
        CONFIG.duration + 3000
      );

    };


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      start,
      {
        once:true
      }
    );

  } else {

    start();

  }

})();
