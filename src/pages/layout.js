import React from 'react';

import { styled } from 'styletron-react';

const WindowOverlay = styled('div', {
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  top: 0,
  left: 0,
  zIndex: 10000,
  backgroundColor: 'white',
});

const BlueBorder = styled('div', {
  width: '100%',
  height: '15px',
  backgroundColor: 'rgb(54,128,194)',
})

const PageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});

const Footer = styled('div', {
  position: 'absolute',
  bottom: '0px',
  left: '0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '80px',
});

const LegalNotice = styled('div', {
  flex: 1,
  textAlign: 'left',
});

const MiniLogo = styled('div', {
  flex: 1,
  textAlign: 'right',
})


export {
  WindowOverlay,
  BlueBorder,
  PageWrapper,
  Footer,
  LegalNotice,
  MiniLogo,
}