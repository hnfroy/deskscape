"use client";

import { useState } from "react";
import { asset } from "@/lib/path";

export default function DeskMail() {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const closeModal = () => {
    setOpen(false);
    setName("");
    setMessage("");
    setSignature("");
  };

  const layer = {
    backBox: {
      width: 220,
      height: 140,
      left: 0,
      bottom: 0,
    },

    envelopeOff: {
      width: 150,
      height: 100,
      left: 30,
      bottom: 30,
    },

    envelopeOn: {
      width: 150,
      height: 180,
      left: 30,
      bottom: 80,
    },

    frontBox: {
      width: 220,
      height: 140,
      left: 0,
      bottom: 0,
    },
  };

  return (
    <>
      <div
        className="
          relative
          h-full
          w-full
          cursor-pointer
        "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(true)}
      >
        {/* BACK BOX */}
        <img
          src={asset("/room/deskmail/back-box.svg")}
          draggable={false}
          style={{
            width: layer.backBox.width,
            height: layer.backBox.height,
            left: layer.backBox.left,
            bottom: layer.backBox.bottom,
          }}
          className="
            absolute
            pointer-events-none
          "
        />

        {/* ENVELOPE */}
        <img
          src={asset(
            hover
              ? "/room/deskmail/envelope-on.svg"
              : "/room/deskmail/envelope-off.svg",
          )}
          draggable={false}
          style={{
            width: hover ? layer.envelopeOn.width : layer.envelopeOff.width,

            height: hover ? layer.envelopeOn.height : layer.envelopeOff.height,

            left: hover ? layer.envelopeOn.left : layer.envelopeOff.left,

            bottom: hover ? layer.envelopeOn.bottom : layer.envelopeOff.bottom,
          }}
          className="
            absolute
            pointer-events-none
            transition-all
            duration-300
            ease-out
          "
        />

        {/* FRONT BOX */}
        <img
          src={asset("/room/deskmail/front-box.svg")}
          draggable={false}
          style={{
            width: layer.frontBox.width,
            height: layer.frontBox.height,
            left: layer.frontBox.left,
            bottom: layer.frontBox.bottom,
          }}
          className="
            absolute
            pointer-events-none
          "
        />
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-md
      animate-fade
    "
          onClick={closeModal}
        >
          <div
            className="
        relative
        w-[360px]
        rounded-2xl
        border-2
        border-black
        bg-[#F6EAD8]
        p-6
        shadow-[10px_10px_0px_black]
        animate-slide-up
      "
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div
              className="
          flex
          items-start
          justify-between
        "
            >
              <div>
                <h2
                  className="
              text-xl
              font-black
              tracking-tight
            "
                >
                  Leave something
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="
            text-xl
            font-black
            hover:scale-110
            transition
          "
              >
                ×
              </button>
            </div>

            {/* GUEST CARD STYLE */}

            <div
              className="
          mt-5
          rounded-xl
          border-2
          border-black
          bg-[#FFF9ED]
          p-4
        "
            >
              {/* NAME */}

              <label
                className="
            text-[10px]
            font-black
            uppercase
            tracking-widest
            text-black/50
          "
              >
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="
            mt-1
            w-full
            border-b-2
            border-black/30
            bg-transparent
            py-2
            text-sm
            outline-none
          "
              />

              {/* MESSAGE */}

              <label
                className="
            mt-4
            block
            text-[10px]
            font-black
            uppercase
            tracking-widest
            text-black/50
          "
              >
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a short note..."
                maxLength={80}
                className="
            mt-1
            h-24
            w-full
            resize-none
            border-b-2
            border-black/30
            bg-transparent
            py-2
            text-sm
            outline-none
          "
              />

              {/* SIGNATURE */}

              <label
                className="
            mt-4
            block
            text-[10px]
            font-black
            uppercase
            tracking-widest
            text-black/50
          "
              >
                Signature
              </label>

              <input
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Your signature"
                className="
            mt-1
            w-full
            border-b-2
            border-black/30
            bg-transparent
            py-2
            text-sm
            italic
            outline-none
          "
              />
            </div>

            <button
              disabled={!message || !signature}
              className="
          mt-5
          w-full
          rounded-xl
          border-2
          border-black
          bg-black
          py-3
          text-sm
          font-black
          text-white
          shadow-[4px_4px_0px_#A69D91]
          transition
          hover:translate-y-1
          hover:shadow-none
          disabled:opacity-40
        "
            >
              Leave it ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
}
