/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Spinner, Button, Form } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct } from "../../redux/api/productSlice";
import DataTable from 'react-data-table-component';
import { ChevronDown } from "react-feather";
import { getCustomer } from "../../redux/api/userSlice";
import { deletePurchase } from "../../redux/api/purchaseSlice";

export const columns = () => [
    {
        name: 'Customer',
        width: '300px',
        cell: (row) => {
            const navigate = useNavigate();
            const dispatch = useDispatch();
            return (
                <>
                    <div className="d-flex align-items-center">

                        <span className="p-2">
                            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} 
                            onClick={async () => {
                                try {
                                    // Dispatch action to get product
                                    await dispatch(getCustomer(row.id));

                                    // Navigate to edit page
                                    navigate(`/customer/edit/${row.id}`);
                                } catch (error) {
                                    console.error('Error getting customer', error);
                                }
                            }}>{row?.username}</span>
                        </span>
                    </div>
                </>
            )
        }
    },
];

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([]);
    const selectedProduct = useSelector((state) => state.productState.selectedProduct)
    const purchases = useSelector((state) => state.purchaseState.purchases)
    const users = useSelector((state) => state.userState.users);

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [isProcessing, setProcessing] = useState(false);
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const onSubmit = async (data) => {
        setProcessing(true);
        try {
            await dispatch(editProduct({ id, data }));
            setProcessing(false);
            navigate('/products');
        } catch (error) {
            setProcessing(false);
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedProduct) {
            const fields = ['name', 'price', 'quantity'];
            fields.forEach((field) => setValue(field, selectedProduct[field]));
        }

    }, [selectedProduct, setValue])

    useEffect(() => {
        if (purchases && selectedProduct && users) {
            const filteredPurchases = purchases.filter(purchase => parseFloat(purchase.productID) === parseFloat(selectedProduct.id));
            const customerIDs = filteredPurchases.map(purchase => parseFloat(purchase.customerID));
            const uniqueCustomerIDs = Array.from(new Set(customerIDs));
            const filteredUsers = users.filter(user => uniqueCustomerIDs.includes(parseFloat(user.id)));
            setCustomers(filteredUsers);
        }
    }, [purchases, selectedProduct, users]);

    const handleDelete = async () => {
        try {
            await dispatch(deleteProduct(id));
            await dispatch(deletePurchase(id));
            navigate("/products")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='main-board'>
            <Container>
                <Row>
                    <Col>
                        <h5 className="display-6">Edit Product</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="name">
                                                            Name*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.name })}`}
                                                            type="text"
                                                            id="name"
                                                            {...register("name", { required: true })}
                                                        />
                                                        {errors.name && <span className="text-danger">Name is required.</span>}

                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="price">
                                                            Price*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.price })}`}
                                                            type="number"
                                                            id="price"
                                                            {...register("price", { required: true })}
                                                        />
                                                        {errors.price && <span className="text-danger">Price is required.</span>}

                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="quantity">
                                                            quantity*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.quantity })}`}
                                                            type="number"
                                                            id="quantity"
                                                            {...register("quantity", { required: true })}
                                                        />
                                                        {errors.quantity && <span className="text-danger">quantity is required.</span>}

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="12">
                                                    <FormGroup className="d-flex">
                                                        <Button type="submit" className="m-1 d-flex" color="primary" disabled={isProcessing}>
                                                            {isProcessing && (
                                                                <div className="d-flex align-items-center mr-1">
                                                                    <Spinner color="light" size="sm" />
                                                                </div>
                                                            )}
                                                            <span>Save</span>
                                                        </Button>
                                                        <Button onClick={handleDelete} type="button" color="danger" className="m-1 d-flex">Delete</Button>
                                                    </FormGroup>
                                                </Col>

                                            </Row>

                                        </CardBody>
                                    </Card>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md="6">
                        <Card>
                            <DataTable
                                data={customers}
                                responsive
                                className="react-dataTable"
                                noHeader
                                pagination
                                paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                                columns={columns()}
                                sortIcon={<ChevronDown />}
                            />
                        </Card>
                    </Col>
                </Row>


            </Container>
        </div>
    );
}

export default ProductEdit;