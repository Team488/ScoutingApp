// This is the event table from the scouting doc. Make sure
// it's kept in sync with what processing expects.

type MatchEvent = {
  phase: "pre-match" | "sandstorm" | "teleop" | "post-match",
  description: string
}

export const EventTypes: { [index:number] : MatchEvent } = {
  // Pre-match
  31: { phase: "pre-match", description: "Started position 1"},
  32: { phase: "pre-match", description: "Started position 2"},
  33: { phase: "pre-match", description: "Started position 3"},

  // Sandstorm
  0: { phase: "sandstorm", description: "Crossed starting line"},
  20: { phase: "sandstorm", description: "Grabbed hatch floor"},
  21: { phase: "sandstorm", description: "Grabbed hatch station"},
  40: { phase: "sandstorm", description: "Grabbed cargo floor"},
  41: { phase: "sandstorm", description: "Grabbed cargo station"},
  25: { phase: "sandstorm", description: "Scored hatch on rocket front bottom"},
  27: { phase: "sandstorm", description: "Scored hatch on rocket front middle"},
  29: { phase: "sandstorm", description: "Scored hatch on rocket front top"},
  24: { phase: "sandstorm", description: "Scored hatch on rocket back bottom"},
  26: { phase: "sandstorm", description: "Scored hatch on rocket back middle"},
  28: { phase: "sandstorm", description: "Scored hatch on rocket back top"},
  44: { phase: "sandstorm", description: "Scored cargo on rocket bottom"},
  45: { phase: "sandstorm", description: "Scored cargo on rocket middle"},
  46: { phase: "sandstorm", description: "Scored cargo on rocket top"},
  23: { phase: "sandstorm", description: "Scored hatch on ship side"},
  22: { phase: "sandstorm", description: "Scored hatch on ship front"},
  43: { phase: "sandstorm", description: "Scored cargo on ship side"},
  42: { phase: "sandstorm", description: "Scored cargo on ship front"},
  2: { phase: "sandstorm", description: "Dropped hatch"},
  3: { phase: "sandstorm", description: "Dropped cargo"},
  1: { phase: "sandstorm", description: "Entered opponent territory"},
  4: { phase: "sandstorm", description: "Left opponent territory"},

  // Teleop
  120: { phase: "teleop", description: "Grabbed hatch floor"},
  121: { phase: "teleop", description: "Grabbed hatch station"},
  140: { phase: "teleop", description: "Grabbed cargo floor"},
  141: { phase: "teleop", description: "Grabbed cargo station"},
  125: { phase: "teleop", description: "Scored hatch on rocket front bottom"},
  127: { phase: "teleop", description: "Scored hatch on rocket front middle"},
  129: { phase: "teleop", description: "Scored hatch on rocket front top"},
  124: { phase: "teleop", description: "Scored hatch on rocket back bottom"},
  126: { phase: "teleop", description: "Scored hatch on rocket back middle"},
  128: { phase: "teleop", description: "Scored hatch on rocket back top"},
  144: { phase: "teleop", description: "Scored cargo on rocket bottom"},
  145: { phase: "teleop", description: "Scored cargo on rocket middle"},
  146: { phase: "teleop", description: "Scored cargo on rocket top"},
  123: { phase: "teleop", description: "Scored hatch on ship side"},
  122: { phase: "teleop", description: "Scored hatch on ship front"},
  143: { phase: "teleop", description: "Scored cargo on ship side"},
  142: { phase: "teleop", description: "Scored cargo on ship front"},
  5: { phase: "teleop", description: "Disabled"},
  6: { phase: "teleop", description: "Restored"},
  12: { phase: "teleop", description: "Dropped Hatch"},
  13: { phase: "teleop", description: "Dropped cargo"},
  11: { phase: "teleop", description: "Entered opponent territory"},
  14: { phase: "teleop", description: "Left opponent territory"},

  // Post-match
  212: { phase: "teleop", description: "Lifted teammate to 2"},
  213: { phase: "teleop", description: "Lifted teammate to 3"},
  201: { phase: "teleop", description: "Ended match on 1"},
  202: { phase: "teleop", description: "Ended match on 2"},
  203: { phase: "teleop", description: "Ended match on 3"},
}