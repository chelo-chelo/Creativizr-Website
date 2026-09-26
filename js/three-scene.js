/**
 * CREATIVIZR - 3D Interactive Rotating Software Showcase
 * Features Photoshop, Illustrator, InDesign, CorelDRAW, Figma, and Flutter logos
 * Identical width and height, interactive 3D carousel with drag, hover, and selection
 */

class Software3DShowcase {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.carouselGroup = null;
    this.cards = [];
    this.clock = null;
    this.raycaster = null;
    this.mouse = { x: -1000, y: -1000 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = 0.005;
    this.isPaused = false;
    this.hoveredCard = null;
    this.targetRotationY = null;

    this.softwareList = [
      {
        id: 'photoshop',
        name: 'Adobe Photoshop',
        short: 'Ps',
        color: '#31a8ff',
        bg: '#001e36',
        desc: 'Advanced photo editing, manipulation & high-res mockups',
        svg: './assets/logos/software/photoshop.svg'
      },
      {
        id: 'illustrator',
        name: 'Adobe Illustrator',
        short: 'Ai',
        color: '#ff9a00',
        bg: '#2e1200',
        desc: 'Infinite precision vector logos, branding & custom typography',
        svg: './assets/logos/software/illustrator.svg'
      },
      {
        id: 'indesign',
        name: 'Adobe InDesign',
        short: 'Id',
        color: '#ff3366',
        bg: '#3d021c',
        desc: 'Editorial books, tute covers, catalogs & multi-page layouts',
        svg: './assets/logos/software/indesign.svg'
      },
      {
        id: 'coreldraw',
        name: 'CorelDRAW',
        short: 'Cd',
        color: '#00e676',
        bg: '#082613',
        desc: 'Commercial print engineering, banners, signs & vehicle wraps',
        svg: './assets/logos/software/coreldraw.svg'
      },
      {
        id: 'figma',
        name: 'Figma',
        short: 'Fg',
        color: '#a259ff',
        bg: '#181224',
        desc: 'Interactive UI/UX design, mobile apps & design systems',
        svg: './assets/logos/software/figma.svg'
      },
      {
        id: 'flutter',
        name: 'Flutter',
        short: 'Fl',
        color: '#54c5f8',
        bg: '#04172a',
        desc: 'Cross-platform mobile & web application visual architecture',
        svg: './assets/logos/software/flutter.svg'
      }
    ];

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      this.initFallback();
      return;
    }

    try {
      this.clock = new THREE.Clock();
      this.raycaster = new THREE.Raycaster();

      const width = this.container.clientWidth || 500;
      const height = this.container.clientHeight || 460;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
      this.camera.position.set(0, 0.4, 8.8);

      // 3. WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.container.appendChild(this.renderer.domElement);

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      this.scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
      mainLight.position.set(5, 8, 8);
      this.scene.add(mainLight);

      const backLight = new THREE.DirectionalLight(0x6366f1, 1.8);
      backLight.position.set(-6, -4, -6);
      this.scene.add(backLight);

      this.accentPointLight = new THREE.PointLight(0x38bdf8, 2.5, 20);
      this.accentPointLight.position.set(0, 1, 4);
      this.scene.add(this.accentPointLight);

      // 5. Software Carousel Group
      this.carouselGroup = new THREE.Group();
      this.carouselGroup.position.y = 0.1;
      this.scene.add(this.carouselGroup);

      // Subtle orbital ring
      const ringGeo = new THREE.RingGeometry(3.45, 3.48, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4f46e5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -1.25;
      this.carouselGroup.add(ringMesh);

      // 6. Create the 6 Software Logo Cards (Equal Width and Height)
      this.buildSoftwareCards();

      // 7. Ambient Particle Field
      this.buildParticles();

      // 8. Event Listeners
      this.bindEvents();

      // 9. Start Render Loop
      this.animate();

    } catch (e) {
      console.warn('Three.js initialization error, falling back to CSS 3D:', e);
      this.initFallback();
    }
  }

  buildSoftwareCards() {
    const count = this.softwareList.length;
    const radius = 3.5;
    // Exactly equal dimensions for all cards
    const cardWidth = 2.1;
    const cardHeight = 2.1;
    const cardDepth = 0.12;

    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);

    this.softwareList.forEach((tool, index) => {
      const angle = (index / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Create high-res canvas texture for crisp logos
      const texture = this.createSoftwareTexture(tool);

      // Materials for front, back and sides
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.15,
        emissive: new THREE.Color(tool.color),
        emissiveIntensity: 0.08
      });

      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x131726),
        roughness: 0.4,
        metalness: 0.7
      });

      // BoxGeometry faces: right, left, top, bottom, front (index 4), back (index 5)
      const materials = [
        bodyMaterial,
        bodyMaterial,
        bodyMaterial,
        bodyMaterial,
        frontMaterial,
        bodyMaterial
      ];

      const mesh = new THREE.Mesh(cardGeometry, materials);
      mesh.position.set(x, 0, z);
      // Face radially outwards
      mesh.rotation.y = angle;

      // Store metadata
      mesh.userData = {
        software: tool,
        index: index,
        baseAngle: angle,
        baseScale: 1.0,
        currentScale: 1.0
      };

      // Add a sleek glowing rim plate
      const rimGeo = new THREE.BoxGeometry(cardWidth + 0.08, cardHeight + 0.08, 0.04);
      const rimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tool.color),
        roughness: 0.2,
        metalness: 0.8,
        emissive: new THREE.Color(tool.color),
        emissiveIntensity: 0.4
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.z = -0.05;
      mesh.add(rimMesh);

      this.cards.push(mesh);
      this.carouselGroup.add(mesh);
    });
  }

  createSoftwareTexture(tool) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Background rounded box
    ctx.fillStyle = tool.bg;
    this.roundRect(ctx, 16, 16, 480, 480, 80);
    ctx.fill();

    // Glowing border
    ctx.lineWidth = 14;
    ctx.strokeStyle = tool.color;
    ctx.stroke();

    // Inner subtle gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    ctx.fillStyle = grad;
    this.roundRect(ctx, 24, 24, 464, 464, 72);
    ctx.fill();

    // Pre-render logo icon on canvas
    this.drawSoftwareGlyph(ctx, tool);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Also attempt loading vector SVG for ultra-sharp sharpness
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      texture.needsUpdate = true;
    };
    img.src = tool.svg;

    return texture;
  }

  drawSoftwareGlyph(ctx, tool) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (tool.id === 'photoshop') {
      ctx.font = '900 230px "Plus Jakarta Sans", "Inter", sans-serif';
      ctx.fillStyle = '#31a8ff';
      ctx.shadowColor = 'rgba(49, 168, 255, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillText('Ps', 256, 260);
    } else if (tool.id === 'illustrator') {
      ctx.font = '900 230px "Plus Jakarta Sans", "Inter", sans-serif';
      ctx.fillStyle = '#ff9a00';
      ctx.shadowColor = 'rgba(255, 154, 0, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillText('Ai', 256, 260);
    } else if (tool.id === 'indesign') {
      ctx.font = '900 230px "Plus Jakarta Sans", "Inter", sans-serif';
      ctx.fillStyle = '#ff3366';
      ctx.shadowColor = 'rgba(255, 51, 102, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillText('Id', 256, 260);
    } else if (tool.id === 'coreldraw') {
      // Hot air balloon icon
      ctx.fillStyle = '#00e676';
      ctx.beginPath();
      ctx.arc(256, 200, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 70px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Corel', 256, 340);
      ctx.font = '800 48px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#00e676';
      ctx.fillText('DRAW', 256, 400);
    } else if (tool.id === 'figma') {
      // Figma 5 colored blocks
      const colors = ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE', '#0ACF83'];
      ctx.fillStyle = colors[0];
      ctx.beginPath(); ctx.arc(206, 170, 48, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors[1];
      ctx.beginPath(); ctx.arc(306, 170, 48, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors[2];
      ctx.beginPath(); ctx.arc(206, 260, 48, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors[3];
      ctx.beginPath(); ctx.arc(306, 260, 48, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors[4];
      ctx.beginPath(); ctx.arc(206, 350, 48, 0, Math.PI * 2); ctx.fill();
    } else if (tool.id === 'flutter') {
      ctx.fillStyle = '#54c5f8';
      ctx.font = '900 120px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Flutter', 256, 340);
      // Chevrons
      ctx.fillStyle = '#02569B';
      ctx.beginPath();
      ctx.moveTo(256, 120); ctx.lineTo(330, 195); ctx.lineTo(256, 270); ctx.lineTo(190, 270); ctx.lineTo(235, 225); ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  buildParticles() {
    const particleCount = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.08,
      transparent: true,
      opacity: 0.55
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
  }

  bindEvents() {
    const el = this.renderer.domElement;

    // Mouse / Touch Drag to Rotate Carousel
    const onPointerDown = (clientX, clientY) => {
      this.isDragging = true;
      this.targetRotationY = null; // cancel tween if manual drag starts
      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (!this.isDragging) return;

      const deltaX = clientX - this.previousMousePosition.x;
      const deltaY = clientY - this.previousMousePosition.y;

      // Rotate around Y axis
      this.carouselGroup.rotation.y += deltaX * 0.007;
      // Slight vertical tilt within safe bounds
      const nextRotX = this.carouselGroup.rotation.x + deltaY * 0.003;
      this.carouselGroup.rotation.x = Math.max(-0.25, Math.min(0.25, nextRotX));

      this.rotationVelocity = deltaX * 0.002;
      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    el.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // Touch Support
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    // Click on Card in 3D
    el.addEventListener('click', () => {
      if (this.hoveredCard) {
        this.focusOnSoftware(this.hoveredCard.userData.index);
      }
    });

    // Window Resize
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Interactive software selector pill buttons
    this.bindSoftwareButtons();
  }

  bindSoftwareButtons() {
    const buttons = document.querySelectorAll('.software-pill-btn');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.focusOnSoftware(index);
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  focusOnSoftware(index) {
    const count = this.softwareList.length;
    // Calculate angle needed to bring this card to front (facing z > 0)
    // Card base angle is (index / count) * 2PI
    const cardBaseAngle = (index / count) * Math.PI * 2;
    // When carouselGroup.rotation.y = -cardBaseAngle, card is at front (z = +radius)
    let target = -cardBaseAngle;

    // Find closest rotation equivalent to avoid long spins
    const current = this.carouselGroup.rotation.y;
    const twoPi = Math.PI * 2;
    target = current + ((((target - current) % twoPi) + (twoPi * 1.5)) % twoPi) - Math.PI;

    this.targetRotationY = target;

    // Update active pill button
    const buttons = document.querySelectorAll('.software-pill-btn');
    buttons.forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });

    // Update info badge
    this.updateActiveBadge(this.softwareList[index]);
  }

  updateActiveBadge(tool) {
    const titleEl = document.getElementById('software-active-title');
    const descEl = document.getElementById('software-active-desc');
    if (titleEl) {
      titleEl.textContent = tool.name;
      titleEl.style.color = tool.color;
    }
    if (descEl) {
      descEl.textContent = tool.desc;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock ? this.clock.getDelta() : 0.016;

    // Handle rotation
    if (this.targetRotationY !== null) {
      // Smooth lerp to chosen card
      this.carouselGroup.rotation.y += (this.targetRotationY - this.carouselGroup.rotation.y) * 0.08;
      if (Math.abs(this.targetRotationY - this.carouselGroup.rotation.y) < 0.002) {
        this.carouselGroup.rotation.y = this.targetRotationY;
        this.targetRotationY = null;
      }
    } else if (!this.isDragging) {
      // Continuous auto spin with velocity damping
      this.rotationVelocity += (0.004 - this.rotationVelocity) * 0.03;
      this.carouselGroup.rotation.y += this.rotationVelocity;
      // Gently return vertical tilt to neutral
      this.carouselGroup.rotation.x += (0 - this.carouselGroup.rotation.x) * 0.05;
    }

    // Automatically detect which card is front-most facing the camera
    if (!this.hoveredCard && this.cards.length > 0) {
      let frontCard = null;
      let maxZ = -Infinity;
      const tempVec = new THREE.Vector3();

      this.cards.forEach(card => {
        card.getWorldPosition(tempVec);
        if (tempVec.z > maxZ) {
          maxZ = tempVec.z;
          frontCard = card;
        }
      });

      if (frontCard && frontCard.userData && frontCard.userData.software) {
        if (!this._lastFrontIndex || this._lastFrontIndex !== frontCard.userData.index) {
          this._lastFrontIndex = frontCard.userData.index;
          this.updateActiveBadge(frontCard.userData.software);

          const buttons = document.querySelectorAll('.software-pill-btn');
          buttons.forEach((b, i) => {
            b.classList.toggle('active', i === frontCard.userData.index);
          });

          if (this.accentPointLight) {
            this.accentPointLight.color.set(frontCard.userData.software.color);
          }
        }
      }
    }

    // Raycast hover detection
    if (this.raycaster && this.camera && this.cards.length > 0) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.cards);

      if (intersects.length > 0) {
        const topIntersect = intersects[0].object;
        if (this.hoveredCard !== topIntersect) {
          this.hoveredCard = topIntersect;
          this.renderer.domElement.style.cursor = 'pointer';
          this.updateActiveBadge(topIntersect.userData.software);

          // Accent light focus
          if (this.accentPointLight) {
            this.accentPointLight.color.set(topIntersect.userData.software.color);
            this.accentPointLight.intensity = 3.5;
          }
        }
      } else {
        if (this.hoveredCard) {
          this.hoveredCard = null;
          this.renderer.domElement.style.cursor = 'default';
        }
      }
    }

    // Smooth hover scaling for cards
    this.cards.forEach((card) => {
      const isThisHovered = card === this.hoveredCard;
      const targetScale = isThisHovered ? 1.15 : 1.0;
      card.userData.currentScale += (targetScale - card.userData.currentScale) * 0.15;
      const s = card.userData.currentScale;
      card.scale.set(s, s, s);
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initFallback() {
    // Pure CSS 3D fallback in case WebGL is disabled
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="css3d-carousel">
        <div class="css3d-ring">
          ${this.softwareList.map((tool, i) => `
            <div class="css3d-card" style="--i: ${i}; --color: ${tool.color};">
              <img src="${tool.svg}" alt="${tool.name}" width="90" height="90">
              <span>${tool.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Expose globally
window.Software3DShowcase = Software3DShowcase;
