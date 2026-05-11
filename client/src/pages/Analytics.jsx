import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {

      const res = await api.get("/devices");

      setDevices(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  // Device Status Data
  const statusData = [
    {
      name: "Online",
      value: devices.filter(
        (d) => d.status === "online"
      ).length,
    },
    {
      name: "Offline",
      value: devices.filter(
        (d) => d.status === "offline"
      ).length,
    },
  ];

  // Device CPU Data
  const cpuData = devices.map((device) => ({
    name: device.deviceName,
    cpu: device.cpuUsage,
    ram: device.ramUsage,
    disk: device.diskUsage || 0,
  }));

  // Health Score
  const calculateHealthScore = (device) => {

    let score = 100;

    score -= device.cpuUsage * 0.3;

    score -= device.ramUsage * 0.3;

    score -= (device.diskUsage || 0) * 0.2;

    if (device.status === "offline") {
      score -= 30;
    }

    return Math.max(
      0,
      Math.min(100, Math.round(score))
    );
  };

  const unhealthyDevices = [...devices]
    .sort(
      (a, b) =>
        calculateHealthScore(a) -
        calculateHealthScore(b)
    )
    .slice(0, 5);

  const COLORS = [
    "#10B981",
    "#EF4444",
  ];

  return (
    <div className="flex bg-[#0F172A] min-h-screen text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Historical infrastructure analytics
          </p>

        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-slate-400">
              Total Devices
            </h2>

            <p className="text-4xl font-bold mt-4">
              {devices.length}
            </p>

          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-slate-400">
              Avg CPU Usage
            </h2>

            <p className="text-4xl font-bold mt-4">

              {devices.length > 0
                ? Math.round(
                    devices.reduce(
                      (sum, d) =>
                        sum + d.cpuUsage,
                      0
                    ) / devices.length
                  )
                : 0}
              %

            </p>

          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-slate-400">
              Avg RAM Usage
            </h2>

            <p className="text-4xl font-bold mt-4">

              {devices.length > 0
                ? Math.round(
                    devices.reduce(
                      (sum, d) =>
                        sum + d.ramUsage,
                      0
                    ) / devices.length
                  )
                : 0}
              %

            </p>

          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-slate-400">
              Critical Devices
            </h2>

            <p className="text-4xl font-bold mt-4 text-red-400">

              {
                unhealthyDevices.filter(
                  (d) =>
                    calculateHealthScore(d) < 50
                ).length
              }

            </p>

          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Device Status */}
          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Device Status Distribution
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {statusData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Resource Usage */}
          <div className="bg-[#1E293B] rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Resource Usage
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={cpuData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="cpu"
                    fill="#3B82F6"
                  />

                  <Bar
                    dataKey="ram"
                    fill="#10B981"
                  />

                  <Bar
                    dataKey="disk"
                    fill="#F59E0B"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Health Rankings */}
        <div className="bg-[#1E293B] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Lowest Health Devices
          </h2>

          <div className="space-y-4">

            {unhealthyDevices.map((device) => (

              <div
                key={device._id}
                className="bg-[#0F172A] rounded-xl p-4"
              >

                <div className="flex justify-between mb-2">

                  <div>

                    <p className="font-bold">
                      {device.deviceName}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {device.username}
                    </p>

                  </div>

                  <p className="text-red-400 font-bold text-xl">

                    {calculateHealthScore(device)}

                  </p>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-3">

                  <div
                    className={`h-3 rounded-full ${
                      calculateHealthScore(
                        device
                      ) > 80
                        ? "bg-green-500"
                        : calculateHealthScore(
                            device
                          ) > 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${calculateHealthScore(
                        device
                      )}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}