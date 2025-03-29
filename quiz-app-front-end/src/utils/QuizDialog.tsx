import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface QuizDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const QuizDialog: React.FC<QuizDialogProps> = ({ isOpen, onClose, title, children, actionButton }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <DialogPanel className="bg-white p-6 rounded-lg shadow-lg text-center">
        <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        <div className="mt-4">{children}</div>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {actionButton.label}
          </button>
        )}
      </DialogPanel>
    </Dialog>
  );
};

export default QuizDialog;
