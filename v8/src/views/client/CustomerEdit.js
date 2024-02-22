/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Spinner, Button, Form } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/api/productSlice";
import DataTable from 'react-data-table-component';
import { ChevronDown } from "react-feather";
import { deleteCustomer, editCustomer } from "../../redux/api/userSlice";
import { deleteCustomerPurchase } from "../../redux/api/purchaseSlice";

export const columns = () => [
    {
        name: 'Product',
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
                                    await dispatch(getProduct(row.id));

                                    // Navigate to edit page
                                    navigate(`/product/edit/${row.id}`);
                                } catch (error) {
                                    console.error('Error getting product', error);
                                }
                            }}>{row?.name}</span>
                        </span>
                    </div>
                </>
            )
        }
    },
];

const CustomerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const selectedCustomer = useSelector((state) => state.userState.selectedCustomer)
    const purchases = useSelector((state) => state.purchaseState.purchases)
    const products = useSelector((state) => state.productState.products);

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [isProcessing, setProcessing] = useState(false);
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const onSubmit = async (data) => {
        setProcessing(true);
        console.log(data)
        try {
            await dispatch(editCustomer({ id, data }));
            setProcessing(false);
            navigate('/customers');
        } catch (error) {
            setProcessing(false);
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            await dispatch(deleteCustomer(id));
            await dispatch(deleteCustomerPurchase(id));
            navigate('/customers')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedCustomer) {
            const fields = ['username', 'email', 'password'];
            fields.forEach((field) => setValue(field, selectedCustomer[field]));
        }

    }, [selectedCustomer, setValue])

    useEffect(() => {
        if (purchases && selectedCustomer && products) {
            const filteredPurchases = purchases.filter(purchase => parseFloat(purchase.customerID) === parseFloat(selectedCustomer.id));
            const productIDs = filteredPurchases.map(purchase => parseFloat(purchase.productID));
            const uniqueProductIDs = Array.from(new Set(productIDs));
            const filteredProducts = products.filter(product => uniqueProductIDs.includes(parseFloat(product.id)));
            setProductData(filteredProducts);
        }
    }, [purchases, selectedCustomer, products]);

    return (
        <div className='main-board'>
            <Container>
                <Row>
                    <Col>
                        <h5 className="display-6">Edit Customer</h5>
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
                                                        <Label className="form-label" for="username">
                                                            Username*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.username })}`}
                                                            type="text"
                                                            id="username"
                                                            {...register("username", { required: true })}
                                                        />
                                                        {errors.username && <span className="text-danger">Username is required.</span>}

                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="email">
                                                            Email*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                            type="email"
                                                            id="email"
                                                            {...register("email", { required: true })}
                                                        />
                                                        {errors.email && <span className="text-danger">Email is required.</span>}

                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="password">
                                                            Password*
                                                        </Label>
                                                        <input
                                                            className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                                            type="password"
                                                            id="password"
                                                            {...register("password", { required: true })}
                                                        />
                                                        {errors.password && <span className="text-danger">Password is required.</span>}

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
                                data={productData}
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

export default CustomerEdit;