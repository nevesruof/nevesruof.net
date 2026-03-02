document.addEventListener('DOMContentLoaded', () => {

    // Revelar elementos al hacer scroll — Polar.top style (fade-up + stagger)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    // Track stagger groups by parent container
    const staggerCounters = new Map();

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const count = staggerCounters.get(parent) || 0;
                // Each sibling card gets +80ms stagger
                entry.target.style.transitionDelay = (count * 80) + 'ms';
                entry.target.classList.add('visible');
                staggerCounters.set(parent, count + 1);
                observer.unobserve(entry.target);
                // Reset counter after group settles
                setTimeout(() => staggerCounters.set(parent, 0), 600);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Lógica dinámica interactiva de la Línea de Transcurso
    const journeySection = document.querySelector('.journey-section');
    const glowLine = document.getElementById('timelineGlow');
    const timelineContainer = document.querySelector('.timeline-container');
    const nodes = document.querySelectorAll('.timeline-node');

    if (journeySection && glowLine && timelineContainer) {
        window.addEventListener('scroll', () => {

            const containerRect = timelineContainer.getBoundingClientRect();

            // Mitad de la pantalla
            const triggerPoint = window.innerHeight * 0.6;

            // Distancia del contenedor respecto al punto de activación
            const distance = triggerPoint - containerRect.top;

            let progress = 0;

            if (distance > 0) {
                progress = (distance / containerRect.height) * 100;
                progress = Math.max(0, Math.min(100, progress));
            }

            glowLine.style.height = `${progress}%`;

            // Activar nodos cuando el progreso supera el porcentaje del nodo
            nodes.forEach(node => {
                const triggerPercent = parseFloat(node.getAttribute('data-percentage'));
                if (progress >= triggerPercent) {
                    node.classList.add('active');
                } else {
                    node.classList.remove('active');
                }
            });
        });

        // Disparo inicial por si el usuario ya está a mitad de scroll al recargar
        window.dispatchEvent(new Event('scroll'));
    }

    // ── Console — polar.top replica ───────────────────────────
    const pcBody = document.getElementById('consoleBody');
    const consoleInput = document.getElementById('consoleInput'); // Keep consoleInput

    if (pcBody) { // Changed from consoleBody && consoleInput to just pcBody for the log generation part
        pcBody.scrollTop = pcBody.scrollHeight;

        // Authentic polar.top log pool — single-line, no wrapping
        const logs = [
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">iowa</span><span class="lx"> ScreenShare detected — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Echo check </span><span class="le">Bypassed</span><span class="lx"> successfully</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">Mo0nSw0rth</span><span class="lx"> Screenshared — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">HyperionDev</span><span class="lx"> AnyDesk scan </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Prefetch cleared — </span><span class="le">stealth active</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">lennoxlotl</span><span class="lx"> ScreenCheck </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">Briiqn</span><span class="lx"> Screenshared </span><span class="li">|</span><span class="lv"> undetected</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Memory hook </span><span class="le">Bypassed</span><span class="lx"> — no traces</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">xQcOW</span><span class="lx"> Manual audit — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">GhostUser99</span><span class="lx"> Screenshared </span><span class="li">|</span><span class="lv"> clean</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">USN Journal wiped — </span><span class="le">stealth active</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">WizzardPlayer_</span><span class="lx"> ScreenShare </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">rerd</span><span class="lx"> ProcessMonitor scan — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">iMarcoMC</span><span class="lx"> AnyDesk — </span><span class="le">Bypassed</span><span class="lx"> undetected</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Strings cleaned — </span><span class="le">0 traces</span><span class="lx"> found</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">Shawzyy</span><span class="lx"> Screenshared — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Ring0 protection </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">iTz_Lucky</span><span class="lx"> Echo audit — </span><span class="le">Bypassed</span>',
            '<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">GhostUser</span><span class="lx"> Screenshared </span><span class="li">|</span><span class="lv"> invisible</span>',
            '<span class="lp">LLC</span><span class="li">|</span><span class="lx">Panic key executed — </span><span class="le">self-destruct done</span>',
        ];

        let idx = 0;
        setInterval(() => {
            // Smart auto-scroll: only follow if user is near the bottom
            const nearBottom = pcBody.scrollHeight - pcBody.scrollTop - pcBody.clientHeight < 40;

            const row = document.createElement('div');
            row.className = 'pc-line';
            row.innerHTML = logs[idx % logs.length];
            pcBody.appendChild(row);
            idx++;

            // Keep only the last 60 logs (history buffer)
            while (pcBody.children.length > 60) pcBody.removeChild(pcBody.firstChild);

            // Only auto-scroll if already at the bottom
            if (nearBottom) pcBody.scrollTop = pcBody.scrollHeight;
        }, 1500);
    }

    // ── Interactive command input ──────────────────────────────
    const cmdInput = document.getElementById('pcCommandInput');
    const autocomplete = document.getElementById('pcAutocomplete');
    const suggestion = document.getElementById('pcSuggestion');
    const suggestionMillaray = document.getElementById('pcSuggestionMillaray');
    const pcWrap = document.querySelector('.pc-wrap');

    if (cmdInput && pcBody) {

        // Commands list
        const commands = [
            { id: 'pcSuggestion', cmd: '/ac', el: suggestion },
            { id: 'pcSuggestionMillaray', cmd: '/Millaray', el: suggestionMillaray },
        ];

        // Show / hide each suggestion individually as user types
        cmdInput.addEventListener('input', () => {
            const val = cmdInput.value;
            let anyVisible = false;
            commands.forEach(c => {
                const matches = val === '/' || (val.startsWith('/') && c.cmd.toLowerCase().startsWith(val.toLowerCase()));
                if (c.el) {
                    c.el.style.display = matches ? '' : 'none';
                    if (matches) anyVisible = true;
                }
            });
            if (anyVisible) {
                autocomplete.classList.add('visible');
            } else {
                autocomplete.classList.remove('visible');
            }
        });

        // Tab key — fill suggestion
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && autocomplete.classList.contains('visible')) {
                e.preventDefault();
                // Fill with the first visible suggestion
                const firstVisible = commands.find(c => c.el && c.el.style.display !== 'none');
                if (firstVisible) cmdInput.value = firstVisible.cmd;
                autocomplete.classList.remove('visible');
            }

            if (e.key === 'Escape') {
                autocomplete.classList.remove('visible');
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                runCommand(cmdInput.value.trim());
                cmdInput.value = '';
                autocomplete.classList.remove('visible');
            }
        });

        // Click on /ac suggestion
        suggestion.addEventListener('click', () => {
            cmdInput.value = '/ac';
            autocomplete.classList.remove('visible');
            cmdInput.focus();
            runCommand('/ac');
            cmdInput.value = '';
        });

        // Click on /Millaray suggestion
        if (suggestionMillaray) {
            suggestionMillaray.addEventListener('click', () => {
                cmdInput.value = '/Millaray';
                autocomplete.classList.remove('visible');
                cmdInput.focus();
                runCommand('/Millaray');
                cmdInput.value = '';
            });
        }

        // Click anywhere in the console → focus input
        if (pcWrap) pcWrap.addEventListener('click', () => cmdInput.focus());

        // Command executor
        function runCommand(cmd) {
            if (!cmd) return;

            // Echo what user typed
            const echo = document.createElement('div');
            echo.className = 'pc-line';
            echo.innerHTML = `<span class="lp">LLC</span><span class="la">&gt;</span><span class="lu">You</span><span class="lx"> ${cmd}</span>`;
            pcBody.appendChild(echo);

            // Command responses
            if (cmd === '/ac') {
                const res = document.createElement('div');
                res.className = 'pc-line';
                res.innerHTML = `<span class="lp">LLC</span><span class="li">|</span><span class="lx">Best AC; </span><a class="log-link" href="https://discord.gg/vDVjJN79D5" target="_blank" rel="noopener">https://discord.gg/vDVjJN79D5</a><span class="lx"> ( $ Rize )</span>`;
                pcBody.appendChild(res);

            } else if (cmd.toLowerCase() === '/millaray') {
                const res = document.createElement('div');
                res.className = 'pc-line';
                res.innerHTML = `<span class="lp">LLC</span><span class="li">|</span><span class="lx"> Eres un </span><span class="le">ESTUPIDO</span>`;
                pcBody.appendChild(res);
                showMillarayToast();

            } else {
                const res = document.createElement('div');
                res.className = 'pc-line';
                res.innerHTML = `<span class="lp">LLC</span><span class="li">|</span><span class="lx">Unknown command. Try </span><span class="le">/ for suggestions.</span>`;
                pcBody.appendChild(res);
            }

            pcBody.scrollTop = pcBody.scrollHeight;
        }

        // ── /Millaray toast notification ──────────────────────
        function showMillarayToast() {
            const existing = document.getElementById('millaray-toast');
            if (existing) existing.remove();

            const toast = document.createElement('div');
            toast.id = 'millaray-toast';
            toast.innerHTML = `
                <div class="millaray-toast-icon">💖</div>
                <div class="millaray-toast-body">
                    <div class="millaray-toast-title">Para Millaray 🌸</div>
                    <div class="millaray-toast-msg">Te amo Millaray, perdóname por ser una mierda contigo, te juro que no queria hacerte daño.</div>
                </div>
                <button class="millaray-toast-close" onclick="this.parentElement.remove()">✕</button>
            `;
            document.body.appendChild(toast);

            // Auto-dismiss after 6 seconds
            setTimeout(() => {
                toast.classList.add('millaray-toast-hide');
                setTimeout(() => toast.remove(), 500);
            }, 6000);
        }
    }

});

/* ══════════════════════════════════════════════════════════
   MILLARAY OVERLAY — Curtain + Flower Particle System
   ══════════════════════════════════════════════════════════ */
(function () {
    const btn = document.getElementById('navMillarayBtn');
    const overlay = document.getElementById('millarayOverlay');
    const closeBtn = document.getElementById('millarayClose');
    const canvas = document.getElementById('millarayFlowers');
    if (!btn || !overlay || !canvas) return;

    const ctx = canvas.getContext('2d');
    let raf, petals = [], running = false;

    // ── Resize canvas to match viewport ──────────────────
    function resizeCanvas() {
        canvas.width = overlay.clientWidth;
        canvas.height = overlay.clientHeight;
    }

    // ── Petal factory ─────────────────────────────────────
    const PETAL_COLORS = [
        'rgba(249,168,212,',  // soft pink
        'rgba(253,200,224,',  // pale pink
        'rgba(255,255,255,',  // white
        'rgba(187,247,208,',  // light mint
        'rgba(216,252,199,',  // soft green
    ];

    function createPetal() {
        const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
        return {
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 8 + 5,          // 5-13px
            opacity: Math.random() * 0.55 + 0.25,    // 0.25-0.8
            speed: Math.random() * 1.2 + 0.5,      // gentle fall
            drift: (Math.random() - 0.5) * 0.8,    // gentle sway
            rot: Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.04,
            color,
        };
    }

    // ── Draw one petal as a simple 4-petal flower ─────────
    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color + '1)';

        // Four petals using ellipses
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.ellipse(0, -p.size * 0.6, p.size * 0.35, p.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        // Tiny center dot
        ctx.fillStyle = 'rgba(255,240,200,0.8)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // ── Animation loop ────────────────────────────────────
    function animate() {
        if (!running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Maintain ~28 petals on screen
        while (petals.length < 28) petals.push(createPetal());

        petals.forEach((p, i) => {
            p.y += p.speed;
            p.x += p.drift + Math.sin(p.y * 0.02) * 0.4;
            p.rot += p.rotV;
            drawPetal(p);
            // Remove when off-screen
            if (p.y > canvas.height + 20) petals.splice(i, 1);
        });

        raf = requestAnimationFrame(animate);
    }

    // ── Open overlay ──────────────────────────────────────
    function openMillaray() {
        resizeCanvas();
        overlay.classList.add('ml-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        running = true;
        petals = [];
        animate();
    }

    // ── Close overlay (curtain rises = slides back over, then hides) ───
    function closeMillaray() {
        if (overlay.classList.contains('ml-closing')) return; // guard double-click

        // 1. Fade content out & slide curtain back over it
        overlay.classList.add('ml-closing');

        // 2. After curtain fully covers (0.72s), hide everything cleanly
        setTimeout(() => {
            overlay.classList.remove('ml-open');
            overlay.classList.remove('ml-closing');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            running = false;
            cancelAnimationFrame(raf);
        }, 740);
    }

    btn.addEventListener('click', openMillaray);
    closeBtn.addEventListener('click', closeMillaray);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('ml-open')) closeMillaray();
    });

    // Resize canvas when window changes
    window.addEventListener('resize', () => { if (running) resizeCanvas(); });
})();


/* ══════════════════════════════════════════════════════════
   PARTICLE RAIN SYSTEM (Background Matrix effect)
   ══════════════════════════════════════════════════════════ */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 14; // Dramatically fewer particles for subtlety

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize placement ONLY on the sides (left 0-20% or right 80-100%)
        let randomSide = Math.random() < 0.5; // 50% chance for either side
        if (randomSide) {
            particle.style.left = (Math.random() * 20) + 'vw'; // Left side 
        } else {
            particle.style.left = (Math.random() * 20 + 80) + 'vw'; // Right side
        }

        // Randomize height (fine lines) between 30px and 120px
        particle.style.height = (Math.random() * 90 + 30) + 'px';

        // Randomize falling speed between 3s and 8s
        particle.style.animationDuration = (Math.random() * 5 + 3) + 's';

        // Randomize start delay so they don't all fall at once
        particle.style.animationDelay = (Math.random() * 5) + 's';

        // Randomize opacity a bit for depth (more transparent)
        particle.style.opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4 capacity

        container.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);
