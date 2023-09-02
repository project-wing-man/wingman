export default function convertDateToHoursAndMins(isoString: string): string {

  const unformattedDate = new Date(isoString);
  const militaryHours = unformattedDate.getHours();

  const hours = (militaryHours > 12 ) ? militaryHours - 12 : militaryHours;
  const minutes = (unformattedDate.getMinutes() === 0) ? '00' : unformattedDate.getMinutes();
  const timeClarifier = (militaryHours > 12) ? 'pm' : 'am';
  const formattedDate = `${hours}:${minutes}${timeClarifier}`;

  return formattedDate;

}