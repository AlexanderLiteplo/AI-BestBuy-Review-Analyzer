import { Link } from "react-router-dom"
import '../styles/search.css';
import useAuth from '../hooks/useAuth';
import user from '../styles/user.png'

const GlobalInventory = () => {
    const { auth } = useAuth();
    // const sidebar = ()=>{
    //     return (
    //       <div
    //         className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
    //         style={{"width": "280px"}}
    //       >
    //         <a
    //           href="/"
    //           className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    //         >
    //           <span className="fs-4">Global Inventory</span>
    //         </a>
    //         <hr />
    //         <ul className="nav nav-pills flex-column mb-auto">
    //           <li className="nav-item">
    //             <a href="#" className="nav-link active" aria-current="page">
    //               Filters
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="nav-link text-white">
    //               Sort by price : min
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="nav-link text-white">
    //               Sort by price : max
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="nav-link text-white">
    //               Sort by Rating
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="nav-link text-white">
    //               Sort by Sentiment Analysis
    //             </a>
    //           </li>
    //         </ul>
    //         <hr />
    //         <div className="dropdown">
    //           <a
    //             href="#"
    //             className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
    //             id="dropdownUser1"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             <img
    //               src={user}
    //               alt=""
    //               width="32"
    //               height="32"
    //               className="rounded-circle me-2"
    //             />
    //             <strong>{auth?.user}</strong>
    //           </a>
    //           <ul
    //             className="dropdown-menu dropdown-menu-dark text-small shadow"
    //             aria-labelledby="dropdownUser1"
    //           >
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Delete Account
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Update Account
    //               </a>
    //             </li>
    //             <li>
    //               <hr className="dropdown-divider" />
    //             </li>
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Sign out
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     );
    //   }


      const searchRes = ()=>{
        return (
          <table className="table table-striped" style={{ "marginTop": "20px" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Amazon review Score</th>
                <th>Sentiment Analysic Score</th>
                <th>Location</th>
                <th>Reviews</th>
                <th>Added Date</th>

              </tr>
            </thead>
            <tbody>
              {/* {data['result'].map((song, i) => {
                        return (
                            <tr key={i}>
                                <td>{song.name}</td>
                                <td><a href={song.url} target="_blank" rel="noreferrer">Link</a></td>
                                <td><img src={song.thumbnail} style={{height:"100px"}} alt="not_available"></img></td>
                                <td>{secondsToHms(song.duration)}</td>
                                <td>{convertViews(song.views)} views</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{Play(song.id)}}>Play</button>
                                    <span> </span>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        );
                    })} */}
            </tbody>
          </table>
        );
      }

    return (
        // <div className="content-area">
        // {sidebar()}
        <div className = "search-area">
        {searchRes()}
        </div>
  
  
        
    //   </div>
    )
}

export default GlobalInventory
