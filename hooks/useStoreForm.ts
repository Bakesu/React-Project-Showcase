import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { initialFormValues, validationSchema } from 'constants/storeFormValues';

export const useStoreForm = (redirectPath: string) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name!]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const response = await axios.post('https://apilink.com/store/create', formValues, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Store created successfully:', response.data);
      router.push(redirectPath);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.error('Validation errors:', error.errors);
        setError('Please fill out fields marked with a star *.');
      } else {
        console.error('Error creating store:', error);
        setError('An error occurred while creating the store.');
      }
    }
  };

  return {
    formValues,
    setFormValues,
    error,
    setError,
    handleChange,
    handleSubmit
  };
};
