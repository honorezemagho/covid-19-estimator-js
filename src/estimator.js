function impactCases(data) {
    const {
        region: {
            name,
            avgAge,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
        },
        periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds
    } = data;


    const periodTypedata = data.periodType;
    const timeToElapsedata = data.timeToElapse;

    function convertToDays(periodTypedata, timeToElapsedata) {
        if (periodTypedata === 'month') {
            return timeToElapsedata * 29;
        }
        if (periodTypedata === 'week') {
            return timeToElapsedata * 6;
        }
        if (periodTypedata === 'days') {
            return timeToElapsedata;
        }
    }

    const currentlyInfected = data.reportedCases * 10;
    const timeInDays = convertToDays(periodTypedata, timeToElapsedata);

    const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsAvailable = Math.floor(data.totalHospitalBeds * 0.35);
    const hospitalBedsByRequestedTime = hospitalBedsAvailable - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarOut = infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * timeInDays;
    const rounddollar = dollarOut.toFixed(1);
    const dollarsInFlight = Number(rounddollar);

    return {
        currentlyInfected: currentlyInfected,
        infectionsByRequestedTime: currentlyInfected * infectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime,
        casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime,
        dollarsInFlight
    };
}

function severeImpactCases(data) {

    const {
        region: {
            name,
            avgAge,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
        },
        periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds
    } = data;


    const periodTypedata = data.periodType;
    const timeToElapsedata = data.timeToElapse;


    function convertToDays() {
        if (periodTypedata === 'month') {
            return timeToElapsedata * 29;
        }
        if (periodTypedata === 'week') {
            return timeToElapsedata * 6;
        }
        if (periodTypedata === 'days') {
            return timeToElapsedata;
        }
    }

    const currentlyInfected = data.reportedCases * 50;
    const timeInDays = convertToDays(periodType, timeToElapse);

    const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsAvailable = Math.floor(data.totalHospitalBeds * 0.35);
    const hospitalBedsByRequestedTime = hospitalBedsAvailable - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarOut = infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * timeInDays;
    const rounddollar = dollarOut.toFixed(1);
    const dollarsInFlight = Number(rounddollar);
    return {
        currentlyInfected,
        infectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime,
        casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime,
        dollarsInFlight
    };
}


const covid19ImpactEstimator = (data) => {
    const inputs = data;
    return {
        data: inputs,
        impact: impactCases(data),
        severeImpact: severeImpactCases(data)
    };
};

export default covid19ImpactEstimator;