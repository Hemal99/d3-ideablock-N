import React, { useState, useEffect, useRef } from "react";

import {useNavigate, redirect, Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { CustomButton } from './components';

import Progress from './progress'
import Existing from './existing';
import {Background} from './background';
import { PoweredBy } from './powered-by';
import { BlueBorder, LegalNotice } from './layout';
import {Tooltip } from './tooltip';
import { CustomerLogo } from './logo';

const Form = (props) => {

  const { pageParams, storage } = props;
  let navigate = useNavigate(); 
  const dispatch = useDispatch();

  const anchor = useRef(null);

  const estimateParams = useSelector(state => state.estimateParams);
  const estimateResults = useSelector(state => state.estimateResults);
  const formComplete = useSelector(state => state.formComplete);
  const outputURL = useSelector(state => state.outputURL);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://kit.fontawesome.com/0400b5504a.js';
    script.async = true;

    document.body.appendChild(script);

  }, [])

  const [hovered, setHovered] = useState(false);
  const {
    jobRole,
    industry,
    numberOfPCs,
    avgSalary,
    timeLost,
    additionalInfo,
  } = estimateParams;
  
  const handleEstimateParamChange = (paramName) => {
    return (event) => {
      dispatch({
        type: 'SET_ESTIMATE_PARAM',
        paramName,
        paramValue: event.target.value,
      })
    }
  }

  const [generating, setGenerating] = useState(false);
  const [generateError, setGeneratingError] = useState(null);
  const [generateStartTime, setGenerateStartTime] = useState(null);
  const [showingProgress, setShowingProgress] = useState(false);

  const handleSubmit = async (event) => {
    if (!formComplete) {
      return null;
    }
    event.preventDefault();

    setGenerating(true);
    setShowingProgress(true);
    setGenerateStartTime(new Date().getTime());
    const response = await fetch(pageParams.apiBuildURL,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Key': pageParams.apiAuthKey,
        'X-Auth-Secret': pageParams.apiAuthSecret,
      },
      method: "POST",
      body: JSON.stringify({
        industry:estimateParams.industry,
        numberOfPCs:estimateParams.numberOfPCs,
        avgSalary:estimateParams.avgSalary,
        timeLost:estimateParams.timeLost,
        additionalInfo:estimateParams.additionalInfo,
        minutesLostPerDay: estimateResults.minutesLostPerDay,
        minutesLostPerYear: estimateResults.minutesLostPerYear,
        hoursLostPerYear: estimateResults.hoursLostPerYear,
        avgSalaryPerHour: estimateResults.avgSalaryPerHour,
        lostProductivityWages: estimateResults.lostProductivityWages,
      })
    });

    if (!response.ok) {
      setGeneratingError(response.text);
      return;
    }
    
    const responseData = await response.json();
//  console.log('response ,',responseData);

    if (!responseData.valid) {
      setGeneratingError(responseData.data.message)
      return;
    }

    const outputURL = responseData.data.outputURL;

    dispatch({
      type: 'SET_OUTPUT_URL',
      outputURL,
    })


    setGenerating(false);

  };

  if (showingProgress) {
    return (
      <Progress generateError={generateError}/>
    );
  }

  if (outputURL) {
    return (
      <Existing outputURL={outputURL} />
    )
  }
        
  
  return (
    <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
      <div style={{position: 'absolute', right: '20px', top: '20px', height: '200px', zIndex: 2}}>
        <PoweredBy />
      </div>
      <div style={{flex: 1, height: '100%', backgroundColor: 'white', overflowY: 'auto', zIndex: 2}}>
        <BlueBorder />
        <form onSubmit={handleSubmit} className="generateForm">
          <h1 className="headline" style={{maxWidth: '600px'}}>{`Generate a confidential Productivity Savings Report for ${pageParams.customerName}`}</h1>
            <hr/>
            <div style={{zIndex:'2', display:'flex', flexDirection:'column', alignItems:'left',transform:'translateX(-70px)',}}>
            <div style={{marginBottom:'22px'}} className="formItem">
              <label style={{color:'black'}}>Your Job Role</label>
              <div className="fieldInput">
                <select 
                  name="jobRole"
                  value={jobRole} 
                  onChange={handleEstimateParamChange('jobRole')}
                  style={{
                    backgroundColor:'white', 
                    color:'black', 
                    width:'325px',  
                    height:'35px', 
                    fontFamily: 'DellReplica-Regular',
                    fontSize:'13pt',
                    borderRadius: '5px',  
                  }}
                >
                  <option value="CIO">CIO</option>
                  <option value="CEO">CEO</option>
                  <option value="CTO">CTO</option>
                </select>
              </div>
            </div>
            <div style={{marginBottom:'24px', }} className="formItem">
              <label style={{color:'black'}}>Industry Vertical</label>
              <div className="fieldInput">
                <select 
                  value={industry}
                  name="industry" 
                  onChange={handleEstimateParamChange('industry')}
                  style={{
                    backgroundColor:'white', 
                    color:'black', 
                    width:'325px',  
                    height:'35px', 
                    fontFamily: 'DellReplica-Regular',
                    fontSize:'13pt',
                    borderRadius: '5px',  
                  }}
                >
                  <option  value="Energy">Energy</option>
                  <option value="Energia">Energia</option>
                  <option value="enerugi-">エネルギー</option>
                </select>
              </div>
            </div>
            <div className="formItem" >
              <label style = {{color:'black'}} htmlFor="revenue">Number of PCs</label>
              <div className="fieldInput">
                <input
                  style={{
                    backgroundColor:'white', color:'black', 
                    borderRadius: '5px',
                    border: '1px solid gray',
                    width:'310px',
                    height:'35px',
                    paddingLeft: '12px',
                  }}
                  type="text"
                  name="numberOfPCs"
                  id="revenue"
                  value={numberOfPCs}
                  onChange={handleEstimateParamChange('numberOfPCs')}
                />
              </div>
            </div>
            <div className="formItem" style={{marginBottom:'20px'}}>
              <label style={{color:'black',}}>Average Employee Salary</label>
              <div className="fieldInputRange">
                <input
                  type="range"
                  min="0"
                  max="365000"
                  value={avgSalary}
                  name="avgSalary"
                  onChange={handleEstimateParamChange('avgSalary')}
                />
                <input className = "salary" type="text" value={`$${Number(avgSalary).toLocaleString()}`} />
              </div>
            </div>
            <div className="formItem" style={{marginBottom:'10px'}}>
              <label style={{color:'black', marginRight: '5px' }}>Employee Time Lost per Day</label>
              <div
                style={{display: 'inline-block', position: 'relative', marginRight: '15px',}}
                ref={(a) => { anchor.current = a; }}
                onMouseEnter={() => { setHovered(true); }}
                onMouseLeave={() => { setHovered(false); }}
              >
                <Tooltip offset="25px" anchor={anchor.current} open={hovered} darkMode leftAlign>
                  <div style={{fontFamily: 'Open Sans', width: '300px', padding: '8px'}}>This is an example of a help text that provides additional information to the user. The text may be long or short.</div>
                </Tooltip>
                <i
                  style={{color: '#626262', position: 'relative'}}
                  className="fas fa-question-circle"
                />
              </div>
              <div className="fieldInput">
                <select value={timeLost} name="timeLost" onChange={handleEstimateParamChange('timeLost')}
                  style={{
                    backgroundColor:'white', 
                    color:'black', 
                    width:'325px',  
                    height:'35px', 
                    fontFamily: 'DellReplica-Regular',
                    fontSize:'13pt',
                    borderRadius: '5px',  
                  }}>
                  <option value="40">Industry Average</option>
                  <option value="30">75% Industry Average</option>
                  <option value="20">50% Industry Average</option>
                </select>
              </div>
            </div>
            <div className="formItem">
              <label style = {{color:'black', transform:'translateY(-15px)',}} htmlFor="revenue">Special Requirements(Optional)</label>
              <div className="fieldInput">
                <input
                  style={{backgroundColor:'white', color:'black',
                    width:'315px',height:'120px',
                    borderRadius:'5px', border: '1px solid gray',
                    marginTop:'52px'
                  }}
                  type="text"
                  name="additionalInfo"
                  id="revenue"
                  value={additionalInfo}
                  onChange={handleEstimateParamChange('additionalInfo')}
                />
              </div>
            </div>
          </div>
          <CustomButton onClick={handleSubmit} style={{width:"140px",height:'42px', marginRight:"68px",marginTop:"40px", opacity: formComplete ? 1 : 0.7}}>
            Next
          </CustomButton>
          <div style={{'position': 'absolute', left: '0px', bottom: '20px'}}>
            <LegalNotice>
              <div style={{display: 'inline', marginRight: '10px', paddingLeft: '10px',}}>Copyright © 2023 Iternal Technologies |</div>
              <a
                href="https://iternal.us/legal/"
                style={{
                }}
              >
                Legal Information
              </a>
            </LegalNotice>
          </div>
        </form>
      </div>
      <div style={{height: '100%', flex:  1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: '100%', width: '100%', position: 'absolute', top: '0px', right: '0px'}}><Background></Background></div>
        <div style={{position: 'absolute', top: 'calc(50% - 200px)', zIndex: 2, height: '400px', width: '710px'}}>
          <iframe
            src="https://customer-zat1k7dk0kswo7sz.cloudflarestream.com/cefddade19741af440bd6620562b15fb/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-zat1k7dk0kswo7sz.cloudflarestream.com%2Fcefddade19741af440bd6620562b15fb%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
            style={{border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true">
          </iframe>
        </div>
        <div style={{position: 'absolute', bottom: '40px', right: '20px', zIndex: 2}}>
          <CustomerLogo height={100} />
        </div>
      </div>
    </div>
  );
};

export default Form;