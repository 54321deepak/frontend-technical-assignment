import React from 'react';

const Heading = ({ level = 1, children, className = '', align, ...props }) => {
  const Tag = `h${level}`;
  // Map level to base classes to enforce consistent design
  const baseClass = level === 1 ? 'page-title' : level === 2 ? 'section-title' : '';
  const alignClass = align ? `text-${align}` : '';
  
  return (
    <Tag className={`${baseClass} ${alignClass} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
