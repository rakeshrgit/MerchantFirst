import React, {useContext} from "react";
import ProjectsContext from '../../context/projectsContext';
import _ from 'lodash';// underscore
const Pagination = props =>{
    const currentPagination = useContext(ProjectsContext)
    const {pageSize, currentPage} = currentPagination;
    const {itemsCount, onPageChange} = props;
    //console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return <nav >
    <ul className="pagination">
       {pages.map(page => 
            <li key={page} className={page === currentPage ? 'page-item active':'page-item'}>
                <button  className="page-link" onClick={() => onPageChange(page)}>{page}</button>
            </li>
        )} 
      
   
    </ul>
  </nav>;
}

export default Pagination;