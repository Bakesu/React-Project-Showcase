import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormControlLabel, Switch } from '@mui/material';

interface DetailsSectionProps {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormValues: React.Dispatch<React.SetStateAction<any>>; // Add setFormValues prop
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ formValues, handleChange, setFormValues }) => {
  const handleStoreTypeChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      store_type: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormValues((prevValues: any) => ({
        ...prevValues,
        [name!]: files[0]
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name!]: checked,
      ...(name === 'online_order' && !checked ? { online_order_commission: '' } : {}),
      ...(name === 'delivery' && !checked ? { delivery_hours: '' } : {}),
      ...(name === 'takeaway' && !checked ? { estimate_takeaway_time: '' } : {}),
      ...(name === 'online_booking' && !checked ? { estimate_delivery_time: '' } : {})
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Opening Hours *"
          name="opening_hours"
          value={formValues.opening_hours}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Website *"
          name="website"
          value={formValues.website}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Control Report Link"
          name="control_report_link"
          value={formValues.control_report_link}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Store Type *</InputLabel>
          <Select
            name="store_type"
            value={formValues.store_type} // Use formValues.store_type
            onChange={handleStoreTypeChange} // Use handleStoreTypeChange
          >
            <MenuItem value="Type1">Retail</MenuItem>
            <MenuItem value="Type2">Store</MenuItem>
            <MenuItem value="Type3">OtherThing</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="file"
          name="store_image"
          label="Store Image *"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              onChange: handleFileChange
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="file"
          name="menu_background_image"
          label="Menu Background Image *"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              onChange: handleFileChange
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Website Template *"
          name="website_template"
          value={formValues.website_template}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formValues.online_order}
              onChange={handleSelectChange}
              name="online_order"
              color="primary"
            />
          }
          label="Online Order"
        />
      </Grid>
      {formValues.online_order === true && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Online Order Commission *"
            name="online_order_commission"
            value={formValues.online_order_commission}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formValues.delivery}
              onChange={handleSelectChange}
              name="delivery"
              color="primary"
            />
          }
          label="Delivery"
        />
      </Grid>
      {formValues.delivery === true && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Delivery Hours *"
            name="delivery_hours"
            value={formValues.delivery_hours}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formValues.takeaway}
              onChange={handleSelectChange}
              name="takeaway"
              color="primary"
            />
          }
          label="Takeaway"
        />
      </Grid>
      {formValues.takeaway === true && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Estimate Takeaway Time *"
            name="estimate_takeaway_time"
            value={formValues.estimate_takeaway_time}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formValues.online_booking}
              onChange={handleSelectChange}
              name="online_booking"
              color="primary"
            />
          }
          label="Online Booking"
        />
      </Grid>
      {formValues.online_booking === true && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Estimate Delivery Time *"
            name="estimate_delivery_time"
            value={formValues.estimate_delivery_time}
            onChange={handleChange}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default DetailsSection;
