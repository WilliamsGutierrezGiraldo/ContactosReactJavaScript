import React from 'react';

function Button (props) {
    return (
        // <button type={props.type} onClick={props.onClick} className={props.className}>{props.children}</button>
        <button {...props}></button>
    );
}

export default Button;
