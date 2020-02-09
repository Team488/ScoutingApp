// This is the event table from the scouting doc. Make sure
// it's kept in sync with what processing expects.

type MatchEvent = {
  phase: "pre-match" | "auto" | "teleop" | "post-match",
  description: string
}

export const EventTypes: { [index: string]: MatchEvent } = {
  // Pre-match
  10: { phase: "pre-match", description: "Robot held 0 Balls at start" },
  11: { phase: "pre-match", description: "Robot held 1 Ball at start" },
  12: { phase: "pre-match", description: "Robot held 2 Balls at start" },
  13: { phase: "pre-match", description: "Robot held 3 Balls at start" },

  // Auto
  20: { phase: "teleop", description: "Crossed the start line during autonomous" },
  30: { phase: "teleop", description: "Missed a shot during autonomous" },
  31: { phase: "teleop", description: "Scored a shot in the LOW goal during autonomous" },
  32: { phase: "teleop", description: "Scored a shot in the high OUTER goal during autonomous" },
  33: { phase: "teleop", description: "Scored a shot in the high INNER goal during autonomous" },
  40: { phase: "teleop", description: "Loaded a ball during autonomous" },

  // Teleop
  5: { phase: "teleop", description: "Robot went into a disabled state" },
  6: { phase: "teleop", description: "Robot restored itself from being disabled" },

  130: { phase: "teleop", description: "Missed a shot during teleop" },
  131: { phase: "teleop", description: "Scored a shot in the LOW goal during teleop" },
  132: { phase: "teleop", description: "Scored a shot in the high OUTER goal during teleop" },
  133: { phase: "teleop", description: "Scored a shot in the high INNER goal during teleop" },
  140: { phase: "teleop", description: "Loaded a ball during teleop" },
  150: { phase: "teleop", description: "Spun the wheel at the control panel for 5 seconds" },
  151: { phase: "teleop", description: "Spun the wheel to set the correct color at the control panel" },
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
