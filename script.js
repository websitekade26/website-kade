window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').classList.add('done');
    }, 600);
});

setTimeout(function () {
    document.getElementById('loader').classList.add('done');
}, 3000);

var nav = document.getElementById('nav'),
    prog = document.getElementById('progress');

addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', scrollY > 30);
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (scrollY / h * 100) + '%';
}, { passive: true });

var burger = document.getElementById('burger'),
    mmenu = document.getElementById('mmenu');

burger.onclick = function () {
    var open = mmenu.classList.toggle('open');
    burger.textContent = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
};

mmenu.querySelectorAll('a').forEach(function (a) {
    a.onclick = function () {
        mmenu.classList.remove('open');
        burger.textContent = '☰';
        document.body.style.overflow = '';
    };
});

var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
});

var steps = document.querySelectorAll('.step');
var sio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            steps.forEach(function (s) {
                s.classList.remove('lit');
            });
            e.target.classList.add('lit');
        }
    });
}, { threshold: .5 });

steps.forEach(function (s) {
    sio.observe(s);
});

var mq = document.getElementById('marquee');
mq.innerHTML += mq.innerHTML;

document.getElementById('qform').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = document.getElementById('qname').value.trim() || 'Hi';
    var t = document.getElementById('qtype').value;
    var m = document.getElementById('qmsg').value.trim();
    var txt = encodeURIComponent("Hi Website \u0D9A\u0DA9\u0D9A! I'm " + n + ". I need: " + t + ". " + m);
    open('https://wa.me/94728867953?text=' + txt, '_blank');
});

/* premium colour-cycle hero */
(function () {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lines = document.querySelectorAll('#heroTitle .line > span');
    var palette = ['#FFFFFF', '#F0D9A8', '#D9A85E', '#E9C98C', '#C99B4A', '#F7EFDA'];
    var letters = [];
    lines.forEach(function (line) {
        var text = line.textContent;
        line.textContent = '';
        text.split('').forEach(function (ch) {
            if (ch === ' ') {
                line.appendChild(document.createTextNode('\u00A0'));
                return;
            }
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = ch;
            line.appendChild(s);
            letters.push(s);
        });
    });
    var off = 0;
    function paint() {
        letters.forEach(function (s, i) {
            s.style.color = palette[(i + off) % palette.length];
        });
    }
    paint();
    if (!reduce) {
        setInterval(function () {
            off = (off + 1) % palette.length;
            paint();
        }, 1800);
    }
})();

/* typewriter */
(function () {
    var words = ['custom websites.', 'WordPress stores.', 'website revamps.', 'faster load times.', 'sites that sell.'];
    var el = document.getElementById('typer'), wi = 0, ci = 0, del = false;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
        el.textContent = words[0];
        return;
    }
    (function tick() {
        var w = words[wi];
        el.textContent = w.slice(0, ci);
        var speed = del ? 35 : 75;
        if (!del && ci === w.length) {
            speed = 1600;
            del = true;
        } else if (del && ci === 0) {
            del = false;
            wi = (wi + 1) % words.length;
            speed = 400;
        } else {
            ci += del ? -1 : 1;
        }
        setTimeout(tick, speed);
    })();
})();

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.process-card').forEach(card => {
    observer.observe(card);
});

/* count-up hero numbers */
(function () {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function run(el) {
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
        var suffix = el.getAttribute('data-suffix') || '';
        function fmt(n) {
            var s = String(n);
            while (s.length < pad) s = '0' + s;
            return s + suffix;
        }
        if (reduce) {
            el.textContent = fmt(target);
            return;
        }
        var t0 = null, dur = 1400;
        function frame(t) {
            if (!t0) t0 = t;
            var p = Math.min((t - t0) / dur, 1),
                e = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(Math.round(target * e));
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
            if (e.isIntersecting) {
                run(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: .4 });
    els.forEach(function (el) {
        io.observe(el);
    });
})();
