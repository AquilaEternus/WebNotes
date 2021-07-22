import React from 'react';
import { Link } from 'react-router-dom';

const PageSwitcher = ({ pager, query }) => {

   const checkQuery = (page) => {
      if (query) {
         return location => `${location.pathname}?q=${query}&page=${page}`
      }
      return location => `${location.pathname}?page=${page}`
   }

   return (
      <div className="row center-align">
         <div className="pager">
         {pager.pages && pager.pages.length > 0 && (
            <ul className="pagination">
               <li
                  className={`waves-effect ${
                     pager.currentPage === 1 ? 'invisible' : ''
                  }`}
               >
                  <Link to={checkQuery(1)}>
                        First
                  </Link>
               </li>
               <li
                  className={`waves-effect ${
                     pager.currentPage === 1 ? 'invisible' : ''
                  }`}
               >
                  <Link to={checkQuery(pager.currentPage - 1)}>
                        <i className="material-icons">chevron_left</i>
                  </Link>
               </li>
               {pager.pages.map((page) => (
                  <li
                     key={page}
                     className={`waves-effect ${
                        pager.currentPage === page ? 'active blue' : ''
                     }`}
                  >
                     <Link to={checkQuery(page)}>{page}</Link>
                  </li>
               ))}
               <li
                  className={`waves-effect ${
                     pager.currentPage === pager.totalPages ? 'invisible' : ''
                  }`}
               >
                  <Link to={checkQuery(pager.currentPage + 1)}>
                  <i className="material-icons">chevron_right</i>
                  </Link>
               </li>
               <li
                  className={`waves-effect ${
                     pager.currentPage === pager.totalPages ? 'invisible' : ''
                  }`}
               >
                  <Link to={checkQuery(pager.totalPages)}>
                     Last
                  </Link>
               </li>
            </ul>
         )}
      </div>
      </div>
      
   );
};

export default PageSwitcher;