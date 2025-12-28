"use client";
import "./user-flow.css";
import { userFlowDiagram } from "./linktreeData";
import dynamic from "next/dynamic";

// Dynamic import untuk React Flow component (client-side only)
const FlowDiagram = dynamic(
    () => import("./FlowDiagram"),
    {
        ssr: false,
        loading: () => (
            <div className="reactflow-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                Loading flowchart...
            </div>
        ),
    }
);

const UserFlow = () => {
    return (
        <div className="user-flow-container">
            <FlowDiagram data={userFlowDiagram as any} />

            {/* Legend */}
            <div className="flow-legend">
                <div className="legend-item">
                    <span className="legend-box" style={{ backgroundColor: "#4ade80", borderColor: "#16a34a" }}></span>
                    <span>Start/End</span>
                </div>
                <div className="legend-item">
                    <span className="legend-box" style={{ backgroundColor: "#3b82f6", borderColor: "#2563eb" }}></span>
                    <span>Decision</span>
                </div>
                <div className="legend-item">
                    <span className="legend-box" style={{ backgroundColor: "#d946ef", borderColor: "#9333ea" }}></span>
                    <span>User Action</span>
                </div>
                <div className="legend-item">
                    <span className="legend-box" style={{ backgroundColor: "#facc15", borderColor: "#ca8a04" }}></span>
                    <span>Process</span>
                </div>
            </div>
        </div>
    );
};

export default UserFlow;
