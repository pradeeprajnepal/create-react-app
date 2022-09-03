import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle,CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from 'reactstrap';

import { Control, LocalForm, Errors} from 'react-redux-form';



 //Assignment 3

 //validators

 const required=(val)=>val && val.length;
 const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
 const minLength=(len)=>(val)=>(val) && (val.length>=len);

 class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isCommentForModalOpen: false
        }
        this.toggleCommentForModal=this.toggleCommentForModal.bind(this);
    this.handleCommentFormSubmit= this.handleCommentFormSubmit.bind(this);
    }
    
 
 toggleCommentForModal(){
    this.setState({
        isCommentForModalOpen: !this.state.isCommentForModalOpen
    })
}

handleCommentFormSubmit(values){
    console.log("Current state is: "+JSON.stringify(values));
    alert("Current State is"+ JSON.stringify(values));
}

 render(){
    return(
        <React.Fragment>
            <Button outline onClick={this.toggleCommentForModal}>
                <span className='fa fa-comment fa-lg'></span>Submit Comment
            </Button>

            <Modal isOpen={this.state.isCommentForModalOpen} toggle={this.toggleCommentForModal} fade={false}>
                <ModalHeader toggle={this.toggleCommentForModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleCommentFormSubmit(values)}>
                       
                        {/*rating*/}
                        <Row className="form-group">
                            <Label htmlFor='rating' md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating"
                                className="form-control"
                                name="rating"
                                id="rating"
                                validators={{
                                    required
                                }}
                                >
                                    <option>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                className='text-danger'
                                model=".rating"
                                show="touched"
                                messages={{
                                    required:"Required",
                                }}
                                />
                            </Col>
                        </Row>

                        {/* author */}
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="First Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                    className='text-danger'
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required:"Requried",
                                        minLength:"Must be greater than 2 characters",
                                        maxLength:"Must be 15 characters or less"
                                    }}
                                />
                            </Col>
                        </Row>

                        {/*comment*/}
                        <Row class="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control"
                                validators={{
                                    required
                                }}
                                />
                                <Errors
                                    className='text-danger'
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                            </Col>

                        </Row>

                        {/*submit button*/}
                        <Row class="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
 }
 }
 
 //end
    
const RenderDish=({dish})=>{
    if(dish != null){
        return(
            <div  className="col-12  m-1">
            <Card >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        )
    }else{
        return(
            <div></div>
        );
    }
}


const RenderComments=({dish,comments})=> {
    if (comments != null) {
       return (
          <div className="col-12 m-1">
             <h4>Comments</h4>
             <ul className="list-unstyled">
             {comments.map((comment) => {
                return (
                   <li key={comment.id}>
                     <p>{comment.comment}</p>
                     <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>                                      
                   </li>
                );
              })}
              </ul>
              <CommentForm dish={dish} comments={comments}/>
          </div>
       );
    }
    else {
       return (
          <div></div>
       );
    }
 }

const DishDetail=(props)=> {
    if (props.dish != null) {
       return (
         <div className="container">
         <div className="row">
             <Breadcrumb>

                 <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
             </Breadcrumb>
             <div className="col-12">
                 <h3>{props.dish.name}</h3>
                 <hr />
             </div>                
         </div>
         <div className="row">
             <div className="col-12 col-md-6 m-1">
                 <RenderDish dish={props.dish} />
             </div>
             <div className="col-12 col-md-4 m-1" >
                 <RenderComments comments={props.comments} />
             </div>
         </div>
         </div>
     );
    }
    else {
       return (
          <div></div> 
       );
    }
 }
 


    
    


export default DishDetail;