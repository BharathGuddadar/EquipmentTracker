import React, { useEffect, useState } from "react";
import { getMaintenance, addMaintenance } from "../services/api";

interface Props {
  equipmentId: number;
  onMaintenanceAdded: () => void;
}

export function MaintenanceSection({ equipmentId, onMaintenanceAdded }: Props) {
  const [logs, setLogs] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [performedBy, setPerformedBy] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLogs();
  }, [equipmentId]);

  const loadLogs = async () => {
    try {
      const data = await getMaintenance(equipmentId);
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !performedBy) return;

    setLoading(true);
    try {
      await addMaintenance({
        maintenanceDate: date,
        notes,
        performedBy,
        equipment: { id: equipmentId },
      });

      setDate("");
      setNotes("");
      setPerformedBy("");
      await loadLogs();
      onMaintenanceAdded(); // Refresh the parent table (to update status/clean date)
    } catch (error: any) {
      alert(error.response?.data || "Failed to add maintenance record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-4">
      {/* LEFT: History Timeline (3/5 width) */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Maintenance History
          </h3>
          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-medium">
            {logs.length} Records
          </span>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {logs.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
              <p className="text-sm text-slate-400">No history recorded yet.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="relative pl-6 border-l-2 border-slate-200 pb-2 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-slate-900">
                      {new Date(log.maintenanceDate).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {log.performedBy}
                    </span>
                  </div>
                  {log.notes && (
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "{log.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT: Quick Add Form (2/5 width) */}
      <div className="lg:col-span-2">
        <div className="sticky top-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-4">Log New Activity</h4>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Technician</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={performedBy}
                onChange={(e) => setPerformedBy(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Service Notes</label>
              <textarea
                placeholder="Describe work done..."
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !date || !performedBy}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? "Saving..." : "Submit Record"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}