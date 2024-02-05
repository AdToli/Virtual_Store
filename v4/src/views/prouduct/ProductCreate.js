import { Container, Row, Col, Card, CardBody, Label, FormGroup, Spinner, Button, Form } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/api/productSlice";

const ProductCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isProcessing, setProcessing] = useState(false);
    const onSubmit = async (data) => {
        setProcessing(true);
        try {
            await dispatch(addProduct(data));
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
                        <h5 className="display-6">Create Product</h5>
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

export default ProductCreate;