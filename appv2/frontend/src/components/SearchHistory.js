import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/search.css";
import useAuth from "../hooks/useAuth";
import user from "../styles/user.png";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import {AccountInfo, AccountDel} from "./AccountInfo";


const SearchHistory = () => {
    const { auth } = useAuth();
    const [resdata, setData] = useState([]);
    const logout = useLogout();
    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false);
    const [toggleDel, setToggleDel] = useState(false);
  
    const [accInfo, setAccInfo] = useState({});
    
    const [orderCheck1, setOrderCheck1] = useState(false);
    const [orderCheck2, setOrderCheck2] = useState(false);
    const [orderCheck3, setOrderCheck3] = useState(false);


    const [minAI, setMinAI] = useState("");

    useEffect(() => {
      displaySearchesRegular();
    }, [])


    const getAccInfo = async (username) => {
      var info = await axios.get("/edit", {
        params: {
          username: username
        }
      });
      setAccInfo(info.data);
      return;
    }

    

    const displaySearchesWithAIScoreFilter = async (value) => {
      const val = parseInt(value) | 0;
      if (val !== '' || val !== null || val !== undefined) {
        var result = await axios.get('/history/minAI',{
          params: {
            filter: value
          }
        });
        setData(result.data);
      }
      return;
    }

    const handleCheckbox = async (Check1, Check2 ,Check3) => {
        var result = await axios.get('/history/hide',{
          params: {
            hideUsernameChecked: Check1,
            hideCountryChecked: Check2,
            hidePriceChecked: Check3
          }
        });
        setData(result.data);
        return;
    }

    const displaySearchesRegular = async () => {
      console.log("displaySearchesRegular");
      var result = await axios.get('/history');
      console.log(result.data[0]);
      setData(result.data);
      return;
    }

    const displaySearchesWithAggregationOnSearch = async () => {
        var result = await axios.get('/history/allSearch');
        setData(result.data);
        return;
    }

    const displaySearchesThatHaveBeenMadeMultipleTimes = async () => {
        var result = await axios.get('/history/dupSearch');
        setData(result.data);
        return;
    }

    const displaySearchesMadeInAllCountries = async () => {
        var result = await axios.get('/history/country');
        setData(result.data);
        return;
    }

    
    const signOut = async () => {
      await logout();
      navigate("/login");
    };


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
              <span className="fs-4">Search History Page</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <div style={{"padding":"10px 0px 5px 0px"}}>
              Filter (min AI score) 
              </div>
              <div className="nav-item input-group mb-3">
                
              <span className="input-group-text">Rating</span>
              <input type="number" className="form-control numb" aria-label="Dollar amount (with dot and two decimal places)" min="0.01" step="0.01" max="2500" onChange={ (e) => 
              {
                setMinAI(e.target.value);
                setOrderCheck1(false);
                setOrderCheck2(false);
                setOrderCheck3(false);
                console.log(e.target.value);
                if(e.target.value == '' | e.target.value == null | e.target.value == undefined){
                  console.log("Display with the username");
                  displaySearchesRegular();
                }else{
                  displaySearchesWithAIScoreFilter(e.target.value);}
                }
                
            }

              value = {minAI}
              onFocus={(e) => {
                e.target.value = "";
                setOrderCheck1(false);
                setOrderCheck2(false);
                setOrderCheck3(false);
                console.log(e.target.value);
                displaySearchesRegular();
              }}
              />
            </div>

          </li>
          <div className="nav-item">
            <input
              className="form-check-input"
              type="checkbox"
              checked={orderCheck1}
              onChange={(e) => {
                setOrderCheck1(e.target.checked);
                handleCheckbox(e.target.checked, orderCheck2, orderCheck3);
                setMinAI("");
              }}
              id="flexCheckDefault1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              &nbsp;&nbsp; Hide Username
            </label>

          </div>
          <div className="nav-item">
            <input
              className="form-check-input"
              type="checkbox"
              checked={orderCheck2}
              onChange={(e) => {
                setOrderCheck2(e.target.checked);
                handleCheckbox(orderCheck1, e.target.checked, orderCheck3);
                setMinAI("");
              }}
              id="flexCheckDefault2"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              &nbsp;&nbsp; Hide Country
            </label>

          </div>
          <div className="nav-item">
            <input
              className="form-check-input"
              type="checkbox"
              checked={orderCheck3}
              onChange={(e) => {
                setOrderCheck3(e.target.checked);
                handleCheckbox(orderCheck1, orderCheck2, e.target.checked);
                setMinAI("");
              }}
              id="flexCheckDefault3"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              &nbsp;&nbsp; Hide Price
            </label>

          </div>
          <br/>
              <button className="nav-link active" onClick={()=>{
                setMinAI("");
                setOrderCheck1(false);
                setOrderCheck2(false);
                setOrderCheck3(false);

                displaySearchesWithAggregationOnSearch();
              }}>
                  Display all searches
              </button>
              <br/>
              <button className="nav-link active" onClick={()=>{
                setMinAI("");
                setOrderCheck1(false);
                setOrderCheck2(false);
                setOrderCheck3(false);
                displaySearchesThatHaveBeenMadeMultipleTimes();
              }}>
                  Display searches &gt; 1 (Duplicates)
              </button>
              <br/>
              <button className="nav-link active" onClick={()=>{
                setMinAI("");
                setOrderCheck1(false);
                setOrderCheck2(false);
                setOrderCheck3(false);
                displaySearchesMadeInAllCountries();
              }}>
                  Display searches made in all countries
              </button>
              <br/>
            </ul>
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
                <th>Username</th>
                <th>Country</th>
                <th>Search</th>
                <th>Name</th>
                <th>Price</th>
                <th>AI Sentiment</th>
                <th>Best Buy Score</th>
                <th>Date</th>


              </tr>
            </thead>
            <tbody>
              {resdata?.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.username}</td>
                  <td>{product.country}</td>
                  <td>{product.search}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    {Math.round(product.aiReviewScore*10)/10 || 'N/A'}
                  </td>
                  <td>
                  {Math.round(product.bestBuyReviewScore*10)/10 || 'N/A'}
                  </td>
                  <td>{product.date}</td>
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

export default SearchHistory
