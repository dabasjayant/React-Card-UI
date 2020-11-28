import likeIcon from './icons/like.svg';
import superlikeIcon from './icons/superlike.svg';
import skipIcon from './icons/skip.svg';
import data from './data/people.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Card UI</h1>
      <div className="card-stack">{addCards()}</div>

      <div className="controls">
        <div className="skip noSelect" onClick={skip}>
          <img className="disableSave" src={skipIcon} alt="skipIcon" onContextMenu={(e)=> e.preventDefault()} />
        </div>
        <div className="superlike noSelect" onClick={superlike}>
          <img className="disableSave" src={superlikeIcon} alt="superlikeIcon" onContextMenu={(e)=> e.preventDefault()} />
        </div>
        <div className="like noSelect" onClick={like}>
          <img className="disableSave" src={likeIcon} alt="likeIcon" onContextMenu={(e)=> e.preventDefault()} />
        </div>
      </div>
    </div>
  );
}

var keyId = 0;

function addCards() {
  const newData = data.map((data, i) => {
    keyId = i;
    return (
      <div className="card" key={i}>
        <img className="disableSave" src={process.env.PUBLIC_URL + "/assets/pokemon/" + data.img} alt="user" onContextMenu={(e)=> e.preventDefault()} />
        <p><b>{data.name}</b>, {data.age}</p>
      </div>
    )
  }) 
  return newData;
}

const like = function like() {
  if (keyId >= 0) {
    document.getElementsByClassName("card").item(keyId).classList.add("animateLike");
    keyId -= 1;
  }
}

const skip = function skip() {
  if (keyId >= 0) {
    document.getElementsByClassName("card").item(keyId).classList.add("animateSkip");
    keyId -= 1;
  }
}

const superlike = function superlike() {
  if (keyId >= 0) {
    document.getElementsByClassName("card").item(keyId).classList.add("animateSuperlike");
    keyId -= 1;
  }
}

export default App;
