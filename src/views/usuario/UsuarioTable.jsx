import React from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash2 } from 'react-feather';
import { Badge, Card } from 'reactstrap';
import Sortable from 'sortablejs'

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#e0faff', // Cambia el color aquí
            color: '#000000', // Color del texto del encabezado
        },
    },
}

const UsuarioTable = ({
    data, filter, search,
    actualizarUsuarioId, eliminarUsuario
}) => {

    const columns = [
        {
            sortable: true,
            name: 'ID',
            minWidth: '15px',
            maxWidth: '80px',
            selector: row => row?.id
        },

        {
            sortable: true,
            name: 'Nombre completo',
            minWidth: '25px',
            selector: row => row?.name,
            cell: row => {
                return (
                    <>
                        <p>{row?.name}</p>
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Correo Electronico',
            minWidth: '25px',
            selector: row => row?.email,
            cell: row => {
                return (
                    <>
                        <p>{row?.email}</p>
                    </>
                )
            }
        },



        {
            sortable: true,
            name: 'Numero de telefono',
            minWidth: '25px',
            selector: row => row?.numero
        },

        {
            sortable: true,
            name: 'DNI',
            minWidth: '25px',
            selector: row => row?.dni
        },

        {
            sortable: true,
            name: 'ROL',
            minWidth: '25px',
            selector: row => row?.role_id === 1 ? 'Administrador' : row?.role_id === 2 ? 'Usuario' : 'Desconocido'
        },

        {
            sortable: true,
            name: 'Estado',
            minWidth: '50px',
            selector: row => {
                return (
                    <>
                        {
                            row?.status == true ?

                                <Badge color='light-success'>
                                    Activo
                                </Badge>
                                :
                                <Badge color='light-warning'>
                                    Inactivo
                                </Badge>

                        }
                    </>
                )
            }
        },

        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            minWidth: '200px',
            maxWidth: '400px',
            cell: row => {
                return (
                    <div className='d-flex gap-1 my-1'>

                        <button className='btn btn-outline-primary'
                            onClick={() => actualizarUsuarioId(row?.id)}
                            title="Editar"
                        >
                            <Edit />
                        </button>
                        <button className='btn btn-outline-dark' style={{ backgroundColor: '#ffffff', color: 'red' }}
                            onClick={() => eliminarUsuario(row?.id)}
                            title="Eliminar"
                        >
                            <Trash2 />
                        </button>

                    </div>
                )
            }
        }


    ]

    return (
        <>
            <Card className='mt-2'>
                <DataTable
                    customStyles={customStyles}
                    noHeader
                    pagination
                    className='react-datatable'
                    columns={columns}
                    data={search ? filter : data}

                />
            </Card>
        </>
    )
}

export default UsuarioTable