import axios from 'axios';
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email === '' || password === '') {
            Swal.fire('Los campos no pueden estar vacíos.');
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            Swal.fire('Debes escribir una dirección de correo electrónico válida');
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            Swal.fire('Credenciales inválidas');
            return;
        }

        axios.post('http://challenge-react.alkemy.org', { email, password })

            .then((res) => {
                // Guardo el token
                const token = res.data.token;
                sessionStorage.setItem('token', token);

                // Muestro al usuario el ingreso correcto
                Swal.fire('Perfecto, ingresaste correctamente.')
                    .then(() => {
                        // Redirecciono a la página listado
                        navigate('/listado');
                    })

            })
    }
    
    const token = sessionStorage.getItem('token');

    return (
        <div className='flex flex-col items-center'>            
            {token && <Navigate replace to="/listado" />}

            <h2 className='text-4xl'>Formulario de Login</h2>
            <form onSubmit={submitHandler} className='w-fit'>

                <label>
                    <span className="label">Correo electrónico: </span>
                    <input type="email" name="email" autoComplete="username" className="input input-bordered w-full max-w-xs" />
                </label>

                <label>
                    <span className="label">Contraseña: </span>
                    <input type="password" name="password" autoComplete="current-password" className="input input-bordered w-full max-w-xs" />
                </label>

                <button type="submit" className='btn	btn-primary mt-3'>Ingresar</button>
            </form>
        </div>
    )
}

export default Login;