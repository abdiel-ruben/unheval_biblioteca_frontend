// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import logo from "@src/assets/images/logo/logobiblioteca.png";
import newIllustration from "@src/assets/images/logo/login_p.jpg"; // Asegúrate de que la ruta sea correcta

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import "./styles/style.css";
import axios from "axios";
import { useState } from "react";
import bdLicencias from "../../api/bdLicencias";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();

  const source = newIllustration;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (data) => {
    try {
      const response = await bdLicencias.post("/v1/login1", data); // Reemplaza '/tu-ruta-api' con la ruta real de tu API
      const res = response.data;
      localStorage.setItem("token", res?.api_token);
      localStorage.setItem("rol", res?.rol);
      localStorage.setItem("nombres", res?.name);
      setIsError(false);
      navigate("/usuarios");
    } catch (err) {
      localStorage.setItem("token", "");
      localStorage.setItem("rol", "");
      localStorage.setItem("nombres", "");
      setIsError(true);
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link
          className="brand-logo"
          to="/"
          onClick={(e) => e.preventDefault()}
        ></Link>
        <Col
          className="d-none d-lg-flex align-items-center p-0"
          lg="8"
          sm="12"
          style={{ height: "100vh" }} // Asegura que ocupe toda la altura de la ventana
        >
          <div className="w-100 h-100 d-lg-flex align-items-center justify-content-center">
            <img
              className="w-100 h-100" // Imagen ocupa el ancho y alto completo de la columna
              src={source}
              alt="Login Cover"
              style={{ objectFit: "cover" }} // Ajusta la imagen sin distorsionar
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="text-center mb-4">
              <img
                className="img_local"
                src={logo}
                alt="Logo"
                style={{ width: 100 }}
              />
            </div>
            <CardTitle tag="h2" className="text-center mb-4">
              "Sistema de Control de Asistencia - Biblioteca Central UNHEVAL"
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(submit)}
            >
              <div className="mb-1">
                <Label
                  className="form-label"
                  for="login-email"
                  style={{ fontSize: "15px" }}
                >
                  Email
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      placeholder="admin@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label
                    className="form-label"
                    htmlFor="password"
                    style={{ fontSize: "15px" }}
                  >
                    Contraseña
                  </Label>
                </div>
                <Controller
                  defaultValue=""
                  control={control}
                  id="password"
                  name="password"
                  render={({ field }) => (
                    <div className="position-relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        invalid={errors.password && true}
                        placeholder="Contraseña"
                        {...field}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="position-absolute"
                        style={{
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  )}
                />
              </div>
              {isError && (
                <p className="local_color">
                  Credenciales invalidas, intentalo otra vez...
                </p>
              )}
              <Button color="primary" block className="mt-5">
                Ingresar
              </Button>
            </Form>
            <CardText className="text-center mt-3">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ababab",
                }}
              >
                <span
                  style={{
                    flex: 1,
                    borderBottom: "1px solid #ababab",
                    marginRight: "8px",
                  }}
                ></span>
                <strong>Biblioteca</strong>, "Javier Pulgar Vidal"
                <span
                  style={{
                    flex: 1,
                    borderBottom: "1px solid #ababab",
                    marginLeft: "8px",
                  }}
                ></span>
              </span>
            </CardText>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
