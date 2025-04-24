// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/login.png";

const UserDropdown = () => {
  const loggout = () => {
    localStorage.removeItem('token', '')
    localStorage.removeItem('nombres', '')
    localStorage.removeItem('apellidos', '')
    localStorage.removeItem('idu', '')
    localStorage.removeItem('cargo', '')
    localStorage.removeItem('rol', '')
  }

  const nombres = localStorage.getItem('nombres')
  const apellidos = localStorage.getItem('apellidos')
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{nombres}</span>
          <span className="user-status">{apellidos}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login" onClick={loggout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">SALIR</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
