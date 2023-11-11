import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import request from '../../config/axios';

function NavbarLayout() {

    const [image, setImage] = useState(null);
    const [ message, setMessage ] = useState("");
    const [ description, setDescription ] = useState("");
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCerrarSesion = ()=> {
    let origin = window.location.origin;
    window.location.replace(origin+"/user/login");
  }

   
    const handleSubmit = async (e)=> {
        e.preventDefault();

        const formData = new FormData();
        formData.append('url', image);
        formData.append('descripcion', description);
        formData.append('user_id', JSON.parse(localStorage.getItem('sessionInfomation')).user_id );
    
        try {
          // Reemplaza la URL con la dirección de tu endpoint en el backend
          const response = await request.post('/photo/createPhoto', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('Respuesta del backend:', response.data);
         
          setImage(null);
          setMessage(response.data.message);
          setTimeout(()=> {
            setMessage("");
            toggle();
          }, 2000)
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
    }

    return (
        <nav className="navbar navbar-light bg-white shadow-sm rounded p-2  my-4">
            <div className="container-fluid">
                <a className="navbar-brand">{JSON.parse(localStorage.getItem('sessionInfomation'))?.nombre || "" } {JSON.parse(localStorage.getItem('sessionInfomation'))?.apellido || "" }  <br/>
                  <span className='fs-6'>{JSON.parse(localStorage.getItem('sessionInfomation'))?.biografia || "" }</span>
                 </a>
                
                <div>
                    <Button color="success mx-1" onClick={toggle}>
                        Subir Foto
                    </Button>
                    <Button color="danger" onClick={handleCerrarSesion}>
                        Cerrar Sesión
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Seleccionar Imagen</ModalHeader>
                        <form onSubmit={handleSubmit}  >

                        <ModalBody>
                            {
                                message != "" && <div className='alert alert-success' role='alert'>
                                        <span className='mb-0 p-0'>{message}</span>
                                </div>
                            }
                            <div className='mb-3'>
                                <label htmlFor="label" className='mb-2'>Descripcion (opcional)</label>
                                <input class="form-control form-control-lg" type="text" name='description' id='description' placeholder="Descripcion" onChange={(e)=> setDescription(e.target.value)} />
                          </div>
                            <div className="mb-3">
                             <input 
                                className="form-control" 
                                type="file"
                                 id="formFile" 
                                 onChange={handleImageChange}
                            />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button  type='submit' color="success">
                                Subir imagen
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                        </form>
                    </Modal>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLayout;