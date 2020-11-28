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
        <div className="skip noSelect"><img className="disableSave" src={skipIcon} alt="skipIcon" onContextMenu={(e)=> e.preventDefault()} /></div>
        <div className="superlike noSelect"><img className="disableSave" src={superlikeIcon} alt="superlikeIcon" onContextMenu={(e)=> e.preventDefault()} /></div>
        <div className="like noSelect"><img className="disableSave" src={likeIcon} alt="likeIcon" onContextMenu={(e)=> e.preventDefault()} /></div>
      </div>
    </div>
  );
}

function addCards() {
  const newData = data.map((data, i) => {
    return (
      <div className="card" key={i}>
        <img className="disableSave" src={process.env.PUBLIC_URL + "/assets/pokemon/" + data.img} alt="user" onContextMenu={(e)=> e.preventDefault()} />
        <p><b>{data.name}</b>, {data.age}</p>
      </div>
    )
  }) 
  return newData;
}

export default App;
