/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

const periodInDays = (months) => months * 30;
const periodWeeks = (weeks) => weeks * 7;

const numberOfDays = (periodType, timeToElapse) => {
    switch (periodType) {
        case 'months':
            return periodInDays(timeToElapse);
        case 'weeks':
            return periodWeeks(timeToElapse);
        default:
            return timeToElapse;
    }
};

function impactCases(data) {
    const {
        region,
        periodType,
        timeToElapse,
        reportedCases,
        totalHospitalBeds
    } = data;


    const currentlyInfected = reportedCases * 10;
    const timeInDays = numberOfDays(periodType, timeToElapse);

    const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsAvailable = Math.floor(totalHospitalBeds * 0.35);
    const hospitalBedsByRequestedTime = hospitalBedsAvailable - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarOut = infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
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

function severeImpactCases(data) {

    const {
        region,
        periodType,
        timeToElapse,
        reportedCases,
        totalHospitalBeds
    } = data;

    const currentlyInfected = reportedCases * 50;
    const timeInDays = numberOfDays(periodType, timeToElapse);


    const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
    const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
    const hospitalBedsAvailable = Math.floor(totalHospitalBeds * 0.35);
    const hospitalBedsByRequestedTime = hospitalBedsAvailable - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
    const dollarOut = infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
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