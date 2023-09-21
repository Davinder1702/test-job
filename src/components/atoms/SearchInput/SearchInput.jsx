import React from 'react';
import { SearchIcon, CloseIcon } from '../../../assets';

function SearchInput({
  inputRef,
  type = 'text',
  rounded = true,
  containerClass,
  onChange = () => { },
  handleSubmit = () => { },
  enterKeyHandler = () => { },
  placeholder = 'Search',
  value = '',
  isSubmit = false,
  isClearBtn = false,
  ...otherProps
}) {
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (event.target.value.trim()) { enterKeyHandler(event); }
    }
  };
  return (
    <div className={`position-relative searchbar ${containerClass}`}>
      <em
        onClick={(e) => isSubmit && handleSubmit(e)}
        onKeyDown={(e) => isSubmit && handleSubmit(e)}
        role="button"
        tabIndex="0"
      >
        <img src={SearchIcon} alt="Search" width="20" height="" />
      </em>
      <input
        ref={inputRef}
        id="search"
        name="search"
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${rounded ? 'rounded-50' : ''}`}
        onKeyDown={handleKeyPress}
        {...otherProps}
      />
      {isClearBtn && value?.length ? (
        <button onClick={() => onChange({ target: { value: '' } })} type="button" className="btn clear_all">
          <img src={CloseIcon} alt="" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchInput;
