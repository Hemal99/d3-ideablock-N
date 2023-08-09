import React from "react";

function CustomButton({ children, onClick, style }) {
  const defaultStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    border:"none",
    borderRadius: "3px",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: 'rgb(67, 158, 242)',
    display:"flex",
    justifyContent:"center",
    alignSelf:"flex-end",
  };

  const mergedStyle = {...defaultStyle, ...style};
  
  return (
    <button onClick={onClick} style={mergedStyle}>
      {children}
    </button>
  );
}

export { CustomButton };

