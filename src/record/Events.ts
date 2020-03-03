// This is the event table from the scouting doc. Make sure
// it's kept in sync with what processing expects.

type MatchEvent = {
  phase: "pre-match" | "auto" | "teleop" | "post-match",
  description: string
}

export const EventTypes: { [index: string]: MatchEvent } = {
  // Pre-match
  10: { phase: "pre-match", description: "A: Started with 0 Balls" },
  11: { phase: "pre-match", description: "A: Started with 1 Balls" },
  12: { phase: "pre-match", description: "A: Started with 2 Balls" },
  13: { phase: "pre-match", description: "A: Started with 3 Balls" },

  // Auto
  20: { phase: "teleop", description: "A: Crossed start line" },
  30: { phase: "teleop", description: "A: Missed a shot" },
  31: { phase: "teleop", description: "A: Scored LOW goal " },
  32: { phase: "teleop", description: "A: Scored high OUTER goal " },
  33: { phase: "teleop", description: "A: Scored high INNER goal " },
  40: { phase: "teleop", description: "A: Loaded a ball " },

  // Teleop
  5: { phase: "teleop", description: "Robot went into a disabled state" },
  6: { phase: "teleop", description: "Robot restored itself from being disabled" },

  130: { phase: "teleop", description: "T:Missed a shot" },
  131: { phase: "teleop", description: "T:Scored LOW goal" },
  132: { phase: "teleop", description: "T: Scored high OUTER goal" },
  133: { phase: "teleop", description: "T: Scored high INNER goal" },
  134: { phase: "teleop", description: "Passed a ball"},
  140: { phase: "teleop", description: "T: Loaded a ball" },
  150: { phase: "teleop", description: "Spun the wheel 5 seconds" },
  151: { phase: "teleop", description: "Set the wheel to correct color" },
  107: { phase: "teleop", description: "Drove through the trench" },

  // Post-match
  166: { phase: "post-match", description: "Lifted 1 teammate" },
  167: { phase: "post-match", description: "Lifted 2 teammates" },
  161: { phase: "post-match", description: "Successfully climbed when bar was level" },
  162: { phase: "post-match", description: "Successfully climbed when bar was tilted" },
  163: { phase: "post-match", description: "Failed to climb when bar was level" },
  164: { phase: "post-match", description: "Failed to climb when bar was tilted" },
  165: { phase: "post-match", description: "Did not attempt to climb" }
}

export enum EventCode {
  START_0 = 10,
  START_1 = 11,
  START_2 = 12,
  START_3 = 13,

  // Autonomous
  CROSS_START = 20,
  A_MISS_SHOT = 30,
  A_SHOT_LOW = 31,
  A_SHOT_OUTER = 32,
  A_SHOT_INNER = 33,
  A_INTAKE_BALL = 40,

  // Teleop
  T_MISS_SHOT = 130,
  T_SHOT_LOW = 131,
  T_SHOT_OUTER = 132,
  T_SHOT_INNER = 133,
  T_SHOT_PASS = 134,
  T_INTAKE_BALL = 140,
  SPIN_WHEEL = 150,
  SET_WHEEL_COLOR = 151,
  DISABLED = 5,
  RESTORED = 6,
  THROUGH_TRENCH = 107,

  // Post-match
  CLIMB_LEVEL = 161,
  CLIMB_TILTED = 162,
  FAILED_LEVEL = 163,
  FAILED_TILTED = 164,
  NO_TRY_CLIMB = 165,
  LIFTED_1 = 166,
  LIFTED_2 = 167
}
