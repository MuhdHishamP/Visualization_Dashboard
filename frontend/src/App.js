import React, { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import BarGraph from "./components/BarGraph";
import LineGraph from "./components/LineGraph";
import PieGraph from "./components/PieGraph";
import PolarGraph from "./components/PolarGraph";
import HorizontalBarGraph from "./components/HorizontalBarGraph";
import axios from "axios";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import "./App.css";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function App() {
  const [Apidata, setApidata] = useState([]);
  const [GraphData, setGraphData] = useState([]);
  const [SelectedLabel, setSelectedLabel] = useState("");
  const [GraphType, setGraphType] = useState("");
  const [ShowIntro, setShowIntro] = useState(true);
  const [selectedColour, setSelectedColour] = useState(null);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/info/")
      .then((res) => setApidata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleIntroClick = () => {
    setShowIntro(true);
    setGraphType("");
    setSelectedColour(null);
  };

  const handleClick = (text) => {
    const dataMapping = {
      Intensity: Apidata.map((item) => ({
        Id: item.id,
        Value: item.intensity,
      })),
      Likelihood: Apidata.map((item) => ({
        Id: item.id,
        Value: item.likelihood,
      })),
      Relevance: Apidata.map((item) => ({
        Id: item.id,
        Value: item.relevance,
      })),
      Year: Apidata.map((item) => ({
        Id: item.id,
        StartYear: parseInt(item.start_year),
        EndYear: parseInt(item.end_year),
      })),
      Country: Apidata.map((item) => ({
        Id: item.id,
        Value: item.country,
      })),
      Topic: Apidata.map((item) => ({
        Id: item.id,
        Value: item.topic,
      })),
      Region: Apidata.map((item) => ({
        Id: item.id,
        Value: item.region,
      })),
      Source: Apidata.map((item) => ({
        Id: item.id,
        Value: item.source,
      })),
      Sector: Apidata.map((item) => ({
        Id: item.id,
        Value: item.sector,
      })),
      PESTLE: Apidata.map((item) => ({
        Id: item.id,
        Value: item.pestle,
      })),
    };
    setGraphData(dataMapping[text]);
    setSelectedLabel(text);
    if (text === "Intensity" || text === "Likelihood" || text === "Relevance") {
      setGraphType("Bar");
    } else if (text === "Sector" || text === "PESTLE") {
      setGraphType("HorizontalBar");
    } else if (text === "Year") {
      setGraphType("Line");
    } else if (text === "Region") {
      setGraphType("Polar");
    } else {
      setGraphType("Pie");
    }
    setSelectedColour(text);
    setShowIntro(false);
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: deepPurple[500] }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <h2 onClick={handleIntroClick} style={{margin:14}}>Visualization Dashboard</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}

      >
        <DrawerHeader>
          <h2 >Dashboards</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Intensity",
            "Likelihood",
            "Relevance",
            "Sector",
            "PESTLE",
            "Year",
            "Country",
            "Topic",
            "Source",
            "Region",
          ].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: selectedColour === text?"navy":"inherit",
                  color: selectedColour === text?"white":"inherit",
                  '&:hover': {
                    backgroundColor: 'navy',
                    color: 'white',
                  },
                }}
                onClick={() => handleClick(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: deepPurple[500] }} variant="rounded">
                    {text.slice(0, 2)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
        <DrawerHeader />
        {ShowIntro && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                textAlign: "center",
                width: "80%",
                border: "solid grey 5px",
              }}
            >
              <h2 style={{ color: "#333", marginBottom: "30px" }}>
                Welcome to the Visualization Dashboard!
              </h2>
              <p style={{ fontSize: "16px" }}>
                This React app serves as a Visualization Dashboard that
                retrieves information from a Django Rest Framework API connected
                to a PostgreSQL database. The data is used to generate various
                types of charts to help you analyze and visualize trends.
              </p>
              <p style={{ fontSize: "16px" }}>
                Explore the dashboard by selecting different options from the
                sidebar. You can generate Line Charts, Bar Charts, Polar Area
                Charts, and Pie Charts based on the available data.
              </p>
              <p style={{ fontSize: "16px" }}>
                To get started, click on the sidebar icons or the Drawer button
                to choose a specific value. The charts will be displayed ,
                providing insights into the data from the PostgreSQL database.
              </p>
            </div>
          </div>
        )}
        {GraphType === "Bar" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: 970 }}>
              <BarGraph data={GraphData} labelName={SelectedLabel} />
            </div>
          </div>
        )}
        {GraphType === "Line" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <LineGraph data={GraphData} />
            </div>
          </div>
        )}
        {GraphType === "Pie" && (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div>
              <PieGraph data={GraphData} labelName={SelectedLabel}/>
            </div>
          </div>
        )}
        {GraphType === "Polar" && (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div>
              <PolarGraph data={GraphData} labelName={SelectedLabel}/>
            </div>
          </div>
        )}
        {GraphType === "HorizontalBar" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <HorizontalBarGraph data={GraphData} labelName={SelectedLabel} />
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
}
