const matches = window.matchMedia("(max-width:767.97px)").matches;
let ratio = 0.5;

class World {
  renderer;
  scene;
  camera;
  molecule;

  constructor({ frameElement }) {
    this.build(this.getSettings(frameElement));

    window.addEventListener("resize", this.resize.bind(this));

    this.animate = this.animate.bind(this);
    this.animate();
    this;
  }

  build(settings) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = settings.cameraPosition;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .querySelector(".fancy-loader__wrapper")
      .appendChild(this.renderer.domElement);

    this.molecule = new Molecule(settings.molecule);
    this.scene.add(this.molecule);
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  animate() {
    requestAnimationFrame(this.animate);

    const time = performance.now() * 0.001;

    this.molecule.animate(time);

    this.renderer.render(this.scene, this.camera);
  }
  getSettings(frameElement) {
    const setting = {
      cameraPosition: 3,
      molecule: {
        detail: 40,
        particleSizeMin: 0.01,
        particleSizeMax: 0.08,
        color: this.getFrameElementAttr(frameElement, "data-loader-color"),
        dotColor: this.getFrameElementAttr(
          frameElement,
          "data-loader-dot-color"
        ),
      },
    };
    switch (frameElement.getAttribute("data-loader-position")) {
      case "inner-loader":
        setting.cameraPosition = 7;
        setting.molecule.particleSizeMin = 0.04;
        setting.molecule.detail = 10;
        ratio = 0.5;
        break;
      case "about-loader":
        setting.cameraPosition = !matches ? 3.2 : 5;
        setting.molecule.particleSizeMin = 0.04;
        setting.molecule.detail = 20;
        ratio = 0.3;
        break;

        break;
      default:
        console.log("using default settings");
        break;
    }
    return setting;
  }
  getFrameElementAttr(frameElement, attr) {
    return frameElement.getAttribute(attr) ?? "white";
  }
}

class Molecule extends THREE.Object3D {
  material;
  geometry;
  mesh;
  radius = 1.5;
  detail = 40;
  particleSizeMin = 0.01;
  particleSizeMax = 0.08;

  constructor(settings) {
    super();
    this.color = settings.color;
    this.detail = settings.detail;
    this.particleSizeMin = settings.particleSizeMin;
    this.particleSizeMax = settings.particleSizeMax;
    this.dotColor = settings.dotColor;
    this.build();
  }

  build() {
    this.dot();

    this.geometry = new THREE.IcosahedronBufferGeometry(1, this.detail);

    this.material = new THREE.PointsMaterial({
      map: this.dot(),
      blending: THREE.AdditiveBlending,
      color: this.color,
      depthTest: false,
    });

    this.setupShader(this.material);

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.add(this.mesh);
  }

  dot(size = 32, color = this.dotColor) {
    const sizeH = size * ratio;

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d");

    const circle = new Path2D();
    circle.arc(sizeH, sizeH, sizeH, 0, 2 * Math.PI);

    ctx.fillStyle = color;
    ctx.fill(circle);

    // debug canvas
    // canvas.style.position = "fixed"
    // canvas.style.top = 0
    // canvas.style.left = 0
    // document.body.appendChild(canvas)

    return new THREE.CanvasTexture(canvas);
  }

  setupShader(material) {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.radius = { value: this.radius };
      shader.uniforms.particleSizeMin = { value: this.particleSizeMin };
      shader.uniforms.particleSizeMax = { value: this.particleSizeMax };
      shader.vertexShader =
        "uniform float particleSizeMax;\n" + shader.vertexShader;
      shader.vertexShader =
        "uniform float particleSizeMin;\n" + shader.vertexShader;
      shader.vertexShader = "uniform float radius;\n" + shader.vertexShader;
      shader.vertexShader = "uniform float time;\n" + shader.vertexShader;
      shader.vertexShader =
        document.getElementById("webgl-noise").textContent +
        "\n" +
        shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
          vec3 p = position;
          float n = snoise( vec3( p.x*.6 + time*0.2, p.y*0.4 + time*0.3, p.z*.2 + time*0.2) );
          p += n *0.4;

          // constrain to sphere radius
          float l = radius / length(p);
          p *= l;
          float s = mix(particleSizeMin, particleSizeMax, n);
          vec3 transformed = vec3( p.x, p.y, p.z );
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        "gl_PointSize = s;"
      );

      material.userData.shader = shader;
    };
  }

  animate(time) {
    this.mesh.rotation.set(0, time * 0.2, 0);
    if (this.material.userData.shader)
      this.material.userData.shader.uniforms.time.value = time;
  }
}

new World({ frameElement: window.frameElement });
