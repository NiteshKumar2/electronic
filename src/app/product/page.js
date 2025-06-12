"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

export default function ElectroPage() {
  // 1️⃣ Form Data
  const [formData, setFormData] = useState({
    name: "",
    slot: "",
    connectionType: "",
    runningWireGauge: "",
    rpm: "",
    length: "",
    runningLength: "",
    startingLength: "",
    breadth: "",
    runningPintch: "",
    startingPintch: "",
    runningSetWeight: "",
    startingSetWeight: "",
    startingWireGauge: "",
  });

  // 2️⃣ Search Filters
  const [searchParams, setSearchParams] = useState({
    name: "",
    length: "",
    runningSetWeight: "",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef();

  // 3️⃣ Fetch Records
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/search", { params: searchParams });
      setRecords(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // 4️⃣ Handle Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // 5️⃣ Submit Form
  const handleSubmit = async () => {
    try {
      if (!formData.name) return toast.error("Name is required!");

      if (editingId) {
        await axios.put("/api/product", { id: editingId, ...formData });
        toast.success("Record Updated!");
      } else {
        await axios.post("/api/product", formData);
        toast.success("Record Created!");
      }

      // Reset form
      setFormData({
        name: "",
        slot: "",
        connectionType: "",
        runningWireGauge: "",
        rpm: "",
        length: "",
        runningLength: "",
        startingLength: "",
        breadth: "",
        runningPintch: "",
        startingPintch: "",
        runningSetWeight: "",
        startingSetWeight: "",
        startingWireGauge: "",
      });

      setEditingId(null);
      fetchRecords();
      setShowForm(false);
    } catch (error) {
      toast.error("Error saving record");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product?id=${id}`);
      toast.success("Record Deleted!");
      fetchRecords();
    } catch (error) {
      toast.error("Error deleting record");
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record._id);
    setShowForm(true);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        maxWidth: "1000px",
        mx: "auto",
        bgcolor: "#f9fafb",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Electro Management
      </Typography>

      {/* 🔎 Search */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={searchParams.name}
          onChange={handleSearchChange}
          sx={{ width: 250 }}
        />
        <TextField
          label="Length"
          name="length"
          value={searchParams.length}
          onChange={handleSearchChange}
          sx={{ width: 250 }}
        />
        <TextField
          label="Set Weight"
          name="runningSetWeight"
          value={searchParams.runningSetWeight}
          onChange={handleSearchChange}
          sx={{ width: 250 }}
        />
        <Button
          variant="contained"
          onClick={fetchRecords}
          sx={{ bgcolor: "blue", ":hover": { bgcolor: "darkblue" } }}
        >
          Search
        </Button>
      </Box>

      {/* ➕ Toggle Add/Edit Form */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{
            color: "black",
            borderColor: "gray",
            ":hover": { bgcolor: "#f0f0f0" },
          }}
        >
          {showForm
            ? "Hide Form"
            : editingId
            ? "Edit Record"
            : "Add New Record"}
        </Button>
      </Box>

      {/* 📝 Form */}
      {showForm && (
        <Box
          ref={formRef}
          sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}
        >
          <Typography variant="h6" fontWeight="600" mb={2}>
            {editingId ? "Edit Record" : "Add New Record"}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, " $1")}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              bgcolor: "green",
              ":hover": { bgcolor: "darkgreen" },
              color: "white",
            }}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </Box>
      )}

      {/* 📊 Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                {[
                  "Name",
                  "Slot",
                  "Connection Type",
                  "Running Wire Gauge",
                  "RPM",
                  "Length",
                  "Running Length",
                  "Starting Length",
                  "Breadth",
                  "Running Pitch",
                  "Starting Pitch",
                  "Running Set Weight",
                  "Starting Set Weight",
                  "Starting Wire Gauge",
                  "Actions",
                ].map((head) => (
                  <TableCell key={head} sx={{ fontWeight: 600 }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow
                  key={record._id}
                  hover
                  sx={{
                    backgroundColor:
                      editingId === record._id ? "#e0f7fa" : "inherit",
                  }}
                >
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.slot}</TableCell>
                  <TableCell>{record.connectionType}</TableCell>
                  <TableCell>{record.runningWireGauge}</TableCell>
                  <TableCell>{record.rpm}</TableCell>
                  <TableCell>{record.length}</TableCell>
                  <TableCell>{record.runningLength}</TableCell>
                  <TableCell>{record.startingLength}</TableCell>
                  <TableCell>{record.breadth}</TableCell>
                  <TableCell>{record.runningPintch}</TableCell>
                  <TableCell>{record.startingPintch}</TableCell>
                  <TableCell>{record.runningSetWeight}</TableCell>
                  <TableCell>{record.startingSetWeight}</TableCell>
                  <TableCell>{record.startingWireGauge}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      sx={{ color: "blue" }}
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
