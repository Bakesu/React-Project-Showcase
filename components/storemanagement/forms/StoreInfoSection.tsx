import React from 'react';
import { Grid, TextField } from '@mui/material';

interface InfoSectionProps {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StoreInfoSection: React.FC<InfoSectionProps> = ({ formValues, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Store Name *"
          name="store_name"
          value={formValues.store_name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Owner Name *"
          name="owner_name"
          value={formValues.owner_name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="CVR Number *"
          name="cvr_number"
          value={formValues.cvr_number}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email *"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Address *"
          name="address"
          value={formValues.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Postal Code *"
          name="postal_code"
          value={formValues.postal_code}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Store Phone *"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Owner Phone *"
          name="owner_phone"
          value={formValues.owner_phone}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default StoreInfoSection;
