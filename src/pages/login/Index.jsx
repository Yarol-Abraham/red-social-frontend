import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../config/axios";
import { Col, Container, Row } from "reactstrap";
function Login() {

  const navigate = useNavigate();

 
  const [ submitted, setSubmitted ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(false);
  const [ correoElectronico, setCorreoElectronico ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ messageResponse, setMessageResponse ] = useState("");
 
  function handleChange(param, e) 
  {
      if(param === 'correoElectronico') setCorreoElectronico(e.target.value);
      if(param === 'password') setPassword(e.target.value);
  }

      // iniciar sesión
      const postSessionInformation = async function(sessionInformationCredential)
      {
          let sessionInformationResponse = { status: "", mensaje: "", usuario: {} };
          try {
              
              const sendRequest = await request.post("/user/login", sessionInformationCredential);
              sessionInformationResponse = sendRequest.data;
              localStorage.setItem("sessionInfomation", JSON.stringify(sessionInformationResponse.usuario));
          } catch (error) {
            console.log(error.response)
              console.log("error en: postSessionInformation() " + error);
              sessionInformationResponse.status = "error";
              sessionInformationResponse.mensaje = "LO SENTIMOS, SERVICIO NO DISPONIBLE";
            
          }
          return sessionInformationResponse;
      }
      

  async function handleSubmit(e)
  {
    e.preventDefault();
    
    setMessageResponse("");

    if((correoElectronico == "" || correoElectronico == null) || (password == "" || password == null) )
    {
      setSubmitted(!submitted);
      return;
    }

    setIsLogin(!isLogin);
    setSubmitted(!submitted);

    const sessionInformationCredentials = {
      correo_electronico: correoElectronico,
      contrasena: password
    }

    const sessionInformationResponse = await postSessionInformation(sessionInformationCredentials);
    console.log(sessionInformationResponse);
    setTimeout(()=> {
      setIsLogin(false);
      if(sessionInformationResponse.status == 'success')
      {
          navigate("/");
      }
      else{
        setMessageResponse(sessionInformationResponse.mensaje);
        setTimeout(()=>setMessageResponse(""), 5000);
      }
    }, 2000)
  }

  useEffect(()=> localStorage.removeItem("sessionInfomation"), [])

  return (
    <>
 
      <section className="ftco-section d-flex justify-content-center align-items-center flex-column">
        
        <div className="container">
          
          <div className="row justify-content-center">
            
            <div className="col-md-6 col-lg-5">
          
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                { 
                  messageResponse != "" && <div className='alert alert-danger m-1 p-0' role='alert'>
                    <span className='p-1 m-1'>{messageResponse}</span>
                  </div>
                }
                <form  className="login-form" onSubmit={handleSubmit} >
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="correoElectronico" 
                      name="correoElectronico" 
                      className="form-control rounded-left mb-2"
                      placeholder="correo"
                      onChange={ (e) => handleChange('correoElectronico', e) }
                      required 
                    />
                     {submitted && !correoElectronico &&
                      <div className="help-block">El correo electr&otilde;nico es requerido</div>
                  }
                  </div>
                  <div className="form-group d-flex">
                    <input 
                      type="password" 
                      id="password"
                      name="password"
                      className="form-control rounded-left" 
                      placeholder="Password" 
                      onChange={ (e) => handleChange('password', e) }
                      required 
                    />
                     {submitted && !password &&
                      <div className="help-block">La contraseña es requerida</div>
                  }
                  </div>
                 
                  <div className="form-group">
                    <button type="submit" className={`btn btn-primary rounded submit  p-3 px-5 ${ !isLogin ? "" : " d-none "}`} >Ingresar</button>
                  {
                    isLogin &&
                    <img className='h-100' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }

                  </div>
                </form>
              </div>
              

            
            </div>
          </div>

          
        </div>
        
        <div className="container h-25 d-flex justify-content-center align-items-center flex-column">
            
          <Row className="d-flex justify-content-center align-items-center">
            <Col>
            <a href="#" className={`text-primary fw-bold rounded text-center p-3 px-5 ${ !isLogin ? "" : " d-none "}`} >¿No tienes cuenta?, Crea Una</a>
            </Col>
          </Row>
          </div>

      </section>
    </>
  )
}

export default Login;
