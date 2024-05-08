import React from "react";
import QRCode from "react-qr-code";

function UserCard({ name, email, mobileNumber, qrCode, ...props }) {
  return (
    <>
      <div className="library-card bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden mt-8 flex flex-row h-[11/12] w-[11/12]">
        <div className="bg-gray-700 text-white py-12 px-14 flex flex-col gap-5">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm">{email}</p>
          <p className="text-sm">{mobileNumber}</p>
        </div>
        {qrCode && (
          <div className="py-4 px-6 flex justify-center items-center">
            <QRCode
              value={JSON.stringify(qrCode)}
              style={{
                height: 150,
                width: 150,
                padding: 0,
                margin: 0,
                foregroundColor: "#333",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UserCard;
