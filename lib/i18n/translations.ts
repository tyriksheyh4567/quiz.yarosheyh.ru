export type Translation = {
  common: {
    appName: string
    loading: string
    error: string
    success: string
    next: string
    back: string
    submit: string
    cancel: string
    save: string
    delete: string
    edit: string
    view: string
    search: string
    filter: string
    sort: string
    all: string
    none: string
    signIn: string
    signOut: string
    tryAgain: string
    seeResults: string
    nextQuestion: string
    correct: string
    incorrect: string
    timeUp: string
    points: string
    seconds: string
    question: string
    of: string
    score: string
    total: string
    category: string
    categories: string
    difficulty: string
    easy: string
    medium: string
    hard: string
    mixed: string
    players: string
    quizzes: string
    leaderboard: string
    profile: string
    settings: string
    language: string
    theme: string
    light: string
    dark: string
    system: string
    generating: string
    returnToCategories: string
  }
  nav: {
    home: string
    categories: string
    leaderboard: string
    profile: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      startQuiz: string
      explore: string
      joinUsers: string
    }
    features: {
      title: string
      subtitle: string
      timeScoring: {
        title: string
        description: string
      }
      leaderboards: {
        title: string
        description: string
      }
      multiplayer: {
        title: string
        description: string
      }
      adaptive: {
        title: string
        description: string
      }
    }
    stats: {
      activeUsers: string
      quizzesCompleted: string
      categories: string
      satisfactionRate: string
    }
    categories: {
      title: string
      subtitle: string
      viewAll: string
    }
    testimonials: {
      title: string
      subtitle: string
    }
    cta: {
      title: string
      subtitle: string
      startQuizzing: string
      viewLeaderboards: string
    }
  }
  categories: {
    title: string
    subtitle: string
    startQuiz: string
    timeLimit: string
    players: string
    difficulty: string
    selectCategory: string
    selectDifficulty: string
  }
  quiz: {
    timeLeft: string
    questionOf: string
    quizResults: string
    yourScore: string
    correctAnswers: string
    questionSummary: string
    yourAnswer: string
    correctAnswer: string
    tryAgain: string
    viewLeaderboard: string
    timesUp: string
    noAnswer: string
    aiGenerated: string
    generateNewQuestions: string
    aiDescription: string
    quizCompleted: string
    scoreInSeconds: string
    questionsCorrectly: string
    errorLoadingQuestions: string
    errorLoadingQuiz: string
    timeBonus: string
    didntAnswerInTime: string
  }
  leaderboard: {
    title: string
    subtitle: string
    daily: string
    weekly: string
    monthly: string
    allTime: string
    searchPlayers: string
    topPlayers: string
    highestScoring: string
    rank: string
    player: string
    score: string
    noPlayers: string
    yourStats: string
    yourRank: string
    totalScore: string
    quizzesCompleted: string
    fromYesterday: string
    thisWeek: string
    correctAnswers: string
  }
  profile: {
    overview: string
    badges: string
    statistics: string
    activity: string
    recentActivity: string
    recentActivityDesc: string
    topBadges: string
    topBadgesDesc: string
    viewAllBadges: string
    viewAllActivity: string
    categoryPerformance: string
    categoryPerformanceDesc: string
    correctVsIncorrect: string
    yourBadges: string
    yourBadgesDesc: string
    notYetEarned: string
    quizStatistics: string
    quizStatisticsDesc: string
    quizzesTaken: string
    averageScore: string
    totalPoints: string
    perfectScores: string
    monthlyActivity: string
    monthlyActivityDesc: string
    activityLog: string
    activityLogDesc: string
    filterByDate: string
    loadMore: string
    editProfile: string
    level: string
    xp: string
    levelProgress: string
  }
  footer: {
    rights: string
    aboutUs: string
    contact: string
    privacy: string
    terms: string
  }
  errors: {
    categoryRequired: string
    difficultyRequired: string
    failedToGenerate: string
    invalidData: string
    invalidQuestions: string
    parseError: string
    aiError: string
  }
}

export const en: Translation = {
  common: {
    appName: "QuizWhiz",
    loading: "Loading",
    error: "Error",
    success: "Success",
    next: "Next",
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    all: "All",
    none: "None",
    signIn: "Sign In",
    signOut: "Sign Out",
    tryAgain: "Try Again",
    seeResults: "See Results",
    nextQuestion: "Next Question",
    correct: "Correct!",
    incorrect: "Incorrect!",
    timeUp: "Time's up!",
    points: "points",
    seconds: "s",
    question: "Question",
    of: "of",
    score: "Score",
    total: "Total",
    category: "Category",
    categories: "Categories",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    mixed: "Mixed",
    players: "players",
    quizzes: "quizzes",
    leaderboard: "Leaderboard",
    profile: "Profile",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    generating: "Generating...",
    returnToCategories: "Return to Categories",
  },
  nav: {
    home: "Home",
    categories: "Categories",
    leaderboard: "Leaderboard",
    profile: "Profile",
  },
  home: {
    hero: {
      title: "Challenge Your Mind",
      subtitle:
        "Test your knowledge, compete with friends, and learn something new with our interactive quiz platform.",
      startQuiz: "Start Quizzing",
      explore: "Explore",
      joinUsers: "Join 10,000+ users already challenging their minds",
    },
    features: {
      title: "Why Choose QuizWhiz",
      subtitle: "Discover why thousands of users love our interactive quiz platform",
      timeScoring: {
        title: "Time-Based Scoring",
        description: "Answer quickly for higher scores. Every second counts in our dynamic scoring system!",
      },
      leaderboards: {
        title: "Global Leaderboards",
        description: "Compete with players worldwide and climb the rankings to become the ultimate quiz champion.",
      },
      multiplayer: {
        title: "Multiplayer Mode",
        description: "Challenge friends to real-time quiz battles and see who has the quickest mind.",
      },
      adaptive: {
        title: "Adaptive Difficulty",
        description: "Questions adjust to your skill level for the perfect challenge every time you play.",
      },
    },
    stats: {
      activeUsers: "Active Users",
      quizzesCompleted: "Quizzes Completed",
      categories: "Categories",
      satisfactionRate: "Satisfaction Rate",
    },
    categories: {
      title: "Explore Quiz Categories",
      subtitle: "Dive into a world of knowledge with our diverse quiz categories",
      viewAll: "View All Categories",
    },
    testimonials: {
      title: "What Our Users Say",
      subtitle: "Join thousands of satisfied QuizWhiz users",
    },
    cta: {
      title: "Ready to Challenge Your Mind?",
      subtitle:
        "Join thousands of users and start your quiz journey today. Test your knowledge, compete with friends, and learn something new!",
      startQuizzing: "Start Quizzing Now",
      viewLeaderboards: "View Leaderboards",
    },
  },
  categories: {
    title: "Choose a Quiz Category",
    subtitle: "Select from a variety of topics and challenge yourself!",
    startQuiz: "Start Quiz",
    timeLimit: "min",
    players: "players",
    difficulty: "Difficulty",
    selectCategory: "Select a category",
    selectDifficulty: "Select difficulty",
  },
  quiz: {
    timeLeft: "s",
    questionOf: "Question",
    quizResults: "Quiz Results",
    yourScore: "points",
    correctAnswers: "You answered",
    questionSummary: "Question Summary",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer",
    tryAgain: "Try Again",
    viewLeaderboard: "View Leaderboard",
    timesUp: "Time's up!",
    noAnswer: "No answer",
    aiGenerated: "AI Generated Questions",
    generateNewQuestions: "Generate New Questions",
    aiDescription: "Create unique quizzes powered by artificial intelligence",
    quizCompleted: "Quiz Completed!",
    scoreInSeconds: "You scored {score} points in {time} seconds.",
    questionsCorrectly: "questions correctly",
    errorLoadingQuestions: "Error loading questions",
    errorLoadingQuiz: "Error loading quiz",
    timeBonus: "including {bonus} time bonus",
    didntAnswerInTime: "You didn't answer in time.",
  },
  leaderboard: {
    title: "Leaderboard",
    subtitle: "See who's topping the charts and challenge yourself to climb the rankings!",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    allTime: "All Time",
    searchPlayers: "Search players...",
    topPlayers: "Top Players",
    highestScoring: "The highest scoring quiz champions",
    rank: "Rank",
    player: "Player",
    score: "Score",
    noPlayers: "No players found matching your search.",
    yourStats: "Your Stats",
    yourRank: "Your Rank",
    totalScore: "Total Score",
    quizzesCompleted: "Quizzes Completed",
    fromYesterday: "from yesterday",
    thisWeek: "this week",
    correctAnswers: "correct answers",
  },
  profile: {
    overview: "Overview",
    badges: "Badges",
    statistics: "Statistics",
    activity: "Activity",
    recentActivity: "Recent Activity",
    recentActivityDesc: "Your latest quiz results and achievements",
    topBadges: "Top Badges",
    topBadgesDesc: "Achievements you've unlocked",
    viewAllBadges: "View All Badges",
    viewAllActivity: "View All Activity",
    categoryPerformance: "Category Performance",
    categoryPerformanceDesc: "How well you're doing in different quiz categories",
    correctVsIncorrect: "Correct vs. Incorrect Answers",
    yourBadges: "Your Badges",
    yourBadgesDesc: "Achievements and milestones you've reached",
    notYetEarned: "Not yet earned",
    quizStatistics: "Quiz Statistics",
    quizStatisticsDesc: "Your overall quiz performance",
    quizzesTaken: "Quizzes Taken",
    averageScore: "Average Score",
    totalPoints: "Total Points",
    perfectScores: "Perfect Scores",
    monthlyActivity: "Monthly Activity",
    monthlyActivityDesc: "Number of quizzes taken each month",
    activityLog: "Activity Log",
    activityLogDesc: "Your complete quiz history and achievements",
    filterByDate: "Filter by Date",
    loadMore: "Load More",
    editProfile: "Edit Profile",
    level: "Level",
    xp: "XP",
    levelProgress: "Level Progress",
  },
  footer: {
    rights: "All rights reserved.",
    aboutUs: "About Us",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  errors: {
    categoryRequired: "Category and difficulty are required",
    difficultyRequired: "Please select a category and difficulty",
    failedToGenerate: "Failed to generate questions",
    invalidData: "Received invalid data",
    invalidQuestions: "Failed to create valid questions",
    parseError: "Failed to process AI response",
    aiError: "Error generating questions",
  },
}

export const ru: Translation = {
  common: {
    appName: "КвизУиз",
    loading: "Загрузка",
    error: "Ошибка",
    success: "Успех",
    next: "Далее",
    back: "Назад",
    submit: "Отправить",
    cancel: "Отмена",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Редактировать",
    view: "Просмотр",
    search: "Поиск",
    filter: "Фильтр",
    sort: "Сортировка",
    all: "Все",
    none: "Ничего",
    signIn: "Войти",
    signOut: "Выйти",
    tryAgain: "Попробовать снова",
    seeResults: "Посмотреть результаты",
    nextQuestion: "Следующий вопрос",
    correct: "Правильно!",
    incorrect: "Неправильно!",
    timeUp: "Время вышло!",
    points: "очков",
    seconds: "с",
    question: "Вопрос",
    of: "из",
    score: "Счет",
    total: "Всего",
    category: "Категория",
    categories: "Категории",
    difficulty: "Сложность",
    easy: "Легкий",
    medium: "Средний",
    hard: "Сложный",
    mixed: "Смешанный",
    players: "игроков",
    quizzes: "викторин",
    leaderboard: "Таблица лидеров",
    profile: "Профиль",
    settings: "Настройки",
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    generating: "Генерация...",
    returnToCategories: "Вернуться к категориям",
  },
  nav: {
    home: "Главная",
    categories: "Категории",
    leaderboard: "Таблица лидеров",
    profile: "Профиль",
  },
  home: {
    hero: {
      title: "Испытай свой разум",
      subtitle:
        "Проверь свои знания, соревнуйся с друзьями и узнавай новое с нашей интерактивной платформой для викторин.",
      startQuiz: "Начать викторину",
      explore: "Исследовать",
      joinUsers: "Присоединяйтесь к 10,000+ пользователей, уже испытывающих свой разум",
    },
    features: {
      title: "Почему выбирают КвизУиз",
      subtitle: "Узнайте, почему тысячи пользователей любят нашу интерактивную платформу для викторин",
      timeScoring: {
        title: "Счет на основе времени",
        description:
          "Отвечайте быстрее для получения большего количества очков. Каждая секунда имеет значение в нашей динамической системе подсчета очков!",
      },
      leaderboards: {
        title: "Глобальные таблицы лидеров",
        description:
          "Соревнуйтесь с игроками по всему миру и поднимайтесь в рейтинге, чтобы стать непревзойденным чемпионом викторин.",
      },
      multiplayer: {
        title: "Многопользовательский режим",
        description: "Бросьте вызов друзьям в викторинах в реальном времени и узнайте, у кого самый быстрый ум.",
      },
      adaptive: {
        title: "Адаптивная сложность",
        description: "Вопросы адаптируются к вашему уровню навыков для идеального вызова каждый раз, когда вы играете.",
      },
    },
    stats: {
      activeUsers: "Активных пользователей",
      quizzesCompleted: "Завершенных викторин",
      categories: "Категорий",
      satisfactionRate: "Уровень удовлетворенности",
    },
    categories: {
      title: "Исследуйте категории викторин",
      subtitle: "Погрузитесь в мир знаний с нашими разнообразными категориями викторин",
      viewAll: "Просмотреть все категории",
    },
    testimonials: {
      title: "Что говорят наши пользователи",
      subtitle: "Присоединяйтесь к тысячам довольных пользователей КвизУиз",
    },
    cta: {
      title: "Готовы испытать свой разум?",
      subtitle:
        "Присоединяйтесь к тысячам пользователей и начните свое путешествие по викторинам уже сегодня. Проверьте свои знания, соревнуйтесь с друзьями и узнавайте что-то новое!",
      startQuizzing: "Начать викторину сейчас",
      viewLeaderboards: "Просмотреть таблицы лидеров",
    },
  },
  categories: {
    title: "Выберите категорию викторины",
    subtitle: "Выберите из различных тем и бросьте себе вызов!",
    startQuiz: "Начать викторину",
    timeLimit: "мин",
    players: "игроков",
    difficulty: "Сложность",
    selectCategory: "Выберите категорию",
    selectDifficulty: "Выберите сложность",
  },
  quiz: {
    timeLeft: "с",
    questionOf: "Вопрос",
    quizResults: "Результаты викторины",
    yourScore: "очков",
    correctAnswers: "Вы ответили правильно на",
    questionSummary: "Сводка вопросов",
    yourAnswer: "Ваш ответ",
    correctAnswer: "Правильный ответ",
    tryAgain: "Попробовать снова",
    viewLeaderboard: "Просмотреть таблицу лидеров",
    timesUp: "Время вышло!",
    noAnswer: "Нет ответа",
    aiGenerated: "Вопросы, сгенерированные ИИ",
    generateNewQuestions: "Сгенерировать новые вопросы",
    aiDescription: "Создавайте уникальные викторины с помощью искусственного интеллекта",
    quizCompleted: "Викторина завершена!",
    scoreInSeconds: "Вы набрали {score} очков за {time} секунд.",
    questionsCorrectly: "вопросов правильно",
    errorLoadingQuestions: "Ошибка загрузки вопросов",
    errorLoadingQuiz: "Ошибка при загрузке викторины",
    timeBonus: "включая {bonus} бонус за время",
    didntAnswerInTime: "Вы не ответили вовремя.",
  },
  leaderboard: {
    title: "Таблица лидеров",
    subtitle: "Посмотрите, кто возглавляет чарты, и бросьте себе вызов, чтобы подняться в рейтинге!",
    daily: "Ежедневно",
    weekly: "Еженедельно",
    monthly: "Ежемесячно",
    allTime: "За все время",
    searchPlayers: "Поиск игроков...",
    topPlayers: "Лучшие игроки",
    highestScoring: "Чемпионы викторин с самыми высокими баллами",
    rank: "Ранг",
    player: "Игрок",
    score: "Счет",
    noPlayers: "Не найдено игроков, соответствующих вашему поиску.",
    yourStats: "Ваша статистика",
    yourRank: "Ваш ранг",
    totalScore: "Общий счет",
    quizzesCompleted: "Завершенных викторин",
    fromYesterday: "со вчерашнего дня",
    thisWeek: "на этой неделе",
    correctAnswers: "правильных ответов",
  },
  profile: {
    overview: "Обзор",
    badges: "Значки",
    statistics: "Статистика",
    activity: "Активность",
    recentActivity: "Недавняя активность",
    recentActivityDesc: "Ваши последние результаты викторин и достижения",
    topBadges: "Лучшие значки",
    topBadgesDesc: "Достижения, которые вы разблокировали",
    viewAllBadges: "Просмотреть все значки",
    viewAllActivity: "Просмотреть всю активность",
    categoryPerformance: "Производительность по категориям",
    categoryPerformanceDesc: "Насколько хорошо вы справляетесь в различных категориях викторин",
    correctVsIncorrect: "Правильные vs. Неправильные ответы",
    yourBadges: "Ваши значки",
    yourBadgesDesc: "Достижения и вехи, которых вы достигли",
    notYetEarned: "Еще не заработано",
    quizStatistics: "Статистика викторин",
    quizStatisticsDesc: "Ваша общая производительность в викторинах",
    quizzesTaken: "Пройденных викторин",
    averageScore: "Средний счет",
    totalPoints: "Всего очков",
    perfectScores: "Идеальных счетов",
    monthlyActivity: "Ежемесячная активность",
    monthlyActivityDesc: "Количество пройденных викторин каждый месяц",
    activityLog: "Журнал активности",
    activityLogDesc: "Ваша полная история викторин и достижений",
    filterByDate: "Фильтр по дате",
    loadMore: "Загрузить еще",
    editProfile: "Редактировать профиль",
    level: "Уровень",
    xp: "Опыт",
    levelProgress: "Прогресс уровня",
  },
  footer: {
    rights: "Все права защищены.",
    aboutUs: "О нас",
    contact: "Контакты",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
  },
  errors: {
    categoryRequired: "Категория и сложность обязательны",
    difficultyRequired: "Пожалуйста, выберите категорию и сложность",
    failedToGenerate: "Не удалось сгенерировать вопросы",
    invalidData: "Получены некорректные данные",
    invalidQuestions: "Не удалось создать корректные вопросы",
    parseError: "Не удалось обработать ответ от ИИ",
    aiError: "Ошибка при генерации вопросов",
  },
}
