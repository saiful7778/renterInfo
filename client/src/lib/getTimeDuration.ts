export default function getTimeDuration(
  pickupDateValue: string,
  returnDateValue: string
): { duration: number; durationDisplay: string } {
  const start = new Date(pickupDateValue);
  const end = new Date(returnDateValue);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { duration: 0, durationDisplay: "" };
  }

  const duration = end.getTime() - start.getTime();

  const oneDay = 1000 * 60 * 60 * 24;

  const weeks = Math.floor(duration / (oneDay * 7));
  const days = Math.floor((duration % (oneDay * 7)) / oneDay);
  const hours = Math.floor((duration % oneDay) / (1000 * 60 * 60));

  let durationDisplay = "";

  if (weeks > 0) {
    durationDisplay += `${weeks}w ${days}d ${hours}h`;
  } else if (days > 0) {
    durationDisplay += `${days}d ${hours}h`;
  } else if (hours > 0) {
    durationDisplay += `${hours}h`;
  }
  return { duration, durationDisplay };
}
