import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class Button extends Component {
  state = {
    counter: 0,
    myText: ` My clicks: 0 ${this.props.buttonText}`
  };

  myOnClickHandler = () => {
    this.props.onClickFunction();
    this.setState(
      (prevState) => ({
        counter: prevState.counter + 1,
        myText: ` My clicks: ${(prevState.counter + 1)} ${this.props.buttonText}`
      })
    );
  };

  render() {
    return (
      <div>
        <button className="App-button" onClick={this.myOnClickHandler}>{this.state.myText + this.props.buttonText}
        </button>
      </div>);
  };
}

const Welcome = (props) => {
  return (
    <div>
      <h1> {props.text}</h1>
    </div>
  );
};

const Card = (props) => {
  return (
    <div>
      <img src={props.avatar_url} alt="cannot display" style={{ width: '5em', height: '5em' }} />
      <div style={{ display: 'inline-block' }}>
        <div style={{ fontSize: '1em', weight: 'bold', width: '10em', height: '2em', margin: '0em'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

class Form extends Component {
  state = { cardName: '' }

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    axios.get(`https://api.github.com/users/${this.state.cardName}`).then(result => {
      this.props.addToData(result.data);
      console.log(result);
      this.setState({ cardName: '' });
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler} style={{ margin: '2em' }}>
        <input type='text' placeholder='search person' value={this.state.cardName}
          onChange={(event) => { this.setState({ cardName: event.target.value }) }}></input>
        <button title='Submit'>
          Add Card</button>
      </form>
    );
  }
}

const CardList = (props) => {
  return (
    <div style={{ Margin: '2em' }}>
      {props.data.map(card => { return <Card key={card.id} {...card} /> })}
    </div>
  );
}

class App extends Component {
  state = {
    counter: 0,
    childCounter: 0,
    buttonText: ". Total clicks 0",
    welcomeText: "Welcome To React World",
    data: []
  };

  onClickHandler = () => {
    this.setState(
      // avoid doing inplace call to prevent race condition
      // this will result in update and store in async way so you never know which is happening first
      // DO NOT MAKE SUCH MISTAKES: counter: this.state.counter + 1
      // Follow below way of updating state
      (prevState) => ({
        counter: prevState.counter + 1
      }));
  };

  childButtonClickHandler = () => {
    this.setState(
      (prevState) => ({
        childCounter: prevState.childCounter + 1,
        buttonText: ` Parent State Total clicks: ${prevState.childCounter + 1}`
      }));
  };

  addToData = (result) => {
    this.setState(
      (prevState) => ({
        data: prevState.data.concat(result)
      }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Welcome className="App-welcome" text={this.state.welcomeText}></Welcome>
        <button className="App-button" onClick={this.onClickHandler}>{this.state.counter}</button>
        <Button onClickFunction={this.childButtonClickHandler} buttonText={this.state.buttonText}></Button>
        <Button onClickFunction={this.childButtonClickHandler} buttonText={this.state.buttonText}></Button>
        <Button onClickFunction={this.childButtonClickHandler} buttonText={this.state.buttonText}></Button>
        <Button onClickFunction={this.childButtonClickHandler} buttonText={this.state.buttonText}></Button>
        <Form addToData={this.addToData}></Form>
        <CardList data={this.state.data}></CardList>
      </div>
    );
  }
}

export default App;
