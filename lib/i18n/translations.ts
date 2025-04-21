export type Translation = {
  common: {
    appName: string;
    loading: string;
    error: string;
    success: string;
    next: string;
    back: string;
    submit: string;
    cancel: string;
    save: string;
    remove: string; // Изменено с delete на remove
    edit: string;
    view: string;
    search: string;
    filter: string;
    sort: string;
    all: string;
    none: string;
    signIn: string;
    signOut: string;
    tryAgain: string;
    seeResults: string;
    nextQuestion: string;
    correct: string;
    incorrect: string;
    timeUp: string;
    points: string;
    seconds: string;
    question: string;
    of: string;
    score: string;
    total: string;
    category: string;
    categories: string;
    difficulty: string;
    easy: string;
    medium: string;
    hard: string;
    mixed: string;
    players: string;
    quizzes: string;
    leaderboard: string;
    profile: string;
    settings: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
    generating: string;
    returnToCategories: string;
    mind: string; // Добавлено новое свойство
  };
  nav: {
    home: string;
    categories: string;
    leaderboard: string;
    profile: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      startQuiz: string;
      explore: string;
      joinUsers: string;
    };
    features: {
      title: string;
      subtitle: string;
      timeScoring: {
        title: string;
        description: string;
      };
      leaderboards: {
        title: string;
        description: string;
      };
      multiplayer: {
        title: string;
        description: string;
      };
      adaptive: {
        title: string;
        description: string;
      };
    };
    stats: {
      activeUsers: string;
      quizzesCompleted: string;
      categories: string;
      satisfactionRate: string;
    };
    categories: {
      title: string;
      subtitle: string;
      viewAll: string;
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    cta: {
      title: string;
      subtitle: string;
      startQuizzing: string;
      viewLeaderboards: string;
    };
  };
  categories: {
    title: string;
    subtitle: string;
    startQuiz: string;
    timeLimit: string;
    players: string;
    difficulty: string;
    selectCategory: string;
    selectDifficulty: string;
  };
  quiz: {
    timeLeft: string;
    questionOf: string;
    quizResults: string;
    yourScore: string;
    correctAnswers: string;
    questionSummary: string;
    yourAnswer: string;
    correctAnswer: string;
    tryAgain: string;
    viewLeaderboard: string;
    timesUp: string;
    noAnswer: string;
    aiGenerated: string;
    generateNewQuestions: string;
    aiDescription: string;
    quizCompleted: string;
    scoreInSeconds: string;
    questionsCorrectly: string;
    errorLoadingQuestions: string;
    errorLoadingQuiz: string;
    timeBonus: string;
    didntAnswerInTime: string;
  };
  leaderboard: {
    title: string;
    subtitle: string;
    daily: string;
    weekly: string;
    monthly: string;
    allTime: string;
    searchPlayers: string;
    topPlayers: string;
    highestScoring: string;
    rank: string;
    player: string;
    score: string;
    noPlayers: string;
    yourStats: string;
    yourRank: string;
    totalScore: string;
    quizzesCompleted: string;
    fromYesterday: string;
    thisWeek: string;
    correctAnswers: string;
  };
  profile: {
    overview: string;
    badges: string;
    statistics: string;
    activity: string;
    recentActivity: string;
    recentActivityDesc: string;
    topBadges: string;
    topBadgesDesc: string;
    viewAllBadges: string;
    viewAllActivity: string;
    categoryPerformance: string;
    categoryPerformanceDesc: string;
    correctVsIncorrect: string;
    yourBadges: string;
    yourBadgesDesc: string;
    notYetEarned: string;
    quizStatistics: string;
    quizStatisticsDesc: string;
    quizzesTaken: string;
    averageScore: string;
    totalPoints: string;
    perfectScores: string;
    monthlyActivity: string;
    monthlyActivityDesc: string;
    activityLog: string;
    activityLogDesc: string;
    filterByDate: string;
    loadMore: string;
    editProfile: string;
    level: string;
    xp: string;
    levelProgress: string;
  };
  footer: {
    rights: string;
    aboutUs: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  errors: {
    categoryRequired: string;
    difficultyRequired: string;
    failedToGenerate: string;
    invalidData: string;
    invalidQuestions: string;
    parseError: string;
    aiError: string;
  };
};