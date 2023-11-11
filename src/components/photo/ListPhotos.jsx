
import { useState, useEffect } from "react"
import request from "../../config/axios";
import Sidebar from "../sidebar/Index";
import { Col, Row } from "reactstrap";

function ListPhotos() {

    const [ fotos, setFotos ] = useState([]);
    const [ usuarios, setUsuarios ] = useState([]);
    
const generarNumeroAleatorio = () => {
    const numeros = [0, 100];
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    return numeros[indiceAleatorio];
  };
  

  // Función para formatear la fecha
const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
    const año = date.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  };
  

    const cargarFotos =  async (param = false, id="")=> {
        let response = {};
        try
        {
         const sendrequest = param ? await request.get(`/photo/photoUser/${id}`) : await request.get("/photo/photos");
         response = sendrequest.data;
         setFotos(response);
        }
        catch(err)
        {
            console.log("error", err.response);
        }
        
    }

    const cargarUsuarios =  async ()=> {
        let response = {};
        try
        {
         const sendrequest = await request.get("/user/todos");
         response = sendrequest.data;
         setUsuarios(response);
        }
        catch(err)
        {
            console.log("error", err.response);
        }
        
    }

    useEffect(()=> {
        cargarFotos();
        cargarUsuarios();
    }, [])

    // useEffect(()=> {

    // }, [fotos])

    return (
       <Row>
        <Col lg={10}>
        <main className="main-content">
            <ul className="nav justify-content-center bg-white w-25 mb-4">
                <li className="nav-item">
                    <a className="nav-link active fw-bold" aria-current="page" href="#" onClick={()=> cargarFotos(true, JSON.parse(localStorage.getItem('sessionInfomation')).user_id)}>Mis Fotos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link fw-bold" href="#" onClick={()=> cargarFotos(false, "")}>Explorar fotos</a>
                </li>
               
            </ul>

            
            <div className="container-fluid photos">
                <div className="row align-items-stretch">
                    {
                        
                        fotos.map( foto => {
                            if(generarNumeroAleatorio() == 0) {
                                return (
                                    <div key={foto.photo_id} className="col-6 col-md-6 col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="">
                                    <a href="#" className="d-block photo-item">
                                            <img src={`http://localhost:8000\\${foto.url}`} alt="Image" className="img-fluid"/>
                                            <div className="photo-text-more">
                                                <div className="photo-text-more">
                                                    <h3 className="heading">{foto.descripcion}</h3>
                                                    <span className="meta">{formatearFecha(foto.createdAt)}</span>
                                                </div>
                                            </div>
                                    </a>
                                </div>
                                )
                            }
                            else {
                               return (
                                <div key={foto.photo_id} className="col-6 col-md-6 col-lg-4 aos-init" data-aos="fade-up"  data-aos-delay="100">
                                <a href="#" className="d-block photo-item">
                                <img src={`http://localhost:8000\\${foto.url}`} alt="Image" className="img-fluid"/>
                                        <div className="photo-text-more">
                                            <div className="photo-text-more">
                                                <h3 className="heading">{foto.descripcion}</h3>
                                                <span className="meta">{formatearFecha(foto.createdAt)}</span>
                                            </div>
                                        </div>
                                </a>
                            </div>
                               )
                            }
                        })
                    }
                  
                    </div>
                    
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center py-5">
                        <p>

                            Copyright © 2023 All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="#" target="_blank">Team 3</a>

                        </p>
                    </div>
                </div>
            </div>
        </main>
        </Col>
        <Col lg={2}>
            <Sidebar usuarios={usuarios} fn={cargarFotos} />
        </Col>
       </Row>
    )
}

export default ListPhotos