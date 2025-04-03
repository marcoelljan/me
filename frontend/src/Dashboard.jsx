import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Typography, Button, Box} from "@mui/material";



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
      
      
        <Box 
    
        sx= {{
            textAlign: "center",
            p: 3,
            mb: -5,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f0f0f0",
        }} > </Box>

        
<Typography variant="h4" sx ={{ color: "#3f51b5, mb:2"}}>Welcome {username}</Typography>

<Box
sx = {{
    textAlign: "center",
    p: 1,
    mt: 2,
    width: 100,
    margin: "0 auto",
    borderRadius: -1,
    boxShadow: 3,
    backgroundColor: "#e8f5e9",
}}



>

<Button
 variant ="contained"
 sx={{ backgroundColor: "#4caf50",
    color: "white",
    "&:hover": {
        backgroundColor: "#45a049",
    },
 }}
 
 onClick={() => {
localStorage.removeItem("username");
localStorage.removeItem("token");
navigate("/login");

 }}
> 
Logout
</Button>
</Box>
    </Container>
);








};

export default Dashboard;