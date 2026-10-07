"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  Globe,
  Shield,
  Activity,
  RefreshCw,
  Zap,
  Radio,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Search,
  Filter,
} from "lucide-react";

export interface GlobalIPNode {
  id: string;
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  role: string;
  asn: string;
  threatType:
    | "Core Switch"
    | "Tor Exit Node"
    | "Botnet C2"
    | "Bulletproof Proxy"
    | "Emulator Farm"
    | "Credential Stuffer"
    | "Remittance Gateway";
  threatLevel: "Clean" | "Medium" | "High" | "Critical";
  color: number;
  hexColor: string;
  interceptCount: number;
  verdict:
    | "Allowlisted Switch"
    | "Auto-Blocked Packet"
    | "Challenge 2FA Triggered"
    | "Biometric Step-Up"
    | "Flagged for SOC Review";
  bandwidth: string;
}

export const GLOBAL_IP_NODES: GlobalIPNode[] = [
  {
    id: "BD-01",
    ip: "103.205.180.12",
    city: "Dhaka Central",
    country: "Bangladesh",
    countryCode: "BD",
    lat: 23.8103,
    lng: 90.4125,
    role: "upay National Core Clearing Gateway",
    asn: "AS132047 (upay Core)",
    threatType: "Core Switch",
    threatLevel: "Clean",
    color: 0xf59e0b,
    hexColor: "#f59e0b",
    interceptCount: 14820,
    verdict: "Allowlisted Switch",
    bandwidth: "10 Gbps Primary Fiber",
  },
  {
    id: "DE-01",
    ip: "185.220.101.5",
    city: "Frankfurt",
    country: "Germany",
    countryCode: "DE",
    lat: 50.1109,
    lng: 8.6821,
    role: "Darknet Tor Onion Circuit Exit",
    asn: "AS202425 (Zwiebelfreunde)",
    threatType: "Tor Exit Node",
    threatLevel: "Critical",
    color: 0xef4444,
    hexColor: "#ef4444",
    interceptCount: 421,
    verdict: "Auto-Blocked Packet",
    bandwidth: "24.5 Mbps Onion Stream",
  },
  {
    id: "GB-01",
    ip: "45.154.255.89",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    lat: 51.5074,
    lng: -0.1278,
    role: "Distributed Credential Stuffing Origin",
    asn: "AS44558 (PonyHost Ltd)",
    threatType: "Botnet C2",
    threatLevel: "Critical",
    color: 0xf43f5e,
    hexColor: "#f43f5e",
    interceptCount: 890,
    verdict: "Auto-Blocked Packet",
    bandwidth: "41.8 Mbps SYN Flood",
  },
  {
    id: "US-01",
    ip: "198.51.100.24",
    city: "New York",
    country: "United States",
    countryCode: "US",
    lat: 40.7128,
    lng: -74.006,
    role: "Commercial VPN & Cloud Emulator Pool",
    asn: "AS174 (Cogent Comms)",
    threatType: "Bulletproof Proxy",
    threatLevel: "High",
    color: 0xf97316,
    hexColor: "#f97316",
    interceptCount: 312,
    verdict: "Challenge 2FA Triggered",
    bandwidth: "120 Mbps VPN Tunnel",
  },
  {
    id: "SG-01",
    ip: "103.114.96.22",
    city: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    lat: 1.3521,
    lng: 103.8198,
    role: "APAC Regional Settlement Hub",
    asn: "AS4646 (Singtel Global)",
    threatType: "Remittance Gateway",
    threatLevel: "Clean",
    color: 0x10b981,
    hexColor: "#10b981",
    interceptCount: 3180,
    verdict: "Allowlisted Switch",
    bandwidth: "2.4 Gbps Cross-Link",
  },
  {
    id: "AE-01",
    ip: "194.26.29.112",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    lat: 25.2048,
    lng: 55.2708,
    role: "GCC Cross-Border Remittance Inflow",
    asn: "AS5384 (Emirates Telecom)",
    threatType: "Remittance Gateway",
    threatLevel: "Medium",
    color: 0x38bdf8,
    hexColor: "#38bdf8",
    interceptCount: 1640,
    verdict: "Biometric Step-Up",
    bandwidth: "680 Mbps FX Rail",
  },
  {
    id: "JP-01",
    ip: "182.160.100.4",
    city: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    lat: 35.6762,
    lng: 139.6503,
    role: "API Reverse Proxy & Synthetic Probe",
    asn: "AS2516 (KDDI Corp)",
    threatType: "Credential Stuffer",
    threatLevel: "High",
    color: 0xa855f7,
    hexColor: "#a855f7",
    interceptCount: 184,
    verdict: "Flagged for SOC Review",
    bandwidth: "18.2 Mbps Probe",
  },
  {
    id: "BR-01",
    ip: "177.18.230.14",
    city: "São Paulo",
    country: "Brazil",
    countryCode: "BR",
    lat: -23.5505,
    lng: -46.6333,
    role: "Rooted Android Device Farm Relay",
    asn: "AS28573 (Claro Brasil)",
    threatType: "Emulator Farm",
    threatLevel: "High",
    color: 0xf59e0b,
    hexColor: "#f59e0b",
    interceptCount: 247,
    verdict: "Challenge 2FA Triggered",
    bandwidth: "33.1 Mbps Farm Traffic",
  },
  {
    id: "NG-01",
    ip: "105.112.45.18",
    city: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
    lat: 6.5244,
    lng: 3.3792,
    role: "SIM-Swap Phishing SMS Gateway",
    asn: "AS37148 (MTN Nigeria)",
    threatType: "Bulletproof Proxy",
    threatLevel: "Critical",
    color: 0xdc2626,
    hexColor: "#dc2626",
    interceptCount: 529,
    verdict: "Auto-Blocked Packet",
    bandwidth: "15.4 Mbps Relay",
  },
  {
    id: "AU-01",
    ip: "103.48.196.2",
    city: "Sydney",
    country: "Australia",
    countryCode: "AU",
    lat: -33.8688,
    lng: 151.2093,
    role: "Oceania Remittance & Cloud Ingress",
    asn: "AS13335 (Cloudflare AU)",
    threatType: "Remittance Gateway",
    threatLevel: "Clean",
    color: 0x06b6d4,
    hexColor: "#06b6d4",
    interceptCount: 790,
    verdict: "Allowlisted Switch",
    bandwidth: "450 Mbps Transit",
  },
  {
    id: "NL-01",
    ip: "91.240.118.77",
    city: "Amsterdam",
    country: "Netherlands",
    countryCode: "NL",
    lat: 52.3676,
    lng: 4.9041,
    role: "Encrypted Wireguard Anonymizer Hop",
    asn: "AS60068 (Datacamp Ltd)",
    threatType: "Bulletproof Proxy",
    threatLevel: "High",
    color: 0xfb923c,
    hexColor: "#fb923c",
    interceptCount: 388,
    verdict: "Challenge 2FA Triggered",
    bandwidth: "88 Mbps Tunneled",
  },
  {
    id: "ZA-01",
    ip: "197.234.242.10",
    city: "Johannesburg",
    country: "South Africa",
    countryCode: "ZA",
    lat: -26.2041,
    lng: 28.0473,
    role: "Distributed Mirai Malware Probe",
    asn: "AS36937 (Liquid Telecom)",
    threatType: "Botnet C2",
    threatLevel: "Critical",
    color: 0xe11d48,
    hexColor: "#e11d48",
    interceptCount: 615,
    verdict: "Auto-Blocked Packet",
    bandwidth: "29.7 Mbps Scan",
  },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

interface ScreenTag {
  id: string;
  ip: string;
  city: string;
  x: number;
  y: number;
  visible: boolean;
  hexColor: string;
  threatLevel: string;
}

export const SentinelGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeNode, setActiveNode] = useState<GlobalIPNode>(GLOBAL_IP_NODES[0]);
  const [filterMode, setFilterMode] = useState<"all" | "critical" | "proxy" | "remittance">("all");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [liveTps, setLiveTps] = useState<number>(1425);
  const [screenTags, setScreenTags] = useState<ScreenTag[]>([]);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  // Reference for camera rotation targets so button clicks can smoothly lerp rotation
  const targetRotationRef = useRef<{ x: number; y: number }>({
    x: 0.25,
    y: -Math.PI * 0.45,
  });

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (filterMode === "critical") {
      return GLOBAL_IP_NODES.filter(
        (n) => n.threatLevel === "Critical" || n.threatType === "Core Switch"
      );
    }
    if (filterMode === "proxy") {
      return GLOBAL_IP_NODES.filter(
        (n) =>
          n.threatType === "Bulletproof Proxy" ||
          n.threatType === "Emulator Farm" ||
          n.threatType === "Core Switch"
      );
    }
    if (filterMode === "remittance") {
      return GLOBAL_IP_NODES.filter(
        (n) => n.threatType === "Remittance Gateway" || n.threatType === "Core Switch"
      );
    }
    return GLOBAL_IP_NODES;
  }, [filterMode]);

  // Live TPS fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTps((prev) => Math.floor(prev + (Math.random() * 40 - 20)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectNode = (node: GlobalIPNode) => {
    setActiveNode(node);
    // Orient globe towards this node's lat/lng
    // Invert longitude for globe rotation
    const radY = -(node.lng * (Math.PI / 180)) - Math.PI * 0.5;
    const radX = node.lat * (Math.PI / 180) * 0.5;
    targetRotationRef.current = {
      x: Math.max(-0.7, Math.min(0.7, radX)),
      y: radY,
    };
  };

  const handleCopyIp = (ip: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(ip);
      setCopiedIp(ip);
      setTimeout(() => setCopiedIp(null), 2000);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 11.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    globeGroup.rotation.y = targetRotationRef.current.y;
    globeGroup.rotation.x = targetRotationRef.current.x;

    // 2. Geometries
    const radius = 3.9;

    // Dark core
    const sphereGeo = new THREE.SphereGeometry(radius * 0.985, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x050a14,
      transparent: true,
      opacity: 0.9,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Outer wireframe latitude/longitude cage
    const wireGeo = new THREE.SphereGeometry(radius, 32, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3650,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Outer atmosphere glow
    const atmoGeo = new THREE.SphereGeometry(radius * 1.05, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // 3. Dense Surface Particle Constellation (Financial Grid Points)
    const particleCount = 1600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xf59e0b);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorNavy = new THREE.Color(0x1e293b);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + 5 ** 0.5) * i;

      const pRadius = radius + (Math.random() - 0.5) * 0.06;
      const x = pRadius * Math.sin(phi) * Math.cos(theta);
      const y = pRadius * Math.cos(phi);
      const z = pRadius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      const col = rand > 0.88 ? colorGold : rand > 0.65 ? colorCyan : colorNavy;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particleSystem);

    // 4. IP Node Markers & Beacons
    const nodeMarkerMap: {
      mesh: THREE.Mesh;
      ring: THREE.Mesh;
      node: GlobalIPNode;
      pos: THREE.Vector3;
    }[] = [];

    GLOBAL_IP_NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, radius * 1.01);

      // Core sphere
      const isCore = node.threatType === "Core Switch";
      const nodeGeo = new THREE.SphereGeometry(isCore ? 0.16 : 0.11, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: node.color,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);

      // Radial Beacon Beam
      const beamGeo = new THREE.CylinderGeometry(
        isCore ? 0.03 : 0.015,
        isCore ? 0.06 : 0.035,
        isCore ? 0.8 : 0.55,
        8
      );
      const beamMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: isCore ? 0.85 : 0.65,
        blending: THREE.AdditiveBlending,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.copy(pos.clone().multiplyScalar(1.07));
      beamMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        pos.clone().normalize()
      );
      globeGroup.add(beamMesh);

      // Pulsing Ring
      const ringGeo = new THREE.RingGeometry(
        isCore ? 0.18 : 0.13,
        isCore ? 0.28 : 0.21,
        24
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.015));
      ringMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        pos.clone().normalize()
      );
      globeGroup.add(ringMesh);

      nodeMarkerMap.push({ mesh: nodeMesh, ring: ringMesh, node, pos });
    });

    // 5. Global Arcs Connecting to Dhaka Central
    const dhakaPos = latLngToVector3(
      GLOBAL_IP_NODES[0].lat,
      GLOBAL_IP_NODES[0].lng,
      radius * 1.01
    );

    interface GlobalArc {
      curve: THREE.CatmullRomCurve3;
      tubeMesh: THREE.Mesh;
      packetMesh: THREE.Mesh;
      progress: number;
      speed: number;
      nodeId: string;
    }

    const arcs: GlobalArc[] = [];

    GLOBAL_IP_NODES.slice(1).forEach((node) => {
      const originPos = latLngToVector3(node.lat, node.lng, radius * 1.01);

      // Elevated midpoint
      const midPoint = new THREE.Vector3()
        .addVectors(originPos, dhakaPos)
        .multiplyScalar(0.5);
      const distance = originPos.distanceTo(dhakaPos);
      midPoint.normalize().multiplyScalar(radius + Math.max(0.6, distance * 0.45));

      const curve = new THREE.CatmullRomCurve3([originPos, midPoint, dhakaPos]);

      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.018, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      globeGroup.add(tubeMesh);

      // Packet
      const packetGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      globeGroup.add(packetMesh);

      arcs.push({
        curve,
        tubeMesh,
        packetMesh,
        progress: Math.random(),
        speed: 0.25 + Math.random() * 0.35,
        nodeId: node.id,
      });
    });

    // 6. Interactive Drag & Mouse Parallax
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const mouseParallax = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouseParallax.x = normX * 0.15;
      mouseParallax.y = normY * 0.15;

      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      targetRotationRef.current.y += deltaX * 0.006;
      targetRotationRef.current.x = Math.max(
        -0.8,
        Math.min(0.8, targetRotationRef.current.x + deltaY * 0.006)
      );

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || 600;
        height = entry.contentRect.height || 450;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      frameCount++;

      // Auto-rotation if enabled and not manually dragging
      if (autoRotate && !isDragging) {
        targetRotationRef.current.y += delta * 0.1;
      }

      // Smooth interpolation for rotation
      globeGroup.rotation.y +=
        (targetRotationRef.current.y + mouseParallax.x - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x +=
        (targetRotationRef.current.x + mouseParallax.y - globeGroup.rotation.x) * 0.08;

      // Outer wireframe subtle twist
      wireMesh.rotation.y = time * 0.02;

      // Pulse beacon rings
      nodeMarkerMap.forEach(({ ring }, i) => {
        const pulse = 1 + Math.sin(time * 3 + i) * 0.28;
        ring.scale.set(pulse, pulse, 1);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.45 + Math.sin(time * 3 + i) * 0.35;
      });

      // Animate packets along arcs
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + delta * arc.speed) % 1;
        const pt = arc.curve.getPoint(arc.progress);
        arc.packetMesh.position.copy(pt);
      });

      // Every 3 frames: Project 2D coordinates for front-facing nodes to display floating tags
      if (frameCount % 3 === 0) {
        const tempVec = new THREE.Vector3();
        const cameraPos = camera.position;
        const updatedTags: ScreenTag[] = [];

        nodeMarkerMap.forEach(({ node, pos }) => {
          tempVec.copy(pos).applyMatrix4(globeGroup.matrixWorld);

          // Dot product with normal vector to camera to detect front-facing hemisphere
          const dirToCam = cameraPos.clone().sub(tempVec).normalize();
          const normal = tempVec.clone().normalize();
          const dot = normal.dot(dirToCam);

          if (dot > 0.15) {
            // Front facing! Project to 2D
            tempVec.project(camera);
            const x = (tempVec.x * 0.5 + 0.5) * width;
            const y = (-(tempVec.y * 0.5) + 0.5) * height;

            if (x >= 20 && x <= width - 20 && y >= 20 && y <= height - 20) {
              updatedTags.push({
                id: node.id,
                ip: node.ip,
                city: node.city,
                x,
                y,
                visible: true,
                hexColor: node.hexColor,
                threatLevel: node.threatLevel,
              });
            }
          }
        });

        setScreenTags(updatedTags);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none border border-brand-border bg-gradient-to-b from-[#070B11] via-[#0D131C] to-[#070B11] text-brand-text shadow-xl"
      style={{ minHeight: "470px" }}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating 2D Screen-projected IP Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {screenTags.map((tag) => {
          const isSelected = activeNode.id === tag.id;
          return (
            <div
              key={tag.id}
              className={`absolute transition-transform duration-75 -translate-x-1/2 -translate-y-full mb-2 pointer-events-auto cursor-pointer ${
                isSelected ? "z-30 scale-105" : "z-10 hover:z-20 opacity-90 hover:opacity-100"
              }`}
              style={{ left: `${tag.x}px`, top: `${tag.y}px` }}
              onClick={() => {
                const found = GLOBAL_IP_NODES.find((n) => n.id === tag.id);
                if (found) handleSelectNode(found);
              }}
            >
              <div
                className={`px-2 py-0.5 rounded shadow-lg backdrop-blur-md font-mono text-[10px] flex items-center gap-1.5 border transition-all ${
                  isSelected
                    ? "bg-brand-elevated border-amber-400 text-white font-bold ring-2 ring-amber-400/30"
                    : "bg-brand-surface/85 border-brand-border text-brand-text hover:border-brand-borderStrong"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: tag.hexColor }}
                />
                <span className="font-semibold">{tag.ip}</span>
                <span className="text-brand-subtle text-[9px] hidden sm:inline">
                  [{tag.city}]
                </span>
              </div>
              {/* Little downward pointer triangle */}
              <div
                className="w-0 h-0 mx-auto border-x-4 border-x-transparent border-t-4"
                style={{
                  borderTopColor: isSelected ? "#f59e0b" : "rgba(37, 45, 55, 0.9)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Top Overlay: Title & Stream Velocity */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-upay-gold backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Globe size={18} className="animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Global Threat IP Defense Grid
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                12 ACTIVE WORLD HUBS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Inbound cross-border financial telemetry hitting upay National Core Gateway
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Threat Filter Dropdown / Tabs */}
          <div className="bg-brand-surface/90 border border-brand-border rounded-xl p-1 backdrop-blur-md flex items-center gap-1 text-[11px]">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                filterMode === "all"
                  ? "bg-brand-elevated text-white font-semibold"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              All IPs ({GLOBAL_IP_NODES.length})
            </button>
            <button
              onClick={() => setFilterMode("critical")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                filterMode === "critical"
                  ? "bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              Tor &amp; Botnets
            </button>
            <button
              onClick={() => setFilterMode("proxy")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                filterMode === "proxy"
                  ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              Proxies / Farms
            </button>
            <button
              onClick={() => setFilterMode("remittance")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                filterMode === "remittance"
                  ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              Remittance
            </button>
          </div>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all backdrop-blur-md flex items-center gap-1.5 ${
              autoRotate
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800/80 text-slate-400 border-slate-700"
            }`}
            title="Toggle Orbital Auto-Rotation"
          >
            <RefreshCw
              size={12}
              className={autoRotate ? "animate-spin" : ""}
              style={{ animationDuration: "8s" }}
            />
            <span className="hidden md:inline">
              Orbit {autoRotate ? "ON" : "PAUSED"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Overlay: IP Selector Pills & Selected Telemetry Card */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-3 pointer-events-none z-20">
        {/* Worldwide IP Selector Carousel / List */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto bg-brand-surface/90 p-2 rounded-xl border border-brand-border backdrop-blur-md max-w-2xl overflow-x-auto">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold px-1.5 py-0.5 flex items-center gap-1 shrink-0">
            <Radio size={11} className="text-upay-gold" />
            Global IPs:
          </span>
          {filteredNodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`px-2 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-brand-text bg-brand-elevated/70 hover:bg-brand-elevated hover:text-white border border-brand-border"
                }`}
                title={`${node.city}, ${node.country} — ${node.threatType}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.hexColor }}
                />
                <span>{node.ip}</span>
                <span className="text-[10px] opacity-75">({node.countryCode})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Global IP Telemetry Card */}
        <div className="pointer-events-auto bg-brand-surface/95 border border-brand-border rounded-xl p-3.5 backdrop-blur-md shadow-2xl min-w-[310px] max-w-sm">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border mb-2.5">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: activeNode.hexColor }}
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{activeNode.city}, {activeNode.country}</span>
                  <span className="text-[10px] text-brand-subtle font-normal font-mono">
                    ({activeNode.countryCode})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-upay-gold font-semibold">
                  <span>{activeNode.ip}</span>
                  <button
                    onClick={() => handleCopyIp(activeNode.ip)}
                    className="text-brand-subtle hover:text-white p-0.5 rounded"
                    title="Copy IP Address"
                  >
                    {copiedIp === activeNode.ip ? (
                      <Check size={11} className="text-emerald-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                activeNode.threatLevel === "Critical"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : activeNode.threatLevel === "High"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  : activeNode.threatLevel === "Medium"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              }`}
            >
              {activeNode.threatType}
            </span>
          </div>

          <p className="text-[11px] text-brand-muted mb-2 leading-snug">
            {activeNode.role}
          </p>

          <div className="text-[10px] font-mono text-brand-subtle mb-2.5">
            <b>ASN:</b> {activeNode.asn}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-brand-elevated p-2 rounded-lg border border-brand-border">
              <span className="text-brand-subtle block text-[9px]">AI ACTION VERDICT</span>
              <b
                className={`font-semibold block truncate ${
                  activeNode.threatLevel === "Critical"
                    ? "text-rose-400"
                    : activeNode.threatLevel === "High"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {activeNode.verdict}
              </b>
            </div>
            <div className="bg-brand-elevated p-2 rounded-lg border border-brand-border">
              <span className="text-brand-subtle block text-[9px]">INTERCEPT VOLUME</span>
              <b className="text-white font-bold">
                {activeNode.interceptCount.toLocaleString()} pkts/hr
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
