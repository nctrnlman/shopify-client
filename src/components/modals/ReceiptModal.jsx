import React from "react";

function ReceiptModal({ order }) {
  const isDataMissing =
    !order ||
    !order.remitter ||
    !order.account_number ||
    !order.bank_name ||
    !order.payment_proof;

  if (isDataMissing) {
    return (
      <>
        <input type="checkbox" id="receipt_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className="text-center p-2 mb-3">
              <h3 className="font-bold text-lg">Receipt Order: N/A</h3>
            </div>
            <div className="flex flex-col gap-2">
              <p>No Receipt data available.</p>
            </div>
            <div className="modal-action">
              <label htmlFor="receipt_modal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <input type="checkbox" id="receipt_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="text-center p-2 mb-3">
            <h3 className="font-bold text-lg">
              Receipt Order: #{order.id_order}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p>Remitter: {order.remitter}</p>
            <p>Bank Name: {order.bank_name}</p>
            <p>Account Number: {order.account_number}</p>
            <img
              src={`https://shopify-be-git-main-nctrnlman.vercel.app${order.payment_proof}`}
              alt="Payment Proof"
              className="py-4"
            />
          </div>
          <div className="modal-action">
            <label htmlFor="receipt_modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptModal;
