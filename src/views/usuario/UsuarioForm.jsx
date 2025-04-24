import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const UsuarioForm = ({
    modal, toggle, handleSubmit, register, submit, toggleActualizacion, errors
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
            <ModalHeader toggle={toggle || toggleActualizacion} style={{ borderBottom: '1px solid #12b3f3', backgroundColor: '#e0faff' }}>
                Registrar Usuario
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Registre nombre completo'
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder='Registre su correo electronico'
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span>Este campo es requerido</span>}
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder='Registre su contraseña'
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span>Este campo es requerido</span>}
                    </div>
                    <Row>
                        <Col>
                            <div className='form-group my-2'>
                                <label htmlFor="dni">DNI</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder='Registre su DNI'
                                    {...register('dni', { required: true })}
                                />
                                {errors.dni && <span>Este campo es requerido</span>}
                            </div>
                        </Col>
                        <Col>
                            <div className='form-group my-2'>
                                <label htmlFor="numero">Numero de celular</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder='Registre su numero de celular'
                                    {...register('numero', { required: true })}
                                />
                                {errors.numero && <span>Este campo es requerido</span>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group my-2">
                                <label>Tipo de Rol</label>
                                <select className="form-select" id="role_id" {...register('role_id')} >
                                    <option value="1">Administrador</option>
                                    <option value="2">Usuario</option>
                                </select>
                            </div>
                        </Col>
                        <Col>
                            <div className='form-group my-2'>
                                <label className="form-check-label" htmlFor="status">Estado</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="status"
                                        {...register('status')}
                                    />
                                    <label>Inactivo / Activo</label>
                                </div>
                                {errors.status && <span>Este campo es requerido</span>}
                            </div>
                        </Col>
                    </Row>

                    <div className='form-group my-2'>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default UsuarioForm;
