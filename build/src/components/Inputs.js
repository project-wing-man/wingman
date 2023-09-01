import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Inputs() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TextField, { label: 'Origin', variant: 'outlined', size: 'small', color: 'warning', sx: { margin: 2, background: 'white', opacity: '80%', borderRadius: 1 } }),
        React.createElement(TextField, { label: 'Destination', variant: 'outlined', size: 'small', color: 'warning', sx: { background: 'white', opacity: '80%', borderRadius: 1 } }),
        React.createElement(Button, { variant: 'contained', sx: { backgroundColor: 'orange', opacity: '90%', marginLeft: 2 } }, "Search")));
}
//# sourceMappingURL=Inputs.js.map