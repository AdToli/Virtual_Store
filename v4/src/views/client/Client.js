/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Card, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/api/productSlice";
import { ChevronDown, Plus } from "react-feather";

const Client = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.userState.user);
    const users = useSelector((state) => state.userState.users);
    const purchases = useSelector((state) => state.purchaseState.purchases);
    const products = useSelector((state) => state.productState.products);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        if (users) {
            const cUsers = users.map(user => {
                const tUser = { ...user };
                const userPurchases = purchases.filter(purchase => parseFloat(purchase.customerID) === parseFloat(user.id));
                const userProducts = userPurchases.map(userPurchase => {
                    const purchase = { ...userPurchase };
                    purchase.customer = users.find(u => u.id === parseFloat(purchase.customerID));
                    purchase.product = products.find(product => product.id === parseFloat(purchase.productID));
                    return purchase;
                });
            
                tUser.products = userProducts;
            
                return tUser;
            });

            setClients(cUsers);
        }
    }, [products, purchases, users]);

    const paginationRowsPerPageOptions = [15, 30, 50, 100];

    const columns = () => [
        {
            name: 'Username',
            selector: (row) => `${row.username}`,
            sortable: true,
        },
        {
            name: 'Product',
            cell: (row) => {
                const navigate = useNavigate();
                const dispatch = useDispatch();
                const handleClick = async (id) => {
                    if (user.role === 'admin') {
                        try {
                            // Dispatch action to get product
                            await dispatch(getProduct(id));
    
                            // Navigate to edit page
                            navigate(`/product/edit/${id}`);
                        } catch (error) {
                            console.error('Error getting product', error);
                        }
                    }
                }
                return (
                    <div>
                        {row.products.map((product, index) => (
                            <>
                            <div key={`${index}`} className="d-flex align-items-center">

                                <span className="p-2">
                                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleClick(product.id)}>{product.customer?.username}</span>
                                </span>

                                <span className="p-2">{product.date}</span>
                            </div>

                        </>
                        ))}
                    </div>
                )
            },
        },
    ];
    return (
        <div className='main-board'>
            <Container>
                <Row className="table-header">
                    <Col>
                        <h5 className="display-6">Customer: {user?.username}</h5>
                    </Col>
                    <Col
                        md="4"
                        className="d-flex align-items-center justify-content-end"
                    >
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => navigate('/customer/buyProduct')}
                        >
                            <Plus size={14} />
                            <span className="align-middle "> Buy Product </span>
                        </Button>
                    </Col>
                </Row>

                <Card>
                    <DataTable
                        data={clients}
                        responsive
                        className="react-dataTable"
                        noHeader
                        pagination
                        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                        columns={columns()}
                        sortIcon={<ChevronDown />}
                    />
                </Card>

            </Container>
        </div>
    );
}

export default Client;