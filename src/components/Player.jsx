import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  //State to manage the edit or save button  
  const [isEditing, setIsEditing] = useState(false);

  //State to manage the player name edit changes
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((editing) => !editing); //React recommend to not update state like this setIsEditing(!isEditing); React will automatically get the editing variable and attribute it to the isEditing value.
  }

  //Handle and display the edited player name. The onChange will trigger with any character typed or something is pasted. Is triggered by any key stroke and it will provide an event object that contains the value that was entered by the user
  function handleChange(event){
    //console.log(event)
    setPlayerName(event.target.value)
  }

  //Display the player name or the input field to edit player name logic
  let nameField = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    nameField = <input type="text" value={playerName} onChange={handleChange} autoFocus required />;
  }

  return (
    // Dynamic add the class "active" to the name field if is active comes true or false
     <li className={isActive ? 'active' : undefined}> 
      <span className="player">
        {nameField}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}> {isEditing ? "Save" : "Edit"} </button>
    </li>
  );
}
