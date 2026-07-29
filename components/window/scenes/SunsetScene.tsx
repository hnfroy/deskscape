"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SunsetScene() {
  const [frame, setFrame] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((prev) => !prev);
    }, 250);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .scene{
          position:relative;
          width:100%;
          height:100%;
        }

        /* =====================
            VIEWPORT
        ===================== */

        .viewport{
          position:absolute;
          inset:6.8%;
          overflow:hidden;
          z-index:1;
        }

        /* =====================
            BACKGROUND
        ===================== */

        .bg{
          position:absolute;
          inset:0;
        }

        .bg img{
          object-fit:cover;
          object-position:center;
        }

        /* =====================
            BIRD
        ===================== */

        .bird{
          position:absolute;
          width:14%;
          top:22%;
          left:-15%;
          animation:birdFly 18s linear infinite;
          z-index:5;
          pointer-events:none;
        }

        .bird img{
          width:100%;
          height:auto;
          display:block;
        }

        @keyframes birdFly{
          0%{
            transform:translateX(0) translateY(0);
          }

          25%{
            transform:translateX(160%) translateY(-8px);
          }

          50%{
            transform:translateX(330%) translateY(6px);
          }

          75%{
            transform:translateX(520%) translateY(-4px);
          }

          100%{
            transform:translateX(700%) translateY(2px);
          }
        }

        /* =====================
            FRAME
        ===================== */

        .frame{
          position:absolute;
          inset:0;
          z-index:20;
          pointer-events:none;
        }
      `}</style>

      <div className="scene">

        {/* Area dalam kaca */}
        <div className="viewport">

          {/* Background */}
          <div className="bg">
            <Image
              src="/scene/sunset/sunset.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Bird */}
          {[
            ["big", "fly1"],
            ["medium", "fly2"],
            ["medium", "fly3"],
            ["small", "fly4"],
            ["small", "fly5"],
            ["small", "fly6"],
            ].map(([size, fly], i) => (
            <div key={i} className={`bird ${size} ${fly}`}>
                <Image
                src={
                    frame
                    ? "/scene/sunset/burung-a.svg"
                    : "/scene/sunset/burung-b.svg"
                }
                alt=""
                width={220}
                height={120}
                />
            </div>
            ))}
        </div>

        {/* Frame */}
        <div className="frame">
          <Image
            src="/scene/sunset/frame.svg"
            alt=""
            fill
            priority
          />
        </div>

      </div>
    </>
  );
}