import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { AiOutlineCloudDownload } from "react-icons/ai";
import { RiAiGenerate } from "react-icons/ri";

function QRcode(link) {
    let url=link.url;
    const [qrCode, setQrCode] = useState(null);
    const qrRef = useRef();
    const [generateclicked, setgenerateclicked] = useState(false)

    const generateQRCode = () => {
        if (url.trim() !== '') {
            setQrCode(url);
            setgenerateclicked(true);
        }
    };

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');  // Find the canvas element in the QRCode component
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = image;
        link.click();
    };

    return (
        <div className="flex justify-center items-center">
            <div className="">
                {!generateclicked && <button
                    className="inline-flex items-center text-center justify-center px-5 py-2.5 me-2 mb-2 text-sm font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-lg hover:bg-yellow-200 hover:scale-95"
                    onClick={generateQRCode}
                >
                    Generate QR code&nbsp;&nbsp;<span className='text-lg'><RiAiGenerate/></span>
                </button>}
                {qrCode && (
                    <div className="mt-4 mx-auto" ref={qrRef}>
                        <QRCode value={qrCode} size={256} level="H" includeMargin={true} />
                        <div className='flex flex-col justify-center mt-2'>
                        <button
                            className="flex justify-center items-center px-5 py-2.5 mb-2 text-sm font-medium text-gray-900 bg-yellow-300 border border-gray-200 rounded-lg hover:bg-yellow-200 hover:scale-95"
                            onClick={downloadQR}
                        >
                            Download QR&nbsp;&nbsp;<span className='text-xl'><AiOutlineCloudDownload/></span>
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QRcode;