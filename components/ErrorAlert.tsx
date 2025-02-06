import { Snackbar, Alert } from '@mui/material';
import React from 'react';

interface ErrorAlertProps {
    error: string | null;
    onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%', height: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorAlert;
