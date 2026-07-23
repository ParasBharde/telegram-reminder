# DSA Daily Challenge Bot 🤖

Telegram bot that sends you daily DSA problems for 90 days!

## Features
- 📅 Daily problems at 9 AM IST
- ⏰ Evening reminders at 7 PM
- 🔥 Streak tracking
- 📊 Progress statistics
- 🏆 Leaderboard
- 📚 90-day structured curriculum

## Quick Setup

### 1. Create Telegram Bot
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow instructions
3. Copy the bot token

### 2. Install & Run Locally
```bash
npm install
# Create .env file and add BOT_TOKEN
npm start
```

### 3. Deploy to Railway (Free!)
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

## Commands
- `/start` - Begin challenge
- `/today` - Get today's problems
- `/done` - Mark as complete
- `/progress` - Check stats
- `/leaderboard` - Rankings

## Schedule
- Week 1-2: Arrays, Strings, Linked Lists
- Week 3-4: Trees, Graphs
- Week 5-8: Dynamic Programming
- Week 9-10: Advanced Topics
- Week 11-12: Company-Specific + Mock Interviews

## Author
Built for crushing DSA interviews! 🚀
```

---

### File 9: `Procfile` (for Heroku)
```
worker: node bot.js
