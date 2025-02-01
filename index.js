let DateTime = luxon.DateTime;
let datetimecalc = document.getElementsByClassName("datetimecalc")[0];

const picker = datepicker(".form-control", {
  formatter: (input, date, instance) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    input.value = `${day}/${month}/${year}`;
  },
  maxDate: new Date(DateTime.now().toJSDate()),
  minDate: new Date(1900, 0, 1),
});

function showAge() {
  datetimecalc.innerHTML = calculate();
}

function calculate() {
  const selectedDate = document.querySelector(".form-control").value;
  
  if (!selectedDate) return "Select a date!";
  
  const [day, month, year] = selectedDate.split("/").map(Number);
  const birthDate = DateTime.local(year, month, day);
  const today = DateTime.now();
  
  if (birthDate > today) return "Select a valid date!";
  
  const diff = today.diff(birthDate, ["years", "months", "days"]);
  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  if (years === 0 && months === 0 && days === 0) return "You were born today <span> or </span> you wrote the date incorrectly.";
  if (years > today.year - 1900) return `Select a valid year`

  let result = "You are ";

  if (years > 0) result += "<span> " + years + " year" + (years > 1 ? "s </span>" : "</span>");
  if (months > 0) result += "<span> " + months + " month" + (months > 1 ? "s </span>" : "</span>");
  if (days > 0) result += "<span> " + days + " day" + (days > 1 ? "s </span>" : "</span>");

  result += " old";

  return result;
}
