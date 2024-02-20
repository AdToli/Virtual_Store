/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { ChevronDown } from "react-feather";

export const columns = () => [
    {
        name: 'Customer',
        selector: (row) => `${row.customer?.username}`,
        sortable: true,
    },
    {
        name: 'Product',
        selector: (row) => `${row.product?.name}`,
        sortable: true,
    },
    {
        name: 'Date',
        selector: (row) => `${row.date}`,
        sortable: true,
    },
];

const PurchaseList = () => {
    const purchases = useSelector((state) => state.purchaseState.purchases)
    const products = useSelector((state) => state.productState.products);
    const users = useSelector((state) => state.userState.users);
    const [purchaseData, setPurchaseData] = useState([]);
    const [allPurchaseData, setAllPurchaseData] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');
    const queryParams = {
        productID: searchProduct ? parseFloat(searchProduct) : '',
        date: searchDate,
        customerID: searchCustomer ? parseFloat(searchCustomer) : ''
    }
    const paginationRowsPerPageOptions = [15, 30, 50, 100];

    useEffect(() => {
        if (purchases) {
            const cPurchases = purchases.map(purcha => {
                const purchase = { ...purcha };
                purchase.customer = users.find(user => user.id === parseFloat(purchase.customerID));
                purchase.product = products.find(product => product.id === parseFloat(purchase.productID));
                return purchase;
            });
            setPurchaseData(cPurchases);
            setAllPurchaseData(cPurchases);
        }
    }, [products, purchases, users]);

    const handleProductChange = (data) => {
        setSearchProduct(data);
    };
    const handleCustomerChange = (data) => {
        setSearchCustomer(data);
    };

    const handleDateChange = (data) => {
        // Check if the formatted date is valid
        const isValidDate = !isNaN(new Date(data).getTime());
        if (isValidDate) {
            const formattedDate = new Date(data).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            setSearchDate(formattedDate);
        } else {
            setSearchDate('');
        }
    };

    const filterPurchase = (purchaseData, criteria) => {
        return purchaseData.filter(purchaseD => {

            return Object.keys(criteria).every(key => {

                // Skip if criteria value is empty string  
                if (criteria[key] === '') return true;

                if (purchaseD[key] === undefined) return false;

                return purchaseD[key] === criteria[key];
            });
        });
    }


    const handleSearchPurchase = () => {
        const filtered = filterPurchase(allPurchaseData, queryParams)
        setPurchaseData(filtered);

    }

    return (
        <div className='main-board'>
            <Container>
                <Row className="table-header">
                    <Col>
                        <h5 className="display-6">Purchases</h5>
                    </Col>

                </Row>

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <select
                                    className="form-control"
                                    type="text"
                                    id="product"
                                    onChange={(e) => { handleProductChange(e.target.value); }}
                                >
                                    <option value="">Select...</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col md="3">
                                <select
                                    className="form-control"
                                    type="text"
                                    id="customer"
                                    onChange={(e) => { handleCustomerChange(e.target.value); }}
                                >
                                    <option value="">Select...</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col md="3">
                                <input type="date" className="form-control" id="purchaseDate" onChange={(e) => { handleDateChange(e.target.value); }} />
                            </Col>
                            <Col md="3">
                                <Button type="button" className="mr-1 d-flex" color="primary" onClick={handleSearchPurchase}>

                                    <span>Search</span>
                                </Button>
                            </Col>
                        </Row>

                    </CardBody>
                    <DataTable
                        data={purchaseData}
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
    )
}

export default PurchaseList;