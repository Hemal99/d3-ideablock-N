import { createStore } from 'redux'
import { runCalculation, requiredFormParamsPresent } from './utils';
import storage from './local-storage';

const DEFAULT_STATE = {
  estimateParams: {
    jobRole: 'CIO',
    numberOfPCs: '2',
    avgSalary: '130000',
    timeLost: '40',
    additionalInfo:'',
    industry: 'Energy'
  },
  estimateResults:{
    minutesLostPerDay: 2 * 40,
    minutesLostPerYear: 2 * 40 * 248,
    hoursLostPerYear : 2 * 40 * 248 / 60,
    avgSalaryPerHour: 130000 * 1.3 / 1980,
    lostProductivityWages: (2 * 40 * 248 / 60) * (130000 * 1.3 / 1980),
  },
  formComplete: true,
  outputURL: null,
}

if (storage.formValues) {
  DEFAULT_STATE.estimateParams = {
    ...DEFAULT_STATE.estimateParams,
    ...storage.formValues
  };
}
if (storage.formResults) {
  DEFAULT_STATE.estimateResults = {
    ...DEFAULT_STATE.estimateResults,
    ...storage.formResults
  }; 
}
if (storage.formComplete) {
  DEFAULT_STATE.formComplete = storage.formComplete;
}
if (storage.outputURL) {
  DEFAULT_STATE.outputURL = storage.outputURL;
}

function rootReducer (state = DEFAULT_STATE, action){
  let newResults, estimateResults, formComplete;
  switch (action.type) {
    case 'SET_ESTIMATE_PARAM':
      const newEstimateParams = {
        ...state.estimateParams,
        [action.paramName]: action.paramValue,
      };

      newResults = runCalculation(newEstimateParams);
      estimateResults = newResults ? newResults : state.estimateResults;
      formComplete = newResults && requiredFormParamsPresent(newEstimateParams);

      storage.setFormValues(newEstimateParams);
      storage.setFormResults(estimateResults);
      storage.setComplete(formComplete);
      return {
        ...state,
        estimateParams: newEstimateParams,
        estimateResults,
        formComplete
      };
    case 'SET_OUTPUT_URL':
      const { outputURL } = action;
      storage.setOutputURL(outputURL);
      return {
        ...state,
        outputURL,
      };
    
    default:
      return state
  }
}

const store = createStore(rootReducer);

export default store;
