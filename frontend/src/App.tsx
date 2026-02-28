import React, { useEffect, useState } from "react";
import { EquipmentTable } from "./components/EquipmentTable";
import { EquipmentForm } from "./components/EquipmentForm";
import {
  getEquipment,
  deleteEquipment,
  createEquipment,
  updateEquipment,
} from "./services/api";

function App() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEquipment();
      setEquipment(data);
    } catch (error) {
      console.error("Failed to load equipment", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      await deleteEquipment(id);
      loadData();
    }
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingItem) {
        await updateEquipment(editingItem.id, data);
      } else {
        await createEquipment(data);
      }
      setShowForm(false);
      setEditingItem(null);
      loadData();
    } catch (error: any) {
      alert(error.response?.data || "An error occurred");
    }
  };

  // Quick Stats Calculation
  const stats = {
    total: equipment.length,
    active: equipment.filter((e) => e.status === "Active").length,
    maintenance: equipment.filter((e) => e.status === "Under Maintenance").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">EquipTrack</h1>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <span>+</span> Add Equipment
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Units" value={stats.total} color="blue" />
          <StatCard label="Operational" value={stats.active} color="emerald" />
          <StatCard label="In Maintenance" value={stats.maintenance} color="amber" />
        </div>

        {/* Main Content Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Inventory Overview</h2>
            <button 
              onClick={loadData}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Refresh Data
            </button>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center bg-white border border-dashed border-slate-300 rounded-xl">
              <p className="text-slate-400 animate-pulse">Loading equipment records...</p>
            </div>
          ) : (
            <EquipmentTable
              data={equipment}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              onRefresh={loadData}
            />
          )}
        </div>
      </main>

      {/* Modal Overlay for Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
            <EquipmentForm
              initialData={editingItem}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Internal StatCard Component for clean UI
function StatCard({ label, value, color }: { label: string; value: number; color: "blue" | "emerald" | "amber" }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };

  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
      <div className={`h-12 w-12 rounded-full border flex items-center justify-center ${colors[color]}`}>
        <div className={`h-3 w-3 rounded-full bg-current animate-pulse`} />
      </div>
    </div>
  );
}

export default App;