import React, { useEffect, useState } from 'react';
import bdLicencias from '../../api/bdLicencias';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UsuarioForm from './UsuarioForm';
import UsuarioTable from './UsuarioTable';
import { UserPlus } from 'react-feather';

const URL = '/v1/usuario';
//const URLregi= '/v1/register';

const Usuario = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [refresh, setRefresh] = useState(false);

    const defaultValuesForm = {
        name: '',
        email: '',
        password: '',
        dni: '',
        numero: '',
        status: '',
        role_id: '',
    };


    const getAuthHeaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const toggle = () => {
        setActualizacion(false);
        reset(defaultValuesForm);
        setModal(!modal);
    };

    const toggleActualizacion = () => {
        setModal(!modal);
    };

    useEffect(() => {
        bdLicencias
            .get(`${URL}`, getAuthHeaders())
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => { });
    }, [refresh]);

    useEffect(() => {
        setFilter(
            data?.filter((e) =>
                e.name.toLowerCase()
                    .indexOf(search?.toLowerCase()) !== -1
            )
        );
    }, [search, data]);

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };

    const crearUsuario = (data) => {
        bdLicencias
            .post(URL, data, getAuthHeaders())
            .then((res) => {
                reset(defaultValuesForm);
                toggle();
                setRefresh(!refresh);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuario creado',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Email registrado, por favor ingrese uno diferente',
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Contacte con soporte',
                        showConfirmButton: false,
                    });
                }
            });
    };

    const actualizarUsuario = (id, data) => {
        bdLicencias
            .put(`${URL}/${id}`, data, getAuthHeaders())
            .then((res) => {
                reset(defaultValuesForm);
                toggle();
                setRefresh(!refresh);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuario Actualizado',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con soporte',
                    showConfirmButton: false,
                });
            });
    };

    const eliminarUsuario = (id) => {
        return Swal.fire({
            title: '¿Estás seguro de eliminar?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                bdLicencias
                    .delete(`${URL}/${id}`, getAuthHeaders())
                    .then((res) => {
                        setRefresh(!refresh);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Usuario Eliminado',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Contacte con soporte',
                            showConfirmButton: false,
                        });
                    });
            }
        });
    };

    const actualizarUsuarioId = (id) => {
        toggleActualizacion();
        setActualizacion(true);
        bdLicencias
            .get(`${URL}/${id}`, getAuthHeaders())
            .then((res) => {
                reset(res.data);
            })
            .catch((err) => null);
    };

    const submit = (data) => {
        if (actualizacion) {
            actualizarUsuario(data.id, data);
        } else {
            crearUsuario(data);
        }
    };

    return (
        <>
            <Row>
                <Col sm="6">
                    <Label className="me-1" for="search-input">
                        Buscar - <strong>Usuario</strong>
                    </Label>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        placeholder="Buscar por nombre y apellidos"
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm="4"></Col>
                <Col sm="2" className="mt-2">
                    <Button onClick={toggle} color="primary" title="Agregar usuario">
                        Agregar <UserPlus />
                    </Button>
                </Col>
            </Row>
            <UsuarioTable
                data={data}
                filter={filter}
                search={search}
                actualizarUsuarioId={actualizarUsuarioId}
                eliminarUsuario={eliminarUsuario}
            />
            <UsuarioForm
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
                errors={errors}
            />
        </>
    );
};

export default Usuario;

