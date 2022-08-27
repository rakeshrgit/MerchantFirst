import React, { Component } from 'react';
class Categories extends Component {
    state = {  } 
   
    render() { 
        const { 
            categories,
            currentCategory, 
            onItemSelect,
            valueProperty,
            textProperty 
        } = this.props;

        //console.log('post categories', currentCategory)  
        return (
            <div>
               
                <ul className="list-group">
                    {categories.map(category=>(
                        <li 
                            onClick={()=> onItemSelect(category)} 
                            className={category === currentCategory ? "list-group-item active" : "list-group-item"} key={category[valueProperty]}>
                                {category[textProperty]}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
Categories.defaultProps = {
    textProperty: "name",
    valueProperty: "id"
};
export default Categories;