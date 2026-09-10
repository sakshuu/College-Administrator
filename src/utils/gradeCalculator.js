/**
 * Grade & Class Calculator based on score and max score
 */
export function calculateGrade(score, maxScore) {
  const numScore = parseFloat(score) || 0;
  const numMax = parseFloat(maxScore) || 100;
  
  if (numMax <= 0) return { percentage: 0, percentageFormatted: '0 %', gradeClass: 'N/A', pass: false };

  const percentage = (numScore / numMax) * 100;
  const percentageFormatted = `${percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2)} %`;

  let gradeClass = 'Fail';
  let pass = false;

  if (percentage >= 75) {
    gradeClass = 'First class';
    pass = true;
  } else if (percentage >= 60) {
    gradeClass = 'First class';
    pass = true;
  } else if (percentage >= 50) {
    gradeClass = 'Pass';
    pass = true;
  } else {
    gradeClass = 'Fail';
    pass = false;
  }

  return {
    percentage,
    percentageFormatted,
    gradeClass,
    pass
  };
}
