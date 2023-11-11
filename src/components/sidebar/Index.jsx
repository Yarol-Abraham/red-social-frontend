


function Sidebar({ usuarios, fn }) 
{
    
    return (
        <>
            <h6 className="fw-bold">Usuarios </h6>
            <ul className="nav flex-column bg-white shadow">
                {
                    usuarios.map(usuario=> (
                        <li key={usuario.user_id} className="nav-item">
                            <a className="nav-link active border" aria-current="page" href="#" onClick={()=> fn(true, usuario.user_id)} >{usuario.nombre} {usuario.apellido}</a>
                        </li>
                    ))
                }
             
            </ul>
        </>
    )

}

export default Sidebar;