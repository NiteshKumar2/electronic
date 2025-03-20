"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

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

  const [searchParams, setSearchParams] = useState({ name: "", lengthInInch: "", runningSetWeightInGram: "" });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 🔍 Fetch Records
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

  // ✏️ Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✏️ Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // ✅ Create or Update Record
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
    } catch (error) {
      toast.error("Error saving record");
    }
  };

  // 🗑️ Delete Record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product?id=${id}`);
      toast.success("Record Deleted!");
      fetchRecords();
    } catch (error) {
      toast.error("Error deleting record");
    }
  };

  // ✏️ Edit Record
  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record._id);
  };

  return (
    <div className="p-9 ">
      <h1 className="text-2xl font-bold mb-4">Electro Management</h1>

      {/* 🎯 Search */}
      <div className="mb-4 flex gap-4">
        <TextField label="Name" name="name" value={searchParams.name} onChange={handleSearchChange} />
        <TextField label="Length (in Inch)" name="lengthInInch" value={searchParams.lengthInInch} onChange={handleSearchChange} />
        <TextField label="Weight (in Gram)" name="runningSetWeightInGram" value={searchParams.runningSetWeightInGram} onChange={handleSearchChange} />
        <Button variant="contained" onClick={fetchRecords}>Search</Button>
      </div>

      {/* 📋 Form */}
      <div className="mb-6 p-4 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">{editingId ? "Edit Record" : "Add New Record"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Length (in Inch)" name="lengthInInch" value={formData.lengthInInch} onChange={handleChange} />
          <TextField label="Round (in Inch)" name="roundInInch" value={formData.roundInInch} onChange={handleChange} />
          <TextField label="Turns in Tar No" name="runningturnInTarNo" value={formData.runningturnInTarNo} onChange={handleChange} />
          <TextField label="Weight (in Gram)" name="runningSetWeightInGram" value={formData.runningSetWeightInGram} onChange={handleChange} />
          <TextField label="Pitch 1" name="pichfirst" value={formData.pichfirst} onChange={handleChange} />
          <TextField label="Pitch 2" name="pichsecond" value={formData.pichsecond} onChange={handleChange} />
          <TextField label="Pitch 3" name="pichthird" value={formData.pichthird} onChange={handleChange} />
          <TextField label="Pitch 4" name="pichfourth" value={formData.pichfourth} onChange={handleChange} />
        </div>
        <Button variant="contained" className="mt-4" onClick={handleSubmit}>{editingId ? "Update" : "Create"}</Button>
      </div>

      {/* 📋 Data Table */}
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Length</TableCell>
                <TableCell>Round</TableCell>
                <TableCell>Turns</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Pitch 1</TableCell>
                <TableCell>Pitch 2</TableCell>
                <TableCell>Pitch 3</TableCell>
                <TableCell>Pitch 4</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record._id}>
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
                    <Button size="small" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(record._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
