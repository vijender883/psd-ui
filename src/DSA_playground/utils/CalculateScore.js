const CalculateScore = (results) => {
  if (!results || !results.results) return 0;

  const totalTests = results.results.length;
  if (totalTests === 0) return 0;
  if(totalTests === 1 && results.results[0].passed) return 100;

  const remainingPoints = 85;
  const pointsPerRemainingTest = totalTests > 2 ? remainingPoints / (totalTests - 2) : 0;


  let totalScore = 0;
  results.results.forEach((result, index) => {
    if (!result.passed) return;

    if (index === 0) {
      totalScore += 5; // First test case
    } else if (index === 1) {
      totalScore += 10; // Second test case
    } else {
      totalScore += pointsPerRemainingTest; // Remaining test cases
    }
  });

  return totalTests === 2 ? (Math.round(totalScore) === 15 ? 100 : 0) : Math.round(totalScore);
};

export default CalculateScore;