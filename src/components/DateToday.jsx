export function DateToday () {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting = "";

  if (currentHour >= 8 && currentHour < 12) {
    greeting = "¡Buenos días!";
  } else if (currentHour >= 12 && currentHour < 20) {
    greeting = "¡Buenas tardes!";
  } else {
    greeting = "¡Buenas noches!";
  }
  return <p className="text-[32px] font-extrabold text-white tracking-tighter">{greeting}</p>;
};
