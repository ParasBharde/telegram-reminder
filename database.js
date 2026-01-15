// Simple in-memory database
// In production, use MongoDB or PostgreSQL

function getProgress(chatId) {
  if (!global.userData[chatId]) {
    return {
      completedDays: [],
      streak: 0,
      totalProblems: 0
    };
  }
  
  return {
    completedDays: global.userData[chatId].completedDays || [],
    streak: global.userData[chatId].streak || 0,
    totalProblems: global.userData[chatId].totalProblems || 0
  };
}

function saveProgress(chatId, day) {
  if (!global.userData[chatId]) {
    global.userData[chatId] = {
      chatId: chatId,
      completedDays: [],
      streak: 0,
      totalProblems: 0
    };
  }
  
  const user = global.userData[chatId];
  
  // Add day if not already completed
  if (!user.completedDays.includes(day)) {
    user.completedDays.push(day);
    user.completedDays.sort((a, b) => a - b); // Keep sorted
    
    // Increment streak
    user.streak++;
    
    // Add 2 problems (assuming 2 per day)
    user.totalProblems += 2;
  }
  
  return user;
}

function updateStreak(chatId, newStreak) {
  if (global.userData[chatId]) {
    global.userData[chatId].streak = newStreak;
  }
}

function getLeaderboard() {
  const users = Object.values(global.userData);
  
  // Sort by streak, then by total problems
  users.sort((a, b) => {
    if (b.streak !== a.streak) {
      return b.streak - a.streak;
    }
    return b.totalProblems - a.totalProblems;
  });
  
  return users;
}

module.exports = {
  getProgress,
  saveProgress,
  updateStreak,
  getLeaderboard
};