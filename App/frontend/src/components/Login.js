import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/signinup.css';


import axios from "../api/axios";
const LOGIN_URL = "/login";
const REGISTER_URL = '/register';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRefL = useRef();
    const errRefL = useRef();

    const [userL, setUserL] = useState("");
    const [pwdL, setPwdL] = useState("");
    const [errMsgL, setErrMsgL] = useState("");

    const [slider, setSlider] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        // console.log('valid username', validName);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd == matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

  

  var signinForm = () => {
    return (
        <div className={`${modal? 'showform':'hideform'} form1`}>
            {errMsgL? <div ref={errRefL} className="alert alert-danger" role="alert">{errMsgL}</div>: null}
            <h2>Sign In</h2>
            <form>
            <div className="form-group">
                <label className="form-label" htmlFor="usernameL">Email or username</label>
                <input type="email"
                className="form-control"
                id="usernameL"
                ref={userRefL}
                autoComplete="off"
                onChange={(e) => setUserL(e.target.value)}
                value={userL}
                required placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                
            </div>
            <br/>
            <div className="form-group">
                <label className="form-label" htmlFor="passwordL">Password</label>
                <input type="password"
                className="form-control"
                id="passwordL"
                onChange={(e) => setPwdL(e.target.value)}
                value={pwdL}
                required placeholder="Password"/>
            </div>
            <div className="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}/>
                <label className="form-check-label" htmlFor="persist">Remember me</label>
            </div>
            <div className="form-check"></div>
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
            <br/>
            <br/>
            <small id="emailHelp" className="alert alert-light">New User? &nbsp; &nbsp;<button type="button" className="btn btn-dark btn-sm" onClick={()=>{setSlider(true);setUserL('');
        setPwdL('');}}>Register</button></small>

            </form>
        </div>
    );
  };

  var signupForm = () => {
    return (
        <div className={`${modal? 'showform':'hideform'} form2`}>
            {errMsg? <div ref={errRef} className="alert alert-danger" role="alert">{errMsg}</div>: null}
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control"
                            id="username"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <br/>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder="Password"/>
            </div>
            <br/>
            <div className="form-group">
                <label htmlFor="confirm_pwd">Confirm Password</label>
                <input type="password" className="form-control" 
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder="Password"/>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary" disabled={!validName || !validMatch ? true : false} onClick={handleRegister}>Sign up</button>
            <br/>
            <br/>
            <small id="emailHelp" className="alert alert-light">Already a User? &nbsp; &nbsp; <button type="button" className="btn btn-dark btn-sm" onClick={()=>{setSlider(false);setUser('');
        setPwd('');
        setMatchPwd('');}}>Login</button></small>
            </form>
        </div>
    );
  };

  useEffect(() => {
    userRefL.current.focus();
  }, []);

  useEffect(() => {
    setErrMsgL("");
  }, [userL, pwdL]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: userL, password: pwdL }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user : userL, pwd : pwdL, roles, accessToken });
      setUserL("");
      setPwdL("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsgL("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsgL("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsgL("Unauthorized");
      } else {
        setErrMsgL("Login Failed");
      }
      errRefL.current.focus();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    // const v1 = USER_REGEX.test(userL);
    // const v2 = PWD_REGEX.test(pwdL);
    // if (!v1 || !v2) {
    //     setErrMsg("Invalid Entry");
    //     return;
    // }
    try {
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        // TODO: remove console.logs before deployment
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        setUser('');
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        errRefL.current.focus();
    }
}


  const [modal, setModal] = useState(false);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="landing-container">
        <div className={`${modal? "rectangle": "circle"} glass`} onClick={()=>setModal(true)}>
            <div className={` form-container`}>
                {signinForm()}
                {signupForm()}
            </div>
            <h1 className={`${modal? 'notdisplay':'display'} welcome`} >Welcome</h1>
            
            <div className={`${slider? 'left':'right'} slider ${modal? 'showform':'hideform' } ${modal? 'display':'notdisplay'} ${modal? "rectangle": "circle"}`}>
            </div>
        </div>
        
    </div>
  );
};

export default Login;
