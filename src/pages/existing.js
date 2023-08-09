import React, { useState, useEffect } from "react";
import {useNavigate, redirect, Link} from 'react-router-dom';
import { styled } from 'styletron-react';
import { useDispatch, useSelector } from "react-redux";

import {
  CustomButton
} from './components';

import { CustomerLogo, IternalLogo } from './logo';

import {
  WindowOverlay,
  BlueBorder,
  PageWrapper,
  Footer,
  LegalNotice,
  MiniLogo,
} from './layout';

const ExistingDocument = () => {


  const dispatch = useDispatch();
  const outputURL = useSelector(state => state.outputURL); 

  return (
    <WindowOverlay>
      <BlueBorder />
      <PageWrapper>
        <div style={{flex: 2}}></div>
        <div style={{flex: 2, marginBottom: '40px'}}>
          <CustomerLogo height={200} />
        </div>
        <h1 style={{flex: 1}}>We've noticed you've already created a report, do you want to...</h1>
        <div style={{flex: 2, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div style={{flex: 2}}></div>
          <CustomButton style={{width: '300px', height: '80px',  fontSize: '24px'}} onClick={() => {
            dispatch({
              type: 'SET_OUTPUT_URL',
              outputURL: null,
            })
          }}>
            Create a New Report from Scratch
          </CustomButton>
          <div style={{width: '200px'}}></div>
          <CustomButton  style={{width: '300px', height: '80px', fontSize: '24px'}} onClick={() => {
            window.location.href = outputURL  + '&viewInBrowser=always';
          }}>
            View Existing Report
          </CustomButton>
          <div style={{flex: 2}}></div>
        </div>
        <div style={{flex: 4}}></div>
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

export default ExistingDocument;
