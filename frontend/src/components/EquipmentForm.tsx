import { useEffect, useState } from "react";
import { getTypes } from "../services/api";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function EquipmentForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [lastCleanedDate, setLastCleanedDate] = useState("");
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    loadTypes();
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setTypeId(String(initialData.type?.id || ""));
      setStatus(initialData.status || "Inactive");
      setLastCleanedDate(initialData.lastCleanedDate || "");
    }
  }, [initialData]);

  const loadTypes = async () => {
    try {
      const data = await getTypes();
      setTypes(data);
    } catch (e) {
      console.error("Error loading types", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !typeId || !lastCleanedDate) return;

    onSubmit({
      name,
      status,
      lastCleanedDate,
      type: { id: Number(typeId) },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {initialData ? "Update Equipment" : "Register New Equipment"}
        </h2>
        <p className="text-slate-500 text-sm">Ensure all maintenance fields are accurate.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Equipment Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Equipment Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g. CNC Machine"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dynamic Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Equipment Type</label>
            <select
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              required
            >
              <option value="">Select a type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Current Status</label>
            <select
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Last Cleaned Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={lastCleanedDate}
            onChange={(e) => setLastCleanedDate(e.target.value)}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50"
            disabled={!name || !typeId || !lastCleanedDate}
          >
            {initialData ? "Save Changes" : "Add Equipment"}
          </button>
        </div>
      </form>
    </div>
  );
}