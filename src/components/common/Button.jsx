import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className = '', 
  as: Component = 'button',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : 'btn-outline';
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'xl' ? 'btn-xl' : '';
  const widthClass = fullWidth ? 'full-width' : '';
  
  return (
    <Component 
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
