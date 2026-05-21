import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await API.post("/auth/register", form);

            alert("Registered Successfully");

            navigate("/login");

        } catch (err) {

            alert(err.response.data.message);

        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>
        </div>
    );
}

export default Register;