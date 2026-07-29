"use client";

import Image from "next/image";

export default function DayScene() {
  return (
    <>
      <style>{`
        .scene{
          position:relative;
          width:100%;
          height:100%;
        }

        /* Area kaca jendela */
        .viewport{
          position:absolute;

          /* Sesuaikan sedikit bila perlu */
          inset:6.8%;

          overflow:hidden;

          z-index:1;
        }

        .bg{
          position:absolute;
          inset:0;
        }

        .bg img{
          object-fit:cover;
          object-position:center;
        }

        /* =====================
            CLOUDS
        ===================== */

        .cloud{
          position:absolute;
          pointer-events:none;
          will-change:transform;
        }

        .cloud img{
          width:100%;
          height:auto;
          display:block;
        }

        .cloud1{
          width:28%;
          top:7%;
          left:-10%;
          animation:cloud1 90s linear infinite;
        }

        .cloud2{
          width:22%;
          top:17%;
          left:110%;
          animation:cloud2 120s linear infinite;
        }

        .cloud3{
          width:32%;
          top:3%;
          left:-25%;
          animation:cloud3 150s linear infinite;
        }

        @keyframes cloud1{
          from{
            transform:translateX(0);
          }
          to{
            transform:translateX(520%);
          }
        }

        @keyframes cloud2{
          from{
            transform:translateX(0);
          }
          to{
            transform:translateX(-620%);
          }
        }

        @keyframes cloud3{
          from{
            transform:translateX(0);
          }
          to{
            transform:translateX(500%);
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

        {/* Area dalam jendela */}
        <div className="viewport">

          {/* Background */}
          <div className="bg">
            <Image
              src="/scene/day/day.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Cloud 1 */}
          <div className="cloud cloud1">
            <Image
              src="/scene/day/cloud-1.svg"
              alt=""
              width={703}
              height={220}
            />
          </div>

          {/* Cloud 2 */}
          <div className="cloud cloud2">
            <Image
              src="/scene/day/cloud-2.svg"
              alt=""
              width={562}
              height={250}
            />
          </div>

          {/* Cloud 3 */}
          <div className="cloud cloud3">
            <Image
              src="/scene/day/cloud-3.svg"
              alt=""
              width={752}
              height={308}
            />
          </div>

        </div>

        {/* Frame */}
        <div className="frame">
          <Image
            src="/scene/day/frame.svg"
            alt=""
            fill
            priority
          />
        </div>

      </div>
    </>
  );
}