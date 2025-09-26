"use client";
import React, { useRef } from "react";
import EditableText from "./EditableText";

export default function EditableCard({ title, description, isEditing }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
    >
      <EditableText
        initialText={title}
        defaultStyles={{ fontSize: "20px", fontWeight: "bold" }}
        isEditing={isEditing}
      />
      <EditableText
        initialText={description}
        defaultStyles={{ fontSize: "16px", color: "#444" }}
        isEditing={isEditing}
      />
    </div>
  );
}
