import React, {useState, useEffect} from 'react'
import "./App.css";

const getLocalItems = () => {
    let list = localStorage.getItem('TODOS');
    if (list) {
        return JSON.parse(localStorage.getItem('TODOS'));
    } else {
        return [];
    }
};

const ToDoApp = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [ToggleButton, setToggleButton] = useState(true);
    const [isEdittable, setisEdittable] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('Please write something!');
        }
        else if (inputData && !ToggleButton) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEdittable) {
                        return { ...elem, name:inputData };
                    }
                    return elem;
                })
            );
            setToggleButton(true);
            setInputData('');
            setisEdittable(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString() , name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }   
    }

    //delete a specific task
    const deleteItem = (id) => {
        const updatedItems = items.filter((elem) => {
            return elem.id !== id;
        })
        setItems(updatedItems);
    }
 
    //edit a selected task
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        setToggleButton(false);
        setInputData(newEditItem.name);
        setisEdittable(id);
    }

    // remove all the data 
    const remvoveAll = () => {
        setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
        localStorage.setItem('TODOS', JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">

                <div className="child-div">
                   <h2 style={{color: "white", fontWeight:'bolder', fontSize: "30px"}}>Manage Your ToDos Here 📝</h2>
                    <div className="addItems">
                        <input type="text" className="form-control" placeholder=" ✍️ Add Item..."
                            value={inputData }
                            onChange={(e) => setInputData(e.target.value)}
                        />

                        {/* toggle the submit btn with the edit btn  */}
                        { ToggleButton ? <i className="fa fa-plus add-btn" title="Add Item" onClick={() => addItem()}></i> :  <i className="far fa-edit add-btn" title="Edit item" onClick={addItem}></i> }
                        
                    </div>

                    <div className="showItems">
                        {items.map((elem) => {
                            return (
                                <div className="eachItem" key={elem.id}>
                                    <h3> {elem.name} </h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>

                                    </div>   
                                </div>
                            )
                        })}    
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" target="_blank" onClick={remvoveAll}><span>CHECK LIST </span></button>
                    </div>

                </div>

            </div>   
        </>
    )
}

export default ToDoApp