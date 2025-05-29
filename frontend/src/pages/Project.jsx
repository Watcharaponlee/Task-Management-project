import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  AvatarGroup,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Menu,
  ListItemIcon,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Add,
  AddCircle,
  Create,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import axios from "axios";
import CreateProjectForm from "../components/CompProject/Create";

const getStatusColor = (status) => {
  switch (status) {
    case "Started":
      return "#2196f3"; // สีพื้นหลังของ Chip
    case "OnGoing":
      return "#ffb300"; // สี primary blue (ตัวอย่าง)
    case "Completed":
      return "#2e7d32"; // สี success green (ตัวอย่าง)
    default:
      return "#9e9e9e"; // สี default grey
  }
};

const ProjectCard = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent style={{ padding: "0px" }}>
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            label={project.status}
            sx={{
              backgroundColor: getStatusColor(project.status),
              color: "white",
            }}
          ></Chip>
          <IconButton
            aria-label="more"
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem sx={{ fontSize: "0.875rem" }}>
            <ListItemIcon>
              <Edit sx={{ color: "#ef6c00" }} fontSize="small" />
            </ListItemIcon>
            แก้ไข
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.875rem" }}>
            <ListItemIcon>
              <Delete sx={{ color: "#e53935" }} fontSize="small" />
            </ListItemIcon>
            ลบ
          </MenuItem>
        </Menu>

        <Typography
          variant="h6"
          fontWeight="500"
          gutterBottom
          sx={{ color: "#5c6bc0" }}
        >
          {project.name}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {project.description}
        </Typography>

        <Box sx={{ textAlign: "end", mt: 2 }}>
          <Button>เลือก</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ProjectPage() {
  const [openRegister, setOpenRegister] = useState(false);
  const [projectData, setProjectData] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/project", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectData(response.data.data);
      console.log("Projects fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  //NOTE - ทำงานเหมือน mounted ของ VUE
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        p={3}
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
          width: "100%",
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#3f51b5" }}>
            Projects
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            sx={{
              borderRadius: 20,
              backgroundColor: "#4caf50",
              fontWeight: 400,
            }}
            onClick={() => setOpenRegister(true)}
          >
            สร้างโปรเจกต์
          </Button>
        </Box>

        {/* Project Grid */}
        <Grid
          container
          columns={12}
          spacing={3}
          sx={{ justifyContent: "center" }}
        >
          {projectData.map((project, idx) => (
            <Grid key={idx} size={{ sm: 6, md: 3 }} sx={{ display: "flex" }}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CreateProjectForm
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}
