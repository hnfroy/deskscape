"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/path";

interface CameraProps {
  className?: string;
}

const Camera: React.FC<CameraProps> = ({
  className = "",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      asset("/music/camera-shutter.mp3")
    );

    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.8;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playShutter = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;

    audioRef.current
      .play()
      .catch((error) => {
        console.warn("Camera shutter sound failed:", error);
      });
  };

  const showFlash = () => {
    setFlash(true);

    window.setTimeout(() => {
      setFlash(false);
    }, 120);
  };

  const waitForVideoFrame = (
    video: HTMLVideoElement
  ) => {
    return new Promise<void>((resolve) => {
      if (video.readyState >= 2) {
        resolve();
        return;
      }

      video.onloadeddata = () => {
        resolve();
      };
    });
  };

  const handleCapture = async () => {
    if (isCapturing) return;

    setIsCapturing(true);

    let stream: MediaStream | null = null;
    let video: HTMLVideoElement | null = null;

    try {
      /*
       * SHUTTER EFFECT
       */
      playShutter();
      showFlash();

      /*
       * CAPTURE CURRENT BROWSER TAB
       *
       * preferCurrentTab:
       * Browser akan memprioritaskan tab yang sedang aktif.
       *
       * selfBrowserSurface:
       * Memungkinkan current tab dipilih.
       */
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
        },
        audio: false,

        // Chrome-specific hints
        // @ts-expect-error Browser-specific MediaTrackConstraints
        preferCurrentTab: true,

        // @ts-expect-error Browser-specific MediaTrackConstraints
        selfBrowserSurface: "include",

        // @ts-expect-error Browser-specific MediaTrackConstraints
        surfaceSwitching: "exclude",

        // @ts-expect-error Browser-specific MediaTrackConstraints
        systemAudio: "exclude",
      });

      const track = stream.getVideoTracks()[0];

      if (!track) {
        throw new Error("No video track available.");
      }

      /*
       * VIDEO ELEMENT
       *
       * Kita tidak memasukkannya ke DOM.
       * Video hanya dipakai sebagai source frame.
       */
      video = document.createElement("video");

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;

      await video.play();

      await waitForVideoFrame(video);

      /*
       * Tunggu sedikit supaya browser sudah
       * benar-benar memberikan frame terbaru.
       */
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(null))
      );

      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        throw new Error(
          `Invalid capture size: ${width}x${height}`
        );
      }

      console.log(
        "DESKSCAPE viewport captured:",
        width,
        "x",
        height
      );

      /*
       * CANVAS SAMA PERSIS DENGAN UKURAN FRAME
       *
       * Tidak ada:
       * - crop
       * - scaling
       * - offset
       * - scene calculation
       */
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not create canvas context.");
      }

      /*
       * Capture frame yang sedang terlihat
       */
      context.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      /*
       * Pastikan screenshot benar-benar punya pixel
       */
      const image = canvas.toDataURL(
        "image/png",
        1.0
      );

      if (!image || image === "data:,") {
        throw new Error(
          "Screenshot generated an empty image."
        );
      }

      /*
       * Simpan hasil screenshot
       */
      setPreview(image);

      /*
       * Stop screen capture setelah frame berhasil
       */
      track.stop();

      stream.getTracks().forEach((track) => {
        track.stop();
      });

      stream = null;
    } catch (error) {
      console.error(
        "DESKSCAPE screenshot failed:",
        error
      );

      /*
       * User menekan Cancel di browser
       * tidak perlu dianggap sebagai error fatal.
       */
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        console.log(
          "Screenshot cancelled by user."
        );
      }
    } finally {
      /*
       * Bersihkan video
       */
      if (video) {
        video.pause();
        video.srcObject = null;
        video.remove();
      }

      /*
       * Safety cleanup
       */
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      setIsCapturing(false);
    }
  };

  const handleSave = () => {
    if (!preview) return;

    const link = document.createElement("a");

    link.href = preview;
    link.download = `deskscape-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const closePreview = () => {
    setPreview(null);
  };

  return (
    <>
      {/* =====================================================
          CAMERA
      ===================================================== */}

      <button
        type="button"
        onClick={handleCapture}
        disabled={isCapturing}
        aria-label="Take screenshot"
        className={`
          absolute
          inset-0
          z-50
          h-full
          w-full
          cursor-pointer
          border-0
          bg-transparent
          p-0
          ${isCapturing ? "pointer-events-none" : ""}
          ${className}
        `}
      >
        <img
          src={asset("/wall/camera.svg")}
          alt="Camera"
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-contain
            transition-transform
            duration-100
            active:scale-[0.96]
          "
        />
      </button>

      {/* =====================================================
          PORTAL
      ===================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
          <>
            {/* =================================================
                CAMERA FLASH
            ================================================= */}

            {flash && (
              <div
                className="
                  pointer-events-none
                  fixed
                  inset-0
                  z-[100000]
                  bg-white
                  opacity-90
                "
              />
            )}

            {/* =================================================
                PREVIEW MODAL
            ================================================= */}

            {preview && (
              <div
                className="
                  fixed
                  inset-0
                  z-[99999]
                  flex
                  items-center
                  justify-center
                  bg-black/60
                  p-4
                  backdrop-blur-md
                "
                onClick={closePreview}
              >
                <div
                  className="
                    relative
                    flex
                    max-h-[94vh]
                    w-full
                    max-w-[1400px]
                    flex-col
                    rounded-2xl
                    border-2
                    border-black
                    bg-[#FCF8ED]
                    p-3
                    shadow-[8px_8px_0px_#000]
                  "
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  {/* HEADER */}

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-between
                      px-1
                      pb-3
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-black/40
                        "
                      >
                        Camera
                      </p>

                      <h2
                        className="
                          mt-1
                          text-base
                          font-black
                        "
                      >
                        DESKSCAPE captured!
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={closePreview}
                      aria-label="Close preview"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        border-2
                        border-black
                        bg-white
                        text-sm
                        font-black
                        transition-transform
                        hover:rotate-6
                        active:translate-y-[1px]
                      "
                    >
                      ×
                    </button>
                  </div>

                  {/* =================================================
                      REAL VIEWPORT SCREENSHOT
                  ================================================= */}

                  <div
                    className="
                      min-h-0
                      flex-1
                      overflow-auto
                      rounded-xl
                      border-2
                      border-black
                      bg-black
                    "
                  >
                    <img
                      src={preview}
                      alt="DESKSCAPE screenshot preview"
                      draggable={false}
                      className="
                        block
                        h-auto
                        w-full
                        object-contain
                      "
                    />
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      flex
                      shrink-0
                      justify-end
                      gap-2
                      pt-3
                    "
                  >
                    <button
                      type="button"
                      onClick={closePreview}
                      className="
                        rounded-lg
                        border-2
                        border-black
                        bg-white
                        px-4
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        transition-transform
                        hover:-translate-y-[1px]
                        active:translate-y-[1px]
                      "
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="
                        rounded-lg
                        border-2
                        border-black
                        bg-[#cdb8ee]
                        px-4
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        shadow-[3px_3px_0px_#000]
                        transition-all
                        hover:translate-x-[1px]
                        hover:translate-y-[1px]
                        hover:shadow-[2px_2px_0px_#000]
                        active:translate-x-[3px]
                        active:translate-y-[3px]
                        active:shadow-none
                      "
                    >
                      Save Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </>
  );
};

export default Camera;