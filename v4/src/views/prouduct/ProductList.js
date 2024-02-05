/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, Card, CardBody, CardTitle, } from 'reactstrap';
import { Archive, ChevronDown, MoreVertical, Plus } from "react-feather";
import { getProduct } from "../../redux/api/productSlice";
import { Link } from 'react-router-dom';
import { getCustomer } from "../../redux/api/userSlice";

const ProductList = () => {
    const products = useSelector((state) => state.productState.products)
    const purchases = useSelector((state) => state.purchaseState.purchases)
    const users = useSelector((state) => state.userState.users);
    const user = useSelector((state) => state.userState.user);
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [enrichProducts, setEnrichProducts] = useState([]);

    const columns = () => [
        {
            name: 'Name',
            selector: (row) => `${row.name}`,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => `${row.price}`,
            sortable: true,
        },
        {
            name: 'quantity',
            selector: (row) => `${row.quantity}`,
            sortable: true,
        },
        {
            name: 'Customer',
            width: '300px',
            cell: (row) => {
                const navigate = useNavigate();
                const dispatch = useDispatch();
                const handleCustomer = async (id) => {
                    if (user.role === 'admin') {
                        await dispatch(getCustomer(id));
                        navigate(`/customer/edit/${id}`);
                    }

                }
                return (
                    <>
                        <div>
                            {row.purchases.map((pur, index) => (
                                <>
                                    <div key={`${index}`} className="d-flex align-items-center">

                                        <span className="p-2">
                                            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleCustomer(row.id)}>{pur.customer?.username}</span>
                                        </span>

                                        <span className="p-2">{pur.date}</span>
                                        {user && user.role === 'admin' && (
                                            <Link to={`/customer/buy/${pur.customer?.id}`}>
                                                Add
                                            </Link>
                                        )}


                                    </div>

                                </>

                            ))}
                        </div>
                    </>
                )
            }
        },
        {
            name: 'Actions',
            width: '120px',
            cell: (row) => {
                const navigate = useNavigate();
                const dispatch = useDispatch();
                return (
                    <>
                        {user.role === 'admin' && (
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div" className="btn btn-sm">
                                        <MoreVertical size={14} className="cursor-pointer action-btn" />
                                    </DropdownToggle>
                                    <DropdownMenu end container="body">
                                        <DropdownItem
                                            className="w-100"
                                            onClick={async () => {
                                                try {
                                                    // Dispatch action to get product
                                                    await dispatch(getProduct(row.id));

                                                    // Navigate to edit page
                                                    navigate(`/product/edit/${row.id}`);
                                                } catch (error) {
                                                    console.error('Error getting product', error);
                                                }
                                            }}
                                        >
                                            <Archive size={14} className="mr-50" />
                                            <span className="align-middle">Edit</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        )}

                    </>
                )
            }
        },
    ];

    useEffect(() => {
        if (purchases) {
            let totalSum = 0;
            purchases.forEach(purchase => {
                const product = products.find(p => p.id === parseFloat(purchase.productID));

                if (product) {
                    totalSum += product.price;
                }
            });

            setBalance(totalSum);
        }
        if (products && purchases && users) {

            const enrichedProducts = products.map(product => {

                const enrichedProduct = { ...product };

                enrichedProduct.purchases = purchases
                    .filter(purchase => purchase.productID === product.id)
                    .map(purchase => {
                        return {
                            ...purchase,
                            customer: users.find(user => user.id === parseFloat(purchase.customerID)),
                        }
                    });

                return enrichedProduct;

            });
            setEnrichProducts(enrichedProducts);

        }
    }, [products, purchases, users])

    return (
        <div className='main-board'>
            <Container>
                <Row>
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <CardTitle>
                                    Purchased Balance
                                </CardTitle>
                                <h5 className="display-6">{balance} $</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <Row className="table-header">
                            <Col>
                                <h5 className="display-6">Products</h5>
                            </Col>
                            {user && user.role === 'admin' && (
                                <Col
                                    md="4"
                                    className="d-flex align-items-center justify-content-end"
                                >
                                    <Button
                                        size="sm"
                                        color="primary"
                                        onClick={() => navigate('/product/create')}
                                    >
                                        <Plus size={14} />
                                        <span className="align-middle "> Add </span>
                                    </Button>
                                </Col>
                            )}

                        </Row>

                        <Card>
                            <DataTable
                                data={enrichProducts}
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
    )
}

export default ProductList;