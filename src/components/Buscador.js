import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Buscador() {

    const token = sessionStorage.getItem('token');
    
    const navigate = useNavigate();

    const submitHandler = ( e ) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        
        if(keyword.length === 0){
            Swal.fire('Tienes que escribir una palabra.');
        } else if (keyword.length < 3){
            Swal.fire('Tienes que escribir más de 3 caracteres.');
        } else {    
            e.target.reset();     
            navigate(`/resultados/${keyword}`);
        }
    }

    return (
        <>
            {token && 
                <form className="mr-10 px-5 bg-white text-black rounded-md" onSubmit={submitHandler}> 
                    
                    <input type="text" name="keyword" placeholder="Buscar..." className="input w-full max-w-xs text-black focus:outline-none px-0" />
                    <button type="submit" className="focus:outline-none"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            }
        </>
    )
}

export default Buscador;