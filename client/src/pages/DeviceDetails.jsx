import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DeviceDetails() {
  const { id } = useParams();

  const [device, setDevice] = useState(null);

  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchDevice();
  }, []);

  const fetchDevice = async () => {
    try {
      const res = await api.get("/devices");

      const found = res.data.find(
        (d) => d._id === id
      );

      setDevice(found);

      if (found) {
        const metricsRes = await api.get(
          `/metrics/${found.deviceId}`
        );

        setMetrics(metricsRes.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!device) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  const chartData = metrics.map((metric) => ({
    time: new Date(
      metric.timestamp
    ).toLocaleTimeString(),

    cpu: metric.cpuUsage,

    ram: metric.ramUsage,

    disk: metric.diskUsage,
  }));

  return (
    <div className="flex bg-[#0F172A] min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {device.deviceName}
          </h1>

          <p className="text-slate-400 mt-2">
            Advanced device monitoring dashboard
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-slate-400">
              CPU Usage
            </h2>

            <p className="text-4xl font-bold mt-4">
              {device.cpuUsage}%
            </p>
          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-slate-400">
              RAM Usage
            </h2>

            <p className="text-4xl font-bold mt-4">
              {device.ramUsage}%
            </p>
          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-slate-400">
              Disk Usage
            </h2>

            <p className="text-4xl font-bold mt-4">
              {device.diskUsage || 0}%
            </p>
          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-slate-400">
              Status
            </h2>

            <p className="text-4xl font-bold mt-4 capitalize">
              {device.status}
            </p>
          </div>

        </div>

        {/* System Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              System Information
            </h2>

            <div className="space-y-4 text-slate-300">

              <div>
                <span className="font-semibold text-white">
                  Username:
                </span>{" "}
                {device.username}
              </div>

              <div>
                <span className="font-semibold text-white">
                  OS:
                </span>{" "}
                {device.os}
              </div>

              <div>
                <span className="font-semibold text-white">
                  OS Version:
                </span>{" "}
                {device.osVersion}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Architecture:
                </span>{" "}
                {device.architecture}
              </div>

              <div>
                <span className="font-semibold text-white">
                  CPU Model:
                </span>{" "}
                {device.cpuModel}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Total RAM:
                </span>{" "}
                {device.totalRam}
              </div>

            </div>
          </div>

          {/* Network Info */}
          <div className="bg-[#1E293B] rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              Network Information
            </h2>

            <div className="space-y-4 text-slate-300">

              <div>
                <span className="font-semibold text-white">
                  Local IP:
                </span>{" "}
                {device.localIp}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Public IP:
                </span>{" "}
                {device.publicIp}
              </div>

              <div>
                <span className="font-semibold text-white">
                  MAC Address:
                </span>{" "}
                {device.macAddress}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Upload:
                </span>{" "}
                {device.networkSent}
              </div>

              <div>
                <span className="font-semibold text-white">
                  Download:
                </span>{" "}
                {device.networkReceived}
              </div>

            </div>
          </div>

        </div>

        {/* Storage Info */}
        <div className="bg-[#1E293B] rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Storage Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p className="text-slate-400">
                Total Disk
              </p>

              <p className="text-2xl font-bold mt-2">
                {device.totalDisk}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Free Disk
              </p>

              <p className="text-2xl font-bold mt-2">
                {device.freeDisk}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Uptime
              </p>

              <p className="text-2xl font-bold mt-2">
                {Math.floor(device.uptime / 3600)} hrs
              </p>
            </div>

          </div>
        </div>

        {/* Charts */}
        <div className="bg-[#1E293B] rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Performance Metrics
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={chartData}>

                <XAxis
                  dataKey="time"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="ram"
                  stroke="#10B981"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="disk"
                  stroke="#F59E0B"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Top Processes */}
        <div className="bg-[#1E293B] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Top Processes
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left border-b border-slate-700">

                  <th className="pb-4">
                    Process
                  </th>

                  <th className="pb-4">
                    CPU %
                  </th>

                  <th className="pb-4">
                    Memory %
                  </th>

                </tr>
              </thead>

              <tbody>

                {device.processes?.map(
                  (process, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800"
                    >

                      <td className="py-4">
                        {process.name}
                      </td>

                      <td className="py-4">
                        {process.cpu}
                      </td>

                      <td className="py-4">
                        {process.memory}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  );
}