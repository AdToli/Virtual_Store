import { useDispatch } from 'react-redux';
import { Form, FormGroup, Label, Button, Card, CardBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';
import { registerUser } from '../../redux/api/userSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data));
            navigate('/login');
        } catch (error) {
            toast.error('User already exists.', {
                position: 'top-right',
            });
        }
    };
    
    return (
        <div className="auth-wrapper auth-v1 px-2">
            <div className="auth-inner py-2">
                <div className='row justify-content-center'>
                    <img src={logoImg} alt='Product Icon' style={{ height: '80px', width: 'auto' }} />
                </div>

                <h4 className="brand-logo">Register</h4>
                <Card className='mb-0'>
                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label>Username</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.username })}`}
                                    type="text"
                                    id="username"
                                    {...register("username", { required: true })}
                                />
                                {errors.username && <span className="text-danger">Username is required.</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                    type="email"
                                    id="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-danger">Email is required.</span>}
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>Password</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className="text-danger">Password is required.</span>}
                            </FormGroup>

                            <div className='mt-4'>
                                <Button color="dark" className='btn-block' type="submit">Register</Button>
                            </div>
                            <div className='mt-4 d-flex justify-content-center'>
                                <span className='me-2'>Already have an account?</span>
                                <Link to="/login" className='text-decoration-none'>
                                    <span className='fw-bold text-danger'>Login Here</span>
                                </Link>
                            </div>

                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register;