const sanitizeInt = (stringInt) => {
  const trimmedValue = stringInt.trim();
  if (!trimmedValue) {
    return 0;
  }

  const value = parseInt(trimmedValue, 10);

  if (isNaN(value)) {
    return 0;
  }

  return value;
}

const sanitizeParams = (estimateParams) => {
  const sanitizedParams = {
    ...estimateParams,
    numberOfPCs: sanitizeInt(estimateParams.numberOfPCs),
    avgSalary: sanitizeInt(estimateParams.avgSalary),
    timeLost: sanitizeInt(estimateParams.timeLost),
  }

  return sanitizedParams;
}


export const runCalculation =(estimateParams) =>{
    const sanitizedParams = sanitizeParams(estimateParams);
    const {
        jobRole,
        numberOfPCs,
        avgSalary,
        timeLost,
        additionalInfo,
    } = sanitizedParams;

//  console.log(sanitizedParams);
    const newAvgSalary = avgSalary * 1.3;
    const minutesLostPerDay = numberOfPCs * timeLost;
    const minutesLostPerYear = minutesLostPerDay * 248;
    const hoursLostPerYear = minutesLostPerYear / 60 ; 
    const avgSalaryPerHour = newAvgSalary / 1980 ; 
    const lostProductivityWages = hoursLostPerYear * avgSalaryPerHour;

//  console.log('minutes lost per day ,', minutesLostPerDay, 'minutes lost per year ,', minutesLostPerYear, 'hours lost per year ,', hoursLostPerYear, 'average salary per hour ,', avgSalaryPerHour, 'lost productivity wages ,', lostProductivityWages)
    return {
        minutesLostPerDay,
        minutesLostPerYear,
        hoursLostPerYear,
        avgSalaryPerHour,
        lostProductivityWages,
    }
}

export const requiredFormParamsPresent = (params) => {
  const { numberOfPCs } = params;
  const sanitizedPCs = sanitizeInt(numberOfPCs);

  return sanitizedPCs > 0;
}