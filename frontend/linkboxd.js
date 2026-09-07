(function () {

    /* =========================================================
       DATA: movies with director + cast. People are derived.
       ========================================================= */
    const RAW_MOVIES = [
        { t: "Inception", y: 2010, d: "Christopher Nolan", c: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Tom Hardy", "Marion Cotillard", "Elliot Page"] },
        { t: "The Dark Knight", y: 2008, d: "Christopher Nolan", c: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"] },
        { t: "Interstellar", y: 2014, d: "Christopher Nolan", c: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"] },
        { t: "Oppenheimer", y: 2023, d: "Christopher Nolan", c: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."] },
        { t: "Dunkirk", y: 2017, d: "Christopher Nolan", c: ["Tom Hardy", "Cillian Murphy", "Mark Rylance", "Kenneth Branagh"] },
        { t: "Forrest Gump", y: 1994, d: "Robert Zemeckis", c: ["Tom Hanks", "Robin Wright", "Gary Sinise"] },
        { t: "Cast Away", y: 2000, d: "Robert Zemeckis", c: ["Tom Hanks", "Helen Hunt"] },
        { t: "Catch Me If You Can", y: 2002, d: "Steven Spielberg", c: ["Leonardo DiCaprio", "Tom Hanks", "Christopher Walken"] },
        { t: "Saving Private Ryan", y: 1998, d: "Steven Spielberg", c: ["Tom Hanks", "Matt Damon", "Edward Burns"] },
        { t: "Jurassic Park", y: 1993, d: "Steven Spielberg", c: ["Sam Neill", "Laura Dern", "Jeff Goldblum"] },
        { t: "Bridge of Spies", y: 2015, d: "Steven Spielberg", c: ["Tom Hanks", "Mark Rylance"] },
        { t: "Lincoln", y: 2012, d: "Steven Spielberg", c: ["Daniel Day-Lewis", "Sally Field", "Tommy Lee Jones"] },
        { t: "Raiders of the Lost Ark", y: 1981, d: "Steven Spielberg", c: ["Harrison Ford", "Karen Allen"] },
        { t: "The Departed", y: 2006, d: "Martin Scorsese", c: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson", "Mark Wahlberg"] },
        { t: "The Wolf of Wall Street", y: 2013, d: "Martin Scorsese", c: ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"] },
        { t: "Taxi Driver", y: 1976, d: "Martin Scorsese", c: ["Robert De Niro", "Jodie Foster"] },
        { t: "Titanic", y: 1997, d: "James Cameron", c: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"] },
        { t: "Avatar", y: 2009, d: "James Cameron", c: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"] },
        { t: "The Revenant", y: 2015, d: "Alejandro G. Inarritu", c: ["Leonardo DiCaprio", "Tom Hardy"] },
        { t: "Mad Max: Fury Road", y: 2015, d: "George Miller", c: ["Tom Hardy", "Charlize Theron"] },
        { t: "Good Will Hunting", y: 1997, d: "Gus Van Sant", c: ["Matt Damon", "Robin Williams", "Ben Affleck"] },
        { t: "Ocean's Eleven", y: 2001, d: "Steven Soderbergh", c: ["George Clooney", "Brad Pitt", "Matt Damon", "Julia Roberts"] },
        { t: "Fight Club", y: 1999, d: "David Fincher", c: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"] },
        { t: "Se7en", y: 1995, d: "David Fincher", c: ["Brad Pitt", "Morgan Freeman", "Gwyneth Paltrow"] },
        { t: "The Shawshank Redemption", y: 1994, d: "Frank Darabont", c: ["Tim Robbins", "Morgan Freeman"] },
        { t: "Bruce Almighty", y: 2003, d: "Tom Shadyac", c: ["Jim Carrey", "Morgan Freeman", "Jennifer Aniston"] },
        { t: "The Devil Wears Prada", y: 2006, d: "David Frankel", c: ["Meryl Streep", "Anne Hathaway", "Emily Blunt"] },
        { t: "Mamma Mia!", y: 2008, d: "Phyllida Lloyd", c: ["Meryl Streep", "Amanda Seyfried", "Colin Firth"] },
        { t: "Doubt", y: 2008, d: "John Patrick Shanley", c: ["Meryl Streep", "Philip Seymour Hoffman", "Amy Adams"] },
        { t: "The Master", y: 2012, d: "Paul Thomas Anderson", c: ["Joaquin Phoenix", "Philip Seymour Hoffman", "Amy Adams"] },
        { t: "There Will Be Blood", y: 2007, d: "Paul Thomas Anderson", c: ["Daniel Day-Lewis", "Paul Dano"] },
        { t: "Joker", y: 2019, d: "Todd Phillips", c: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"] },
        { t: "Silence of the Lambs", y: 1991, d: "Jonathan Demme", c: ["Jodie Foster", "Anthony Hopkins"] },
        { t: "The Avengers", y: 2012, d: "Joss Whedon", c: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson", "Mark Ruffalo"] },
        { t: "Marriage Story", y: 2019, d: "Noah Baumbach", c: ["Scarlett Johansson", "Adam Driver"] },
        { t: "Little Women", y: 2019, d: "Greta Gerwig", c: ["Saoirse Ronan", "Emma Watson", "Timothee Chalamet", "Florence Pugh"] },
        { t: "Lady Bird", y: 2017, d: "Greta Gerwig", c: ["Saoirse Ronan", "Timothee Chalamet", "Laurie Metcalf"] },
        { t: "Dune", y: 2021, d: "Denis Villeneuve", c: ["Timothee Chalamet", "Zendaya", "Oscar Isaac", "Rebecca Ferguson"] },
        { t: "Blade Runner 2049", y: 2017, d: "Denis Villeneuve", c: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"] },
        { t: "La La Land", y: 2016, d: "Damien Chazelle", c: ["Ryan Gosling", "Emma Stone"] },
        { t: "Everything Everywhere All at Once", y: 2022, d: "Daniel Kwan", c: ["Michelle Yeoh", "Ke Huy Quan", "Jamie Lee Curtis"] },
        { t: "Crazy Rich Asians", y: 2018, d: "Jon M. Chu", c: ["Constance Wu", "Henry Golding", "Michelle Yeoh"] },
        { t: "Star Wars: A New Hope", y: 1977, d: "George Lucas", c: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"] },
        { t: "Sherlock Holmes", y: 2009, d: "Guy Ritchie", c: ["Robert Downey Jr.", "Jude Law", "Rachel McAdams"] }
    ];

    /* =========================================================
       GRAPH BUILDING
       ========================================================= */
    const nodes = {}; // id -> node

    function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

    function hueFromString(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) % 360; }
        return h;
    }

    function ensurePerson(name) {
        const id = 'p-' + slug(name);
        if (!nodes[id]) {
            nodes[id] = { id, kind: 'person', title: name, year: null, links: [], hue: hueFromString(name) };
        }
        return id;
    }

    RAW_MOVIES.forEach(m => {
        const mid = 'm-' + slug(m.t + '-' + m.y);
        nodes[mid] = { id: mid, kind: 'movie', title: m.t, year: m.y, director: m.d, links: [], hue: hueFromString(m.t) };
        const dId = ensurePerson(m.d);
        addLink(mid, dId, 'Director');
        addLink(dId, mid, 'Director');
        m.c.forEach(actor => {
            const aId = ensurePerson(actor);
            addLink(mid, aId, 'Cast');
            addLink(aId, mid, 'Cast');
        });
    });

    function addLink(fromId, toId, role) {
        if (!nodes[fromId].links.find(l => l.id === toId)) {
            nodes[fromId].links.push({ id: toId, role });
        }
    }

    const movieIds = Object.keys(nodes).filter(id => nodes[id].kind === 'movie');

    /* =========================================================
       BFS shortest path (for pairing + "par" display)
       ========================================================= */
    function shortestPath(startId, endId) {
        if (startId === endId) return [startId];
        const visited = new Set([startId]);
        const queue = [[startId]];
        while (queue.length) {
            const path = queue.shift();
            const node = nodes[path[path.length - 1]];
            for (const l of node.links) {
                if (l.id === endId) return [...path, l.id];
                if (!visited.has(l.id)) {
                    visited.add(l.id);
                    queue.push([...path, l.id]);
                }
            }
        }
        return null;
    }

    function pickPair(minLen, maxLen, attempts) {
        attempts = attempts || 400;
        for (let i = 0; i < attempts; i++) {
            const a = movieIds[Math.floor(Math.random() * movieIds.length)];
            const b = movieIds[Math.floor(Math.random() * movieIds.length)];
            if (a === b) continue;
            const p = shortestPath(a, b);
            if (p && p.length - 1 >= minLen && p.length - 1 <= maxLen) return { start: a, target: b, par: p.length - 1 };
        }
        // fallback: just find any connected pair
        const a = movieIds[0], b = movieIds[movieIds.length - 1];
        const p = shortestPath(a, b);
        return { start: a, target: b, par: p ? p.length - 1 : 0 };
    }

    /* =========================================================
       STATE
       ========================================================= */
    let state = {
        startId: null, targetId: null, currentId: null,
        path: [], startTime: null, timerHandle: null, finished: false,
        mode: 'solo', // 'solo' | 'room'
        roomCode: null, playerName: null, pollHandle: null, par: null
    };

    /* =========================================================
       RENDER HELPERS
       ========================================================= */
    function thumbStyle(node) {
        const h = node.hue;
        const grad = node.kind === 'movie'
            ? `linear-gradient(155deg, hsl(${h} 55% 22%), hsl(${(h + 40) % 360} 60% 12%))`
            : `linear-gradient(155deg, hsl(${h} 30% 26%), hsl(${(h + 30) % 360} 35% 14%))`;
        return grad;
    }
    function initials(title) {
        return title.split(' ').filter(w => w.length).slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }
    function setThumb(el, node) {
        el.style.background = thumbStyle(node);
        el.innerHTML = `<div class="init">${initials(node.title)}</div>`;
    }

    function fmtTime(sec) {
        const m = Math.floor(sec / 60), s = sec % 60;
        return m + ':' + String(s).padStart(2, '0');
    }

    /* =========================================================
       RACE SETUP
       ========================================================= */
    function beginRace(startId, targetId, par) {
        state.startId = startId;
        state.targetId = targetId;
        state.currentId = startId;
        state.path = [startId];
        state.finished = false;
        state.startTime = Date.now();
        state.par = par != null ? par : (shortestPath(startId, targetId) || []).length - 1;

        document.getElementById('heroScreen').classList.remove('active');
        document.getElementById('raceScreen').classList.add('active');
        document.getElementById('winOverlay').classList.remove('show');

        setThumb(document.getElementById('startThumb'), nodes[startId]);
        setThumb(document.getElementById('targetThumb'), nodes[targetId]);
        document.getElementById('startName').textContent = nodes[startId].title;
        document.getElementById('targetName').textContent = nodes[targetId].title + (nodes[targetId].year ? ' (' + nodes[targetId].year + ')' : '');

        renderCurrent();
        renderPath();
        startTimer();
    }

    function startTimer() {
        clearInterval(state.timerHandle);
        state.timerHandle = setInterval(() => {
            if (state.finished) return;
            const sec = Math.floor((Date.now() - state.startTime) / 1000);
            document.getElementById('statTime').textContent = fmtTime(sec);
        }, 500);
    }

    function renderCurrent() {
        const node = nodes[state.currentId];
        document.getElementById('currentKindLabel').textContent = node.kind === 'movie' ? 'Viewing film' : 'Viewing person';
        document.getElementById('currentTitle').textContent = node.title;
        document.getElementById('currentSub').textContent = node.kind === 'movie'
            ? (node.year ? node.year + ' · dir. ' + node.director : '')
            : 'Actor / Director';

        document.getElementById('statMoves').textContent = state.path.length - 1;

        const group = document.getElementById('connGroups');
        group.innerHTML = '';

        if (node.kind === 'movie') {
            renderGroup(group, 'Director', node.links.filter(l => l.role === 'Director'));
            renderGroup(group, 'Cast', node.links.filter(l => l.role === 'Cast'));
        } else {
            renderGroup(group, 'Filmography', node.links);
        }
    }

    function renderGroup(container, label, links) {
        if (!links.length) return;
        const wrap = document.createElement('div');
        const lbl = document.createElement('div');
        lbl.className = 'group-label';
        lbl.textContent = label + ' (' + links.length + ')';
        wrap.appendChild(lbl);
        const grid = document.createElement('div');
        grid.className = 'conn-grid';
        links.forEach(l => {
            const n = nodes[l.id];
            const card = document.createElement('button');
            card.className = 'node-card' + (l.id === state.targetId ? ' target-hint' : '');
            card.setAttribute('aria-label', 'Go to ' + n.title);
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            setThumb(thumb, n);
            const kindTag = document.createElement('div');
            kindTag.className = 'kind';
            kindTag.textContent = n.kind;
            thumb.appendChild(kindTag);
            const info = document.createElement('div');
            info.className = 'info';
            info.innerHTML = `<div class="t">${n.title}</div><div class="y">${n.year || (n.kind === 'person' ? 'person' : '')}</div>`;
            card.appendChild(thumb);
            card.appendChild(info);
            card.addEventListener('click', () => selectNode(l.id));
            grid.appendChild(card);
        });
        wrap.appendChild(grid);
        container.appendChild(wrap);
    }

    function renderPath() {
        const scroll = document.getElementById('pathScroll');
        scroll.innerHTML = '';
        state.path.forEach((id, i) => {
            if (i > 0) {
                const sep = document.createElement('div');
                sep.className = 'trail-sep';
                sep.textContent = '→';
                scroll.appendChild(sep);
            }
            const n = nodes[id];
            const chip = document.createElement('div');
            chip.className = 'trail-chip' + (n.kind === 'movie' ? ' movie' : '');
            chip.textContent = n.title;
            scroll.appendChild(chip);
        });
    }

    function selectNode(id) {
        if (state.finished) return;
        state.currentId = id;
        state.path.push(id);
        renderCurrent();
        renderPath();
        if (id === state.targetId) {
            finishRace();
        } else if (state.mode === 'room') {
            pushRoomProgress(false);
        }
    }

    function finishRace() {
        state.finished = true;
        clearInterval(state.timerHandle);
        const sec = Math.floor((Date.now() - state.startTime) / 1000);
        const moves = state.path.length - 1;
        document.getElementById('winMoves').textContent = moves;
        document.getElementById('winTime').textContent = fmtTime(sec);
        document.getElementById('winPar').textContent = state.par;
        document.getElementById('winSub').textContent = nodes[state.startId].title + ' → ' + nodes[state.targetId].title;
        document.getElementById('winHeading').textContent = moves <= state.par ? "Perfect chase!" : "You connected it!";
        document.getElementById('winOverlay').classList.add('show');
        if (state.mode === 'room') {
            pushRoomProgress(true, sec, moves);
        }
    }

    /* =========================================================
       ROOM / MULTIPLAYER (shared persistent storage)
       ========================================================= */
    function randomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let out = '';
        for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
        return out;
    }

    async function createOrJoinRoom() {
        const nameInput = document.getElementById('playerName');
        const codeInput = document.getElementById('roomCode');
        const errEl = document.getElementById('roomErr');
        errEl.style.display = 'none';
        const name = nameInput.value.trim();
        let code = codeInput.value.trim().toUpperCase();

        if (!name) { errEl.textContent = 'Enter your name first.'; errEl.style.display = 'block'; return; }

        try {
            if (!code) {
                // create new room
                code = randomCode();
                const pair = pickPair(3, 6);
                await window.storage.set('linkboxd:room:' + code, JSON.stringify({
                    startId: pair.start, targetId: pair.target, par: pair.par, createdAt: Date.now()
                }), true);
            } else {
                const res = await safeGet('linkboxd:room:' + code, true);
                if (!res) { errEl.textContent = 'No room found with that code.'; errEl.style.display = 'block'; return; }
            }

            const roomRes = await window.storage.get('linkboxd:room:' + code, true);
            const room = JSON.parse(roomRes.value);

            state.mode = 'room';
            state.roomCode = code;
            state.playerName = name;

            document.getElementById('sideCol').classList.add('show');
            document.getElementById('roomCodeBox').style.display = 'block';
            document.getElementById('roomCodeDisplay').textContent = code;
            document.getElementById('statParBox').style.display = 'block';
            document.getElementById('statPar').textContent = room.par;

            beginRace(room.startId, room.targetId, room.par);
            pushRoomProgress(false);
            startPolling();
        } catch (e) {
            errEl.textContent = 'Something went wrong creating the room. Try again.';
            errEl.style.display = 'block';
        }
    }

    async function safeGet(key, shared) {
        try {
            const r = await window.storage.get(key, shared);
            return r;
        } catch (e) { return null; }
    }

    async function pushRoomProgress(finished, sec, moves) {
        if (state.mode !== 'room') return;
        try {
            await window.storage.set(
                'linkboxd:room:' + state.roomCode + ':player:' + state.playerName,
                JSON.stringify({
                    name: state.playerName,
                    moves: moves != null ? moves : state.path.length - 1,
                    elapsed: sec != null ? sec : Math.floor((Date.now() - state.startTime) / 1000),
                    finished: !!finished
                }),
                true
            );
        } catch (e) { /* best effort */ }
    }

    function startPolling() {
        clearInterval(state.pollHandle);
        state.pollHandle = setInterval(refreshLeaderboard, 2500);
        refreshLeaderboard();
    }

    async function refreshLeaderboard() {
        if (state.mode !== 'room') return;
        try {
            const list = await window.storage.list('linkboxd:room:' + state.roomCode + ':player:', true);
            if (!list || !list.keys) return;
            const players = [];
            for (const k of list.keys) {
                try {
                    const r = await window.storage.get(k, true);
                    if (r) players.push(JSON.parse(r.value));
                } catch (e) { }
            }
            players.sort((a, b) => {
                if (a.finished !== b.finished) return a.finished ? -1 : 1;
                if (a.finished && b.finished) return a.elapsed - b.elapsed;
                return b.moves - a.moves ? a.moves - b.moves : 0;
            });
            const board = document.getElementById('leaderboard');
            board.innerHTML = '';
            players.forEach(p => {
                const row = document.createElement('div');
                row.className = 'leader-row' + (p.finished ? ' done' : '');
                row.innerHTML = `<span class="lname">${p.name}${p.name === state.playerName ? ' (you)' : ''}</span>
        <span class="lstat">${p.finished ? '✓ ' + fmtTime(p.elapsed) : p.moves + ' mv'}</span>`;
                board.appendChild(row);
            });
        } catch (e) { /* ignore */ }
    }

    /* =========================================================
       NAV / RESET
       ========================================================= */
    function goHome() {
        clearInterval(state.timerHandle);
        clearInterval(state.pollHandle);
        document.getElementById('raceScreen').classList.remove('active');
        document.getElementById('heroScreen').classList.add('active');
        document.getElementById('winOverlay').classList.remove('show');
        document.getElementById('sideCol').classList.remove('show');
        document.getElementById('roomCodeBox').style.display = 'none';
        document.getElementById('statParBox').style.display = 'none';
        document.getElementById('roomErr').style.display = 'none';
        state = { startId: null, targetId: null, currentId: null, path: [], startTime: null, timerHandle: null, finished: false, mode: 'solo', roomCode: null, playerName: null, pollHandle: null, par: null };
    }

    document.getElementById('btnQuick').addEventListener('click', () => {
        const pair = pickPair(3, 6);
        state.mode = 'solo';
        beginRace(pair.start, pair.target, pair.par);
        document.getElementById('statParBox').style.display = 'block';
        document.getElementById('statPar').textContent = pair.par;
    });

    document.getElementById('btnJoinRoom').addEventListener('click', createOrJoinRoom);
    document.getElementById('btnNewRace').addEventListener('click', goHome);
    document.getElementById('btnBackHome').addEventListener('click', goHome);
    document.getElementById('btnGiveUp').addEventListener('click', () => {
        if (confirm('Give up this race and go back to home?')) goHome();
    });
    document.getElementById('btnRaceAgain').addEventListener('click', () => {
        document.getElementById('winOverlay').classList.remove('show');
        if (state.mode === 'room') {
            // stay in same room, restart same target from start
            beginRace(state.startId, state.targetId, state.par);
            pushRoomProgress(false);
        } else {
            const pair = pickPair(3, 6);
            beginRace(pair.start, pair.target, pair.par);
        }
    });

    function scrollToRules() {
        document.getElementById('heroScreen').classList.add('active');
        document.getElementById('raceScreen').classList.remove('active');
        document.getElementById('howItWorks').scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('btnHowShort').addEventListener('click', scrollToRules);
    document.getElementById('btnHowInline').addEventListener('click', () => {
        alert('From a film, click its director or a cast member. From a person, click a film in their filmography. Reach the target in as few moves as possible.');
    });

})();