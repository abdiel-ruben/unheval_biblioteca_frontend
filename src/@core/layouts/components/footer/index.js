// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0 text-muted">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        &copy; {new Date().getFullYear()} Universidad Nacional Hermilio Valdizán | Intranet - Biblioteca Central 'Javier Pulgar Vidal'
      </span>
    </p>
  );
};

export default Footer;
