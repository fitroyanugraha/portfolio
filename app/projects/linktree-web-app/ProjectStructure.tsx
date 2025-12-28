"use client";
import { useState } from "react";
import { ChevronRight, Folder, FolderOpen, File } from "lucide-react";
import "./project-structure.css";

interface TreeNode {
    name: string;
    type: "folder" | "file";
    children?: TreeNode[];
}

const ProjectStructure = () => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
        new Set(["linktree", "public", "src", "components", "data", "favicon"])
    );

    const structure: TreeNode[] = [
        {
            name: "public",
            type: "folder",
            children: [
                {
                    name: "favicon",
                    type: "folder",
                    children: [
                        { name: "star.svg", type: "file" },
                        { name: "site.webmanifest", type: "file" },
                    ],
                },
                { name: "robots.txt", type: "file" },
                { name: "sitemap.xml", type: "file" },
            ],
        },
        {
            name: "src",
            type: "folder",
            children: [
                {
                    name: "assets",
                    type: "folder",
                    children: [{ name: "Photo-Profile.webp", type: "file" }],
                },
                {
                    name: "components",
                    type: "folder",
                    children: [
                        { name: "ContactForm.jsx", type: "file" },
                        { name: "Header.jsx", type: "file" },
                        { name: "NavButtons.jsx", type: "file" },
                    ],
                },
                {
                    name: "data",
                    type: "folder",
                    children: [{ name: "navLinks.js", type: "file" }],
                },
                { name: "App.jsx", type: "file" },
                { name: "main.jsx", type: "file" },
                { name: "style.css", type: "file" },
            ],
        },
        { name: ".env", type: "file" },
        { name: ".gitignore", type: "file" },
        { name: "eslint.config.js", type: "file" },
        { name: "index.html", type: "file" },
        { name: "package.json", type: "file" },
        { name: "package-lock.json", type: "file" },
        { name: "vite.config.js", type: "file" },
        { name: "LICENSE", type: "file" },
        { name: "README.md", type: "file" },
    ];

    const toggleFolder = (folderPath: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(folderPath)) {
            newExpanded.delete(folderPath);
        } else {
            newExpanded.add(folderPath);
        }
        setExpandedFolders(newExpanded);
    };

    const TreeItem = ({
        node,
        level = 0,
        path = "",
        isLast = true,
        parentLines = [],
    }: {
        node: TreeNode;
        level?: number;
        path?: string;
        isLast?: boolean;
        parentLines?: boolean[];
    }) => {
        const currentPath = `${path}/${node.name}`;
        const isExpanded = expandedFolders.has(currentPath);
        const isFolder = node.type === "folder";

        return (
            <div key={currentPath}>
                <div className="tree-item-wrapper">
                    {/* Render vertical lines for parent levels */}
                    {parentLines.map((hasNextSibling, idx) => (
                        <div
                            key={`line-${idx}`}
                            className={`tree-line ${hasNextSibling ? "tree-line-active" : ""
                                }`}
                        />
                    ))}

                    {/* Current level line and connector */}
                    <div className={`tree-connector ${isLast ? "last" : ""}`} />

                    {/* Content: toggle, icon, and name */}
                    {isFolder ? (
                        <>
                            <button
                                className="tree-toggle"
                                onClick={() => toggleFolder(currentPath)}
                            >
                                <ChevronRight
                                    size={16}
                                    className={`tree-chevron ${isExpanded ? "expanded" : ""
                                        }`}
                                />
                            </button>
                            <div className="tree-item">
                                {isExpanded ? (
                                    <FolderOpen size={16} className="tree-icon folder-icon folder-open" />
                                ) : (
                                    <Folder size={16} className="tree-icon folder-icon" />
                                )}
                                <span
                                    className="tree-name"
                                    onClick={() => toggleFolder(currentPath)}
                                >
                                    {node.name}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="tree-item">
                            <div className="tree-toggle-placeholder" />
                            <File size={16} className="tree-icon file-icon" />
                            <span className="tree-name">{node.name}</span>
                        </div>
                    )}
                </div>

                {isFolder && isExpanded && node.children && (
                    <div className="tree-children">
                        {node.children.map((child, idx) => {
                            const isLastChild = idx === node.children!.length - 1;
                            return (
                                <TreeItem
                                    key={child.name}
                                    node={child}
                                    level={level + 1}
                                    path={currentPath}
                                    isLast={isLastChild}
                                    parentLines={[...parentLines, !isLast]}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="project-structure-container">
            <div className="project-structure-header">
                <h3>Project Structure</h3>
                <p>Complete folder and file organization</p>
            </div>
            <div className="project-structure-content">
                <div className="tree-root">
                    <div className="tree-item" style={{ paddingLeft: 0 }}>
                        <button
                            className="tree-toggle"
                            onClick={() => toggleFolder("linktree")}
                        >
                            <ChevronRight
                                size={16}
                                className={`tree-chevron ${expandedFolders.has("linktree") ? "expanded" : ""
                                    }`}
                            />
                        </button>
                        {expandedFolders.has("linktree") ? (
                            <FolderOpen size={16} className="tree-icon folder-icon root-folder folder-open" />
                        ) : (
                            <Folder size={16} className="tree-icon folder-icon root-folder" />
                        )}
                        <span
                            className="tree-name root-name"
                            onClick={() => toggleFolder("linktree")}
                        >
                            linktree/
                        </span>
                    </div>

                    {expandedFolders.has("linktree") && (
                        <div className="tree-children">
                            {structure.map((node) => (
                                <TreeItem
                                    key={node.name}
                                    node={node}
                                    level={1}
                                    path="/linktree"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectStructure;
