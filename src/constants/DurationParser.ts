export function parseDuration(durationString: string): number {
  const regex = /PT(\d+H)?(\d+M)?/; // Matches patterns like PT2H30M

  const matches = durationString.match(regex);
  if (!matches) {
    throw new Error("Invalid duration format");
  }

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

  return hours * 60 + minutes;
}
