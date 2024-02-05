import { Container, Row, Col, Card, CardBody, Label, FormGroup, Spinner, Button, Form } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct } from "../../redux/api/purchaseSlice";

const CustomerBuyProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customerId } = useParams();
    const products = useSelector((state) => state.productState.products)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isProcessing, setProcessing] = useState(false);
    const onSubmit = async (data) => {
        setProcessing(true);
        try {
            await dispatch(buyProduct({ data, user: customerId }));
            setProcessing(false);
            navigate('/products');
        } catch (error) {
            setProcessing(false);
            console.log(error)
        }
    }

    return (
        <div className='main-board'>
            <Container>
                <Row>
                    <Col>
                        <h5 className="display-6">Buy Product</h5>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md="9" sm="12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md="6" sm="12">
                                            <FormGroup>
                                                <Label className="form-label" for="product">
                                                    Product*
                                                </Label>
                                                <select
                                                    className={`form-control ${classnames({ 'is-invalid': errors.product })}`}
                                                    type="text"
                                                    id="product"
                                                    {...register("product", { required: true })}
                                                >
                                                    <option value="">Select...</option>
                                                    {products.map(product => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.product && <span className="text-danger">Product is required.</span>}

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12">
                                            <FormGroup className="d-flex">
                                                <Button type="submit" className="mr-1 d-flex" color="primary" disabled={isProcessing}>
                                                    {isProcessing && (
                                                        <div className="d-flex align-items-center mr-1">
                                                            <Spinner color="light" size="sm" />
                                                        </div>
                                                    )}
                                                    <span>Save</span>
                                                </Button>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Form>

            </Container>
        </div>
    );
}

export default CustomerBuyProduct;