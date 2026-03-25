import React from 'react';

const Label = ({ htmlFor, children, className = '', ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`common-label ${className}`.trim()} {...props}>
      {children}
    </label>
  );
};

export default Label;
