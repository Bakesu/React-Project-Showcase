import React from 'react';
import { Grid, TextField } from '@mui/material';

interface PaymentSectionProps {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const VivaSection: React.FC<PaymentSectionProps> = ({ formValues, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="viva_terminal_id"
          label="Viva Terminal ID *"
          value={formValues.viva_terminal_id}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="merchant_id"
          label="Merchant ID *"
          value={formValues.merchant_id}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="source_code"
          label="Source Code *"
          value={formValues.source_code}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="viva_commission"
          label="Viva Commission *"
          value={formValues.viva_commission}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="online_order_commission"
          label="Online Order Commission"
          value={formValues.online_order_commission}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default VivaSection;