/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import logoImg from '../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/api/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.userState.user)
    const toggle = () => setIsOpen(!isOpen);

    const onLogoutHandler = async () => {
        await dispatch(logout());
    };

    return (
        <header>
            <div className='container'>
                <Navbar color="dark" dark expand="md">
                    <Link to="/">
                        <img src={logoImg} alt='Product Management' style={{ height: '55px', width: 'auto' }} />
                    </Link>
                    <NavbarToggler onClick={toggle} className="ms-auto" />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            {!user && (
                                <>
                                    <NavItem className='nav-item-responsive'>
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </NavItem>
                                    <NavItem className='nav-item-responsive'>
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </NavItem>
                                </>
                            )}

                            {user && (
                                <>
                                    <NavItem className='nav-item-responsive'>
                                        <Link to="/products" className="nav-link">Products</Link>
                                    </NavItem>
                                    <NavItem className='nav-item-responsive'>
                                        <Link to="/customers" className="nav-link">Customers</Link>
                                    </NavItem>
                                    <NavItem className='nav-item-responsive'>
                                        <Link to="/purchases" className="nav-link">Purchases</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <img src={logoImg} alt="user" className='user-img' />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem onClick={onLogoutHandler}>
                                                Log out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
