import psutil
import platform
import socket
import uuid
import requests
import time
from datetime import datetime

BACKEND_URL = "http://localhost:5000/api/devices"

def get_size(bytes):
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024

def get_public_ip():
    try:
        return requests.get("https://api.ipify.org").text
    except:
        return "Unknown"

def get_mac():
    mac = uuid.getnode()
    mac_address = ':'.join(
        ('%012X' % mac)[i:i+2]
        for i in range(0, 12, 2)
    )
    return mac_address

def get_top_processes():
    processes = []

    for proc in psutil.process_iter(
        ['pid', 'name', 'cpu_percent', 'memory_percent']
    ):
        try:
            processes.append({
                "name": proc.info['name'],
                "cpu": round(proc.info['cpu_percent'], 2),
                "memory": round(proc.info['memory_percent'], 2)
            })
        except:
            pass

    processes = sorted(
        processes,
        key=lambda x: x['cpu'],
        reverse=True
    )

    return processes[:10]

def collect_data():
    disk = psutil.disk_usage('/')

    return {
        "deviceId": str(uuid.getnode()),

        "deviceName": socket.gethostname(),

        "username": psutil.users()[0].name if psutil.users() else "Unknown",

        "ipAddress": socket.gethostbyname(socket.gethostname()),
        "localIp": socket.gethostbyname(socket.gethostname()),
        "publicIp": get_public_ip(),

        "macAddress": get_mac(),

        "location": {
        "lat": 6.9271,
        "lng": 79.8612
        },

        "status": "online",

        "os": platform.system(),
        "osVersion": platform.version(),
        "architecture": platform.machine(),

        "cpuModel": platform.processor(),

        "cpuUsage": psutil.cpu_percent(interval=1),

        "ramUsage": psutil.virtual_memory().percent,
        "totalRam": get_size(
            psutil.virtual_memory().total
        ),

        "diskUsage": disk.percent,
        "totalDisk": get_size(disk.total),
        "freeDisk": get_size(disk.free),

        "networkSent": psutil.net_io_counters().bytes_sent,
        "networkReceived": psutil.net_io_counters().bytes_recv,

        "uptime": time.time() - psutil.boot_time(),

        "processes": get_top_processes(),

        "timestamp": datetime.utcnow().isoformat()
    }

while True:
    try:
        data = collect_data()

        response = requests.post(
            BACKEND_URL,
            json=data
        )

        print(
            f"[{datetime.now()}] Sent:",
            response.status_code
        )

    except Exception as e:
        print("Error:", e)

    time.sleep(10)