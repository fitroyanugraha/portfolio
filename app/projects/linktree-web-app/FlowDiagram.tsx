"use client";
import { useMemo } from "react";
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

interface FlowNode {
    id: string;
    label: string;
    type: "start" | "action" | "decision" | "process" | "end";
    icon?: string;
    parent?: string;
}

interface FlowDiagramData {
    nodes: FlowNode[];
}

const nodeTypeColors: Record<string, { bg: string; border: string }> = {
    start: { bg: "#bbf7d0", border: "#16a34a" },
    end: { bg: "#bbf7d0", border: "#16a34a" },
    decision: { bg: "#bfdbfe", border: "#2563eb" },
    action: { bg: "#e9d5ff", border: "#9333ea" },
    process: { bg: "#fde047", border: "#ca8a04" },
};

interface FlowDiagramProps {
    data: FlowDiagramData;
}

const FlowDiagram = ({ data }: FlowDiagramProps) => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    // Convert data to React Flow nodes and edges
    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
        if (!data?.nodes || data.nodes.length === 0) {
            console.warn("No nodes data provided to FlowDiagram");
            return { nodes: [], edges: [] };
        }

        // Calculate depth level for each node
        const getDepth = (nodeId: string): number => {
            const node = (data.nodes as FlowNode[]).find(n => n.id === nodeId);
            if (!node || !node.parent) return 0;
            return 1 + getDepth(node.parent);
        };

        // Get all children of a node
        const getChildren = (nodeId: string): FlowNode[] => {
            return (data.nodes as FlowNode[]).filter(n => n.parent === nodeId);
        };

        // Calculate X position based on tree structure
        const calculateNodeX = (nodeId: string): number => {
            const node = (data.nodes as FlowNode[]).find(n => n.id === nodeId);
            if (!node) return 0;

            if (!node.parent) {
                // Root node
                return 50;
            }

            // Get parent and siblings
            const siblings = getChildren(node.parent);
            const siblingIndex = siblings.indexOf(node);
            const totalSiblings = siblings.length;

            // Parent X position
            const parentX = calculateNodeX(node.parent);

            // Determine spacing based on depth
            // Level 1 children (direct children of root) get larger spacing
            const parentDepth = getDepth(node.parent);
            const spacing = parentDepth === 0 ? 450 : 250; // Larger spacing for first level children

            return parentX + (siblingIndex - (totalSiblings - 1) / 2) * spacing;
        };

        // Calculate positions with level-based layout
        const flowNodes = (data.nodes as FlowNode[]).map((node) => {
            const colors = nodeTypeColors[node.type] || nodeTypeColors.process;

            const depth = getDepth(node.id);
            let y = depth * 150; // Each level moves 150px down

            // Add extra spacing between root nodes (start and decision)
            if (depth === 0) {
                const rootNodes = (data.nodes as FlowNode[]).filter(n => !n.parent);
                const rootIndex = rootNodes.indexOf(node);
                // First root node (start) pushed up (negative), second root node (decision) at y=0
                y = rootIndex === 0 ? -150 : 0;
            }

            const x = calculateNodeX(node.id);

            return {
                id: node.id,
                data: {
                    label: (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ fontSize: "1.5rem" }}>{node.icon}</div>
                            <div style={{ fontSize: "0.85rem", fontWeight: "600", lineHeight: "1.2", color: "#000" }}>
                                {node.label}
                            </div>
                        </div>
                    ),
                },
                position: { x, y },
                style: {
                    background: colors.bg,
                    borderRadius: "8px",
                    padding: "12px 16px",
                    minWidth: "160px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#000",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            } as Node;
        });

        const flowEdges = (data.nodes as FlowNode[])
            .filter((node) => node.parent)
            .map((node) => ({
                id: `${node.parent}-${node.id}`,
                source: node.parent!,
                target: node.id,
                animated: true,
                style: { stroke: "#9ca3af", strokeWidth: 2 },
            })) as Edge[];


        return { nodes: flowNodes, edges: flowEdges };
    }, [data]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    if (!initialNodes || initialNodes.length === 0) {
        return (
            <div className="reactflow-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--base-300)" }}>
                No flowchart data available
            </div>
        );
    }

    return (
        <div className="reactflow-wrapper">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={
                    isMobile
                        ? { padding: 0.55 }
                        : { padding: 0.2 }
                }
                minZoom={isMobile ? 0.325 : 0.325}
                maxZoom={2}
                attributionPosition="bottom-right"
            >
                <Background color="var(--base-300)" gap={16} size={1} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default FlowDiagram;
