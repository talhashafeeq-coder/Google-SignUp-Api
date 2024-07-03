import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logout from './Logout';


function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand  href=""> <span className='nav-logo'>BudgetTracker</span> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className='navbarstyle' >Dashboard</Link>
            <Link to="/more" className='navbarstyle' >Transactions</Link>
          </Nav>
          <Nav style={{ marginLeft: '35%' }} className=" navbarstylebtn">
            <Logout />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;