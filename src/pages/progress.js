import React, { useState, useEffect } from "react";

import {useNavigate, redirect, Link} from 'react-router-dom';
import { styled } from 'styletron-react';
import { useSelector } from "react-redux";

import { CustomerLogo, IternalLogo } from './logo';

import {
  WindowOverlay,
  BlueBorder,
  PageWrapper,
  Footer,
  LegalNotice,
  MiniLogo,
} from './layout';


const ProgressBarOuter = styled('div', {
  height: '40px',
  width: '800px',
  backgroundColor: 'rgb(208, 208, 208)',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
})

const ProgressBarInner = styled('div', {
  height: '40px',
  backgroundColor: 'rgb(51, 126, 193)',
  borderRadius: '20px',
  width: '100%',
  position: 'absolute',
  top: '0px',
  transitionTimingFunction: 'linear'
});

const ProgressMessage = styled('div', {
  color: 'black',
  fontSize: '20px',
  marginBottom: '20px',
})

const ProgressBar = ({ currentStageIndex, maxStageIndex, transitionTime }) => {
  const percentage = `${-100 + (100 * (currentStageIndex + 1)/maxStageIndex)}%`;
  return (
    <ProgressBarOuter>
      <ProgressBarInner style={{left: percentage, transition: transitionTime}}></ProgressBarInner>
    </ProgressBarOuter>
  )
}

const stages = [{
  text: 'Generating Personalized Report...',
  minTime: 22,
  possibleExtension: 0,
}, {
  text: 'Calculating Financial Data...',
  minTime: 10,
  possibleExtension: 5,
}, {
  text: 'Assembling Relevant Information...',
  minTime: 25,
  possibleExtension: 2,
}, {
  text: 'Formatting Layout and Styling...',
  minTime: 3,
  possibleExtension: 1,
}, {
  text: 'Preparing Hosted File for Sharing...',
  minTime: 4,
  possibleExtension: 4,
}, {
  text: 'Uploading File...',
  minTime: 15,
  possibleExtension: 8
}];

let timeoutTracker;

const ProgressDisplay = (props) => {

  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [transitionTime, setTransitionTime] = useState('22s linear');
  const outputURL = useSelector(state => state.outputURL);

  useEffect(() => {
    if (props.generateError) {
      clearTimeout(timeoutTracker);
    }
  }, [props.generateError])

  useEffect(() => {
    clearTimeout(timeoutTracker);
    setCurrentStageIndex(0);
  }, [props.generateStartTime])

  useEffect(() => {
    if (currentStageIndex === -1) {
      return;
    }
    const currentStage = stages[currentStageIndex];
    const extraTime = Math.random() * currentStage.possibleExtension;

    const totalTimeMs = Math.floor((currentStage.minTime + extraTime) * 1000);

    timeoutTracker = setTimeout(() => {
      if (currentStageIndex === stages.length - 1) {
        if (outputURL) {
          const redirectURL = outputURL;
          window.location.href = redirectURL + '&viewInBrowser=always';
          return;
        }
      } else {
        setCurrentStageIndex(currentStageIndex + 1);
      }
    }, totalTimeMs);

    setTransitionTime(totalTimeMs/1000 + 's linear');
  }, [currentStageIndex]);

  useEffect(() => {
    if (outputURL) {
      window.location.href = outputURL + '&viewInBrowser=always';
    }
  }, [outputURL]);

  let progressText = '';
  if (stages[currentStageIndex]) {
    progressText = stages[currentStageIndex].text;
  }
  if (props.generateError) {
    progressText = props.generateError;
  }


  return (
    <WindowOverlay>
      <BlueBorder />
      <PageWrapper>
        <div style={{flex: 2}}></div>
        <div style={{flex: 2, marginBottom: '30px'}}>
          <CustomerLogo height={200} />
        </div>
        <div style={{flex: 1}}>
          <ProgressBar currentStageIndex={currentStageIndex} maxStageIndex={stages.length} transitionTime={transitionTime} />
        </div>
        <div style={{flex: 5}}>
          <ProgressMessage>{progressText}</ProgressMessage>
        </div>
      </PageWrapper>
      <Footer>
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
        <MiniLogo>
          <IternalLogo height={100} />
        </MiniLogo>
      </Footer>
    </WindowOverlay>
  )
}

export default ProgressDisplay;