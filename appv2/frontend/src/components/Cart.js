import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/search.css";
import useAuth from "../hooks/useAuth";
import user from "../styles/user.png";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {AccountInfo, AccountDel} from "./AccountInfo";

const Cart = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const [resdata, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [toggleDel, setToggleDel] = useState(false);
    const [accInfo, setAccInfo] = useState({});
    
    const getAccInfo = async (username) => {
      var info = await axios.get("/edit", {
        params: {
          username: username
        }
      });
      setAccInfo(info.data);
    }


    const signOut = async () => {
      await logout();
      navigate("/login");
    };


    useEffect(() => {
    }, [auth])

  const displayCart = async (username) => {
    if(username !== null || username !== undefined || username !== '') {
      var result = await axios.get('/cart', {
        params: {
          username: username
        }
      });       
      setData(result.data);
    } else {
      setData([]);
    }
  }

    const removeProduct = async (username, productID) => {
      if(username !== null || username !== undefined || username !== '') {
        var result = await axios.get('/cart/delete', {
          params: {
            username: username,
            productID: productID
          }
        });
        await displayCart(username);
      } else {
        setData([]);
      }
    }

    useEffect(() => {
        displayCart(auth?.user);
    }, [])

    const sidebar = ()=>{
        return (
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
            style={{"width": "280px"}}
          >
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-4">My Cart</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto"/>
            <hr />
            <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user}
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>{auth?.user}</strong>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark text-small shadow"
                aria-labelledby="dropdownUser1"
              >
              <li>
                <a className="dropdown-item" onClick={async()=>{ await getAccInfo(auth?.user);setToggleDel(!toggleDel);}}>
                  Delete Account
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={async()=>{ await getAccInfo(auth?.user); setToggle(!toggle);}}>
                  Update Account
                </a>
              </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                <a className="dropdown-item" onClick={signOut}>
                  Sign out
                </a>
                </li>
              </ul>
            </div>
          </div>
        );
      }


      const searchRes = ()=>{
        return (
          <table className="table table-striped" style={{ "marginTop": "20px" }}>
            <thead>
            <tr>
              <th>ProductID</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Bestbuy Rating</th>
              <th>AI Score</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {resdata?.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.productID}</td>
                  <td>{product.name}</td>
                  <td>{product.company}</td>
                  <td>CA${product.price}</td>
                  <td>
                  {product.aiReviewScore != undefined ? Math.round(product.bestBuyReviewScore*10)/10:
                    <p className="placeholder-wave">
                      <span className="placeholder col-12"></span>
                    </p>
                  }
                  </td>
                  <td>
                    {product.aiReviewScore != undefined ? Math.round(product.aiReviewScore*10)/10:
                  <p className="placeholder-wave">
                    <span className="placeholder col-12"></span>
                  </p>}</td>
                  <td>

                  <button className="btn btn-primary" onClick={()=>{
                      removeProduct(auth?.user, product.productID);
                      console.log(product.productID);
                    }}>  Remove from Cart
                    </button>  
                    
                  </td>

                </tr>
              );
            })}
          </tbody>
          </table>
        );
      }

    return (
        <div className="content-area">
          <AccountInfo info={accInfo} show={toggle}
        onHide={() => setToggle(false)} />
      <AccountDel info={accInfo} show={toggleDel}
      onHide={() => setToggleDel(false)} />
        {sidebar()}
        <div className = "search-area">
        {searchRes()}
        </div>
  
  
        
       </div>
    )
}

export default Cart
