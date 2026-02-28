import React,{ useState } from "react";
import { MaintenanceSection } from "./MaintenanceSection";

interface Props {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onRefresh: () => void;
}

export function EquipmentTable({ data, onEdit, onDelete, onRefresh }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Helper for Status Badge Colors
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Under Maintenance":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Inactive":
        return "bg-slate-50 text-slate-700 border-slate-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-200">
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Equipment</th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Type</th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Status</th>
            <th className="px-4 py-3 text-sm font-semibold text-slate-900">Last Cleaned</th>
            <th className="px-4 py-3 text-sm font-right font-semibold text-slate-900 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr className={`hover:bg-slate-50/50 transition-colors ${expandedId === item.id ? 'bg-blue-50/30' : ''}`}>
                <td className="px-4 py-4">
                  <span className="font-medium text-slate-900">{item.name}</span>
                </td>
                <td className="px-4 py-4 text-slate-600">
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs uppercase tracking-wider font-bold">
                    {item.type?.name || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-500 text-sm">
                  {new Date(item.lastCleanedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      {expandedId === item.id ? "Close" : "History"}
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              {/* Collapsible Maintenance Section */}
              {expandedId === item.id && (
                <tr>
                  <td colSpan={5} className="bg-slate-50/50 px-4 py-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-inner">
                       {/* You'd import your MaintenanceSection here */}
                       <h4 className="text-sm font-bold text-slate-900 mb-4 px-1">Maintenance Logs: {item.name}</h4>
                       <MaintenanceSection
                        equipmentId={item.id}
                        onMaintenanceAdded={onRefresh}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-500">No equipment found. Add one to get started.</p>
        </div>
      )}
    </div>
  );
}