import React from 'react';

export const retrunButtonClass = (size) => {
  switch (size) {
    case 'small':
      return 'btn-sm';
    case 'medium':
      return 'btn-md';
    case 'large':
      return 'btn-lg';
    default:
      return '';
  }
};

function Button({ children, type = 'button', size, ...otherProps }) {
  const sizeClass = retrunButtonClass(size);
  return (
    <button
      className={`btn ${sizeClass} btn-primary rounded-50`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
