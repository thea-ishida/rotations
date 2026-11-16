// Rotations: one week of volleyball feedback, planned two ways.
// Rotation view: each positional group gets one coach for the week, and the
// focuses come from what the group said. Score only: the same week reduced to
// one weighted number, with focuses picked automatically from the lowest
// sub-scores. Groups always stay in the same order; nothing is ranked.

(function () {
  "use strict";

  var C = window.CONTENT;
  var weekCount = Math.max.apply(null, C.groups.map(function (g) { return g.weeks.length; }));
  var state = { week: 0, mode: "rotation", revealed: false };

  var view = document.getElementById("view");
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var weekLabel = document.getElementById("weekLabel");
  var modeRotation = document.getElementById("modeRotation");
  var modeScore = document.getElementById("modeScore");

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function chips(list) {
    if (!list || !list.length) return el("p", { class: "empty", text: "No focus set" });
    return el("ul", { class: "chips" }, list.map(function (s) { return el("li", { class: "chip", text: s }); }));
  }

  function coachFor(groupIndex, week) {
    return C.coaches[(groupIndex + week) % C.coaches.length];
  }

  function weekOf(group, week) {
    return group.weeks[week] || null;
  }

  function scoreAt(skill, week) {
    var s = skill.scores[week];
    return typeof s === "number" ? s : skill.scores[skill.scores.length - 1];
  }

  function groupScore(group, week) {
    var total = 0;
    group.skills.forEach(function (s) { total += scoreAt(s, week); });
    return total / group.skills.length;
  }

  function teamIndex(week) {
    var sum = 0, weights = 0;
    C.groups.forEach(function (g) { sum += groupScore(g, week) * g.weight; weights += g.weight; });
    return weights ? sum / weights : 0;
  }

  // The score's plan: the two lowest sub-scores this week.
  function scorePicks(group, week) {
    return group.skills
      .map(function (s) { return { name: s.name, v: scoreAt(s, week) }; })
      .sort(function (a, b) { return a.v - b.v; })
      .slice(0, 2)
      .map(function (s) { return s.name; });
  }

  function noteBlock(w) {
    if (!w || !w.note) return el("p", { class: "empty", text: "No note this week" });
    var p = el("p", { class: "note", text: w.note });
    if (w.standIn) p.appendChild(el("span", { class: "standin", text: "stand-in" }));
    return p;
  }

  function renderRotation() {
    var cards = C.groups.map(function (g, i) {
      var w = weekOf(g, state.week);
      return el("article", { class: "card rotation" }, [
        el("h2", { text: g.name }),
        el("p", { class: "coach", text: "Watched all week by " + coachFor(i, state.week) }),
        el("p", { class: "label", text: "What the group said" }),
        noteBlock(w),
        el("p", { class: "label", text: "Focuses set with the coach" }),
        chips(w && w.coachFocus),
      ]);
    });
    return el("div", { class: "grid" }, cards);
  }

  function renderScore() {
    var now = teamIndex(state.week);
    var change = state.week > 0 ? now - teamIndex(state.week - 1) : null;
    var meta = C.scoreNote + " Weights set by " + C.weightsSetBy + ".";

    var summary = el("div", { class: "index" }, [
      el("span", { class: "big", text: now.toFixed(1) }),
      el("span", { text: "Team practice index" }),
      el("span", { class: "tag", text: "made up" }),
      change === null ? null : el("span", { text: (change >= 0 ? "Up " : "Down ") + Math.abs(change).toFixed(1) + " from last week" }),
      el("p", { class: "meta", text: meta }),
    ]);

    var toggle = el("button", {
      type: "button",
      class: "reveal",
      "aria-expanded": String(state.revealed),
      text: state.revealed ? "Hide what the score left out" : "Show what the score left out",
    });
    toggle.addEventListener("click", function () {
      state.revealed = !state.revealed;
      render();
      document.querySelector(".reveal").focus();
    });

    var cards = C.groups.map(function (g, i) {
      var picks = scorePicks(g, state.week);
      var bars = g.skills.map(function (s) {
        var v = scoreAt(s, state.week);
        var low = picks.indexOf(s.name) !== -1;
        var fill = el("div", { class: "fill", style: "width:" + Math.max(0, Math.min(100, v)) + "%" });
        return el("li", { class: "bar" + (low ? " low" : "") }, [
          el("span", { text: s.name }),
          el("span", { class: "num", text: String(Math.round(v)) }),
          el("div", { class: "track", "aria-hidden": "true" }, [fill]),
        ]);
      });
      var w = weekOf(g, state.week);
      var leftOut = state.revealed
        ? el("div", { class: "leftout" }, [
            el("p", { class: "label", text: "What the group said" }),
            noteBlock(w),
            el("p", { class: "label", text: "What " + coachFor(i, state.week) + " would have picked with them" }),
            chips(w && w.coachFocus),
          ])
        : null;
      return el("article", { class: "card score" }, [
        el("h2", { text: g.name + " · " + groupScore(g, state.week).toFixed(1) }),
        el("p", { class: "label", text: "Sub-scores" }),
        el("ul", { class: "bars" }, bars),
        el("p", { class: "label", text: "Focuses picked by the score" }),
        chips(picks),
        leftOut,
      ]);
    });

    return el("div", null, [summary, toggle, el("div", { class: "grid" }, cards)]);
  }

  function render() {
    weekLabel.textContent = "Week " + (state.week + 1) + " of " + weekCount;
    prev.setAttribute("aria-disabled", String(state.week === 0));
    next.setAttribute("aria-disabled", String(state.week === weekCount - 1));
    modeRotation.setAttribute("aria-pressed", String(state.mode === "rotation"));
    modeScore.setAttribute("aria-pressed", String(state.mode === "score"));
    view.replaceChildren(state.mode === "rotation" ? renderRotation() : renderScore());
  }

  function go(delta) {
    var w = state.week + delta;
    if (w < 0 || w >= weekCount) return;
    state.week = w;
    render();
  }

  function setMode(m) {
    if (state.mode === m) return;
    state.mode = m;
    render();
  }

  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });
  modeRotation.addEventListener("click", function () { setMode("rotation"); });
  modeScore.addEventListener("click", function () { setMode("score"); });
  document.addEventListener("keydown", function (e) {
    var t = e.target && e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA") return;
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  document.getElementById("title").textContent = C.title;
  document.title = C.title;
  document.getElementById("intro").textContent = C.intro;
  var closing = document.getElementById("closing");
  closing.append(C.closing.lead + " ");
  closing.appendChild(el("q", { text: C.closing.quote }));
  closing.append(" " + C.closing.cite + ".");

  render();
})();
