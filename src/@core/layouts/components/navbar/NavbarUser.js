import NavbarSearch from "./NavbarSearch";
import UserDropdown from "./UserDropdown";

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch className="ms-5" />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
