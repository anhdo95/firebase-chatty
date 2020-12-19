import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { signup } from "helpers/auth";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setError();
      
      try {
        await signup(email, password);
      } catch (e) {
        setError(e.message);
      }
    },
    [email, password]
  );

  const handleChange = useCallback(({ target }) => {
    const setter = {
      email: setEmail,
      password: setPassword,
    }[target.name];

    setter(target.value);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
          ></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
