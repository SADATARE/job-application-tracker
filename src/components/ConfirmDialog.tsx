import "./ConfirmDialog.css";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog( {message, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <div className="modal-overlay">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="modal-actions">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button className="danger" type="button" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog;