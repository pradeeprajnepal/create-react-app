import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, } from 'reactstrap'; 

class Menu extends Component{
    constructor(props){
        super(props);
    }

    



    render(){
                
        const menu= this.props.dishes.map((dish)=>{
            return (
                 <div   className='col-12 col-md-5 mt-5'>
                    <Card  key={dish.id}
                    onClick={()=> this.props.onClick(dish.id)}>
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        })


        return(
            <div className="container">
                <div className='row'>
                    {menu}
                </div>
               
            </div>
        );
    }
}

export default Menu;