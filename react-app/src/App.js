import likeIcon from './icons/like.svg';
import superlikeIcon from './icons/superlike.svg';
import skipIcon from './icons/skip.svg';

import popLike from './icons/popLike.svg';
import popSkip from './icons/popSkip.svg';
import popSuperlike from './icons/popSuperlike.svg';

import data from './data/people.json';
import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.keyId = 0;
    this.like = this.like.bind(this);
    this.skip = this.skip.bind(this);
    this.superlike = this.superlike.bind(this);
    this.addCards = this.addCards.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.expand = this.expand.bind(this);
  }

  handleSwipe = (card) => {

    const container = card.getElementsByClassName("swipe-container").item(0);

    const likeBtn = document.getElementsByClassName("like").item(0);
    const skipBtn = document.getElementsByClassName("skip").item(0);
    const superlikeBtn = document.getElementsByClassName("superlike").item(0);

    container.addEventListener("touchstart", startTouch, { passive: true});
    container.addEventListener("touchmove", moveTouch, { passive: true});

    container.addEventListener("mousedown", startMouse, { passive: true});
    container.addEventListener("mousemove", moveMouse, { passive: true});

    // Swipe Up / Down / Left / Right
    var initialX = null;
    var initialY = null;
    var minitialX = null;
    var minitialY = null;

    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };
    function startMouse(e) {
      minitialX = e.clientX;
      minitialY = e.clientY;
    };

    function moveTouch(e) {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;

      var diffX = initialX - currentX;
      var diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 2) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          skipBtn.click();
          console.log("swiped left");
        } else {
          // swiped right
          likeBtn.click();
          console.log("swiped right");
        }  
      } else if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > 2) {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          superlikeBtn.click();
          console.log("swiped up");
        } else {
          // swiped down
          console.log("swiped down");
        }  
      }

      initialX = null;
      initialY = null;

      // e.preventDefault();
    }
    function moveMouse(e) {
      if (minitialX === null) {
        return;
      }

      if (minitialY === null) {
        return;
      }

      var currentX = e.clientX;
      var currentY = e.clientY;

      var diffX = minitialX - currentX;
      var diffY = minitialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          skipBtn.click();
          console.log("swiped left");
        } else {
          // swiped right
          likeBtn.click();
          console.log("swiped right");
        }  
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          superlikeBtn.click();
          console.log("swiped up");
        } else {
          // swiped down
          console.log("swiped down");
        }  
      }

      minitialX = null;
      minitialY = null;

      // e.preventDefault();
    }
  }

  addCards() {
    const newData = data.map((data, i) => {
      this.keyId = i;
      return (
        <div className="card" key={i}>
          <img src={popLike} className="popLike" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img src={popSkip} className="popSkip" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img src={popSuperlike} className="popSuperlike" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img className="card-image disableSave" src={process.env.PUBLIC_URL + "/assets/pokemon/" + data.img} alt="user" onContextMenu={(e)=> e.preventDefault()} />
          <p onClick={this.expand}><b>{data.name}</b>, {data.age}</p>
          <div className="swipe-container"></div>
        </div>
      )
    });
    return newData;
  }

  like = () => {
    if (this.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.keyId);
      element.getElementsByClassName("popLike").item(0).style.display = 'block';
      element.classList.add("animateLike");
      setTimeout(function(){ element.remove(); }, 600);
      this.keyId -= 1;
    }
  }
  
  skip = () => {
    if (this.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.keyId);
      element.getElementsByClassName("popSkip").item(0).style.display = 'block';
      element.classList.add("animateSkip");
      setTimeout(function(){ element.remove(); }, 600);
      this.keyId -= 1;
    }
  }
  
  superlike = () => {
    if (this.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.keyId);
      element.getElementsByClassName("popSuperlike").item(0).style.display = 'block';
      element.classList.add("animateSuperlike");
      setTimeout(function(){ element.remove(); }, 600);
      this.keyId -= 1;
    }
  }

  expand = () => {
    console.log('expand');
  }

  componentDidMount() {
    const cardList = document.getElementsByClassName("card");
    const size = document.getElementsByClassName("card").length;

    for (var i=0; i<size; i++) {
      this.handleSwipe(cardList.item(i));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Card UI</h1>
        <div className="card-stack">
          <div className="empty-card">
            <img className="disableSave" src={process.env.PUBLIC_URL + "/assets/empty.png"} alt="empty" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          {this.addCards()}
        </div>
  
        <div className="controls">
          <div className="skip noSelect" onClick={this.skip}>
            <img className="disableSave" src={skipIcon} alt="skipIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          <div className="superlike noSelect" onClick={this.superlike}>
            <img className="disableSave" src={superlikeIcon} alt="superlikeIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          <div className="like noSelect" onClick={this.like}>
            <img className="disableSave" src={likeIcon} alt="likeIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
