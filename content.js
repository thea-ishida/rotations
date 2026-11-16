// All editable text for the page lives in this file.
// Edit it freely: the code in app.js reads everything from here.
//
// STAND-IN CONTENT: every `note` and every `coachFocus` below was drafted
// by Claude (AI) as a placeholder. Replace them with your own paraphrases
// (no names), then set `standIn: false` on each week you rewrite.
//
// The sub-scores are invented on purpose. The page labels them as made up,
// because the made-up number is part of the point.

window.CONTENT = {
  title: "Rotations",
  intro:
    "One coach watches one positional group for a whole week and sets one or two skill focuses with them. Then the coaches rotate.",

  coaches: ["Coach A", "Coach B", "Coach C", "Coach D"],

  // Who set the score weights. Shown under the score so the choice is visible.
  weightsSetBy: "the page author, not the players",

  scoreNote:
    "This score is made up. It combines invented sub-scores using fixed weights.",

  closing: {
    lead: "The system changed because teammates said something and someone passed it on, not because a number moved. Chouinard said that doing the right thing might let Patagonia",
    quote: "maybe change the system along the way",
    cite: "(“Lifetime” 37)",
  },

  groups: [
    {
      name: "Setters",
      weight: 0.3,
      skills: [
        { name: "Hand contact", scores: [62, 66, 69, 73] },
        { name: "Tempo", scores: [58, 63, 70, 74] },
        { name: "Location off bad passes", scores: [71, 72, 74, 75] },
      ],
      weeks: [
        { standIn: true, note: "We hear “nice set” a lot, but not what to change when the pass is tight to the net.", coachFocus: ["Location off bad passes", "Tempo"] },
        { standIn: true, note: "We’re rushing the second ball when the first contact is off.", coachFocus: ["Location off bad passes", "Hand contact"] },
        { standIn: true, note: "Hard to tell if our backsets are on time without someone watching every rep.", coachFocus: ["Tempo"] },
        { standIn: true, note: "We want to work on talking to hitters before the serve, not just after.", coachFocus: ["Tempo", "Location off bad passes"] },
      ],
    },
    {
      name: "Middles",
      weight: 0.2,
      skills: [
        { name: "Block footwork", scores: [55, 61, 64, 70] },
        { name: "Reading the setter", scores: [68, 69, 70, 71] },
        { name: "Quick attack timing", scores: [60, 64, 68, 72] },
      ],
      weeks: [
        { standIn: true, note: "We get told to “close the block” but nobody says what our feet are doing wrong.", coachFocus: ["Block footwork"] },
        { standIn: true, note: "We’re guessing on the setter’s release instead of reading it.", coachFocus: ["Reading the setter", "Block footwork"] },
        { standIn: true, note: "Our first step on quicks feels late after a block.", coachFocus: ["Quick attack timing"] },
        { standIn: true, note: "We’d like feedback on transition, not just front-row reps.", coachFocus: ["Reading the setter", "Quick attack timing"] },
      ],
    },
    {
      name: "Outsides",
      weight: 0.3,
      skills: [
        { name: "Serve receive", scores: [64, 66, 71, 74] },
        { name: "Approach", scores: [70, 71, 73, 76] },
        { name: "Shot selection", scores: [66, 70, 72, 73] },
      ],
      weeks: [
        { standIn: true, note: "We get pulled for passing but don’t hear why a pass was off.", coachFocus: ["Serve receive"] },
        { standIn: true, note: "We swing hard every time. We want help knowing when to roll a shot.", coachFocus: ["Shot selection", "Approach"] },
        { standIn: true, note: "Our approach gets short when we’re tired late in practice.", coachFocus: ["Approach"] },
        { standIn: true, note: "We want to know what to look at on the other side before the swing.", coachFocus: ["Shot selection", "Serve receive"] },
      ],
    },
    {
      name: "Liberos / DS",
      weight: 0.2,
      skills: [
        { name: "Platform angle", scores: [72, 74, 75, 78] },
        { name: "Floor coverage", scores: [61, 66, 68, 71] },
        { name: "Communication", scores: [69, 70, 72, 74] },
      ],
      weeks: [
        { standIn: true, note: "We hear “call it” but not how early to call or who takes the seam.", coachFocus: ["Communication", "Floor coverage"] },
        { standIn: true, note: "Our platform holds on easy balls but breaks on hard-driven ones.", coachFocus: ["Platform angle"] },
        { standIn: true, note: "We want feedback on where we start, not only on the dig.", coachFocus: ["Floor coverage"] },
        { standIn: true, note: "Tips keep falling in front of us. We’re not sure if it’s reading or starting spot.", coachFocus: ["Floor coverage", "Communication"] },
      ],
    },
  ],
};
