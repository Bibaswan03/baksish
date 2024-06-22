"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useCallback } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import './name.css' 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

function Menu(res_id) {
  const [menupresent, setmenupresent] = useState(false);
  const [menunotpresent, setmenunotpresent] = useState(false);

  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    const req_key = res_id.res_id;
    const req_data = {
      key: req_key,
    };
    const get_menu = async () => {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/awsapimenucheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req_data),
        }
      );
      const resdata = await res.json();
      if (resdata.success) {
        setmenupresent(true);
      } else {
        setmenunotpresent(true);
      }
    };
    get_menu();
  }, []);
  return (
    <div className="text-center text-xl mt-14">
      {menupresent && (
        <>
        
        <h1 className="text-2xl    text-center pacifico mb-10 underline">
        Checkout our menu
        </h1>
          <div >
            <div className="container content-center  mx-auto mt-2  mb-4 p-3 bg-transparent rounded-lg">
              
              <div className="" ref={setContainerRef}>
                <Document
                  className={"mix-blend-multiply"}
                  file={`https://tipppz-res-menu.s3.ap-south-1.amazonaws.com/${res_id.res_id}.pdf`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  options={options}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page className="flex items-center justify-center lg:mx-20"
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={
                        containerWidth
                          ? Math.min(containerWidth, maxWidth)
                          : maxWidth
                      }
                    />
                  ))}
                </Document>
              </div>
              
            </div>
          </div>
        </>
      )}
      {menunotpresent && (
        <h1 className="text-sm text-gray-800">
          Soon, Restaurant menu will be available here .
        </h1>
      )}
    </div>
  );
}

export default Menu;
