require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { dsaSchedule, getCurrentDay, getDayInfo } = require('./schedule');
const { formatDailyMessage, formatStatsMessage, formatProgressMessage } = require('./formatter');
const { saveProgress, getProgress, updateStreak, getLeaderboard } = require('./database');

// Initialize bot
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 DSA Reminder Bot Started!');
console.log('📅 Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);

// Store user data (In production, use a real database)
global.userData = {};

// ============================================
// CRON JOBS - Scheduled Messages
// ============================================

// Morning Reminder - 9:00 AM IST (3:30 AM UTC)
cron.schedule('30 3 * * *', () => {
  console.log('⏰ Running morning reminder...');
  sendMorningReminder();
}, {
  timezone: "Asia/Kolkata"
});

// Evening Reminder - 7:00 PM IST (13:30 UTC)
cron.schedule('30 13 * * *', () => {
  console.log('⏰ Running evening reminder...');
  sendEveningReminder();
}, {
  timezone: "Asia/Kolkata"
});

// Midnight Streak Check - 11:59 PM IST
cron.schedule('59 23 * * *', () => {
  console.log('⏰ Running streak check...');
  checkAndResetStreaks();
}, {
  timezone: "Asia/Kolkata"
});

// Sunday Weekly Summary - 8:00 PM
cron.schedule('0 20 * * 0', () => {
  console.log('📊 Sending weekly summary...');
  sendWeeklySummary();
}, {
  timezone: "Asia/Kolkata"
});

// ============================================
// SCHEDULED MESSAGE FUNCTIONS
// ============================================

function sendMorningReminder() {
  const users = Object.keys(global.userData);
  const currentDay = getCurrentDay();
  const message = formatDailyMessage(currentDay);
  
  users.forEach(chatId => {
    bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: true 
    }).catch(err => {
      console.error(`Failed to send to ${chatId}:`, err.message);
    });
  });
  
  console.log(`✅ Sent morning reminder to ${users.length} users`);
}

function sendEveningReminder() {
  const users = Object.keys(global.userData);
  
  users.forEach(chatId => {
    const progress = getProgress(chatId);
    const currentDay = getCurrentDay();
    
    if (!progress.completedDays.includes(currentDay)) {
      bot.sendMessage(
        chatId,
        `⏰ *Evening Reminder*\n\nHave you completed today's DSA problems?\n\n` +
        `Reply /done if yes, or get back to it! 💪\n\n` +
        `Don't break your ${progress.streak} day streak! 🔥`,
        { parse_mode: 'Markdown' }
      ).catch(err => console.error(`Evening reminder failed: ${err.message}`));
    }
  });
  
  console.log(`✅ Sent evening reminder check`);
}

function checkAndResetStreaks() {
  const users = Object.keys(global.userData);
  const currentDay = getCurrentDay();
  
  users.forEach(chatId => {
    const progress = getProgress(chatId);
    
    if (!progress.completedDays.includes(currentDay)) {
      updateStreak(chatId, 0); // Reset streak
      
      bot.sendMessage(
        chatId,
        `😔 Your ${progress.streak} day streak was reset because you missed today.\n\n` +
        `Don't worry! Start fresh tomorrow! 💪`,
        { parse_mode: 'Markdown' }
      ).catch(err => console.error(`Streak reset message failed: ${err.message}`));
    }
  });
}

function sendWeeklySummary() {
  const users = Object.keys(global.userData);
  const currentDay = getCurrentDay();
  const weekNumber = Math.ceil(currentDay / 7);
  
  users.forEach(chatId => {
    const progress = getProgress(chatId);
    const weekStart = (weekNumber - 1) * 7 + 1;
    const weekEnd = Math.min(weekNumber * 7, 90);
    
    const weekCompleted = progress.completedDays.filter(
      day => day >= weekStart && day <= weekEnd
    ).length;
    
    const message = `
📊 *Week ${weekNumber} Summary*

✅ Days completed: ${weekCompleted}/7
🔥 Current streak: ${progress.streak} days
📝 Total problems: ${progress.totalProblems}
📈 Overall progress: ${progress.completedDays.length}/90 days

${weekCompleted === 7 ? '🎉 Perfect week! Amazing work!' : '💪 Keep pushing! You got this!'}

See you next week! 🚀
    `;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
      .catch(err => console.error(`Weekly summary failed: ${err.message}`));
  });
}

// ============================================
// BOT COMMANDS
// ============================================

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'there';
  
  // Initialize user
  if (!global.userData[chatId]) {
    global.userData[chatId] = {
      chatId: chatId,
      name: userName,
      joinedAt: new Date(),
      completedDays: [],
      streak: 0,
      totalProblems: 0
    };
  }
  
  const welcomeMessage = `
🎉 *Welcome to DSA Daily Challenge!* 🎉

Hi ${userName}! 👋

I'll help you master Data Structures & Algorithms in 90 days!

*What I'll do:*
📅 Send daily problems at 9 AM
⏰ Evening reminder at 7 PM
📊 Track your progress & streak
🏆 Weekly leaderboard

*Available Commands:*
/today - Get today's problems
/done - Mark today as complete
/progress - Check your stats
/stats - Detailed statistics
/leaderboard - See top performers
/help - Show all commands

*Your Chat ID:* \`${chatId}\`

Let's crush DSA together! 💪🔥
  `;
  
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
  
  // Send today's problems immediately
  setTimeout(() => {
    const currentDay = getCurrentDay();
    const message = formatDailyMessage(currentDay);
    bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: true 
    });
  }, 2000);
});

// /today command
bot.onText(/\/today/, (msg) => {
  const chatId = msg.chat.id;
  const currentDay = getCurrentDay();
  
  if (currentDay > 90) {
    bot.sendMessage(
      chatId,
      "🎉 Congratulations! You've completed the 90-day challenge!\n\n" +
      "Keep practicing to maintain your skills! 💪"
    );
    return;
  }
  
  const message = formatDailyMessage(currentDay);
  bot.sendMessage(chatId, message, { 
    parse_mode: 'Markdown',
    disable_web_page_preview: true 
  });
});

// /done command
bot.onText(/\/done/, (msg) => {
  const chatId = msg.chat.id;
  const currentDay = getCurrentDay();
  
  if (!global.userData[chatId]) {
    bot.sendMessage(chatId, "Please use /start first to begin tracking!");
    return;
  }
  
  const progress = getProgress(chatId);
  
  // Check if already completed today
  if (progress.completedDays.includes(currentDay)) {
    bot.sendMessage(
      chatId,
      `✅ You've already marked Day ${currentDay} as complete!\n\n` +
      `Great consistency! 🔥`
    );
    return;
  }
  
  // Mark as complete
  saveProgress(chatId, currentDay);
  const updatedProgress = getProgress(chatId);
  
  const dayInfo = getDayInfo(currentDay);
  const problemCount = dayInfo ? dayInfo.problems.length : 2;
  
  const completionMessage = `
✅ *Day ${currentDay} Complete!*

🔥 Streak: ${updatedProgress.streak} days
📝 Total Problems: ${updatedProgress.totalProblems}
📈 Progress: ${updatedProgress.completedDays.length}/90 days (${Math.round(updatedProgress.completedDays.length / 90 * 100)}%)

${updatedProgress.streak === 7 ? '🎉 1 Week Streak!' : ''}
${updatedProgress.streak === 30 ? '🏆 30 Day Streak! Incredible!' : ''}
${updatedProgress.streak === 60 ? '🔥 60 Day Streak! You\'re unstoppable!' : ''}
${updatedProgress.streak === 90 ? '👑 90 Day Streak! LEGEND STATUS!' : ''}

Keep crushing it! 💪
  `;
  
  bot.sendMessage(chatId, completionMessage, { parse_mode: 'Markdown' });
  
  // Fun milestone messages
  if (updatedProgress.completedDays.length === 10) {
    setTimeout(() => {
      bot.sendMessage(chatId, "🎉 10 days completed! You're building momentum!");
    }, 2000);
  }
  
  if (updatedProgress.completedDays.length === 45) {
    setTimeout(() => {
      bot.sendMessage(chatId, "🏆 Halfway there! 45/90 days! Amazing progress!");
    }, 2000);
  }
});

// /progress command
bot.onText(/\/progress/, (msg) => {
  const chatId = msg.chat.id;
  
  if (!global.userData[chatId]) {
    bot.sendMessage(chatId, "Please use /start first!");
    return;
  }
  
  const message = formatProgressMessage(chatId);
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// /stats command
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  
  if (!global.userData[chatId]) {
    bot.sendMessage(chatId, "Please use /start first!");
    return;
  }
  
  const message = formatStatsMessage(chatId);
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// /leaderboard command
bot.onText(/\/leaderboard/, (msg) => {
  const chatId = msg.chat.id;
  const leaderboard = getLeaderboard();
  
  if (leaderboard.length === 0) {
    bot.sendMessage(chatId, "No data yet! Be the first to complete a day!");
    return;
  }
  
  let message = `🏆 *Leaderboard - Top 10*\n\n`;
  
  leaderboard.slice(0, 10).forEach((user, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    message += `${medal} *${user.name}*\n`;
    message += `   🔥 ${user.streak} days | 📝 ${user.totalProblems} problems\n\n`;
  });
  
  // Show current user's rank
  const userRank = leaderboard.findIndex(u => u.chatId === chatId) + 1;
  if (userRank > 10) {
    const userProgress = getProgress(chatId);
    message += `\n📍 *Your Rank:* #${userRank}\n`;
    message += `   🔥 ${userProgress.streak} days | 📝 ${userProgress.totalProblems} problems\n`;
  }
  
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `
📚 *Available Commands:*

/today - Get today's DSA problems
/done - Mark today as complete
/progress - Check your progress
/stats - Detailed statistics
/leaderboard - See rankings
/skip - Skip today (breaks streak!)
/reset - Reset your progress
/schedule - View full 90-day schedule
/help - Show this message

*Reminders:*
🌅 Morning: 9:00 AM IST
🌆 Evening: 7:00 PM IST
📊 Weekly Summary: Sundays 8:00 PM

*Need help?*
Just ask! I'm here to support you! 💪
  `;
  
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// /skip command
bot.onText(/\/skip/, (msg) => {
  const chatId = msg.chat.id;
  const currentDay = getCurrentDay();
  
  bot.sendMessage(
    chatId,
    `⚠️ Are you sure you want to skip Day ${currentDay}?\n\n` +
    `This will break your streak!\n\n` +
    `Reply /confirm_skip to proceed or /today to solve problems instead.`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/confirm_skip/, (msg) => {
  const chatId = msg.chat.id;
  updateStreak(chatId, 0);
  
  bot.sendMessage(
    chatId,
    `Day skipped. Your streak has been reset to 0.\n\n` +
    `Tomorrow is a fresh start! 💪`
  );
});

// /reset command
bot.onText(/\/reset/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(
    chatId,
    `⚠️ *WARNING*\n\nThis will delete ALL your progress!\n\n` +
    `Are you absolutely sure?\n\n` +
    `Reply /confirm_reset to proceed.`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/confirm_reset/, (msg) => {
  const chatId = msg.chat.id;
  
  global.userData[chatId] = {
    chatId: chatId,
    name: msg.from.first_name || 'User',
    joinedAt: new Date(),
    completedDays: [],
    streak: 0,
    totalProblems: 0
  };
  
  bot.sendMessage(
    chatId,
    `✅ Progress reset complete.\n\n` +
    `Ready for a fresh start! Use /today to begin. 🚀`
  );
});

// /schedule command
bot.onText(/\/schedule/, (msg) => {
  const chatId = msg.chat.id;
  const currentDay = getCurrentDay();
  const weekNumber = Math.ceil(currentDay / 7);
  
  let message = `📅 *90-Day Schedule*\n\n`;
  message += `Current: Day ${currentDay}, Week ${weekNumber}\n\n`;
  
  const weekSchedule = {
    1: "Arrays & Two Pointer",
    2: "Linked Lists & Stacks",
    3: "Trees & BST",
    4: "Graphs & DFS/BFS",
    5: "Dynamic Programming 1D",
    6: "Dynamic Programming 2D",
    7: "Backtracking",
    8: "Heaps & Priority Queue",
    9: "Binary Search & Sorting",
    10: "Advanced Topics",
    11: "Company-Specific Problems",
    12: "Mock Interviews & Revision"
  };
  
  for (let week = 1; week <= 12; week++) {
    const emoji = week === weekNumber ? '👉' : week < weekNumber ? '✅' : '📌';
    message += `${emoji} Week ${week}: ${weekSchedule[week]}\n`;
  }
  
  message += `\n📖 Full schedule: github.com/your-repo`;
  
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Handle unknown commands
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  
  // Check for keywords
  const text = msg.text.toLowerCase();
  
  if (text.includes('help') || text.includes('commands')) {
    bot.sendMessage(msg.chat.id, "Type /help to see all available commands! 😊");
  } else if (text.includes('today') || text.includes('problem')) {
    bot.sendMessage(msg.chat.id, "Use /today to get today's problems! 📚");
  } else if (text.includes('done') || text.includes('complete')) {
    bot.sendMessage(msg.chat.id, "Use /done to mark today as complete! ✅");
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

console.log('✅ Bot is running and listening for commands...');
console.log(`📅 Current Day: ${getCurrentDay()}/90`);