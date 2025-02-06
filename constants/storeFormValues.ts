import * as yup from 'yup';

export const initialFormValues = {
    store_name: '',
    address: '',
    postal_code: '',
    phone: '',
    cvr_number: '',
    owner_name: '',
    owner_phone: '',
    email: '',
    website: '',
    control_report_link: '',
    store_type: '',
    store_image: '', // null as File | null,
    menu_background_image: '',
    website_template: '',
    online_order: false,
    delivery: false,
    takeaway: false,
    online_booking: false,
    estimate_delivery_time: 0, // Changed to number
    estimate_takeaway_time: 0, // Changed to number
    viva_terminal_id: '',
    merchant_id: '',
    source_code: '',
    viva_commission: '',
    online_order_commission: '',
    opening_hours: '',
    delivery_hours: ''
};

export const exampleFormValues = {
    store_name: 'store example',
    address: '1234',
    postal_code: '3421',
    phone: '26473587',
    cvr_number: '12463222',
    owner_name: 'asd',
    owner_phone: '12315125',
    email: 'asd@test.dk',
    website_address: 'asd.dk',
    control_report_link: 'asd.dk',
    store_type: 'Type1',
    store_image: 'http://example.com/image.jpg', // null as File | null,
    menu_background_image: 'http://example.com/background.jpg',
    website_template: 'Template1',
    online_order: false,
    delivery: false,
    takeaway: false,
    online_booking: false,
    estimate_delivery_time: 0, // Changed to number
    estimate_takeaway_time: 0, // Changed to number
    viva_terminal_id: '',
    merchant_id: '',
    source_code: '',
    viva_commission: '',
    online_order_commission: '',
    opening_hours: '',
    delivery_hours: ''
};

export const validationSchema = yup.object().shape({
    store_name: yup.string().required('Store name is required'),
    address: yup.string().required('Address is required'),
    postal_code: yup.string().required('Postal code is required'),
    phone: yup.string().required('Phone number is required'),
    cvr_number: yup.string().required('CVR is required'),
    owner_name: yup.string().required('Owner name is required'),
    owner_phone: yup.string().required('Owner phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    // website_address: yup.string().url('Invalid URL'),
    // control_report_link: yup.string().url('Invalid URL'),
    // website_template: yup.string().required('Website template is required'),
    online_order: yup.boolean(),
    delivery: yup.boolean(),
    takeaway: yup.boolean(),
    online_booking: yup.boolean(),
    estimate_delivery_time: yup.number().when('online_booking', {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required('Estimate delivery time is required')
    }),
    estimate_takeaway_time: yup.number().when('takeaway', {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required('Estimate takeaway time is required')
    }),
    viva_terminal_id: yup.string(),
    merchant_id: yup.string(),
    source_code: yup.string(),
    viva_commission: yup.string(),
    online_order_commission: yup.string().when('online_order', {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required('Online order commission is required')
    }),
    opening_hours: yup.string().required('Opening hours are required'),
    delivery_hours: yup.string().when('delivery', {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required('Delivery hours are required')
    })
});
