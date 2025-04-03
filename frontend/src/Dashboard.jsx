import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Typography, Button} from "@mui/material";



const Dashboard = () => {

const navigate = useNavigate();
const [username, setUsername] = useState("");

useEffect(() => {
    const storedUser = localStorage.getItem("username");

    if (storedUser) {
        setUsername(storedUser); // Corrected function call
    } else {
        navigate("/login"); // Fixed incorrect function name
    }
}, [navigate]); // Corrected dependency array syntax


// CRUD
return(

    <Container>
<Typography variant="h4">Welcome {username}</Typography>
<Button
 variant ="contained"
 color = "secondary"
 onClick={() => {
localStorage.removeItem("username");
localStorage.removeItem("token");
navigate("/login");

 }}
> 
Logout
</Button>
    </Container>
);








};

export default Dashboard;