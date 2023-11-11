import { useEffect, useState } from "react";
import { Container } from "reactstrap"

import NavbarLayout from "../navbar/Index";

function Laoyut({ children }) 
{
    const IGNORE_PATH = [ '/user/login' ];
  const [ mostrar, setMostrar ] = useState(false);
    // redireccionar a login
    const redireccionar = function()
    {
        let origin = window.location.origin;
        window.location.replace(origin+IGNORE_PATH[0]);
    }
  
  // verificar sesion de usuario
  const getSessionInformation = async function ()
  {
      let sessionInfomationObject = {};
      try{
          
          const sessionInfomation = localStorage.getItem("sessionInfomation");
          if(sessionInfomation != null)
          {
              sessionInfomationObject = JSON.parse(sessionInfomation); 
              if(sessionInfomationObject.user_id == undefined ) redireccionar();
              setMostrar(true);
              return;
          }
          redireccionar();
      }catch(error)
      {
          console.log(error);
           if(error.code == 'ERR_NETWORK' || error.response.data.status == 403)
           {
              localStorage.removeItem("sessionInfomation");
              setTimeout(()=> { redireccionar(); }, 5000)
           }
           else{
                localStorage.removeItem("sessionInfomation");
                redireccionar();
           }
      }
  }

 
  useEffect(()=> {
    if(!IGNORE_PATH.includes(window.location.pathname)) getSessionInformation();
}, [])

    return (
     <>
     {
      mostrar ? (
        
       <Container>
          <NavbarLayout />
          { children }
        </Container>
      ) : "Cargando........."
     }
     </>
    )
}
  
  export default Laoyut
  