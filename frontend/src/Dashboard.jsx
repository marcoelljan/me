import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("crudItems");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem("crudItems", JSON.stringify(items));
    }, [items]);

    const handleAddOrEdit = () => {
        if (input.trim() === "") return;
        if (editIndex !== null) {
            const updated = [...items];
            updated[editIndex] = input;
            setItems(updated);
            setEditIndex(null);
        } else {
            setItems([...items, input]);
        }
        setInput("");
    };

    const handleDelete = (idx) => {
        setItems(items.filter((_, i) => i !== idx));
    };

    const handleEdit = (idx) => {
        setInput(items[idx]);
        setEditIndex(idx);
    };

    return (
        <Container>
            <Box
                sx={{
                    textAlign: "center",
                    p: 3,
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#f0f0f0",
                }}
            >
                <Typography variant="h4" sx={{ color: "#3f51b5", mb: 2 }}>
                    Welcome {username}
                </Typography>
            </Box>

            {/* CRUD Section */}
            <Box
                sx={{
                    textAlign: "center",
                    p: 2,
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#e8f5e9",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    CRUD Operations
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <TextField
                        label="Item"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="small"
                        sx={{ mr: 1 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddOrEdit}
                        sx={{
                            backgroundColor: "#4caf50",
                            color: "white",
                            "&:hover": { backgroundColor: "#45a049" },
                        }}
                    >
                        {editIndex !== null ? "Update" : "Add"}
                    </Button>
                </Box>
                <List>
                    {items.map((item, idx) => (
                        <ListItem
                            key={idx}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleEdit(idx)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(idx)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        mt: 2,
                        "&:hover": { backgroundColor: "#45a049" },
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