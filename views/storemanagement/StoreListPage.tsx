'use client';

import { Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, 
        TableHead, TableRow, Paper, TextField, Dialog, DialogActions, 
        DialogContent, DialogContentText, DialogTitle, TablePagination} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import EditStoreDialog from './EditStoreDialog';
import { initialFormValues } from 'constants/storeFormValues';
import ErrorAlert from 'components/ErrorAlert';

// Define the type for the store data
interface Store {
    id: number;
    store_name: string;
    phone: string;
    address: string;
    tags: string;
}

// ==============================|| STOREMANAGEMENT- STORELIST ||============================== //

export default function StoreListPage() {
    const theme = useTheme();
    const [stores, setStores] = useState<Store[]>([
        { id: 1, store_name: 'Hardcoded Store 1', phone: '123-456-7890', address: '123 Main St', tags: 'electronics, gadgets' },
        { id: 2, store_name: 'Hardcoded Store 2', phone: '987-654-3210', address: '456 Elm St', tags: 'furniture, home decor' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [storeToEdit, setStoreToEdit] = useState<Store | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [error, setError] = useState<string | null>(null); // State for error message

    function handleDelete(storeId: number) {
        // The following code has been changed to use hardcoded store data instead of fetching it from the API
        setStores(prevStores => prevStores.filter(store => store.id !== storeId));
        console.log(`Store with ID: ${storeId} deleted successfully.`);
        // axios.post(`https://apilink.com/store/delete?id=${storeId}`)
        // .then(response => {
        //     console.log(`Store with ID: ${storeId} deleted successfully.`);
        //     setStores(prevStores => prevStores.filter(store => store.id !== storeId));
        // })
        // .catch(error => {
        //     console.error(`There was an error deleting the store with ID: ${storeId}`, error);
        // });
    }

    function handleClickOpen(store: Store) {
        setStoreToDelete(store);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setStoreToDelete(null);
    }

    function handleConfirmDelete() {
        if (storeToDelete) {
            handleDelete(storeToDelete.id);
        }
        handleClose();
    }

    function handleEditClick(store: Store) {
        // The following code has been changed to use hardcoded store data instead of fetching it from the API
        const storeData = {
            ...initialFormValues,
            ...store
        };
        console.log('Using existing store data:', storeData); // Log the store data
        setStoreToEdit(storeData);
        setEditOpen(true);

        // console.log(`Fetching data for store ID: ${store.id}`);
        // axios.get(`https://apilink.com/store/get?id=${store.id}`)
        //     .then(response => {
        //         const storeData = {
        //             ...initialFormValues,
        //             ...response.data
        //         };
        //         console.log('Fetched store data:', storeData); // Log the fetched data
        //         setStoreToEdit(storeData);
        //         setEditOpen(true);
        //     })
        //     .catch(error => {
        //         console.error(`There was an error fetching the store data for ID: ${store.id}`, error);
        //         setError('There was an error fetching the store data.');
        //     });
        
    }

    function handleEditClose(refresh = false) {
        setEditOpen(false);
        setStoreToEdit(null);
        if (refresh) {
            fetchStores();
        }
    }

    function fetchStores() {
        axios.get<Store[]>('https://apilink.com/list')
            .then(response => {
                if (Array.isArray(response.data)) {
                    const storesData = response.data.map(store => ({
                        id: store.id,
                        store_name: store.store_name,
                        phone: store.phone,
                        address: store.address,
                        tags: store.tags || '' // Assuming tags are part of the response
                    }));
                    setStores(storesData);
                } else {
                    console.error('Unexpected response data format:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the store data!', error);
            });
    }

    useEffect(() => {
        fetchStores();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredStores = stores.filter(store =>
        store.store_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.tags?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.phone?.includes(searchQuery) ||
        store.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedStores = filteredStores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Button
                    type="submit"
                    variant="contained"
                    href="/createstore"
                    sx={{ backgroundColor: theme.palette.primary.main }}
                >
                    Create new Store
                </Button>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ borderColor: theme.palette.primary.main }}
                />
            </Stack>
            <ErrorAlert error={error} onClose={() => setError(null)} /> {/* Use ErrorAlert component */}
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ mt: 2.5, backgroundColor: theme.palette.background.paper }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Store Name</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Functions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedStores.map((store) => (
                                    <TableRow key={store.id}>
                                        <TableCell>{store.id}</TableCell>
                                        <TableCell>{store.store_name}</TableCell>
                                        <TableCell>{store.tags}</TableCell>
                                        <TableCell>{store.phone}</TableCell>
                                        <TableCell>{store.address}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button variant="outlined" color="primary" onClick={() => handleEditClick(store)}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" color="error" onClick={() => handleClickOpen(store)}>
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={filteredStores.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this store?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {storeToEdit && (
                <EditStoreDialog
                    open={editOpen}
                    onClose={() => handleEditClose(true)}
                    store={storeToEdit}
                />
            )}
        </>
    );
}