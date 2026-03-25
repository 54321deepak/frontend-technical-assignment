import React from 'react';

const InputField = ({
  label,
  icon: Icon,
  id,
  name,
  type = 'text',
  placeholder,
  error,
  touched,
  children,
  variant = 'default',
  multiline = false,
  ...props
}) => {
  const InputComponent = multiline ? 'textarea' : 'input';

  const inputElement = (
    <InputComponent
      id={id || name}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`${props.className || ''} ${touched && error ? "error" : ""}`}
      {...props}
    />
  );

  if (variant === 'plain') {
    return inputElement;
  }

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name} className="input-label">
          {Icon && <Icon className="label-icon" />} {label}
        </label>
      )}
      <div className="input-wrapper">
        {inputElement}
        {children}
      </div>
      {touched && error && (
        <span className="error-text">{error}</span>
      )}
    </div>
  );
};

export default InputField;
