import { Link } from "react-router-dom";

function Login(){
    return(
        <div className="login">
            <input name="nick" placeholder="nick" />
            <input name="password" placeholder="password" />

            <Link to="/" >
                <p>Powrót</p>
            </Link>

        </div>
    );
}

export default Login;