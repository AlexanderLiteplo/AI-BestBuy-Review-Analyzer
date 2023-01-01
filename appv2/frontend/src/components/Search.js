import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/search.css";
import useAuth from "../hooks/useAuth";
import user from "../styles/user.png";
import { useState } from "react";
import axios from "../api/axios";
import {AccountInfo, AccountDel} from "./AccountInfo";

const Search = () => {
  const SEARCH_URL = "/products";
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();


  const [maxPrice, setMaxPrice] = useState("");
  const [orderCheck, setOrderCheck] = useState(false);  
  const [topProducts, setTopProducts] = useState("");
  const [searchID, setSearchID] = useState("");
  const [resdata, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleDel, setToggleDel] = useState(false);

  const [accInfo, setAccInfo] = useState({});
  const [disableFilter, setDisableFilter] = useState(true);

  const getAccInfo = async (username) => {
    var info = await axios.get("/edit", {
      params: {
        username: username
      }
    });
    setAccInfo(info.data);
  }
  
  
  const handleFilter = (topXProducts, orderByAI, maxPriceFilter )  => {
    axios.get(`${SEARCH_URL}/filter`, {
      params: {search_ID: searchID, topXProduct : topXProducts, orderByAI: orderByAI, maxPriceFilter: maxPriceFilter}
    }).then((res) => {
      console.log(res.data);
       setData(res.data);
       // setTopProducts(res.data);
    })
  }
  
  
  const handleSearch = async (user, searchQuery) => {
    setSearch("");
    console.log(user);
    try {
      var resultA = await axios.post(
        SEARCH_URL,
        JSON.stringify({ search: search }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        )
        if(resultA.data.products.length == 0){
          throw new Error("No products found");
        }
        console.log("here is result from axios search url");
        console.log(resultA);
        var productList = resultA.data.products;
        var updatePL = [];
        if (productList.length == 0) {
          setData([{ productID: 123, name: "No results found" }]);
          return;
        } else {
          updatePL = productList.map((product) => {
            var obj = {
              "productID" : product.sku,
              "price" : product.salePrice,
              "name" : product.name,
              "company" : product.manufacturer
            }
            return obj;
          })
          setData(updatePL);
        }
        
        var skus = [];
        updatePL?.map((product) => {
          skus.push(product.productID);
        });
        var resultB = await axios.post(`${SEARCH_URL}/sentiment`, 
        JSON.stringify({ products: skus }),  {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        var sentimentList = resultB.data;
        // setScores(sentimentList);
        console.log(sentimentList[updatePL[0].productID].ratings.trim().split(" ")[0]);
        var updatedProductList = updatePL.map((product) => {
          var obj = {};
          obj["productID"] = product.productID;
          obj["price"] = product.price;
          obj["name"] = product.name;
          obj["company"] = product.company;
          obj["bestBuyReviewScore"] = parseFloat(sentimentList[product.productID].ratings.trim().split(" ")[0]) || 0;
          obj["aiReviewScore"] = sentimentList[product.productID].sentimentScore;
        return obj;
      });
      setData(updatedProductList);
      console.log(updatedProductList);
      var resultC = await axios.post(`${SEARCH_URL}/insert`,
      JSON.stringify({ username : user, search: searchQuery, products: updatedProductList }),  {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      console.log(resultC);
      var searchID = resultC?.data?.searchID;
      console.log("Database insertion successful : " + searchID);
      setSearchID(searchID);
    } catch (error) {
      console.log(error);
    }
    setDisableFilter(false);
  };

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  
  const addToCart = (username, productID) => {
    // console.log(productID);
    axios.post(`${SEARCH_URL}/addToCart`, { username, productID }).then((res) => {
      console.log(res.data);
    });
  };
  
  const sidebar = () => {
    return (
      <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
      style={{ width: "300px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Search Page</span>
        </a>
        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <div className="nav-item">
            <h5 className="text-white" aria-current="page">
              Queries :
            </h5>
          </div>
          <br />
          <li className="nav-item">
            <div style={{ padding: "10px 0px 5px 0px" }}>
              Select top products
            </div>
            <div className="nav-item input-group mb-3">
              <span className="input-group-text">#Products</span>
              <input
                type="number"
                className="form-control numb"
                aria-label="Dollar amount (with dot and two decimal places)"
                min="0.01"
                step="0.01"
                max="2500"
                value={topProducts}
                disabled = {disableFilter}
                onFocus={(e) => {
                  e.target.value = "";
                  setMaxPrice("");
                  setOrderCheck(false);
                  handleFilter(null, null, null);
                }}
                onChange={async(e) => {
                  setTopProducts(e.target.value);
                  handleFilter(e.target.value, null, null);
                }}
              />
            </div>
            <hr />
          </li>
          <div className="nav-item">
            <input
              className="form-check-input"
              type="checkbox"
              checked={orderCheck}
              onChange={(e) => {
                setOrderCheck(e.target.checked);
                setTopProducts("");
              }}
              id="flexCheckDefault"
              disabled = {disableFilter}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              &nbsp;&nbsp; Order By AI Sentiment Score
            </label>
          </div>
          <li className="nav-item">
            <div style={{ padding: "10px 0px 5px 0px" }}>
              Filter (max price)
            </div>
            <div className="nav-item input-group mb-3">
              <span className="input-group-text">CA$</span>
              <input
                type="number"
                className="form-control numb"
                aria-label="Dollar amount (with dot and two decimal places)"
                min="0.01"
                step="0.01"
                max="2500"
                value={maxPrice}
                disabled = {disableFilter}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
                onFocus={(e) => {
                  setMaxPrice("");
                  setTopProducts("");
                }}
              />
            </div>
          </li>
          <div style={{ alignContent: "center", margin: "auto" }}>
            <button type="submit" className="btn btn-primary " onClick={()=>{
              handleFilter(null, orderCheck, maxPrice);
            }
            } disabled = {disableFilter}>
              Search
            </button>
          </div>
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
  };


  const searchbar = () => {
    return (
      <InputGroup className="col-6">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={(e) => (e.key === "Enter" ? (setDisableFilter(true), handleSearch(auth?.user, search)) : null)}
        />
        <Button variant="outline-primary" onClick={()=>
        {
          setDisableFilter(true);
          handleSearch(auth?.user, search);
        }}>
          Search
        </Button>{" "}
      </InputGroup>
    );
  };

  const searchRes = () => {
    if (resdata[0]?.productID != 123) {
      return (
        <table className="table table-striped" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              {/* <th></th> */}
              <th>ProductID</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Bestbuy Rating</th>
              <th>AI Score</th>
            </tr>
          </thead>
          <tbody>
            {resdata?.map((product) => {
              return (
                <tr key={product.productID}>
                  {/* <td>
                    <img
                      src={product.image}
                      style={{ height: "100px" }}
                      alt="not_available"
                    ></img>
                  </td> */}
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
                      addToCart(auth?.user, product.productID);
                    }}>Add to Cart</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="alert alert-danger  search-res">No results found</div>
      );
    }
  };




  return (
    <div className="content-area">
      <AccountInfo info={accInfo} show={toggle}
        onHide={() => setToggle(false)} />
      <AccountDel info={accInfo} show={toggleDel}
      onHide={() => setToggleDel(false)} />
      {sidebar()}
      <div className="search-area">
        {searchbar()}
        {searchRes()}
      </div>
    </div>
  );
};

export default Search;
