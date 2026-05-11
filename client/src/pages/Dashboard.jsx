import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import api from "../services/api";

import socket from "../services/socket";

import DeviceMap from "../components/DeviceMap";

export default function Dashboard() {

  const [devices, setDevices] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const navigate = useNavigate();

  useEffect(() => {

    fetchDevices();

    fetchAlerts();

    socket.on("deviceUpdated", () => {
      fetchDevices();
    });

    socket.on("newAlert", () => {
      fetchAlerts();
    });

    return () => {

      socket.off("deviceUpdated");

      socket.off("newAlert");

    };

  }, []);

  const fetchDevices = async () => {

    try {

      const res =
        await api.get("/devices");

      setDevices(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  const fetchAlerts = async () => {

    try {

      const res =
        await api.get("/alerts");

      setAlerts(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  const filteredDevices = devices.filter(
    (device) => {

      const matchesSearch =
        device.deviceName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        device.username
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : device.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    }
  );

  const onlineDevices = devices.filter(
    (d) => d.status === "online"
  ).length;

  const offlineDevices = devices.filter(
    (d) => d.status === "offline"
  ).length;

  const highCpuDevices = devices.filter(
    (d) => d.cpuUsage > 80
  ).length;

  const calculateHealthScore = (
    device
  ) => {

    let score = 100;

    score -= device.cpuUsage * 0.3;

    score -= device.ramUsage * 0.3;

    if (device.status === "offline") {
      score -= 30;
    }

    return Math.max(
      0,
      Math.round(score)
    );

  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />

      </div>

      <Sidebar />

      <main className="relative z-10 pl-64 overflow-y-auto">

        <div className="max-w-[1800px] mx-auto p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">

            <h1 className="text-5xl font-bold">
              Monitoring Dashboard
            </h1>

            <div className="flex items-center gap-3 text-slate-400 text-sm">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0A8.003 8.003 0 0119.418 15m0 0H15"
                />

              </svg>

              <span>

                Last updated:{" "}
                {new Date().toLocaleTimeString()}

              </span>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Total Devices"
              value={devices.length}
            />

            <StatCard
              title="Online Devices"
              value={onlineDevices}
              color="text-emerald-400"
            />

            <StatCard
              title="Offline Devices"
              value={offlineDevices}
              color="text-red-400"
            />

            <StatCard
              title="High CPU Devices"
              value={highCpuDevices}
              color="text-yellow-400"
            />

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-6 mb-8">

            {/* Resource Usage */}
            <div className="2xl:col-span-2 bg-[#081028]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)]">

              <h2 className="text-2xl font-bold mb-6">
                Resource Usage
              </h2>

              {/* Legend */}
              <div className="flex items-center gap-8 mb-8 text-sm font-medium">

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-blue-500" />

                  <span className="text-slate-300">
                    CPU Usage (%)
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-emerald-500" />

                  <span className="text-slate-300">
                    RAM Usage (%)
                  </span>

                </div>

              </div>

              {/* Devices */}
              <div className="space-y-8 max-h-[520px] overflow-y-auto pr-2">

                {devices.map((device) => (

                  <div key={device._id}>

                    <h3 className="text-white font-semibold mb-4">

                      {device.deviceName}

                    </h3>

                    {/* CPU */}
                    <div className="flex items-center gap-4 mb-3">

                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${device.cpuUsage}%`,
                          }}
                        />

                      </div>

                      <span className="text-blue-400 font-semibold min-w-[48px] text-right">

                        {device.cpuUsage}%

                      </span>

                    </div>

                    {/* RAM */}
                    <div className="flex items-center gap-4">

                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${device.ramUsage}%`,
                          }}
                        />

                      </div>

                      <span className="text-emerald-400 font-semibold min-w-[48px] text-right">

                        {device.ramUsage}%

                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Global Infrastructure */}
            <div className="2xl:col-span-3 bg-[#081028]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)]">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    Global Infrastructure
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Live worldwide device monitoring
                  </p>

                </div>

                <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                  ACTIVE
                </div>

              </div>

              <div className="h-[420px] overflow-hidden border border-slate-800 rounded-xl">

                <DeviceMap devices={devices} />

              </div>

            </div>

          </div>

          {/* Devices Table */}
          <div className="bg-[#081028]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 mb-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] overflow-hidden">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">
                Devices
              </h2>

              <div className="flex gap-4">

                <input
                  type="text"
                  placeholder="Search devices..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="bg-[#020817] border border-slate-700 rounded-xl px-5 py-3 w-80 outline-none"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="bg-[#020817] border border-slate-700 rounded-xl px-5 py-3 outline-none"
                >

                  <option value="all">
                    All Devices
                  </option>

                  <option value="online">
                    Online
                  </option>

                  <option value="offline">
                    Offline
                  </option>

                </select>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="text-left text-slate-400 border-b border-slate-800">

                    <th className="pb-5">
                      Device
                    </th>

                    <th className="pb-5">
                      User
                    </th>

                    <th className="pb-5">
                      IP
                    </th>

                    <th className="pb-5">
                      CPU
                    </th>

                    <th className="pb-5">
                      RAM
                    </th>

                    <th className="pb-5">
                      Status
                    </th>

                    <th className="pb-5">
                      Health
                    </th>

                    <th className="pb-5">
                      Location
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredDevices.map((device) => (

                    <tr
                      key={device._id}
                      onClick={() =>
                        navigate(
                          `/devices/${device._id}`
                        )
                      }
                      className="border-b border-slate-800 hover:bg-slate-900/40 cursor-pointer transition"
                    >

                      <td className="py-5">
                        {device.deviceName}
                      </td>

                      <td>
                        {device.username}
                      </td>

                      <td>
                        {device.ipAddress}
                      </td>

                      <td className="text-blue-400 font-semibold">
                        {device.cpuUsage}%
                      </td>

                      <td className="text-emerald-400 font-semibold">
                        {device.ramUsage}%
                      </td>

                      <td>

                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${
                            device.status === "online"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >

                          {device.status}

                        </span>

                      </td>

                      <td>

                        <div className="flex items-center gap-3">

                          <div className="w-24 bg-slate-800 rounded-full h-3">

                            <div
                              className={`h-3 rounded-full ${
                                calculateHealthScore(device) > 80
                                  ? "bg-emerald-500"
                                  : calculateHealthScore(device) > 50
                                  ? "bg-yellow-400"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${calculateHealthScore(device)}%`,
                              }}
                            />

                          </div>

                          <span className="font-semibold">
                            {calculateHealthScore(device)}
                          </span>

                        </div>

                      </td>

                      <td>

                        <div className="flex items-center gap-3">

                          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />

                          <span className="text-slate-200">

                            {device.location?.name ||
                              "Unknown"}

                          </span>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Activity Feed */}
          <div className="w-full bg-[#081028]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold">
                  Activity Feed
                </h2>

                <p className="text-slate-400 mt-2">
                  Live infrastructure events
                </p>

              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold shrink-0">

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                LIVE

              </div>

            </div>

            {/* Feed */}
            <div className="space-y-5">

              {devices
                .slice(0, 6)
                .map((device, index) => (

                  <div
                    key={device._id}
                    className="flex items-start gap-4 border-b border-slate-800 pb-5 last:border-b-0"
                  >

                    {/* Dot */}
                    <div className="mt-1 shrink-0">

                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />

                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between items-start gap-4">

                        <h3 className="font-semibold text-white truncate">

                          {device.deviceName}

                        </h3>

                        <span className="text-xs text-slate-500 shrink-0">

                          {index + 1}m ago

                        </span>

                      </div>

                      <p className="text-slate-400 mt-2 truncate">

                        {device.status === "online"
                          ? "Device connected successfully"
                          : "Device went offline"}

                      </p>

                    </div>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({
  title,
  value,
  color = "text-white",
}) {

  return (
    <div className="bg-[#081028]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">

      <p className="text-slate-400 mb-4">
        {title}
      </p>

      <h2 className={`text-5xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}