const STORAGE_KEY = "fitquest.v1.data";
const POINTS_PER_LEVEL = 500;
const WEEKLY_QUEST_REWARD = 250;

const DEFAULT_GOALS = {
  weeklyPoints: 500,
  weeklyMinutes: 180,
  weeklySoccerSessions: 3,
  weeklyRunningMiles: 5
};

const ACTIVITY_BASE_POINTS = {
  "Home Workout": 10,
  "Gym Workout": 15,
  "Running": 12,
  "Outdoor Fitness": 10,
  "Soccer Supplemental": 15
};

const GENERAL_FOCUS_AREAS = [
  "General Fitness",
  "Strength",
  "Mobility",
  "Conditioning",
  "Speed",
  "Agility",
  "Recovery"
];

const SOCCER_FOCUS_AREAS = [
  "Ball Control",
  "Passing",
  "Shooting",
  "Juggling",
  "Weak Foot",
  "First Touch",
  "Dribbling",
  "Speed and Agility",
  "Conditioning"
];

const ACTIVITY_MILESTONE_CONFIG = [
  {
    type: "Home Workout",
    label: "Home Workout",
    shortLabel: "Home",
    icon: "HW"
  },
  {
    type: "Gym Workout",
    label: "Gym Workout",
    shortLabel: "Gym",
    icon: "GW"
  },
  {
    type: "Running",
    label: "Run",
    shortLabel: "Run",
    icon: "R"
  },
  {
    type: "Outdoor Fitness",
    label: "Outdoor Fitness",
    shortLabel: "Outdoor",
    icon: "OF"
  },
  {
    type: "Soccer Supplemental",
    label: "Soccer Supplemental Session",
    shortLabel: "Soccer",
    icon: "S"
  }
];

const ACTIVITY_MILESTONE_COUNTS = [25, 50, 100];

const ACTIVITY_MILESTONE_ACHIEVEMENTS = ACTIVITY_MILESTONE_CONFIG.flatMap(config => {
  return ACTIVITY_MILESTONE_COUNTS.map(count => {
    return {
      id: `${slugify(config.type)}_${count}`,
      title: `${count} ${config.shortLabel}`,
      desc: `Complete ${count} ${config.label.toLowerCase()}${count === 1 ? "" : "s"}.`,
      icon: String(count),
      test: stats => (stats.activityTypeCounts[config.type] || 0) >= count
    };
  });
});

const ACHIEVEMENTS = [
  {
    id: "first_activity",
    title: "First Quest",
    desc: "Log your first activity.",
    icon: "1",
    test: stats => stats.totalActivities >= 1
  },
  {
    id: "three_day_streak",
    title: "3-Day Streak",
    desc: "Train 3 days in a row.",
    icon: "3",
    test: stats => stats.streak >= 3
  },
  {
    id: "seven_day_streak",
    title: "7-Day Streak",
    desc: "Train 7 days in a row.",
    icon: "7",
    test: stats => stats.streak >= 7
  },
  {
    id: "fourteen_day_streak",
    title: "14-Day Streak",
    desc: "Train 14 days in a row.",
    icon: "14",
    test: stats => stats.streak >= 14
  },
  {
    id: "thirty_day_streak",
    title: "30-Day Streak",
    desc: "Train 30 days in a row.",
    icon: "30",
    test: stats => stats.streak >= 30
  },
  {
    id: "seven_training_days",
    title: "7 Training Days",
    desc: "Log activity on 7 different days.",
    icon: "D7",
    test: stats => stats.totalTrainingDays >= 7
  },
  {
    id: "thirty_training_days",
    title: "30 Training Days",
    desc: "Log activity on 30 different days.",
    icon: "D30",
    test: stats => stats.totalTrainingDays >= 30
  },
  {
    id: "hundred_training_days",
    title: "100 Training Days",
    desc: "Log activity on 100 different days.",
    icon: "D100",
    test: stats => stats.totalTrainingDays >= 100
  },
  {
    id: "three_sixty_five_training_days",
    title: "365 Training Days",
    desc: "Log activity on 365 different days.",
    icon: "365",
    test: stats => stats.totalTrainingDays >= 365
  },
  {
    id: "one_active_week",
    title: "First Training Week",
    desc: "Log activity in your first training week.",
    icon: "W1",
    test: stats => stats.activeWeeks >= 1
  },
  {
    id: "four_active_weeks",
    title: "4 Active Weeks",
    desc: "Log activity across 4 different weeks.",
    icon: "W4",
    test: stats => stats.activeWeeks >= 4
  },
  {
    id: "eight_active_weeks",
    title: "8 Active Weeks",
    desc: "Log activity across 8 different weeks.",
    icon: "W8",
    test: stats => stats.activeWeeks >= 8
  },
  {
    id: "twelve_active_weeks",
    title: "12 Active Weeks",
    desc: "Log activity across 12 different weeks.",
    icon: "W12",
    test: stats => stats.activeWeeks >= 12
  },
  {
    id: "twenty_six_active_weeks",
    title: "26 Active Weeks",
    desc: "Log activity across 26 different weeks.",
    icon: "W26",
    test: stats => stats.activeWeeks >= 26
  },

  {
    id: "one_active_month",
    title: "First Training Month",
    desc: "Log activity in your first training month.",
    icon: "M1",
    test: stats => stats.activeMonths >= 1
  },
  {
    id: "three_active_months",
    title: "3 Active Months",
    desc: "Log activity across 3 different months.",
    icon: "M3",
    test: stats => stats.activeMonths >= 3
  },
  {
    id: "six_active_months",
    title: "6 Active Months",
    desc: "Log activity across 6 different months.",
    icon: "M6",
    test: stats => stats.activeMonths >= 6
  },
  {
    id: "twelve_active_months",
    title: "12 Active Months",
    desc: "Log activity across 12 different months.",
    icon: "M12",
    test: stats => stats.activeMonths >= 12
  },
  {
    id: "level_5_athlete",
    title: "Level 5 Athlete",
    desc: "Reach Level 5.",
    icon: "L5",
    test: stats => stats.level >= 5
  },
  {
    id: "level_10_athlete",
    title: "Level 10 Athlete",
    desc: "Reach Level 10.",
    icon: "L10",
    test: stats => stats.level >= 10
  },
  {
    id: "level_25_athlete",
    title: "Level 25 Athlete",
    desc: "Reach Level 25.",
    icon: "L25",
    test: stats => stats.level >= 25
  },
  {
    id: "level_50_athlete",
    title: "Level 50 Athlete",
    desc: "Reach Level 50.",
    icon: "L50",
    test: stats => stats.level >= 50
  },
  {
    id: "hundred_points",
    title: "100 Points",
    desc: "Earn 100 total points.",
    icon: "100",
    test: stats => stats.totalPoints >= 100
  },
  {
    id: "five_hundred_points",
    title: "500 Points",
    desc: "Earn 500 total points.",
    icon: "500",
    test: stats => stats.totalPoints >= 500
  },
  {
    id: "thousand_points",
    title: "1,000 Points",
    desc: "Earn 1,000 total points.",
    icon: "1K",
    test: stats => stats.totalPoints >= 1000
  },
  {
    id: "twenty_five_hundred_points",
    title: "2,500 Points",
    desc: "Earn 2,500 total points.",
    icon: "2.5K",
    test: stats => stats.totalPoints >= 2500
  },
  {
    id: "five_thousand_points",
    title: "5,000 Points",
    desc: "Earn 5,000 total points.",
    icon: "5K",
    test: stats => stats.totalPoints >= 5000
  },
  {
    id: "ten_thousand_points",
    title: "10,000 Points",
    desc: "Earn 10,000 total points.",
    icon: "10K",
    test: stats => stats.totalPoints >= 10000
  },

  {
    id: "ten_activities",
    title: "10 Activities",
    desc: "Complete 10 activities.",
    icon: "10",
    test: stats => stats.totalActivities >= 10
  },
  {
    id: "thirty_activities",
    title: "30 Activities",
    desc: "Complete 30 activities.",
    icon: "30",
    test: stats => stats.totalActivities >= 30
  },
  {
    id: "fifty_activities",
    title: "50 Activities",
    desc: "Complete 50 activities.",
    icon: "50",
    test: stats => stats.totalActivities >= 50
  },
  {
    id: "hundred_activities",
    title: "100 Activities",
    desc: "Complete 100 activities.",
    icon: "100",
    test: stats => stats.totalActivities >= 100
  },

  {
    id: "first_run",
    title: "First Run",
    desc: "Log your first run.",
    icon: "R",
    test: stats => stats.runningCount >= 1
  },
  {
    id: "five_miles",
    title: "5 Miles",
    desc: "Run 5 total miles.",
    icon: "5",
    test: stats => stats.totalMiles >= 5
  },
  {
    id: "twenty_five_miles",
    title: "25 Miles",
    desc: "Run 25 total miles.",
    icon: "25",
    test: stats => stats.totalMiles >= 25
  },
  {
    id: "fifty_miles",
    title: "50 Miles",
    desc: "Run 50 total miles.",
    icon: "50",
    test: stats => stats.totalMiles >= 50
  },
  {
    id: "hundred_miles",
    title: "100 Miles",
    desc: "Run 100 total miles.",
    icon: "100",
    test: stats => stats.totalMiles >= 100
  },

  {
    id: "first_soccer",
    title: "First Soccer Session",
    desc: "Log a soccer supplemental session.",
    icon: "S",
    test: stats => stats.soccerCount >= 1
  },
  {
    id: "thousand_touches",
    title: "1,000 Touches",
    desc: "Record 1,000 ball touches.",
    icon: "1K",
    test: stats => stats.totalTouches >= 1000
  },
  {
    id: "five_thousand_touches",
    title: "5,000 Touches",
    desc: "Record 5,000 ball touches.",
    icon: "5K",
    test: stats => stats.totalTouches >= 5000
  },
  {
    id: "ten_thousand_touches",
    title: "10,000 Touches",
    desc: "Record 10,000 ball touches.",
    icon: "10K",
    test: stats => stats.totalTouches >= 10000
  },

  {
    id: "workout_warrior",
    title: "Workout Warrior",
    desc: "Complete 10 home or gym workouts.",
    icon: "W",
    test: stats => stats.workoutCount >= 10
  },
  {
    id: "five_hundred_minutes",
    title: "500 Minutes",
    desc: "Train for 500 total minutes.",
    icon: "M",
    test: stats => stats.totalMinutes >= 500
  },
  {
    id: "one_thousand_minutes",
    title: "1,000 Minutes",
    desc: "Train for 1,000 total minutes.",
    icon: "1K",
    test: stats => stats.totalMinutes >= 1000
  },
  {
    id: "hard_worker",
    title: "Hard Worker",
    desc: "Complete 5 hard-intensity sessions.",
    icon: "H",
    test: stats => stats.hardSessions >= 5
  },
  {
    id: "detail_tracker",
    title: "Detail Tracker",
    desc: "Log 10 exercises inside workouts.",
    icon: "D",
    test: stats => stats.totalExercises >= 10
  },

  ...ACTIVITY_MILESTONE_ACHIEVEMENTS
];

let state = null;
let currentExercises = [];

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  loadState();
  ensureActiveProfile();

  bindEvents();
  setTodayDate();
  updateFocusOptions();
  renderAll();

  window.setTimeout(() => {
    const loading = document.getElementById("loadingScreen");
    loading.classList.add("fade-out");
  }, 2600);

  registerServiceWorker();
}

function createDefaultState() {
  const firstProfileId = makeId();

  return {
    version: 1,
    activeProfileId: firstProfileId,
    lastSaved: null,
    profiles: [
      {
        id: firstProfileId,
        name: "Athlete 1",
        createdAt: new Date().toISOString(),
        goals: { ...DEFAULT_GOALS },
        activities: [],
        questRewardWeeks: []
      }
    ]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? JSON.parse(raw) : createDefaultState();

    if (!state || !Array.isArray(state.profiles)) {
      state = createDefaultState();
    }
  } catch (error) {
    state = createDefaultState();
  }
}

function saveState() {
  state.lastSaved = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderLastSaved();
}

function ensureActiveProfile() {
  if (!state.profiles.length) {
    const defaultState = createDefaultState();
    state.profiles = defaultState.profiles;
    state.activeProfileId = defaultState.activeProfileId;
  }

  const exists = state.profiles.some(profile => profile.id === state.activeProfileId);

  if (!exists) {
    state.activeProfileId = state.profiles[0].id;
  }
  state.profiles.forEach(profile => {
    if (!Array.isArray(profile.questRewardWeeks)) {
      profile.questRewardWeeks = [];
    }
  });
}

function getActiveProfile() {
  ensureActiveProfile();
  return state.profiles.find(profile => profile.id === state.activeProfileId);
}

function bindEvents() {
  document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.screen);
    });
  });

  document.getElementById("profileSelect").addEventListener("change", event => {
    state.activeProfileId = event.target.value;
    saveState();
    currentExercises = [];
    clearForm(false);
    renderAll();
  });

  document.getElementById("activityType").addEventListener("change", () => {
    updateFocusOptions();
    updateConditionalFields();
    updateEstimatedPoints();
  });

  document.querySelectorAll(".quick-btn").forEach(button => {
    button.addEventListener("click", () => {
      const minutes = button.dataset.minutes;

      document.getElementById("duration").value = minutes;

      document.querySelectorAll(".quick-btn").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      updateEstimatedPoints();
    });
  });

  document.querySelectorAll(".effort-btn").forEach(button => {
    button.addEventListener("click", () => {
      const effort = button.dataset.effort;

      document.getElementById("effort").value = effort;

      document.querySelectorAll(".effort-btn").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      updateEstimatedPoints();
    });
  });

  document.querySelectorAll(".intensity-btn").forEach(button => {
    button.addEventListener("click", () => {

      const intensity =
        button.dataset.intensity;

      document.getElementById("intensity").value =
        intensity;

      document
        .querySelectorAll(".intensity-btn")
        .forEach(btn => {
          btn.classList.remove("active");
        });

      button.classList.add("active");

      updateEstimatedPoints();
    });
  });

  [
    "duration",
    "intensity",
    "effort",
    "distanceMiles",
    "ballTouches",
    "soccerMinutes"
  ].forEach(id => {
    document.getElementById(id).addEventListener("input", updateEstimatedPoints);
    document.getElementById(id).addEventListener("change", updateEstimatedPoints);
  });

  document.getElementById("addExerciseBtn").addEventListener("click", addExercise);
  document.getElementById("saveActivityBtn").addEventListener("click", saveActivity);
  document.getElementById("clearFormBtn").addEventListener("click", () => clearForm(true));

  document.getElementById("addProfileBtn").addEventListener("click", addProfile);
  document.getElementById("saveGoalsBtn").addEventListener("click", saveGoals);

  document.getElementById("exportBtn").addEventListener("click", exportBackup);
  document.getElementById("importBtn").addEventListener("click", importBackup);
  document.getElementById("resetAppBtn").addEventListener("click", resetApp);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  document.querySelectorAll(".tab-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });

  renderAll();
}

function setTodayDate() {
  document.getElementById("activityDate").value = formatDateInput(new Date());
}

function updateFocusOptions() {
  const type = document.getElementById("activityType").value;
  const focus = document.getElementById("focusArea");
  const options = type === "Soccer Supplemental" ? SOCCER_FOCUS_AREAS : GENERAL_FOCUS_AREAS;

  focus.innerHTML = options.map(item => `<option>${escapeHtml(item)}</option>`).join("");

  updateConditionalFields();
}

function updateConditionalFields() {
  const type = document.getElementById("activityType").value;

  document.getElementById("runningFields").classList.toggle("hidden", type !== "Running");
  document.getElementById("soccerFields").classList.toggle("hidden", type !== "Soccer Supplemental");

  const showExercises = ["Home Workout", "Gym Workout", "Outdoor Fitness", "Soccer Supplemental"].includes(type);
  document.getElementById("exerciseSection").classList.toggle("hidden", !showExercises);
}

function addExercise() {
  const name = document.getElementById("exerciseName").value.trim();
  const sets = toNumber(document.getElementById("exerciseSets").value);
  const reps = toNumber(document.getElementById("exerciseReps").value);
  const weight = toNumber(document.getElementById("exerciseWeight").value);

  if (!name) {
    showToast("Add an exercise name first.");
    return;
  }

  currentExercises.push({
    id: makeId(),
    name,
    sets,
    reps,
    weight
  });

  document.getElementById("exerciseName").value = "";
  document.getElementById("exerciseSets").value = "";
  document.getElementById("exerciseReps").value = "";
  document.getElementById("exerciseWeight").value = "";

  renderExerciseList();
  updateEstimatedPoints();
}

function removeExercise(id) {
  currentExercises = currentExercises.filter(exercise => exercise.id !== id);
  renderExerciseList();
  updateEstimatedPoints();
}

function renderExerciseList() {
  const list = document.getElementById("exerciseList");

  if (!currentExercises.length) {
    list.innerHTML = `<div class="subtle">No exercise details added yet.</div>`;
    return;
  }

  list.innerHTML = currentExercises.map(exercise => {
    const parts = [];

    if (exercise.sets) parts.push(`${exercise.sets} sets`);
    if (exercise.reps) parts.push(`${exercise.reps} reps`);
    if (exercise.weight) parts.push(`${exercise.weight} lb`);

    return `
      <div class="exercise-item">
        <div class="activity-top">
          <div>
            <div class="activity-name">${escapeHtml(exercise.name)}</div>
            <div class="activity-meta">${parts.length ? escapeHtml(parts.join(" • ")) : "Details not specified"}</div>
          </div>
          <button class="mini-delete" type="button" onclick="removeExercise('${exercise.id}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

/* ======================================================
   LEVEL UP CELEBRATION SYSTEM

   Purpose:
   - Detect when an athlete gains a level
   - Trigger milestone celebrations
   - Reuse Celebration Overlay

====================================================== */
function saveActivity() {
  const profile = getActiveProfile();
  const unlockedBefore = new Set(getUnlockedAchievementIds(profile));

  /* ------------------------------------------------------
    Capture level before new activity is added
  ------------------------------------------------------ */
  const previousLevel =
    calculateLevel(
      calculateStats(profile).totalPoints
    );

  const date = document.getElementById("activityDate").value;
  const type = document.getElementById("activityType").value;
  const duration = toNumber(document.getElementById("duration").value);
  const intensity = document.getElementById("intensity").value;
  const effort = toNumber(document.getElementById("effort").value);
  const focusArea = document.getElementById("focusArea").value;
  const distanceMiles = toNumber(document.getElementById("distanceMiles").value);
  const routeType = document.getElementById("routeType").value;
  const ballTouches = toNumber(document.getElementById("ballTouches").value);
  const soccerMinutes = toNumber(document.getElementById("soccerMinutes").value);
  const notes = document.getElementById("notes").value.trim();

  if (!date) {
    showToast("Choose a date.");
    return;
  }

  if (!duration || duration <= 0) {
    showToast("Enter the activity duration.");
    return;
  }

  /* ------------------------------------------------------
    Running Validation
    Running activities require mileage since
    mileage is used for goals, stats, and achievements.
  ------------------------------------------------------ */

  if (
    type === "Running" &&
    (!distanceMiles || distanceMiles <= 0)
  ) {
    showToast(
      "Enter distance in miles for running activities."
    );
    return;
  }

  const activity = {
    id: makeId(),
    date,
    type,
    duration,
    intensity,
    effort,
    focusArea,
    distanceMiles: type === "Running" ? distanceMiles : 0,
    routeType: type === "Running" ? routeType : "",
    ballTouches: type === "Soccer Supplemental" ? ballTouches : 0,
    soccerMinutes: type === "Soccer Supplemental" ? soccerMinutes : 0,
    exercises: [...currentExercises],
    notes,
    createdAt: new Date().toISOString()
  };

  activity.points = calculatePoints(activity);

  profile.activities.push(activity);

  let questCompleted = false;

    const questStatus = getWeeklyQuestStatus(profile);

    if (
      questStatus.completed &&
      !questStatus.alreadyRewarded
    ) {
      
      questCompleted = true;
      showCelebration(
        "🏆",
        "Quest Complete!",
        `You earned ${WEEKLY_QUEST_REWARD} bonus XP`
      );

      profile.questRewardWeeks.push(
        questStatus.weekKey
      );

      const bonusActivity = {
        id: makeId(),
        date,
        type: "Weekly Quest Bonus",
        duration: 0,
        intensity: "Bonus",
        effort: 0,
        focusArea: "",
        notes: "Quest reward",
        points: WEEKLY_QUEST_REWARD,
        createdAt: new Date().toISOString()
      };

      profile.activities.push(bonusActivity);

      showToast(
        `🏆 Weekly Quest Complete! +${WEEKLY_QUEST_REWARD} XP`
      );
    }

    saveState();

    /* ------------------------------------------------------
      Level after save.
      Used by:
      - Level Up Celebration
      - Achievement Popup Suppression
    ------------------------------------------------------ */
    let levelUpOccurred = false;
    const newLevel =
      calculateLevel(
        calculateStats(profile).totalPoints
      );
    
    /* ------------------------------------------------------
      Level Up Celebration
    ------------------------------------------------------ */

    if (newLevel > previousLevel) {

      let icon = "⭐";
      let title = `Level ${newLevel}!`;
      let text =`${previousLevel} → ${newLevel}`;
      levelUpOccurred = true;

      // Major milestone levels
      if ([5, 10, 25, 50].includes(newLevel)) {
        icon = "🏅";
        title = `Level ${newLevel} Athlete`;
        text = `${previousLevel} → ${newLevel}`;
      }

      showCelebration(
        icon,
        title,
        text
      );
    }

  const unlockedAfter = getUnlockedAchievements(profile);
  const newlyUnlocked = unlockedAfter.filter(achievement => !unlockedBefore.has(achievement.id));

  clearForm(false);
  renderAll();

  if (!questCompleted) {
  showToast(
      `Saved ${activity.type}: ${activity.points} points earned.`
    );
  }

  
  if (newlyUnlocked.length && !levelUpOccurred) {

    if (
      ![5, 10, 25, 50].includes(newLevel)
    ) {
      showAchievementPopup(
        newlyUnlocked[0],
        newlyUnlocked.length
      );
    }
  }
}

function clearForm(showMessage) {
  setTodayDate();

  document.getElementById("activityType").value = "Home Workout";
  document.getElementById("duration").value = "";
  document.querySelectorAll(".quick-btn").forEach(btn => {
      btn.classList.remove("active");
    });
  document.getElementById("intensity").value = "Moderate";
  document
    .querySelectorAll(".intensity-btn")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  const defaultIntensity =
    document.querySelector(
      '.intensity-btn[data-intensity="Moderate"]'
    );

  if (defaultIntensity) {
    defaultIntensity.classList.add("active");
  }
  document.getElementById("effort").value = "3";
  document.querySelectorAll(".effort-btn").forEach(btn => {
  btn.classList.remove("active");
      });

  const defaultEffort = document.querySelector('.effort-btn[data-effort="3"]');

  if (defaultEffort) {
  defaultEffort.classList.add("active");
  }



  document.getElementById("distanceMiles").value = "";
  document.getElementById("routeType").value = "Neighborhood";
  document.getElementById("ballTouches").value = "";
  document.getElementById("soccerMinutes").value = "";
  document.getElementById("notes").value = "";

  currentExercises = [];

  updateFocusOptions();
  renderExerciseList();
  updateEstimatedPoints();

  if (showMessage) {
    showToast("Form cleared.");
  }
}

function calculatePoints(activity) {
  const base = ACTIVITY_BASE_POINTS[activity.type] || 10;

  let durationBonus = 0;
  if (activity.duration >= 60) durationBonus = 20;
  else if (activity.duration >= 45) durationBonus = 15;
  else if (activity.duration >= 30) durationBonus = 10;
  else if (activity.duration >= 15) durationBonus = 5;

  const intensityBonus = {
    Easy: 0,
    Moderate: 5,
    Hard: 10
  }[activity.intensity] || 0;

  const effortBonus = (activity.effort || 0) * 2;

  let detailBonus = 0;

  if (activity.type === "Running") {
    detailBonus += Math.floor((activity.distanceMiles || 0) * 3);
  }

  if (activity.type === "Soccer Supplemental") {
    detailBonus += Math.floor((activity.ballTouches || 0) / 100) * 2;
    detailBonus += Math.floor((activity.soccerMinutes || 0) / 10) * 2;
  }

  if (Array.isArray(activity.exercises) && activity.exercises.length) {
    detailBonus += Math.min(activity.exercises.length * 2, 12);

    const totalSets = activity.exercises.reduce((sum, exercise) => sum + toNumber(exercise.sets), 0);
    detailBonus += Math.min(Math.floor(totalSets / 3), 8);
  }

  return base + durationBonus + intensityBonus + effortBonus + detailBonus;
}

function updateEstimatedPoints() {
  const type = document.getElementById("activityType").value;
  const activity = {
    type,
    duration: toNumber(document.getElementById("duration").value),
    intensity: document.getElementById("intensity").value,
    effort: toNumber(document.getElementById("effort").value),
    distanceMiles: type === "Running" ? toNumber(document.getElementById("distanceMiles").value) : 0,
    ballTouches: type === "Soccer Supplemental" ? toNumber(document.getElementById("ballTouches").value) : 0,
    soccerMinutes: type === "Soccer Supplemental" ? toNumber(document.getElementById("soccerMinutes").value) : 0,
    exercises: [...currentExercises]
  };

  document.getElementById("estimatedPoints").textContent = calculatePoints(activity);
}

function deleteActivity(activityId) {
  const profile = getActiveProfile();

  if (!confirm("Delete this activity?")) {
    return;
  }

  profile.activities = profile.activities.filter(activity => activity.id !== activityId);
  saveState();
  renderAll();
  showToast("Activity deleted.");
}

function addProfile() {
  const input = document.getElementById("newProfileName");
  const name = input.value.trim();

  if (!name) {
    showToast("Enter a profile name.");
    return;
  }

  const profile = {
    id: makeId(),
    name,
    createdAt: new Date().toISOString(),
    goals: { ...DEFAULT_GOALS },
    activities: [],
    questRewardWeeks: []
  };

  state.profiles.push(profile);
  state.activeProfileId = profile.id;
  input.value = "";

  saveState();
  renderAll();
  showToast(`Added ${name}.`);
}

function deleteProfile(profileId) {
  const profile = state.profiles.find(item => item.id === profileId);

  if (!profile) return;

  if (state.profiles.length === 1) {
    showToast("You need at least one profile.");
    return;
  }

  if (!confirm(`Delete ${profile.name} and all of this profile's activities?`)) {
    return;
  }

  state.profiles = state.profiles.filter(item => item.id !== profileId);

  if (state.activeProfileId === profileId) {
    state.activeProfileId = state.profiles[0].id;
  }

  saveState();
  renderAll();
  showToast("Profile deleted.");
}

function saveGoals() {
  const profile = getActiveProfile();

  profile.goals = {
    weeklyPoints: toNumber(document.getElementById("goalWeeklyPoints").value),
    weeklyMinutes: toNumber(document.getElementById("goalWeeklyMinutes").value),
    weeklySoccerSessions: toNumber(document.getElementById("goalWeeklySoccer").value),
    weeklyRunningMiles: toNumber(document.getElementById("goalWeeklyMiles").value)
  };

  saveState();
  renderAll();
  showToast("Goals saved.");
}

function exportBackup() {
  const data = {
    app: "FitQuest",
    exportedAt: new Date().toISOString(),
    state
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().slice(0, 10);
  const fileName = `fitquest-backup-${stamp}.json`;

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showToast("Backup exported.");
}

function importBackup() {
  const input = document.getElementById("importFile");
  const file = input.files[0];

  if (!file) {
    showToast("Choose a backup file first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedState = parsed.state || parsed;

      if (!importedState || !Array.isArray(importedState.profiles)) {
        throw new Error("Invalid backup");
      }

      if (!confirm("Restore this backup? This will replace the FitQuest data on this device.")) {
        return;
      }

      state = importedState;
      ensureActiveProfile();
      saveState();

      input.value = "";
      currentExercises = [];
      clearForm(false);
      renderAll();

      showToast("Backup restored.");
    } catch (error) {
      showToast("That backup file could not be imported.");
    }
  };

  reader.readAsText(file);
}

function resetApp() {
  const phrase = prompt("Type RESET to clear all FitQuest data on this device.");

  if (phrase !== "RESET") {
    showToast("Reset canceled.");
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = createDefaultState();
  currentExercises = [];
  saveState();
  clearForm(false);
  renderAll();

  showToast("FitQuest has been reset.");
}

function renderAll() {
  ensureActiveProfile();
  renderProfileSelect();
  renderHeader();
  renderHero();
  renderLastActivity();
  renderWeeklyQuest();
  renderRecentActivities();
  renderStats();
  renderAchievements();
  renderBreakdown();
  renderProfiles();
  renderGoalInputs();
  renderLastSaved();
  renderExerciseList();
  updateEstimatedPoints();
}

function renderProfileSelect() {
  const select = document.getElementById("profileSelect");

  select.innerHTML = state.profiles.map(profile => {
    return `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`;
  }).join("");

  select.value = state.activeProfileId;
}

function renderHeader() {
  const profile = getActiveProfile();
  document.getElementById("headerSubtitle").textContent = `${profile.name}'s training dashboard`;
}

function renderHero() {
  const profile = getActiveProfile();
  const stats = calculateStats(profile);
  const levelInfo = getLevelInfo(stats.totalPoints);

  document.getElementById("todayPoints").textContent = stats.todayPoints;
  document.getElementById("streakPill").textContent = `${stats.streak} day streak`;
  document.getElementById("weeklyPill").textContent = `${stats.weeklyPoints} weekly pts`;
  document.getElementById("levelPill").textContent = `Level ${levelInfo.level}`;

  const progressText = document.getElementById("heroLevelProgressText");
  const nextLevelText = document.getElementById("heroNextLevelText");
  const progressFill = document.getElementById("heroLevelProgressFill");

  if (progressText && nextLevelText && progressFill) {
    progressText.textContent = `${levelInfo.currentLevelPoints} / ${POINTS_PER_LEVEL} XP`;
    nextLevelText.textContent = `Next: Level ${levelInfo.nextLevel}`;
    progressFill.style.width = `${levelInfo.percent}%`;
  }
}

function renderLastActivity() {
  const profile = getActiveProfile();

  const title = document.getElementById("lastActivityTitle");
  const meta = document.getElementById("lastActivityMeta");

  if (!title || !meta) return;

  const activities = [...profile.activities]
    .sort((a, b) => {
      const dateCompare = new Date(b.date) - new Date(a.date);

      if (dateCompare !== 0) {
        return dateCompare;
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  const latest = activities[0];

  if (!latest) {
    title.textContent = "No activity yet";
    meta.textContent = "Log your first workout";
    return;
  }

  title.textContent = latest.type;

  meta.textContent =
    `${latest.points} pts • ${latest.duration} min • ${formatReadableDate(latest.date)}`;
}

function renderWeeklyQuest() {
  const profile = getActiveProfile();

  const now = new Date();
  const weekStart = getWeekStart(now);

  const weeklyActivities = profile.activities.filter(activity => {

    if (activity.type === "Weekly Quest Bonus") {
      return false;
    }

    const activityDate = parseLocalDate(activity.date);

    return (
      activityDate >= weekStart &&
      activityDate <= endOfDay(now)
    );
  });

  const activityCount = weeklyActivities.length;

  const minuteCount = weeklyActivities.reduce(
    (sum, activity) => sum + toNumber(activity.duration),
    0
  );

  const runningCount = weeklyActivities.filter(
    activity => activity.type === "Running"
  ).length;

  document.getElementById("questActivitiesText").textContent =
    `Activities: ${activityCount} / 4`;

  document.getElementById("questMinutesText").textContent =
    `Minutes: ${minuteCount} / 180`;

  document.getElementById("questRunText").textContent =
    `Running Sessions: ${runningCount} / 2`;

  const completedParts =
    (activityCount >= 4 ? 1 : 0) +
    (minuteCount >= 180 ? 1 : 0) +
    (runningCount >= 2 ? 1 : 0);

  const percent = Math.round((completedParts / 3) * 100);
  const fullyCompleted =
    activityCount >= 4 &&
    minuteCount >= 180 &&
    runningCount >= 2;

  const questStatus = getWeeklyQuestStatus(profile);


  const progressElement =
  document.getElementById("questProgressText");

  if (
    fullyCompleted &&
    questStatus.alreadyRewarded
  ) {
    progressElement.textContent =
      "🏆 QUEST COMPLETED";

    progressElement.classList.add("quest-complete");

    document.getElementById("questRewardText").textContent =
      "Reward Claimed: +250 XP";
  }
  else {
    progressElement.textContent =
      `${percent}% Complete`;

    progressElement.classList.remove("quest-complete");

    document.getElementById("questRewardText").textContent =
      "Reward: +250 XP";
  }

  document.getElementById("questActivitiesCheck").style.background =
    activityCount >= 4 ? "#22c55e" : "transparent";

  document.getElementById("questMinutesCheck").style.background =
    minuteCount >= 180 ? "#22c55e" : "transparent";

  document.getElementById("questRunCheck").style.background =
    runningCount >= 2 ? "#22c55e" : "transparent";
}

function getWeeklyQuestStatus(profile) {
  const now = new Date();
  const weekStart = getWeekStart(now);
  const weekKey = formatDateInput(weekStart);

  const weeklyActivities = profile.activities.filter(activity => {

    if (activity.type === "Weekly Quest Bonus") {
      return false;
    }

    const activityDate = parseLocalDate(activity.date);

    return (
      activityDate >= weekStart &&
      activityDate <= endOfDay(now)
    );
  });

  const activityCount = weeklyActivities.length;

  const minuteCount = weeklyActivities.reduce(
    (sum, activity) => sum + toNumber(activity.duration),
    0
  );

  const runningCount = weeklyActivities.filter(
    activity => activity.type === "Running"
  ).length;

  const completed =
    activityCount >= 4 &&
    minuteCount >= 180 &&
    runningCount >= 2;

  const alreadyRewarded =
    profile.questRewardWeeks.includes(weekKey);

  return {
    weekKey,
    completed,
    alreadyRewarded
  };
}

function renderRecentActivities() {
  const profile = getActiveProfile();
  const container = document.getElementById("recentActivities");

  const activities = [...profile.activities]
    .sort((a, b) => {
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    })
    .slice(0, 8);

  if (!activities.length) {
    container.innerHTML = `
      <div class="empty-state">
        No activities yet. Log the first quest above.
      </div>
    `;
    return;
  }

  container.innerHTML = activities.map(activity => {
    const details = buildActivityDetails(activity);

    return `
      <div class="activity-item">
        <div class="activity-top">
          <div>
            <div class="activity-name">${escapeHtml(activity.type)}</div>
            <div class="activity-meta">
              ${formatReadableDate(activity.date)} • ${activity.duration} min • ${escapeHtml(activity.intensity)} • Effort ${activity.effort}/5
              ${details ? `<br>${details}` : ""}
            </div>
          </div>
          <div class="score-chip">${activity.points} pts</div>
        </div>
        ${activity.notes ? `<div class="activity-meta" style="margin-top: 8px;">${escapeHtml(activity.notes)}</div>` : ""}
        <button class="mini-delete" type="button" onclick="deleteActivity('${activity.id}')">Delete</button>
      </div>
    `;
  }).join("");
}

function buildActivityDetails(activity) {
  const parts = [];

  if (activity.focusArea) parts.push(activity.focusArea);
  if (activity.distanceMiles) parts.push(`${roundOne(activity.distanceMiles)} mi`);
  if (activity.ballTouches) parts.push(`${activity.ballTouches} touches`);
  if (activity.soccerMinutes) parts.push(`${activity.soccerMinutes} technical min`);
  if (Array.isArray(activity.exercises) && activity.exercises.length) {
    parts.push(`${activity.exercises.length} exercise${activity.exercises.length === 1 ? "" : "s"}`);
  }

  return parts.map(escapeHtml).join(" • ");
}

function renderStats() {
  const profile = getActiveProfile();
  const stats = calculateStats(profile);
  const goals = profile.goals || DEFAULT_GOALS;
  const levelInfo = getLevelInfo(stats.totalPoints);

  document.getElementById("totalPoints").textContent = stats.totalPoints;
  document.getElementById("levelSummary").textContent = `Level ${levelInfo.level} Athlete`;
  document.getElementById("statActivities").textContent = stats.totalTrainingDays;
  document.getElementById("statMinutes").textContent = stats.totalMinutes;
  document.getElementById("statMiles").textContent = roundOne(stats.totalMiles);
  document.getElementById("statTouches").textContent = stats.totalTouches;

  const statsProgressText = document.getElementById("statsLevelProgressText");
  const statsNextLevelText = document.getElementById("statsNextLevelText");
  const statsProgressFill = document.getElementById("statsLevelProgressFill");

  if (statsProgressText && statsNextLevelText && statsProgressFill) {
    statsProgressText.textContent = `${levelInfo.currentLevelPoints} / ${POINTS_PER_LEVEL} XP`;
    statsNextLevelText.textContent = `Next: Level ${levelInfo.nextLevel}`;
    statsProgressFill.style.width = `${levelInfo.percent}%`;
  }

  setProgress("goalPoints", stats.weeklyPoints, goals.weeklyPoints);
  setProgress("goalMinutes", stats.weeklyMinutes, goals.weeklyMinutes);
  setProgress("goalSoccer", stats.weeklySoccerSessions, goals.weeklySoccerSessions);
  setProgress("goalMiles", stats.weeklyRunningMiles, goals.weeklyRunningMiles);
}

function setProgress(prefix, value, goal) {
  const safeGoal = goal || 0;
  const percent = safeGoal > 0 ? Math.min((value / safeGoal) * 100, 100) : 0;

  document.getElementById(`${prefix}Text`).textContent = `${roundOne(value)} / ${roundOne(safeGoal)}`;
  document.getElementById(`${prefix}Fill`).style.width = `${percent}%`;
}

function renderAchievements() {
  const profile = getActiveProfile();
  const stats = calculateStats(profile);
  const container = document.getElementById("achievementGrid");

  container.innerHTML = ACHIEVEMENTS.map(achievement => {
    const unlocked = achievement.test(stats);

    return `
      <div class="achievement-item ${unlocked ? "" : "locked"}">
        <div>
          <div class="achievement-icon">${escapeHtml(achievement.icon)}</div>
          <div class="achievement-title">${escapeHtml(achievement.title)}</div>
          <div class="achievement-desc">${escapeHtml(achievement.desc)}</div>
        </div>
        <div class="pill ${unlocked ? "green" : ""}" style="align-self: flex-start; margin-top: 10px;">
          ${unlocked ? "Unlocked" : "Locked"}
        </div>
      </div>
    `;
  }).join("");
}

function renderBreakdown() {
  const profile = getActiveProfile();
  const container = document.getElementById("activityBreakdown");

  const types = [
    "Home Workout",
    "Gym Workout",
    "Running",
    "Outdoor Fitness",
    "Soccer Supplemental"
  ];

  if (!profile.activities.length) {
    container.innerHTML = `<div class="empty-state">Activity breakdown will appear after training is logged.</div>`;
    return;
  }

  container.innerHTML = types.map(type => {
    const items = profile.activities.filter(activity => activity.type === type);
    const points = items.reduce((sum, activity) => sum + toNumber(activity.points), 0);
    const minutes = items.reduce((sum, activity) => sum + toNumber(activity.duration), 0);

    return `
      <div class="activity-item">
        <div class="activity-top">
          <div>
            <div class="activity-name">${escapeHtml(type)}</div>
            <div class="activity-meta">${items.length} activities • ${minutes} min</div>
          </div>
          <div class="score-chip">${points} pts</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderProfiles() {
  const container = document.getElementById("profileList");

  container.innerHTML = state.profiles.map(profile => {
    const stats = calculateStats(profile);

    return `
      <div class="profile-item">
        <div class="activity-top">
          <div>
            <div class="activity-name">${escapeHtml(profile.name)}</div>
            <div class="activity-meta">
              ${stats.totalActivities} activities • ${stats.totalPoints} points • Level ${stats.level}
            </div>
          </div>
          <button class="mini-delete" type="button" onclick="deleteProfile('${profile.id}')">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderGoalInputs() {
  const profile = getActiveProfile();
  const goals = profile.goals || DEFAULT_GOALS;

  document.getElementById("goalWeeklyPoints").value = goals.weeklyPoints;
  document.getElementById("goalWeeklyMinutes").value = goals.weeklyMinutes;
  document.getElementById("goalWeeklySoccer").value = goals.weeklySoccerSessions;
  document.getElementById("goalWeeklyMiles").value = goals.weeklyRunningMiles;
}

function renderLastSaved() {
  const element = document.getElementById("lastSavedText");

  if (!state.lastSaved) {
    element.textContent = "Not saved yet";
    return;
  }

  element.textContent = new Date(state.lastSaved).toLocaleString();
}

function calculateStats(profile) {
  const activities = profile.activities || [];
  const now = new Date();
  const today = formatDateInput(now);
  const weekStart = getWeekStart(now);

  const totalPoints = activities.reduce((sum, activity) => sum + toNumber(activity.points), 0);
  const totalActivities = activities.length;
  const totalMinutes = activities.reduce((sum, activity) => sum + toNumber(activity.duration), 0);
  const totalMiles = activities.reduce((sum, activity) => sum + toNumber(activity.distanceMiles), 0);
  const totalTouches = activities.reduce((sum, activity) => sum + toNumber(activity.ballTouches), 0);
  const totalExercises = activities.reduce((sum, activity) => {
    return sum + (Array.isArray(activity.exercises) ? activity.exercises.length : 0);
  }, 0);

  const todayPoints = activities
    .filter(activity => activity.date === today)
    .reduce((sum, activity) => sum + toNumber(activity.points), 0);

  const weeklyActivities = activities.filter(activity => {
    const activityDate = parseLocalDate(activity.date);
    return activityDate >= weekStart && activityDate <= endOfDay(now);
  });

  const weeklyPoints = weeklyActivities.reduce((sum, activity) => sum + toNumber(activity.points), 0);
  const weeklyMinutes = weeklyActivities.reduce((sum, activity) => sum + toNumber(activity.duration), 0);
  const weeklySoccerSessions = weeklyActivities.filter(activity => activity.type === "Soccer Supplemental").length;
  const weeklyRunningMiles = weeklyActivities.reduce((sum, activity) => sum + toNumber(activity.distanceMiles), 0);

  const runningCount = activities.filter(activity => activity.type === "Running").length;
  const soccerCount = activities.filter(activity => activity.type === "Soccer Supplemental").length;
  const workoutCount = activities.filter(activity => {
    return activity.type === "Home Workout" || activity.type === "Gym Workout";
  }).length;

  const hardSessions = activities.filter(activity => activity.intensity === "Hard").length;

    const activityTypeCounts = {
    "Home Workout": activities.filter(activity => activity.type === "Home Workout").length,
    "Gym Workout": activities.filter(activity => activity.type === "Gym Workout").length,
    "Running": activities.filter(activity => activity.type === "Running").length,
    "Outdoor Fitness": activities.filter(activity => activity.type === "Outdoor Fitness").length,
    "Soccer Supplemental": activities.filter(activity => activity.type === "Soccer Supplemental").length
    };

    const activeDayKeys = new Set();
  const activeWeekKeys = new Set();
  const activeMonthKeys = new Set();

  activities.forEach(activity => {
    if (!activity.date) return;

    activeDayKeys.add(activity.date);
    activeWeekKeys.add(getWeekKey(activity.date));
    activeMonthKeys.add(activity.date.slice(0, 7));
  });

  const totalTrainingDays = activeDayKeys.size;
  const activeWeeks = activeWeekKeys.size;
  const activeMonths = activeMonthKeys.size;
  const streak = calculateStreak(activities);

  return {
    totalPoints,
    totalActivities,
    totalMinutes,
    totalMiles,
    totalTouches,
    totalExercises,
    todayPoints,
    weeklyPoints,
    weeklyMinutes,
    weeklySoccerSessions,
    weeklyRunningMiles,
    runningCount,
    soccerCount,
    workoutCount,
    hardSessions,
    activityTypeCounts,
    totalTrainingDays,
    activeWeeks,
    activeMonths,
    streak,
    level: calculateLevel(totalPoints)
  };
}

function calculateLevel(totalPoints) {
  return Math.max(1, Math.floor(totalPoints / POINTS_PER_LEVEL) + 1);
}

function calculateStreak(activities) {
  if (!activities.length) return 0;

  const dates = new Set(activities.map(activity => activity.date));
  let cursor = new Date();
  let streak = 0;

  while (true) {
    const key = formatDateInput(cursor);

    if (dates.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        const yesterdayKey = formatDateInput(cursor);

        if (dates.has(yesterdayKey)) {
          streak += 1;
          cursor.setDate(cursor.getDate() - 1);
          continue;
        }
      }

      break;
    }
  }

  return streak;
}

function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;

  d.setDate(d.getDate() - diff);
  return d;
}

function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatReadableDate(value) {
  const date = parseLocalDate(value);

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function roundOne(value) {
  const number = toNumber(value);
  return Math.round(number * 10) / 10;
}

function makeId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getLevelInfo(totalPoints) {
  const points = toNumber(totalPoints);
  const level = Math.floor(points / POINTS_PER_LEVEL) + 1;
  const currentLevelPoints = points % POINTS_PER_LEVEL;
  const nextLevel = level + 1;
  const percent = Math.min((currentLevelPoints / POINTS_PER_LEVEL) * 100, 100);

  return {
    level,
    nextLevel,
    currentLevelPoints,
    percent
  };
}

function getUnlockedAchievements(profile) {
  const stats = calculateStats(profile);
  return ACHIEVEMENTS.filter(achievement => achievement.test(stats));
}

function getUnlockedAchievementIds(profile) {
  return getUnlockedAchievements(profile).map(achievement => achievement.id);
}

function showAchievementPopup(achievement, unlockedCount) {
  const popup = document.getElementById("achievementPopup");
  const icon = document.getElementById("achievementPopupIcon");
  const title = document.getElementById("achievementPopupTitle");
  const desc = document.getElementById("achievementPopupDesc");

  if (!popup || !icon || !title || !desc) {
    return;
  }

  icon.textContent = achievement.icon;
  title.textContent = achievement.title;

  if (unlockedCount > 1) {
    desc.textContent = `${achievement.desc} Plus ${unlockedCount - 1} more achievement${unlockedCount - 1 === 1 ? "" : "s"} unlocked.`;
  } else {
    desc.textContent = achievement.desc;
  }

  popup.classList.add("show");

  window.clearTimeout(showAchievementPopup.timeout);
  showAchievementPopup.timeout = window.setTimeout(() => {
    popup.classList.remove("show");
  }, 3600);
}

/* ======================================================
   CELEBRATION SYSTEM
====================================================== */

function showCelebration(icon, title, text) {

  const overlay =
    document.getElementById("celebrationOverlay");

  document.getElementById("celebrationIcon").textContent =
    icon;

  document.getElementById("celebrationTitle").textContent =
    title;

  document.getElementById("celebrationText").textContent =
    text;

  overlay.classList.add("show");

  window.clearTimeout(showCelebration.timeout);

  showCelebration.timeout = window.setTimeout(() => {
    overlay.classList.remove("show");
  }, 3000);
}

/* ======================================================
   END CELEBRATION SYSTEM
====================================================== */

function getWeekKey(dateValue) {
  const date = parseLocalDate(dateValue);
  const weekStart = getWeekStart(date);

  return formatDateInput(weekStart);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        // App still works without offline caching.
      });
    });
  }
}