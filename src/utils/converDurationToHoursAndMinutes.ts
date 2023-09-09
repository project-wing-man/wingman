export default function convertDurationToHoursAndMinutes(durationString: string): string {
  let result = '';

  for (let i = 2; i < durationString.length; i++) {
      for (let j = i + 1; j < durationString.length; j++) {
          if ( durationString[j] == 'H' || durationString[j] == 'M') {
              result += durationString.slice(i, j);
              const timeMeasurement = (durationString[j] == 'H') ? `h ` : 'm';
              result += timeMeasurement;
              i = j + 1;
              j = i + 1;
          }
      }
  }
  
  return (result.includes('m')) ? result : result + '0m';
}
