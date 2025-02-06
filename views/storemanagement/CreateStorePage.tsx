'use client';

import { Button, Grid, Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VivaSection from 'components/storemanagement/forms/VivaSection';
import StoreInfoSection from 'components/storemanagement/forms/StoreInfoSection';
import DetailsSection from 'components/storemanagement/forms/DetailsSection';
import ErrorAlert from 'components/ErrorAlert';
import { useStoreForm } from 'hooks/useStoreForm';

export default function CreateStore() {
  const theme = useTheme();
  const {
    formValues,
    setFormValues,
    error,
    setError,
    handleChange,
    handleSubmit
  } = useStoreForm('/storemanagement/');

  return (
    <Box sx={{ maxWidth: '75%', mx: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        Create Store
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2, border: `1px solid ${theme.palette.grey[400]}`, borderRadius: '8px', mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Store Information
          </Typography>
          <StoreInfoSection formValues={formValues} handleChange={handleChange} />
        </Box>
        <Box sx={{ p: 2, border: `1px solid ${theme.palette.grey[400]}`, borderRadius: '8px', mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Details
          </Typography>
          <DetailsSection
            formValues={formValues}
            handleChange={handleChange}
            setFormValues={setFormValues}
          />
        </Box>
        <Box sx={{ p: 2, border: `1px solid ${theme.palette.grey[400]}`, borderRadius: '8px', mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Payment
          </Typography>
          <VivaSection formValues={formValues} handleChange={handleChange} />
        </Box>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Grid>
      </form>
      <ErrorAlert error={error} onClose={() => setError(null)} />
    </Box>
  );
}