function monthDiff(d1, d2) {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function formatMonthYear(date) {
  const monthsPT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return monthsPT[date.getMonth()] + ' de ' + date.getFullYear();
}

function updateExperiencePeriods() {
  const elems = document.querySelectorAll('p[data-start]');
  const now = new Date();

  elems.forEach(el => {
    const startStr = el.getAttribute('data-start'); // ex: "Abr 2025"
    const endStr = el.getAttribute('data-end'); // ex: "Dez 2024" ou vazio para "o momento"

    if (!startStr) return;

    // Map para meses abreviados PT-BR
    const monthsMap = {
      Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
      Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11
    };

    function parseDate(str) {
      if (!str) return null;
      const parts = str.split(' ');
      if (parts.length !== 2) return null;
      const month = monthsMap[parts[0]];
      const year = parseInt(parts[1]);
      if (isNaN(month) || isNaN(year)) return null;
      return new Date(year, month, 1);
    }

    const startDate = parseDate(startStr);
    const endDate = endStr ? parseDate(endStr) : now;

    if (!startDate) return;

    const months = monthDiff(startDate, endDate);

    // Formatar duração
    let duration = '';
    if (months < 12) {
      duration = `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      duration = `${years} ${years === 1 ? 'ano' : 'anos'}`;
      if (remMonths > 0) {
        duration += ` e ${remMonths} ${remMonths === 1 ? 'mês' : 'meses'}`;
      }
    }

    // Formar texto final
    const startFormatted = formatMonthYear(startDate);
    const endFormatted = endStr ? formatMonthYear(endDate) : 'o momento';
    el.textContent = `${startFormatted} - ${endFormatted} · ${duration}`;
  });
}

document.addEventListener('DOMContentLoaded', updateExperiencePeriods);
