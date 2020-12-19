import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle, signInWithGitHub } from "helpers/auth";

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

  const googleSignIn = useCallback(async function () {
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const githubSignIn = useCallback(async function () {
    try {
      await signInWithGitHub();
    } catch (e) {
      setError(e.message);
    }
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
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
          </button>
          <button type="button" onClick={githubSignIn}>
            Sign up with GitHub
          </button>
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
