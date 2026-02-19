//src/pages/PurchaseOrders.jsx

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    MenuItem,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

/* Purchase Orders: page
** - Create PO 
** - Approve/Reject PO
** - Track delivery status
** - View PO history
** - Search and filter POs
** - Export PO data
** - Notifications for PO updates
*/
const PurchaseOrders = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        supplier: '',
        product: '',
        quantity: '',
        price: '',
        status: 'Pending',
    });

    // Table columns
    const columns = [
        { field: 'id', headerName: 'PO ID', width: 100 },
        { field: 'supplier', headerName: 'Supplier', width: 150 },
        { field: 'product', headerName: 'Product', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { 
            field: 'status',
            headerName: 'Status',
            render: (value) => (
                <Chip
                    label={value}
                    color={
                        value === 'Approved' ? 'success' :
                        value === 'Rejected' ? 'error' :
                        value === 'Delivered' ? 'primary' :
                        'warning'
                    }
                />
            ),
        },
    ];

    // Create PO
    const handleCreatePO = () => {
        if (formData.supplier && formData.product && formData.quantity && formData.price) {

            const newPO = {
                id: purchaseOrders.length + 1,
                ...formData,
            };
            setPurchaseOrders([...purchaseOrders, newPO]);
            setOpenDialog(false);
            setFormData({
                supplier: '',
                product: '',
                quantity: '',
                price: '',
                status: 'Pending',
            });

            // Update PO status 
            const updateStatus = (po, newStatus) => {
                const updatedPOs = purchaseOrders.map(p =>
                    p.id === po.id ? { ...p, status: newStatus } : p
                );
                setPurchaseOrders(updatedPOs);
            };
        }
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Purchase Orders
            </Typography>
            {/* Create Purchase Order Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                    Create Purchase Order
                </Button>
            </Box>

            {/* Purchase Orders Table */}
            <Paper sx={{ padding: 2 }}>
                <Table 
                    columns={[
                        ...columns
                        {
                            field: 'actions',
                            headerName: 'Actions',
                            render: (row) => (
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => updateStatus(row, 'Approved')}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => updateStatus(row, 'Rejected')}
                                    >
                                        Reject
                                    </Button>
                                </Box>
                            )
                        }
                    ]}
                />  
            </Paper>

            {/* Status Buttons */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {purchaseOrders.map((po) => (
                    <Grid item xs={12} sm={6} md={4} key={po.id}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography>PO #{po.id} - {po.product}</Typography>
                            <Box sx={{ display: "flex", gap:1, mt: 1 }}>
                                <Button 
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    disabled={po.status !== 'Pending'}
                                    onClick={() => updateStatus(po, 'Approved')}
                                >
                                    Approve
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    disabled={po.status !== 'Pending'}
                                    onClick={() => updateStatus(po, 'Rejected')}
                                >
                                    Reject
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    disabled={po.status !== 'Approved'}
                                    onClick={() => updateStatus(po, 'Ordered')}
                                >
                                    Mark as Ordered
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    disabled={po.status !== 'Delivered'}
                                    onClick={() => updateStatus(po, 'Delivered')}
                                >
                                    Mark as Delivered
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Create PO Dialog    */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Create Purchase Order</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Supplier"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    />
                    <TextField
                        label="Product"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    />
                    <TextField
                        label="Quantity"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreatePO}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default PurchaseOrders;

