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
  const [formData, setFormData] = useState({
    name: "",
    lengthInInch: "",
    roundInInch: "",
    runningturnInTarNo: "",
    runningSetWeightInGram: "",
    pichfirst: "",
    pichsecond: "",
    pichthird: "",
    pichfourth: "",
  });

  const [searchParams, setSearchParams] = useState({
    name: "",
    lengthInInch: "",
    runningSetWeightInGram: "",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // 🌟 Toggle state

  const formRef = useRef();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

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

      setFormData({
        name: "",
        lengthInInch: "",
        roundInInch: "",
        runningturnInTarNo: "",
        runningSetWeightInGram: "",
        pichfirst: "",
        pichsecond: "",
        pichthird: "",
        pichfourth: "",
      });

      setEditingId(null);
      fetchRecords();
      setShowForm(false); // hide form after submission
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
    setShowForm(true); // auto-show form on edit
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: "1000px", mx: "auto", bgcolor: "#f9fafb", borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Electro Management
      </Typography>

      {/* Search Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4, justifyContent: "center" }}>
        <TextField label="Name" name="name" value={searchParams.name} onChange={handleSearchChange} sx={{ width: 250 }} />
        <TextField label="Length (in Inch)" name="lengthInInch" value={searchParams.lengthInInch} onChange={handleSearchChange} sx={{ width: 250 }} />
        <TextField label="Weight (in Gram)" name="runningSetWeightInGram" value={searchParams.runningSetWeightInGram} onChange={handleSearchChange} sx={{ width: 250 }} />
        <Button variant="contained" onClick={fetchRecords} sx={{ bgcolor: "blue", ":hover": { bgcolor: "darkblue" } }}>
          Search
        </Button>
      </Box>

      {/* Toggle Add/Edit Form Button */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{ color: "black", borderColor: "gray", ":hover": { bgcolor: "#f0f0f0" } }}
        >
          {showForm ? "Hide Form" : editingId ? "Edit Record" : "Add New Record"}
        </Button>
      </Box>

      {/* Form Section */}
      {showForm && (
        <Box ref={formRef} sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
          <Typography variant="h6" fontWeight="600" mb={2}>
            {editingId ? "Edit Record" : "Add New Record"}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
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
            sx={{ mt: 2, bgcolor: "green", ":hover": { bgcolor: "darkgreen" }, color: "white" }}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </Box>
      )}

      {/* Table Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                {["Name", "Length", "Round", "Turns", "Weight", "Pitch 1", "Pitch 2", "Pitch 3", "Pitch 4", "Actions"].map((head) => (
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
                    backgroundColor: editingId === record._id ? "#e0f7fa" : "inherit",
                  }}
                >
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.lengthInInch}</TableCell>
                  <TableCell>{record.roundInInch}</TableCell>
                  <TableCell>{record.runningturnInTarNo}</TableCell>
                  <TableCell>{record.runningSetWeightInGram}</TableCell>
                  <TableCell>{record.pichfirst}</TableCell>
                  <TableCell>{record.pichsecond}</TableCell>
                  <TableCell>{record.pichthird}</TableCell>
                  <TableCell>{record.pichfourth}</TableCell>
                  <TableCell>
                    <Button size="small" sx={{ color: "blue" }} onClick={() => handleEdit(record)}>
                      Edit
                    </Button>
                    <Button size="small" sx={{ color: "red" }} onClick={() => handleDelete(record._id)}>
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
