import React, {Component} from 'react';

import { styled } from 'styletron-react';

const beforeAligns = {
  left: '7px',
  center: 'calc(50% - 7px)',
  right: 'calc(100% - 22px)',
};

const afterAligns = {
  left: '9px',
  center: 'calc(50% - 5px)',
  right: 'calc(100% - 20.5px)',
};

const TooltipWrapper = styled('div', ({darkMode, offset = '50px', alignment = 'center', underneath, noarrow}) => ({
  position: 'absolute',
  zIndex: 10,
  left: alignment === 'left' ? '-5px' : 'auto',
  // eslint-disable-next-line no-nested-ternary
  right: alignment === 'right' ? (noarrow ? '10px' : '-5px') : 'auto',
  top: underneath ? offset : 'auto',
  bottom: underneath ? 'auto' : offset,
  color: darkMode ? 'white' : 'black',
  backgroundColor: darkMode ? 'rgb(18, 35, 74)' : 'white',
  borderRadius: '5px',
  border: darkMode ? '1px solid #888' : '1px solid #e8e8e8',
  boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.25)',
  ':before': {
    content: '""',
    position: 'absolute',
    bottom: underneath ? 'auto' : '-7px',
    top: underneath ? '-7px' : 'auto',
    left: beforeAligns[alignment],
    borderStyle: 'solid',
    borderWidth: underneath ? '0 7px 7px' : '7px 7px 0',
    borderColor: darkMode ? '#888 transparent' : '#e8e8e8 transparent',
    display: noarrow ? 'none' : 'block',
    width: 0,
    zIndex: 2,
  },
  ':after': {
    content: '""',
    position: 'absolute',
    bottom: underneath ? 'auto' : '-5px',
    top: underneath ? '-5px' : 'auto',
    left: afterAligns[alignment],
    borderStyle: 'solid',
    borderWidth: underneath ? '0 5px 5px' : '5px 5px 0',
    borderColor: darkMode ? 'rgb(18, 35, 74) transparent' : 'white transparent',
    display: noarrow ? 'none' : 'block',
    width: 0,
    zIndex: 3,
  },
}));

export class Tooltip extends Component {
  render() {
    const {
      anchor,
      children,
      darkMode,
      leftAlign,
      rightAlign,
      underneath,
      offset,
      open,
      noarrow,
    } = this.props;

    if (!open) {
      return null;
    }

    let anchorWidth = 50;
    if (anchor) {
      anchorWidth = anchor.getBoundingClientRect().width;
    }
    let alignment = 'center';
    if (leftAlign) {
      alignment = 'left';
    } else if (rightAlign) {
      alignment = 'right';
    }

    return (
      <TooltipWrapper
        anchorWidth={anchorWidth}
        offset={offset}
        darkMode={darkMode}
        alignment={alignment}
        underneath={underneath}
        noarrow={noarrow}
      >
        {children}
      </TooltipWrapper>
    );
  }
}