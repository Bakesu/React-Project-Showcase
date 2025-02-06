import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Tabs, Tab, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StoreInfoSection from 'components/storemanagement/forms/StoreInfoSection';
import VivaSection from 'components/storemanagement/forms/VivaSection';
import DetailsSection from 'components/storemanagement/forms/DetailsSection';
import axios from 'axios';
import { initialFormValues } from 'constants/storeFormValues';

interface EditStoreDialogProps {
    open: boolean;
    onClose: (refresh?: boolean) => void;
    store: any;
}

const EditStoreDialog: React.FC<EditStoreDialogProps> = ({ open, onClose, store }) => {
    const theme = useTheme();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        setFormValues({ ...initialFormValues, ...store });
    }, [store]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            console.log('Updating store with ID:', store.id); // Log the store ID
            console.log(formValues)
            const response = await axios.post(`https://apilink.com/store/update/?id=${store.id}`, formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Store updated successfully:', response.data);
            onClose(true); // Refresh the store list
        } catch (error) {
            console.error('Error updating store:', error);
        }
    };

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="md">
            <DialogTitle>Edit Store</DialogTitle>
            <DialogContent>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Tab label="Info" />
                    <Tab label="Details" />
                    <Tab label="Payment" />
                </Tabs>
                <Box mt={2}>
                    {tabIndex === 0 && <StoreInfoSection formValues={formValues} handleChange={handleChange} />}
                    {tabIndex === 1 && <DetailsSection formValues={formValues} handleChange={handleChange} setFormValues={setFormValues} />}
                    {tabIndex === 2 && <VivaSection formValues={formValues} handleChange={handleChange} />}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStoreDialog;
