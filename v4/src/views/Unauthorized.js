import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import notAuthImg from '../assets/images/not-authorized-dark.svg';
import logo1Img from '../assets/images/logo.png';

const UnauthorizePage = () => {
    return (
        <div className="misc-wrapper">
            <a className="brand-logo" href='/'>
                <img src={logo1Img} alt="Product Management" className="mb-2 " />
            </a>
            <div className="misc-inner p-2 p-sm-3">
                <div className="w-100 text-center">
                    <h2 className="mb-1">Ooops, you do not have access to this page 🔐</h2>
                    <p className="mb-4">
                        Please contact Management Team if you feel this is incorrect
                    </p>
                    <Button tag={Link} to='/' color="primary" className="btn-sm-block mb-1">
                        Back to Dashboard
                    </Button>
                    <div className='py-4'>
                        <img className="img-fluid" src={notAuthImg} alt="Not authorized page" style={{ maxHeight: '300px'}}/>
                    </div>
                    
                </div>
            </div>
        </div>

    );
};

export default UnauthorizePage;

