"use client";
import React, { useRef } from "react";
import EditableText from "./EditableText";

export default function EditableCard({ title, description, isEditing }) {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="p-4 border rounded shadow-sm bg-white">
      <EditableText initialText={title} defaultStyles={{ fontSize: "20px", fontWeight: "bold" }} isEditing={isEditing} />
      <EditableText initialText={description} defaultStyles={{ fontSize: "16px" }} isEditing={isEditing} />
    </div>
  );
}
