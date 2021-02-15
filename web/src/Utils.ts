
const timeAgoInWords = (timeInPast: Date): string => {
  const diffMillis = new Date().valueOf() - timeInPast.valueOf();

  if (diffMillis < 1000) { return "just now" }

  const diffSeconds = diffMillis / 1000;
  if (diffSeconds < 60) { return `${Math.round(diffSeconds)} seconds ago` }

  const diffMinutes = diffSeconds / 60;
  if (diffMinutes < 60) { return `${Math.round(diffMinutes)} minutes ago` }

  const diffHours = diffMinutes / 60;
  if (diffHours < 24) { return `${Math.round(diffHours)} hours ago` }

  const diffDays = diffHours / 24
  return `${Math.round(diffDays)} days and ${Math.round(diffHours)} hours`
}

export { timeAgoInWords }
