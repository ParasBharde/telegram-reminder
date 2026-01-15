const { dsaSchedule, getCurrentDay, getDayInfo } = require('./schedule');
const { getProgress } = require('./database');

function formatDailyMessage(day) {
  const schedule = dsaSchedule[day];
  
  if (!schedule) {
    return `No schedule available for Day ${day}`;
  }
  
  let message = `🔥 *DSA Challenge - Day ${day}/90*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📚 *Topic:* ${schedule.topic}\n`;
  message += `📅 *Day:* ${schedule.day} | Week ${schedule.week}\n\n`;
  
  message += `*Today's Problems:*\n\n`;
  
  schedule.problems.forEach((problem, index) => {
    const emoji = problem.difficulty === 'Easy' ? '🟢' : 
                  problem.difficulty === 'Medium' ? '🟡' : '🔴';
    
    message += `${index + 1}. ${emoji} *${problem.name}* (${problem.difficulty})\n`;
    message += `   Pattern: ${problem.pattern}\n`;
    message += `   Companies: ${problem.companies.slice(0, 3).join(', ')}\n`;
    message += `   [Solve on LeetCode](${problem.link})\n\n`;
  });
  
  message += `📹 *Tutorial:* [Watch Explanation](${schedule.tutorial})\n\n`;
  message += `💡 *Tip:* ${schedule.notes}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `⏰ Time Limit: 45 min per problem\n`;
  message += `✅ Reply /done when completed!\n`;
  
  return message;
}

function formatProgressMessage(chatId) {
  const progress = getProgress(chatId);
  const currentDay = getCurrentDay();
  const completion = ((progress.completedDays.length / currentDay) * 100).toFixed(1);
  
  let message = `📊 *Your Progress*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `🔥 Current Streak: *${progress.streak} days*\n`;
  message += `✅ Completed: *${progress.completedDays.length}/90 days*\n`;
  message += `📝 Problems Solved: *${progress.totalProblems}*\n`;
  message += `📈 Completion Rate: *${completion}%*\n\n`;
  
  // Progress bar
  const totalBars = 20;
  const filledBars = Math.round((progress.completedDays.length / 90) * totalBars);
  const progressBar = '█'.repeat(filledBars) + '░'.repeat(totalBars - filledBars);
  message += `${progressBar}\n\n`;
  
  // Milestones
  if (progress.completedDays.length >= 10 && progress.completedDays.length < 30) {
    message += `🎯 Next milestone: 30 days (${30 - progress.completedDays.length} to go)\n`;
  } else if (progress.completedDays.length >= 30 && progress.completedDays.length < 60) {
    message += `🎯 Next milestone: 60 days (${60 - progress.completedDays.length} to go)\n`;
  } else if (progress.completedDays.length >= 60 && progress.completedDays.length < 90) {
    message += `🎯 Final milestone: 90 days (${90 - progress.completedDays.length} to go)\n`;
  } else if (progress.completedDays.length === 90) {
    message += `🎉 CHALLENGE COMPLETE! You're a DSA CHAMPION! 👑\n`;
  }
  
  message += `\nKeep crushing it! 💪`;
  
  return message;
}

function formatStatsMessage(chatId) {
  const progress = getProgress(chatId);
  const currentDay = getCurrentDay();
  
  // Calculate statistics
  const easyProblems = progress.completedDays.length * 0.4; // Estimate
  const mediumProblems = progress.completedDays.length * 0.5;
  const hardProblems = progress.completedDays.length * 0.1;
  
  const lastSevenDays = progress.completedDays.filter(day => day > currentDay - 7).length;
  const averagePerWeek = (progress.completedDays.length / Math.ceil(currentDay / 7)).toFixed(1);
  
  let message = `📈 *Detailed Statistics*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `*Overall Progress*\n`;
  message += `Days: ${progress.completedDays.length}/90 (${((progress.completedDays.length/90)*100).toFixed(1)}%)\n`;
  message += `Streak: ${progress.streak} 🔥\n`;
  message += `Total Problems: ${progress.totalProblems}\n\n`;
  
  message += `*Problem Breakdown*\n`;
  message += `🟢 Easy: ~${Math.round(easyProblems)}\n`;
  message += `🟡 Medium: ~${Math.round(mediumProblems)}\n`;
  message += `🔴 Hard: ~${Math.round(hardProblems)}\n\n`;
  
  message += `*Recent Activity*\n`;
  message += `Last 7 days: ${lastSevenDays}/7 days\n`;
  message += `Avg per week: ${averagePerWeek} days\n\n`;
  
  message += `*Achievements*\n`;
  const achievements = [];
  if (progress.streak >= 7) achievements.push('🎖️ Week Warrior');
  if (progress.streak >= 30) achievements.push('🏆 Month Master');
  if (progress.completedDays.length >= 45) achievements.push('⭐ Halfway Hero');
  if (progress.streak >= 60) achievements.push('🔥 Two Month Streak');
  if (progress.completedDays.length === 90) achievements.push('👑 90 Day Champion');
  
  message += achievements.length > 0 ? achievements.join('\n') : 'Keep going to unlock achievements!';
  
  return message;
}

module.exports = {
  formatDailyMessage,
  formatProgressMessage,
  formatStatsMessage
};