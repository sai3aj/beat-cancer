import React, { useState } from "react";
import { IconChevronRight, IconFolder, IconTrash } from "@tabler/icons-react";
import { useStateContext } from "../../../context";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-xl bg-[#1f1f27] p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-semibold text-white">Confirm Deletion</h3>
        <p className="mb-6 text-gray-400">
          Are you sure you want to delete this record? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const RecordCard = ({ record, onNavigate }) => {
  const { deleteRecord } = useStateContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteRecord(record.id);
      if (success) {
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="group flex flex-col rounded-xl border bg-[#1f1f27] shadow-sm transition-all duration-300 hover:bg-[#2a2a35] dark:border-neutral-800">
        <div className="flex justify-between gap-x-3 p-4 md:p-5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white">
            <IconFolder size={70} className="text-green-500" />
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            disabled={isDeleting}
          >
            <IconTrash 
              size={24} 
              className="text-red-500 transition-colors hover:text-red-600" 
            />
          </button>
        </div>

        <a
          onClick={() => onNavigate(record.recordName)}
          className="inline-flex cursor-pointer items-center justify-between rounded-b-xl border-t border-neutral-800 px-4 py-3 text-sm text-neutral-400 transition-colors hover:bg-neutral-800"
        >
          {record.recordName}
          <IconChevronRight />
        </a>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default RecordCard;
