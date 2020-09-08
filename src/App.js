import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './listItems.js';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items: JSON.parse(localStorage.getItem('items')) || [],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.setUpdate=this.setUpdate.bind(this);
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }
    })
    console.log('value ',e.target.value )


  }
  addItem(e){
    e.preventDefault();
    const newItem=this.state.currentItem;
    console.log(newItem);
    if(newItem!==""){
      const newItems=[...this.state.items,newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      }, localStorage.setItem('items', JSON.stringify(this.state.items)) )
    }
  }

  deleteItem(key){
    const filteredItems=this.state.items.filter(item => item.key!==key);
    this.setState({
      items:filteredItems
    },localStorage.setItem('items', JSON.stringify(this.state.items)))
  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    }, localStorage.setItem('items', JSON.stringify(this.state.items)))
    
   
  }
  render(){
    return(
      <div className="App">
        <header>
            <form className="to-do-form" onSubmit={this.addItem}>
                   <input type="text" placeholder="enter text"
                   value={this.state.currentItem.text}
                   onChange={this.handleInput}/>
                   <button type="submit">Add</button>
             </form>
        </header>
        <ListItems items={this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}/>
        </div>
    )
  }
}
export default App;
