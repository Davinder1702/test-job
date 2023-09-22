import React from 'react';

function CheckBoxField({
    ref,
    containerClass,
    onChange = () => { },
    id,
    label,
    checked = false,
    ...props
}) {
    return (
        <div className={`${containerClass}`}>
            <input
                ref={ref}
                id={id}
                name="checkbox"
                type="checkbox"
                onChange={onChange}
                checked={checked}
                {...props}
            />
            {label && <label htmlFor={id}>{label}</label>}
        </div>

    );
}

export default CheckBoxField;
