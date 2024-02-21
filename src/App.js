import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function App() {

  const [isComplete , setIsComplete] = useState(false)
  const [list , setList] = useState([]);
  const [completedList , setCompletedList] = useState([]);
  const [title , setTitle] = useState('')
  const [desc , setDesc] = useState('')


  const handleAdd = () =>{
    if(title === '' || desc ==='') return;
    const newList = {
      header:title,
      description: desc
    } 
    const updateList = [...list, newList];
    setList(updateList);
    localStorage.setItem("todo-list", JSON.stringify(updateList));
  }

  // calling all the lists from the localStorge
  useEffect(()=>{
    const savedList = JSON.parse(localStorage.getItem('todo-list'))
    const savedCompletedList = JSON.parse(localStorage.getItem("complete-list"));
    if(savedList){
      setList(savedList)
    }
    if(savedCompletedList){
      setCompletedList(savedCompletedList);
    }
  },[])

  const handleDelet= (index) =>{
    const reduceList = [...list];
    // remove th chosen item from the list
    reduceList.splice(index, 1);
    // saving it in local storge after the delete
    localStorage.setItem("todo-list", JSON.stringify(reduceList));

    setList(reduceList);
  }


  const handleDeleCompleted = (index) => {
    const reduceList = [...completedList];
    // remove th chosen item from the list
    reduceList.splice(index,1);
    // saving it in local storge after the delete
    localStorage.setItem("complete-list", JSON.stringify(reduceList));

    setCompletedList(reduceList);
  };


  //completede List handler
const handleCompleted =(index)=>{
  // setup current Timing
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const completeTime = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    const updatedCompletedArr = {
      ...list[index],
      time: completeTime,
    };
    const completedArr =[...completedList]
    completedArr.push(updatedCompletedArr);
    setCompletedList(completedArr);
    // delet the item from to-do after adding it in completed list
    handleDelet(index);
    // save it in localstorge
    localStorage.setItem("complete-list", JSON.stringify(completedArr));
}

  return (
    <section className="app">
      {/* header */}
      <h1>Do it Now !</h1>
      <div className="todo-container">
        {/* inputs */}
        <div className="todo-inputs">

            <div className="todo-item">
              <label>Title:</label>
              <input
                type="text"
                placeholder="Title...?"
                maxLength={20}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <label>Descreption:</label>
              <input
                type="text"
                placeholder="..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="todo-item">
              <button onClick={handleAdd}>Add</button>
            </div>
        </div>
        <div className="btn-area">
          <button
            className={`btn ${isComplete === false && "active"}`}
            onClick={() => setIsComplete(false)}
          >
            To-Do
          </button>
          <button
            className={`btn ${isComplete === true && "active"}`}
            onClick={() => setIsComplete(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {/* the list */}
          {!isComplete &&
            list.map((item, index) => {
              return (
                <div className="todo-items" key={index}>
                  <div>
                    <h3>{item.header}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <MdDeleteOutline
                      className="icon"
                      onClick={() => handleDelet(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}
          {/* the compeletList */}
          {isComplete &&
            completedList.map((item, index) => {
              return (
                <div className="todo-items" key={index}>
                  <div>
                    <h3>{item.header}</h3>
                    <p >{item.description}</p>
                    <p>
                      <small> Completed on: {item.time}</small>
                    </p>
                  </div>
                  <div>
                    <MdDeleteOutline
                      className="icon"
                      onClick={() => handleDeleCompleted(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default App;
