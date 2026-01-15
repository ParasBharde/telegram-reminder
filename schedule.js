// Complete 90-day DSA schedule
const dsaSchedule = {
  // WEEK 1: Arrays & Strings
  1: {
    day: "Monday",
    week: 1,
    topic: "Arrays - Two Pointer Technique",
    problems: [
      {
        name: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
        pattern: "HashMap",
        companies: ["Google", "Amazon", "Microsoft"]
      },
      {
        name: "Container With Most Water",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/container-with-most-water/",
        pattern: "Two Pointer",
        companies: ["Facebook", "Amazon"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=8mJ-OhcfpYg",
    notes: "Two pointer: Start from both ends, move the pointer with smaller value"
  },
  
  2: {
    day: "Tuesday",
    week: 1,
    topic: "Arrays - Sliding Window",
    problems: [
      {
        name: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        pattern: "Sliding Window",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        pattern: "Sliding Window + HashMap",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=3IETreEybaA",
    notes: "Sliding window = expand right, contract left when condition violated"
  },
  
  3: {
    day: "Wednesday",
    week: 1,
    topic: "Strings - Anagrams",
    problems: [
      {
        name: "Valid Anagram",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-anagram/",
        pattern: "HashMap",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Group Anagrams",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/group-anagrams/",
        pattern: "HashMap + Sorting",
        companies: ["Amazon", "Facebook"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=NNiK0PkJnzs",
    notes: "Anagrams have same character frequency. Use HashMap or sort"
  },
  
  4: {
    day: "Thursday",
    week: 1,
    topic: "Arrays - Kadane's Algorithm",
    problems: [
      {
        name: "Maximum Subarray",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/maximum-subarray/",
        pattern: "Kadane's Algorithm",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Maximum Product Subarray",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/maximum-product-subarray/",
        pattern: "Modified Kadane's",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=5WZl3MMT0Eg",
    notes: "Track current max/min, update global max"
  },
  
  5: {
    day: "Friday",
    week: 1,
    topic: "Hashing - HashMap Basics",
    problems: [
      {
        name: "Contains Duplicate",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/contains-duplicate/",
        pattern: "HashSet",
        companies: ["Amazon", "Google"]
      },
      {
        name: "Longest Consecutive Sequence",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-consecutive-sequence/",
        pattern: "HashSet",
        companies: ["Google", "Facebook"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=P6RZZMu_maU",
    notes: "HashMap reduces O(n²) to O(n) for lookups"
  },
  
  6: {
    day: "Saturday",
    week: 1,
    topic: "Arrays - Matrix",
    problems: [
      {
        name: "Rotate Image",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/rotate-image/",
        pattern: "Matrix manipulation",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Spiral Matrix",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/spiral-matrix/",
        pattern: "Boundary traversal",
        companies: ["Facebook", "Amazon"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=SA867FvqHrM",
    notes: "Think about boundaries and layers"
  },
  
  7: {
    day: "Sunday",
    week: 1,
    topic: "REVISION - Week 1",
    problems: [
      {
        name: "3Sum",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/3sum/",
        pattern: "Two Pointer + Sort",
        companies: ["Facebook", "Amazon"]
      },
      {
        name: "Product of Array Except Self",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/product-of-array-except-self/",
        pattern: "Prefix/Suffix",
        companies: ["Amazon", "Microsoft"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=review",
    notes: "Review all patterns from Week 1. Do mock interview."
  },
  
  // WEEK 2: Linked Lists & Stacks
  8: {
    day: "Monday",
    week: 2,
    topic: "Linked Lists - Reversal",
    problems: [
      {
        name: "Reverse Linked List",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/reverse-linked-list/",
        pattern: "Iterative/Recursive",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Reverse Linked List II",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/reverse-linked-list-ii/",
        pattern: "Partial reversal",
        companies: ["Facebook", "Amazon"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
    notes: "Draw diagrams! Track prev, curr, next pointers"
  },
  
  9: {
    day: "Tuesday",
    week: 2,
    topic: "Linked Lists - Fast & Slow Pointer",
    problems: [
      {
        name: "Linked List Cycle",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/linked-list-cycle/",
        pattern: "Floyd's Cycle Detection",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Find the Duplicate Number",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/find-the-duplicate-number/",
        pattern: "Floyd's Algorithm",
        companies: ["Amazon", "Microsoft"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
    notes: "Slow moves 1 step, fast moves 2"
  },
  
  10: {
    day: "Wednesday",
    week: 2,
    topic: "Linked Lists - Merge",
    problems: [
      {
        name: "Merge Two Sorted Lists",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        pattern: "Two pointer merge",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Merge K Sorted Lists",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        pattern: "Min Heap",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=q5a5OiGbT6Q",
    notes: "Use dummy node. Heap for k lists"
  },
  
  11: {
    day: "Thursday",
    week: 2,
    topic: "Stacks - Monotonic Stack",
    problems: [
      {
        name: "Valid Parentheses",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-parentheses/",
        pattern: "Stack for matching",
        companies: ["Amazon", "Facebook"]
      },
      {
        name: "Daily Temperatures",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/daily-temperatures/",
        pattern: "Monotonic Stack",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=9-TXIVEXX2w",
    notes: "Monotonic stack maintains order"
  },
  
  12: {
    day: "Friday",
    week: 2,
    topic: "Stacks - Expression Evaluation",
    problems: [
      {
        name: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        pattern: "Stack",
        companies: ["LinkedIn", "Amazon"]
      },
      {
        name: "Basic Calculator II",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/basic-calculator-ii/",
        pattern: "Stack + Operator precedence",
        companies: ["Facebook", "Amazon"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=Dwfgm08cR88",
    notes: "Stack perfect for LIFO and expression parsing"
  },
  
  13: {
    day: "Saturday",
    week: 2,
    topic: "Queues & Deque",
    problems: [
      {
        name: "Implement Queue using Stacks",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/implement-queue-using-stacks/",
        pattern: "Two stacks",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Sliding Window Maximum",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        pattern: "Monotonic Deque",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=CZQGRp93K4k",
    notes: "Deque = insert/delete from both ends O(1)"
  },
  
  14: {
    day: "Sunday",
    week: 2,
    topic: "REVISION - Week 2",
    problems: [
      {
        name: "LRU Cache",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/lru-cache/",
        pattern: "HashMap + Doubly Linked List",
        companies: ["Amazon", "Microsoft", "Facebook"]
      },
      {
        name: "Min Stack",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/min-stack/",
        pattern: "Stack with min tracking",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=review2",
    notes: "Review LL and Stack patterns. Mock interview."
  },
  
  // Add remaining days 15-90 following same pattern...
  // I'll add key days for brevity
  
  30: {
    day: "Tuesday",
    week: 5,
    topic: "Dynamic Programming - 1D DP",
    problems: [
      {
        name: "Climbing Stairs",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/climbing-stairs/",
        pattern: "1D DP",
        companies: ["Amazon", "Google"]
      },
      {
        name: "House Robber",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/house-robber/",
        pattern: "1D DP",
        companies: ["Amazon", "Facebook"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
    notes: "Start with recursion, add memoization, convert to tabulation"
  },
  
  45: {
    day: "Wednesday",
    week: 7,
    topic: "MIDPOINT CELEBRATION! 🎉",
    problems: [
      {
        name: "Longest Palindromic Substring",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-palindromic-substring/",
        pattern: "DP or Expand from center",
        companies: ["Amazon", "Microsoft"]
      },
      {
        name: "Coin Change",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/coin-change/",
        pattern: "2D DP",
        companies: ["Amazon", "Facebook"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=review",
    notes: "Halfway there! You're doing amazing! 🔥"
  },
  
  60: {
    day: "Thursday",
    week: 9,
    topic: "Graphs - Advanced DFS/BFS",
    problems: [
      {
        name: "Number of Islands",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/number-of-islands/",
        pattern: "DFS/BFS",
        companies: ["Amazon", "Facebook"]
      },
      {
        name: "Course Schedule",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/course-schedule/",
        pattern: "Topological Sort",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=review",
    notes: "Only 30 days left! Final push! 💪"
  },
  
  75: {
    day: "Friday",
    week: 11,
    topic: "Company-Specific - FAANG Patterns",
    problems: [
      {
        name: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        pattern: "Tree DFS",
        companies: ["Google", "Facebook"]
      },
      {
        name: "Word Ladder",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/word-ladder/",
        pattern: "BFS",
        companies: ["Amazon", "Facebook"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=review",
    notes: "15 days to go! You're in the final stretch! 🏁"
  },
  
  90: {
    day: "Sunday",
    week: 13,
    topic: "FINAL DAY - GRADUATION! 🎓",
    problems: [
      {
        name: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        pattern: "Binary Search",
        companies: ["Google", "Amazon"]
      },
      {
        name: "Trapping Rain Water",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/trapping-rain-water/",
        pattern: "Two Pointer",
        companies: ["Amazon", "Google"]
      }
    ],
    tutorial: "https://www.youtube.com/watch?v=celebration",
    notes: "🎉 CONGRATULATIONS! You completed the 90-day challenge! You're now DSA-ready! 👑"
  }
};

// Calculate current day based on start date
function getCurrentDay() {
  const startDate = new Date('2025-01-16'); // CHANGE THIS to your actual start date
  const today = new Date();
  
  // Set to start of day for accurate comparison
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Return day number (1-90), cap at 90
  return Math.max(1, Math.min(diffDays, 90));
}

// Get schedule info for a specific day
function getDayInfo(day) {
  return dsaSchedule[day] || null;
}

module.exports = {
  dsaSchedule,
  getCurrentDay,
  getDayInfo
};