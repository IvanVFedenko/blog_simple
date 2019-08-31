import React from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import Input from '@material-ui/core/Input';

import './Styles/new_post.css'

import {
  posts,
  getPostThunkCreator,
} from './store';

class NewPost extends React.Component {
  state = {
    post: [],
    title: '',
    body: '',
    creator: '',
  }
    
  componentDidMount() {
    this.props.getPostThunkCreator()
  }
    
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^ \wа-яА-ЯІіЇїЁё]/g, '')
    })
  }
    
  handleSubmit = () => {
    const url ='https://simple-blog-api.crew.red/posts'
    const d = new Date();
    const curr_date = d.getDate();
    const curr_month = d.getMonth() + 1;
    const curr_year = d.getFullYear();
    
    const data = { 
      title: this.state.title,
      body: this.state.body,
      creator: this.state.creator,
      date: (curr_year + "-" + curr_month + "-" + curr_date),
    }
    
    fetch(url, { method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }})
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)) 
        .then(() => this.props.getPostThunkCreator())
    
    this.setState({
      title: '',
      body: '',
      creator: '',
    })
  }

    render() {
      const { title, body, creator } = this.state;
      return(
        <div className="new_post">
          <NavLink to="/posts">
            <img 
              src={require('./img/return-button-png-34571.png')}
              alt="back_buttom" 
              className="back_buttom"
            />
          </NavLink>
          <div>
            <form onSubmit={this.handleSubmit} className="postlist_input_title">
              <Input 
                className="postlist_input_title"
                type='title' 
                name='title' 
                onChange={this.handleChange} 
                placeholder=" Add title"
                value={title}
              />
            </form>
          </div>

          <div>
            <form>
              <Input
                className="postlist_textarea"
                multiline={true}
                type='body' 
                name='body' 
                onChange={this.handleChange} 
                placeholder=" Add post"
                value={body}     
              />
            </form>
          </div>

          <div>
            <form>
              <Input
                className="postlist_input_author"
                type='creator' 
                name='creator' 
                placeholder="Author"             
                onChange={this.handleChange} 
                value={creator}
              />           
            </form> 
          </div>

          <div>
            <Button 
              variant="text" 
              color="default"
              onClick={() => this.handleSubmit()}>
              Add post
            </Button>
          </div>                  
        </div>
        )
    }
}
const getData = (state) => ({ 
  posts: posts(state)
});
const getMethod = (dispatch) => ({ 
  getPostThunkCreator: () => dispatch(getPostThunkCreator()),
});
  export default connect(getData, getMethod) (NewPost);