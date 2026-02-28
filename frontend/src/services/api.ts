const BASE_URL = "http://localhost:8050/api";

export const getEquipment = async () => {
  const res = await fetch(`${BASE_URL}/equipment`);
  return res.json();
};

export const getTypes = async () => {
  const res = await fetch(`${BASE_URL}/types`);
  return res.json();
};

export const createEquipment = async (data: any) => {
  const res = await fetch(`${BASE_URL}/equipment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateEquipment = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  return res.json();
};

export const deleteEquipment = async (id: number) => {
  await fetch(`${BASE_URL}/equipment/${id}`, {
    method: "DELETE",
  });
};

export const getMaintenance = async (equipmentId: number) => {
  const res = await fetch(`${BASE_URL}/equipment/${equipmentId}/maintenance`);
  return res.json();
};

export const addMaintenance = async (data: any) => {
  const res = await fetch(`${BASE_URL}/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  return res.json();
};