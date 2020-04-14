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

    const periodInDays = (months) => months * 30;
    const periodWeeks = (weeks) => weeks * 7;

    const numberOfDays = (periodTypedata, timeToElapsedata) => {
        switch (periodTypedata) {
            case 'months':
                return periodInDays(timeToElapsedata);
            case 'weeks':
                return periodWeeks(timeToElapsedata);
            default:
                return timeToElapse;
        }
    };


    const currentlyInfected = data.reportedCases * 10;
    const timeInDays = numberOfDays(periodTypedata, timeToElapsedata);

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
            return timeToElapsedata * 30;
        }
        if (periodTypedata === 'weeks') {
            return timeToElapsedata * 7;
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