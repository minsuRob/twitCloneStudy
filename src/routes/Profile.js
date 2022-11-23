import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  
  
  const getMyNweets = async() => {
    const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).get();
    //const nweets = await dbService.collection("nweets").get();
  };
  
  useEffect(()=>{
    //getMyNweets();
  } ,[]);
  
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();

      if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({displayName: newDisplayName});
      }
    };
  

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={newDisplayName} type="text" placeholder="display name"/>
        <input type="submit" value="update profile"/>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
